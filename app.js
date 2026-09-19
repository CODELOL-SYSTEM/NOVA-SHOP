import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
let currentUser = null;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firebaseReady = true;
} catch (error) {
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
  cart: "nova_cart",
  favorites: "nova_favorites",
  orders: "nova_orders",
  reviews: "nova_reviews",
  dark: "nova_dark",
  sound: "nova_sound",
  admin: "nova_admin_unlocked"
};

/* =========================================================
   PRODUCTS
========================================================= */

const PRODUCTS = [
  {
    id: "gigabyte-b650",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description: "Carte mère AMD AM5 avec Wi-Fi et connectique moderne."
  },

  {
    id: "pc-7800x3d-rx9070xt",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description: "PC gaming haut de gamme pensé pour le jeu en haute fréquence."
  },

  {
    id: "hyperx-cloud-ii",
    name: "HyperX Cloud II – Casque gaming",
    category: "Casques",
    price: 49.99,
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
    description: "Casque gaming confortable avec son immersif."
  },

  {
    id: "tecors-60",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
    description: "Clavier mécanique compact 60% au format AZERTY."
  },

  {
    id: "celshading-65",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description: "Clavier 65% magnétique avec design noir."
  },

  {
    id: "ajazz-aj199",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description: "Souris gaming sans fil légère avec finition carbone."
  },

  {
    id: "logitech-gpro-x2",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description: "Souris gaming haut de gamme pensée pour la précision."
  },

  {
    id: "samsung-990-1tb",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
    description: "SSD NVMe PCIe haute performance de 1 To."
  },

  {
    id: "samsung-990-2tb",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp",
    description: "SSD NVMe rapide avec capacité de 2 To."
  },

  {
    id: "corsair-rm1000x",
    name: "CORSAIR RM1000x (EU)",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
    description: "Alimentation 1000 W conçue pour les configurations puissantes."
  },

  {
    id: "corsair-rm850x",
    name: "CORSAIR RM850x (EU)",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
    description: "Alimentation 850 W fiable pour PC gaming."
  },

  {
    id: "corsair-frame-5000d",
    name: "Corsair Frame 5000D RS ARGB (Noir)",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
    description: "Boîtier ATX noir avec ventilation et éclairage ARGB."
  },

  {
    id: "arctic-liquid-freezer",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
    description: "Watercooling 360 mm pour processeurs performants."
  },

  {
    id: "samsung-oled-g6",
    name: "Samsung 27 QD-OLED Odyssey G6 S27HG612SU",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
    description: "Écran gaming QD-OLED 27 pouces."
  },

  {
    id: "elgato-wave-arm",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5",
    description: "Bras articulé premium pour microphone."
  },

  {
    id: "dualsense-red",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    description: "Manette DualSense compatible PS5 et PC."
  },

  {
    id: "asus-b650",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg",
    description: "Carte mère gaming AMD AM5."
  },

  {
    id: "msi-b650",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
    description: "Carte mère B650 avec Wi-Fi et alimentation renforcée."
  }
];

/* =========================================================
   STATE
========================================================= */

let cart = loadJSON(STORAGE.cart, []);
let favorites = loadJSON(STORAGE.favorites, []);
let orders = loadJSON(STORAGE.orders, []);
let reviews = loadJSON(STORAGE.reviews, []);

let activeCategory = "Tous";
let searchTerm = "";
let currentProductId = null;
let selectedRating = 5;
let appliedPromo = null;
let countdownTimer = null;

/* =========================================================
   HELPERS
========================================================= */

const $ = id => document.getElementById(id);

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return Number(value || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function randomId(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return "-";
  }
}

function formatDateTime(date) {
  try {
    return new Date(date).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "-";
  }
}

function getCurrentEmail() {
  return currentUser?.email?.trim().toLowerCase() || "";
}

function isAdminEmail() {
  return getCurrentEmail() === ADMIN_EMAIL.toLowerCase();
}

function isAdminUnlocked() {
  return localStorage.getItem(STORAGE.admin) === "true";
}

function isAdmin() {
  return isAdminEmail() && isAdminUnlocked();
}

/* =========================================================
   SOUND
========================================================= */

function soundEnabled() {
  return localStorage.getItem(STORAGE.sound) !== "false";
}

function playBop() {
  if (!soundEnabled()) return;

  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      760,
      ctx.currentTime + 0.06
    );

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.06,
      ctx.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + 0.09
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);

    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 150);
  } catch {}
}

/* =========================================================
   MODALS
========================================================= */

function openModal(id) {
  const modal = $(id);

  if (!modal) return;

  document.querySelectorAll(".modal.show").forEach(m => {
    m.classList.remove("show");
  });

  modal.classList.add("show");
  $("overlay").classList.add("show");
}

function closeModal(id) {
  const modal = $(id);

  if (modal) {
    modal.classList.remove("show");
  }

  if (!document.querySelector(".modal.show")) {
    $("overlay").classList.remove("show");
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal.show").forEach(modal => {
    modal.classList.remove("show");
  });

  $("overlay").classList.remove("show");
}

/* =========================================================
   DARK MODE
========================================================= */

function loadSettings() {
  const dark = localStorage.getItem(STORAGE.dark) === "true";

  if (dark) {
    document.body.classList.add("dark");
    $("darkSwitch").classList.add("active");
  }

  if (soundEnabled()) {
    $("soundSwitch").classList.add("active");
  }
}

function toggleDarkMode() {
  const active = document.body.classList.toggle("dark");

  localStorage.setItem(STORAGE.dark, String(active));
  $("darkSwitch").classList.toggle("active", active);

  playBop();
}

function toggleSound() {
  const active = !soundEnabled();

  localStorage.setItem(STORAGE.sound, String(active));
  $("soundSwitch").classList.toggle("active", active);

  if (active) {
    playBop();
  }
}

/* =========================================================
   PRODUCT FILTER
========================================================= */

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (activeCategory !== "Tous") {
    list = list.filter(p => p.category === activeCategory);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();

    list = list.filter(product => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    });
  }

  const sort = $("sortSelect")?.value || "relevance";

  if (sort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  return list;
}

/* =========================================================
   RATINGS
========================================================= */

function getProductReviews(productId) {
  return reviews.filter(review => review.productId === productId);
}

