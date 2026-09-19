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
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";


/* =========================================================
   IMAGES DE SECOURS
========================================================= */

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/*
  IMPORTANT :
  On conserve tes images.
  Si une URL ne répond pas, on remplace automatiquement
  l'image cassée par une image de secours.
*/

const imageFallbacks = {
  p1: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
  p2: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
  p3: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
  p4: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
  p5: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
  p6: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
  p7: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
  p8: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg",
  p9: "https://pc.comparer.fr/500x500/310191422.webp",
  p10: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
  p11: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
  p12: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
  p13: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
  p14: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
  p15: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg",
  p16: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
  p17: "https://media.materiel.net/r550/products/MN0005986139.jpg",
  p18: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
};


/* =========================================================
   PRODUITS
========================================================= */

const products = [

  {
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: imageFallbacks.p1
  },

  {
    id: "p2",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: imageFallbacks.p2
  },

  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: imageFallbacks.p3
  },

  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: imageFallbacks.p4
  },

  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: imageFallbacks.p5
  },

  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: imageFallbacks.p6
  },

  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: imageFallbacks.p7
  },

  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: imageFallbacks.p8
  },

  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: imageFallbacks.p9
  },

  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: imageFallbacks.p10
  },

  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: imageFallbacks.p11
  },

  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: imageFallbacks.p12
  },

  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: imageFallbacks.p13
  },

  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: imageFallbacks.p14
  },

  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: imageFallbacks.p15
  },

  {
    id: "p16",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: imageFallbacks.p16
  },

  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: imageFallbacks.p17
  },

  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: imageFallbacks.p18
  }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentUser = null;
let authMode = "login";
let selectedCategory = "Tous";
let searchValue = "";

let cart =
  JSON.parse(localStorage.getItem("novaCart") || "[]");

let reviewsCache = {};

let questionsUnsubscribe = null;
let adminQuestionsUnsubscribe = null;

let messageUnsubscribers = [];


/* =========================================================
   UTILITAIRES
========================================================= */

function randomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


function randomItem(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}


function money(value) {

  return Number(value).toLocaleString(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR"
    }
  );

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

  const rounded =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(Number(value) || 0)
      )
    );

  return (
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded)
  );

}


function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.__novaToastTimer);

  window.__novaToastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

}


function openModal(id) {

  document
    .getElementById(id)
    ?.classList.add("open");

}


function closeModal(id) {

  document
    .getElementById(id)
    ?.classList.remove("open");

}


/* =========================================================
   IMAGE LOADING
========================================================= */

/*
  Cette fonction est appelée sur TOUTES les images
  des produits.

  Si l'image distante échoue :
  1. on essaie une nouvelle fois avec l'URL enregistrée
  2. puis on affiche une image NovaShop de secours.
*/

function handleImageError(img, productId) {

  if (!img) return;

  if (img.dataset.fallbackUsed === "1") {

    img.src = FALLBACK_IMAGE;

    return;
  }

  img.dataset.fallbackUsed = "1";

  const original =
    imageFallbacks[productId];

  if (
    original &&
    img.src !== original
  ) {

    img.src = original;

    return;
  }

  img.src = FALLBACK_IMAGE;

}


/* =========================================================
   AVIS
========================================================= */

const firstNames = [
  "Lucas",
  "Hugo",
  "Nathan",
  "Tom",
  "Enzo",
  "Louis",
  "Arthur",
  "Alex",
  "Léo",
  "Maxime",
  "Théo",
  "Mathis",
  "Ethan",
  "Noah",
  "Gabriel",
  "Jules",
  "Adam",
  "Sacha",
  "Liam",
  "Raphaël"
];


const lastNames = [
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux"
];


const reviewTexts = {

  5: [
    "Excellent produit, fonctionne parfaitement.",
    "Très bonne qualité et livraison rapide.",
    "Je suis très satisfait du produit.",
    "Produit conforme à la description.",
    "Très bon achat.",
    "Rien à redire, tout fonctionne parfaitement."
  ],

  4: [
    "Très bon produit dans l'ensemble.",
    "Bonne qualité, je recommande.",
    "Produit efficace et conforme.",
    "Très satisfait malgré quelques petits détails."
  ],

  3: [
    "Produit correct.",
    "Ça fonctionne mais peut être amélioré.",
    "Qualité correcte pour le prix."
  ],

  2: [
    "Quelques problèmes mais le produit fonctionne.",
    "Pas totalement convaincu.",
    "Qualité moyenne."
  ],

  1: [
    "Produit qui ne correspond pas totalement à mes attentes.",
    "Quelques problèmes rencontrés."
  ]

};


