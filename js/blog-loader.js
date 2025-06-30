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
    } finally {
      this.isLoading = false;
      this.renderPosts(); // Always render the final state (posts or error message)
    }

    // Event listeners should be set up regardless of post loading success
    this.setupEventListeners();
  }

  // Load posts from markdown files or API
  async loadPosts() {
    // isLoading is now handled by the init method
    this.posts = await this.fetchPosts();
    this.currentPosts = [...this.posts];
  }

  // Fetch posts from Netlify Function
  async fetchPosts() {
    try {
      const response = await fetch("/.netlify/functions/get-posts");
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Return empty array on error to prevent site crash
      return [];
    }
  }

  // Parse front matter from markdown content
  parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const matches = content.match(frontMatterRegex);

    if (!matches) {
      throw new Error("Invalid front matter format");
    }

    const [, frontMatter, body] = matches;
    const data = {};

    // Parse YAML front matter
    frontMatter.split("\n").forEach((line) => {
      const [key, ...values] = line.split(":");
      if (key && values.length) {
        let value = values.join(":").trim();
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        data[key.trim()] = value;
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

    // Show loading indicator if posts are being loaded
    if (this.isLoading) {
      loadingIndicator.style.display = "block";
      blogGrid.style.display = "none";
      noResults.style.display = "none";
      loadMoreContainer.style.display = "none";
      return;
    }

    // Hide loading indicator
    loadingIndicator.style.display = "none";
    blogGrid.style.display = "block";

    if (this.currentPosts.length === 0) {
      blogGrid.innerHTML = "";
      noResults.style.display = "block";
      loadMoreContainer.style.display = "none";
      return;
    }

    noResults.style.display = "none";

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
    } else {
      loadMoreContainer.style.display = "none";
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

// Initialize blog loader when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const blogLoader = new BlogLoader();
  blogLoader.init();
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogLoader;
}
