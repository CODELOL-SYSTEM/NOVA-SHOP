import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const PAYPAL_USERNAME = "SH0PNOVA";
const PROMO_CODE = "NOVA100";


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
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
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
    name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category:"Écrans",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id:"p20",
    name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle',
    category:"Écrans",
    price:65.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id:"p21",
    name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
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
    name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category:"Claviers",
    price:56.99,
    image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id:"p32",
    name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category:"Claviers",
    price:91.99,
    image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
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
    name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
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
  },

  {
    id:"p43",
    name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category:"PC Gamer",
    price:650,
    image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    new:true
  }

];


/* =========================================================
   STATE
========================================================= */

let cart = [];
let currentUser = null;
let currentCategory = "Tous";
let currentProduct = null;
let currentPromo = false;


/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const categories = $("categories");
const productGrid = $("productGrid");

const cartBtn = $("cartBtn");
const heroCartBtn = $("heroCartBtn");
const cartDrawer = $("cartDrawer");
const overlay = $("overlay");
const closeCart = $("closeCart");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const cartBadge = $("cartBadge");
const checkoutBtn = $("checkoutBtn");

const settingsBtn = $("settingsBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");

const modalLayer = $("modalLayer");
const modalClose = $("modalClose");
const modalTitle = $("modalTitle");
const modalContent = $("modalContent");

const toast = $("toast");


/* =========================================================
   UTILS
========================================================= */

