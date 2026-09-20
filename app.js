/* =========================================================
   NOVASHOP - APP.JS
   Firebase + Boutique + Panier + Auth + Commandes
   PayPal.Me + NOVA100 + Factures + Admin
   ========================================================= */

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
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
   CONFIG
   ========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const PAYPAL_USERNAME = "SH0PNOVA";
const FREE_CODE = "NOVA100";

const CART_KEY = "novashop_cart";
const SETTINGS_KEY = "novashop_settings";


/* =========================================================
   HELPERS
   ========================================================= */

const $ = id => document.getElementById(id);

function money(value){

  return Number(value || 0)
    .toFixed(2)
    .replace(".", ",") + " €";

}

function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function showToast(message){

  const toast = $("toast");

  if(!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer =
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);

}

function openModal(){

  $("modalLayer")?.classList.add("show");

}

function closeModal(){

  $("modalLayer")?.classList.remove("show");

}

function authMessage(message){

  const el = $("authMessage");

  if(el){

    el.innerHTML = message;

  }else{

    showToast(
      String(message).replace(/<br>/g, " ")
    );

  }

}


/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [

  {
    id: "p1",
    name: "Gaming Mouse RGB",
    category: "Souris",
    price: 19.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Gaming+Mouse"
  },

  {
    id: "p2",
    name: "Gaming Keyboard RGB",
    category: "Claviers",
    price: 34.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Keyboard"
  },

  {
    id: "p3",
    name: "Gaming Headset",
    category: "Audio",
    price: 29.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Headset"
  },

  {
    id: "p4",
    name: "Gaming Mousepad XXL",
    category: "Setup",
    price: 24.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Mousepad"
  },

  {
    id: "p5",
    name: "RGB LED Strip",
    category: "Setup",
    price: 14.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=RGB+LED"
  },

  {
    id: "p6",
    name: "USB Microphone",
    category: "Audio",
    price: 39.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Microphone"
  },

  {
    id: "p7",
    name: "USB Hub",
    category: "Accessoires",
    price: 12.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=USB+Hub"
  },

  {
    id: "p8",
    name: "Webcam Full HD",
    category: "Streaming",
    price: 32.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Webcam"
  },

  {
    id: "p9",
    name: "Gaming Controller",
    category: "Gaming",
    price: 39.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Controller"
  },

  {
    id: "p10",
    name: "Phone Stand",
    category: "Accessoires",
    price: 9.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Phone+Stand"
  },

  {
    id: "p11",
    name: "Desk Mat Black",
    category: "Setup",
    price: 18.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Desk+Mat"
  },

  {
    id: "p12",
    name: "RGB Gaming Speakers",
    category: "Audio",
    price: 44.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Speakers"
  },

  {
    id: "p13",
    name: "Laptop Stand",
    category: "Accessoires",
    price: 27.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Laptop+Stand"
  },

  {
    id: "p14",
    name: "HDMI Cable",
    category: "Câbles",
    price: 8.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=HDMI"
  },

  {
    id: "p15",
    name: "DisplayPort Cable",
    category: "Câbles",
    price: 11.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=DisplayPort"
  },

  {
    id: "p16",
    name: "USB-C Cable",
    category: "Câbles",
    price: 7.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=USB-C"
  },

  {
    id: "p17",
    name: "Gaming Chair",
    category: "Setup",
    price: 149.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Gaming+Chair"
  },

  {
    id: "p18",
    name: "Monitor Arm",
    category: "Setup",
    price: 49.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Monitor+Arm"
  },

  {
    id: "p19",
    name: "Controller Stand",
    category: "Gaming",
    price: 15.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Controller+Stand"
  },

  {
    id: "p20",
    name: "RGB Desk Lamp",
    category: "Setup",
    price: 22.99,
    image: "https://placehold.co/600x600/111827/ffffff?text=Desk+Lamp"
  }

];


/* =========================================================
   CART
   ========================================================= */

let cart = [];

try{

  cart =
    JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

  if(!Array.isArray(cart)){
    cart = [];
  }

}catch{

  cart = [];

}


function saveCart(){

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

}


function getCartCount(){

  return cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

}


function getCartTotal(){

  return cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );

}


