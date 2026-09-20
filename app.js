import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
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

let cart = [];
let reviewsCache = {};

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  fr: {

    settings: "Paramètres",
    account: "Compte",
    orders: "Commandes",
    admin: "Admin",
    cart: "Panier",

    searchPlaceholder: "Rechercher un produit...",

    heroKicker: "Gaming & High-Tech",
    heroTitle1: "Ton setup.",
    heroTitle2: "Ton niveau.",
    heroText:
      "Découvre une sélection de composants, PC, périphériques et accessoires gaming. Trouve ton prochain upgrade et construis ton setup.",

    discover: "Découvrir les produits",
    searchProducts: "Rechercher",

    trust1Title: "Données protégées",
    trust1Text: "Les commandes sont enregistrées dans Firebase.",

    trust2Title: "Retours",
    trust2Text: "Conditions de retour à définir avant mise en ligne.",

    trust3Title: "Avis",
    trust3Text: "Statistiques de démonstration sur les fiches produits.",

    trust4Title: "Livraison",
    trust4Text: "Informations de livraison à configurer.",

    productsTitle: "Produits",
    productsSubtitle: "Du composant PC au périphérique gaming.",

    cartTitle: "Panier",
    total: "Total",
    checkout: "Passer la commande",

    footerText: "Gaming & High-Tech",
    footerRights: "© NovaShop • Tous droits réservés",

    all: "Toutes",

    add: "Ajouter",
    added: "Ajouté ✓",
    reviews: "Avis",

    priceSoon: "Prix à venir",
    emptyCart: "Ton panier est vide.",
    emptyCartHint: "Ajoute un produit pour commencer.",

    remove: "Supprimer",
    quantity: "Quantité",

    login: "Connexion",
    register: "Créer un compte",
    email: "Adresse e-mail",
    password: "Mot de passe",
    connect: "Se connecter",
    create: "Créer mon compte",
    noAccount: "Pas encore de compte ?",
    alreadyAccount: "Déjà un compte ?",
    logout: "Se déconnecter",

    connectedAs: "Connecté avec",
    notConnected: "Tu n'es pas connecté.",

    switchRegister: "Créer un compte",
    switchLogin: "Se connecter",

    myOrders: "Mes commandes",
    noOrders: "Aucune commande.",
    orderDate: "Date",
    orderTotal: "Total",
    orderProducts: "Produits",

    settingsTitle: "Paramètres",
    appearance: "Apparence",
    language: "Langue",
    animations: "Animations",
    animationsText: "Animations de l'interface",
    resetPreferences: "Réinitialiser les préférences",

    dark: "Sombre",
    darkDesc: "Interface sombre",
    light: "Clair",
    lightDesc: "Interface claire",
    auto: "Automatique",
    autoDesc: "Selon ton système",

    french: "Français",
    english: "English",

    preferencesReset: "Préférences réinitialisées.",

    productReviews: "Avis sur le produit",
    demoReviews:
      "Ces statistiques sont générées pour la démonstration et ne représentent pas de vrais avis clients.",

    average: "Note moyenne",
    simulated: "Données de démonstration",

    adminDashboard: "Dashboard Admin",
    products: "Produits",
    ordersCount: "Commandes",
    revenue: "Chiffre d'affaires",
    adminWarning:
      "Les statistiques et avis de démonstration doivent être remplacés par de vraies données avant une mise en ligne commerciale.",

    deleteAll: "Supprimer toutes les commandes",
    removeAdmin: "Retirer l'autorisation admin",
    adminRemoved: "Autorisation admin supprimée.",

    adminCode: "Code administrateur",
    adminCodePlaceholder: "Entre le code admin",
    validate: "Valider",

    orderSuccess: "Commande enregistrée !",
    needLogin: "Connecte-toi pour passer une commande.",
    cartEmpty: "Ton panier est vide.",

    searchNothing: "Aucun produit trouvé.",
    searchNothingHint: "Essaie un autre mot ou une autre catégorie.",

    category: "Catégorie",
    product: "Produit",

    stars: "étoiles"
  },

  en: {

    settings: "Settings",
    account: "Account",
    orders: "Orders",
    admin: "Admin",
    cart: "Cart",

    searchPlaceholder: "Search for a product...",

    heroKicker: "Gaming & High-Tech",
    heroTitle1: "Your setup.",
    heroTitle2: "Your level.",
    heroText:
      "Discover a selection of components, PCs, gaming peripherals and accessories. Find your next upgrade and build your setup.",

    discover: "Discover products",
    searchProducts: "Search",

    trust1Title: "Protected data",
    trust1Text: "Orders are stored in Firebase.",

    trust2Title: "Returns",
    trust2Text: "Return conditions must be configured before launch.",

    trust3Title: "Reviews",
    trust3Text: "Demonstration statistics on product pages.",

    trust4Title: "Delivery",
    trust4Text: "Delivery information must be configured.",

    productsTitle: "Products",
    productsSubtitle: "From PC components to gaming peripherals.",

    cartTitle: "Cart",
    total: "Total",
    checkout: "Place order",

    footerText: "Gaming & High-Tech",
    footerRights: "© NovaShop • All rights reserved",

    all: "All",

    add: "Add",
    added: "Added ✓",
    reviews: "Reviews",

    priceSoon: "Price coming soon",
    emptyCart: "Your cart is empty.",
    emptyCartHint: "Add a product to get started.",

    remove: "Remove",
    quantity: "Quantity",

    login: "Login",
    register: "Create account",
    email: "Email address",
    password: "Password",
    connect: "Log in",
    create: "Create my account",
    noAccount: "Don't have an account?",
    alreadyAccount: "Already have an account?",
    logout: "Log out",

    connectedAs: "Connected as",
    notConnected: "You are not logged in.",

    switchRegister: "Create account",
    switchLogin: "Log in",

    myOrders: "My orders",
    noOrders: "No orders.",
    orderDate: "Date",
    orderTotal: "Total",
    orderProducts: "Products",

    settingsTitle: "Settings",
    appearance: "Appearance",
    language: "Language",
    animations: "Animations",
    animationsText: "Interface animations",
    resetPreferences: "Reset preferences",

    dark: "Dark",
    darkDesc: "Dark interface",
    light: "Light",
    lightDesc: "Light interface",
    auto: "Automatic",
    autoDesc: "Use system setting",

    french: "Français",
    english: "English",

    preferencesReset: "Preferences reset.",

    productReviews: "Product reviews",
    demoReviews:
      "These statistics are generated for demonstration and do not represent real customer reviews.",

    average: "Average rating",
    simulated: "Demonstration data",

    adminDashboard: "Admin Dashboard",
    products: "Products",
    ordersCount: "Orders",
    revenue: "Revenue",
    adminWarning:
      "Demonstration statistics and reviews must be replaced with real data before commercial launch.",

    deleteAll: "Delete all orders",
    removeAdmin: "Remove admin authorization",
    adminRemoved: "Admin authorization removed.",

    adminCode: "Administrator code",
    adminCodePlaceholder: "Enter admin code",
    validate: "Validate",

    orderSuccess: "Order saved!",
    needLogin: "Log in to place an order.",
    cartEmpty: "Your cart is empty.",

    searchNothing: "No products found.",
    searchNothingHint: "Try another word or category.",

    category: "Category",
    product: "Product",

    stars: "stars"
  }
};


