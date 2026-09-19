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
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxG7OuvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

/*
  IMPORTANT :
  Cette clé mémorise l'autorisation admin sur CE navigateur.
  Une fois le bon code entré, il ne sera plus demandé.
*/
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


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
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id: "p20",
    name: "iiyama 23.8 G-Master GB2471HS-B1 Red Eagle",
    category: "Écrans",
    price: 65.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds",
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
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire",
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
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible",
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
    name: "Logitech PRO X TKL Rapid Noir AZERTY",
    category: "Claviers",
    price: 78.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker Hall Effect",
    category: "Claviers",
    price: 56.99,
    image: "https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra 8000Hz 49g",
    category: "Souris",
    price: 26.99,
    image: "https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },

  {
    id: "p34",
    name: "HyperX QuadCast 2 USB RGB",
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
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m",
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
  }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentUser = null;
let authMode = "login";
let selectedCategory = "Tous";
let searchValue = "";
let cart = [];
let reviewsCache = {};

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


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
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");

const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");

const modal = $("modal");
const modalContent = $("modalContent");

const toastContainer = $("toastContainer");


/* =========================================================
   UTILITAIRES
========================================================= */

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function money(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return "0,00 €";
  }

  if (n === 0) {
    return "Prix à venir";
  }

  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + " €";
}


function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function stars(rating) {
  const full = Math.round(Number(rating) || 0);

  return "★".repeat(full) +
    "☆".repeat(Math.max(0, 5 - full));
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "normal") {

  if (!toastContainer) {
    alert(message);
    return;
  }

  const toast = document.createElement("div");

  toast.className = `nova-toast ${type}`;

  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 2200);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(html) {

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = html;

  modal.classList.add("open");

  requestAnimationFrame(() => {
    modal.classList.add("visible");
  });
}


function closeModal() {

  if (!modal) return;

  modal.classList.remove("visible");

  setTimeout(() => {
    modal.classList.remove("open");
  }, 180);
}


document.addEventListener("click", event => {

  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }

});


/* =========================================================
   AVATAR / AUTH
========================================================= */

function isAdmin() {
  return currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}


/*
  NOUVEAU :
  Vérifie si le navigateur a déjà mémorisé
  l'autorisation admin.
*/
function hasAdminAccess() {
  return localStorage.getItem(ADMIN_ACCESS_KEY) === "true";
}


/*
  NOUVEAU :
  Enregistre l'autorisation admin.
*/
function saveAdminAccess() {
  localStorage.setItem(ADMIN_ACCESS_KEY, "true");
}


/*
  Permet de supprimer l'autorisation si nécessaire.
*/
function removeAdminAccess() {
  localStorage.removeItem(ADMIN_ACCESS_KEY);
}


/* =========================================================
   AUTH MODAL
========================================================= */

