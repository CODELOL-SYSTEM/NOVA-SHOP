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
  where,
  orderBy,
  deleteDoc,
  doc,
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

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL =
  "pc2alex.les@gmail.com";

const ADMIN_CODE =
  "NOVA-ADMIN-2026";

const ADMIN_ACCESS_KEY =
  "novaAdminAuthorized";


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
    name: "KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms HDMI 2.0/DP1.4",
    category: "Écrans",
    price: 74.99,
    image: "https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id: "p20",
    name: "iiyama 23.8 LED - G-Master GB2471HS-B1 Red Eagle",
    category: "Écrans",
    price: 65.99,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id: "p21",
    name: "SONGMICS Chaise de jeu ergonomique avec repose-pieds capacité 150 kg gris ardoise",
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
    name: "Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
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
    name: "EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category: "Bureaux gaming",
    price: 86.99,
    image: "https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id: "p26",
    name: "Bureau gaming d’angle HOMCOM réversible support écran, étagère maille réglable, noir",
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
    name: "QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap, Full RGB",
    category: "Claviers",
    price: 56.99,
    image: "https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id: "p32",
    name: "GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category: "Claviers",
    price: 91.99,
    image: "https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id: "p33",
    name: "ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
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
    name: "Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu 550W 6500K 230V",
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
   ÉTAT
========================================================= */

let currentUser = null;

let authMode = "login";

let selectedCategory = "Toutes";

let searchValue = "";

let cart = [];

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


/* =========================================================
   DOM
========================================================= */

const $ =
  id => document.getElementById(id);

const searchInput =
  $("searchInput");

const categoriesEl =
  $("categories");

const productsGrid =
  $("productsGrid");

const productCount =
  $("productCount");

const cartBtn =
  $("cartBtn");

const cartBadge =
  $("cartBadge");

const cartOverlay =
  $("cartOverlay");

const cartDrawer =
  $("cartDrawer");

const cartItems =
  $("cartItems");

const cartTotal =
  $("cartTotal");

const accountBtn =
  $("accountBtn");

const ordersBtn =
  $("ordersBtn");

const adminBtn =
  $("adminBtn");

const modal =
  $("modal");

const modalContent =
  $("modalContent");

const toastContainer =
  $("toastContainer");


/* =========================================================
   UTILITAIRES
========================================================= */

