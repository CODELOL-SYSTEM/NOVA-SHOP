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

const DELIVERY_STATUSES = [
  {
    key: "preparation",
    label: "En préparation",
    progress: 20
  },
  {
    key: "expediee",
    label: "Expédiée",
    progress: 45
  },
  {
    key: "transit",
    label: "En transit",
    progress: 75
  },
  {
    key: "livree",
    label: "Livrée",
    progress: 100
  }
];

/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS = [
  {
    id: "b650-aorus",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },
  {
    id: "pc-7800x3d",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },
  {
    id: "cloud2",
    name: "HyperX Cloud II – Casque gaming",
    category: "Casques",
    price: 49.99,
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
  },
  {
    id: "tecors60",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },
  {
    id: "celshading65",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },
  {
    id: "ajazz-aj199",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },
  {
    id: "gpro-superstrike",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },
  {
    id: "990pro1",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4"
  },
  {
    id: "990pro2",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp"
  },
  {
    id: "rm1000x",
    name: "CORSAIR RM1000x (EU)",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },
  {
    id: "rm850x",
    name: "CORSAIR RM850x (EU)",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },
  {
    id: "frame5000",
    name: "Corsair Frame 5000D RS ARGB (Noir)",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },
  {
    id: "arctic360",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },
  {
    id: "odyssey-g6",
    name: 'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },
  {
    id: "wave-arm",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
  },
  {
    id: "dualsense-red",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },
  {
    id: "asus-b650",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg"
  },
  {
    id: "msi-tomahawk",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  }
];

/* =========================================================
   STATE
========================================================= */

let state = {
  category: "Tous",
  search: "",
  sort: "relevance",
  cart: load("nova_cart_v5", []),
  favorites: load("nova_favorites_v5", []),
  orders: load("nova_orders_v5", []),
  reviews: load("nova_reviews_v5", []),
  settings: load("nova_settings_v5", {
    dark: false,
    sound: true
  })
};

let currentProductId = null;

/* =========================================================
   HELPERS
========================================================= */

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return Number(value).toLocaleString("fr-FR", {
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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function beep() {
  if (!state.settings.sound) return;

  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 520;
    gain.gain.value = 0.035;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.055);
  } catch {}
}

function openModal(id) {
  document.querySelectorAll(".modal.show").forEach(m => m.classList.remove("show"));
  document.getElementById("overlay").classList.add("show");
  document.getElementById(id).classList.add("show");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("show");

  if (!document.querySelector(".modal.show")) {
    document.getElementById("overlay").classList.remove("show");
  }
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function currentEmail() {
  return currentUser?.email?.toLowerCase() || "";
}

function isAdmin() {
  return currentEmail() === ADMIN_EMAIL.toLowerCase();
}

function currentDisplayName() {
  if (currentUser?.displayName) return currentUser.displayName;

  if (currentUser?.email) {
    return currentUser.email.split("@")[0];
  }

  return "Client";
}

/* =========================================================
   DELIVERY
========================================================= */

function getDeliveryStatus(key) {
  return DELIVERY_STATUSES.find(s => s.key === key) || DELIVERY_STATUSES[0];
}

function deliveryCountdown(date, statusKey) {
  if (statusKey === "livree") {
    return "Livrée";
  }

  const target = new Date(date).getTime();

  if (!Number.isFinite(target)) {
    return "Date non définie";
  }

  const diff = target - Date.now();

  if (diff <= 0) {
    return "Livraison prévue aujourd'hui";
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  if (days > 0) {
    return `${days} j ${hours} h ${minutes} min`;
  }

  return `${hours} h ${minutes} min`;
}

function defaultDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(18, 0, 0, 0);
  return d.toISOString();
}

/* =========================================================
   PRODUCTS
========================================================= */

function filteredProducts() {
  let list = [...PRODUCTS];

  if (state.category !== "Tous") {
    list = list.filter(p => p.category === state.category);
  }

  if (state.search.trim()) {
    const q = state.search.toLowerCase();

    list = list.filter(p =>
      `${p.name} ${p.category}`.toLowerCase().includes(q)
    );
  }

  if (state.sort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (state.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  return list;
}

function productRating(productId) {
  const rows = state.reviews.filter(r => r.productId === productId);

  if (!rows.length) {
    return {
      average: 0,
      count: 0
    };
  }

  const average =
    rows.reduce((sum, r) => sum + Number(r.rating), 0) / rows.length;

  return {
    average,
    count: rows.length
  };
}

function stars(value) {
  const rounded = Math.round(value);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  const list = filteredProducts();

  document.getElementById("resultCount").textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  grid.innerHTML = "";

  empty.classList.toggle("show", list.length === 0);

  list.forEach(product => {
    const rating = productRating(product.id);
    const fav = state.favorites.includes(product.id);

    const card = document.createElement("article");
    card.className = "product";
    card.dataset.product = product.id;

    card.innerHTML = `
      <button class="favorite ${fav ? "active" : ""}" data-favorite="${product.id}">
        ${fav ? "♥" : "♡"}
      </button>

      <div class="productImg">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >
      </div>

      <div class="productBody">
        <div class="categoryLabel">${escapeHTML(product.category)}</div>

        <h3>${escapeHTML(product.name)}</h3>

        <div class="rating">
          ${stars(rating.average)}
          <span>
            ${rating.count ? `${rating.average.toFixed(1)} (${rating.count})` : "Pas encore noté"}
          </span>
        </div>

        <div class="price">${money(product.price)}</div>

        <div class="productActions">
          <button class="viewBtn" data-view="${product.id}">
            Voir
          </button>

          <button class="addBtn" data-add="${product.id}">
            🛒 Ajouter
          </button>
        </div>
      </div>
    `;

    const image = card.querySelector("img");

    image.addEventListener("error", () => {
      card.remove();
      updateEmptyAfterImage();
    }, {
      once: true
    });

    grid.appendChild(card);
  });
}

function updateEmptyAfterImage() {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");

  if (!grid.children.length) {
    empty.classList.add("show");
  }
}

/* =========================================================
   CART
========================================================= */

function cartQuantity() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cartQuantity();
}

function addToCart(id) {
  const existing = state.cart.find(x => x.id === id);

  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({
      id,
      qty: 1
    });
  }

  save("nova_cart_v5", state.cart);
  updateCartCount();
  beep();
  showToast("Produit ajouté au panier 🛒");
}

function removeFromCart(id) {
  state.cart = state.cart.filter(x => x.id !== id);
  save("nova_cart_v5", state.cart);
  renderCart();
  updateCartCount();
}

function changeQty(id, amount) {
  const item = state.cart.find(x => x.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    state.cart = state.cart.filter(x => x.id !== id);
  }

  save("nova_cart_v5", state.cart);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const box = document.getElementById("cartItems");

  if (!state.cart.length) {
    box.innerHTML = `
      <div style="text-align:center;padding:40px 10px;color:#70757d">
        <div style="font-size:42px">🛒</div>
        <strong>Ton panier est vide</strong>
      </div>
    `;
  } else {
    box.innerHTML = state.cart.map(item => {
      const p = getProduct(item.id);

      if (!p) return "";

      return `
        <div class="cartItem">
          <img src="${p.image}" alt="">
          <div>
            <strong>${escapeHTML(p.name)}</strong>
            <div style="margin-top:5px">${money(p.price)}</div>

            <div class="qty">
              <button data-qty-minus="${p.id}">−</button>
              <strong>${item.qty}</strong>
              <button data-qty-plus="${p.id}">+</button>
              <button style="margin-left:5px" data-remove="${p.id}">
                🗑️
              </button>
            </div>
          </div>

          <strong>${money(p.price * item.qty)}</strong>
        </div>
      `;
    }).join("");
  }

  const subtotal = cartSubtotal();

  document.getElementById("cartSubtotal").textContent = money(subtotal);
  document.getElementById("cartTotal").textContent = money(subtotal);
}

/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(x => x !== id);
    showToast("Retiré des favoris");
  } else {
    state.favorites.push(id);
    showToast("Ajouté aux favoris ❤️");
  }

  save("nova_favorites_v5", state.favorites);
  renderProducts();
}

