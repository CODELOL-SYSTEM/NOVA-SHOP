import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZv5AkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
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

let confirmationResult = null;
let recaptchaVerifier = null;

/* =========================================================
   CONFIG
========================================================= */

const PAYPAL_ME = "https://paypal.me/SH0PNOVA";

const PROMOS = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};

/*
  Démo uniquement.
  Ne pas considérer ce code client comme une sécurité réelle.
  Pour un vrai dashboard admin, utiliser des droits côté serveur /
  Firebase Custom Claims.
*/
const ADMIN_CODE = "NOVA-ADMIN-2026";

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  orders: "novashop_orders",
  reviews: "novashop_reviews",
  demoUsers: "novashop_demo_users",
  adminSession: "novashop_admin_session"
};

const STATUSES = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS = [
  {
    id:"samsung-990-pro-1tb",
    brand:"Samsung",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:109.90,
    oldPrice:129.90,
    stock:17,
    promo:true,
    images:[
      "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
    ],
    description:"SSD NVMe PCIe haute performance pour gaming, système et applications.",
    rating:4.9,
    reviews:63
  },

  {
    id:"samsung-990-pro-2tb",
    brand:"Samsung",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:169.90,
    oldPrice:199.90,
    stock:13,
    promo:true,
    images:[
      "https://pc.comparer.fr/500x500/310191422.webp"
    ],
    description:"SSD NVMe 2 To pensé pour les grosses bibliothèques de jeux et les transferts rapides.",
    rating:4.9,
    reviews:72
  },

  {
    id:"corsair-rm850x",
    brand:"Corsair",
    name:"Corsair RM850x",
    category:"Alimentation",
    price:139.90,
    oldPrice:159.90,
    stock:11,
    promo:true,
    images:[
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_200,w_200,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_360,w_360,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
    ],
    description:"Alimentation entièrement modulaire Corsair RMx 850 W.",
    rating:4.8,
    reviews:48
  },

  {
    id:"corsair-frame-5000d",
    brand:"Corsair",
    name:"Corsair Frame 5000D RS ARGB Noir",
    category:"Boîtiers",
    price:159.90,
    oldPrice:179.90,
    stock:8,
    promo:true,
    images:[
      "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
    ],
    description:"Boîtier moyen tour avec verre trempé, façade Mesh et quatre ventilateurs ARGB 140 mm.",
    rating:4.8,
    reviews:46
  },

  {
    id:"arctic-liquid-freezer-pro-360",
    brand:"ARCTIC",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    oldPrice:149.90,
    stock:9,
    promo:true,
    limited:true,
    images:[
      "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
    ],
    description:"Watercooling 360 mm avec trois ventilateurs 120 mm préinstallés.",
    rating:4.8,
    reviews:29
  },

  {
    id:"samsung-odyssey-g6",
    brand:"Samsung",
    name:'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category:"Écrans",
    price:399.95,
    oldPrice:749.90,
    stock:5,
    promo:true,
    images:[
      "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
    ],
    description:"Écran gaming QD-OLED 27 pouces de la gamme Odyssey G6.",
    rating:4.9,
    reviews:33
  },

  {
    id:"elgato-wave-mic-arm-pro",
    brand:"Elgato",
    name:"Elgato Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    oldPrice:249.90,
    stock:7,
    promo:true,
    images:[
      "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
    ],
    description:"Bras microphone low-profile pour setup streaming et bureau compact.",
    rating:4.7,
    reviews:28
  },

  {
    id:"sony-dualsense-ps5",
    brand:"Sony",
    name:"Sony DualSense PS5 / PC Cosmic Red",
    category:"Manettes",
    price:74.90,
    oldPrice:84.90,
    stock:14,
    promo:true,
    images:[
      "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
      "https://www.cdiscount.com/pdt2/k/v/2/1/700x700/ps5dsblackv2/rw/manette-sans-fil-dualsense-noire-i-ps5-et-pc.jpg",
      "https://www.cdiscount.com/pdt2/e/v/2/1/700x700/ps5dswhitev2/rw/manette-sans-fil-dualsense-blanche-i-ps5-et-pc.jpg"
    ],
    description:"Manette DualSense compatible PS5 et PC. Galerie avec plusieurs variantes.",
    rating:4.8,
    reviews:81
  }
];

/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentCategory = "Tous";
let searchTerm = "";
let favoritesOnly = false;
let currentProduct = null;
let currentGalleryIndex = 0;
let appliedPromo = null;

/* =========================================================
   HELPERS
========================================================= */

const $ = id => document.getElementById(id);

function money(value){
  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(Number(value || 0));
}

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function uid(prefix="id"){
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
}

function getJSON(key,fallback){
  try{
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  }catch{
    return fallback;
  }
}

