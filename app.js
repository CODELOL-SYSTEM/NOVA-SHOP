/* =========================================================
   NOVASHOP - APP.JS
   Version complète
   43 PRODUITS
   Firebase + panier + comptes + commandes + admin
   Thème sombre/clair/auto + FR/EN
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSy5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const categoriesEl = $("categories");
const productsGrid = $("productsGrid");
const productCount = $("productCount");

const cartBtn = $("cartBtn");
const cartBadge = $("cartBadge");
const cartOverlay = $("cartOverlay");
const cartDrawer = $("cartDrawer");
const cartClose = $("cartClose");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const checkoutBtn = $("checkoutBtn");

const settingsBtn = $("settingsBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");

const modal = $("modal");
const modalContent = $("modalContent");
const modalTitle = $("modalTitle");
const modalClose = $("modalClose");

const toastContainer = $("toastContainer");

const heroShopBtn = $("heroShopBtn");
const heroSearchBtn = $("heroSearchBtn");


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let authMode = "login";

let selectedCategory = "Toutes";
let searchValue = "";

let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

let reviewsCache = {};

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   PRODUITS
========================================================= */

const products = [

  {
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id: "p2",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },

  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: "https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
  },

  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },

  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },

  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },

  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },

  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },

  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp"
  },

  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },

  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },

  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },

  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },

  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },

  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },

  {
    id: "p16",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },

  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg"
  },

  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  },

  {
    id: "p19",
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms HDMI 2.0/DP1.4",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id: "p20",
    name: 'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
    category: "Écrans",
    price: 65.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds capacité 150 kg gris ardoise",
    category: "Chaises gaming",
    price: 129.99,
    image: "https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },

  {
    id: "p22",
    name: "Dowinx Série Luxe Suède LS-66D68E Blanc",
    category: "Chaises gaming",
    price: 79.99,
    image: "https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },

  {
    id: "p23",
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category: "Chaises gaming",
    price: 109.99,
    image: "https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },

  {
    id: "p24",
    name: "Desk Lite - Height-Adjustable Desk",
    category: "Bureaux gaming",
    price: 110.99,
    image: "https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },

  {
    id: "p25",
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile, assis-debout électrique",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible support écran, étagère maille réglable, noir",
    category: "Bureaux gaming",
    price: 44.99,
    image: "https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },

  {
    id: "p27",
    name: "Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category: "Casques",
    price: 99.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },

  {
    id: "p28",
    name: "Razer BlackShark V2 Pro 2023 Noir",
    category: "Casques",
    price: 75.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },

  {
    id: "p29",
    name: "beyerdynamic DT-990 Pro 250 Ohm",
    category: "Casques",
    price: 60.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },

  {
    id: "p30",
    name: "Logitech PRO X TKL Rapid Noir, filaire AZERTY, sans pavé numérique",
    category: "Claviers",
    price: 78.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap, Full RGB",
    category: "Claviers",
    price: 56.99,
    image: "https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI, black forged",
    category: "Souris",
    price: 26.99,
    image: "https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },

  {
    id: "p34",
    name: "HyperX QuadCast 2 – Microphone USB – RGB",
    category: "Microphones",
    price: 98.99,
    image: "https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },

  {
    id: "p35",
    name: "Shure SM7 dB",
    category: "Microphones",
    price: 121.99,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },

  {
    id: "p36",
    name: "Razer Seiren V3 Chroma Noir",
    category: "Microphones",
    price: 13.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },

  {
    id: "p37",
    name: "Stairville LED Pixel Rail 40 RGB MKII",
    category: "Éclairage RGB",
    price: 18.90,
    image: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },

  {
    id: "p38",
    name: "Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category: "Éclairage RGB",
    price: 0,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },

  {
    id: "p39",
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu 550W 6500K 230V",
    category: "Éclairage RGB",
    price: 91.10,
    image: "https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },

  {
    id: "p40",
    name: "GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category: "Cartes graphiques",
    price: 147,
    image: "https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
  },

  {
    id: "p41",
    name: "MSI GeForce RTX 3050 LP E 6G OC",
    category: "Cartes graphiques",
    price: 100,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
  },

  {
    id: "p42",
    name: "ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category: "Cartes graphiques",
    price: 140,
    image: "https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
  },

  {
    id: "p43",
    name: "PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category: "PC Gamer",
    price: 650,
    image: "https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    newProduct: true
  }

];


/* =========================================================
   VÉRIFICATION
========================================================= */

console.log("NovaShop : produits chargés =", products.length);

if (products.length !== 43) {
  console.warn(
    "⚠️ NovaShop : le catalogue devrait contenir 43 produits."
  );
}


/* =========================================================
   TRADUCTIONS
========================================================= */

const translations = {

  fr: {

    search: "Rechercher un produit...",
    shop: "Voir les produits",
    discover: "Découvrir",

    all: "Toutes",
    products: "produits",

    add: "Ajouter",
    details: "Voir",
    reviews: "avis",

    new: "Nouveau",

    cart: "Panier",
    emptyCart: "Votre panier est vide.",
    total: "Total",
    checkout: "Commander",

    account: "Compte",
    login: "Connexion",
    register: "Créer un compte",
    logout: "Déconnexion",

    email: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",

    orders: "Mes commandes",
    noOrders: "Aucune commande.",

    settings: "Paramètres",
    theme: "Thème",
    dark: "Sombre",
    light: "Clair",
    auto: "Automatique",

    language: "Langue",
    french: "Français",
    english: "English",

    animations: "Animations",

    admin: "Administration",
    adminCode: "Code administrateur",

    secure: "Paiement sécurisé",
    returns: "Retours",
    guarantee: "Garantie",
    support: "Support client",

    demoReviews:
      "Avis de démonstration affichés pour présenter le fonctionnement du site.",

    added: "Produit ajouté au panier !",
    removed: "Produit retiré du panier.",
    loginRequired: "Connectez-vous pour continuer.",
    orderSuccess: "Commande enregistrée !",
    adminActivated: "Mode administrateur activé.",
    adminRemoved: "Autorisation administrateur supprimée.",

    invalidLogin: "Identifiants incorrects.",
    accountCreated: "Compte créé avec succès.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",

    noResults: "Aucun produit trouvé."
  },

  en: {

    search: "Search for a product...",
    shop: "View products",
    discover: "Discover",

    all: "All",
    products: "products",

    add: "Add",
    details: "View",
    reviews: "reviews",

    new: "New",

    cart: "Cart",
    emptyCart: "Your cart is empty.",
    total: "Total",
    checkout: "Checkout",

    account: "Account",
    login: "Login",
    register: "Create account",
    logout: "Logout",

    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",

    orders: "My orders",
    noOrders: "No orders.",

    settings: "Settings",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    auto: "Automatic",

    language: "Language",
    french: "Français",
    english: "English",

    animations: "Animations",

    admin: "Administration",
    adminCode: "Administrator code",

    secure: "Secure payment",
    returns: "Returns",
    guarantee: "Warranty",
    support: "Customer support",

    demoReviews:
      "Demo reviews are displayed to demonstrate the website functionality.",

    added: "Product added to cart!",
    removed: "Product removed from cart.",
    loginRequired: "Please log in to continue.",
    orderSuccess: "Order saved!",
    adminActivated: "Administrator mode activated.",
    adminRemoved: "Administrator authorization removed.",

    invalidLogin: "Incorrect credentials.",
    accountCreated: "Account created successfully.",
    passwordMismatch: "Passwords do not match.",

    noResults: "No products found."
  }

};


/* =========================================================
   LANGUAGE
========================================================= */

let language =
  localStorage.getItem("novaLanguage") || "fr";

function t(key) {
  return translations[language]?.[key] || translations.fr[key] || key;
}


/* =========================================================
   THEME
========================================================= */

let themeChoice =
  localStorage.getItem("novaThemeChoice") || "dark";

function applyTheme() {

  if (themeChoice === "light") {
    document.documentElement.dataset.theme = "light";
  }

  else if (themeChoice === "auto") {

    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    document.documentElement.dataset.theme =
      prefersLight ? "light" : "dark";
  }

  else {
    document.documentElement.dataset.theme = "dark";
  }
}

applyTheme();


/* =========================================================
   ANIMATIONS
========================================================= */

let animationsEnabled =
  localStorage.getItem("novaAnimations") !== "false";

function applyAnimations() {

  document.documentElement.classList.toggle(
    "no-animations",
    !animationsEnabled
  );
}

applyAnimations();


/* =========================================================
   TOAST
========================================================= */

function toast(message, type = "success") {

  if (!toastContainer) return;

  const el = document.createElement("div");

  el.className = `toast toast-${type}`;

  el.textContent = message;

  toastContainer.appendChild(el);

  requestAnimationFrame(() => {
    el.classList.add("show");
  });

  setTimeout(() => {

    el.classList.remove("show");

    setTimeout(() => {
      el.remove();
    }, 300);

  }, 2600);
}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

  if (price === 0) {
    return language === "fr"
      ? "Prix à venir"
      : "Price coming soon";
  }

  return new Intl.NumberFormat(
    language === "fr" ? "fr-FR" : "en-US",
    {
      style: "currency",
      currency: "EUR"
    }
  ).format(price);
}


/* =========================================================
   CATEGORIES
========================================================= */

function getCategories() {

  const categories = [
    ...new Set(products.map(p => p.category))
  ];

  return categories;
}


function renderCategories() {

  if (!categoriesEl) return;

  const categories = getCategories();

  categoriesEl.innerHTML = "";

  const allButton = document.createElement("button");

  allButton.className =
    "category-btn " +
    (selectedCategory === "Toutes" ? "active" : "");

  allButton.textContent = t("all");

  allButton.addEventListener("click", () => {

    selectedCategory = "Toutes";

    renderCategories();
    renderProducts();

  });

  categoriesEl.appendChild(allButton);


  categories.forEach(category => {

    const button =
      document.createElement("button");

    button.className =
      "category-btn " +
      (selectedCategory === category ? "active" : "");

    button.textContent = category;

    button.addEventListener("click", () => {

      selectedCategory = category;

      renderCategories();
      renderProducts();

    });

    categoriesEl.appendChild(button);

  });
}


/* =========================================================
   FILTER
========================================================= */

function filteredProducts() {

  const term =
    searchValue
      .trim()
      .toLowerCase();

  return products.filter(product => {

    const categoryMatch =
      selectedCategory === "Toutes" ||
      product.category === selectedCategory;

    const searchMatch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term);

    return categoryMatch && searchMatch;

  });
}


/* =========================================================
   PRODUCT REVIEWS
========================================================= */

function getDemoReviews(product) {

  if (reviewsCache[product.id]) {
    return reviewsCache[product.id];
  }

  const names = [
    "Alex",
    "Lucas",
    "Thomas",
    "Max",
    "Nathan",
    "Hugo",
    "Ethan"
  ];

  const comments = [
    "Très bon produit, livraison rapide.",
    "Correspond parfaitement à la description.",
    "Très bonne qualité.",
    "Bon rapport qualité/prix.",
    "Produit reçu rapidement.",
    "Très satisfait de mon achat."
  ];

  const reviewCount =
    3 + Math.floor(Math.random() * 3);

  const reviews = [];

  for (let i = 0; i < reviewCount; i++) {

    reviews.push({
      name:
        names[Math.floor(Math.random() * names.length)],

      rating:
        4 + Math.floor(Math.random() * 2),

      comment:
        comments[Math.floor(Math.random() * comments.length)]
    });

  }

  reviewsCache[product.id] = reviews;

  return reviews;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const reviews =
    getDemoReviews(product);

  const average =
    reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    ) / reviews.length;

  const stars =
    "★".repeat(Math.round(average)) +
    "☆".repeat(5 - Math.round(average));

  return `
    <article
      class="product-card"
      data-product-id="${product.id}"
    >

      <div class="product-image-wrap">

        ${
          product.newProduct
            ? `<span class="product-badge">${t("new")}</span>`
            : ""
        }

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        />

      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h3 class="product-name">
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-rating">

          <span class="stars">
            ${stars}
          </span>

          <span>
            ${reviews.length} ${t("reviews")}
          </span>

        </div>

        <div class="product-bottom">

          <strong class="product-price">
            ${formatPrice(product.price)}
          </strong>

          <div class="product-actions">

            <button
              class="product-view-btn"
              data-view="${product.id}"
            >
              ${t("details")}
            </button>

            <button
              class="product-add-btn"
              data-add="${product.id}"
            >
              ${t("add")}
            </button>

          </div>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  if (!productsGrid) return;

  const list =
    filteredProducts();

  if (productCount) {

    productCount.textContent =
      `${list.length} ${t("products")}`;
  }

  if (!list.length) {

    productsGrid.innerHTML = `
      <div class="empty-products">
        <div class="empty-icon">🔎</div>
        <h3>${t("noResults")}</h3>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    list.map(productCard).join("");

  bindProductButtons();

}


/* =========================================================
   PRODUCT BUTTONS
========================================================= */

function bindProductButtons() {

  document
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const id =
          button.dataset.add;

        const product =
          products.find(p => p.id === id);

        if (!product) return;

        addToCart(product, button);

      });

    });


  document
    .querySelectorAll("[data-view]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const id =
          button.dataset.view;

        const product =
          products.find(p => p.id === id);

        if (!product) return;

        openProductModal(product);

      });

    });

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   CART STORAGE
========================================================= */

