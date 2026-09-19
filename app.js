import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


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
getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


/* =========================================================
   CONFIG
========================================================= */

const ADMIN_CODE = "NOVA-ADMIN-2026";

const PROMOS = {
  NOVA100: {
    type: "percent",
    value: 100,
    label: "100 % offert"
  },

  NOVA20: {
    type: "percent",
    value: 20,
    label: "20 % de réduction"
  },

  NOVA10: {
    type: "percent",
    value: 10,
    label: "10 % de réduction"
  }
};


/* =========================================================
   PRODUCTS
========================================================= */

const PRODUCTS = [

{
id:"ryzen-5-9600x",
brand:"AMD",
name:"AMD Ryzen 5 9600X",
category:"Processeurs",
price:229.90,
oldPrice:249.90,
stock:18,
rating:4.8,
reviews:37,
description:"Processeur gaming moderne avec 6 cœurs et 12 threads.",
image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg"
},

{
id:"corsair-vengeance-32",
brand:"Corsair",
name:"Corsair Vengeance RGB 32GB DDR5 6000 CL38",
category:"Mémoire",
price:119.90,
oldPrice:139.90,
stock:24,
rating:4.7,
reviews:54,
description:"Kit mémoire DDR5 32 Go avec éclairage RGB.",
image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
},

{
id:"kingston-fury-32",
brand:"Kingston",
name:"Kingston Fury Beast RGB 32GB DDR5 5600 CL36",
category:"Mémoire",
price:99.90,
oldPrice:119.90,
stock:31,
rating:4.6,
reviews:41,
description:"Mémoire DDR5 RGB 32 Go pour PC gaming.",
image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg"
},

{
id:"samsung-990-1tb",
brand:"Samsung",
name:"Samsung 990 PRO 1TB",
category:"SSD",
price:109.90,
oldPrice:129.90,
stock:17,
rating:4.9,
reviews:63,
description:"SSD NVMe PCIe 4.0 haute performance.",
image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$"
},

{
id:"samsung-990-2tb",
brand:"Samsung",
name:"Samsung 990 PRO 2TB",
category:"SSD",
price:169.90,
oldPrice:199.90,
stock:13,
rating:4.9,
reviews:72,
description:"SSD NVMe 2 To avec performances PCIe 4.0.",
image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$"
},

{
id:"corsair-rm850x",
brand:"Corsair",
name:"Corsair RM850x",
category:"Alimentations",
price:139.90,
oldPrice:159.90,
stock:11,
rating:4.8,
reviews:48,
description:"Alimentation 850 W destinée aux configurations gaming puissantes.",
image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp"
},

{
id:"corsair-5000d",
brand:"Corsair",
name:"Corsair 5000D Airflow",
category:"Boîtiers",
price:159.90,
oldPrice:179.90,
stock:8,
rating:4.8,
reviews:46,
description:"Boîtier ATX orienté airflow avec façade mesh.",
image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp"
},

{
id:"arctic-liquid-360",
brand:"ARCTIC",
name:"ARCTIC Liquid Freezer III 360",
category:"Refroidissement",
price:129.90,
oldPrice:149.90,
stock:9,
rating:4.8,
reviews:29,
description:"Watercooling AIO 360 mm pour processeurs performants.",
image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
},

{
id:"odyssey-oled-g6",
brand:"Samsung",
name:"Samsung Odyssey OLED G6",
category:"Écrans",
price:699.90,
oldPrice:749.90,
stock:5,
rating:4.9,
reviews:33,
description:"Écran gaming OLED haute fréquence.",
image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
},

{
id:"logitech-tkl",
brand:"Logitech",
name:"Logitech G PRO X TKL",
category:"Claviers",
price:199.90,
oldPrice:219.90,
stock:12,
rating:4.7,
reviews:39,
description:"Clavier gaming TKL haut de gamme.",
image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
},

{
id:"superlight-2",
brand:"Logitech",
name:"Logitech G PRO X SUPERLIGHT 2",
category:"Souris",
price:159.90,
oldPrice:179.90,
stock:15,
rating:4.8,
reviews:61,
description:"Souris gaming sans fil légère et performante.",
image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
},

{
id:"elgato-wave-3",
brand:"Elgato",
name:"Elgato Wave:3",
category:"Audio",
price:139.90,
oldPrice:159.90,
stock:7,
rating:4.7,
reviews:28,
description:"Microphone USB conçu pour le streaming et la création.",
image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png"
},

{
id:"dualsense",
brand:"Sony",
name:"Sony DualSense PS5",
category:"Manettes",
price:74.90,
oldPrice:79.90,
stock:21,
rating:4.8,
reviews:84,
description:"Manette officielle PlayStation 5.",
image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
},

{
id:"rx7600",
brand:"AMD",
name:"AMD Radeon RX 7600",
category:"Cartes graphiques",
price:289.90,
oldPrice:319.90,
stock:6,
rating:4.6,
reviews:44,
description:"Carte graphique gaming Radeon avec 8 Go de mémoire.",
image:"https://cdn.idealo.com/folder/Product/202813/8/202813846/s4_produktbild_gross/gigabyte-radeon-rx-7600-gaming-oc-8g.jpg"
},

{
id:"tuf-b650",
brand:"ASUS",
name:"ASUS TUF Gaming B650-PLUS",
category:"Cartes mères",
price:189.90,
oldPrice:209.90,
stock:10,
rating:4.7,
reviews:35,
description:"Carte mère AM5 ATX pour configurations gaming.",
image:"https://media.materiel.net/r550/products/MN0005986139.jpg"
},

{
id:"b650-tomahawk",
brand:"MSI",
name:"MSI MAG B650 Tomahawk WiFi",
category:"Cartes mères",
price:219.90,
oldPrice:239.90,
stock:8,
rating:4.8,
reviews:49,
description:"Carte mère B650 avec Wi-Fi intégré.",
image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
},

{
id:"aorus-b650",
brand:"Gigabyte",
name:"Gigabyte B650 AORUS Elite AX",
category:"Cartes mères",
price:199.90,
oldPrice:219.90,
stock:9,
rating:4.7,
reviews:38,
description:"Carte mère B650 gaming avec Wi-Fi.",
image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
},

{
id:"gaming-pc-7800x3d",
brand:"NOVASHOP",
name:"PC Gamer Ryzen 7 7800X3D + RX 9070 XT + 32 Go DDR5",
category:"PC Gamer",
price:2237.65,
oldPrice:2399.90,
stock:3,
rating:4.9,
reviews:17,
description:"Configuration gaming complète haut de gamme.",
image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
},

{
id:"hyperx-cloud-2",
brand:"HyperX",
name:"HyperX Cloud II",
category:"Casques",
price:49.99,
oldPrice:59.99,
stock:20,
rating:4.6,
reviews:57,
description:"Casque gaming filaire confortable.",
image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
},

{
id:"tecurs-60",
brand:"TECURS",
name:"TECURS Clavier Gamer Mécanique 60 % AZERTY",
category:"Claviers",
price:30,
oldPrice:39.99,
stock:26,
rating:4.4,
reviews:19,
description:"Clavier mécanique compact 60 % au format AZERTY.",
image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
},

{
id:"celshading-65",
brand:"TryHard",
name:"Clavier Magnétique 65 % Celshading Noir",
category:"Claviers",
price:120.90,
oldPrice:139.90,
stock:7,
rating:4.7,
reviews:22,
description:"Clavier magnétique compact noir.",
image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
},

{
id:"ajazz-aj199",
brand:"Ajazz",
name:"Ajazz AJ199 MAX Carbon Fiber Wireless",
category:"Souris",
price:49.99,
oldPrice:59.99,
stock:14,
rating:4.6,
reviews:31,
description:"Souris sans fil légère avec finition carbone.",
image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
},

{
id:"superstrike",
brand:"Logitech",
name:"Logitech G PRO X2 SUPERSTRIKE Blanc et Noir",
category:"Souris",
price:150.99,
oldPrice:169.99,
stock:6,
rating:4.8,
reviews:14,
description:"Souris gaming haut de gamme blanc et noir.",
image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
}

];