function getAverageRating(productId) {
  const list = getProductReviews(productId);

  if (!list.length) {
    return 0;
  }

  return (
    list.reduce((total, review) => total + Number(review.rating), 0) /
    list.length
  );
}

function renderStars(rating) {
  const rounded = Math.round(rating);

  let output = "";

  for (let i = 1; i <= 5; i++) {
    output += i <= rounded ? "★" : "☆";
  }

  return output;
}

function getSafeReviewName() {
  const name =
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "Utilisateur";

  const clean = name.replace(/[^a-zA-ZÀ-ÿ0-9]/g, "");

  return (clean.slice(0, 3) || "Use") + "***";
}

function userAlreadyReviewed(productId) {
  if (!currentUser) return false;

  return reviews.some(
    review =>
      review.productId === productId &&
      review.userId === currentUser.uid
  );
}

/* =========================================================
   PRODUCTS RENDER
========================================================= */

function renderProducts() {
  const grid = $("productsGrid");
  const empty = $("emptyState");
  const count = $("resultsCount");

  const list = getFilteredProducts();

  grid.innerHTML = "";

  count.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if (!list.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  list.forEach(product => {
    const average = getAverageRating(product.id);
    const reviewCount = getProductReviews(product.id).length;
    const favorite = favorites.includes(product.id);

    const card = document.createElement("article");

    card.className = "card";
    card.dataset.productId = product.id;

    card.innerHTML = `
      <div class="image-box">
        <button
          class="favorite ${favorite ? "active" : ""}"
          data-action="favorite"
          data-id="${product.id}"
          title="Favori"
        >
          ${favorite ? "♥" : "♡"}
        </button>

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >
      </div>

      <div class="card-body">

        <div class="category-name">
          ${escapeHTML(product.category)}
        </div>

        <div class="title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          ${average ? renderStars(average) : "☆☆☆☆☆"}
          <span style="color:#777;font-size:10px">
            ${reviewCount ? `(${reviewCount})` : "Aucun avis"}
          </span>
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button
            data-action="view"
            data-id="${product.id}"
          >
            Voir
          </button>

          <button
            class="add"
            data-action="add"
            data-id="${product.id}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const img = card.querySelector("img");

    img.addEventListener("error", () => {
      card.remove();

      const remaining = document.querySelectorAll(
        "#productsGrid .card"
      ).length;

      if (!remaining) {
        empty.style.display = "block";
      }
    });

    grid.appendChild(card);
  });
}

/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
    showToast("Retiré des favoris");
  } else {
    favorites.push(productId);
    showToast("Ajouté aux favoris ❤️");
  }

  saveJSON(STORAGE.favorites, favorites);
  renderProducts();

  if (currentProductId === productId) {
    renderProductDetails(productId);
  }
}

/* =========================================================
   CART
========================================================= */

function getCartDetailed() {
  return cart
    .map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);

      if (!product) return null;

      return {
        ...product,
        quantity: Math.max(1, Number(item.quantity || 1))
      };
    })
    .filter(Boolean);
}

function cartQuantity() {
  return cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );
}

function cartSubtotal() {
  return getCartDetailed().reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function updateCartCount() {
  $("cartCount").textContent = cartQuantity();
}

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveJSON(STORAGE.cart, cart);
  updateCartCount();

  showToast("Produit ajouté au panier 🛒");
  playBop();
}

function changeQuantity(productId, amount) {
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveJSON(STORAGE.cart, cart);

  renderCart();
  updateCartCount();
}

function renderCart() {
  const content = $("cartContent");
  const list = getCartDetailed();

  if (!list.length) {
    content.innerHTML = `
      <div style="
        text-align:center;
        padding:45px 10px;
        color:#6b7280
      ">
        <div style="font-size:45px">🛒</div>
        <h3>Ton panier est vide</h3>
        <p style="margin-top:5px">
          Ajoute un produit pour commencer.
        </p>
      </div>
    `;

    $("cartTotal").textContent = money(0);
    $("checkoutButton").disabled = true;

    return;
  }

  $("checkoutButton").disabled = false;

  content.innerHTML = list.map(item => `
    <div class="cart-item">

      <img
        src="${item.image}"
        alt=""
      >

      <div>
        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <div style="font-size:12px;color:#6b7280">
          ${money(item.price)}
        </div>

        <div class="qty">

          <button
            data-cart-minus="${item.id}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            data-cart-plus="${item.id}"
          >
            +
          </button>

        </div>

      </div>

      <strong>
        ${money(item.price * item.quantity)}
      </strong>

    </div>
  `).join("");

  $("cartTotal").textContent = money(cartSubtotal());
}

/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(productId) {
  currentProductId = productId;

  renderProductDetails(productId);
  openModal("productModal");
}

function renderProductDetails(productId) {
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) return;

  const average = getAverageRating(product.id);
  const list = getProductReviews(product.id);
  const favorite = favorites.includes(product.id);

  $("productContent").innerHTML = `
    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >
      </div>

      <div class="detail">

        <div class="category-name">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating" style="margin-top:10px">
          ${average ? renderStars(average) : "☆☆☆☆☆"}
          <span style="color:#777;font-size:11px">
            ${average
              ? `${average.toFixed(1)}/5`
              : "Pas encore noté"}
          </span>
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p class="detail-description">
          ${escapeHTML(product.description)}
        </p>

        <div style="
          display:flex;
          gap:8px;
          margin-top:18px;
        ">

          <button
            class="primary"
            data-detail-add="${product.id}"
          >
            🛒 Ajouter au panier
          </button>

          <button
            class="btn"
            data-detail-fav="${product.id}"
          >
            ${favorite ? "♥ Favori" : "♡ Favori"}
          </button>

        </div>

      </div>

    </div>

    <div class="review-section">

      <h3>
        Avis clients
      </h3>

      ${
        currentUser && !userAlreadyReviewed(product.id)
          ? `
            <div style="
              background:#f5f6f8;
              padding:15px;
              border-radius:12px;
              margin-top:13px;
            ">

              <strong>
                Donner ton avis
              </strong>

              <div class="stars-input" id="starsInput">
                ${[1,2,3,4,5].map(n => `
                  <button
                    type="button"
                    class="star ${n <= selectedRating ? "active" : ""}"
                    data-rating="${n}"
                  >
                    ★
                  </button>
                `).join("")}
              </div>

              <textarea
                id="reviewText"
                placeholder="Ton avis..."
                style="
                  width:100%;
                  min-height:80px;
                  border:1px solid var(--line);
                  border-radius:10px;
                  padding:10px;
                "
              ></textarea>

              <button
                class="primary"
                style="margin-top:8px"
                id="submitReview"
                data-review-product="${product.id}"
              >
                Publier mon avis
              </button>

            </div>
          `
          : !currentUser
            ? `
              <p style="
                color:#6b7280;
                font-size:12px;
                margin-top:10px;
              ">
                Connecte-toi pour laisser un avis.
              </p>
            `
            : ""
      }

      <div style="margin-top:15px">

        ${
          list.length
            ? list.map(review => `
              <div class="review">

                <div style="
                  display:flex;
                  justify-content:space-between;
                  gap:10px;
                ">

                  <strong>
                    ${escapeHTML(review.name)}
                  </strong>

                  <span style="
                    color:#777;
                    font-size:10px;
                  ">
                    ${formatDate(review.date)}
                  </span>

                </div>

                <div class="rating">
                  ${renderStars(review.rating)}
                </div>

                <div style="
                  font-size:13px;
                  margin-top:5px;
                ">
                  ${escapeHTML(review.comment)}
                </div>

              </div>
            `).join("")
            : `
              <p style="
                color:#777;
                margin-top:15px;
                font-size:13px;
              ">
                Aucun avis pour le moment.
              </p>
            `
        }

      </div>

    </div>
  `;

  document.querySelectorAll("[data-rating]").forEach(button => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.rating);

      document.querySelectorAll("[data-rating]").forEach(star => {
        star.classList.toggle(
          "active",
          Number(star.dataset.rating) <= selectedRating
        );
      });

      playBop();
    });
  });

  const reviewButton = $("submitReview");

  if (reviewButton) {
    reviewButton.addEventListener("click", submitReview);
  }
}

function submitReview() {
  const productId = $("submitReview")?.dataset.reviewProduct;

  if (!productId || !currentUser) {
    showToast("Connecte-toi pour laisser un avis.");
    return;
  }

  if (userAlreadyReviewed(productId)) {
    showToast("Tu as déjà noté ce produit.");
    return;
  }

  const text = $("reviewText")?.value.trim();

  if (!text) {
    showToast("Écris un commentaire.");
    return;
  }

  reviews.push({
    id: randomId(10),
    productId,
    userId: currentUser.uid,
    name: getSafeReviewName(),
    rating: selectedRating,
    comment: text,
    date: new Date().toISOString()
  });

  saveJSON(STORAGE.reviews, reviews);

  showToast("Avis publié ⭐");

  renderProducts();
  renderProductDetails(productId);
}

/* =========================================================
   AUTH UI
========================================================= */

function updateAccountUI() {
  const email = getCurrentEmail();

  $("accountButton").textContent = currentUser ? "👤" : "🔐";

  $("ordersButton").style.display =
    currentUser ? "inline-flex" : "none";

  /*
    IMPORTANT :
    Le bouton Dashboard apparaît dès que le compte connecté
    correspond à l'adresse admin.
    Le code sera demandé uniquement lorsqu'on clique dessus.
  */

  $("adminButton").style.display =
    email === ADMIN_EMAIL.toLowerCase()
      ? "inline-flex"
      : "none";
}

function switchAuthTab(mode) {
  const login = mode === "login";

  $("loginTab").classList.toggle("active", login);
  $("signupTab").classList.toggle("active", !login);

  $("loginForm").style.display = login ? "grid" : "none";
  $("signupForm").style.display = login ? "none" : "grid";
}

/* =========================================================
   LOGIN
========================================================= */

async function loginWithEmail(event) {
  event.preventDefault();

  if (!firebaseReady) {
    showToast("Firebase n'est pas disponible.");
    return;
  }

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    showToast("Connexion réussie 👋");
    closeModal("authModal");

  } catch (error) {
    console.error(error);

    const messages = {
      "auth/invalid-credential":
        "E-mail ou mot de passe incorrect.",
      "auth/user-not-found":
        "Compte introuvable.",
      "auth/wrong-password":
        "Mot de passe incorrect.",
      "auth/invalid-email":
        "E-mail invalide.",
      "auth/too-many-requests":
        "Trop de tentatives. Réessaie plus tard."
    };

    showToast(
      messages[error.code] ||
      "Impossible de se connecter."
    );
  }
}

/* =========================================================
   SIGNUP
========================================================= */

async function signup(event) {
  event.preventDefault();

  if (!firebaseReady) {
    showToast("Firebase n'est pas disponible.");
    return;
  }

  const email = $("signupEmail").value.trim();
  const phone = $("signupPhone").value.trim();
  const password = $("signupPassword").value;
  const confirm = $("signupConfirm").value;

  if (!email || !phone || !password || !confirm) {
    showToast("Remplis tous les champs.");
    return;
  }

  if (password !== confirm) {
    showToast("Les mots de passe ne correspondent pas.");
    return;
  }

  if (password.length < 6) {
    showToast("Le mot de passe doit avoir au moins 6 caractères.");
    return;
  }

  try {
    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    /*
      Le téléphone est sauvegardé localement pour le prototype.
      Pour une vraie vérification SMS, il faut activer Firebase
      Phone Authentication + reCAPTCHA.
    */

    localStorage.setItem(
      `nova_phone_${credential.user.uid}`,
      phone
    );

    showToast("Compte créé 🎉");

    closeModal("authModal");

  } catch (error) {
    console.error(error);

    const messages = {
      "auth/email-already-in-use":
        "Cet e-mail est déjà utilisé.",
      "auth/invalid-email":
        "E-mail invalide.",
      "auth/weak-password":
        "Mot de passe trop faible."
    };

    showToast(
      messages[error.code] ||
      "Impossible de créer le compte."
    );
  }
}

/* =========================================================
   GOOGLE
========================================================= */

async function loginGoogle() {
  if (!firebaseReady) {
    showToast("Firebase n'est pas disponible.");
    return;
  }

  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    showToast("Connexion Google réussie 🌐");
    closeModal("authModal");

  } catch (error) {
    console.error(error);

    if (error.code === "auth/popup-closed-by-user") {
      return;
    }

    showToast(
      error.message ||
      "Connexion Google impossible."
    );
  }
}

/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount() {
  if (!currentUser) {
    $("accountContent").innerHTML = `
      <div style="text-align:center;padding:30px">
        <div style="font-size:45px">🔐</div>

        <h3>
          Connecte-toi à NovaShop
        </h3>

        <p style="
          color:#6b7280;
          margin:8px 0 18px;
          font-size:13px;
        ">
          Accède à tes commandes et à ton compte.
        </p>

        <button
          class="primary"
          id="accountLogin"
        >
          Se connecter
        </button>
      </div>
    `;

    $("accountLogin").onclick = () => {
      closeModal("accountModal");
      switchAuthTab("login");
      openModal("authModal");
    };

    return;
  }

  const phone =
    localStorage.getItem(
      `nova_phone_${currentUser.uid}`
    ) || "Non renseigné";

  $("accountContent").innerHTML = `
    <div style="text-align:center">

      <div style="font-size:50px">
        👤
      </div>

      <h3>
        ${escapeHTML(
          currentUser.displayName ||
          currentUser.email?.split("@")[0] ||
          "Utilisateur"
        )}
      </h3>

      <p style="
        color:#6b7280;
        font-size:13px;
        margin-top:5px;
      ">
        ${escapeHTML(currentUser.email || "")}
      </p>

      <p style="
        color:#6b7280;
        font-size:12px;
        margin-top:3px;
      ">
        📱 ${escapeHTML(phone)}
      </p>

    </div>

    <div style="
      display:grid;
      gap:9px;
      margin-top:22px;
    ">

      <button
        class="btn"
        id="accountOrders"
      >
        📦 Mes commandes
      </button>

      <button
        class="btn"
        id="accountLogout"
      >
        🚪 Se déconnecter
      </button>

    </div>
  `;

  $("accountOrders").onclick = () => {
    closeModal("accountModal");
    renderOrders();
    openModal("ordersModal");
  };

  $("accountLogout").onclick = async () => {
    if (firebaseReady) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error(error);
      }
    }

    currentUser = null;

    localStorage.removeItem(STORAGE.admin);

    updateAccountUI();

    closeModal("accountModal");

    showToast("Déconnecté.");
  };
}

/* =========================================================
   DELIVERY DATA
========================================================= */

function getDeliveryData(order) {
  const oldDeliveryDate =
    order.deliveryDate ||
    new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toISOString();

  const oldRemaining = Math.max(
    0,
    Math.floor(
      (new Date(oldDeliveryDate).getTime() - Date.now()) /
      1000
    )
  );

  let durationSeconds =
    Number(order.deliveryDurationSeconds);

  if (!Number.isFinite(durationSeconds)) {
    durationSeconds = oldRemaining;
  }

  let updatedAt =
    Number(order.deliveryUpdatedAt);

  if (!Number.isFinite(updatedAt)) {
    updatedAt = Date.now();
  }

  return {
    status: order.status || "Préparation",

    truckLocation:
      order.truckLocation ||
      "Entrepôt",

    destination:
      order.destination ||
      order.address?.city ||
      "France",

    tracking:
      order.tracking ||
      "NOVA-" + randomId(8).toUpperCase(),

    deliveryDate: oldDeliveryDate,

    durationSeconds,

    updatedAt
  };
}

function getRemainingSeconds(order) {
  const delivery = getDeliveryData(order);

  if (delivery.status.toLowerCase() === "livrée") {
    return 0;
  }

  const elapsed = Math.floor(
    (Date.now() - delivery.updatedAt) / 1000
  );

  return Math.max(
    0,
    delivery.durationSeconds - elapsed
  );
}

function formatDuration(seconds) {
  seconds = Math.max(0, Math.floor(seconds));

  const days = Math.floor(seconds / 86400);

  seconds %= 86400;

  const hours = Math.floor(seconds / 3600);

  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);

  const secs = seconds % 60;

  if (days > 0) {
    return `${days} j ${hours} h ${minutes} min ${secs} s`;
  }

  if (hours > 0) {
    return `${hours} h ${minutes} min ${secs} s`;
  }

  if (minutes > 0) {
    return `${minutes} min ${secs} s`;
  }

  return `${secs} s`;
}

function durationParts(seconds) {
  seconds = Math.max(0, Math.floor(seconds));

  const days = Math.floor(seconds / 86400);

  seconds %= 86400;

  const hours = Math.floor(seconds / 3600);

  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);

  return {
    days,
    hours,
    minutes
  };
}

function statusClass(status) {
  const normalized = String(status).toLowerCase();

  if (normalized.includes("livr")) {
    return "status";
  }

  if (normalized.includes("transit")) {
    return "status";
  }

  return "status";
}

/* =========================================================
   CREATE ORDER
========================================================= */

function createOrder() {
  if (!currentUser) {
    showToast("Connecte-toi avant de commander.");
    return;
  }

  const fullName = $("fullName").value.trim();
  const country = $("country").value.trim();
  const address = $("address").value.trim();
  const postalCode = $("postalCode").value.trim();
  const city = $("city").value.trim();

  if (
    !fullName ||
    !country ||
    !address ||
    !postalCode ||
    !city
  ) {
    showToast("Remplis toutes les informations de livraison.");
    return;
  }

  /*
    Vérification de format uniquement.
    Ce n'est pas une vérification réelle de l'existence
    de l'adresse.
  */

  if (postalCode.length < 4) {
    showToast("Code postal invalide.");
    return;
  }

  if (appliedPromo !== "NOVA100") {
    showToast(
      "Pour ce prototype, utilise le code NOVA100."
    );
    return;
  }

  const subtotal = cartSubtotal();

  const discount = subtotal;

  const total = 0;

  const durationSeconds =
    3 * 24 * 60 * 60;

  const now = Date.now();

  const deliveryDate =
    new Date(
      now + durationSeconds * 1000
    ).toISOString();

  const order = {
    id: randomId(7),

    orderNumber:
      "NOVA-" +
      Date.now().toString(36).toUpperCase(),

    userId: currentUser.uid,

    customer: {
      name: fullName,
      email: currentUser.email || "",
      phone:
        localStorage.getItem(
          `nova_phone_${currentUser.uid}`
        ) || ""
    },

    address: {
      address,
      postalCode,
      city,
      country
    },

    items: getCartDetailed().map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    })),

    subtotal,

    discount,

    total,

    promo: appliedPromo,

    paymentMethod: "Code promotionnel",

    createdAt: new Date().toISOString(),

    status: "En préparation",

    truckLocation: "Entrepôt",

    destination: city,

    tracking:
      "NOVA-TRK-" +
      randomId(7).toUpperCase(),

    deliveryDurationSeconds:
      durationSeconds,

    deliveryUpdatedAt:
      now,

    deliveryDate
  };

  orders.unshift(order);

  saveJSON(STORAGE.orders, orders);

  cart = [];

  saveJSON(STORAGE.cart, cart);

  updateCartCount();

  appliedPromo = null;

  $("promoCode").value = "";
  $("promoMessage").textContent = "";

  closeModal("checkoutModal");
  closeModal("cartModal");

  showToast(
    "Commande créée gratuitement 🎉"
  );

  setTimeout(() => {
    renderOrders();
    openModal("ordersModal");
  }, 300);
}

/* =========================================================
   ORDERS
========================================================= */

function getUserOrders() {
  if (!currentUser) return [];

  return orders.filter(
    order => order.userId === currentUser.uid
  );
}

function renderOrders() {
  const content = $("ordersContent");

  if (!currentUser) {
    content.innerHTML = `
      <div style="text-align:center;padding:40px">
        🔐
        <h3>Connecte-toi pour voir tes commandes.</h3>
      </div>
    `;

    return;
  }

  const userOrders = getUserOrders();

  if (!userOrders.length) {
    content.innerHTML = `
      <div style="
        text-align:center;
        padding:45px;
        color:#6b7280;
      ">
        <div style="font-size:45px">📦</div>

        <h3>
          Aucune commande
        </h3>

        <p style="margin-top:6px">
          Tes commandes apparaîtront ici.
        </p>
      </div>
    `;

    return;
  }

  content.innerHTML = userOrders.map(order => {
    const delivery = getDeliveryData(order);
    const remaining = getRemainingSeconds(order);

    const progress =
      delivery.status.toLowerCase().includes("livr")
        ? 100
        : remaining <= 0
          ? 95
          : 45;

    return `
      <div class="order">

        <div class="order-top">

          <div>
            <strong>
              ${escapeHTML(order.orderNumber || order.id)}
            </strong>

            <div style="
              font-size:11px;
              color:#777;
              margin-top:4px;
            ">
              ${formatDateTime(order.createdAt)}
            </div>
          </div>

          <span class="${statusClass(delivery.status)}">
            ${escapeHTML(delivery.status)}
          </span>

        </div>

        <div style="
          margin-top:12px;
          font-size:13px;
        ">
          ${order.items.map(item => `
            <div style="
              display:flex;
              justify-content:space-between;
              padding:4px 0;
            ">
              <span>
                ${escapeHTML(item.name)}
                × ${item.quantity}
              </span>

              <strong>
                ${money(item.price * item.quantity)}
              </strong>
            </div>
          `).join("")}
        </div>

        <div class="delivery">

          <div style="
            font-weight:900;
            margin-bottom:7px;
          ">
            🚚 Livraison
          </div>

          <div class="delivery-row">
            <span>📍 Camion actuellement</span>
            <strong>
              ${escapeHTML(delivery.truckLocation)}
            </strong>
          </div>

          <div class="delivery-row">
            <span>🎯 Destination</span>
            <strong>
              ${escapeHTML(delivery.destination)}
            </strong>
          </div>

          <div class="delivery-row">
            <span>⏱️ Temps restant</span>
            <strong
              class="countdown"
              data-countdown="${order.id}"
            >
              ${
                delivery.status
                  .toLowerCase()
                  .includes("livr")
                  ? "Livrée"
                  : formatDuration(remaining)
              }
            </strong>
          </div>

          <div class="progress">
            <span
              style="width:${progress}%"
              data-progress="${order.id}"
            ></span>
          </div>

          <div class="delivery-row">
            <span>📅 Livraison estimée</span>
            <strong>
              ${formatDateTime(delivery.deliveryDate)}
            </strong>
          </div>

          <div class="delivery-row">
            <span>🔢 Suivi</span>
            <strong>
              ${escapeHTML(delivery.tracking)}
            </strong>
          </div>

        </div>

        <div style="
          display:flex;
          gap:7px;
          margin-top:12px;
        ">

          <button
            class="btn"
            data-invoice="${order.id}"
          >
            🧾 Facture
          </button>

        </div>

      </div>
    `;
  }).join("");

  document.querySelectorAll("[data-invoice]").forEach(button => {
    button.addEventListener("click", () => {
      renderInvoice(button.dataset.invoice);
      openModal("invoiceModal");
    });
  });

  startCountdown();
}

/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {
  clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    document
      .querySelectorAll("[data-countdown]")
      .forEach(element => {

        const orderId =
          element.dataset.countdown;

        const order =
          orders.find(o => o.id === orderId);

        if (!order) return;

        const delivery =
          getDeliveryData(order);

        const remaining =
          getRemainingSeconds(order);

        if (
          delivery.status
            .toLowerCase()
            .includes("livr")
        ) {
          element.textContent = "Livrée";
        } else if (remaining <= 0) {
          element.textContent = "Arrivée imminente";
        } else {
          element.textContent =
            formatDuration(remaining);
        }
      });
  }, 1000);
}

/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckout() {
  const subtotal = cartSubtotal();

  let discount = 0;

  if (appliedPromo === "NOVA100") {
    discount = subtotal;
  } else if (appliedPromo) {
    discount =
      subtotal *
      (PROMOS[appliedPromo] / 100);
  }

  const total =
    Math.max(0, subtotal - discount);

  $("checkoutSubtotal").textContent =
    money(subtotal);

  $("checkoutDiscount").textContent =
    `-${money(discount)}`;

  $("checkoutTotal").textContent =
    money(total);

  $("payButton").disabled =
    appliedPromo !== "NOVA100";
}

function applyPromo() {
  const input =
    $("promoCode").value.trim().toUpperCase();

  const message =
    $("promoMessage");

  if (!input) {
    appliedPromo = null;

    message.textContent =
      "Entre un code promotionnel.";

    message.className =
      "promo-message invalid";

    renderCheckout();

    return;
  }

  if (!Object.prototype.hasOwnProperty.call(PROMOS, input)) {
    appliedPromo = null;

    message.textContent =
      "Code invalide.";

    message.className =
      "promo-message invalid";

    renderCheckout();

    return;
  }

  appliedPromo = input;

  if (input === "NOVA100") {
    message.textContent =
      "✓ Code accepté : commande gratuite.";

    message.className =
      "promo-message valid";
  } else {
    message.textContent =
      `✓ Réduction de ${PROMOS[input]}%.`;

    message.className =
      "promo-message valid";
  }

  renderCheckout();

  playBop();
}

/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {
  if (!isAdmin()) {
    showToast("Accès Dashboard non autorisé.");
    return;
  }

  $("statOrders").textContent =
    orders.length;

  $("statFree").textContent =
    orders.filter(
      order => Number(order.total) === 0
    ).length;

  const catalogValue =
    PRODUCTS.reduce(
      (total, product) =>
        total + product.price,
      0
    );

  $("statCatalog").textContent =
    money(catalogValue);

  renderAdminOrders();
  renderAdminPromos();
}

function renderAdminOrders() {
  const container =
    $("adminOrders");

  if (!orders.length) {
    container.innerHTML = `
      <div style="
        padding:30px 10px;
        color:#777;
        text-align:center;
      ">
        Aucune commande pour le moment.
      </div>
    `;

    return;
  }

  container.innerHTML = orders.map(order => {
    const delivery = getDeliveryData(order);
    const remaining = getRemainingSeconds(order);
    const parts = durationParts(remaining);

    return `
      <div class="admin-order">

        <h4>
          📦 ${escapeHTML(order.orderNumber || order.id)}
        </h4>

        <div class="client">
          Client :
          ${escapeHTML(order.customer?.name || "Utilisateur")}
          ·
          ${escapeHTML(order.customer?.email || "")}
        </div>

        <div style="
          background:#f5f6f8;
          border-radius:10px;
          padding:10px;
          margin-bottom:12px;
          font-size:12px;
        ">
          <strong>
            Adresse client
          </strong>

          <div style="margin-top:4px">
            ${escapeHTML(order.address?.address || "")}
          </div>

          <div>
            ${escapeHTML(order.address?.postalCode || "")}
            ${escapeHTML(order.address?.city || "")}
          </div>

          <div>
            ${escapeHTML(order.address?.country || "")}
          </div>
        </div>

        <div class="admin-grid">

          <div class="admin-field">
            <label>Statut</label>

            <select data-status="${order.id}">
              ${[
                "En préparation",
                "En transit",
                "Arrivée imminente",
                "Livrée",
                "Annulée"
              ].map(status => `
                <option
                  value="${status}"
                  ${delivery.status === status ? "selected" : ""}
                >
                  ${status}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="admin-field">
            <label>Suivi</label>

            <input
              value="${escapeHTML(delivery.tracking)}"
              data-tracking="${order.id}"
            >
          </div>

          <div class="admin-field admin-full">
            <label>
              📍 Endroit où se trouve actuellement le camion
            </label>

            <input
              value="${escapeHTML(delivery.truckLocation)}"
              data-location="${order.id}"
              placeholder="Ex : Centre logistique Lille"
            >
          </div>

          <div class="admin-field admin-full">
            <label>
              🎯 Destination
            </label>

            <input
              value="${escapeHTML(delivery.destination)}"
              data-destination="${order.id}"
              placeholder="Ex : Roubaix"
            >
          </div>

          <div class="admin-field">
            <label>
              ⏱️ Jours restants
            </label>

            <input
              type="number"
              min="0"
              value="${parts.days}"
              data-days="${order.id}"
            >
          </div>

          <div class="admin-field">
            <label>
              ⏱️ Heures restantes
            </label>

            <input
              type="number"
              min="0"
              max="23"
              value="${parts.hours}"
              data-hours="${order.id}"
            >
          </div>

          <div class="admin-field">
            <label>
              ⏱️ Minutes restantes
            </label>

            <input
              type="number"
              min="0"
              max="59"
              value="${parts.minutes}"
              data-minutes="${order.id}"
            >
          </div>

          <div class="admin-field">
            <label>
              📅 Date prévue
            </label>

            <input
              type="datetime-local"
              value="${toDateTimeLocal(delivery.deliveryDate)}"
              data-date="${order.id}"
            >
          </div>

        </div>

        <button
          class="save"
          data-save-delivery="${order.id}"
        >
          💾 Enregistrer la livraison
        </button>

      </div>
    `;
  }).join("");

  document
    .querySelectorAll("[data-save-delivery]")
    .forEach(button => {
      button.addEventListener("click", () => {
        saveDelivery(button.dataset.saveDelivery);
      });
    });
}

function toDateTimeLocal(date) {
  try {
    const d = new Date(date);

    const pad = number =>
      String(number).padStart(2, "0");

    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      "T" +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes())
    );
  } catch {
    return "";
  }
}

/* =========================================================
   SAVE DELIVERY
========================================================= */

function saveDelivery(orderId) {
  if (!isAdmin()) {
    showToast("Accès refusé.");
    return;
  }

  const order =
    orders.find(o => o.id === orderId);

  if (!order) {
    showToast("Commande introuvable.");
    return;
  }

  const status =
    document.querySelector(
      `[data-status="${orderId}"]`
    )?.value || "En préparation";

  const location =
    document.querySelector(
      `[data-location="${orderId}"]`
    )?.value.trim() || "Entrepôt";

  const destination =
    document.querySelector(
      `[data-destination="${orderId}"]`
    )?.value.trim() ||
    order.address?.city ||
    "France";

  const tracking =
    document.querySelector(
      `[data-tracking="${orderId}"]`
    )?.value.trim() ||
    "NOVA-TRK-" +
      randomId(7).toUpperCase();

  let days = Number(
    document.querySelector(
      `[data-days="${orderId}"]`
    )?.value || 0
  );

  let hours = Number(
    document.querySelector(
      `[data-hours="${orderId}"]`
    )?.value || 0
  );

  let minutes = Number(
    document.querySelector(
      `[data-minutes="${orderId}"]`
    )?.value || 0
  );

  days = Math.max(
    0,
    Math.floor(days)
  );

  hours = Math.max(
    0,
    Math.min(23, Math.floor(hours))
  );

  minutes = Math.max(
    0,
    Math.min(59, Math.floor(minutes))
  );

  const durationSeconds =
    days * 86400 +
    hours * 3600 +
    minutes * 60;

  const now = Date.now();

  const dateInput =
    document.querySelector(
      `[data-date="${orderId}"]`
    );

  let deliveryDate;

  if (dateInput?.value) {
    const manuallySelectedDate =
      new Date(dateInput.value).getTime();

    if (
      Number.isFinite(manuallySelectedDate) &&
      manuallySelectedDate > now
    ) {
      deliveryDate =
        new Date(
          manuallySelectedDate
        ).toISOString();
    } else {
      deliveryDate =
        new Date(
          now + durationSeconds * 1000
        ).toISOString();
    }
  } else {
    deliveryDate =
      new Date(
        now + durationSeconds * 1000
      ).toISOString();
  }

  order.status = status;

  order.truckLocation =
    location;

  order.destination =
    destination;

  order.tracking =
    tracking;

  order.deliveryDurationSeconds =
    durationSeconds;

  order.deliveryUpdatedAt =
    now;

  order.deliveryDate =
    deliveryDate;

  if (
    status.toLowerCase().includes("livr")
  ) {
    order.deliveryDurationSeconds = 0;
    order.deliveryUpdatedAt = now;
    order.deliveryDate =
      new Date(now).toISOString();
  }

  saveJSON(STORAGE.orders, orders);

  showToast(
    "Livraison mise à jour 🚚"
  );

  renderDashboard();
}

/* =========================================================
   PROMOS DASHBOARD
========================================================= */

function renderAdminPromos() {
  $("adminPromos").innerHTML =
    Object.entries(PROMOS)
      .map(([code, percent]) => `
        <div class="promo-admin">

          <strong>
            ${code}
          </strong>

          <span>
            ${percent}%
          </span>

        </div>
      `)
      .join("");
}

/* =========================================================
   INVOICE
========================================================= */

function renderInvoice(orderId) {
  const order =
    orders.find(o => o.id === orderId);

  if (!order) {
    showToast("Commande introuvable.");
    return;
  }

  const delivery =
    getDeliveryData(order);

  $("invoiceContent").innerHTML = `
    <div>

      <div class="invoice-head">

        <div class="invoice-logo">
          NOVA<span>SHOP</span>
        </div>

        <div class="invoice-meta">

          <strong>
            FACTURE
          </strong>

          <br>

          ${escapeHTML(
            order.orderNumber || order.id
          )}

          <br>

          ${formatDate(order.createdAt)}

        </div>

      </div>

      <div class="invoice-customer">

        <div>
          <strong>
            Client
          </strong>

          <br>

          ${escapeHTML(
            order.customer?.name || ""
          )}

          <br>

          ${escapeHTML(
            order.customer?.email || ""
          )}

        </div>

        <div>
          <strong>
            Livraison
          </strong>

          <br>

          ${escapeHTML(
            order.address?.address || ""
          )}

          <br>

          ${escapeHTML(
            order.address?.postalCode || ""
          )}
          ${escapeHTML(
            order.address?.city || ""
          )}

          <br>

          ${escapeHTML(
            order.address?.country || ""
          )}

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

          ${order.items.map(item => `
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
          `).join("")}

        </tbody>

      </table>

      <div class="invoice-total">

        <div>
          <span>
            Sous-total
          </span>

          <strong>
            ${money(order.subtotal)}
          </strong>
        </div>

        <div>
          <span>
            Réduction
          </span>

          <strong>
            -${money(order.discount)}
          </strong>
        </div>

        <div>
          <span>
            Code
          </span>

          <strong>
            ${escapeHTML(order.promo || "-")}
          </strong>
        </div>

        <div>
          <span>
            Paiement
          </span>

          <strong>
            ${escapeHTML(
              order.paymentMethod ||
              "Code promotionnel"
            )}
          </strong>
        </div>

        <div class="invoice-grand">

          <span>
            TOTAL
          </span>

          <strong>
            ${money(order.total)}
          </strong>

        </div>

      </div>

      <div style="
        margin-top:30px;
        padding-top:15px;
        border-top:1px solid #ddd;
        font-size:12px;
        color:#666;
      ">

        <strong>
          Livraison
        </strong>

        <br>

        🚚
        ${escapeHTML(delivery.status)}

        <br>

        📍
        ${escapeHTML(delivery.truckLocation)}

        <br>

        🎯
        ${escapeHTML(delivery.destination)}

        <br>

        🔢
        ${escapeHTML(delivery.tracking)}

      </div>

      <div style="
        margin-top:30px;
        font-size:11px;
        color:#777;
        text-align:center;
      ">
        Merci pour ta commande chez NovaShop.
      </div>

    </div>
  `;
}

/* =========================================================
   ADMIN BUTTON
========================================================= */

function handleAdminButton() {
  if (!currentUser) {
    showToast("Connecte-toi d'abord.");
    return;
  }

  if (!isAdminEmail()) {
    showToast("Compte non autorisé.");
    return;
  }

  if (!isAdminUnlocked()) {
    const code = prompt(
      "Code Dashboard NovaShop :"
    );

    if (code !== ADMIN_CODE) {
      showToast("Code Dashboard incorrect.");
      return;
    }

    localStorage.setItem(
      STORAGE.admin,
      "true"
    );
  }

  renderDashboard();
  openModal("dashboardModal");
}

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

  /* Search */

  $("searchButton").addEventListener(
    "click",
    () => {
      searchTerm =
        $("searchInput").value.trim();

      renderProducts();
      playBop();
    }
  );

  $("searchInput").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        searchTerm =
          $("searchInput").value.trim();

        renderProducts();
        playBop();
      }
    }
  );

  /* Sort */

  $("sortSelect").addEventListener(
    "change",
    renderProducts
  );

  /* Categories */

  document
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          activeCategory =
            button.dataset.category;

          document
            .querySelectorAll(".category")
            .forEach(category => {
              category.classList.toggle(
                "active",
                category.dataset.category ===
                activeCategory
              );
            });

          renderProducts();
          playBop();
        }
      );

    });

  /* Product grid */

  $("productsGrid").addEventListener(
    "click",
    event => {

      const button =
        event.target.closest("[data-action]");

      if (!button) return;

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

  /* Account */

  $("accountButton").addEventListener(
    "click",
    () => {
      renderAccount();
      openModal("accountModal");
    }
  );

  /* Orders */

  $("ordersButton").addEventListener(
    "click",
    () => {
      renderOrders();
      openModal("ordersModal");
    }
  );

  /* Dashboard */

  $("adminButton").addEventListener(
    "click",
    handleAdminButton
  );

  /* Settings */

  $("settingsButton").addEventListener(
    "click",
    () => {
      openModal("settingsModal");
    }
  );

  $("darkSwitch").addEventListener(
    "click",
    toggleDarkMode
  );

  $("soundSwitch").addEventListener(
    "click",
    toggleSound
  );

  /* Cart */

  $("cartButton").addEventListener(
    "click",
    () => {
      renderCart();
      openModal("cartModal");
    }
  );

  $("cartContent").addEventListener(
    "click",
    event => {

      const minus =
        event.target.closest(
          "[data-cart-minus]"
        );

      const plus =
        event.target.closest(
          "[data-cart-plus]"
        );

      if (minus) {
        changeQuantity(
          minus.dataset.cartMinus,
          -1
        );
      }

      if (plus) {
        changeQuantity(
          plus.dataset.cartPlus,
          1
        );
      }

    }
  );

  /* Checkout */

  $("checkoutButton").addEventListener(
    "click",
    () => {

      if (!currentUser) {
        closeModal("cartModal");

        switchAuthTab("login");

        openModal("authModal");

        showToast(
          "Connecte-toi pour commander."
        );

        return;
      }

      if (!cart.length) {
        showToast("Ton panier est vide.");
        return;
      }

      renderCheckout();

      closeModal("cartModal");

      openModal("checkoutModal");
    }
  );

  $("applyPromo").addEventListener(
    "click",
    applyPromo
  );

  $("promoCode").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyPromo();
      }
    }
  );

  $("checkoutForm").addEventListener(
    "submit",
    event => {
      event.preventDefault();

      if (
        $("payButton").disabled
      ) {
        showToast(
          "Utilise NOVA100 pour valider cette commande."
        );

        return;
      }

      createOrder();
    }
  );

  /* Auth tabs */

  $("loginTab").addEventListener(
    "click",
    () => switchAuthTab("login")
  );

  $("signupTab").addEventListener(
    "click",
    () => switchAuthTab("signup")
  );

  $("loginForm").addEventListener(
    "submit",
    loginWithEmail
  );

  $("signupForm").addEventListener(
    "submit",
    signup
  );

  $("googleButton").addEventListener(
    "click",
    loginGoogle
  );

  $("googleSignupButton").addEventListener(
    "click",
    loginGoogle
  );

  /* Hero */

  $("heroProducts").addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: document.querySelector(".products-head")
          ?.offsetTop || 0,
        behavior: "smooth"
      });

      playBop();
    }
  );

  $("heroOrders").addEventListener(
    "click",
    () => {

      if (!currentUser) {
        switchAuthTab("login");
        openModal("authModal");

        showToast(
          "Connecte-toi pour suivre une commande."
        );

        return;
      }

      renderOrders();
      openModal("ordersModal");
    }
  );

  /* Detail buttons */

  $("productContent").addEventListener(
    "click",
    event => {

      const add =
        event.target.closest(
          "[data-detail-add]"
        );

      const fav =
        event.target.closest(
          "[data-detail-fav]"
        );

      if (add) {
        addToCart(add.dataset.detailAdd);
      }

      if (fav) {
        toggleFavorite(
          fav.dataset.detailFav
        );
      }

    }
  );

  /* Close buttons */

  document
    .querySelectorAll("[data-close]")
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

  $("overlay").addEventListener(
    "click",
    closeAllModals
  );

  document.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        closeAllModals();
      }
    }
  );

  /* Print */

  $("printInvoice").addEventListener(
    "click",
    () => {
      window.print();
    }
  );
}

