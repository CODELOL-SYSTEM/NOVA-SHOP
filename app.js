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
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
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

  const full =
    Math.round(Number(rating) || 0);

  return "★".repeat(full) +
    "☆".repeat(
      Math.max(0, 5 - full)
    );

}/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "info") {

  if (!toastContainer) return;

  const toast = document.createElement("div");

  toast.className = `toast toast-${type}`;

  toast.innerHTML = `
    <div class="toast-icon">
      ${
        type === "success"
          ? "✓"
          : type === "error"
          ? "!"
          : "i"
      }
    </div>

    <div class="toast-message">
      ${escapeHtml(message)}
    </div>
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

  }, 3000);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(html) {

  if (!modal || !modalContent) return;

  modalContent.innerHTML = html;

  modal.classList.add("open");

  document.body.classList.add("modal-open");
}


function closeModal() {

  if (!modal) return;

  modal.classList.remove("open");

  document.body.classList.remove("modal-open");
}


if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal();
    }

  });

}


/* =========================================================
   AUTH
========================================================= */

function renderAuthModal() {

  const isLogin = authMode === "login";

  openModal(`

    <div class="auth-box">

      <div class="auth-header">

        <div class="auth-icon">
          ${isLogin ? "👤" : "✨"}
        </div>

        <div>
          <h2>
            ${isLogin ? "Connexion" : "Créer un compte"}
          </h2>

          <p>
            ${
              isLogin
                ? "Connecte-toi à ton compte NovaShop."
                : "Crée ton compte NovaShop gratuitement."
            }
          </p>
        </div>

      </div>


      <form id="authForm">

        ${
          !isLogin
            ? `
              <label for="authName">
                Nom
              </label>

              <input
                id="authName"
                type="text"
                placeholder="Ton nom"
                autocomplete="name"
                required
              >
            `
            : ""
        }


        <label for="authEmail">
          Email
        </label>

        <input
          id="authEmail"
          type="email"
          placeholder="ton@email.com"
          autocomplete="email"
          required
        >


        <label for="authPassword">
          Mot de passe
        </label>

        <input
          id="authPassword"
          type="password"
          placeholder="••••••••"
          autocomplete="${
            isLogin
              ? "current-password"
              : "new-password"
          }"
          minlength="6"
          required
        >


        <button
          class="primary-btn auth-submit"
          type="submit"
        >
          ${
            isLogin
              ? "Se connecter"
              : "Créer mon compte"
          }
        </button>

      </form>


      <div class="auth-switch">

        <span>
          ${
            isLogin
              ? "Pas encore de compte ?"
              : "Tu as déjà un compte ?"
          }
        </span>

        <button
          type="button"
          id="switchAuthBtn"
          class="text-btn"
        >
          ${
            isLogin
              ? "Créer un compte"
              : "Se connecter"
          }
        </button>

      </div>

    </div>

  `);


  const form = $("authForm");
  const switchBtn = $("switchAuthBtn");

  if (switchBtn) {

    switchBtn.addEventListener("click", () => {

      authMode =
        authMode === "login"
          ? "register"
          : "login";

      renderAuthModal();

    });

  }


  if (form) {

    form.addEventListener("submit", async event => {

      event.preventDefault();

      const email =
        $("authEmail")?.value.trim();

      const password =
        $("authPassword")?.value;

      if (!email || !password) {
        showToast(
          "Remplis tous les champs.",
          "error"
        );
        return;
      }


      try {

        if (isLogin) {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast(
            "Connexion réussie !",
            "success"
          );

          closeModal();

        } else {

          const name =
            $("authName")?.value.trim();

          const credentials =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

          try {

            await addDoc(
              collection(db, "users"),
              {
                uid: credentials.user.uid,
                email,
                name: name || "",
                createdAt: serverTimestamp()
              }
            );

          } catch (profileError) {

            console.warn(
              "Profil utilisateur non enregistré :",
              profileError
            );

          }

          showToast(
            "Compte créé avec succès !",
            "success"
          );

          closeModal();

        }

      } catch (error) {

        console.error(error);

        let message =
          "Une erreur est survenue.";

        if (
          error.code ===
          "auth/invalid-credential"
        ) {
          message =
            "Email ou mot de passe incorrect.";
        }

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {
          message =
            "Cette adresse email est déjà utilisée.";
        }

        if (
          error.code ===
          "auth/weak-password"
        ) {
          message =
            "Le mot de passe doit contenir au moins 6 caractères.";
        }

        if (
          error.code ===
          "auth/invalid-email"
        ) {
          message =
            "Adresse email invalide.";
        }

        showToast(
          message,
          "error"
        );

      }

    });

  }

}


function openAccount() {

  if (currentUser) {

    openModal(`

      <div class="account-box">

        <div class="account-header">

          <div class="account-avatar">
            👤
          </div>

          <div>

            <h2>
              Mon compte
            </h2>

            <p>
              ${escapeHtml(
                currentUser.email || ""
              )}
            </p>

          </div>

        </div>


        <div class="account-actions">

          <button
            id="accountOrdersBtn"
            class="secondary-btn"
          >
            📦 Mes commandes
          </button>

          <button
            id="accountLogoutBtn"
            class="danger-btn"
          >
            🚪 Se déconnecter
          </button>

        </div>

      </div>

    `);


    $("accountOrdersBtn")?.addEventListener(
      "click",
      () => {

        closeModal();
        openOrders();

      }
    );


    $("accountLogoutBtn")?.addEventListener(
      "click",
      async () => {

        try {

          await signOut(auth);

          localStorage.removeItem(
            ADMIN_ACCESS_KEY
          );

          closeModal();

          showToast(
            "Tu es maintenant déconnecté.",
            "success"
          );

        } catch (error) {

          console.error(error);

          showToast(
            "Impossible de se déconnecter.",
            "error"
          );

        }

      }
    );

    return;
  }


  authMode = "login";

  renderAuthModal();
}


/* =========================================================
   CATEGORIES
========================================================= */

function getCategories() {

  const unique =
    [...new Set(
      products.map(product => product.category)
    )];

  return [
    "Tous",
    ...unique
  ];

}


function renderCategories() {

  if (!categoriesEl) return;

  const categories =
    getCategories();

  categoriesEl.innerHTML =
    categories.map(category => `

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

    `).join("");


  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category || "Tous";

          renderCategories();
          renderProducts();

          document
            .getElementById("productsSection")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

        }
      );

    });

}


/* =========================================================
   RECHERCHE
========================================================= */

function getFilteredProducts() {

  const search =
    searchValue
      .trim()
      .toLowerCase();


  return products.filter(product => {

    const matchesCategory =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;


    if (!search) {
      return matchesCategory;
    }


    const searchableText = [

      product.name,
      product.category

    ]
      .join(" ")
      .toLowerCase();


    return (
      matchesCategory &&
      searchableText.includes(search)
    );

  });

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value || "";

      renderProducts();

    }
  );

}


/* =========================================================
   REVIEWS
========================================================= */

function getProductReviews(productId) {

  if (reviewsCache[productId]) {

    return reviewsCache[productId];

  }


  /*
    IMPORTANT :
    Ces données servent uniquement de
    démonstration visuelle si aucun vrai
    système d'avis n'est connecté.
  */

  const count =
    randomInt(850, 950);

  const rating =
    Number(
      (
        4.3 +
        Math.random() * 0.6
      ).toFixed(1)
    );


  reviewsCache[productId] = {
    count,
    rating
  };


  return reviewsCache[productId];

}


function openReviews(product) {

  const reviews =
    getProductReviews(product.id);


  openModal(`

    <div class="reviews-box">

      <div class="reviews-title">

        <div>

          <span class="small-label">
            AVIS PRODUIT
          </span>

          <h2>
            ${escapeHtml(product.name)}
          </h2>

        </div>

      </div>


      <div class="reviews-summary">

        <div class="reviews-score">

          <strong>
            ${reviews.rating.toFixed(1)}
          </strong>

          <span>
            ${stars(reviews.rating)}
          </span>

        </div>


        <div class="reviews-count">

          ${reviews.count.toLocaleString(
            "fr-FR"
          )}
          avis

        </div>

      </div>


      <div class="review-demo-note">

        ⭐ Les avis affichés ici sont des
        statistiques de démonstration.
        Remplace-les par tes vrais avis clients
        avant la mise en ligne.

      </div>

    </div>

  `);

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function handleImageError(image) {

  if (!image) return;

  if (
    image.dataset.fallbackApplied === "true"
  ) {
    return;
  }

  image.dataset.fallbackApplied = "true";

  image.src = FALLBACK_IMAGE;

}/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "info") {

  if (!toastContainer) return;

  const toast = document.createElement("div");

  toast.className = `toast toast-${type}`;

  toast.innerHTML = `
    <div class="toast-icon">
      ${
        type === "success"
          ? "✓"
          : type === "error"
          ? "!"
          : "i"
      }
    </div>

    <div class="toast-message">
      ${escapeHtml(message)}
    </div>
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

  }, 3000);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(html) {

  if (!modal || !modalContent) return;

  modalContent.innerHTML = html;

  modal.classList.add("open");

  document.body.classList.add("modal-open");
}


