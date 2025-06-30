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
    await this.loadPosts();
    this.setupEventListeners();
    this.renderPosts();
  }

  // Load posts from markdown files or API
  async loadPosts() {
    try {
      // In production, this would fetch from your CMS or API
      // For now, we'll use the sample data
      this.posts = await this.fetchPosts();
    } catch (error) {
      console.error("Error loading posts:", error);
      this.posts = [];
    }
  }

  // Fetch posts from markdown files or API
  async fetchPosts() {
    // In a real implementation, you would:
    // 1. Fetch from Netlify CMS API
    // 2. Parse markdown files
    // 3. Return structured data

    // For demo purposes, return sample data
    return [
      {
        id: 1,
        title: "The Perfect Chocolate Cake Recipe",
        excerpt:
          "Discover the secrets to baking the most moist and delicious chocolate cake that will impress everyone at your next celebration.",
        category: "recipes",
        author: "Chef Sarah",
        authorImage: "img/team-1.jpg",
        date: "2024-01-15",
        image: "img/product-1.jpg",
        slug: "perfect-chocolate-cake-recipe",
        content: "Full markdown content would go here...",
      },
      {
        id: 2,
        title: "Essential Baking Tools Every Baker Needs",
        excerpt:
          "From measuring cups to stand mixers, here are the must-have tools that will take your baking to the next level.",
        category: "tips",
        author: "Chef Michael",
        authorImage: "img/team-2.jpg",
        date: "2024-01-12",
        image: "img/product-2.jpg",
        slug: "essential-baking-tools",
        content: "Full markdown content would go here...",
      },
      {
        id: 3,
        title: "A Sweet Love Story: How Pastry Pleasures Began",
        excerpt:
          "The heartwarming story of how our bakery started from a small kitchen dream to becoming Nairobi's favorite pastry destination.",
        category: "stories",
        author: "Founder Emma",
        authorImage: "img/team-3.jpg",
        date: "2024-01-10",
        image: "img/product-3.jpg",
        slug: "how-pastry-pleasures-began",
        content: "Full markdown content would go here...",
      },
      {
        id: 4,
        title: "Valentine's Day Special: Romantic Pastry Ideas",
        excerpt:
          "Create the perfect romantic atmosphere with these specially designed pastries perfect for Valentine's Day celebrations.",
        category: "events",
        author: "Chef David",
        authorImage: "img/team-4.jpg",
        date: "2024-01-08",
        image: "img/product-1.jpg",
        slug: "valentines-day-pastry-ideas",
        content: "Full markdown content would go here...",
      },
      {
        id: 5,
        title: "Gluten-Free Baking Made Easy",
        excerpt:
          "Learn how to create delicious gluten-free pastries that taste just as good as traditional recipes.",
        category: "recipes",
        author: "Chef Lisa",
        authorImage: "img/team-1.jpg",
        date: "2024-01-05",
        image: "img/product-2.jpg",
        slug: "gluten-free-baking-guide",
        content: "Full markdown content would go here...",
      },
      {
        id: 6,
        title: "The Science Behind Perfect Bread",
        excerpt:
          "Understanding the chemistry of bread making and how to achieve that perfect crust and crumb every time.",
        category: "tips",
        author: "Chef James",
        authorImage: "img/team-2.jpg",
        date: "2024-01-03",
        image: "img/product-3.jpg",
        slug: "science-of-bread-making",
        content: "Full markdown content would go here...",
      },
    ];
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

    if (!blogGrid) return;

    if (this.currentPosts.length === 0) {
      blogGrid.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      if (loadMoreContainer) loadMoreContainer.style.display = "none";
      return;
    }

    if (noResults) noResults.style.display = "none";

    const postsToShow = this.currentPosts.slice(
      0,
      this.currentPage * this.postsPerPage
    );
    const hasMorePosts = postsToShow.length < this.currentPosts.length;

    blogGrid.innerHTML = postsToShow
      .map((post) => this.createBlogCard(post))
      .join("");

    if (loadMoreContainer) {
      if (hasMorePosts) {
        loadMoreContainer.style.display = "block";
      } else {
        loadMoreContainer.style.display = "none";
      }
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
