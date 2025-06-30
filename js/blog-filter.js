document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const blogGrid = document.getElementById("blogGrid");
  const noResults = document.getElementById("noResults");

  if (!blogGrid) {
    // Not on the blog page, do nothing.
    return;
  }

  const posts = Array.from(blogGrid.children);

  const filterPosts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory =
      document.querySelector(".filter-btn.active").dataset.category;
    let postsFound = false;

    posts.forEach((post) => {
      const title = post
        .querySelector(".project-title h5")
        .textContent.toLowerCase();
      const category = post.dataset.category.toLowerCase();

      const categoryMatch =
        activeCategory === "all" || category === activeCategory;
      const searchMatch = title.includes(searchTerm);

      if (categoryMatch && searchMatch) {
        post.style.display = "";
        postsFound = true;
      } else {
        post.style.display = "none";
      }
    });

    noResults.style.display = postsFound ? "none" : "block";
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterPosts();
    });
  });

  searchBtn.addEventListener("click", filterPosts);
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      filterPosts();
    }
  });

  // Initial filter on load
  filterPosts();
});