function money(value){

  if(Number(value) === 0){
    return "Prix à venir";
  }

  return Number(value).toLocaleString("fr-FR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  }) + " €";
}


function escapeHTML(value){

  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}


function showToast(message){

  if(!toast){
    console.log(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  },3000);

}


function fakeRating(product){

  const n = Number(product.id.replace("p",""));

  return {
    rating:4.2 + ((n * 7) % 8) / 10,
    reviews:23 + ((n * 37) % 380)
  };

}


function imageProxy(url){

  if(!url) return "";

  return "https://wsrv.nl/?url=" +
    encodeURIComponent(url);

}


function formatDate(value){

  let date = null;

  if(value?.toDate){
    date = value.toDate();
  }
  else if(value?.seconds){
    date = new Date(value.seconds * 1000);
  }
  else if(value){
    date = new Date(value);
  }

  if(!date || Number.isNaN(date.getTime())){
    return "Date inconnue";
  }

  return date.toLocaleString("fr-FR");

}


/* =========================================================
   FIREBASE ERROR
========================================================= */

function firebaseAuthError(error){

  console.error("========== FIREBASE AUTH ERROR ==========");
  console.error(error);
  console.error("Code :",error?.code);
  console.error("Message :",error?.message);
  console.error("Projet :",firebaseConfig.projectId);
  console.error("Domaine :",location.origin);
  console.error("=========================================");

  const code = error?.code || "unknown";

  const messages = {

    "auth/operation-not-allowed":
      "❌ Email/Mot de passe n'est PAS activé dans Firebase. Va dans Firebase > Authentication > Sign-in method > Email/Password > Activer.",

    "auth/unauthorized-domain":
      "❌ Ce domaine n'est pas autorisé par Firebase. Va dans Firebase > Authentication > Settings > Authorized domains et ajoute ton domaine.",

    "auth/invalid-api-key":
      "❌ La clé API Firebase est invalide.",

    "auth/network-request-failed":
      "❌ Erreur réseau. Vérifie Internet.",

    "auth/invalid-email":
      "❌ L'adresse email est invalide.",

    "auth/email-already-in-use":
      "❌ Cet email possède déjà un compte.",

    "auth/weak-password":
      "❌ Mot de passe trop faible. Utilise au minimum 6 caractères.",

    "auth/invalid-credential":
      "❌ Email ou mot de passe incorrect.",

    "auth/wrong-password":
      "❌ Mot de passe incorrect.",

    "auth/user-not-found":
      "❌ Aucun compte avec cet email.",

    "auth/user-disabled":
      "❌ Ce compte a été désactivé.",

    "auth/too-many-requests":
      "❌ Trop de tentatives. Réessaie plus tard.",

    "auth/missing-password":
      "❌ Mot de passe manquant.",

    "auth/internal-error":
      "❌ Erreur interne Firebase."

  };

  return messages[code] ||
    `❌ Erreur Firebase : ${code}\n${error?.message || ""}`;

}


/* =========================================================
   CART
========================================================= */

function loadCart(){

  try{

    const saved = localStorage.getItem("novaCart");

    if(saved){

      const data = JSON.parse(saved);

      if(Array.isArray(data)){
        cart = data;
      }

    }

  }catch(error){

    console.error(error);
    cart = [];

  }

}


function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function getSubtotal(){

  return cart.reduce(
    (sum,item) =>
      sum +
      Number(item.price) *
      Number(item.quantity),
    0
  );

}


function getDiscount(){

  return currentPromo
    ? getSubtotal()
    : 0;

}


function getTotal(){

  return Math.max(
    0,
    getSubtotal() - getDiscount()
  );

}


function updateCartBadge(){

  if(!cartBadge) return;

  const count =
    cart.reduce(
      (sum,item) =>
        sum + Number(item.quantity),
      0
    );

  cartBadge.textContent = count;

  cartBadge.style.display =
    count > 0 ? "grid" : "none";

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  if(!categories) return;

  const list = [
    "Tous",
    ...new Set(
      products.map(p => p.category)
    )
  ];

  categories.innerHTML =
    list.map(category => `

      <button
        class="category ${
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
   PRODUCTS
========================================================= */

function getFilteredProducts(){

  let list = [...products];

  const search =
    searchInput?.value
      ?.trim()
      .toLowerCase() || "";

  if(currentCategory !== "Tous"){

    list = list.filter(
      p => p.category === currentCategory
    );

  }

  if(search){

    list = list.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );

  }

  const sort =
    sortSelect?.value || "default";

  if(sort === "priceAsc"){
    list.sort((a,b) => a.price - b.price);
  }

  if(sort === "priceDesc"){
    list.sort((a,b) => b.price - a.price);
  }

  if(sort === "rating"){
    list.sort(
      (a,b) =>
        fakeRating(b).rating -
        fakeRating(a).rating
    );
  }

  return list;

}


function renderProducts(){

  if(!productGrid) return;

  const list = getFilteredProducts();

  if(!list.length){

    productGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:50px;
        text-align:center;
        color:var(--muted);
      ">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }

  productGrid.innerHTML =
    list.map(product => {

      const rating = fakeRating(product);

      return `

        <article class="product">

          <div class="product-img">

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="
                if(!this.dataset.proxy){
                  this.dataset.proxy='1';
                  this.src='${escapeHTML(imageProxy(product.image))}';
                }
              "
            >

            ${
              product.new
              ? `
                <span style="
                  position:absolute;
                  top:12px;
                  left:12px;
                  background:var(--blue);
                  color:#fff;
                  padding:6px 9px;
                  border-radius:8px;
                  font-size:10px;
                  font-weight:900;
                ">
                  NOUVEAU
                </span>
              `
              : ""
            }

          </div>

          <div class="product-body">

            <div class="product-cat">
              ${escapeHTML(product.category)}
            </div>

            <h3>
              ${escapeHTML(product.name)}
            </h3>

            <div class="rating">

              <span class="stars">
                ★★★★★
              </span>

              <span>
                ${rating.rating.toFixed(1)}
                (${rating.reviews})
              </span>

            </div>

            <div class="product-bottom">

              <div class="price">
                ${money(product.price)}
              </div>

              <div class="product-actions">

                <button
                  class="view-btn"
                  data-view="${product.id}"
                >
                  Voir
                </button>

                <button
                  class="add-btn"
                  data-add="${product.id}"
                  ${product.price <= 0 ? "disabled" : ""}
                >
                  Ajouter
                </button>

              </div>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


/* =========================================================
   MODALS
========================================================= */

function openModal(title,html){

  if(modalTitle){
    modalTitle.textContent = title;
  }

  if(modalContent){
    modalContent.innerHTML = html;
  }

  modalLayer?.classList.add("open");

}


function closeModal(){

  modalLayer?.classList.remove("open");

}


function openProduct(id){

  const product =
    products.find(p => p.id === id);

  if(!product) return;

  currentProduct = product;

  const rating = fakeRating(product);

  openModal(
    product.name,
    `

      <div style="
        display:grid;
        grid-template-columns:minmax(250px,1fr) minmax(250px,1fr);
        gap:25px;
      ">

        <div style="
          background:#fff;
          border-radius:15px;
          min-height:300px;
          display:grid;
          place-items:center;
          padding:20px;
        ">

          <img
            src="${escapeHTML(product.image)}"
            style="
              max-height:330px;
              width:100%;
              object-fit:contain;
            "
            alt="${escapeHTML(product.name)}"
            onerror="
              if(!this.dataset.proxy){
                this.dataset.proxy='1';
                this.src='${escapeHTML(imageProxy(product.image))}';
              }
            "
          >

        </div>

        <div>

          <div class="product-cat">
            ${escapeHTML(product.category)}
          </div>

          <h2 style="margin:8px 0 15px;">
            ${escapeHTML(product.name)}
          </h2>

          <div class="rating">

            <span class="stars">
              ★★★★★
            </span>

            <span>
              ${rating.rating.toFixed(1)}
              (${rating.reviews} avis)
            </span>

          </div>

          <div style="
            font-size:30px;
            font-weight:950;
            margin:20px 0;
          ">
            ${money(product.price)}
          </div>

          <button
            id="modalAdd"
            class="add-btn"
            style="
              width:100%;
              padding:14px;
            "
            ${product.price <= 0 ? "disabled" : ""}
          >
            Ajouter au panier
          </button>

        </div>

      </div>

    `
  );

}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart(){

  cartDrawer?.classList.add("open");
  overlay?.classList.add("open");

}


function closeCartDrawer(){

  cartDrawer?.classList.remove("open");
  overlay?.classList.remove("open");

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart(){

  if(!cartItems) return;

  if(!cart.length){

    cartItems.innerHTML = `

      <div style="
        padding:50px 20px;
        text-align:center;
        color:var(--muted);
      ">

        <div style="
          font-size:45px;
          margin-bottom:15px;
        ">
          🛒
        </div>

        <strong>
          Ton panier est vide
        </strong>

        <p style="margin-top:8px;">
          Ajoute un produit pour commencer.
        </p>

      </div>

    `;

  }else{

    cartItems.innerHTML =
      cart.map(item => `

        <div class="cart-item">

          <img
            src="${escapeHTML(item.image)}"
            alt=""
            onerror="
              if(!this.dataset.proxy){
                this.dataset.proxy='1';
                this.src='${escapeHTML(imageProxy(item.image))}';
              }
            "
          >

          <div>

            <h4>
              ${escapeHTML(item.name)}
            </h4>

            <p>
              ${money(item.price)}
            </p>

            <div class="qty">

              <button data-minus="${item.id}">
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button data-plus="${item.id}">
                +
              </button>

              <button
                data-remove="${item.id}"
                style="
                  margin-left:5px;
                  color:var(--danger);
                "
              >
                ×
              </button>

            </div>

          </div>

          <strong>
            ${money(item.price * item.quantity)}
          </strong>

        </div>

      `).join("");

  }

  if(cartTotal){
    cartTotal.textContent = money(getTotal());
  }

  updateCartBadge();

}


/* =========================================================
   ADD CART
========================================================= */

function addToCart(id){

  const product =
    products.find(p => p.id === id);

  if(!product) return;

  if(product.price <= 0){

    showToast(
      "Ce produit n'est pas encore disponible."
    );

    return;

  }

  const existing =
    cart.find(item => item.id === id);

  if(existing){
    existing.quantity++;
  }else{
    cart.push({
      id:product.id,
      name:product.name,
      price:Number(product.price),
      image:product.image,
      quantity:1
    });
  }

  saveCart();
  renderCart();

  showToast(
    "Produit ajouté au panier 🛒"
  );

}


function changeQuantity(id,delta){

  const item =
    cart.find(x => x.id === id);

  if(!item) return;

  item.quantity += delta;

  if(item.quantity <= 0){
    cart = cart.filter(x => x.id !== id);
  }

  saveCart();
  renderCart();

}


function removeFromCart(id){

  cart =
    cart.filter(x => x.id !== id);

  saveCart();
  renderCart();

  showToast(
    "Produit retiré du panier."
  );

}


/* =========================================================
   ACCOUNT
========================================================= */

function renderAccount(){

  if(currentUser){

    openModal(
      "Mon compte",
      `

        <div class="summary">

          <strong>
            Connecté ✓
          </strong>

          <p style="
            color:var(--muted);
            margin-top:8px;
          ">
            ${escapeHTML(currentUser.email)}
          </p>

        </div>

        <button
          id="logoutBtn"
          class="secondary"
          style="
            width:100%;
            margin-top:12px;
          "
        >
          Se déconnecter
        </button>

      `
    );

    return;

  }

  openModal(
    "Compte",
    `

      <div class="form-grid">

        <div class="field full">

          <label>Email</label>

          <input
            id="authEmail"
            type="email"
            placeholder="ton@email.com"
            autocomplete="email"
          >

        </div>

        <div class="field full">

          <label>Mot de passe</label>

          <input
            id="authPassword"
            type="password"
            placeholder="Mot de passe"
            autocomplete="current-password"
          >

        </div>

      </div>

      <button
        id="loginBtn"
        class="primary"
        style="
          width:100%;
          margin-top:15px;
        "
      >
        Se connecter
      </button>

      <button
        id="registerBtn"
        class="secondary"
        style="
          width:100%;
          margin-top:10px;
        "
      >
        Créer un compte
      </button>

      <div
        id="authMessage"
        style="
          margin-top:12px;
          text-align:center;
          font-size:13px;
          white-space:pre-line;
          line-height:1.5;
        "
      ></div>

    `
  );

}


function authMessage(text,error=true){

  const el = $("authMessage");

  if(!el) return;

  el.textContent = text;

  el.style.color =
    error
      ? "var(--danger)"
      : "var(--green)";

}


/* =========================================================
   LOGIN
========================================================= */

async function login(){

  const email =
    $("authEmail")?.value?.trim() || "";

  const password =
    $("authPassword")?.value || "";

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
    "Connexion en cours...",
    false
  );

  try{

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    console.log(
      "LOGIN OK",
      result.user.email,
      result.user.uid
    );

    closeModal();

    showToast(
      "Connexion réussie ✓"
    );

  }catch(error){

    authMessage(
      firebaseAuthError(error)
    );

  }

}


/* =========================================================
   REGISTER
========================================================= */

async function register(){

  const email =
    $("authEmail")?.value?.trim() || "";

  const password =
    $("authPassword")?.value || "";

  if(!email){

    authMessage(
      "Entre ton adresse email."
    );

    return;

  }

  if(!password){

    authMessage(
      "Choisis un mot de passe."
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
    "Création du compte...",
    false
  );

  try{

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    console.log(
      "REGISTER OK",
      result.user.email,
      result.user.uid
    );

    closeModal();

    showToast(
      "Compte créé avec succès ✓"
    );

  }catch(error){

    authMessage(
      firebaseAuthError(error)
    );

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
      "Déconnexion réussie."
    );

  }catch(error){

    console.error(error);

    showToast(
      firebaseAuthError(error)
    );

  }

}


/* =========================================================
   ADDRESS
========================================================= */

function getAddress(){

  return {

    firstName:
      $("shipFirstName")?.value.trim() || "",

    lastName:
      $("shipLastName")?.value.trim() || "",

    street:
      $("shipStreet")?.value.trim() || "",

    postal:
      $("shipPostal")?.value.trim() || "",

    city:
      $("shipCity")?.value.trim() || "",

    country:
      $("shipCountry")?.value.trim() || ""

  };

}


function validateAddress(address){

  if(address.firstName.length < 2){
    return {
      valid:false,
      message:"Prénom invalide."
    };
  }

  if(address.lastName.length < 2){
    return {
      valid:false,
      message:"Nom invalide."
    };
  }

  if(address.street.length < 5){
    return {
      valid:false,
      message:"Adresse invalide."
    };
  }

  if(!/\d/.test(address.street)){
    return {
      valid:false,
      message:"Indique le numéro de rue."
    };
  }

  if(!/^\d{5}$/.test(address.postal)){
    return {
      valid:false,
      message:"Code postal français invalide."
    };
  }

  if(address.city.length < 2){
    return {
      valid:false,
      message:"Ville invalide."
    };
  }

  if(address.country.length < 2){
    return {
      valid:false,
      message:"Pays invalide."
    };
  }

  return {
    valid:true,
    message:"OK"
  };

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!currentUser){

    showToast(
      "Connecte-toi avant de commander."
    );

    renderAccount();

    return;

  }

  if(!cart.length){

    showToast(
      "Ton panier est vide."
    );

    return;

  }

  currentPromo = false;

  const subtotal = getSubtotal();

  openModal(
    "Finaliser ma commande",
    `

      <div class="summary">

        <strong>
          📦 Adresse de livraison
        </strong>

        <div class="form-grid" style="margin-top:15px;">

          <div class="field">

            <label>Prénom *</label>

            <input
              id="shipFirstName"
              autocomplete="given-name"
              placeholder="Alex"
            >

          </div>

          <div class="field">

            <label>Nom *</label>

            <input
              id="shipLastName"
              autocomplete="family-name"
              placeholder="Dupont"
            >

          </div>

          <div class="field full">

            <label>Adresse *</label>

            <input
              id="shipStreet"
              autocomplete="street-address"
              placeholder="12 rue Exemple"
            >

          </div>

          <div class="field">

            <label>Code postal *</label>

            <input
              id="shipPostal"
              maxlength="5"
              inputmode="numeric"
              autocomplete="postal-code"
              placeholder="59000"
            >

          </div>

          <div class="field">

            <label>Ville *</label>

            <input
              id="shipCity"
              autocomplete="address-level2"
              placeholder="Lille"
            >

          </div>

          <div class="field full">

            <label>Pays *</label>

            <input
              id="shipCountry"
              autocomplete="country-name"
              value="France"
            >

          </div>

        </div>

      </div>


      <div class="summary">

        <strong>
          🎟️ Code promotionnel
        </strong>

        <div style="
          display:flex;
          gap:8px;
          margin-top:12px;
        ">

          <input
            id="promoInput"
            class="search"
            style="min-width:0;"
            placeholder="NOVA100"
          >

          <button
            class="secondary"
            id="promoBtn"
            type="button"
          >
            Appliquer
          </button>

        </div>

        <div
          id="promoMessage"
          style="
            margin-top:10px;
            font-size:13px;
          "
        ></div>

      </div>


      <div class="summary">

        <strong>
          🧾 Résumé
        </strong>

        <div
          class="summary-row"
          style="margin-top:14px;"
        >

          <span>
            Sous-total
          </span>

          <span id="checkoutSubtotal">
            ${money(subtotal)}
          </span>

        </div>

        <div
          class="summary-row"
          id="checkoutDiscountRow"
          style="display:none;"
        >

          <span>
            Réduction NOVA100
          </span>

          <span id="checkoutDiscount">
            -0,00 €
          </span>

        </div>

        <div class="summary-row summary-total">

          <span>
            Total
          </span>

          <span id="checkoutTotal">
            ${money(subtotal)}
          </span>

        </div>

      </div>


      <button
        class="paypal"
        id="paypalBtn"
        type="button"
      >
        💳 Payer avec PayPal
      </button>


      <button
        class="free-order"
        id="freeOrderBtn"
        type="button"
        style="display:none;"
      >
        🎁 Valider ma commande à 0 €
      </button>

    `
  );

}


/* =========================================================
   PROMO
========================================================= */

function applyPromo(){

  const input = $("promoInput");
  const message = $("promoMessage");

  if(!input || !message) return;

  const code =
    input.value.trim().toUpperCase();

  if(code !== PROMO_CODE){

    currentPromo = false;

    message.style.color =
      "var(--danger)";

    message.textContent =
      "✕ Code promo invalide.";

    $("checkoutDiscountRow")
      ?.style
      .setProperty("display","none");

    const total = $("checkoutTotal");

    if(total){
      total.textContent =
        money(getSubtotal());
    }

    $("paypalBtn")
      ?.style
      .setProperty("display","block");

    $("freeOrderBtn")
      ?.style
      .setProperty("display","none");

    return;

  }

  currentPromo = true;

  const subtotal = getSubtotal();

  message.style.color =
    "var(--green)";

  message.textContent =
    "✓ NOVA100 appliqué. Total : 0 €";

  $("checkoutDiscountRow")
    ?.style
    .setProperty("display","flex");

  const discount =
    $("checkoutDiscount");

  if(discount){
    discount.textContent =
      "-" + money(subtotal);
  }

  const total =
    $("checkoutTotal");

  if(total){
    total.textContent =
      "0,00 €";
  }

  $("paypalBtn")
    ?.style
    .setProperty("display","none");

  $("freeOrderBtn")
    ?.style
    .setProperty("display","block");

  showToast(
    "NOVA100 activé 🎟️"
  );

}


/* =========================================================
   CREATE ORDER
========================================================= */

async function createOrder(paymentMethod){

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

  const address = getAddress();

  const check =
    validateAddress(address);

  if(!check.valid){

    showToast(
      "Commande refusée : " +
      check.message
    );

    return null;

  }

  const subtotal = getSubtotal();

  const discount =
    currentPromo
      ? subtotal
      : 0;

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  const items =
    cart.map(item => ({
      id:item.id,
      name:item.name,
      price:Number(item.price),
      quantity:Number(item.quantity),
      image:item.image
    }));

  try{

    const ref =
      await addDoc(
        collection(db,"orders"),
        {

          userId:
            currentUser.uid,

          email:
            currentUser.email,

          items,

          subtotal:
            Number(subtotal.toFixed(2)),

          discount:
            Number(discount.toFixed(2)),

          total:
            Number(total.toFixed(2)),

          promoCode:
            currentPromo
              ? PROMO_CODE
              : null,

          paymentMethod,

          paymentStatus:
            total === 0
              ? "paid"
              : "pending",

          status:
            total === 0
              ? "Commande reçue"
              : "Paiement en attente",

          trackingNumber:"",

          shippingAddress:address,

          invoiceNumber:
            "NOVA-" + Date.now(),

          createdAt:
            serverTimestamp()

        }
      );

    cart = [];

    currentPromo = false;

    saveCart();
    renderCart();

    closeModal();
    closeCartDrawer();

    showToast(
      "Commande créée ✓"
    );

    return ref.id;

  }catch(error){

    console.error(
      "Erreur commande:",
      error
    );

    showToast(
      "Erreur Firestore : " +
      (error.code || error.message)
    );

    return null;

  }

}


/* =========================================================
   PAYPAL
========================================================= */

async function payWithPayPal(){

  console.log("PAYPAL BUTTON CLICK");

  if(!currentUser){

    showToast(
      "Connecte-toi avant de payer."
    );

    renderAccount();

    return;

  }

  if(currentPromo){

    showToast(
      "NOVA100 est déjà appliqué."
    );

    return;

  }

  if(!cart.length){

    showToast(
      "Ton panier est vide."
    );

    return;

  }

  const address = getAddress();

  const check =
    validateAddress(address);

  if(!check.valid){

    showToast(
      "Paiement refusé : " +
      check.message
    );

    return;

  }

  const total =
    getTotal();

  if(total <= 0){

    showToast(
      "Montant invalide."
    );

    return;

  }

  const amount =
    Number(total).toFixed(2);

  /*
    On ouvre PayPal avec le montant exact.
  */

  const paypalUrl =
    "https://paypal.me/" +
    PAYPAL_USERNAME +
    "/" +
    amount;

  console.log(
    "Ouverture PayPal :",
    paypalUrl
  );

  /*
    Création de la commande AVANT ouverture
    de PayPal afin de conserver l'adresse.
  */

  const orderId =
    await createOrder("PayPal");

  if(!orderId){
    return;
  }

  const paypalWindow =
    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer"
    );

  if(!paypalWindow){

    showToast(
      "Autorise les fenêtres pop-up pour PayPal."
    );

    return;

  }

  showToast(
    "PayPal ouvert 💳"
  );

}


/* =========================================================
   FREE ORDER
========================================================= */

async function freeOrder(){

  if(!currentPromo){

    showToast(
      "Applique d'abord NOVA100."
    );

    return;

  }

  await createOrder(
    "NOVA100"
  );

}


/* =========================================================
   ORDERS
========================================================= */

async function renderOrders(){

  if(!currentUser){

    renderAccount();

    showToast(
      "Connecte-toi pour voir tes commandes."
    );

    return;

  }

  openModal(
    "Mes commandes",
    `
      <div style="
        padding:30px;
        text-align:center;
        color:var(--muted);
      ">
        Chargement...
      </div>
    `
  );

  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .sort(
          (a,b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );

    if(!orders.length){

      openModal(
        "Mes commandes",
        `
          <div style="
            padding:40px;
            text-align:center;
            color:var(--muted);
          ">
            Aucune commande.
          </div>
        `
      );

      return;

    }

    openModal(
      "Mes commandes",
      orders.map(order => {

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];

        return `

          <div class="order-card">

            <div class="order-top">

              <div>

                <strong>
                  ${escapeHTML(
                    order.invoiceNumber ||
                    order.id
                  )}
                </strong>

                <div style="
                  color:var(--muted);
                  font-size:12px;
                  margin-top:5px;
                ">
                  ${formatDate(order.createdAt)}
                </div>

              </div>

              <span class="status">
                ${escapeHTML(
                  order.status ||
                  "Commande reçue"
                )}
              </span>

            </div>


            <div class="progress">

              <div class="progress-step active"></div>

              <div class="progress-line ${
                order.status !== "Commande reçue"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-step ${
                order.status !== "Commande reçue"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-line ${
                order.status === "Expédiée" ||
                order.status === "Livrée"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-step ${
                order.status === "Expédiée" ||
                order.status === "Livrée"
                  ? "active"
                  : ""
              }"></div>

            </div>


            <div style="
              color:var(--muted);
              font-size:13px;
              line-height:1.7;
            ">

              ${
                items.map(item =>
                  escapeHTML(item.name) +
                  " × " +
                  item.quantity
                ).join("<br>")
              }

            </div>


            <div style="
              display:flex;
              justify-content:space-between;
              margin-top:15px;
            ">

              <span>
                ${escapeHTML(
                  order.paymentMethod || ""
                )}
              </span>

              <strong>
                ${money(order.total || 0)}
              </strong>

            </div>


            ${
              order.trackingNumber
              ? `
                <div style="
                  margin-top:12px;
                  padding:10px;
                  border-radius:9px;
                  background:rgba(45,140,255,.1);
                  color:#65acff;
                ">
                  📦 Suivi :
                  ${escapeHTML(
                    order.trackingNumber
                  )}
                </div>
              `
              : ""
            }


            <div style="
              margin-top:12px;
              color:var(--muted);
              font-size:12px;
            ">

              📍
              ${escapeHTML(
                order.shippingAddress?.street || ""
              )}
              <br>

              ${escapeHTML(
                order.shippingAddress?.postal || ""
              )}

              ${escapeHTML(
                order.shippingAddress?.city || ""
              )}

            </div>


            <button
              class="secondary"
              data-print-order="${order.id}"
              style="
                width:100%;
                margin-top:12px;
              "
            >
              🧾 Voir la facture
            </button>

          </div>

        `;

      }).join("")
    );

  }catch(error){

    console.error(error);

    openModal(
      "Mes commandes",
      `
        <div style="
          padding:25px;
          color:var(--danger);
        ">
          Erreur Firebase :
          ${escapeHTML(
            error.code ||
            error.message ||
            "Erreur inconnue"
          )}
        </div>
      `
    );

  }

}