function addToCart(id){

  const product =
    products.find(p => p.id === id);

  if(!product) return;

  const existing =
    cart.find(item => item.id === id);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({

      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1

    });

  }

  saveCart();
  renderCart();
  updateCartBadge();

  showToast(
    `${product.name} ajouté au panier ✓`
  );

}


function removeFromCart(id){

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();
  renderCart();
  updateCartBadge();

}


function changeQuantity(id, amount){

  const item =
    cart.find(
      product => product.id === id
    );

  if(!item) return;

  item.quantity += amount;

  if(item.quantity <= 0){

    removeFromCart(id);
    return;

  }

  saveCart();
  renderCart();
  updateCartBadge();

}


function clearCart(){

  cart = [];

  saveCart();
  renderCart();
  updateCartBadge();

}


/* =========================================================
   CART UI
   ========================================================= */

function updateCartBadge(){

  const badge = $("cartBadge");

  if(!badge) return;

  const count = getCartCount();

  badge.textContent = count;

  badge.style.display =
    count > 0 ? "flex" : "none";

}


function renderCart(){

  const container = $("cartItems");
  const totalEl = $("cartTotal");

  if(!container) return;

  if(cart.length === 0){

    container.innerHTML = `
      <div style="
        padding:30px;
        text-align:center;
        opacity:.7;
      ">
        Ton panier est vide 🛒
      </div>
    `;

  }else{

    container.innerHTML =
      cart.map(item => `

        <div class="cart-item">

          <img
            src="${escapeHTML(item.image)}"
            alt=""
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHTML(item.name)}
            </strong>

            <span>
              ${money(item.price)}
            </span>

            <div class="quantity">

              <button
                data-action="minus"
                data-id="${item.id}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-action="plus"
                data-id="${item.id}"
              >
                +
              </button>

            </div>

          </div>

          <button
            data-action="remove"
            data-id="${item.id}"
          >
            ✕
          </button>

        </div>

      `).join("");

  }

  if(totalEl){

    totalEl.textContent =
      money(getCartTotal());

  }

}


/* =========================================================
   PRODUCT RENDER
   ========================================================= */

let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "default";


function getVisibleProducts(){

  let list =
    products.filter(product => {

      const categoryOK =
        currentCategory === "Tous" ||
        product.category === currentCategory;

      const searchOK =
        !currentSearch ||
        product.name
          .toLowerCase()
          .includes(
            currentSearch.toLowerCase()
          );

      return categoryOK && searchOK;

    });

  if(currentSort === "price-low"){

    list.sort(
      (a,b) => a.price - b.price
    );

  }

  if(currentSort === "price-high"){

    list.sort(
      (a,b) => b.price - a.price
    );

  }

  if(currentSort === "name"){

    list.sort(
      (a,b) =>
        a.name.localeCompare(b.name)
    );

  }

  return list;

}