function setJSON(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

function getCart(){
  return getJSON(STORAGE.cart,[]);
}

function setCart(cart){
  setJSON(STORAGE.cart,cart);
}

function getFavorites(){
  return getJSON(STORAGE.favorites,[]);
}

function setFavorites(favs){
  setJSON(STORAGE.favorites,favs);
}

function getOrders(){
  return getJSON(STORAGE.orders,[]);
}

function setOrders(orders){
  setJSON(STORAGE.orders,orders);
}

function getReviews(){
  return getJSON(STORAGE.reviews,[]);
}

function setReviews(reviews){
  setJSON(STORAGE.reviews,reviews);
}

function showToast(message){
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(()=>{
    toast.classList.remove("show");
  },2600);
}

function openModal(id){
  $(id)?.classList.add("open");
}

function closeModal(id){
  $(id)?.classList.remove("open");
}

function closeAllModals(){
  document.querySelectorAll(".modal-wrap.open")
    .forEach(el=>el.classList.remove("open"));
}

function setAdminMode(value){
  document.body.classList.toggle("admin",Boolean(value));
}

function getUserKey(){
  return currentUser?.uid || currentUser?.email || "guest";
}

function firstThreeName(name){
  const clean = String(name || "Client").trim();
  return clean.slice(0,3) || "Cli";
}

function stars(rating){
  const r = Math.max(0,Math.min(5,Number(rating)||0));
  const full = Math.round(r);
  return "★".repeat(full) + "☆".repeat(5-full);
}

/* =========================================================
   CART
========================================================= */

function addToCart(productId){
  const product = PRODUCTS.find(p=>p.id===productId);
  if(!product) return;

  const cart = getCart();
  const existing = cart.find(x=>x.id===productId);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id:productId,
      qty:1
    });
  }

  setCart(cart);
  renderCart();
  updateHeader();
  showToast("Produit ajouté au panier 🛒");
}

function removeFromCart(productId){
  let cart = getCart().filter(x=>x.id!==productId);
  setCart(cart);
  renderCart();
  updateHeader();
}

function changeQty(productId,delta){
  const cart = getCart();
  const item = cart.find(x=>x.id===productId);

  if(!item) return;

  item.qty += delta;

  if(item.qty<=0){
    removeFromCart(productId);
    return;
  }

  setCart(cart);
  renderCart();
  updateHeader();
}

function cartDetailed(){
  return getCart()
    .map(item=>{
      const product = PRODUCTS.find(p=>p.id===item.id);
      if(!product) return null;

      return {
        ...product,
        qty:item.qty,
        lineTotal:product.price*item.qty
      };
    })
    .filter(Boolean);
}

function cartSubtotal(){
  return cartDetailed()
    .reduce((sum,item)=>sum+item.lineTotal,0);
}

function renderCart(){
  const items = cartDetailed();
  const box = $("cartItems");

  if(!items.length){
    box.innerHTML = `
      <div class="empty">
        <div style="font-size:40px">🛒</div>
        <h3 style="margin:10px 0;color:#fff">Ton panier est vide</h3>
        <p>Ajoute des produits pour commencer.</p>
      </div>
    `;

    $("cartTotal").textContent = money(0);
    return;
  }

  box.innerHTML = items.map(item=>`
    <div class="cart-item">
      <img
        src="${escapeHTML(item.images[0])}"
        alt="${escapeHTML(item.name)}"
        data-cart-image="${escapeHTML(item.id)}"
      >

      <div>
        <div class="cart-item-title">${escapeHTML(item.name)}</div>
        <div style="margin-top:6px;font-weight:900">${money(item.price)}</div>

        <div class="qty">
          <button data-action="qty-minus" data-id="${item.id}">−</button>
          <strong>${item.qty}</strong>
          <button data-action="qty-plus" data-id="${item.id}">+</button>
          <button
            data-action="remove-cart"
            data-id="${item.id}"
            style="margin-left:6px;color:#ff6877"
          >Supprimer</button>
        </div>
      </div>

      <strong>${money(item.lineTotal)}</strong>
    </div>
  `).join("");

  const subtotal = cartSubtotal();
  $("cartTotal").textContent = money(subtotal);

  attachImageFallbacks();
}

/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(productId){
  const favorites = getFavorites();

  const index = favorites.indexOf(productId);

  if(index>=0){
    favorites.splice(index,1);
    showToast("Retiré des favoris");
  }else{
    favorites.push(productId);
    showToast("Ajouté aux favoris ❤️");
  }

  setFavorites(favorites);
  renderProducts();
}

function isFavorite(productId){
  return getFavorites().includes(productId);
}

/* =========================================================
   REVIEWS
========================================================= */

function productReviews(productId){
  return getReviews().filter(r=>r.productId===productId);
}

function productRating(product){
  const reviews = productReviews(product.id);

  if(!reviews.length){
    return {
      rating:product.rating,
      count:product.reviews
    };
  }

  const sum = reviews.reduce((a,b)=>a+Number(b.rating),0);

  return {
    rating:sum/reviews.length,
    count:reviews.length
  };
}

/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){
  const categories = [
    "Tous",
    ...new Set(PRODUCTS.map(p=>p.category))
  ];

  $("categories").innerHTML = categories.map(cat=>`
    <button
      class="category ${currentCategory===cat?"active":""}"
      data-category="${escapeHTML(cat)}"
    >
      ${escapeHTML(cat)}
    </button>
  `).join("");
}

/* =========================================================
   PRODUCTS
========================================================= */