/* =========================================================
   INVOICE
========================================================= */

function printInvoice(order){

  const address =
    order.shippingAddress || {};

  const items =
    Array.isArray(order.items)
      ? order.items
      : [];

  const rows =
    items.map(item => `

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

    `).join("");

  const html = `

    <!DOCTYPE html>

    <html lang="fr">

    <head>

      <meta charset="UTF-8">

      <title>
        Facture NovaShop
      </title>

      <style>

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111;
        }

        .top{
          display:flex;
          justify-content:space-between;
          gap:20px;
          margin-bottom:30px;
        }

        .box{
          border:1px solid #ddd;
          border-radius:10px;
          padding:15px;
          margin-bottom:20px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th,td{
          border-bottom:1px solid #ddd;
          padding:12px 8px;
          text-align:left;
        }

        .total{
          text-align:right;
          margin-top:20px;
          font-size:21px;
          font-weight:bold;
          line-height:1.8;
        }

        .muted{
          color:#666;
        }

      </style>

    </head>

    <body>

      <div class="top">

        <div>

          <h1>NOVASHOP</h1>

          <div class="muted">
            Gaming & High-Tech
          </div>

        </div>

        <div>

          <strong>FACTURE</strong>

          <br>

          ${escapeHTML(
            order.invoiceNumber ||
            order.id
          )}

          <br>

          <span class="muted">
            ${formatDate(order.createdAt)}
          </span>

        </div>

      </div>


      <div class="box">

        <strong>Client</strong>

        <p>
          ${escapeHTML(
            order.email || ""
          )}
        </p>

      </div>


      <div class="box">

        <strong>
          Adresse de livraison
        </strong>

        <p style="margin-top:8px;">

          ${escapeHTML(
            address.firstName || ""
          )}

          ${escapeHTML(
            address.lastName || ""
          )}

          <br>

          ${escapeHTML(
            address.street || ""
          )}

          <br>

          ${escapeHTML(
            address.postal || ""
          )}

          ${escapeHTML(
            address.city || ""
          )}

          <br>

          ${escapeHTML(
            address.country || ""
          )}

        </p>

      </div>


      <table>

        <thead>

          <tr>

            <th>Produit</th>
            <th>Qté</th>
            <th>Prix</th>
            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          ${rows}

        </tbody>

      </table>


      <div class="total">

        Sous-total :
        ${money(order.subtotal || 0)}

        <br>

        Réduction :
        -${money(order.discount || 0)}

        <br>

        Total :
        ${money(order.total || 0)}

      </div>


      <div class="box">

        <strong>
          Paiement
        </strong>

        <p style="margin-top:8px;">

          Méthode :
          ${escapeHTML(
            order.paymentMethod || ""
          )}

          <br>

          Statut :
          ${escapeHTML(
            order.paymentStatus || ""
          )}

        </p>

      </div>


      <p class="muted">
        Merci pour votre commande chez NovaShop.
      </p>


      <script>

        window.onload = function(){
          window.print();
        };

      <\/script>

    </body>

    </html>

  `;

  const win =
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if(!win){

    showToast(
      "Autorise les pop-ups pour afficher la facture."
    );

    return;

  }

  win.document.write(html);
  win.document.close();

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function openAdminLogin(){

  if(
    currentUser?.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "Accès administrateur refusé."
    );

    return;

  }

  openModal(
    "Administration",
    `

      <div class="summary">

        <strong>
          NovaShop Admin
        </strong>

        <div class="field" style="
          margin-top:15px;
        ">

          <label>
            Code administrateur
          </label>

          <input
            id="adminCodeInput"
            type="password"
            placeholder="Code admin"
          >

        </div>

        <button
          id="adminLoginBtn"
          class="primary"
          style="
            width:100%;
            margin-top:12px;
          "
        >
          Accéder
        </button>

      </div>

    `
  );

}


