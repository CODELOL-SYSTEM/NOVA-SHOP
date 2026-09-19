import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* =========================
   FIREBASE
========================= */

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


/* =========================
   CONSTANTES
========================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const CART_KEY = "novashop_cart";
const SETTINGS_KEY = "novashop_settings";

const promos = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};


/* =========================
   PRODUITS
========================= */

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
  }
];


/* =========================
   AVIS
========================= */

const reviewTexts = {
  5:[
    "Très bon produit, fonctionne parfaitement.",
    "Bonne qualité et livraison rapide.",
    "Produit conforme à la description.",
    "Très satisfait de mon achat.",
    "Installation simple et résultat excellent.",
    "La qualité est vraiment au rendez-vous.",
    "Correspond parfaitement à mes attentes.",
    "Rien à signaler, tout fonctionne correctement.",
    "Très bonne expérience avec ce produit.",
    "Je recommande pour une configuration gaming."
  ],
  4:[
    "Très bon produit, quelques petits détails pourraient être améliorés.",
    "Bonne qualité générale.",
    "Produit efficace et conforme.",
    "Très satisfait malgré quelques petits points.",
    "Bonne expérience dans l'ensemble.",
    "Le produit fait parfaitement son travail.",
    "Qualité correcte et utilisation agréable."
  ],
  3:[
    "Produit correct pour son prix.",
    "Fonctionne correctement.",
    "Bonne expérience mais quelques améliorations seraient possibles.",
    "Produit satisfaisant dans l'ensemble.",
    "Rien d'exceptionnel mais ça fonctionne."
  ],
  2:[
    "Le produit fonctionne mais certains points sont à améliorer.",
    "Qualité moyenne.",
    "Quelques défauts rencontrés.",
    "Pas totalement convaincu."
  ],
  1:[
    "Produit qui ne correspond pas totalement à mes attentes.",
    "Quelques problèmes rencontrés.",
    "Expérience décevante."
  ]
};

const firstNames = [
  "Lucas","Hugo","Noah","Léo","Nathan","Tom","Enzo",
  "Louis","Gabriel","Jules","Mathis","Ethan","Théo",
  "Maxime","Alex","Antoine","Arthur","Raphaël","Adam",
  "Paul","Simon","Rayan","Thomas","Martin","Sacha",
  "Liam","Nolan","Evan","Axel","Mattéo"
];

const lastNames = [
  "Martin","Bernard","Dubois","Thomas","Robert","Richard",
  "Petit","Durand","Leroy","Moreau","Simon","Laurent",
  "Lefebvre","Michel","Garcia","David","Bertrand","Roux",
  "Vincent","Fournier","Morel","Girard","André","Lemoine"
];

function randomItem(array){
  return array[Math.floor(Math.random()*array.length)];
}

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function generateReviews(product){

  const reviews=[];

  for(let i=0;i<942;i++){

    const random=Math.random();

    let rating;

    if(random<0.72){
      rating=5;
    }else if(random<0.90){
      rating=4;
    }else if(random<0.97){
      rating=3;
    }else if(random<0.99){
      rating=2;
    }else{
      rating=1;
    }

    const date=new Date(
      Date.now()-
      randomInt(0,720)*86400000
    );

    reviews.push({
      id:`${product.id}-${i}`,
      name:
        randomItem(firstNames)+
        " "+
        randomItem(lastNames).charAt(0)+
        ".",
      rating,
      text:randomItem(reviewTexts[rating]),
      date
    });
  }

  return reviews;
}

const reviewsCache={};

function getReviews(product){

  if(!reviewsCache[product.id]){
    reviewsCache[product.id]=
      generateReviews(product);
  }

  return reviewsCache[product.id];
}

function getReviewStats(product){

  const reviews=getReviews(product);

  const total=reviews.reduce(
    (sum,review)=>sum+review.rating,
    0
  );

  return {
    count:reviews.length,
    average:total/reviews.length
  };
}

function stars(value){

  const rounded=Math.round(value);

  return "★".repeat(rounded)+
         "☆".repeat(5-rounded);
}


/* =========================
   ÉTAT
========================= */

let currentUser=null;
let currentCategory="Tous";
let currentSearch="";
let currentSort="default";

let cart=JSON.parse(
  localStorage.getItem(CART_KEY)||"[]"
);