function money(value) {

  const number =
    Number(value) || 0;

  if (number <= 0) {
    return "Prix à venir";
  }

  return number.toLocaleString(
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


function stars(value = 4.7) {

  const rounded =
    Math.max(
      1,
      Math.min(
        5,
        Math.round(value)
      )
    );

  return "★".repeat(rounded) +
         "☆".repeat(5 - rounded);

}


function randomInt(min,max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}


function productById(id) {

  return products.find(
    product => product.id === id
  );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
  message,
  type = "success"
) {

  if (!toastContainer) {
    return;
  }

  const toast =
    document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.textContent =
    message;

  toastContainer.appendChild(
    toast
  );

  setTimeout(
    () => {

      toast.style.animation =
        "toastOut .2s ease forwards";

      setTimeout(
        () => toast.remove(),
        220
      );

    },
    2600
  );

}


/* =========================================================
   MODAL
========================================================= */

function openModal(html,title="NovaShop") {

  if (!modal || !modalContent) {
    return;
  }

  const titleEl =
    $("modalTitle");

  if (titleEl) {
    titleEl.textContent =
      title;
  }

  modalContent.innerHTML =
    html;

  modal.classList.add("open");

}


function closeModal() {

  modal?.classList.remove("open");

}


/* =========================================================
   AUTH
========================================================= */

function openAccount() {

  if (currentUser) {

    openModal(`

      <div>

        <p style="color:#94a3b8;margin-top:0">
          Connecté avec :
        </p>

        <strong>
          ${escapeHtml(currentUser.email)}
        </strong>

        <button
          id="logoutBtn"
          class="form-submit"
          style="margin-top:18px"
          type="button"
        >
          Se déconnecter
        </button>

      </div>

    `,"Mon compte");


    $("logoutBtn")
      ?.addEventListener(
        "click",
        async () => {

          try {

            await signOut(auth);

            closeModal();

            showToast(
              "Déconnexion réussie."
            );

          } catch (error) {

            console.error(error);

            showToast(
              "Erreur de déconnexion.",
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


function renderAuthModal() {

  const login =
    authMode === "login";


  openModal(`

    <form id="authForm">

      <div class="form-group">

        <label>
          Adresse e-mail
        </label>

        <input
          id="authEmail"
          class="form-input"
          type="email"
          required
          autocomplete="email"
          placeholder="ton@email.com"
        >

      </div>


      <div class="form-group">

        <label>
          Mot de passe
        </label>

        <input
          id="authPassword"
          class="form-input"
          type="password"
          required
          minlength="6"
          autocomplete="${login ? "current-password" : "new-password"}"
          placeholder="••••••••"
        >

      </div>


      <button
        class="form-submit"
        type="submit"
      >
        ${login ? "Se connecter" : "Créer mon compte"}
      </button>


      <div class="form-switch">

        ${
          login
            ? "Pas encore de compte ?"
            : "Déjà un compte ?"
        }

        <button
          id="switchAuthBtn"
          type="button"
        >
          ${
            login
              ? "Créer un compte"
              : "Se connecter"
          }
        </button>

      </div>

    </form>

  `,login ? "Connexion" : "Créer un compte");


  $("switchAuthBtn")
    ?.addEventListener(
      "click",
      () => {

        authMode =
          authMode === "login"
            ? "register"
            : "login";

        renderAuthModal();

      }
    );


  $("authForm")
    ?.addEventListener(
      "submit",
      handleAuth
    );

}


async function handleAuth(event) {

  event.preventDefault();


  const email =
    $("authEmail")
      ?.value
      .trim();

  const password =
    $("authPassword")
      ?.value;


  if (!email || !password) {
    return;
  }


  try {

    if (authMode === "login") {

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
        "Compte créé avec succès."
      );

    }


    closeModal();


  } catch (error) {

    console.error(error);


    let message =
      "Une erreur est survenue.";


    if (
      error.code ===
      "auth/invalid-credential"
    ) {

      message =
        "E-mail ou mot de passe incorrect.";

    } else if (
      error.code ===
      "auth/email-already-in-use"
    ) {

      message =
        "Cet e-mail est déjà utilisé.";

    } else if (
      error.code ===
      "auth/weak-password"
    ) {

      message =
        "Le mot de passe doit contenir au moins 6 caractères.";

    }


    showToast(
      message,
      "error"
    );

  }

}


/* =========================================================
   CATÉGORIES
========================================================= */

function getCategories() {

  return [
    "Toutes",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

}


function renderCategories() {

  if (!categoriesEl) {
    return;
  }


  categoriesEl.innerHTML =
    getCategories()
      .map(
        category => `

          <button
            class="category-btn ${
              selectedCategory === category
                ? "active"
                : ""
            }"
            data-category="${escapeHtml(category)}"
            type="button"
          >
            ${escapeHtml(category)}
          </button>

        `
      )
      .join("");


  categoriesEl
    .querySelectorAll(
      ".category-btn"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category ||
            "Toutes";

          renderCategories();

          renderProducts();

        }
      );

    });

}


/* =========================================================
   RECHERCHE / FILTRE
========================================================= */

function getFilteredProducts() {

  return products.filter(
    product => {

      const categoryMatch =
        selectedCategory === "Toutes" ||
        product.category === selectedCategory;


      const text =
        `${product.name} ${product.category}`
          .toLowerCase();


      const searchMatch =
        !searchValue ||
        text.includes(searchValue);


      return (
        categoryMatch &&
        searchMatch
      );

    }
  );

}


/* =========================================================
   AVIS
========================================================= */

function getDemoReviews(productId) {

  const key =
    `novaReviews_${productId}`;

  const saved =
    localStorage.getItem(key);


  if (saved) {

    try {

      return JSON.parse(saved);

    } catch {

      // On recrée les données.

    }

  }


  const data = {

    count:
      randomInt(850,950),

    average:
      Number(
        (
          4.3 +
          Math.random() * .6
        ).toFixed(1)
      )

  };


  localStorage.setItem(
    key,
    JSON.stringify(data)
  );


  return data;

}


function openReviews(product) {

  const reviews =
    getDemoReviews(
      product.id
    );


  openModal(`

    <div>

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:15px;
          align-items:center;
          margin-bottom:18px;
        "
      >

        <div>

          <strong>
            ${escapeHtml(product.name)}
          </strong>

          <div
            style="
              color:#fbbf24;
              margin-top:7px;
            "
          >
            ${stars(reviews.average)}
          </div>

        </div>


        <strong
          style="
            font-size:24px;
            white-space:nowrap;
          "
        >
          ${reviews.average}/5
        </strong>

      </div>


      <div
        style="
          padding:14px;
          border-radius:11px;
          background:#0f172a;
          color:#94a3b8;
          font-size:12px;
        "
      >

        ${reviews.count.toLocaleString("fr-FR")}
        avis affichés en mode démonstration.

        <br><br>

        ⚠️ Avant une mise en ligne réelle,
        remplace ces statistiques de démonstration
        par de vrais avis clients vérifiables.

      </div>

    </div>

  `,"Avis produit");

}


/* =========================================================
   IMAGES
========================================================= */

window.handleImageError =
  function(img) {

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
   PRODUITS
========================================================= */

function renderProducts() {

  if (!productsGrid) {
    return;
  }


  const filtered =
    getFilteredProducts();


  if (productCount) {

    productCount.textContent =
      `${filtered.length} produit${filtered.length > 1 ? "s" : ""}`;

  }


  if (!filtered.length) {

    productsGrid.innerHTML = `

      <div class="empty-products">

        🔎<br><br>

        Aucun produit trouvé.

      </div>

    `;

    return;

  }


  productsGrid.innerHTML =
    filtered.map(
      product => {

        const reviews =
          getDemoReviews(
            product.id
          );


        return `

          <article
            class="product-card"
            data-product-id="${product.id}"
          >

            <div class="product-image-wrap">

              <img
                src="${escapeHtml(product.image)}"
                alt="${escapeHtml(product.name)}"
                loading="lazy"
                onerror="handleImageError(this)"
              >

            </div>


            <div class="product-body">

              <div class="product-category">
                ${escapeHtml(product.category)}
              </div>


              <h3 class="product-name">
                ${escapeHtml(product.name)}
              </h3>


              <div class="rating">

                <span>
                  ${stars(reviews.average)}
                </span>

                <span class="rating-count">
                  ${reviews.count}
                </span>

              </div>


              <div class="product-bottom">

                <div class="product-price">

                  ${
                    Number(product.price) > 0
                      ? money(product.price)
                      : "Prix à venir"
                  }

                </div>


                <div class="product-actions">

                  <button
                    class="review-btn"
                    data-review-id="${product.id}"
                    type="button"
                  >
                    Avis
                  </button>


                  <button
                    class="add-cart-btn"
                    data-add-id="${product.id}"
                    type="button"
                  >
                    Ajouter
                  </button>

                </div>

              </div>

            </div>

          </article>

        `;

      }
    )
    .join("");


  productsGrid
    .querySelectorAll(
      "[data-add-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addToCart(
            button.dataset.addId,
            button
          );

        }
      );

    });


  productsGrid
    .querySelectorAll(
      "[data-review-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product =
            productById(
              button.dataset.reviewId
            );

          if (product) {
            openReviews(product);
          }

        }
      );

    });

}


