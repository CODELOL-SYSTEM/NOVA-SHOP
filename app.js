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
 name:'iiyama 23.8" LED G-Master GB2471HS-B1 Red Eagle',
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
 name:"Lampe de plafond hexagone nid d’abeille LED",
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
let currentCategory = "Tous";
let currentProduct = null;

let cart = JSON.parse(
  localStorage.getItem("novaCart") || "[]"
);

let settings = JSON.parse(
  localStorage.getItem("novaSettings") ||
  '{"theme":"dark","language":"fr","animations":true}'
);


/* =========================================================
   DOM
========================================================= */

const productGrid =
  document.getElementById("productGrid");

const categoryFilters =
  document.getElementById("categoryFilters");

const searchInput =
  document.getElementById("searchInput");

const sortSelect =
  document.getElementById("sortSelect");

const productCounter =
  document.getElementById("productCounter");

const cartBtn =
  document.getElementById("cartBtn");

const cartBadge =
  document.getElementById("cartBadge");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const checkoutBtn =
  document.getElementById("checkoutBtn");

const modalOverlay =
  document.getElementById("modalOverlay");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const modalBody =
  document.getElementById("modalBody");

const toast =
  document.getElementById("toast");

const accountBtn =
  document.getElementById("accountBtn");

const ordersBtn =
  document.getElementById("ordersBtn");

const settingsBtn =
  document.getElementById("settingsBtn");

const adminBtn =
  document.getElementById("adminBtn");


/* =========================================================
   HELPERS
========================================================= */

function money(value){

  if(value === 0){
    return "Prix à définir";
  }

  return new Intl.NumberFormat(
    settings.language === "en" ? "en-US" : "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(value);

}


function escapeHTML(value){

  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function showToast(message){

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(
    () => toast.classList.remove("show"),
    2300
  );

}


function openModal(title,html){

  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modalOverlay.classList.add("open");

}


function closeModal(){

  modalOverlay.classList.remove("open");

}


function reviewData(product){

  const number =
    parseInt(product.id.replace("p",""),10);

  const count =
    132 + ((number * 173) % 1604);

  const rating =
    Math.min(
      4.9,
      4.4 + ((number % 6) * 0.1)
    );

  return {
    count,
    rating:Number(rating.toFixed(1))
  };

}


function starsHTML(rating){

  const rounded =
    Math.round(rating);

  let result = "";

  for(let i=1;i<=5;i++){

    result +=
      i <= rounded ? "★" : "☆";

  }

  return result;

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

  categoryFilters.innerHTML =
    categories.map(category => `
      <button
        class="category-btn ${
          category === currentCategory ? "active" : ""
        }"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>
    `).join("");

  categoryFilters
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          currentCategory =
            button.dataset.category;

          renderCategories();
          renderProducts();

        }
      );

    });

}


/* =========================================================
   PRODUCTS
========================================================= */

function getFilteredProducts(){

  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  let list =
    products.filter(product => {

      const categoryOK =
        currentCategory === "Tous" ||
        product.category === currentCategory;

      const searchOK =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      return categoryOK && searchOK;

    });

  const sort =
    sortSelect.value;

  if(sort === "priceAsc"){

    list.sort((a,b) => a.price - b.price);

  }

  if(sort === "priceDesc"){

    list.sort((a,b) => b.price - a.price);

  }

  if(sort === "rating"){

    list.sort(
      (a,b) =>
        reviewData(b).rating -
        reviewData(a).rating
    );

  }

  if(sort === "reviews"){

    list.sort(
      (a,b) =>
        reviewData(b).count -
        reviewData(a).count
    );

  }

  return list;

}


