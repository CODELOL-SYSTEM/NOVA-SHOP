/* =========================================================
   NOVASHOP - APP.JS
   ========================================================= */

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
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

let firebaseApp = null;
let auth = null;

try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
} catch (error) {
  console.error("Firebase initialization error:", error);
}


/* =========================================================
   CONFIGURATION
   ========================================================= */

const ADMIN_CODE = "NOVA-ADMIN-2026";

const PROMO_CODES = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};

const WAREHOUSE = "Entrepôt";

const STORAGE = {
  cart: "novaShopCart",
  favorites: "novaShopFavorites",
  reviews: "novaShopReviews",
  orders: "novaShopOrders",
  profile: "novaShopProfiles",
  admin: "novaShopAdmin"
};


/* =========================================================
   PRODUCTS
   ========================================================= */

const PRODUCTS = [

  {
    id: "gigabyte-b650-aorus-elite-ax",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description:
      "Carte mère AMD AM5 pensée pour les configurations gaming modernes, avec DDR5 et connectivité sans fil."
  },

  {
    id: "pc-gamer-7800x3d-rx9070xt",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description:
      "Configuration gaming haut de gamme avec Ryzen 7 7800X3D, Radeon RX 9070 XT et 32 Go de mémoire DDR5."
  },

  {
    id: "hyperx-cloud-ii",
    name: "HyperX Cloud II – Casque gaming",
    category: "Casques",
    price: 49.99,
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
    description:
      "Casque gaming confortable avec son immersif pour les jeux, discussions et contenus multimédias."
  },

  {
    id: "tecors-60-azerty",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
    description:
      "Clavier mécanique compact au format 60 %, disposition AZERTY et design adapté au gaming."
  },

  {
    id: "celshading-65",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description:
      "Clavier magnétique compact 65 % avec esthétique noire et fonctionnalités orientées gaming."
  },

  {
    id: "ajazz-aj199-max",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description:
      "Souris gaming sans fil légère avec coque effet fibre de carbone."
  },

  {
    id: "logitech-g-pro-x2-superstrike",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description:
      "Souris gaming Logitech haut de gamme au design blanc et noir."
  },

  {
    id: "samsung-990-pro-1tb",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
    description:
      "SSD NVMe PCIe haute performance de 1 To pour stockage gaming et système."
  },

  {
    id: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp",
    description:
      "SSD NVMe de 2 To destiné aux configurations gaming et aux usages intensifs."
  },

  {
    id: "corsair-rm1000x",
    name: "CORSAIR RM1000x (EU)",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
    description:
      "Alimentation Corsair 1000 W destinée aux configurations gaming puissantes."
  },

  {
    id: "corsair-rm850x",
    name: "CORSAIR RM850x (EU)",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
    description:
      "Alimentation Corsair 850 W adaptée aux configurations gaming performantes."
  },

  {
    id: "corsair-frame-5000d",
    name: "Corsair Frame 5000D RS ARGB (Noir)",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
    description:
      "Boîtier gaming ATX noir avec espace intérieur généreux et éclairage ARGB."
  },

  {
    id: "arctic-liquid-freezer-iii",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
    description:
      "Refroidissement liquide AIO 360 mm conçu pour maintenir les températures du processeur."
  },

  {
    id: "samsung-odyssey-g6",
    name: "Samsung 27\" QD-OLED Odyssey G6 S27HG612SU",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
    description:
      "Écran gaming 27 pouces QD-OLED destiné aux jeux rapides et aux contenus multimédias."
  },

  {
    id: "elgato-wave-mic-arm-pro",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5",
    description:
      "Bras de microphone conçu pour les setups streaming et création de contenu."
  },

  {
    id: "dualsense-cosmic-red",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    description:
      "Manette Sony DualSense Cosmic Red compatible PlayStation 5 et PC."
  },

  {
    id: "asus-tuf-b650-plus",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg",
    description:
      "Carte mère gaming ASUS TUF Gaming pour processeurs AMD sur socket AM5."
  },

  {
    id: "msi-b650-tomahawk",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
    description:
      "Carte mère MSI MAG B650 Tomahawk WiFi conçue pour les configurations gaming AM5."
  }

];


/* =========================================================
   STATE
   ========================================================= */

let cart = loadJSON(STORAGE.cart, []);
let favorites = loadJSON(STORAGE.favorites, []);
let reviews = loadJSON(STORAGE.reviews, []);
let orders = loadJSON(STORAGE.orders, []);
let profiles = loadJSON(STORAGE.profile, {});

let currentUser = null;
let currentProduct = null;
let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "relevance";

let selectedRating = 5;
let appliedPromo = null;

let adminAuthenticated =
  localStorage.getItem(STORAGE.admin) === "true";


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (id) => document.getElementById(id);

const productsGrid = $("productsGrid");
const emptyState = $("emptyState");
const resultCount = $("resultCount");

const overlay = $("overlay");

const cartDrawer = $("cartDrawer");
const cartItems = $("cartItems");
const cartCount = $("cartCount");
const cartSubtotal = $("cartSubtotal");
const cartTotal = $("cartTotal");

const authModal = $("authModal");
const accountModal = $("accountModal");
const productModal = $("productModal");
const checkoutModal = $("checkoutModal");
const ordersModal = $("ordersModal");
const dashboardModal = $("dashboardModal");
const invoiceModal = $("invoiceModal");

const toast = $("toast");


/* =========================================================
   STORAGE
   ========================================================= */

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