/* =========================================================
   STATE
========================================================= */

const STORAGE = {
  cart:"novashop_cart",
  favorites:"novashop_favorites",
  reviews:"novashop_reviews",
  orders:"novashop_orders",
  users:"novashop_users",
  admin:"novashop_admin"
};

let currentUser = null;

let cart = loadJSON(STORAGE.cart, []);
let favorites = loadJSON(STORAGE.favorites, []);
let reviews = loadJSON(STORAGE.reviews, []);
let orders = loadJSON(STORAGE.orders, []);

let activeCategory = "Tous";
let searchTerm = "";
let maxPrice = Infinity;
let currentProductId = null;
let currentCheckoutTotal = 0;
let currentPromo = null;
let phoneConfirmation = null;
let recaptchaVerifier = null;


/* =========================================================
   HELPERS
========================================================= */

function $(id){
  return document.getElementById(id);
}


function loadJSON(key, fallback){
  try{
    const value = localStorage.getItem(key);
    if(!value) return fallback;

    const parsed = JSON.parse(value);

    return parsed ?? fallback;
  }catch{
    return fallback;
  }
}


function saveJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}


function euro(value){
  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(Number(value)||0);
}


function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


function stars(value){
  const rounded = Math.round(Number(value)||0);

  return "★".repeat(Math.max(0,Math.min(5,rounded))) +
         "☆".repeat(Math.max(0,5-rounded));
}


