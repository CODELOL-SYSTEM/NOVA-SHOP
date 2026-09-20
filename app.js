import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
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
  updateDoc,
  doc,
  deleteDoc,
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

const googleProvider = new GoogleAuthProvider();

/* =========================================================
   OWNER
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

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
name:"KOORUI Écran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
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
name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds",
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
name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire",
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
name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm",
category:"Bureaux gaming",
price:86.99,
image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
},

{
id:"p26",
name:"Bureau gaming d’angle HOMCOM réversible",
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
name:"Logitech PRO X TKL Rapid Noir filaire AZERTY",
category:"Claviers",
price:78.99,
image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
},

{
id:"p31",
name:"QwertyKey75 HE Striker Magnetic Hall Effect",
category:"Claviers",
price:56.99,
image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
},

{
id:"p32",
name:"GravaStar Mercury K1 Clavier Gamer sans Fil",
category:"Claviers",
price:91.99,
image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
},

{
id:"p33",
name:"ATTACK SHARK R11 Ultra 8000Hz 49g",
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
name:"Lampe de plafond hexagone nid d'abeille LED",
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
image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg"
}

];

/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

let currentCategory = "Tous";
let currentPromo = "";
let currentDiscount = 0;

let adminOrdersCache = [];

/* =========================================================
   HELPERS
========================================================= */

const $ = id => document.getElementById(id);