function closeModal() {

  if (!modal) return;

  modal.classList.remove("open");

  document.body.classList.remove("modal-open");
}


if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal();
    }

  });

}


/* =========================================================
   AUTH
========================================================= */

function renderAuthModal() {

  const isLogin = authMode === "login";

  openModal(`

    <div class="auth-box">

      <div class="auth-header">

        <div class="auth-icon">
          ${isLogin ? "👤" : "✨"}
        </div>

        <div>
          <h2>
            ${isLogin ? "Connexion" : "Créer un compte"}
          </h2>

          <p>
            ${
              isLogin
                ? "Connecte-toi à ton compte NovaShop."
                : "Crée ton compte NovaShop gratuitement."
            }
          </p>
        </div>

      </div>


      <form id="authForm">

        ${
          !isLogin
            ? `
              <label for="authName">
                Nom
              </label>

              <input
                id="authName"
                type="text"
                placeholder="Ton nom"
                autocomplete="name"
                required
              >
            `
            : ""
        }


        <label for="authEmail">
          Email
        </label>

        <input
          id="authEmail"
          type="email"
          placeholder="ton@email.com"
          autocomplete="email"
          required
        >


        <label for="authPassword">
          Mot de passe
        </label>

        <input
          id="authPassword"
          type="password"
          placeholder="••••••••"
          autocomplete="${
            isLogin
              ? "current-password"
              : "new-password"
          }"
          minlength="6"
          required
        >


        <button
          class="primary-btn auth-submit"
          type="submit"
        >
          ${
            isLogin
              ? "Se connecter"
              : "Créer mon compte"
          }
        </button>

      </form>


      <div class="auth-switch">

        <span>
          ${
            isLogin
              ? "Pas encore de compte ?"
              : "Tu as déjà un compte ?"
          }
        </span>

        <button
          type="button"
          id="switchAuthBtn"
          class="text-btn"
        >
          ${
            isLogin
              ? "Créer un compte"
              : "Se connecter"
          }
        </button>

      </div>

    </div>

  `);


  const form = $("authForm");
  const switchBtn = $("switchAuthBtn");

  if (switchBtn) {

    switchBtn.addEventListener("click", () => {

      authMode =
        authMode === "login"
          ? "register"
          : "login";

      renderAuthModal();

    });

  }


  if (form) {

    form.addEventListener("submit", async event => {

      event.preventDefault();

      const email =
        $("authEmail")?.value.trim();

      const password =
        $("authPassword")?.value;

      if (!email || !password) {
        showToast(
          "Remplis tous les champs.",
          "error"
        );
        return;
      }


      try {

        if (isLogin) {

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          showToast(
            "Connexion réussie !",
            "success"
          );

          closeModal();

        } else {

          const name =
            $("authName")?.value.trim();

          const credentials =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

          try {

            await addDoc(
              collection(db, "users"),
              {
                uid: credentials.user.uid,
                email,
                name: name || "",
                createdAt: serverTimestamp()
              }
            );

          } catch (profileError) {

            console.warn(
              "Profil utilisateur non enregistré :",
              profileError
            );

          }

          showToast(
            "Compte créé avec succès !",
            "success"
          );

          closeModal();

        }

      } catch (error) {

        console.error(error);

        let message =
          "Une erreur est survenue.";

        if (
          error.code ===
          "auth/invalid-credential"
        ) {
          message =
            "Email ou mot de passe incorrect.";
        }

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {
          message =
            "Cette adresse email est déjà utilisée.";
        }

        if (
          error.code ===
          "auth/weak-password"
        ) {
          message =
            "Le mot de passe doit contenir au moins 6 caractères.";
        }

        if (
          error.code ===
          "auth/invalid-email"
        ) {
          message =
            "Adresse email invalide.";
        }

        showToast(
          message,
          "error"
        );

      }

    });

  }

}