function showToast(message){
  const toast = $("toast");

  if(!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(()=>{
    toast.classList.remove("show");
  },2800);
}


function openModal(id){
  $(id)?.classList.add("show");
}


function closeModal(id){
  $(id)?.classList.remove("show");
}


function getProduct(id){
  return PRODUCTS.find(p=>p.id===id);
}


function getProductRating(product){
  const list = reviews.filter(r=>r.productId===product.id);

  if(!list.length){
    return {
      average:product.rating,
      count:product.reviews
    };
  }

  const total = list.reduce((sum,r)=>sum+Number(r.rating),0);

  return {
    average:total/list.length,
    count:product.reviews + list.length
  };
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

  const categories = [
    "Tous",
    ...new Set(PRODUCTS.map(p=>p.category))
  ];

  const nav = $("categoryNav");
  const filters = $("filterCategories");

  nav.innerHTML = categories.map(category=>`
    <button
      class="${activeCategory===category ? "active":""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");

  filters.innerHTML = categories.map(category=>`
    <button
      class="filter-category ${activeCategory===category ? "active":""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}


/* =========================================================
   PRODUCTS
========================================================= */

function getVisibleProducts(){

  let list = [...PRODUCTS];

  if(activeCategory!=="Tous"){
    list = list.filter(p=>p.category===activeCategory);
  }

  if(searchTerm.trim()){
    const q = searchTerm.toLowerCase();

    list = list.filter(p=>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if(Number.isFinite(maxPrice)){
    list = list.filter(p=>p.price<=maxPrice);
  }

  const sort = $("sortSelect")?.value || "relevance";

  if(sort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort==="nameAsc"){
    list.sort((a,b)=>a.name.localeCompare(b.name,"fr"));
  }

  if(sort==="rating"){
    list.sort((a,b)=>getProductRating(b).average-getProductRating(a).average);
  }

  return list;
}


function productCard(product){

  const rating = getProductRating(product);
  const favorite = favorites.includes(product.id);

  return `
    <article class="product">

      <div class="product-image" id="image-${escapeHTML(product.id)}">

        <div class="badges">

          ${
            product.oldPrice > product.price
            ? `<span class="badge blue">PROMO</span>`
            : ""
          }

          ${
            product.stock <= 5
            ? `<span class="badge">STOCK LIMITÉ</span>`
            : ""
          }

        </div>

        <button
          class="like ${favorite ? "active":""}"
          data-action="favorite"
          data-id="${escapeHTML(product.id)}"
          title="Favori"
        >
          ${favorite ? "♥":"♡"}
        </button>

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="imageFailed('${escapeHTML(product.id)}',this)"
        >

        <div class="image-error">
          <span>🖼️</span>
          <span>Image indisponible</span>
        </div>

      </div>

      <div class="product-body">

        <div class="product-brand">
          ${escapeHTML(product.brand)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">

          <span class="stars">
            ${stars(rating.average)}
          </span>

          <span>
            ${rating.average.toFixed(1)}
          </span>

          <span class="rating-count">
            (${rating.count})
          </span>

        </div>

        <div class="product-price">

          ${euro(product.price)}

          ${
            product.oldPrice > product.price
            ? `<span class="old-price">${euro(product.oldPrice)}</span>`
            : ""
          }

        </div>

        <div class="stock">
          ${product.stock > 0
            ? `✓ ${product.stock} disponible${product.stock>1?"s":""}`
            : "Rupture de stock"}
        </div>

        <div class="product-actions">

          <button
            class="view-btn"
            data-action="view"
            data-id="${escapeHTML(product.id)}"
          >
            Voir
          </button>

          <button
            class="add-btn"
            data-action="add"
            data-id="${escapeHTML(product.id)}"
            ${product.stock<=0 ? "disabled":""}
          >
            🛒 Ajouter
          </button>

        </div>

      </div>

    </article>
  `;
}


window.imageFailed = function(id,img){

  const container = $("image-"+id);

  if(!container) return;

  img.style.display = "none";
  container.classList.add("failed");
};


function renderProducts(){

  const grid = $("productsGrid");
  const empty = $("emptyState");
  const result = $("resultCount");

  const list = getVisibleProducts();

  result.textContent =
    `${list.length} produit${list.length>1?"s":""}`;

  if(!list.length){

    grid.innerHTML = "";
    empty.classList.remove("hidden");

    return;
  }

  empty.classList.add("hidden");

  grid.innerHTML = list.map(productCard).join("");
}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){
    favorites = favorites.filter(x=>x!==id);
    showToast("Retiré des favoris");
  }else{
    favorites.push(id);
    showToast("Ajouté aux favoris ❤️");
  }

  saveJSON(STORAGE.favorites,favorites);

  renderProducts();

  if(currentProductId===id){
    renderProductDetail(id);
  }
}


/* =========================================================
   CART
========================================================= */

function addToCart(id){

  const product = getProduct(id);

  if(!product) return;

  if(product.stock<=0){
    showToast("Produit en rupture de stock");
    return;
  }

  const existing = cart.find(item=>item.id===id);

  if(existing){
    if(existing.qty>=product.stock){
      showToast("Stock maximum atteint");
      return;
    }

    existing.qty++;
  }else{
    cart.push({
      id,
      qty:1
    });
  }

  saveJSON(STORAGE.cart,cart);

  renderCart();

  showToast("Produit ajouté au panier 🛒");
}


function changeQuantity(id,delta){

  const item = cart.find(x=>x.id===id);

  if(!item) return;

  const product = getProduct(id);

  item.qty += delta;

  if(item.qty<=0){
    cart = cart.filter(x=>x.id!==id);
  }

  if(product && item.qty>product.stock){
    item.qty=product.stock;
  }

  saveJSON(STORAGE.cart,cart);

  renderCart();
}


function removeFromCart(id){

  cart = cart.filter(x=>x.id!==id);

  saveJSON(STORAGE.cart,cart);

  renderCart();
}


function cartTotal(){

  return cart.reduce((sum,item)=>{

    const product = getProduct(item.id);

    return sum +
      (product ? product.price * item.qty : 0);

  },0);
}


function cartQuantity(){

  return cart.reduce((sum,item)=>sum+item.qty,0);
}


function renderCart(){

  $("cartCount").textContent = cartQuantity();

  const container = $("cartItems");

  if(!cart.length){

    container.innerHTML = `
      <div class="empty">
        <strong>Votre panier est vide</strong>
        Ajoutez un produit pour commencer.
      </div>
    `;

    $("cartTotal").textContent = euro(0);

    return;
  }

  container.innerHTML = cart.map(item=>{

    const product = getProduct(item.id);

    if(!product) return "";

    return `
      <div class="cart-item">

        <div class="cart-item-image">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            referrerpolicy="no-referrer"
          >

        </div>

        <div>

          <div class="cart-item-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="cart-item-price">
            ${euro(product.price * item.qty)}
          </div>

          <div class="qty">

            <button
              data-cart-action="minus"
              data-id="${escapeHTML(product.id)}"
            >
              −
            </button>

            <strong>${item.qty}</strong>

            <button
              data-cart-action="plus"
              data-id="${escapeHTML(product.id)}"
            >
              +
            </button>

          </div>

          <button
            class="remove"
            data-cart-action="remove"
            data-id="${escapeHTML(product.id)}"
          >
            Supprimer
          </button>

        </div>

      </div>
    `;

  }).join("");

  $("cartTotal").textContent = euro(cartTotal());
}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function renderProductDetail(id){

  const product = getProduct(id);

  if(!product) return;

  currentProductId=id;

  const rating = getProductRating(product);

  const productReviews =
    reviews.filter(r=>r.productId===id);

  const userAlreadyReviewed =
    currentUser &&
    productReviews.some(
      r=>r.userId===currentUser.uid
    );

  $("productDetail").innerHTML = `

    <div class="product-detail">

      <div>

        <div class="detail-image">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            referrerpolicy="no-referrer"
          >

        </div>

      </div>

      <div>

        <div class="detail-brand">
          ${escapeHTML(product.brand)}
        </div>

        <div class="detail-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">

          <span class="stars">
            ${stars(rating.average)}
          </span>

          <strong>${rating.average.toFixed(1)}</strong>

          <span class="rating-count">
            (${rating.count} avis)
          </span>

        </div>

        <div class="detail-price">
          ${euro(product.price)}
        </div>

        <div class="detail-stock">
          ✓ ${product.stock} disponible${product.stock>1?"s":""}
        </div>

        <div class="detail-description">
          ${escapeHTML(product.description)}
        </div>

        <button
          class="primary"
          data-detail-add="${escapeHTML(product.id)}"
        >
          🛒 Ajouter au panier
        </button>

        <div class="review-box">

          <h3>Avis clients</h3>

          ${
            productReviews.length
            ?
            productReviews.map(review=>`

              <div class="review">

                <div class="review-head">

                  <span>
                    ${escapeHTML(review.name)}
                    ·
                    <span class="stars">
                      ${stars(review.rating)}
                    </span>
                  </span>

                  <span class="review-date">
                    ${escapeHTML(review.date)}
                  </span>

                </div>

                <div class="review-text">
                  ${escapeHTML(review.comment)}
                </div>

              </div>

            `).join("")
            :
            `<div class="auth-note">Aucun avis ajouté pour le moment.</div>`
          }

          <div style="margin-top:20px">

            <h3>Donner votre avis</h3>

            ${
              !currentUser
              ?
              `<div class="auth-note">
                Connecte-toi pour laisser un avis.
              </div>`
              :
              userAlreadyReviewed
              ?
              `<div class="auth-note">
                Tu as déjà laissé un avis sur ce produit.
              </div>`
              :
              `

              <form class="form" id="reviewForm">

                <div class="field">

                  <label>Note</label>

                  <select id="reviewRating" required>

                    <option value="">Choisir</option>
                    <option value="5">★★★★★ 5/5</option>
                    <option value="4">★★★★☆ 4/5</option>
                    <option value="3">★★★☆☆ 3/5</option>
                    <option value="2">★★☆☆☆ 2/5</option>
                    <option value="1">★☆☆☆☆ 1/5</option>

                  </select>

                </div>

                <div class="field">

                  <label>Commentaire</label>

                  <textarea
                    id="reviewComment"
                    required
                    maxlength="500"
                    placeholder="Ton avis..."
                  ></textarea>

                </div>

                <button class="primary">
                  Publier mon avis
                </button>

              </form>

              `
            }

          </div>

        </div>

      </div>

    </div>
  `;

  openModal("productModal");
}


/* =========================================================
   AUTH TABS
========================================================= */

function switchAuthTab(tab){

  document
    .querySelectorAll(".auth-tab")
    .forEach(button=>{
      button.classList.toggle(
        "active",
        button.dataset.authTab===tab
      );
    });

  document
    .querySelectorAll(".auth-panel")
    .forEach(panel=>{
      panel.classList.remove("active");
    });

  const target = {
    google:"authGoogle",
    email:"authEmail",
    phone:"authPhone"
  }[tab];

  $(target)?.classList.add("active");

  if(tab==="phone"){
    setupRecaptcha();
  }
}


/* =========================================================
   GOOGLE AUTH
========================================================= */

async function loginGoogle(){

  try{

    const result =
      await signInWithPopup(auth,googleProvider);

    if(result.user){

      showToast(
        `Bienvenue ${result.user.displayName || "sur NOVASHOP"} 👋`
      );

      closeModal("authModal");
    }

  }catch(error){

    console.error(error);

    if(error.code==="auth/popup-closed-by-user"){
      showToast("Connexion Google annulée");
      return;
    }

    showToast(
      "Connexion Google impossible"
    );
  }
}


/* =========================================================
   EMAIL AUTH
========================================================= */

async function loginEmail(){

  const email = $("emailInput").value.trim();
  const password = $("passwordInput").value;

  if(!email || !password){

    showToast("Remplis l'e-mail et le mot de passe");

    return;
  }

  try{

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    showToast(
      `Bienvenue ${result.user.email} 👋`
    );

    closeModal("authModal");

  }catch(error){

    console.error(error);

    if(
      error.code==="auth/invalid-credential" ||
      error.code==="auth/user-not-found" ||
      error.code==="auth/wrong-password"
    ){

      showToast(
        "E-mail ou mot de passe incorrect"
      );

      return;
    }

    showToast(
      "Impossible de se connecter"
    );
  }
}


async function signupEmail(){

  const email = $("emailInput").value.trim();
  const password = $("passwordInput").value;

  if(!email || !password){

    showToast("Remplis l'e-mail et le mot de passe");

    return;
  }

  if(password.length<6){

    showToast(
      "Le mot de passe doit contenir au moins 6 caractères"
    );

    return;
  }

  try{

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    showToast(
      `Compte créé : ${result.user.email} 🎉`
    );

    closeModal("authModal");

  }catch(error){

    console.error(error);

    if(error.code==="auth/email-already-in-use"){

      showToast(
        "Cet e-mail possède déjà un compte"
      );

      return;
    }

    if(error.code==="auth/invalid-email"){

      showToast(
        "Adresse e-mail invalide"
      );

      return;
    }

    showToast(
      "Impossible de créer le compte"
    );
  }
}


/* =========================================================
   PHONE AUTH
========================================================= */

function setupRecaptcha(){

  if(recaptchaVerifier) return;

  try{

    recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size:"normal",

          callback:()=>{
            showToast("Vérification réussie ✓");
          },

          "expired-callback":()=>{
            showToast(
              "Le reCAPTCHA a expiré"
            );
          }
        }
      );

    recaptchaVerifier.render();

  }catch(error){

    console.error(error);

  }
}


async function sendPhoneCode(){

  const phone =
    $("phoneInput").value.trim();

  if(!phone){

    showToast(
      "Entre ton numéro de téléphone"
    );

    return;
  }

  try{

    setupRecaptcha();

    phoneConfirmation =
      await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );

    $("phoneCodeArea")
      .classList.remove("hidden");

    $("confirmPhoneCode")
      .classList.remove("hidden");

    showToast(
      "Code SMS envoyé 📱"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Impossible d'envoyer le SMS"
    );

    if(recaptchaVerifier){

      try{
        recaptchaVerifier.clear();
      }catch{}

      recaptchaVerifier=null;
    }
  }
}


