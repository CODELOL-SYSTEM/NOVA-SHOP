import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
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
   FALLBACK
========================================================= */

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/111827/ffffff?text=NovaShop";


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
    name:"Bureau gaming d’angle HOMCOM réversible noir",
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
    name:"HyperX QuadCast 2 USB RGB",
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
    name:"Lampe plafond hexagone nid d’abeille LED",
    category:"Éclairage RGB",
    price:91.10,
    image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  }

];


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let authMode = "login";
let selectedCategory = "Tous";
let searchValue = "";
let cart = [];
let reviewsCache = {};


/* =========================================================
   DOM
========================================================= */

const $ = selector => document.querySelector(selector);

const productsGrid = $("#productsGrid");
const categoriesEl = $("#categories");
const searchInput = $("#searchInput");
const cartBadge = $("#cartBadge");
const cartOverlay = $("#cartOverlay");
const cartItemsEl = $("#cartItems");
const cartTotalEl = $("#cartTotal");
const modalOverlay = $("#modalOverlay");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const toastContainer = $("#toastContainer");


/* =========================================================
   UTILITIES
========================================================= */

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function randomItem(array){
  return array[Math.floor(Math.random()*array.length)];
}

function money(value){

  if(value === 0){
    return "Prix à venir";
  }

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

function stars(value){

  const rounded = Math.round(value);

  return "★".repeat(rounded) +
         "☆".repeat(Math.max(0,5-rounded));
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message){

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(()=>{
    toast.classList.add("out");

    setTimeout(()=>{
      toast.remove();
    },250);

  },2600);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(title,content){

  modalTitle.textContent = title;
  modalBody.innerHTML = content;

  modalOverlay.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeModal(){

  modalOverlay.classList.remove("open");

  document.body.style.overflow = "";
}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function imageFallback(img){

  img.onerror = ()=>{

    if(img.src !== FALLBACK_IMAGE){
      img.src = FALLBACK_IMAGE;
    }

  };
}


/* =========================================================
   REVIEWS
========================================================= */

const firstNames = [
  "Alex",
  "Lucas",
  "Hugo",
  "Nathan",
  "Noah",
  "Tom",
  "Enzo",
  "Mathis",
  "Louis",
  "Léo",
  "Maxime",
  "Théo",
  "Arthur",
  "Ethan",
  "Jules"
];

const reviewTexts = [
  "Très bon produit, exactement comme prévu.",
  "Bonne qualité et livraison rapide.",
  "Produit reçu correctement, rien à signaler.",
  "Très satisfait de mon achat.",
  "Le produit correspond bien à la description.",
  "Bonne surprise pour le prix.",
  "Installation simple et produit efficace.",
  "Je recommande, tout fonctionne parfaitement.",
  "Très bonne qualité générale.",
  "Commande reçue rapidement et bien emballée."
];

function generateReviews(product){

  if(reviewsCache[product.id]){
    return reviewsCache[product.id];
  }

  const count = randomInt(850,950);
  const reviews = [];

  for(let i=0;i<count;i++){

    const rating =
      Math.random() < .70 ? 5 :
      Math.random() < .88 ? 4 :
      Math.random() < .96 ? 3 :
      Math.random() < .99 ? 2 : 1;

    reviews.push({
      name:randomItem(firstNames),
      rating,
      text:randomItem(reviewTexts)
    });
  }

  reviewsCache[product.id] = reviews;

  return reviews;
}

function reviewStats(product){

  const reviews = generateReviews(product);

  const average =
    reviews.reduce((sum,r)=>sum+r.rating,0) /
    reviews.length;

  return {
    count:reviews.length,
    average:Math.round(average*10)/10
  };
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(products.map(p=>p.category))
  ];

  categoriesEl.innerHTML = categories.map(category=>`

    <button
      class="category-btn ${selectedCategory === category ? "active" : ""}"
      data-category="${escapeHtml(category)}"
    >
      ${escapeHtml(category)}
    </button>

  `).join("");

  categoriesEl.querySelectorAll(".category-btn")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        selectedCategory =
          button.dataset.category;

        renderCategories();
        renderProducts();

      });

    });
}


/* =========================================================
   FILTER
========================================================= */

