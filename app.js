import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
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
const provider = new GoogleAuthProvider();


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


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
 name:"iiyama 23.8 G-Master GB2471HS-B1 Red Eagle",
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
 name:"Logitech PRO X TKL Rapid Noir AZERTY",
 category:"Claviers",
 price:78.99,
 image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
},

{
 id:"p31",
 name:"QwertyKey75 HE Striker Hall Effect Rapid Trigger",
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
 name:"ATTACK SHARK R11 Ultra 8000Hz 49g 42000 DPI",
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
 name:"Lampe de plafond hexagone LED 2.4m x 4.8m",
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
 name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB",
 category:"Cartes graphiques",
 price:140,
 image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
},

{
 id:"p43",
 name:"PC Gamer Fixe Ryzen 7 5700G Vega 8 16G DDR4 1T SSD",
 category:"PC Gamer",
 price:650,
 image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg"
}

];


/* =========================================================
   STATE
========================================================= */

let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

let currentUser = null;

let currentCategory = "Tous";

let currentSearch = "";

let currentSort = "default";

let checkoutData = {
  promo:"",
  discount:0
};


/* =========================================================
   DOM
========================================================= */

const productGrid = document.getElementById("productGrid");
const categories = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const productCount = document.getElementById("productCount");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

const toastEl = document.getElementById("toast");

const adminBtn = document.getElementById("adminBtn");
const settingsBtn = document.getElementById("settingsBtn");
const ordersBtn = document.getElementById("ordersBtn");
const accountBtn = document.getElementById("accountBtn");


/* =========================================================
   HELPERS
========================================================= */

function money(value){
  return Number(value || 0).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function saveCart(){
  localStorage.setItem("novaCart",JSON.stringify(cart));
}

function toast(message){
  toastEl.textContent = message;
  toastEl.classList.add("show");

  clearTimeout(toast._timer);

  toast._timer = setTimeout(()=>{
    toastEl.classList.remove("show");
  },2200);
}

function escapeHTML(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getProduct(id){
  return products.find(p=>p.id===id);
}

function cartSubtotal(){
  return cart.reduce((total,item)=>{
    const product = getProduct(item.id);
    if(!product) return total;

    return total + product.price * item.qty;
  },0);
}


/* =========================================================
   REVIEWS
========================================================= */

function reviewData(product){

  const number = parseInt(product.id.replace("p",""),10);

  const count = 132 + ((number * 173) % 1604);

  const rating = 4.4 + ((number % 6) * 0.1);

  return {
    count,
    rating:Math.min(4.9,rating)
  };
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const list = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  categories.innerHTML = list.map(cat=>`
    <button
      class="cat ${cat===currentCategory ? "active":""}"
      data-category="${escapeHTML(cat)}"
    >
      ${escapeHTML(cat)}
    </button>
  `).join("");

  categories.querySelectorAll(".cat").forEach(btn=>{
    btn.addEventListener("click",()=>{
      currentCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}


/* =========================================================
   PRODUCTS
========================================================= */

function getVisibleProducts(){

  let list = [...products];

  if(currentCategory !== "Tous"){
    list = list.filter(p=>p.category===currentCategory);
  }

  if(currentSearch.trim()){
    const q = currentSearch.toLowerCase();

    list = list.filter(p=>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if(currentSort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(currentSort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(currentSort==="name"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  return list;
}


function renderProducts(){

  const list = getVisibleProducts();

  productCount.textContent =
    `${list.length} produit${list.length>1 ? "s":""}`;

  if(!list.length){

    productGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:60px 20px;
        text-align:center;
        color:#8f9bad;
      ">
        Aucun produit trouvé.
      </div>
    `;

    return;
  }

  productGrid.innerHTML = list.map(product=>{

    const review = reviewData(product);

    return `
      <article class="product">

        <div class="product-image">
          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
          >
        </div>

        <div class="product-body">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <div class="product-title">
            ${escapeHTML(product.name)}
          </div>

          <div class="rating">
            ★★★★★
            <span>${review.rating.toFixed(1)} · ${review.count.toLocaleString("fr-FR")} avis</span>
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="product-actions">

            <button
              class="btn-small"
              data-view="${product.id}"
            >
              Voir
            </button>

            <button
              class="btn-small primary"
              data-add="${product.id}"
            >
              🛒 Ajouter
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");

  productGrid.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      addToCart(btn.dataset.add);
    });
  });

  productGrid.querySelectorAll("[data-view]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      openProduct(btn.dataset.view);
    });
  });
}


/* =========================================================
   CART
========================================================= */

function addToCart(id){

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
  renderCart();

  toast("Produit ajouté au panier 🛒");

  cartBtn.animate(
    [
      {transform:"scale(1)"},
      {transform:"scale(1.12)"},
      {transform:"scale(1)"}
    ],
    {
      duration:300
    }
  );
}


function changeQty(id,delta){

  const item = cart.find(x=>x.id===id);

  if(!item) return;

  item.qty += delta;

  if(item.qty<=0){
    cart = cart.filter(x=>x.id!==id);
  }

  saveCart();
  renderCart();
}


function renderCart(){

  const count = cart.reduce((sum,item)=>sum+item.qty,0);

  cartBadge.textContent = count;

  const subtotal = cartSubtotal();

  cartTotal.textContent = money(subtotal);

  if(!cart.length){

    cartItems.innerHTML = `
      <div style="
        padding:60px 20px;
        text-align:center;
        color:#8592a5;
      ">
        <div style="font-size:40px;margin-bottom:15px">🛒</div>
        Ton panier est vide.
      </div>
    `;

    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = ".5";

    return;
  }

  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";

  cartItems.innerHTML = cart.map(item=>{

    const p = getProduct(item.id);

    if(!p) return "";

    return `
      <div class="cart-item">

        <img
          src="${p.image}"
          alt="${escapeHTML(p.name)}"
        >

        <div>
          <h4>${escapeHTML(p.name)}</h4>
          <p>${money(p.price)}</p>

          <div class="qty">

            <button data-minus="${p.id}">
              −
            </button>

            <strong>${item.qty}</strong>

            <button data-plus="${p.id}">
              +
            </button>

          </div>
        </div>

        <strong>
          ${money(p.price * item.qty)}
        </strong>

      </div>
    `;

  }).join("");

  cartItems.querySelectorAll("[data-minus]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      changeQty(btn.dataset.minus,-1);
    });
  });

  cartItems.querySelectorAll("[data-plus]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      changeQty(btn.dataset.plus,1);
    });
  });
}


