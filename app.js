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
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


/* =========================================================
   PAYPAL
========================================================= */

const PAYPAL_USERNAME = "SH0PNOVA";


/* =========================================================
   PROMO
========================================================= */

const PROMO_CODE = "NOVA100";


/* =========================================================
   PRODUCTS
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
const categoriesEl = $("categories");
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
  if(Number(value) === 0) return "Prix à venir";

  return Number(value).toLocaleString("fr-FR", {
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

  if(!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  },3000);
}


function fakeRating(product){

  const number = product.id
    .replace("p","");

  const n = Number(number);

  return {
    rating:4.2 + ((n * 7) % 8) / 10,
    reviews:23 + ((n * 37) % 380)
  };
}


function imageProxy(url){

  if(!url) return "";

  if(
    url.startsWith("https://wsrv.nl") ||
    url.startsWith("data:")
  ){
    return url;
  }

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
   LOCAL STORAGE CART
========================================================= */

function loadCart(){

  try{

    const saved = localStorage.getItem("novaCart");

    if(saved){
      const parsed = JSON.parse(saved);

      if(Array.isArray(parsed)){
        cart = parsed;
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


/* =========================================================
   CART TOTAL
========================================================= */

function getSubtotal(){

  return cart.reduce((total,item) => {

    return total +
      Number(item.price) *
      Number(item.quantity);

  },0);

}


function getDiscount(){

  if(currentPromo){
    return getSubtotal();
  }

  return 0;

}


function getTotal(){

  return Math.max(
    0,
    getSubtotal() - getDiscount()
  );

}


/* =========================================================
   CART BADGE
========================================================= */

function updateCartBadge(){

  if(!cartBadge) return;

  const count = cart.reduce(
    (sum,item) => sum + Number(item.quantity),
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

  if(!categoriesEl) return;

  const categories = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  categoriesEl.innerHTML =
    categories.map(category => `
      <button
        class="category ${category === currentCategory ? "active" : ""}"
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

  const sort = sortSelect?.value || "default";

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
              data-fallback="${escapeHTML(imageProxy(product.image))}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="
                if(this.dataset.fallback && this.src !== this.dataset.fallback){
                  this.src=this.dataset.fallback;
                }else{
                  this.style.display='none';
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
                  color:white;
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
   PRODUCT MODAL
========================================================= */

function openProduct(productId){

  const product =
    products.find(p => p.id === productId);

  if(!product || !modalLayer) return;

  currentProduct = product;

  const rating = fakeRating(product);

  if(modalTitle){
    modalTitle.textContent = product.name;
  }

  if(modalContent){

    modalContent.innerHTML = `

      <div style="
        display:grid;
        grid-template-columns:minmax(250px,1fr) minmax(250px,1fr);
        gap:25px;
      ">

        <div style="
          background:white;
          border-radius:15px;
          min-height:300px;
          display:grid;
          place-items:center;
          padding:20px;
        ">

          <img
            src="${escapeHTML(product.image)}"
            data-fallback="${escapeHTML(imageProxy(product.image))}"
            alt="${escapeHTML(product.name)}"
            style="
              max-height:330px;
              width:100%;
              object-fit:contain;
            "
            onerror="
              if(this.dataset.fallback && this.src !== this.dataset.fallback){
                this.src=this.dataset.fallback;
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
            <span class="stars">★★★★★</span>
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

          ${
            product.price === 0
            ? `
              <div style="
                padding:12px;
                border-radius:10px;
                background:rgba(45,140,255,.1);
                color:#65acff;
                margin-bottom:15px;
              ">
                Prix à venir
              </div>
            `
            : ""
          }

          <button
            class="add-btn"
            id="modalAdd"
            style="
              width:100%;
              padding:14px;
            "
            ${product.price === 0 ? "disabled" : ""}
          >
            Ajouter au panier
          </button>

        </div>

      </div>

      <div class="summary">

        <strong>Avis clients</strong>

        <p style="
          color:var(--muted);
          margin-top:10px;
          line-height:1.6;
        ">
          Produit populaire auprès des clients NovaShop.
          Note moyenne ${rating.rating.toFixed(1)}/5.
        </p>

      </div>

    `;

  }

  modalLayer.classList.add("open");

}


/* =========================================================
   MODAL GENERIC
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
              if(this.dataset.fallback){
                this.src=this.dataset.fallback;
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

              <button
                data-minus="${item.id}"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                data-plus="${item.id}"
              >
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

    cartTotal.textContent =
      money(getTotal());

  }

  updateCartBadge();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId){

  const product =
    products.find(p => p.id === productId);

  if(!product) return;

  if(Number(product.price) <= 0){

    showToast(
      "Ce produit n'est pas encore disponible."
    );

    return;
  }

  const existing =
    cart.find(item => item.id === productId);

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

  showToast("Produit ajouté au panier 🛒");

}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(productId,delta){

  const item =
    cart.find(x => x.id === productId);

  if(!item) return;

  item.quantity += delta;

  if(item.quantity <= 0){

    cart =
      cart.filter(x => x.id !== productId);

  }

  saveCart();
  renderCart();

}


function removeFromCart(productId){

  cart =
    cart.filter(x => x.id !== productId);

  saveCart();
  renderCart();

  showToast("Produit retiré du panier");

}


/* =========================================================
   SETTINGS
========================================================= */

function renderSettings(){

  const theme =
    localStorage.getItem("novaThemeChoice") || "dark";

  const animations =
    localStorage.getItem("novaAnimations") !== "false";

  openModal(
    "Paramètres",
    `

      <div class="summary">

        <h3>Apparence</h3>

        <div class="field" style="margin-top:15px;">

          <label>Thème</label>

          <select id="themeSelect">

            <option
              value="dark"
              ${theme === "dark" ? "selected" : ""}
            >
              Sombre
            </option>

            <option
              value="light"
              ${theme === "light" ? "selected" : ""}
            >
              Clair
            </option>

          </select>

        </div>

        <div class="field" style="margin-top:15px;">

          <label>Animations</label>

          <select id="animationsSelect">

            <option
              value="true"
              ${animations ? "selected" : ""}
            >
              Activées
            </option>

            <option
              value="false"
              ${!animations ? "selected" : ""}
            >
              Désactivées
            </option>

          </select>

        </div>

      </div>

      <div class="summary">

        <strong>NovaShop</strong>

        <p style="
          color:var(--muted);
          margin-top:8px;
        ">
          Gaming • High-Tech • Setup
        </p>

      </div>

    `
  );

}


/* =========================================================
   APPLY SETTINGS
========================================================= */

function applyTheme(){

  const theme =
    localStorage.getItem("novaThemeChoice") || "dark";

  document.body.classList.toggle(
    "light",
    theme === "light"
  );

}


function applyAnimations(){

  const enabled =
    localStorage.getItem("novaAnimations") !== "false";

  if(!enabled){

    const style =
      document.getElementById("novaNoAnimations");

    if(!style){

      const css =
        document.createElement("style");

      css.id = "novaNoAnimations";

      css.textContent = `
        *,
        *::before,
        *::after{
          animation:none!important;
          transition:none!important;
        }
      `;

      document.head.appendChild(css);

    }

  }else{

    document
      .getElementById("novaNoAnimations")
      ?.remove();

  }

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

          <strong>Connecté</strong>

          <p style="
            color:var(--muted);
            margin-top:8px;
          ">
            ${escapeHTML(currentUser.email)}
          </p>

        </div>

        <button
          class="secondary"
          id="logoutBtn"
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
        class="primary"
        id="loginBtn"
        style="
          width:100%;
          margin-top:15px;
        "
      >
        Se connecter
      </button>

      <button
        class="secondary"
        id="registerBtn"
        style="
          width:100%;
          margin-top:10px;
        "
      >
        Créer un compte
      </button>

    `
  );

}


/* =========================================================
   LOGIN
========================================================= */

async function login(){

  const email =
    $("authEmail")?.value.trim();

  const password =
    $("authPassword")?.value;

  if(!email || !password){

    showToast(
      "Remplis ton email et ton mot de passe."
    );

    return;
  }

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal();

    showToast("Connexion réussie 👤");

  }catch(error){

    console.error(error);

    showToast(
      "Connexion impossible : vérifie tes identifiants."
    );

  }

}


/* =========================================================
   REGISTER
========================================================= */

async function register(){

  const email =
    $("authEmail")?.value.trim();

  const password =
    $("authPassword")?.value;

  if(!email || !password){

    showToast(
      "Remplis ton email et ton mot de passe."
    );

    return;
  }

  if(password.length < 6){

    showToast(
      "Le mot de passe doit contenir au moins 6 caractères."
    );

    return;
  }

  try{

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal();

    showToast(
      "Compte créé avec succès 👤"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de créer le compte."
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

  }

}


/* =========================================================
   ADDRESS VALIDATION
========================================================= */

function validateAddress(address){

  if(!address){
    return {
      valid:false,
      message:"Adresse de livraison obligatoire."
    };
  }

  const firstName =
    String(address.firstName || "").trim();

  const lastName =
    String(address.lastName || "").trim();

  const street =
    String(address.street || "").trim();

  const postal =
    String(address.postal || "").trim();

  const city =
    String(address.city || "").trim();

  const country =
    String(address.country || "").trim();

  if(firstName.length < 2){

    return {
      valid:false,
      message:"Prénom invalide."
    };

  }

  if(lastName.length < 2){

    return {
      valid:false,
      message:"Nom invalide."
    };

  }

  if(street.length < 5){

    return {
      valid:false,
      message:"Adresse trop courte."
    };

  }

  if(!/\d/.test(street)){

    return {
      valid:false,
      message:"Indique le numéro et le nom de la rue."
    };

  }

  if(!/^\d{5}$/.test(postal)){

    return {
      valid:false,
      message:"Code postal français invalide."
    };

  }

  if(city.length < 2){

    return {
      valid:false,
      message:"Ville invalide."
    };

  }

  if(country.length < 2){

    return {
      valid:false,
      message:"Pays invalide."
    };

  }

  return {
    valid:true,
    message:"Adresse valide."
  };

}


/* =========================================================
   CHECKOUT MODAL
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

        <strong>📦 Adresse de livraison</strong>

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
              inputmode="numeric"
              maxlength="5"
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

        <strong>🎟️ Code promotionnel</strong>

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

        <strong>🧾 Résumé</strong>

        <div
          class="summary-row"
          style="margin-top:14px;"
        >
          <span>Sous-total</span>
          <span id="checkoutSubtotal">
            ${money(subtotal)}
          </span>
        </div>

        <div
          class="summary-row"
          id="checkoutDiscountRow"
          style="display:none;"
        >
          <span>Réduction NOVA100</span>
          <span id="checkoutDiscount">
            -0,00 €
          </span>
        </div>

        <div class="summary-row summary-total">

          <span>Total</span>

          <span id="checkoutTotal">
            ${money(subtotal)}
          </span>

        </div>

      </div>


      <div
        style="
          padding:12px;
          margin-top:14px;
          border-radius:12px;
          background:rgba(255,196,57,.12);
          color:#ffc439;
          font-size:13px;
        "
      >
        💳 Le paiement PayPal ouvrira
        <strong>paypal.me/SH0PNOVA</strong>
        avec le montant de la commande.
      </div>


      <button
        class="paypal"
        id="paypalBtn"
      >
        💳 Payer avec PayPal
      </button>


      <button
        class="free-order"
        id="freeOrderBtn"
        style="display:none;"
      >
        🎁 Valider ma commande à 0 €
      </button>

    `
  );

}


/* =========================================================
   CHECKOUT ADDRESS
========================================================= */

function getCheckoutAddress(){

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


/* =========================================================
   PROMO NOVA100
========================================================= */

function applyPromo(){

  const input =
    $("promoInput");

  const message =
    $("promoMessage");

  if(!input || !message) return;

  const code =
    input.value.trim().toUpperCase();

  if(code === PROMO_CODE){

    currentPromo = true;

    const subtotal =
      getSubtotal();

    message.style.color =
      "var(--green)";

    message.textContent =
      "✓ Code NOVA100 appliqué. Total = 0 €";

    const discountRow =
      $("checkoutDiscountRow");

    const discount =
      $("checkoutDiscount");

    const total =
      $("checkoutTotal");

    if(discountRow){
      discountRow.style.display = "flex";
    }

    if(discount){
      discount.textContent =
        "- " + money(subtotal);
    }

    if(total){
      total.textContent =
        "0,00 €";
    }

    const paypal =
      $("paypalBtn");

    if(paypal){
      paypal.style.display = "none";
    }

    const free =
      $("freeOrderBtn");

    if(free){
      free.style.display = "block";
    }

    showToast(
      "NOVA100 activé 🎟️"
    );

  }else{

    currentPromo = false;

    message.style.color =
      "var(--danger)";

    message.textContent =
      "✕ Code promo invalide.";

    const discountRow =
      $("checkoutDiscountRow");

    if(discountRow){
      discountRow.style.display = "none";
    }

    const total =
      $("checkoutTotal");

    if(total){
      total.textContent =
        money(getSubtotal());
    }

    $("paypalBtn")?.style.removeProperty("display");
    $("freeOrderBtn")?.style.setProperty(
      "display",
      "none"
    );

  }

}


/* =========================================================
   CREATE ORDER
========================================================= */

async function createOrder(paymentMethod){

  if(!currentUser){

    showToast(
      "Connecte-toi pour commander."
    );

    return;

  }

  if(!cart.length){

    showToast(
      "Panier vide."
    );

    return;

  }

  const address =
    getCheckoutAddress();

  const addressCheck =
    validateAddress(address);

  if(!addressCheck.valid){

    showToast(
      "Commande refusée : " +
      addressCheck.message
    );

    return;

  }

  const subtotal =
    getSubtotal();

  const discount =
    currentPromo
      ? subtotal
      : 0;

  const total =
    Math.max(
      0,
      subtotal - discount
    );

  const orderItems =
    cart.map(item => ({
      id:item.id,
      name:item.name,
      price:Number(item.price),
      quantity:Number(item.quantity),
      image:item.image
    }));

  try{

    const orderData = {

      userId:currentUser.uid,

      email:currentUser.email,

      items:orderItems,

      subtotal:Number(subtotal.toFixed(2)),

      discount:Number(discount.toFixed(2)),

      total:Number(total.toFixed(2)),

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

      createdAt:serverTimestamp(),

      invoiceNumber:
        "NOVA-" +
        Date.now()

    };

    const orderRef =
      await addDoc(
        collection(db,"orders"),
        orderData
      );

    closeModal();
    closeCartDrawer();

    cart = [];

    currentPromo = false;

    saveCart();
    renderCart();

    showToast(
      "Commande créée ✓"
    );

    return orderRef.id;

  }catch(error){

    console.error(
      "Erreur création commande:",
      error
    );

    showToast(
      "Impossible de créer la commande."
    );

    return null;

  }

}


/* =========================================================
   PAYPAL
========================================================= */

async function startPayPal(){

  if(!currentUser){

    showToast(
      "Connecte-toi avant de payer."
    );

    return;

  }

  const address =
    getCheckoutAddress();

  const addressCheck =
    validateAddress(address);

  if(!addressCheck.valid){

    showToast(
      "Paiement refusé : " +
      addressCheck.message
    );

    return;

  }

  if(currentPromo){

    showToast(
      "Utilise le bouton de validation à 0 €."
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

  const orderId =
    await createOrder("PayPal");

  if(!orderId){

    return;

  }

  const amount =
    total.toFixed(2);

  const paypalUrl =
    "https://paypal.me/" +
    PAYPAL_USERNAME +
    "/" +
    amount;

  window.open(
    paypalUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   FREE NOVA100 ORDER
========================================================= */

async function createFreeOrder(){

  if(!currentPromo){

    showToast(
      "Le code NOVA100 n'est pas activé."
    );

    return;

  }

  const id =
    await createOrder(
      "NOVA100"
    );

  if(id){

    showToast(
      "Commande NOVA100 validée 🎁"
    );

  }

}


/* =========================================================
   ORDERS
========================================================= */

async function renderOrders(){

  if(!currentUser){

    showToast(
      "Connecte-toi pour voir tes commandes."
    );

    renderAccount();

    return;

  }

  openModal(
    "Mes commandes",
    `
      <div style="
        padding:20px;
        text-align:center;
        color:var(--muted);
      ">
        Chargement des commandes...
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
        .sort((a,b) => {

          const da =
            a.createdAt?.seconds ||
            0;

          const dbb =
            b.createdAt?.seconds ||
            0;

          return dbb - da;

        });

    if(!orders.length){

      openModal(
        "Mes commandes",
        `
          <div style="
            padding:35px;
            text-align:center;
            color:var(--muted);
          ">
            Aucune commande pour le moment.
          </div>
        `
      );

      return;

    }

    openModal(
      "Mes commandes",
      orders.map(order => {

        const status =
          order.status ||
          "Commande reçue";

        const items =
          Array.isArray(order.items)
            ? order.items
            : [];

        const itemText =
          items.map(
            item =>
              `${escapeHTML(item.name)}
              × ${item.quantity}`
          ).join("<br>");

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
                ${escapeHTML(status)}
              </span>

            </div>

            <div class="progress">

              <div class="progress-step active"></div>

              <div class="progress-line ${
                status !== "Commande reçue"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-step ${
                status !== "Commande reçue"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-line ${
                status === "Expédiée" ||
                status === "Livrée"
                  ? "active"
                  : ""
              }"></div>

              <div class="progress-step ${
                status === "Expédiée" ||
                status === "Livrée"
                  ? "active"
                  : ""
              }"></div>

            </div>

            <div style="
              color:var(--muted);
              font-size:13px;
              line-height:1.6;
            ">
              ${itemText}
            </div>

            <div style="
              margin-top:14px;
              display:flex;
              justify-content:space-between;
              gap:10px;
            ">

              <span>
                ${escapeHTML(
                  order.paymentMethod ||
                  "Paiement"
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

            ${
              order.shippingAddress
              ? `
                <div style="
                  margin-top:12px;
                  color:var(--muted);
                  font-size:12px;
                ">
                  📍
                  ${escapeHTML(
                    order.shippingAddress.street
                  )},
                  ${escapeHTML(
                    order.shippingAddress.postal
                  )}
                  ${escapeHTML(
                    order.shippingAddress.city
                  )}
                </div>
              `
              : ""
            }

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
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


/* =========================================================
   INVOICE
========================================================= */

function printInvoice(order){

  if(!order) return;

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
            Number(item.price) *
            Number(item.quantity)
          )}
        </td>

      </tr>

    `).join("");

  const address =
    order.shippingAddress || {};

  const invoiceHTML = `

    <!DOCTYPE html>

    <html lang="fr">

    <head>

      <meta charset="UTF-8">

      <title>
        Facture ${escapeHTML(
          order.invoiceNumber || order.id
        )}
      </title>

      <style>

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111;
        }

        h1{
          margin-bottom:5px;
        }

        .top{
          display:flex;
          justify-content:space-between;
          gap:30px;
          margin-bottom:35px;
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
          font-size:22px;
          font-weight:bold;
          margin-top:20px;
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

          <div>
            ${escapeHTML(
              order.invoiceNumber ||
              order.id
            )}
          </div>

          <div class="muted">
            ${formatDate(order.createdAt)}
          </div>

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

        <strong>Adresse de livraison</strong>

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


      <div class="box" style="margin-top:35px;">

        <strong>Paiement</strong>

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
      "Autorise les fenêtres pop-up pour afficher la facture."
    );

    return;

  }

  win.document.write(invoiceHTML);
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

        <strong>Accès NovaShop Admin</strong>

        <p style="
          color:var(--muted);
          margin-top:7px;
        ">
          Entre le code administrateur.
        </p>

        <div class="field" style="margin-top:15px;">

          <label>Code admin</label>

          <input
            id="adminCodeInput"
            type="password"
            placeholder="Code administrateur"
          >

        </div>

        <button
          class="primary"
          id="adminLoginBtn"
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
   ADMIN DASHBOARD
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
        padding:20px;
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
        .sort((a,b) => {

          const da =
            a.createdAt?.seconds || 0;

          const dbb =
            b.createdAt?.seconds || 0;

          return dbb - da;

        });

    openModal(
      "Administration",
      `

        <div class="summary">

          <strong>
            ${orders.length}
            commande(s)
          </strong>

          <button
            class="secondary"
            id="adminDeleteAll"
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

                    Paiement :
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

                    <select
                      data-status="${order.id}"
                    >

                      <option
                        value="Commande reçue"
                        ${
                          order.status ===
                          "Commande reçue"
                            ? "selected"
                            : ""
                        }
                      >
                        Commande reçue
                      </option>

                      <option
                        value="Paiement accepté"
                        ${
                          order.status ===
                          "Paiement accepté"
                            ? "selected"
                            : ""
                        }
                      >
                        Paiement accepté
                      </option>

                      <option
                        value="En préparation"
                        ${
                          order.status ===
                          "En préparation"
                            ? "selected"
                            : ""
                        }
                      >
                        En préparation
                      </option>

                      <option
                        value="Expédiée"
                        ${
                          order.status ===
                          "Expédiée"
                            ? "selected"
                            : ""
                        }
                      >
                        Expédiée
                      </option>

                      <option
                        value="Livrée"
                        ${
                          order.status ===
                          "Livrée"
                            ? "selected"
                            : ""
                        }
                      >
                        Livrée
                      </option>

                      <option
                        value="Annulée"
                        ${
                          order.status ===
                          "Annulée"
                            ? "selected"
                            : ""
                        }
                      >
                        Annulée
                      </option>

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
          Impossible de charger les commandes.
        </div>
      `
    );

  }

}


/* =========================================================
   ADMIN SAVE
========================================================= */

async function saveAdminOrder(orderId){

  const statusEl =
    document.querySelector(
      `[data-status="${orderId}"]`
    );

  const trackingEl =
    document.querySelector(
      `[data-tracking="${orderId}"]`
    );

  const status =
    statusEl?.value ||
    "Commande reçue";

  const tracking =
    trackingEl?.value.trim() || "";

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        status,
        trackingNumber:tracking
      }
    );

    showToast(
      "Commande mise à jour ✓"
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de mettre à jour la commande."
    );

  }

}


/* =========================================================
   ADMIN ACCEPT PAYPAL
========================================================= */

async function acceptPayPal(orderId){

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"paid",
        status:"Paiement accepté"
      }
    );

    showToast(
      "Paiement PayPal accepté ✓"
    );

    renderAdmin();

  }catch(error){

    console.error(error);

    showToast(
      "Impossible d'accepter le paiement."
    );

  }

}


/* =========================================================
   ADMIN DELETE ALL
========================================================= */

async function deleteAllOrders(){

  const ok =
    confirm(
      "Supprimer TOUTES les commandes ? Cette action est irréversible."
    );

  if(!ok) return;

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
      "Erreur pendant la suppression."
    );

  }

}


/* =========================================================
   EVENT DELEGATION
========================================================= */


/* CATEGORIES */

categoriesEl?.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-category]"
      );

    if(!button) return;

    currentCategory =
      button.dataset.category;

    renderCategories();
    renderProducts();

  }
);


/* PRODUCTS */

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


/* MODAL */

modalContent?.addEventListener(
  "click",
  event => {

    const modalAdd =
      event.target.closest("#modalAdd");

    if(modalAdd && currentProduct){

      addToCart(
        currentProduct.id
      );

      closeModal();

    }

    if(event.target.closest("#loginBtn")){

      login();

    }

    if(event.target.closest("#registerBtn")){

      register();

    }

    if(event.target.closest("#logoutBtn")){

      logout();

    }

    if(event.target.closest("#promoBtn")){

      applyPromo();

    }

    if(event.target.closest("#paypalBtn")){

      startPayPal();

    }

    if(event.target.closest("#freeOrderBtn")){

      createFreeOrder();

    }

    if(event.target.closest("#adminLoginBtn")){

      const code =
        $("adminCodeInput")
          ?.value
          .trim();

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

    }

    if(event.target.closest("#adminDeleteAll")){

      deleteAllOrders();

    }

    const saveButton =
      event.target.closest(
        "[data-save-order]"
      );

    if(saveButton){

      saveAdminOrder(
        saveButton.dataset.saveOrder
      );

    }

    const acceptButton =
      event.target.closest(
        "[data-accept-paypal]"
      );

    if(acceptButton){

      acceptPayPal(
        acceptButton.dataset.acceptPaypal
      );

    }

    const printButton =
      event.target.closest(
        "[data-print-order]"
      );

    if(printButton){

      loadOrderAndPrint(
        printButton.dataset.printOrder
      );

    }

    if(event.target.closest("#themeSelect")){

      const value =
        event.target.value;

      localStorage.setItem(
        "novaThemeChoice",
        value
      );

      applyTheme();

    }

    if(event.target.closest("#animationsSelect")){

      const value =
        event.target.value;

      localStorage.setItem(
        "novaAnimations",
        value
      );

      applyAnimations();

    }

  }
);


/* =========================================================
   LOAD ORDER FOR INVOICE
========================================================= */

async function loadOrderAndPrint(orderId){

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const found =
      snapshot.docs.find(
        d => d.id === orderId
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
      "Impossible de générer la facture."
    );

  }

}


/* =========================================================
   CART EVENTS
========================================================= */

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
   SEARCH
========================================================= */

searchInput?.addEventListener(
  "input",
  renderProducts
);


/* =========================================================
   SORT
========================================================= */

sortSelect?.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   HEADER BUTTONS
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


/* SETTINGS */

settingsBtn?.addEventListener(
  "click",
  renderSettings
);


/* ACCOUNT */

accountBtn?.addEventListener(
  "click",
  renderAccount
);


/* ORDERS */

ordersBtn?.addEventListener(
  "click",
  renderOrders
);


/* ADMIN */

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


/* CHECKOUT */

checkoutBtn?.addEventListener(
  "click",
  openCheckout
);


/* =========================================================
   ESCAPE
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
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    if(adminBtn){

      const isAdmin =
        user &&
        user.email?.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase();

      adminBtn.style.display =
        isAdmin ? "grid" : "none";

    }

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
   GLOBAL API
========================================================= */

window.NovaShop = {

  products,

  get cart(){
    return cart;
  },

  addToCart,

  removeFromCart,

  changeQuantity,

  openCart,

  closeCart:closeCartDrawer,

  openProduct,

  renderOrders,

  renderAdmin,

  printInvoice,

  getSubtotal,

  getTotal,

  applyPromo

};

console.log(
  "NovaShop chargé correctement ✓"
);