/* =========================================================
   ADMIN
========================================================= */

async function renderAdmin(){

  if(
    currentUser?.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "Accès administrateur refusé."
    );

    return;

  }

  openModal(
    "Administration",
    `
      <div style="
        padding:30px;
        text-align:center;
        color:var(--muted);
      ">
        Chargement...
      </div>
    `
  );

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .sort(
          (a,b) =>
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
        );

    openModal(
      "Administration",
      `

        <div class="summary">

          <strong>
            ${orders.length}
            commande(s)
          </strong>

          <button
            id="adminDeleteAll"
            class="secondary"
            style="
              width:100%;
              margin-top:12px;
              color:var(--danger);
            "
          >
            Supprimer toutes les commandes
          </button>

        </div>


        <div class="admin-list">

          ${
            orders.length
            ? orders.map(order => `

              <div
                class="admin-order"
                data-order-card="${order.id}"
              >

                <div class="order-top">

                  <div>

                    <strong>
                      ${escapeHTML(
                        order.invoiceNumber ||
                        order.id
                      )}
                    </strong>

                    <div style="
                      color:var(--muted);
                      font-size:12px;
                      margin-top:5px;
                    ">
                      ${escapeHTML(
                        order.email || ""
                      )}
                    </div>

                  </div>

                  <span class="status">
                    ${escapeHTML(
                      order.status ||
                      "Commande reçue"
                    )}
                  </span>

                </div>


                <div style="
                  margin-top:12px;
                  color:var(--muted);
                  font-size:13px;
                  line-height:1.7;
                ">

                  Total :
                  <strong>
                    ${money(order.total || 0)}
                  </strong>

                  <br>

                  Paiement :
                  ${escapeHTML(
                    order.paymentMethod || ""
                  )}

                  <br>

                  Statut paiement :
                  ${escapeHTML(
                    order.paymentStatus || ""
                  )}

                </div>


                ${
                  order.shippingAddress
                  ? `
                    <div style="
                      margin-top:12px;
                      padding:12px;
                      border-radius:10px;
                      background:var(--card2);
                      font-size:12px;
                      line-height:1.6;
                    ">

                      📍
                      ${escapeHTML(
                        order.shippingAddress.firstName
                      )}
                      ${escapeHTML(
                        order.shippingAddress.lastName
                      )}

                      <br>

                      ${escapeHTML(
                        order.shippingAddress.street
                      )}

                      <br>

                      ${escapeHTML(
                        order.shippingAddress.postal
                      )}

                      ${escapeHTML(
                        order.shippingAddress.city
                      )}

                      <br>

                      ${escapeHTML(
                        order.shippingAddress.country
                      )}

                    </div>
                  `
                  : ""
                }


                <div class="admin-controls">

                  <select data-status="${order.id}">

                    ${
                      [
                        "Commande reçue",
                        "Paiement accepté",
                        "En préparation",
                        "Expédiée",
                        "Livrée",
                        "Annulée"
                      ]
                      .map(status => `
                        <option
                          value="${escapeHTML(status)}"
                          ${
                            order.status === status
                              ? "selected"
                              : ""
                          }
                        >
                          ${escapeHTML(status)}
                        </option>
                      `)
                      .join("")
                    }

                  </select>


                  <input
                    data-tracking="${order.id}"
                    placeholder="Numéro de suivi"
                    value="${escapeHTML(
                      order.trackingNumber || ""
                    )}"
                  >


                  <button
                    class="admin-save full"
                    data-save-order="${order.id}"
                  >
                    💾 Enregistrer
                  </button>


                  ${
                    order.paymentMethod === "PayPal" &&
                    order.paymentStatus !== "paid"
                    ? `
                      <button
                        class="admin-save"
                        data-accept-paypal="${order.id}"
                      >
                        ✓ Accepter PayPal
                      </button>
                    `
                    : ""
                  }


                  <button
                    class="secondary"
                    data-print-order="${order.id}"
                  >
                    🧾 Facture
                  </button>

                </div>

              </div>

            `).join("")
            : `
              <div style="
                padding:30px;
                text-align:center;
                color:var(--muted);
              ">
                Aucune commande.
              </div>
            `
          }

        </div>

      `
    );

  }catch(error){

    console.error(error);

    openModal(
      "Administration",
      `
        <div style="
          padding:25px;
          color:var(--danger);
        ">
          Erreur Firebase :
          ${escapeHTML(
            error.code ||
            error.message ||
            "Erreur inconnue"
          )}
        </div>
      `
    );

  }

}