function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


/* =========================================================
   CART COUNT
========================================================= */

function cartQuantity() {

  return cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

}


function updateCartBadge() {

  if (!cartBadge) return;

  const quantity =
    cartQuantity();

  cartBadge.textContent =
    quantity;

  cartBadge.classList.toggle(
    "visible",
    quantity > 0
  );

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product, sourceButton = null) {

  const existing =
    cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  }

  else {

    cart.push({
      id: product.id,
      quantity: 1
    });

  }

  saveCart();

  renderCart();

  updateCartBadge();

  animateProductToCart(
    sourceButton,
    product
  );

  toast(t("added"));

}


/* =========================================================
   PRODUCT -> CART ANIMATION
========================================================= */

function animateProductToCart(
  sourceButton,
  product
) {

  if (!animationsEnabled) return;

  if (!sourceButton || !cartBtn) return;

  const card =
    sourceButton.closest(".product-card");

  if (!card) return;

  const image =
    card.querySelector(".product-image");

  if (!image) return;

  const start =
    image.getBoundingClientRect();

  const target =
    cartBtn.getBoundingClientRect();

  const clone =
    image.cloneNode(true);

  clone.className =
    "cart-fly-image";

  clone.style.position = "fixed";
  clone.style.left = `${start.left}px`;
  clone.style.top = `${start.top}px`;
  clone.style.width = `${Math.min(start.width, 110)}px`;
  clone.style.height = `${Math.min(start.height, 110)}px`;
  clone.style.objectFit = "contain";
  clone.style.zIndex = "99999";
  clone.style.pointerEvents = "none";

  document.body.appendChild(clone);

  const x =
    target.left +
    target.width / 2 -
    start.left -
    start.width / 2;

  const y =
    target.top +
    target.height / 2 -
    start.top -
    start.height / 2;

  clone.animate(
    [
      {
        transform: "translate(0,0) scale(1)",
        opacity: 1
      },
      {
        transform:
          `translate(${x * 0.65}px,${y * 0.65}px) scale(.7)`,
        opacity: .85
      },
      {
        transform:
          `translate(${x}px,${y}px) scale(.18)`,
        opacity: 0
      }
    ],
    {
      duration: 650,
      easing: "cubic-bezier(.2,.75,.25,1)"
    }
  ).finished
    .then(() => clone.remove())
    .catch(() => clone.remove());

  cartBtn.animate(
    [
      {
        transform: "scale(1)"
      },
      {
        transform: "scale(1.08)"
      },
      {
        transform: "scale(1)"
      }
    ],
    {
      duration: 350
    }
  );

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();

  renderCart();

  updateCartBadge();

  toast(t("removed"));

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, amount) {

  const item =
    cart.find(
      item => item.id === id
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id);
    return;

  }

  saveCart();

  renderCart();

  updateCartBadge();

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return total;

      return total +
        product.price * item.quantity;

    },
    0
  );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  if (!cartItems) return;

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>${t("emptyCart")}</p>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent =
        formatPrice(0);
    }

    return;
  }


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";

      return `
        <div class="cart-item">

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          />

          <div class="cart-item-info">

            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <span>
              ${formatPrice(product.price)}
            </span>

            <div class="cart-item-controls">

              <button
                data-cart-minus="${product.id}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-cart-plus="${product.id}"
              >
                +
              </button>

              <button
                class="cart-remove"
                data-cart-remove="${product.id}"
              >
                ×
              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");


  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(getCartTotal());

  }


  document
    .querySelectorAll("[data-cart-minus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => changeQuantity(
          button.dataset.cartMinus,
          -1
        )
      );

    });


  document
    .querySelectorAll("[data-cart-plus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => changeQuantity(
          button.dataset.cartPlus,
          1
        )
      );

    });


  document
    .querySelectorAll("[data-cart-remove]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => removeFromCart(
          button.dataset.cartRemove
        )
      );

    });

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

  if (!cartOverlay || !cartDrawer) return;

  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");

  document.body.classList.add("drawer-open");

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

  if (!cartOverlay || !cartDrawer) return;

  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");

  document.body.classList.remove("drawer-open");

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(product) {

  if (!modal || !modalContent) return;

  const reviews =
    getDemoReviews(product);

  modalTitle.textContent =
    product.name;

  modalContent.innerHTML = `

    <div class="product-modal">

      <div class="product-modal-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        />

      </div>

      <div class="product-modal-info">

        <span class="modal-category">
          ${escapeHTML(product.category)}
        </span>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="modal-price">
          ${formatPrice(product.price)}
        </div>

        <div class="modal-rating">
          ⭐ 4.8/5
          · ${reviews.length} ${t("reviews")}
        </div>

        <p class="demo-review-note">
          ${t("demoReviews")}
        </p>

        <div class="modal-reviews">

          ${reviews.map(review => `

            <div class="review">

              <div class="review-top">

                <strong>
                  ${escapeHTML(review.name)}
                </strong>

                <span>
                  ${"★".repeat(review.rating)}
                  ${"☆".repeat(5 - review.rating)}
                </span>

              </div>

              <p>
                ${escapeHTML(review.comment)}
              </p>

            </div>

          `).join("")}

        </div>

        <button
          class="modal-add-btn"
          id="modalAddProduct"
        >
          ${t("add")}
        </button>

      </div>

    </div>
  `;

  modal.classList.add("open");

  const addButton =
    $("modalAddProduct");

  if (addButton) {

    addButton.addEventListener(
      "click",
      () => {

        addToCart(product);

        closeModal();

      }
    );

  }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

  if (!modal) return;

  modal.classList.remove("open");

}


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

  openModal(
    t("settings"),
    `

      <div class="settings-panel">

        <section class="settings-section">

          <h3>
            ${t("theme")}
          </h3>

          <div class="settings-options">

            <button
              data-theme-option="dark"
              class="${themeChoice === "dark" ? "active" : ""}"
            >
              🌙 ${t("dark")}
            </button>

            <button
              data-theme-option="light"
              class="${themeChoice === "light" ? "active" : ""}"
            >
              ☀️ ${t("light")}
            </button>

            <button
              data-theme-option="auto"
              class="${themeChoice === "auto" ? "active" : ""}"
            >
              🖥️ ${t("auto")}
            </button>

          </div>

        </section>


        <section class="settings-section">

          <h3>
            ${t("language")}
          </h3>

          <div class="settings-options">

            <button
              data-language-option="fr"
              class="${language === "fr" ? "active" : ""}"
            >
              🇫🇷 ${t("french")}
            </button>

            <button
              data-language-option="en"
              class="${language === "en" ? "active" : ""}"
            >
              🇬🇧 ${t("english")}
            </button>

          </div>

        </section>


        <section class="settings-section">

          <h3>
            ${t("animations")}
          </h3>

          <label class="toggle-row">

            <span>
              ${t("animations")}
            </span>

            <input
              type="checkbox"
              id="animationsToggle"
              ${animationsEnabled ? "checked" : ""}
            />

          </label>

        </section>

      </div>

    `
  );


  document
    .querySelectorAll("[data-theme-option]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          themeChoice =
            button.dataset.themeOption;

          localStorage.setItem(
            "novaThemeChoice",
            themeChoice
          );

          applyTheme();

          openSettings();

        }
      );

    });


  document
    .querySelectorAll("[data-language-option]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          language =
            button.dataset.languageOption;

          localStorage.setItem(
            "novaLanguage",
            language
          );

          applyLanguage();

          openSettings();

        }
      );

    });


  const animationsToggle =
    $("animationsToggle");

  if (animationsToggle) {

    animationsToggle.addEventListener(
      "change",
      () => {

        animationsEnabled =
          animationsToggle.checked;

        localStorage.setItem(
          "novaAnimations",
          String(animationsEnabled)
        );

        applyAnimations();

      }
    );

  }

}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

  if (searchInput) {
    searchInput.placeholder =
      t("search");
  }

  renderCategories();
  renderProducts();
  renderCart();
  updateCartBadge();

}


/* =========================================================
   GENERIC MODAL
========================================================= */

function openModal(title, html) {

  if (!modal || !modalContent) return;

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  modalContent.innerHTML = html;

  modal.classList.add("open");

}


/* =========================================================
   AUTH MODAL
========================================================= */

function openAccount() {

  if (currentUser) {

    openAccountPanel();
    return;

  }

  authMode = "login";

  renderAuthModal();

}


function renderAuthModal() {

  const register =
    authMode === "register";

  openModal(
    register
      ? t("register")
      : t("login"),

    `

      <form
        id="authForm"
        class="auth-form"
      >

        <label>
          ${t("email")}

          <input
            type="email"
            id="authEmail"
            required
            autocomplete="email"
          />

        </label>


        <label>
          ${t("password")}

          <input
            type="password"
            id="authPassword"
            required
            autocomplete="${
              register
                ? "new-password"
                : "current-password"
            }"
          />

        </label>


        ${
          register
            ? `
              <label>
                ${t("confirmPassword")}

                <input
                  type="password"
                  id="authConfirmPassword"
                  required
                  autocomplete="new-password"
                />

              </label>
            `
            : ""
        }


        <button
          type="submit"
          class="auth-submit"
        >
          ${
            register
              ? t("register")
              : t("login")
          }
        </button>


        <button
          type="button"
          id="authSwitch"
          class="auth-switch"
        >
          ${
            register
              ? t("login")
              : t("register")
          }
        </button>

      </form>

    `
  );


  const form =
    $("authForm");

  form.addEventListener(
    "submit",
    handleAuth
  );


  $("authSwitch")
    .addEventListener(
      "click",
      () => {

        authMode =
          authMode === "login"
            ? "register"
            : "login";

        renderAuthModal();

      }
    );

}


/* =========================================================
   AUTH
========================================================= */

async function handleAuth(event) {

  event.preventDefault();

  const email =
    $("authEmail").value.trim();

  const password =
    $("authPassword").value;

  try {

    if (authMode === "register") {

      const confirm =
        $("authConfirmPassword").value;

      if (password !== confirm) {

        toast(
          t("passwordMismatch"),
          "error"
        );

        return;

      }

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast(t("accountCreated"));

      closeModal();

      return;
    }


    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal();

  }

  catch (error) {

    console.error(error);

    toast(
      t("invalidLogin"),
      "error"
    );

  }

}


/* =========================================================
   ACCOUNT PANEL
========================================================= */

function openAccountPanel() {

  if (!currentUser) {

    openAccount();
    return;

  }

  openModal(
    t("account"),

    `

      <div class="account-panel">

        <div class="account-avatar">
          👤
        </div>

        <h3>
          ${escapeHTML(
            currentUser.email || "Utilisateur"
          )}
        </h3>

        <button
          id="logoutBtn"
          class="danger-btn"
        >
          ${t("logout")}
        </button>

      </div>

    `
  );


  $("logoutBtn")
    .addEventListener(
      "click",
      async () => {

        await signOut(auth);

        closeModal();

      }
    );

}


/* =========================================================
   ORDERS
========================================================= */

async function openOrders() {

  if (!currentUser) {

    toast(
      t("loginRequired"),
      "error"
    );

    openAccount();

    return;

  }

  openModal(
    t("orders"),
    `<div class="loading">Chargement...</div>`
  );

  try {

    const ordersRef =
      collection(db, "orders");

    const q =
      query(
        ordersRef,
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map(
        item => ({
          id: item.id,
          ...item.data()
        })
      );

    orders.sort(
      (a, b) => {

        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return bTime - aTime;

      }
    );


    if (!orders.length) {

      modalContent.innerHTML = `
        <div class="empty-orders">
          <div>📦</div>
          <p>${t("noOrders")}</p>
        </div>
      `;

      return;

    }


    modalContent.innerHTML = `

      <div class="orders-list">

        ${orders.map(order => `

          <article class="order-card">

            <div class="order-header">

              <strong>
                Commande #${order.id.slice(0, 8)}
              </strong>

              <span>
                ${formatPrice(order.total || 0)}
              </span>

            </div>

            <div class="order-products">

              ${
                Array.isArray(order.items)
                  ? order.items.map(item => `
                      <div>
                        ${escapeHTML(item.name)}
                        × ${item.quantity}
                      </div>
                    `).join("")
                  : ""
              }

            </div>

          </article>

        `).join("")}

      </div>

    `;

  }

  catch (error) {

    console.error(error);

    modalContent.innerHTML = `
      <p>Impossible de charger les commandes.</p>
    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