function getFilteredProducts(){

  const queryValue =
    searchValue.trim().toLowerCase();

  return products.filter(product=>{

    const categoryMatch =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;

    const searchMatch =
      !queryValue ||
      product.name.toLowerCase().includes(queryValue) ||
      product.category.toLowerCase().includes(queryValue);

    return categoryMatch && searchMatch;
  });
}


/* =========================================================
   PRODUCT CARDS
========================================================= */

function renderProducts(){

  const filtered = getFilteredProducts();

  $("#productCount").textContent =
    `${filtered.length} produit${filtered.length > 1 ? "s" : ""}`;

  if(filtered.length === 0){

    productsGrid.innerHTML = `
      <div class="empty">
        Aucun produit trouvé.
      </div>
    `;

    return;
  }

  productsGrid.innerHTML = filtered.map(product=>{

    const stats = reviewStats(product);

    return `

      <article
        class="product-card"
        data-product-id="${product.id}"
      >

        <div class="product-image-wrap">

          <span class="product-category">
            ${escapeHtml(product.category)}
          </span>

          <img
            class="product-image"
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          >

        </div>

        <div class="product-content">

          <div class="product-name">
            ${escapeHtml(product.name)}
          </div>

          <div class="product-rating">

            <span>${stars(stats.average)}</span>

            <span>
              ${stats.average}/5
            </span>

            <span class="review-count">
              (${stats.count})
            </span>

          </div>

          <button
            class="reviews-btn"
            data-review="${product.id}"
          >
            💬 Voir les avis
          </button>

          <div class="product-bottom">

            <div class="price">
              ${money(product.price)}
            </div>

            <button
              class="add-cart-btn"
              data-add="${product.id}"
              title="Ajouter au panier"
              ${product.price === 0 ? "disabled" : ""}
            >
              🛒
            </button>

          </div>

        </div>

      </article>

    `;

  }).join("");


  productsGrid
    .querySelectorAll("[data-add]")
    .forEach(button=>{

      button.addEventListener("click",event=>{

        const product =
          products.find(
            p=>p.id === button.dataset.add
          );

        if(product){
          addToCart(product,event,button);
        }

      });

    });


  productsGrid
    .querySelectorAll("[data-review]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        const product =
          products.find(
            p=>p.id === button.dataset.review
          );

        if(product){
          openReviews(product);
        }

      });

    });


  productsGrid
    .querySelectorAll(".product-image")
    .forEach(imageFallback);
}


/* =========================================================
   PRODUCT -> CART ANIMATION
========================================================= */

function flyProductToCart(product,event,button){

  const card =
    button.closest(".product-card");

  const image =
    card?.querySelector(".product-image");

  const cartButton =
    $("#cartBtn");

  if(!image || !cartButton){
    return;
  }

  const imageRect =
    image.getBoundingClientRect();

  const cartRect =
    cartButton.getBoundingClientRect();

  const flying =
    document.createElement("img");

  flying.className = "flying-product";

  flying.src = image.currentSrc || image.src;

  flying.style.left =
    `${imageRect.left + imageRect.width/2 - 27}px`;

  flying.style.top =
    `${imageRect.top + imageRect.height/2 - 27}px`;

  flying.style.transform =
    "scale(1)";

  document.body.appendChild(flying);

  requestAnimationFrame(()=>{

    flying.style.left =
      `${cartRect.left + cartRect.width/2 - 10}px`;

    flying.style.top =
      `${cartRect.top + cartRect.height/2 - 10}px`;

    flying.style.width = "20px";
    flying.style.height = "20px";
    flying.style.opacity = ".25";
    flying.style.transform = "scale(.7)";

  });

  setTimeout(()=>{

    flying.remove();

    cartButton.animate(
      [
        {transform:"scale(1)"},
        {transform:"scale(.96)"},
        {transform:"scale(1)"}
      ],
      {
        duration:260,
        easing:"cubic-bezier(.2,.8,.2,1)"
      }
    );

  },500);
}