function renderProducts(){

  const grid = $("productGrid");

  if(!grid) return;

  const list =
    getVisibleProducts();

  if(!list.length){

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px;
      ">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }

  grid.innerHTML =
    list.map(product => `

      <article class="product">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

        <div class="product-body">

          <small>
            ${escapeHTML(product.category)}
          </small>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <strong class="price">
            ${money(product.price)}
          </strong>

          <button
            class="add-cart"
            data-action="add"
            data-id="${product.id}"
          >
            Ajouter au panier
          </button>

        </div>

      </article>

    `).join("");

}


function renderCategories(){

  const container =
    $("categories");

  if(!container) return;

  const categories = [
    "Tous",
    ...new Set(
      products.map(p => p.category)
    )
  ];

  container.innerHTML =
    categories.map(category => `

      <button
        class="${
          category === currentCategory
            ? "active"
            : ""
        }"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");

}


/* =========================================================
   MODAL
   ========================================================= */

function setModal(title, content){

  if($("modalTitle"))
    $("modalTitle").textContent = title;

  if($("modalContent"))
    $("modalContent").innerHTML = content;

  openModal();

}


/* =========================================================
   AUTH UI
   ========================================================= */

function showAuth(){

  setModal(
    "Compte",
    `

      <div class="auth-box">

        <input
          id="authEmail"
          type="email"
          placeholder="Adresse email"
          autocomplete="email"
        >

        <input
          id="authPassword"
          type="password"
          placeholder="Mot de passe"
          autocomplete="current-password"
        >

        <div
          id="authMessage"
          class="auth-message"
        ></div>

        <div class="auth-buttons">

          <button
            data-action="login"
          >
            Se connecter
          </button>

          <button
            data-action="register"
          >
            Créer un compte
          </button>

        </div>

      </div>

    `
  );

}


function showLoggedAccount(user){

  setModal(
    "Mon compte",
    `

      <div class="account-box">

        <p>
          Connecté avec :
        </p>

        <strong>
          ${escapeHTML(user.email || "")}
        </strong>

        <br><br>

        <button
          data-action="logout"
        >
          Se déconnecter
        </button>

      </div>

    `
  );

}


/* =========================================================
   FIREBASE AUTH ERROR
   ========================================================= */

function showFirebaseAuthError(error){

  console.error(
    "🔥 ERREUR FIREBASE :",
    error
  );

  console.error(
    "Code Firebase :",
    error?.code
  );

  console.error(
    "Message Firebase :",
    error?.message
  );

  const code =
    error?.code || "unknown";

  const errors = {

    "auth/operation-not-allowed":
      "❌ Email/Mot de passe n'est PAS activé dans Firebase.<br><br>Firebase Console → Authentication → Sign-in method → Email/Password → Activer.",

    "auth/unauthorized-domain":
      "❌ Le domaine de ton site n'est PAS autorisé dans Firebase.<br><br>Firebase Console → Authentication → Settings → Authorized domains → ajoute le domaine de ton site.",

    "auth/invalid-api-key":
      "❌ La clé API Firebase est invalide.",

    "auth/network-request-failed":
      "❌ Erreur réseau. Vérifie ta connexion Internet.",

    "auth/invalid-email":
      "❌ L'adresse email est invalide.",

    "auth/email-already-in-use":
      "❌ Cet email possède déjà un compte.",

    "auth/weak-password":
      "❌ Le mot de passe doit contenir au moins 6 caractères.",

    "auth/invalid-credential":
      "❌ Email ou mot de passe incorrect.",

    "auth/wrong-password":
      "❌ Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "❌ Aucun compte trouvé avec cet email.",

    "auth/too-many-requests":
      "❌ Trop de tentatives. Réessaie plus tard.",

    "auth/user-disabled":
      "❌ Ce compte a été désactivé.",

    "auth/internal-error":
      "❌ Firebase a rencontré une erreur interne.",

    "auth/configuration-not-found":
      "❌ Configuration Firebase Authentication introuvable."

  };

  authMessage(
    errors[code] ||
    `
      ❌ Erreur Firebase : <b>${escapeHTML(code)}</b>
      <br>
      ${escapeHTML(
        error?.message ||
        "Erreur inconnue"
      )}
    `
  );

}


/* =========================================================
   REGISTER
   ========================================================= */

async function register(){

  const email =
    $("authEmail")
      ?.value
      ?.trim();

  const password =
    $("authPassword")
      ?.value || "";

  if(!email){

    authMessage(
      "Entre ton adresse email."
    );

    return;

  }

  if(!password){

    authMessage(
      "Entre un mot de passe."
    );

    return;

  }

  if(password.length < 6){

    authMessage(
      "Le mot de passe doit contenir au moins 6 caractères."
    );

    return;

  }

  authMessage(
    "⏳ Création du compte..."
  );

  try{

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    console.log(
      "✅ COMPTE CRÉÉ :",
      result.user.uid
    );

    closeModal();

    showToast(
      "Compte créé avec succès ✓"
    );

  }catch(error){

    showFirebaseAuthError(error);

  }

}


/* =========================================================
   LOGIN
   ========================================================= */

async function login(){

  const email =
    $("authEmail")
      ?.value
      ?.trim();

  const password =
    $("authPassword")
      ?.value || "";

  if(!email){

    authMessage(
      "Entre ton adresse email."
    );

    return;

  }

  if(!password){

    authMessage(
      "Entre ton mot de passe."
    );

    return;

  }

  authMessage(
    "⏳ Connexion..."
  );

  try{

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    console.log(
      "✅ CONNECTÉ :",
      result.user.uid
    );

    closeModal();

    showToast(
      "Connexion réussie ✓"
    );

  }catch(error){

    showFirebaseAuthError(error);

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout(){

  try{

    await signOut(auth);

    closeModal();

    showToast(
      "Déconnexion réussie ✓"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Erreur de déconnexion."
    );

  }

}


/* =========================================================
   AUTH STATE
   ========================================================= */

let currentUser = null;

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    const adminBtn =
      $("adminBtn");

    if(adminBtn){

      const isAdmin =
        !!user &&
        (
          String(user.email || "")
            .trim()
            .toLowerCase()
          ===
          ADMIN_EMAIL
            .toLowerCase()
        );

      adminBtn.style.display =
        isAdmin
          ? ""
          : "none";

    }

  }
);


/* =========================================================
   ADDRESS VALIDATION
   ========================================================= */

function validateAddress(address){

  if(!address){

    return {
      valid: false,
      message:
        "L'adresse de livraison est obligatoire."
    };

  }

  const value =
    address.trim();

  if(value.length < 15){

    return {
      valid: false,
      message:
        "Adresse de livraison trop courte."
    };

  }

  const hasNumber =
    /\d/.test(value);

  if(!hasNumber){

    return {
      valid: false,
      message:
        "Entre une adresse complète avec le numéro de rue."
    };

  }

  const words =
    value.split(/\s+/);

  if(words.length < 3){

    return {
      valid: false,
      message:
        "Entre une adresse complète."
    };

  }

  return {
    valid: true,
    message: ""
  };

}


/* =========================================================
   CHECKOUT MODAL
   ========================================================= */

function showCheckout(){

  if(!cart.length){

    showToast(
      "Ton panier est vide."
    );

    return;

  }

  if(!currentUser){

    showToast(
      "Connecte-toi avant de commander."
    );

    showAuth();

    return;

  }

  setModal(
    "Finaliser la commande",
    `

      <div class="checkout-box">

        <h3>
          Résumé
        </h3>

        <div class="checkout-summary">

          ${cart.map(item => `

            <div class="checkout-line">

              <span>
                ${escapeHTML(item.name)}
                × ${item.quantity}
              </span>

              <strong>
                ${money(
                  item.price *
                  item.quantity
                )}
              </strong>

            </div>

          `).join("")}

        </div>

        <div class="checkout-total">

          <span>
            Total
          </span>

          <strong id="checkoutTotal">
            ${money(getCartTotal())}
          </strong>

        </div>

        <label>
          Adresse de livraison
        </label>

        <textarea
          id="deliveryAddress"
          rows="4"
          placeholder="Numéro, rue, code postal, ville..."
        ></textarea>

        <label>
          Code promo
        </label>

        <input
          id="promoCode"
          type="text"
          placeholder="Code promo"
          autocomplete="off"
        >

        <div
          id="promoMessage"
          style="margin:10px 0"
        ></div>

        <button
          data-action="apply-promo"
        >
          Appliquer le code
        </button>

        <div id="paymentArea">

          <button
            data-action="pay"
            class="paypal"
          >
            Payer avec PayPal
          </button>

        </div>

      </div>

    `
  );

}


/* =========================================================
   PROMO
   ========================================================= */

let promoApplied = false;

function applyPromo(){

  const input =
    $("promoCode");

  const message =
    $("promoMessage");

  const code =
    input?.value
      ?.trim()
      .toUpperCase();

  if(code === FREE_CODE){

    promoApplied = true;

    if(message){

      message.innerHTML =
        "🎉 Code NOVA100 activé : commande gratuite.";

    }

    const total =
      $("checkoutTotal");

    if(total){

      total.textContent =
        "0,00 €";

    }

    const payment =
      $("paymentArea");

    if(payment){

      payment.innerHTML = `

        <div class="free-order">

          <strong>
            Commande à 0 €
          </strong>

          <p>
            Aucun paiement PayPal nécessaire.
          </p>

          <button
            data-action="free-order"
          >
            Valider la commande
          </button>

        </div>

      `;

    }

    return;

  }

  promoApplied = false;

  if(message){

    message.textContent =
      "Code promo invalide.";

  }

}


/* =========================================================
   PAYPAL
   ========================================================= */

function paypalURL(total){

  const amount =
    Number(total || 0)
      .toFixed(2);

  return `https://paypal.me/${PAYPAL_USERNAME}/${amount}`;

}


/* =========================================================
   CREATE ORDER
   ========================================================= */

async function createOrder(){

  if(!currentUser){

    showToast(
      "Connecte-toi avant de commander."
    );

    return null;

  }

  if(!cart.length){

    showToast(
      "Ton panier est vide."
    );

    return null;

  }

  const address =
    $("deliveryAddress")
      ?.value
      ?.trim() || "";

  const validation =
    validateAddress(address);

  if(!validation.valid){

    showToast(
      validation.message
    );

    return null;

  }

  const code =
    $("promoCode")
      ?.value
      ?.trim()
      ?.toUpperCase() || "";

  const normalTotal =
    getCartTotal();

  const total =
    code === FREE_CODE
      ? 0
      : normalTotal;

  const order = {

    userId:
      currentUser.uid,

    email:
      currentUser.email || "",

    items:
      cart.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })),

    subtotal:
      normalTotal,

    promoCode:
      code || null,

    total:
      total,

    deliveryAddress:
      address,

    status:
      total === 0
        ? "free"
        : "awaiting_payment",

    payment:
      total === 0
        ? "none"
        : "paypal",

    createdAt:
      serverTimestamp()

  };

  try{

    const ref =
      await addDoc(
        collection(db, "orders"),
        order
      );

    return {
      id: ref.id,
      ...order
    };

  }catch(error){

    console.error(
      "Erreur création commande:",
      error
    );

    showToast(
      "Impossible d'enregistrer la commande."
    );

    return null;

  }

}