function openAccount() {

  if (currentUser) {

    openModal(`

      <div class="account-box">

        <div class="account-header">

          <div class="account-avatar">
            👤
          </div>

          <div>

            <h2>
              Mon compte
            </h2>

            <p>
              ${escapeHtml(
                currentUser.email || ""
              )}
            </p>

          </div>

        </div>


        <div class="account-actions">

          <button
            id="accountOrdersBtn"
            class="secondary-btn"
          >
            📦 Mes commandes
          </button>

          <button
            id="accountLogoutBtn"
            class="danger-btn"
          >
            🚪 Se déconnecter
          </button>

        </div>

      </div>

    `);


    $("accountOrdersBtn")?.addEventListener(
      "click",
      () => {

        closeModal();
        openOrders();

      }
    );


    $("accountLogoutBtn")?.addEventListener(
      "click",
      async () => {

        try {

          await signOut(auth);

          localStorage.removeItem(
            ADMIN_ACCESS_KEY
          );

          closeModal();

          showToast(
            "Tu es maintenant déconnecté.",
            "success"
          );

        } catch (error) {

          console.error(error);

          showToast(
            "Impossible de se déconnecter.",
            "error"
          );

        }

      }
    );

    return;
  }


  authMode = "login";

  renderAuthModal();
}


/* =========================================================
   CATEGORIES
========================================================= */

function getCategories() {

  const unique =
    [...new Set(
      products.map(product => product.category)
    )];

  return [
    "Tous",
    ...unique
  ];

}


function renderCategories() {

  if (!categoriesEl) return;

  const categories =
    getCategories();

  categoriesEl.innerHTML =
    categories.map(category => `

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

    `).join("");


  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category || "Tous";

          renderCategories();
          renderProducts();

          document
            .getElementById("productsSection")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

        }
      );

    });

}


/* =========================================================
   RECHERCHE
========================================================= */

function getFilteredProducts() {

  const search =
    searchValue
      .trim()
      .toLowerCase();


  return products.filter(product => {

    const matchesCategory =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;


    if (!search) {
      return matchesCategory;
    }


    const searchableText = [

      product.name,
      product.category

    ]
      .join(" ")
      .toLowerCase();


    return (
      matchesCategory &&
      searchableText.includes(search)
    );

  });

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value || "";

      renderProducts();

    }
  );

}


/* =========================================================
   REVIEWS
========================================================= */

function getProductReviews(productId) {

  if (reviewsCache[productId]) {

    return reviewsCache[productId];

  }


  /*
    IMPORTANT :
    Ces données servent uniquement de
    démonstration visuelle si aucun vrai
    système d'avis n'est connecté.
  */

  const count =
    randomInt(850, 950);

  const rating =
    Number(
      (
        4.3 +
        Math.random() * 0.6
      ).toFixed(1)
    );


  reviewsCache[productId] = {
    count,
    rating
  };


  return reviewsCache[productId];

}


function openReviews(product) {

  const reviews =
    getProductReviews(product.id);


  openModal(`

    <div class="reviews-box">

      <div class="reviews-title">

        <div>

          <span class="small-label">
            AVIS PRODUIT
          </span>

          <h2>
            ${escapeHtml(product.name)}
          </h2>

        </div>

      </div>


      <div class="reviews-summary">

        <div class="reviews-score">

          <strong>
            ${reviews.rating.toFixed(1)}
          </strong>

          <span>
            ${stars(reviews.rating)}
          </span>

        </div>


        <div class="reviews-count">

          ${reviews.count.toLocaleString(
            "fr-FR"
          )}
          avis

        </div>

      </div>


      <div class="review-demo-note">

        ⭐ Les avis affichés ici sont des
        statistiques de démonstration.
        Remplace-les par tes vrais avis clients
        avant la mise en ligne.

      </div>

    </div>

  `);

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function handleImageError(image) {

  if (!image) return;

  if (
    image.dataset.fallbackApplied === "true"
  ) {
    return;
  }

  image.dataset.fallbackApplied = "true";

  image.src = FALLBACK_IMAGE;

}/* =========================================================
   PRODUITS
========================================================= */

function renderProducts() {

  if (!productsGrid) return;

  const filtered =
    getFilteredProducts();


  if (productCount) {

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1 ? "s" : ""
      }`;

  }


  if (!filtered.length) {

    productsGrid.innerHTML = `

      <div class="empty-products">

        <div class="empty-icon">
          🔎
        </div>

        <h3>
          Aucun produit trouvé
        </h3>

        <p>
          Essaie une autre recherche ou une autre catégorie.
        </p>

        <button
          class="secondary-btn"
          id="resetSearchBtn"
        >
          Réinitialiser
        </button>

      </div>

    `;


    $("resetSearchBtn")?.addEventListener(
      "click",
      () => {

        searchValue = "";
        selectedCategory = "Tous";

        if (searchInput) {
          searchInput.value = "";
        }

        renderCategories();
        renderProducts();

      }
    );

    return;

  }


  productsGrid.innerHTML =
    filtered.map(product => {

      const reviews =
        getProductReviews(product.id);


      const price =
        Number(product.price);


      return `

        <article
          class="product-card"
          data-product-id="${escapeHtml(product.id)}"
        >

          <div class="product-image-wrap">

            ${
              price > 0 && price < 60
                ? `
                  <span class="product-badge">
                    BON PLAN
                  </span>
                `
                : ""
            }


            <img
              class="product-image"
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              loading="lazy"
              onerror="handleImageError(this)"
            >

          </div>


          <div class="product-info">

            <div class="product-category">
              ${escapeHtml(product.category)}
            </div>


            <h3 class="product-name">
              ${escapeHtml(product.name)}
            </h3>


            <button
              class="reviews-btn"
              data-review-id="${escapeHtml(product.id)}"
              type="button"
            >
              <span class="stars">
                ${stars(reviews.rating)}
              </span>

              <span>
                ${reviews.rating.toFixed(1)}
              </span>

              <span class="review-count">
                (${reviews.count.toLocaleString("fr-FR")})
              </span>
            </button>


            <div class="product-bottom">

              <div class="product-price">

                ${
                  price > 0
                    ? money(price)
                    : `
                      <span class="price-coming">
                        Prix à venir
                      </span>
                    `
                }

              </div>


              <button
                class="add-cart-btn"
                data-add-id="${escapeHtml(product.id)}"
                type="button"
              >
                Ajouter
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");


  productsGrid
    .querySelectorAll("[data-add-id]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            products.find(
              item =>
                item.id === button.dataset.addId
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
    .querySelectorAll("[data-review-id]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            products.find(
              item =>
                item.id === button.dataset.reviewId
            );


          if (!product) return;

          openReviews(product);

        }
      );

    });


  productsGrid
    .querySelectorAll(".product-image")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => handleImageError(image)
      );

    });

}