/* =========================================================
   FORMAT
   ========================================================= */

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value) || 0);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getInitialsName(email) {
  if (!email) {
    return "Client";
  }

  const name = email.split("@")[0];

  if (!name) {
    return "Client";
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

function maskedName(user) {
  const profile =
    user && profiles[user.uid]
      ? profiles[user.uid]
      : null;

  const source =
    profile?.displayName ||
    user?.displayName ||
    getInitialsName(user?.email);

  const clean = String(source).replace(/\s+/g, "");

  if (clean.length <= 3) {
    return clean + "***";
  }

  return clean.slice(0, 3) + "***";
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message, type = "") {
  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.className = "toast show";

  if (type) {
    toast.classList.add(type);
  }

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.className = "toast";
  }, 3200);
}


/* =========================================================
   MODALS
   ========================================================= */

function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.add("hidden");

  const visibleModal =
    document.querySelector(".modal:not(.hidden)") ||
    document.querySelector(".drawer:not(.hidden)");

  if (!visibleModal) {
    document.body.style.overflow = "";
  }
}

function closeEverything() {
  [
    authModal,
    accountModal,
    productModal,
    checkoutModal,
    ordersModal,
    dashboardModal,
    invoiceModal
  ].forEach(closeModal);

  cartDrawer?.classList.add("hidden");
  overlay?.classList.add("hidden");

  document.body.style.overflow = "";
}

function openCart() {
  cartDrawer?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer?.classList.add("hidden");
  overlay?.classList.add("hidden");

  const visibleModal =
    document.querySelector(".modal:not(.hidden)");

  if (!visibleModal) {
    document.body.style.overflow = "";
  }
}


/* =========================================================
   RATINGS
   ========================================================= */

function getProductReviews(productId) {
  return reviews.filter(
    review => review.productId === productId
  );
}

function getProductRating(productId) {
  const list = getProductReviews(productId);

  if (!list.length) {
    return {
      average: 0,
      count: 0
    };
  }

  const total = list.reduce(
    (sum, review) => sum + Number(review.rating || 0),
    0
  );

  return {
    average: total / list.length,
    count: list.length
  };
}

function renderStars(value, small = false) {
  const rounded = Math.round(Number(value) || 0);

  let output = "";

  for (let i = 1; i <= 5; i++) {
    output += i <= rounded ? "★" : "☆";
  }

  return output;
}


/* =========================================================
   PRODUCTS
   ========================================================= */

