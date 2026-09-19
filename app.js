import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";


/* =========================================================
   PAYPAL.ME
========================================================= */

const PAYPAL_ME = "https://paypal.me/SH0PNOVA";


/* =========================================================
   PROMO CODES
========================================================= */

const PROMO_CODES = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};


/* =========================================================
   PRODUCTS
========================================================= */

const PRODUCTS = [

  {
    id:"gigabyte-b650-aorus",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description:"Carte mère gaming AMD B650 avec Wi-Fi et connectique complète."
  },

  {
    id:"pc-7800x3d-9070xt",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description:"Configuration gaming haut de gamme avec Ryzen 7 7800X3D, RX 9070 XT et 32 Go DDR5."
  },

  {
    id:"hyperx-cloud-ii",
    name:"HyperX Cloud II – Casque gaming",
    category:"Casques",
    price:49.99,
    image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
    description:"Casque gaming confortable avec son immersif."
  },

  {
    id:"tecors-60",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
    description:"Clavier mécanique compact 60% au format AZERTY."
  },

  {
    id:"celshading-65",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description:"Clavier magnétique 65% conçu pour le gaming rapide."
  },

  {
    id:"ajazz-aj199-max",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description:"Souris gaming sans fil légère avec coque finition carbone."
  },

  {
    id:"logitech-g-pro-x2",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description:"Souris gaming haute performance conçue pour l'e-sport."
  },

  {
    id:"samsung-990-pro-1tb",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
    description:"SSD NVMe PCIe 4.0 Samsung 990 PRO de 1 To."
  },

  {
    id:"samsung-990-pro-2tb",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp",
    description:"SSD NVMe haute performance de 2 To."
  },

  {
    id:"corsair-rm1000x",
    name:"CORSAIR RM1000x (EU)",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
    description:"Alimentation modulaire 1000 W pour configurations gaming puissantes."
  },

  {
    id:"corsair-rm850x",
    name:"CORSAIR RM850x (EU)",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
    description:"Alimentation modulaire 850 W."
  },

  {
    id:"corsair-frame-5000d",
    name:"Corsair Frame 5000D RS ARGB (Noir)",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
    description:"Boîtier gaming ATX avec ventilation et éclairage ARGB."
  },

  {
    id:"arctic-liquid-360",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
    description:"Watercooling 360 mm haute performance."
  },

  {
    id:"samsung-g6-oled",
    name:'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category:"Écrans",
    price:399.95,
    image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
    description:"Écran gaming QD-OLED 27 pouces."
  },

  {
    id:"elgato-wave-arm",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5",
    description:"Bras microphone premium pour setup streaming."
  },

  {
    id:"dualsense-cosmic-red",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    description:"Manette DualSense compatible PS5 et PC."
  },

  {
    id:"asus-tuf-b650",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg",
    description:"Carte mère gaming AMD AM5."
  },

  {
    id:"msi-b650-tomahawk",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
    description:"Carte mère B650 avec Wi-Fi intégrée."
  }

];


/* =========================================================
   STATE
========================================================= */

let currentUser = null;

let currentCategory = "Tous";

let currentSearch = "";

let currentSort = "relevance";

let currentProduct = null;

let currentPromo = null;

let cart = loadJSON("novaCart", []);

let favorites = loadJSON("novaFavorites", []);

let orders = loadJSON("novaOrders", []);

let reviews = loadJSON("novaReviews", []);

let settings = loadJSON(
  "novaSettings",
  {
    dark:false,
    sound:true,
    language:"fr"
  }
);


/* =========================================================
   HELPERS
========================================================= */

function $(id){
  return document.getElementById(id);
}

function loadJSON(key,fallback){
  try{
    const value = localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;

  }catch{
    return fallback;
  }
}