function renderProducts(){

  const list =
    getFilteredProducts();

  productCounter.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""} disponible${list.length > 1 ? "s" : ""}`;

  if(!list.length){

    productGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:60px 20px;
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

      const review =
        reviewData(product);

      return `

      <article
        class="product-card"
        data-id="${product.id}"
      >

        <div class="product-image">

          ${
            product.id === "p43"
            ? `<div class="product-tag">Nouveau</div>`
            : ""
          }

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.style.opacity='.25'"
          >

        </div>

        <div class="product-content">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <div class="product-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="rating">

            <span class="stars">
              ${starsHTML(review.rating)}
            </span>

            <strong>${review.rating}</strong>

            <span class="review-count">
              · ${review.count.toLocaleString("fr-FR")} avis
            </span>

          </div>

          <div class="price-row">

            <div class="price">
              ${money(product.price)}
            </div>

          </div>

          <div class="product-actions">

            <button
              class="btn btn-secondary btn-small"
              data-action="view"
              data-id="${product.id}"
            >
              Voir
            </button>

            <button
              class="btn btn-primary btn-small"
              data-action="add"
              data-id="${product.id}"
            >
              🛒 Ajouter
            </button>

          </div>

        </div>

      </article>

      `;

    }).join("");

}


productGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-action]");

    if(!button) return;

    const product =
      products.find(
        p => p.id === button.dataset.id
      );

    if(!product) return;

    if(button.dataset.action === "view"){

      openProduct(product);

    }

    if(button.dataset.action === "add"){

      addToCart(product,button);

    }

  }
);


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(product){

  currentProduct = product;

  const review =
    reviewData(product);

  openModal(
    "Produit",
    `

    <div class="product-modal">

      <div class="product-modal-image">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >
      </div>

      <div>

        <div class="modal-category">
          ${escapeHTML(product.category)}
        </div>

        <h2 class="modal-title">
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">

          <span class="stars">
            ${starsHTML(review.rating)}
          </span>

          <strong>${review.rating}</strong>

          <span class="review-count">
            ${review.count.toLocaleString("fr-FR")} avis
          </span>

        </div>

        <p class="modal-description">
          Produit disponible dans le catalogue NovaShop.
          Consulte les informations du vendeur avant achat.
        </p>

        <div class="modal-price">
          ${money(product.price)}
        </div>

        <button
          class="btn btn-primary"
          id="modalAddButton"
          style="width:100%"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

    <div class="review-box">

      <h3 style="font-size:15px;margin-bottom:8px">
        Avis
      </h3>

      <div class="review">
        <strong>⭐ Client vérifié</strong>
        <p>
          Produit conforme à la description.
        </p>
      </div>

      <div class="review">
        <strong>⭐ Client NovaShop</strong>
        <p>
          Bonne expérience avec ce produit.
        </p>
      </div>

      <div class="review">
        <strong>⭐ Acheteur</strong>
        <p>
          Rapport qualité/prix intéressant.
        </p>
      </div>

      <div class="demo-note">
        Le nombre d'avis affiché correspond aux données
        de démonstration de cette version du catalogue.
      </div>

    </div>

    `
  );

  setTimeout(() => {

    const button =
      document.getElementById("modalAddButton");

    if(button){

      button.onclick =
        () => addToCart(product,button);

    }

  },0);

}


/* =========================================================
   CART
========================================================= */

function addToCart(product,sourceButton=null){

  const existing =
    cart.find(item => item.id === product.id);

  if(existing){

    existing.quantity += 1;

  }else{

    cart.push({
      id:product.id,
      quantity:1
    });

  }

  saveCart();
  renderCart();

  if(sourceButton){
    animateToCart(sourceButton);
  }

  showToast("Produit ajouté au panier");

}


function getCartDetailed(){

  return cart
    .map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if(!product) return null;

      return {
        ...product,
        quantity:item.quantity
      };

    })
    .filter(Boolean);

}


function renderCart(){

  const detailed =
    getCartDetailed();

  const totalQuantity =
    detailed.reduce(
      (sum,item) =>
        sum + item.quantity,
      0
    );

  cartBadge.textContent =
    totalQuantity;

  if(!detailed.length){

    cartItems.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:35px;margin-bottom:12px">
          🛒
        </div>
        Ton panier est vide.
      </div>
    `;

    cartTotal.textContent =
      money(0);

    return;

  }

  cartItems.innerHTML =
    detailed.map(item => `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${escapeHTML(item.name)}"
        >

        <div>

          <div class="cart-item-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="cart-item-price">
            ${money(item.price)}
          </div>

          <div class="qty">

            <button
              data-cart-action="minus"
              data-id="${item.id}"
            >−</button>

            <span>${item.quantity}</span>

            <button
              data-cart-action="plus"
              data-id="${item.id}"
            >+</button>

          </div>

        </div>

        <button
          class="remove-cart"
          data-cart-action="remove"
          data-id="${item.id}"
        >
          ×
        </button>

      </div>

    `).join("");

  const total =
    detailed.reduce(
      (sum,item) =>
        sum + item.price * item.quantity,
      0
    );

  cartTotal.textContent =
    money(total);

}