function getFilteredProducts() {

  let list = [...PRODUCTS];

  if (currentCategory !== "Tous") {
    list = list.filter(
      product => product.category === currentCategory
    );
  }

  if (currentSearch.trim()) {

    const query =
      currentSearch
        .trim()
        .toLowerCase();

    list = list.filter(product => {

      const searchable = [
        product.name,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }

  if (currentSort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (currentSort === "nameAsc") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name, "fr")
    );
  }

  return list;
}

function renderProducts() {

  if (!productsGrid) {
    return;
  }

  const list = getFilteredProducts();

  productsGrid.innerHTML = "";

  resultCount.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if (!list.length) {
    emptyState?.classList.remove("hidden");
    return;
  }

  emptyState?.classList.add("hidden");

  list.forEach(product => {

    const rating = getProductRating(product.id);

    const card = document.createElement("article");

    card.className = "product-card";

    card.dataset.productId = product.id;

    card.innerHTML = `
      <div class="product-image-wrap">

        <button
          class="favorite-btn ${favorites.includes(product.id) ? "active" : ""}"
          data-action="favorite"
          data-id="${escapeHTML(product.id)}"
          type="button"
          aria-label="Favori"
        >
          ${favorites.includes(product.id) ? "♥" : "♡"}
        </button>

        <img
          class="product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

      </div>

      <div class="product-body">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating-line">

          <span>
            ${renderStars(rating.average)}
          </span>

          <span class="rating-count">
            ${rating.count ? `(${rating.count})` : "Aucun avis"}
          </span>

        </div>

        <div class="product-price">
          ${formatPrice(product.price)}
        </div>

        <div class="product-actions">

          <button
            class="product-action"
            data-action="view"
            data-id="${escapeHTML(product.id)}"
            type="button"
          >
            Voir
          </button>

          <button
            class="product-action add"
            data-action="add"
            data-id="${escapeHTML(product.id)}"
            type="button"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const image =
      card.querySelector(".product-image");

    /*
      Si l'image d'un produit est réellement inaccessible,
      seul ce produit est retiré.
    */

    image.addEventListener("error", () => {
      card.remove();

      const remaining =
        productsGrid.querySelectorAll(".product-card").length;

      if (remaining === 0) {
        emptyState?.classList.remove("hidden");
      }
    });

    productsGrid.appendChild(card);
  });
}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(productId) {

  if (favorites.includes(productId)) {

    favorites =
      favorites.filter(id => id !== productId);

    showToast("Produit retiré des favoris");

  } else {

    favorites.push(productId);

    showToast("❤️ Produit ajouté aux favoris", "success");
  }

  saveJSON(STORAGE.favorites, favorites);

  renderProducts();
}


/* =========================================================
   CART
   ========================================================= */

function getCartItems() {

  return cart
    .map(item => {

      const product =
        PRODUCTS.find(
          product => product.id === item.productId
        );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: Math.max(
          1,
          Number(item.quantity) || 1
        )
      };

    })
    .filter(Boolean);
}

function getCartSubtotal() {

  return getCartItems()
    .reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
}

function addToCart(productId) {

  const product =
    PRODUCTS.find(
      item => item.id === productId
    );

  if (!product) {
    return;
  }

  const existing =
    cart.find(
      item => item.productId === productId
    );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  saveJSON(STORAGE.cart, cart);

  renderCart();

  showToast(
    "🛒 Produit ajouté au panier",
    "success"
  );
}

function changeCartQuantity(productId, amount) {

  const item =
    cart.find(
      item => item.productId === productId
    );

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.productId !== productId
      );
  }

  saveJSON(STORAGE.cart, cart);

  renderCart();
}

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.productId !== productId
    );

  saveJSON(STORAGE.cart, cart);

  renderCart();
}

function renderCart() {

  const items = getCartItems();

  const count =
    items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  cartCount.textContent = count;

  if (!items.length) {

    cartItems.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute un produit pour commencer.</p>
      </div>
    `;

  } else {

    cartItems.innerHTML =
      items.map(item => `

        <div class="cart-item">

          <img
            class="cart-item-image"
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)}"
          >

          <div>

            <div class="cart-item-name">
              ${escapeHTML(item.name)}
            </div>

            <div class="cart-item-price">
              ${formatPrice(item.price)}
            </div>

            <div class="qty-controls">

              <button
                class="qty-btn"
                data-cart-action="minus"
                data-id="${escapeHTML(item.id)}"
                type="button"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                class="qty-btn"
                data-cart-action="plus"
                data-id="${escapeHTML(item.id)}"
                type="button"
              >
                +
              </button>

            </div>

            <button
              class="remove-cart"
              data-cart-action="remove"
              data-id="${escapeHTML(item.id)}"
              type="button"
            >
              Supprimer
            </button>

          </div>

          <strong>
            ${formatPrice(item.price * item.quantity)}
          </strong>

        </div>

      `).join("");
  }

  const subtotal =
    getCartSubtotal();

  cartSubtotal.textContent =
    formatPrice(subtotal);

  cartTotal.textContent =
    formatPrice(subtotal);

  checkoutButtonState();
}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

function openProduct(productId) {

  const product =
    PRODUCTS.find(
      item => item.id === productId
    );

  if (!product) {
    return;
  }

  currentProduct = product;

  const rating =
    getProductRating(product.id);

  const productReviews =
    getProductReviews(product.id);

  const hasReviewed =
    currentUser &&
    productReviews.some(
      review =>
        review.userId === currentUser.uid
    );

  $("productDetail").innerHTML = `

    <div>

      <div class="product-detail-image">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

    </div>

    <div>

      <div class="detail-category">
        ${escapeHTML(product.category)}
      </div>

      <h2 class="detail-title">
        ${escapeHTML(product.name)}
      </h2>

      <div class="detail-rating">
        ${renderStars(rating.average)}
        ${
          rating.count
            ? ` ${rating.average.toFixed(1)}/5 (${rating.count})`
            : " Aucun avis"
        }
      </div>

      <div class="detail-price">
        ${formatPrice(product.price)}
      </div>

      <p class="detail-description">
        ${escapeHTML(product.description)}
      </p>

      <button
        id="detailAddButton"
        class="detail-add"
        type="button"
      >
        🛒 Ajouter au panier
      </button>

    </div>

    <div class="reviews-section" style="grid-column:1/-1">

      <div class="reviews-head">

        <h4>
          ⭐ Avis clients
        </h4>

        <span>
          ${productReviews.length} avis
        </span>

      </div>

      ${
        currentUser && !hasReviewed
          ? `
            <div class="review-form">

              <div class="stars-input">

                ${[1,2,3,4,5].map(star => `

                  <button
                    class="star-choice ${star === selectedRating ? "selected" : ""}"
                    data-rating="${star}"
                    type="button"
                  >
                    ★
                  </button>

                `).join("")}

              </div>

              <textarea
                id="reviewComment"
                class="form-input"
                rows="3"
                placeholder="Ton avis sur ce produit..."
                maxlength="500"
              ></textarea>

              <button
                id="submitReviewButton"
                class="main-submit"
                type="button"
              >
                Publier mon avis
              </button>

            </div>
          `
          : currentUser
            ? `
              <div class="payment-note">
                Tu as déjà laissé un avis sur ce produit.
              </div>
            `
            : `
              <div class="payment-note">
                Connecte-toi pour laisser un avis.
              </div>
            `
      }

      <div class="review-list">

        ${
          productReviews.length
            ? productReviews
                .slice()
                .reverse()
                .map(review => `

                  <div class="review-item">

                    <div class="review-top">

                      <div>

                        <div class="review-user">
                          ${escapeHTML(review.userName)}
                        </div>

                        <div class="review-stars">
                          ${renderStars(review.rating)}
                        </div>

                      </div>

                      <div class="review-date">
                        ${escapeHTML(review.date)}
                      </div>

                    </div>

                    <div class="review-comment">
                      ${escapeHTML(review.comment)}
                    </div>

                  </div>

                `).join("")
            : `
              <div class="payment-note">
                Aucun avis pour le moment.
              </div>
            `
        }

      </div>

    </div>
  `;

  $("detailAddButton")?.addEventListener(
    "click",
    () => addToCart(product.id)
  );

  document
    .querySelectorAll("[data-rating]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedRating =
            Number(button.dataset.rating);

          document
            .querySelectorAll("[data-rating]")
            .forEach(item => {

              item.classList.toggle(
                "selected",
                Number(item.dataset.rating) <= selectedRating
              );

            });
        }
      );
    });

  $("submitReviewButton")?.addEventListener(
    "click",
    submitReview
  );

  openModal(productModal);
}

