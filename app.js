// ============================================================
// NOVASHOP - APP.JS COMPLET
// Firebase Authentication + Firestore
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};


// ============================================================
// INITIALISATION FIREBASE
// ============================================================

let firebaseApp = null;
let firebaseAuth = null;
let db = null;

try {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);

  console.log("🔥 Firebase connecté.");
} catch (error) {
  console.error("Erreur Firebase :", error);
}


// ============================================================
// CONFIG NOVASHOP
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const STORAGE = {
  cart: "nova_cart",
  favorites: "nova_favorites",
  orders: "nova_orders",
  reviews: "nova_reviews",
  admin: "nova_admin_unlocked",
  dark: "nova_dark",
  sound: "nova_sound",
  profiles: "nova_profiles"
};


// ============================================================
// PRODUITS
// ============================================================

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
  }

];


// ============================================================
// PROMOTIONS
// ============================================================

const promos = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};


// ============================================================
// VARIABLES
// ============================================================

let currentUser = null;
let currentCategory = "Tous";
let searchTerm = "";
let currentProductId = null;
let currentPromo = null;
let ordersUnsubscribe = null;
let creatingOrder = false;


// ============================================================
// SELECTEUR
// ============================================================

const $ = id => document.getElementById(id);


// ============================================================
// LOCAL STORAGE
// ============================================================

function load(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;

  } catch {

    return fallback;

  }

}


function save(key, value) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value) {

  return new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR"
    }
  ).format(Number(value) || 0);

}


function dateFR(value) {

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(date);

}


function makeId() {

  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2)
  ).toUpperCase();

}


function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function normalizeText(value) {

  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

}


// ============================================================
// TOAST
// ============================================================

function toast(message) {

  const el = $("toast");

  if (!el) return;

  el.textContent = message;

  el.classList.add("show");

  clearTimeout(el._timer);

  el._timer = setTimeout(() => {

    el.classList.remove("show");

  }, 2500);

}


// ============================================================
// MODALES
// ============================================================

function openModal(id) {

  closeAllModals();

  const modal = $(id);

  if (!modal) return;

  modal.classList.add("open");

  if ($("overlay")) {
    $("overlay").style.display = "block";
  }

}


function closeModal(id) {

  const modal = $(id);

  if (modal) {
    modal.classList.remove("open");
  }

  if (!document.querySelector(".modal.open")) {

    if ($("overlay")) {
      $("overlay").style.display = "none";
    }

  }

}


function closeAllModals() {

  document
    .querySelectorAll(".modal.open")
    .forEach(modal => {
      modal.classList.remove("open");
    });

  if ($("overlay")) {
    $("overlay").style.display = "none";
  }

}


// ============================================================
// SON
// ============================================================

function playBop() {

  if (
    localStorage.getItem(STORAGE.sound) === "false"
  ) {
    return;
  }

  try {

    const AudioCtx =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();

    const gain = ctx.createGain();

    osc.frequency.value = 650;

    gain.gain.value = 0.035;

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    osc.stop(
      ctx.currentTime + 0.06
    );

  } catch {}

}


// ============================================================
// PANIER
// ============================================================

function cart() {

  return load(
    STORAGE.cart,
    []
  );

}


function setCart(items) {

  save(
    STORAGE.cart,
    items
  );

  renderCart();

  updateCartCount();

}


function favorites() {

  return load(
    STORAGE.favorites,
    []
  );

}


function isFavorite(id) {

  return favorites().includes(id);

}


function toggleFavorite(id) {

  const list = favorites();

  const index = list.indexOf(id);

  if (index >= 0) {

    list.splice(index, 1);

    toast("Retiré des favoris");

  } else {

    list.push(id);

    toast("Ajouté aux favoris ❤️");

  }

  save(
    STORAGE.favorites,
    list
  );

  renderProducts();

}


function addToCart(id) {

  const items = cart();

  const found =
    items.find(x => x.id === id);

  if (found) {

    found.qty++;

  } else {

    items.push({
      id,
      qty: 1
    });

  }

  setCart(items);

  playBop();

  toast(
    "Produit ajouté au panier 🛒"
  );

}


function changeQty(id, delta) {

  const items = cart();

  const found =
    items.find(x => x.id === id);

  if (!found) return;

  found.qty += delta;

  if (found.qty <= 0) {

    const index =
      items.indexOf(found);

    items.splice(
      index,
      1
    );

  }

  setCart(items);

}


function cartTotal() {

  return cart().reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      return total +
        (
          product
            ? product.price * item.qty
            : 0
        );

    },
    0
  );

}


function updateCartCount() {

  if (!$("cartCount")) return;

  $("cartCount").textContent =
    cart().reduce(
      (a, b) => a + b.qty,
      0
    );

}


// ============================================================
// AVIS
// ============================================================

function ratingData(productId) {

  const reviews =
    load(
      STORAGE.reviews,
      []
    ).filter(
      r => r.productId === productId
    );

  if (!reviews.length) {

    return {
      average: 0,
      count: 0,
      reviews: []
    };

  }

  const average =
    reviews.reduce(
      (sum, r) =>
        sum + Number(r.rating || 0),
      0
    ) / reviews.length;

  return {
    average,
    count: reviews.length,
    reviews
  };

}


function stars(value) {

  const rounded =
    Math.max(
      0,
      Math.min(
        5,
        Math.round(value || 0)
      )
    );

  return (
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded)
  );

}


// ============================================================
// PRODUITS
// ============================================================