cartItems.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-cart-action]");

    if(!button) return;

    const id =
      button.dataset.id;

    const item =
      cart.find(
        item => item.id === id
      );

    if(!item) return;

    if(button.dataset.cartAction === "plus"){

      item.quantity++;

    }

    if(button.dataset.cartAction === "minus"){

      item.quantity--;

      if(item.quantity <= 0){

        cart =
          cart.filter(
            x => x.id !== id
          );

      }

    }

    if(button.dataset.cartAction === "remove"){

      cart =
        cart.filter(
          x => x.id !== id
        );

    }

    saveCart();
    renderCart();

  }
);


/* =========================================================
   CART DRAWER
========================================================= */

function openCart(){

  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");

}


function closeCartDrawer(){

  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");

}


cartBtn.addEventListener(
  "click",
  openCart
);

closeCart.addEventListener(
  "click",
  closeCartDrawer
);

cartOverlay.addEventListener(
  "click",
  closeCartDrawer
);


/* =========================================================
   ADD ANIMATION
========================================================= */

function animateToCart(element){

  if(!settings.animations) return;

  const rect =
    element.getBoundingClientRect();

  const cartRect =
    cartBtn.getBoundingClientRect();

  const dot =
    document.createElement("div");

  dot.className = "fly-item";

  dot.style.left =
    `${rect.left + rect.width / 2}px`;

  dot.style.top =
    `${rect.top + rect.height / 2}px`;

  document.body.appendChild(dot);

  requestAnimationFrame(() => {

    dot.style.transform =
      `translate(
        ${cartRect.left - rect.left}px,
        ${cartRect.top - rect.top}px
      )`;

    dot.style.opacity = "0";

  });

  setTimeout(
    () => dot.remove(),
    650
  );

}


/* =========================================================
   CHECKOUT
========================================================= */

checkoutBtn.addEventListener(
  "click",
  async () => {

    if(!currentUser){

      showToast(
        "Connecte-toi pour passer commande"
      );

      openAccount();

      return;

    }

    if(!cart.length){

      showToast("Ton panier est vide");

      return;

    }

    const detailed =
      getCartDetailed();

    const total =
      detailed.reduce(
        (sum,item) =>
          sum + item.price * item.quantity,
        0
      );

    try{

      await addDoc(
        collection(db,"orders"),
        {
          userId:currentUser.uid,
          email:currentUser.email,
          items:detailed.map(item => ({
            id:item.id,
            name:item.name,
            price:item.price,
            quantity:item.quantity
          })),
          total,
          createdAt:serverTimestamp()
        }
      );

      cart = [];

      saveCart();
      renderCart();
      closeCartDrawer();

      showToast(
        "Commande enregistrée"
      );

    }catch(error){

      console.error(error);

      showToast(
        "Impossible d'enregistrer la commande"
      );

    }

  }
);


/* =========================================================
   ACCOUNT
========================================================= */

