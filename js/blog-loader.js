/**
 * Blog Loader for Pastry Pleasures
 * Handles dynamic loading of blog posts from markdown files and Netlify CMS
 */

class BlogLoader {
  constructor() {
    this.posts = [];
    this.currentPosts = [];
    this.currentCategory = "all";
    this.currentSearch = "";
    this.postsPerPage = 6;
    this.currentPage = 1;
    this.isLoading = false;
    this.errorMessage = null; // To hold any error messages
  }

  // Initialize the blog loader
  async init() {
    this.isLoading = true;
    this.renderPosts(); // Show loader immediately

    try {
      await this.loadPosts();
    } catch (error) {
      console.error("Failed to load posts during initialization:", error);
      this.posts = [];
      this.currentPosts = [];
      this.errorMessage = error.message || "An unknown error occurred.";
    } finally {
      this.isLoading = false;
      this.renderPosts(); // Always render the final state (posts or error message)
    }

    // Event listeners should be set up regardless of post loading success
    this.setupEventListeners();
  }

  // Load posts from markdown files or API
  async loadPosts() {
    this.posts = await this.fetchPosts();
    this.currentPosts = [...this.posts];
  }

  // Fetch posts from GitHub API Directly
  async fetchPosts() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

    const GITHUB_API_URL =
      "https://api.github.com/repos/Brian454-nexus/pastry-pleasures/contents/blog";

    try {
      const response = await fetch(GITHUB_API_URL, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github.v3+json" },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts list (Server status: ${response.status}).`
        );
      }

      const files = await response.json();

      const postPromises = files
        .filter((file) => file.name.endsWith(".md"))
        .map(async (file) => {
          try {
            const contentResponse = await fetch(file.download_url);
            if (!contentResponse.ok) return null;

            const content = await contentResponse.text();
            const { data, content: body } = this.parseFrontMatter(content);

            return {
              id: file.sha,
              title: data.title,
              excerpt: data.excerpt,
              category: data.category,
              author: data.author,
              authorImage: data.authorImage,
              date: data.date,
              image: data.image,
              slug: file.name.replace(/\.md$/, ""),
              content: body.trim(),
              tags: data.tags || [],
              draft: data.draft || false,
            };
          } catch (e) {
            console.error(`Error processing file ${file.name}:`, e);
            return null; // Skip this post on error
          }
        });

      const posts = (await Promise.all(postPromises))
        .filter((p) => p !== null && !p.draft)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      return posts;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error(
          "The request for blog posts took too long. Please try again."
        );
      }
      throw error;
    }
  }

  // Parse front matter from markdown content
  parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const matches = content.match(frontMatterRegex);

    if (!matches) {
      // If no front matter, return empty data and use the whole file as content
      return { data: {}, content: content.trim() };
    }

    const [, frontMatter, body] = matches;
    const data = {};

    frontMatter.split("\n").forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex > -1) {
        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^"(.*)"$/, "$1");
        data[key] = value;
      }
    });

    return { data, content: body.trim() };
  }

  // Filter posts by category
  filterByCategory(category) {
    this.currentCategory = category;
    this.currentPage = 1;

    if (category === "all") {
      this.currentPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(this.currentSearch.toLowerCase())
      );
    } else {
      this.currentPosts = this.posts.filter(
        (post) =>
          post.category === category &&
          (post.title
            .toLowerCase()
            .includes(this.currentSearch.toLowerCase()) ||
            post.excerpt
              .toLowerCase()
              .includes(this.currentSearch.toLowerCase()))
      );
    }

    this.renderPosts();
  }

  // Search posts
  searchPosts(query) {
    this.currentSearch = query;
    this.currentPage = 1;

    if (this.currentCategory === "all") {
      this.currentPosts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.currentPosts = this.posts.filter(
        (post) =>
          post.category === this.currentCategory &&
          (post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()))
      );
    }

    this.renderPosts();
  }

  // Load more posts
  loadMorePosts() {
    this.currentPage++;
    this.renderPosts();
  }

  // Render posts to the DOM
  renderPosts() {
    const blogGrid = document.getElementById("blogGrid");
    const noResults = document.getElementById("noResults");
    const loadMoreContainer = document.getElementById("loadMoreContainer");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const errorMessageContainer = document.getElementById("errorMessage");
    const errorTextElement = document.getElementById("errorText");

    if (
      !blogGrid ||
      !noResults ||
      !loadMoreContainer ||
      !loadingIndicator ||
      !errorMessageContainer ||
      !errorTextElement
    ) {
      console.error(
        "One or more required blog elements are missing from the DOM."
      );
      return;
    }

    // Always hide all content containers first
    loadingIndicator.style.display = "none";
    blogGrid.style.display = "none";
    noResults.style.display = "none";
    errorMessageContainer.style.display = "none";
    loadMoreContainer.style.display = "none";

    if (this.isLoading) {
      loadingIndicator.style.display = "block";
      return;
    }

    if (this.errorMessage) {
      errorTextElement.textContent = this.errorMessage;
      errorMessageContainer.style.display = "block";
      return;
    }

    if (this.currentPosts.length === 0) {
      noResults.style.display = "block";
      return;
    }

    // Display posts if everything is fine
    blogGrid.style.display = "flex";
    const postsToShow = this.currentPosts.slice(
      0,
      this.currentPage * this.postsPerPage
    );
    const hasMorePosts = postsToShow.length < this.currentPosts.length;

    blogGrid.innerHTML = postsToShow
      .map((post) => this.createBlogCard(post))
      .join("");

    if (hasMorePosts) {
      loadMoreContainer.style.display = "block";
    }
  }

  // Create blog card HTML
  createBlogCard(post) {
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `
      <div class="col-lg-4 col-md-6 mb-4 wow fadeInUp" data-wow-delay="0.1s">
        <div class="blog-card">
          <div class="blog-card-image">
            <img src="${post.image}" alt="${post.title}" />
            <div class="blog-card-category">${post.category}</div>
          </div>
          <div class="blog-card-content">
            <h3 class="blog-card-title">
              <a href="blog-details.html?slug=${post.slug}" style="color: inherit; text-decoration: none;">
                ${post.title}
              </a>
            </h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-meta">
              <div class="blog-card-author">
                <img src="${post.authorImage}" alt="${post.author}" />
                ${post.author}
              </div>
              <div class="blog-card-date">${date}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Setup event listeners
  setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.filterByCategory(e.target.dataset.category);
      });
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        if (searchInput) this.searchPosts(searchInput.value);
      });
    }

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.searchPosts(searchInput.value);
        }
      });
    }

    // Load more button
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.loadMorePosts();
      });
    }
  }

  // Get a single post by slug
  async getPostBySlug(slug) {
    const post = this.posts.find((p) => p.slug === slug);
    if (post) {
      return post;
    }

    // If not found in cached posts, try to fetch from API
    try {
      // In production, fetch from your CMS API
      const response = await fetch(`/api/posts/${slug}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }

    return null;
  }

  // Parse markdown content (basic implementation)
  parseMarkdown(markdown) {
    // This is a basic markdown parser
    // In production, you'd use a library like marked.js or showdown
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n/gim, "<br>");
  }
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogLoader;
}