/* =========================================================
   NORMAL PAYPAL ORDER
   ========================================================= */

async function payWithPayPal(){

  if(promoApplied){

    await createFreeOrder();

    return;

  }

  const address =
    $("deliveryAddress")
      ?.value
      ?.trim() || "";

  const validation =
    validateAddress(address);

  if(!validation.valid){

    showToast(
      validation.message
    );

    return;

  }

  const total =
    getCartTotal();

  if(total <= 0){

    await createFreeOrder();

    return;

  }

  const order =
    await createOrder();

  if(!order) return;

  const url =
    paypalURL(total);

  localStorage.setItem(
    "novashop_last_order",
    JSON.stringify(order)
  );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  showToast(
    "PayPal ouvert ✓"
  );

}


/* =========================================================
   FREE ORDER
   ========================================================= */

async function createFreeOrder(){

  const code =
    $("promoCode")
      ?.value
      ?.trim()
      ?.toUpperCase();

  if(code !== FREE_CODE){

    showToast(
      "Le code NOVA100 est nécessaire."
    );

    return;

  }

  const order =
    await createOrder();

  if(!order) return;

  const invoice =
    generateInvoice(order);

  localStorage.setItem(
    "novashop_last_invoice",
    invoice
  );

  clearCart();

  closeModal();

  showToast(
    "Commande gratuite validée ✓"
  );

  setTimeout(
    () => showInvoice(order),
    300
  );

}