function openAccount(){

  if(currentUser){

    openModal(
      "Mon compte",
      `

      <div class="account-info">
        <strong>Compte connecté</strong>
        <span>${escapeHTML(currentUser.email)}</span>
      </div>

      <button
        class="btn btn-secondary"
        id="logoutBtn"
        style="width:100%"
      >
        Se déconnecter
      </button>

      `
    );

    setTimeout(() => {

      const logoutBtn =
        document.getElementById("logoutBtn");

      if(logoutBtn){

        logoutBtn.onclick =
          async () => {

            /*
              IMPORTANT :
              on retire aussi l'autorisation admin
              lors de la déconnexion.
            */

            localStorage.removeItem(
              ADMIN_ACCESS_KEY
            );

            await signOut(auth);

            closeModal();

            showToast(
              "Déconnexion effectuée"
            );

          };

      }

    },0);

    return;

  }

  openModal(
    "Compte",
    `

    <div class="form">

      <input
        id="authEmail"
        type="email"
        placeholder="Adresse e-mail"
      >

      <input
        id="authPassword"
        type="password"
        placeholder="Mot de passe"
      >

      <button
        class="btn btn-primary"
        id="loginBtn"
      >
        Se connecter
      </button>

      <button
        class="btn btn-secondary"
        id="registerBtn"
      >
        Créer un compte
      </button>

      <div
        class="form-message"
        id="authMessage"
      ></div>

    </div>

    `
  );

  setTimeout(() => {

    const email =
      document.getElementById("authEmail");

    const password =
      document.getElementById("authPassword");

    const message =
      document.getElementById("authMessage");

    const loginBtn =
      document.getElementById("loginBtn");

    const registerBtn =
      document.getElementById("registerBtn");


    loginBtn.onclick =
      async () => {

        try{

          await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
          );

          closeModal();

          showToast(
            "Connexion réussie"
          );

        }catch(error){

          console.error(error);

          message.textContent =
            "Connexion impossible. Vérifie tes identifiants.";

        }

      };


    registerBtn.onclick =
      async () => {

        try{

          await createUserWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
          );

          closeModal();

          showToast(
            "Compte créé"
          );

        }catch(error){

          console.error(error);

          message.textContent =
            "Création impossible. Vérifie les informations.";

        }

      };

  },0);

}


accountBtn.addEventListener(
  "click",
  openAccount
);


/* =========================================================
   ORDERS
========================================================= */

ordersBtn.addEventListener(
  "click",
  async () => {

    if(!currentUser){

      showToast(
        "Connecte-toi pour voir tes commandes"
      );

      openAccount();

      return;

    }

    openModal(
      "Mes commandes",
      `<div id="ordersContent">Chargement...</div>`
    );

    try{

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

      const container =
        document.getElementById(
          "ordersContent"
        );

      if(snapshot.empty){

        container.innerHTML = `
          <div class="cart-empty">
            Aucune commande pour le moment.
          </div>
        `;

        return;

      }

      container.innerHTML =
        snapshot.docs.map(order => {

          const data =
            order.data();

          const date =
            data.createdAt?.toDate
              ? data.createdAt
                  .toDate()
                  .toLocaleString("fr-FR")
              : "Date indisponible";

          return `

          <div class="order">

            <strong>
              Commande ${escapeHTML(order.id.slice(0,8))}
            </strong>

            <span>
              ${date}
            </span>

            <span>
              Total : ${money(data.total || 0)}
            </span>

            <span>
              ${(data.items || []).length} article(s)
            </span>

          </div>

          `;

        }).join("");

    }catch(error){

      console.error(error);

      document.getElementById(
        "ordersContent"
      ).innerHTML = `
        <div class="form-message">
          Impossible de charger les commandes.
        </div>
      `;

    }

  }
);


/* =========================================================
   SETTINGS
========================================================= */

settingsBtn.addEventListener(
  "click",
  openSettings
);


function applySettings(){

  document.body.classList.toggle(
    "light",
    settings.theme === "light"
  );

  if(settings.theme === "auto"){

    const light =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    document.body.classList.toggle(
      "light",
      light
    );

  }

}


function saveSettings(){

  localStorage.setItem(
    "novaSettings",
    JSON.stringify(settings)
  );

  applySettings();

}


