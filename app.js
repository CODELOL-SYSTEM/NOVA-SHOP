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
  query,
  where,
  updateDoc,
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";


/* =========================================================
   IMAGE SYSTEM
========================================================= */

const fallbackImage =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700">
      <rect width="100%" height="100%" fill="#f5f7fa"/>
      <text x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Arial"
        font-size="40"
        fill="#7b8798">
        NovaShop
      </text>
    </svg>
  `);


/*
  IMPORTANT :
  Les images Amazon/Fnac/LDLC/etc. peuvent bloquer
  l'affichage lorsqu'elles sont chargées directement.

  On utilise donc wsrv.nl comme proxy d'image.
*/

function imageUrl(url){

  if(!url){
    return fallbackImage;
  }

  try{

    return "https://images.weserv.nl/?url=" +
      encodeURIComponent(url);

  }catch{

    return fallbackImage;

  }

}


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
let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

let activeCategory = "Tous";
let searchTerm = "";

let currentCheckoutDiscount = 0;
let currentCheckoutTotal = 0;


/* =========================================================
   HELPERS
========================================================= */

function $(id){
  return document.getElementById(id);
}

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

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}

function toast(message){

  const el = $("toast");

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.__toast);

  window.__toast = setTimeout(()=>{
    el.classList.remove("show");
  },2200);

}


/* =========================================================
   RATINGS
========================================================= */

function ratingFor(product){

  const number =
    parseInt(product.id.replace("p",""),10);

  const count =
    132 + ((number * 173) % 1604);

  const rating =
    4.4 + ((number % 6) * 0.1);

  return {
    count,
    rating:Math.min(5,rating)
  };

}

function stars(rating){

  const full = Math.floor(rating);

  return "★".repeat(full) +
         "☆".repeat(5-full);

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  $("categories").innerHTML =
    categories.map(category=>`

      <button
        class="category ${category===activeCategory?"active":""}"
        data-category="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>

    `).join("");

  document.querySelectorAll(".category").forEach(button=>{

    button.addEventListener("click",()=>{

      activeCategory =
        button.dataset.category;

      renderCategories();
      renderProducts();

    });

  });

}


/* =========================================================
   FILTER / SORT
========================================================= */

function filteredProducts(){

  let list = [...products];

  if(activeCategory !== "Tous"){

    list = list.filter(
      p=>p.category === activeCategory
    );

  }

  if(searchTerm){

    const term =
      searchTerm.toLowerCase();

    list = list.filter(p=>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );

  }

  const sort =
    $("sortSelect").value;

  if(sort === "priceAsc"){

    list.sort((a,b)=>a.price-b.price);

  }

  if(sort === "priceDesc"){

    list.sort((a,b)=>b.price-a.price);

  }

  if(sort === "rating"){

    list.sort((a,b)=>
      ratingFor(b).rating -
      ratingFor(a).rating
    );

  }

  return list;

}


/* =========================================================
   PRODUCT CARDS
========================================================= */

function renderProducts(){

  const list = filteredProducts();

  if(!list.length){

    $("productGrid").innerHTML = `
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

  $("productGrid").innerHTML =
    list.map(product=>{

      const r = ratingFor(product);

      return `

        <article class="product">

          <div class="product-img">

            <img
              src="${escapeHtml(imageUrl(product.image))}"
              alt="${escapeHtml(product.name)}"
              loading="lazy"
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${fallbackImage}'"
            >

          </div>

          <div class="product-body">

            <div class="product-cat">
              ${escapeHtml(product.category)}
            </div>

            <h3>
              ${escapeHtml(product.name)}
            </h3>

            <div class="rating">

              <span class="stars">
                ${stars(r.rating)}
              </span>

              <span>
                ${r.rating.toFixed(1).replace(".",",")}
                · ${r.count.toLocaleString("fr-FR")} avis
              </span>

            </div>

            <div class="product-bottom">

              <div class="price">
                ${product.price === 0
                  ? "Prix à définir"
                  : money(product.price)}
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
                  🛒
                </button>

              </div>

            </div>

          </div>

        </article>

      `;

    }).join("");


  document.querySelectorAll("[data-add]").forEach(button=>{

    button.addEventListener("click",()=>{

      addToCart(button.dataset.add);

    });

  });


  document.querySelectorAll("[data-view]").forEach(button=>{

    button.addEventListener("click",()=>{

      openProduct(button.dataset.view);

    });

  });

}


/* =========================================================
   CART
========================================================= */