function renderProducts() {

  const grid =
    $("productsGrid");

  if (!grid) return;

  let list =
    products.filter(product => {

      const categoryOk =
        currentCategory === "Tous" ||
        product.category === currentCategory;

      const searchOk =
        !searchTerm ||
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return categoryOk && searchOk;

    });

  const sort =
    $("sortSelect")?.value ||
    "relevance";

  if (sort === "priceAsc") {

    list.sort(
      (a, b) =>
        a.price - b.price
    );

  }

  if (sort === "priceDesc") {

    list.sort(
      (a, b) =>
        b.price - a.price
    );

  }

  if (sort === "name") {

    list.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );

  }

  if ($("resultsCount")) {

    $("resultsCount").textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;

  }

  if ($("emptyState")) {

    $("emptyState").style.display =
      list.length
        ? "none"
        : "block";

  }

  grid.innerHTML = "";

  list.forEach(product => {

    const rating =
      ratingData(product.id);

    const card =
      document.createElement("article");

    card.className = "card";

    card.dataset.productId =
      product.id;

    card.innerHTML = `

      <button
        class="favorite"
        data-favorite="${escapeHtml(product.id)}"
      >
        ${isFavorite(product.id) ? "❤️" : "♡"}
      </button>

      <img
        class="product-image"
        src="${escapeHtml(product.image)}"
        alt="${escapeHtml(product.name)}"
      >

      <div class="product-info">

        <div class="product-category">
          ${escapeHtml(product.category)}
        </div>

        <div class="product-name">
          ${escapeHtml(product.name)}
        </div>

        <div class="rating">

          ${
            rating.count
              ? `${stars(rating.average)}
                 ${rating.average.toFixed(1)}
                 (${rating.count})`
              : "☆☆☆☆☆ Aucun avis"
          }

        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="product-buttons">

          <button
            class="view"
            data-view="${escapeHtml(product.id)}"
          >
            Voir
          </button>

          <button
            class="add"
            data-add="${escapeHtml(product.id)}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const img =
      card.querySelector("img");

    img.addEventListener(
      "error",
      () => {

        img.src =
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="500"
                 height="350">
              <rect width="100%" height="100%"
                    fill="#f2f2f2"/>
              <text x="50%" y="50%"
                    dominant-baseline="middle"
                    text-anchor="middle"
                    font-family="Arial"
                    font-size="24"
                    fill="#777">
                Image indisponible
              </text>
            </svg>
          `);

      },
      { once: true }
    );

    grid.appendChild(card);

  });

}


// ============================================================
// PRODUIT
// ============================================================

function openProduct(id) {

  const product =
    products.find(
      p => p.id === id
    );

  if (!product) return;

  currentProductId = id;

  const data =
    ratingData(id);

  $("productContent").innerHTML = `

    <img
      src="${escapeHtml(product.image)}"
      style="
        width:100%;
        height:280px;
        object-fit:contain;
        background:white;
        border-radius:12px
      "
      alt="${escapeHtml(product.name)}"
    >

    <h2 style="margin-top:18px">
      ${escapeHtml(product.name)}
    </h2>

    <p style="color:var(--muted);margin-top:6px">
      ${escapeHtml(product.category)}
    </p>

    <div style="margin-top:12px">

      ${stars(data.average)}

      ${
        data.count
          ? ` ${data.average.toFixed(1)}/5`
          : " Aucun avis"
      }

    </div>

    <div class="price">
      ${money(product.price)}
    </div>

    <button
      class="primary"
      style="width:100%;margin-top:15px"
      id="modalAdd"
    >
      🛒 Ajouter au panier
    </button>

    <hr
      style="
        margin:22px 0;
        border:0;
        border-top:1px solid var(--border)
      "
    >

    <h3>
      Avis clients
    </h3>

    <div
      id="reviewsList"
      style="margin-top:12px"
    >

      ${
        data.reviews.length

          ? data.reviews
              .map(r => `

                <div class="cart-item">

                  <strong>
                    ${escapeHtml(r.name)}
                  </strong>

                  <div>
                    ${stars(r.rating)}
                  </div>

                  <p style="margin-top:5px">
                    ${escapeHtml(r.comment)}
                  </p>

                  <small style="color:var(--muted)">
                    ${dateFR(r.date)}
                  </small>

                </div>

              `)
              .join("")

          : `
            <p style="color:var(--muted);margin-top:10px">
              Aucun avis.
            </p>
          `
      }

    </div>

    ${
      currentUser

        ? `

          <h3 style="margin-top:20px">
            Laisser un avis
          </h3>

          <form
            class="form"
            id="reviewForm"
            style="margin-top:10px"
          >

            <label>
              Note
            </label>

            <select id="reviewRating">

              <option value="5">
                ★★★★★
              </option>

              <option value="4">
                ★★★★☆
              </option>

              <option value="3">
                ★★★☆☆
              </option>

              <option value="2">
                ★★☆☆☆
              </option>

              <option value="1">
                ★☆☆☆☆
              </option>

            </select>

            <label>
              Commentaire
            </label>

            <input
              id="reviewComment"
              maxlength="300"
              required
            >

            <button
              class="primary"
              type="submit"
            >
              Publier
            </button>

          </form>
        `

        : `

          <p
            style="
              margin-top:20px;
              color:var(--muted)
            "
          >
            Connecte-toi pour laisser un avis.
          </p>

        `
    }

  `;

  $("modalAdd").addEventListener(
    "click",
    () => addToCart(id)
  );

  const form =
    $("reviewForm");

  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        submitReview(id);

      }
    );

  }

  openModal(
    "productModal"
  );

}


// ============================================================
// AVIS
// ============================================================

function submitReview(productId) {

  if (!currentUser) return;

  const reviews =
    load(
      STORAGE.reviews,
      []
    );

  const already =
    reviews.some(
      r =>
        r.productId === productId &&
        r.userId === currentUser.uid
    );

  if (already) {

    toast(
      "Tu as déjà noté ce produit."
    );

    return;

  }

  const rawName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Client";

  const name =
    rawName.slice(0, 3) +
    "***";

  reviews.push({

    id: makeId(),

    productId,

    userId:
      currentUser.uid,

    name,

    rating:
      Number(
        $("reviewRating").value
      ),

    comment:
      $("reviewComment").value.trim(),

    date:
      new Date().toISOString()

  });

  save(
    STORAGE.reviews,
    reviews
  );

  toast(
    "Avis publié ⭐"
  );

  openProduct(
    productId
  );

}


// ============================================================
// PANIER AFFICHAGE
// ============================================================