async function checkout() {

  if (!currentUser) {

    toast(
      t("loginRequired"),
      "error"
    );

    closeCart();
    openAccount();

    return;

  }

  if (!cart.length) {

    toast(
      t("emptyCart"),
      "error"
    );

    return;

  }


  const items =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };

    });


  const total =
    getCartTotal();


  try {

    await addDoc(
      collection(db, "orders"),
      {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items,
        total,
        createdAt: serverTimestamp()
      }
    );


    cart = [];

    saveCart();

    renderCart();

    updateCartBadge();

    closeCart();

    toast(t("orderSuccess"));

  }

  catch (error) {

    console.error(error);

    toast(
      "Erreur lors de la commande.",
      "error"
    );

  }

}


/* =========================================================
   ADMIN
========================================================= */

function isAdminAuthorized() {

  return (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}


function openAdmin() {

  if (
    !currentUser ||
    currentUser.email !== ADMIN_EMAIL
  ) {

    toast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }


  if (!isAdminAuthorized()) {

    openAdminCode();

    return;

  }


  openAdminDashboard();

}


/* =========================================================
   ADMIN CODE
========================================================= */

function openAdminCode() {

  openModal(
    t("admin"),

    `

      <form
        id="adminCodeForm"
        class="admin-code-form"
      >

        <p>
          Entrez le code administrateur pour accéder au dashboard.
        </p>

        <input
          type="password"
          id="adminCodeInput"
          placeholder="${t("adminCode")}"
          autocomplete="off"
          required
        />

        <button
          type="submit"
          class="auth-submit"
        >
          ${t("admin")}
        </button>

      </form>

    `
  );


  $("adminCodeForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const code =
          $("adminCodeInput").value;

        if (code !== ADMIN_CODE) {

          toast(
            "Code incorrect.",
            "error"
          );

          return;

        }

        localStorage.setItem(
          ADMIN_ACCESS_KEY,
          "true"
        );

        toast(t("adminActivated"));

        openAdminDashboard();

      }
    );

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function openAdminDashboard() {

  openModal(
    t("admin"),

    `

      <div class="admin-dashboard">

        <div class="admin-header">

          <div>
            <span class="admin-label">
              ADMIN
            </span>

            <h2>
              NovaShop Dashboard
            </h2>
          </div>

          <div class="admin-stats">

            <div class="admin-stat">
              <strong>${products.length}</strong>
              <span>Produits</span>
            </div>

          </div>

        </div>


        <div class="admin-actions">

          <button
            id="removeAdminAuth"
            class="danger-btn"
          >
            Supprimer l'autorisation mémorisée
          </button>

          <button
            id="deleteOrdersBtn"
            class="danger-btn"
          >
            Supprimer toutes les commandes
          </button>

        </div>


        <div
          id="adminOrders"
          class="admin-orders"
        >
          Chargement des commandes...
        </div>

      </div>

    `
  );


  $("removeAdminAuth")
    .addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );

        toast(
          t("adminRemoved")
        );

        closeModal();

      }
    );


  $("deleteOrdersBtn")
    .addEventListener(
      "click",
      deleteAllOrders
    );


  loadAdminOrders();

}