/* =========================================================
   FIREBASE AUTH STATE
========================================================= */

function setupFirebaseAuth() {
  if (!firebaseReady) {
    updateAccountUI();
    return;
  }

  onAuthStateChanged(
    auth,
    user => {

      currentUser = user;

      /*
        Le bouton Dashboard dépend uniquement
        de l'e-mail connecté.
      */

      updateAccountUI();

      if (user) {
        console.log(
          "NovaShop connecté :",
          user.email
        );
      } else {
        console.log(
          "NovaShop : utilisateur déconnecté"
        );
      }
    }
  );
}

/* =========================================================
   MIGRATION OLD ORDERS
========================================================= */

function migrateOrders() {
  let changed = false;

  orders = orders.map(order => {

    if (!order.status) {
      order.status = "En préparation";
      changed = true;
    }

    if (!order.truckLocation) {
      order.truckLocation =
        "Entrepôt";

      changed = true;
    }

    if (!order.destination) {
      order.destination =
        order.address?.city ||
        "France";

      changed = true;
    }

    if (!order.tracking) {
      order.tracking =
        "NOVA-TRK-" +
        randomId(7).toUpperCase();

      changed = true;
    }

    if (!Number.isFinite(
      Number(order.deliveryDurationSeconds)
    )) {

      const date =
        order.deliveryDate
          ? new Date(order.deliveryDate).getTime()
          : Date.now() +
            3 * 86400000;

      order.deliveryDurationSeconds =
        Math.max(
          0,
          Math.floor(
            (date - Date.now()) / 1000
          )
        );

      changed = true;
    }

    if (!Number.isFinite(
      Number(order.deliveryUpdatedAt)
    )) {

      order.deliveryUpdatedAt =
        Date.now();

      changed = true;
    }

    if (!order.deliveryDate) {

      order.deliveryDate =
        new Date(
          order.deliveryUpdatedAt +
          order.deliveryDurationSeconds *
          1000
        ).toISOString();

      changed = true;
    }

    return order;
  });

  if (changed) {
    saveJSON(STORAGE.orders, orders);
  }
}

/* =========================================================
   BOOT
========================================================= */

function boot() {
  migrateOrders();

  loadSettings();

  setupEvents();

  renderProducts();

  renderCart();

  updateCartCount();

  updateAccountUI();

  setupFirebaseAuth();

  console.log(
    "%cNovaShop prêt.",
    "font-weight:900;font-size:18px"
  );
}

boot();
