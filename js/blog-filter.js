document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const blogGrid = document.getElementById("blogGrid");
  const blogPosts = Array.from(blogGrid.children);
  const noResults = document.getElementById("noResults");

  const filterPosts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory =
      document.querySelector(".filter-btn.active").dataset.category;

    let hasVisiblePosts = false;

    blogPosts.forEach((post) => {
      const title = post.querySelector(".post-title").textContent.toLowerCase();
      const excerpt = post
        .querySelector(".post-excerpt")
        .textContent.toLowerCase();
      const postCategory = post.dataset.category;

      const matchesCategory =
        activeCategory === "all" || postCategory === activeCategory;
      const matchesSearch =
        title.includes(searchTerm) || excerpt.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        post.style.display = "block";
        hasVisiblePosts = true;
      } else {
        post.style.display = "none";
      }
    });

    if (hasVisiblePosts) {
      noResults.style.display = "none";
    } else {
      noResults.style.display = "block";
    }
  };

  searchBtn.addEventListener("click", filterPosts);
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      filterPosts();
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterPosts();
    });
  });
});