function openCart(){

  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");

}

function closeCartDrawer(){

  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(id){

  const p = getProduct(id);

  if(!p) return;

  const review = reviewData(p);

  modalTitle.textContent = p.name;

  modalContent.innerHTML = `

    <div class="product-detail">

      <img
        src="${p.image}"
        alt="${escapeHTML(p.name)}"
      >

      <div>

        <div class="product-category">
          ${escapeHTML(p.category)}
        </div>

        <h2 style="margin-top:7px;line-height:1.25">
          ${escapeHTML(p.name)}
        </h2>

        <div class="rating" style="margin-top:12px">
          ★★★★★
          <span>
            ${review.rating.toFixed(1)} ·
            ${review.count.toLocaleString("fr-FR")} avis
          </span>
        </div>

        <div class="detail-price">
          ${money(p.price)}
        </div>

        <button
          class="btn btn-primary"
          id="modalAdd"
          style="width:100%"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

    <div style="margin-top:25px">

      <h3 style="margin-bottom:10px">
        Avis clients
      </h3>

      <div class="review">
        <strong>★★★★★ Client vérifié</strong>
        <p>Produit conforme et commande reçue correctement.</p>
      </div>

      <div class="review">
        <strong>★★★★☆ Client vérifié</strong>
        <p>Bon rapport qualité/prix.</p>
      </div>

      <div class="review">
        <strong>★★★★★ Client vérifié</strong>
        <p>Très satisfait de mon achat.</p>
      </div>

    </div>
  `;

  modalBackdrop.classList.add("show");

  document.getElementById("modalAdd").addEventListener("click",()=>{
    addToCart(id);
    closeModal();
  });
}


function closeModal(){
  modalBackdrop.classList.remove("show");
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

    adminBtn.style.display="grid";

    console.log(
      "👑 NovaShop Admin détecté :",
      user.email
    );

  }else{

    adminBtn.style.display="none";

  }

});