/* =========================================================
   CART
========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      "novaShopCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn(
      "Impossible de sauvegarder le panier.",
      error
    );

  }

}


function sanitizeCart() {

  if (!Array.isArray(cart)) {

    cart = [];
    return;

  }


  cart = cart
    .map(item => {

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
          Math.floor(
            Number(item.quantity) || 1
          )
        );


      return {
        id: product.id,
        quantity
      };

    })
    .filter(Boolean);

}


function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        "novaShopCart"
      );


    if (saved) {

      cart =
        JSON.parse(saved);

    }

  } catch (error) {

    console.warn(
      "Panier invalide.",
      error
    );

    cart = [];

  }


  sanitizeCart();
  saveCart();

  renderCart();

}


function getCartQuantity() {

  return cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

}


function getCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );


      if (!product) {
        return total;
      }


      const price =
        Number(product.price);


      if (!Number.isFinite(price)) {
        return total;
      }


      return total +
        price * item.quantity;

    },
    0
  );

}


/* =========================================================
   ANIMATION AJOUT PANIER
========================================================= */

function animateProductToCart(button, product) {

  if (
    !button ||
    !cartBtn ||
    !product
  ) {
    return;
  }


  const card =
    button.closest(".product-card");


  const image =
    card?.querySelector(".product-image");


  if (!image) return;


  const start =
    image.getBoundingClientRect();


  const target =
    cartBtn.getBoundingClientRect();


  const flying =
    image.cloneNode(true);


  flying.className =
    "flying-cart-image";


  flying.style.position = "fixed";
  flying.style.left = `${start.left}px`;
  flying.style.top = `${start.top}px`;
  flying.style.width = `${Math.min(
    start.width,
    120
  )}px`;
  flying.style.height = `${Math.min(
    start.height,
    120
  )}px`;
  flying.style.objectFit = "contain";
  flying.style.zIndex = "99999";
  flying.style.pointerEvents = "none";
  flying.style.borderRadius = "16px";
  flying.style.transition =
    "left .55s cubic-bezier(.2,.8,.2,1), top .55s cubic-bezier(.2,.8,.2,1), width .55s ease, height .55s ease, opacity .55s ease, transform .55s ease";


  document.body.appendChild(flying);


  requestAnimationFrame(() => {

    flying.style.left =
      `${target.left + target.width / 2 - 25}px`;

    flying.style.top =
      `${target.top + target.height / 2 - 25}px`;

    flying.style.width = "50px";
    flying.style.height = "50px";
    flying.style.opacity = "0.25";
    flying.style.transform =
      "scale(.45) rotate(8deg)";

  });


  setTimeout(() => {

    flying.remove();

  }, 600);

}


/* =========================================================
   BADGE PANIER
========================================================= */

function animateCartBadge() {

  if (!cartBadge) return;

  cartBadge.classList.remove(
    "cart-badge-pop"
  );


  void cartBadge.offsetWidth;


  cartBadge.classList.add(
    "cart-badge-pop"
  );

}


/* =========================================================
   AJOUTER AU PANIER
========================================================= */

function addToCart(product, button = null) {

  if (!product) return;


  const existing =
    cart.find(
      item =>
        item.id === product.id
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      quantity: 1
    });

  }


  saveCart();
  renderCart();
  animateCartBadge();


  if (button) {

    animateProductToCart(
      button,
      product
    );


    const oldText =
      button.textContent;


    button.disabled = true;

    button.textContent =
      "Ajouté ✓";


    button.classList.add(
      "added"
    );


    setTimeout(() => {

      button.disabled = false;

      button.textContent =
        oldText;

      button.classList.remove(
        "added"
      );

    }, 900);

  }


  showToast(
    `${product.name} ajouté au panier.`,
    "success"
  );

}


/* =========================================================
   SUPPRIMER DU PANIER
========================================================= */

function removeFromCart(productId) {

  const index =
    cart.findIndex(
      item =>
        item.id === productId
    );


  if (index === -1) return;


  const product =
    products.find(
      p => p.id === productId
    );


  cart.splice(
    index,
    1
  );


  saveCart();
  renderCart();


  if (product) {

    showToast(
      `${product.name} retiré du panier.`,
      "info"
    );

  }

}


/* =========================================================
   MODIFIER QUANTITÉ
========================================================= */

function changeCartQuantity(
  productId,
  delta
) {

  const item =
    cart.find(
      cartItem =>
        cartItem.id === productId
    );


  if (!item) return;


  item.quantity += delta;


  if (item.quantity <= 0) {

    removeFromCart(productId);
    return;

  }


  item.quantity =
    Math.min(
      item.quantity,
      99
    );


  saveCart();
  renderCart();

}


/* =========================================================
   RENDU PANIER
========================================================= */