function saveJSON(key,value){
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function money(value){
  return new Intl.NumberFormat(
    settings.language === "fr" ? "fr-FR" : "en-US",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(value);
}

function escapeHTML(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function uid(prefix="nova"){
  return prefix + "-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2,8);
}

function getProduct(id){
  return PRODUCTS.find(
    product => product.id === id
  );
}

function playClick(){
  if(!settings.sound)return;

  try{

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if(!AudioContext)return;

    const ctx = new AudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      520,
      ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      760,
      ctx.currentTime + .055
    );

    gain.gain.setValueAtTime(
      .0001,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      .055,
      ctx.currentTime + .01
    );

    gain.gain.exponentialRampToValueAtTime(
      .0001,
      ctx.currentTime + .08
    );

    oscillator.connect(gain);

    gain.connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
      ctx.currentTime + .08
    );

  }catch{}
}

function toast(message){
  const element = $("toast");

  if(!element)return;

  element.textContent = message;

  element.classList.add("show");

  setTimeout(()=>{
    element.classList.remove("show");
  },2300);
}


/* =========================================================
   RIPPLE EFFECT
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("button");

    if(!button)return;

    playClick();

    const ripple =
      document.createElement("span");

    ripple.className = "ripple";

    ripple.style.left =
      event.clientX + "px";

    ripple.style.top =
      event.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(
      ()=>ripple.remove(),
      600
    );

  }
);


/* =========================================================
   SETTINGS
========================================================= */

function applySettings(){

  document.body.classList.toggle(
    "dark",
    settings.dark
  );

  const darkToggle =
    $("darkModeToggle");

  const soundToggle =
    $("soundToggle");

  if(darkToggle){
    darkToggle.classList.toggle(
      "active",
      settings.dark
    );
  }

  if(soundToggle){
    soundToggle.classList.toggle(
      "active",
      settings.sound
    );
  }

  const language =
    $("languageSelect");

  if(language){
    language.value =
      settings.language;
  }

  saveJSON(
    "novaSettings",
    settings
  );
}

function toggleDarkMode(){

  settings.dark =
    !settings.dark;

  applySettings();

}

function toggleSound(){

  settings.sound =
    !settings.sound;

  applySettings();

  if(settings.sound){
    playClick();
  }

}

function setLanguage(language){

  settings.language =
    language;

  applySettings();

  renderProducts();

  renderCart();

  if(currentProduct){
    renderProductDetail(
      currentProduct.id
    );
  }

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id){

  const modal = $(id);

  if(!modal)return;

  modal.classList.add("show");

  $("overlay")?.classList.add("show");

  document.body.style.overflow =
    "hidden";

}

function closeModal(id){

  const modal = $(id);

  if(!modal)return;

  modal.classList.remove("show");

  const anyModal =
    document.querySelector(
      ".modal.show"
    );

  if(
    !anyModal &&
    !$("cartDrawer")?.classList.contains("open")
  ){

    $("overlay")?.classList.remove("show");

    document.body.style.overflow =
      "";

  }

}

function closeAll(){

  document
    .querySelectorAll(".modal.show")
    .forEach(
      modal =>
        modal.classList.remove("show")
    );

  $("cartDrawer")
    ?.classList.remove("open");

  $("overlay")
    ?.classList.remove("show");

  document.body.style.overflow =
    "";

}


/* =========================================================
   AUTH MODAL
========================================================= */

function showLogin(){

  $("loginForm")
    ?.classList.remove("hidden");

  $("signupForm")
    ?.classList.add("hidden");

  $("loginTab")
    ?.classList.add("active");

  $("signupTab")
    ?.classList.remove("active");

}

function showSignup(){

  $("loginForm")
    ?.classList.add("hidden");

  $("signupForm")
    ?.classList.remove("hidden");

  $("loginTab")
    ?.classList.remove("active");

  $("signupTab")
    ?.classList.add("active");

}

function openAccount(){

  if(!currentUser){

    showLogin();

    openModal("authModal");

    return;
  }

  renderAccount();

  openModal("accountModal");

}


/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount(){

  const info =
    $("accountInfo");

  if(!info)return;

  if(!currentUser){

    info.innerHTML =
      "Vous n'êtes pas connecté.";

    return;
  }

  const displayName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Utilisateur";

  info.innerHTML = `
    <strong>${escapeHTML(displayName)}</strong><br>
    📧 ${escapeHTML(currentUser.email || "Non renseigné")}<br>
    🆔 ${escapeHTML(currentUser.uid)}
  `;

}


/* =========================================================
   ADMIN BUTTON
========================================================= */

function updateAdminButton(){

  const button =
    $("adminButton");

  if(!button)return;

  const isAdmin =
    currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase()
      === ADMIN_EMAIL.toLowerCase();

  button.hidden =
    !isAdmin;

  if(isAdmin){

    button.style.display =
      "inline-flex";

  }else{

    button.style.display =
      "none";

  }

}


/* =========================================================
   PRODUCT FILTER
========================================================= */

function getVisibleProducts(){

  let list =
    [...PRODUCTS];

  if(currentCategory !== "Tous"){

    list =
      list.filter(
        product =>
          product.category
          === currentCategory
      );

  }

  if(currentSearch){

    const query =
      currentSearch
        .toLowerCase()
        .trim();

    list =
      list.filter(product => {

        const text =
          (
            product.name +
            " " +
            product.category +
            " " +
            product.description
          ).toLowerCase();

        return text.includes(query);

      });

  }

  if(currentSort === "priceAsc"){

    list.sort(
      (a,b) =>
        a.price - b.price
    );

  }

  if(currentSort === "priceDesc"){

    list.sort(
      (a,b) =>
        b.price - a.price
    );

  }

  if(currentSort === "name"){

    list.sort(
      (a,b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  return list;
}


/* =========================================================
   RATINGS
========================================================= */

function productReviews(productId){

  return reviews.filter(
    review =>
      review.productId === productId
  );

}

function averageRating(productId){

  const list =
    productReviews(productId);

  if(!list.length)return 0;

  return list.reduce(
    (sum,review) =>
      sum + Number(review.rating),
    0
  ) / list.length;

}

function starsHTML(value){

  const rounded =
    Math.round(value);

  let html = "";

  for(let i=1;i<=5;i++){

    html +=
      i <= rounded
        ? "★"
        : "☆";

  }

  return html;
}


/* =========================================================
   PRODUCTS RENDER
========================================================= */

function renderProducts(){

  const grid =
    $("productsGrid");

  const empty =
    $("emptyState");

  const count =
    $("resultCount");

  if(!grid)return;

  const list =
    getVisibleProducts();

  grid.innerHTML = "";

  if(count){

    count.textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;

  }

  if(!list.length){

    empty?.classList.add("show");

    return;

  }

  empty?.classList.remove("show");

  list.forEach(product => {

    const rating =
      averageRating(product.id);

    const favorite =
      favorites.includes(product.id);

    const card =
      document.createElement("article");

    card.className =
      "card page-enter";

    card.dataset.productId =
      product.id;

    card.innerHTML = `

      <button
        class="favorite ${favorite ? "active" : ""}"
        data-favorite="${escapeHTML(product.id)}"
        aria-label="Favori"
      >
        ${favorite ? "♥" : "♡"}
      </button>

      <div class="card-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

      </div>

      <div class="card-body">

        <div class="card-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="card-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          <span class="stars">
            ${starsHTML(rating)}
          </span>

          ${
            rating
              ? rating.toFixed(1)
              : "Nouveau"
          }
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button
            data-view="${escapeHTML(product.id)}"
          >
            Voir
          </button>

          <button
            class="add"
            data-add="${escapeHTML(product.id)}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const image =
      card.querySelector("img");

    image.addEventListener(
      "error",
      ()=>{
        card.remove();

        updateVisibleCount();
      },
      {once:true}
    );

    grid.appendChild(card);

  });

}

function updateVisibleCount(){

  const grid =
    $("productsGrid");

  const count =
    $("resultCount");

  if(!grid || !count)return;

  const visible =
    grid.querySelectorAll(".card").length;

  count.textContent =
    `${visible} produit${visible > 1 ? "s" : ""}`;

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id){

  const index =
    favorites.indexOf(id);

  if(index === -1){

    favorites.push(id);

    toast("❤️ Ajouté aux favoris");

  }else{

    favorites.splice(
      index,
      1
    );

    toast("Favori retiré");

  }

  saveJSON(
    "novaFavorites",
    favorites
  );

  renderProducts();

}


/* =========================================================
   CART
========================================================= */

function cartCount(){

  return cart.reduce(
    (sum,item) =>
      sum + item.quantity,
    0
  );

}

function cartSubtotal(){

  return cart.reduce(
    (sum,item)=>{

      const product =
        getProduct(item.id);

      if(!product)return sum;

      return sum +
        product.price *
        item.quantity;

    },
    0
  );

}

function addToCart(id){

  const product =
    getProduct(id);

  if(!product)return;

  const existing =
    cart.find(
      item =>
        item.id === id
    );

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id,
      quantity:1
    });

  }

  saveJSON(
    "novaCart",
    cart
  );

  renderCart();

  toast(
    `🛒 ${product.name} ajouté`
  );

  animateCart();

}

function removeFromCart(id){

  cart =
    cart.filter(
      item =>
        item.id !== id
    );

  saveJSON(
    "novaCart",
    cart
  );

  renderCart();

}

function changeQuantity(
  id,
  amount
){

  const item =
    cart.find(
      x => x.id === id
    );

  if(!item)return;

  item.quantity +=
    amount;

  if(item.quantity <= 0){

    removeFromCart(id);

    return;

  }

  saveJSON(
    "novaCart",
    cart
  );

  renderCart();

}

function renderCart(){

  const container =
    $("cartItems");

  const count =
    $("cartCount");

  const subtotal =
    $("cartSubtotal");

  if(count){

    count.textContent =
      cartCount();

  }

  if(subtotal){

    subtotal.textContent =
      money(
        cartSubtotal()
      );

  }

  if(!container)return;

  if(!cart.length){

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:50px 15px;
        color:var(--muted)
      ">
        <div style="font-size:45px">
          🛒
        </div>

        <h3 style="
          margin-top:10px;
          color:var(--text)
        ">
          Votre panier est vide
        </h3>

        <p style="margin-top:6px">
          Ajoutez un produit pour commencer.
        </p>
      </div>
    `;

    return;

  }

  container.innerHTML = "";

  cart.forEach(item => {

    const product =
      getProduct(item.id);

    if(!product)return;

    const row =
      document.createElement("div");

    row.className =
      "cart-item";

    row.innerHTML = `

      <img
        src="${product.image}"
        alt=""
      >

      <div>

        <h4>
          ${escapeHTML(product.name)}
        </h4>

        <p>
          ${money(product.price)}
        </p>

        <div class="qty">

          <button
            data-minus="${product.id}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            data-plus="${product.id}"
          >
            +
          </button>

        </div>

      </div>

      <button
        data-remove="${product.id}"
        class="close"
      >
        🗑️
      </button>

    `;

    container.appendChild(row);

  });

}

function openCart(){

  renderCart();

  $("cartDrawer")
    ?.classList.add("open");

  $("overlay")
    ?.classList.add("show");

  document.body.style.overflow =
    "hidden";

}

function closeCart(){

  $("cartDrawer")
    ?.classList.remove("open");

  if(
    !document.querySelector(
      ".modal.show"
    )
  ){

    $("overlay")
      ?.classList.remove("show");

    document.body.style.overflow =
      "";

  }

}

function animateCart(){

  const button =
    $("cartButton");

  if(!button)return;

  button.animate(
    [
      {
        transform:"scale(1)"
      },
      {
        transform:"scale(1.18)"
      },
      {
        transform:"scale(.95)"
      },
      {
        transform:"scale(1)"
      }
    ],
    {
      duration:430,
      easing:"cubic-bezier(.2,.8,.2,1)"
    }
  );

}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function openProduct(id){

  currentProduct =
    getProduct(id);

  if(!currentProduct)return;

  renderProductDetail(id);

  openModal(
    "productModal"
  );

}

function renderProductDetail(id){

  const product =
    getProduct(id);

  const container =
    $("productDetail");

  const title =
    $("productModalTitle");

  if(!product || !container)return;

  currentProduct =
    product;

  if(title){

    title.textContent =
      product.name;

  }

  const rating =
    averageRating(product.id);

  const list =
    productReviews(product.id);

  let reviewsHTML =
    "";

  list.forEach(review => {

    reviewsHTML += `

      <div class="review">

        <div class="review-head">

          <span class="review-user">
            ${escapeHTML(review.userName)}
          </span>

          <span class="review-date">
            ${escapeHTML(review.date)}
          </span>

        </div>

        <div class="stars">
          ${starsHTML(review.rating)}
        </div>

        <div class="review-text">
          ${escapeHTML(review.comment)}
        </div>

      </div>

    `;

  });

  container.innerHTML = `

    <div class="product-detail">

      <div class="product-detail-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div>

        <div
          class="card-category"
        >
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">
          <span class="stars">
            ${starsHTML(rating)}
          </span>

          ${
            rating
              ? rating.toFixed(1)
              : "Aucun avis"
          }
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <div class="detail-description">
          ${escapeHTML(product.description)}
        </div>

        <button
          id="detailAddButton"
          class="primary"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

    <div style="margin-top:28px">

      <h3 style="margin-bottom:12px">
        ⭐ Avis clients
      </h3>

      <div id="reviewsContainer">

        ${
          reviewsHTML ||
          `<div class="message">
            Aucun avis pour le moment.
          </div>`
        }

      </div>

      <div
        style="
          margin-top:20px;
          border-top:1px solid var(--border);
          padding-top:20px
        "
      >

        <h3 style="margin-bottom:12px">
          Laisser un avis
        </h3>

        <form
          id="reviewForm"
          class="form"
        >

          <div class="field">

            <label>Note</label>

            <select
              id="reviewRating"
              required
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>

          </div>

          <div class="field">

            <label>Commentaire</label>

            <textarea
              id="reviewComment"
              rows="4"
              maxlength="500"
              required
            ></textarea>

          </div>

          <button
            class="primary"
            type="submit"
          >
            Publier l'avis
          </button>

        </form>

      </div>

    </div>

  `;

  $("detailAddButton")
    ?.addEventListener(
      "click",
      ()=>{
        addToCart(product.id);
      }
    );

  $("reviewForm")
    ?.addEventListener(
      "submit",
      handleReview
    );

}

function handleReview(event){

  event.preventDefault();

  if(!currentUser){

    toast(
      "Connecte-toi pour laisser un avis."
    );

    closeModal(
      "productModal"
    );

    openModal(
      "authModal"
    );

    return;

  }

  if(!currentProduct)return;

  const already =
    reviews.some(
      review =>
        review.productId
        === currentProduct.id &&
        review.userId
        === currentUser.uid
    );

  if(already){

    toast(
      "Tu as déjà laissé un avis."
    );

    return;

  }

  const rating =
    Number(
      $("reviewRating").value
    );

  const comment =
    $("reviewComment")
      .value
      .trim();

  if(!comment)return;

  const rawName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Utilisateur";

  const shortName =
    rawName
      .replace(/\s+/g,"")
      .slice(0,3);

  reviews.push({

    id:uid("review"),

    productId:
      currentProduct.id,

    userId:
      currentUser.uid,

    userName:
      shortName + "***",

    rating,

    comment,

    date:
      new Date()
        .toLocaleDateString(
          "fr-FR"
        )

  });

  saveJSON(
    "novaReviews",
    reviews
  );

  renderProductDetail(
    currentProduct.id
  );

  renderProducts();

  toast(
    "⭐ Avis publié"
  );

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!cart.length){

    toast(
      "Ton panier est vide."
    );

    return;

  }

  if(!currentUser){

    closeCart();

    showLogin();

    openModal(
      "authModal"
    );

    toast(
      "Connecte-toi avant de commander."
    );

    return;

  }

  currentPromo =
    null;

  if($("promoCode")){
    $("promoCode").value =
      "";
  }

  renderCheckout();

  closeCart();

  openModal(
    "checkoutModal"
  );

}

function renderCheckout(){

  const items =
    $("checkoutItems");

  if(!items)return;

  items.innerHTML =
    cart.map(item => {

      const product =
        getProduct(item.id);

      if(!product)return "";

      return `

        <div class="summary-row">

          <span>
            ${escapeHTML(product.name)}
            × ${item.quantity}
          </span>

          <strong>
            ${money(
              product.price *
              item.quantity
            )}
          </strong>

        </div>

      `;

    }).join("");

  updateCheckoutTotals();

}

function updateCheckoutTotals(){

  const subtotal =
    cartSubtotal();

  let discount =
    0;

  if(currentPromo){

    discount =
      subtotal *
      (
        currentPromo.percent /
        100
      );

  }

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  if($("checkoutSubtotal")){

    $("checkoutSubtotal")
      .textContent =
      money(subtotal);

  }

  if($("checkoutDiscount")){

    $("checkoutDiscount")
      .textContent =
      "-" + money(discount);

  }

  if($("checkoutTotal")){

    $("checkoutTotal")
      .textContent =
      money(total);

  }

}

function applyPromo(){

  const input =
    $("promoCode");

  const message =
    $("promoMessage");

  if(!input || !message)return;

  const code =
    input.value
      .trim()
      .toUpperCase();

  if(!code){

    currentPromo =
      null;

    message.className =
      "message error";

    message.textContent =
      "Entre un code promo.";

    updateCheckoutTotals();

    return;

  }

  if(
    Object.prototype.hasOwnProperty.call(
      PROMO_CODES,
      code
    )
  ){

    currentPromo = {

      code,

      percent:
        PROMO_CODES[code]

    };

    message.className =
      "message success";

    message.textContent =
      `Code ${code} appliqué : -${PROMO_CODES[code]}%.`;

    updateCheckoutTotals();

    return;

  }

  currentPromo =
    null;

  message.className =
    "message error";

  message.textContent =
    "Code promo invalide.";

  updateCheckoutTotals();

}


/* =========================================================
   ADDRESS FORMAT CHECK
========================================================= */

function validateAddress(){

  const fullName =
    $("fullName")?.value.trim();

  const address =
    $("address")?.value.trim();

  const postal =
    $("postalCode")?.value.trim();

  const city =
    $("city")?.value.trim();

  const country =
    $("country")?.value;

  const status =
    $("addressStatus");

  if(!status)return false;

  if(
    !fullName ||
    !address ||
    !postal ||
    !city ||
    !country
  ){

    status.className =
      "address-status bad";

    status.textContent =
      "❌ Tous les champs d'adresse sont obligatoires.";

    return false;

  }

  let postalOK =
    false;

  if(country === "FR"){

    postalOK =
      /^\d{5}$/.test(
        postal
      );

  }else{

    postalOK =
      /^[A-Za-z0-9 -]{3,10}$/.test(
        postal
      );

  }

  if(!postalOK){

    status.className =
      "address-status bad";

    status.textContent =
      "❌ Le format du code postal est incorrect.";

    return false;

  }

  if(address.length < 4){

    status.className =
      "address-status bad";

    status.textContent =
      "❌ L'adresse est trop courte.";

    return false;

  }

  if(city.length < 2){

    status.className =
      "address-status bad";

    status.textContent =
      "❌ La ville est incorrecte.";

    return false;

  }

  status.className =
    "address-status ok";

  status.textContent =
    "✅ Format d'adresse accepté.";

  return true;

}


/* =========================================================
   PAYPAL.ME
========================================================= */

function openPayPal(amount){

  const cleanAmount =
    Number(
      amount.toFixed(2)
    );

  const url =
    `${PAYPAL_ME}/${encodeURIComponent(cleanAmount.toFixed(2))}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   CREATE ORDER
========================================================= */

function createDemoOrder(){

  const subtotal =
    cartSubtotal();

  let discount =
    0;

  if(currentPromo){

    discount =
      subtotal *
      (
        currentPromo.percent /
        100
      );

  }

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  const order = {

    id:
      "NOVA-" +
      Math.random()
        .toString(36)
        .slice(2,8)
        .toUpperCase(),

    userId:
      currentUser.uid,

    email:
      currentUser.email || "",

    customer:
      $("fullName").value.trim(),

    address:
      $("address").value.trim(),

    postalCode:
      $("postalCode").value.trim(),

    city:
      $("city").value.trim(),

    country:
      $("country").value,

    items:
      cart.map(item => {

        const product =
          getProduct(item.id);

        return {

          id:item.id,

          name:
            product.name,

          price:
            product.price,

          quantity:
            item.quantity

        };

      }),

    subtotal,

    discount,

    total,

    promo:
      currentPromo?.code || null,

    payment:
      "PayPal.Me",

    date:
      new Date()
        .toISOString(),

    status:
      "En attente de confirmation"

  };

  orders.push(order);

  saveJSON(
    "novaOrders",
    orders
  );

  return order;

}/* =========================================================
   COMMANDES
========================================================= */

function getUserOrders(){

  if(!currentUser)return [];

  return orders.filter(
    order =>
      order.userId === currentUser.uid
  );

}

function renderOrders(){

  const container =
    $("ordersList");

  if(!container)return;

  const userOrders =
    getUserOrders();

  if(!userOrders.length){

    container.innerHTML = `
      <div class="empty-orders">
        <div class="empty-icon">📦</div>
        <h3>Aucune commande</h3>
        <p>Vos commandes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    userOrders
      .slice()
      .reverse()
      .map(order => {

        const date =
          new Date(order.date)
            .toLocaleString(
              "fr-FR"
            );

        return `

          <div class="order-card">

            <div class="order-top">

              <div>

                <strong>
                  ${escapeHTML(order.id)}
                </strong>

                <span>
                  ${escapeHTML(date)}
                </span>

              </div>

              <span class="order-status">
                ${escapeHTML(order.status)}
              </span>

            </div>

            <div class="order-products">

              ${
                order.items
                  .map(item => `
                    <div class="order-product">

                      <span>
                        ${escapeHTML(item.name)}
                        × ${item.quantity}
                      </span>

                      <strong>
                        ${money(
                          item.price *
                          item.quantity
                        )}
                      </strong>

                    </div>
                  `)
                  .join("")
              }

            </div>

            <div class="order-bottom">

              <strong>
                Total :
                ${money(order.total)}
              </strong>

              <button
                class="secondary"
                data-invoice="${escapeHTML(order.id)}"
              >
                🧾 Facture
              </button>

            </div>

          </div>

        `;

      })
      .join("");

}


/* =========================================================
   FACTURE
========================================================= */

function openInvoice(orderId){

  const order =
    orders.find(
      item =>
        item.id === orderId
    );

  if(!order)return;

  if(
    currentUser &&
    order.userId !== currentUser.uid &&
    currentUser.email?.toLowerCase()
      !== ADMIN_EMAIL.toLowerCase()
  ){

    toast(
      "Commande inaccessible."
    );

    return;

  }

  const container =
    $("invoiceContent");

  if(!container)return;

  const date =
    new Date(order.date)
      .toLocaleDateString(
        "fr-FR"
      );

  const rows =
    order.items
      .map(item => `

        <tr>

          <td>
            ${escapeHTML(item.name)}
          </td>

          <td>
            ${item.quantity}
          </td>

          <td>
            ${money(item.price)}
          </td>

          <td>
            ${money(
              item.price *
              item.quantity
            )}
          </td>

        </tr>

      `)
      .join("");

  container.innerHTML = `

    <div class="invoice">

      <div class="invoice-header">

        <div>

          <div class="invoice-logo">
            NOVASHOP
          </div>

          <p>
            Marketplace gaming
          </p>

        </div>

        <div class="invoice-meta">

          <strong>FACTURE</strong>

          <span>
            ${escapeHTML(order.id)}
          </span>

          <span>
            ${escapeHTML(date)}
          </span>

        </div>

      </div>


      <div class="invoice-grid">

        <div>

          <small>
            CLIENT
          </small>

          <strong>
            ${escapeHTML(order.customer)}
          </strong>

          <span>
            ${escapeHTML(order.email)}
          </span>

        </div>


        <div>

          <small>
            LIVRAISON
          </small>

          <span>
            ${escapeHTML(order.address)}
          </span>

          <span>
            ${escapeHTML(order.postalCode)}
            ${escapeHTML(order.city)}
          </span>

          <span>
            ${escapeHTML(order.country)}
          </span>

        </div>

      </div>


      <table class="invoice-table">

        <thead>

          <tr>

            <th>Produit</th>
            <th>Qté</th>
            <th>Prix</th>
            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          ${rows}

        </tbody>

      </table>


      <div class="invoice-total">

        <div>

          <span>Sous-total</span>

          <strong>
            ${money(order.subtotal)}
          </strong>

        </div>

        <div>

          <span>Réduction</span>

          <strong>
            -${money(order.discount)}
          </strong>

        </div>

        <div class="grand">

          <span>Total payé</span>

          <strong>
            ${money(order.total)}
          </strong>

        </div>

      </div>


      <div class="invoice-payment">

        <strong>
          Mode de paiement
        </strong>

        <span>
          ${escapeHTML(order.payment)}
        </span>

      </div>


      <div class="invoice-footer">

        Merci pour votre commande sur NOVASHOP.

      </div>

    </div>

  `;

  openModal(
    "invoiceModal"
  );

}


/* =========================================================
   CHECKOUT PAYMENT
========================================================= */

async function processPayment(){

  if(!currentUser){

    toast(
      "Connexion requise."
    );

    return;

  }

  if(!validateAddress()){

    toast(
      "❌ Vérifie ton adresse."
    );

    return;

  }

  if(!currentPromo){

    toast(
      "❌ Un code promo valide est requis."
    );

    return;

  }

  const subtotal =
    cartSubtotal();

  const discount =
    subtotal *
    (
      currentPromo.percent /
      100
    );

  const total =
    Math.max(
      0,
      subtotal - discount
    );


  /*
    NOVA100 = commande gratuite.
    Les autres codes réduisent le prix,
    mais ne simulent pas un paiement réel.
  */

  if(total > 0){

    openPayPal(total);

    toast(
      "💳 PayPal.Me ouvert. Le paiement doit être effectué sur PayPal."
    );

    return;

  }


  const button =
    $("payButton");

  if(button){

    button.disabled =
      true;

    button.textContent =
      "Création de la commande…";

  }


  await new Promise(
    resolve =>
      setTimeout(
        resolve,
        700
      )
  );


  const order =
    createDemoOrder();


  cart = [];

  currentPromo =
    null;

  saveJSON(
    "novaCart",
    cart
  );


  renderCart();


  if(button){

    button.disabled =
      false;

    button.textContent =
      "Valider la commande";

  }


  closeModal(
    "checkoutModal"
  );


  renderOrders();


  openInvoice(
    order.id
  );


  toast(
    "✅ Commande créée"
  );

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function isAdmin(){

  return !!(
    currentUser &&
    currentUser.email &&
    currentUser.email
      .toLowerCase()
      === ADMIN_EMAIL.toLowerCase()
  );

}

function openDashboard(){

  if(!isAdmin()){

    toast(
      "Accès administrateur refusé."
    );

    return;

  }

  renderDashboard();

  openModal(
    "dashboardModal"
  );

}

function renderDashboard(){

  if(!isAdmin())return;


  const adminOrders =
    $("adminOrdersCount");

  const adminFree =
    $("adminFreeOrders");

  const adminValue =
    $("adminCatalogValue");

  const table =
    $("adminOrdersTable");

  const promos =
    $("adminPromoCodes");


  if(adminOrders){

    adminOrders.textContent =
      orders.length;

  }


  if(adminFree){

    adminFree.textContent =
      orders.filter(
        order =>
          Number(order.total) === 0
      ).length;

  }


  if(adminValue){

    const catalogValue =
      PRODUCTS.reduce(
        (sum,product) =>
          sum + product.price,
        0
      );

    adminValue.textContent =
      money(catalogValue);

  }


  if(promos){

    promos.innerHTML = `

      <div class="promo-admin">

        <div>

          <strong>
            NOVA100
          </strong>

          <span>
            100% de réduction
          </span>

        </div>

        <code>
          NOVA100
        </code>

      </div>

      <div class="promo-admin">

        <div>

          <strong>
            NOVA20
          </strong>

          <span>
            20% de réduction
          </span>

        </div>

        <code>
          NOVA20
        </code>

      </div>

      <div class="promo-admin">

        <div>

          <strong>
            NOVA10
          </strong>

          <span>
            10% de réduction
          </span>

        </div>

        <code>
          NOVA10
        </code>

      </div>

    `;

  }


  if(!table)return;


  if(!orders.length){

    table.innerHTML = `
      <div class="message">
        Aucune commande.
      </div>
    `;

    return;

  }


  table.innerHTML = `

    <div class="admin-table-wrap">

      <table class="admin-table">

        <thead>

          <tr>

            <th>Commande</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
            <th></th>

          </tr>

        </thead>

        <tbody>

          ${
            orders
              .slice()
              .reverse()
              .map(order => `

                <tr>

                  <td>
                    <strong>
                      ${escapeHTML(order.id)}
                    </strong>
                  </td>

                  <td>

                    ${escapeHTML(order.customer)}

                    <small>
                      ${escapeHTML(order.email)}
                    </small>

                  </td>

                  <td>
                    ${escapeHTML(
                      new Date(order.date)
                        .toLocaleDateString(
                          "fr-FR"
                        )
                    )}
                  </td>

                  <td>
                    ${money(order.total)}
                  </td>

                  <td>
                    <span class="status-pill">
                      ${escapeHTML(order.status)}
                    </span>
                  </td>

                  <td>

                    <button
                      class="secondary"
                      data-admin-invoice="${escapeHTML(order.id)}"
                    >
                      Facture
                    </button>

                  </td>

                </tr>

              `)
              .join("")
          }

        </tbody>

      </table>

    </div>

  `;

}


/* =========================================================
   ADMIN LOGIN CODE
========================================================= */

function verifyAdminCode(){

  if(!isAdmin()){

    toast(
      "Connecte-toi avec le compte administrateur."
    );

    return;

  }

  const input =
    $("adminCode");

  const panel =
    $("adminPanel");

  const loginPanel =
    $("adminLoginPanel");

  if(!input)return;

  if(
    input.value.trim()
    !== ADMIN_CODE
  ){

    toast(
      "❌ Code dashboard incorrect."
    );

    input.value = "";

    input.focus();

    return;

  }

  if(loginPanel){

    loginPanel.classList.add(
      "hidden"
    );

  }

  if(panel){

    panel.classList.remove(
      "hidden"
    );

  }

  renderDashboard();

  toast(
    "🔐 Dashboard administrateur ouvert."
  );

}


/* =========================================================
   AUTHENTICATION
========================================================= */

async function loginWithEmail(){

  const email =
    $("loginEmail")
      ?.value
      .trim();

  const password =
    $("loginPassword")
      ?.value;

  if(!email || !password){

    toast(
      "Remplis les deux champs."
    );

    return;

  }

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal(
      "authModal"
    );

    toast(
      "✅ Connexion réussie"
    );

  }catch(error){

    console.error(
      error
    );

    toast(
      firebaseErrorMessage(
        error
      )
    );

  }

}


async function signupWithEmail(){

  const email =
    $("signupEmail")
      ?.value
      .trim();

  const phone =
    $("signupPhone")
      ?.value
      .trim();

  const password =
    $("signupPassword")
      ?.value;

  const confirmation =
    $("signupPasswordConfirm")
      ?.value;


  if(
    !email ||
    !phone ||
    !password ||
    !confirmation
  ){

    toast(
      "Tous les champs sont obligatoires."
    );

    return;

  }


  if(
    password !== confirmation
  ){

    toast(
      "Les mots de passe ne correspondent pas."
    );

    return;

  }


  if(password.length < 6){

    toast(
      "Le mot de passe doit contenir au moins 6 caractères."
    );

    return;

  }


  try{

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    /*
      Le numéro est conservé localement
      pour le profil de démonstration.

      Une vraie vérification SMS nécessite
      Firebase Phone Authentication +
      RecaptchaVerifier.
    */

    localStorage.setItem(
      "novaPhone_" +
      credential.user.uid,
      phone
    );


    await updateProfile(
      credential.user,
      {
        displayName:
          email.split("@")[0]
      }
    );


    closeModal(
      "authModal"
    );


    toast(
      "🎉 Compte créé"
    );


  }catch(error){

    console.error(
      error
    );

    toast(
      firebaseErrorMessage(
        error
      )
    );

  }

}


async function loginGoogle(){

  try{

    await signInWithPopup(
      auth,
      googleProvider
    );

    closeModal(
      "authModal"
    );

    toast(
      "✅ Connexion Google réussie"
    );

  }catch(error){

    console.error(
      error
    );

    toast(
      firebaseErrorMessage(
        error
      )
    );

  }

}


async function logout(){

  try{

    await signOut(
      auth
    );

    closeAll();

    toast(
      "👋 Déconnexion effectuée"
    );

  }catch(error){

    console.error(
      error
    );

  }

}


/* =========================================================
   FIREBASE ERROR TRANSLATION
========================================================= */

function firebaseErrorMessage(error){

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "❌ E-mail ou mot de passe incorrect.",

    "auth/invalid-email":
      "❌ Adresse e-mail incorrecte.",

    "auth/email-already-in-use":
      "❌ Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "❌ Mot de passe trop faible.",

    "auth/popup-closed-by-user":
      "❌ Fenêtre Google fermée.",

    "auth/popup-blocked":
      "❌ Le navigateur a bloqué la fenêtre Google.",

    "auth/unauthorized-domain":
      "❌ Ajoute codelol-system.github.io aux domaines autorisés Firebase.",

    "auth/api-key-not-valid":
      "❌ La clé API Firebase est refusée par le projet.",

    "auth/network-request-failed":
      "❌ Problème réseau.",

    "auth/operation-not-allowed":
      "❌ Cette méthode de connexion n'est pas activée dans Firebase."

  };

  return (
    messages[code] ||
    "❌ Erreur de connexion Firebase."
  );

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user || null;


    updateAdminButton();


    const accountButton =
      $("accountButton");

    const ordersButton =
      $("ordersButton");


    if(currentUser){

      if(accountButton){

        accountButton.innerHTML =
          "👤 " +
          escapeHTML(
            currentUser.displayName ||
            currentUser.email
              ?.split("@")[0] ||
            "Compte"
          );

      }

      if(ordersButton){

        ordersButton.hidden =
          false;

      }

    }else{

      if(accountButton){

        accountButton.innerHTML =
          "👤 Compte";

      }

      if(ordersButton){

        ordersButton.hidden =
          true;

      }

    }


    renderAccount();

  }
);


/* =========================================================
   SEARCH
========================================================= */

function executeSearch(){

  currentSearch =
    $("searchInput")
      ?.value
      .trim() ||
    "";

  renderProducts();

  $("productsSection")
    ?.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

}


/* =========================================================
   CATEGORY
========================================================= */

function selectCategory(category){

  currentCategory =
    category;

  document
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.category
          === category
      );

    });

  renderProducts();

}


