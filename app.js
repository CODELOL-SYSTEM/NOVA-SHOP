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
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  where,
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
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";


/* =========================================================
   PRODUITS
========================================================= */

const products = [
  {
    id: "iphone",
    name: "iPhone",
    category: "Téléphones",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "samsung",
    name: "Samsung Galaxy",
    category: "Téléphones",
    price: 749.99,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "macbook",
    name: "MacBook",
    category: "Ordinateurs",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "gaming-pc",
    name: "PC Gaming RGB",
    category: "Ordinateurs",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "ps5",
    name: "PlayStation 5",
    category: "Gaming",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "xbox",
    name: "Xbox Series X",
    category: "Gaming",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "headset",
    name: "Casque Gaming",
    category: "Gaming",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "keyboard",
    name: "Clavier Gaming",
    category: "Gaming",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "mouse",
    name: "Souris Gaming",
    category: "Gaming",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "monitor",
    name: "Écran Gaming 180 Hz",
    category: "Gaming",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "airpods",
    name: "Écouteurs Bluetooth",
    category: "Audio",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "speaker",
    name: "Enceinte Bluetooth",
    category: "Audio",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "camera",
    name: "Appareil Photo",
    category: "Photo",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "watch",
    name: "Smartwatch",
    category: "Accessoires",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tablet",
    name: "Tablette",
    category: "Tablettes",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tv",
    name: "TV 4K",
    category: "TV",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "router",
    name: "Routeur Wi-Fi",
    category: "Réseau",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "ssd",
    name: "SSD 2 To",
    category: "Informatique",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=85"
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

let questionsUnsubscribe = null;
let adminQuestionsUnsubscribe = null;


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
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
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

  const rounded = Math.round(rating);

  return "★".repeat(rounded) +
         "☆".repeat(5 - rounded);
}

function showToast(message) {

  const old = document.querySelector(".novashop-toast");

  if (old) old.remove();

  const toast = document.createElement("div");

  toast.className = "novashop-toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function openModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("open");
  }
}

function closeModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("open");
  }
}


/* =========================================================
   AVIS
========================================================= */

const firstNames = [
  "Lucas",
  "Emma",
  "Louis",
  "Jade",
  "Gabriel",
  "Léa",
  "Hugo",
  "Chloé",
  "Nathan",
  "Manon",
  "Tom",
  "Camille",
  "Noah",
  "Sarah",
  "Enzo",
  "Inès",
  "Arthur",
  "Zoé",
  "Mathis",
  "Lola",
  "Ethan",
  "Mia",
  "Théo",
  "Alice"
];

const lastNames = [
  "Martin",
  "Bernard",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
  "Girard",
  "Bonnet"
];

const reviewTexts = {

  5: [
    "Excellent produit, je recommande.",
    "Très bonne qualité.",
    "Livraison rapide et produit parfait.",
    "Super achat.",
    "Très satisfait de mon achat.",
    "Produit conforme à la description.",
    "Rien à redire.",
    "Très bon rapport qualité prix.",
    "Je suis vraiment satisfait.",
    "Fonctionne parfaitement."
  ],

  4: [
    "Très bon produit.",
    "Bonne qualité dans l'ensemble.",
    "Je recommande.",
    "Produit conforme.",
    "Très satisfait.",
    "Bon achat.",
    "Livraison correcte.",
    "Bonne expérience."
  ],

  3: [
    "Produit correct.",
    "Ça fonctionne correctement.",
    "Qualité moyenne mais satisfaisante.",
    "Pas mal.",
    "Produit convenable."
  ],

  2: [
    "Moyen.",
    "Je m'attendais à mieux.",
    "Quelques défauts.",
    "Correct sans plus."
  ],

  1: [
    "Déçu de mon achat.",
    "Pas vraiment satisfait.",
    "Qualité décevante."
  ]
};