function filteredProducts(){
  let result = [...PRODUCTS];

  if(currentCategory!=="Tous"){
    result = result.filter(p=>p.category===currentCategory);
  }

  if(favoritesOnly){
    result = result.filter(p=>isFavorite(p.id));
  }

  if(searchTerm){
    const q = searchTerm.toLowerCase();

    result = result.filter(p=>
      `${p.name} ${p.brand} ${p.category}`
        .toLowerCase()
        .includes(q)
    );
  }

  const sort = $("sortSelect")?.value || "relevance";

  if(sort==="priceAsc"){
    result.sort((a,b)=>a.price-b.price);
  }

  if(sort==="priceDesc"){
    result.sort((a,b)=>b.price-a.price);
  }

  if(sort==="name"){
    result.sort((a,b)=>a.name.localeCompare(b.name));
  }

  if(sort==="rating"){
    result.sort((a,b)=>productRating(b).rating-productRating(a).rating);
  }

  return result;
}

function renderProducts(){
  const grid = $("productsGrid");
  const products = filteredProducts();

  $("resultCount").textContent =
    `${products.length} produit${products.length>1?"s":""}`;

  $("emptyState").classList.toggle("hidden",products.length>0);

  grid.innerHTML = products.map(product=>{
    const rating = productRating(product);

    return `
      <article class="card">

        <div class="card-image">
          ${
            product.promo
            ? `<div class="badge">${product.limited?"PROMO • STOCK LIMITÉ":"PROMO"}</div>`
            : ""
          }

          <button
            class="favorite ${isFavorite(product.id)?"active":""}"
            data-action="favorite"
            data-id="${product.id}"
            aria-label="Favori"
          >
            ${isFavorite(product.id)?"♥":"♡"}
          </button>

          <img
            src="${escapeHTML(product.images[0])}"
            alt="${escapeHTML(product.name)}"
            data-product-image="${product.id}"
          >
        </div>

        <div class="card-body">
          <div class="brand">${escapeHTML(product.brand)}</div>

          <div class="card-title">${escapeHTML(product.name)}</div>

          <div class="rating">
            ${stars(rating.rating)}
            <span>${rating.rating.toFixed(1)} (${rating.count})</span>
          </div>

          <div class="price-row">
            <div class="price">${money(product.price)}</div>
            <div class="old-price">${money(product.oldPrice)}</div>
          </div>

          <div class="stock">✓ ${product.stock} disponibles</div>

          <div class="card-actions">
            <button data-action="view" data-id="${product.id}">
              Voir
            </button>

            <button class="buy" data-action="add" data-id="${product.id}">
              🛒 Ajouter
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  attachImageFallbacks();
}

/* =========================================================
   IMAGE FALLBACK
========================================================= */

function attachImageFallbacks(){
  document.querySelectorAll("img[data-product-image],img[data-cart-image]")
    .forEach(img=>{
      if(img.dataset.fallbackAttached) return;

      img.dataset.fallbackAttached="1";

      img.addEventListener("error",()=>{
        const parent = img.parentElement;

        img.remove();

        const fallback = document.createElement("div");
        fallback.className="image-fallback";
        fallback.innerHTML = `
          <span style="font-size:34px">🖼️</span>
          <strong>Image indisponible</strong>
        `;

        parent.appendChild(fallback);
      });
    });
}

/* =========================================================
   PRODUCT DETAIL
========================================================= */

function openProduct(productId){
  const product = PRODUCTS.find(p=>p.id===productId);

  if(!product) return;

  currentProduct = product;
  currentGalleryIndex = 0;

  renderProductDetail();
  openModal("productModal");
}

function renderProductDetail(){
  if(!currentProduct) return;

  const product = currentProduct;
  const rating = productRating(product);
  const reviews = productReviews(product.id);

  const image = product.images[currentGalleryIndex] || product.images[0];

  $("productBody").innerHTML = `
    <div class="product-detail">

      <div>
        <div class="detail-gallery">
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(product.name)}"
            id="detailImage"
          >

          ${
            product.images.length>1
            ? `
              <button
                class="close"
                style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"
                data-action="gallery-prev"
              >‹</button>

              <button
                class="close"
                style="position:absolute;right:12px;top:50%;transform:translateY(-50%)"
                data-action="gallery-next"
              >›</button>

              <div class="gallery-dots">
                ${product.images.map((_,i)=>`
                  <span class="dot ${i===currentGalleryIndex?"active":""}"></span>
                `).join("")}
              </div>
            `
            : ""
          }
        </div>
      </div>

      <div class="detail-info">
        <div class="brand">${escapeHTML(product.brand)}</div>
        <h2>${escapeHTML(product.name)}</h2>

        <div class="rating">
          ${stars(rating.rating)}
          <span>${rating.rating.toFixed(1)} (${rating.count} avis)</span>
        </div>

        <p class="desc">${escapeHTML(product.description)}</p>

        <div class="detail-price">${money(product.price)}</div>

        <div class="stock">
          ✓ ${product.stock} disponibles
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button
            class="action-btn primary"
            data-action="add"
            data-id="${product.id}"
          >
            🛒 Ajouter au panier
          </button>

          <button
            class="action-btn"
            data-action="favorite"
            data-id="${product.id}"
          >
            ${isFavorite(product.id)?"♥ Retirer des favoris":"♡ Ajouter aux favoris"}
          </button>
        </div>

        <div style="margin-top:25px">
          <h3>Avis clients</h3>

          <div class="review-list">
            ${
              reviews.length
              ? reviews.map(r=>`
                <div class="review">
                  <div class="review-top">
                    <span class="review-name">
                      ${escapeHTML(r.author)} · ${stars(r.rating)}
                    </span>
                    <span class="review-date">${escapeHTML(r.date)}</span>
                  </div>
                  <div class="review-text">${escapeHTML(r.comment)}</div>
                </div>
              `).join("")
              : `<div class="note">Aucun avis utilisateur pour le moment.</div>`
            }
          </div>

          <div class="payment-box" style="margin-top:15px">
            <strong>⭐ Donner un avis</strong>

            <form class="form" id="reviewForm" style="margin-top:10px">
              <select id="reviewRating" required>
                <option value="">Note</option>
                <option value="5">★★★★★ 5</option>
                <option value="4">★★★★☆ 4</option>
                <option value="3">★★★☆☆ 3</option>
                <option value="2">★★☆☆☆ 2</option>
                <option value="1">★☆☆☆☆ 1</option>
              </select>

              <textarea
                id="reviewComment"
                placeholder="Ton avis..."
                required
              ></textarea>

              <button class="action-btn primary" type="submit">
                Publier l'avis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const detailImage = $("detailImage");

  if(detailImage){
    detailImage.addEventListener("error",()=>{
      detailImage.style.display="none";

      const fallback = document.createElement("div");
      fallback.className="image-fallback";
      fallback.innerHTML=`
        <span style="font-size:40px">🖼️</span>
        <strong>Image indisponible</strong>
      `;

      detailImage.parentElement.appendChild(fallback);
    });
  }
}

/* =========================================================
   AUTH UI
========================================================= */

function renderAccount(){
  if(!currentUser){
    $("accountBody").innerHTML = `
      <div class="empty">
        <div style="font-size:40px">👤</div>
        <h3 style="color:#fff;margin:10px 0">
          Pas encore connecté
        </h3>
        <p style="margin-bottom:15px">
          Connecte-toi pour voir tes commandes et utiliser les avis.
        </p>
        <button class="action-btn primary" id="openAuthFromAccount">
          Se connecter
        </button>
      </div>
    `;

    return;
  }

  const admin = Boolean(currentUser.isAdmin);

  $("accountBody").innerHTML = `
    <div class="user-box">
      <div class="user-name">
        ${escapeHTML(currentUser.displayName || "Client")}
      </div>

      <div class="user-email">
        ${escapeHTML(currentUser.email || currentUser.phoneNumber || "Compte connecté")}
      </div>

      ${
        admin
        ? `<div style="margin-top:8px;color:#61e59b;font-size:12px;font-weight:900">
            ADMINISTRATEUR
          </div>`
        : ""
      }
    </div>

    <div class="form">
      <button class="action-btn" id="accountOrdersBtn">
        📦 Mes commandes
      </button>

      ${
        admin
        ? `
          <button class="action-btn" id="accountDashboardBtn">
            ⚙️ Dashboard
          </button>
        `
        : ""
      }

      <button class="action-btn" id="logoutBtn">
        🚪 Se déconnecter
      </button>
    </div>
  `;
}

function updateHeader(){
  const cartCount = getCart().reduce((a,b)=>a+b.qty,0);
  $("cartCount").textContent = cartCount;

  $("ordersBtn").classList.toggle("hidden",!currentUser);

  if(currentUser){
    $("accountBtn").textContent =
      `👤 ${currentUser.displayName?.split(" ")[0] || "Compte"}`;
  }else{
    $("accountBtn").textContent="👤 Compte";
  }
}

function openAuth(mode="login"){
  closeAllModals();
  openModal("authModal");

  if(mode==="signup"){
    $("signupTab").click();
  }else{
    $("loginTab").click();
  }
}

function renderAuthState(){
  if(currentUser){
    $("authForms").classList.add("hidden");
    $("loggedAccount").classList.remove("hidden");

    $("loggedAccount").innerHTML = `
      <div class="user-box">
        <div class="user-name">
          ${escapeHTML(currentUser.displayName || "Compte NovaShop")}
        </div>
        <div class="user-email">
          ${escapeHTML(currentUser.email || currentUser.phoneNumber || "")}
        </div>
      </div>

      <div class="form">
        <button class="action-btn primary" id="authOrdersBtn">
          📦 Mes commandes
        </button>

        ${
          currentUser.isAdmin
          ? `
            <button class="action-btn" id="authDashboardBtn">
              ⚙️ Dashboard
            </button>
          `
          : ""
        }

        <button class="action-btn" id="authLogoutBtn">
          🚪 Déconnexion
        </button>
      </div>
    `;
  }else{
    $("authForms").classList.remove("hidden");
    $("loggedAccount").classList.add("hidden");
  }

  updateHeader();
  setAdminMode(Boolean(currentUser?.isAdmin));
}

/* =========================================================
   FIREBASE AUTH
========================================================= */

async function loginEmail(email,password){
  try{
    await signInWithEmailAndPassword(auth,email,password);
    showToast("Connexion réussie ✅");
    closeModal("authModal");
  }catch(error){
    console.error(error);
    showToast(firebaseError(error));
  }
}

async function signupEmail(name,email,password){
  try{
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if(name){
      await updateProfile(result.user,{
        displayName:name
      });
    }

    showToast("Compte créé ✅");
    closeModal("authModal");
  }catch(error){
    console.error(error);
    showToast(firebaseError(error));
  }
}

async function loginGoogle(){
  try{
    await signInWithPopup(auth,googleProvider);
    showToast("Connexion Google réussie ✅");
    closeModal("authModal");
  }catch(error){
    console.error(error);
    showToast(firebaseError(error));
  }
}

function firebaseError(error){
  const code = error?.code || "";

  const map = {
    "auth/invalid-credential":"Identifiants incorrects.",
    "auth/invalid-email":"Adresse e-mail invalide.",
    "auth/email-already-in-use":"Cette adresse e-mail est déjà utilisée.",
    "auth/weak-password":"Mot de passe trop faible.",
    "auth/popup-closed-by-user":"Fenêtre Google fermée.",
    "auth/popup-blocked":"Le navigateur a bloqué la fenêtre Google.",
    "auth/too-many-requests":"Trop de tentatives. Réessaie plus tard.",
    "auth/operation-not-allowed":"Ce mode de connexion n'est pas activé dans Firebase."
  };

  return map[code] || `Erreur Firebase : ${code || "inconnue"}`;
}

async function initPhoneAuth(){
  try{
    if(!recaptchaVerifier){
      recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size:"invisible"
        }
      );

      await recaptchaVerifier.render();
    }

    const phone = $("phoneNumber").value.trim();

    if(!phone){
      showToast("Entre ton numéro.");
      return;
    }

    confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );

    $("phoneCodeRow").classList.remove("hidden");

    showToast("Code SMS envoyé 📱");
  }catch(error){
    console.error(error);

    if(recaptchaVerifier){
      try{
        recaptchaVerifier.clear();
      }catch{}
      recaptchaVerifier=null;
    }

    showToast(firebaseError(error));
  }
}