let appliedPromo=null;

let unsubscribeOrders=null;
let unsubscribeAdminOrders=null;
let adminOrdersData=[];


/* =========================
   DOM
========================= */

const $=id=>document.getElementById(id);

const toast=$("toast");
const overlay=$("overlay");

const productsGrid=$("productsGrid");
const emptyState=$("emptyState");
const resultsCount=$("resultsCount");

const searchInput=$("searchInput");
const searchButton=$("searchButton");
const sortSelect=$("sortSelect");

const cartCount=$("cartCount");


/* =========================
   OUTILS
========================= */

function money(value){

  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(value);
}

function escapeHtml(value){

  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function showToast(message){

  toast.textContent=message;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },3000);
}

function openModal(id){

  $(id).classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal(id){

  $(id).classList.add("hidden");

  const opened=[
    "authModal",
    "accountModal",
    "productModal",
    "cartModal",
    "checkoutModal",
    "ordersModal",
    "dashboardModal",
    "invoiceModal",
    "settingsModal"
  ].some(id=>
    !$(id).classList.contains("hidden")
  );

  if(!opened){
    overlay.classList.add("hidden");
  }
}

function closeAllModals(){

  document.querySelectorAll(".modal")
    .forEach(modal=>{
      modal.classList.add("hidden");
    });

  overlay.classList.add("hidden");
}


/* =========================
   PRODUITS
========================= */

function getFilteredProducts(){

  let list=[...products];

  if(currentCategory!=="Tous"){
    list=list.filter(
      product=>
        product.category===currentCategory
    );
  }

  if(currentSearch.trim()){

    const search=
      currentSearch.trim().toLowerCase();

    list=list.filter(product=>
      product.name.toLowerCase()
        .includes(search) ||
      product.category.toLowerCase()
        .includes(search)
    );
  }

  if(currentSort==="priceAsc"){
    list.sort(
      (a,b)=>a.price-b.price
    );
  }

  if(currentSort==="priceDesc"){
    list.sort(
      (a,b)=>b.price-a.price
    );
  }

  if(currentSort==="rating"){
    list.sort(
      (a,b)=>
        getReviewStats(b).average-
        getReviewStats(a).average
    );
  }

  return list;
}


/* =========================
   AFFICHAGE CARTES
========================= */

function renderProducts(){

  const list=getFilteredProducts();

  resultsCount.textContent=
    `${list.length} produit${list.length>1?"s":""}`;

  if(!list.length){

    productsGrid.innerHTML="";
    emptyState.classList.remove("hidden");

    return;
  }

  emptyState.classList.add("hidden");

  productsGrid.innerHTML=list.map(product=>{

    const stats=getReviewStats(product);

    return `
      <article class="product-card">

        <img
          class="product-image"
          src="${product.image}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        >

        <div class="product-info">

          <div class="product-category">
            ${escapeHtml(product.category)}
          </div>

          <div class="product-name">
            ${escapeHtml(product.name)}
          </div>

          <!-- AVIS DIRECTEMENT SUR LA CARTE -->

          <div
            style="
              margin-top:9px;
              display:flex;
              align-items:center;
              gap:7px;
              flex-wrap:wrap;
            "
          >

            <span
              style="
                color:#ffd166;
                font-size:17px;
                letter-spacing:1px;
              "
            >
              ${stars(stats.average)}
            </span>

            <strong style="color:#fff">
              ${stats.average.toFixed(1)}/5
            </strong>

            <span
              style="
                color:#8d9ab0;
                font-size:12px;
              "
            >
              (${stats.count} avis)
            </span>

          </div>

          <div
            style="
              color:#6f83a2;
              font-size:11px;
              margin-top:3px;
            "
          >
            ${stats.count.toLocaleString("fr-FR")} avis
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="product-buttons">

            <button
              class="btn"
              data-view="${product.id}"
            >
              Voir les avis
            </button>

            <button
              class="btn primary"
              data-add="${product.id}"
            >
              🛒
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");

  document.querySelectorAll("[data-add]")
    .forEach(button=>{

      button.onclick=()=>{
        addToCart(button.dataset.add);
      };

    });

  document.querySelectorAll("[data-view]")
    .forEach(button=>{

      button.onclick=()=>{
        openProduct(button.dataset.view);
      };

    });
}


/* =========================
   FICHE PRODUIT + AVIS
========================= */

function openProduct(productId){

  const product=products.find(
    product=>product.id===productId
  );

  if(!product) return;

  const reviews=getReviews(product);
  const stats=getReviewStats(product);

  const visibleReviews=
    [...reviews]
      .sort((a,b)=>b.date-a.date)
      .slice(0,50);

  $("productContent").innerHTML=`

    <div class="product-detail">

      <img
        class="product-detail-image"
        src="${product.image}"
        alt=""
      >

      <div>

        <div class="product-category">
          ${escapeHtml(product.category)}
        </div>

        <h1 style="margin:8px 0 12px">
          ${escapeHtml(product.name)}
        </h1>

        <div
          class="rating"
          style="font-size:20px"
        >
          ${stars(stats.average)}
        </div>

        <div class="review-count">
          ${stats.average.toFixed(2)}/5
          · ${stats.count} avis
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <button
          id="detailAdd"
          class="btn primary"
          style="width:100%"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

    <div class="review-summary">

      <div class="big-rating">
        ${stats.average.toFixed(1)}
      </div>

      <div>

        <div
          class="rating"
          style="font-size:20px"
        >
          ${stars(stats.average)}
        </div>

        <div class="review-count">
          ${stats.count.toLocaleString("fr-FR")} avis
        </div>

      </div>

    </div>

    <h3 style="margin-bottom:12px">
      Avis
      (${stats.count.toLocaleString("fr-FR")})
    </h3>

    <div class="reviews-list">

      ${visibleReviews.map(review=>`

        <div class="review">

          <div class="review-head">

            <strong>
              ${escapeHtml(review.name)}
            </strong>

            <span class="rating">
              ${stars(review.rating)}
            </span>

          </div>

          <div>
            ${escapeHtml(review.text)}
          </div>

          <div class="review-date">
            ${review.date.toLocaleDateString("fr-FR")}
          </div>

        </div>

      `).join("")}

    </div>

  `;

  $("detailAdd").onclick=()=>{
    addToCart(product.id);
  };

  openModal("productModal");
}


/* =========================
   PANIER
========================= */

function saveCart(){

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  updateCartCount();
}

function updateCartCount(){

  const count=cart.reduce(
    (sum,item)=>sum+item.quantity,
    0
  );

  cartCount.textContent=count;
}

function addToCart(productId){

  const existing=cart.find(
    item=>item.productId===productId
  );

  if(existing){
    existing.quantity++;
  }else{
    cart.push({
      productId,
      quantity:1
    });
  }

  saveCart();

  showToast("Produit ajouté au panier 🛒");
}

function removeFromCart(productId){

  cart=cart.filter(
    item=>item.productId!==productId
  );

  saveCart();
  renderCart();
}

function changeQuantity(productId,delta){

  const item=cart.find(
    item=>item.productId===productId
  );

  if(!item) return;

  item.quantity+=delta;

  if(item.quantity<=0){
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}

function getCartItems(){

  return cart.map(item=>{

    const product=products.find(
      p=>p.id===item.productId
    );

    if(!product) return null;

    return {
      ...product,
      quantity:item.quantity
    };

  }).filter(Boolean);
}

function cartSubtotal(){

  return getCartItems().reduce(
    (sum,item)=>
      sum+item.price*item.quantity,
    0
  );
}

function renderCart(){

  const items=getCartItems();

  if(!items.length){

    $("cartContent").innerHTML=`
      <div class="empty">
        Ton panier est vide 🛒
      </div>
    `;

    $("cartTotal").textContent=
      money(0);

    return;
  }

  $("cartContent").innerHTML=
    items.map(item=>`

      <div class="cart-item">

        <img
          src="${item.image}"
          alt=""
        >

        <div class="cart-item-main">

          <strong>
            ${escapeHtml(item.name)}
          </strong>

          <div class="review-count">
            ${money(item.price)}
          </div>

          <div class="qty">

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

            <button
              data-remove="${item.id}"
              style="margin-left:8px"
            >
              🗑️
            </button>

          </div>

        </div>

      </div>

    `).join("");

  $("cartTotal").textContent=
    money(cartSubtotal());

  document.querySelectorAll("[data-minus]")
    .forEach(button=>{
      button.onclick=()=>{
        changeQuantity(
          button.dataset.minus,
          -1
        );
      };
    });

  document.querySelectorAll("[data-plus]")
    .forEach(button=>{
      button.onclick=()=>{
        changeQuantity(
          button.dataset.plus,
          1
        );
      };
    });

  document.querySelectorAll("[data-remove]")
    .forEach(button=>{
      button.onclick=()=>{
        removeFromCart(
          button.dataset.remove
        );
      };
    });
}


/* =========================
   AUTH
========================= */

function validatePassword(password){

  if(password.length<6)
    return "Minimum 6 caractères.";

  if(password.length>30)
    return "Maximum 30 caractères.";

  if(!/[a-z]/.test(password))
    return "Il faut une minuscule.";

  if(!/[A-Z]/.test(password))
    return "Il faut une majuscule.";

  if(!/[0-9]/.test(password))
    return "Il faut un chiffre.";

  return null;
}

async function login(email,password){

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    showToast("Connexion réussie ✅");
    closeAllModals();

  }catch(error){

    console.error(error);

    showToast(
      "Email ou mot de passe incorrect."
    );
  }
}

async function signup(){

  const email=$("signupEmail").value.trim();
  const phone=$("signupPhone").value.trim();
  const password=$("signupPassword").value;
  const confirm=$("signupConfirm").value;

  const validation=
    validatePassword(password);

  if(validation){
    showToast(validation);
    return;
  }

  if(password!==confirm){
    showToast(
      "Les mots de passe ne correspondent pas."
    );
    return;
  }

  try{

    const result=
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db,"users",result.user.uid),
      {
        email,
        phone,
        createdAt:Date.now()
      },
      {merge:true}
    );

    showToast("Compte créé ✅");
    closeAllModals();

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de créer le compte."
    );
  }
}

async function googleLogin(){

  try{

    const provider=
      new GoogleAuthProvider();

    const result=
      await signInWithPopup(
        auth,
        provider
      );

    await setDoc(
      doc(db,"users",result.user.uid),
      {
        email:result.user.email,
        displayName:
          result.user.displayName||"",
        createdAt:Date.now()
      },
      {merge:true}
    );

    showToast(
      "Connexion Google réussie ✅"
    );

    closeAllModals();

  }catch(error){

    console.error(error);

    showToast(
      "Connexion Google impossible."
    );
  }
}


/* =========================
   COMPTE
========================= */

function renderAccount(){

  if(!currentUser){

    $("accountContent").innerHTML=`

      <div class="account-box">

        <div class="info-card">
          Connecte-toi pour accéder à ton compte.
        </div>

        <button
          id="accountLogin"
          class="btn primary"
        >
          Se connecter
        </button>

      </div>
    `;

    $("accountLogin").onclick=()=>{
      closeModal("accountModal");
      openModal("authModal");
    };

    return;
  }

  $("accountContent").innerHTML=`

    <div class="account-box">

      <div class="info-card">
        <strong>Email</strong>
        ${escapeHtml(
          currentUser.email||""
        )}
      </div>

      <button
        id="accountOrders"
        class="btn"
      >
        📦 Mes commandes
      </button>

      <button
        id="logoutButton"
        class="btn red"
      >
        🚪 Se déconnecter
      </button>

    </div>
  `;

  $("accountOrders").onclick=()=>{
    closeModal("accountModal");
    openOrders();
  };

  $("logoutButton").onclick=async()=>{
    await signOut(auth);
    closeAllModals();
    showToast("Déconnexion effectuée.");
  };
}


/* =========================
   CHECKOUT
========================= */

function updateCheckoutTotals(){

  const subtotal=cartSubtotal();

  const discount=appliedPromo
    ?subtotal*(promos[appliedPromo]/100)
    :0;

  const total=Math.max(
    0,
    subtotal-discount
  );

  $("checkoutSubtotal").textContent=
    money(subtotal);

  $("checkoutDiscount").textContent=
    "-"+money(discount);

  $("checkoutTotal").textContent=
    money(total);

  return {
    subtotal,
    discount,
    total
  };
}

async function validateFrenchAddress(){

  const address=$("address").value.trim();
  const postal=$("postalCode").value.trim();
  const city=$("city").value.trim();

  if(!address||!postal||!city){
    throw new Error(
      "Adresse incomplète."
    );
  }

  if(!/^\d{5}$/.test(postal)){
    throw new Error(
      "Code postal invalide."
    );
  }

  const q=encodeURIComponent(
    `${address}, ${postal} ${city}, France`
  );

  const response=await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${q}&limit=5`
  );

  if(!response.ok){
    throw new Error(
      "Impossible de vérifier l'adresse."
    );
  }

  const data=await response.json();

  if(!data.features?.length){
    throw new Error(
      "Adresse introuvable."
    );
  }

  const match=data.features.some(feature=>{

    const p=feature.properties||{};

    return String(p.postcode||"")===postal &&
      String(p.city||"").toLowerCase()===
      city.toLowerCase();
  });

  if(!match){
    throw new Error(
      "La ville et le code postal ne correspondent pas."
    );
  }

  return true;
}

async function createOrder(){

  if(!currentUser){

    closeModal("checkoutModal");
    openModal("authModal");

    showToast(
      "Connecte-toi avant de commander."
    );

    return;
  }

  const button=$("payButton");

  button.disabled=true;
  button.textContent=
    "Vérification...";

  try{

    await validateFrenchAddress();

    const totals=
      updateCheckoutTotals();

    const orderId=
      "NS-"+Date.now()+"-"+
      Math.random()
        .toString(36)
        .slice(2,8)
        .toUpperCase();

    const order={
      id:orderId,
      userId:currentUser.uid,
      email:currentUser.email||"",
      customer:{
        fullName:$("fullName").value.trim(),
        country:$("country").value,
        address:$("address").value.trim(),
        postalCode:$("postalCode").value.trim(),
        city:$("city").value.trim()
      },
      items:getCartItems().map(item=>({
        productId:item.id,
        name:item.name,
        price:item.price,
        quantity:item.quantity
      })),
      subtotal:totals.subtotal,
      discount:totals.discount,
      total:totals.total,
      promoCode:appliedPromo||null,
      status:"Préparation",
      currentLocation:"Entrepôt NovaShop",
      destination:$("city").value.trim(),
      tracking:
        "NS"+
        Math.random()
          .toString(36)
          .slice(2,12)
          .toUpperCase(),
      deliveryDate:
        Date.now()+
        randomInt(2,5)*
        86400000,
      createdAt:Date.now(),
      updatedAt:Date.now()
    };

    await setDoc(
      doc(db,"orders",orderId),
      order
    );

    cart=[];
    saveCart();

    appliedPromo=null;

    $("checkoutForm").reset();

    closeModal("checkoutModal");

    showToast(
      "Commande enregistrée 📦"
    );

    openOrders();

  }catch(error){

    console.error(error);

    showToast(
      error.message||
      "Erreur de commande."
    );

  }finally{

    button.disabled=false;
    button.textContent="💳 Payer";
  }
}


/* =========================
   COMMANDES
========================= */

function openOrders(){

  if(!currentUser){

    openModal("authModal");

    showToast(
      "Connecte-toi pour voir tes commandes."
    );

    return;
  }

  openModal("ordersModal");

  if(unsubscribeOrders){
    unsubscribeOrders();
  }

  const q=query(
    collection(db,"orders"),
    where(
      "userId",
      "==",
      currentUser.uid
    )
  );

  unsubscribeOrders=onSnapshot(
    q,
    snapshot=>{

      const orders=snapshot.docs
        .map(item=>item.data())
        .sort(
          (a,b)=>
            (b.createdAt||0)-
            (a.createdAt||0)
        );

      renderOrders(orders);
    }
  );
}

function renderOrders(orders){

  if(!orders.length){

    $("ordersContent").innerHTML=`
      <div class="empty">
        Aucune commande.
      </div>
    `;

    return;
  }

  $("ordersContent").innerHTML=
    orders.map(order=>{

      const date=order.deliveryDate
        ?new Date(order.deliveryDate)
        :null;

      return `

        <div class="order-card">

          <div class="order-top">

            <strong>
              ${escapeHtml(order.id)}
            </strong>

            <span class="status">
              ${escapeHtml(
                order.status||"En cours"
              )}
            </span>

          </div>

          <br>

          📍 Position :
          <strong>
            ${escapeHtml(
              order.currentLocation||""
            )}
          </strong>

          <br>

          🎯 Destination :
          <strong>
            ${escapeHtml(
              order.destination||""
            )}
          </strong>

          <br>

          🚚 Suivi :
          <strong>
            ${escapeHtml(
              order.tracking||""
            )}
          </strong>

          <br>

          📅 Livraison :
          <strong>
            ${
              date
              ?date.toLocaleDateString("fr-FR")
              :"À définir"
            }
          </strong>

          <br><br>

          💰 Total :
          <strong>
            ${money(order.total||0)}
          </strong>

        </div>

      `;
    }).join("");
}


/* =========================
   ADMIN
========================= */

function isAdmin(){

  return currentUser &&
    currentUser.email===
    ADMIN_EMAIL;
}

async function openAdmin(){

  if(!isAdmin()){
    showToast(
      "Accès administrateur uniquement."
    );
    return;
  }

  const code=prompt(
    "Code d'accès Dashboard :"
  );

  if(code!==ADMIN_CODE){
    showToast("Code incorrect ❌");
    return;
  }

  openModal("dashboardModal");

  if(unsubscribeAdminOrders){
    unsubscribeAdminOrders();
  }

  unsubscribeAdminOrders=
    onSnapshot(
      collection(db,"orders"),
      snapshot=>{

        adminOrdersData=
          snapshot.docs
            .map(item=>item.data())
            .sort(
              (a,b)=>
                (b.createdAt||0)-
                (a.createdAt||0)
            );

        renderAdminDashboard();
      }
    );

  renderAdminPromos();
}

function renderAdminDashboard(){

  $("statOrders").textContent=
    adminOrdersData.length;

  $("statFree").textContent=
    adminOrdersData.filter(
      order=>Number(order.total||0)===0
    ).length;

  $("statCatalog").textContent=
    products.length;

  $("adminOrders").innerHTML=
    adminOrdersData.map(order=>`

      <div class="admin-order">

        <strong>
          ${escapeHtml(order.id)}
        </strong>

        <div>
          ${escapeHtml(order.email||"")}
        </div>

        <br>

        <div class="admin-fields">

          <select
            data-status="${order.id}"
          >
            <option>Préparation</option>
            <option>Expédiée</option>
            <option>En transit</option>
            <option>Livrée</option>
          </select>

          <input
            data-location="${order.id}"
            value="${escapeHtml(
              order.currentLocation||""
            )}"
            placeholder="Position"
          >

          <input
            data-destination="${order.id}"
            value="${escapeHtml(
              order.destination||""
            )}"
            placeholder="Destination"
          >

          <input
            type="date"
            data-date="${order.id}"
          >

        </div>

        <br>

        <button
          class="btn primary"
          data-save-order="${order.id}"
        >
          💾 Enregistrer
        </button>

      </div>

    `).join("");

  document.querySelectorAll(
    "[data-save-order]"
  ).forEach(button=>{

    button.onclick=async()=>{

      const id=button.dataset.saveOrder;

      const status=
        document.querySelector(
          `[data-status="${CSS.escape(id)}"]`
        ).value;

      const location=
        document.querySelector(
          `[data-location="${CSS.escape(id)}"]`
        ).value;

      const destination=
        document.querySelector(
          `[data-destination="${CSS.escape(id)}"]`
        ).value;

      const date=
        document.querySelector(
          `[data-date="${CSS.escape(id)}"]`
        ).value;

      const updates={
        status,
        currentLocation:location,
        destination,
        updatedAt:Date.now()
      };

      if(date){
        updates.deliveryDate=
          new Date(
            date+"T12:00:00"
          ).getTime();
      }

      try{

        await updateDoc(
          doc(db,"orders",id),
          updates
        );

        showToast(
          "Commande mise à jour ✅"
        );

      }catch(error){

        console.error(error);

        showToast(
          "Erreur de mise à jour."
        );
      }
    };
  });
}

function renderAdminPromos(){

  $("adminPromos").innerHTML=
    Object.entries(promos)
      .map(([code,value])=>`

        <div
          class="info-card"
          style="margin-bottom:8px"
        >
          <strong>${code}</strong>
          ${value}% de réduction
        </div>

      `)
      .join("");
}


/* =========================
   ÉVÉNEMENTS
========================= */

document.querySelectorAll(
  "[data-close]"
).forEach(button=>{

  button.onclick=()=>{
    closeModal(
      button.dataset.close
    );
  };

});

overlay.onclick=closeAllModals;


/* AUTH */

$("loginTab").onclick=()=>{

  $("loginTab").classList.add("active");
  $("signupTab").classList.remove("active");

  $("loginForm").classList.remove("hidden");
  $("signupForm").classList.add("hidden");
};

$("signupTab").onclick=()=>{

  $("signupTab").classList.add("active");
  $("loginTab").classList.remove("active");

  $("signupForm").classList.remove("hidden");
  $("loginForm").classList.add("hidden");
};

$("loginForm").onsubmit=async event=>{

  event.preventDefault();

  await login(
    $("loginEmail").value.trim(),
    $("loginPassword").value
  );
};

$("signupForm").onsubmit=async event=>{

  event.preventDefault();

  await signup();
};

$("googleButton").onclick=
  googleLogin;

$("googleSignupButton").onclick=
  googleLogin;


/* COMPTE */

$("accountButton").onclick=()=>{

  renderAccount();
  openModal("accountModal");
};


/* COMMANDES */

$("ordersButton").onclick=
  openOrders;

$("heroOrders").onclick=
  openOrders;


/* ADMIN */

$("adminButton").onclick=
  openAdmin;


/* PANIER */

$("cartButton").onclick=()=>{

  renderCart();
  openModal("cartModal");
};


/* CHECKOUT */

$("checkoutButton").onclick=()=>{

  if(!getCartItems().length){

    showToast(
      "Ton panier est vide."
    );

    return;
  }

  if(!currentUser){

    closeModal("cartModal");
    openModal("authModal");

    showToast(
      "Connecte-toi avant de commander."
    );

    return;
  }

  updateCheckoutTotals();

  openModal("checkoutModal");
};

$("checkoutForm").onsubmit=async event=>{

  event.preventDefault();

  await createOrder();
};


/* PROMO */

$("applyPromo").onclick=()=>{

  const code=
    $("promoCode").value
      .trim()
      .toUpperCase();

  if(promos[code]!==undefined){

    appliedPromo=code;

    $("promoMessage").textContent=
      `${code} appliqué : ${promos[code]}%`;

    updateCheckoutTotals();

  }else{

    appliedPromo=null;

    $("promoMessage").textContent=
      "Code invalide.";

    updateCheckoutTotals();
  }
};


/* RECHERCHE */

function search(){

  currentSearch=
    searchInput.value;

  renderProducts();
}

searchButton.onclick=search;

searchInput.addEventListener(
  "input",
  search
);


/* TRI */

sortSelect.onchange=()=>{

  currentSort=
    sortSelect.value;

  renderProducts();
};


/* CATÉGORIES */

document.querySelectorAll(
  ".category-btn"
).forEach(button=>{

  button.onclick=()=>{

    document.querySelectorAll(
      ".category-btn"
    ).forEach(btn=>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    currentCategory=
      button.dataset.category;

    renderProducts();
  };

});


/* HERO */

$("heroProducts").onclick=()=>{

  document.querySelector(".section")
    .scrollIntoView({
      behavior:"smooth"
    });
};


/* SETTINGS */

$("settingsButton").onclick=()=>{
  openModal("settingsModal");
};


/* AUTH STATE */

onAuthStateChanged(
  auth,
  user=>{

    currentUser=user;

    if(
      user &&
      user.email===ADMIN_EMAIL
    ){

      $("adminButton")
        .classList.remove("hidden");

    }else{

      $("adminButton")
        .classList.add("hidden");
    }

    renderAccount();
  }
);


/* SETTINGS */

const savedSettings=
  JSON.parse(
    localStorage.getItem(
      SETTINGS_KEY
    )||"{}"
  );

$("darkSwitch").checked=
  savedSettings.dark!==false;

$("soundSwitch").checked=
  savedSettings.sound===true;

function saveSettings(){

  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      dark:$("darkSwitch").checked,
      sound:$("soundSwitch").checked
    })
  );
}

$("darkSwitch").onchange=
  saveSettings;

$("soundSwitch").onchange=
  saveSettings;


/* =========================
   INITIALISATION
========================= */

updateCartCount();
renderProducts();

console.log(
  "NovaShop :",
  products.length,
  "produits"
);

console.log(
  "Chaque produit : minimum 942 avis."
);