/* =========================================================
   PANIER : STOCKAGE
========================================================= */

function saveCart() {

  localStorage.setItem(
    "novaShopCart",
    JSON.stringify(cart)
  );

}


function sanitizeCart(items) {

  if (!Array.isArray(items)) {
    return [];
  }


  return items
    .map(item => {

      const product =
        productById(
          item.id
        );


      if (!product) {
        return null;
      }


      const quantity =
        Math.max(
          1,
          Math.min(
            99,
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


    cart =
      sanitizeCart(
        saved
          ? JSON.parse(saved)
          : []
      );

  } catch {

    cart = [];

  }


  saveCart();

}


/* =========================================================
   PANIER : TOTAL / BADGE
========================================================= */

function getCartCount() {

  return cart.reduce(
    (total,item) =>
      total + item.quantity,
    0
  );

}


function getCartTotal() {

  return cart.reduce(
    (total,item) => {

      const product =
        productById(
          item.id
        );


      if (!product) {
        return total;
      }


      return (
        total +
        (
          Number(product.price) || 0
        ) *
        item.quantity
      );

    },
    0
  );

}


function updateCartBadge(pop = false) {

  if (!cartBadge) {
    return;
  }


  cartBadge.textContent =
    getCartCount();


  if (pop) {

    cartBadge.classList.remove(
      "pop"
    );


    void cartBadge.offsetWidth;


    cartBadge.classList.add(
      "pop"
    );

  }

}


/* =========================================================
   ANIMATION PRODUIT -> PANIER
========================================================= */

function animateProductToCart(button) {

  if (!button || !cartBtn) {
    return;
  }


  const card =
    button.closest(
      ".product-card"
    );


  const image =
    card?.querySelector(
      "img"
    );


  if (!image) {
    return;
  }


  const imageRect =
    image.getBoundingClientRect();

  const cartRect =
    cartBtn.getBoundingClientRect();


  const clone =
    image.cloneNode(true);


  clone.style.position =
    "fixed";

  clone.style.left =
    `${imageRect.left}px`;

  clone.style.top =
    `${imageRect.top}px`;

  clone.style.width =
    `${Math.min(imageRect.width,90)}px`;

  clone.style.height =
    `${Math.min(imageRect.height,90)}px`;

  clone.style.objectFit =
    "contain";

  clone.style.zIndex =
    "6000";

  clone.style.pointerEvents =
    "none";

  clone.style.borderRadius =
    "12px";

  clone.style.background =
    "#0f172a";

  clone.style.padding =
    "5px";

  clone.style.transition =
    "left .42s cubic-bezier(.2,.8,.2,1), top .42s cubic-bezier(.2,.8,.2,1), transform .42s ease, opacity .42s ease";


  document.body.appendChild(
    clone
  );


  requestAnimationFrame(
    () => {

      clone.style.left =
        `${cartRect.left + cartRect.width / 2 - 25}px`;

      clone.style.top =
        `${cartRect.top + cartRect.height / 2 - 25}px`;

      clone.style.transform =
        "scale(.25)";

      clone.style.opacity =
        "0";

    }
  );


  setTimeout(
    () => {

      clone.remove();

    },
    470
  );

}


/* =========================================================
   AJOUT PANIER
========================================================= */

function addToCart(
  productId,
  button = null
) {

  const product =
    productById(
      productId
    );


  if (!product) {
    return;
  }


  const existing =
    cart.find(
      item =>
        item.id === productId
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

  updateCartBadge(true);

  animateProductToCart(button);


  if (button) {

    const original =
      button.textContent;

    button.textContent =
      "✓ Ajouté";

    button.classList.add(
      "added"
    );

    setTimeout(
      () => {

        button.textContent =
          original;

        button.classList.remove(
          "added"
        );

      },
      900
    );

  }


  showToast(
    `${product.name} ajouté au panier.`
  );

}


/* =========================================================
   SUPPRESSION
========================================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item =>
        item.id !== productId
    );


  saveCart();

  renderCart();

  updateCartBadge();

}


/* =========================================================
   QUANTITÉ
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


  if (!item) {
    return;
  }


  item.quantity =
    Math.max(
      0,
      Math.min(
        99,
        item.quantity + delta
      )
    );


  if (item.quantity <= 0) {

    removeFromCart(
      productId
    );

    return;

  }


  saveCart();

  renderCart();

  updateCartBadge();

}


/* =========================================================
   AFFICHAGE PANIER
========================================================= */

function renderCart() {

  if (!cartItems) {
    return;
  }


  if (!cart.length) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        🛒<br><br>

        Ton panier est vide.

      </div>

    `;

  } else {

    cartItems.innerHTML =
      cart.map(
        item => {

          const product =
            productById(
              item.id
            );


          if (!product) {
            return "";
          }


          const subtotal =
            (
              Number(product.price) || 0
            ) *
            item.quantity;


          return `

            <div
              class="cart-item"
              data-cart-item="${product.id}"
            >

              <div class="cart-item-image">

                <img
                  src="${escapeHtml(product.image)}"
                  alt=""
                  onerror="handleImageError(this)"
                >

              </div>


              <div class="cart-item-info">

                <div class="cart-item-name">
                  ${escapeHtml(product.name)}
                </div>


                <div class="cart-item-price">

                  ${
                    subtotal > 0
                      ? money(subtotal)
                      : "Prix à venir"
                  }

                </div>


                <div class="quantity-controls">

                  <button
                    data-minus="${product.id}"
                    type="button"
                  >
                    −
                  </button>

                  <span>
                    ${item.quantity}
                  </span>

                  <button
                    data-plus="${product.id}"
                    type="button"
                  >
                    +
                  </button>

                </div>

              </div>


              <button
                class="cart-remove"
                data-remove="${product.id}"
                type="button"
                aria-label="Supprimer"
              >
                ✕
              </button>

            </div>

          `;

        }
      )
      .join("");


    cartItems
      .querySelectorAll(
        "[data-minus]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            changeCartQuantity(
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

            changeCartQuantity(
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

  }


  if (cartTotal) {

    cartTotal.textContent =
      money(
        getCartTotal()
      );

  }


  updateCartBadge();

}


/* =========================================================
   OUVERTURE PANIER
========================================================= */

function openCart() {

  renderCart();

  cartOverlay?.classList.add(
    "open"
  );

  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  cartOverlay?.classList.remove(
    "open"
  );

  document.body.style.overflow =
    "";

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

    openAccount();

    return;

  }


  openModal(
    `
      <div
        id="ordersContent"
        style="color:#94a3b8"
      >
        Chargement des commandes...
      </div>
    `,
    "Mes commandes"
  );


  const container =
    $("ordersContent");


  try {

    const q =
      query(
        collection(db,"orders"),
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


    if (!snapshot.docs.length) {

      container.innerHTML = `
        <div
          style="
            text-align:center;
            padding:35px 10px;
            color:#64748b;
          "
        >
          Aucune commande pour le moment.
        </div>
      `;

      return;

    }


    container.innerHTML =
      snapshot.docs
        .map(
          orderDoc => {

            const order =
              orderDoc.data();


            const items =
              Array.isArray(order.items)
                ? order.items
                : [];


            return `

              <div
                style="
                  padding:14px;
                  margin-bottom:10px;
                  border:1px solid rgba(148,163,184,.1);
                  border-radius:12px;
                  background:#0f172a;
                "
              >

                <div
                  style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                  "
                >

                  <strong>
                    Commande #${escapeHtml(
                      orderDoc.id.slice(0,8)
                    )}
                  </strong>

                  <strong>
                    ${money(order.total)}
                  </strong>

                </div>


                <div
                  style="
                    margin-top:8px;
                    color:#64748b;
                    font-size:11px;
                  "
                >

                  ${items.length}
                  article${items.length > 1 ? "s" : ""}

                </div>

              </div>

            `;

          }
        )
        .join("");


  } catch (error) {

    console.error(error);


    container.innerHTML = `

      <div
        style="
          padding:20px;
          color:#fca5a5;
        "
      >
        Impossible de charger les commandes.
      </div>

    `;

  }

}


/* =========================================================
   CHECKOUT
========================================================= */

async function checkout() {

  if (!cart.length) {

    showToast(
      "Ton panier est vide.",
      "error"
    );

    return;

  }


  if (!currentUser) {

    showToast(
      "Connecte-toi avant de passer commande.",
      "error"
    );

    closeCart();

    openAccount();

    return;

  }


  const total =
    getCartTotal();


  const items =
    cart
      .map(
        item => {

          const product =
            productById(
              item.id
            );


          if (!product) {
            return null;
          }


          return {

            id: product.id,

            name: product.name,

            category: product.category,

            price:
              Number(product.price) || 0,

            quantity:
              item.quantity

          };

        }
      )
      .filter(Boolean);


  if (!items.length) {

    showToast(
      "Le panier ne contient aucun produit valide.",
      "error"
    );

    return;

  }


  const button =
    $("checkoutBtn");


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Enregistrement...";

  }


  try {

    await addDoc(
      collection(db,"orders"),
      {
        userId:
          currentUser.uid,

        userEmail:
          currentUser.email,

        items,

        total,

        createdAt:
          serverTimestamp()
      }
    );


    cart = [];

    saveCart();

    renderCart();

    updateCartBadge();

    closeCart();


    showToast(
      "Commande enregistrée avec succès.",
      "success"
    );


  } catch (error) {

    console.error(
      "Checkout error:",
      error
    );


    showToast(
      "Impossible d'enregistrer la commande.",
      "error"
    );

  } finally {

    if (button) {

      button.disabled =
        false;

      button.textContent =
        "Passer la commande";

    }

  }

}


/* =========================================================
   ADMIN : AUTORISATION
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

    <form id="adminCodeForm">

      <p
        style="
          margin-top:0;
          color:#94a3b8;
          line-height:1.5;
        "
      >
        Entre le code administrateur pour
        accéder au dashboard NovaShop.
      </p>


      <div class="form-group">

        <label>
          Code administrateur
        </label>

        <input
          id="adminCodeInput"
          class="form-input"
          type="password"
          required
          autocomplete="off"
        >

      </div>


      <button
        class="form-submit"
        type="submit"
      >
        Accéder au dashboard
      </button>

    </form>

  `,"Administration");


  $("adminCodeForm")
    ?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const code =
          $("adminCodeInput")
            ?.value
            .trim();


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

        showToast(
          "Autorisation administrateur mémorisée."
        );


        setTimeout(
          () => openAdminDashboard(),
          180
        );

      }
    );

}