/* =========================================================
   LANGUAGE
========================================================= */

let language =
  localStorage.getItem("novaLanguage") ||
  "fr";

function t(key) {
  return translations[language]?.[key] ??
    translations.fr[key] ??
    key;
}

function applyLanguage(newLanguage) {

  language =
    newLanguage === "en"
      ? "en"
      : "fr";

  localStorage.setItem(
    "novaLanguage",
    language
  );

  document.documentElement.lang = language;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(el => {

      const key = el.dataset.i18n;

      if (translations[language][key]) {
        el.textContent =
          translations[language][key];
      }

    });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(el => {

      const key =
        el.dataset.i18nPlaceholder;

      if (translations[language][key]) {
        el.placeholder =
          translations[language][key];
      }

    });

  renderCategories();
  renderProducts();
  renderCart();
}


/* =========================================================
   THEME
========================================================= */

let themeChoice =
  localStorage.getItem("novaThemeChoice") ||
  "dark";

function applyTheme(choice) {

  themeChoice =
    ["dark", "light", "auto"].includes(choice)
      ? choice
      : "dark";

  localStorage.setItem(
    "novaThemeChoice",
    themeChoice
  );

  const root =
    document.documentElement;

  if (themeChoice === "auto") {

    const prefersLight =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    root.dataset.theme =
      prefersLight
        ? "light"
        : "dark";

  } else {

    root.dataset.theme =
      themeChoice;

  }
}

applyTheme(themeChoice);

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", () => {

    if (themeChoice === "auto") {
      applyTheme("auto");
    }

  });


/* =========================================================
   ANIMATIONS
========================================================= */

let animationsEnabled =
  localStorage.getItem("novaAnimations") !== "false";

function applyAnimations() {

  document.documentElement
    .classList
    .toggle(
      "reduce-motion",
      !animationsEnabled
    );

  localStorage.setItem(
    "novaAnimations",
    animationsEnabled
  );
}

applyAnimations();


/* =========================================================
   PRODUCTS
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
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
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
    isNew: true
  }

];


/* =========================================================
   CATEGORY TRANSLATION
========================================================= */