function renderCart() {

  const items =
    cart();

  if (!items.length) {

    $("cartContent").innerHTML =
      `<p style="color:var(--muted)">
        Ton panier est vide.
      </p>`;

    $("cartTotal").textContent =
      money(0);

    return;

  }

  $("cartContent").innerHTML =
    items.map(item => {

      const p =
        products.find(
          x => x.id === item.id
        );

      if (!p) return "";

      return `

        <div class="cart-item">

          <div class="cart-row">

            <div>

              <strong>
                ${escapeHtml(p.name)}
              </strong>

              <div style="color:var(--muted)">
                ${money(p.price)}
              </div>

            </div>

            <div class="qty">

              <button
                data-minus="${escapeHtml(p.id)}"
              >
                −
              </button>

              <strong>
                ${item.qty}
              </strong>

              <button
                data-plus="${escapeHtml(p.id)}"
              >
                +
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");

  $("cartTotal").textContent =
    money(cartTotal());

}


// ============================================================
// CHECKOUT
// ============================================================

function renderCheckout() {

  const subtotal =
    cartTotal();

  const discount =
    currentPromo
      ? subtotal *
        (currentPromo.discount / 100)
      : 0;

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  $("checkoutSubtotal").textContent =
    money(subtotal);

  $("checkoutDiscount").textContent =
    "- " + money(discount);

  $("checkoutTotal").textContent =
    money(total);

}


// ============================================================
// PROMO
// ============================================================

function applyPromo() {

  const code =
    $("promoCode")
      .value
      .trim()
      .toUpperCase();

  if (!promos[code]) {

    currentPromo = null;

    $("promoMessage").textContent =
      "❌ Code invalide.";

    renderCheckout();

    return;

  }

  currentPromo = {

    code,

    discount:
      promos[code]

  };

  $("promoMessage").textContent =
    `✅ Code ${code} appliqué : ${promos[code]}%`;

  renderCheckout();

}


// ============================================================
// LIVRAISON
// ============================================================

function getDelivery(order) {

  const destination =
    order.destination ||
    order.address?.city ||
    "France";

  const updatedAt =
    Number(
      order.deliveryUpdatedAt ||
      Date.now()
    );

  const duration =
    Number(
      order.deliveryDurationSeconds ??
      Math.max(
        0,
        Math.floor(
          (
            new Date(
              order.deliveryDate ||
              Date.now()
            ).getTime() -
            updatedAt
          ) / 1000
        )
      )
    );

  return {

    status:
      order.status ||
      "Préparation",

    truckLocation:
      order.truckLocation ||
      "Entrepôt",

    destination,

    tracking:
      order.tracking ||
      "NOVA-TRK-N/A",

    durationSeconds:
      duration,

    updatedAt,

    deliveryDate:
      order.deliveryDate ||
      new Date(
        updatedAt +
        duration * 1000
      ).toISOString()

  };

}


function remaining(order) {

  const d =
    getDelivery(order);

  if (
    d.status === "Livrée"
  ) {
    return 0;
  }

  return Math.max(
    0,
    d.durationSeconds -
    Math.floor(
      (
        Date.now() -
        d.updatedAt
      ) / 1000
    )
  );

}


function durationText(seconds) {

  seconds =
    Math.max(
      0,
      Math.floor(seconds)
    );

  const days =
    Math.floor(
      seconds / 86400
    );

  seconds %= 86400;

  const hours =
    Math.floor(
      seconds / 3600
    );

  seconds %= 3600;

  const minutes =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `
    ${days}j
    ${String(hours).padStart(2, "0")}h
    ${String(minutes).padStart(2, "0")}m
    ${String(secs).padStart(2, "0")}s
  `.replace(/\s+/g, " ").trim();

}


// ============================================================
// COMMANDES LOCALES
// ============================================================

function ordersForUser() {

  if (!currentUser) {
    return [];
  }

  return load(
    STORAGE.orders,
    []
  )
  .filter(
    o =>
      o.userId === currentUser.uid ||
      o.email === currentUser.email
  )
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

}


// ============================================================
// AFFICHAGE COMMANDES
// ============================================================

function renderOrders() {

  if (!currentUser) {

    $("ordersContent").innerHTML =
      `<p>
        Connecte-toi pour voir tes commandes.
      </p>`;

    return;

  }

  const orders =
    ordersForUser();

  if (!orders.length) {

    $("ordersContent").innerHTML =
      `<p style="color:var(--muted)">
        Aucune commande.
      </p>`;

    return;

  }

  $("ordersContent").innerHTML =
    orders.map(order => {

      const d =
        getDelivery(order);

      const left =
        remaining(order);

      const progress =
        d.durationSeconds
          ? Math.max(
              5,
              Math.min(
                100,
                100 -
                (
                  left /
                  d.durationSeconds *
                  100
                )
              )
            )
          : 100;

      return `

        <div class="order">

          <strong>
            Commande #${escapeHtml(order.id)}
          </strong>

          <p style="margin-top:6px">
            ${dateFR(order.createdAt)}
          </p>

          <p style="margin-top:6px">
            Statut :
            <strong>
              ${escapeHtml(d.status)}
            </strong>
          </p>

          <div class="delivery">

            <div>
              📍 Camion :
              <strong>
                ${escapeHtml(d.truckLocation)}
              </strong>
            </div>

            <div>
              🎯 Destination :
              <strong>
                ${escapeHtml(d.destination)}
              </strong>
            </div>

            <div>
              🔎 Suivi :
              <strong>
                ${escapeHtml(d.tracking)}
              </strong>
            </div>

            <div class="countdown">

              ${
                d.status === "Livrée"

                  ? "✅ Livrée"

                  : left > 0

                    ? "⏱️ " +
                      durationText(left)

                    : "🚚 Arrivée imminente"
              }

            </div>

            <div>
              📅 ${dateFR(d.deliveryDate)}
            </div>

            <div class="progress">

              <span
                style="
                  width:${progress}%
                "
              ></span>

            </div>

          </div>

          <button
            class="secondary"
            style="margin-top:12px"
            data-invoice="${escapeHtml(order.id)}"
          >
            🧾 Facture
          </button>

        </div>

      `;

    }).join("");

}


// ============================================================
// ADMIN
// ============================================================

function isAdminEmail() {

  return (
    currentUser?.email
      ?.trim()
      .toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );

}


function isAdminUnlocked() {

  return (
    localStorage.getItem(
      STORAGE.admin
    ) === "true"
  );

}


function updateAccountUI() {

  if ($("accountButton")) {

    $("accountButton").textContent =
      currentUser
        ? "👤"
        : "🔐";

  }

  if ($("ordersButton")) {

    $("ordersButton").style.display =
      currentUser
        ? "inline-flex"
        : "none";

  }

  if ($("adminButton")) {

    $("adminButton").style.display =
      isAdminEmail()
        ? "inline-flex"
        : "none";

  }

}


function renderAccount() {

  if (!currentUser) {

    $("accountContent").innerHTML = `

      <p>
        Tu n'es pas connecté.
      </p>

      <button
        class="primary"
        style="width:100%;margin-top:15px"
        id="accountLogin"
      >
        Se connecter
      </button>

    `;

    $("accountLogin").addEventListener(
      "click",
      () => openModal("authModal")
    );

    return;

  }

  $("accountContent").innerHTML = `

    <h3>
      👤
      ${escapeHtml(
        currentUser.displayName ||
        "Compte NovaShop"
      )}
    </h3>

    <p style="margin-top:10px">
      ${escapeHtml(
        currentUser.email || ""
      )}
    </p>

    <button
      class="secondary"
      style="width:100%;margin-top:20px"
      id="accountOrders"
    >
      📦 Mes commandes
    </button>

    <button
      class="primary"
      style="width:100%;margin-top:10px"
      id="logoutButton"
    >
      Se déconnecter
    </button>

  `;

  $("accountOrders").addEventListener(
    "click",
    () => {

      renderOrders();

      openModal(
        "ordersModal"
      );

    }
  );

  $("logoutButton").addEventListener(
    "click",
    logoutUser
  );

}


// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {

  try {

    if (firebaseAuth) {

      await signOut(
        firebaseAuth
      );

    }

  } catch (error) {

    console.error(
      "Erreur déconnexion :",
      error
    );

  }

  currentUser = null;

  localStorage.removeItem(
    STORAGE.admin
  );

  if (ordersUnsubscribe) {

    ordersUnsubscribe();

    ordersUnsubscribe = null;

  }

  updateAccountUI();

  closeAllModals();

  toast(
    "Déconnecté."
  );

}


// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {

  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  const orders =
    load(
      STORAGE.orders,
      []
    );

  $("statOrders").textContent =
    orders.length;

  $("statFree").textContent =
    orders.filter(
      o =>
        Number(o.discount) === 100
    ).length;

  $("statCatalog").textContent =
    money(
      products.reduce(
        (a, p) =>
          a + p.price,
        0
      )
    );

  renderAdminOrders();

  renderAdminPromos();

}


function renderAdminOrders() {

  const orders =
    load(
      STORAGE.orders,
      []
    );

  if (!orders.length) {

    $("adminOrders").innerHTML =
      `<p style="color:var(--muted);margin-top:10px">
        Aucune commande.
      </p>`;

    return;

  }

  $("adminOrders").innerHTML =
    orders.map(order => {

      const d =
        getDelivery(order);

      const remainingOld =
        remaining(order);

      const days =
        Math.floor(
          remainingOld /
          86400
        );

      const hours =
        Math.floor(
          (
            remainingOld %
            86400
          ) / 3600
        );

      const minutes =
        Math.floor(
          (
            remainingOld %
            3600
          ) / 60
        );

      return `

        <div class="order">

          <strong>
            #${escapeHtml(order.id)}
          </strong>

          <p style="margin-top:7px">
            ${escapeHtml(order.email || "")}
          </p>

          <div class="admin-grid">

            <div class="admin-field">

              <label>
                Statut
              </label>

              <select
                data-field="status"
                data-order="${escapeHtml(order.id)}"
              >

                ${
                  [
                    "Préparation",
                    "En transit",
                    "Arrivée imminente",
                    "Livrée"
                  ]
                  .map(
                    x => `
                      <option
                        ${x === d.status ? "selected" : ""}
                      >
                        ${x}
                      </option>
                    `
                  )
                  .join("")
                }

              </select>

            </div>


            <div class="admin-field">

              <label>
                Suivi
              </label>

              <input
                data-field="tracking"
                data-order="${escapeHtml(order.id)}"
                value="${escapeHtml(d.tracking)}"
              >

            </div>


            <div class="admin-field">

              <label>
                📍 Camion actuellement
              </label>

              <input
                data-field="truckLocation"
                data-order="${escapeHtml(order.id)}"
                value="${escapeHtml(d.truckLocation)}"
              >

            </div>


            <div class="admin-field">

              <label>
                🎯 Destination
              </label>

              <input
                data-field="destination"
                data-order="${escapeHtml(order.id)}"
                value="${escapeHtml(d.destination)}"
              >

            </div>


            <div class="admin-field">

              <label>
                Jours
              </label>

              <input
                type="number"
                min="0"
                data-field="days"
                data-order="${escapeHtml(order.id)}"
                value="${days}"
              >

            </div>


            <div class="admin-field">

              <label>
                Heures
              </label>

              <input
                type="number"
                min="0"
                max="23"
                data-field="hours"
                data-order="${escapeHtml(order.id)}"
                value="${hours}"
              >

            </div>


            <div class="admin-field">

              <label>
                Minutes
              </label>

              <input
                type="number"
                min="0"
                max="59"
                data-field="minutes"
                data-order="${escapeHtml(order.id)}"
                value="${minutes}"
              >

            </div>


            <div class="admin-field">

              <label>
                Arrivée actuelle
              </label>

              <input
                readonly
                value="${escapeHtml(
                  dateFR(d.deliveryDate)
                )}"
              >

            </div>


            <div class="admin-full">

              <button
                class="save"
                data-save-delivery="${escapeHtml(order.id)}"
              >
                💾 Enregistrer la livraison
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");

}