/* =========================================================
   INVOICE
   ========================================================= */

function generateInvoice(order){

  const date =
    new Date()
      .toLocaleString("fr-FR");

  const items =
    order.items
      .map(item =>
        `${item.name} x${item.quantity} = ${
          money(
            item.price *
            item.quantity
          )
        }`
      )
      .join("\n");

  return `
NOVASHOP
FACTURE

Commande : ${order.id}
Date : ${date}

Client :
${order.email}

Livraison :
${order.deliveryAddress}

Produits :
${items}

Sous-total :
${money(order.subtotal)}

Code promo :
${order.promoCode || "Aucun"}

TOTAL :
${money(order.total)}

Statut :
${order.status}
`;

}


function showInvoice(order){

  setModal(
    "Facture",
    `

      <div class="invoice">

        <h2>
          NOVASHOP
        </h2>

        <p>
          <strong>
            Commande :
          </strong>
          ${escapeHTML(order.id)}
        </p>

        <p>
          <strong>
            Client :
          </strong>
          ${escapeHTML(order.email)}
        </p>

        <p>
          <strong>
            Adresse :
          </strong><br>
          ${escapeHTML(order.deliveryAddress)}
        </p>

        <hr>

        ${order.items.map(item => `

          <div class="invoice-line">

            <span>
              ${escapeHTML(item.name)}
              × ${item.quantity}
            </span>

            <strong>
              ${money(
                item.price *
                item.quantity
              )}
            </strong>

          </div>

        `).join("")}

        <hr>

        <p>
          Sous-total :
          <strong>
            ${money(order.subtotal)}
          </strong>
        </p>

        <p>
          Code :
          <strong>
            ${escapeHTML(
              order.promoCode ||
              "Aucun"
            )}
          </strong>
        </p>

        <h2>
          Total :
          ${money(order.total)}
        </h2>

        <button
          data-action="print-invoice"
        >
          🖨 Imprimer la facture
        </button>

      </div>

    `
  );

}