function addToCart(productId){

  const product =
    products.find(p=>p.id===productId);

  if(!product) return;

  if(product.price <= 0){

    toast("Prix de ce produit à définir.");

    return;

  }

  const existing =
    cart.find(item=>item.id===productId);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:productId,
      quantity:1
    });

  }

  saveCart();
  renderCart();

  toast("Produit ajouté au panier 🛒");

  const badge = $("cartBadge");

  badge.animate(
    [
      {transform:"scale(1)"},
      {transform:"scale(1.25)"},
      {transform:"scale(1)"}
    ],
    {
      duration:280
    }
  );

}


function removeFromCart(productId){

  cart =
    cart.filter(item=>item.id!==productId);

  saveCart();
  renderCart();

}


function changeQuantity(productId,delta){

  const item =
    cart.find(i=>i.id===productId);

  if(!item) return;

  item.quantity += delta;

  if(item.quantity <= 0){

    removeFromCart(productId);
    return;

  }

  saveCart();
  renderCart();

}


function cartTotal(){

  return cart.reduce((total,item)=>{

    const product =
      products.find(p=>p.id===item.id);

    return total +
      (product?.price || 0) *
      item.quantity;

  },0);

}


function renderCart(){

  $("cartBadge").textContent =
    cart.reduce(
      (sum,item)=>sum+item.quantity,
      0
    );

  if(!cart.length){

    $("cartItems").innerHTML = `

      <div style="
        text-align:center;
        padding:60px 20px;
        color:var(--muted);
      ">
        <div style="font-size:45px;margin-bottom:15px">🛒</div>
        Ton panier est vide.
      </div>

    `;

  }else{

    $("cartItems").innerHTML =
      cart.map(item=>{

        const product =
          products.find(p=>p.id===item.id);

        if(!product) return "";

        return `

          <div class="cart-item">

            <img
              src="${escapeHtml(imageUrl(product.image))}"
              alt=""
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${fallbackImage}'"
            >

            <div>

              <h4>
                ${escapeHtml(product.name)}
              </h4>

              <p>
                ${money(product.price)}
              </p>

              <div class="qty">

                <button
                  data-minus="${product.id}"
                >−</button>

                <strong>
                  ${item.quantity}
                </strong>

                <button
                  data-plus="${product.id}"
                >+</button>

              </div>

            </div>

            <button
              class="close"
              data-remove="${product.id}"
            >
              ×
            </button>

          </div>

        `;

      }).join("");

  }

  $("cartTotal").textContent =
    money(cartTotal());


  document.querySelectorAll("[data-minus]").forEach(btn=>{

    btn.onclick=()=>{
      changeQuantity(btn.dataset.minus,-1);
    };

  });

  document.querySelectorAll("[data-plus]").forEach(btn=>{

    btn.onclick=()=>{
      changeQuantity(btn.dataset.plus,1);
    };

  });

  document.querySelectorAll("[data-remove]").forEach(btn=>{

    btn.onclick=()=>{
      removeFromCart(btn.dataset.remove);
    };

  });

}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart(){

  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("open");

}

function closeCart(){

  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("open");

}

$("cartBtn").onclick=openCart;
$("heroCartBtn").onclick=openCart;
$("closeCart").onclick=closeCart;
$("overlay").onclick=closeCart;


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(productId){

  const product =
    products.find(p=>p.id===productId);

  if(!product) return;

  const r =
    ratingFor(product);

  $("modalTitle").textContent =
    product.name;

  $("modalContent").innerHTML = `

    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:22px;
    ">

      <div style="
        background:#fff;
        border-radius:15px;
        min-height:300px;
        display:grid;
        place-items:center;
      ">

        <img
          src="${escapeHtml(imageUrl(product.image))}"
          alt="${escapeHtml(product.name)}"
          style="
            width:100%;
            height:320px;
            object-fit:contain;
            padding:20px;
          "
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${fallbackImage}'"
        >

      </div>

      <div>

        <div class="product-cat">
          ${escapeHtml(product.category)}
        </div>

        <h2 style="margin-bottom:12px">
          ${escapeHtml(product.name)}
        </h2>

        <div class="rating">

          <span class="stars">
            ${stars(r.rating)}
          </span>

          <span>
            ${r.rating.toFixed(1).replace(".",",")}
            · ${r.count.toLocaleString("fr-FR")} avis
          </span>

        </div>

        <div style="
          font-size:30px;
          font-weight:950;
          margin:20px 0;
        ">
          ${product.price === 0
            ? "Prix à définir"
            : money(product.price)}
        </div>

        <p style="
          color:var(--muted);
          line-height:1.7;
          margin-bottom:20px;
        ">
          Produit disponible dans la sélection NovaShop.
          Ajoute-le au panier pour continuer ta commande.
        </p>

        <button
          class="primary"
          style="width:100%"
          id="modalAdd"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

  `;

  $("modalLayer").classList.add("open");

  $("modalAdd").onclick=()=>{

    addToCart(product.id);
    closeModal();

  };

}