/* =========================================================
   PRODUCT DETAIL + REVIEWS
========================================================= */

function openProduct(id) {
  const p = getProduct(id);

  if (!p) return;

  currentProductId = id;

  const rating = productRating(id);
  const reviews = state.reviews.filter(r => r.productId === id);

  document.getElementById("productDetail").innerHTML = `
    <div class="productDetail">

      <div class="detailImage">
        <img src="${p.image}" alt="${escapeHTML(p.name)}">
      </div>

      <div>
        <div class="categoryLabel">${escapeHTML(p.category)}</div>

        <h1 style="margin-top:8px;font-size:28px">
          ${escapeHTML(p.name)}
        </h1>

        <div class="rating" style="font-size:17px;margin-top:13px">
          ${stars(rating.average)}
          <span>
            ${rating.count ? `${rating.average.toFixed(1)} / 5` : "Pas encore de note"}
          </span>
        </div>

        <div class="detailPrice">${money(p.price)}</div>

        <button class="primary" data-detail-add="${p.id}">
          🛒 Ajouter au panier
        </button>

        <div style="margin-top:28px">
          <h3>Avis clients</h3>

          ${
            reviews.length
              ? reviews.map(r => `
                  <div class="review">
                    <div class="reviewStars">
                      ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
                    </div>
                    <strong>${escapeHTML(r.name)}</strong>
                    <div style="font-size:13px;color:#70757d">
                      ${escapeHTML(r.date)}
                    </div>
                    <p style="margin-top:6px">
                      ${escapeHTML(r.comment)}
                    </p>
                  </div>
                `).join("")
              : `<p class="note">Aucun avis pour le moment.</p>`
          }

          <div style="margin-top:18px">
            <h3>Laisser un avis</h3>

            ${
              currentUser
                ? `
                  <div class="formGrid" style="margin-top:10px">
                    <div class="field">
                      <label>Note</label>
                      <select id="reviewRating">
                        <option value="5">★★★★★</option>
                        <option value="4">★★★★☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="1">★☆☆☆☆</option>
                      </select>
                    </div>

                    <div class="field">
                      <label>Commentaire</label>
                      <input id="reviewComment" maxlength="250">
                    </div>
                  </div>

                  <button class="primary" id="submitReview">
                    Publier mon avis
                  </button>
                `
                : `<p class="note">Connecte-toi pour publier un avis.</p>`
            }
          </div>
        </div>
      </div>

    </div>
  `;

  openModal("productModal");
}