function renderAdminPromos() {

  $("adminPromos").innerHTML =
    Object.entries(promos)
      .map(
        ([code, discount]) => `

          <div class="cart-item">

            <strong>
              ${escapeHtml(code)}
            </strong>

            <span style="float:right">
              ${discount}%
            </span>

          </div>

        `
      )
      .join("");

}


// ============================================================
// SAUVEGARDE LIVRAISON FIRESTORE
// ============================================================

async function saveDelivery(orderId) {

  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  const orders =
    load(
      STORAGE.orders,
      []
    );

  const order =
    orders.find(
      o => o.id === orderId
    );

  if (!order) return;


  const getField =
    field =>
      document.querySelector(
        `[data-field="${field}"][data-order="${orderId}"]`
      );


  const status =
    getField("status").value;


  const truckLocation =
    getField(
      "truckLocation"
    ).value.trim() ||
    "Entrepôt";


  const destination =
    getField(
      "destination"
    ).value.trim() ||
    "France";


  const tracking =
    getField(
      "tracking"
    ).value.trim() ||
    `NOVA-TRK-${orderId}`;


  const days =
    Math.max(
      0,
      Number(
        getField("days").value
      ) || 0
    );


  const hours =
    Math.min(
      23,
      Math.max(
        0,
        Number(
          getField("hours").value
        ) || 0
      )
    );


  const minutes =
    Math.min(
      59,
      Math.max(
        0,
        Number(
          getField("minutes").value
        ) || 0
      )
    );


  let duration =
    days * 86400 +
    hours * 3600 +
    minutes * 60;


  if (
    status === "Livrée"
  ) {
    duration = 0;
  }


  const now =
    Date.now();


  const updatedData = {

    status,

    truckLocation,

    destination,

    tracking,

    deliveryDurationSeconds:
      duration,

    deliveryUpdatedAt:
      now,

    deliveryDate:
      new Date(
        now +
        duration * 1000
      ).toISOString()

  };


  try {

    if (!db) {
      throw new Error(
        "Firestore indisponible."
      );
    }

    await updateDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      updatedData
    );


    Object.assign(
      order,
      updatedData
    );

    save(
      STORAGE.orders,
      orders
    );


    renderDashboard();

    renderOrders();

    toast(
      "Livraison synchronisée 🚚"
    );

  } catch (error) {

    console.error(
      "Erreur Firestore livraison :",
      error
    );

    toast(
      "Impossible de synchroniser la livraison."
    );

  }

}