async function login(){

  try{

    await signInWithPopup(auth,provider);

    toast("Connexion réussie 👤");

  }catch(error){

    console.error(error);

    toast("Connexion impossible.");

  }

}


async function logout(){

  try{

    await signOut(auth);

    localStorage.removeItem(ADMIN_ACCESS_KEY);

    toast("Déconnexion effectuée.");

  }catch(error){

    console.error(error);

  }

}


/* =========================================================
   ACCOUNT
========================================================= */

accountBtn.addEventListener("click",()=>{

  if(currentUser){

    modalTitle.textContent="Mon compte";

    modalContent.innerHTML=`

      <div style="text-align:center;padding:15px">

        <div style="font-size:45px">👤</div>

        <h2 style="margin-top:10px">
          ${escapeHTML(currentUser.displayName || "Compte NovaShop")}
        </h2>

        <p style="
          color:#8996a8;
          margin:8px 0 22px;
        ">
          ${escapeHTML(currentUser.email || "")}
        </p>

        <button
          class="btn btn-danger"
          id="logoutBtn"
          style="width:100%"
        >
          Se déconnecter
        </button>

      </div>

    `;

    modalBackdrop.classList.add("show");

    document.getElementById("logoutBtn")
      .addEventListener("click",async()=>{
        await logout();
        closeModal();
      });

  }else{

    modalTitle.textContent="Connexion";

    modalContent.innerHTML=`

      <div style="text-align:center;padding:20px">

        <div style="font-size:45px">👤</div>

        <h2 style="margin:12px 0">
          Connecte-toi à NovaShop
        </h2>

        <p style="
          color:#8996a8;
          line-height:1.6;
          margin-bottom:20px;
        ">
          Connecte-toi pour passer des commandes
          et retrouver ton historique.
        </p>

        <button
          class="btn btn-primary"
          id="loginBtn"
          style="width:100%"
        >
          Continuer avec Google
        </button>

      </div>

    `;

    modalBackdrop.classList.add("show");

    document.getElementById("loginBtn")
      .addEventListener("click",login);

  }

});


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!cart.length){
    toast("Ton panier est vide.");
    return;
  }

  if(!currentUser){

    modalTitle.textContent="Connexion requise";

    modalContent.innerHTML=`

      <div style="text-align:center;padding:25px">

        <div style="font-size:45px">🔐</div>

        <h2 style="margin:12px 0">
          Connecte-toi pour commander
        </h2>

        <p style="
          color:#8e9bad;
          margin-bottom:20px;
        ">
          Ton compte permet d'associer la commande
          à ton historique NovaShop.
        </p>

        <button
          class="btn btn-primary"
          id="checkoutLogin"
          style="width:100%"
        >
          Se connecter avec Google
        </button>

      </div>

    `;

    modalBackdrop.classList.add("show");

    document.getElementById("checkoutLogin")
      .addEventListener("click",login);

    return;
  }

  checkoutData={
    promo:"",
    discount:0
  };

  modalTitle.textContent="Finaliser la commande";

  modalContent.innerHTML=`

    <form id="checkoutForm">

      <div class="form-grid">

        <div class="field full">
          <label>Nom complet</label>
          <input
            id="fullName"
            required
            placeholder="Prénom Nom"
          >
        </div>

        <div class="field full">
          <label>Adresse</label>
          <input
            id="address"
            required
            placeholder="Numéro et rue"
          >
        </div>

        <div class="field">
          <label>Code postal</label>
          <input
            id="postalCode"
            required
            inputmode="numeric"
            placeholder="59000"
          >
        </div>

        <div class="field">
          <label>Ville</label>
          <input
            id="city"
            required
            placeholder="Lille"
          >
        </div>

        <div class="field full">
          <label>Téléphone</label>
          <input
            id="phone"
            placeholder="Optionnel"
          >
        </div>

      </div>

      <div class="field">

        <label>Code promo</label>

        <div class="promo-row">

          <input
            id="promoCode"
            placeholder="Code promo"
            autocomplete="off"
          >

          <button
            type="button"
            class="btn"
            id="applyPromo"
          >
            Appliquer
          </button>

        </div>

        <div class="status" id="promoStatus"></div>

      </div>

      <div class="checkout-summary">

        <div class="summary-row">
          <span>Sous-total</span>
          <strong id="checkoutSubtotal">0,00 €</strong>
        </div>

        <div class="summary-row">
          <span>Réduction</span>
          <strong class="discount" id="checkoutDiscount">
            - 0,00 €
          </strong>
        </div>

        <div class="summary-row total">
          <span>Total</span>
          <strong id="checkoutTotal">0,00 €</strong>
        </div>

      </div>

      <div id="paymentArea" class="paypal-box"></div>

    </form>

  `;

  modalBackdrop.classList.add("show");

  renderCheckoutTotal();

  document
    .getElementById("applyPromo")
    .addEventListener("click",applyPromo);

  document
    .getElementById("promoCode")
    .addEventListener("keydown",event=>{
      if(event.key==="Enter"){
        event.preventDefault();
        applyPromo();
      }
    });

}