const categoryEnglish = {
  "Toutes": "All",
  "Composants": "Components",
  "PC Gamer": "Gaming PCs",
  "Casques": "Headsets",
  "Claviers": "Keyboards",
  "Souris": "Mice",
  "Stockage": "Storage",
  "Alimentations": "Power Supplies",
  "Boîtiers": "Cases",
  "Refroidissement": "Cooling",
  "Écrans": "Monitors",
  "Streaming": "Streaming",
  "Manettes": "Controllers",
  "Chaises gaming": "Gaming Chairs",
  "Bureaux gaming": "Gaming Desks",
  "Microphones": "Microphones",
  "Éclairage RGB": "RGB Lighting",
  "Cartes graphiques": "Graphics Cards"
};

function categoryLabel(category) {

  if (language === "en") {
    return categoryEnglish[category] || category;
  }

  if (category === "Toutes") {
    return t("all");
  }

  return category;
}


/* =========================================================
   UTILS
========================================================= */

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {

  if (!value || value <= 0) {
    return t("priceSoon");
  }

  return new Intl.NumberFormat(
    language === "fr"
      ? "fr-FR"
      : "en-US",
    {
      style: "currency",
      currency: "EUR"
    }
  ).format(value);
}

function randomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

function stars(value) {

  const rounded =
    Math.round(value);

  return "★".repeat(rounded) +
    "☆".repeat(5 - rounded);
}


/* =========================================================
   TOAST
========================================================= */

function toast(message, type = "success") {

  const el =
    document.createElement("div");

  el.className =
    `toast ${type}`;

  el.textContent = message;

  toastContainer.appendChild(el);

  setTimeout(() => {

    el.style.opacity = "0";
    el.style.transform =
      "translateY(8px)";

    setTimeout(() => {
      el.remove();
    }, 220);

  }, 2800);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(title, html) {

  modalTitle.textContent = title;
  modalContent.innerHTML = html;

  modal.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeModal() {

  modal.classList.remove("open");

  document.body.style.overflow = "";
}

modalClose.addEventListener(
  "click",
  closeModal
);

modal.addEventListener(
  "click",
  e => {

    if (e.target === modal) {
      closeModal();
    }

  }
);


/* =========================================================
   CATEGORIES
========================================================= */

function getCategories() {

  return [
    "Toutes",
    ...new Set(
      products.map(p => p.category)
    )
  ];
}

function renderCategories() {

  categoriesEl.innerHTML =
    getCategories()
      .map(category => {

        const active =
          selectedCategory === category
            ? "active"
            : "";

        return `
          <button
            class="category-btn ${active}"
            data-category="${escapeHtml(category)}"
          >
            ${escapeHtml(categoryLabel(category))}
          </button>
        `;

      })
      .join("");

  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category;

          renderCategories();
          renderProducts();

        }
      );

    });
}


/* =========================================================
   PRODUCT FILTER
========================================================= */

function filteredProducts() {

  const search =
    searchValue
      .trim()
      .toLowerCase();

  return products.filter(product => {

    const categoryOk =
      selectedCategory === "Toutes" ||
      product.category === selectedCategory;

    const searchOk =
      !search ||
      product.name
        .toLowerCase()
        .includes(search) ||
      product.category
        .toLowerCase()
        .includes(search);

    return categoryOk && searchOk;

  });
}


/* =========================================================
   PRODUCT REVIEWS
========================================================= */

function getProductReviewData(productId) {

  if (!reviewsCache[productId]) {

    reviewsCache[productId] = {

      average:
        Number(
          (
            4.3 +
            Math.random() * .6
          ).toFixed(1)
        ),

      count:
        randomInt(850, 950)

    };

  }

  return reviewsCache[productId];
}


/* =========================================================
   PRODUCT RENDER
========================================================= */