function submitReview() {

  if (!currentUser) {
    showToast(
      "Connecte-toi pour laisser un avis",
      "error"
    );

    return;
  }

  if (!currentProduct) {
    return;
  }

  const comment =
    $("reviewComment")?.value.trim();

  if (!comment) {
    showToast(
      "Écris un commentaire",
      "error"
    );

    return;
  }

  const already =
    reviews.some(
      review =>
        review.productId === currentProduct.id &&
        review.userId === currentUser.uid
    );

  if (already) {
    showToast(
      "Tu as déjà évalué ce produit",
      "error"
    );

    return;
  }

  reviews.push({

    id:
      `review_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`,

    productId:
      currentProduct.id,

    userId:
      currentUser.uid,

    userName:
      maskedName(currentUser),

    rating:
      selectedRating,

    comment:
      comment,

    date:
      new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium"
      }).format(new Date())

  });

  saveJSON(STORAGE.reviews, reviews);

  showToast(
    "⭐ Avis publié",
    "success"
  );

  selectedRating = 5;

  openProduct(currentProduct.id);

  renderProducts();
}


/* =========================================================
   AUTH
   ========================================================= */

function showLogin() {

  $("loginTab")?.classList.add("active");
  $("signupTab")?.classList.remove("active");

  $("loginForm")?.classList.remove("hidden");
  $("signupForm")?.classList.add("hidden");
}

function showSignup() {

  $("loginTab")?.classList.remove("active");
  $("signupTab")?.classList.add("active");

  $("loginForm")?.classList.add("hidden");
  $("signupForm")?.classList.remove("hidden");
}

function openAuth() {

  if (currentUser) {
    renderAccount();
    openModal(accountModal);
    return;
  }

  showLogin();

  openModal(authModal);
}

async function loginEmail(event) {

  event.preventDefault();

  if (!auth) {
    showToast(
      "Firebase n'est pas configuré correctement.",
      "error"
    );

    return;
  }

  const email =
    $("loginEmail").value.trim();

  const password =
    $("loginPassword").value;

  if (!email || !password) {
    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal(authModal);

    showToast(
      "Connexion réussie",
      "success"
    );

  } catch (error) {

    console.error(error);

    showToast(
      firebaseErrorMessage(error),
      "error"
    );
  }
}

async function signupEmail(event) {

  event.preventDefault();

  if (!auth) {
    showToast(
      "Firebase n'est pas configuré correctement.",
      "error"
    );

    return;
  }

  const email =
    $("signupEmail").value.trim();

  const phone =
    $("signupPhone").value.trim();

  const password =
    $("signupPassword").value;

  const confirmation =
    $("signupPasswordConfirm").value;

  if (!email) {
    showToast(
      "L'e-mail est obligatoire",
      "error"
    );

    return;
  }

  if (!phone) {
    showToast(
      "Le téléphone est obligatoire",
      "error"
    );

    return;
  }

  if (password.length < 6) {
    showToast(
      "Le mot de passe doit contenir au moins 6 caractères",
      "error"
    );

    return;
  }

  if (password !== confirmation) {
    showToast(
      "Les mots de passe ne correspondent pas",
      "error"
    );

    return;
  }

  try {

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    profiles[credential.user.uid] = {
      email,
      phone,
      displayName:
        getInitialsName(email)
    };

    saveJSON(
      STORAGE.profile,
      profiles
    );

    closeModal(authModal);

    showToast(
      "Compte créé avec succès",
      "success"
    );

  } catch (error) {

    console.error(error);

    showToast(
      firebaseErrorMessage(error),
      "error"
    );
  }
}

async function loginGoogle() {

  if (!auth) {
    showToast(
      "Firebase n'est pas configuré correctement.",
      "error"
    );

    return;
  }

  try {

    const provider =
      new GoogleAuthProvider();

    await signInWithPopup(
      auth,
      provider
    );

    closeModal(authModal);

    showToast(
      "Connexion Google réussie",
      "success"
    );

  } catch (error) {

    console.error(error);

    showToast(
      firebaseErrorMessage(error),
      "error"
    );
  }
}

async function logout() {

  try {

    if (auth) {
      await signOut(auth);
    }

    currentUser = null;

    closeEverything();

    updateAccountButtons();

    showToast(
      "Déconnexion effectuée",
      "success"
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Impossible de se déconnecter",
      "error"
    );
  }
}

function firebaseErrorMessage(error) {

  const code =
    error?.code || "";

  if (
    code.includes("auth/api-key-not-valid")
  ) {
    return "API Firebase invalide : remplace la configuration Web par celle affichée dans Firebase.";
  }

  if (
    code.includes("auth/invalid-credential")
  ) {
    return "E-mail ou mot de passe incorrect.";
  }

  if (
    code.includes("auth/email-already-in-use")
  ) {
    return "Cette adresse e-mail est déjà utilisée.";
  }

  if (
    code.includes("auth/weak-password")
  ) {
    return "Le mot de passe est trop faible.";
  }

  if (
    code.includes("auth/popup-closed-by-user")
  ) {
    return "Connexion Google annulée.";
  }

  if (
    code.includes("auth/unauthorized-domain")
  ) {
    return "Le domaine GitHub Pages doit être ajouté aux domaines autorisés Firebase.";
  }

  if (
    code.includes("auth/operation-not-allowed")
  ) {
    return "Cette méthode de connexion n'est pas activée dans Firebase.";
  }

  return (
    error?.message ||
    "Une erreur de connexion est survenue."
  );
}