/* =========================================================
   AUTH
========================================================= */

function updateAuthUI() {
  const adminButton = document.getElementById("adminButton");

  adminButton.style.display = isAdmin() ? "block" : "none";

  document.getElementById("accountButton").textContent =
    currentUser ? `👤 ${currentDisplayName()}` : "👤 Compte";
}

function renderAccount() {
  const body = document.getElementById("accountBody");

  if (!currentUser) {
    body.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:48px">👤</div>
        <h3>Bienvenue sur NovaShop</h3>
        <p class="note">
          Connecte-toi pour gérer tes commandes et laisser des avis.
        </p>
        <button class="primary" id="accountLogin">
          Se connecter
        </button>
      </div>
    `;

    return;
  }

  body.innerHTML = `
    <div style="background:#f7f8fa;border-radius:10px;padding:16px">
      <div style="font-size:12px;color:#70757d">Compte</div>
      <h3 style="margin-top:5px">${escapeHTML(currentDisplayName())}</h3>
      <div style="margin-top:5px">${escapeHTML(currentUser.email || "")}</div>
    </div>

    <button class="primary" id="accountOrders">
      📦 Mes commandes
    </button>

    <button class="secondary" id="accountLogout">
      Se déconnecter
    </button>
  `;
}

async function login(email, password) {
  if (!firebaseReady) {
    showToast("Firebase n'est pas configuré.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeModal("authModal");
    showToast("Connexion réussie 👋");
  } catch (error) {
    console.error(error);
    showToast(firebaseError(error));
  }
}

async function signup(email, phone, password, password2) {
  if (password !== password2) {
    showToast("Les mots de passe ne correspondent pas.");
    return;
  }

  if (!firebaseReady) {
    showToast("Firebase n'est pas configuré.");
    return;
  }

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    localStorage.setItem(
      `nova_phone_${credential.user.uid}`,
      phone
    );

    closeModal("authModal");
    showToast("Compte créé 🎉");
  } catch (error) {
    console.error(error);
    showToast(firebaseError(error));
  }
}

async function loginGoogle() {
  if (!firebaseReady) {
    showToast("Firebase n'est pas configuré.");
    return;
  }

  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    closeModal("authModal");
    showToast("Connexion Google réussie.");
  } catch (error) {
    console.error(error);
    showToast(firebaseError(error));
  }
}

async function logout() {
  try {
    if (firebaseReady) {
      await signOut(auth);
    }

    currentUser = null;
    updateAuthUI();
    renderAccount();

    showToast("Déconnexion effectuée.");
  } catch (error) {
    console.error(error);
  }
}

function firebaseError(error) {
  const code = error?.code || "";

  if (code.includes("invalid-credential")) {
    return "E-mail ou mot de passe incorrect.";
  }

  if (code.includes("email-already-in-use")) {
    return "Cet e-mail est déjà utilisé.";
  }

  if (code.includes("weak-password")) {
    return "Mot de passe trop faible.";
  }

  if (code.includes("popup-closed")) {
    return "Fenêtre Google fermée.";
  }

  if (code.includes("unauthorized-domain")) {
    return "Domaine GitHub Pages non autorisé dans Firebase.";
  }

  return "Une erreur Firebase est survenue.";
}

/* =========================================================
   ORDERS
========================================================= */

function orderNumber() {
  return "NS-" +
    Date.now().toString().slice(-8) +
    "-" +
    Math.floor(100 + Math.random() * 900);
}

function createOrder() {
  if (!currentUser) {
    showToast("Connecte-toi avant de commander.");
    openModal("authModal");
    return;
  }

  if (!state.cart.length) {
    showToast("Ton panier est vide.");
    return;
  }

  const name = document.getElementById("fullName").value.trim();
  const address = document.getElementById("address").value.trim();
  const postalCode = document.getElementById("postalCode").value.trim();
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();

  if (!name || !address || !postalCode || !city || !country) {
    showToast("Complète toute l'adresse.");
    return;
  }

  const promo = document
    .getElementById("promoCode")
    .value
    .trim()
    .toUpperCase();

  const subtotal = cartSubtotal();
  const discountPercent = PROMOS[promo] || 0;

  const discount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discount);

  if (total > 0) {
    showToast("Utilise NOVA100 pour une commande de démonstration à 0 €.");
    return;
  }

  const order = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),

    number: orderNumber(),

    userUid: currentUser.uid,
    userEmail: currentUser.email,

    customerName: name,

    address: {
      address,
      postalCode,
      city,
      country
    },

    items: state.cart.map(item => {
      const p = getProduct(item.id);

      return {
        id: p.id,
        name: p.name,
        price: p.price,
        qty: item.qty,
        image: p.image
      };
    }),

    subtotal,
    discount,
    total,

    promo,

    status: "preparation",

    createdAt: new Date().toISOString(),

    deliveryDate: defaultDeliveryDate(),

    tracking: ""
  };

  state.orders.unshift(order);

  save("nova_orders_v5", state.orders);

  state.cart = [];

  save("nova_cart_v5", state.cart);

  updateCartCount();
  renderCart();

  closeModal("checkoutModal");

  showToast("Commande créée 🎉");

  setTimeout(() => {
    showInvoice(order);
  }, 300);
}

function renderOrders() {
  const body = document.getElementById("ordersBody");

  if (!currentUser) {
    body.innerHTML = `
      <div style="text-align:center;padding:30px">
        <h3>Connecte-toi pour voir tes commandes.</h3>
        <button class="primary" id="ordersLogin">
          Se connecter
        </button>
      </div>
    `;

    return;
  }

  const orders = state.orders.filter(
    o => o.userUid === currentUser.uid
  );

  if (!orders.length) {
    body.innerHTML = `
      <div style="text-align:center;padding:40px;color:#70757d">
        <div style="font-size:45px">📦</div>
        <h3>Aucune commande</h3>
      </div>
    `;

    return;
  }

  body.innerHTML = orders.map(order => {
    const status = getDeliveryStatus(order.status);

    return `
      <div class="orderCard">

        <div class="orderTop">
          <div>
            <div class="orderNumber">${escapeHTML(order.number)}</div>
            <div style="font-size:12px;color:#70757d;margin-top:4px">
              ${new Date(order.createdAt).toLocaleString("fr-FR")}
            </div>
          </div>

          <span class="status ${status.key}">
            ${status.label}
          </span>
        </div>

        <div class="progress">
          <div
            class="progressBar"
            style="width:${status.progress}%"
          ></div>
        </div>

        <div style="display:flex;justify-content:space-between;font-size:12px;color:#70757d">
          <span>Commande</span>
          <span>Livraison</span>
        </div>

        <div class="deliveryInfo">

          <div class="deliveryBox">
            <small>⏱️ Temps restant</small>
            <div class="countdown" data-countdown="${order.id}">
              ${deliveryCountdown(order.deliveryDate, order.status)}
            </div>
          </div>

          <div class="deliveryBox">
            <small>📅 Livraison estimée</small>
            <strong>
              ${
                order.status === "livree"
                  ? "Livrée"
                  : new Date(order.deliveryDate).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })
              }
            </strong>
          </div>

          <div class="deliveryBox">
            <small>📍 Adresse</small>
            <strong>
              ${escapeHTML(order.address.city)}
            </strong>
          </div>

          <div class="deliveryBox">
            <small>📦 Suivi</small>
            <strong>
              ${escapeHTML(order.tracking || "En préparation")}
            </strong>
          </div>

        </div>

        <div style="margin-top:14px">
          <strong>Articles</strong>

          ${order.items.map(item => `
            <div style="display:flex;justify-content:space-between;margin-top:7px;font-size:13px">
              <span>${escapeHTML(item.name)} × ${item.qty}</span>
              <strong>${money(item.price * item.qty)}</strong>
            </div>
          `).join("")}
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:15px;padding-top:12px;border-top:1px solid #e5e7eb">
          <strong>Total</strong>
          <strong>${money(order.total)}</strong>
        </div>

        <button
          class="secondary"
          data-invoice="${order.id}"
        >
          🧾 Voir la facture
        </button>

      </div>
    `;
  }).join("");
}

/* =========================================================
   DASHBOARD
========================================================= */

function adminCodePrompt() {
  if (!isAdmin()) {
    showToast("Accès réservé à l'administrateur.");
    return;
  }

  const unlocked =
    localStorage.getItem("nova_admin_unlocked_v5") === "true";

  if (unlocked) {
    renderDashboard();
    openModal("dashboardModal");
    return;
  }

  const code = prompt("Code dashboard NovaShop :");

  if (code === ADMIN_CODE) {
    localStorage.setItem("nova_admin_unlocked_v5", "true");
    renderDashboard();
    openModal("dashboardModal");
    showToast("Dashboard ouvert 🛠️");
  } else {
    showToast("Code incorrect.");
  }
}

function renderDashboard() {
  if (!isAdmin()) return;

  const orders = state.orders;

  document.getElementById("adminOrderCount").textContent =
    orders.length;

  document.getElementById("adminFreeCount").textContent =
    orders.filter(o => o.total === 0).length;

  const catalogValue = PRODUCTS.reduce(
    (sum, p) => sum + p.price,
    0
  );

  document.getElementById("adminCatalogValue").textContent =
    money(catalogValue);

  const box = document.getElementById("adminOrders");

  if (!orders.length) {
    box.innerHTML = `
      <div style="padding:30px;text-align:center;color:#70757d">
        Aucune commande.
      </div>
    `;

    return;
  }

  box.innerHTML = orders.map(order => {
    const status = getDeliveryStatus(order.status);

    const localDate = new Date(order.deliveryDate);

    const yyyy = localDate.getFullYear();
    const mm = String(localDate.getMonth() + 1).padStart(2, "0");
    const dd = String(localDate.getDate()).padStart(2, "0");
    const hh = String(localDate.getHours()).padStart(2, "0");
    const min = String(localDate.getMinutes()).padStart(2, "0");

    const dateValue =
      `${yyyy}-${mm}-${dd}T${hh}:${min}`;

    return `
      <div class="adminOrder">

        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <div>
            <strong>${escapeHTML(order.number)}</strong>

            <div style="font-size:12px;color:#70757d;margin-top:4px">
              ${escapeHTML(order.userEmail || "")}
            </div>

            <div style="font-size:12px;color:#70757d;margin-top:3px">
              ${escapeHTML(order.customerName)}
            </div>
          </div>

          <span class="status ${status.key}">
            ${status.label}
          </span>
        </div>

        <div style="margin-top:10px;font-size:13px">
          📍 ${escapeHTML(order.address.address)},
          ${escapeHTML(order.address.postalCode)}
          ${escapeHTML(order.address.city)}
        </div>

        <div class="adminGrid">

          <label>
            Statut
            <select data-status="${order.id}">
              ${DELIVERY_STATUSES.map(s => `
                <option
                  value="${s.key}"
                  ${order.status === s.key ? "selected" : ""}
                >
                  ${s.label}
                </option>
              `).join("")}
            </select>
          </label>

          <label>
            Livraison prévue
            <input
              type="datetime-local"
              value="${dateValue}"
              data-date="${order.id}"
            >
          </label>

          <label>
            Numéro de suivi
            <input
              value="${escapeHTML(order.tracking || "")}"
              placeholder="Ex : NOVA-TRK-123"
              data-tracking="${order.id}"
            >
          </label>

        </div>

        <button
          class="saveDelivery"
          data-save-delivery="${order.id}"
        >
          💾 Enregistrer la livraison
        </button>

      </div>
    `;
  }).join("");
}

function saveDelivery(orderId) {
  if (!isAdmin()) return;

  const order = state.orders.find(o => o.id === orderId);

  if (!order) return;

  const status =
    document.querySelector(`[data-status="${orderId}"]`)?.value;

  const date =
    document.querySelector(`[data-date="${orderId}"]`)?.value;

  const tracking =
    document.querySelector(`[data-tracking="${orderId}"]`)?.value.trim();

  if (!status || !date) {
    showToast("Statut et date obligatoires.");
    return;
  }

  order.status = status;
  order.deliveryDate = new Date(date).toISOString();
  order.tracking = tracking;

  save("nova_orders_v5", state.orders);

  renderDashboard();
  renderOrders();

  showToast("Livraison modifiée 🚚");
}

/* =========================================================
   INVOICE
========================================================= */

function showInvoice(order) {
  if (!order) return;

  document.getElementById("invoiceContent").innerHTML = `
    <div class="invoiceHeader">
      <div>
        <div class="invoiceLogo">NOVASHOP</div>
        <div style="color:#70757d;margin-top:5px">
          Marketplace gaming
        </div>
      </div>

      <div style="text-align:right">
        <strong>FACTURE</strong>
        <div style="margin-top:5px">
          ${escapeHTML(order.number)}
        </div>
        <div style="font-size:12px;color:#70757d">
          ${new Date(order.createdAt).toLocaleDateString("fr-FR")}
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:25px">
      <div>
        <strong>Client</strong>
        <div style="margin-top:6px">
          ${escapeHTML(order.customerName)}
        </div>
        <div>${escapeHTML(order.userEmail || "")}</div>
      </div>

      <div>
        <strong>Livraison</strong>
        <div style="margin-top:6px">
          ${escapeHTML(order.address.address)}
        </div>
        <div>
          ${escapeHTML(order.address.postalCode)}
          ${escapeHTML(order.address.city)}
        </div>
        <div>${escapeHTML(order.address.country)}</div>
      </div>
    </div>

    <table class="invoiceTable">
      <thead>
        <tr>
          <th>Article</th>
          <th>Qté</th>
          <th>Prix</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        ${order.items.map(item => `
          <tr>
            <td>${escapeHTML(item.name)}</td>
            <td>${item.qty}</td>
            <td>${money(item.price)}</td>
            <td>${money(item.price * item.qty)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="invoiceTotal">
      <div class="totalLine">
        <span>Sous-total</span>
        <strong>${money(order.subtotal)}</strong>
      </div>

      <div class="totalLine">
        <span>Réduction</span>
        <strong>-${money(order.discount)}</strong>
      </div>

      <div class="totalLine big">
        <span>Total</span>
        <strong>${money(order.total)}</strong>
      </div>

      <div style="margin-top:15px;font-size:13px">
        <strong>Paiement :</strong>
        Code promotionnel
      </div>
    </div>
  `;

  openModal("invoiceModal");
}

/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckout() {
  const subtotal = cartSubtotal();

  document.getElementById("checkoutSubtotal").textContent =
    money(subtotal);

  document.getElementById("checkoutDiscount").textContent =
    money(0);

  document.getElementById("checkoutTotal").textContent =
    money(subtotal);
}

function updatePromo() {
  const subtotal = cartSubtotal();

  const code =
    document.getElementById("promoCode").value
      .trim()
      .toUpperCase();

  const percent = PROMOS[code] || 0;

  const discount = subtotal * percent / 100;
  const total = Math.max(0, subtotal - discount);

  document.getElementById("checkoutDiscount").textContent =
    `-${money(discount)}`;

  document.getElementById("checkoutTotal").textContent =
    money(total);
}

/* =========================================================
   SETTINGS
========================================================= */

function applySettings() {
  document.body.style.background =
    state.settings.dark ? "#111318" : "#f5f6f8";

  document.body.style.color =
    state.settings.dark ? "#f4f4f5" : "#17191d";

  const sw = document.getElementById("darkSwitch");
  const sound = document.getElementById("soundSwitch");

  sw.classList.toggle("on", state.settings.dark);
  sound.classList.toggle("on", state.settings.sound);
}

/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdowns() {
  document.querySelectorAll("[data-countdown]").forEach(el => {
    const id = el.dataset.countdown;

    const order = state.orders.find(o => o.id === id);

    if (!order) return;

    el.textContent =
      deliveryCountdown(order.deliveryDate, order.status);
  });
}

/* =========================================================
   EVENTS
========================================================= */

document.addEventListener("click", event => {
  const target = event.target;

  if (
    target.closest("button") &&
    !target.closest(".close")
  ) {
    beep();
  }

  const add = target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add);
    return;
  }

  const view = target.closest("[data-view]");
  if (view) {
    openProduct(view.dataset.view);
    return;
  }

  const fav = target.closest("[data-favorite]");
  if (fav) {
    toggleFavorite(fav.dataset.favorite);
    return;
  }

  const detailAdd = target.closest("[data-detail-add]");
  if (detailAdd) {
    addToCart(detailAdd.dataset.detailAdd);
    return;
  }

  const plus = target.closest("[data-qty-plus]");
  if (plus) {
    changeQty(plus.dataset.qtyPlus, 1);
    return;
  }

  const minus = target.closest("[data-qty-minus]");
  if (minus) {
    changeQty(minus.dataset.qtyMinus, -1);
    return;
  }

  const remove = target.closest("[data-remove]");
  if (remove) {
    removeFromCart(remove.dataset.remove);
    return;
  }

  const invoice = target.closest("[data-invoice]");
  if (invoice) {
    const order = state.orders.find(o => o.id === invoice.dataset.invoice);
    showInvoice(order);
    return;
  }

  const saveDeliveryBtn = target.closest("[data-save-delivery]");
  if (saveDeliveryBtn) {
    saveDelivery(saveDeliveryBtn.dataset.saveDelivery);
    return;
  }

  const category = target.closest("[data-category]");
  if (category) {
    state.category = category.dataset.category;

    document.querySelectorAll(".cat").forEach(c => {
      c.classList.toggle(
        "active",
        c.dataset.category === state.category
      );
    });

    renderProducts();
    return;
  }

  const authTab = target.closest("[data-auth-tab]");
  if (authTab) {
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
    });

    authTab.classList.add("active");

    document.querySelectorAll(".authForm").forEach(f => {
      f.classList.remove("active");
    });

    document
      .getElementById(
        authTab.dataset.authTab === "login"
          ? "loginForm"
          : "signupForm"
      )
      .classList.add("active");

    return;
  }

  const close = target.closest("[data-close]");
  if (close) {
    closeModal(close.dataset.close);
    return;
  }

  if (target.id === "accountLogin") {
    closeModal("accountModal");
    openModal("authModal");
    return;
  }

  if (target.id === "accountOrders") {
    closeModal("accountModal");
    renderOrders();
    openModal("ordersModal");
    return;
  }

  if (target.id === "accountLogout") {
    logout();
    return;
  }

  if (target.id === "ordersLogin") {
    closeModal("ordersModal");
    openModal("authModal");
    return;
  }

  if (target.id === "submitReview") {
    submitReview();
    return;
  }
});