function renderCart() {

  if (!cartItems) return;


  sanitizeCart();


  const quantity =
    getCartQuantity();


  const total =
    getCartTotal();


  if (cartBadge) {

    cartBadge.textContent =
      quantity > 99
        ? "99+"
        : String(quantity);


    cartBadge.classList.toggle(
      "has-items",
      quantity > 0
    );

  }


  if (cartTotal) {

    cartTotal.textContent =
      money(total);

  }


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
          Ajoute quelques produits pour commencer.
        </p>

        <button
          class="secondary-btn"
          id="emptyCartShopBtn"
          type="button"
        >
          Découvrir les produits
        </button>

      </div>

    `;


    $("emptyCartShopBtn")
      ?.addEventListener(
        "click",
        () => {

          closeCart();

          document
            .getElementById("productsSection")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }
      );


    return;

  }


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );


      if (!product) {
        return "";
      }


      const subtotal =
        Number(product.price) *
        item.quantity;


      return `

        <div
          class="cart-item"
          data-cart-id="${escapeHtml(product.id)}"
        >

          <div class="cart-item-image">

            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              onerror="handleImageError(this)"
            >

          </div>


          <div class="cart-item-info">

            <h4>
              ${escapeHtml(product.name)}
            </h4>

            <span class="cart-item-category">
              ${escapeHtml(product.category)}
            </span>


            <div class="cart-item-price">

              ${
                Number(product.price) > 0
                  ? money(subtotal)
                  : "Prix à venir"
              }

            </div>


            <div class="cart-item-controls">

              <button
                type="button"
                class="quantity-btn"
                data-qty-minus="${escapeHtml(product.id)}"
                aria-label="Retirer une unité"
              >
                −
              </button>

              <span class="quantity-value">
                ${item.quantity}
              </span>

              <button
                type="button"
                class="quantity-btn"
                data-qty-plus="${escapeHtml(product.id)}"
                aria-label="Ajouter une unité"
              >
                +
              </button>


              <button
                type="button"
                class="remove-cart-btn"
                data-remove-id="${escapeHtml(product.id)}"
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");


  cartItems
    .querySelectorAll("[data-qty-minus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeCartQuantity(
            button.dataset.qtyMinus,
            -1
          );

        }
      );

    });


  cartItems
    .querySelectorAll("[data-qty-plus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeCartQuantity(
            button.dataset.qtyPlus,
            1
          );

        }
      );

    });


  cartItems
    .querySelectorAll("[data-remove-id]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            button.dataset.removeId
          );

        }
      );

    });

}


/* =========================================================
   OUVRIR / FERMER PANIER
========================================================= */

function openCart() {

  if (!cartOverlay || !cartDrawer) {
    return;
  }


  renderCart();


  cartOverlay.classList.add(
    "open"
  );

  cartDrawer.classList.add(
    "open"
  );

  document.body.classList.add(
    "cart-open"
  );

}


function closeCart() {

  if (!cartOverlay || !cartDrawer) {
    return;
  }


  cartOverlay.classList.remove(
    "open"
  );

  cartDrawer.classList.remove(
    "open"
  );

  document.body.classList.remove(
    "cart-open"
  );

}


if (cartBtn) {

  cartBtn.addEventListener(
    "click",
    openCart
  );

}


$("closeCartBtn")
  ?.addEventListener(
    "click",
    closeCart
  );


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target === cartOverlay
      ) {

        closeCart();

      }

    }
  );

}/* =========================================================
   COMMANDES
========================================================= */

async function openOrders() {

  if (!currentUser) {

    showToast(
      "Connecte-toi pour voir tes commandes.",
      "error"
    );

    renderAuthModal();

    return;
  }


  openModal(`

    <div class="orders-box">

      <div class="orders-header">

        <div>

          <span class="small-label">
            NOVASHOP
          </span>

          <h2>
            Mes commandes
          </h2>

          <p>
            Retrouve ici l'historique de tes commandes.
          </p>

        </div>

        <div class="orders-icon">
          📦
        </div>

      </div>


      <div id="ordersList">

        <div class="loading-box">
          Chargement des commandes...
        </div>

      </div>

    </div>

  `);


  const ordersList =
    $("ordersList");


  if (!ordersList) return;


  try {

    const ordersQuery =
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
      await getDocs(
        ordersQuery
      );


    if (snapshot.empty) {

      ordersList.innerHTML = `

        <div class="empty-orders">

          <div class="empty-orders-icon">
            📦
          </div>

          <h3>
            Aucune commande
          </h3>

          <p>
            Tes commandes apparaîtront ici après ton premier achat.
          </p>

          <button
            class="secondary-btn"
            id="ordersShopBtn"
            type="button"
          >
            Voir les produits
          </button>

        </div>

      `;


      $("ordersShopBtn")
        ?.addEventListener(
          "click",
          () => {

            closeModal();

            document
              .getElementById("productsSection")
              ?.scrollIntoView({
                behavior: "smooth"
              });

          }
        );


      return;

    }


    const orders =
      snapshot.docs.map(
        orderDoc => ({
          id: orderDoc.id,
          ...orderDoc.data()
        })
      );


    ordersList.innerHTML =
      orders.map(order => {

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];


        const total =
          Number(order.total) || 0;


        let dateText =
          "Date inconnue";


        if (
          order.createdAt &&
          typeof order.createdAt.toDate === "function"
        ) {

          dateText =
            order.createdAt
              .toDate()
              .toLocaleString(
                "fr-FR",
                {
                  dateStyle: "medium",
                  timeStyle: "short"
                }
              );

        }


        return `

          <div class="order-card">

            <div class="order-card-top">

              <div>

                <span class="order-number">
                  Commande #${escapeHtml(
                    order.id.slice(0, 8).toUpperCase()
                  )}
                </span>

                <span class="order-date">
                  ${escapeHtml(dateText)}
                </span>

              </div>


              <strong class="order-total">
                ${money(total)}
              </strong>

            </div>


            <div class="order-items">

              ${
                items.length
                  ? items.map(item => `

                      <div class="order-item">

                        <span>
                          ${escapeHtml(
                            item.name || "Produit"
                          )}
                        </span>

                        <span>
                          × ${Number(
                            item.quantity || 1
                          )}
                        </span>

                      </div>

                    `).join("")
                  : `
                    <div class="order-item">
                      <span>
                        Articles indisponibles
                      </span>
                    </div>
                  `
              }

            </div>


            <div class="order-status">

              <span class="status-dot"></span>

              Commande enregistrée

            </div>

          </div>

        `;

      }).join("");


  } catch (error) {

    console.error(
      "Erreur chargement commandes :",
      error
    );


    ordersList.innerHTML = `

      <div class="error-box">

        <div class="error-icon">
          ⚠️
        </div>

        <h3>
          Impossible de charger les commandes
        </h3>

        <p>
          Vérifie la configuration Firebase et les règles Firestore.
        </p>

        <button
          class="secondary-btn"
          id="retryOrdersBtn"
          type="button"
        >
          Réessayer
        </button>

      </div>

    `;


    $("retryOrdersBtn")
      ?.addEventListener(
        "click",
        openOrders
      );

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
    renderAuthModal();

    return;

  }


  sanitizeCart();


  if (!cart.length) {

    showToast(
      "Ton panier est vide.",
      "error"
    );

    return;

  }


  const items =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );


      if (!product) {
        return null;
      }


      return {

        productId: product.id,

        name: product.name,

        category: product.category,

        image: product.image,

        price: Number(product.price) || 0,

        quantity: item.quantity,

        subtotal:
          (Number(product.price) || 0) *
          item.quantity

      };

    })
    .filter(Boolean);


  if (!items.length) {

    showToast(
      "Impossible de préparer la commande.",
      "error"
    );

    return;

  }


  const total =
    items.reduce(
      (sum, item) =>
        sum + item.subtotal,
      0
    );


  openModal(`

    <div class="checkout-box">

      <div class="checkout-header">

        <div class="checkout-icon">
          🔒
        </div>

        <div>

          <span class="small-label">
            DERNIÈRE ÉTAPE
          </span>

          <h2>
            Confirmer la commande
          </h2>

        </div>

      </div>


      <div class="checkout-summary">

        <div class="checkout-row">

          <span>
            Articles
          </span>

          <strong>
            ${getCartQuantity()}
          </strong>

        </div>


        <div class="checkout-row">

          <span>
            Total
          </span>

          <strong>
            ${money(total)}
          </strong>

        </div>

      </div>


      <div class="checkout-security">

        <div>
          🔒
        </div>

        <div>

          <strong>
            Paiement sécurisé
          </strong>

          <p>
            Cette étape enregistre ta commande dans NovaShop.
          </p>

        </div>

      </div>


      <button
        class="primary-btn checkout-confirm-btn"
        id="confirmCheckoutBtn"
        type="button"
      >
        Confirmer la commande
      </button>


      <button
        class="secondary-btn"
        id="cancelCheckoutBtn"
        type="button"
      >
        Retour au panier
      </button>

    </div>

  `);


  $("cancelCheckoutBtn")
    ?.addEventListener(
      "click",
      () => {

        closeModal();
        openCart();

      }
    );


  $("confirmCheckoutBtn")
    ?.addEventListener(
      "click",
      async () => {

        const button =
          $("confirmCheckoutBtn");


        if (!button) return;


        button.disabled = true;

        button.textContent =
          "Enregistrement...";


        try {

          await addDoc(
            collection(db, "orders"),
            {

              userId:
                currentUser.uid,

              email:
                currentUser.email || "",

              items,

              total,

              status:
                "confirmed",

              createdAt:
                serverTimestamp()

            }
          );


          cart = [];

          saveCart();
          renderCart();
          closeModal();
          closeCart();


          showToast(
            "Commande enregistrée avec succès !",
            "success"
          );


        } catch (error) {

          console.error(
            "Erreur checkout :",
            error
          );


          button.disabled = false;

          button.textContent =
            "Confirmer la commande";


          showToast(
            "Impossible d'enregistrer la commande.",
            "error"
          );

        }

      }
    );

}