/* =========================================================
   AUTH STATE
   ========================================================= */

function updateAccountButtons() {

  if (currentUser) {

    $("accountButton").textContent =
      "👤 Mon compte";

    $("ordersButton")?.classList.remove("hidden");

  } else {

    $("accountButton").textContent =
      "👤 Compte";

    $("ordersButton")?.classList.add("hidden");
  }

  if (adminAuthenticated) {
    $("adminButton")?.classList.remove("hidden");
  } else {
    $("adminButton")?.classList.add("hidden");
  }
}

if (auth) {

  onAuthStateChanged(
    auth,
    user => {

      currentUser = user;

      updateAccountButtons();

      if (user) {

        if (!profiles[user.uid]) {

          profiles[user.uid] = {
            email:
              user.email || "",

            phone:
              "",

            displayName:
              user.displayName ||
              getInitialsName(user.email)
          };

          saveJSON(
            STORAGE.profile,
            profiles
          );
        }
      }
    }
  );
}


/* =========================================================
   ACCOUNT
   ========================================================= */

function renderAccount() {

  if (!currentUser) {
    return;
  }

  const profile =
    profiles[currentUser.uid] || {};

  $("accountInfo").innerHTML = `

    <div class="account-name">
      ${escapeHTML(
        profile.displayName ||
        currentUser.displayName ||
        "Client NovaShop"
      )}
    </div>

    <div class="account-info">

      📧 ${escapeHTML(currentUser.email || "Non renseigné")}
      <br>

      📱 ${
        profile.phone
          ? escapeHTML(profile.phone)
          : "Téléphone non renseigné"
      }

    </div>
  `;
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

  if (!cart.length) {

    showToast(
      "Ton panier est vide",
      "error"
    );

    return;
  }

  if (!currentUser) {

    closeCart();

    showToast(
      "Connecte-toi avant de commander",
      "error"
    );

    openAuth();

    return;
  }

  appliedPromo = null;

  $("promoCode").value = "";
  $("promoMessage").textContent = "";

  renderCheckout();

  closeCart();

  openModal(checkoutModal);
}

function renderCheckout() {

  const items =
    getCartItems();

  $("checkoutItems").innerHTML =
    items.map(item => `

      <div class="checkout-item">

        <span>
          ${escapeHTML(item.name)}
          × ${item.quantity}
        </span>

        <strong>
          ${formatPrice(
            item.price * item.quantity
          )}
        </strong>

      </div>

    `).join("");

  const subtotal =
    getCartSubtotal();

  const discount =
    getDiscountAmount(subtotal);

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  $("checkoutSubtotal").textContent =
    formatPrice(subtotal);

  $("checkoutDiscount").textContent =
    `- ${formatPrice(discount)}`;

  $("checkoutTotal").textContent =
    formatPrice(total);

  checkoutButtonState();
}

function getDiscountAmount(subtotal) {

  if (!appliedPromo) {
    return 0;
  }

  const percentage =
    Number(appliedPromo);

  return Math.min(
    subtotal,
    subtotal * percentage / 100
  );
}

function applyPromo() {

  const code =
    $("promoCode")
      .value
      .trim()
      .toUpperCase();

  const message =
    $("promoMessage");

  if (!code) {

    appliedPromo = null;

    message.textContent =
      "Entre un code promotionnel.";

    message.className =
      "promo-message error";

    renderCheckout();

    return;
  }

  if (
    Object.prototype.hasOwnProperty.call(
      PROMO_CODES,
      code
    )
  ) {

    appliedPromo =
      PROMO_CODES[code];

    message.textContent =
      `Code ${code} appliqué : -${PROMO_CODES[code]}%`;

    message.className =
      "promo-message success";

    renderCheckout();

    showToast(
      "🎟️ Code promotionnel appliqué",
      "success"
    );

  } else {

    appliedPromo = null;

    message.textContent =
      "Code promotionnel invalide.";

    message.className =
      "promo-message error";

    renderCheckout();
  }
}

function validateCheckoutFields() {

  const fields = [
    $("fullName"),
    $("address"),
    $("postalCode"),
    $("city"),
    $("country")
  ];

  return fields.every(
    field =>
      field &&
      field.value.trim().length > 0
  );
}

function checkoutButtonState() {

  const payButton =
    $("payButton");

  if (!payButton) {
    return;
  }

  const validAddress =
    validateCheckoutFields();

  /*
    Dans cette version démo, le bouton Payer n'est activé
    qu'avec un code 100 %.
  */

  const validPromo =
    appliedPromo === 100;

  payButton.disabled =
    !validAddress ||
    !validPromo ||
    !cart.length;
}

function makeOrderNumber() {

  return (
    "NOVA-" +
    new Date()
      .toISOString()
      .replace(/\D/g, "")
      .slice(0, 14)
  );
}

