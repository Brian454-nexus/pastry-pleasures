// Dynamically load all images from the gallery folder
function fetchGalleryImages() {
  // List of images in the gallery folder (generated from server or injected by backend)
  // For now, we will use a static list, but this should be generated dynamically in production
  return [
    "339675928_744614570706051_3204722530471677933_n..jpg",
    "346539692_3532262470381516_7563067446435870624_n..jpg",
    "360045110_190101193783630_1148285520179002169_n..jpg",
    "362319858_1980149705673338_4894573343273915169_n..jpg",
    "364310867_658370016214012_959987213053227687_n..jpg",
    "364285421_994362161759383_3577770414961300791_n..jpg",
    "365063539_971727100760730_585268799002923631_n..jpg",
    "379264922_324879240200262_6730959795323271095_n..jpg",
    "380795599_878217453736788_3955085424222794765_n..jpg",
    "382976798_1720949178389350_4734537887093595765_n..jpg",
    "383316593_363944415961121_5342800522696165598_n..jpg",
    "383763962_686657793073065_1177701207025748504_n..jpg",
    "382447714_1007186303665353_3906820171414765006_n..jpg",
    "387264915_6408644625928921_9148663192484627708_n..jpg",
    "395125656_242193315500525_971516227239707595_n..jpg",
    "394036665_681496620782403_7189735299480217415_n..jpg",
    "395634456_1316744205668989_1688707400642687800_n..jpg",
    "396403729_195637416836894_7802259827744213746_n..jpg",
    "398808662_743699394235624_190624884911851393_n..jpg",
    "399561084_849535729963509_609526608697023279_n..jpg",
    "399550151_659428742923584_8101917414617363707_n..jpg",
    "400581555_282577738095587_9119209285094941039_n..jpg",
    "405572314_191887560585045_8498107043749539774_n..jpg",
    "412623984_1093591865151246_1162783763411206706_n..jpg",
    "418012861_750691306905400_4217419105679482159_n..jpg",
    "416534734_1354926301820964_7158280345049077547_n..jpg",
    "418788207_1046007193168844_1708134634876448661_n..jpg",
    "426635967_1137057887311701_1528507278404644187_n..jpg",
    "472895030_18480485566041423_3325955450154932028_n..jpg",
    "472789162_18480485407041423_7110802430270660966_n..jpg",
    "472742887_18480485287041423_1727780974562701_n..jpg",
    "473031692_18480651430041423_2782182425448975382_n..jpg",
    "473008958_18480657583041423_6185028373881532553_n..jpg",
    "472749862_18480662728041423_2234685537376894426_n..jpg",
    "472843880_18480662548041423_1719102591421140964_n..jpg",
    "473166608_18480678295041423_4114414949781046912_n..jpg",
    "472810996_18480678193041423_1110327094457934993_n..jpg",
    "472942209_18480680338041423_8169824186148156572_n..jpg",
    "473008649_18480680419041423_6237660074048165101_n..jpg",
    "473008637_18480680317041423_6577014457046435240_n..jpg",
    "473187030_18480680365041423_6800889600460009641_n..jpg",
    "472875954_18480698152041423_2861456414772358796_n..jpg",
    "472841829_18480698137041423_4343002961178805245_n..jpg",
    "473187582_18480898219041423_767051822087778408_n..jpg",
    "473316526_18480901069041423_8895086751455572490_n..jpg",
    "452477577_18447578077041423_3719913096059185160_n..jpg",
    "473191149_18481155946041423_3332460995569860353_n..jpg",
    "473190466_18481155982041423_8584055555876701628_n..jpg",
    "473229333_18481155994041423_8194434364689531456_n..jpg",
    "473615951_18481156024041423_1205044828403207052_n..jpg",
    "473162508_18481156030041423_7822617391090205204_n..jpg",
    "473552111_18481164049041423_6153185556735600037_n..jpg",
    "470894004_18476405851041423_2618271095538354222_n..jpg",
    "470933052_18476405833041423_1461181783986436505_n..jpg",
    "470933364_18476405842041423_4161249216392541376_n..jpg",
    "470899799_18476405785041423_46332295863075161_n..jpg",
    "472511799_18480206482041423_6810865337025866564_n..jpg",
    "471460462_18481591117041423_5633022862784967488_n..jpg",
    "474546338_18482989984041423_8105897236231755693_n..jpg",
    "474442788_18482990821041423_3015908474968104343_n..jpg",
    "475271715_18484067740041423_4201613115147741711_n..jpg",
    "475641670_18484893862041423_77401054024097976_n..jpg",
    "476128100_18485405347041423_6944224322806721988_n..jpg",
    "476081856_18485405275041423_5177265439175191542_n..jpg",
    "476649875_18486091540041423_736609161320233759_n..jpg",
    "476648865_18486091492041423_2328105805788284752_n..jpg",
    "475327120_18486091462041423_4861245725965820283_n..jpg",
    "476584957_18486091423041423_4551152755522539938_n..jpg",
    "476887151_18486091396041423_278232113954599844_n..jpg",
    "477857106_18486313342041423_3772543580271002358_n..jpg",
    "479440547_18487089907041423_1390883391071031002_n..jpg",
    "480236447_18487089835041423_5162581084458817451_n..jpg",
    "479385926_18487089826041423_3680859525100794987_n..jpg",
    "478341618_18486315334041423_200318602915757951_n..jpg",
    "480157031_18487413436041423_9132376508361330478_n..jpg",
    "480364494_18487414261041423_7839447476229776997_n..jpg",
    "479959694_18487414795041423_8097655454227820673_n..jpg",
    "480582541_18487415275041423_4113355286877944688_n..jpg",
    "479970918_18487416325041423_3408244685947341078_n..jpg",
    "479920150_18487416922041423_2998350507273897983_n..jpg",
    "480557308_18487417774041423_3547867352204962727_n..jpg",
    "480293481_18487417915041423_1980502445979034_n..jpg",
    "480387156_18487418698041423_7095507609402258758_n..jpg",
    "480514521_18487419520041423_6698071572978971232_n..jpg",
    "481855730_18489408172041423_1390689917118763111_n..jpg",
    "480227251_18487420858041423_219998018050186425_n..jpg",
    "480011412_18487420828041423_6924606563140173848_n..jpg",
    "481964852_18489406762041423_3846662855090411030_n..jpg",
    "481983243_18489407374041423_749745652910027411_n..jpg",
    "482120115_18489407713041423_2918080123677853669_n..jpg",
    "479902413_18487420063041423_449806702005453817_n..jpg",
    "482485279_18489409048041423_7388406135120668296_n..jpg",
    "481715263_18489409393041423_3873316471768897864_n..jpg",
    "481797333_18489409816041423_3640300424516464721_n..jpg",
    "483024948_18491515003041423_1501689539217879109_n..jpg",
    "483008937_18491514991041423_2813832393429686384_n..jpg",
    "483904106_18491514958041423_6678424481324229599_n..jpg",
  ];
}