function openSettings(){

  openModal(
    "Paramètres",
    `

    <div>

      <div class="setting-row">

        <div>
          <strong>Thème</strong>
          <span>Choisis l'apparence du site.</span>
        </div>

        <select id="themeSetting">

          <option value="dark"
            ${settings.theme === "dark" ? "selected" : ""}>
            Sombre
          </option>

          <option value="light"
            ${settings.theme === "light" ? "selected" : ""}>
            Clair
          </option>

          <option value="auto"
            ${settings.theme === "auto" ? "selected" : ""}>
            Automatique
          </option>

        </select>

      </div>


      <div class="setting-row">

        <div>
          <strong>Langue</strong>
          <span>Langue de l'interface.</span>
        </div>

        <select id="languageSetting">

          <option value="fr"
            ${settings.language === "fr" ? "selected" : ""}>
            Français
          </option>

          <option value="en"
            ${settings.language === "en" ? "selected" : ""}>
            English
          </option>

        </select>

      </div>


      <div class="setting-row">

        <div>
          <strong>Animations</strong>
          <span>Animations du panier et de l'interface.</span>
        </div>

        <button
          class="switch ${settings.animations ? "on" : ""}"
          id="animationsSetting"
        ></button>

      </div>

    </div>

    `
  );


  setTimeout(() => {

    const theme =
      document.getElementById(
        "themeSetting"
      );

    const language =
      document.getElementById(
        "languageSetting"
      );

    const animations =
      document.getElementById(
        "animationsSetting"
      );


    theme.onchange =
      () => {

        settings.theme =
          theme.value;

        saveSettings();

      };


    language.onchange =
      () => {

        settings.language =
          language.value;

        saveSettings();

        closeModal();

        showToast(
          language.value === "fr"
            ? "Langue : Français"
            : "Language: English"
        );

      };


    animations.onclick =
      () => {

        settings.animations =
          !settings.animations;

        animations.classList.toggle(
          "on",
          settings.animations
        );

        saveSettings();

      };

  },0);

}


/* =========================================================
   ADMIN CHECKS
========================================================= */

function isAdmin(){

  if(!currentUser){
    return false;
  }

  return (
    currentUser.email
      ?.trim()
      .toLowerCase()
    ===
    ADMIN_EMAIL
      .trim()
      .toLowerCase()
  );

}