/* =========================================================
   SETTINGS DRAWER
========================================================= */

function openSettings(){

  openModal(
    "settingsModal"
  );

}


/* =========================================================
   FAVORITES PAGE
========================================================= */

function showFavorites(){

  const list =
    PRODUCTS.filter(
      product =>
        favorites.includes(
          product.id
        )
    );

  const grid =
    $("productsGrid");

  if(!grid)return;

  currentSearch = "";

  currentCategory =
    "Tous";

  grid.innerHTML = "";

  $("resultCount").textContent =
    `${list.length} favori${list.length > 1 ? "s" : ""}`;

  if(!list.length){

    $("emptyState")
      ?.classList.add(
        "show"
      );

    return;

  }

  $("emptyState")
    ?.classList.remove(
      "show"
    );

  list.forEach(product => {

    const rating =
      averageRating(product.id);

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "card page-enter";

    card.dataset.productId =
      product.id;

    card.innerHTML = `

      <button
        class="favorite active"
        data-favorite="${product.id}"
      >
        ♥
      </button>

      <div class="card-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div class="card-body">

        <div class="card-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="card-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">

          <span class="stars">
            ${starsHTML(rating)}
          </span>

          ${
            rating
              ? rating.toFixed(1)
              : "Nouveau"
          }

        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button
            data-view="${product.id}"
          >
            Voir
          </button>

          <button
            class="add"
            data-add="${product.id}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>

    `;

    grid.appendChild(card);

  });

}