function renderProducts() {

  const list =
    filteredProducts();

  productCount.textContent =
    `${list.length} ${
      language === "fr"
        ? list.length > 1
          ? "produits"
          : "produit"
        : list.length > 1
          ? "products"
          : "product"
    }`;

  if (!list.length) {

    productsGrid.innerHTML = `
      <div class="no-results">
        <div style="font-size:34px;margin-bottom:10px">🔎</div>
        <strong>${t("searchNothing")}</strong>
        <div style="margin-top:5px">
          ${t("searchNothingHint")}
        </div>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    list
      .map(product => {

        const review =
          getProductReviewData(
            product.id
          );

        return `
          <article
            class="product-card"
            data-product-id="${product.id}"
          >

            <div class="product-image-wrap">

              ${
                product.isNew
                  ? `
                    <span class="product-badge">
                      ${language === "fr" ? "Nouveau" : "New"}
                    </span>
                  `
                  : ""
              }

              <img
                class="product-image"
                src="${escapeHtml(product.image)}"
                alt="${escapeHtml(product.name)}"
                loading="lazy"
                data-fallback="true"
              >

            </div>

            <div class="product-info">

              <div class="product-category">
                ${escapeHtml(categoryLabel(product.category))}
              </div>

              <div class="product-name">
                ${escapeHtml(product.name)}
              </div>

              <div class="product-bottom">

                <div
                  class="price ${
                    !product.price
                      ? "soon"
                      : ""
                  }"
                >
                  ${escapeHtml(
                    money(product.price)
                  )}
                </div>

                <div style="
                  font-size:10px;
                  color:#ffc857;
                  white-space:nowrap;
                ">
                  ★ ${review.average}
                </div>

              </div>

              <div class="product-actions">

                <button
                  class="add-btn"
                  data-add="${product.id}"
                >
                  🛒 ${t("add")}
                </button>

                <button
                  class="review-btn"
                  data-review="${product.id}"
                  title="${t("reviews")}"
                >
                  ⭐
                </button>

              </div>

            </div>

          </article>
        `;

      })
      .join("");

  productsGrid
    .querySelectorAll("img[data-fallback]")
    .forEach(img => {

      img.addEventListener(
        "error",
        () => {

          if (
            img.dataset.failed
          ) return;

          img.dataset.failed = "1";
          img.src = FALLBACK_IMAGE;

        }
      );

    });

  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            products.find(
              p =>
                p.id ===
                button.dataset.add
            );

          if (!product) return;

          addToCart(
            product,
            button
          );

        }
      );

    });

  productsGrid
    .querySelectorAll("[data-review]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            products.find(
              p =>
                p.id ===
                button.dataset.review
            );

          if (product) {
            openReviews(product);
          }

        }
      );

    });
}


/* =========================================================
   REVIEWS MODAL
========================================================= */

function openReviews(product) {

  const data =
    getProductReviewData(
      product.id
    );

  const fakeReviews =
    language === "fr"
      ? [
          "Très bon produit, conforme à la description.",
          "Installation simple et produit agréable à utiliser.",
          "Bon rapport qualité/prix pour mon setup.",
          "Produit propre et bien présenté."
        ]
      : [
          "Very good product, matching the description.",
          "Easy to install and pleasant to use.",
          "Good value for my setup.",
          "Clean product and good presentation."
        ];

  openModal(
    `${t("productReviews")} • ${escapeHtml(product.name)}`,

    `
      <div class="review-summary">

        <div class="review-score">
          ${data.average}/5
        </div>

        <div style="
          color:#ffc857;
          font-size:19px;
          margin-top:3px;
        ">
          ${stars(data.average)}
        </div>

        <div class="review-note">
          ${data.count} ${t("reviews").toLowerCase()}
        </div>

      </div>

      <div style="
        padding:10px;
        border-radius:10px;
        background:rgba(255,200,87,.07);
        border:1px solid rgba(255,200,87,.15);
        color:#b6a77b;
        font-size:11px;
        margin-bottom:10px;
      ">
        ⚠️ ${t("demoReviews")}
      </div>

      ${fakeReviews.map((review, i) => `
        <div class="review-card">

          <strong>
            ${"⭐".repeat(5)}
          </strong>

          <div style="
            margin-top:4px;
            font-size:11px;
            color:var(--muted);
          ">
            ${language === "fr"
              ? `Client ${i + 1}`
              : `Customer ${i + 1}`
            }
          </div>

          <p>
            ${escapeHtml(review)}
          </p>

        </div>
      `).join("")}
    `
  );
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

function loadCart() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "novaCart"
        ) || "[]"
      );

    if (Array.isArray(saved)) {

      cart =
        saved
          .filter(item =>
            products.some(
              p => p.id === item.id
            )
          )
          .map(item => ({
            id: item.id,
            quantity:
              Math.max(
                1,
                Number(item.quantity) || 1
              )
          }));

    }

  } catch {

    cart = [];

  }

}


/* =========================================================
   CART
========================================================= */

function cartQuantity() {

  return cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );
}

function cartTotalValue() {

  return cart.reduce(
    (sum, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return sum;

      return sum +
        product.price *
        item.quantity;

    },
    0
  );
}

function updateCartBadge(pop = false) {

  cartBadge.textContent =
    cartQuantity();

  if (pop) {

    cartBadge.classList.remove("pop");

    void cartBadge.offsetWidth;

    cartBadge.classList.add("pop");

  }

}

function renderCart() {

  updateCartBadge();

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div>
          <div style="
            font-size:40px;
            margin-bottom:10px;
          ">
            🛒
          </div>

          <strong>
            ${t("emptyCart")}
          </strong>

          <div style="margin-top:5px">
            ${t("emptyCartHint")}
          </div>
        </div>
      </div>
    `;

    cartTotal.textContent =
      money(0);

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
            src="${escapeHtml(product.image)}"
            alt=""
            onerror="this.src='${FALLBACK_IMAGE}'"
          >

          <div>

            <div class="cart-item-name">
              ${escapeHtml(product.name)}
            </div>

            <div class="cart-item-price">
              ${
                product.price
                  ? money(
                      product.price *
                      item.quantity
                    )
                  : t("priceSoon")
              }
            </div>

            <div class="cart-controls">

              <button
                class="qty-btn"
                data-minus="${product.id}"
              >
                −
              </button>

              <strong style="font-size:11px">
                ${item.quantity}
              </strong>

              <button
                class="qty-btn"
                data-plus="${product.id}"
              >
                +
              </button>

              <button
                class="remove-btn"
                data-remove="${product.id}"
              >
                ${t("remove")}
              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");

  cartTotal.textContent =
    money(cartTotalValue());

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            button.dataset.minus,
            -1
          );

        }
      );

    });

  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            button.dataset.plus,
            1
          );

        }
      );

    });

  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            button.dataset.remove
          );

        }
      );

    });
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product, button) {

  const existing =
    cart.find(
      item =>
        item.id === product.id
    );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: product.id,
      quantity: 1
    });

  }

  saveCart();
  renderCart();
  updateCartBadge(true);

  if (button) {

    const original =
      button.innerHTML;

    button.classList.add("added");
    button.textContent =
      `✓ ${t("added")}`;

    setTimeout(() => {

      button.classList.remove(
        "added"
      );

      button.innerHTML =
        `🛒 ${t("add")}`;

    }, 900);

  }

  animateToCart(product);

  toast(
    language === "fr"
      ? `${product.name} ajouté au panier.`
      : `${product.name} added to cart.`,
    "success"
  );
}