/* =========================================================
   ADMIN SAVE
========================================================= */

async function saveAdminOrder(id){

  const statusEl =
    document.querySelector(
      `[data-status="${id}"]`
    );

  const trackingEl =
    document.querySelector(
      `[data-tracking="${id}"]`
    );

  try{

    await updateDoc(
      doc(db,"orders",id),
      {
        status:
          statusEl?.value ||
          "Commande reçue",

        trackingNumber:
          trackingEl?.value.trim() || ""
      }
    );

    showToast(
      "Commande mise à jour ✓"
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    showToast(
      "Erreur Firebase : " +
      (error.code || error.message)
    );

  }

}


/* =========================================================
   ACCEPT PAYPAL
========================================================= */

async function acceptPayPal(id){

  try{

    await updateDoc(
      doc(db,"orders",id),
      {
        paymentStatus:"paid",
        status:"Paiement accepté"
      }
    );

    showToast(
      "Paiement accepté ✓"
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    showToast(
      "Erreur Firebase : " +
      (error.code || error.message)
    );

  }

}


/* =========================================================
   DELETE ALL
========================================================= */

async function deleteAllOrders(){

  if(!confirm(
    "Supprimer toutes les commandes ?"
  )){
    return;
  }

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

    showToast(
      "Toutes les commandes ont été supprimées."
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    showToast(
      "Erreur Firebase : " +
      (error.code || error.message)
    );

  }

}


/* =========================================================
   LOAD + PRINT ORDER
========================================================= */

async function loadOrderAndPrint(id){

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const found =
      snapshot.docs.find(
        d => d.id === id
      );

    if(!found){

      showToast(
        "Commande introuvable."
      );

      return;

    }

    printInvoice({
      id:found.id,
      ...found.data()
    });

  }catch(error){

    console.error(error);

    showToast(
      "Erreur Firebase : " +
      (error.code || error.message)
    );

  }

}


/* =========================================================
   SETTINGS
========================================================= */

function applyTheme(){

  const theme =
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark";

  document.body.classList.toggle(
    "light",
    theme === "light"
  );

}


function applyAnimations(){

  const enabled =
    localStorage.getItem(
      "novaAnimations"
    ) !== "false";

  let style =
    document.getElementById(
      "novaNoAnimations"
    );

  if(!enabled){

    if(!style){

      style =
        document.createElement("style");

      style.id =
        "novaNoAnimations";

      style.textContent = `
        *,
        *::before,
        *::after{
          animation:none!important;
          transition:none!important;
        }
      `;

      document.head.appendChild(style);

    }

  }else{

    style?.remove();

  }

}


function renderSettings(){

  const theme =
    localStorage.getItem(
      "novaThemeChoice"
    ) || "dark";

  const animations =
    localStorage.getItem(
      "novaAnimations"
    ) !== "false";

  openModal(
    "Paramètres",
    `

      <div class="summary">

        <h3>
          Apparence
        </h3>

        <div class="field" style="
          margin-top:15px;
        ">

          <label>
            Thème
          </label>

          <select id="themeSelect">

            <option
              value="dark"
              ${
                theme === "dark"
                  ? "selected"
                  : ""
              }
            >
              Sombre
            </option>

            <option
              value="light"
              ${
                theme === "light"
                  ? "selected"
                  : ""
              }
            >
              Clair
            </option>

          </select>

        </div>


        <div class="field" style="
          margin-top:15px;
        ">

          <label>
            Animations
          </label>

          <select id="animationsSelect">

            <option
              value="true"
              ${
                animations
                  ? "selected"
                  : ""
              }
            >
              Activées
            </option>

            <option
              value="false"
              ${
                !animations
                  ? "selected"
                  : ""
              }
            >
              Désactivées
            </option>

          </select>

        </div>

      </div>

    `
  );

}


/* =========================================================
   EVENTS
========================================================= */

categories?.addEventListener(
  "click",
  event => {

    const btn =
      event.target.closest(
        "[data-category]"
      );

    if(!btn) return;

    currentCategory =
      btn.dataset.category;

    renderCategories();
    renderProducts();

  }
);


productGrid?.addEventListener(
  "click",
  event => {

    const view =
      event.target.closest(
        "[data-view]"
      );

    if(view){

      openProduct(
        view.dataset.view
      );

      return;

    }

    const add =
      event.target.closest(
        "[data-add]"
      );

    if(add){

      addToCart(
        add.dataset.add
      );

    }

  }
);


cartItems?.addEventListener(
  "click",
  event => {

    const minus =
      event.target.closest(
        "[data-minus]"
      );

    if(minus){

      changeQuantity(
        minus.dataset.minus,
        -1
      );

      return;

    }

    const plus =
      event.target.closest(
        "[data-plus]"
      );

    if(plus){

      changeQuantity(
        plus.dataset.plus,
        1
      );

      return;

    }

    const remove =
      event.target.closest(
        "[data-remove]"
      );

    if(remove){

      removeFromCart(
        remove.dataset.remove
      );

    }

  }
);


/* =========================================================
   MODAL EVENTS
========================================================= */

modalContent?.addEventListener(
  "click",
  event => {

    const target = event.target;

    if(target.closest("#modalAdd")){

      if(currentProduct){

        addToCart(
          currentProduct.id
        );

        closeModal();

      }

      return;

    }


    if(target.closest("#loginBtn")){

      login();

      return;

    }


    if(target.closest("#registerBtn")){

      register();

      return;

    }


    if(target.closest("#logoutBtn")){

      logout();

      return;

    }


    if(target.closest("#promoBtn")){

      applyPromo();

      return;

    }


    if(target.closest("#paypalBtn")){

      payWithPayPal();

      return;

    }


    if(target.closest("#freeOrderBtn")){

      freeOrder();

      return;

    }


    if(target.closest("#adminLoginBtn")){

      const code =
        $("adminCodeInput")
          ?.value
          ?.trim();

      if(code === ADMIN_CODE){

        localStorage.setItem(
          ADMIN_ACCESS_KEY,
          "true"
        );

        renderAdmin();

      }else{

        showToast(
          "Code admin incorrect."
        );

      }

      return;

    }


    if(target.closest("#adminDeleteAll")){

      deleteAllOrders();

      return;

    }


    const save =
      target.closest(
        "[data-save-order]"
      );

    if(save){

      saveAdminOrder(
        save.dataset.saveOrder
      );

      return;

    }


    const accept =
      target.closest(
        "[data-accept-paypal]"
      );

    if(accept){

      acceptPayPal(
        accept.dataset.acceptPaypal
      );

      return;

    }


    const print =
      target.closest(
        "[data-print-order]"
      );

    if(print){

      loadOrderAndPrint(
        print.dataset.printOrder
      );

      return;

    }

  }
);


/* =========================================================
   SETTINGS EVENTS
========================================================= */

modalContent?.addEventListener(
  "change",
  event => {

    if(
      event.target.id ===
      "themeSelect"
    ){

      localStorage.setItem(
        "novaThemeChoice",
        event.target.value
      );

      applyTheme();

    }

    if(
      event.target.id ===
      "animationsSelect"
    ){

      localStorage.setItem(
        "novaAnimations",
        event.target.value
      );

      applyAnimations();

    }

  }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput?.addEventListener(
  "input",
  renderProducts
);


sortSelect?.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   CART BUTTONS
========================================================= */

cartBtn?.addEventListener(
  "click",
  openCart
);

heroCartBtn?.addEventListener(
  "click",
  openCart
);

closeCart?.addEventListener(
  "click",
  closeCartDrawer
);

overlay?.addEventListener(
  "click",
  closeCartDrawer
);


/* =========================================================
   MODAL CLOSE
========================================================= */

modalClose?.addEventListener(
  "click",
  closeModal
);

modalLayer?.addEventListener(
  "click",
  event => {

    if(event.target === modalLayer){

      closeModal();

    }

  }
);


/* =========================================================
   HEADER
========================================================= */

settingsBtn?.addEventListener(
  "click",
  renderSettings
);

accountBtn?.addEventListener(
  "click",
  renderAccount
);

ordersBtn?.addEventListener(
  "click",
  renderOrders
);

checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


/* =========================================================
   ADMIN
========================================================= */

adminBtn?.addEventListener(
  "click",
  () => {

    const authorized =
      localStorage.getItem(
        ADMIN_ACCESS_KEY
      ) === "true";

    if(authorized){

      renderAdmin();

    }else{

      openAdminLogin();

    }

  }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){

      closeModal();
      closeCartDrawer();

    }

  }
);