function openAuth() {

  if (currentUser) {

    openModal(`
      <div class="modal-head">
        <h2>👤 Mon compte</h2>
        <button data-close-modal>×</button>
      </div>

      <div style="padding:20px 0">
        <p>
          Connecté avec :
          <strong>${escapeHtml(currentUser.email || "")}</strong>
        </p>

        <button
          id="logoutBtn"
          class="primary-btn"
          style="margin-top:20px;width:100%"
        >
          Se déconnecter
        </button>
      </div>
    `);

    $("logoutBtn").onclick = async () => {

      try {

        await signOut(auth);

        removeAdminAccess();

        closeModal();

        showToast("Déconnexion réussie");

      } catch (error) {

        showToast("Erreur lors de la déconnexion", "error");

      }

    };

    return;
  }


  openModal(`
    <div class="modal-head">
      <h2>${authMode === "login" ? "🔐 Connexion" : "✨ Créer un compte"}</h2>
      <button data-close-modal>×</button>
    </div>

    <form id="authForm">

      <input
        id="authEmail"
        type="email"
        placeholder="Adresse e-mail"
        required
      >

      <input
        id="authPassword"
        type="password"
        placeholder="Mot de passe"
        minlength="6"
        required
      >

      <button
        type="submit"
        class="primary-btn"
        style="width:100%"
      >
        ${authMode === "login" ? "Se connecter" : "Créer mon compte"}
      </button>

    </form>

    <button
      id="switchAuth"
      class="text-btn"
      style="margin-top:15px"
    >
      ${
        authMode === "login"
          ? "Créer un compte"
          : "J'ai déjà un compte"
      }
    </button>
  `);


  $("switchAuth").onclick = () => {

    authMode =
      authMode === "login"
        ? "register"
        : "login";

    openAuth();

  };


  $("authForm").onsubmit = async event => {

    event.preventDefault();

    const email = $("authEmail").value.trim();
    const password = $("authPassword").value;

    try {

      if (authMode === "login") {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        showToast("Connexion réussie ✅");

      } else {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        showToast("Compte créé ✅");

      }

      closeModal();

    } catch (error) {

      let message = "Une erreur est survenue.";

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        message = "E-mail ou mot de passe incorrect.";
      }

      if (error.code === "auth/email-already-in-use") {
        message = "Cette adresse e-mail est déjà utilisée.";
      }

      if (error.code === "auth/weak-password") {
        message = "Le mot de passe doit contenir au moins 6 caractères.";
      }

      if (error.code === "auth/invalid-email") {
        message = "Adresse e-mail invalide.";
      }

      showToast(message, "error");

    }

  };

}


/* =========================================================
   CATÉGORIES
========================================================= */

function getCategories() {

  const categories = [
    "Tous",
    ...new Set(products.map(product => product.category))
  ];

  return categories;
}


function renderCategories() {

  if (!categoriesEl) return;

  categoriesEl.innerHTML = getCategories()
    .map(category => `
      <button
        class="category-btn ${
          selectedCategory === category ? "active" : ""
        }"
        data-category="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>
    `)
    .join("");


  categoriesEl
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.onclick = () => {

        selectedCategory =
          button.dataset.category;

        renderCategories();
        renderProducts();

      };

    });

}


/* =========================================================
   AVIS
========================================================= */

function getProductReviews(productId) {

  if (!reviewsCache[productId]) {

    const count = randomInt(850, 950);

    const average =
      Math.round(
        (4.3 + Math.random() * 0.6) * 10
      ) / 10;

    reviewsCache[productId] = {
      count,
      average
    };

  }

  return reviewsCache[productId];
}


/* =========================================================
   FILTRAGE
========================================================= */