/* =========================================================
   CART ANIMATION
========================================================= */

function animateToCart(product) {

  const card =
    document.querySelector(
      `[data-product-id="${product.id}"]`
    );

  if (!card) return;

  const image =
    card.querySelector(
      ".product-image"
    );

  if (!image) return;

  const start =
    image.getBoundingClientRect();

  const target =
    cartBtn.getBoundingClientRect();

  const clone =
    image.cloneNode(true);

  clone.className =
    "fly-image";

  clone.style.left =
    `${start.left}px`;

  clone.style.top =
    `${start.top}px`;

  document.body.appendChild(clone);

  requestAnimationFrame(() => {

    clone.style.left =
      `${target.left + target.width / 2 - 30}px`;

    clone.style.top =
      `${target.top + target.height / 2 - 30}px`;

    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = ".15";
    clone.style.transform =
      "scale(.55) rotate(8deg)";

  });

  setTimeout(() => {
    clone.remove();
  }, 550);
}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, amount) {

  const item =
    cart.find(
      x => x.id === id
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart =
      cart.filter(
        x => x.id !== id
      );

  }

  saveCart();
  renderCart();

}


/* =========================================================
   REMOVE
========================================================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();
  renderCart();

}


/* =========================================================
   CART OPEN/CLOSE
========================================================= */

function openCart() {

  cartOverlay.classList.add(
    "open"
  );

}

function closeCart() {

  cartOverlay.classList.remove(
    "open"
  );

}

cartBtn.addEventListener(
  "click",
  openCart
);

cartClose.addEventListener(
  "click",
  closeCart
);

cartOverlay.addEventListener(
  "click",
  e => {

    if (e.target === cartOverlay) {
      closeCart();
    }

  }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
  "input",
  () => {

    searchValue =
      searchInput.value;

    renderProducts();

  }
);


/* =========================================================
   AUTH MODAL
========================================================= */

function openAccount() {

  if (currentUser) {

    openModal(
      t("account"),

      `
        <div style="
          padding:15px;
          border:1px solid var(--border);
          border-radius:13px;
          background:var(--panel2);
        ">

          <div style="
            font-size:11px;
            color:var(--muted);
            margin-bottom:5px;
          ">
            ${t("connectedAs")}
          </div>

          <strong>
            ${escapeHtml(
              currentUser.email || ""
            )}
          </strong>

        </div>

        <button
          class="form-submit"
          id="logoutBtn"
          style="margin-top:12px"
        >
          ${t("logout")}
        </button>
      `
    );

    $("logoutBtn")
      .addEventListener(
        "click",
        async () => {

          await signOut(auth);

          closeModal();

          toast(
            language === "fr"
              ? "Déconnexion effectuée."
              : "Logged out."
          );

        }
      );

    return;
  }

  renderAuthModal();

}