function renderCheckoutTotal(){

  const subtotal = cartSubtotal();

  const discount =
    checkoutData.discount;

  const total =
    Math.max(0,subtotal-discount);

  const subtotalEl =
    document.getElementById("checkoutSubtotal");

  const discountEl =
    document.getElementById("checkoutDiscount");

  const totalEl =
    document.getElementById("checkoutTotal");

  const paymentArea =
    document.getElementById("paymentArea");

  if(!subtotalEl) return;

  subtotalEl.textContent=money(subtotal);

  discountEl.textContent=
    `- ${money(discount)}`;

  totalEl.textContent=
    money(total);

  /*
    NOVA100 = 100% de réduction
    Le bouton PayPal disparaît.
  */

  if(checkoutData.promo==="NOVA100"){

    paymentArea.innerHTML=`

      <div class="free-box">
        🎉 Code <strong>NOVA100</strong> appliqué.
        Ta commande revient à <strong>0 €</strong>.
      </div>

      <button
        type="button"
        class="btn btn-success"
        id="freeOrderBtn"
        style="width:100%;margin-top:10px"
      >
        Valider la commande à 0 €
      </button>

    `;

    document
      .getElementById("freeOrderBtn")
      .addEventListener("click",()=>{
        submitFreeOrder();
      });

  }else{

    /*
      IMPORTANT :
      le montant est toujours recalculé depuis
      le total réel du panier.
    */

    const paypalAmount =
      total.toFixed(2);

    const paypalUrl =
      `https://paypal.me/SH0PNOVA/${paypalAmount}`;

    paymentArea.innerHTML=`

      <button
        type="button"
        class="paypal-btn"
        id="paypalBtn"
      >
        💳 Payer ${money(total)} avec PayPal
      </button>

      <div class="status">
        Le lien PayPal correspond au total actuel de la commande.
      </div>

    `;

    document
      .getElementById("paypalBtn")
      .addEventListener("click",()=>{
        submitPayPalOrder(total,paypalUrl);
      });

  }

}


function applyPromo(){

  const input =
    document.getElementById("promoCode");

  const status =
    document.getElementById("promoStatus");

  if(!input || !status) return;

  const code =
    input.value.trim().toUpperCase();

  /*
    LE SEUL CODE GRATUIT
  */

  if(code==="NOVA100"){

    checkoutData.promo="NOVA100";

    checkoutData.discount=
      cartSubtotal();

    status.textContent=
      "Code accepté : réduction de 100 %.";

    status.className=
      "status ok";

    renderCheckoutTotal();

  }else{

    checkoutData.promo="";

    checkoutData.discount=0;

    status.textContent=
      code
        ? "Code promo invalide."
        : "Aucun code promo.";

    status.className=
      code
        ? "status error"
        : "status";

    renderCheckoutTotal();

  }

}


/* =========================================================
   ORDER CREATION
========================================================= */

function getCheckoutAddress(){

  return {

    fullName:
      document.getElementById("fullName")?.value.trim() || "",

    address:
      document.getElementById("address")?.value.trim() || "",

    postalCode:
      document.getElementById("postalCode")?.value.trim() || "",

    city:
      document.getElementById("city")?.value.trim() || "",

    phone:
      document.getElementById("phone")?.value.trim() || ""

  };

}