async function verifyPhone(){
  try{
    const code = $("phoneCode").value.trim();

    if(!confirmationResult || !code){
      showToast("Entre le code reçu.");
      return;
    }

    await confirmationResult.confirm(code);

    showToast("Téléphone vérifié ✅");
    closeModal("authModal");
  }catch(error){
    console.error(error);
    showToast(firebaseError(error));
  }
}

onAuthStateChanged(auth,user=>{
  currentUser = user
    ? {
        ...user,
        isAdmin:false
      }
    : null;

  /*
    IMPORTANT:
    Ici on ne transforme jamais un utilisateur normal
    en admin automatiquement.
    Le vrai rôle admin doit être contrôlé côté serveur.
  */

  renderAuthState();
  renderAccount();
});

/* =========================================================
   PROMO
========================================================= */

function calculateDiscount(subtotal){
  if(!appliedPromo) return 0;

  const percent = PROMOS[appliedPromo] || 0;

  return subtotal * percent / 100;
}

function applyPromo(){
  const code = $("promoCode").value.trim().toUpperCase();

  if(!code){
    appliedPromo=null;
    showToast("Aucun code renseigné.");
    updateCheckoutSummary();
    return;
  }

  if(!PROMOS[code]){
    appliedPromo=null;
    showToast("Code promotionnel invalide.");
    updateCheckoutSummary();
    return;
  }

  appliedPromo=code;

  showToast(
    code==="NOVA100"
    ? "100 % appliqué 🎉"
    : `Réduction de ${PROMOS[code]} % appliquée`
  );

  updateCheckoutSummary();
}