function renderAuthModal() {

  const isLogin =
    authMode === "login";

  openModal(
    isLogin
      ? t("login")
      : t("register"),

    `
      <form
        id="authForm"
        class="form"
      >

        <label class="field-label">
          ${t("email")}
        </label>

        <input
          class="input"
          id="authEmail"
          type="email"
          autocomplete="email"
          required
        >

        <label class="field-label">
          ${t("password")}
        </label>

        <input
          class="input"
          id="authPassword"
          type="password"
          autocomplete="${
            isLogin
              ? "current-password"
              : "new-password"
          }"
          minlength="6"
          required
        >

        <button
          class="form-submit"
          type="submit"
        >
          ${
            isLogin
              ? `👤 ${t("connect")}`
              : `✨ ${t("create")}`
          }
        </button>

        <div class="form-switch">

          ${
            isLogin
              ? t("noAccount")
              : t("alreadyAccount")
          }

          <button
            type="button"
            class="text-btn"
            id="switchAuth"
          >
            ${
              isLogin
                ? t("switchRegister")
                : t("switchLogin")
            }
          </button>

        </div>

      </form>
    `
  );

  $("switchAuth")
    .addEventListener(
      "click",
      () => {

        authMode =
          isLogin
            ? "register"
            : "login";

        renderAuthModal();

      }
    );

  $("authForm")
    .addEventListener(
      "submit",
      handleAuth
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

    if (authMode === "login") {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast(
        language === "fr"
          ? "Connexion réussie."
          : "Login successful."
      );

    } else {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast(
        language === "fr"
          ? "Compte créé."
          : "Account created."
      );

    }

    closeModal();

  } catch (error) {

    let message =
      language === "fr"
        ? "Une erreur est survenue."
        : "Something went wrong.";

    if (
      error.code ===
      "auth/invalid-credential"
    ) {
      message =
        language === "fr"
          ? "E-mail ou mot de passe incorrect."
          : "Invalid email or password.";
    }

    if (
      error.code ===
      "auth/email-already-in-use"
    ) {
      message =
        language === "fr"
          ? "Cet e-mail est déjà utilisé."
          : "This email is already in use.";
    }

    if (
      error.code ===
      "auth/weak-password"
    ) {
      message =
        language === "fr"
          ? "Le mot de passe doit contenir au moins 6 caractères."
          : "Password must contain at least 6 characters.";
    }

    toast(message, "error");

  }

}


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

  openModal(
    t("settingsTitle"),

    `
      <div class="settings-section">

        <div class="settings-title">
          🎨 ${t("appearance")}
        </div>

        <div class="option-row">

          <button
            class="option ${
              themeChoice === "dark"
                ? "active"
                : ""
            }"
            data-theme-choice="dark"
          >
            <strong>🌙 ${t("dark")}</strong>
            <span>${t("darkDesc")}</span>
          </button>

          <button
            class="option ${
              themeChoice === "light"
                ? "active"
                : ""
            }"
            data-theme-choice="light"
          >
            <strong>☀️ ${t("light")}</strong>
            <span>${t("lightDesc")}</span>
          </button>

          <button
            class="option ${
              themeChoice === "auto"
                ? "active"
                : ""
            }"
            data-theme-choice="auto"
          >
            <strong>🖥️ ${t("auto")}</strong>
            <span>${t("autoDesc")}</span>
          </button>

        </div>

      </div>

      <div class="settings-section">

        <div class="settings-title">
          🌍 ${t("language")}
        </div>

        <select
          class="select"
          id="languageSelect"
        >
          <option
            value="fr"
            ${language === "fr" ? "selected" : ""}
          >
            🇫🇷 ${t("french")}
          </option>

          <option
            value="en"
            ${language === "en" ? "selected" : ""}
          >
            🇬🇧 ${t("english")}
          </option>
        </select>

      </div>

      <div class="settings-section">

        <div class="switch-line">

          <div>
            <div class="settings-title" style="margin:0">
              ✨ ${t("animations")}
            </div>

            <div style="
              color:var(--muted);
              font-size:11px;
              margin-top:4px;
            ">
              ${t("animationsText")}
            </div>
          </div>

          <button
            class="switch ${
              animationsEnabled
                ? "active"
                : ""
            }"
            id="animationsSwitch"
            aria-label="${t("animations")}"
          ></button>

        </div>

      </div>

      <div class="settings-section">

        <button
          class="secondary-btn"
          id="resetPreferences"
          style="width:100%"
        >
          ♻️ ${t("resetPreferences")}
        </button>

      </div>
    `
  );

  document
    .querySelectorAll("[data-theme-choice]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          applyTheme(
            button.dataset.themeChoice
          );

          openSettings();

        }
      );

    });

  $("languageSelect")
    .addEventListener(
      "change",
      event => {

        applyLanguage(
          event.target.value
        );

        openSettings();

      }
    );

  $("animationsSwitch")
    .addEventListener(
      "click",
      () => {

        animationsEnabled =
          !animationsEnabled;

        applyAnimations();

        openSettings();

      }
    );

  $("resetPreferences")
    .addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "novaThemeChoice"
        );

        localStorage.removeItem(
          "novaLanguage"
        );

        localStorage.removeItem(
          "novaAnimations"
        );

        themeChoice = "dark";
        language = "fr";
        animationsEnabled = true;

        applyTheme("dark");
        applyLanguage("fr");
        applyAnimations();

        toast(
          t("preferencesReset")
        );

        openSettings();

      }
    );

}


/* =========================================================
   ORDERS
========================================================= */