/* =========================================================
   EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const target =
      event.target;


    const add =
      target.closest(
        "[data-add]"
      );

    if(add){

      addToCart(
        add.dataset.add
      );

      return;

    }


    const view =
      target.closest(
        "[data-view]"
      );

    if(view){

      openProduct(
        view.dataset.view
      );

      return;

    }


    const favorite =
      target.closest(
        "[data-favorite]"
      );

    if(favorite){

      toggleFavorite(
        favorite.dataset.favorite
      );

      return;

    }


    const plus =
      target.closest(
        "[data-plus]"
      );

    if(plus){

      changeQuantity(
        plus.dataset.plus,
        1
      );

      return;

    }


    const minus =
      target.closest(
        "[data-minus]"
      );

    if(minus){

      changeQuantity(
        minus.dataset.minus,
        -1
      );

      return;

    }


    const remove =
      target.closest(
        "[data-remove]"
      );

    if(remove){

      removeFromCart(
        remove.dataset.remove
      );

      return;

    }


    const invoice =
      target.closest(
        "[data-invoice]"
      );

    if(invoice){

      openInvoice(
        invoice.dataset.invoice
      );

      return;

    }


    const adminInvoice =
      target.closest(
        "[data-admin-invoice]"
      );

    if(adminInvoice){

      openInvoice(
        adminInvoice.dataset.adminInvoice
      );

      return;

    }


    const category =
      target.closest(
        "[data-category]"
      );

    if(
      category &&
      !category.closest(
        "#settingsModal"
      )
    ){

      selectCategory(
        category.dataset.category
      );

      return;

    }

  }
);


/* =========================================================
   BASIC BUTTON EVENTS
========================================================= */

