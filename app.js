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

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


/* =========================================================
   PRODUITS
========================================================= */

const products = [

{
 id:"p1",
 name:"Gigabyte B650 AORUS Elite AX",
 category:"Composants",
 price:189.99,
 image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
},

{
 id:"p2",
 name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
 category:"PC Gamer",
 price:2237.65,
 image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
},

{
 id:"p3",
 name:"HyperX Cloud II",
 category:"Casques",
 price:49.99,
 image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
},

{
 id:"p4",
 name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
 category:"Claviers",
 price:30,
 image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
},

{
 id:"p5",
 name:"Clavier Magnétique 65% Celshading Noir",
 category:"Claviers",
 price:120.90,
 image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
},

{
 id:"p6",
 name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
 category:"Souris",
 price:49.99,
 image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
},

{
 id:"p7",
 name:"Logitech G PRO X2 Superstrike Blanc et Noir",
 category:"Souris",
 price:150.99,
 image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
},

{
 id:"p8",
 name:"Samsung 990 PRO 1TB",
 category:"Stockage",
 price:249.99,
 image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
},

{
 id:"p9",
 name:"Samsung 990 PRO 2TB",
 category:"Stockage",
 price:199.93,
 image:"https://pc.comparer.fr/500x500/310191422.webp"
},

{
 id:"p10",
 name:"CORSAIR RM1000x EU",
 category:"Alimentations",
 price:159.90,
 image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
},

{
 id:"p11",
 name:"CORSAIR RM850x EU",
 category:"Alimentations",
 price:134.90,
 image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
},

{
 id:"p12",
 name:"Corsair Frame 5000D RS ARGB Noir",
 category:"Boîtiers",
 price:159.90,
 image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
},

{
 id:"p13",
 name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
 category:"Refroidissement",
 price:129.90,
 image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
},

{
 id:"p14",
 name:"Samsung 27 QD-OLED Odyssey G6",
 category:"Écrans",
 price:399.95,
 image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
},

{
 id:"p15",
 name:"ELGATO Wave Mic Arm Pro",
 category:"Streaming",
 price:229.90,
 image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
},

{
 id:"p16",
 name:"Sony DualSense Cosmic Red PS5/PC",
 category:"Manettes",
 price:74.90,
 image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
},

{
 id:"p17",
 name:"ASUS TUF Gaming B650-PLUS",
 category:"Composants",
 price:179.90,
 image:"https://media.materiel.net/r550/products/MN0005986139.jpg"
},

{
 id:"p18",
 name:"MSI MAG B650 Tomahawk WiFi",
 category:"Composants",
 price:189.90,
 image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
},

{
 id:"p19",
 name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms HDMI 2.0/DP1.4",
 category:"Écrans",
 price:74.99,
 image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
},

{
 id:"p20",
 name:"iiyama 23.8 LED - G-Master GB2471HS-B1 Red Eagle",
 category:"Écrans",
 price:65.99,
 image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
},

{
 id:"p21",
 name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds capacité 150 kg gris ardoise",
 category:"Chaises gaming",
 price:129.99,
 image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
},

{
 id:"p22",
 name:"Dowinx Série Luxe Suède LS-66D68E Blanc",
 category:"Chaises gaming",
 price:79.99,
 image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
},

{
 id:"p23",
 name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
 category:"Chaises gaming",
 price:109.99,
 image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
},

{
 id:"p24",
 name:"Desk Lite - Height-Adjustable Desk",
 category:"Bureaux gaming",
 price:110.99,
 image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
},

{
 id:"p25",
 name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
 category:"Bureaux gaming",
 price:86.99,
 image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
},

{
 id:"p26",
 name:"Bureau gaming d’angle HOMCOM réversible support écran",
 category:"Bureaux gaming",
 price:44.99,
 image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
},

{
 id:"p27",
 name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",
 category:"Casques",
 price:99.99,
 image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
},

{
 id:"p28",
 name:"Razer BlackShark V2 Pro 2023 Noir",
 category:"Casques",
 price:75.99,
 image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
},

{
 id:"p29",
 name:"beyerdynamic DT-990 Pro 250 Ohm",
 category:"Casques",
 price:60.99,
 image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
},

{
 id:"p30",
 name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",
 category:"Claviers",
 price:78.99,
 image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
},

{
 id:"p31",
 name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger",
 category:"Claviers",
 price:56.99,
 image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
},

{
 id:"p32",
 name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium",
 category:"Claviers",
 price:91.99,
 image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
},

{
 id:"p33",
 name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g",
 category:"Souris",
 price:26.99,
 image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
},

{
 id:"p34",
 name:"HyperX QuadCast 2 – Microphone USB – RGB",
 category:"Microphones",
 price:98.99,
 image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
},

{
 id:"p35",
 name:"Shure SM7 dB",
 category:"Microphones",
 price:121.99,
 image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
},

{
 id:"p36",
 name:"Razer Seiren V3 Chroma Noir",
 category:"Microphones",
 price:13.99,
 image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
},

{
 id:"p37",
 name:"Stairville LED Pixel Rail 40 RGB MKII",
 category:"Éclairage RGB",
 price:18.90,
 image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
},

{
 id:"p38",
 name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
 category:"Éclairage RGB",
 price:0,
 image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
},

{
 id:"p39",
 name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m",
 category:"Éclairage RGB",
 price:91.10,
 image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
},

{
 id:"p40",
 name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
 category:"Cartes graphiques",
 price:147,
 image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
},

{
 id:"p41",
 name:"MSI GeForce RTX 3050 LP E 6G OC",
 category:"Cartes graphiques",
 price:100,
 image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
},

{
 id:"p42",
 name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
 category:"Cartes graphiques",
 price:140,
 image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
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
let reviewsCache = {};


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
const cartClose = $("cartClose");
const checkoutBtn = $("checkoutBtn");

const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const settingsBtn = $("settingsBtn");
const adminBtn = $("adminBtn");

const modal = $("modal");
const modalContent = $("modalContent");
const modalTitle = $("modalTitle");
const modalBody = $("modalBody");
const modalClose = $("modalClose");

const toastContainer = $("toastContainer");


/* =========================================================
   UTILITAIRES
========================================================= */

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function money(value){
  if(!value || value <= 0) return "Prix à venir";

  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(value);
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function stars(avg){
  const rounded = Math.round(avg);
  return "★".repeat(rounded)+"☆".repeat(5-rounded);
}


/* =========================================================
   TOAST
========================================================= */

function toast(message){
  const el = document.createElement("div");

  el.className = "toast";
  el.textContent = message;

  toastContainer.appendChild(el);

  setTimeout(()=>{
    el.classList.add("out");

    setTimeout(()=>{
      el.remove();
    },220);

  },2600);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(title,html){
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click",closeModal);

modal.addEventListener("click",e=>{
  if(e.target === modal){
    closeModal();
  }
});


/* =========================================================
   MODE SOMBRE / CLAIR
========================================================= */

function applyTheme(theme){
  if(theme === "light"){
    document.documentElement.classList.add("light");
  }else{
    document.documentElement.classList.remove("light");
  }

  localStorage.setItem("novaTheme",theme);
}

function loadTheme(){
  const saved = localStorage.getItem("novaTheme") || "dark";
  applyTheme(saved);
}

function toggleTheme(){
  const light =
    document.documentElement.classList.contains("light");

  applyTheme(light ? "dark" : "light");

  toast(
    light
      ? "🌙 Mode sombre activé"
      : "☀️ Mode clair activé"
  );
}


/* =========================================================
   PARAMÈTRES
========================================================= */

function openSettings(){

  const isLight =
    document.documentElement.classList.contains("light");

  openModal(
    "⚙️ Paramètres",
    `
      <div>

        <div class="settings-row">
          <div>
            <strong>Apparence</strong>
            <div style="color:var(--muted);font-size:12px;margin-top:4px">
              Choisis le thème de NovaShop.
            </div>
          </div>

          <label class="switch">
            <input
              id="themeSwitch"
              type="checkbox"
              ${isLight ? "checked" : ""}
            >
            <span class="slider"></span>
          </label>
        </div>

        <div class="settings-row">
          <div>
            <strong>Panier</strong>
            <div style="color:var(--muted);font-size:12px;margin-top:4px">
              Le panier est sauvegardé automatiquement sur cet appareil.
            </div>
          </div>
        </div>

        <div class="settings-row">
          <div>
            <strong>Produits</strong>
            <div style="color:var(--muted);font-size:12px;margin-top:4px">
              ${products.length} produits disponibles.
            </div>
          </div>
        </div>

        <div style="margin-top:18px">
          <button
            id="clearLocalData"
            class="danger-btn"
            style="width:100%"
          >
            Effacer le panier sauvegardé
          </button>
        </div>

      </div>
    `
  );

  $("themeSwitch").addEventListener("change",e=>{
    applyTheme(e.target.checked ? "light" : "dark");
  });

  $("clearLocalData").addEventListener("click",()=>{
    cart = [];
    saveCart();
    renderCart();
    toast("Panier effacé");
  });
}


/* =========================================================
   AUTH
========================================================= */

function openAuthModal(){

  if(currentUser){

    openModal(
      "👤 Mon compte",
      `
        <div style="display:grid;gap:15px">

          <div>
            <div style="color:var(--muted);font-size:12px">
              Connecté avec
            </div>

            <strong>${escapeHtml(currentUser.email || "")}</strong>
          </div>

          <button id="logoutBtn" class="danger-btn">
            Se déconnecter
          </button>

        </div>
      `
    );

    $("logoutBtn").addEventListener("click",async()=>{
      await signOut(auth);
      closeModal();
      toast("Déconnexion réussie");
    });

    return;
  }

  showAuthForm();
}

function showAuthForm(){

  const login = authMode === "login";

  openModal(
    login ? "👤 Connexion" : "✨ Créer un compte",
    `
      <form id="authForm" class="form">

        <div>
          <label>Email</label>
          <input
            id="authEmail"
            type="email"
            autocomplete="email"
            required
            placeholder="ton@email.com"
          >
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            id="authPassword"
            type="password"
            autocomplete="${login ? "current-password" : "new-password"}"
            required
            minlength="6"
            placeholder="••••••••"
          >
        </div>

        <button class="primary-btn" type="submit">
          ${login ? "Se connecter" : "Créer mon compte"}
        </button>

        <div style="text-align:center;color:var(--muted);font-size:13px">

          ${
            login
            ? `Pas encore de compte ?
               <span id="switchAuth" class="modal-link">
                 Créer un compte
               </span>`
            : `Déjà un compte ?
               <span id="switchAuth" class="modal-link">
                 Se connecter
               </span>`
          }

        </div>

      </form>
    `
  );

  $("authForm").addEventListener("submit",handleAuth);

  $("switchAuth").addEventListener("click",()=>{
    authMode = login ? "register" : "login";
    showAuthForm();
  });
}

async function handleAuth(e){

  e.preventDefault();

  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;

  try{

    if(authMode === "login"){

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast("Connexion réussie");
      closeModal();

    }else{

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast("Compte créé");
      closeModal();

    }

  }catch(error){

    let message = "Une erreur est survenue.";

    if(error.code === "auth/invalid-credential"){
      message = "Email ou mot de passe incorrect.";
    }

    if(error.code === "auth/email-already-in-use"){
      message = "Cet email est déjà utilisé.";
    }

    if(error.code === "auth/weak-password"){
      message = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if(error.code === "auth/invalid-email"){
      message = "Adresse email invalide.";
    }

    toast(message);
  }
}


/* =========================================================
   CATÉGORIES
========================================================= */

function getCategories(){

  return [
    "Toutes",
    ...Array.from(
      new Set(products.map(p=>p.category))
    )
  ];
}

function renderCategories(){

  categoriesEl.innerHTML = getCategories()
    .map(category=>`

      <button
        class="category-btn ${selectedCategory === category ? "active" : ""}"
        data-category="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>

    `)
    .join("");

  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(btn=>{

      btn.addEventListener("click",()=>{

        selectedCategory =
          btn.dataset.category;

        renderCategories();
        renderProducts();

      });

    });
}


/* =========================================================
   RECHERCHE
========================================================= */

function getFilteredProducts(){

  const queryText =
    searchValue.toLowerCase().trim();

  return products.filter(product=>{

    const categoryOK =
      selectedCategory === "Toutes" ||
      product.category === selectedCategory;

    const searchOK =
      !queryText ||
      product.name.toLowerCase().includes(queryText) ||
      product.category.toLowerCase().includes(queryText);

    return categoryOK && searchOK;
  });
}

searchInput.addEventListener("input",()=>{
  searchValue = searchInput.value;
  renderProducts();
});


/* =========================================================
   AVIS
========================================================= */

function getReviewData(productId){

  if(!reviewsCache[productId]){

    reviewsCache[productId] = {
      count:randomInt(850,950),
      avg:Number(
        (4.3 + Math.random()*.6)
          .toFixed(1)
      )
    };
  }

  return reviewsCache[productId];
}

function openReviews(product){

  const review = getReviewData(product.id);

  openModal(
    `⭐ Avis - ${product.name}`,
    `
      <div style="text-align:center">

        <div style="font-size:35px;color:#fbbf24">
          ${stars(review.avg)}
        </div>

        <div style="font-size:25px;font-weight:900;margin-top:8px">
          ${review.avg}/5
        </div>

        <div style="color:var(--muted);margin-top:6px">
          ${review.count.toLocaleString("fr-FR")} évaluations
        </div>

        <div style="
          margin-top:20px;
          padding:13px;
          background:var(--card);
          border:1px solid var(--border);
          border-radius:12px;
          color:var(--muted);
          font-size:12px;
        ">
          Statistiques de démonstration.
          Remplace-les par de vrais avis clients avant la mise en ligne.
        </div>

      </div>
    `
  );
}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts(){

  const list = getFilteredProducts();

  productCount.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if(!list.length){

    productsGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:60px 15px;
        color:var(--muted)
      ">
        <div style="font-size:40px">🔎</div>
        <strong>Aucun produit trouvé</strong>
        <div style="margin-top:5px">
          Essaie une autre recherche ou catégorie.
        </div>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML = list.map(product=>{

    const review = getReviewData(product.id);

    return `

      <article
        class="product-card"
        data-product-id="${product.id}"
      >

        ${
          product.price > 0 && product.price < 80
          ? `<div class="promo-badge">OFFRE</div>`
          : ""
        }

        <div class="product-image-wrap">

          <img
            class="product-image"
            src="${product.image}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            data-fallback="true"
          >

        </div>

        <div class="product-info">

          <div class="product-category">
            ${escapeHtml(product.category)}
          </div>

          <div class="product-name">
            ${escapeHtml(product.name)}
          </div>

          <div class="product-rating">
            ${stars(review.avg)}
            <span style="color:var(--muted)">
              ${review.avg}
            </span>
          </div>

          <div class="product-price">
            ${money(product.price)}
          </div>

          <div class="product-actions">

            <button
              class="add-cart-btn"
              data-add="${product.id}"
            >
              🛒 Ajouter au panier
            </button>

            <button
              class="review-btn"
              data-review="${product.id}"
            >
              ⭐ Voir les avis
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");

  productsGrid
    .querySelectorAll("img[data-fallback]")
    .forEach(img=>{

      img.addEventListener("error",()=>{
        if(!img.dataset.failed){
          img.dataset.failed = "1";
          img.src = FALLBACK_IMAGE;
        }
      });

    });

  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(btn=>{

      btn.addEventListener("click",()=>{

        const product =
          products.find(
            p=>p.id === btn.dataset.add
          );

        if(product){
          addToCart(product,btn);
        }

      });

    });

  productsGrid
    .querySelectorAll("[data-review]")
    .forEach(btn=>{

      btn.addEventListener("click",()=>{

        const product =
          products.find(
            p=>p.id === btn.dataset.review
          );

        if(product){
          openReviews(product);
        }

      });

    });
}


/* =========================================================
   PANIER
========================================================= */

function saveCart(){
  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );
}

function loadCart(){

  try{

    const saved =
      JSON.parse(
        localStorage.getItem("novaCart") || "[]"
      );

    if(!Array.isArray(saved)){
      cart = [];
      return;
    }

    cart = saved
      .filter(item=>
        products.some(p=>p.id === item.id)
      )
      .map(item=>({
        id:item.id,
        qty:Math.max(
          1,
          Number(item.qty) || 1
        )
      }));

  }catch{

    cart = [];
  }
}

function cartQuantity(){

  return cart.reduce(
    (sum,item)=>sum + item.qty,
    0
  );
}

function cartTotalValue(){

  return cart.reduce((sum,item)=>{

    const product =
      products.find(p=>p.id === item.id);

    if(!product || !product.price){
      return sum;
    }

    return sum + product.price * item.qty;

  },0);
}

function updateCartBadge(){

  const count = cartQuantity();

  cartBadge.textContent = count;

  if(count > 0){
    cartBadge.classList.add("show");
  }else{
    cartBadge.classList.remove("show");
  }
}

function renderCart(){

  updateCartBadge();

  if(!cart.length){

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:40px">🛒</div>
        <strong>Ton panier est vide</strong>
        <div style="margin-top:6px">
          Ajoute un produit pour commencer.
        </div>
      </div>
    `;

    cartTotal.textContent = money(0);
    return;
  }

  cartItems.innerHTML = cart.map(item=>{

    const product =
      products.find(p=>p.id === item.id);

    if(!product) return "";

    return `

      <div class="cart-item">

        <img
          class="cart-item-img"
          src="${product.image}"
          alt=""
          onerror="this.src='${FALLBACK_IMAGE}'"
        >

        <div>

          <div class="cart-item-name">
            ${escapeHtml(product.name)}
          </div>

          <div class="cart-item-price">
            ${
              product.price
              ? money(product.price)
              : "Prix à venir"
            }
          </div>

          <div class="qty-controls">

            <button
              class="qty-btn"
              data-minus="${product.id}"
            >
              −
            </button>

            <span class="qty-value">
              ${item.qty}
            </span>

            <button
              class="qty-btn"
              data-plus="${product.id}"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-cart"
          data-remove="${product.id}"
          title="Supprimer"
        >
          ✕
        </button>

      </div>
    `;

  }).join("");

  cartTotal.textContent =
    money(cartTotalValue());

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(btn=>{
      btn.addEventListener("click",()=>{
        changeQuantity(
          btn.dataset.minus,
          -1
        );
      });
    });

  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(btn=>{
      btn.addEventListener("click",()=>{
        changeQuantity(
          btn.dataset.plus,
          1
        );
      });
    });

  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(btn=>{
      btn.addEventListener("click",()=>{
        removeFromCart(btn.dataset.remove);
      });
    });
}

function animateToCart(button,product){

  const img =
    button
      .closest(".product-card")
      ?.querySelector(".product-image");

  if(!img) return;

  const cartRect =
    cartBtn.getBoundingClientRect();

  const imgRect =
    img.getBoundingClientRect();

  const clone =
    img.cloneNode(true);

  clone.className = "fly-product";

  clone.style.left =
    `${imgRect.left}px`;

  clone.style.top =
    `${imgRect.top}px`;

  document.body.appendChild(clone);

  requestAnimationFrame(()=>{

    clone.style.left =
      `${cartRect.left + cartRect.width/2 - 35}px`;

    clone.style.top =
      `${cartRect.top + cartRect.height/2 - 35}px`;

    clone.style.width = "28px";
    clone.style.height = "28px";
    clone.style.opacity = "0";

  });

  setTimeout(()=>{
    clone.remove();
  },600);
}

function popCart(){

  cartBadge.animate(
    [
      {
        transform:"scale(1)"
      },
      {
        transform:"scale(1.3)"
      },
      {
        transform:"scale(1)"
      }
    ],
    {
      duration:330,
      easing:"ease-out"
    }
  );
}

function addToCart(product,button){

  const existing =
    cart.find(item=>item.id === product.id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id:product.id,
      qty:1
    });
  }

  saveCart();
  renderCart();
  animateToCart(button,product);
  popCart();

  const oldText =
    button.textContent;

  button.textContent =
    "✓ Ajouté";

  button.disabled = true;

  setTimeout(()=>{
    button.textContent = oldText;
    button.disabled = false;
  },900);

  toast("🛒 Produit ajouté au panier");
}

function removeFromCart(id){

  cart =
    cart.filter(item=>item.id !== id);

  saveCart();
  renderCart();

  toast("Produit retiré du panier");
}

function changeQuantity(id,direction){

  const item =
    cart.find(item=>item.id === id);

  if(!item) return;

  item.qty += direction;

  if(item.qty <= 0){
    cart =
      cart.filter(x=>x.id !== id);
  }

  saveCart();
  renderCart();
}


/* =========================================================
   PANIER OUVERTURE
========================================================= */

function openCart(){

  cartOverlay.classList.add("open");

  document.body.style.overflow = "hidden";

}

function closeCart(){

  cartOverlay.classList.remove("open");

  document.body.style.overflow = "";

}

cartBtn.addEventListener("click",openCart);

cartClose.addEventListener("click",closeCart);

cartOverlay.addEventListener("click",e=>{
  if(e.target === cartOverlay){
    closeCart();
  }
});


/* =========================================================
   COMMANDES
========================================================= */

async function openOrders(){

  if(!currentUser){

    openModal(
      "📦 Commandes",
      `
        <div style="text-align:center">

          <div style="font-size:40px">👤</div>

          <strong>
            Connecte-toi pour voir tes commandes.
          </strong>

          <div style="margin-top:15px">
            <button id="ordersLogin" class="primary-btn">
              Se connecter
            </button>
          </div>

        </div>
      `
    );

    $("ordersLogin").addEventListener("click",()=>{
      authMode = "login";
      showAuthForm();
    });

    return;
  }

  openModal(
    "📦 Mes commandes",
    `<div id="ordersContent">Chargement...</div>`
  );

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid),
      orderBy("createdAt","desc")
    );

    const snapshot =
      await getDocs(q);

    if(snapshot.empty){

      $("ordersContent").innerHTML = `
        <div style="
          text-align:center;
          color:var(--muted);
          padding:35px 10px
        ">
          Aucune commande pour le moment.
        </div>
      `;

      return;
    }

    $("ordersContent").innerHTML =
      snapshot.docs.map(docSnap=>{

        const order =
          docSnap.data();

        return `

          <div style="
            background:var(--card);
            border:1px solid var(--border);
            border-radius:13px;
            padding:14px;
            margin-bottom:10px;
          ">

            <strong>
              Commande ${escapeHtml(docSnap.id.slice(0,8))}
            </strong>

            <div style="
              color:var(--muted);
              font-size:12px;
              margin-top:5px
            ">
              ${order.items?.length || 0} article(s)
            </div>

            <div style="
              font-weight:900;
              margin-top:8px
            ">
              ${money(order.total || 0)}
            </div>

          </div>
        `;

      }).join("");

  }catch(error){

    console.error(error);

    $("ordersContent").innerHTML = `
      <div style="color:#ef4444">
        Impossible de charger les commandes.
      </div>
    `;
  }
}


/* =========================================================
   CHECKOUT
========================================================= */

async function checkout(){

  if(!cart.length){

    toast("Ton panier est vide.");
    return;
  }

  if(!currentUser){

    openModal(
      "🔐 Connexion nécessaire",
      `
        <div style="text-align:center">

          <div style="font-size:40px">🔐</div>

          <p style="color:var(--muted)">
            Connecte-toi avant de passer commande.
          </p>

          <button id="checkoutLogin" class="primary-btn">
            Se connecter
          </button>

        </div>
      `
    );

    $("checkoutLogin").addEventListener("click",()=>{
      closeCart();
      authMode = "login";
      showAuthForm();
    });

    return;
  }

  const items =
    cart.map(item=>{

      const product =
        products.find(p=>p.id === item.id);

      return {
        productId:product.id,
        name:product.name,
        price:product.price,
        quantity:item.qty
      };

    });

  const total =
    cartTotalValue();

  try{

    await addDoc(
      collection(db,"orders"),
      {
        userId:currentUser.uid,
        email:currentUser.email,
        items,
        total,
        createdAt:serverTimestamp()
      }
    );

    cart = [];

    saveCart();
    renderCart();
    closeCart();

    toast("✅ Commande enregistrée");

  }catch(error){

    console.error(error);

    toast(
      "Impossible d'enregistrer la commande."
    );
  }
}

checkoutBtn.addEventListener(
  "click",
  checkout
);


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return currentUser &&
    currentUser.email === ADMIN_EMAIL;
}

function hasAdminAuthorization(){

  return localStorage.getItem(
    ADMIN_ACCESS_KEY
  ) === "true";
}

function removeAdminAuthorization(){

  localStorage.removeItem(
    ADMIN_ACCESS_KEY
  );

  toast("Autorisation admin supprimée");
}

function requestAdminAccess(){

  openModal(
    "🛠️ Administration",
    `
      <form id="adminAccessForm" class="form">

        <div>
          <label>Code administrateur</label>

          <input
            id="adminCodeInput"
            type="password"
            placeholder="Code admin"
            autocomplete="off"
            required
          >
        </div>

        <button class="primary-btn">
          Ouvrir le dashboard
        </button>

      </form>
    `
  );

  $("adminAccessForm")
    .addEventListener("submit",e=>{

      e.preventDefault();

      const code =
        $("adminCodeInput").value;

      if(code === ADMIN_CODE){

        localStorage.setItem(
          ADMIN_ACCESS_KEY,
          "true"
        );

        toast("Accès admin mémorisé");

        openAdminDashboard();

      }else{

        toast("Code administrateur incorrect");
      }

    });
}

async function openAdminDashboard(){

  if(!isAdmin()){

    toast("Accès administrateur refusé");
    return;
  }

  openModal(
    "🛠️ NovaShop Dashboard",
    `
      <div class="admin-dashboard">

        <div id="adminStats">
          Chargement...
        </div>

        <div>
          <h4>Produits</h4>

          <div
            id="adminProducts"
            class="admin-products"
          >
            Chargement...
          </div>
        </div>

        <div style="
          display:grid;
          gap:8px;
          margin-top:10px
        ">

          <button
            id="removeAdminAuth"
            class="secondary-btn"
          >
            🔓 Oublier l'autorisation admin
          </button>

          <button
            id="deleteAllData"
            class="danger-btn"
          >
            🗑️ Supprimer toutes les commandes
          </button>

        </div>

      </div>
    `
  );

  renderAdminProducts();
  await renderAdminStats();

  $("removeAdminAuth")
    .addEventListener("click",()=>{
      removeAdminAuthorization();
      closeModal();
    });

  $("deleteAllData")
    .addEventListener("click",deleteAllData);
}

function renderAdminProducts(){

  $("adminProducts").innerHTML =
    products.map(product=>`

      <div class="admin-product">

        <div style="min-width:0">

          <strong style="
            display:block;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          ">
            ${escapeHtml(product.name)}
          </strong>

          <span style="
            color:var(--muted);
            font-size:11px
          ">
            ${escapeHtml(product.category)}
          </span>

        </div>

        <strong>
          ${money(product.price)}
        </strong>

      </div>

    `).join("");
}

async function renderAdminStats(){

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs.map(d=>d.data());

    const revenue =
      orders.reduce(
        (sum,o)=>sum+(Number(o.total)||0),
        0
      );

    $("adminStats").innerHTML = `

      <div class="admin-stats">

        <div class="admin-stat">
          <span style="color:var(--muted)">
            Produits
          </span>

          <strong>
            ${products.length}
          </strong>
        </div>

        <div class="admin-stat">
          <span style="color:var(--muted)">
            Commandes
          </span>

          <strong>
            ${orders.length}
          </strong>
        </div>

        <div class="admin-stat">
          <span style="color:var(--muted)">
            Total commandes
          </span>

          <strong>
            ${money(revenue)}
          </strong>
        </div>

      </div>
    `;

  }catch(error){

    console.error(error);

    $("adminStats").innerHTML = `
      <div style="color:#ef4444">
        Impossible de charger les statistiques.
      </div>
    `;
  }
}

async function deleteAllData(){

  const confirmation =
    confirm(
      "Supprimer toutes les commandes Firebase ? Cette action est irréversible."
    );

  if(!confirmation) return;

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    for(const item of snapshot.docs){

      await deleteDoc(
        doc(db,"orders",item.id)
      );
    }

    toast("Toutes les commandes ont été supprimées");

    await renderAdminStats();

  }catch(error){

    console.error(error);

    toast(
      "Erreur pendant la suppression."
    );
  }
}