/* =========================================================
   CART
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

    if(Array.isArray(saved)){
      cart = saved;
    }

  }catch{

    cart = [];
  }

  renderCart();
}

function getCartQuantity(){

  return cart.reduce(
    (total,item)=>total + item.quantity,
    0
  );
}

function getCartTotal(){

  return cart.reduce(
    (total,item)=>
      total + item.price * item.quantity,
    0
  );
}

function updateCartBadge(animate=true){

  const quantity = getCartQuantity();

  cartBadge.textContent = quantity;

  if(animate){

    cartBadge.classList.remove("pop");

    void cartBadge.offsetWidth;

    cartBadge.classList.add("pop");
  }
}

function addToCart(product,event,button){

  if(product.price === 0){

    showToast("Le prix de ce produit n'est pas encore disponible.");

    return;
  }

  const existing =
    cart.find(item=>item.id === product.id);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      quantity:1
    });

  }

  saveCart();
  renderCart();
  updateCartBadge(true);

  button.classList.remove("added");

  void button.offsetWidth;

  button.classList.add("added");

  flyProductToCart(product,event,button);

  showToast("Produit ajouté au panier");
}

function changeQuantity(id,delta){

  const item =
    cart.find(product=>product.id === id);

  if(!item){
    return;
  }

  item.quantity += delta;

  if(item.quantity <= 0){

    cart =
      cart.filter(product=>product.id !== id);
  }

  saveCart();
  renderCart();
  updateCartBadge(false);
}

function removeFromCart(id){

  cart =
    cart.filter(product=>product.id !== id);

  saveCart();
  renderCart();
  updateCartBadge(false);

  showToast("Produit retiré du panier");
}

function renderCart(){

  updateCartBadge(false);

  if(cart.length === 0){

    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div>
          <div style="font-size:40px;margin-bottom:12px;">🛒</div>
          <strong>Votre panier est vide</strong>
          <div style="margin-top:7px;">
            Ajoutez un produit pour commencer.
          </div>
        </div>
      </div>
    `;

    cartTotalEl.textContent = money(0);

    return;
  }

  cartItemsEl.innerHTML =
    cart.map(item=>`

      <div class="cart-item">

        <img
          class="cart-item-image"
          src="${escapeHtml(item.image)}"
          alt=""
          referrerpolicy="no-referrer"
          onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
        >

        <div>

          <div class="cart-item-name">
            ${escapeHtml(item.name)}
          </div>

          <div class="cart-item-price">
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

        <div style="text-align:right;">

          <strong>
            ${money(item.price * item.quantity)}
          </strong>

          <br>

          <button
            class="remove-item"
            data-remove="${item.id}"
          >
            Supprimer
          </button>

        </div>

      </div>

    `).join("");

  cartTotalEl.textContent =
    money(getCartTotal());


  cartItemsEl
    .querySelectorAll("[data-minus]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        changeQuantity(
          button.dataset.minus,
          -1
        );

      });

    });


  cartItemsEl
    .querySelectorAll("[data-plus]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        changeQuantity(
          button.dataset.plus,
          1
        );

      });

    });


  cartItemsEl
    .querySelectorAll("[data-remove]")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        removeFromCart(
          button.dataset.remove
        );

      });

    });
}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart(){

  cartOverlay.classList.add("open");

  document.body.style.overflow = "hidden";

  renderCart();
}

function closeCart(){

  cartOverlay.classList.remove("open");

  document.body.style.overflow = "";
}


/* =========================================================
   REVIEWS MODAL
========================================================= */

function openReviews(product){

  const reviews =
    generateReviews(product);

  const stats =
    reviewStats(product);

  const visible =
    reviews.slice(0,80);

  openModal(
    `Avis • ${product.name}`,
    `

      <div style="margin-bottom:16px;">

        <div style="font-size:25px;font-weight:800;">
          ${stats.average}/5
        </div>

        <div style="color:#f7c948;margin-top:5px;">
          ${stars(stats.average)}
        </div>

        <div style="color:#738198;font-size:13px;margin-top:5px;">
          ${stats.count} avis
        </div>

      </div>

      <div class="reviews-list">

        ${visible.map(review=>`

          <div class="review">

            <div class="review-top">

              <div class="review-name">
                ${escapeHtml(review.name)}
              </div>

              <div class="review-stars">
                ${stars(review.rating)}
              </div>

            </div>

            <div class="review-text">
              ${escapeHtml(review.text)}
            </div>

          </div>

        `).join("")}

      </div>

    `
  );
}