/* =========================================================
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
          <span>📦</span>
          <strong>...</strong>
          <small>Commandes</small>
        </div>

        <div class="admin-stat-card">
          <span>💰</span>
          <strong>...</strong>
          <small>Chiffre enregistré</small>
        </div>

        <div class="admin-stat-card">
          <span>🛍️</span>
          <strong>${products.length}</strong>
          <small>Produits</small>
        </div>

        <div class="admin-stat-card">
          <span>👤</span>
          <strong>...</strong>
          <small>Clients</small>
        </div>

      </div>


      <div class="admin-section">

        <div class="admin-section-title">

          <div>

            <h3>
              Catalogue
            </h3>

            <p>
              Produits actuellement disponibles.
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

        <h3>
          Zone sensible
        </h3>

        <p>
          Ces actions peuvent modifier ou supprimer des données.
        </p>


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

  `,"Administration");


  await loadAdminDashboard();

}


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
        collection(db,"orders")
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
      "Admin orders error:",
      error
    );

  }


  const totalRevenue =
    orders.reduce(
      (sum,order) =>
        sum +
        (
          Number(order.total) || 0
        ),
      0
    );


  const clients =
    new Set(
      orders
        .map(
          order =>
            order.userId
        )
        .filter(Boolean)
    );


  if (stats) {

    stats.innerHTML = `

      <div class="admin-stat-card">
        <span>📦</span>
        <strong>${orders.length}</strong>
        <small>Commandes</small>
      </div>

      <div class="admin-stat-card">
        <span>💰</span>
        <strong>${money(totalRevenue)}</strong>
        <small>Chiffre enregistré</small>
      </div>

      <div class="admin-stat-card">
        <span>🛍️</span>
        <strong>${products.length}</strong>
        <small>Produits</small>
      </div>

      <div class="admin-stat-card">
        <span>👤</span>
        <strong>${clients.size}</strong>
        <small>Clients ayant commandé</small>
      </div>

    `;

  }


  if (productsList) {

    productsList.innerHTML =
      products
        .map(
          product => `

            <div class="admin-product-row">

              <div class="admin-product-thumb">

                <img
                  src="${escapeHtml(product.image)}"
                  alt=""
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

          `
        )
        .join("");

  }


  if (categoryList) {

    const categoryMap = {};


    products.forEach(
      product => {

        categoryMap[product.category] =
          (
            categoryMap[product.category] ||
            0
          ) + 1;

      }
    );


    categoryList.innerHTML =
      Object.entries(categoryMap)
        .sort(
          (a,b) =>
            b[1] - a[1]
        )
        .map(
          ([category,count]) => `

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

        if (
          !confirm(
            "Retirer l'autorisation administrateur mémorisée ?"
          )
        ) {
          return;
        }


        removeAdminAuthorization();

        closeModal();

        showToast(
          "Autorisation administrateur retirée."
        );

      }
    );

}


/* =========================================================
   SUPPRESSION COMMANDES
========================================================= */