// ============================================================
// VALIDATION MOT DE PASSE
// ============================================================

function validatePassword(password) {

  if (password.length < 6) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins 6 caractères."
    };

  }

  if (password.length > 30) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir maximum 30 caractères."
    };

  }

  if (!/[a-z]/.test(password)) {

    return {
      valid: false,
      message:
        "Ajoute au moins une lettre minuscule."
    };

  }

  if (!/[A-Z]/.test(password)) {

    return {
      valid: false,
      message:
        "Ajoute au moins une lettre majuscule."
    };

  }

  if (!/\d/.test(password)) {

    return {
      valid: false,
      message:
        "Ajoute au moins un chiffre."
    };

  }

  return {
    valid: true,
    message: ""
  };

}


// ============================================================
// VALIDATION ADRESSE FRANCE
// API GOUVERNEMENTALE
// ============================================================

async function validateFrenchAddress(
  address,
  postalCode,
  city
) {

  if (
    normalizeText(
      $("country")?.value
    ) !== "france"
  ) {
    return true;
  }

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => controller.abort(),
      8000
    );


  try {

    const params =
      new URLSearchParams({

        q:
          `${address}, ${postalCode} ${city}`,

        limit: "5"

      });


    const response =
      await fetch(
        `https://api-adresse.data.gouv.fr/search/?${params.toString()}`,
        {
          signal:
            controller.signal
        }
      );


    if (!response.ok) {
      throw new Error(
        "API adresse indisponible."
      );
    }


    const data =
      await response.json();


    const features =
      Array.isArray(
        data.features
      )
        ? data.features
        : [];


    const normalizedCity =
      normalizeText(city);


    const match =
      features.some(feature => {

        const props =
          feature.properties ||
          {};

        const featurePostal =
          String(
            props.postcode || ""
          ).trim();


        const featureCity =
          normalizeText(
            props.city ||
            props.citycode ||
            ""
          );


        return (
          featurePostal ===
            String(postalCode).trim() &&

          (
            featureCity ===
              normalizedCity ||

            normalizeText(
              props.city
            ) === normalizedCity
          )
        );

      });


    return match;

  } catch (error) {

    console.error(
      "Validation adresse :",
      error
    );

    return false;

  } finally {

    clearTimeout(
      timeout
    );

  }

}


// ============================================================
// CREATION COMMANDE
// ============================================================

async function createOrder() {

  if (creatingOrder) {
    return;
  }

  if (!currentUser) {

    openModal(
      "authModal"
    );

    return;

  }


  if (
    !currentPromo ||
    currentPromo.discount !== 100
  ) {

    toast(
      "Pour la démo, utilise le code NOVA100."
    );

    return;

  }


  const fullName =
    $("fullName").value.trim();

  const country =
    $("country").value.trim();

  const address =
    $("address").value.trim();

  const postalCode =
    $("postalCode").value.trim();

  const city =
    $("city").value.trim();


  if (
    !fullName ||
    !country ||
    !address ||
    !postalCode ||
    !city
  ) {

    toast(
      "Complète tous les champs."
    );

    return;

  }


  if (
    normalizeText(country) ===
      "france" &&
    !/^[0-9]{5}$/.test(
      postalCode
    )
  ) {

    toast(
      "Code postal français invalide."
    );

    return;

  }


  const items =
    cart();


  if (!items.length) {

    toast(
      "Panier vide."
    );

    return;

  }


  // ==========================================================
  // VALIDATION ADRESSE
  // ==========================================================

  if (
    normalizeText(country) ===
    "france"
  ) {

    toast(
      "🔎 Vérification de l'adresse..."
    );


    const valid =
      await validateFrenchAddress(
        address,
        postalCode,
        city
      );


    if (!valid) {

      toast(
        "❌ Adresse française invalide ou introuvable."
      );

      return;

    }

  }


  // ==========================================================
  // CREATION
  // ==========================================================

  creatingOrder = true;


  const button =
    $("payButton");


  if (button) {

    button.disabled = true;

    button.textContent =
      "⏳ Création...";

  }


  try {

    if (!db) {

      throw new Error(
        "Firestore indisponible."
      );

    }


    const subtotal =
      cartTotal();


    const orderId =
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();


    const tracking =
      "NOVA-TRK-" +
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();


    const now =
      Date.now();


    const duration =
      259200;


    const order = {

      id: orderId,

      userId:
        currentUser.uid,

      email:
        currentUser.email || "",

      customer: {

        name:
          fullName

      },

      address: {

        country,

        address,

        postalCode,

        city

      },

      items,

      subtotal,

      discount:
        100,

      total:
        0,

      promoCode:
        currentPromo.code,

      paymentStatus:
        "pending",

      status:
        "Préparation",

      truckLocation:
        "Entrepôt",

      destination:
        city,

      tracking,

      deliveryDurationSeconds:
        duration,

      deliveryUpdatedAt:
        now,

      deliveryDate:
        new Date(
          now +
          duration * 1000
        ).toISOString(),

      createdAt:
        new Date(
          now
        ).toISOString()

    };


    // ========================================================
    // FIRESTORE
    // ========================================================

    await setDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      order
    );


    // ========================================================
    // CACHE LOCAL
    // ========================================================

    const orders =
      load(
        STORAGE.orders,
        []
      );


    orders.unshift(
      order
    );


    save(
      STORAGE.orders,
      orders
    );


    setCart([]);


    currentPromo =
      null;


    $("promoCode").value =
      "";

    $("promoMessage").textContent =
      "";


    closeModal(
      "checkoutModal"
    );


    showInvoice(
      orderId
    );


    toast(
      "Commande créée 🎉"
    );


  } catch (error) {

    console.error(
      "Erreur création commande :",
      error
    );

    toast(
      "❌ Impossible de créer la commande."
    );

  } finally {

    creatingOrder =
      false;


    if (button) {

      button.disabled =
        false;

      button.textContent =
        "Continuer vers PayPal";

    }

  }

}