function validateAddress(){

  const address =
    getCheckoutAddress();

  if(
    !address.fullName ||
    !address.address ||
    !address.postalCode ||
    !address.city
  ){

    toast("Complète ton adresse de livraison.");

    return null;
  }

  return address;

}


async function createOrder({
  address,
  total,
  paymentMethod,
  paymentStatus,
  promoCode=""
}){

  const items =
    cart.map(item=>{

      const p=getProduct(item.id);

      return {
        productId:p.id,
        name:p.name,
        price:p.price,
        quantity:item.qty,
        image:p.image
      };

    });

  const order={

    userId:currentUser.uid,

    email:currentUser.email || "",

    customer:address,

    items,

    subtotal:cartSubtotal(),

    discount:
      checkoutData.discount,

    total,

    promoCode,

    paymentMethod,

    paymentStatus,

    createdAt:serverTimestamp()

  };

  const ref =
    await addDoc(
      collection(db,"orders"),
      order
    );

  return ref.id;

}


/* =========================================================
   PAYPAL
========================================================= */

async function submitPayPalOrder(total,paypalUrl){

  const address =
    validateAddress();

  if(!address) return;

  if(total<=0){
    return;
  }

  const btn =
    document.getElementById("paypalBtn");

  if(btn){

    btn.disabled=true;
    btn.textContent="Préparation...";

  }

  try{

    /*
      La commande reste PENDING.
      On ne prétend pas que PayPal a confirmé
      le paiement simplement parce que le lien
      a été ouvert.
    */

    const orderId =
      await createOrder({

        address,

        total,

        paymentMethod:"PayPal.Me",

        paymentStatus:"pending",

        promoCode:checkoutData.promo

      });

    /*
      Le montant est celui du TOTAL.
      Exemple :
      49.99 € -> paypal.me/SH0PNOVA/49.99
    */

    const url =
      `${paypalUrl}`;

    toast("Ouverture de PayPal...");

    window.open(url,"_blank","noopener,noreferrer");

    setTimeout(()=>{

      closeModal();
      closeCartDrawer();

      toast(
        `Commande ${orderId.slice(0,8)} créée.`
      );

    },700);

  }catch(error){

    console.error(error);

    toast(
      "Impossible de créer la commande."
    );

    if(btn){

      btn.disabled=false;
      btn.textContent=
        `💳 Payer ${money(total)} avec PayPal`;

    }

  }

}


/* =========================================================
   FREE ORDER
========================================================= */

async function submitFreeOrder(){

  const address =
    validateAddress();

  if(!address) return;

  if(checkoutData.promo!=="NOVA100"){
    toast("Code promo invalide.");
    return;
  }

  try{

    const orderId =
      await createOrder({

        address,

        total:0,

        paymentMethod:"Promo",

        paymentStatus:"free",

        promoCode:"NOVA100"

      });

    cart=[];

    saveCart();

    renderCart();

    closeModal();

    closeCartDrawer();

    toast(
      `Commande ${orderId.slice(0,8)} validée 🎉`
    );

  }catch(error){

    console.error(error);

    toast(
      "Impossible de créer la commande."
    );

  }

}


/* =========================================================
   ORDERS
========================================================= */