function payDemo() {

  if (!currentUser) {
    showToast(
      "Connexion requise",
      "error"
    );

    return;
  }

  if (!validateCheckoutFields()) {

    showToast(
      "Complète toute l'adresse de livraison",
      "error"
    );

    return;
  }

  if (appliedPromo !== 100) {

    showToast(
      "Un code promo de 100 % est nécessaire dans cette démo",
      "error"
    );

    return;
  }

  const items =
    getCartItems();

  if (!items.length) {
    return;
  }

  const subtotal =
    getCartSubtotal();

  const discount =
    subtotal;

  const order = {

    id:
      makeOrderNumber(),

    userId:
      currentUser.uid,

    customerEmail:
      currentUser.email || "",

    customerName:
      $("fullName").value.trim(),

    phone:
      profiles[currentUser.uid]?.phone || "",

    address: {
      fullName:
        $("fullName").value.trim(),

      address:
        $("address").value.trim(),

      postalCode:
        $("postalCode").value.trim(),

      city:
        $("city").value.trim(),

      country:
        $("country").value.trim()
    },

    warehouse:
      WAREHOUSE,

    items:
      items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),

    subtotal,

    discount,

    total:
      0,

    promoCode:
      $("promoCode").value.trim().toUpperCase(),

    paymentMethod:
      "Code promotionnel",

    status:
      "Payée",

    createdAt:
      new Date().toISOString()

  };

  orders.push(order);

  saveJSON(
    STORAGE.orders,
    orders
  );

  cart = [];

  saveJSON(
    STORAGE.cart,
    cart
  );

  renderCart();

  closeModal(checkoutModal);

  showToast(
    `Commande ${order.id} créée`,
    "success"
  );

  openInvoice(order);
}


/* =========================================================
   ORDERS
   ========================================================= */

function getUserOrders() {

  if (!currentUser) {
    return [];
  }

  return orders
    .filter(
      order =>
        order.userId === currentUser.uid
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
}

function openOrders() {

  if (!currentUser) {

    openAuth();

    return;
  }

  renderOrders();

  openModal(ordersModal);
}

function renderOrders() {

  const list =
    getUserOrders();

  if (!list.length) {

    $("ordersList").innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3>Aucune commande</h3>
        <p>Tes commandes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  $("ordersList").innerHTML =
    list.map(order => `

      <div class="order-card">

        <div class="order-top">

          <div>

            <div class="order-number">
              ${escapeHTML(order.id)}
            </div>

            <div class="order-date">
              ${escapeHTML(
                formatDate(order.createdAt)
              )}
            </div>

          </div>

          <span class="order-status">
            ${escapeHTML(order.status)}
          </span>

        </div>

        <div class="order-items">

          ${order.items.map(item => `

            <div class="order-item-row">

              <span>
                ${escapeHTML(item.name)}
                × ${item.quantity}
              </span>

              <strong>
                ${formatPrice(
                  item.price * item.quantity
                )}
              </strong>

            </div>

          `).join("")}

        </div>

        <div class="order-bottom">

          <span>
            Total payé
          </span>

          <strong>
            ${formatPrice(order.total)}
          </strong>

        </div>

        <button
          class="modal-action-btn"
          style="margin-top:10px"
          data-invoice-id="${escapeHTML(order.id)}"
          type="button"
        >
          🧾 Voir la facture
        </button>

      </div>

    `).join("");

  document
    .querySelectorAll("[data-invoice-id]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const order =
            orders.find(
              item =>
                item.id ===
                button.dataset.invoiceId
            );

          if (order) {
            openInvoice(order);
          }
        }
      );

    });
}


/* =========================================================
   INVOICE
   ========================================================= */

function openInvoice(order) {

  if (!order) {
    return;
  }

  $("invoiceContent").innerHTML = `

    <div class="invoice-head">

      <div>

        <div class="invoice-logo">
          NOVA<span>SHOP</span>
        </div>

        <div style="color:#667085;font-size:11px;margin-top:5px">
          Marketplace Gaming
        </div>

      </div>

      <div class="invoice-title">

        <h1>
          Facture
        </h1>

        <p>
          ${escapeHTML(order.id)}
        </p>

        <p>
          ${escapeHTML(
            formatDate(order.createdAt)
          )}
        </p>

      </div>

    </div>

    <div class="invoice-info-grid">

      <div class="invoice-info">

        <h4>
          Client
        </h4>

        <p>
          <strong>
            ${escapeHTML(order.customerName)}
          </strong>
          <br>
          ${escapeHTML(order.customerEmail)}
          ${
            order.phone
              ? `<br>${escapeHTML(order.phone)}`
              : ""
          }
        </p>

      </div>

      <div class="invoice-info">

        <h4>
          Adresse de livraison
        </h4>

        <p>
          ${escapeHTML(order.address.fullName)}
          <br>
          ${escapeHTML(order.address.address)}
          <br>
          ${escapeHTML(order.address.postalCode)}
          ${escapeHTML(order.address.city)}
          <br>
          ${escapeHTML(order.address.country)}
        </p>

      </div>

    </div>

    <table class="invoice-table">

      <thead>

        <tr>

          <th>
            Produit
          </th>

          <th>
            Quantité
          </th>

          <th>
            Prix
          </th>

          <th>
            Total
          </th>

        </tr>

      </thead>

      <tbody>

        ${order.items.map(item => `

          <tr>

            <td>
              ${escapeHTML(item.name)}
            </td>

            <td>
              ${item.quantity}
            </td>

            <td>
              ${formatPrice(item.price)}
            </td>

            <td>
              ${formatPrice(
                item.price * item.quantity
              )}
            </td>

          </tr>

        `).join("")}

      </tbody>

    </table>

    <div class="invoice-total">

      <div class="invoice-total-row">

        <span>
          Sous-total
        </span>

        <strong>
          ${formatPrice(order.subtotal)}
        </strong>

      </div>

      <div class="invoice-total-row">

        <span>
          Réduction
        </span>

        <strong>
          - ${formatPrice(order.discount)}
        </strong>

      </div>

      <div class="invoice-total-row final">

        <span>
          Total payé
        </span>

        <strong>
          ${formatPrice(order.total)}
        </strong>

      </div>

    </div>

    <div class="invoice-payment">

      <strong>
        Mode de paiement :
      </strong>

      ${escapeHTML(order.paymentMethod)}

      <br>

      <strong>
        Code promotionnel :
      </strong>

      ${escapeHTML(order.promoCode)}

      <br>

      <strong>
        Entrepôt :
      </strong>

      ${escapeHTML(order.warehouse)}

    </div>
  `;

  openModal(invoiceModal);
}