async function confirmPhoneCode(){

  const code =
    $("phoneCodeInput").value.trim();

  if(!phoneConfirmation){

    showToast(
      "Demande d'abord un code SMS"
    );

    return;
  }

  if(!code){

    showToast(
      "Entre le code reçu"
    );

    return;
  }

  try{

    const result =
      await phoneConfirmation.confirm(code);

    showToast(
      `Téléphone connecté : ${result.user.phoneNumber} 📱`
    );

    closeModal("authModal");

  }catch(error){

    console.error(error);

    showToast(
      "Code SMS incorrect"
    );
  }
}


/* =========================================================
   FIREBASE USER STATE
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser=user || null;

  registerUser(user);

  updateAuthUI();

});


function registerUser(user){

  if(!user) return;

  const users =
    loadJSON(STORAGE.users,[]);

  const exists =
    users.some(u=>u.uid===user.uid);

  if(!exists){

    users.push({
      uid:user.uid,
      name:user.displayName || "Utilisateur",
      email:user.email || "",
      phone:user.phoneNumber || "",
      createdAt:new Date().toISOString()
    });

    saveJSON(STORAGE.users,users);
  }
}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return Boolean(
    localStorage.getItem(STORAGE.admin)==="true"
  );
}


function updateAuthUI(){

  const accountButton=$("accountButton");
  const ordersButton=$("ordersButton");
  const adminButton=$("adminButton");

  if(currentUser){

    const name =
      currentUser.displayName ||
      currentUser.email ||
      currentUser.phoneNumber ||
      "Compte";

    accountButton.textContent =
      `👤 ${
        name.length>18
        ? name.slice(0,18)+"…"
        : name
      }`;

    ordersButton.classList.remove("hidden");

    if(isAdmin()){
      adminButton.classList.remove("hidden");
    }else{
      adminButton.classList.add("hidden");
    }

  }else{

    accountButton.textContent =
      "👤 Connexion";

    ordersButton.classList.add("hidden");
    adminButton.classList.add("hidden");
  }
}


/* =========================================================
   ACCOUNT
========================================================= */