/* =========================================================
   LOAD ADMIN ORDERS
========================================================= */

async function loadAdminOrders() {

  const container =
    $("adminOrders");

  if (!container) return;

  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    const orders =
      snapshot.docs.map(
        item => ({
          id: item.id,
          ...item.data()
        })
      );


    if (!orders.length) {

      container.innerHTML =
        "<p>Aucune commande.</p>";

      return;

    }


    container.innerHTML =
      orders.map(order => `

        <div class="admin-order-card">

          <div>

            <strong>
              #${order.id.slice(0, 8)}
            </strong>

            <span>
              ${escapeHTML(
                order.userEmail || ""
              )}
            </span>

          </div>

          <strong>
            ${formatPrice(order.total || 0)}
          </strong>

        </div>

      `).join("");

  }

  catch (error) {

    console.error(error);

    container.innerHTML =
      "<p>Erreur de chargement.</p>";

  }

}


/* =========================================================
   DELETE ALL ORDERS
========================================================= */

async function deleteAllOrders() {

  const confirmed =
    confirm(
      "Supprimer toutes les commandes ?"
    );

  if (!confirmed) return;

  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    for (
      const item of snapshot.docs
    ) {

      await deleteDoc(
        doc(db, "orders", item.id)
      );

    }

    toast(
      "Toutes les commandes ont été supprimées."
    );

    openAdminDashboard();

  }

  catch (error) {

    console.error(error);

    toast(
      "Erreur lors de la suppression.",
      "error"
    );

  }

}