function money(value){
  return Number(value || 0).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function escapeHtml(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function showToast(message){
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(()=>{
    toast.classList.remove("show");
  },2600);
}

function saveCart(){
  localStorage.setItem("novaCart",JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function getProduct(id){
  return products.find(p=>p.id===id);
}

function getSubtotal(){
  return cart.reduce((sum,item)=>{
    const product = getProduct(item.id);
    return sum + (product ? product.price * item.qty : 0);
  },0);
}

function makeOrderNumber(){
  const now = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random()*900+100);
  return `NOVA-${now}-${random}`;
}

function normalizeStatus(status){
  return status || "accepted";
}

function statusInfo(status){

  const data = {
    pending:{
      label:"En attente de validation",
      index:0
    },

    accepted:{
      label:"Commande acceptée",
      index:1
    },

    preparing:{
      label:"Colis préparé",
      index:2
    },

    transit:{
      label:"En transit",
      index:3
    },

    nearby:{
      label:"Livraison proche",
      index:4
    },

    delivered:{
      label:"Livrée",
      index:5
    }
  };

  return data[status] || data.accepted;
}

function formatDate(timestamp){

  if(!timestamp) return "Date inconnue";

  try{

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    return date.toLocaleDateString("fr-FR",{
      day:"2-digit",
      month:"2-digit",
      year:"numeric"
    });

  }catch{
    return "Date inconnue";
  }
}

/* =========================================================
   MODALS
========================================================= */

function openModal(id){
  closeAll(false);
  $(id).classList.add("active");
  $("overlay").classList.add("active");
}

function closeAll(clear=true){

  document.querySelectorAll(".modal").forEach(el=>{
    el.classList.remove("active");
  });

  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("active");

  if(clear){
    currentPromo = "";
    currentDiscount = 0;
  }
}

$("overlay").addEventListener("click",()=>{
  closeAll();
});

/* =========================================================
   SHOP
========================================================= */

function scrollToShop(){
  $("shop").scrollIntoView({
    behavior:"smooth"
  });
}

window.scrollToShop = scrollToShop;

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  $("categories").innerHTML = categories.map(category=>`

    <button
      class="category ${category===currentCategory ? "active":""}"
      onclick="selectCategory(${JSON.stringify(category)})"
    >
      ${escapeHtml(category)}
    </button>

  `).join("");
}

window.selectCategory = function(category){

  currentCategory = category;

  renderCategories();
  renderProducts();

};

function getRating(product){

  const number = parseInt(product.id.replace("p",""),10);

  const rating = 4.4 + ((number % 6) * .1);

  const count = 132 + ((number * 173) % 1604);

  return {
    rating:Math.min(4.9,rating),
    count
  };
}

function renderProducts(){

  const search = $("searchInput").value.trim().toLowerCase();

  let list = products.filter(product=>{

    const categoryMatch =
      currentCategory==="Tous" ||
      product.category===currentCategory;

    const searchMatch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  const sort = $("sortSelect").value;

  if(sort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort==="rating"){
    list.sort((a,b)=>getRating(b).rating-getRating(a).rating);
  }

  $("productCount").textContent =
    `${list.length} produit${list.length>1?"s":""}`;

  if(!list.length){
    $("products").innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        Aucun produit trouvé.
      </div>
    `;
    return;
  }

  $("products").innerHTML = list.map(product=>{

    const review = getRating(product);

    return `

      <article class="product">

        <div class="product-image">
          <img
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </div>

        <div class="product-info">

          <div class="product-cat">
            ${escapeHtml(product.category)}
          </div>

          <h3>${escapeHtml(product.name)}</h3>

          <div class="rating">
            ★★★★☆
            <span>
              ${review.rating.toFixed(1).replace(".",",")}
              · ${review.count.toLocaleString("fr-FR")} avis
            </span>
          </div>

          <div class="product-bottom">

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="product-actions">

              <button
                class="small-btn"
                onclick="viewProduct('${product.id}')"
              >
                Voir
              </button>

              <button
                class="small-btn primary"
                onclick="addToCart('${product.id}')"
              >
                🛒
              </button>

            </div>

          </div>

        </div>

      </article>

    `;

  }).join("");
}

$("searchInput").addEventListener("input",renderProducts);
$("sortSelect").addEventListener("change",renderProducts);

/* =========================================================
   PRODUCT
========================================================= */

window.viewProduct = function(id){

  const product = getProduct(id);

  if(!product) return;

  const review = getRating(product);

  $("modalTitle").textContent = product.name;

  $("modalContent").innerHTML = `

    <img
      src="${escapeHtml(product.image)}"
      style="
        width:100%;
        height:270px;
        object-fit:contain;
        background:#fff;
        border-radius:14px;
      "
    >

    <div style="margin-top:18px">

      <div class="product-cat">
        ${escapeHtml(product.category)}
      </div>

      <h2 style="margin:7px 0">
        ${escapeHtml(product.name)}
      </h2>

      <div class="rating">
        ★★★★☆
        <span>
          ${review.rating.toFixed(1).replace(".",",")}
          · ${review.count.toLocaleString("fr-FR")} avis
        </span>
      </div>

      <div style="
        font-size:28px;
        font-weight:900;
        margin:18px 0
      ">
        ${money(product.price)}
      </div>

      <button
        class="btn btn-primary"
        onclick="addToCart('${product.id}');closeAll()"
      >
        🛒 Ajouter au panier
      </button>

    </div>

  `;

  openModal("modal");
};

/* =========================================================
   CART
========================================================= */

window.addToCart = function(id){

  const product = getProduct(id);

  if(!product) return;

  const existing = cart.find(item=>item.id===id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  saveCart();

  showToast(`${product.name} ajouté au panier`);
};

window.changeQty = function(id,delta){

  const item = cart.find(i=>i.id===id);

  if(!item) return;

  item.qty += delta;

  if(item.qty<=0){
    cart = cart.filter(i=>i.id!==id);
  }

  saveCart();
};

function renderCart(){

  const container = $("cartItems");

  if(!cart.length){

    container.innerHTML = `
      <div class="empty">
        🛒<br><br>
        Ton panier est vide.
      </div>
    `;

    $("cartTotal").textContent = money(0);

    return;
  }

  container.innerHTML = cart.map(item=>{

    const product = getProduct(item.id);

    if(!product) return "";

    return `

      <div class="cart-item">

        <img src="${escapeHtml(product.image)}">

        <div>

          <h4>${escapeHtml(product.name)}</h4>

          <p>${money(product.price)}</p>

          <div class="qty">

            <button onclick="changeQty('${product.id}',-1)">−</button>

            <strong>${item.qty}</strong>

            <button onclick="changeQty('${product.id}',1)">+</button>

          </div>

        </div>

        <strong>${money(product.price*item.qty)}</strong>

      </div>

    `;

  }).join("");

  $("cartTotal").textContent = money(getSubtotal());
}

function updateCartBadge(){

  const total = cart.reduce((sum,item)=>sum+item.qty,0);

  $("cartBadge").textContent = total;
}

$("cartBtn").addEventListener("click",()=>{

  closeAll(false);

  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("active");

});

/* =========================================================
   ACCOUNT
========================================================= */

$("accountBtn").addEventListener("click",()=>{

  renderAccount();
  openModal("accountModal");

});

function renderAccount(){

  if(!currentUser){

    $("accountContent").innerHTML = `

      <div style="text-align:center">

        <h3>Connexion</h3>

        <p style="color:var(--muted)">
          Connecte-toi pour passer une commande et suivre tes achats.
        </p>

        <button
          class="btn btn-primary"
          id="googleLogin"
        >
          Continuer avec Google
        </button>

      </div>

    `;

    $("googleLogin").onclick = loginGoogle;

    return;
  }

  const isAdmin =
    currentUser.email?.trim().toLowerCase() ===
    ADMIN_EMAIL.trim().toLowerCase();

  $("accountContent").innerHTML = `

    <div>

      <p>
        <strong>${escapeHtml(currentUser.displayName || "Compte NovaShop")}</strong>
      </p>

      <p style="color:var(--muted)">
        ${escapeHtml(currentUser.email || "")}
      </p>

      ${
        isAdmin
        ? `
          <div style="
            padding:12px;
            border-radius:12px;
            background:rgba(47,140,255,.1);
            color:var(--blue2);
            margin:15px 0;
            font-weight:800;
          ">
            👑 OWNER
          </div>
        `
        : ""
      }

      <button
        class="btn btn-secondary"
        id="logoutBtn"
      >
        Se déconnecter
      </button>

    </div>

  `;

  $("logoutBtn").onclick = logoutUser;
}

async function loginGoogle(){

  try{

    await signInWithPopup(auth,googleProvider);

    closeAll();

    showToast("Connexion réussie");

  }catch(error){

    console.error(error);

    showToast("Connexion impossible");

  }
}

async function logoutUser(){

  try{

    await signOut(auth);

    localStorage.removeItem(ADMIN_ACCESS_KEY);

    closeAll();

    showToast("Déconnexion réussie");

  }catch(error){

    console.error(error);

    showToast("Impossible de se déconnecter");

  }
}

/* =========================================================
   AUTH
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser = user;

  const connectedEmail =
    user?.email?.trim().toLowerCase() || "";

  const adminEmail =
    ADMIN_EMAIL.trim().toLowerCase();

  if(connectedEmail===adminEmail){

    $("adminBtn").style.display = "grid";

    console.log("👑 NovaShop OWNER détecté :",user.email);

  }else{

    $("adminBtn").style.display = "none";

  }

});

/* =========================================================
   CHECKOUT
========================================================= */

window.openCheckout = function(){

  if(!cart.length){

    showToast("Ton panier est vide");

    return;
  }

  if(!currentUser){

    closeAll();

    renderAccount();

    openModal("accountModal");

    showToast("Connecte-toi pour commander");

    return;
  }

  closeAll(false);

  currentPromo = "";
  currentDiscount = 0;

  $("promoCode").value = "";

  updateCheckoutSummary();

  openModal("checkoutModal");
};

function updateCheckoutSummary(){

  const subtotal = getSubtotal();

  const discount = currentDiscount;

  const total = Math.max(
    0,
    subtotal-discount
  );

  $("checkoutSubtotal").textContent = money(subtotal);

  $("checkoutDiscount").textContent =
    discount > 0
      ? `- ${money(discount)}`
      : money(0);

  $("checkoutTotal").textContent = money(total);

  if(currentPromo===PROMO_CODE){

    $("paypalBtn").style.display = "none";
    $("freeOrderBtn").style.display = "block";

  }else{

    $("paypalBtn").style.display = "block";
    $("freeOrderBtn").style.display = "none";

  }
}

$("applyPromo").addEventListener("click",()=>{

  const code =
    $("promoCode").value.trim().toUpperCase();

  if(code===PROMO_CODE){

    currentPromo = PROMO_CODE;

    currentDiscount = getSubtotal();

    updateCheckoutSummary();

    showToast("NOVA100 appliqué : commande à 0 €");

    return;
  }

  currentPromo = "";
  currentDiscount = 0;

  updateCheckoutSummary();

  showToast("Code promo invalide");

});

function getAddressData(){

  const fullName = $("fullName").value.trim();
  const address = $("address").value.trim();
  const postalCode = $("postalCode").value.trim();
  const city = $("city").value.trim();
  const phone = $("phone").value.trim();

  if(!fullName || !address || !postalCode || !city){

    showToast("Remplis toute l'adresse de livraison");

    return null;
  }

  return {
    fullName,
    address,
    postalCode,
    city,
    phone
  };
}

function getOrderItems(){

  return cart.map(item=>{

    const product = getProduct(item.id);

    return {
      productId:product.id,
      name:product.name,
      price:product.price,
      quantity:item.qty,
      image:product.image
    };

  });
}

/* =========================================================
   NOVA100
========================================================= */

$("freeOrderBtn").addEventListener("click",async()=>{

  if(currentPromo!==PROMO_CODE){

    return;
  }

  const address = getAddressData();

  if(!address) return;

  if(!currentUser){

    showToast("Connexion requise");

    return;
  }

  const orderNumber = makeOrderNumber();

  try{

    await addDoc(collection(db,"orders"),{

      orderNumber,

      userId:currentUser.uid,
      email:currentUser.email || "",

      items:getOrderItems(),

      subtotal:getSubtotal(),
      discount:getSubtotal(),
      total:0,

      paymentMethod:"Promo",
      paymentStatus:"free",

      promoCode:PROMO_CODE,

      address,

      status:"accepted",

      packageCity:address.city,

      estimatedDelivery:"",
      trackingNumber:"",

      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp()

    });

    cart = [];

    saveCart();

    closeAll();

    showToast("Commande NOVA100 acceptée automatiquement");

    openOrders();

  }catch(error){

    console.error(error);

    showToast("Impossible de créer la commande");

  }

});

/* =========================================================
   PAYPAL.ME
========================================================= */

$("paypalBtn").addEventListener("click",async()=>{

  const address = getAddressData();

  if(!address) return;

  if(!currentUser){

    showToast("Connexion requise");

    return;
  }

  const subtotal = getSubtotal();

  const total = Math.max(
    0,
    subtotal-currentDiscount
  );

  if(total<=0){

    showToast("Utilise la validation à 0 €");

    return;
  }

  const orderNumber = makeOrderNumber();

  try{

    await addDoc(collection(db,"orders"),{

      orderNumber,

      userId:currentUser.uid,
      email:currentUser.email || "",

      items:getOrderItems(),

      subtotal,
      discount:currentDiscount,
      total,

      paymentMethod:"PayPal.Me",
      paymentStatus:"pending",

      promoCode:currentPromo || "",

      address,

      status:"pending",

      packageCity:address.city,

      estimatedDelivery:"",
      trackingNumber:"",

      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp()

    });

    /*
      IMPORTANT :
      On ne marque PAS la commande comme payée ici.
      Le client est envoyé vers PayPal.Me avec le montant.
      OWNER pourra ensuite accepter la commande dans le dashboard.
    */

    const paypalAmount =
      total.toFixed(2);

    const paypalUrl =
      `https://paypal.me/SH0PNOVA/${paypalAmount}`;

    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer"
    );

    closeAll();

    showToast(
      "Commande créée : paiement à effectuer sur PayPal"
    );

    /*
      On ne vide volontairement PAS le panier ici.
      La commande existe et reste en attente.
    */

  }catch(error){

    console.error(error);

    showToast("Impossible de créer la commande");

  }

});

/* =========================================================
   ORDERS CLIENT
========================================================= */

$("ordersBtn").addEventListener("click",openOrders);

window.openOrders = async function(){

  if(!currentUser){

    renderAccount();

    openModal("accountModal");

    showToast("Connecte-toi pour voir tes commandes");

    return;
  }

  openModal("ordersModal");

  $("ordersContent").innerHTML = `
    <div class="empty">
      Chargement des commandes...
    </div>
  `;

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const orders = snapshot.docs
      .map(d=>({
        id:d.id,
        ...d.data()
      }))
      .sort((a,b)=>{

        const da =
          a.createdAt?.toMillis?.() || 0;

        const dbb =
          b.createdAt?.toMillis?.() || 0;

        return dbb-da;

      });

    renderOrders(orders);

  }catch(error){

    console.error(error);

    $("ordersContent").innerHTML = `
      <div class="empty">
        Impossible de charger les commandes.
      </div>
    `;

  }

};

function renderOrders(orders){

  if(!orders.length){

    $("ordersContent").innerHTML = `
      <div class="empty">
        📦<br><br>
        Aucune commande.
      </div>
    `;

    return;
  }

  $("ordersContent").innerHTML = orders.map(order=>{

    const info = statusInfo(order.status);

    const items = order.items || [];

    return `

      <div class="order-card">

        <div class="order-top">

          <div>

            <div class="order-id">
              ${escapeHtml(order.orderNumber || order.id)}
            </div>

            <div class="order-meta">
              ${formatDate(order.createdAt)}
            </div>

          </div>

          <div class="status">
            ${escapeHtml(info.label)}
          </div>

        </div>

        ${renderProgress(order.status)}

        <div class="order-meta">

          <strong>📍 Colis :</strong>
          ${escapeHtml(order.packageCity || "En préparation")}

          <br>

          <strong>📅 Livraison :</strong>
          ${escapeHtml(order.estimatedDelivery || "Date à définir")}

          ${
            order.trackingNumber
            ? `
              <br>
              <strong>🔢 Suivi :</strong>
              ${escapeHtml(order.trackingNumber)}
            `
            : ""
          }

          <br>

          <strong>💳 Paiement :</strong>
          ${escapeHtml(order.paymentMethod || "")}

          ${
            order.paymentStatus==="pending"
            ? `
              <br>
              <span style="color:#ffc857">
                ⏳ Paiement / commande en attente de validation OWNER
              </span>
            `
            : ""
          }

        </div>

        <div class="order-products">

          ${items.map(item=>`

            <div class="order-product">

              <span>
                ${escapeHtml(item.name)}
                × ${item.quantity}
              </span>

              <strong>
                ${money(item.price*item.quantity)}
              </strong>

            </div>

          `).join("")}

        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          margin-top:14px;
          padding-top:12px;
          border-top:1px solid var(--line);
        ">

          <strong>Total</strong>

          <strong>
            ${money(order.total)}
          </strong>

        </div>

        <div class="order-actions">

          <button
            class="small-btn primary"
            onclick="printInvoice('${order.id}')"
          >
            🧾 Imprimer la facture
          </button>

        </div>

      </div>

    `;

  }).join("");
}

function renderProgress(status){

  const current =
    statusInfo(status).index;

  const steps = [
    ["accepted","Acceptée","✓"],
    ["preparing","Préparée","📦"],
    ["transit","Transit","🚚"],
    ["nearby","Proche","📍"],
    ["delivered","Livrée","✓"]
  ];

  return `

    <div class="progress">

      ${steps.map((step,index)=>{

        const active =
          current > index+1;

        const currentStep =
          current === index+1;

        return `

          <div class="
            progress-step
            ${active?"done":""}
            ${currentStep?"current":""}
          ">

            <div class="progress-dot">
              ${step[2]}
            </div>

            <div class="progress-label">
              ${step[1]}
            </div>

          </div>

        `;

      }).join("")}

    </div>

  `;
}

/* =========================================================
   INVOICE
========================================================= */

window.printInvoice = async function(orderId){

  if(!currentUser) return;

  try{

    const q = query(
      collection(db,"orders"),
      where("userId","==",currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const docSnap =
      snapshot.docs.find(d=>d.id===orderId);

    if(!docSnap){

      showToast("Facture introuvable");

      return;
    }

    const order = {
      id:docSnap.id,
      ...docSnap.data()
    };

    createInvoicePrint(order);

  }catch(error){

    console.error(error);

    showToast("Impossible de générer la facture");

  }

};

function createInvoicePrint(order){

  const items = order.items || [];

  const itemRows = items.map(item=>`

    <tr>

      <td>${escapeHtml(item.name)}</td>

      <td>${item.quantity}</td>

      <td>${money(item.price)}</td>

      <td>${money(item.price*item.quantity)}</td>

    </tr>

  `).join("");

  const address = order.address || {};

  const printWindow =
    window.open("","_blank","width=900,height=700");

  if(!printWindow){

    showToast("La fenêtre d'impression a été bloquée");

    return;
  }

  printWindow.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

      <title>Facture ${escapeHtml(order.orderNumber)}</title>

      <style>

        body{
          font-family:Arial,sans-serif;
          margin:40px;
          color:#111;
        }

        .top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          border-bottom:2px solid #111;
          padding-bottom:20px;
        }

        h1{
          margin:0;
          font-size:30px;
        }

        .muted{
          color:#666;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:30px;
          margin:30px 0;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:30px;
        }

        th,td{
          border-bottom:1px solid #ddd;
          padding:12px 8px;
          text-align:left;
        }

        .total{
          margin-left:auto;
          width:300px;
          margin-top:25px;
        }

        .row{
          display:flex;
          justify-content:space-between;
          padding:7px 0;
        }

        .grand{
          font-size:22px;
          font-weight:900;
          border-top:2px solid #111;
          margin-top:8px;
          padding-top:12px;
        }

        @media print{
          body{margin:20px}
        }

      </style>

    </head>

    <body>

      <div class="top">

        <div>

          <h1>NOVASHOP</h1>

          <p class="muted">
            Facture client
          </p>

        </div>

        <div>

          <strong>
            ${escapeHtml(order.orderNumber || "")}
          </strong>

          <br>

          ${formatDate(order.createdAt)}

        </div>

      </div>

      <div class="grid">

        <div>

          <strong>Client</strong>

          <p>
            ${escapeHtml(address.fullName || "")}<br>
            ${escapeHtml(address.address || "")}<br>
            ${escapeHtml(address.postalCode || "")}
            ${escapeHtml(address.city || "")}
          </p>

        </div>

        <div>

          <strong>Paiement</strong>

          <p>
            Méthode :
            ${escapeHtml(order.paymentMethod || "")}
            <br>
            Statut :
            ${escapeHtml(order.paymentStatus || "")}
          </p>

        </div>

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

          ${itemRows}

        </tbody>

      </table>

      <div class="total">

        <div class="row">
          <span>Sous-total</span>
          <strong>${money(order.subtotal)}</strong>
        </div>

        <div class="row">
          <span>Réduction</span>
          <strong>-${money(order.discount || 0)}</strong>
        </div>

        <div class="row grand">
          <span>Total</span>
          <strong>${money(order.total)}</strong>
        </div>

      </div>

      <p class="muted" style="margin-top:50px">
        Merci pour votre commande chez NovaShop.
      </p>

      <script>
        window.onload=()=>{
          window.print();
        };
      <\/script>

    </body>

    </html>

  `);

  printWindow.document.close();
}

/* =========================================================
   SETTINGS
========================================================= */

$("settingsBtn").addEventListener("click",()=>{

  loadSettings();

  openModal("settingsModal");

});

function loadSettings(){

  $("themeSelect").value =
    localStorage.getItem("novaTheme") || "dark";

  $("languageSelect").value =
    localStorage.getItem("novaLanguage") || "fr";

  $("animationSelect").value =
    localStorage.getItem("novaAnimations") || "on";
}

$("themeSelect").addEventListener("change",e=>{

  const value = e.target.value;

  localStorage.setItem("novaTheme",value);

  applyTheme();

});

$("languageSelect").addEventListener("change",e=>{

  localStorage.setItem(
    "novaLanguage",
    e.target.value
  );

  showToast(
    e.target.value==="fr"
      ? "Langue française sélectionnée"
      : "English selected"
  );

});

$("animationSelect").addEventListener("change",e=>{

  localStorage.setItem(
    "novaAnimations",
    e.target.value
  );

  if(e.target.value==="off"){

    document.documentElement.style.setProperty(
      "scroll-behavior",
      "auto"
    );

  }else{

    document.documentElement.style.setProperty(
      "scroll-behavior",
      "smooth"
    );

  }

});

function applyTheme(){

  const theme =
    localStorage.getItem("novaTheme") || "dark";

  if(theme==="light"){

    document.body.classList.add("light");

  }else if(theme==="dark"){

    document.body.classList.remove("light");

  }else{

    const light =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    document.body.classList.toggle("light",light);

  }

}

/* =========================================================
   ADMIN ACCESS
========================================================= */

$("adminBtn").addEventListener("click",()=>{

  if(!currentUser){

    showToast("Connexion OWNER requise");

    return;
  }

  const email =
    currentUser.email?.trim().toLowerCase();

  if(email!==ADMIN_EMAIL.toLowerCase()){

    showToast("Accès refusé");

    return;
  }

  const authorized =
    localStorage.getItem(ADMIN_ACCESS_KEY)==="true";

  if(!authorized){

    const code =
      prompt("Code OWNER NovaShop :");

    if(code!==ADMIN_CODE){

      showToast("Code OWNER incorrect");

      return;
    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }

  openAdmin();

});

function openAdmin(){

  $("ordersTab").classList.add("active");
  $("productsTab").classList.remove("active");

  loadAdminOrders();

  openModal("adminModal");

}

$("ordersTab").addEventListener("click",()=>{

  $("ordersTab").classList.add("active");
  $("productsTab").classList.remove("active");

  loadAdminOrders();

});

$("productsTab").addEventListener("click",()=>{

  $("productsTab").classList.add("active");
  $("ordersTab").classList.remove("active");

  renderAdminProducts();

});

/* =========================================================
   ADMIN ORDERS
========================================================= */

async function loadAdminOrders(){

  if(!currentUser) return;

  $("adminContent").innerHTML = `
    <div class="empty">
      Chargement...
    </div>
  `;

  try{

    const snapshot =
      await getDocs(collection(db,"orders"));

    adminOrdersCache =
      snapshot.docs
        .map(d=>({
          id:d.id,
          ...d.data()
        }))
        .sort((a,b)=>{

          const da =
            a.createdAt?.toMillis?.() || 0;

          const dbb =
            b.createdAt?.toMillis?.() || 0;

          return dbb-da;

        });

    renderAdminOrders();

  }catch(error){

    console.error(error);

    $("adminContent").innerHTML = `
      <div class="empty">
        Impossible de charger les commandes OWNER.
      </div>
    `;

  }

}

function renderAdminOrders(){

  if(!adminOrdersCache.length){

    $("adminContent").innerHTML = `
      <div class="empty">
        📦<br><br>
        Aucune commande.
      </div>
    `;

    return;
  }

  $("adminContent").innerHTML =
    adminOrdersCache.map(order=>{

      const status =
        normalizeStatus(order.status);

      const info =
        statusInfo(status);

      const address =
        order.address || {};

      return `

        <div class="admin-order">

          <div class="admin-order-head">

            <div>

              <div class="admin-order-title">
                ${escapeHtml(order.orderNumber || order.id)}
              </div>

              <div class="admin-payment">
                ${escapeHtml(order.email || "")}
              </div>

            </div>

            <div class="status">
              ${escapeHtml(info.label)}
            </div>

          </div>

          <div class="admin-payment">

            📅 ${formatDate(order.createdAt)}
            · 💰 ${money(order.total)}
            · 💳 ${escapeHtml(order.paymentMethod || "")}

            ${
              order.paymentStatus==="pending"
              ? `
                <br>
                <strong style="color:#ffc857">
                  ⏳ Paiement en attente
                </strong>
              `
              : `
                <br>
                Statut paiement :
                ${escapeHtml(order.paymentStatus || "")}
              `
            }

          </div>

          <div class="admin-payment" style="margin-top:10px">

            👤
            ${escapeHtml(address.fullName || "Client")}

            <br>

            📍
            ${escapeHtml(address.address || "")},
            ${escapeHtml(address.postalCode || "")}
            ${escapeHtml(address.city || "")}

          </div>

          <div class="admin-grid">

            <div class="field">

              <label>Statut</label>

              <select id="status-${order.id}">

                <option value="pending" ${status==="pending"?"selected":""}>
                  En attente
                </option>

                <option value="accepted" ${status==="accepted"?"selected":""}>
                  Commande acceptée
                </option>

                <option value="preparing" ${status==="preparing"?"selected":""}>
                  Colis préparé
                </option>

                <option value="transit" ${status==="transit"?"selected":""}>
                  En transit
                </option>

                <option value="nearby" ${status==="nearby"?"selected":""}>
                  Livraison proche
                </option>

                <option value="delivered" ${status==="delivered"?"selected":""}>
                  Livrée
                </option>

              </select>

            </div>

            <div class="field">

              <label>Ville du colis</label>

              <input
                id="city-${order.id}"
                value="${escapeHtml(order.packageCity || "")}"
                placeholder="Paris..."
              >

            </div>

            <div class="field">

              <label>Livraison prévue</label>

              <input
                id="delivery-${order.id}"
                value="${escapeHtml(order.estimatedDelivery || "")}"
                placeholder="Ex : 25 septembre 2026"
              >

            </div>

            <div class="field">

              <label>Numéro de suivi</label>

              <input
                id="tracking-${order.id}"
                value="${escapeHtml(order.trackingNumber || "")}"
                placeholder="NOVA123456"
              >

            </div>

            <div class="field">

              <label>Durée avant livraison</label>

              <input
                id="duration-${order.id}"
                value="${escapeHtml(order.deliveryDuration || "")}"
                placeholder="Ex : 2 jours"
              >

            </div>

          </div>

          <div class="admin-buttons">

            ${
              order.paymentMethod==="PayPal.Me" &&
              order.paymentStatus==="pending"
              ? `
                <button
                  class="small-btn primary"
                  onclick="acceptPaypalOrder('${order.id}')"
                >
                  ✅ Accepter le paiement
                </button>
              `
              : ""
            }

            <button
              class="small-btn primary"
              onclick="saveAdminOrder('${order.id}')"
            >
              💾 Enregistrer
            </button>

            <button
              class="small-btn"
              onclick="printAdminInvoice('${order.id}')"
            >
              🧾 Facture
            </button>

            ${
              order.paymentMethod==="Promo" &&
              order.promoCode==="NOVA100"
              ? `
                <span class="status">
                  🎟️ NOVA100 · Acceptée
                </span>
              `
              : ""
            }

          </div>

        </div>

      `;

    }).join("");

}

window.acceptPaypalOrder = async function(orderId){

  if(!checkAdmin()) return;

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"accepted",
        status:"accepted",
        updatedAt:serverTimestamp()
      }
    );

    showToast("Commande PayPal acceptée");

    await loadAdminOrders();

  }catch(error){

    console.error(error);

    showToast("Impossible d'accepter la commande");

  }

};

window.saveAdminOrder = async function(orderId){

  if(!checkAdmin()) return;

  const status =
    $(`status-${orderId}`).value;

  const packageCity =
    $(`city-${orderId}`).value.trim();

  const estimatedDelivery =
    $(`delivery-${orderId}`).value.trim();

  const trackingNumber =
    $(`tracking-${orderId}`).value.trim();

  const deliveryDuration =
    $(`duration-${orderId}`).value.trim();

  try{

    const data = {

      status,

      packageCity,

      estimatedDelivery,

      trackingNumber,

      deliveryDuration,

      updatedAt:serverTimestamp()

    };

    /*
      Si OWNER passe directement une commande
      à "acceptée", le paiement PayPal est considéré
      comme validé manuellement.
    */

    if(status==="accepted"){

      data.paymentStatus = "accepted";

    }

    if(status==="delivered"){

      data.paymentStatus =
        data.paymentStatus || "accepted";

    }

    await updateDoc(
      doc(db,"orders",orderId),
      data
    );

    showToast("Commande mise à jour");

    await loadAdminOrders();

  }catch(error){

    console.error(error);

    showToast("Impossible d'enregistrer");

  }

};

function checkAdmin(){

  if(!currentUser) return false;

  const email =
    currentUser.email?.trim().toLowerCase();

  if(email!==ADMIN_EMAIL.toLowerCase()){

    showToast("Accès OWNER refusé");

    return false;
  }

  if(
    localStorage.getItem(ADMIN_ACCESS_KEY)!=="true"
  ){

    showToast("Autorisation OWNER requise");

    return false;
  }

  return true;
}

/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function renderAdminProducts(){

  $("adminContent").innerHTML = `

    <div style="
      margin-bottom:15px;
      color:var(--muted);
      font-size:13px;
    ">
      ${products.length} produits dans le catalogue NovaShop.
    </div>

    ${products.map(product=>`

      <div class="admin-order">

        <div class="admin-order-head">

          <div>

            <div class="admin-order-title">
              ${escapeHtml(product.name)}
            </div>

            <div class="admin-payment">
              ${escapeHtml(product.category)}
            </div>

          </div>

          <strong>
            ${money(product.price)}
          </strong>

        </div>

      </div>

    `).join("")}

  `;

}

/* =========================================================
   ADMIN INVOICE
========================================================= */

window.printAdminInvoice = function(orderId){

  const order =
    adminOrdersCache.find(o=>o.id===orderId);

  if(!order){

    showToast("Commande introuvable");

    return;
  }

  createInvoicePrint(order);

};

/* =========================================================
   INIT
========================================================= */

function init(){

  applyTheme();

  renderCategories();

  renderProducts();

  renderCart();

  updateCartBadge();

}

init();