/* =========================================================
   AUTH UI
========================================================= */

function openAuth(){

  renderAuthModal();

}

function renderAuthModal(){

  if(currentUser){

    openModal(
      "Mon compte",
      `

        <div style="text-align:center;padding:10px 0 20px;">

          <div style="font-size:42px;">
            👤
          </div>

          <div style="font-size:18px;font-weight:800;margin-top:8px;">
            ${escapeHtml(currentUser.email)}
          </div>

          <div style="color:#738198;font-size:13px;margin-top:5px;">
            Compte NovaShop connecté
          </div>

        </div>

        <button
          class="primary-btn"
          id="logoutBtn"
          style="width:100%;"
        >
          Se déconnecter
        </button>

      `
    );

    $("#logoutBtn").addEventListener("click",async()=>{

      try{

        await signOut(auth);

        closeModal();

        showToast("Déconnexion réussie");

      }catch(error){

        showToast("Erreur de déconnexion");
      }

    });

    return;
  }


  const isLogin =
    authMode === "login";


  openModal(
    isLogin ? "Connexion" : "Créer un compte",
    `

      <form
        class="form"
        id="authForm"
      >

        <label>
          Adresse e-mail
        </label>

        <input
          id="authEmail"
          type="email"
          required
          placeholder="exemple@email.com"
        >

        <label>
          Mot de passe
        </label>

        <input
          id="authPassword"
          type="password"
          required
          placeholder="Mot de passe"
        >

        <button
          class="primary-btn"
          type="submit"
        >
          ${isLogin ? "Se connecter" : "Créer mon compte"}
        </button>

      </form>

      <div class="auth-switch">

        ${
          isLogin
          ? "Pas encore de compte ?"
          : "Déjà un compte ?"
        }

        <button id="switchAuthBtn">

          ${
            isLogin
            ? "Créer un compte"
            : "Se connecter"
          }

        </button>

      </div>

    `
  );


  $("#switchAuthBtn").addEventListener(
    "click",
    ()=>{

      authMode =
        authMode === "login"
        ? "register"
        : "login";

      renderAuthModal();

    }
  );


  $("#authForm").addEventListener(
    "submit",
    async event=>{

      event.preventDefault();

      const email =
        $("#authEmail").value.trim();

      const password =
        $("#authPassword").value;


      try{

        if(authMode === "login"){

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          closeModal();

          showToast("Connexion réussie");

        }else{

          if(password.length < 6){

            showToast(
              "Le mot de passe doit contenir au moins 6 caractères."
            );

            return;
          }

          if(password.length > 30){

            showToast(
              "Le mot de passe doit contenir au maximum 30 caractères."
            );

            return;
          }

          if(!/[a-z]/.test(password)){

            showToast(
              "Ajoute au moins une lettre minuscule."
            );

            return;
          }

          if(!/[A-Z]/.test(password)){

            showToast(
              "Ajoute au moins une lettre majuscule."
            );

            return;
          }

          if(!/[0-9]/.test(password)){

            showToast(
              "Ajoute au moins un chiffre."
            );

            return;
          }


          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          closeModal();

          showToast("Compte créé avec succès");
        }

      }catch(error){

        console.error(error);

        let message =
          "Une erreur est survenue.";

        if(error.code === "auth/invalid-credential"){
          message =
            "E-mail ou mot de passe incorrect.";
        }

        if(error.code === "auth/email-already-in-use"){
          message =
            "Cette adresse e-mail est déjà utilisée.";
        }

        if(error.code === "auth/invalid-email"){
          message =
            "Adresse e-mail invalide.";
        }

        if(error.code === "auth/weak-password"){
          message =
            "Mot de passe trop faible.";
        }

        showToast(message);
      }

    }
  );
}


/* =========================================================
   ORDERS
========================================================= */