/* =========================================================
   FIREBASE AUTH
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    const isAdmin =
      user &&
      user.email?.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase();

    if(adminBtn){

      adminBtn.style.display =
        isAdmin
          ? "grid"
          : "none";

    }

    console.log(
      user
        ? "NovaShop connecté : " + user.email
        : "NovaShop : aucun utilisateur connecté"
    );

  }
);


/* =========================================================
   INIT
========================================================= */

loadCart();

applyTheme();

applyAnimations();

renderCategories();

renderProducts();

renderCart();


/* =========================================================
   DEBUG FIREBASE
========================================================= */

console.log(
  "🔥 Firebase project :",
  firebaseConfig.projectId
);

console.log(
  "🌐 Domaine actuel :",
  location.origin
);

console.log(
  "🔐 Firebase Auth initialisé"
);


/* =========================================================
   GLOBAL
========================================================= */

window.NovaShop = {

  products,

  get cart(){
    return cart;
  },

  get currentUser(){
    return currentUser;
  },

  addToCart,

  removeFromCart,

  changeQuantity,

  openCart,

  closeCart:
    closeCartDrawer,

  openProduct,

  renderOrders,

  renderAdmin,

  printInvoice,

  getSubtotal,

  getTotal,

  applyPromo,

  login,

  register,

  logout,

  payWithPayPal

};


console.log(
  "🚀 NovaShop app.js chargé correctement"
);
