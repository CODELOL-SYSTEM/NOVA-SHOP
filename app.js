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
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc
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

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

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
    name: "KOORUI Écran PC Gamer 27 Pouces 200Hz IPS QHD HDR400",
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
    name: "Chaise GTPLAYER Ergonomique Gaming",
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
    name: "Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category: "Claviers",
    price: 78.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id: "p31",
    name: "QwertyKey75 HE Striker",
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
    name: "ATTACK SHARK R11 Ultra",
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
    name: "Lampe de plafond hexagone nid d’abeille LED",
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
   ETAT
========================================================= */

let currentUser = null;
let authMode = "login";
let selectedCategory = "Tous";
let searchValue = "";
let cart = [];
let reviewsCache = {};

/* =========================================================
   DOM
========================================================= */

const searchInput = document.getElementById("searchInput");
const categoriesContainer = document.getElementById("categories");
const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");

const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const toastContainer = document.getElementById("toastContainer");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalCloseBtn = document.getElementById("modalCloseBtn");

const accountBtn = document.getElementById("accountBtn");
const ordersBtn = document.getElementById("ordersBtn");
const adminBtn = document.getElementById("adminBtn");

const heroShopBtn = document.getElementById("heroShopBtn");
const heroCartBtn = document.getElementById("heroCartBtn");

/* =========================================================
   UTILITAIRES
========================================================= */

function randomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

function money(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0,00 €";
  }

  if (amount === 0) {
    return "Prix à venir";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stars(value) {
  const rounded = Math.max(
    0,
    Math.min(5, Math.round(value))
  );

  return (
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded)
  );
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {
  if (!toastContainer) return;

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

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
  }, 2600);
}

/* =========================================================
   MODAL
========================================================= */

function openModal(title, content) {
  if (!modalOverlay) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = content;

  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay?.classList.remove("active");
}

modalCloseBtn?.addEventListener(
  "click",
  closeModal
);

modalOverlay?.addEventListener(
  "click",
  event => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  }
);

/* =========================================================
   IMAGES
========================================================= */

function setupImageFallback(img) {
  if (!img) return;

  img.addEventListener("error", () => {

    if (img.dataset.fallbackUsed === "1") {
      return;
    }

    img.dataset.fallbackUsed = "1";
    img.src = FALLBACK_IMAGE;
  });
}

/* =========================================================
   AVIS
========================================================= */

function getReviews(productId) {

  if (!reviewsCache[productId]) {

    reviewsCache[productId] = {
      count: randomInt(850, 950),
      average:
        Math.round(
          (4.3 + Math.random() * 0.6) * 10
        ) / 10
    };
  }

  return reviewsCache[productId];
}

/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

  if (!categoriesContainer) return;

  const categories = [
    "Tous",
    ...new Set(
      products.map(product => product.category)
    )
  ];

  categoriesContainer.innerHTML =
    categories.map(category => `
      <button
        class="category-btn ${
          selectedCategory === category
            ? "active"
            : ""
        }"
        data-category="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>
    `).join("");

  categoriesContainer
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
   PRODUITS FILTRES
========================================================= */

function getFilteredProducts() {

  const search =
    searchValue
      .trim()
      .toLowerCase();

  return products.filter(product => {

    const categoryMatch =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;

    const searchMatch =
      !search ||
      product.name
        .toLowerCase()
        .includes(search) ||
      product.category
        .toLowerCase()
        .includes(search);

    return (
      categoryMatch &&
      searchMatch
    );
  });
}

/* =========================================================
   RENDU PRODUITS
========================================================= */