/* =========================================================
   EVENTS
========================================================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value;

      renderProducts();

    }
  );

}


if (cartBtn) {

  cartBtn.addEventListener(
    "click",
    openCart
  );

}


if (cartClose) {

  cartClose.addEventListener(
    "click",
    closeCart
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );

}


if (checkoutBtn) {

  checkoutBtn.addEventListener(
    "click",
    checkout
  );

}


if (settingsBtn) {

  settingsBtn.addEventListener(
    "click",
    openSettings
  );

}


if (accountBtn) {

  accountBtn.addEventListener(
    "click",
    openAccount
  );

}


if (ordersBtn) {

  ordersBtn.addEventListener(
    "click",
    openOrders
  );

}


if (adminBtn) {

  adminBtn.addEventListener(
    "click",
    openAdmin
  );

}


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeModal();
      closeCart();

    }

  }
);


/* =========================================================
   HERO
========================================================= */

if (heroShopBtn) {

  heroShopBtn.addEventListener(
    "click",
    () => {

      const productsSection =
        document.querySelector(
          "#products"
        );

      if (productsSection) {

        productsSection.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


if (heroSearchBtn) {

  heroSearchBtn.addEventListener(
    "click",
    () => {

      if (searchInput) {

        searchInput.focus();

        searchInput.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }
  );

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    updateUserUI();

  }
);


/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {

  if (!accountBtn) return;

  if (currentUser) {

    accountBtn.classList.add(
      "logged-in"
    );

    accountBtn.title =
      currentUser.email;

  }

  else {

    accountBtn.classList.remove(
      "logged-in"
    );

    accountBtn.title =
      t("account");

  }


  if (adminBtn) {

    adminBtn.style.display =
      currentUser &&
      currentUser.email === ADMIN_EMAIL
        ? ""
        : "none";

  }

}


/* =========================================================
   SYSTEM THEME CHANGE
========================================================= */

if (window.matchMedia) {

  const media =
    window.matchMedia(
      "(prefers-color-scheme: light)"
    );

  media.addEventListener(
    "change",
    () => {

      if (themeChoice === "auto") {
        applyTheme();
      }

    }
  );

}


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

  console.log(
    "🚀 NovaShop initialisé"
  );

  console.log(
    `📦 ${products.length} produits disponibles`
  );

  renderCategories();

  renderProducts();

  renderCart();

  updateCartBadge();

  applyLanguage();

  updateUserUI();

}


init();


/* =========================================================
   DEBUG
========================================================= */

window.NovaShop = {

  products,

  get cart() {
    return cart;
  },

  get user() {
    return currentUser;
  },

  addToCart,

  removeFromCart,

  renderProducts,

  renderCart,

  openCart,

  closeCart,

  openSettings,

  openAccount,

  openOrders,

  openAdmin,

  clearCart() {

    cart = [];

    saveCart();

    renderCart();

    updateCartBadge();

  }

};


/* =========================================================
   FIN
========================================================= */