function generateReviews(product) {

  const reviews = [];

  const reviewCount =
    randomInt(850, 950);

  for (
    let i = 0;
    i < reviewCount;
    i++
  ) {

    const roll = Math.random();

    let rating;

    if (roll < 0.72) {
      rating = 5;
    }
    else if (roll < 0.90) {
      rating = 4;
    }
    else if (roll < 0.97) {
      rating = 3;
    }
    else if (roll < 0.99) {
      rating = 2;
    }
    else {
      rating = 1;
    }

    const first =
      randomItem(firstNames);

    const last =
      randomItem(lastNames);

    const daysAgo =
      randomInt(0, 720);

    const date =
      new Date(
        Date.now() -
        daysAgo * 86400000
      );

    reviews.push({

      id:
        `${product.id}-review-${i + 1}`,

      name:
        `${first} ${last.charAt(0)}.`,

      rating,

      text:
        randomItem(
          reviewTexts[rating]
        ),

      date

    });

  }

  return reviews;

}


function getReviews(product) {

  if (!reviewsCache[product.id]) {

    reviewsCache[product.id] =
      generateReviews(product);

  }

  return reviewsCache[product.id];

}


function getReviewStats(product) {

  const reviews =
    getReviews(product);

  const average =
    reviews.reduce(
      (sum, review) =>
        sum + review.rating,
      0
    ) / reviews.length;

  return {
    count: reviews.length,
    average
  };

}


/* =========================================================
   CATÉGORIES
========================================================= */