function adminAuthorized(){

  return (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}


/* =========================================================
   ADMIN BUTTON
========================================================= */

adminBtn.addEventListener(
  "click",
  openAdmin
);


/* =========================================================
   OPEN ADMIN
========================================================= */

function openAdmin(){

  if(!currentUser){

    showToast(
      "Connecte-toi avec le compte administrateur"
    );

    openAccount();

    return;

  }


  if(!isAdmin()){

    showToast(
      "Accès administrateur refusé"
    );

    return;

  }


  /*
    Si le code a déjà été validé,
    on ouvre directement le dashboard.
  */

  if(!adminAuthorized()){

    const code =
      prompt(
        "Code administrateur NovaShop :"
      );

    if(code === null){
      return;
    }

    if(code !== ADMIN_CODE){

      showToast(
        "Code administrateur incorrect"
      );

      return;

    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

    showToast(
      "Accès administrateur activé"
    );

  }


  renderAdmin();

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

async function renderAdmin(){

  openModal(
    "Administration NovaShop",
    `

    <div class="account-info">

      <strong>👑 Administrateur</strong>

      <span>
        ${escapeHTML(currentUser.email)}
      </span>

    </div>


    <div class="admin-stat">

      <div class="stat">
        <strong>${products.length}</strong>
        <span>Produits</span>
      </div>

      <div class="stat">
        <strong>${products.length}</strong>
        <span>Références</span>
      </div>

      <div class="stat">
        <strong>✓</strong>
        <span>Admin actif</span>
      </div>

    </div>


    <div style="
      display:grid;
      gap:8px;
      margin-bottom:20px;
    ">

      <button
        class="btn btn-secondary"
        id="removeAdminMemory"
      >
        🔐 Retirer l'autorisation mémorisée
      </button>

      <button
        class="btn btn-secondary"
        id="refreshAdmin"
      >
        ↻ Actualiser
      </button>

    </div>


    <h3 style="
      font-size:15px;
      margin-bottom:10px;
    ">
      Produits
    </h3>

    <div id="adminProducts"></div>

    <div
      style="
        margin-top:20px;
        padding-top:20px;
        border-top:1px solid var(--border);
      "
    >

      <button
        class="btn btn-secondary"
        id="deleteAllOrders"
        style="width:100%"
      >
        Supprimer toutes les commandes
      </button>

    </div>

    `
  );


  const adminProducts =
    document.getElementById(
      "adminProducts"
    );


  adminProducts.innerHTML =
    products.map(product => `

      <div class="admin-product">

        <img
          src="${product.image}"
          alt=""
        >

        <div class="admin-product-info">

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <span>
            ${escapeHTML(product.category)}
            · ${money(product.price)}
          </span>

        </div>

      </div>

    `).join("");


  document.getElementById(
    "removeAdminMemory"
  ).onclick = () => {

    localStorage.removeItem(
      ADMIN_ACCESS_KEY
    );

    closeModal();

    showToast(
      "Autorisation admin retirée"
    );

  };


  document.getElementById(
    "refreshAdmin"
  ).onclick = () => {

    renderAdmin();

  };


  document.getElementById(
    "deleteAllOrders"
  ).onclick =
    deleteAllOrders;

}


/* =========================================================
   DELETE ORDERS
========================================================= */

async function deleteAllOrders(){

  if(!isAdmin()){

    showToast(
      "Accès refusé"
    );

    return;

  }


  const confirmed =
    confirm(
      "Supprimer toutes les commandes ?"
    );

  if(!confirmed) return;


  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    for(
      const order of snapshot.docs
    ){

      await deleteDoc(
        doc(
          db,
          "orders",
          order.id
        )
      );

    }

    showToast(
      "Toutes les commandes ont été supprimées"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Erreur pendant la suppression"
    );

  }

}


/* =========================================================
   AUTH STATE
   IMPORTANT : FIX ADMIN
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;


    const connectedEmail =
      user?.email
        ?.trim()
        .toLowerCase()
      || "";


    const adminEmail =
      ADMIN_EMAIL
        .trim()
        .toLowerCase();


    if(
      connectedEmail === adminEmail
    ){

      /*
        IMPORTANT :
        le bouton apparaît dès que le
        compte admin est connecté.

        Il ne dépend PAS de
        adminAuthorized().
      */

      adminBtn.style.display =
        "grid";


      adminBtn.title =
        "Administration";


      console.log(
        "👑 NovaShop Admin détecté :",
        user.email
      );

    }else{

      adminBtn.style.display =
        "none";

    }

  }
);


/* =========================================================
   HERO BUTTONS
========================================================= */

document.getElementById(
  "heroShopBtn"
).onclick = () => {

  document.getElementById(
    "shop"
  ).scrollIntoView({
    behavior:"smooth"
  });

};


document.getElementById(
  "heroCategoriesBtn"
).onclick = () => {

  document.getElementById(
    "categoryFilters"
  ).scrollIntoView({
    behavior:"smooth"
  });

};


document.getElementById(
  "heroOfferBtn"
).onclick = () => {

  document.getElementById(
    "shop"
  ).scrollIntoView({
    behavior:"smooth"
  });

};


/* =========================================================
   SEARCH / SORT
========================================================= */

searchInput.addEventListener(
  "input",
  renderProducts
);

sortSelect.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   MODAL CLOSE
========================================================= */

modalClose.addEventListener(
  "click",
  closeModal
);

modalOverlay.addEventListener(
  "click",
  event => {

    if(
      event.target === modalOverlay
    ){

      closeModal();

    }

  }
);

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
   AUTO THEME
========================================================= */

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener(
    "change",
    () => {

      if(settings.theme === "auto"){
        applySettings();
      }

    }
  );


/* =========================================================
   INIT
========================================================= */

applySettings();

renderCategories();

renderProducts();

renderCart();


/* =========================================================
   DEBUG
========================================================= */

window.NovaShop = {

  products,

  cart,

  currentUser,

  openCart,

  openAdmin,

  renderProducts,

  renderCart,

  settings

};

console.log(
  `NovaShop chargé : ${products.length} produits`
);