async function openOrders(){

  if(!currentUser){

    showToast(
      "Connecte-toi pour voir tes commandes."
    );

    authMode = "login";
    openAuth();

    return;
  }


  openModal(
    "Mes commandes",
    `
      <div style="text-align:center;color:#738198;">
        Chargement...
      </div>
    `
  );


  try{

    const ordersQuery =
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(ordersQuery);

    const orders =
      snapshot.docs.map(
        item=>({
          id:item.id,
          ...item.data()
        })
      );


    if(orders.length === 0){

      modalBody.innerHTML = `

        <div style="text-align:center;padding:35px 10px;color:#738198;">

          <div style="font-size:40px;">
            📦
          </div>

          <div style="margin-top:10px;">
            Aucune commande pour le moment.
          </div>

        </div>

      `;

      return;
    }


    modalBody.innerHTML = `

      <div class="orders-list">

        ${orders.map(order=>`

          <div class="order">

            <div class="order-top">

              <strong>
                Commande #${escapeHtml(order.id.slice(0,8))}
              </strong>

              <span class="order-status">
                ${escapeHtml(order.status || "Préparation")}
              </span>

            </div>

            ${
              (order.items || []).map(item=>`

                <div class="order-item">

                  <span>
                    ${escapeHtml(item.name)}
                    ×${item.quantity}
                  </span>

                  <span>
                    ${money(item.price * item.quantity)}
                  </span>

                </div>

              `).join("")
            }

            <div class="order-total">

              <span>Total</span>

              <span>
                ${money(order.total || 0)}
              </span>

            </div>

          </div>

        `).join("")}

      </div>

    `;

  }catch(error){

    console.error(error);

    modalBody.innerHTML = `

      <div style="color:#ef8b8b;">
        Impossible de charger les commandes.
      </div>

    `;
  }
}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(cart.length === 0){

    showToast(
      "Ton panier est vide."
    );

    return;
  }

  if(!currentUser){

    showToast(
      "Connecte-toi pour passer commande."
    );

    closeCart();

    authMode = "login";
    openAuth();

    return;
  }


  closeCart();


  openModal(
    "Finaliser la commande",
    `

      <form
        class="form"
        id="checkoutForm"
      >

        <label>
          Nom complet
        </label>

        <input
          id="customerName"
          required
          placeholder="Nom Prénom"
        >

        <label>
          Adresse
        </label>

        <input
          id="customerAddress"
          required
          placeholder="Adresse"
        >

        <label>
          Ville
        </label>

        <input
          id="customerCity"
          required
          placeholder="Ville"
        >

        <label>
          Code postal
        </label>

        <input
          id="customerPostal"
          required
          inputmode="numeric"
          maxlength="5"
          placeholder="59000"
        >

        <div
          style="
            margin-top:5px;
            padding:13px;
            background:#101925;
            border-radius:10px;
            display:flex;
            justify-content:space-between;
          "
        >

          <span>
            Total
          </span>

          <strong>
            ${money(getCartTotal())}
          </strong>

        </div>

        <button
          class="primary-btn"
          type="submit"
        >
          Confirmer la commande
        </button>

      </form>

    `
  );


  $("#checkoutForm").addEventListener(
    "submit",
    submitOrder
  );
}


/* =========================================================
   CREATE ORDER
========================================================= */

async function submitOrder(event){

  event.preventDefault();

  const name =
    $("#customerName").value.trim();

  const address =
    $("#customerAddress").value.trim();

  const city =
    $("#customerCity").value.trim();

  const postalCode =
    $("#customerPostal").value.trim();


  if(!/^\d{5}$/.test(postalCode)){

    showToast(
      "Le code postal doit contenir 5 chiffres."
    );

    return;
  }


  const total =
    getCartTotal();


  const delivery =
    new Date();

  delivery.setDate(
    delivery.getDate() + 5
  );


  const orderItems =
    cart.map(item=>({

      id:item.id,
      name:item.name,
      price:item.price,
      quantity:item.quantity,
      image:item.image

    }));


  try{

    await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,

        userEmail:currentUser.email,

        customerName:name,

        address,

        city,

        postalCode,

        items:orderItems,

        total,

        status:"Préparation",

        currentLocation:
          "Entrepôt NovaShop",

        destination:
          `${postalCode} ${city}`,

        deliveryDate:
          delivery.toISOString(),

        createdAt:
          serverTimestamp()

      }
    );


    cart = [];

    saveCart();
    renderCart();

    closeModal();

    showToast(
      "Commande confirmée 🎉"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de créer la commande."
    );
  }
}