function generateReviews(product) {

  const reviews = [];

  const reviewCount = randomInt(850, 950);

  for (let i = 0; i < reviewCount; i++) {

    const roll = Math.random();

    let rating;

    if (roll < 0.72) {

      rating = 5;

    } else if (roll < 0.90) {

      rating = 4;

    } else if (roll < 0.97) {

      rating = 3;

    } else if (roll < 0.99) {

      rating = 2;

    } else {

      rating = 1;
    }

    const first = randomItem(firstNames);
    const last = randomItem(lastNames);

    const daysAgo = randomInt(0, 720);

    const date = new Date(
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
        randomItem(reviewTexts[rating]),

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

  const reviews = getReviews(product);

  let total = 0;

  for (const review of reviews) {
    total += review.rating;
  }

  return {

    count: reviews.length,

    average:
      reviews.length
        ? total / reviews.length
        : 0
  };
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

  const container =
    document.getElementById("categories");

  if (!container) return;

  const categories = [
    "Tous",
    ...new Set(
      products.map(product => product.category)
    )
  ];

  container.innerHTML =
    categories.map(category => {

      const active =
        category === selectedCategory
          ? "active"
          : "";

      return `
        <button
          class="category-btn ${active}"
          data-category="${escapeHtml(category)}"
        >
          ${escapeHtml(category)}
        </button>
      `;

    }).join("");

  container
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener("click", () => {

        selectedCategory =
          button.dataset.category;

        renderCategories();
        renderProducts();
      });
    });
}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts() {

  const container =
    document.getElementById("productsGrid");

  if (!container) return;

  const filtered =
    products.filter(product => {

      const categoryOk =
        selectedCategory === "Tous" ||
        product.category === selectedCategory;

      const search =
        searchValue
          .trim()
          .toLowerCase();

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
        <article class="product-card">

          <img
            class="product-image"
            src="${product.image}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
          >

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

              <span class="stars">
                ${stars(stats.average)}
              </span>

              <strong>
                ${stats.average.toFixed(1)}/5
              </strong>

              <span
                style="
                  color:#9ba8bd;
                  font-size:12px;
                "
              >
                (${stats.count.toLocaleString("fr-FR")} avis)
              </span>

            </div>

            <div
              style="
                color:#71809a;
                font-size:11px;
                margin-top:3px;
              "
            >
              ${stats.count.toLocaleString("fr-FR")} avis
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

  container
    .querySelectorAll("[data-view-reviews]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const product =
          products.find(
            p => p.id === button.dataset.viewReviews
          );

        if (product) {
          openReviews(product);
        }
      });
    });

  container
    .querySelectorAll("[data-add-cart]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const product =
          products.find(
            p => p.id === button.dataset.addCart
          );

        if (product) {
          addToCart(product);
        }
      });
    });
}


/* =========================================================
   AVIS MODAL
========================================================= */

function openReviews(product) {

  const container =
    document.getElementById("reviewsContent");

  if (!container) return;

  const reviews =
    getReviews(product);

  const stats =
    getReviewStats(product);

  const shuffled =
    [...reviews]
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);

  container.innerHTML = `

    <div class="reviews-header">

      <h2>
        Avis sur ${escapeHtml(product.name)}
      </h2>

      <div class="review-big">
        ${stats.average.toFixed(1)}/5
      </div>

      <div class="stars">
        ${stars(stats.average)}
      </div>

      <div>
        ${stats.count.toLocaleString("fr-FR")} avis
      </div>

    </div>

    <div class="review-list">

      ${shuffled.map(review => `

        <div class="review-item">

          <div class="review-top">

            <strong>
              ${escapeHtml(review.name)}
            </strong>

            <span class="stars">
              ${stars(review.rating)}
            </span>

          </div>

          <div class="review-text">
            ${escapeHtml(review.text)}
          </div>

          <div class="review-date">
            ${review.date.toLocaleDateString("fr-FR")}
          </div>

        </div>

      `).join("")}

    </div>
  `;

  openModal("reviewsModal");
}


/* =========================================================
   PANIER
========================================================= */

function saveCart() {

  localStorage.setItem(
    "novashop_cart",
    JSON.stringify(cart)
  );
}


function loadCart() {

  try {

    const saved =
      localStorage.getItem("novashop_cart");

    cart =
      saved
        ? JSON.parse(saved)
        : [];

  } catch {

    cart = [];
  }
}


function addToCart(product) {

  const existing =
    cart.find(
      item => item.id === product.id
    );

  if (existing) {

    existing.quantity++;

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
  renderCart();

  showToast(
    `${product.name} ajouté au panier 🛒`
  );
}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();
  renderCart();
}


function changeQuantity(id, amount) {

  const item =
    cart.find(
      product => product.id === id
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id);

    return;
  }

  saveCart();
  renderCart();
}