async function deleteAllData() {

  if (!isAdminUser()) {

    showToast(
      "Accès refusé.",
      "error"
    );

    return;

  }


  if (
    !confirm(
      "ATTENTION : supprimer toutes les commandes enregistrées ? Cette action est irréversible."
    )
  ) {
    return;
  }


  try {

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );


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

    }


    showToast(
      `${snapshot.docs.length} commande(s) supprimée(s).`
    );


    await loadAdminDashboard();


  } catch (error) {

    console.error(error);


    showToast(
      "Impossible de supprimer les commandes.",
      "error"
    );

  }

}


/* =========================================================
   ÉVÉNEMENTS
========================================================= */

accountBtn?.addEventListener(
  "click",
  openAccount
);


ordersBtn?.addEventListener(
  "click",
  openOrders
);


cartBtn?.addEventListener(
  "click",
  openCart
);


$("closeCartBtn")
  ?.addEventListener(
    "click",
    closeCart
  );


$("checkoutBtn")
  ?.addEventListener(
    "click",
    checkout
);


adminBtn?.addEventListener(
  "click",
  requestAdminAccess
);


$("closeModalBtn")
  ?.addEventListener(
    "click",
    closeModal
);


cartOverlay?.addEventListener(
  "click",
  event => {

    if (
      event.target === cartOverlay
    ) {

      closeCart();

    }

  }
);