/* =========================================================
   CHECKOUT
========================================================= */

function updateCheckoutSummary(){
  const items = cartDetailed();
  const subtotal = cartSubtotal();
  const discount = calculateDiscount(subtotal);
  const total = Math.max(0,subtotal-discount);

  $("checkoutSummary").innerHTML = `
    ${
      items.length
      ? items.map(item=>`
          <div class="summary-row">
            <span>${escapeHTML(item.name)} × ${item.qty}</span>
            <strong>${money(item.lineTotal)}</strong>
          </div>
        `).join("")
      : `<p class="note">Panier vide.</p>`
    }

    <div class="summary-row">
      <span>Sous-total</span>
      <strong>${money(subtotal)}</strong>
    </div>

    <div class="summary-row">
      <span>Réduction</span>
      <strong style="color:#61e59b">
        -${money(discount)}
      </strong>
    </div>

    <div class="summary-row total">
      <span>Total</span>
      <span>${money(total)}</span>
    </div>
  `;
}

function openCheckout(){
  const items = cartDetailed();

  if(!items.length){
    showToast("Ton panier est vide.");
    return;
  }

  if(!currentUser){
    showToast("Connecte-toi avant de commander.");
    openAuth("login");
    return;
  }

  appliedPromo=null;
  $("promoCode").value="";

  $("fullName").value=currentUser.displayName || "";
  $("country").value="France";

  updateCheckoutSummary();
  openModal("checkoutModal");
}

function selectedPayment(){
  return document.querySelector(
    'input[name="payment"]:checked'
  )?.value || "card";
}