function closeModal(){

  $("modalLayer").classList.remove("open");

}

$("modalClose").onclick=closeModal;

$("modalLayer").addEventListener("click",e=>{

  if(e.target === $("modalLayer")){
    closeModal();
  }

});


/* =========================================================
   AUTH
========================================================= */

async function login(){

  try{

    await signInWithPopup(
      auth,
      googleProvider
    );

    toast("Connexion réussie.");

  }catch(error){

    console.error(error);

    toast(
      "Connexion impossible."
    );

  }

}


async function logout(){

  localStorage.removeItem(
    ADMIN_ACCESS_KEY
  );

  await signOut(auth);

  toast("Déconnexion.");

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser = user;

  const adminBtn =
    $("adminBtn");

  const connectedEmail =
    user?.email?.trim().toLowerCase() || "";

  const adminEmail =
    ADMIN_EMAIL.trim().toLowerCase();


  if(
    connectedEmail === adminEmail
  ){

    adminBtn.style.display="grid";

    console.log(
      "👑 NovaShop Admin détecté :",
      user.email
    );

  }else{

    adminBtn.style.display="none";

  }

});


/* =========================================================
   ACCOUNT
========================================================= */

$("accountBtn").onclick=()=>{

  if(currentUser){

    $("modalTitle").textContent =
      "Mon compte";

    $("modalContent").innerHTML = `

      <div style="text-align:center">

        <div style="
          font-size:50px;
          margin-bottom:15px;
        ">
          👤
        </div>

        <h2>
          ${escapeHtml(currentUser.displayName || "Compte")}
        </h2>

        <p style="
          color:var(--muted);
          margin:10px 0 20px;
        ">
          ${escapeHtml(currentUser.email)}
        </p>

        <button
          class="secondary"
          id="logoutButton"
        >
          Se déconnecter
        </button>

      </div>

    `;

    $("modalLayer").classList.add("open");

    $("logoutButton").onclick=()=>{

      closeModal();
      logout();

    };

  }else{

    $("modalTitle").textContent =
      "Connexion";

    $("modalContent").innerHTML = `

      <div style="text-align:center">

        <div style="
          font-size:50px;
          margin-bottom:15px;
        ">
          👤
        </div>

        <h2>
          Connexion NovaShop
        </h2>

        <p style="
          color:var(--muted);
          margin:10px 0 25px;
        ">
          Connecte-toi pour commander et suivre tes commandes.
        </p>

        <button
          class="primary"
          id="googleLogin"
        >
          Continuer avec Google
        </button>

      </div>

    `;

    $("modalLayer").classList.add("open");

    $("googleLogin").onclick=()=>{

      closeModal();
      login();

    };

  }

};


/* =========================================================
   SETTINGS
========================================================= */

$("settingsBtn").onclick=()=>{

  $("modalTitle").textContent =
    "Paramètres";

  $("modalContent").innerHTML = `

    <div class="field">

      <label>Thème</label>

      <select id="themeSelect">

        <option value="dark">Sombre</option>
        <option value="light">Clair</option>
        <option value="auto">Automatique</option>

      </select>

    </div>

    <div style="height:14px"></div>

    <div class="field">

      <label>Langue</label>

      <select id="languageSelect">

        <option value="fr">Français</option>
        <option value="en">English</option>

      </select>

    </div>

    <div style="
      margin-top:20px;
      color:var(--muted);
      line-height:1.6;
    ">
      Les paramètres sont enregistrés automatiquement.
    </div>

  `;

  $("modalLayer").classList.add("open");

  const theme =
    localStorage.getItem("novaTheme") || "dark";

  $("themeSelect").value=theme;

  $("themeSelect").onchange=e=>{

    setTheme(e.target.value);

  };

};


function setTheme(theme){

  localStorage.setItem(
    "novaTheme",
    theme
  );

  if(theme==="light"){

    document.body.classList.add("light");

  }else if(theme==="dark"){

    document.body.classList.remove("light");

  }else{

    const light =
      window.matchMedia(
        "(prefers-color-scheme:light)"
      ).matches;

    document.body.classList.toggle(
      "light",
      light
    );

  }

}

setTheme(
  localStorage.getItem("novaTheme") || "dark"
);


/* =========================================================
   CHECKOUT
========================================================= */