function getFilteredProducts() {

  const queryText =
    searchValue
      .trim()
      .toLowerCase();

  return products.filter(product => {

    const categoryOK =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;

    const searchOK =
      !queryText ||
      product.name.toLowerCase().includes(queryText) ||
      product.category.toLowerCase().includes(queryText);

    return categoryOK && searchOK;

  });

}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts() {

  if (!productsGrid) return;

  const filtered = getFilteredProducts();

  if (productCount) {
    productCount.textContent =
      `${filtered.length} produit${filtered.length > 1 ? "s" : ""}`;
  }


  if (!filtered.length) {

    productsGrid.innerHTML = `
      <div class="empty-state">
        <div style="font-size:45px">🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essaie une autre recherche.</p>
      </div>
    `;

    return;
  }


  productsGrid.innerHTML =
    filtered.map((product, index) => {

      const reviews =
        getProductReviews(product.id);

      const unavailable =
        Number(product.price) <= 0;

      return `

        <article
          class="product-card"
          data-product-id="${escapeHtml(product.id)}"
        >

          <div class="product-image-wrap">

            <img
              class="product-image"
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              loading="lazy"
              data-image-fallback
            >

          </div>

          <div class="product-info">

            <div class="product-category">
              ${escapeHtml(product.category)}
            </div>

            <h3 class="product-title">
              ${escapeHtml(product.name)}
            </h3>

            <button
              class="reviews-btn"
              data-review-product="${escapeHtml(product.id)}"
            >
              <span class="stars">
                ${stars(reviews.average)}
              </span>

              <span>
                ${reviews.average}/5
              </span>

              <span>
                (${reviews.count})
              </span>
            </button>

            <div class="product-bottom">

              <div class="product-price">
                ${money(product.price)}
              </div>

              <button
                class="add-cart-btn"
                data-add-product="${escapeHtml(product.id)}"
                ${unavailable ? "disabled" : ""}
              >
                ${
                  unavailable
                    ? "Prix à venir"
                    : "Ajouter"
                }
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");


  productsGrid
    .querySelectorAll("[data-image-fallback]")
    .forEach(image => {

      image.addEventListener("error", () => {

        if (image.src !== FALLBACK_IMAGE) {
          image.src = FALLBACK_IMAGE;
        }

      });

    });


  productsGrid
    .querySelectorAll("[data-add-product]")
    .forEach(button => {

      button.onclick = () => {

        addToCart(
          button.dataset.addProduct,
          button
        );

      };

    });


  productsGrid
    .querySelectorAll("[data-review-product]")
    .forEach(button => {

      button.onclick = () => {

        openReviews(
          button.dataset.reviewProduct
        );

      };

    });

}


/* =========================================================
   AVIS MODAL
========================================================= */

function openReviews(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product) return;

  const reviewData =
    getProductReviews(productId);

  openModal(`

    <div class="modal-head">

      <h2>⭐ Avis clients</h2>

      <button data-close-modal>×</button>

    </div>

    <div class="review-summary">

      <div class="review-big">
        ${reviewData.average}/5
      </div>

      <div>
        <div class="stars big">
          ${stars(reviewData.average)}
        </div>

        <p>
          ${reviewData.count} avis clients
        </p>
      </div>

    </div>

    <div style="margin-top:25px">

      <h3>
        ${escapeHtml(product.name)}
      </h3>

      <p style="margin-top:10px">
        Les avis sont actuellement représentés
        par les statistiques affichées sur NovaShop.
      </p>

    </div>

  `);

}


/* =========================================================
   PANIER : NETTOYAGE
========================================================= */

function sanitizeCart(items) {

  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map(item => {

      if (!item || typeof item !== "object") {
        return null;
      }

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) {
        return null;
      }

      const quantity =
        Math.max(
          1,
          Math.min(
            99,
            Number.parseInt(item.quantity, 10) || 1
          )
        );

      return {
        id: product.id,
        quantity
      };

    })
    .filter(Boolean);

}


/* =========================================================
   PANIER : SAUVEGARDE
========================================================= */

function saveCart() {

  cart = sanitizeCart(cart);

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


/* =========================================================
   PANIER : CHARGEMENT
========================================================= */

function loadCart() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem("novaCart") || "[]"
      );

    cart = sanitizeCart(saved);

    saveCart();

  } catch {

    cart = [];

    saveCart();

  }

  renderCart();

}


/* =========================================================
   ANIMATION PRODUIT → PANIER
========================================================= */

function animateProductToCart(productId, button) {

  if (!button || !cartBtn) return;

  const card =
    button.closest(".product-card");

  const image =
    card?.querySelector(".product-image");

  if (!image) return;

  const start =
    image.getBoundingClientRect();

  const end =
    cartBtn.getBoundingClientRect();


  const clone =
    image.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.left = `${start.left}px`;
  clone.style.top = `${start.top}px`;
  clone.style.width = `${start.width}px`;
  clone.style.height = `${start.height}px`;
  clone.style.objectFit = "contain";
  clone.style.zIndex = "99999";
  clone.style.pointerEvents = "none";
  clone.style.borderRadius = "12px";
  clone.style.transition =
    "left .55s cubic-bezier(.22,.8,.28,1), top .55s cubic-bezier(.22,.8,.28,1), width .55s, height .55s, opacity .55s, transform .55s";

  document.body.appendChild(clone);


  requestAnimationFrame(() => {

    clone.style.left =
      `${end.left + end.width / 2 - 18}px`;

    clone.style.top =
      `${end.top + end.height / 2 - 18}px`;

    clone.style.width = "36px";
    clone.style.height = "36px";
    clone.style.opacity = "0.35";
    clone.style.transform = "scale(.65)";

  });


  setTimeout(() => {

    clone.remove();

    cartBtn.classList.add("cart-pop");

    setTimeout(() => {
      cartBtn.classList.remove("cart-pop");
    }, 400);

  }, 600);

}


/* =========================================================
   AJOUT PANIER
========================================================= */

function addToCart(productId, button = null) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) return;


  if (Number(product.price) <= 0) {

    showToast(
      "Le prix de ce produit n'est pas encore disponible.",
      "error"
    );

    return;
  }


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity =
      Math.min(
        99,
        existing.quantity + 1
      );

  } else {

    cart.push({
      id: productId,
      quantity: 1
    });

  }


  saveCart();

  renderCart();


  if (button) {

    animateProductToCart(
      productId,
      button
    );

    const original =
      button.textContent;

    button.textContent =
      "✓ Ajouté";

    button.classList.add("added");

    setTimeout(() => {

      button.textContent =
        original;

      button.classList.remove("added");

    }, 900);

  }


  showToast(
    `${product.name} ajouté au panier`
  );

}


/* =========================================================
   SUPPRIMER PANIER
========================================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );

  saveCart();
  renderCart();

}


/* =========================================================
   QUANTITÉ
========================================================= */

function changeQuantity(productId, amount) {

  const item =
    cart.find(
      x => x.id === productId
    );

  if (!item) return;


  item.quantity =
    Math.max(
      1,
      Math.min(
        99,
        item.quantity + amount
      )
    );


  saveCart();
  renderCart();

}


/* =========================================================
   PANIER
========================================================= */

function renderCart() {

  cart = sanitizeCart(cart);

  saveCart();


  const totalQuantity =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  if (cartBadge) {

    cartBadge.textContent =
      totalQuantity > 99
        ? "99+"
        : String(totalQuantity);

    cartBadge.classList.toggle(
      "visible",
      totalQuantity > 0
    );

  }


  if (!cartItems) return;


  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">

        <div style="font-size:55px">🛒</div>

        <h3>Ton panier est vide</h3>

        <p>
          Ajoute des produits pour les retrouver ici.
        </p>

      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent = "0,00 €";
    }

    return;
  }


  let total = 0;


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";


      const quantity =
        Math.max(
          1,
          Number(item.quantity) || 1
        );


      total +=
        Number(product.price) *
        quantity;


      return `

        <div class="cart-item">

          <img
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            onerror="this.src='${FALLBACK_IMAGE}'"
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHtml(product.name)}
            </strong>

            <span>
              ${money(product.price)}
            </span>

            <div class="quantity-controls">

              <button
                data-minus="${escapeHtml(product.id)}"
              >
                −
              </button>

              <span>
                ${quantity}
              </span>

              <button
                data-plus="${escapeHtml(product.id)}"
              >
                +
              </button>

              <button
                class="remove-item"
                data-remove="${escapeHtml(product.id)}"
              >
                🗑️
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");


  if (cartTotal) {
    cartTotal.textContent =
      money(total);
  }


  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.minus,
          -1
        );

      };

    });


  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.plus,
          1
        );

      };

    });


  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.onclick = () => {

        removeFromCart(
          button.dataset.remove
        );

      };

    });

}