/* =========================================================
   BOUTON CHECKOUT
========================================================= */

$("checkoutBtn")
  ?.addEventListener(
    "click",
    checkout
  );


/* =========================================================
   COMMANDES HEADER
========================================================= */

if (ordersBtn) {

  ordersBtn.addEventListener(
    "click",
    () => {

      openOrders();

    }
  );

}


/* =========================================================
   COMPTE HEADER
========================================================= */

if (accountBtn) {

  accountBtn.addEventListener(
    "click",
    openAccount
  );

}


/* =========================================================
   ADMIN
========================================================= */

function isAdminUser() {

  return Boolean(
    currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase()
  );

}


function hasAdminAuthorization() {

  return (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}


function removeAdminAuthorization() {

  localStorage.removeItem(
    ADMIN_ACCESS_KEY
  );

}


function requestAdminAccess() {

  if (!isAdminUser()) {

    showToast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }


  if (hasAdminAuthorization()) {

    openAdminDashboard();

    return;

  }


  openModal(`

    <div class="admin-login-box">

      <div class="admin-login-icon">
        🔐
      </div>

      <span class="small-label">
        NOVASHOP ADMIN
      </span>

      <h2>
        Accès administrateur
      </h2>

      <p>
        Entre ton code administrateur pour continuer.
      </p>


      <form id="adminAccessForm">

        <input
          id="adminAccessCode"
          type="password"
          placeholder="Code administrateur"
          autocomplete="off"
          required
        >


        <button
          class="primary-btn"
          type="submit"
        >
          Ouvrir le dashboard
        </button>

      </form>

    </div>

  `);


  $("adminAccessForm")
    ?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const code =
          $("adminAccessCode")
            ?.value || "";


        if (code !== ADMIN_CODE) {

          showToast(
            "Code administrateur incorrect.",
            "error"
          );

          return;

        }


        localStorage.setItem(
          ADMIN_ACCESS_KEY,
          "true"
        );


        closeModal();

        openAdminDashboard();


        showToast(
          "Accès administrateur mémorisé.",
          "success"
        );

      }
    );

}/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function openAdminDashboard() {

  if (!isAdminUser()) {

    showToast(
      "Accès administrateur refusé.",
      "error"
    );

    return;

  }


  if (!hasAdminAuthorization()) {

    requestAdminAccess();

    return;

  }


  openModal(`

    <div class="admin-dashboard">

      <div class="admin-dashboard-header">

        <div>

          <span class="small-label">
            NOVASHOP ADMIN
          </span>

          <h2>
            Dashboard
          </h2>

          <p>
            Gestion de NovaShop
          </p>

        </div>


        <div class="admin-status">
          <span class="status-dot"></span>
          Connecté
        </div>

      </div>


      <div
        class="admin-stats"
        id="adminStats"
      >

        <div class="admin-stat-card">

          <span>
            📦
          </span>

          <strong>
            ...
          </strong>

          <small>
            Commandes
          </small>

        </div>


        <div class="admin-stat-card">

          <span>
            💰
          </span>

          <strong>
            ...
          </strong>

          <small>
            Chiffre enregistré
          </small>

        </div>


        <div class="admin-stat-card">

          <span>
            🛍️
          </span>

          <strong>
            ${products.length}
          </strong>

          <small>
            Produits
          </small>

        </div>


        <div class="admin-stat-card">

          <span>
            👤
          </span>

          <strong>
            ...
          </strong>

          <small>
            Clients
          </small>

        </div>

      </div>


      <div class="admin-section">

        <div class="admin-section-title">

          <div>

            <h3>
              Catalogue
            </h3>

            <p>
              Produits actuellement disponibles sur NovaShop.
            </p>

          </div>

          <span class="admin-count">
            ${products.length} produits
          </span>

        </div>


        <div
          class="admin-products-list"
          id="adminProductsList"
        ></div>

      </div>


      <div class="admin-section">

        <div class="admin-section-title">

          <div>

            <h3>
              Catégories
            </h3>

            <p>
              Répartition du catalogue.
            </p>

          </div>

        </div>


        <div
          class="admin-category-list"
          id="adminCategoryList"
        ></div>

      </div>


      <div class="admin-danger-zone">

        <div>

          <h3>
            Zone sensible
          </h3>

          <p>
            Ces actions peuvent modifier ou supprimer des données.
          </p>

        </div>


        <button
          id="deleteAllDataBtn"
          class="danger-btn"
          type="button"
        >
          🗑️ Supprimer toutes les commandes
        </button>


        <button
          id="removeAdminAuthBtn"
          class="secondary-btn"
          type="button"
        >
          🔓 Retirer l'autorisation mémorisée
        </button>

      </div>

    </div>

  `);


  await loadAdminDashboard();

}