async function showOrders(){

  if(!currentUser){

    modalTitle.textContent="Mes commandes";

    modalContent.innerHTML=`

      <div style="text-align:center;padding:25px">

        <div style="font-size:45px">📦</div>

        <h2 style="margin:12px 0">
          Connecte-toi
        </h2>

        <p style="color:#8996a8">
          Tu dois être connecté pour voir tes commandes.
        </p>

      </div>

    `;

    modalBackdrop.classList.add("show");

    return;
  }

  modalTitle.textContent="Mes commandes";

  modalContent.innerHTML=`

    <div style="text-align:center;padding:25px">
      Chargement des commandes...
    </div>

  `;

  modalBackdrop.classList.add("show");

  try{

    /*
      Pas de orderBy ici :
      cela évite de demander un index composite
      userId + createdAt à Firebase.
    */

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

    let orders =
      snapshot.docs.map(d=>({
        id:d.id,
        ...d.data()
      }));

    orders.sort((a,b)=>{

      const ta =
        a.createdAt?.seconds || 0;

      const tb =
        b.createdAt?.seconds || 0;

      return tb-ta;

    });

    if(!orders.length){

      modalContent.innerHTML=`

        <div style="
          text-align:center;
          padding:35px;
          color:#8d99aa;
        ">

          <div style="font-size:42px">
            📦
          </div>

          <p style="margin-top:12px">
            Aucune commande pour le moment.
          </p>

        </div>

      `;

      return;
    }

    modalContent.innerHTML =
      orders.map(order=>{

        const date =
          order.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString("fr-FR")
            : "Date en attente";

        const status =
          order.paymentStatus || "pending";

        return `

          <div style="
            border:1px solid var(--line);
            border-radius:15px;
            padding:15px;
            margin-bottom:12px;
            background:#0a121c;
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
            ">

              <strong>
                Commande #${order.id.slice(0,8)}
              </strong>

              <strong>
                ${money(order.total)}
              </strong>

            </div>

            <div style="
              color:#8290a3;
              font-size:12px;
              margin-top:7px;
            ">
              ${date}
            </div>

            <div style="
              margin-top:10px;
              font-size:12px;
              color:#9aa7b8;
            ">
              Paiement :
              ${escapeHTML(order.paymentMethod || "-")}
              <br>
              Statut :
              ${escapeHTML(status)}
            </div>

          </div>

        `;

      }).join("");

  }catch(error){

    console.error(error);

    modalContent.innerHTML=`

      <div style="
        padding:25px;
        text-align:center;
        color:#fb7185;
      ">
        Impossible de charger les commandes.
      </div>

    `;

  }

}


/* =========================================================
   ADMIN
========================================================= */

adminBtn.addEventListener("click",async()=>{

  if(!currentUser){
    toast("Connexion requise.");
    return;
  }

  if(
    currentUser.email.trim().toLowerCase()
    !==
    ADMIN_EMAIL.trim().toLowerCase()
  ){

    toast("Accès refusé.");

    return;
  }

  const alreadyAuthorized =
    localStorage.getItem(ADMIN_ACCESS_KEY)==="true";

  if(!alreadyAuthorized){

    const code =
      prompt("Code administrateur NovaShop :");

    if(code!==ADMIN_CODE){

      toast("Code administrateur incorrect.");

      return;

    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }

  openAdmin();

});


async function openAdmin(){

  modalTitle.textContent="Administration NovaShop";

  modalContent.innerHTML=`

    <div>

      <div style="
        padding:15px;
        border:1px solid #294a6d;
        background:#0c1a2a;
        border-radius:15px;
        margin-bottom:15px;
      ">

        <strong>👑 Mode administrateur</strong>

        <p style="
          color:#8e9bad;
          font-size:12px;
          margin-top:6px;
        ">
          ${escapeHTML(currentUser.email)}
        </p>

      </div>

      <div id="adminStats">
        Chargement...
      </div>

      <button
        class="btn btn-danger"
        id="deleteOrdersBtn"
        style="width:100%;margin-top:15px"
      >
        Supprimer toutes les commandes
      </button>

    </div>

  `;

  modalBackdrop.classList.add("show");

  await loadAdminStats();

  document
    .getElementById("deleteOrdersBtn")
    .addEventListener("click",deleteAllOrders);

}


async function loadAdminStats(){

  const box =
    document.getElementById("adminStats");

  if(!box) return;

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    let revenue=0;

    snapshot.forEach(docSnap=>{

      const data=docSnap.data();

      if(data.paymentStatus!=="pending"){
        revenue += Number(data.total || 0);
      }

    });

    box.innerHTML=`

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
      ">

        <div style="
          padding:18px;
          border:1px solid var(--line);
          border-radius:14px;
        ">

          <strong style="font-size:25px">
            ${snapshot.size}
          </strong>

          <div style="
            color:#8794a6;
            font-size:12px;
            margin-top:5px
          ">
            Commandes
          </div>

        </div>

        <div style="
          padding:18px;
          border:1px solid var(--line);
          border-radius:14px;
        ">

          <strong style="font-size:25px">
            ${money(revenue)}
          </strong>

          <div style="
            color:#8794a6;
            font-size:12px;
            margin-top:5px
          ">
            Total confirmé
          </div>

        </div>

      </div>

    `;

  }catch(error){

    console.error(error);

    box.textContent=
      "Impossible de charger les statistiques.";

  }

}