// Use gallery folder for images
const imageList = fetchGalleryImages();

function formatCaption(filename) {
  let name = filename.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "");
  name = name.replace(/\b\w/g, (c) => c.toUpperCase());
  return name;
}

function getLikes() {
  return JSON.parse(localStorage.getItem("pastryGalleryLikes") || "{}");
}
function setLikes(likes) {
  localStorage.setItem("pastryGalleryLikes", JSON.stringify(likes));
}
function toggleLike(src) {
  const likes = getLikes();
  likes[src] = likes[src] ? likes[src] + 1 : 1;
  setLikes(likes);
  updateGalleryLikes();
  updateLightboxLikes();
}
function unlike(src) {
  const likes = getLikes();
  if (likes[src] && likes[src] > 0) likes[src]--;
  setLikes(likes);
  updateGalleryLikes();
  updateLightboxLikes();
}
function isLiked(src) {
  const likes = getLikes();
  return likes[src] && likes[src] > 0;
}
function getLikeCount(src) {
  const likes = getLikes();
  return likes[src] || 0;
}
function updateGalleryLikes() {
  document.querySelectorAll(".pastry-gallery-item").forEach((item) => {
    const img = item.querySelector("img");
    const src = img.src.split("/gallery/")[1];
    const likeBtn = item.querySelector(".pastry-like-btn");
    const likeCount = item.querySelector(".pastry-like-count");
    if (isLiked(src)) likeBtn.classList.add("liked");
    else likeBtn.classList.remove("liked");
    likeCount.textContent = getLikeCount(src);
  });
}
function updateLightboxLikes() {
  if (!lightboxImg.src) return;
  const src = lightboxImg.src.split("/gallery/")[1];
  const likeBtn = document.querySelector(".lightbox-like-btn");
  const likeCount = document.querySelector(".lightbox-like-count");
  if (isLiked(src)) likeBtn.classList.add("liked");
  else likeBtn.classList.remove("liked");
  likeCount.textContent = getLikeCount(src);
}
function createGalleryItem(src) {
  const item = document.createElement("div");
  item.className = "pastry-gallery-item";
  const img = document.createElement("img");
  img.className = "pastry-gallery-img";
  img.src = `/gallery/${src}`;
  img.alt = formatCaption(src);
  img.loading = "lazy";
  const caption = document.createElement("div");
  caption.className = "pastry-gallery-caption";
  caption.textContent = formatCaption(src);
  // Like button
  const likeBtn = document.createElement("button");
  likeBtn.className = "pastry-like-btn";
  likeBtn.innerHTML = '<i class="fa fa-heart"></i>';
  likeBtn.onclick = (e) => {
    e.stopPropagation();
    if (isLiked(src)) unlike(src);
    else toggleLike(src);
  };
  // Like count
  const likeCount = document.createElement("span");
  likeCount.className = "pastry-like-count";
  likeCount.textContent = getLikeCount(src);
  item.appendChild(img);
  item.appendChild(caption);
  item.appendChild(likeBtn);
  item.appendChild(likeCount);
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
function showLightboxImage() {
  const src = imageList[currentIndex];
  lightboxImg.src = `/gallery/${src}`;
  lightboxCaption.textContent = formatCaption(src);
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
  likeBtn.innerHTML = '<i class="fa fa-heart"></i>';
  likeBtn.onclick = () => {
    if (isLiked(src)) unlike(src);
    else toggleLike(src);
  };
  // Like count
  const likeCount = document.createElement("span");
  likeCount.className = "lightbox-like-count";
  likeCount.textContent = getLikeCount(src);
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
  updateLightboxLikes();
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

// Load gallery on page load
document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
  updateGalleryLikes();
});

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

const galleryContainer = document.getElementById("pastryGallery");
const sprinkleContainer = document.getElementById("sprinkle-animation");
const surpriseBtn = document.getElementById("surpriseMeBtn");