/* =========================================================
   ADMIN : CHARGEMENT
========================================================= */

async function loadAdminDashboard() {

  const stats =
    $("adminStats");

  const productsList =
    $("adminProductsList");

  const categoryList =
    $("adminCategoryList");


  let orders = [];


  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );


    orders =
      snapshot.docs.map(
        orderDoc => ({
          id: orderDoc.id,
          ...orderDoc.data()
        })
      );


  } catch (error) {

    console.error(
      "Erreur récupération commandes admin :",
      error
    );

  }


  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + (Number(order.total) || 0),
      0
    );


  const clients =
    new Set(
      orders
        .map(order => order.userId)
        .filter(Boolean)
    );


  if (stats) {

    stats.innerHTML = `

      <div class="admin-stat-card">

        <span>
          📦
        </span>

        <strong>
          ${orders.length}
        </strong>

        <small>
          Commandes
        </small>

      </div>


      <div class="admin-stat-card">

        <span>
          💰
        </span>

        <strong>
          ${money(totalRevenue)}
        </strong>

        <small>
          Chiffre enregistré
        </small>

      </div>


      <div class="admin-stat-card">

        <span>
          🛍️
        </span>

        <strong>
          ${products.length}
        </strong>

        <small>
          Produits
        </small>

      </div>


      <div class="admin-stat-card">

        <span>
          👤
        </span>

        <strong>
          ${clients.size}
        </strong>

        <small>
          Clients ayant commandé
        </small>

      </div>

    `;

  }


  if (productsList) {

    productsList.innerHTML =
      products.map(product => `

        <div class="admin-product-row">

          <div class="admin-product-thumb">

            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              onerror="handleImageError(this)"
            >

          </div>


          <div class="admin-product-info">

            <strong>
              ${escapeHtml(product.name)}
            </strong>

            <span>
              ${escapeHtml(product.category)}
            </span>

          </div>


          <strong class="admin-product-price">

            ${
              Number(product.price) > 0
                ? money(product.price)
                : "Prix à venir"
            }

          </strong>

        </div>

      `).join("");

  }


  if (categoryList) {

    const categoryMap = {};


    products.forEach(product => {

      if (!categoryMap[product.category]) {

        categoryMap[product.category] = 0;

      }

      categoryMap[product.category]++;

    });


    categoryList.innerHTML =
      Object.entries(categoryMap)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .map(
          ([category, count]) => `

            <div class="admin-category-row">

              <span>
                ${escapeHtml(category)}
              </span>

              <strong>
                ${count}
              </strong>

            </div>

          `
        )
        .join("");

  }


  $("deleteAllDataBtn")
    ?.addEventListener(
      "click",
      deleteAllData
    );


  $("removeAdminAuthBtn")
    ?.addEventListener(
      "click",
      () => {

        const confirmed =
          confirm(
            "Retirer l'autorisation administrateur mémorisée ?"
          );


        if (!confirmed) {
          return;
        }


        removeAdminAuthorization();

        closeModal();


        showToast(
          "Autorisation administrateur retirée.",
          "success"
        );

      }
    );

}


/* =========================================================
   ADMIN : SUPPRESSION DES COMMANDES
========================================================= */

async function deleteAllData() {

  if (!isAdminUser()) {

    showToast(
      "Accès refusé.",
      "error"
    );

    return;

  }


  const confirmed =
    confirm(
      "ATTENTION : supprimer toutes les commandes enregistrées ? Cette action est irréversible."
    );


  if (!confirmed) {
    return;
  }


  try {

    const snapshot =
      await getDocs(
        collection(db, "orders")
      );


    for (const orderDoc of snapshot.docs) {

      await deleteDoc(
        doc(
          db,
          "orders",
          orderDoc.id
        )
      );

    }


    showToast(
      `${snapshot.docs.length} commande(s) supprimée(s).`,
      "success"
    );


    await loadAdminDashboard();


  } catch (error) {

    console.error(
      "Erreur suppression données :",
      error
    );


    showToast(
      "Impossible de supprimer les commandes.",
      "error"
    );

  }

}


/* =========================================================
   BOUTON ADMIN
========================================================= */

if (adminBtn) {

  adminBtn.addEventListener(
    "click",
    requestAdminAccess
  );

}


/* =========================================================
   HERO : BOUTONS
========================================================= */

$("heroProductsBtn")
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById("productsSection")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }
  );


$("heroCategoriesBtn")
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById("categoriesSection")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }
  );


/* =========================================================
   BOUTON VOIR LES PRODUITS
========================================================= */

$("shopNowBtn")
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById("productsSection")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }
  );


