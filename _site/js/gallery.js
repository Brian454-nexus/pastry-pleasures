const galleryContainer = document.getElementById("pastryGallery");
const sprinkleContainer = document.getElementById("sprinkle-animation");
const surpriseBtn = document.getElementById("surpriseMeBtn");

// === Universal Like Logic for Lightbox using jsonbin.io ===
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/6867b7018a456b7966bb3555";
const JSONBIN_API_KEY =
  "$2a$10$Ua2CufGwTC.FlERqVjPgTesgGhWmViaDyfgZuclYG20J5ruVH0iaS";

// Helper: fetch like counts from jsonbin.io
async function fetchLikeCounts() {
  try {
    const res = await fetch(JSONBIN_URL, {
      headers: { "X-Master-Key": JSONBIN_API_KEY },
    });
    const data = await res.json();
    return data.record || {};
  } catch (e) {
    return {};
  }
}
// Helper: update like counts in jsonbin.io
async function updateLikeCounts(newCounts) {
  try {
    await fetch(JSONBIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY,
      },
      body: JSON.stringify(newCounts),
    });
  } catch (e) {}
}
// Session like state
function hasLiked(src) {
  return sessionStorage.getItem("liked-" + src) === "1";
}
function setLiked(src, val) {
  sessionStorage.setItem("liked-" + src, val ? "1" : "0");
}
// Show lightbox image with like button
function showLightboxImage() {
  const src = imageList[currentIndex];
  lightboxImg.src = `/gallery/${src}`;
  // Add actions bar
  let actions = document.querySelector(".lightbox-actions");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "lightbox-actions";
    lightbox.insertBefore(actions, lightboxCaption);
  }
  actions.innerHTML = "";
  // Like button
  const likeBtn = document.createElement("button");
  likeBtn.className = "lightbox-action-btn lightbox-like-btn";
  const heartIcon = document.createElement("i");
  const likeCount = document.createElement("span");
  likeCount.className = "lightbox-like-count";
  // Initial state from server
  fetchLikeCounts().then((counts) => {
    let count = counts[src] || 0;
    let liked = hasLiked(src);
    heartIcon.className = liked ? "fas fa-heart" : "far fa-heart";
    likeBtn.classList.toggle("liked", liked);
    likeCount.textContent = count;
    // Optimistic UI update
    likeBtn.onclick = () => {
      liked = !liked;
      setLiked(src, liked);
      heartIcon.className = liked ? "fas fa-heart" : "far fa-heart";
      likeBtn.classList.toggle("liked", liked);
      count = liked ? count + 1 : Math.max(count - 1, 0);
      likeCount.textContent = count;
      // Update backend in background
      fetchLikeCounts().then((serverCounts) => {
        serverCounts[src] = count;
        updateLikeCounts(serverCounts);
      });
    };
  });
  likeBtn.appendChild(heartIcon);
  likeBtn.appendChild(likeCount);
  actions.appendChild(likeBtn);
  // Download button
  const downloadBtn = document.createElement("button");
  downloadBtn.className = "lightbox-action-btn";
  downloadBtn.innerHTML = '<i class="fa fa-download"></i> Download';
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = `/gallery/${src}`;
    a.download = src;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  actions.appendChild(downloadBtn);
  // Share button
  const shareBtn = document.createElement("button");
  shareBtn.className = "lightbox-action-btn";
  shareBtn.innerHTML = '<i class="fa fa-share-alt"></i> Share';
  shareBtn.onclick = () => shareImage(src);
  actions.appendChild(shareBtn);
}

// On page load, update likes from server
window.addEventListener("DOMContentLoaded", () => {
  loadGallery();
  updateGalleryLikes();
});

// Dynamically load all images from the gallery folder
function fetchGalleryImages() {
  // 1 to 130 (adjust the number if you have more/less images)
  return Array.from({ length: 130 }, (_, i) => `pastry${i + 1}.jpg`);
}

// Use gallery folder for images
const imageList = fetchGalleryImages();

function formatCaption(filename) {
  let name = filename.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "");
  name = name.replace(/\b\w/g, (c) => c.toUpperCase());
  return name;
}