// ============================================================
// PAYPAL / DEMO
// ============================================================

async function startPaypal() {

  if (!currentUser) {

    openModal(
      "authModal"
    );

    return;

  }


  if (
    !currentPromo ||
    currentPromo.discount !== 100
  ) {

    toast(
      "Utilise NOVA100 pour la démo gratuite."
    );

    return;

  }


  await createOrder();

}


// ============================================================
// FACTURE
// ============================================================

function showInvoice(orderId) {

  const order =
    load(
      STORAGE.orders,
      []
    ).find(
      o => o.id === orderId
    );


  if (!order) {

    toast(
      "Commande introuvable."
    );

    return;

  }


  $("invoiceContent").innerHTML = `

    <div class="invoice">

      <div class="invoice-head">

        <div>

          <h2>
            NOVASHOP
          </h2>

          <p>
            Matériel gaming
          </p>

        </div>

        <div>

          <strong>
            FACTURE
          </strong>

          <p>
            #${escapeHtml(order.id)}
          </p>

        </div>

      </div>


      <p>

        <strong>
          Date :
        </strong>

        ${dateFR(order.createdAt)}

      </p>


      <p style="margin-top:12px">

        <strong>
          Client :
        </strong>

        <br>

        ${escapeHtml(
          order.customer?.name
        )}

        <br>

        ${escapeHtml(
          order.email
        )}

      </p>


      <p style="margin-top:12px">

        <strong>
          Livraison :
        </strong>

        <br>

        ${escapeHtml(
          order.address?.address
        )}

        <br>

        ${escapeHtml(
          order.address?.postalCode
        )}
        ${escapeHtml(
          order.address?.city
        )}

        <br>

        ${escapeHtml(
          order.address?.country
        )}

      </p>


      <table class="invoice-table">

        <thead>

          <tr>

            <th>
              Produit
            </th>

            <th>
              Qté
            </th>

            <th>
              Prix
            </th>

          </tr>

        </thead>


        <tbody>

          ${(
            order.items || []
          )
          .map(item => {

            const p =
              products.find(
                x => x.id === item.id
              );

            return `

              <tr>

                <td>
                  ${escapeHtml(
                    p?.name ||
                    "Produit"
                  )}
                </td>

                <td>
                  ${item.qty}
                </td>

                <td>
                  ${money(
                    (p?.price || 0) *
                    item.qty
                  )}
                </td>

              </tr>

            `;

          })
          .join("")}

        </tbody>

      </table>


      <div class="total">

        <span>
          Sous-total
        </span>

        <span>
          ${money(order.subtotal)}
        </span>

      </div>


      <div class="total">

        <span>
          Réduction
        </span>

        <span>
          -100%
        </span>

      </div>


      <div class="total">

        <span>
          Total
        </span>

        <span>
          ${money(order.total)}
        </span>

      </div>


      <p>

        <strong>
          Paiement :
        </strong>

        Code promotionnel

      </p>

    </div>

  `;


  openModal(
    "invoiceModal"
  );

}


// ============================================================
// ERREURS AUTH FIREBASE
// ============================================================

function showAuthError(error) {

  console.error(
    "Firebase Auth :",
    error
  );


  const code =
    error?.code || "";


  const messages = {

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/operation-not-allowed":
      "La connexion e-mail/mot de passe n'est pas activée dans Firebase.",

    "auth/configuration-not-found":
      "Firebase Authentication n'est pas correctement configuré.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/network-request-failed":
      "Problème de connexion Internet.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/popup-closed-by-user":
      "Fenêtre Google fermée.",

    "auth/popup-blocked":
      "La fenêtre Google a été bloquée.",

    "auth/cancelled-popup-request":
      "Une autre fenêtre de connexion est déjà ouverte.",

    "auth/app/invalid-api-key":
      "Clé API Firebase invalide.",

    "auth/invalid-api-key":
      "Clé API Firebase invalide."

  };


  toast(
    messages[code] ||
    (
      code
        ? `Erreur Firebase : ${code}`
        : "Erreur de connexion."
    )
  );

}


// ============================================================
// CONNEXION EMAIL
// ============================================================

async function loginEmail(event) {

  event.preventDefault();


  if (!firebaseAuth) {

    toast(
      "Firebase n'est pas disponible."
    );

    return;

  }


  const email =
    $("loginEmail")
      .value
      .trim();

  const password =
    $("loginPassword")
      .value;


  if (!email || !password) {

    toast(
      "Remplis tous les champs."
    );

    return;

  }


  try {

    await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );


    closeModal(
      "authModal"
    );


    toast(
      "Connexion réussie 👋"
    );


  } catch (error) {

    showAuthError(
      error
    );

  }

}


// ============================================================
// CREATION COMPTE
// ============================================================