document.getElementById("overlay").addEventListener("click", () => {
  document.querySelectorAll(".modal.show").forEach(m => {
    m.classList.remove("show");
  });

  document.getElementById("overlay").classList.remove("show");
});

document.getElementById("accountButton").addEventListener("click", () => {
  renderAccount();
  openModal("accountModal");
});

document.getElementById("ordersButton").addEventListener("click", () => {
  renderOrders();
  openModal("ordersModal");
});

document.getElementById("adminButton").addEventListener("click", () => {
  adminCodePrompt();
});

document.getElementById("cartButton").addEventListener("click", () => {
  renderCart();
  openModal("cartModal");
});

document.getElementById("settingsButton").addEventListener("click", () => {
  applySettings();
  openModal("settingsModal");
});

document.getElementById("searchButton").addEventListener("click", () => {
  state.search = document.getElementById("searchInput").value;
  renderProducts();
});

document.getElementById("searchInput").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    state.search = event.target.value;
    renderProducts();
  }
});

document.getElementById("sortSelect").addEventListener("change", event => {
  state.sort = event.target.value;
  renderProducts();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!currentUser) {
    closeModal("cartModal");
    openModal("authModal");
    showToast("Connecte-toi pour commander.");
    return;
  }

  if (!state.cart.length) {
    showToast("Panier vide.");
    return;
  }

  renderCheckout();
  openModal("checkoutModal");
});