function openAccount(){

  if(!currentUser){

    openModal("authModal");

    return;
  }

  const name =
    currentUser.displayName ||
    "Utilisateur";

  $("profileName").textContent=name;

  $("profileEmail").textContent =
    currentUser.email ||
    currentUser.phoneNumber ||
    "Compte Firebase";

  openModal("accountModal");
}


/* =========================================================
   ORDERS
========================================================= */

function openOrders(){

  if(!currentUser){

    openModal("authModal");

    return;
  }

  renderOrders();

  openModal("ordersModal");
}


function getUserOrders(){

  if(!currentUser) return [];

  return orders
    .filter(order=>order.userId===currentUser.uid)
    .sort((a,b)=>
      new Date(b.date)-new Date(a.date)
    );
}


function renderOrders(){

  const list=$("ordersList");

  const userOrders=getUserOrders();

  if(!userOrders.length){

    list.innerHTML=`
      <div class="empty">
        <strong>Aucune commande</strong>
        Tes commandes apparaîtront ici.
      </div>
    `;

    return;
  }

  list.innerHTML =
    userOrders.map(order=>`

      <div class="order">

        <div class="order-top">

          <div>

            <div class="order-number">
              ${escapeHTML(order.number)}
            </div>

            <div class="order-date">
              ${escapeHTML(
                new Date(order.date).toLocaleString("fr-FR")
              )}
            </div>

          </div>

          <strong>
            ${euro(order.total)}
          </strong>

        </div>

        <div class="order-status">
          ${escapeHTML(order.status)}
        </div>

        <div style="margin-top:12px">

          ${order.items.map(item=>`
            <div style="
              font-size:11px;
              padding:4px 0;
              color:#64748b;
            ">
              ${escapeHTML(item.name)}
              × ${item.qty}
            </div>
          `).join("")}

        </div>

        <button
          class="secondary-btn"
          style="margin-top:12px"
          data-invoice="${escapeHTML(order.id)}"
        >
          📄 Voir la facture
        </button>

      </div>

    `).join("");
}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout(){

  if(!cart.length){

    showToast(
      "Ton panier est vide"
    );

    return;
  }

  if(!currentUser){

    closeCart();

    openModal("authModal");

    showToast(
      "Connecte-toi pour commander"
    );

    return;
  }

  currentPromo=null;
  currentCheckoutTotal=cartTotal();

  $("promoCode").value="";
  $("promoResult").textContent="";

  $("payButton").disabled=true;

  renderCheckout();

  closeCart();

  openModal("checkoutModal");
}