/* =========================================================
   ORDERS
   ========================================================= */

async function showOrders(){

  if(!currentUser){

    showAuth();

    return;

  }

  setModal(
    "Mes commandes",
    `<div id="ordersLoading">
      ⏳ Chargement...
    </div>`
  );

  try{

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    const orders =
      snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(
          order =>
            order.userId ===
            currentUser.uid
        );

    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds ||
          0;

        const bTime =
          b.createdAt?.seconds ||
          0;

        return bTime - aTime;

      }
    );

    if(!orders.length){

      $("ordersLoading").innerHTML =
        `
          <div style="padding:30px;text-align:center">
            Aucune commande.
          </div>
        `;

      return;

    }

    $("ordersLoading").innerHTML =
      orders.map(order => `

        <div class="order-card">

          <strong>
            Commande ${escapeHTML(order.id)}
          </strong>

          <p>
            Total :
            <b>${money(order.total)}</b>
          </p>

          <p>
            Statut :
            ${escapeHTML(
              order.status || "unknown"
            )}
          </p>

          <button
            data-action="invoice"
            data-order-id="${escapeHTML(order.id)}"
          >
            Voir la facture
          </button>

        </div>

      `).join("");

  }catch(error){

    console.error(error);

    $("ordersLoading").innerHTML =
      `
        <p>
          Impossible de charger les commandes.
        </p>
      `;

  }

}


/* =========================================================
   ADMIN
   ========================================================= */

async function showAdmin(){

  if(!currentUser){

    showAuth();

    return;

  }

  if(
    String(currentUser.email || "")
      .toLowerCase()
    !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "Accès administrateur refusé."
    );

    return;

  }

  setModal(
    "Administration",
    `<div id="adminContent">
      ⏳ Chargement des commandes...
    </div>`
  );

  try{

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );

    const orders =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );

    orders.sort(
      (a,b) => {

        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return bTime - aTime;

      }
    );

    const content =
      $("adminContent");

    if(!orders.length){

      content.innerHTML =
        "<p>Aucune commande.</p>";

      return;

    }

    content.innerHTML =
      orders.map(order => `

        <div class="order-card">

          <h3>
            ${escapeHTML(order.id)}
          </h3>

          <p>
            Client :
            ${escapeHTML(order.email || "")}
          </p>

          <p>
            Total :
            <strong>
              ${money(order.total)}
            </strong>
          </p>

          <p>
            Statut :
            ${escapeHTML(
              order.status || ""
            )}
          </p>

          <p>
            Adresse :
            ${escapeHTML(
              order.deliveryAddress || ""
            )}
          </p>

        </div>

      `).join("");

  }catch(error){

    console.error(
      "Admin:",
      error
    );

    $("adminContent").innerHTML =
      `
        <p>
          Impossible de charger les commandes.
        </p>
      `;

  }

}


/* =========================================================
   SETTINGS
   ========================================================= */

let settings = {

  dark:
    true,

  animations:
    true

};

try{

  const saved =
    JSON.parse(
      localStorage.getItem(
        SETTINGS_KEY
      ) || "null"
    );

  if(saved){

    settings = {
      ...settings,
      ...saved
    };

  }

}catch{}


function saveSettings(){

  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  );

}


function applySettings(){

  document.body.classList.toggle(
    "no-animations",
    !settings.animations
  );

}


function showSettings(){

  setModal(
    "Paramètres",
    `

      <div class="settings-box">

        <label>
          <input
            type="checkbox"
            id="animationsSetting"
            ${settings.animations ? "checked" : ""}
          >

          Animations
        </label>

        <br><br>

        <button
          data-action="save-settings"
        >
          Enregistrer
        </button>

      </div>

    `
  );

}