/* =========================================================
   ADMIN
========================================================= */

function openAdmin(){

  if(!currentUser){

    showToast(
      "Connecte-toi avec le compte administrateur."
    );

    return;
  }


  if(
    currentUser.email.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "Accès administrateur refusé."
    );

    return;
  }


  openModal(
    "Administration NovaShop",
    `

      <div class="admin-panel">

        <div class="admin-stat">

          Produits

          <strong>
            ${products.length}
          </strong>

        </div>

        <div class="admin-stat">

          Utilisateur connecté

          <strong style="font-size:16px;">
            ${escapeHtml(currentUser.email)}
          </strong>

        </div>

        <button
          class="primary-btn"
          id="adminCodeBtn"
        >
          Vérifier le code admin
        </button>

      </div>

    `
  );


  $("#adminCodeBtn").addEventListener(
    "click",
    ()=>{

      openModal(
        "Code administrateur",
        `

          <form
            class="form"
            id="adminCodeForm"
          >

            <label>
              Code administrateur
            </label>

            <input
              id="adminCodeInput"
              type="password"
              autocomplete="off"
              required
            >

            <button
              class="primary-btn"
              type="submit"
            >
              Vérifier
            </button>

          </form>

        `
      );


      $("#adminCodeForm").addEventListener(
        "submit",
        event=>{

          event.preventDefault();

          const code =
            $("#adminCodeInput").value;

          if(code === ADMIN_CODE){

            openModal(
              "Admin • Accès validé",
              `

                <div
                  style="
                    text-align:center;
                    padding:20px 0;
                  "
                >

                  <div style="font-size:50px;">
                    👑
                  </div>

                  <h3 style="margin-top:12px;">
                    Bienvenue dans NovaShop Admin
                  </h3>

                  <p
                    style="
                      color:#7f8da1;
                      margin-top:8px;
                      line-height:1.6;
                    "
                  >
                    Le tableau de bord administrateur
                    est correctement accessible.
                  </p>

                </div>

              `
            );

          }else{

            showToast(
              "Code administrateur incorrect."
            );
          }

        }
      );

    }
  );
}


/* =========================================================
   HEADER EVENTS
========================================================= */

$("#accountBtn").addEventListener(
  "click",
  openAuth
);

$("#ordersBtn").addEventListener(
  "click",
  openOrders
);

$("#cartBtn").addEventListener(
  "click",
  openCart
);

$("#heroCartBtn").addEventListener(
  "click",
  openCart
);

$("#heroShopBtn").addEventListener(
  "click",
  ()=>{

    document
      .querySelector(".main")
      .scrollIntoView({
        behavior:"smooth"
      });

  }
);

$("#adminBtn").addEventListener(
  "click",
  openAdmin
);

$("#closeCartBtn").addEventListener(
  "click",
  closeCart
);

$("#checkoutBtn").addEventListener(
  "click",
  openCheckout
);


/* =========================================================
   CART BACKDROP
========================================================= */

cartOverlay.addEventListener(
  "click",
  event=>{

    if(event.target === cartOverlay){
      closeCart();
    }

  }
);


/* =========================================================
   MODAL CLOSE
========================================================= */

$("#modalCloseBtn").addEventListener(
  "click",
  closeModal
);

modalOverlay.addEventListener(
  "click",
  event=>{

    if(event.target === modalOverlay){
      closeModal();
    }

  }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(event.key !== "Escape"){
      return;
    }

    closeModal();
    closeCart();

  }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
  "input",
  event=>{

    searchValue =
      event.target.value;

    renderProducts();

  }
);


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser = user;

    const adminButton =
      $("#adminBtn");

    if(
      user &&
      user.email &&
      user.email.toLowerCase() ===
      ADMIN_EMAIL.toLowerCase()
    ){

      adminButton.style.display =
        "block";

    }else{

      adminButton.style.display =
        "none";

    }

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

renderCategories();

renderProducts();

loadCart();


console.log(
  `NovaShop chargé : ${products.length} produits`
);