$("accountButton")
  ?.addEventListener(
    "click",
    openAccount
  );


$("ordersButton")
  ?.addEventListener(
    "click",
    ()=>{

      if(!currentUser){

        openAccount();

        return;

      }

      renderOrders();

      openModal(
        "ordersModal"
      );

    }
  );


$("adminButton")
  ?.addEventListener(
    "click",
    openDashboard
  );


$("cartButton")
  ?.addEventListener(
    "click",
    openCart
  );


$("closeCartButton")
  ?.addEventListener(
    "click",
    closeCart
  );


$("overlay")
  ?.addEventListener(
    "click",
    closeAll
  );


$("closeAuthButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "authModal"
      );
    }
  );


$("closeAccountButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "accountModal"
      );
    }
  );


$("closeProductButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "productModal"
      );
    }
  );


$("closeCheckoutButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "checkoutModal"
      );
    }
  );


$("closeOrdersButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "ordersModal"
      );
    }
  );


$("closeInvoiceButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "invoiceModal"
      );
    }
  );


$("closeDashboardButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "dashboardModal"
      );
    }
  );


$("closeSettingsButton")
  ?.addEventListener(
    "click",
    ()=>{
      closeModal(
        "settingsModal"
      );
    }
  );


$("loginTab")
  ?.addEventListener(
    "click",
    showLogin
  );