/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

function openDashboard() {

  if (adminAuthenticated) {

    renderAdminDashboard();

  } else {

    $("adminLoginPanel")
      ?.classList.remove("hidden");

    $("adminPanel")
      ?.classList.add("hidden");

    $("adminCode").value = "";

  }

  openModal(dashboardModal);
}

function loginAdmin() {

  const code =
    $("adminCode").value.trim();

  if (code !== ADMIN_CODE) {

    showToast(
      "Code Dashboard incorrect",
      "error"
    );

    return;
  }

  adminAuthenticated = true;

  localStorage.setItem(
    STORAGE.admin,
    "true"
  );

  updateAccountButtons();

  renderAdminDashboard();

  showToast(
    "🔐 Dashboard ouvert",
    "success"
  );
}

function renderAdminDashboard() {

  $("adminLoginPanel")
    ?.classList.add("hidden");

  $("adminPanel")
    ?.classList.remove("hidden");

  const totalOrders =
    orders.length;

  const freeOrders =
    orders.filter(
      order => Number(order.total) === 0
    ).length;

  const catalogValue =
    PRODUCTS.reduce(
      (sum, product) =>
        sum + Number(product.price || 0),
      0
    );

  $("adminOrdersCount").textContent =
    totalOrders;

  $("adminFreeOrders").textContent =
    freeOrders;

  $("adminCatalogValue").textContent =
    formatPrice(catalogValue);

  const table =
    $("adminOrdersTable");

  const recent =
    [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 50);

  if (!recent.length) {

    table.innerHTML = `
      <tr>
        <td colspan="5">
          Aucune commande
        </td>
      </tr>
    `;

  } else {

    table.innerHTML =
      recent.map(order => `

        <tr>

          <td>
            <strong>
              ${escapeHTML(order.id)}
            </strong>
          </td>

          <td>
            ${escapeHTML(
              formatDate(order.createdAt)
            )}
          </td>

          <td>
            ${escapeHTML(order.customerEmail)}
          </td>

          <td>
            ${formatPrice(order.total)}
          </td>

          <td>
            ${escapeHTML(order.paymentMethod)}
          </td>

        </tr>

      `).join("");
  }

  $("adminPromoCodes").innerHTML =
    Object.entries(PROMO_CODES)
      .map(([code, percentage]) => `

        <div class="promo-code-card">

          <span class="promo-code">
            ${escapeHTML(code)}
          </span>

          <span class="promo-value">
            -${percentage}%
          </span>

        </div>

      `).join("");
}


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch() {

  currentSearch =
    $("searchInput")
      .value
      .trim();

  renderProducts();

  document
    .getElementById("productsSection")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


/* =========================================================
   CATEGORY
   ========================================================= */

function selectCategory(category) {

  currentCategory =
    category;

  document
    .querySelectorAll(".category-pill")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.category === category
      );

    });

  renderProducts();
}


/* =========================================================
   FAVORITES VIEW
   ========================================================= */