function renderCart() {

  const container =
    document.getElementById("cartContent");

  if (!container) return;

  if (!cart.length) {

    container.innerHTML = `
      <div class="empty">
        🛒 Ton panier est vide.
      </div>
    `;

    updateCartCount();

    return;
  }

  let total = 0;

  cart.forEach(item => {

    total +=
      item.price *
      item.quantity;
  });

  container.innerHTML = `

    <div class="cart-list">

      ${cart.map(item => `

        <div class="cart-item">

          <img
            src="${item.image}"
            alt=""
          >

          <div class="cart-item-info">

            <strong>
              ${escapeHtml(item.name)}
            </strong>

            <div>
              ${money(item.price)}
            </div>

            <div class="quantity">

              <button
                data-minus="${item.id}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-plus="${item.id}"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="delete-btn"
            data-delete-cart="${item.id}"
          >
            🗑️
          </button>

        </div>

      `).join("")}

    </div>

    <div class="cart-total">

      <span>Total</span>

      <strong>
        ${money(total)}
      </strong>

    </div>

    <button
      class="btn primary full"
      id="checkoutButton"
    >
      💳 Passer la commande
    </button>
  `;

  container
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.addEventListener("click", () => {

        changeQuantity(
          button.dataset.minus,
          -1
        );
      });
    });

  container
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.addEventListener("click", () => {

        changeQuantity(
          button.dataset.plus,
          1
        );
      });
    });

  container
    .querySelectorAll("[data-delete-cart]")
    .forEach(button => {

      button.addEventListener("click", () => {

        removeFromCart(
          button.dataset.deleteCart
        );
      });
    });

  const checkout =
    document.getElementById("checkoutButton");

  if (checkout) {

    checkout.addEventListener(
      "click",
      openCheckout
    );
  }

  updateCartCount();
}


function updateCartCount() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  document
    .querySelectorAll(".cart-count")
    .forEach(element => {

      element.textContent = count;
    });
}


/* =========================================================
   AUTH
========================================================= */

async function handleAuth() {

  const email =
    document
      .getElementById("authEmail")
      ?.value
      .trim();

  const password =
    document
      .getElementById("authPassword")
      ?.value;

  const error =
    document.getElementById("authError");

  if (!email || !password) {

    if (error) {
      error.textContent =
        "Remplis tous les champs.";
    }

    return;
  }

  try {

    if (authMode === "login") {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showToast("Connexion réussie ✅");

    } else {

      if (password.length < 6) {

        if (error) {
          error.textContent =
            "Le mot de passe doit contenir au moins 6 caractères.";
        }

        return;
      }

      if (password.length > 30) {

        if (error) {
          error.textContent =
            "Le mot de passe doit contenir maximum 30 caractères.";
        }

        return;
      }

      if (!/[a-z]/.test(password)) {

        if (error) {
          error.textContent =
            "Il faut au moins une minuscule.";
        }

        return;
      }

      if (!/[A-Z]/.test(password)) {

        if (error) {
          error.textContent =
            "Il faut au moins une majuscule.";
        }

        return;
      }

      if (!/[0-9]/.test(password)) {

        if (error) {
          error.textContent =
            "Il faut au moins un chiffre.";
        }

        return;
      }

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      showToast("Compte créé ✅");
    }

    closeModal("authModal");

  } catch (err) {

    console.error(err);

    if (error) {

      error.textContent =
        getFirebaseError(err);
    }
  }
}


function getFirebaseError(error) {

  const code =
    error?.code || "";

  const errors = {

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/email-already-in-use":
      "Cette adresse email est déjà utilisée.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/user-not-found":
      "Utilisateur introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."
  };

  return (
    errors[code] ||
    error?.message ||
    "Une erreur est survenue."
  );
}


function switchAuthMode() {

  authMode =
    authMode === "login"
      ? "register"
      : "login";

  const title =
    document.getElementById("authTitle");

  const button =
    document.getElementById("authSubmit");

  const switchButton =
    document.getElementById("authSwitch");

  if (authMode === "login") {

    if (title)
      title.textContent = "Connexion";

    if (button)
      button.textContent = "Se connecter";

    if (switchButton)
      switchButton.textContent =
        "Créer un compte";

  } else {

    if (title)
      title.textContent = "Créer un compte";

    if (button)
      button.textContent =
        "Créer mon compte";

    if (switchButton)
      switchButton.textContent =
        "J'ai déjà un compte";
  }
}


/* =========================================================
   QUESTIONS
========================================================= */