async function openOrders() {

  if (!currentUser) {

    openModal(
      t("orders"),

      `
        <div style="
          padding:25px;
          text-align:center;
          color:var(--muted);
        ">
          👤<br><br>
          ${t("needLogin")}
        </div>
      `
    );

    return;
  }

  openModal(
    t("myOrders"),
    `
      <div style="
        padding:20px;
        text-align:center;
        color:var(--muted);
      ">
        ⏳
      </div>
    `
  );

  try {

    const q =
      query(
        collection(db, "orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs
        .map(d => ({
          id: d.id,
          ...d.data()
        }))
        .sort(
          (a, b) => {

            const aa =
              a.createdAt?.seconds ||
              0;

            const bb =
              b.createdAt?.seconds ||
              0;

            return bb - aa;

          }
        );

    if (!orders.length) {

      modalContent.innerHTML = `
        <div style="
          padding:40px 15px;
          text-align:center;
          color:var(--muted);
        ">
          📦<br><br>
          ${t("noOrders")}
        </div>
      `;

      return;
    }

    modalContent.innerHTML =
      orders.map(order => {

        const date =
          order.createdAt?.seconds
            ? new Date(
                order.createdAt.seconds * 1000
              ).toLocaleString(
                language === "fr"
                  ? "fr-FR"
                  : "en-US"
              )
            : "—";

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];

        return `
          <div style="
            padding:14px 0;
            border-bottom:1px solid var(--border);
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
            ">

              <strong>
                ${date}
              </strong>

              <strong>
                ${money(order.total || 0)}
              </strong>

            </div>

            <div style="
              color:var(--muted);
              font-size:11px;
              line-height:1.6;
              margin-top:8px;
            ">

              ${items.map(item => `
                • ${escapeHtml(item.name)}
                × ${item.quantity}
              `).join("<br>")}

            </div>

          </div>
        `;

      }).join("");

  } catch (error) {

    modalContent.innerHTML = `
      <div style="
        color:var(--red);
        padding:20px;
      ">
        ${language === "fr"
          ? "Impossible de charger les commandes."
          : "Unable to load orders."
        }
      </div>
    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

checkoutBtn.addEventListener(
  "click",
  checkout
);

async function checkout() {

  if (!cart.length) {

    toast(
      t("cartEmpty"),
      "error"
    );

    return;
  }

  if (!currentUser) {

    closeCart();

    openAccount();

    toast(
      t("needLogin"),
      "error"
    );

    return;
  }

  const items =
    cart
      .map(item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        if (!product) return null;

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };

      })
      .filter(Boolean);

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  if (total <= 0) {

    toast(
      language === "fr"
        ? "Un produit du panier n'a pas encore de prix."
        : "A product in the cart does not have a price yet.",
      "error"
    );

    return;
  }

  checkoutBtn.disabled = true;
  checkoutBtn.textContent =
    "⏳";

  try {

    await addDoc(
      collection(db, "orders"),
      {
        userId:
          currentUser.uid,

        email:
          currentUser.email,

        items,

        total,

        createdAt:
          serverTimestamp()
      }
    );

    cart = [];

    saveCart();
    renderCart();
    closeCart();

    toast(
      t("orderSuccess"),
      "success"
    );

  } catch (error) {

    console.error(error);

    toast(
      language === "fr"
        ? "Impossible d'enregistrer la commande."
        : "Unable to save the order.",
      "error"
    );

  } finally {

    checkoutBtn.disabled = false;

    checkoutBtn.textContent =
      t("checkout");

  }

}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin() {

  return (
    currentUser &&
    currentUser.email === ADMIN_EMAIL
  );

}

function hasAdminAuthorization() {

  return (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}

function requireAdmin() {

  if (!isAdmin()) {

    toast(
      language === "fr"
        ? "Accès réservé à l'administrateur."
        : "Admin access only.",
      "error"
    );

    return false;
  }

  if (!hasAdminAuthorization()) {

    askAdminCode();

    return false;
  }

  return true;
}


/* =========================================================
   ADMIN CODE
========================================================= */

function askAdminCode() {

  openModal(
    t("adminCode"),

    `
      <form
        id="adminCodeForm"
        class="form"
      >

        <label class="field-label">
          ${t("adminCode")}
        </label>

        <input
          class="input"
          id="adminCodeInput"
          type="password"
          placeholder="${t("adminCodePlaceholder")}"
          autocomplete="off"
          required
        >

        <button
          class="form-submit"
          type="submit"
        >
          🔐 ${t("validate")}
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
          $("adminCodeInput")
            .value;

        if (code === ADMIN_CODE) {

          localStorage.setItem(
            ADMIN_ACCESS_KEY,
            "true"
          );

          toast(
            language === "fr"
              ? "Accès admin mémorisé."
              : "Admin access saved."
          );

          closeModal();

          openAdmin();

        } else {

          toast(
            language === "fr"
              ? "Code incorrect."
              : "Incorrect code.",
            "error"
          );

        }

      }
    );
}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function openAdmin() {

  if (!requireAdmin()) {
    return;
  }

  openModal(
    t("adminDashboard"),

    `
      <div style="
        padding:20px;
        text-align:center;
        color:var(--muted);
      ">
        ⏳
      </div>
    `
  );

  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    const orders =
      snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

    const revenue =
      orders.reduce(
        (sum, order) =>
          sum +
          Number(order.total || 0),
        0
      );

    modalContent.innerHTML = `

      <div class="admin-stats">

        <div class="admin-stat">
          <span>${t("products")}</span>
          <strong>${products.length}</strong>
        </div>

        <div class="admin-stat">
          <span>${t("ordersCount")}</span>
          <strong>${orders.length}</strong>
        </div>

        <div class="admin-stat">
          <span>${t("revenue")}</span>
          <strong>${money(revenue)}</strong>
        </div>

      </div>

      <div style="
        padding:11px;
        border:1px solid rgba(255,200,87,.18);
        background:rgba(255,200,87,.06);
        border-radius:11px;
        color:#b6a77b;
        font-size:10px;
        line-height:1.5;
        margin-bottom:15px;
      ">
        ⚠️ ${t("adminWarning")}
      </div>

      <h3 style="
        font-size:14px;
        margin:0 0 10px;
      ">
        ${t("ordersCount")}
      </h3>

      ${
        orders.length
          ? `
            <table class="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                ${orders.map(order => `
                  <tr>
                    <td>
                      ${escapeHtml(
                        order.id.slice(0, 7)
                      )}
                    </td>

                    <td>
                      ${escapeHtml(
                        order.email || "—"
                      )}
                    </td>

                    <td>
                      ${money(
                        order.total || 0
                      )}
                    </td>
                  </tr>
                `).join("")}

              </tbody>

            </table>
          `
          : `
            <div style="
              padding:20px 0;
              color:var(--muted);
              font-size:12px;
            ">
              ${t("noOrders")}
            </div>
          `
      }

      <div style="
        display:grid;
        gap:8px;
        margin-top:18px;
      ">

        <button
          class="danger-btn"
          id="deleteAllOrders"
        >
          🗑️ ${t("deleteAll")}
        </button>

        <button
          class="secondary-btn"
          id="removeAdminAuthorization"
        >
          🔓 ${t("removeAdmin")}
        </button>

      </div>
    `;

    $("deleteAllOrders")
      .addEventListener(
        "click",
        deleteAllData
      );

    $("removeAdminAuthorization")
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

  } catch (error) {

    console.error(error);

    modalContent.innerHTML = `
      <div style="
        color:var(--red);
        padding:20px;
      ">
        ${
          language === "fr"
            ? "Erreur lors du chargement du dashboard."
            : "Dashboard loading error."
        }
      </div>
    `;

  }

}


/* =========================================================
   DELETE ALL ORDERS
========================================================= */

async function deleteAllData() {

  if (!requireAdmin()) {
    return;
  }

  const confirmed =
    confirm(
      language === "fr"
        ? "Supprimer toutes les commandes ? Cette action est irréversible."
        : "Delete all orders? This cannot be undone."
    );

  if (!confirmed) {
    return;
  }

  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    for (
      const item of snapshot.docs
    ) {

      await deleteDoc(
        doc(
          db,
          "orders",
          item.id
        )
      );

    }

    toast(
      language === "fr"
        ? "Toutes les commandes ont été supprimées."
        : "All orders deleted."
    );

    openAdmin();

  } catch (error) {

    console.error(error);

    toast(
      language === "fr"
        ? "Impossible de supprimer les commandes."
        : "Unable to delete orders.",
      "error"
    );

  }

}


/* =========================================================
   HEADER EVENTS
========================================================= */

settingsBtn.addEventListener(
  "click",
  openSettings
);

accountBtn.addEventListener(
  "click",
  openAccount
);

ordersBtn.addEventListener(
  "click",
  openOrders
);

adminBtn.addEventListener(
  "click",
  openAdmin
);


/* =========================================================
   HERO
========================================================= */

heroShopBtn.addEventListener(
  "click",
  () => {

    document
      .querySelector(".main")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);

heroSearchBtn.addEventListener(
  "click",
  () => {

    searchInput.focus();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if (
      currentUser &&
      currentUser.email === ADMIN_EMAIL
    ) {

      adminBtn.style.display =
        "block";

    } else {

      adminBtn.style.display =
        "none";

      if (!currentUser) {

        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );

      }

    }

  }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeModal();
    closeCart();

  }
);


/* =========================================================
   INIT
========================================================= */

loadCart();

renderCategories();

renderProducts();

renderCart();

applyLanguage(language);

applyTheme(themeChoice);

applyAnimations();


/* =========================================================
   DEBUG API
========================================================= */

window.NovaShop = {

  products,

  getCart() {
    return [...cart];
  },

  clearCart() {

    cart = [];

    saveCart();
    renderCart();

  },

  openCart,

  openSettings,

  openAccount,

  openOrders,

  openAdmin,

  refresh() {

    renderCategories();
    renderProducts();
    renderCart();

  }

};

console.log(
  "%cNovaShop chargé ✓",
  "font-weight:900;font-size:16px"
);