function renderCategories() {

  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  const container =
    document.getElementById(
      "categories"
    );

  if (!container) return;

  container.innerHTML =
    categories.map(
      category => `

        <button
          class="category-btn ${
            category === selectedCategory
              ? "active"
              : ""
          }"
          data-category="${escapeHtml(category)}"
        >
          ${escapeHtml(category)}
        </button>

      `
    ).join("");

  container
    .querySelectorAll(
      "[data-category]"
    )
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
   PRODUITS
========================================================= */

function renderProducts() {

  const container =
    document.getElementById(
      "products"
    );

  if (!container) return;

  const filtered =
    products.filter(product => {

      const categoryOK =
        selectedCategory === "Tous" ||
        product.category ===
        selectedCategory;

      const searchOK =
        product.name
          .toLowerCase()
          .includes(
            searchValue.toLowerCase()
          );

      return categoryOK && searchOK;

    });


  if (!filtered.length) {

    container.innerHTML = `

      <div class="empty">

        Aucun produit trouvé.

      </div>

    `;

    return;

  }


  container.innerHTML =
    filtered.map(product => {

      const stats =
        getReviewStats(product);

      return `

        <article
          class="product-card"
        >

          <div class="product-image-wrap">

            <img
              class="product-image"
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              loading="eager"
              referrerpolicy="no-referrer"
              data-product-image="${product.id}"
            >

          </div>

          <div class="product-info">

            <div class="product-category">
              ${escapeHtml(product.category)}
            </div>

            <div class="product-name">
              ${escapeHtml(product.name)}
            </div>

            <div
              style="
                display:flex;
                align-items:center;
                gap:7px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <span
                class="stars"
              >
                ${stars(stats.average)}
              </span>

              <strong>
                ${stats.average.toFixed(1)}/5
              </strong>

              <span
                style="
                  color:#9ba8bd;
                  font-size:12px
                "
              >
                (${stats.count} avis)
              </span>

            </div>

            <div
              style="
                color:#71809a;
                font-size:11px;
                margin-top:3px;
              "
            >
              ${stats.count.toLocaleString("fr-FR")}
              avis
            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-buttons">

              <button
                class="btn"
                data-view-reviews="${product.id}"
              >
                💬 Voir les avis
              </button>

              <button
                class="btn primary"
                data-add-cart="${product.id}"
              >
                🛒
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");


  /*
    Installation du fallback sur les images.
  */

  container
    .querySelectorAll(
      "[data-product-image]"
    )
    .forEach(img => {

      const productId =
        img.dataset.productImage;

      img.addEventListener(
        "error",
        () => {

          handleImageError(
            img,
            productId
          );

        }
      );

    });


  container
    .querySelectorAll(
      "[data-view-reviews]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          showReviews(
            button.dataset.viewReviews
          );

        }
      );

    });


  container
    .querySelectorAll(
      "[data-add-cart]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addToCart(
            button.dataset.addCart
          );

        }
      );

    });

}


/* =========================================================
   AVIS
========================================================= */

function showReviews(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) return;

  const reviews =
    getReviews(product);

  const stats =
    getReviewStats(product);


  const title =
    document.getElementById(
      "reviewsTitle"
    );

  const content =
    document.getElementById(
      "reviewsContent"
    );

  if (!title || !content) return;


  title.textContent =
    `💬 Avis • ${product.name}`;


  const firstReviews =
    reviews.slice(0, 80);


  content.innerHTML = `

    <div
      style="
        background:#101925;
        border:1px solid #25364b;
        padding:15px;
        border-radius:12px;
        margin-bottom:15px;
      "
    >

      <div
        style="
          font-size:26px;
          font-weight:900
        "
      >
        ${stats.average.toFixed(1)}/5
      </div>

      <div
        class="stars"
        style="font-size:22px"
      >
        ${stars(stats.average)}
      </div>

      <div
        style="
          color:#8b9ab0;
          margin-top:5px
        "
      >
        ${stats.count.toLocaleString("fr-FR")}
        avis
      </div>

    </div>


    ${firstReviews.map(review => `

      <div class="review">

        <div class="review-top">

          <strong>
            ${escapeHtml(review.name)}
          </strong>

          <span class="stars">
            ${"★".repeat(review.rating)}
          </span>

        </div>

        <div class="review-date">

          ${review.date.toLocaleDateString(
            "fr-FR"
          )}

        </div>

        <div class="review-text">

          ${escapeHtml(review.text)}

        </div>

      </div>

    `).join("")}


    <div
      style="
        color:#71809a;
        text-align:center;
        padding:15px;
      "
    >

      ${Math.max(
        0,
        reviews.length - 80
      )}

      autres avis

    </div>

  `;


  openModal("reviewsModal");

}


/* =========================================================
   PANIER
========================================================= */

function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function addToCart(productId) {

  const existing =
    cart.find(
      item =>
        item.productId === productId
    );


  if (existing) {

    existing.quantity++;

  }
  else {

    cart.push({

      productId,

      quantity: 1

    });

  }


  saveCart();

  updateCartCount();

  showToast(
    "Produit ajouté au panier 🛒"
  );

}


function removeFromCart(productId) {

  cart =
    cart.filter(
      item =>
        item.productId !== productId
    );

  saveCart();

  updateCartCount();

  renderCart();

}


function changeQuantity(
  productId,
  amount
) {

  const item =
    cart.find(
      item =>
        item.productId === productId
    );

  if (!item) return;

  item.quantity += amount;


  if (item.quantity <= 0) {

    removeFromCart(productId);

    return;

  }


  saveCart();

  updateCartCount();

  renderCart();

}


function updateCartCount() {

  const element =
    document.getElementById(
      "cartCount"
    );

  if (!element) return;

  const count =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  element.textContent = count;

}


function getCartTotal() {

  return cart.reduce(
    (sum, item) => {

      const product =
        products.find(
          p =>
            p.id ===
            item.productId
        );

      return (
        sum +
        (product?.price || 0) *
        item.quantity
      );

    },
    0
  );

}


function renderCart() {

  const container =
    document.getElementById(
      "cartContent"
    );

  if (!container) return;


  if (!cart.length) {

    container.innerHTML = `

      <div class="empty">

        Ton panier est vide.

      </div>

    `;

    return;

  }


  container.innerHTML = `

    ${cart.map(item => {

      const product =
        products.find(
          p =>
            p.id ===
            item.productId
        );

      if (!product) return "";


      return `

        <div class="cart-item">

          <img
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            referrerpolicy="no-referrer"
            data-cart-image="${product.id}"
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHtml(product.name)}
            </strong>

            <div
              style="
                margin-top:5px;
                color:#8d9bb0
              "
            >
              ${money(product.price)}
            </div>

          </div>

          <button
            class="btn"
            data-minus="${product.id}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            class="btn"
            data-plus="${product.id}"
          >
            +
          </button>

          <button
            class="btn danger"
            data-remove="${product.id}"
          >
            ×
          </button>

        </div>

      `;

    }).join("")}


    <div class="cart-total">

      Total :
      ${money(getCartTotal())}

    </div>


    <button
      class="btn primary"
      id="checkoutBtn"
      style="
        width:100%;
        margin-top:15px
      "
    >
      💳 Passer la commande
    </button>

  `;


  container
    .querySelectorAll(
      "[data-cart-image]"
    )
    .forEach(img => {

      img.addEventListener(
        "error",
        () => {

          handleImageError(
            img,
            img.dataset.cartImage
          );

        }
      );

    });


  container
    .querySelectorAll(
      "[data-minus]"
    )
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.minus,
          -1
        );

      };

    });


  container
    .querySelectorAll(
      "[data-plus]"
    )
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(
          button.dataset.plus,
          1
        );

      };

    });


  container
    .querySelectorAll(
      "[data-remove]"
    )
    .forEach(button => {

      button.onclick = () => {

        removeFromCart(
          button.dataset.remove
        );

      };

    });


  document
    .getElementById(
      "checkoutBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        if (!currentUser) {

          closeModal(
            "cartModal"
          );

          openModal(
            "authModal"
          );

          showToast(
            "Connecte-toi pour commander."
          );

          return;

        }

        closeModal(
          "cartModal"
        );

        openModal(
          "checkoutModal"
        );

      }
    );

}


/* =========================================================
   AUTH UI
========================================================= */

function updateAuthUI() {

  const adminButton =
    document.getElementById(
      "adminBtn"
    );

  if (
    adminButton
  ) {

    adminButton.style.display =
      currentUser?.email ===
      ADMIN_EMAIL
        ? "block"
        : "none";

  }

  renderAccount();

}


function renderAccount() {

  const container =
    document.getElementById(
      "accountContent"
    );

  if (!container) return;


  if (!currentUser) {

    container.innerHTML = `

      <div
        style="
          color:#8291a7;
          margin-bottom:15px
        "
      >
        Tu n'es pas connecté.
      </div>

      <button
        class="btn primary"
        id="accountLoginBtn"
      >
        Se connecter
      </button>

    `;


    document
      .getElementById(
        "accountLoginBtn"
      )
      ?.addEventListener(
        "click",
        () => {

          closeModal(
            "accountModal"
          );

          openModal(
            "authModal"
          );

        }
      );

    return;

  }


  container.innerHTML = `

    <div
      style="
        background:#101925;
        border:1px solid #25364b;
        border-radius:12px;
        padding:15px;
      "
    >

      <div
        style="
          color:#8190a7;
          font-size:12px
        "
      >
        EMAIL
      </div>

      <strong>
        ${escapeHtml(
          currentUser.email
        )}
      </strong>

    </div>


    <button
      class="btn danger"
      id="logoutBtn"
      style="
        width:100%;
        margin-top:15px
      "
    >
      Se déconnecter
    </button>

  `;


  document
    .getElementById(
      "logoutBtn"
    )
    ?.addEventListener(
      "click",
      async () => {

        try {

          await signOut(auth);

          closeModal(
            "accountModal"
          );

          showToast(
            "Déconnexion effectuée."
          );

        }
        catch (error) {

          console.error(error);

          showToast(
            "Erreur de déconnexion."
          );

        }

      }
    );

}


/* =========================================================
   AUTH TABS
========================================================= */

document
  .getElementById(
    "loginTab"
  )
  ?.addEventListener(
    "click",
    () => {

      authMode = "login";

      document
        .getElementById(
          "loginTab"
        )
        ?.classList.add(
          "active"
        );

      document
        .getElementById(
          "registerTab"
        )
        ?.classList.remove(
          "active"
        );

      const submit =
        document.getElementById(
          "authSubmit"
        );

      if (submit) {

        submit.textContent =
          "Se connecter";

      }

    }
  );


document
  .getElementById(
    "registerTab"
  )
  ?.addEventListener(
    "click",
    () => {

      authMode = "register";

      document
        .getElementById(
          "registerTab"
        )
        ?.classList.add(
          "active"
        );

      document
        .getElementById(
          "loginTab"
        )
        ?.classList.remove(
          "active"
        );

      const submit =
        document.getElementById(
          "authSubmit"
        );

      if (submit) {

        submit.textContent =
          "Créer le compte";

      }

    }
  );


/* =========================================================
   AUTH FORM
========================================================= */

document
  .getElementById(
    "authForm"
  )
  ?.addEventListener(
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


      const info =
        document.getElementById(
          "authInfo"
        );


      if (!email || !password) {

        if (info) {

          info.textContent =
            "Remplis tous les champs.";

        }

        return;

      }


      try {

        if (
          authMode ===
          "register"
        ) {

          if (
            password.length <
            6
          ) {

            throw new Error(
              "Le mot de passe doit avoir au moins 6 caractères."
            );

          }


          if (
            password.length >
            30
          ) {

            throw new Error(
              "Le mot de passe doit avoir maximum 30 caractères."
            );

          }


          if (
            !/[a-z]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins une minuscule."
            );

          }


          if (
            !/[A-Z]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins une majuscule."
            );

          }


          if (
            !/[0-9]/.test(
              password
            )
          ) {

            throw new Error(
              "Il faut au moins un chiffre."
            );

          }


          const credential =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );


          await setDoc(
            doc(
              db,
              "users",
              credential.user.uid
            ),
            {

              email,

              createdAt:
                serverTimestamp()

            }
          );


          showToast(
            "Compte créé avec succès."
          );

        }
        else {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast(
            "Connexion réussie."
          );

        }


        closeModal(
          "authModal"
        );

      }
      catch (error) {

        console.error(error);

        if (info) {

          info.textContent =
            error.message;

        }

      }

    }
  );


/* =========================================================
   QUESTIONS
========================================================= */

async function sendQuestion() {

  if (!currentUser) {

    closeModal(
      "questionsModal"
    );

    openModal(
      "authModal"
    );

    showToast(
      "Connecte-toi pour envoyer une question."
    );

    return;

  }


  const input =
    document.getElementById(
      "newQuestion"
    );


  const text =
    input?.value.trim();


  if (!text) {

    showToast(
      "Écris une question."
    );

    return;

  }


  try {

    await addDoc(
      collection(
        db,
        "questions"
      ),
      {

        userId:
          currentUser.uid,

        userEmail:
          currentUser.email,

        question:
          text,

        status:
          "open",

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp()

      }
    );


    if (input) {

      input.value = "";

    }


    showToast(
      "Question envoyée 💬"
    );


    loadUserQuestions();

  }
  catch (error) {

    console.error(error);

    showToast(
      "Impossible d'envoyer la question."
    );

  }

}


async function sendAdminReply(
  questionId
) {

  if (
    currentUser?.email !==
    ADMIN_EMAIL
  ) {

    showToast(
      "Accès administrateur requis."
    );

    return;

  }


  const input =
    document.getElementById(
      `reply-${questionId}`
    );


  const text =
    input?.value.trim();


  if (!text) return;


  try {

    await addDoc(
      collection(
        db,
        "questions",
        questionId,
        "messages"
      ),
      {

        senderId:
          currentUser.uid,

        senderEmail:
          currentUser.email,

        senderRole:
          "admin",

        text,

        createdAt:
          serverTimestamp()

      }
    );


    await updateDoc(
      doc(
        db,
        "questions",
        questionId
      ),
      {

        updatedAt:
          serverTimestamp(),

        status:
          "answered"

      }
    );


    input.value = "";

    showToast(
      "Réponse envoyée."
    );

  }
  catch (error) {

    console.error(error);

    showToast(
      "Erreur pendant l'envoi."
    );

  }

}


async function sendUserReply(
  questionId
) {

  if (!currentUser) return;


  const input =
    document.getElementById(
      `user-reply-${questionId}`
    );


  const text =
    input?.value.trim();


  if (!text) return;


  try {

    await addDoc(
      collection(
        db,
        "questions",
        questionId,
        "messages"
      ),
      {

        senderId:
          currentUser.uid,

        senderEmail:
          currentUser.email,

        senderRole:
          "user",

        text,

        createdAt:
          serverTimestamp()

      }
    );


    await updateDoc(
      doc(
        db,
        "questions",
        questionId
      ),
      {

        updatedAt:
          serverTimestamp()

      }
    );


    input.value = "";

  }
  catch (error) {

    console.error(error);

    showToast(
      "Erreur d'envoi."
    );

  }

}


/* =========================================================
   MESSAGES
========================================================= */

function clearMessageListeners() {

  messageUnsubscribers.forEach(
    unsubscribe => {

      try {

        unsubscribe();

      }
      catch (_) {}

    }
  );

  messageUnsubscribers = [];

}


function loadQuestionMessages(
  questionId,
  containerId
) {

  const messagesRef =
    collection(
      db,
      "questions",
      questionId,
      "messages"
    );


  const unsubscribe =
    onSnapshot(
      messagesRef,
      snapshot => {

        const container =
          document.getElementById(
            containerId
          );

        if (!container) return;


        const docs =
          [...snapshot.docs];


        docs.sort(
          (a, b) => {

            const aTime =
              a.data()
                .createdAt
                ?.toMillis?.() || 0;

            const bTime =
              b.data()
                .createdAt
                ?.toMillis?.() || 0;

            return aTime - bTime;

          }
        );


        if (!docs.length) {

          container.innerHTML = `

            <div
              style="
                color:#71809a
              "
            >
              Aucun message pour le moment.
            </div>

          `;

          return;

        }


        container.innerHTML =
          docs.map(
            messageDoc => {

              const data =
                messageDoc.data();

              const isAdmin =
                data.senderRole ===
                "admin";


              return `

                <div
                  class="
                    message
                    ${
                      isAdmin
                        ? "admin"
                        : "user"
                    }
                  "
                >

                  <div
                    class="message-author"
                  >

                    ${
                      isAdmin
                        ? "👑 NovaShop"
                        : "👤 " +
                          escapeHtml(
                            data.senderEmail ||
                            "Utilisateur"
                          )
                    }

                  </div>

                  ${escapeHtml(
                    data.text
                  )}

                </div>

              `;

            }
          ).join("");


        container.scrollTop =
          container.scrollHeight;

      },
      error => {

        console.error(error);

        const container =
          document.getElementById(
            containerId
          );

        if (container) {

          container.innerHTML = `

            <div
              style="
                color:#ff7d7d
              "
            >
              Impossible de charger les messages.
            </div>

          `;

        }

      }
    );


  messageUnsubscribers.push(
    unsubscribe
  );

}


/* =========================================================
   QUESTIONS UTILISATEUR
========================================================= */

function loadUserQuestions() {

  const container =
    document.getElementById(
      "questionsContent"
    );

  if (!container) return;


  if (!currentUser) {

    container.innerHTML = `

      <div class="empty">

        Connecte-toi pour accéder
        à tes discussions.

      </div>

    `;

    return;

  }


  if (questionsUnsubscribe) {

    questionsUnsubscribe();

  }


  const q =
    query(
      collection(
        db,
        "questions"
      ),
      where(
        "userId",
        "==",
        currentUser.uid
      )
    );


  questionsUnsubscribe =
    onSnapshot(
      q,
      snapshot => {

        const docs =
          [...snapshot.docs];


        docs.sort(
          (a, b) => {

            const aTime =
              a.data()
                .createdAt
                ?.toMillis?.() || 0;

            const bTime =
              b.data()
                .createdAt
                ?.toMillis?.() || 0;

            return bTime - aTime;

          }
        );


        renderUserQuestions(
          docs
        );

      },
      error => {

        console.error(error);

        container.innerHTML = `

          <div
            style="
              color:#ff7d7d
            "
          >
            Impossible de charger tes questions.
          </div>

        `;

      }
    );

}


/* =========================================================
   RENDU QUESTIONS UTILISATEUR
========================================================= */

function renderUserQuestions(
  docs
) {

  const container =
    document.getElementById(
      "questionsContent"
    );

  if (!container) return;


  let html = `

    <button
      class="btn primary"
      id="newQuestionBtn"
      style="
        width:100%;
        margin-bottom:15px
      "
    >
      ✏️ Poser une nouvelle question
    </button>

  `;


  if (!docs.length) {

    html += `

      <div class="empty">

        Tu n'as encore envoyé
        aucune question.

      </div>

    `;


    container.innerHTML =
      html;


    document
      .getElementById(
        "newQuestionBtn"
      )
      ?.addEventListener(
        "click",
        showNewQuestionForm
      );


    return;

  }


  html +=
    docs.map(
      questionDoc => {

        const question =
          questionDoc.data();

        const id =
          questionDoc.id;


        return `

          <div
            class="admin-question"
          >

            <div
              class="question-head"
            >

              <div>

                <span
                  class="question-user"
                >
                  Ta question
                </span>

              </div>

              <div
                class="question-date"
              >

                ${
                  question.status ===
                  "answered"
                    ? "✅ Répondue"
                    : "⏳ En attente"
                }

              </div>

            </div>


            <div
              class="message user"
            >

              <div
                class="message-author"
              >
                👤 Toi
              </div>

              ${escapeHtml(
                question.question ||
                ""
              )}

            </div>


            <div
              class="chat"
              id="user-chat-${id}"
            >
              Chargement...
            </div>


            <div
              class="chat-input"
            >

              <textarea
                id="user-reply-${id}"
                placeholder="Écrire un message..."
              ></textarea>

              <button
                class="btn primary"
                data-user-reply="${id}"
              >
                Envoyer
              </button>

            </div>

          </div>

        `;

      }
    ).join("");


  container.innerHTML =
    html;


  document
    .getElementById(
      "newQuestionBtn"
    )
    ?.addEventListener(
      "click",
      showNewQuestionForm
    );


  container
    .querySelectorAll(
      "[data-user-reply]"
    )
    .forEach(button => {

      button.onclick = () => {

        sendUserReply(
          button.dataset.userReply
        );

      };

    });


  docs.forEach(
    questionDoc => {

      loadQuestionMessages(
        questionDoc.id,
        `user-chat-${questionDoc.id}`
      );

    }
  );

}


/* =========================================================
   NOUVELLE QUESTION
========================================================= */

function showNewQuestionForm() {

  const container =
    document.getElementById(
      "questionsContent"
    );

  if (!container) return;


  container.innerHTML = `

    <button
      class="btn"
      id="backQuestions"
      style="
        width:100%;
        margin-bottom:15px
      "
    >
      ← Retour aux discussions
    </button>


    <div class="modal-title">
      ✏️ Nouvelle question
    </div>


    <form
      class="form"
      id="questionForm"
    >

      <textarea
        id="newQuestion"
        placeholder="Écris ta question..."
        maxlength="2000"
        required
      ></textarea>


      <button
        class="btn primary"
        type="submit"
      >
        💬 Envoyer la question
      </button>

    </form>

  `;


  document
    .getElementById(
      "backQuestions"
    )
    ?.addEventListener(
      "click",
      loadUserQuestions
    );


  document
    .getElementById(
      "questionForm"
    )
    ?.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        sendQuestion();

      }
    );

}


/* =========================================================
   ADMIN QUESTIONS
========================================================= */

function loadAdminQuestions() {

  if (
    currentUser?.email !==
    ADMIN_EMAIL
  ) {

    return;

  }


  if (
    adminQuestionsUnsubscribe
  ) {

    adminQuestionsUnsubscribe();

  }


  const q =
    collection(
      db,
      "questions"
    );


  adminQuestionsUnsubscribe =
    onSnapshot(
      q,
      snapshot => {

        const docs =
          [...snapshot.docs];


        docs.sort(
          (a, b) => {

            const aTime =
              a.data()
                .updatedAt
                ?.toMillis?.() || 0;

            const bTime =
              b.data()
                .updatedAt
                ?.toMillis?.() || 0;

            return bTime - aTime;

          }
        );


        renderAdminQuestions(
          docs
        );

        updateQuestionBadge(
          docs
        );

      },
      error => {

        console.error(error);

        const container =
          document.getElementById(
            "adminContent"
          );

        if (container) {

          container.innerHTML = `

            <div
              style="
                color:#ff7d7d
              "
            >
              Impossible de charger les questions.
            </div>

          `;

        }

      }
    );

}


/* =========================================================
   BADGE QUESTIONS
========================================================= */

function updateQuestionBadge(
  docs
) {

  const badge =
    document.getElementById(
      "questionBadge"
    );

  if (!badge) return;


  const unanswered =
    docs.filter(
      docItem => {

        const data =
          docItem.data();

        return (
          data.status !==
          "answered"
        );

      }
    ).length;


  if (unanswered > 0) {

    badge.style.display =
      "inline-block";

    badge.textContent =
      unanswered;

  }
  else {

    badge.style.display =
      "none";

  }

}


/* =========================================================
   ADMIN QUESTIONS RENDER
========================================================= */

function renderAdminQuestions(
  docs
) {

  const container =
    document.getElementById(
      "adminContent"
    );

  if (!container) return;


  let html = `

    <div class="admin-tools">

      <button
        class="btn"
        id="refreshAdminQuestions"
      >
        🔄 Actualiser
      </button>

    </div>

  `;


  if (!docs.length) {

    html += `

      <div class="empty">

        Aucune question reçue.

      </div>

    `;


    container.innerHTML =
      html;

    return;

  }


  html +=
    docs.map(
      questionDoc => {

        const question =
          questionDoc.data();

        const id =
          questionDoc.id;


        return `

          <div
            class="admin-question"
          >

            <div
              class="question-head"
            >

              <div
                class="question-user"
              >
                👤
                ${escapeHtml(
                  question.userEmail ||
                  "Utilisateur"
                )}
              </div>


              <div
                class="question-date"
              >

                ${
                  question.status ===
                  "answered"
                    ? "✅ Répondue"
                    : "🟠 À traiter"
                }

              </div>

            </div>


            <div
              class="message user"
            >

              <div
                class="message-author"
              >
                Question
              </div>

              ${escapeHtml(
                question.question ||
                ""
              )}

            </div>


            <div
              class="chat"
              id="admin-chat-${id}"
            >
              Chargement...
            </div>


            <div
              class="chat-input"
            >

              <textarea
                id="reply-${id}"
                placeholder="Répondre à cet utilisateur..."
              ></textarea>


              <button
                class="btn primary"
                data-admin-reply="${id}"
              >
                Répondre
              </button>

            </div>


            <button
              class="btn danger"
              data-delete-question="${id}"
              style="
                width:100%;
                margin-top:8px
              "
            >
              🗑️ Supprimer la discussion
            </button>

          </div>

        `;

      }
    ).join("");


  container.innerHTML =
    html;


  document
    .getElementById(
      "refreshAdminQuestions"
    )
    ?.addEventListener(
      "click",
      loadAdminQuestions
    );


  container
    .querySelectorAll(
      "[data-admin-reply]"
    )
    .forEach(button => {

      button.onclick = () => {

        sendAdminReply(
          button.dataset.adminReply
        );

      };

    });


  container
    .querySelectorAll(
      "[data-delete-question]"
    )
    .forEach(button => {

      button.onclick = () => {

        deleteQuestion(
          button.dataset.deleteQuestion
        );

      };

    });


  docs.forEach(
    questionDoc => {

      loadQuestionMessages(
        questionDoc.id,
        `admin-chat-${questionDoc.id}`
      );

    }
  );

}


/* =========================================================
   SUPPRESSION QUESTION
========================================================= */

async function deleteQuestion(
  questionId
) {

  if (
    currentUser?.email !==
    ADMIN_EMAIL
  ) {

    showToast(
      "Accès administrateur requis."
    );

    return;

  }


  if (
    !confirm(
      "Supprimer définitivement cette discussion ?"
    )
  ) {

    return;

  }


  try {

    await deleteDoc(
      doc(
        db,
        "questions",
        questionId
      )
    );


    showToast(
      "Discussion supprimée."
    );

  }
  catch (error) {

    console.error(error);

    showToast(
      "Impossible de supprimer la discussion."
    );

  }

}


/* =========================================================
   COMMANDES
========================================================= */

document
  .getElementById(
    "checkoutForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!currentUser) {

        showToast(
          "Connecte-toi."
        );

        return;

      }


      if (!cart.length) {

        showToast(
          "Ton panier est vide."
        );

        return;

      }


      const name =
        document
          .getElementById(
            "checkoutName"
          )
          ?.value
          .trim();


      const address =
        document
          .getElementById(
            "checkoutAddress"
          )
          ?.value
          .trim();


      const city =
        document
          .getElementById(
            "checkoutCity"
          )
          ?.value
          .trim();


      const postal =
        document
          .getElementById(
            "checkoutPostal"
          )
          ?.value
          .trim();


      if (
        !name ||
        name.length < 2 ||
        !address ||
        address.length < 5 ||
        !city ||
        city.length < 2 ||
        !/^\d{5}$/.test(
          postal
        )
      ) {

        showToast(
          "Adresse invalide."
        );

        return;

      }


      const orderItems =
        cart.map(item => {

          const product =
            products.find(
              p =>
                p.id ===
                item.productId
            );


          return {

            productId:
              item.productId,

            name:
              product?.name ||
              "",

            price:
              product?.price ||
              0,

            quantity:
              item.quantity,

            image:
              product?.image ||
              ""

          };

        });


      try {

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

            customerName:
              name,

            address,

            city,

            postalCode:
              postal,

            items:
              orderItems,

            total:
              getCartTotal(),

            status:
              "Préparation",

            currentLocation:
              "Entrepôt NovaShop",

            destination:
              `${address}, ${postal} ${city}`,

            deliveryDate:
              new Date(
                Date.now() +
                5 *
                86400000
              ),

            createdAt:
              serverTimestamp()

          }
        );


        cart = [];

        saveCart();

        updateCartCount();

        closeModal(
          "checkoutModal"
        );


        showToast(
          "Commande créée avec succès 📦"
        );

      }
      catch (error) {

        console.error(error);

        showToast(
          "Erreur pendant la création de la commande."
        );

      }

    }
  );


/* =========================================================
   COMMANDES UTILISATEUR
========================================================= */

async function loadOrders() {

  const container =
    document.getElementById(
      "ordersContent"
    );

  if (!container) return;


  if (!currentUser) {

    container.innerHTML = `

      <div class="empty">

        Connecte-toi pour voir
        tes commandes.

      </div>

    `;

    return;

  }


  try {

    const q =
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
      await getDocs(q);


    const docs =
      [...snapshot.docs];


    docs.sort(
      (a, b) => {

        const aTime =
          a.data()
            .createdAt
            ?.toMillis?.() || 0;

        const bTime =
          b.data()
            .createdAt
            ?.toMillis?.() || 0;

        return bTime - aTime;

      }
    );


    if (!docs.length) {

      container.innerHTML = `

        <div class="empty">

          Aucune commande.

        </div>

      `;

      return;

    }


    container.innerHTML =
      docs.map(
        orderDoc => {

          const order =
            orderDoc.data();


          let delivery =
            "Date inconnue";


          if (
            order.deliveryDate
              ?.toDate
          ) {

            delivery =
              order.deliveryDate
                .toDate()
                .toLocaleDateString(
                  "fr-FR"
                );

          }


          return `

            <div class="order">

              <strong>

                📦 Commande
                ${orderDoc.id.slice(
                  0,
                  8
                )}

              </strong>


              <div
                style="
                  margin-top:8px
                "
              >

                Total :

                <strong>
                  ${money(
                    order.total ||
                    0
                  )}
                </strong>

              </div>


              <div
                class="order-status"
              >
                ${escapeHtml(
                  order.status ||
                  "En préparation"
                )}
              </div>


              <div
                style="
                  margin-top:8px;
                  color:#93a1b5
                "
              >

                📍 Position :

                ${escapeHtml(
                  order.currentLocation ||
                  ""
                )}

              </div>


              <div
                style="
                  margin-top:5px;
                  color:#93a1b5
                "
              >

                🎯 Destination :

                ${escapeHtml(
                  order.destination ||
                  ""
                )}

              </div>


              <div
                style="
                  margin-top:5px;
                  color:#93a1b5
                "
              >

                🚚 Livraison prévue :

                ${delivery}

              </div>

            </div>

          `;

        }
      ).join("");

  }
  catch (error) {

    console.error(error);

    container.innerHTML = `

      <div
        style="
          color:#ff7d7d
        "
      >

        Impossible de charger
        les commandes.

      </div>

    `;

  }

}


/* =========================================================
   ADMIN
========================================================= */

function openAdmin() {

  if (
    currentUser?.email !==
    ADMIN_EMAIL
  ) {

    showToast(
      "Le dashboard est réservé à l'administrateur."
    );

    return;

  }


  openModal(
    "adminCodeModal"
  );

}


document
  .getElementById(
    "adminCodeForm"
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
        code !==
        ADMIN_CODE
      ) {

        showToast(
          "Code incorrect."
        );

        return;

      }


      closeModal(
        "adminCodeModal"
      );

      openModal(
        "adminModal"
      );

      loadAdminQuestions();

    }
  );


/* =========================================================
   BOUTON QUESTIONS
========================================================= */

document
  .getElementById(
    "questionsBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "questionsModal"
      );

      loadUserQuestions();

    }
  );


/* =========================================================
   COMPTE
========================================================= */

document
  .getElementById(
    "accountBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "accountModal"
      );

      renderAccount();

    }
  );


document
  .getElementById(
    "bottomAccountBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "accountModal"
      );

      renderAccount();

    }
  );


/* =========================================================
   COMMANDES
========================================================= */

document
  .getElementById(
    "ordersBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "ordersModal"
      );

      loadOrders();

    }
  );


/* =========================================================
   PANIER
========================================================= */

document
  .getElementById(
    "cartBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "cartModal"
      );

      renderCart();

    }
  );


document
  .getElementById(
    "bottomCartBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      openModal(
        "cartModal"
      );

      renderCart();

    }
  );


/* =========================================================
   ADMIN BUTTON
========================================================= */

document
  .getElementById(
    "adminBtn"
  )
  ?.addEventListener(
    "click",
    openAdmin
  );


/* =========================================================
   RECHERCHE
========================================================= */

document
  .getElementById(
    "searchInput"
  )
  ?.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value;

      renderProducts();

    }
  );


/* =========================================================
   FERMETURE MODALES
========================================================= */

document
  .querySelectorAll(
    "[data-close]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        closeModal(
          button.dataset.close
        );

      }
    );

  });


document
  .querySelectorAll(
    ".modal"
  )
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          modal
        ) {

          modal.classList.remove(
            "open"
          );

        }

      }
    );

  });


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    updateAuthUI();


    if (user) {

      loadUserQuestions();


      if (
        user.email ===
        ADMIN_EMAIL
      ) {

        loadAdminQuestions();

      }

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

renderCategories();

renderProducts();

updateCartCount();

renderAccount();


/* =========================================================
   LOG
========================================================= */

console.log(
  "%c NovaShop chargé correctement 🛒 ",
  "font-weight:bold;font-size:16px"
);

console.log(
  "Produits :",
  products.length
);

console.log(
  "Images configurées :",
  Object.keys(imageFallbacks).length
);
