import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
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

let firebaseReady = false;
let auth = null;

try {
  const firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firebaseReady = true;
} catch(error) {
  console.error("Firebase:", error);
}

/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const PROMOS = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};

const STORAGE = {
  cart: "nova_cart_v6",
  favorites: "nova_favorites_v6",
  orders: "nova_orders_v6",
  reviews: "nova_reviews_v6",
  settings: "nova_settings_v6",
  phone: "nova_phone_v6",
  admin: "nova_admin_unlocked_v6"
};

const DELIVERY_STATUSES = [
  "Préparation",
  "Expédiée",
  "En transit",
  "Livrée"
];

/* =========================================================
   PRODUCTS
========================================================= */

const PRODUCTS = [

  {
    id:"gigabyte-b650",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description:"Carte mère gaming AMD AM5 avec connectivité moderne."
  },

  {
    id:"pc-7800x3d",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description:"PC gaming haut de gamme orienté performances."
  },

  {
    id:"hyperx-cloud-2",
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
    description:"Clavier mécanique compact au format 60%."
  },

  {
    id:"celshading",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description:"Clavier gaming magnétique 65% au design noir."
  },

  {
    id:"ajazz-aj199",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description:"Souris gaming sans fil légère et rapide."
  },

  {
    id:"logitech-superstrike",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description:"Souris gaming haut de gamme."
  },

  {
    id:"samsung-990-1tb",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
    description:"SSD NVMe PCIe haute performance de 1 To."
  },

  {
    id:"samsung-990-2tb",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp",
    description:"SSD NVMe rapide avec capacité de 2 To."
  },

  {
    id:"rm1000x",
    name:"CORSAIR RM1000x (EU)",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
    description:"Alimentation 1000 W pour configuration gaming."
  },

  {
    id:"rm850x",
    name:"CORSAIR RM850x (EU)",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
    description:"Alimentation modulaire 850 W."
  },

  {
    id:"corsair-5000d",
    name:"Corsair Frame 5000D RS ARGB (Noir)",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
    description:"Boîtier gaming spacieux avec ventilation ARGB."
  },

  {
    id:"arctic-360",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
    description:"Refroidissement liquide AIO 360 mm."
  },

  {
    id:"odyssey-g6",
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
    description:"Bras articulé premium pour microphone."
  },

  {
    id:"dualsense-red",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    description:"Manette sans fil compatible PS5 et PC."
  },

  {
    id:"asus-b650",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg",
    description:"Carte mère AMD B650 orientée gaming."
  },

  {
    id:"msi-b650",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
    description:"Carte mère B650 avec Wi-Fi intégré."
  }

];

/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let activeCategory = "Tous";
let searchTerm = "";
let currentProduct = null;
let currentReviewRating = 5;
let appliedPromo = null;

let cart = load(STORAGE.cart, []);
let favorites = load(STORAGE.favorites, []);
let orders = load(STORAGE.orders, []);
let reviews = load(STORAGE.reviews, []);

let settings = load(STORAGE.settings, {
  dark:false,
  sound:true
});

/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const overlay = $("overlay");
const toast = $("toast");

/* =========================================================
   HELPERS
========================================================= */

function load(key, fallback){
  try{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}

function save(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

function money(value){
  return Number(value || 0).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

function getCurrentEmail(){
  return currentUser?.email?.toLowerCase() || "";
}

function isAdmin(){
  return getCurrentEmail() === ADMIN_EMAIL.toLowerCase() &&
         localStorage.getItem(STORAGE.admin) === "true";
}

function uid(){
  if(window.crypto?.randomUUID){
    return crypto.randomUUID();
  }

  return "NS-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(()=>{
    toast.classList.remove("show");
  },2500);
}

function playSound(){
  if(!settings.sound) return;

  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if(!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 620;

    gain.gain.setValueAtTime(.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.055,ctx.currentTime + .01);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime + .09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + .1);
  }catch{}
}

/* =========================================================
   MODALS
========================================================= */

function openModal(id){
  const modal = $(id);

  if(!modal) return;

  overlay.classList.add("show");
  modal.classList.add("show");

  playSound();
}

function closeModal(id){
  const modal = $(id);

  if(modal){
    modal.classList.remove("show");
  }

  const anyOpen = [...document.querySelectorAll(".modal.show")].length > 0;

  if(!anyOpen){
    overlay.classList.remove("show");
  }
}

function closeAllModals(){
  document.querySelectorAll(".modal.show").forEach(modal=>{
    modal.classList.remove("show");
  });

  overlay.classList.remove("show");
}

overlay.addEventListener("click",closeAllModals);

document.querySelectorAll("[data-close]").forEach(button=>{
  button.addEventListener("click",()=>{
    closeModal(button.dataset.close);
  });
});

/* =========================================================
   AUTH
========================================================= */

function updateAccountUI(){
  if(currentUser){
    $("accountButton").textContent = "👤";
    $("ordersButton").style.display = "";
  }else{
    $("accountButton").textContent = "🔐";
    $("ordersButton").style.display = "none";
  }

  if(isAdmin()){
    $("adminButton").style.display = "";
  }else{
    $("adminButton").style.display = "none";
  }
}