function saveSettingsFromUI(){

  const animations =
    $("animationsSetting")
      ?.checked;

  settings.animations =
    !!animations;

  saveSettings();
  applySettings();

  closeModal();

  showToast(
    "Paramètres enregistrés ✓"
  );

}


/* =========================================================
   EVENTS
   ========================================================= */

document.addEventListener(
  "click",
  async event => {

    const button =
      event.target.closest(
        "[data-action]"
      );

    if(button){

      const action =
        button.dataset.action;

      const id =
        button.dataset.id;

      if(action === "add"){

        addToCart(id);

      }

      if(action === "plus"){

        changeQuantity(
          id,
          1
        );

      }

      if(action === "minus"){

        changeQuantity(
          id,
          -1
        );

      }

      if(action === "remove"){

        removeFromCart(id);

      }

      if(action === "login"){

        await login();

      }

      if(action === "register"){

        await register();

      }

      if(action === "logout"){

        await logout();

      }

      if(action === "apply-promo"){

        applyPromo();

      }

      if(action === "pay"){

        await payWithPayPal();

      }

      if(action === "free-order"){

        await createFreeOrder();

      }

      if(action === "invoice"){

        const orderId =
          button.dataset.orderId;

        showToast(
          "Facture disponible depuis la commande."
        );

      }

      if(action === "print-invoice"){

        window.print();

      }

      if(action === "save-settings"){

        saveSettingsFromUI();

      }

      return;

    }

    const category =
      event.target.closest(
        "[data-category]"
      );

    if(category){

      currentCategory =
        category.dataset.category;

      renderCategories();
      renderProducts();

    }

  }
);


/* =========================================================
   HEADER BUTTONS
   ========================================================= */

$("cartBtn")?.addEventListener(
  "click",
  () => {

    $("overlay")
      ?.classList.add("show");

    $("cartDrawer")
      ?.classList.add("show");

    renderCart();

  }
);


$("heroCartBtn")?.addEventListener(
  "click",
  () => {

    $("cartBtn")?.click();

  }
);


$("closeCart")?.addEventListener(
  "click",
  () => {

    $("overlay")
      ?.classList.remove("show");

    $("cartDrawer")
      ?.classList.remove("show");

  }
);


$("overlay")?.addEventListener(
  "click",
  () => {

    $("overlay")
      ?.classList.remove("show");

    $("cartDrawer")
      ?.classList.remove("show");

  }
);


$("accountBtn")?.addEventListener(
  "click",
  () => {

    if(currentUser){

      showLoggedAccount(
        currentUser
      );

    }else{

      showAuth();

    }

  }
);


$("ordersBtn")?.addEventListener(
  "click",
  showOrders
);


$("adminBtn")?.addEventListener(
  "click",
  showAdmin
);


$("settingsBtn")?.addEventListener(
  "click",
  showSettings
);


$("checkoutBtn")?.addEventListener(
  "click",
  showCheckout
);


$("modalClose")?.addEventListener(
  "click",
  closeModal
);


$("modalLayer")?.addEventListener(
  "click",
  event => {

    if(
      event.target ===
      $("modalLayer")
    ){

      closeModal();

    }

  }
);


/* =========================================================
   SEARCH
   ========================================================= */

$("searchInput")?.addEventListener(
  "input",
  event => {

    currentSearch =
      event.target.value;

    renderProducts();

  }
);


/* =========================================================
   SORT
   ========================================================= */

$("sortSelect")?.addEventListener(
  "change",
  event => {

    currentSort =
      event.target.value;

    renderProducts();

  }
);


/* =========================================================
   HERO SCROLL
   ========================================================= */

document
  .querySelectorAll(
    '[data-scroll="shop"]'
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        $("shop")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });


/* =========================================================
   INIT
   ========================================================= */

renderCategories();
renderProducts();
renderCart();
updateCartBadge();
applySettings();

console.log(
  "🟢 NovaShop chargé."
);

console.log(
  "Firebase project:",
  firebaseConfig.projectId
);

console.log(
  "Current website:",
  location.origin
);

console.log(
  "Firebase Auth:",
  auth
);