function updatePaymentUI(){
  const payment = selectedPayment();

  $("cardDemoBox").classList.toggle(
    "hidden",
    payment!=="card"
  );

  $("paypalDemoBox").classList.toggle(
    "hidden",
    payment!=="paypal"
  );
}

async function submitCheckout(event){
  event.preventDefault();

  if(!currentUser){
    showToast("Connecte-toi d'abord.");
    return;
  }

  const items = cartDetailed();

  if(!items.length){
    showToast("Panier vide.");
    return;
  }

  /*
    Le système de démonstration exige NOVA100.
    Cela évite de faire croire qu'un bouton frontend
    encaisse réellement une carte bancaire.
  */

  if(appliedPromo!=="NOVA100"){
    showToast("Pour cette démo, utilise le code NOVA100.");
    return;
  }

  const payment = selectedPayment();

  const order = {
    id:uid("NOVA"),
    orderNumber:`NS-${Date.now().toString().slice(-8)}`,
    userId:getUserKey(),
    customer:{
      name:$("fullName").value.trim(),
      address:$("address").value.trim(),
      postalCode:$("postalCode").value.trim(),
      city:$("city").value.trim(),
      country:$("country").value.trim()
    },
    items:items.map(item=>({
      id:item.id,
      name:item.name,
      brand:item.brand,
      qty:item.qty,
      price:item.price,
      total:item.lineTotal
    })),
    subtotal:cartSubtotal(),
    discount:cartSubtotal(),
    total:0,
    promo:"NOVA100",
    paymentMethod:
      payment==="paypal"
      ? "PayPal • démonstration"
      : `Carte ${$("cardBrand").value} • démonstration`,
    warehouse:"Entrepôt",
    status:"Commande reçue",
    createdAt:new Date().toISOString()
  };

  const orders=getOrders();
  orders.unshift(order);
  setOrders(orders);

  setCart([]);
  renderCart();
  updateHeader();

  closeModal("checkoutModal");

  showToast("Commande créée gratuitement 🎉");

  renderOrders();
  openInvoice(order);
}

/* =========================================================
   ORDERS
========================================================= */

function userOrders(){
  if(!currentUser) return [];

  const key=getUserKey();

  return getOrders()
    .filter(order=>order.userId===key);
}