function showLogin(){
  $("loginTab").classList.add("active");
  $("signupTab").classList.remove("active");

  $("loginForm").style.display = "grid";
  $("signupForm").style.display = "none";
}

function showSignup(){
  $("signupTab").classList.add("active");
  $("loginTab").classList.remove("active");

  $("loginForm").style.display = "none";
  $("signupForm").style.display = "grid";
}

$("loginTab").addEventListener("click",showLogin);
$("signupTab").addEventListener("click",showSignup);

$("accountButton").addEventListener("click",()=>{
  if(currentUser){
    renderAccount();
    openModal("accountModal");
  }else{
    showLogin();
    openModal("authModal");
  }
});

$("loginForm").addEventListener("submit",async event=>{
  event.preventDefault();

  if(!firebaseReady){
    showToast("Firebase n'est pas disponible.");
    return;
  }

  try{
    const email = $("loginEmail").value.trim();
    const password = $("loginPassword").value;

    await signInWithEmailAndPassword(auth,email,password);

    showToast("Connexion réussie.");
    closeModal("authModal");

  }catch(error){
    console.error(error);
    showToast("Connexion impossible.");
  }
});

$("signupForm").addEventListener("submit",async event=>{
  event.preventDefault();

  if(!firebaseReady){
    showToast("Firebase n'est pas disponible.");
    return;
  }

  const email = $("signupEmail").value.trim();
  const phone = $("signupPhone").value.trim();
  const password = $("signupPassword").value;
  const confirm = $("signupConfirm").value;

  if(password !== confirm){
    showToast("Les mots de passe sont différents.");
    return;
  }

  try{
    await createUserWithEmailAndPassword(auth,email,password);

    localStorage.setItem(
      STORAGE.phone,
      JSON.stringify({
        email,
        phone
      })
    );

    showToast("Compte créé.");
    closeModal("authModal");

  }catch(error){
    console.error(error);
    showToast("Création du compte impossible.");
  }
});

async function googleLogin(){
  if(!firebaseReady){
    showToast("Firebase n'est pas disponible.");
    return;
  }

  try{
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth,provider);

    showToast("Connexion Google réussie.");
    closeModal("authModal");

  }catch(error){
    console.error(error);
    showToast("Connexion Google impossible.");
  }
}

$("googleButton").addEventListener("click",googleLogin);
$("googleSignupButton").addEventListener("click",googleLogin);

if(firebaseReady){
  onAuthStateChanged(auth,user=>{
    currentUser = user;
    updateAccountUI();

    if(currentUser){
      if(isAdmin()){
        $("adminButton").style.display = "";
      }
    }
  });
}

/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount(){
  if(!currentUser){
    $("accountContent").innerHTML = `
      <p>Vous devez être connecté.</p>
    `;
    return;
  }

  const phoneData = load(STORAGE.phone,null);

  let phone = "";

  if(phoneData && phoneData.email === currentUser.email){
    phone = phoneData.phone;
  }

  $("accountContent").innerHTML = `
    <div style="display:grid;gap:14px">

      <div style="
        padding:17px;
        background:#f5f7fa;
        border-radius:14px;
      ">
        <div style="font-size:11px;color:#69707a;font-weight:800">
          COMPTE
        </div>

        <div style="font-size:18px;font-weight:950;margin-top:5px">
          ${escapeHTML(currentUser.email || "")}
        </div>

        ${
          phone
          ? `<div style="margin-top:5px;color:#69707a">
               📱 ${escapeHTML(phone)}
             </div>`
          : ""
        }
      </div>

      <button class="primary" id="accountOrdersButton">
        📦 Mes commandes
      </button>

      ${
        isAdmin()
        ? `<button class="icon-btn" id="accountDashboardButton">
             🛠️ Ouvrir le Dashboard
           </button>`
        : ""
      }

      <button class="icon-btn" id="logoutButton">
        Déconnexion
      </button>

    </div>
  `;

  $("accountOrdersButton").addEventListener("click",()=>{
    closeModal("accountModal");
    renderOrders();
    openModal("ordersModal");
  });

  $("logoutButton").addEventListener("click",async()=>{
    if(firebaseReady){
      await signOut(auth);
    }

    currentUser = null;
    localStorage.removeItem(STORAGE.admin);

    updateAccountUI();
    closeModal("accountModal");

    showToast("Vous êtes déconnecté.");
  });

  const dashboardButton = $("accountDashboardButton");

  if(dashboardButton){
    dashboardButton.addEventListener("click",()=>{
      closeModal("accountModal");
      renderDashboard();
      openModal("dashboardModal");
    });
  }
}

/* =========================================================
   ADMIN UNLOCK
========================================================= */

$("adminButton").addEventListener("click",()=>{
  if(!currentUser){
    showToast("Connecte-toi d'abord.");
    return;
  }

  if(getCurrentEmail() !== ADMIN_EMAIL.toLowerCase()){
    showToast("Compte non autorisé.");
    return;
  }

  if(localStorage.getItem(STORAGE.admin) === "true"){
    renderDashboard();
    openModal("dashboardModal");
    return;
  }

  const code = prompt("Code Dashboard NovaShop :");

  if(code === ADMIN_CODE){
    localStorage.setItem(STORAGE.admin,"true");

    updateAccountUI();
    renderDashboard();
    openModal("dashboardModal");

    showToast("Dashboard déverrouillé.");
  }else{
    showToast("Code incorrect.");
  }
});