async function signupEmail(event) {

  event.preventDefault();


  if (!firebaseAuth) {

    toast(
      "Firebase n'est pas disponible."
    );

    return;

  }


  const email =
    $("signupEmail")
      .value
      .trim();

  const phone =
    $("signupPhone")
      .value
      .trim();

  const password =
    $("signupPassword")
      .value;

  const confirm =
    $("signupConfirm")
      .value;


  // ==========================================================
  // EMAIL
  // ==========================================================

  if (!email) {

    toast(
      "Entre ton adresse e-mail."
    );

    return;

  }


  // ==========================================================
  // TELEPHONE
  // ==========================================================

  const phoneDigits =
    phone.replace(
      /\D/g,
      ""
    );


  if (
    phoneDigits.length < 8
  ) {

    toast(
      "Numéro de téléphone invalide."
    );

    return;

  }


  // ==========================================================
  // MOT DE PASSE
  // ==========================================================

  const passwordCheck =
    validatePassword(
      password
    );


  if (
    !passwordCheck.valid
  ) {

    toast(
      "❌ " +
      passwordCheck.message
    );

    return;

  }


  if (
    password !== confirm
  ) {

    toast(
      "Les mots de passe ne correspondent pas."
    );

    return;

  }


  try {

    const result =
      await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );


    // ========================================================
    // PROFIL FIRESTORE
    // ========================================================

    if (db) {

      await setDoc(
        doc(
          db,
          "users",
          result.user.uid
        ),
        {

          email,

          phone,

          createdAt:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString()

        },
        {
          merge: true
        }
      );

    }


    // ========================================================
    // CACHE LOCAL
    // ========================================================

    const profiles =
      load(
        STORAGE.profiles,
        {}
      );


    profiles[
      result.user.uid
    ] = {

      phone,

      email

    };


    save(
      STORAGE.profiles,
      profiles
    );


    closeModal(
      "authModal"
    );


    toast(
      "Compte créé 🎉"
    );


  } catch (error) {

    showAuthError(
      error
    );

  }

}


// ============================================================
// GOOGLE
// ============================================================

async function googleLogin() {

  if (!firebaseAuth) {

    toast(
      "Firebase n'est pas disponible."
    );

    return;

  }


  try {

    const provider =
      new GoogleAuthProvider();


    await signInWithPopup(
      firebaseAuth,
      provider
    );


    closeModal(
      "authModal"
    );


    toast(
      "Connexion Google réussie."
    );


  } catch (error) {

    showAuthError(
      error
    );

  }

}


// ============================================================
// SYNCHRONISATION FIRESTORE COMMANDES
// ============================================================

function listenOrders() {

  if (ordersUnsubscribe) {

    ordersUnsubscribe();

    ordersUnsubscribe =
      null;

  }


  if (
    !currentUser ||
    !db
  ) {
    return;
  }


  try {

    let ordersQuery;


    if (isAdminEmail()) {

      ordersQuery =
        collection(
          db,
          "orders"
        );

    } else {

      ordersQuery =
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

    }


    ordersUnsubscribe =
      onSnapshot(
        ordersQuery,

        snapshot => {

          const orders =
            snapshot.docs
              .map(
                document => {

                  const data =
                    document.data();

                  return {

                    ...data,

                    id:
                      data.id ||
                      document.id

                  };

                }
              )
              .sort(
                (a, b) =>
                  new Date(
                    b.createdAt || 0
                  ) -
                  new Date(
                    a.createdAt || 0
                  )
              );


          save(
            STORAGE.orders,
            orders
          );


          if (
            $("ordersModal")
              ?.classList
              .contains("open")
          ) {

            renderOrders();

          }


          if (
            $("dashboardModal")
              ?.classList
              .contains("open")
          ) {

            renderDashboard();

          }

        },

        error => {

          console.error(
            "Synchronisation Firestore :",
            error
          );

          toast(
            "⚠️ Synchronisation des commandes impossible."
          );

        }
      );


  } catch (error) {

    console.error(
      "Erreur listener Firestore :",
      error
    );

  }

}


// ============================================================
// PROFIL UTILISATEUR
// ============================================================

async function syncUserProfile() {

  if (
    !currentUser ||
    !db
  ) {
    return;
  }


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid
      ),
      {

        email:
          currentUser.email || "",

        displayName:
          currentUser.displayName || "",

        updatedAt:
          new Date().toISOString()

      },
      {
        merge: true
      }
    );

  } catch (error) {

    console.warn(
      "Profil Firestore non synchronisé :",
      error
    );

  }

}


// ============================================================
// AUTH STATE
// ============================================================

if (firebaseAuth) {

  onAuthStateChanged(
    firebaseAuth,
    async user => {

      currentUser =
        user || null;


      if (
        !isAdminEmail()
      ) {

        localStorage.removeItem(
          STORAGE.admin
        );

      }


      updateAccountUI();


      if ($("accountModal")
        ?.classList
        .contains("open")) {

        renderAccount();

      }


      if (currentUser) {

        await syncUserProfile();

      }


      listenOrders();

    }
  );

}


// ============================================================
// EVENTS
// ============================================================