/* =========================================================
   SCROLL DOUX DES LIENS
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   FERMETURE AVEC ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    if (
      cartDrawer?.classList.contains("open")
    ) {

      closeCart();

      return;

    }


    if (
      modal?.classList.contains("open")
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user || null;


    if (accountBtn) {

      if (currentUser) {

        accountBtn.textContent =
          "Mon compte";

      } else {

        accountBtn.textContent =
          "Connexion";

      }

    }


    if (ordersBtn) {

      ordersBtn.style.display =
        currentUser
          ? ""
          : "";

    }


    if (adminBtn) {

      const admin =
        isAdminUser();


      adminBtn.style.display =
        admin
          ? ""
          : "none";

    }


    if (
      currentUser &&
      !isAdminUser()
    ) {

      removeAdminAuthorization();

    }

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

loadCart();

renderCategories();

renderProducts();


/* =========================================================
   DEBUG / API NOVASHOP
========================================================= */

window.NovaShop = {

  products,

  get cart() {
    return [...cart];
  },

  openCart,

  closeCart,

  openAccount,

  openOrders,

  renderProducts,

  renderCategories,

  addToCart,

  removeFromCart,

  changeCartQuantity,

  money

};/* =========================================================
   NOVASHOP — PARTIE 6/6
   ÉVÉNEMENTS + INITIALISATION FINALE
========================================================= */


/* =========================================================
   RECHERCHE
========================================================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      searchValue =
        event.target.value.trim().toLowerCase();

      renderProducts();

    }
  );

}


/* =========================================================
   BOUTON COMPTE
========================================================= */

if (accountBtn) {

  accountBtn.addEventListener(
    "click",
    () => {

      openAccount();

    }
  );

}


/* =========================================================
   BOUTON COMMANDES
========================================================= */

if (ordersBtn) {

  ordersBtn.addEventListener(
    "click",
    () => {

      openOrders();

    }
  );

}


/* =========================================================
   BOUTON PANIER
========================================================= */

if (cartBtn) {

  cartBtn.addEventListener(
    "click",
    () => {

      openCart();

    }
  );

}


/* =========================================================
   OVERLAY PANIER
========================================================= */

if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    event => {

      if (
        event.target === cartOverlay
      ) {

        closeCart();

      }

    }
  );

}


/* =========================================================
   BOUTON FERMER PANIER
========================================================= */

$("closeCartBtn")
  ?.addEventListener(
    "click",
    closeCart
  );


/* =========================================================
   BOUTON CHECKOUT
========================================================= */

$("checkoutBtn")
  ?.addEventListener(
    "click",
    checkout
  );


/* =========================================================
   MODAL : FERMETURE EN CLIQUANT DEHORS
========================================================= */

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================================
   BOUTON FERMER MODAL
========================================================= */

$("closeModalBtn")
  ?.addEventListener(
    "click",
    closeModal
  );


/* =========================================================
   HERO : BOUTON PRINCIPAL
========================================================= */

$("heroPrimaryBtn")
  ?.addEventListener(
    "click",
    () => {

      const section =
        $("productsSection");

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );


/* =========================================================
   HERO : BOUTON CATÉGORIES
========================================================= */

$("heroSecondaryBtn")
  ?.addEventListener(
    "click",
    () => {

      const section =
        $("categoriesSection");

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );


/* =========================================================
   NAVIGATION CATÉGORIES
========================================================= */

document
  .querySelectorAll(
    "[data-category]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const category =
          button.dataset.category;

        if (!category) {
          return;
        }


        selectedCategory =
          category;


        renderCategories();

        renderProducts();


        const section =
          $("productsSection");

        if (section) {

          section.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  });


/* =========================================================
   FOOTER : RETOUR EN HAUT
========================================================= */

document
  .querySelectorAll(
    '[href="#top"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();


        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================================
   GESTION DES IMAGES
========================================================= */

window.handleImageError =
  function (img) {

    if (!img) {
      return;
    }


    if (
      img.dataset.fallbackApplied === "true"
    ) {

      return;

    }


    img.dataset.fallbackApplied =
      "true";


    img.src =
      FALLBACK_IMAGE;

  };


/* =========================================================
   DÉTECTION DE LA TOUCHE ENTRÉE
========================================================= */

if (searchInput) {

  searchInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Enter"
      ) {

        return;

      }


      searchValue =
        searchInput.value
          .trim()
          .toLowerCase();


      renderProducts();


      const section =
        $("productsSection");

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

}


/* =========================================================
   RACCOURCI CLAVIER /
   RECHERCHE CTRL + K
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();


      if (searchInput) {

        searchInput.focus();

        searchInput.select();

      }

    }

  }
);


/* =========================================================
   SAUVEGARDE PANIER AVANT FERMETURE
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    saveCart();

  }
);


/* =========================================================
   VISIBILITÉ DU HEADER AU SCROLL
========================================================= */

let lastScrollY = 0;


window.addEventListener(
  "scroll",
  () => {

    const currentScroll =
      window.scrollY;


    const header =
      document.querySelector(
        ".site-header"
      );


    if (!header) {
      return;
    }


    if (
      currentScroll > 80 &&
      currentScroll > lastScrollY
    ) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }


    lastScrollY =
      currentScroll;

  },
  {
    passive: true
  }
);


/* =========================================================
   INITIALISATION COMPLÈTE
========================================================= */

async function initNovaShop() {

  try {

    loadCart();

    renderCategories();

    renderProducts();


    if (cartBadge) {

      updateCartBadge();

    }


    if (cartItems) {

      renderCart();

    }


    if (adminBtn) {

      if (
        isAdminUser() &&
        hasAdminAuthorization()
      ) {

        adminBtn.style.display =
          "";

      } else {

        adminBtn.style.display =
          isAdminUser()
            ? ""
            : "none";

      }

    }


  } catch (error) {

    console.error(
      "Erreur initialisation NovaShop :",
      error
    );


    showToast(
      "Une erreur est survenue lors du chargement de NovaShop.",
      "error"
    );

  }

}


/* =========================================================
   LANCEMENT
========================================================= */

initNovaShop();


/* =========================================================
   PROTECTION CONTRE LES CLICS MULTIPLES
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "button"
      );


    if (!button) {
      return;
    }


    if (
      button.dataset.busy === "true"
    ) {

      event.preventDefault();

    }

  }
);


/* =========================================================
   FIN NOVASHOP
========================================================= */