async function deleteAllOrders(){

  const ok =
    confirm(
      "Supprimer toutes les commandes ? Cette action est irréversible."
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

    toast("Commandes supprimées.");

    await loadAdminStats();

  }catch(error){

    console.error(error);

    toast(
      "Impossible de supprimer les commandes."
    );

  }

}


/* =========================================================
   SETTINGS
========================================================= */

function openSettings(){

  const currentTheme =
    localStorage.getItem("novaTheme") || "dark";

  const language =
    localStorage.getItem("novaLanguage") || "fr";

  modalTitle.textContent="Paramètres";

  modalContent.innerHTML=`

    <div>

      <div class="setting-row">

        <div>
          <strong>Apparence</strong>
          <span>
            Choisis l'apparence du site.
          </span>
        </div>

        <select id="themeSelect">

          <option value="dark"
            ${currentTheme==="dark"?"selected":""}>
            Sombre
          </option>

          <option value="light"
            ${currentTheme==="light"?"selected":""}>
            Clair
          </option>

          <option value="auto"
            ${currentTheme==="auto"?"selected":""}>
            Automatique
          </option>

        </select>

      </div>

      <div class="setting-row">

        <div>
          <strong>Langue</strong>
          <span>
            Langue de l'interface.
          </span>
        </div>

        <select id="languageSelect">

          <option value="fr"
            ${language==="fr"?"selected":""}>
            Français
          </option>

          <option value="en"
            ${language==="en"?"selected":""}>
            English
          </option>

        </select>

      </div>

    </div>

  `;

  modalBackdrop.classList.add("show");

  document
    .getElementById("themeSelect")
    .addEventListener("change",event=>{
      applyTheme(event.target.value);
    });

  document
    .getElementById("languageSelect")
    .addEventListener("change",event=>{
      localStorage.setItem(
        "novaLanguage",
        event.target.value
      );

      toast(
        event.target.value==="fr"
          ? "Langue française sélectionnée."
          : "English selected."
      );
    });

}


function applyTheme(theme){

  localStorage.setItem(
    "novaTheme",
    theme
  );

  if(theme==="light"){

    document.body.classList.add("light");

    return;
  }

  if(theme==="dark"){

    document.body.classList.remove("light");

    return;
  }

  const isLight =
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

  document.body.classList.toggle(
    "light",
    isLight
  );

}


/* =========================================================
   EVENTS
========================================================= */

cartBtn.addEventListener(
  "click",
  openCart
);

closeCart.addEventListener(
  "click",
  closeCartDrawer
);

drawerBackdrop.addEventListener(
  "click",
  closeCartDrawer
);

modalClose.addEventListener(
  "click",
  closeModal
);

modalBackdrop.addEventListener(
  "click",
  event=>{
    if(event.target===modalBackdrop){
      closeModal();
    }
  }
);

checkoutBtn.addEventListener(
  "click",
  openCheckout
);

settingsBtn.addEventListener(
  "click",
  openSettings
);

ordersBtn.addEventListener(
  "click",
  showOrders
);

searchInput.addEventListener(
  "input",
  event=>{
    currentSearch=event.target.value;
    renderProducts();
  }
);

sortSelect.addEventListener(
  "change",
  event=>{
    currentSort=event.target.value;
    renderProducts();
  }
);

document
  .getElementById("heroShop")
  .addEventListener("click",()=>{
    document
      .getElementById("shop")
      .scrollIntoView({
        behavior:"smooth"
      });
  });

document
  .getElementById("heroCategories")
  .addEventListener("click",()=>{
    document
      .getElementById("categories")
      .scrollIntoView({
        behavior:"smooth"
      });
  });


/* =========================================================
   INIT
========================================================= */

applyTheme(
  localStorage.getItem("novaTheme") || "dark"
);

renderCategories();
renderProducts();
renderCart();


/* =========================================================
   PAYPAL TOTAL EXAMPLE

   panier 49.99 €
   =>
   https://paypal.me/SH0PNOVA/49.99

   panier 120 €
   =>
   https://paypal.me/SH0PNOVA/120.00

   NOVA100
   =>
   total 0 €
   =>
   aucun bouton PayPal
========================================================= */