$("checkoutBtn").onclick=()=>{

  if(!cart.length){

    toast("Ton panier est vide.");

    return;

  }

  if(!currentUser){

    $("accountBtn").click();

    toast(
      "Connecte-toi pour commander."
    );

    return;

  }

  openCheckout();

};


function openCheckout(){

  currentCheckoutDiscount=0;
  currentCheckoutTotal=cartTotal();

  $("modalTitle").textContent =
    "Finaliser la commande";

  $("modalContent").innerHTML = `

    <div class="form-grid">

      <div class="field full">

        <label>Nom complet</label>

        <input
          id="fullName"
          placeholder="Nom et prénom"
        >

      </div>

      <div class="field full">

        <label>Adresse</label>

        <input
          id="address"
          placeholder="Adresse de livraison"
        >

      </div>

      <div class="field">

        <label>Code postal</label>

        <input
          id="postalCode"
          placeholder="59000"
        >

      </div>

      <div class="field">

        <label>Ville</label>

        <input
          id="city"
          placeholder="Ville"
        >

      </div>

      <div class="field full">

        <label>Téléphone (optionnel)</label>

        <input
          id="phone"
          placeholder="06..."
        >

      </div>

      <div class="field full">

        <label>Code promo</label>

        <input
          id="promoCode"
          placeholder="Code promo"
        >

      </div>

    </div>

    <button
      class="secondary"
      style="
        width:100%;
        margin-top:12px;
      "
      id="applyPromo"
    >
      Appliquer le code
    </button>

    <div class="summary">

      <div class="summary-row">

        <span>Sous-total</span>

        <strong id="checkoutSubtotal">
          ${money(cartTotal())}
        </strong>

      </div>

      <div class="summary-row">

        <span>Réduction</span>

        <strong id="checkoutDiscount">
          0,00 €
        </strong>

      </div>

      <div class="summary-row summary-total">

        <span>Total</span>

        <strong id="checkoutTotal">
          ${money(cartTotal())}
        </strong>

      </div>

    </div>

    <div id="paymentArea">

      <button
        class="paypal"
        id="paypalButton"
      >
        Payer avec PayPal
      </button>

    </div>

  `;


  $("modalLayer").classList.add("open");


  $("applyPromo").onclick=applyPromo;

  $("paypalButton").onclick=payWithPaypal;

}


function applyPromo(){

  const input =
    $("promoCode").value
      .trim()
      .toUpperCase();

  if(input === "NOVA100"){

    currentCheckoutDiscount =
      cartTotal();

    currentCheckoutTotal=0;

    $("checkoutDiscount").textContent =
      "-" + money(currentCheckoutDiscount);

    $("checkoutTotal").textContent =
      money(0);

    $("paymentArea").innerHTML = `

      <button
        class="free-order"
        id="freeOrderButton"
      >
        ✓ Valider la commande à 0 €
      </button>

    `;

    $("freeOrderButton").onclick =
      createFreeOrder;

    toast(
      "Code NOVA100 appliqué 🎉"
    );

  }else{

    currentCheckoutDiscount=0;
    currentCheckoutTotal=cartTotal();

    $("checkoutDiscount").textContent =
      money(0);

    $("checkoutTotal").textContent =
      money(cartTotal());

    $("paymentArea").innerHTML = `

      <button
        class="paypal"
        id="paypalButton"
      >
        Payer avec PayPal
      </button>

    `;

    $("paypalButton").onclick =
      payWithPaypal;

    toast(
      input
        ? "Code promo invalide."
        : "Entre un code promo."
    );

  }

}


/* =========================================================
   ADDRESS
========================================================= */