function renderOrders(){
  const orders=userOrders();

  if(!orders.length){
    $("ordersBody").innerHTML=`
      <div class="empty">
        <div style="font-size:40px">📦</div>
        <h3 style="color:#fff;margin:10px 0">
          Aucune commande
        </h3>
        <p>Tes commandes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  $("ordersBody").innerHTML=`
    <div class="dashboard-list">
      ${orders.map(order=>`
        <div class="order-row">
          <div>
            <strong>${escapeHTML(order.orderNumber)}</strong>
            <div class="note">
              ${new Date(order.createdAt).toLocaleDateString("fr-FR")}
              • ${order.items.length} article(s)
            </div>
          </div>

          <span class="status">${escapeHTML(order.status)}</span>

          <button
            class="action-btn"
            data-action="invoice"
            data-order="${order.id}"
          >
            Facture
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================================================
   INVOICE
========================================================= */

function openInvoice(order){
  if(!order) return;

  $("invoiceBody").innerHTML=`
    <div class="invoice">

      <div class="invoice-header">
        <div>
          <div class="invoice-logo">NOVASHOP</div>
          <div class="invoice-muted">Marketplace Gaming</div>
        </div>

        <div class="invoice-meta">
          <strong>FACTURE</strong><br>
          ${escapeHTML(order.orderNumber)}<br>
          ${new Date(order.createdAt).toLocaleDateString("fr-FR")}
        </div>
      </div>

      <div class="invoice-customer">
        <div>
          <strong>Client</strong><br>
          ${escapeHTML(order.customer.name)}<br>
          ${escapeHTML(order.customer.address)}<br>
          ${escapeHTML(order.customer.postalCode)}
          ${escapeHTML(order.customer.city)}<br>
          ${escapeHTML(order.customer.country)}
        </div>

        <div>
          <strong>Informations</strong><br>
          Entrepôt : ${escapeHTML(order.warehouse)}<br>
          Paiement : ${escapeHTML(order.paymentMethod)}<br>
          Statut : ${escapeHTML(order.status)}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Qté</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${order.items.map(item=>`
            <tr>
              <td>${escapeHTML(item.name)}</td>
              <td>${item.qty}</td>
              <td>${money(item.price)}</td>
              <td>${money(item.total)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="invoice-total">
        <div>
          <span>Sous-total</span>
          <strong>${money(order.subtotal)}</strong>
        </div>

        <div>
          <span>Réduction</span>
          <strong>-${money(order.discount)}</strong>
        </div>

        <div class="final">
          <span>Total payé</span>
          <strong>${money(order.total)}</strong>
        </div>
      </div>

      <div style="
        margin-top:30px;
        padding-top:15px;
        border-top:1px solid #ddd;
        color:#69717d;
        font-size:12px;
      ">
        Facture NovaShop • Document généré automatiquement.
        Paiement de démonstration.
      </div>
    </div>
  `;

  openModal("invoiceModal");
}

/* =========================================================
   DASHBOARD
========================================================= */

function openDashboard(){
  if(!currentUser?.isAdmin){
    showToast("Accès refusé.");
    return;
  }

  renderDashboard();
  openModal("dashboardModal");
}

function renderDashboard(){
  if(!currentUser?.isAdmin) return;

  const orders=getOrders();

  $("statOrders").textContent=orders.length;

  $("statFree").textContent=
    orders.filter(o=>Number(o.total)===0).length;

  $("statProducts").textContent=PRODUCTS.length;

  /*
    Les comptes Firebase ne peuvent pas être listés
    directement depuis le client sans une source serveur.
    On affiche donc uniquement le compteur local de démonstration.
  */
  $("statUsers").textContent=
    getJSON(STORAGE.demoUsers,[]).length;

  $("promoList").innerHTML=
    Object.entries(PROMOS).map(([code,percent])=>`
      <div class="order-row">
        <div>
          <strong>${code}</strong>
          <div class="note">
            Réduction ${percent} %
          </div>
        </div>
        <span class="status">
          ${percent===100?"GRATUIT":"ACTIF"}
        </span>
        <span></span>
      </div>
    `).join("");

  $("dashboardOrders").innerHTML=
    orders.length
    ? orders.map(order=>`
      <div class="order-row">
        <div>
          <strong>${escapeHTML(order.orderNumber)}</strong>
          <div class="note">
            ${escapeHTML(order.customer.name)}
            • ${escapeHTML(order.paymentMethod)}
          </div>
        </div>

        <span class="status">
          ${escapeHTML(order.status)}
        </span>

        <strong>${money(order.total)}</strong>
      </div>
    `).join("")
    : `
      <div class="empty">
        Aucune commande.
      </div>
    `;
}

/* =========================================================
   EVENT LISTENERS
========================================================= */

$("searchInput").addEventListener("input",e=>{
  searchTerm=e.target.value.trim();
  renderProducts();
});

$("searchInput").addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    searchTerm=e.target.value.trim();
    renderProducts();
    $("productsSection").scrollIntoView({
      behavior:"smooth"
    });
  }
});

$("searchBtn").addEventListener("click",()=>{
  searchTerm=$("searchInput").value.trim();
  renderProducts();

  $("productsSection").scrollIntoView({
    behavior:"smooth"
  });
});

$("sortSelect").addEventListener("change",renderProducts);

$("favoritesFilter").addEventListener("click",()=>{
  favoritesOnly=!favoritesOnly;

  $("favoritesFilter").classList.toggle(
    "active",
    favoritesOnly
  );

  renderProducts();
});

$("heroFavBtn").addEventListener("click",()=>{
  favoritesOnly=true;
  $("favoritesFilter").classList.add("active");
  renderProducts();

  $("productsSection").scrollIntoView({
    behavior:"smooth"
  });
});

$("heroShopBtn").addEventListener("click",()=>{
  $("productsSection").scrollIntoView({
    behavior:"smooth"
  });
});

$("accountBtn").addEventListener("click",()=>{
  renderAccount();
  openModal("accountModal");
});

$("ordersBtn").addEventListener("click",()=>{
  renderOrders();
  openModal("ordersModal");
});

$("dashboardBtn").addEventListener("click",openDashboard);

$("cartBtn").addEventListener("click",()=>{
  renderCart();
  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("show");
});

function closeCart(){
  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("show");
}

$("closeCart").addEventListener("click",closeCart);
$("overlay").addEventListener("click",closeCart);

$("checkoutBtn").addEventListener("click",()=>{
  closeCart();
  openCheckout();
});

$("loginTab").addEventListener("click",()=>{
  $("loginTab").classList.add("active");
  $("signupTab").classList.remove("active");
  $("loginForm").classList.remove("hidden");
  $("signupForm").classList.add("hidden");
});

$("signupTab").addEventListener("click",()=>{
  $("signupTab").classList.add("active");
  $("loginTab").classList.remove("active");
  $("signupForm").classList.remove("hidden");
  $("loginForm").classList.add("hidden");
});

$("loginForm").addEventListener("submit",async e=>{
  e.preventDefault();

  await loginEmail(
    $("loginEmail").value.trim(),
    $("loginPassword").value
  );
});

$("signupForm").addEventListener("submit",async e=>{
  e.preventDefault();

  await signupEmail(
    $("signupName").value.trim(),
    $("signupEmail").value.trim(),
    $("signupPassword").value
  );
});

$("googleBtn").addEventListener("click",loginGoogle);

$("phoneSendBtn").addEventListener(
  "click",
  initPhoneAuth
);

$("phoneVerifyBtn").addEventListener(
  "click",
  verifyPhone
);

$("applyPromoBtn").addEventListener(
  "click",
  applyPromo
);

document.querySelectorAll(
  'input[name="payment"]'
).forEach(input=>{
  input.addEventListener("change",updatePaymentUI);
});

$("checkoutForm").addEventListener(
  "submit",
  submitCheckout
);

$("printInvoiceBtn").addEventListener(
  "click",
  ()=>window.print()
);

document.addEventListener("click",event=>{
  const closeButton=event.target.closest("[data-close]");

  if(closeButton){
    closeModal(closeButton.dataset.close);
    return;
  }

  const categoryButton=event.target.closest(
    "[data-category]"
  );

  if(categoryButton){
    currentCategory=categoryButton.dataset.category;
    favoritesOnly=false;

    $("favoritesFilter").classList.remove("active");

    renderCategories();
    renderProducts();
    return;
  }

  const action=event.target.closest("[data-action]");

  if(!action) return;

  const type=action.dataset.action;
  const id=action.dataset.id;

  if(type==="favorite"){
    toggleFavorite(id);

    if(currentProduct?.id===id){
      renderProductDetail();
    }

    return;
  }

  if(type==="add"){
    addToCart(id);
    return;
  }

  if(type==="view"){
    openProduct(id);
    return;
  }

  if(type==="qty-minus"){
    changeQty(id,-1);
    return;
  }

  if(type==="qty-plus"){
    changeQty(id,1);
    return;
  }

  if(type==="remove-cart"){
    removeFromCart(id);
    showToast("Produit retiré.");
    return;
  }

  if(type==="gallery-prev"){
    if(!currentProduct) return;

    currentGalleryIndex =
      (currentGalleryIndex-1+currentProduct.images.length)
      % currentProduct.images.length;

    renderProductDetail();
    return;
  }

  if(type==="gallery-next"){
    if(!currentProduct) return;

    currentGalleryIndex =
      (currentGalleryIndex+1)
      % currentProduct.images.length;

    renderProductDetail();
    return;
  }

  if(type==="invoice"){
    const order=getOrders().find(
      o=>o.id===action.dataset.order
    );

    if(order){
      openInvoice(order);
    }

    return;
  }
});

document.addEventListener("submit",event=>{
  if(event.target.id!=="reviewForm") return;

  event.preventDefault();

  if(!currentUser){
    showToast("Connecte-toi pour laisser un avis.");
    openAuth("login");
    return;
  }

  if(!currentProduct) return;

  const reviews=getReviews();

  const already=reviews.some(
    r=>
      r.productId===currentProduct.id &&
      r.userId===getUserKey()
  );

  if(already){
    showToast("Tu as déjà laissé un avis.");
    return;
  }

  const rating=Number($("reviewRating").value);
  const comment=$("reviewComment").value.trim();

  if(!rating || !comment){
    showToast("Complète la note et le commentaire.");
    return;
  }

  reviews.push({
    id:uid("review"),
    productId:currentProduct.id,
    userId:getUserKey(),
    author:firstThreeName(
      currentUser.displayName ||
      currentUser.email ||
      "Client"
    )+"***",
    rating,
    comment,
    date:new Date().toLocaleDateString("fr-FR")
  });

  setReviews(reviews);

  showToast("Avis publié ⭐");

  renderProductDetail();
  renderProducts();
});

$("openAuthFromAccount")?.addEventListener(
  "click",
  ()=>openAuth("login")
);

document.addEventListener("click",async event=>{
  if(event.target.id==="authLogoutBtn"){
    await signOut(auth);
    closeModal("authModal");
    showToast("Déconnecté.");
    return;
  }

  if(event.target.id==="authOrdersBtn"){
    closeModal("authModal");
    renderOrders();
    openModal("ordersModal");
    return;
  }

  if(event.target.id==="authDashboardBtn"){
    closeModal("authModal");
    openDashboard();
    return;
  }

  if(event.target.id==="accountOrdersBtn"){
    closeModal("accountModal");
    renderOrders();
    openModal("ordersModal");
    return;
  }

  if(event.target.id==="accountDashboardBtn"){
    closeModal("accountModal");
    openDashboard();
    return;
  }

  if(event.target.id==="logoutBtn"){
    await signOut(auth);
    closeModal("accountModal");
    showToast("Déconnecté.");
  }
});

/* =========================================================
   DEMO ADMIN
========================================================= */

/*
  Cette fonction n'est volontairement pas reliée à un champ
  visible du compte normal.

  Si tu veux tester le dashboard dans cette démo :
  - console navigateur :
    localStorage.setItem("novashop_admin_session","1")
  - puis recharge la page.

  Pour une vraie boutique, il faut remplacer ça par un rôle
  serveur / Firebase Custom Claims.
*/

function loadDemoAdmin(){
  const enabled=
    localStorage.getItem(STORAGE.adminSession)==="1";

  if(enabled && currentUser){
    currentUser.isAdmin=true;
    setAdminMode(true);
    renderAuthState();
    renderAccount();
  }
}

/* =========================================================
   INITIALISATION
========================================================= */

function init(){
  renderCategories();
  renderProducts();
  renderCart();
  updateHeader();
  updatePaymentUI();

  $("firebaseStatus").textContent =
    "Firebase est chargé. Active Google, Email/Password et Phone dans Firebase Authentication pour utiliser ces méthodes.";

  loadDemoAdmin();
}

init();

/* =========================================================
   EXPOSITION POUR DEBUG
========================================================= */

window.NovaShop={
  products:PRODUCTS,
  openProduct,
  addToCart,
  getCart,
  getOrders,
  getFavorites,
  getReviews,
  paypal:PAYPAL_ME
};