$("signupTab")
  ?.addEventListener(
    "click",
    showSignup
  );


$("loginForm")
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      loginWithEmail();

    }
  );


$("signupForm")
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      signupWithEmail();

    }
  );


$("googleLoginButton")
  ?.addEventListener(
    "click",
    loginGoogle
  );


$("googleSignupButton")
  ?.addEventListener(
    "click",
    loginGoogle
  );


$("logoutButton")
  ?.addEventListener(
    "click",
    logout
  );


$("accountOrdersButton")
  ?.addEventListener(
    "click",
    ()=>{

      closeModal(
        "accountModal"
      );

      renderOrders();

      openModal(
        "ordersModal"
      );

    }
  );


$("accountFavoritesButton")
  ?.addEventListener(
    "click",
    ()=>{

      closeModal(
        "accountModal"
      );

      showFavorites();

      $("productsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );


$("searchButton")
  ?.addEventListener(
    "click",
    executeSearch
  );


$("searchInput")
  ?.addEventListener(
    "keydown",
    event => {

      if(
        event.key === "Enter"
      ){

        executeSearch();

      }

    }
  );


$("sortSelect")
  ?.addEventListener(
    "change",
    event => {

      currentSort =
        event.target.value;

      renderProducts();

    }
  );


$("heroShopButton")
  ?.addEventListener(
    "click",
    ()=>{

      $("productsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );


$("heroCategoryButton")
  ?.addEventListener(
    "click",
    ()=>{

      selectCategory(
        "Composants"
      );

      $("productsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );


$("applyPromoButton")
  ?.addEventListener(
    "click",
    applyPromo
  );


$("payButton")
  ?.addEventListener(
    "click",
    processPayment
  );


$("adminLoginButton")
  ?.addEventListener(
    "click",
    verifyAdminCode
  );


$("adminCode")
  ?.addEventListener(
    "keydown",
    event => {

      if(
        event.key === "Enter"
      ){

        verifyAdminCode();

      }

    }
  );


$("printInvoiceButton")
  ?.addEventListener(
    "click",
    ()=>{
      window.print();
    }
  );


$("darkModeToggle")
  ?.addEventListener(
    "click",
    toggleDarkMode
  );


$("soundToggle")
  ?.addEventListener(
    "click",
    toggleSound
  );


$("languageSelect")
  ?.addEventListener(
    "change",
    event =>
      setLanguage(
        event.target.value
      )
  );


$("settingsButton")
  ?.addEventListener(
    "click",
    openSettings
  );


/* =========================================================
   FOOTER
========================================================= */

$("footerAccountButton")
  ?.addEventListener(
    "click",
    openAccount
  );


$("footerOrdersButton")
  ?.addEventListener(
    "click",
    ()=>{

      if(!currentUser){

        openAccount();

        return;

      }

      renderOrders();

      openModal(
        "ordersModal"
      );

    }
  );


$("footerCartButton")
  ?.addEventListener(
    "click",
    openCart
  );


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Escape"
    ){

      closeAll();

    }

  }
);


/* =========================================================
   INIT
========================================================= */

applySettings();

renderProducts();

renderCart();

updateAdminButton();

console.log(
  "%cNOVASHOP%c chargé",
  "font-weight:900;font-size:20px",
  "font-weight:400"
);

console.log(
  "Admin:",
  ADMIN_EMAIL
);

console.log(
  "PayPal.Me:",
  PAYPAL_ME
);/* =========================================================
   PARTIE 4/4
   FINALISATION NOVASHOP
========================================================= */


/* =========================================================
   ACCESSIBILITÉ + FERMETURE DES MODALES
========================================================= */

document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if(
          event.target === modal
        ){

          closeModal(
            modal.id
          );

        }

      }
    );

  });


/* =========================================================
   MODAL OPEN / CLOSE ROBUSTE
========================================================= */

function refreshOverlay(){

  const opened =
    document.querySelector(
      ".modal.open, .drawer.open"
    );

  const overlay =
    $("overlay");

  if(overlay){

    overlay.classList.toggle(
      "show",
      !!opened
    );

  }

  document.body.classList.toggle(
    "modal-open",
    !!opened
  );

}


const originalOpenModal =
  window.openModal;

window.openModal =
  function(id){

    if(
      typeof originalOpenModal ===
      "function"
    ){

      originalOpenModal(id);

    }

    refreshOverlay();

  };


const originalCloseModal =
  window.closeModal;

window.closeModal =
  function(id){

    if(
      typeof originalCloseModal ===
      "function"
    ){

      originalCloseModal(id);

    }

    refreshOverlay();

  };


/* =========================================================
   INTERACTIONS CLAVIER
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "/" &&
      document.activeElement?.tagName
        !== "INPUT" &&
      document.activeElement?.tagName
        !== "TEXTAREA"
    ){

      event.preventDefault();

      $("searchInput")
        ?.focus();

    }

  }
);


/* =========================================================
   CART DRAWER
========================================================= */

function syncCartUI(){

  renderCart();

  updateCartCount();

}


function updateCartCount(){

  const count =
    cart.reduce(
      (total,item) =>
        total + item.quantity,
      0
    );

  const cartCount =
    $("cartCount");

  if(cartCount){

    cartCount.textContent =
      count;

    cartCount.classList.toggle(
      "has-items",
      count > 0
    );

  }

}


/* =========================================================
   FAVORITES COUNT
========================================================= */

function updateFavoriteCount(){

  const count =
    favorites.length;

  document
    .querySelectorAll(
      "[data-favorite-count]"
    )
    .forEach(element => {

      element.textContent =
        count;

    });

}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
  "storage",
  event => {

    if(
      event.key === "novaCart"
    ){

      cart =
        loadJSON(
          "novaCart",
          []
        );

      syncCartUI();

    }


    if(
      event.key === "novaFavorites"
    ){

      favorites =
        loadJSON(
          "novaFavorites",
          []
        );

      updateFavoriteCount();

      renderProducts();

    }


    if(
      event.key === "novaOrders"
    ){

      orders =
        loadJSON(
          "novaOrders",
          []
        );

      renderOrders();

    }

  }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
  "error",
  event => {

    const image =
      event.target;

    if(
      !(image instanceof HTMLImageElement)
    ){

      return;

    }

    if(
      image.dataset.handled === "true"
    ){

      return;

    }

    image.dataset.handled =
      "true";


    const card =
      image.closest(
        ".card"
      );

    if(card){

      /*
        Si l'image d'un produit
        n'est pas disponible,
        le produit est retiré
        de l'affichage.
      */

      card.remove();

      updateVisibleProductCount();

      return;

    }


    /*
      Pour les autres images,
      on ne détruit pas toute
      l'interface.
    */

    image.style.visibility =
      "hidden";

  },
  true
);


/* =========================================================
   COMPTEUR PRODUITS VISIBLES
========================================================= */

function updateVisibleProductCount(){

  const grid =
    $("productsGrid");

  const countElement =
    $("resultCount");

  if(!grid || !countElement)return;

  const cards =
    grid.querySelectorAll(
      ".card"
    );

  countElement.textContent =
    `${cards.length} produit${cards.length > 1 ? "s" : ""}`;

  const empty =
    $("emptyState");

  if(empty){

    empty.classList.toggle(
      "show",
      cards.length === 0
    );

  }

}


/* =========================================================
   VALIDATION FORMULAIRES EN TEMPS RÉEL
========================================================= */

function markField(
  element,
  valid
){

  if(!element)return;

  element.classList.toggle(
    "valid",
    valid
  );

  element.classList.toggle(
    "invalid",
    !valid
  );

}


[
  "fullName",
  "address",
  "postalCode",
  "city",
  "country"
]
.forEach(id => {

  $(id)?.addEventListener(
    "input",
    () => {

      validateAddress();

    }
  );

});


$("promoCode")
  ?.addEventListener(
    "input",
    () => {

      currentPromo =
        null;

      const message =
        $("promoMessage");

      if(message){

        message.textContent =
          "";

        message.className =
          "promo-message";

      }

    }
  );


/* =========================================================
   AUTO FORMAT CODE PROMO
========================================================= */

$("promoCode")
  ?.addEventListener(
    "input",
    event => {

      event.target.value =
        event.target.value
          .toUpperCase()
          .replace(
            /[^A-Z0-9_-]/g,
            ""
          );

    }
  );


/* =========================================================
   NUMÉRO DE TÉLÉPHONE
========================================================= */

$("signupPhone")
  ?.addEventListener(
    "input",
    event => {

      let value =
        event.target.value;

      value =
        value.replace(
          /[^0-9+ ]/g,
          ""
        );

      event.target.value =
        value;

    }
  );


/* =========================================================
   CODE ADMIN FORMAT
========================================================= */

$("adminCode")
  ?.addEventListener(
    "input",
    event => {

      event.target.value =
        event.target.value
          .toUpperCase();

    }
  );


/* =========================================================
   PRODUCT CARD HOVER SOUND
========================================================= */

let lastHoverSound =
  0;

document.addEventListener(
  "pointerover",
  event => {

    const card =
      event.target.closest(
        ".card"
      );

    if(!card)return;

    const now =
      Date.now();

    if(
      now - lastHoverSound <
      180
    ){

      return;

    }

    lastHoverSound =
      now;

  }
);


/* =========================================================
   MOBILE MENU
========================================================= */

$("mobileMenuButton")
  ?.addEventListener(
    "click",
    () => {

      $("mobileMenu")
        ?.classList.toggle(
          "open"
        );

    }
  );


document
  .querySelectorAll(
    "#mobileMenu [data-category]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        $("mobileMenu")
          ?.classList.remove(
            "open"
          );

      }
    );

  });