function renderCheckout(){

  const container=$("checkoutItems");

  container.innerHTML=cart.map(item=>{

    const product=getProduct(item.id);

    if(!product) return "";

    return `
      <div class="summary-item">

        <span>
          ${escapeHTML(product.name)}
          ×${item.qty}
        </span>

        <strong>
          ${euro(product.price*item.qty)}
        </strong>

      </div>
    `;

  }).join("");

  currentCheckoutTotal=cartTotal();

  $("checkoutTotal").textContent =
    euro(currentCheckoutTotal);

  updatePayButton();
}


function applyPromo(){

  const code =
    $("promoCode").value
      .trim()
      .toUpperCase();

  const promo=PROMOS[code];

  if(!promo){

    currentPromo=null;
    currentCheckoutTotal=cartTotal();

    $("promoResult").textContent =
      "Code invalide.";

    $("promoResult").style.color =
      "#dc2626";

    $("payButton").disabled=true;

    $("checkoutTotal").textContent =
      euro(currentCheckoutTotal);

    updatePayButton();

    return;
  }

  currentPromo={
    code,
    ...promo
  };

  const subtotal=cartTotal();

  const discount =
    subtotal * promo.value / 100;

  currentCheckoutTotal =
    Math.max(0,subtotal-discount);

  $("promoResult").textContent =
    `${promo.label} • Réduction ${euro(discount)}`;

  $("promoResult").style.color =
    "#16a34a";

  $("checkoutTotal").textContent =
    euro(currentCheckoutTotal);

  updatePayButton();

  showToast(
    `Code ${code} appliqué ✓`
  );
}


function updatePayButton(){

  const button=$("payButton");

  const total=currentCheckoutTotal;

  if(
    currentPromo &&
    currentPromo.value===100
  ){

    button.disabled=false;

    button.textContent =
      `🔒 Payer ${euro(total)} avec le code promotionnel`;

  }else{

    button.disabled=true;

    button.textContent =
      "🔒 Code NOVA100 requis pour la démo";
  }
}


/* =========================================================
   CREATE ORDER
========================================================= */

function createOrder(event){

  event.preventDefault();

  if(!currentUser){

    showToast(
      "Connecte-toi avant de commander"
    );

    return;
  }

  if(
    !currentPromo ||
    currentPromo.value!==100
  ){

    showToast(
      "Utilise un code promotionnel 100 %"
    );

    return;
  }

  const fullName=$("fullName").value.trim();
  const address=$("address").value.trim();
  const postalCode=$("postalCode").value.trim();
  const city=$("city").value.trim();
  const country=$("country").value.trim();

  if(
    !fullName ||
    !address ||
    !postalCode ||
    !city ||
    !country
  ){

    showToast(
      "Remplis toutes les informations"
    );

    return;
  }

  const orderId =
    "order_" +
    Date.now() +
    "_" +
    Math.random()
      .toString(36)
      .slice(2,8);

  const orderNumber =
    "NOVA-" +
    new Date().getFullYear() +
    "-" +
    Math.random()
      .toString(36)
      .slice(2,8)
      .toUpperCase();

  const subtotal=cartTotal();

  const discount=subtotal;

  const order={
    id:orderId,
    number:orderNumber,
    userId:currentUser.uid,

    customer:{
      name:fullName,
      email:currentUser.email || "",
      phone:currentUser.phoneNumber || ""
    },

    address:{
      address,
      postalCode,
      city,
      country
    },

    warehouse:"Entrepôt",

    items:cart.map(item=>{

      const product=getProduct(item.id);

      return {
        id:product.id,
        name:product.name,
        price:product.price,
        qty:item.qty
      };

    }),

    subtotal,
    discount,
    total:0,

    promoCode:currentPromo.code,

    paymentMethod:"Code promotionnel",

    status:"Commande confirmée",

    date:new Date().toISOString()
  };

  orders.push(order);

  saveJSON(STORAGE.orders,orders);

  cart=[];

  saveJSON(STORAGE.cart,cart);

  renderCart();

  closeModal("checkoutModal");

  showToast(
    "Commande créée avec succès 🎉"
  );

  setTimeout(()=>{
    openInvoice(order.id);
  },300);
}


/* =========================================================
   INVOICE
========================================================= */