async function sendQuestion() {

  if (!currentUser) {

    showToast(
      "Connecte-toi pour poser une question."
    );

    return;
  }

  const input =
    document.getElementById("newQuestionText");

  if (!input) return;

  const text =
    input.value.trim();

  if (!text) {

    showToast(
      "Écris ta question."
    );

    return;
  }

  try {

    await addDoc(
      collection(db, "questions"),
      {

        userId:
          currentUser.uid,

        userEmail:
          currentUser.email || "",

        text,

        status:
          "open",

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp()
      }
    );

    input.value = "";

    showToast(
      "Question envoyée ✅"
    );

    loadUserQuestions();

  } catch (error) {

    console.error(
      "ERREUR ENVOI QUESTION :",
      error
    );

    showToast(
      "Impossible d'envoyer la question."
    );
  }
}


async function sendAdminReply(
  questionId
) {

  if (
    !currentUser ||
    currentUser.email !== ADMIN_EMAIL
  ) {
    return;
  }

  const input =
    document.getElementById(
      `adminReply-${questionId}`
    );

  if (!input) return;

  const text =
    input.value.trim();

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

        text,

        senderId:
          currentUser.uid,

        senderEmail:
          currentUser.email,

        senderRole:
          "admin",

        createdAt:
          serverTimestamp()
      }
    );

    await updateDoc(
      doc(db, "questions", questionId),
      {
        updatedAt:
          serverTimestamp(),

        status:
          "answered"
      }
    );

    input.value = "";

    showToast(
      "Réponse envoyée ✅"
    );

  } catch (error) {

    console.error(
      "ERREUR REPONSE ADMIN :",
      error
    );

    showToast(
      "Impossible d'envoyer la réponse."
    );
  }
}


async function sendUserReply(
  questionId
) {

  if (!currentUser) return;

  const input =
    document.getElementById(
      `userReply-${questionId}`
    );

  if (!input) return;

  const text =
    input.value.trim();

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

        text,

        senderId:
          currentUser.uid,

        senderEmail:
          currentUser.email,

        senderRole:
          "user",

        createdAt:
          serverTimestamp()
      }
    );

    await updateDoc(
      doc(db, "questions", questionId),
      {
        updatedAt:
          serverTimestamp(),

        status:
          "open"
      }
    );

    input.value = "";

  } catch (error) {

    console.error(
      "ERREUR REPONSE UTILISATEUR :",
      error
    );

    showToast(
      "Impossible d'envoyer le message."
    );
  }
}