/* =========================================================
   HEADER
========================================================= */

accountBtn.addEventListener(
  "click",
  openAuthModal
);

ordersBtn.addEventListener(
  "click",
  openOrders
);

settingsBtn.addEventListener(
  "click",
  openSettings
);

adminBtn.addEventListener(
  "click",
  ()=>{

    if(!isAdmin()){

      toast("Compte administrateur requis");
      return;
    }

    if(hasAdminAuthorization()){

      openAdminDashboard();

    }else{

      requestAdminAccess();

    }

  }
);


/* =========================================================
   HERO
========================================================= */

$("heroProductsBtn")
  .addEventListener("click",()=>{

    $("productsSection")
      .scrollIntoView({
        behavior:"smooth"
      });

  });

$("heroCategoriesBtn")
  .addEventListener("click",()=>{

    categoriesEl.scrollIntoView({
      behavior:"smooth",
      block:"center"
    });

  });


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;

    if(currentUser){

      accountBtn.innerHTML =
        "👤 <span class='label'>Compte</span>";

    }else{

      accountBtn.innerHTML =
        "👤 <span class='label'>Compte</span>";

      if(localStorage.getItem(ADMIN_ACCESS_KEY)){
        localStorage.removeItem(
          ADMIN_ACCESS_KEY
        );
      }
    }

    if(isAdmin()){

      adminBtn.style.display = "flex";

    }else{

      adminBtn.style.display = "none";

    }

  }
);


/* =========================================================
   CLAVIER
========================================================= */

document.addEventListener("keydown",e=>{

  if(e.key === "Escape"){

    closeModal();
    closeCart();

  }

});


/* =========================================================
   INITIALISATION
========================================================= */

loadTheme();
loadCart();
renderCategories();
renderProducts();
renderCart();


/* =========================================================
   DEBUG
========================================================= */

window.NovaShop = {

  products,

  getCart(){
    return [...cart];
  },

  clearCart(){
    cart = [];
    saveCart();
    renderCart();
  },

  toggleTheme,

  openCart,

  closeCart,

  openSettings

};