function openInvoice(orderId){

  const order =
    orders.find(o=>o.id===orderId);

  if(!order) return;

  $("printArea").innerHTML=`

    <div class="invoice">

      <div class="invoice-header">

        <div>

          <div class="invoice-logo">
            NOVASHOP
          </div>

          <div style="
            font-size:11px;
            color:#64748b;
            margin-top:5px;
          ">
            Marketplace gaming
          </div>

        </div>

        <div class="invoice-meta">

          <strong>FACTURE</strong><br>

          ${escapeHTML(order.number)}<br>

          ${new Date(order.date).toLocaleString("fr-FR")}

        </div>

      </div>


      <div class="invoice-section">

        <h3>Client</h3>

        <div style="font-size:12px;line-height:1.7">

          <strong>
            ${escapeHTML(order.customer.name)}
          </strong><br>

          ${escapeHTML(order.customer.email || "")}<br>

          ${escapeHTML(order.customer.phone || "")}

        </div>

      </div>


      <div class="invoice-section">

        <h3>Adresse de livraison</h3>

        <div style="font-size:12px;line-height:1.7">

          ${escapeHTML(order.address.address)}<br>

          ${escapeHTML(order.address.postalCode)}
          ${escapeHTML(order.address.city)}<br>

          ${escapeHTML(order.address.country)}

        </div>

      </div>


      <div class="invoice-section">

        <h3>Articles</h3>

        <table class="invoice-table">

          <thead>

            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Total</th>
            </tr>

          </thead>

          <tbody>

            ${order.items.map(item=>`

              <tr>

                <td>
                  ${escapeHTML(item.name)}
                </td>

                <td>
                  ${item.qty}
                </td>

                <td>
                  ${euro(item.price)}
                </td>

                <td>
                  ${euro(item.price*item.qty)}
                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      </div>


      <div class="invoice-total">

        <div>
          <span>Sous-total</span>
          <strong>${euro(order.subtotal)}</strong>
        </div>

        <div>
          <span>Réduction</span>
          <strong>-${euro(order.discount)}</strong>
        </div>

        <div>
          <span>Code</span>
          <strong>${escapeHTML(order.promoCode)}</strong>
        </div>

        <div class="grand">
          <span>Total payé</span>
          <strong>0,00 €</strong>
        </div>

      </div>


      <div class="invoice-section">

        <h3>Paiement</h3>

        <div style="font-size:12px">
          ${escapeHTML(order.paymentMethod)}
        </div>

      </div>


      <div class="invoice-footer">

        NOVASHOP • Entrepôt<br>

        Ceci est une facture générée par la démonstration NOVASHOP.

      </div>

    </div>

  `;

  openModal("invoiceModal");
}


/* =========================================================
   ADMIN
========================================================= */

function openAdmin(){

  if(!isAdmin()){

    showToast(
      "Accès administrateur requis"
    );

    return;
  }

  renderAdmin();

  openModal("dashboardModal");
}


function renderAdmin(){

  const catalogValue =
    PRODUCTS.reduce(
      (sum,p)=>sum+p.price*p.stock,
      0
    );

  const freeOrders =
    orders.filter(o=>o.total===0).length;

  $("adminOrders").textContent =
    orders.length;

  $("adminFreeOrders").textContent =
    freeOrders;

  $("adminCatalogValue").textContent =
    euro(catalogValue);

  $("adminUsers").textContent =
    loadJSON(STORAGE.users,[]).length;


  $("adminPromos").innerHTML =
    Object.entries(PROMOS).map(([code,promo])=>`

      <div class="promo-code">

        <span class="code">
          ${escapeHTML(code)}
        </span>

        <span>
          ${escapeHTML(promo.label)}
        </span>

      </div>

    `).join("");


  const adminOrders=$("adminOrderList");

  if(!orders.length){

    adminOrders.innerHTML =
      `<div class="auth-note">Aucune commande.</div>`;

  }else{

    adminOrders.innerHTML =
      [...orders]
      .sort((a,b)=>
        new Date(b.date)-new Date(a.date)
      )
      .slice(0,15)
      .map(order=>`

        <div class="order">

          <div class="order-top">

            <div>

              <div class="order-number">
                ${escapeHTML(order.number)}
              </div>

              <div class="order-date">
                ${escapeHTML(order.customer.email)}
              </div>

            </div>

            <strong>
              ${euro(order.total)}
            </strong>

          </div>

          <div class="order-status">
            ${escapeHTML(order.status)}
          </div>

        </div>

      `).join("");
  }
}


function activateAdminCode(){

  const code=prompt(
    "Code administrateur NOVASHOP :"
  );

  if(code===ADMIN_CODE){

    localStorage.setItem(
      STORAGE.admin,
      "true"
    );

    updateAuthUI();

    showToast(
      "Mode administrateur activé ⚙️"
    );

  }else if(code!==null){

    showToast(
      "Code administrateur incorrect"
    );
  }
}


/* =========================================================
   RESET
========================================================= */

function resetDemo(){

  const confirmed =
    confirm(
      "Réinitialiser le panier, favoris, avis et commandes ?"
    );

  if(!confirmed) return;

  localStorage.removeItem(STORAGE.cart);
  localStorage.removeItem(STORAGE.favorites);
  localStorage.removeItem(STORAGE.reviews);
  localStorage.removeItem(STORAGE.orders);

  cart=[];
  favorites=[];
  reviews=[];
  orders=[];

  renderProducts();
  renderCart();

  showToast(
    "Données de démonstration réinitialisées"
  );

  renderAdmin();
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

$("searchForm").addEventListener(
  "submit",
  event=>{
    event.preventDefault();

    searchTerm =
      $("searchInput").value.trim();

    renderProducts();
  }
);


$("sortSelect").addEventListener(
  "change",
  renderProducts
);


$("maxPrice").addEventListener(
  "input",
  event=>{

    const value=
      Number(event.target.value);

    maxPrice =
      value>0
      ? value
      : Infinity;

    renderProducts();
  }
);


$("categoryNav").addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-category]");

    if(!button) return;

    activeCategory =
      button.dataset.category;

    renderCategories();
    renderProducts();
  }
);


$("filterCategories").addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-category]");

    if(!button) return;

    activeCategory =
      button.dataset.category;

    renderCategories();
    renderProducts();
  }
);


$("productsGrid").addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-action]");

    if(!button) return;

    const action =
      button.dataset.action;

    const id =
      button.dataset.id;

    if(action==="favorite"){
      toggleFavorite(id);
    }

    if(action==="view"){
      renderProductDetail(id);
    }

    if(action==="add"){
      addToCart(id);
    }
  }
);


$("productDetail").addEventListener(
  "click",
  event=>{

    const add =
      event.target.closest("[data-detail-add]");

    if(add){
      addToCart(add.dataset.detailAdd);
    }
  }
);


$("productDetail").addEventListener(
  "submit",
  event=>{

    if(event.target.id!=="reviewForm") return;

    event.preventDefault();

    if(!currentUser) return;

    const rating=
      Number($("reviewRating").value);

    const comment=
      $("reviewComment").value.trim();

    if(!rating || !comment){

      showToast(
        "Remplis la note et le commentaire"
      );

      return;
    }

    const exists =
      reviews.some(
        r=>
          r.productId===currentProductId &&
          r.userId===currentUser.uid
      );

    if(exists){

      showToast(
        "Tu as déjà noté ce produit"
      );

      return;
    }

    const name =
      currentUser.displayName ||
      currentUser.email ||
      "Utilisateur";

    const shortName =
      name.slice(0,3);

    reviews.push({

      productId:currentProductId,

      userId:currentUser.uid,

      name:
        shortName +
        "***",

      rating,

      comment,

      date:
        new Date()
          .toLocaleDateString("fr-FR")

    });

    saveJSON(STORAGE.reviews,reviews);

    showToast(
      "Avis publié ⭐"
    );

    renderProductDetail(currentProductId);

    renderProducts();
  }
);


$("cartButton").addEventListener(
  "click",
  ()=>{
    $("overlay").classList.add("show");
    $("cartDrawer").classList.add("open");
  }
);


$("closeCart").addEventListener(
  "click",
  closeCart
);


function closeCart(){

  $("overlay").classList.remove("show");
  $("cartDrawer").classList.remove("open");
}


$("overlay").addEventListener(
  "click",
  closeCart
);


$("cartItems").addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-cart-action]");

    if(!button) return;

    const id =
      button.dataset.id;

    const action =
      button.dataset.cartAction;

    if(action==="plus"){
      changeQuantity(id,1);
    }

    if(action==="minus"){
      changeQuantity(id,-1);
    }

    if(action==="remove"){
      removeFromCart(id);
    }
  }
);


$("checkoutButton").addEventListener(
  "click",
  openCheckout
);


$("accountButton").addEventListener(
  "click",
  openAccount
);


$("ordersButton").addEventListener(
  "click",
  openOrders
);


$("accountOrders").addEventListener(
  "click",
  ()=>{
    closeModal("accountModal");
    openOrders();
  }
);


$("logoutButton").addEventListener(
  "click",
  async()=>{

    try{

      await signOut(auth);

      closeModal("accountModal");

      showToast(
        "Déconnexion réussie"
      );

    }catch(error){

      console.error(error);

      showToast(
        "Erreur de déconnexion"
      );
    }
  }
);


$("adminButton").addEventListener(
  "click",
  openAdmin
);


$("googleLogin").addEventListener(
  "click",
  loginGoogle
);


$("emailLogin").addEventListener(
  "click",
  loginEmail
);


$("emailSignup").addEventListener(
  "click",
  signupEmail
);


$("sendPhoneCode").addEventListener(
  "click",
  sendPhoneCode
);


$("confirmPhoneCode").addEventListener(
  "click",
  confirmPhoneCode
);


document
  .querySelectorAll("[data-auth-tab]")
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{
        switchAuthTab(
          button.dataset.authTab
        );
      }
    );

  });


$("applyPromo").addEventListener(
  "click",
  applyPromo
);


$("checkoutForm").addEventListener(
  "submit",
  createOrder
);


$("printInvoice").addEventListener(
  "click",
  ()=>{
    window.print();
  }
);


$("ordersList").addEventListener(
  "click",
  event=>{

    const button =
      event.target.closest("[data-invoice]");

    if(!button) return;

    openInvoice(
      button.dataset.invoice
    );
  }
);


document
  .querySelectorAll("[data-close]")
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{
        closeModal(
          button.dataset.close
        );
      }
    );

  });


document
  .querySelectorAll(".modal")
  .forEach(modal=>{

    modal.addEventListener(
      "click",
      event=>{

        if(event.target===modal){
          modal.classList.remove("show");
        }

      }
    );

  });


$("heroShop").addEventListener(
  "click",
  ()=>{
    $("catalogue")
      .scrollIntoView({
        behavior:"smooth"
      });
  }
);


$("heroAccount").addEventListener(
  "click",
  ()=>{
    openModal("authModal");
  }
);


$("mobileFilterButton").addEventListener(
  "click",
  ()=>{
    const filters =
      document.querySelector(".filters");

    if(filters.style.display==="block"){
      filters.style.display="";
    }else{
      filters.style.display="block";
    }
  }
);


$("resetDemo").addEventListener(
  "click",
  resetDemo
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(event.key==="Escape"){

      document
        .querySelectorAll(".modal.show")
        .forEach(modal=>{
          modal.classList.remove("show");
        });

      closeCart();
    }

    if(
      event.ctrlKey &&
      event.shiftKey &&
      event.key.toLowerCase()==="a"
    ){

      activateAdminCode();

    }

  }
);


/* =========================================================
   INIT
========================================================= */

function init(){

  renderCategories();

  renderProducts();

  renderCart();

  updateAuthUI();

  console.log(
    `NOVASHOP chargé : ${PRODUCTS.length} produits`
  );

}

init();