function renderProducts() {

  if (!productsGrid) return;

  const filtered =
    getFilteredProducts();

  if (productCount) {
    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;
  }

  if (!filtered.length) {

    productsGrid.innerHTML = `
      <div class="empty-products">
        <div>🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>
          Essaie une autre recherche
          ou une autre catégorie.
        </p>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML =
    filtered.map(product => {

      const review =
        getReviews(product.id);

      const unavailable =
        Number(product.price) === 0;

      return `
        <article
          class="product-card"
          data-product-id="${product.id}"
        >

          <div class="product-image-wrap">

            <img
              class="product-image"
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              loading="lazy"
            >

          </div>

          <div class="product-info">

            <div class="product-category">
              ${escapeHtml(product.category)}
            </div>

            <h3 class="product-name">
              ${escapeHtml(product.name)}
            </h3>

            <div class="product-rating">

              <span class="stars">
                ${stars(review.average)}
              </span>

              <span>
                ${review.average}
              </span>

              <button
                class="reviews-btn"
                data-reviews="${product.id}"
              >
                ${review.count} avis
              </button>

            </div>

            <div class="product-bottom">

              <div class="product-price">
                ${money(product.price)}
              </div>

              ${
                unavailable
                  ? `
                    <button
                      class="add-btn disabled"
                      disabled
                    >
                      Prix à venir
                    </button>
                  `
                  : `
                    <button
                      class="add-btn"
                      data-add="${product.id}"
                    >
                      Ajouter
                    </button>
                  `
              }

            </div>

          </div>

        </article>
      `;
    }).join("");

  productsGrid
    .querySelectorAll(".product-image")
    .forEach(setupImageFallback);

  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          const product =
            products.find(
              item =>
                item.id ===
                button.dataset.add
            );

          if (product) {
            addToCart(
              product,
              event,
              button
            );
          }
        }
      );
    });

  productsGrid
    .querySelectorAll("[data-reviews]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            products.find(
              item =>
                item.id ===
                button.dataset.reviews
            );

          if (!product) return;

          const review =
            getReviews(product.id);

          openModal(
            `Avis • ${product.name}`,
            `
              <div class="reviews-modal">

                <div class="reviews-score">
                  <strong>
                    ${review.average}
                  </strong>
                  <span>/ 5</span>
                </div>

                <div class="stars big">
                  ${stars(review.average)}
                </div>

                <p>
                  Basé sur
                  ${review.count}
                  avis clients.
                </p>

              </div>
            `
          );
        }
      );
    });
}

/* =========================================================
   NETTOYAGE PANIER
========================================================= */

function sanitizeCart() {

  if (!Array.isArray(cart)) {
    cart = [];
    return;
  }

  cart =
    cart
      .map(item => {

        if (
          !item ||
          typeof item !== "object"
        ) {
          return null;
        }

        const product =
          products.find(
            product =>
              product.id === item.id
          );

        if (!product) {
          return null;
        }

        const price =
          Number(product.price);

        if (
          !Number.isFinite(price) ||
          price <= 0
        ) {
          return null;
        }

        const quantity =
          Number(item.quantity);

        if (
          !Number.isFinite(quantity) ||
          quantity <= 0
        ) {
          return null;
        }

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: Math.min(
            99,
            Math.max(
              1,
              Math.floor(quantity)
            )
          )
        };
      })
      .filter(Boolean);
}

function saveCart() {

  sanitizeCart();

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

    cart =
      Array.isArray(saved)
        ? saved
        : [];

  } catch {

    cart = [];
  }

  sanitizeCart();
  saveCart();
  renderCart();
}

/* =========================================================
   INFOS PANIER
========================================================= */

function getCartQuantity() {

  sanitizeCart();

  return cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity),
    0
  );
}

function getCartTotal() {

  sanitizeCart();

  return cart.reduce(
    (total, item) => {

      const price =
        Number(item.price);

      const quantity =
        Number(item.quantity);

      if (
        !Number.isFinite(price) ||
        !Number.isFinite(quantity)
      ) {
        return total;
      }

      return (
        total +
        price * quantity
      );
    },
    0
  );
}

function updateCartBadge() {

  if (!cartBadge) return;

  const quantity =
    getCartQuantity();

  cartBadge.textContent =
    quantity > 99
      ? "99+"
      : String(quantity);

  cartBadge.classList.remove(
    "pop"
  );

  if (quantity > 0) {

    requestAnimationFrame(() => {
      cartBadge.classList.add(
        "pop"
      );
    });
  }
}

/* =========================================================
   ANIMATION PRODUIT
========================================================= */

function flyProductToCart(
  productCard
) {

  const image =
    productCard?.querySelector(
      ".product-image"
    );

  const cartTarget =
    cartBtn;

  if (
    !image ||
    !cartTarget
  ) {
    return;
  }

  const imageRect =
    image.getBoundingClientRect();

  const cartRect =
    cartTarget.getBoundingClientRect();

  const clone =
    image.cloneNode(true);

  clone.className =
    "flying-product";

  const size =
    Math.min(
      imageRect.width,
      180
    );

  clone.style.position =
    "fixed";

  clone.style.left =
    `${imageRect.left}px`;

  clone.style.top =
    `${imageRect.top}px`;

  clone.style.width =
    `${size}px`;

  clone.style.height =
    `${size}px`;

  clone.style.objectFit =
    "contain";

  clone.style.zIndex =
    "99999";

  clone.style.pointerEvents =
    "none";

  document.body.appendChild(
    clone
  );

  const endX =
    cartRect.left +
    cartRect.width / 2 -
    size / 2;

  const endY =
    cartRect.top +
    cartRect.height / 2 -
    size / 2;

  const animation =
    clone.animate(
      [
        {
          transform:
            "translate(0,0) scale(1)",
          opacity: 1
        },

        {
          transform:
            `translate(
              ${(endX - imageRect.left) * 0.55}px,
              ${(endY - imageRect.top) * 0.55}px
            ) scale(.72)`,
          opacity: 0.9
        },

        {
          transform:
            `translate(
              ${endX - imageRect.left}px,
              ${endY - imageRect.top}px
            ) scale(.18)`,
          opacity: 0
        }
      ],
      {
        duration: 620,
        easing:
          "cubic-bezier(.22,.8,.25,1)"
      }
    );

  animation.finished
    .catch(() => {})
    .finally(() => {
      clone.remove();
    });
}

/* =========================================================
   AJOUT PANIER
========================================================= */

function addToCart(
  product,
  event,
  button
) {

  if (!product) return;

  const price =
    Number(product.price);

  if (
    !Number.isFinite(price) ||
    price <= 0
  ) {

    showToast(
      "Produit indisponible pour le moment.",
      "error"
    );

    return;
  }

  sanitizeCart();

  const existing =
    cart.find(
      item =>
        item.id === product.id
    );

  if (existing) {

    existing.quantity =
      Math.min(
        99,
        existing.quantity + 1
      );

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();

  const productCard =
    button?.closest(
      ".product-card"
    );

  flyProductToCart(
    productCard
  );

  if (button) {

    const original =
      button.textContent;

    button.textContent =
      "Ajouté ✓";

    button.classList.add(
      "added"
    );

    setTimeout(() => {

      button.textContent =
        original;

      button.classList.remove(
        "added"
      );

    }, 1000);
  }

  showToast(
    `${product.name} ajouté au panier.`
  );
}

/* =========================================================
   QUANTITE
========================================================= */

function changeQuantity(
  id,
  delta
) {

  sanitizeCart();

  const item =
    cart.find(
      product =>
        product.id === id
    );

  if (!item) {

    renderCart();
    return;
  }

  const quantity =
    Number(item.quantity) +
    Number(delta);

  if (
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  } else {

    item.quantity =
      Math.min(
        99,
        Math.floor(quantity)
      );
  }

  saveCart();
  renderCart();
  updateCartBadge();
}

function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        item.id !== id
    );

  saveCart();
  renderCart();
  updateCartBadge();

  showToast(
    "Article retiré du panier."
  );
}

/* =========================================================
   RENDU PANIER
========================================================= */

function renderCart() {

  if (
    !cartItems ||
    !cartTotal
  ) {
    return;
  }

  sanitizeCart();
  saveCart();
  updateCartBadge();

  if (!cart.length) {

    cartItems.innerHTML = `
      <div class="empty-cart">

        <div class="empty-cart-icon">
          🛒
        </div>

        <h3>
          Ton panier est vide
        </h3>

        <p>
          Ajoute un produit pour commencer.
        </p>

      </div>
    `;

    cartTotal.textContent =
      money(0);

    if (checkoutBtn) {
      checkoutBtn.disabled =
        true;
    }

    return;
  }

  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product =>
            product.id === item.id
        );

      if (!product) {
        return "";
      }

      const price =
        Number(product.price);

      const quantity =
        Number(item.quantity);

      if (
        !Number.isFinite(price) ||
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        return "";
      }

      const lineTotal =
        price * quantity;

      return `
        <div class="cart-item">

          <img
            class="cart-item-image"
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
          >

          <div class="cart-item-info">

            <h4>
              ${escapeHtml(product.name)}
            </h4>

            <div class="cart-item-price">
              ${money(price)}
            </div>

            <div class="cart-item-actions">

              <button
                class="quantity-btn"
                data-minus="${product.id}"
              >
                −
              </button>

              <span class="quantity">
                ${quantity}
              </span>

              <button
                class="quantity-btn"
                data-plus="${product.id}"
              >
                +
              </button>

              <button
                class="remove-cart-btn"
                data-remove="${product.id}"
              >
                Supprimer
              </button>

            </div>

          </div>

          <div class="cart-item-total">
            ${money(lineTotal)}
          </div>

        </div>
      `;
    }).join("");

  cartItems
    .querySelectorAll(
      ".cart-item-image"
    )
    .forEach(
      setupImageFallback
    );

  cartItems
    .querySelectorAll(
      "[data-minus]"
    )
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
    .querySelectorAll(
      "[data-plus]"
    )
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
    .querySelectorAll(
      "[data-remove]"
    )
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

  cartTotal.textContent =
    money(
      getCartTotal()
    );

  if (checkoutBtn) {
    checkoutBtn.disabled =
      false;
  }
}

/* =========================================================
   OUVERTURE PANIER
========================================================= */

function openCart() {

  sanitizeCart();
  saveCart();
  renderCart();

  cartOverlay?.classList.add(
    "active"
  );

  cartDrawer?.classList.add(
    "active"
  );

  document.body.classList.add(
    "cart-open"
  );
}

function closeCart() {

  cartOverlay?.classList.remove(
    "active"
  );

  cartDrawer?.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "cart-open"
  );
}

cartBtn?.addEventListener(
  "click",
  openCart
);

closeCartBtn?.addEventListener(
  "click",
  closeCart
);

cartOverlay?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      cartOverlay
    ) {
      closeCart();
    }
  }
);

heroCartBtn?.addEventListener(
  "click",
  openCart
);

/* =========================================================
   COMPTE
========================================================= */

function renderAccountModal() {

  if (currentUser) {

    openModal(
      "Mon compte",
      `
        <div class="account-panel">

          <p>
            Connecté avec :
          </p>

          <strong>
            ${escapeHtml(
              currentUser.email
            )}
          </strong>

          <button
            id="logoutBtn"
            class="modal-action"
          >
            Se déconnecter
          </button>

        </div>
      `
    );

    setTimeout(() => {

      document
        .getElementById(
          "logoutBtn"
        )
        ?.addEventListener(
          "click",
          async () => {

            try {

              await signOut(auth);

              closeModal();

              showToast(
                "Déconnexion réussie."
              );

            } catch {

              showToast(
                "Impossible de se déconnecter.",
                "error"
              );
            }
          }
        );

    }, 0);

    return;
  }

  openAuthModal();
}

function openAuthModal() {

  const isLogin =
    authMode === "login";

  openModal(
    isLogin
      ? "Connexion"
      : "Créer un compte",

    `
      <form
        id="authForm"
        class="auth-form"
      >

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
          required
        >

        <button
          type="submit"
          class="modal-action"
        >
          ${
            isLogin
              ? "Se connecter"
              : "Créer mon compte"
          }
        </button>

        <button
          type="button"
          id="switchAuth"
          class="text-button"
        >
          ${
            isLogin
              ? "Créer un compte"
              : "J'ai déjà un compte"
          }
        </button>

      </form>
    `
  );

  setTimeout(() => {

    const form =
      document.getElementById(
        "authForm"
      );

    const switchAuth =
      document.getElementById(
        "switchAuth"
      );

    form?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const email =
          document
            .getElementById(
              "authEmail"
            )
            ?.value
            .trim();

        const password =
          document
            .getElementById(
              "authPassword"
            )
            ?.value;

        if (!email || !password) {
          return;
        }

        try {

          if (
            authMode === "login"
          ) {

            await signInWithEmailAndPassword(
              auth,
              email,
              password
            );

            showToast(
              "Connexion réussie."
            );

          } else {

            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

            showToast(
              "Compte créé."
            );
          }

          closeModal();

        } catch (error) {

          let message =
            "Une erreur est survenue.";

          if (
            error.code ===
            "auth/invalid-credential"
          ) {
            message =
              "E-mail ou mot de passe incorrect.";
          }

          if (
            error.code ===
            "auth/email-already-in-use"
          ) {
            message =
              "Cet e-mail est déjà utilisé.";
          }

          if (
            error.code ===
            "auth/weak-password"
          ) {
            message =
              "Le mot de passe est trop faible.";
          }

          showToast(
            message,
            "error"
          );
        }
      }
    );

    switchAuth?.addEventListener(
      "click",
      () => {

        authMode =
          authMode === "login"
            ? "register"
            : "login";

        openAuthModal();
      }
    );

  }, 0);
}

accountBtn?.addEventListener(
  "click",
  renderAccountModal
);

/* =========================================================
   COMMANDES
========================================================= */

async function showOrders() {

  if (!currentUser) {

    authMode = "login";

    openAuthModal();

    return;
  }

  openModal(
    "Mes commandes",
    `
      <div id="ordersContent">
        Chargement...
      </div>
    `
  );

  try {

    const ordersQuery =
      query(
        collection(
          db,
          "orders"
        ),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(
        ordersQuery
      );

    const orders = [];

    snapshot.forEach(
      docSnap => {

        orders.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      }
    );

    const container =
      document.getElementById(
        "ordersContent"
      );

    if (!container) return;

    if (!orders.length) {

      container.innerHTML = `
        <div class="empty-orders">

          <div>📦</div>

          <h3>
            Aucune commande
          </h3>

          <p>
            Tu n'as encore aucune commande.
          </p>

        </div>
      `;

      return;
    }

    orders.sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
    );

    container.innerHTML =
      orders.map(order => {

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];

        return `
          <div class="order-card">

            <div class="order-header">

              <strong>
                Commande #${escapeHtml(
                  order.id.slice(0, 8)
                )}
              </strong>

              <span>
                ${money(order.total)}
              </span>

            </div>

            <div class="order-products">

              ${items.map(item => `
                <div>
                  ${escapeHtml(
                    item.name
                  )}
                  × ${
                    Number(
                      item.quantity
                    ) || 0
                  }
                </div>
              `).join("")}

            </div>

          </div>
        `;
      }).join("");

  } catch {

    const container =
      document.getElementById(
        "ordersContent"
      );

    if (container) {

      container.innerHTML = `
        <p>
          Impossible de charger
          les commandes.
        </p>
      `;
    }
  }
}

ordersBtn?.addEventListener(
  "click",
  showOrders
);

/* =========================================================
   CHECKOUT
========================================================= */

checkoutBtn?.addEventListener(
  "click",
  async () => {

    sanitizeCart();

    if (!cart.length) {

      showToast(
        "Ton panier est vide.",
        "error"
      );

      return;
    }

    if (!currentUser) {

      closeCart();

      authMode = "login";

      openAuthModal();

      showToast(
        "Connecte-toi pour commander.",
        "error"
      );

      return;
    }

    const total =
      getCartTotal();

    if (
      !Number.isFinite(total) ||
      total <= 0
    ) {

      showToast(
        "Panier invalide.",
        "error"
      );

      return;
    }

    const items =
      cart.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(
          item.price
        ),
        quantity: Number(
          item.quantity
        ),
        image: item.image
      }));

    try {

      checkoutBtn.disabled =
        true;

      checkoutBtn.textContent =
        "Commande...";

      await addDoc(
        collection(
          db,
          "orders"
        ),
        {
          userId:
            currentUser.uid,

          userEmail:
            currentUser.email,

          items,

          total,

          status:
            "En attente",

          createdAt:
            serverTimestamp()
        }
      );

      cart = [];

      saveCart();
      renderCart();

      showToast(
        "Commande enregistrée !"
      );

      setTimeout(
        closeCart,
        700
      );

    } catch {

      showToast(
        "Impossible d'enregistrer la commande.",
        "error"
      );

    } finally {

      checkoutBtn.disabled =
        false;

      checkoutBtn.textContent =
        "Commander";
    }
  }
);

/* =========================================================
   SUPPRESSION DE TOUTES LES DONNEES
========================================================= */

async function deleteAllData() {

  if (!currentUser) {

    showToast(
      "Connexion administrateur requise.",
      "error"
    );

    return;
  }

  if (
    currentUser.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ) {

    showToast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }

  const firstConfirm =
    confirm(
      "⚠️ ATTENTION\n\n" +
      "Cette action va supprimer TOUTES les commandes " +
      "enregistrées dans NovaShop et vider les données " +
      "locales du site.\n\n" +
      "Cette action est irréversible.\n\n" +
      "Continuer ?"
    );

  if (!firstConfirm) {
    return;
  }

  const secondConfirm =
    confirm(
      "DERNIÈRE CONFIRMATION\n\n" +
      "Supprimer définitivement toutes les commandes ?"
    );

  if (!secondConfirm) {
    return;
  }

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "orders"
        )
      );

    let deletedCount = 0;

    for (
      const orderDoc of snapshot.docs
    ) {

      await deleteDoc(
        doc(
          db,
          "orders",
          orderDoc.id
        )
      );

      deletedCount++;
    }

    /* Nettoyage local */

    localStorage.removeItem(
      "novaCart"
    );

    localStorage.removeItem(
      "novaOrders"
    );

    localStorage.removeItem(
      "novaCheckout"
    );

    localStorage.removeItem(
      "novaReviews"
    );

    sessionStorage.clear();

    cart = [];

    reviewsCache = {};

    saveCart();
    renderCart();

    showToast(
      `${deletedCount} commande${
        deletedCount > 1
          ? "s"
          : ""
      } supprimée${
        deletedCount > 1
          ? "s"
          : ""
      }.`
    );

    openAdminDashboard();

  } catch (error) {

    console.error(
      "Erreur suppression totale :",
      error
    );

    showToast(
      "Impossible de supprimer toutes les données.",
      "error"
    );
  }
}

/* =========================================================
   ADMIN
========================================================= */

function openAdmin() {

  if (!currentUser) {

    showToast(
      "Connecte-toi avec le compte administrateur.",
      "error"
    );

    return;
  }

  if (
    currentUser.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ) {

    showToast(
      "Accès administrateur refusé.",
      "error"
    );

    return;
  }

  openModal(
    "Administration NovaShop",
    `
      <form
        id="adminForm"
        class="auth-form"
      >

        <p>
          Entre le code administrateur.
        </p>

        <input
          id="adminCode"
          type="password"
          placeholder="Code admin"
          required
        >

        <button
          type="submit"
          class="modal-action"
        >
          Ouvrir le dashboard
        </button>

      </form>
    `
  );

  setTimeout(() => {

    document
      .getElementById(
        "adminForm"
      )
      ?.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          const code =
            document
              .getElementById(
                "adminCode"
              )
              ?.value;

          if (
            code !== ADMIN_CODE
          ) {

            showToast(
              "Code incorrect.",
              "error"
            );

            return;
          }

          openAdminDashboard();
        }
      );

  }, 0);
}

/* =========================================================
   DASHBOARD ADMIN
========================================================= */

function openAdminDashboard() {

  if (!currentUser) {
    return;
  }

  const categoryCount =
    new Set(
      products.map(
        product =>
          product.category
      )
    ).size;

  openModal(
    "Dashboard NovaShop",
    `
      <div class="admin-dashboard">

        <div class="admin-stat">

          <span>
            Produits
          </span>

          <strong>
            ${products.length}
          </strong>

        </div>

        <div class="admin-stat">

          <span>
            Catégories
          </span>

          <strong>
            ${categoryCount}
          </strong>

        </div>

        <div class="admin-stat">

          <span>
            Administrateur
          </span>

          <strong>
            ${escapeHtml(
              currentUser.email
            )}
          </strong>

        </div>

        <div
          style="
            margin-top:24px;
            padding-top:24px;
            border-top:1px solid rgba(255,255,255,.10);
          "
        >

          <h3
            style="
              margin:0 0 8px;
              color:#ff5b5b;
            "
          >
            Zone dangereuse
          </h3>

          <p
            style="
              margin:0 0 16px;
              opacity:.7;
              line-height:1.5;
            "
          >
            Supprime toutes les commandes
            enregistrées et nettoie les données
            locales de NovaShop.
          </p>

          <button
            id="deleteAllDataBtn"
            type="button"
            style="
              width:100%;
              border:0;
              border-radius:12px;
              padding:14px 18px;
              background:#c62828;
              color:white;
              font-weight:800;
              cursor:pointer;
              transition:.2s;
            "
          >
            🗑️ Supprimer toutes les données
          </button>

        </div>

      </div>
    `
  );

  setTimeout(() => {

    const button =
      document.getElementById(
        "deleteAllDataBtn"
      );

    if (!button) return;

    button.addEventListener(
      "mouseenter",
      () => {
        button.style.background =
          "#e53935";
        button.style.transform =
          "translateY(-1px)";
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {
        button.style.background =
          "#c62828";
        button.style.transform =
          "translateY(0)";
      }
    );

    button.addEventListener(
      "click",
      deleteAllData
    );

  }, 0);
}

adminBtn?.addEventListener(
  "click",
  openAdmin
);

/* =========================================================
   RECHERCHE
========================================================= */

searchInput?.addEventListener(
  "input",
  event => {

    searchValue =
      event.target.value || "";

    renderProducts();
  }
);

/* =========================================================
   HERO
========================================================= */

heroShopBtn?.addEventListener(
  "click",
  () => {

    document
      .getElementById(
        "productsGrid"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
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

    if (accountBtn) {

      accountBtn.textContent =
        user
          ? "Mon compte"
          : "Connexion";
    }

    if (adminBtn) {

      adminBtn.style.display =
        user &&
        user.email?.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase()
          ? ""
          : "none";
    }
  }
);

/* =========================================================
   INITIALISATION
========================================================= */

function init() {

  renderCategories();

  loadCart();

  renderProducts();

  updateCartBadge();
}

init();