function getAddress(){

  const fullName =
    $("fullName")?.value.trim();

  const address =
    $("address")?.value.trim();

  const postalCode =
    $("postalCode")?.value.trim();

  const city =
    $("city")?.value.trim();

  const phone =
    $("phone")?.value.trim() || "";

  if(
    !fullName ||
    !address ||
    !postalCode ||
    !city
  ){

    toast(
      "Remplis toute l'adresse de livraison."
    );

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


/* =========================================================
   PAYPAL
========================================================= */

async function payWithPaypal(){

  if(!currentUser){

    toast("Connecte-toi d'abord.");

    return;

  }

  const address =
    getAddress();

  if(!address) return;

  const total =
    Number(currentCheckoutTotal.toFixed(2));

  if(total <= 0){

    toast("Utilise la validation gratuite.");

    return;

  }

  try{

    const order = await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,

        email:currentUser.email,

        items:cart.map(item=>{

          const product =
            products.find(p=>p.id===item.id);

          return {
            id:item.id,
            name:product?.name || "",
            price:product?.price || 0,
            quantity:item.quantity
          };

        }),

        total,

        subtotal:cartTotal(),

        discount:currentCheckoutDiscount,

        promoCode:
          $("promoCode").value
            .trim()
            .toUpperCase(),

        address,

        paymentMethod:"PayPal.Me",

        paymentStatus:"pending",

        status:"pending",

        packageCity:"",

        estimatedDelivery:"",

        trackingNumber:"",

        deliveryDuration:"",

        createdAt:serverTimestamp()

      }
    );


    /*
      PayPal.Me reçoit le montant dans l'URL.

      IMPORTANT :
      le paiement réel doit être effectué sur PayPal.
      Le statut reste "pending" jusqu'à validation
      depuis le dashboard OWNER.
    */

    const paypalUrl =
      "https://paypal.me/SH0PNOVA/" +
      total.toFixed(2);


    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer"
    );


    cart=[];

    saveCart();
    renderCart();

    closeModal();

    toast(
      "Commande créée. Paiement PayPal en attente."
    );

  }catch(error){

    console.error(error);

    toast(
      "Impossible de créer la commande."
    );

  }

}


/* =========================================================
   NOVA100
========================================================= */

async function createFreeOrder(){

  if(!currentUser) return;

  const address =
    getAddress();

  if(!address) return;

  try{

    await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,

        email:currentUser.email,

        items:cart.map(item=>{

          const product =
            products.find(p=>p.id===item.id);

          return {
            id:item.id,
            name:product?.name || "",
            price:product?.price || 0,
            quantity:item.quantity
          };

        }),

        total:0,

        subtotal:cartTotal(),

        discount:cartTotal(),

        promoCode:"NOVA100",

        address,

        paymentMethod:"Promo",

        paymentStatus:"free",

        status:"accepted",

        packageCity:"",

        estimatedDelivery:"",

        trackingNumber:"",

        deliveryDuration:"",

        createdAt:serverTimestamp()

      }
    );


    cart=[];

    saveCart();
    renderCart();

    closeModal();

    toast(
      "Commande NOVA100 acceptée 🎉"
    );

  }catch(error){

    console.error(error);

    toast(
      "Impossible de créer la commande."
    );

  }

}


/* =========================================================
   ORDERS CUSTOMER
========================================================= */

$("ordersBtn").onclick =
  openOrders;


async function openOrders(){

  if(!currentUser){

    $("accountBtn").click();

    return;

  }

  $("modalTitle").textContent =
    "Mes commandes";

  $("modalContent").innerHTML = `
    <div style="
      text-align:center;
      padding:30px;
      color:var(--muted);
    ">
      Chargement des commandes...
    </div>
  `;

  $("modalLayer").classList.add("open");


  try{

    const q = query(
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
        .map(d=>({
          id:d.id,
          ...d.data()
        }))
        .sort((a,b)=>{

          const ta =
            a.createdAt?.seconds || 0;

          const tb =
            b.createdAt?.seconds || 0;

          return tb-ta;

        });


    if(!orders.length){

      $("modalContent").innerHTML = `

        <div style="
          text-align:center;
          padding:50px 20px;
          color:var(--muted);
        ">
          Aucune commande.
        </div>

      `;

      return;

    }


    $("modalContent").innerHTML =
      orders.map(renderCustomerOrder).join("");

  }catch(error){

    console.error(error);

    $("modalContent").innerHTML = `

      <div style="
        color:var(--danger);
        padding:30px;
        text-align:center;
      ">
        Impossible de charger les commandes.
      </div>

    `;

  }

}


function statusLabel(status){

  const labels={

    pending:"En attente",

    accepted:"Acceptée",

    preparing:"Préparation",

    transit:"En transit",

    nearby:"Livraison proche",

    delivered:"Livrée"

  };

  return labels[status] || status || "En attente";

}


function statusIndex(status){

  const list=[
    "pending",
    "accepted",
    "preparing",
    "transit",
    "nearby",
    "delivered"
  ];

  return Math.max(
    0,
    list.indexOf(status)
  );

}


function renderProgress(status){

  const states=[
    "accepted",
    "preparing",
    "transit",
    "nearby",
    "delivered"
  ];

  const index =
    Math.max(
      0,
      states.indexOf(status)
    );

  return `

    <div class="progress">

      ${states.map((state,i)=>`

        ${i>0
          ? `<div class="progress-line ${
              i<=index?"active":""
            }"></div>`
          : ""
        }

        <div
          class="progress-step ${
            i<=index?"active":""
          }"
          title="${statusLabel(state)}"
        ></div>

      `).join("")}

    </div>

  `;

}