/* =========================================================
   MESSAGES
========================================================= */

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

        const messages =
          [...snapshot.docs];

        messages.sort(
          (a, b) => {

            const dateA =
              a.data()
                .createdAt
                ?.toMillis?.() || 0;

            const dateB =
              b.data()
                .createdAt
                ?.toMillis?.() || 0;

            return dateA - dateB;
          }
        );

        const container =
          document.getElementById(
            containerId
          );

        if (!container) return;

        if (!messages.length) {

          container.innerHTML = `
            <div
              style="
                color:#71809a;
                padding:8px 0;
              "
            >
              Aucun message pour le moment.
            </div>
          `;

          return;
        }

        container.innerHTML =
          messages.map(
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
                    ${isAdmin
                      ? "admin"
                      : "user"}
                  "
                >

                  <div class="message-author">

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

                  <div>
                    ${escapeHtml(
                      data.text || ""
                    )}
                  </div>

                </div>
              `;
            }
          ).join("");

        container.scrollTop =
          container.scrollHeight;
      },

      error => {

        console.error(
          "ERREUR MESSAGES :",
          error
        );

        const container =
          document.getElementById(
            containerId
          );

        if (container) {

          container.innerHTML = `
            <div
              style="
                color:#ff7d7d;
                padding:10px;
              "
            >
              ❌ Impossible de charger les messages.
              <br>
              <small>
                ${escapeHtml(
                  error.message || ""
                )}
              </small>
            </div>
          `;
        }
      }
    );

  return unsubscribe;
}


/* =========================================================
   QUESTIONS UTILISATEUR
   SANS ORDERBY = PAS BESOIN D'INDEX COMPOSITE
========================================================= */

async function loadUserQuestions() {

  const container =
    document.getElementById(
      "questionsContent"
    );

  if (!container) return;

  if (!currentUser) {

    container.innerHTML = `
      <div class="empty">
        Connecte-toi pour accéder à tes discussions.
      </div>
    `;

    return;
  }

  if (questionsUnsubscribe) {

    questionsUnsubscribe();

    questionsUnsubscribe = null;
  }

  try {

    const q =
      query(
        collection(db, "questions"),
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

              const dataA =
                a.data();

              const dataB =
                b.data();

              const dateA =
                dataA.updatedAt
                  ?.toMillis?.() ||
                dataA.createdAt
                  ?.toMillis?.() ||
                0;

              const dateB =
                dataB.updatedAt
                  ?.toMillis?.() ||
                dataB.createdAt
                  ?.toMillis?.() ||
                0;

              return dateB - dateA;
            }
          );

          renderUserQuestions(
            docs
          );
        },

        error => {

          console.error(
            "ERREUR QUESTIONS :",
            error
          );

          container.innerHTML = `
            <div
              style="
                background:#32151a;
                border:1px solid #71313b;
                padding:18px;
                border-radius:12px;
                color:#ff9aa5;
              "
            >

              ❌ Impossible de charger les questions.

              <br><br>

              <small>
                ${escapeHtml(
                  error.message ||
                  "Erreur Firestore"
                )}
              </small>

            </div>
          `;
        }
      );

  } catch (error) {

    console.error(
      "ERREUR QUESTIONS :",
      error
    );

    container.innerHTML = `
      <div style="color:#ff7d7d">

        ❌ Impossible de charger les questions.

        <br>

        <small>
          ${escapeHtml(
            error.message || ""
          )}
        </small>

      </div>
    `;
  }
}


function renderUserQuestions(
  docs
) {

  const container =
    document.getElementById(
      "questionsContent"
    );

  if (!container) return;

  let html = `

    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        margin-bottom:18px;
        flex-wrap:wrap;
      "
    >

      <div>
        <h3 style="margin:0">
          Mes questions
        </h3>

        <div
          style="
            color:#71809a;
            font-size:13px;
            margin-top:4px;
          "
        >
          Contacte NovaShop
        </div>
      </div>

      <button
        class="btn primary"
        id="newQuestionButton"
      >
        ➕ Nouvelle question
      </button>

    </div>

    <div id="newQuestionForm"></div>

  `;

  if (!docs.length) {

    html += `
      <div class="empty">
        Tu n'as encore posé aucune question.
      </div>
    `;

  } else {

    html += docs.map(
      questionDoc => {

        const data =
          questionDoc.data();

        const questionId =
          questionDoc.id;

        const status =
          data.status === "answered"
            ? "Répondu"
            : "En cours";

        return `

          <div class="question-card">

            <div
              style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                align-items:flex-start;
              "
            >

              <div>

                <div
                  style="
                    font-size:12px;
                    color:#71809a;
                  "
                >
                  Ta question
                </div>

                <div
                  style="
                    margin-top:5px;
                    font-weight:700;
                  "
                >
                  ${escapeHtml(
                    data.text || ""
                  )}
                </div>

              </div>

              <span
                class="
                  question-status
                  ${
                    data.status === "answered"
                      ? "answered"
                      : ""
                  }
                "
              >
                ${status}
              </span>

            </div>

            <div
              class="messages"
              id="messages-user-${questionId}"
            >
              Chargement...
            </div>

            <div
              class="reply-box"
            >

              <textarea
                id="userReply-${questionId}"
                placeholder="Écris un message..."
              ></textarea>

              <button
                class="btn primary"
                data-user-reply="${questionId}"
              >
                Envoyer
              </button>

            </div>

          </div>

        `;
      }
    ).join("");
  }

  container.innerHTML = html;

  const newButton =
    document.getElementById(
      "newQuestionButton"
    );

  if (newButton) {

    newButton.addEventListener(
      "click",
      showNewQuestionForm
    );
  }

  container
    .querySelectorAll(
      "[data-user-reply]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          sendUserReply(
            button.dataset.userReply
          );
        }
      );
    });

  docs.forEach(questionDoc => {

    loadQuestionMessages(
      questionDoc.id,
      `messages-user-${questionDoc.id}`
    );
  });
}


/* =========================================================
   NOUVELLE QUESTION
========================================================= */

function showNewQuestionForm() {

  const container =
    document.getElementById(
      "newQuestionForm"
    );

  if (!container) return;

  container.innerHTML = `

    <div
      class="new-question"
    >

      <textarea
        id="newQuestionText"
        placeholder="Écris ta question à NovaShop..."
      ></textarea>

      <div
        style="
          display:flex;
          gap:10px;
          margin-top:10px;
        "
      >

        <button
          class="btn primary"
          id="sendQuestionButton"
        >
          📤 Envoyer
        </button>

        <button
          class="btn"
          id="cancelQuestionButton"
        >
          Annuler
        </button>

      </div>

    </div>
  `;

  document
    .getElementById(
      "sendQuestionButton"
    )
    ?.addEventListener(
      "click",
      sendQuestion
    );

  document
    .getElementById(
      "cancelQuestionButton"
    )
    ?.addEventListener(
      "click",
      () => {

        container.innerHTML = "";
      }
    );
}


/* =========================================================
   QUESTIONS ADMIN
   PAS DE ORDERBY
========================================================= */

function loadAdminQuestions() {

  const container =
    document.getElementById(
      "adminQuestionsContent"
    );

  if (!container) return;

  if (!currentUser) {

    container.innerHTML = `
      <div class="empty">
        Connexion requise.
      </div>
    `;

    return;
  }

  if (
    currentUser.email !== ADMIN_EMAIL
  ) {

    container.innerHTML = `
      <div class="empty">
        Accès administrateur requis.
      </div>
    `;

    return;
  }

  if (adminQuestionsUnsubscribe) {

    adminQuestionsUnsubscribe();

    adminQuestionsUnsubscribe = null;
  }

  adminQuestionsUnsubscribe =
    onSnapshot(

      collection(db, "questions"),

      snapshot => {

        const docs =
          [...snapshot.docs];

        docs.sort(
          (a, b) => {

            const dataA =
              a.data();

            const dataB =
              b.data();

            const dateA =
              dataA.updatedAt
                ?.toMillis?.() ||
              dataA.createdAt
                ?.toMillis?.() ||
              0;

            const dateB =
              dataB.updatedAt
                ?.toMillis?.() ||
              dataB.createdAt
                ?.toMillis?.() ||
              0;

            return dateB - dateA;
          }
        );

        renderAdminQuestions(
          docs
        );
      },

      error => {

        console.error(
          "ERREUR ADMIN QUESTIONS :",
          error
        );

        container.innerHTML = `
          <div
            style="
              background:#32151a;
              border:1px solid #71313b;
              padding:18px;
              border-radius:12px;
              color:#ff9aa5;
            "
          >

            ❌ Impossible de charger les questions.

            <br><br>

            <small>
              ${escapeHtml(
                error.message || ""
              )}
            </small>

          </div>
        `;
      }
    );
}


function renderAdminQuestions(
  docs
) {

  const container =
    document.getElementById(
      "adminQuestionsContent"
    );

  if (!container) return;

  if (!docs.length) {

    container.innerHTML = `
      <div class="empty">
        📭 Aucune question.
      </div>
    `;

    updateQuestionBadge(0);

    return;
  }

  updateQuestionBadge(
    docs.length
  );

  container.innerHTML =
    docs.map(questionDoc => {

      const data =
        questionDoc.data();

      const id =
        questionDoc.id;

      return `

        <div
          class="question-card admin-question"
        >

          <div
            style="
              display:flex;
              justify-content:space-between;
              gap:10px;
            "
          >

            <div>

              <div
                style="
                  color:#71809a;
                  font-size:12px;
                "
              >
                👤
                ${escapeHtml(
                  data.userEmail ||
                  "Utilisateur"
                )}
              </div>

              <div
                style="
                  font-weight:800;
                  margin-top:6px;
                "
              >
                ${escapeHtml(
                  data.text || ""
                )}
              </div>

            </div>

            <button
              class="delete-btn"
              data-delete-question="${id}"
            >
              🗑️
            </button>

          </div>

          <div
            class="messages"
            id="messages-admin-${id}"
          >
            Chargement...
          </div>

          <div
            class="reply-box"
          >

            <textarea
              id="adminReply-${id}"
              placeholder="Répondre à cet utilisateur..."
            ></textarea>

            <button
              class="btn primary"
              data-admin-reply="${id}"
            >
              👑 Répondre
            </button>

          </div>

        </div>

      `;
    }).join("");

  container
    .querySelectorAll(
      "[data-admin-reply]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          sendAdminReply(
            button.dataset.adminReply
          );
        }
      );
    });

  container
    .querySelectorAll(
      "[data-delete-question]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          deleteQuestion(
            button.dataset.deleteQuestion
          );
        }
      );
    });

  docs.forEach(questionDoc => {

    loadQuestionMessages(
      questionDoc.id,
      `messages-admin-${questionDoc.id}`
    );
  });
}


function updateQuestionBadge(
  count
) {

  document
    .querySelectorAll(
      ".question-count"
    )
    .forEach(element => {

      element.textContent =
        count;

      element.style.display =
        count > 0
          ? "inline-flex"
          : "none";
    });
}


async function deleteQuestion(
  questionId
) {

  if (
    !currentUser ||
    currentUser.email !== ADMIN_EMAIL
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
      "Question supprimée 🗑️"
    );

  } catch (error) {

    console.error(
      error
    );

    showToast(
      "Impossible de supprimer la question."
    );
  }
}


/* =========================================================
   COMMANDES
========================================================= */

async function openCheckout() {

  if (!currentUser) {

    closeModal("cartModal");

    openModal("authModal");

    showToast(
      "Connecte-toi pour commander."
    );

    return;
  }

  if (!cart.length) {

    showToast(
      "Ton panier est vide."
    );

    return;
  }

  openModal("checkoutModal");
}


async function createOrder() {

  if (!currentUser) {

    showToast(
      "Connecte-toi."
    );

    return;
  }

  const address =
    document
      .getElementById("deliveryAddress")
      ?.value
      .trim();

  if (!address) {

    showToast(
      "Adresse obligatoire."
    );

    return;
  }

  let total = 0;

  cart.forEach(item => {

    total +=
      item.price *
      item.quantity;
  });

  try {

    const orderItems =
      cart.map(item => ({

        id: item.id,

        name: item.name,

        price: item.price,

        quantity: item.quantity
      }));

    await addDoc(
      collection(db, "orders"),
      {

        userId:
          currentUser.uid,

        userEmail:
          currentUser.email,

        items:
          orderItems,

        total,

        address,

        status:
          "Préparation",

        currentLocation:
          "Entrepôt NovaShop",

        destination:
          address,

        deliveryDate:
          new Date(
            Date.now() +
            3 * 86400000
          ),

        createdAt:
          serverTimestamp()
      }
    );

    cart = [];

    saveCart();

    renderCart();

    closeModal("checkoutModal");

    showToast(
      "Commande créée ✅"
    );

  } catch (error) {

    console.error(
      "ERREUR COMMANDE :",
      error
    );

    showToast(
      "Impossible de créer la commande."
    );
  }
}


/* =========================================================
   AFFICHAGE COMMANDES
========================================================= */

function loadOrders() {

  const container =
    document.getElementById(
      "ordersContent"
    );

  if (!container) return;

  if (!currentUser) {

    container.innerHTML = `
      <div class="empty">
        Connecte-toi pour voir tes commandes.
      </div>
    `;

    return;
  }

  const q =
    query(
      collection(db, "orders"),
      where(
        "userId",
        "==",
        currentUser.uid
      )
    );

  onSnapshot(

    q,

    snapshot => {

      const orders =
        [...snapshot.docs];

      orders.sort(
        (a, b) => {

          const dateA =
            a.data()
              .createdAt
              ?.toMillis?.() || 0;

          const dateB =
            b.data()
              .createdAt
              ?.toMillis?.() || 0;

          return dateB - dateA;
        }
      );

      if (!orders.length) {

        container.innerHTML = `
          <div class="empty">
            📦 Tu n'as encore aucune commande.
          </div>
        `;

        return;
      }

      container.innerHTML =
        orders.map(orderDoc => {

          const order =
            orderDoc.data();

          return `

            <div class="order-card">

              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  gap:10px;
                "
              >

                <strong>
                  Commande #${escapeHtml(
                    orderDoc.id.slice(0, 8)
                  )}
                </strong>

                <span class="order-status">
                  ${escapeHtml(
                    order.status ||
                    "En préparation"
                  )}
                </span>

              </div>

              <div class="order-info">

                📍 Position :
                ${escapeHtml(
                  order.currentLocation ||
                  "En préparation"
                )}

                <br>

                🏠 Destination :
                ${escapeHtml(
                  order.destination ||
                  order.address ||
                  ""
                )}

              </div>

              <div class="order-items">

                ${
                  (order.items || [])
                    .map(item => `
                      <div>
                        ${escapeHtml(
                          item.name
                        )}
                        ×${item.quantity}
                      </div>
                    `)
                    .join("")
                }

              </div>

              <div class="order-total">
                Total :
                ${money(
                  Number(order.total || 0)
                )}
              </div>

            </div>
          `;
        }).join("");
    },

    error => {

      console.error(
        "ERREUR COMMANDES :",
        error
      );

      container.innerHTML = `
        <div style="color:#ff7d7d">
          ❌ Impossible de charger les commandes.
        </div>
      `;
    }
  );
}


/* =========================================================
   ADMIN CODE
========================================================= */

function openAdminAccess() {

  if (!currentUser) {

    openModal("authModal");

    showToast(
      "Connecte-toi d'abord."
    );

    return;
  }

  if (
    currentUser.email !== ADMIN_EMAIL
  ) {

    showToast(
      "Accès administrateur refusé."
    );

    return;
  }

  openModal("adminCodeModal");
}


function validateAdminCode() {

  const input =
    document.getElementById(
      "adminCodeInput"
    );

  const error =
    document.getElementById(
      "adminCodeError"
    );

  if (!input) return;

  if (
    input.value === ADMIN_CODE
  ) {

    if (error)
      error.textContent = "";

    input.value = "";

    closeModal(
      "adminCodeModal"
    );

    openModal(
      "adminModal"
    );

    loadAdminQuestions();

    showToast(
      "Dashboard administrateur ouvert 👑"
    );

  } else {

    if (error) {

      error.textContent =
        "Code administrateur incorrect.";
    }
  }
}


/* =========================================================
   RECHERCHE
========================================================= */

function setupSearch() {

  const search =
    document.getElementById(
      "searchInput"
    );

  if (!search) return;

  search.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value;

      renderProducts();
    }
  );
}


/* =========================================================
   BOUTONS
========================================================= */

function setupButtons() {

  document
    .querySelectorAll(
      "[data-open-auth]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openModal(
            "authModal"
          );
        }
      );
    });

  document
    .querySelectorAll(
      "[data-open-cart]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          renderCart();

          openModal(
            "cartModal"
          );
        }
      );
    });

  document
    .querySelectorAll(
      "[data-open-orders]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          loadOrders();

          openModal(
            "ordersModal"
          );
        }
      );
    });

  document
    .querySelectorAll(
      "[data-open-questions]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          loadUserQuestions();

          openModal(
            "questionsModal"
          );
        }
      );
    });

  document
    .querySelectorAll(
      "[data-open-admin]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        openAdminAccess
      );
    });

  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          closeModal(
            button.dataset.closeModal
          );
        }
      );
    });

  document
    .getElementById(
      "authSubmit"
    )
    ?.addEventListener(
      "click",
      handleAuth
    );

  document
    .getElementById(
      "authSwitch"
    )
    ?.addEventListener(
      "click",
      switchAuthMode
    );

  document
    .getElementById(
      "logoutButton"
    )
    ?.addEventListener(
      "click",
      async () => {

        await signOut(auth);

        closeModal(
          "accountModal"
        );

        showToast(
          "Déconnexion réussie."
        );
      }
    );

  document
    .getElementById(
      "adminCodeSubmit"
    )
    ?.addEventListener(
      "click",
      validateAdminCode
    );

  document
    .getElementById(
      "createOrderButton"
    )
    ?.addEventListener(
      "click",
      createOrder
    );
}


/* =========================================================
   ETAT UTILISATEUR
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    const accountText =
      document.getElementById(
        "accountText"
      );

    const adminButton =
      document.getElementById(
        "adminButton"
      );

    if (user) {

      if (accountText) {

        accountText.textContent =
          user.email;
      }

      if (
        adminButton &&
        user.email === ADMIN_EMAIL
      ) {

        adminButton.style.display =
          "inline-flex";

      } else if (adminButton) {

        adminButton.style.display =
          "none";
      }

    } else {

      if (accountText) {

        accountText.textContent =
          "Compte";
      }

      if (adminButton) {

        adminButton.style.display =
          "none";
      }
    }
  }
);


/* =========================================================
   INITIALISATION
========================================================= */

loadCart();

renderCategories();

renderProducts();

renderCart();

setupSearch();

setupButtons();


/* =========================================================
   FERMETURE MODALES EN CLIQUANT DEHORS
========================================================= */

document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "open"
          );
        }
      }
    );
  });


console.log(
  "NovaShop chargé correctement 🚀"
);