document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  login(
    document.getElementById("loginEmail").value.trim(),
    document.getElementById("loginPassword").value
  );
});

document.getElementById("signupForm").addEventListener("submit", event => {
  event.preventDefault();

  signup(
    document.getElementById("signupEmail").value.trim(),
    document.getElementById("signupPhone").value.trim(),
    document.getElementById("signupPassword").value,
    document.getElementById("signupPassword2").value
  );
});

document.getElementById("googleButton").addEventListener("click", loginGoogle);

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  createOrder();
});

document.getElementById("promoCode").addEventListener("input", updatePromo);

document.getElementById("printInvoice").addEventListener("click", () => {
  window.print();
});

document.getElementById("darkSwitch").addEventListener("click", () => {
  state.settings.dark = !state.settings.dark;
  save("nova_settings_v5", state.settings);
  applySettings();
});

document.getElementById("soundSwitch").addEventListener("click", () => {
  state.settings.sound = !state.settings.sound;
  save("nova_settings_v5", state.settings);
  applySettings();
});

/* =========================================================
   REVIEWS
========================================================= */

function submitReview() {
  if (!currentUser || !currentProductId) return;

  const existing = state.reviews.find(
    r =>
      r.productId === currentProductId &&
      r.userUid === currentUser.uid
  );

  if (existing) {
    showToast("Tu as déjà noté ce produit.");
    return;
  }

  const rating =
    Number(document.getElementById("reviewRating").value);

  const comment =
    document.getElementById("reviewComment").value.trim();

  if (!comment) {
    showToast("Écris un commentaire.");
    return;
  }

  const name = currentDisplayName();

  const masked =
    name.slice(0, 3) + "***";

  state.reviews.push({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),

    productId: currentProductId,
    userUid: currentUser.uid,
    name: masked,
    rating,
    comment,
    date: new Date().toLocaleDateString("fr-FR")
  });

  save("nova_reviews_v5", state.reviews);

  showToast("Avis publié ⭐");

  openProduct(currentProductId);
  renderProducts();
}

/* =========================================================
   FIREBASE AUTH LISTENER
========================================================= */

if (firebaseReady) {
  onAuthStateChanged(auth, user => {
    currentUser = user || null;

    updateAuthUI();
    renderAccount();
    renderOrders();
  });
}

/* =========================================================
   BOOT
========================================================= */

function boot() {
  renderProducts();
  renderCart();
  renderAccount();
  renderOrders();
  updateCartCount();
  applySettings();

  setInterval(() => {
    updateCountdowns();
  }, 1000);
}

boot();