function setupEvents() {


  // ==========================================================
  // RECHERCHE
  // ==========================================================

  $("searchButton")
    ?.addEventListener(
      "click",
      () => {

        searchTerm =
          $("searchInput")
            .value
            .trim();

        renderProducts();

      }
    );


  $("searchInput")
    ?.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          searchTerm =
            event.target
              .value
              .trim();

          renderProducts();

        }

      }
    );


  // ==========================================================
  // TRI
  // ==========================================================

  $("sortSelect")
    ?.addEventListener(
      "change",
      renderProducts
    );


  // ==========================================================
  // CATEGORIES
  // ==========================================================

  document
    .querySelectorAll(
      ".category"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".category"
            )
            .forEach(x =>
              x.classList.remove(
                "active"
              )
            );


          button.classList.add(
            "active"
          );


          currentCategory =
            button.dataset.category;


          renderProducts();

        }
      );

    });


  // ==========================================================
  // PRODUITS
  // ==========================================================

  $("productsGrid")
    ?.addEventListener(
      "click",
      event => {

        const favorite =
          event.target.closest(
            "[data-favorite]"
          );

        const view =
          event.target.closest(
            "[data-view]"
          );

        const add =
          event.target.closest(
            "[data-add]"
          );


        if (favorite) {

          toggleFavorite(
            favorite.dataset.favorite
          );

        }


        if (view) {

          openProduct(
            view.dataset.view
          );

        }


        if (add) {

          addToCart(
            add.dataset.add
          );

        }

      }
    );


  // ==========================================================
  // PANIER
  // ==========================================================

  $("cartContent")
    ?.addEventListener(
      "click",
      event => {

        const plus =
          event.target.closest(
            "[data-plus]"
          );

        const minus =
          event.target.closest(
            "[data-minus]"
          );


        if (plus) {

          changeQty(
            plus.dataset.plus,
            1
          );

        }


        if (minus) {

          changeQty(
            minus.dataset.minus,
            -1
          );

        }

      }
    );


  $("cartButton")
    ?.addEventListener(
      "click",
      () => {

        renderCart();

        openModal(
          "cartModal"
        );

      }
    );


  // ==========================================================
  // COMPTE
  // ==========================================================

  $("accountButton")
    ?.addEventListener(
      "click",
      () => {

        renderAccount();

        openModal(
          "accountModal"
        );

      }
    );


  // ==========================================================
  // COMMANDES
  // ==========================================================

  $("ordersButton")
    ?.addEventListener(
      "click",
      () => {

        renderOrders();

        openModal(
          "ordersModal"
        );

      }
    );


  $("heroOrders")
    ?.addEventListener(
      "click",
      () => {

        if (!currentUser) {

          openModal(
            "authModal"
          );

          return;

        }

        renderOrders();

        openModal(
          "ordersModal"
        );

      }
    );


  // ==========================================================
  // PRODUITS HERO
  // ==========================================================

  $("heroProducts")
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            ".products-head"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );


  // ==========================================================
  // CHECKOUT
  // ==========================================================

  $("checkoutButton")
    ?.addEventListener(
      "click",
      () => {

        if (!currentUser) {

          openModal(
            "authModal"
          );

          return;

        }


        if (!cart().length) {

          toast(
            "Ton panier est vide."
          );

          return;

        }


        renderCheckout();

        openModal(
          "checkoutModal"
        );

      }
    );


  $("applyPromo")
    ?.addEventListener(
      "click",
      applyPromo
    );


  $("checkoutForm")
    ?.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        startPaypal();

      }
    );


  // ==========================================================
  // AUTH
  // ==========================================================

  $("loginForm")
    ?.addEventListener(
      "submit",
      loginEmail
    );


  $("signupForm")
    ?.addEventListener(
      "submit",
      signupEmail
    );


  $("googleButton")
    ?.addEventListener(
      "click",
      googleLogin
    );


  $("googleSignupButton")
    ?.addEventListener(
      "click",
      googleLogin
    );


  // ==========================================================
  // TABS
  // ==========================================================

  $("loginTab")
    ?.addEventListener(
      "click",
      () => {

        $("loginTab")
          .classList
          .add("active");

        $("signupTab")
          .classList
          .remove("active");


        $("loginForm")
          .classList
          .remove("hidden");

        $("signupForm")
          .classList
          .add("hidden");

      }
    );


  $("signupTab")
    ?.addEventListener(
      "click",
      () => {

        $("signupTab")
          .classList
          .add("active");

        $("loginTab")
          .classList
          .remove("active");


        $("signupForm")
          .classList
          .remove("hidden");

        $("loginForm")
          .classList
          .add("hidden");

      }
    );


  // ==========================================================
  // ADMIN DASHBOARD
  // ==========================================================

  $("adminButton")
    ?.addEventListener(
      "click",
      () => {

        if (!currentUser) {

          openModal(
            "authModal"
          );

          return;

        }


        if (!isAdminEmail()) {

          toast(
            "Compte non autorisé."
          );

          return;

        }


        if (!isAdminUnlocked()) {

          const code =
            prompt(
              "Code Dashboard NovaShop :"
            );


          if (
            code !==
            ADMIN_CODE
          ) {

            toast(
              "Code incorrect."
            );

            return;

          }


          localStorage.setItem(
            STORAGE.admin,
            "true"
          );

        }


        renderDashboard();

        openModal(
          "dashboardModal"
        );

      }
    );


  $("adminOrders")
    ?.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "[data-save-delivery]"
          );


        if (button) {

          saveDelivery(
            button.dataset.saveDelivery
          );

        }

      }
    );


  // ==========================================================
  // FACTURES
  // ==========================================================

  $("ordersContent")
    ?.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "[data-invoice]"
          );


        if (button) {

          showInvoice(
            button.dataset.invoice
          );

        }

      }
    );


  // ==========================================================
  // PARAMETRES
  // ==========================================================

  $("settingsButton")
    ?.addEventListener(
      "click",
      () => {

        $("darkSwitch").checked =
          localStorage.getItem(
            STORAGE.dark
          ) === "true";


        $("soundSwitch").checked =
          localStorage.getItem(
            STORAGE.sound
          ) !== "false";


        openModal(
          "settingsModal"
        );

      }
    );


  $("darkSwitch")
    ?.addEventListener(
      "change",
      event => {

        document.body.classList.toggle(
          "dark",
          event.target.checked
        );


        localStorage.setItem(
          STORAGE.dark,
          String(
            event.target.checked
          )
        );

      }
    );


  $("soundSwitch")
    ?.addEventListener(
      "change",
      event => {

        localStorage.setItem(
          STORAGE.sound,
          String(
            event.target.checked
          )
        );

      }
    );


  // ==========================================================
  // IMPRESSION FACTURE
  // ==========================================================

  $("printInvoice")
    ?.addEventListener(
      "click",
      () => window.print()
    );


  // ==========================================================
  // FERMETURE MODALES
  // ==========================================================

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


  $("overlay")
    ?.addEventListener(
      "click",
      closeAllModals
    );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeAllModals();

      }

    }
  );

}


// ============================================================
// BOOT
// ============================================================

function boot() {

  document.body.classList.toggle(
    "dark",
    localStorage.getItem(
      STORAGE.dark
    ) === "true"
  );


  setupEvents();

  renderProducts();

  renderCart();

  updateCartCount();

  updateAccountUI();


  // Mise à jour du compte à rebours
  setInterval(
    () => {

      if (
        $("ordersModal")
          ?.classList
          .contains("open")
      ) {

        renderOrders();

      }

    },
    1000
  );

}


boot();

console.log(
  "🚀 NovaShop chargé."
);