/* =========================================================
   SMOOTH CATEGORY SCROLL
========================================================= */

document
  .querySelectorAll(
    ".category-pill"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        $("productsSection")
          ?.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });

      }
    );

  });


/* =========================================================
   CHECKOUT RENDER FINAL
========================================================= */

function refreshCheckout(){

  if(
    typeof renderCheckout ===
    "function"
  ){

    renderCheckout();

  }

  validateAddress();

}


/* =========================================================
   EMPÊCHE PAIEMENT SI PANIER VIDE
========================================================= */

function updatePayButton(){

  const button =
    $("payButton");

  if(!button)return;

  const hasItems =
    cart.length > 0;

  const validPromo =
    currentPromo &&
    currentPromo.percent ===
      100;

  button.disabled =
    !hasItems ||
    !validPromo;

  if(!hasItems){

    button.title =
      "Votre panier est vide";

  }else if(!validPromo){

    button.title =
      "Un code promotionnel de 100% est requis";

  }else{

    button.title =
      "Valider la commande";

  }

}


setInterval(
  updatePayButton,
  500
);


/* =========================================================
   ACCOUNT REFRESH
========================================================= */

function refreshAccount(){

  if(
    typeof renderAccount ===
    "function"
  ){

    renderAccount();

  }

}


document.addEventListener(
  "nova:account",
  refreshAccount
);