function renderCustomerOrder(order){

  const date =
    order.createdAt?.toDate
      ? order.createdAt.toDate().toLocaleString("fr-FR")
      : "Date inconnue";

  return `

    <div class="order-card">

      <div class="order-top">

        <div>

          <strong>
            Commande #${escapeHtml(order.id.slice(0,8))}
          </strong>

          <div style="
            color:var(--muted);
            font-size:12px;
            margin-top:5px;
          ">
            ${date}
          </div>

        </div>

        <span class="status">
          ${escapeHtml(statusLabel(order.status))}
        </span>

      </div>

      ${renderProgress(order.status)}

      <div style="
        display:grid;
        gap:7px;
        color:var(--muted);
        font-size:13px;
      ">

        <div>
          💰 Total :
          <strong style="color:var(--text)">
            ${money(order.total)}
          </strong>
        </div>

        <div>
          📍 Ville :
          ${escapeHtml(order.packageCity || "À définir")}
        </div>

        <div>
          🚚 Livraison :
          ${escapeHtml(order.estimatedDelivery || "À définir")}
        </div>

        <div>
          📦 Suivi :
          ${escapeHtml(order.trackingNumber || "À définir")}
        </div>

        <div>
          ⏱️ Délai :
          ${escapeHtml(order.deliveryDuration || "À définir")}
        </div>

      </div>

      <button
        class="secondary"
        style="
          width:100%;
          margin-top:15px;
        "
        data-print-order="${order.id}"
      >
        🖨 Imprimer la facture
      </button>

    </div>

  `;

}


/* =========================================================
   PRINT CUSTOMER INVOICE
========================================================= */

document.addEventListener("click",e=>{

  const button =
    e.target.closest("[data-print-order]");

  if(button){

    printInvoice(
      button.dataset.printOrder
    );

  }

});


async function getOrder(orderId){

  const snapshot =
    await getDocs(
      query(
        collection(db,"orders"),
        where(
          "__name__",
          "==",
          orderId
        )
      )
    );

  if(snapshot.empty)
    return null;

  const d =
    snapshot.docs[0];

  return {
    id:d.id,
    ...d.data()
  };

}


async function printInvoice(orderId){

  try{

    const order =
      await getOrder(orderId);

    if(!order){

      toast("Commande introuvable.");

      return;

    }

    printOrderHtml(order);

  }catch(error){

    console.error(error);

    toast(
      "Impossible d'imprimer la facture."
    );

  }

}


/* =========================================================
   PRINT HTML
========================================================= */

function printOrderHtml(order){

  const items =
    (order.items || [])
      .map(item=>`

        <tr>

          <td>
            ${escapeHtml(item.name)}
          </td>

          <td>
            ${item.quantity}
          </td>

          <td>
            ${money(item.price)}
          </td>

          <td>
            ${money(item.price * item.quantity)}
          </td>

        </tr>

      `)
      .join("");


  const address =
    order.address || {};


  const win =
    window.open(
      "",
      "_blank",
      "width=900,height=800"
    );

  if(!win) return;


  win.document.write(`

<!DOCTYPE html>

<html lang="fr">

<head>

<meta charset="UTF-8">

<title>Facture NovaShop</title>

<style>

body{
  font-family:Arial,sans-serif;
  margin:0;
  padding:45px;
  color:#111;
}

.header{
  display:flex;
  justify-content:space-between;
  border-bottom:3px solid #1768d8;
  padding-bottom:20px;
}

h1{
  margin:0;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:35px;
}

th,td{
  padding:12px;
  border-bottom:1px solid #ddd;
  text-align:left;
}

.total{
  margin-top:30px;
  margin-left:auto;
  width:300px;
  font-size:22px;
  font-weight:900;
}

.info{
  margin-top:30px;
  line-height:1.7;
}

@media print{
  body{
    padding:20px;
  }
}

</style>

</head>

<body>

<div class="header">

  <div>
    <h1>NOVASHOP</h1>
    <p>Facture / commande</p>
  </div>

  <div>
    <strong>
      #${escapeHtml(order.id)}
    </strong>
  </div>

</div>

<div class="info">

  <strong>Client</strong><br>

  ${escapeHtml(address.fullName || "")}<br>

  ${escapeHtml(address.address || "")}<br>

  ${escapeHtml(address.postalCode || "")}
  ${escapeHtml(address.city || "")}<br>

  ${escapeHtml(address.phone || "")}

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

${items}

</tbody>

</table>

<div class="total">

  Sous-total :
  ${money(order.subtotal)}<br>

  Réduction :
  ${money(order.discount)}<br>

  Total :
  ${money(order.total)}

</div>

<div class="info">

  <strong>Statut :</strong>
  ${escapeHtml(statusLabel(order.status))}<br>

  <strong>Paiement :</strong>
  ${escapeHtml(order.paymentStatus || "")}<br>

  <strong>Suivi :</strong>
  ${escapeHtml(order.trackingNumber || "À définir")}

</div>

<script>

window.onload=()=>{
  window.print();
};

<\/script>

</body>

</html>

  `);

  win.document.close();

}