/* =========================================================
   OUVRIR / FERMER PANIER
========================================================= */

function openCart() {

  if (!cartOverlay || !cartDrawer) return;

  cartOverlay.classList.add("open");

  requestAnimationFrame(() => {
    cartOverlay.classList.add("visible");
    cartDrawer.classList.add("visible");
  });

}


function closeCart() {

  if (!cartOverlay || !cartDrawer) return;

  cartDrawer.classList.remove("visible");
  cartOverlay.classList.remove("visible");

  setTimeout(() => {
    cartOverlay.classList.remove("open");
  }, 300);

}


if (cartBtn) {
  cartBtn.onclick = openCart;
}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target === cartOverlay ||
        event.target.matches("[data-close-cart]")
      ) {
        closeCart();
      }

    }
  );

}


/* =========================================================
   COMMANDES
========================================================= */

async function openOrders() {

  if (!currentUser) {

    showToast(
      "Connecte-toi pour voir tes commandes.",
      "error"
    );

    openAuth();

    return;
  }


  openModal(`

    <div class="modal-head">

      <h2>📦 Mes commandes</h2>

      <button data-close-modal>×</button>

    </div>

    <div id="ordersList">

      <div class="loading">
        Chargement...
      </div>

    </div>

  `);


  try {

    const q =
      query(
        collection(db, "orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      );


    const snapshot =
      await getDocs(q);


    const list =
      $("ordersList");


    if (!snapshot.size) {

      list.innerHTML = `
        <div class="empty-state">
          <div style="font-size:45px">📦</div>
          <h3>Aucune commande</h3>
          <p>Tu n'as pas encore passé de commande.</p>
        </div>
      `;

      return;
    }


    list.innerHTML =
      snapshot.docs
        .map(orderDoc => {

          const order =
            orderDoc.data();


          const date =
            order.createdAt?.toDate
              ? order.createdAt.toDate()
              : null;


          return `

            <div class="order-card">

              <div>
                <strong>
                  Commande #${escapeHtml(
                    orderDoc.id.slice(0, 8)
                  )}
                </strong>

                <p>
                  ${
                    date
                      ? date.toLocaleString("fr-FR")
                      : "Date inconnue"
                  }
                </p>

              </div>

              <strong>
                ${money(order.total)}
              </strong>

            </div>

          `;

        }).join("");


  } catch (error) {

    console.error(error);

    $("ordersList").innerHTML = `
      <div class="empty-state">
        <h3>Impossible de charger les commandes</h3>
        <p>
          Vérifie les règles Firestore.
        </p>
      </div>
    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

async function checkout() {

  if (!currentUser) {

    showToast(
      "Connecte-toi avant de commander.",
      "error"
    );

    closeCart();
    openAuth();

    return;
  }


  cart = sanitizeCart(cart);


  if (!cart.length) {

    showToast(
      "Ton panier est vide.",
      "error"
    );

    return;
  }


  let total = 0;


  const items =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return null;


      const quantity =
        Number(item.quantity) || 1;


      total +=
        Number(product.price) *
        quantity;


      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      };

    })
    .filter(Boolean);


  if (!items.length) return;


  try {

    await addDoc(
      collection(db, "orders"),
      {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items,
        total,
        status: "En préparation",
        createdAt: serverTimestamp()
      }
    );


    cart = [];

    saveCart();
    renderCart();

    closeCart();


    showToast(
      "Commande enregistrée avec succès ✅"
    );


  } catch (error) {

    console.error(error);

    showToast(
      "Impossible d'enregistrer la commande.",
      "error"
    );

  }

}


/* =========================================================
   ADMIN : ACCÈS
========================================================= */

function openAdmin() {

  if (!isAdmin()) {

    showToast(
      "Accès réservé à l'administrateur.",
      "error"
    );

    return;
  }


  /*
    NOUVEAU :
    Si l'autorisation est déjà enregistrée,
    on ouvre directement le Dashboard.
  */

  if (hasAdminAccess()) {

    openAdminDashboard();

    return;
  }


  /*
    Première connexion seulement :
    demande du code.
  */

  openModal(`

    <div class="modal-head">

      <h2>🛡️ Accès administrateur</h2>

      <button data-close-modal>×</button>

    </div>

    <div style="padding:20px 0">

      <p style="margin-bottom:18px">
        Entre le code administrateur pour accéder
        au Dashboard NovaShop.
      </p>

      <input
        id="adminCodeInput"
        type="password"
        placeholder="Code administrateur"
        autocomplete="off"
      >

      <button
        id="adminCodeSubmit"
        class="primary-btn"
        style="width:100%;margin-top:12px"
      >
        Accéder au Dashboard
      </button>

    </div>

  `);


  const input =
    $("adminCodeInput");

  const submit =
    $("adminCodeSubmit");


  function checkAdminCode() {

    if (
      input.value.trim() ===
      ADMIN_CODE
    ) {

      /*
        IMPORTANT :
        On mémorise l'accès.
      */

      saveAdminAccess();

      closeModal();

      showToast(
        "Accès administrateur mémorisé ✅"
      );

      setTimeout(() => {
        openAdminDashboard();
      }, 250);

    } else {

      input.value = "";

      input.focus();

      showToast(
        "Code administrateur incorrect.",
        "error"
      );

    }

  }


  submit.onclick =
    checkAdminCode;


  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        checkAdminCode();
      }

    }
  );


  setTimeout(() => {
    input.focus();
  }, 100);

}


/* =========================================================
   DASHBOARD ADMIN
========================================================= */

async function openAdminDashboard() {

  if (!isAdmin()) {

    showToast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }


  /*
    Sécurité supplémentaire :
    si l'accès n'est pas mémorisé,
    on repasse par la vérification.
  */

  if (!hasAdminAccess()) {

    openAdmin();

    return;
  }


  openModal(`

    <div class="admin-dashboard">

      <div class="admin-dashboard-header">

        <div>

          <div class="admin-label">
            NOVASHOP ADMIN
          </div>

          <h2>
            🛡️ Dashboard
          </h2>

        </div>

        <button data-close-modal>
          ×
        </button>

      </div>


      <div class="admin-grid">

        <div class="admin-stat">

          <span>Produits</span>

          <strong>
            ${products.length}
          </strong>

        </div>


        <div class="admin-stat">

          <span>Catégories</span>

          <strong>
            ${getCategories().length - 1}
          </strong>

        </div>


        <div class="admin-stat">

          <span>Utilisateur</span>

          <strong>
            Admin
          </strong>

        </div>


        <div class="admin-stat">

          <span>Statut</span>

          <strong>
            🟢 Actif
          </strong>

        </div>

      </div>


      <div class="admin-section">

        <h3>
          📊 Catalogue
        </h3>

        <p>
          ${products.length}
          produits actuellement affichés sur NovaShop.
        </p>

      </div>


      <div class="admin-section">

        <h3>
          🗂️ Catégories
        </h3>

        <div class="admin-categories">

          ${getCategories()
            .filter(c => c !== "Tous")
            .map(c => `
              <span>
                ${escapeHtml(c)}
              </span>
            `)
            .join("")}

        </div>

      </div>


      <div class="admin-section danger-zone">

        <h3>
          ⚠️ Zone dangereuse
        </h3>

        <p>
          Cette action supprime les commandes
          enregistrées dans Firestore et les données
          locales NovaShop de ce navigateur.
        </p>

        <button
          id="deleteAllDataBtn"
          class="danger-btn"
        >
          🗑️ Supprimer toutes les données
        </button>

      </div>


      <div class="admin-footer">

        <button
          id="adminLogoutAccessBtn"
          class="secondary-btn"
        >
          🔒 Retirer l'autorisation mémorisée
        </button>

      </div>

    </div>

  `);


  const deleteButton =
    $("deleteAllDataBtn");


  if (deleteButton) {

    deleteButton.onclick =
      deleteAllData;

  }


  const removeAccessButton =
    $("adminLogoutAccessBtn");


  if (removeAccessButton) {

    removeAccessButton.onclick = () => {

      removeAdminAccess();

      closeModal();

      showToast(
        "Autorisation admin supprimée."
      );

    };

  }

}


/* =========================================================
   SUPPRESSION DES DONNÉES ADMIN
========================================================= */

async function deleteAllData() {

  if (!isAdmin()) {

    showToast(
      "Action réservée à l'administrateur.",
      "error"
    );

    return;
  }


  const firstConfirm =
    confirm(
      "⚠️ ATTENTION\n\nSupprimer toutes les commandes et les données locales NovaShop ?"
    );


  if (!firstConfirm) return;


  const secondConfirm =
    confirm(
      "DERNIÈRE CONFIRMATION\n\nCette action ne peut pas être annulée. Continuer ?"
    );


  if (!secondConfirm) return;


  try {

    showToast(
      "Suppression en cours..."
    );


    const snapshot =
      await getDocs(
        collection(db, "orders")
      );


    let deletedCount = 0;


    for (const orderDoc of snapshot.docs) {

      await deleteDoc(
        doc(
          db,
          "orders",
          orderDoc.id
        )
      );

      deletedCount++;

    }


    /*
      Nettoyage local
    */

    localStorage.removeItem("novaCart");
    localStorage.removeItem("novaOrders");
    localStorage.removeItem("novaCheckout");
    localStorage.removeItem("novaReviews");

    /*
      IMPORTANT :
      On ne supprime PAS novaAdminAuthorized.
      Ainsi l'admin n'a pas besoin de remettre
      son code après avoir nettoyé les données.
    */

    sessionStorage.clear();

    cart = [];

    reviewsCache = {};

    saveCart();
    renderCart();


    showToast(
      `${deletedCount} commande(s) supprimée(s) ✅`
    );


    setTimeout(() => {
      openAdminDashboard();
    }, 500);


  } catch (error) {

    console.error(
      "Erreur suppression données :",
      error
    );

    showToast(
      "Erreur pendant la suppression des données.",
      "error"
    );

  }

}


/* =========================================================
   HERO / BOUTONS
========================================================= */

function scrollToProducts() {

  const element =
    $("products");

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-scroll-products]"
      );

    if (button) {
      scrollToProducts();
    }

  }
);


/* =========================================================
   RECHERCHE
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


/* =========================================================
   AUTH BUTTON
========================================================= */

if (accountBtn) {

  accountBtn.onclick =
    openAuth;

}


/* =========================================================
   ORDERS BUTTON
========================================================= */

if (ordersBtn) {

  ordersBtn.onclick =
    openOrders;

}


/* =========================================================
   ADMIN BUTTON
========================================================= */

if (adminBtn) {

  adminBtn.onclick =
    openAdmin;

}


/* =========================================================
   CHECKOUT BUTTONS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const checkoutButton =
      event.target.closest(
        "#checkoutBtn, [data-checkout]"
      );

    if (checkoutButton) {
      checkout();
    }

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;


    /*
      Si l'utilisateur n'est plus le compte admin,
      on retire l'autorisation mémorisée.
    */

    if (!isAdmin()) {
      removeAdminAccess();
    }


    if (accountBtn) {

      if (currentUser) {

        accountBtn.textContent =
          "👤 Compte";

      } else {

        accountBtn.textContent =
          "👤 Connexion";

      }

    }


    if (adminBtn) {

      adminBtn.style.display =
        isAdmin()
          ? ""
          : "none";

    }

  }
);


/* =========================================================
   ESCAPE
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
   INITIALISATION
========================================================= */

function init() {

  loadCart();

  renderCategories();

  renderProducts();


  /*
    Si l'admin est déjà autorisé sur ce navigateur,
    aucune demande de code supplémentaire.
  */

  if (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  ) {

    console.log(
      "NovaShop Admin : accès mémorisé."
    );

  }

}


init();


/* =========================================================
   DEBUG NOVASHOP
========================================================= */

window.NovaShop = {

  products,

  getCart: () => [...cart],

  clearCart: () => {

    cart = [];

    saveCart();
    renderCart();

  },

  adminAuthorized: () =>
    hasAdminAccess(),

  removeAdminAuthorization: () => {

    removeAdminAccess();

    console.log(
      "Autorisation admin supprimée."
    );

  }

};