/* =========================================================
   CATEGORIES
========================================================= */

document.querySelectorAll(".category").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(b=>{
      b.classList.remove("active");
    });

    button.classList.add("active");

    activeCategory = button.dataset.category;

    renderProducts();
  });
});

/* =========================================================
   SEARCH
========================================================= */

$("searchInput").addEventListener("input",()=>{
  searchTerm = $("searchInput").value.trim().toLowerCase();
  renderProducts();
});

$("searchInput").addEventListener("keydown",event=>{
  if(event.key === "Enter"){
    event.preventDefault();
    renderProducts();
  }
});

$("searchButton").addEventListener("click",()=>{
  searchTerm = $("searchInput").value.trim().toLowerCase();
  renderProducts();
});

/* =========================================================
   PRODUCTS
========================================================= */

function getFilteredProducts(){
  let list = PRODUCTS.filter(product=>{

    const categoryMatch =
      activeCategory === "Tous" ||
      product.category === activeCategory;

    const searchMatch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return categoryMatch && searchMatch;
  });

  const sort = $("sortSelect").value;

  if(sort === "priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort === "priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort === "name"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  return list;
}

function averageRating(productId){
  const list = reviews.filter(r=>r.productId === productId);

  if(!list.length){
    return 0;
  }

  return list.reduce((sum,r)=>sum + Number(r.rating),0) / list.length;
}

function starsHTML(productId){
  const average = averageRating(productId);

  if(!average){
    return `<span style="color:#9aa0a8">Pas encore noté</span>`;
  }

  const rounded = Math.round(average);

  return `
    ${"★".repeat(rounded)}${"☆".repeat(5-rounded)}
    <span>${average.toFixed(1)}</span>
  `;
}

function renderProducts(){
  const grid = $("productsGrid");
  const empty = $("emptyState");
  const products = getFilteredProducts();

  $("resultsCount").textContent =
    `${products.length} produit${products.length > 1 ? "s" : ""}`;

  grid.innerHTML = "";

  if(!products.length){
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  products.forEach(product=>{
    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.id = product.id;

    const favorite = favorites.includes(product.id);

    card.innerHTML = `
      <div class="product-image-wrap">

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

        <button
          class="favorite ${favorite ? "active" : ""}"
          data-action="favorite"
          title="Favori"
        >
          ${favorite ? "♥" : "♡"}
        </button>

      </div>

      <div class="product-body">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          ${starsHTML(product.id)}
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button data-action="view">
            Voir
          </button>

          <button class="add" data-action="add">
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const image = card.querySelector(".product-image");

    image.addEventListener("error",()=>{
      card.remove();
      updateGridEmptyState();
    });

    grid.appendChild(card);
  });
}

function updateGridEmptyState(){
  const grid = $("productsGrid");

  $("emptyState").style.display =
    grid.children.length ? "none" : "block";
}

$("sortSelect").addEventListener("change",renderProducts);

$("productsGrid").addEventListener("click",event=>{
  const button = event.target.closest("button");

  if(!button) return;

  const card = button.closest(".product-card");

  if(!card) return;

  const id = card.dataset.id;

  if(button.dataset.action === "favorite"){
    toggleFavorite(id);
  }

  if(button.dataset.action === "view"){
    openProduct(id);
  }

  if(button.dataset.action === "add"){
    addToCart(id);
  }
});

/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(x=>x !== id);
    showToast("Retiré des favoris.");
  }else{
    favorites.push(id);
    showToast("Ajouté aux favoris.");
  }

  save(STORAGE.favorites,favorites);
  renderProducts();
}

/* =========================================================
   CART
========================================================= */

function addToCart(id){
  const existing = cart.find(item=>item.id === id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  save(STORAGE.cart,cart);

  updateCartCount();

  showToast("Produit ajouté au panier.");
}

function removeFromCart(id){
  cart = cart.filter(item=>item.id !== id);

  save(STORAGE.cart,cart);

  renderCart();
  updateCartCount();
}

function changeQuantity(id,delta){
  const item = cart.find(x=>x.id === id);

  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    removeFromCart(id);
    return;
  }

  save(STORAGE.cart,cart);

  renderCart();
  updateCartCount();
}

function cartSubtotal(){
  return cart.reduce((sum,item)=>{
    const product = getProduct(item.id);

    return sum + (product ? product.price * item.qty : 0);
  },0);
}

function updateCartCount(){
  const count = cart.reduce((sum,item)=>sum + item.qty,0);
  $("cartCount").textContent = count;
}

function renderCart(){
  const content = $("cartContent");

  if(!cart.length){
    content.innerHTML = `
      <div style="text-align:center;padding:40px 10px;color:#69707a">
        <div style="font-size:40px">🛒</div>
        <strong>Ton panier est vide</strong>
      </div>
    `;

    $("cartTotal").textContent = money(0);
    $("checkoutButton").disabled = true;
    $("checkoutButton").style.opacity = ".5";

    return;
  }

  $("checkoutButton").disabled = false;
  $("checkoutButton").style.opacity = "1";

  content.innerHTML = cart.map(item=>{
    const product = getProduct(item.id);

    if(!product) return "";

    return `
      <div class="cart-item">

        <img
          class="cart-item-img"
          src="${product.image}"
          alt=""
        >

        <div>

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <div style="color:#69707a;font-size:12px;margin-top:3px">
            ${money(product.price)}
          </div>

          <div class="qty">
            <button data-cart-minus="${product.id}">
              −
            </button>

            <strong>
              ${item.qty}
            </strong>

            <button data-cart-plus="${product.id}">
              +
            </button>
          </div>

        </div>

        <button
          class="close"
          data-cart-remove="${product.id}"
          title="Supprimer"
        >
          ×
        </button>

      </div>
    `;
  }).join("");

  $("cartTotal").textContent = money(cartSubtotal());
}

$("cartContent").addEventListener("click",event=>{

  const remove = event.target.closest("[data-cart-remove]");
  const plus = event.target.closest("[data-cart-plus]");
  const minus = event.target.closest("[data-cart-minus]");

  if(remove){
    removeFromCart(remove.dataset.cartRemove);
  }

  if(plus){
    changeQuantity(plus.dataset.cartPlus,1);
  }

  if(minus){
    changeQuantity(minus.dataset.cartMinus,-1);
  }
});

$("cartButton").addEventListener("click",()=>{
  renderCart();
  openModal("cartModal");
});

/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProduct(id){
  const product = getProduct(id);

  if(!product) return;

  currentProduct = product;
  currentReviewRating = 5;

  const productReviews =
    reviews.filter(r=>r.productId === id);

  $("productContent").innerHTML = `
    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >
      </div>

      <div class="detail">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating" style="margin-top:9px">
          ${starsHTML(product.id)}
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p class="detail-description">
          ${escapeHTML(product.description)}
        </p>

        <button
          class="primary"
          id="detailAddButton"
          style="width:100%;margin-top:20px"
        >
          🛒 Ajouter au panier
        </button>

        <div class="review-box">

          <h3>Avis clients</h3>

          <div id="reviewsList">
            ${
              productReviews.length
              ? productReviews.map(reviewHTML).join("")
              : `<p style="color:#69707a;margin-top:10px">
                   Aucun avis pour le moment.
                 </p>`
            }
          </div>

          ${
            currentUser
            ? `
              <div style="margin-top:20px">

                <strong>Laisser un avis</strong>

                <div class="stars-input" id="starsInput">
                  ${[1,2,3,4,5].map(n=>`
                    <button
                      class="star-btn ${n <= 5 ? "active" : ""}"
                      data-rating="${n}"
                    >
                      ★
                    </button>
                  `).join("")}
                </div>

                <textarea
                  id="reviewComment"
                  placeholder="Ton avis..."
                  style="
                    width:100%;
                    min-height:80px;
                    border:1px solid var(--line);
                    border-radius:11px;
                    padding:10px;
                  "
                ></textarea>

                <button
                  class="primary"
                  id="submitReview"
                  style="margin-top:10px"
                >
                  Publier
                </button>

              </div>
            `
            : `
              <p style="color:#69707a;margin-top:15px">
                Connecte-toi pour laisser un avis.
              </p>
            `
          }

        </div>

      </div>
    </div>
  `;

  $("detailAddButton").addEventListener("click",()=>{
    addToCart(product.id);
  });

  const stars = $("starsInput");

  if(stars){
    stars.addEventListener("click",event=>{
      const button = event.target.closest("[data-rating]");

      if(!button) return;

      currentReviewRating = Number(button.dataset.rating);

      stars.querySelectorAll(".star-btn").forEach(star=>{
        star.classList.toggle(
          "active",
          Number(star.dataset.rating) <= currentReviewRating
        );
      });
    });
  }

  const submit = $("submitReview");

  if(submit){
    submit.addEventListener("click",submitReview);
  }

  openModal("productModal");
}

function reviewHTML(review){
  const date = new Date(review.date);

  return `
    <div class="review">

      <strong>
        ${escapeHTML(review.name)}
      </strong>

      <span style="color:#ffad00">
        ${"★".repeat(review.rating)}
        ${"☆".repeat(5-review.rating)}
      </span>

      <div style="font-size:11px;color:#999">
        ${date.toLocaleDateString("fr-FR")}
      </div>

      ${
        review.comment
        ? `<p>${escapeHTML(review.comment)}</p>`
        : ""
      }

    </div>
  `;
}

function submitReview(){
  if(!currentUser || !currentProduct) return;

  const already = reviews.some(
    r =>
      r.productId === currentProduct.id &&
      r.userId === currentUser.uid
  );

  if(already){
    showToast("Tu as déjà noté ce produit.");
    return;
  }

  const comment =
    $("reviewComment").value.trim();

  const emailName =
    currentUser.email
      ? currentUser.email.split("@")[0]
      : "Client";

  const safeName =
    emailName.slice(0,3) + "***";

  reviews.push({
    id:uid(),
    productId:currentProduct.id,
    userId:currentUser.uid,
    name:safeName,
    rating:currentReviewRating,
    comment,
    date:new Date().toISOString()
  });

  save(STORAGE.reviews,reviews);

  showToast("Avis publié.");

  openProduct(currentProduct.id);
  renderProducts();
}

/* =========================================================
   CHECKOUT
========================================================= */

$("checkoutButton").addEventListener("click",()=>{
  if(!currentUser){
    closeModal("cartModal");
    showLogin();
    openModal("authModal");
    showToast("Connecte-toi pour commander.");
    return;
  }

  if(!cart.length){
    showToast("Ton panier est vide.");
    return;
  }

  appliedPromo = null;

  $("promoCode").value = "";
  $("promoMessage").textContent = "";

  const subtotal = cartSubtotal();

  $("checkoutSubtotal").textContent = money(subtotal);
  $("checkoutDiscount").textContent = money(0);
  $("checkoutTotal").textContent = money(subtotal);

  closeModal("cartModal");
  openModal("checkoutModal");
});

function applyPromo(){
  const code =
    $("promoCode").value.trim().toUpperCase();

  if(!code){
    appliedPromo = null;
    $("promoMessage").textContent = "";
    updateCheckoutTotals();
    return;
  }

  if(PROMOS[code] !== undefined){
    appliedPromo = {
      code,
      percent:PROMOS[code]
    };

    $("promoMessage").textContent =
      `Code ${code} appliqué : -${PROMOS[code]}%`;

    $("promoMessage").className =
      "promo-message promo-valid";

    updateCheckoutTotals();

    return;
  }

  appliedPromo = null;

  $("promoMessage").textContent =
    "Code promotionnel invalide.";

  $("promoMessage").className =
    "promo-message promo-invalid";

  updateCheckoutTotals();
}

$("applyPromo").addEventListener("click",applyPromo);

function updateCheckoutTotals(){
  const subtotal = cartSubtotal();

  const discount =
    appliedPromo
    ? subtotal * appliedPromo.percent / 100
    : 0;

  const total = Math.max(0,subtotal-discount);

  $("checkoutSubtotal").textContent = money(subtotal);
  $("checkoutDiscount").textContent = `-${money(discount)}`;
  $("checkoutTotal").textContent = money(total);

  if(appliedPromo?.percent === 100){
    $("payButton").textContent =
      "🎟️ Valider avec NOVA100";
  }else{
    $("payButton").textContent =
      "💳 Valider la commande";
  }
}

$("checkoutForm").addEventListener("submit",event=>{
  event.preventDefault();

  const fullName = $("fullName").value.trim();
  const address = $("address").value.trim();
  const postalCode = $("postalCode").value.trim();
  const city = $("city").value.trim();
  const country = $("country").value.trim();

  if(!fullName || !address || !postalCode || !city || !country){
    showToast("Remplis tous les champs.");
    return;
  }

  /*
    Validation de format uniquement.
    Ce frontend ne peut pas vérifier l'existence réelle
    d'une adresse.
  */

  if(!/^\d{4,6}$/.test(postalCode)){
    showToast("Code postal incorrect.");
    return;
  }

  const subtotal = cartSubtotal();

  const discount =
    appliedPromo
    ? subtotal * appliedPromo.percent / 100
    : 0;

  const total =
    Math.max(0,subtotal-discount);

  /*
    Pour éviter de simuler un vrai paiement,
    la commande gratuite utilise NOVA100.
    Un vrai paiement PayPal nécessite une confirmation
    côté serveur/webhook.
  */

  if(total > 0){
    showToast(
      "Pour cette démo, utilise NOVA100 pour valider."
    );
    return;
  }

  createOrder({
    fullName,
    address,
    postalCode,
    city,
    country,
    subtotal,
    discount,
    total,
    promo:appliedPromo?.code || null
  });
});

function createOrder(customer){
  const now = new Date();

  /*
    Livraison par défaut :
    +3 jours, 18h.
  */

  const delivery = new Date(now);

  delivery.setDate(delivery.getDate()+3);
  delivery.setHours(18,0,0,0);

  const order = {
    id:uid(),
    number:"NS-" + Math.floor(100000 + Math.random()*900000),

    userId:currentUser.uid,
    email:currentUser.email || "",

    customer,

    items:cart.map(item=>({
      id:item.id,
      qty:item.qty
    })),

    status:"Préparation",

    /*
      IMPORTANT :
      Tous ces champs sont modifiables dans le Dashboard.
    */

    truckLocation:"Entrepôt",
    destination:customer.city,
    deliveryDate:delivery.toISOString(),
    tracking:"NOV-" + Math.floor(10000000 + Math.random()*90000000),

    createdAt:now.toISOString(),

    subtotal:customer.subtotal,
    discount:customer.discount,
    total:customer.total,

    promo:customer.promo,

    paymentMethod:
      customer.promo === "NOVA100"
      ? "Code promotionnel"
      : "En attente"

  };

  orders.unshift(order);

  save(STORAGE.orders,orders);

  cart = [];
  save(STORAGE.cart,cart);

  updateCartCount();

  $("checkoutForm").reset();
  $("country").value = "France";

  appliedPromo = null;

  closeModal("checkoutModal");

  showToast("Commande créée.");

  renderOrders();

  openInvoice(order.id);
}

/* =========================================================
   ORDERS
========================================================= */

$("ordersButton").addEventListener("click",()=>{
  renderOrders();
  openModal("ordersModal");
});

$("heroOrders").addEventListener("click",()=>{
  if(!currentUser){
    showLogin();
    openModal("authModal");
    return;
  }

  renderOrders();
  openModal("ordersModal");
});

function userOrders(){
  if(!currentUser) return [];

  return orders.filter(
    order => order.userId === currentUser.uid
  );
}

function deliveryRemaining(date){
  const target = new Date(date).getTime();
  const now = Date.now();

  let difference = target-now;

  if(difference <= 0){
    return {
      expired:true,
      text:"Arrivée prévue maintenant"
    };
  }

  const seconds =
    Math.floor(difference/1000);

  const days =
    Math.floor(seconds/86400);

  const hours =
    Math.floor((seconds%86400)/3600);

  const minutes =
    Math.floor((seconds%3600)/60);

  const secs =
    seconds%60;

  return {
    expired:false,
    days,
    hours,
    minutes,
    seconds:secs,
    text:
      `${days}j ${hours}h ${minutes}m ${secs}s`
  };
}

function progressForStatus(status){
  if(status === "Préparation") return 20;
  if(status === "Expédiée") return 45;
  if(status === "En transit") return 75;
  if(status === "Livrée") return 100;

  return 20;
}

function renderOrders(){
  const content = $("ordersContent");

  if(!currentUser){
    content.innerHTML = `
      <p>Connecte-toi pour voir tes commandes.</p>
    `;
    return;
  }

  const list = userOrders();

  if(!list.length){
    content.innerHTML = `
      <div style="text-align:center;padding:50px 10px;color:#69707a">
        <div style="font-size:45px">📦</div>
        <strong>Aucune commande</strong>
      </div>
    `;

    return;
  }

  content.innerHTML = list.map(order=>{

    const remaining =
      deliveryRemaining(order.deliveryDate);

    const deliveryDate =
      new Date(order.deliveryDate)
        .toLocaleString("fr-FR",{
          dateStyle:"medium",
          timeStyle:"short"
        });

    const progress =
      progressForStatus(order.status);

    return `
      <div
        class="order-card"
        data-order-card="${order.id}"
      >

        <div class="order-top">

          <div>
            <div class="order-id">
              ${escapeHTML(order.number)}
            </div>

            <div style="font-size:12px;color:#69707a;margin-top:3px">
              ${new Date(order.createdAt).toLocaleDateString("fr-FR")}
            </div>
          </div>

          <span class="status">
            ${escapeHTML(order.status)}
          </span>

        </div>

        <div style="font-size:13px">
          ${order.items.map(item=>{
            const product = getProduct(item.id);

            return product
              ? `<div style="padding:3px 0">
                   ${item.qty} × ${escapeHTML(product.name)}
                 </div>`
              : "";
          }).join("")}
        </div>

        <div class="delivery-box">

          <div style="
            font-weight:950;
            margin-bottom:8px;
          ">
            🚚 Suivi de livraison
          </div>

          <div class="delivery-row">
            <span>📍 Camion actuellement</span>
            <strong>${escapeHTML(order.truckLocation || "Non renseigné")}</strong>
          </div>

          <div class="delivery-row">
            <span>🎯 Destination</span>
            <strong>${escapeHTML(order.destination || order.customer.city)}</strong>
          </div>

          <div class="delivery-row">
            <span>⏱️ Temps restant</span>
            <strong
              class="countdown"
              data-countdown="${order.id}"
            >
              ${remaining.text}
            </strong>
          </div>

          <div class="delivery-row">
            <span>📅 Arrivée prévue</span>
            <strong>${deliveryDate}</strong>
          </div>

          <div class="delivery-row">
            <span>🔢 Suivi</span>
            <strong>${escapeHTML(order.tracking || "N/A")}</strong>
          </div>

          <div class="truck-progress">
            <span style="width:${progress}%"></span>
          </div>

        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:14px;
        ">

          <strong>
            ${money(order.total)}
          </strong>

          <button
            class="icon-btn"
            data-invoice="${order.id}"
          >
            🧾 Facture
          </button>

        </div>

      </div>
    `;
  }).join("");

  content.querySelectorAll("[data-invoice]").forEach(button=>{
    button.addEventListener("click",()=>{
      openInvoice(button.dataset.invoice);
    });
  });

  updateCountdowns();
}

function updateCountdowns(){
  document.querySelectorAll("[data-countdown]").forEach(element=>{
    const id = element.dataset.countdown;

    const order = orders.find(o=>o.id === id);

    if(!order) return;

    element.textContent =
      deliveryRemaining(order.deliveryDate).text;
  });
}

setInterval(updateCountdowns,1000);

/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard(){
  if(!isAdmin()){
    showToast("Accès refusé.");
    return;
  }

  $("statOrders").textContent = orders.length;

  $("statFree").textContent =
    orders.filter(o=>o.total === 0).length;

  const catalog =
    PRODUCTS.reduce((sum,p)=>sum+p.price,0);

  $("statCatalog").textContent = money(catalog);

  renderAdminOrders();
  renderAdminPromos();
}

function renderAdminOrders(){
  const container = $("adminOrders");

  if(!orders.length){
    container.innerHTML = `
      <div style="
        padding:35px;
        text-align:center;
        color:#69707a;
        border:1px dashed var(--line);
        border-radius:15px;
      ">
        Aucune commande.
      </div>
    `;

    return;
  }

  container.innerHTML = orders.map(order=>{

    const deliveryDate =
      new Date(order.deliveryDate);

    const localDate =
      new Date(
        deliveryDate.getTime() -
        deliveryDate.getTimezoneOffset()*60000
      )
      .toISOString()
      .slice(0,16);

    return `
      <div class="admin-order">

        <h4>
          📦 ${escapeHTML(order.number)}
        </h4>

        <div style="
          color:#69707a;
          font-size:12px;
          margin-bottom:14px;
        ">
          Client : ${escapeHTML(order.email)}
        </div>

        <div class="admin-grid">

          <div class="admin-field">
            <label>🚚 Statut</label>

            <select
              data-admin-status="${order.id}"
            >
              ${DELIVERY_STATUSES.map(status=>`
                <option
                  value="${escapeHTML(status)}"
                  ${status === order.status ? "selected" : ""}
                >
                  ${escapeHTML(status)}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="admin-field">
            <label>📍 Position actuelle du camion</label>

            <input
              data-admin-location="${order.id}"
              value="${escapeHTML(order.truckLocation || "")}"
              placeholder="Ex : Centre logistique Lille"
            >
          </div>

          <div class="admin-field">
            <label>🎯 Destination</label>

            <input
              data-admin-destination="${order.id}"
              value="${escapeHTML(order.destination || "")}"
              placeholder="Ex : Roubaix"
            >
          </div>

          <div class="admin-field">
            <label>🔢 Numéro de suivi</label>

            <input
              data-admin-tracking="${order.id}"
              value="${escapeHTML(order.tracking || "")}"
              placeholder="Numéro de suivi"
            >
          </div>

          <div class="admin-field">
            <label>📅 Date et heure d'arrivée</label>

            <input
              type="datetime-local"
              data-admin-date="${order.id}"
              value="${localDate}"
            >
          </div>

          <div class="admin-field">
            <label>⏱️ Durée restante personnalisée</label>

            <select data-admin-duration="${order.id}">
              <option value="">Calculée automatiquement</option>
              <option value="3600">1 heure</option>
              <option value="10800">3 heures</option>
              <option value="21600">6 heures</option>
              <option value="43200">12 heures</option>
              <option value="86400">1 jour</option>
              <option value="172800">2 jours</option>
              <option value="259200">3 jours</option>
              <option value="432000">5 jours</option>
              <option value="604800">7 jours</option>
            </select>
          </div>

          <div class="admin-field admin-full">

            <label>
              ⚡ Durée exacte en minutes
            </label>

            <input
              type="number"
              min="0"
              step="1"
              data-admin-minutes="${order.id}"
              placeholder="Ex : 1840"
            >

          </div>

        </div>

        <button
          class="save-delivery"
          data-save-delivery="${order.id}"
        >
          💾 Enregistrer la livraison
        </button>

      </div>
    `;
  }).join("");

  container
    .querySelectorAll("[data-save-delivery]")
    .forEach(button=>{
      button.addEventListener("click",()=>{
        saveDelivery(button.dataset.saveDelivery);
      });
    });
}

function saveDelivery(orderId){
  if(!isAdmin()){
    showToast("Accès refusé.");
    return;
  }

  const order =
    orders.find(o=>o.id === orderId);

  if(!order) return;

  const status =
    document.querySelector(
      `[data-admin-status="${orderId}"]`
    ).value;

  const location =
    document.querySelector(
      `[data-admin-location="${orderId}"]`
    ).value.trim();

  const destination =
    document.querySelector(
      `[data-admin-destination="${orderId}"]`
    ).value.trim();

  const tracking =
    document.querySelector(
      `[data-admin-tracking="${orderId}"]`
    ).value.trim();

  const dateInput =
    document.querySelector(
      `[data-admin-date="${orderId}"]`
    );

  const durationSelect =
    document.querySelector(
      `[data-admin-duration="${orderId}"]`
    );

  const minutesInput =
    document.querySelector(
      `[data-admin-minutes="${orderId}"]`
    );

  if(!location){
    showToast("Indique la position du camion.");
    return;
  }

  if(!destination){
    showToast("Indique la destination.");
    return;
  }

  /*
    Si une durée est choisie,
    elle devient prioritaire sur la date.
  */

  const selectedSeconds =
    Number(durationSelect.value || 0);

  const exactMinutes =
    Number(minutesInput.value || 0);

  if(exactMinutes > 0){

    const target =
      new Date(
        Date.now() + exactMinutes*60000
      );

    order.deliveryDate =
      target.toISOString();

  }else if(selectedSeconds > 0){

    const target =
      new Date(
        Date.now() + selectedSeconds*1000
      );

    order.deliveryDate =
      target.toISOString();

  }else if(dateInput.value){

    /*
      datetime-local représente l'heure locale.
    */

    const target =
      new Date(dateInput.value);

    if(!Number.isNaN(target.getTime())){
      order.deliveryDate =
        target.toISOString();
    }

  }

  order.status = status;
  order.truckLocation = location;
  order.destination = destination;
  order.tracking = tracking;

  save(STORAGE.orders,orders);

  renderDashboard();

  if(currentUser){
    renderOrders();
  }

  showToast("🚚 Livraison mise à jour.");
}

/* =========================================================
   PROMOS DASHBOARD
========================================================= */

function renderAdminPromos(){
  $("adminPromos").innerHTML =
    Object.entries(PROMOS).map(([code,percent])=>`
      <div class="promo-admin">
        <strong>${code}</strong>
        <span>-${percent}%</span>
      </div>
    `).join("");
}

/* =========================================================
   INVOICE
========================================================= */

function openInvoice(orderId){
  const order =
    orders.find(o=>o.id === orderId);

  if(!order) return;

  const customer = order.customer;

  $("invoiceContent").innerHTML = `
    <div class="invoice">

      <div class="invoice-head">

        <div>
          <div class="invoice-logo">
            NOVA<span>SHOP</span>
          </div>

          <div style="
            margin-top:6px;
            color:#69707a;
            font-size:12px;
          ">
            Marketplace gaming
          </div>
        </div>

        <div class="invoice-meta">
          <strong>FACTURE</strong><br>
          ${escapeHTML(order.number)}<br>
          ${new Date(order.createdAt).toLocaleDateString("fr-FR")}
        </div>

      </div>

      <div class="invoice-customer">

        <div>
          <strong>Client</strong>

          <div style="margin-top:6px;font-size:13px">
            ${escapeHTML(customer.fullName)}
          </div>

          <div style="font-size:13px">
            ${escapeHTML(order.email)}
          </div>
        </div>

        <div>
          <strong>Livraison</strong>

          <div style="margin-top:6px;font-size:13px">
            ${escapeHTML(customer.address)}
          </div>

          <div style="font-size:13px">
            ${escapeHTML(customer.postalCode)}
            ${escapeHTML(customer.city)}
          </div>

          <div style="font-size:13px">
            ${escapeHTML(customer.country)}
          </div>
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

          ${order.items.map(item=>{

            const product =
              getProduct(item.id);

            if(!product) return "";

            return `
              <tr>
                <td>${escapeHTML(product.name)}</td>
                <td>${item.qty}</td>
                <td>${money(product.price)}</td>
                <td>${money(product.price * item.qty)}</td>
              </tr>
            `;

          }).join("")}

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

        <div class="invoice-grand">
          <span>Total</span>
          <strong>${money(order.total)}</strong>
        </div>

      </div>

      <div style="
        margin-top:30px;
        padding-top:15px;
        border-top:1px solid #ddd;
        font-size:12px;
        color:#69707a;
      ">
        Méthode de paiement :
        <strong>${escapeHTML(order.paymentMethod)}</strong>
        <br>
        Code promotionnel :
        <strong>${escapeHTML(order.promo || "Aucun")}</strong>
      </div>

    </div>
  `;

  openModal("invoiceModal");
}

$("printInvoice").addEventListener("click",()=>{
  window.print();
});

/* =========================================================
   SETTINGS
========================================================= */

function applySettings(){
  document.body.classList.toggle("dark",settings.dark);

  $("darkSwitch").classList.toggle(
    "active",
    settings.dark
  );

  $("soundSwitch").classList.toggle(
    "active",
    settings.sound
  );
}

$("settingsButton").addEventListener("click",()=>{
  applySettings();
  openModal("settingsModal");
});

$("darkSwitch").addEventListener("click",()=>{
  settings.dark = !settings.dark;

  save(STORAGE.settings,settings);
  applySettings();
});

$("soundSwitch").addEventListener("click",()=>{
  settings.sound = !settings.sound;

  save(STORAGE.settings,settings);
  applySettings();

  playSound();
});

/* =========================================================
   HERO
========================================================= */

$("heroProducts").addEventListener("click",()=>{
  document.querySelector(".products-head")
    .scrollIntoView({
      behavior:"smooth"
    });
});

/* =========================================================
   KEYBOARD ESC
========================================================= */

document.addEventListener("keydown",event=>{
  if(event.key === "Escape"){
    closeAllModals();
  }
});

/* =========================================================
   INITIALIZATION
========================================================= */

function boot(){

  applySettings();

  updateCartCount();

  updateAccountUI();

  renderProducts();

  renderCart();

  /*
    Nettoyage des produits inexistants
    dans le panier.
  */

  cart = cart.filter(item=>{
    return Boolean(getProduct(item.id));
  });

  save(STORAGE.cart,cart);

  updateCartCount();

  /*
    Nettoyage commandes invalides.
  */

  orders = orders.filter(order=>{
    return order &&
           order.id &&
           order.userId;
  });

  save(STORAGE.orders,orders);
}

boot();

/* =========================================================
   DEBUG UTILS
========================================================= */

window.NovaShop = {
  products:PRODUCTS,
  orders,
  cart,
  reviews,
  settings,

  refresh(){
    renderProducts();
    renderCart();
    renderOrders();
    renderDashboard();
  },

  adminCode:ADMIN_CODE
};