/* =========================================================
   ADMIN
========================================================= */

$("adminBtn").onclick =
  openAdmin;


async function openAdmin(){

  if(!currentUser){

    toast("Connexion requise.");

    return;

  }

  const email =
    currentUser.email
      ?.trim()
      .toLowerCase();

  if(
    email !==
    ADMIN_EMAIL.toLowerCase()
  ){

    toast("Accès refusé.");

    return;

  }


  const authorized =
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true";


  if(!authorized){

    const code =
      prompt(
        "Code OWNER NovaShop :"
      );

    if(code !== ADMIN_CODE){

      toast("Code incorrect.");

      return;

    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }


  await renderAdmin();

}


async function renderAdmin(){

  $("modalTitle").textContent =
    "OWNER • Administration";

  $("modalContent").innerHTML = `

    <div style="
      display:flex;
      gap:8px;
      margin-bottom:18px;
    ">

      <button
        class="primary"
        id="adminOrdersTab"
      >
        Commandes
      </button>

      <button
        class="secondary"
        id="adminProductsTab"
      >
        Produits
      </button>

    </div>

    <div id="adminContent">

      Chargement...

    </div>

  `;

  $("modalLayer").classList.add("open");

  $("adminOrdersTab").onclick =
    renderAdminOrders;

  $("adminProductsTab").onclick =
    renderAdminProducts;

  await renderAdminOrders();

}


/* =========================================================
   ADMIN ORDERS
========================================================= */

async function renderAdminOrders(){

  $("adminContent").innerHTML =
    "Chargement des commandes...";

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs
        .map(d=>({
          id:d.id,
          ...d.data()
        }))
        .sort((a,b)=>{

          return (
            (b.createdAt?.seconds || 0) -
            (a.createdAt?.seconds || 0)
          );

        });


    if(!orders.length){

      $("adminContent").innerHTML = `

        <div style="
          padding:35px;
          text-align:center;
          color:var(--muted);
        ">
          Aucune commande.
        </div>

      `;

      return;

    }


    $("adminContent").innerHTML = `

      <div class="admin-list">

        ${orders.map(renderAdminOrder).join("")}

      </div>

    `;


    document.querySelectorAll(
      "[data-accept-paypal]"
    ).forEach(button=>{

      button.onclick=()=>{

        acceptPaypalOrder(
          button.dataset.acceptPaypal
        );

      };

    });


    document.querySelectorAll(
      "[data-save-admin-order]"
    ).forEach(button=>{

      button.onclick=()=>{

        saveAdminOrder(
          button.dataset.saveAdminOrder
        );

      };

    });


    document.querySelectorAll(
      "[data-print-admin]"
    ).forEach(button=>{

      button.onclick=()=>{

        printInvoice(
          button.dataset.printAdmin
        );

      };

    });


  }catch(error){

    console.error(error);

    $("adminContent").innerHTML = `

      <div style="color:var(--danger)">
        Impossible de charger les commandes.
      </div>

    `;

  }

}