/* =========================================================
   FOCUS AUTOMATIQUE
========================================================= */

function focusFirstInput(
  modalId
){

  const modal =
    $(modalId);

  if(!modal)return;

  const input =
    modal.querySelector(
      "input:not([type='hidden']):not([disabled])"
    );

  if(input){

    setTimeout(
      () => input.focus(),
      80
    );

  }

}


[
  "authModal",
  "checkoutModal",
  "settingsModal",
  "dashboardModal"
]
.forEach(id => {

  const modal =
    $(id);

  modal?.addEventListener(
    "transitionend",
    () => {

      if(
        modal.classList.contains(
          "open"
        )
      ){

        focusFirstInput(
          id
        );

      }

    }
  );

});


/* =========================================================
   PROTECTION DASHBOARD UI
========================================================= */

function protectDashboard(){

  const button =
    $("adminButton");

  const panel =
    $("adminPanel");

  if(!isAdmin()){

    if(button){

      button.hidden =
        true;

    }

    if(panel){

      panel.classList.add(
        "hidden"
      );

    }

    return;

  }

  if(button){

    button.hidden =
      false;

  }

}


protectDashboard();


/* =========================================================
   RE-ACTUALISATION APRÈS CONNEXION
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user || null;

    protectDashboard();

    updateAdminButton();

    updateFavoriteCount();

    if(
      $("ordersModal")
        ?.classList.contains(
          "open"
        )
    ){

      renderOrders();

    }

    if(
      $("accountModal")
        ?.classList.contains(
          "open"
        )
    ){

      renderAccount();

    }

  }
);


/* =========================================================
   NETTOYAGE DES ANCIENS MODALES
========================================================= */

function cleanModalState(){

  document
    .querySelectorAll(
      ".modal.open, .drawer.open"
    )
    .forEach(element => {

      element.setAttribute(
        "aria-hidden",
        "false"
      );

    });

}


cleanModalState();


/* =========================================================
   ACCESSIBILITÉ BOUTONS
========================================================= */

document
  .querySelectorAll(
    "button"
  )
  .forEach(button => {

    if(
      !button.getAttribute(
        "type"
      )
    ){

      button.setAttribute(
        "type",
        "button"
      );

    }

  });


document
  .querySelectorAll(
    "input"
  )
  .forEach(input => {

    input.setAttribute(
      "autocomplete",
      input.type === "password"
        ? "current-password"
        : input.autocomplete || "on"
    );

  });


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if(
      document.visibilityState ===
      "visible"
    ){

      renderCart();

      updateCartCount();

      updateFavoriteCount();

      protectDashboard();

    }

  }
);


/* =========================================================
   INITIALISATION FINALE
========================================================= */

function finalInit(){

  try{

    renderProducts();

  }catch(error){

    console.error(
      "renderProducts:",
      error
    );

  }


  try{

    renderCart();

  }catch(error){

    console.error(
      "renderCart:",
      error
    );

  }


  try{

    updateCartCount();

  }catch(error){

    console.error(
      "updateCartCount:",
      error
    );

  }


  try{

    updateFavoriteCount();

  }catch(error){

    console.error(
      "updateFavoriteCount:",
      error
    );

  }


  try{

    protectDashboard();

  }catch(error){

    console.error(
      "protectDashboard:",
      error
    );

  }

}


if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    finalInit,
    {
      once:true
    }
  );

}else{

  finalInit();

}


/* =========================================================
   DEBUG NOVASHOP
========================================================= */

window.NOVASHOP =
  {

    version:
      "2026.09",

    products:
      PRODUCTS,

    getCart:
      () => cart,

    getFavorites:
      () => favorites,

    getOrders:
      () => orders,

    getCurrentUser:
      () => currentUser,

    isAdmin:
      () => isAdmin(),

    openProduct:
      id =>
        openProduct(id),

    addToCart:
      id =>
        addToCart(id),

    openCart:
      () =>
        openCart(),

    openAccount:
      () =>
        openAccount(),

    openDashboard:
      () =>
        openDashboard()

  };


/* =========================================================
   FIN
========================================================= */

console.log(
  "%c NOVASHOP ",
  "background:#111827;color:white;font-size:18px;font-weight:900;padding:8px 14px;border-radius:8px"
);

console.log(
  "%cMarketplace initialisée.",
  "font-size:13px;color:#64748b"
);