modal?.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   RECHERCHE
========================================================= */

searchInput?.addEventListener(
  "input",
  event => {

    searchValue =
      event.target.value
        .trim()
        .toLowerCase();


    renderProducts();

  }
);


searchInput?.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Enter"
    ) {
      return;
    }


    $("productsSection")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  }
);


/* =========================================================
   HERO
========================================================= */

function scrollToSection(id) {

  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}


$("heroPrimaryBtn")
  ?.addEventListener(
    "click",
    () =>
      scrollToSection(
        "productsSection"
      )
  );


$("heroSecondaryBtn")
  ?.addEventListener(
    "click",
    () =>
      scrollToSection(
        "categoriesSection"
      )
  );


/* =========================================================
   CTRL + K
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      searchInput?.focus();

      searchInput?.select();

    }

  }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {
      return;
    }


    if (
      cartOverlay?.classList.contains(
        "open"
      )
    ) {

      closeCart();

      return;

    }


    if (
      modal?.classList.contains(
        "open"
      )
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   SCROLL HEADER
========================================================= */

let lastScrollY = 0;


window.addEventListener(
  "scroll",
  () => {

    const header =
      document.querySelector(
        ".site-header"
      );


    if (!header) {
      return;
    }


    const current =
      window.scrollY;


    if (
      current > 70 &&
      current > lastScrollY
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
      current;

  },
  {
    passive: true
  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser =
      user || null;


    if (accountBtn) {

      accountBtn.textContent =
        currentUser
          ? "Mon compte"
          : "Connexion";

    }


    if (adminBtn) {

      adminBtn.style.display =
        isAdminUser()
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
   INIT
========================================================= */

function initNovaShop() {

  loadCart();

  renderCategories();

  renderProducts();

  renderCart();

  updateCartBadge();

}


initNovaShop();


/* =========================================================
   SAUVEGARDE
========================================================= */

window.addEventListener(
  "beforeunload",
  saveCart
);


/* =========================================================
   API DEBUG
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

};