function renderAdminOrder(order){

  const paypalPending =
    order.paymentMethod === "PayPal.Me" &&
    order.paymentStatus === "pending";


  return `

    <div class="admin-order">

      <div class="order-top">

        <div>

          <strong>
            #${escapeHtml(order.id)}
          </strong>

          <div style="
            color:var(--muted);
            font-size:12px;
            margin-top:5px;
          ">
            ${escapeHtml(order.email || "")}
          </div>

        </div>

        <span class="status">
          ${escapeHtml(statusLabel(order.status))}
        </span>

      </div>

      <div style="
        margin-top:12px;
        line-height:1.7;
        font-size:13px;
      ">

        <div>
          💰
          <strong>
            ${money(order.total)}
          </strong>
        </div>

        <div>
          💳
          ${escapeHtml(order.paymentMethod || "")}
          ·
          ${escapeHtml(order.paymentStatus || "")}
        </div>

        <div>
          🎟
          ${escapeHtml(order.promoCode || "Aucun")}
        </div>

        <div>
          📍
          ${escapeHtml(order.address?.city || "")}
        </div>

      </div>


      ${
        paypalPending
        ? `

          <button
            class="free-order"
            style="margin-top:14px"
            data-accept-paypal="${order.id}"
          >
            ✓ Accepter le paiement PayPal
          </button>

        `
        : `
          <div style="
            margin-top:14px;
            padding:10px;
            border-radius:9px;
            background:rgba(37,214,149,.1);
            color:var(--green);
            font-weight:800;
            font-size:12px;
          ">
            ✓ Paiement accepté
          </div>
        `
      }


      <div class="admin-controls">

        <select id="status-${order.id}">

          ${[
            "pending",
            "accepted",
            "preparing",
            "transit",
            "nearby",
            "delivered"
          ].map(status=>`

            <option
              value="${status}"
              ${order.status===status?"selected":""}
            >
              ${statusLabel(status)}
            </option>

          `).join("")}

        </select>


        <input
          id="city-${order.id}"
          value="${escapeHtml(order.packageCity || "")}"
          placeholder="Ville du colis"
        >


        <input
          id="delivery-${order.id}"
          value="${escapeHtml(order.estimatedDelivery || "")}"
          placeholder="Date prévue"
        >


        <input
          id="tracking-${order.id}"
          value="${escapeHtml(order.trackingNumber || "")}"
          placeholder="Numéro de suivi"
        >


        <input
          id="duration-${order.id}"
          value="${escapeHtml(order.deliveryDuration || "")}"
          placeholder="Délai avant livraison"
        >


        <button
          class="admin-save full"
          data-save-admin-order="${order.id}"
        >
          💾 Enregistrer le suivi
        </button>


        <button
          class="secondary full"
          data-print-admin="${order.id}"
        >
          🖨 Imprimer la facture
        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   ACCEPT PAYPAL
========================================================= */

async function acceptPaypalOrder(orderId){

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"paid",
        status:"accepted"
      }
    );

    toast(
      "Paiement PayPal accepté."
    );

    await renderAdminOrders();

  }catch(error){

    console.error(error);

    toast(
      "Impossible d'accepter le paiement."
    );

  }

}


/* =========================================================
   SAVE ADMIN TRACKING
========================================================= */

async function saveAdminOrder(orderId){

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

    await updateDoc(
      doc(db,"orders",orderId),
      {

        status,

        packageCity,

        estimatedDelivery,

        trackingNumber,

        deliveryDuration

      }
    );

    toast(
      "Suivi de commande enregistré."
    );

    await renderAdminOrders();

  }catch(error){

    console.error(error);

    toast(
      "Impossible d'enregistrer."
    );

  }

}


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

async function renderAdminProducts(){

  $("adminContent").innerHTML = `

    <div style="
      margin-bottom:15px;
      color:var(--muted);
    ">
      ${products.length} produits dans NovaShop.
    </div>

    <div class="admin-list">

      ${products.map(product=>`

        <div class="admin-order">

          <div style="
            display:flex;
            gap:13px;
            align-items:center;
          ">

            <img
              src="${escapeHtml(imageUrl(product.image))}"
              style="
                width:70px;
                height:70px;
                object-fit:contain;
                background:#fff;
                border-radius:10px;
              "
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${fallbackImage}'"
            >

            <div>

              <strong>
                ${escapeHtml(product.name)}
              </strong>

              <div style="
                color:var(--muted);
                font-size:12px;
                margin-top:5px;
              ">
                ${escapeHtml(product.category)}
              </div>

              <div style="
                margin-top:5px;
                font-weight:900;
              ">
                ${product.price
                  ? money(product.price)
                  : "Prix à définir"}
              </div>

            </div>

          </div>

        </div>

      `).join("")}

    </div>

  `;

}


/* =========================================================
   SEARCH / SORT
========================================================= */

$("searchInput").addEventListener(
  "input",
  e=>{

    searchTerm =
      e.target.value;

    renderProducts();

  }
);


$("sortSelect").addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   INITIALIZATION
========================================================= */

renderCategories();
renderProducts();
renderCart();


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  e=>{

    if(e.key==="Escape"){

      closeCart();
      closeModal();

    }

  }
);


/* =========================================================
   AUTO THEME
========================================================= */

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change",()=>{

    if(
      localStorage.getItem("novaTheme")
      === "auto"
    ){

      setTheme("auto");

    }

  });


console.log(
  "🚀 NovaShop chargé avec",
  products.length,
  "produits."
);