function createGalleryItem(src) {
  const item = document.createElement("div");
  item.className = "pastry-gallery-item";
  const img = document.createElement("img");
  img.className = "pastry-gallery-img";
  img.src = `/gallery/${src}`;
  img.alt = "Pastry Photo";
  img.loading = "lazy";
  item.appendChild(img);
  item.addEventListener("click", () => openLightbox(src));
  return item;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadGallery() {
  galleryContainer.innerHTML = "";
  // Shuffle images for Pinterest-like randomness
  const shuffled = [...imageList];
  shuffleArray(shuffled);
  shuffled.forEach((src) => {
    const item = createGalleryItem(src);
    galleryContainer.appendChild(item);
  });
  // Masonry layout
  imagesLoaded(galleryContainer, function () {
    new Masonry(galleryContainer, {
      itemSelector: ".pastry-gallery-item",
      columnWidth: ".pastry-gallery-item",
      percentPosition: true,
      gutter: 8,
    });
  });
}

// Lightbox logic
const lightbox = document.getElementById("galleryLightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
let currentIndex = 0;

function openLightbox(src) {
  currentIndex = imageList.indexOf(src);
  showLightboxImage();
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}
function prevImage() {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  showLightboxImage();
}
function nextImage() {
  currentIndex = (currentIndex + 1) % imageList.length;
  showLightboxImage();
}
closeBtn.onclick = closeLightbox;
prevBtn.onclick = prevImage;
nextBtn.onclick = nextImage;
lightbox.onclick = function (e) {
  if (e.target === lightbox) closeLightbox();
};
document.addEventListener("keydown", function (e) {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
  }
});

// Surprise Me button logic
function surpriseMe() {
  const items = document.querySelectorAll(".pastry-gallery-item");
  if (!items.length) return;
  const idx = Math.floor(Math.random() * items.length);
  const item = items[idx];
  // Scroll to the item
  item.scrollIntoView({ behavior: "smooth", block: "center" });
  // Highlight
  item.classList.add("surprise-highlight");
  setTimeout(() => item.classList.remove("surprise-highlight"), 1800);
  // Sprinkle animation
  sprinkleRain();
}

surpriseBtn.addEventListener("click", surpriseMe);

// Sprinkle animation
function sprinkleRain() {
  const sprinkleCount = 32 + Math.floor(Math.random() * 16);
  for (let i = 0; i < sprinkleCount; i++) {
    const sprinkle = document.createElement("div");
    sprinkle.className = "sprinkle";
    sprinkle.style.left = Math.random() * 100 + "vw";
    sprinkle.style.top = "-24px";
    sprinkle.style.background = `linear-gradient(90deg, #eaa636, #fff3cd, #f7b731, #fff, #eaa636)`;
    sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;
    sprinkleContainer.appendChild(sprinkle);
    setTimeout(() => sprinkle.remove(), 1300);
  }
}

// Add highlight style
const style = document.createElement("style");
style.innerHTML = `.surprise-highlight { box-shadow: 0 0 0 6px #eaa63699, 0 8px 32px rgba(234,166,54,0.18) !important; z-index: 10; animation: highlightPop 0.7s; }
@keyframes highlightPop { 0% { transform: scale(1.1); } 60% { transform: scale(0.97); } 100% { transform: scale(1.03); } }`;
document.head.appendChild(style);

function shareImage(src) {
  const url = window.location.origin + "/gallery/" + src;
  const caption = formatCaption(src);
  if (navigator.share) {
    navigator.share({ title: caption, text: caption, url });
  } else {
    // Fallback: show share links
    const shareLinks = [
      `<a href='https://wa.me/?text=${encodeURIComponent(
        caption + " " + url
      )}' target='_blank'>WhatsApp</a>`,
      `<a href='https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}' target='_blank'>Facebook</a>`,
      `<a href='https://twitter.com/intent/tweet?text=${encodeURIComponent(
        caption + " " + url
      )}' target='_blank'>Twitter</a>`,
      `<button onclick="navigator.clipboard.writeText('${url}')">Copy Link</button>`,
    ];
    let modal = document.getElementById("shareModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "shareModal";
      modal.style.position = "fixed";
      modal.style.left = "0";
      modal.style.top = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0,0,0,0.7)";
      modal.style.zIndex = "10001";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.innerHTML = `<div style='background:#fff3cd;padding:2rem 2.5rem;border-radius:1.2rem;box-shadow:0 2px 8px #eaa63633;text-align:center;'><h3 style='color:#eaa636;'>Share Image</h3><div style='margin:1.2rem 0;font-size:1.2rem;display:flex;gap:1.2rem;justify-content:center;'>${shareLinks.join(
        ""
      )}</div><button style='margin-top:1.2rem;' onclick='document.getElementById("shareModal").remove()'>Close</button></div>`;
      document.body.appendChild(modal);
    }
  }
}