function showFavorites() {

  const favoriteProducts =
    PRODUCTS.filter(
      product =>
        favorites.includes(product.id)
    );

  if (!favoriteProducts.length) {

    showToast(
      "❤️ Aucun favori pour le moment"
    );

    return;
  }

  currentSearch = "";

  currentCategory = "Tous";

  const original =
    [...PRODUCTS];

  productsGrid.innerHTML = "";

  resultCount.textContent =
    `${favoriteProducts.length} favori${favoriteProducts.length > 1 ? "s" : ""}`;

  emptyState?.classList.add("hidden");

  favoriteProducts.forEach(product => {

    const rating =
      getProductRating(product.id);

    const card =
      document.createElement("article");

    card.className =
      "product-card";

    card.innerHTML = `

      <div class="product-image-wrap">

        <button
          class="favorite-btn active"
          data-action="favorite"
          data-id="${escapeHTML(product.id)}"
          type="button"
        >
          ♥
        </button>

        <img
          class="product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div class="product-body">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating-line">

          <span>
            ${renderStars(rating.average)}
          </span>

          <span class="rating-count">
            ${rating.count ? `(${rating.count})` : ""}
          </span>

        </div>

        <div class="product-price">
          ${formatPrice(product.price)}
        </div>

        <div class="product-actions">

          <button
            class="product-action"
            data-action="view"
            data-id="${escapeHTML(product.id)}"
            type="button"
          >
            Voir
          </button>

          <button
            class="product-action add"
            data-action="add"
            data-id="${escapeHTML(product.id)}"
            type="button"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    productsGrid.appendChild(card);
  });
}


/* =========================================================
   EVENTS
   ========================================================= */

$("accountButton")?.addEventListener(
  "click",
  openAuth
);

$("ordersButton")?.addEventListener(
  "click",
  openOrders
);

$("adminButton")?.addEventListener(
  "click",
  openDashboard
);

$("cartButton")?.addEventListener(
  "click",
  openCart
);

$("closeCartButton")?.addEventListener(
  "click",
  closeCart
);

overlay?.addEventListener(
  "click",
  closeCart
);

$("searchButton")?.addEventListener(
  "click",
  performSearch
);

$("searchInput")?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      performSearch();
    }

  }
);

$("sortSelect")?.addEventListener(
  "change",
  event => {

    currentSort =
      event.target.value;

    renderProducts();
  }
);

$("heroShopButton")?.addEventListener(
  "click",
  () => {

    document
      .getElementById("productsSection")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }
);

$("heroCategoryButton")?.addEventListener(
  "click",
  () => {

    document
      .getElementById("categoryNav")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }
);


/* =========================================================
   CATEGORY EVENTS
   ========================================================= */

document
  .querySelectorAll(".category-pill")
  .forEach(button => {

    button.addEventListener(
      "click",
      () =>
        selectCategory(
          button.dataset.category
        )
    );

  });


/* =========================================================
   PRODUCT GRID EVENTS
   ========================================================= */

productsGrid?.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-action]");

    if (!button) {
      return;
    }

    const action =
      button.dataset.action;

    const id =
      button.dataset.id;

    if (action === "favorite") {
      toggleFavorite(id);
    }

    if (action === "view") {
      openProduct(id);
    }

    if (action === "add") {
      addToCart(id);
    }

  }
);


/* =========================================================
   CART EVENTS
   ========================================================= */

cartItems?.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-cart-action]");

    if (!button) {
      return;
    }

    const action =
      button.dataset.cartAction;

    const id =
      button.dataset.id;

    if (action === "plus") {
      changeCartQuantity(id, 1);
    }

    if (action === "minus") {
      changeCartQuantity(id, -1);
    }

    if (action === "remove") {
      removeFromCart(id);
    }

  }
);


/* =========================================================
   AUTH EVENTS
   ========================================================= */

$("loginTab")?.addEventListener(
  "click",
  showLogin
);

$("signupTab")?.addEventListener(
  "click",
  showSignup
);

$("loginForm")?.addEventListener(
  "submit",
  loginEmail
);

$("signupForm")?.addEventListener(
  "submit",
  signupEmail
);

$("googleLoginButton")?.addEventListener(
  "click",
  loginGoogle
);

$("googleSignupButton")?.addEventListener(
  "click",
  loginGoogle
);


/* =========================================================
   ACCOUNT EVENTS
   ========================================================= */

$("closeAuthButton")?.addEventListener(
  "click",
  () => closeModal(authModal)
);

$("closeAccountButton")?.addEventListener(
  "click",
  () => closeModal(accountModal)
);

$("accountOrdersButton")?.addEventListener(
  "click",
  () => {

    closeModal(accountModal);

    openOrders();
  }
);

$("accountFavoritesButton")?.addEventListener(
  "click",
  () => {

    closeModal(accountModal);

    showFavorites();
  }
);

$("logoutButton")?.addEventListener(
  "click",
  logout
);


/* =========================================================
   PRODUCT MODAL EVENTS
   ========================================================= */

$("closeProductButton")?.addEventListener(
  "click",
  () => closeModal(productModal)
);


/* =========================================================
   CHECKOUT EVENTS
   ========================================================= */

$("checkoutButton")?.addEventListener(
  "click",
  openCheckout
);

$("closeCheckoutButton")?.addEventListener(
  "click",
  () => closeModal(checkoutModal)
);

$("applyPromoButton")?.addEventListener(
  "click",
  applyPromo
);

$("promoCode")?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      event.preventDefault();

      applyPromo();
    }

  }
);

[
  "fullName",
  "address",
  "postalCode",
  "city",
  "country"
].forEach(id => {

  $(id)?.addEventListener(
    "input",
    checkoutButtonState
  );

});

$("payButton")?.addEventListener(
  "click",
  payDemo
);


/* =========================================================
   ORDERS EVENTS
   ========================================================= */

$("closeOrdersButton")?.addEventListener(
  "click",
  () => closeModal(ordersModal)
);


/* =========================================================
   DASHBOARD EVENTS
   ========================================================= */

$("closeDashboardButton")?.addEventListener(
  "click",
  () => closeModal(dashboardModal)
);

$("adminLoginButton")?.addEventListener(
  "click",
  loginAdmin
);

$("adminCode")?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      loginAdmin();
    }

  }
);


/* =========================================================
   INVOICE EVENTS
   ========================================================= */

$("closeInvoiceButton")?.addEventListener(
  "click",
  () => closeModal(invoiceModal)
);

$("printInvoiceButton")?.addEventListener(
  "click",
  () => window.print()
);


/* =========================================================
   FOOTER EVENTS
   ========================================================= */

$("footerAccountButton")?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    openAuth();
  }
);

$("footerOrdersButton")?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    openOrders();
  }
);

$("footerCartButton")?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    openCart();
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

    closeEverything();

  }
);


/* =========================================================
   INIT
   ========================================================= */

function init() {

  renderProducts();

  renderCart();

  updateAccountButtons();

  checkoutButtonState();

}

init();


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
  "%cNovaShop chargé",
  "font-weight:900;font-size:18px"
);

console.log(
  `Produits: ${PRODUCTS.length}`
);

console.log(
  `Dashboard: ${ADMIN_CODE}`
);
