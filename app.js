import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  updateProfile,
  deleteUser
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAZv5AkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS = [

  {
    id:"gigabyte-b650-aorus",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    images:[
      "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
    ],
    description:"Carte mère gaming AMD B650 avec connectivité moderne et Wi-Fi.",
    rating:0
  },

  {
    id:"pc-7800x3d-9070xt",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    images:[
      "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
    ],
    description:"PC gaming haut de gamme pensé pour les jeux exigeants.",
    rating:0
  },

  {
    id:"hyperx-cloud-ii",
    name:"HyperX Cloud II – Casque gaming",
    category:"Casques",
    price:49.99,
    images:[
      "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
    ],
    description:"Casque gaming avec microphone et audio immersif.",
    rating:0
  },

  {
    id:"tecors-60",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    images:[
      "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
    ],
    description:"Clavier compact mécanique AZERTY destiné au gaming.",
    rating:0
  },

  {
    id:"celshading-65",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    images:[
      "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
    ],
    description:"Clavier magnétique compact au design noir.",
    rating:0
  },

  {
    id:"ajazz-aj199-max",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    images:[
      "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
    ],
    description:"Souris gaming sans fil légère avec connexion moderne.",
    rating:0
  },

  {
    id:"logitech-g-pro-x2",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    images:[
      "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
    ],
    description:"Souris gaming haut de gamme Logitech.",
    rating:0
  },

  {
    id:"samsung-990-pro-1tb",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    images:[
      "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJHBJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4"
    ],
    description:"SSD NVMe PCIe 4.0 Samsung 990 PRO de 1 To.",
    rating:0
  },

  {
    id:"samsung-990-pro-2tb",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    images:[
      "https://pc.comparer.fr/500x500/310191422.webp"
    ],
    description:"SSD NVMe Samsung 990 PRO de 2 To.",
    rating:0
  },

  {
    id:"corsair-rm1000x",
    name:"CORSAIR RM1000x (EU)",
    category:"Alimentations",
    price:159.90,
    images:[
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
    ],
    description:"Alimentation Corsair 1000 W destinée aux configurations puissantes.",
    rating:0
  },

  {
    id:"corsair-rm850x",
    name:"CORSAIR RM850x (EU)",
    category:"Alimentations",
    price:134.90,
    images:[
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
    ],
    description:"Alimentation Corsair 850 W.",
    rating:0
  },

  {
    id:"corsair-frame-5000d",
    name:"Corsair Frame 5000D RS ARGB (Noir)",
    category:"Boîtiers",
    price:159.90,
    images:[
      "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
    ],
    description:"Boîtier gaming noir avec éclairage ARGB.",
    rating:0
  },

  {
    id:"arctic-freezer-360",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    images:[
      "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
    ],
    description:"Watercooling AIO 360 mm pour configurations gaming.",
    rating:0
  },

  {
    id:"samsung-g6-oled",
    name:'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category:"Écrans",
    price:399.95,
    images:[
      "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
    ],
    description:"Écran gaming 27 pouces QD-OLED.",
    rating:0
  },

  {
    id:"elgato-wave-mic-arm",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    images:[
      "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
    ],
    description:"Bras articulé professionnel pour microphone.",
    rating:0
  },

  {
    id:"dualsense-cosmic-red",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    images:[
      "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
      "https://www.cdiscount.com/pdt2/k/v/2/1/700x700/ps5dsblackv2/rw/manette-sans-fil-dualsense-noire-i-ps5-et-pc.jpg",
      "https://www.cdiscount.com/pdt2/e/v/2/1/700x700/ps5dswhitev2/rw/manette-sans-fil-dualsense-blanche-i-ps5-et-pc.jpg"
    ],
    description:"Manette DualSense compatible PS5 et PC. Plusieurs visuels disponibles.",
    rating:0
  },

  {
    id:"asus-tuf-b650-plus",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    images:[
      "https://media.materiel.net/r550/products/MN0005986139.jpg"
    ],
    description:"Carte mère gaming AMD B650 de la gamme ASUS TUF.",
    rating:0
  },

  {
    id:"msi-mag-b650",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    images:[
      "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
    ],
    description:"Carte mère B650 avec Wi-Fi pour configuration AMD.",
    rating:0
  },

  /*
    Les anciens produits dont les images exactes n'étaient plus
    disponibles dans le contexte ne sont volontairement pas ajoutés
    avec de faux liens.
  */
];


/* =========================================================
   ETAT
========================================================= */

let currentUser = null;
let currentCategory = "Tous";
let currentSearch = "";
let currentProduct = null;
let carouselIndex = 0;
let confirmationResult = null;
let recaptchaVerifier = null;
let appliedPromo = null;

const STORAGE = {
  cart:"novashop_cart",
  favorites:"novashop_favorites",
  orders:"novashop_orders",
  reviews:"novashop_reviews",
  demoUsers:"novashop_demo_users",
  admin:"novashop_admin_uid"
};

let cart = load(STORAGE.cart,{});
let favorites = load(STORAGE.favorites,[]);
let orders = load(STORAGE.orders,[]);
let reviews = load(STORAGE.reviews,{});
let demoUsers = load(STORAGE.demoUsers,[]);


/* =========================================================
   UTILITAIRES
========================================================= */

function load(key,fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch{
    return fallback;
  }
}

function save(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

function money(value){
  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(value);
}

function escapeHTML(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function toast(message){
  const el=document.querySelector("#toast");
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer=setTimeout(()=>el.classList.remove("show"),2600);
}

function openModal(id){
  document.querySelector("#"+id)?.classList.add("show");
}

function closeModal(id){
  document.querySelector("#"+id)?.classList.remove("show");
}

function openCart(){
  document.querySelector("#overlay").classList.add("show");
  document.querySelector("#cartDrawer").classList.add("open");
}

function closeCart(){
  document.querySelector("#overlay").classList.remove("show");
  document.querySelector("#cartDrawer").classList.remove("open");
}

function requireLogin(){
  if(!currentUser){
    openModal("authModal");
    return false;
  }
  return true;
}

function getReviews(productId){
  return Array.isArray(reviews[productId]) ? reviews[productId] : [];
}

function averageRating(productId){
  const list=getReviews(productId);
  if(!list.length) return 0;
  return list.reduce((a,b)=>a+b.rating,0)/list.length;
}

function stars(value){
  const rounded=Math.round(value);
  return "★".repeat(rounded)+"☆".repeat(5-rounded);
}

function displayUserName(){
  if(!currentUser) return "Client";
  return currentUser.displayName || currentUser.email?.split("@")[0] || "Client";
}

function shortName(){
  const n=displayUserName().trim();
  return n.slice(0,3)+"***";
}

function isAdmin(){
  return !!currentUser &&
    localStorage.getItem(STORAGE.admin) === currentUser.uid;
}

function cartArray(){
  return Object.entries(cart)
    .map(([id,qty])=>{
      const product=PRODUCTS.find(p=>p.id===id);
      if(!product) return null;
      return {product,qty};
    })
    .filter(Boolean);
}

function cartSubtotal(){
  return cartArray().reduce((sum,item)=>sum+item.product.price*item.qty,0);
}

function cartCount(){
  return cartArray().reduce((sum,item)=>sum+item.qty,0);
}


/* =========================================================
   PRODUITS
========================================================= */

function filteredProducts(){

  let list=[...PRODUCTS];

  if(currentCategory!=="Tous"){
    list=list.filter(p=>p.category===currentCategory);
  }

  if(currentSearch.trim()){
    const q=currentSearch.toLowerCase();
    list=list.filter(p=>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  const sort=document.querySelector("#sortSelect").value;

  if(sort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(sort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(sort==="name"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  return list;
}

function renderProducts(){

  const grid=document.querySelector("#productsGrid");
  const empty=document.querySelector("#emptyState");
  const list=filteredProducts();

  grid.innerHTML="";

  document.querySelector("#resultCount").textContent =
    `${list.length} produit${list.length>1?"s":""}`;

  if(!list.length){
    empty.classList.add("show");
    return;
  }

  empty.classList.remove("show");

  list.forEach(product=>{
    const card=document.createElement("article");
    card.className="card";
    card.dataset.id=product.id;

    const avg=averageRating(product.id);
    const count=getReviews(product.id).length;
    const fav=favorites.includes(product.id);

    card.innerHTML=`
      <div class="card-img">
        <button class="card-fav ${fav?"active":""}" data-fav="${product.id}">
          ${fav?"♥":"♡"}
        </button>
        <img
          src="${product.images[0]}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >
      </div>

      <div class="card-body">
        <div class="card-cat">${escapeHTML(product.category)}</div>

        <div class="card-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          ${avg ? stars(avg) : "☆☆☆☆☆"}
          <span>${count ? avg.toFixed(1)+" ("+count+")" : "Aucun avis"}</span>
        </div>

        <div class="price">${money(product.price)}</div>

        <div class="card-actions">
          <button class="btn" data-view="${product.id}">
            Voir
          </button>

          <button class="btn blue" data-add="${product.id}">
            🛒 Ajouter
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);

    const image=card.querySelector("img");

    image.addEventListener("error",()=>{
      card.remove();

      const remaining=document.querySelectorAll("#productsGrid .card").length;

      if(remaining===0){
        document.querySelector("#emptyState").classList.add("show");
      }
    });
  });
}

function addToCart(id){
  cart[id]=(cart[id]||0)+1;
  save(STORAGE.cart,cart);
  renderCart();
  toast("Produit ajouté au panier 🛒");
}

function removeFromCart(id){
  delete cart[id];
  save(STORAGE.cart,cart);
  renderCart();
}

function changeQty(id,delta){
  cart[id]=(cart[id]||0)+delta;

  if(cart[id]<=0){
    delete cart[id];
  }

  save(STORAGE.cart,cart);
  renderCart();
}

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites=favorites.filter(x=>x!==id);
    toast("Retiré des favoris");
  }else{
    favorites.push(id);
    toast("Ajouté aux favoris ♥");
  }

  save(STORAGE.favorites,favorites);
  renderProducts();
}


/* =========================================================
   PANIER
========================================================= */

function renderCart(){

  document.querySelector("#cartCount").textContent=cartCount();

  const container=document.querySelector("#cartItems");
  const items=cartArray();

  if(!items.length){
    container.innerHTML=`
      <div style="text-align:center;padding:55px 15px;color:#777">
        <div style="font-size:40px">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute un produit pour commencer.</p>
      </div>
    `;

    document.querySelector("#cartTotal").textContent=money(0);
    return;
  }

  container.innerHTML="";

  items.forEach(({product,qty})=>{

    const row=document.createElement("div");
    row.className="cart-item";

    row.innerHTML=`
      <img src="${product.images[0]}" alt="${escapeHTML(product.name)}">

      <div>
        <h4>${escapeHTML(product.name)}</h4>
        <p>${money(product.price*qty)}</p>

        <div class="qty">
          <button data-minus="${product.id}">−</button>
          <b>${qty}</b>
          <button data-plus="${product.id}">+</button>
        </div>

        <button class="remove" data-remove="${product.id}">
          Supprimer
        </button>
      </div>

      <div style="font-size:12px;color:#777">
        ${money(product.price)}
      </div>
    `;

    container.appendChild(row);
  });

  document.querySelector("#cartTotal").textContent=money(cartSubtotal());
}


/* =========================================================
   PRODUIT DETAIL
========================================================= */

function openProduct(id){

  const product=PRODUCTS.find(p=>p.id===id);
  if(!product) return;

  currentProduct=product;
  carouselIndex=0;

  renderProductDetail();
  openModal("productModal");
}

function renderProductDetail(){

  const product=currentProduct;
  const list=getReviews(product.id);
  const avg=averageRating(product.id);

  const images=product.images;

  const detail=document.querySelector("#productDetail");

  detail.innerHTML=`
    <div class="product-detail">

      <div>

        <div class="detail-image">

          <img
            id="detailMainImage"
            src="${images[carouselIndex]}"
            alt="${escapeHTML(product.name)}"
          >

          ${
            images.length>1
            ? `
              <button class="arrow left" id="carouselPrev">‹</button>
              <button class="arrow right" id="carouselNext">›</button>
              <div class="carousel">
                ${images.map((_,i)=>`
                  <button class="dot ${i===carouselIndex?"active":""}" data-dot="${i}"></button>
                `).join("")}
              </div>
            `
            :""
          }

        </div>

      </div>

      <div class="detail-info">

        <div class="card-cat">${escapeHTML(product.category)}</div>

        <h2>${escapeHTML(product.name)}</h2>

        <div class="rating">
          ${avg ? stars(avg) : "☆☆☆☆☆"}
          <span>
            ${list.length ? avg.toFixed(1)+" / 5" : "Aucun avis"}
          </span>
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p class="detail-desc">
          ${escapeHTML(product.description)}
        </p>

        <div class="info-box">
          ✓ Produit marketplace NovaShop<br>
          ✓ Catégorie : ${escapeHTML(product.category)}<br>
          ✓ Entrepôt : Entrepôt
        </div>

        <button class="btn blue full" id="detailAdd">
          🛒 Ajouter au panier
        </button>

        <div class="reviews">

          <h3>Avis clients</h3>

          ${
            currentUser
            ? `
              <form id="reviewForm" class="form">
                <label>Note</label>
                <select id="reviewRating">
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="1">★☆☆☆☆</option>
                </select>

                <label>Commentaire</label>
                <input id="reviewComment" maxlength="300" required placeholder="Ton avis...">

                <button class="btn" type="submit">
                  Publier mon avis
                </button>
              </form>
            `
            : `
              <div class="info-box">
                Connecte-toi pour publier un avis.
              </div>
            `
          }

          <div id="reviewsList">
            ${
              list.length
              ? list.map(r=>`
                <div class="review">
                  <strong>${escapeHTML(r.name)} · ${stars(r.rating)}</strong>
                  <p>${escapeHTML(r.comment)}</p>
                  <div class="review-date">${escapeHTML(r.date)}</div>
                </div>
              `).join("")
              : `
                <div style="color:#777;padding:15px 0">
                  Aucun avis pour le moment.
                </div>
              `
            }
          </div>

        </div>

      </div>

    </div>
  `;

  const img=document.querySelector("#detailMainImage");

  img.addEventListener("error",()=>{
    toast("Image indisponible");
    if(product.images.length===1){
      closeModal("productModal");
    }
  });

  document.querySelector("#detailAdd").onclick=()=>{
    addToCart(product.id);
  };

  if(images.length>1){

    document.querySelector("#carouselPrev").onclick=()=>{
      carouselIndex=(carouselIndex-1+images.length)%images.length;
      renderProductDetail();
    };

    document.querySelector("#carouselNext").onclick=()=>{
      carouselIndex=(carouselIndex+1)%images.length;
      renderProductDetail();
    };

    document.querySelectorAll("[data-dot]").forEach(dot=>{
      dot.onclick=()=>{
        carouselIndex=Number(dot.dataset.dot);
        renderProductDetail();
      };
    });
  }

  const reviewForm=document.querySelector("#reviewForm");

  if(reviewForm){

    reviewForm.addEventListener("submit",e=>{
      e.preventDefault();
      publishReview();
    });
  }
}

function publishReview(){

  if(!currentUser || !currentProduct) return;

  const productId=currentProduct.id;
  const list=getReviews(productId);

  const already=list.some(
    r=>r.uid===currentUser.uid
  );

  if(already){
    toast("Tu as déjà laissé un avis pour ce produit.");
    return;
  }

  const rating=Number(document.querySelector("#reviewRating").value);
  const comment=document.querySelector("#reviewComment").value.trim();

  if(!comment) return;

  if(!reviews[productId]){
    reviews[productId]=[];
  }

  reviews[productId].push({
    uid:currentUser.uid,
    name:shortName(),
    rating,
    comment,
    date:new Date().toLocaleDateString("fr-FR")
  });

  save(STORAGE.reviews,reviews);

  toast("Avis publié ⭐");
  renderProductDetail();
  renderProducts();
}


/* =========================================================
   AUTH
========================================================= */

function setupAuthTabs(){

  document.querySelector("#loginTab").onclick=()=>{
    document.querySelector("#loginTab").classList.add("active");
    document.querySelector("#signupTab").classList.remove("active");
    document.querySelector("#loginForm").style.display="grid";
    document.querySelector("#signupForm").style.display="none";
  };

  document.querySelector("#signupTab").onclick=()=>{
    document.querySelector("#signupTab").classList.add("active");
    document.querySelector("#loginTab").classList.remove("active");
    document.querySelector("#signupForm").style.display="grid";
    document.querySelector("#loginForm").style.display="none";
  };
}

document.querySelector("#loginForm").addEventListener("submit",async e=>{

  e.preventDefault();

  try{

    await signInWithEmailAndPassword(
      auth,
      document.querySelector("#loginEmail").value,
      document.querySelector("#loginPassword").value
    );

    closeModal("authModal");
    toast("Connexion réussie 👋");

  }catch(error){
    toast(firebaseError(error));
  }
});


document.querySelector("#signupForm").addEventListener("submit",async e=>{

  e.preventDefault();

  try{

    const name=document.querySelector("#signupName").value.trim();
    const email=document.querySelector("#signupEmail").value.trim();
    const password=document.querySelector("#signupPassword").value;

    const result=await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user,{
      displayName:name
    });

    demoUsers.push({
      uid:result.user.uid,
      email:result.user.email,
      name
    });

    save(STORAGE.demoUsers,demoUsers);

    closeModal("authModal");

    toast("Compte créé 🎉");

  }catch(error){
    toast(firebaseError(error));
  }
});


document.querySelector("#googleBtn").addEventListener("click",async()=>{

  try{

    await signInWithPopup(auth,googleProvider);

    closeModal("authModal");
    toast("Connexion Google réussie");

  }catch(error){
    toast(firebaseError(error));
  }
});


function firebaseError(error){

  const code=error?.code || "";

  const messages={
    "auth/invalid-credential":"Email ou mot de passe incorrect.",
    "auth/user-not-found":"Compte introuvable.",
    "auth/wrong-password":"Mot de passe incorrect.",
    "auth/email-already-in-use":"Cet email est déjà utilisé.",
    "auth/weak-password":"Mot de passe trop faible.",
    "auth/popup-closed-by-user":"Fenêtre Google fermée.",
    "auth/unauthorized-domain":"Domaine non autorisé dans Firebase.",
    "auth/invalid-phone-number":"Numéro de téléphone invalide.",
    "auth/too-many-requests":"Trop de tentatives. Réessaie plus tard."
  };

  return messages[code] || "Une erreur est survenue.";
}


/* =========================================================
   TELEPHONE
========================================================= */

function initRecaptcha(){

  if(recaptchaVerifier) return;

  try{

    recaptchaVerifier=new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size:"normal"
      }
    );

  }catch(error){
    console.error(error);
  }
}

document.querySelector("#phoneSendBtn").addEventListener("click",async()=>{

  const phone=document.querySelector("#phoneNumber").value.trim();

  if(!phone){
    toast("Entre ton numéro.");
    return;
  }

  try{

    initRecaptcha();

    confirmationResult=await signInWithPhoneNumber(
      auth,
      phone,
      recaptchaVerifier
    );

    document.querySelector("#phoneCode").style.display="block";
    document.querySelector("#phoneVerifyBtn").style.display="block";

    toast("Code envoyé 📱");

  }catch(error){
    console.error(error);
    toast(firebaseError(error));
  }
});


document.querySelector("#phoneVerifyBtn").addEventListener("click",async()=>{

  const code=document.querySelector("#phoneCode").value.trim();

  if(!confirmationResult){
    toast("Demande d'abord un code.");
    return;
  }

  try{

    await confirmationResult.confirm(code);

    closeModal("authModal");
    toast("Téléphone vérifié 📱");

  }catch(error){
    toast("Code incorrect.");
  }
});


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser=user;

  updateHeader();

  if(user){
    document.querySelector("#fullName").value=
      user.displayName || "";
  }

  if(document.querySelector("#ordersModal").classList.contains("show")){
    renderOrders();
  }
});


function updateHeader(){

  const accountBtn=document.querySelector("#accountBtn");
  const ordersBtn=document.querySelector("#ordersBtn");
  const adminBtn=document.querySelector("#adminBtn");

  if(currentUser){

    accountBtn.innerHTML="👤 <span>"+escapeHTML(
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "Compte"
    )+"</span>";

    ordersBtn.style.display="block";

    adminBtn.style.display=isAdmin() ? "block" : "none";

  }else{

    accountBtn.innerHTML="👤 <span>Compte</span>";
    ordersBtn.style.display="none";
    adminBtn.style.display="none";
  }
}


/* =========================================================
   COMPTE
========================================================= */

document.querySelector("#accountBtn").onclick=()=>{

  if(!currentUser){
    openModal("authModal");
    return;
  }

  renderAccount();
  openModal("accountModal");
};

function renderAccount(){

  const info=document.querySelector("#accountInfo");

  info.innerHTML=`
    <b>${escapeHTML(displayUserName())}</b>
    <span>${escapeHTML(currentUser.email || "Téléphone")}</span>
    <br>
    <small>ID Firebase : ${escapeHTML(currentUser.uid.slice(0,12))}...</small>
  `;
}

document.querySelector("#accountOrdersBtn").onclick=()=>{
  closeModal("accountModal");
  renderOrders();
  openModal("ordersModal");
};

document.querySelector("#logoutBtn").onclick=async()=>{

  try{

    await signOut(auth);

    localStorage.removeItem(STORAGE.admin);

    closeModal("accountModal");
    toast("Déconnexion effectuée.");

  }catch{
    toast("Impossible de se déconnecter.");
  }
};


document.querySelector("#deleteAccountBtn").onclick=async()=>{

  if(!currentUser) return;

  const confirmed=confirm(
    "Supprimer définitivement ton compte Firebase ?"
  );

  if(!confirmed) return;

  try{

    await deleteUser(currentUser);

    localStorage.removeItem(STORAGE.admin);

    toast("Compte supprimé.");

  }catch(error){

    if(error.code==="auth/requires-recent-login"){
      toast("Reconnecte-toi avant de supprimer le compte.");
    }else{
      toast("Suppression impossible.");
    }
  }
};


/* =========================================================
   ADMIN DEMO
========================================================= */

document.querySelector("#adminUnlockBtn").onclick=()=>{

  if(!currentUser){
    toast("Connecte-toi d'abord.");
    return;
  }

  const code=document.querySelector("#adminCodeInput").value.trim();

  if(code==="NOVA-ADMIN-2026"){

    localStorage.setItem(
      STORAGE.admin,
      currentUser.uid
    );

    updateHeader();

    closeModal("accountModal");

    toast("Accès admin activé ⚙️");

  }else{
    toast("Code administrateur incorrect.");
  }
};


document.querySelector("#adminBtn").onclick=()=>{

  if(!isAdmin()){
    toast("Accès administrateur refusé.");
    return;
  }

  renderDashboard();
  openModal("dashboardModal");
};


function renderDashboard(){

  const catalogValue=PRODUCTS.reduce(
    (sum,p)=>sum+p.price,
    0
  );

  const freeOrders=orders.filter(
    o=>Number(o.discountPercent)===100
  ).length;

  document.querySelector("#statOrders").textContent=orders.length;

  document.querySelector("#statFree").textContent=freeOrders;

  document.querySelector("#statCatalog").textContent=
    money(catalogValue);

  const ordersBox=document.querySelector("#adminOrders");

  if(!orders.length){

    ordersBox.innerHTML=`
      <div class="info-box">Aucune commande.</div>
    `;

  }else{

    ordersBox.innerHTML=`
      <table class="admin-table">
        <tr>
          <th>N°</th>
          <th>Client</th>
          <th>Total</th>
          <th>Date</th>
        </tr>

        ${
          orders.map(o=>`
            <tr>
              <td>${escapeHTML(o.number)}</td>
              <td>${escapeHTML(o.customerName)}</td>
              <td>${money(o.total)}</td>
              <td>${escapeHTML(o.date)}</td>
            </tr>
          `).join("")
        }

      </table>
    `;
  }

  const usersBox=document.querySelector("#adminUsers");

  usersBox.innerHTML=`
    <div class="info-box">
      Utilisateurs démo enregistrés localement :
      <b>${demoUsers.length}</b>
    </div>
  `;
}


document.querySelector("#resetDemoBtn").onclick=()=>{

  const ok=confirm(
    "Réinitialiser commandes, avis, panier et favoris ?"
  );

  if(!ok) return;

  localStorage.removeItem(STORAGE.cart);
  localStorage.removeItem(STORAGE.favorites);
  localStorage.removeItem(STORAGE.orders);
  localStorage.removeItem(STORAGE.reviews);

  cart={};
  favorites=[];
  orders=[];
  reviews={};

  renderCart();
  renderProducts();
  renderDashboard();

  toast("Données démo réinitialisées.");
};


/* =========================================================
   PROMOS / CHECKOUT
========================================================= */

const PROMOS={
  NOVA100:100,
  NOVA20:20,
  NOVA10:10
};

document.querySelector("#promoCode").addEventListener("input",()=>{
  updateCheckout();
});

function calculateCheckout(){

  const subtotal=cartSubtotal();

  const code=document.querySelector("#promoCode").value
    .trim()
    .toUpperCase();

  const percent=PROMOS[code] ?? 0;

  const discount=subtotal*(percent/100);

  const total=Math.max(0,subtotal-discount);

  return {
    subtotal,
    code,
    percent,
    discount,
    total
  };
}

function updateCheckout(){

  const data=calculateCheckout();

  appliedPromo=data.percent ? {
    code:data.code,
    percent:data.percent
  } : null;

  const result=document.querySelector("#promoResult");

  if(data.code && PROMOS[data.code]!==undefined){

    result.style.display="block";

    result.textContent=
      `Code accepté : -${data.percent}%`;

  }else if(data.code){

    result.style.display="block";
    result.style.background="#fff1f2";
    result.style.color="#a51d2d";
    result.textContent="Code promotionnel invalide.";

  }else{

    result.style.display="none";
  }

  result.style.background=
    data.percent ? "#eef8f1" : result.style.background;

  result.style.color=
    data.percent ? "#12683d" : result.style.color;

  document.querySelector("#checkoutSummary").innerHTML=`
    <div style="display:flex;justify-content:space-between">
      <span>Sous-total</span>
      <b>${money(data.subtotal)}</b>
    </div>

    <div style="display:flex;justify-content:space-between">
      <span>Réduction</span>
      <b>${data.percent ? "-"+money(data.discount) : "0,00 €"}</b>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid #ddd;font-size:17px">
      <span>Total</span>
      <b>${money(data.total)}</b>
    </div>
  `;

  const payButton=document.querySelector("#payButton");

  payButton.textContent=
    data.percent===100
      ? "Payer 0,00 € avec le code"
      : `Payer ${money(data.total)}`;

  /*
    Démo : seul le code 100 % active la validation locale.
  */
  payButton.disabled=
    data.percent!==100 || !cartArray().length;
}


document.querySelector("#checkoutBtn").onclick=()=>{

  if(!requireLogin()) return;

  if(!cartArray().length){
    toast("Ton panier est vide.");
    return;
  }

  closeCart();

  updateCheckout();

  openModal("checkoutModal");
};


document.querySelector("#checkoutForm").addEventListener("submit",e=>{

  e.preventDefault();

  if(!currentUser){
    toast("Connecte-toi.");
    return;
  }

  const data=calculateCheckout();

  if(data.percent!==100){
    toast("Utilise un code promotionnel de 100 % pour la démo.");
    return;
  }

  if(!cartArray().length){
    toast("Panier vide.");
    return;
  }

  const order={
    id:crypto.randomUUID(),
    number:"NOVA-"+Date.now().toString().slice(-8),
    uid:currentUser.uid,
    customerName:document.querySelector("#fullName").value.trim(),
    email:currentUser.email || "",
    address:document.querySelector("#address").value.trim(),
    postalCode:document.querySelector("#postalCode").value.trim(),
    city:document.querySelector("#city").value.trim(),
    country:document.querySelector("#country").value.trim(),
    warehouse:"Entrepôt",
    items:cartArray().map(({product,qty})=>({
      id:product.id,
      name:product.name,
      price:product.price,
      qty
    })),
    subtotal:data.subtotal,
    discount:data.discount,
    discountPercent:data.percent,
    promoCode:data.code,
    total:data.total,
    paymentMethod:"Code promotionnel",
    date:new Date().toLocaleString("fr-FR")
  };

  orders.unshift(order);

  save(STORAGE.orders,orders);

  cart={};
  save(STORAGE.cart,cart);

  renderCart();

  closeModal("checkoutModal");

  showInvoice(order);

  toast("Commande créée 🎉");
});


/* =========================================================
   COMMANDES
========================================================= */

document.querySelector("#ordersBtn").onclick=()=>{

  if(!requireLogin()) return;

  renderOrders();
  openModal("ordersModal");
};


function userOrders(){

  if(!currentUser) return [];

  return orders.filter(
    o=>o.uid===currentUser.uid
  );
}

function renderOrders(){

  const box=document.querySelector("#ordersList");
  const list=userOrders();

  if(!list.length){

    box.innerHTML=`
      <div class="info-box">
        Tu n'as encore aucune commande.
      </div>
    `;

    return;
  }

  box.innerHTML=list.map(order=>`
    <div class="user-card">

      <b>${escapeHTML(order.number)}</b>

      <div>
        ${escapeHTML(order.date)}
      </div>

      <div style="margin-top:8px">
        Total :
        <strong>${money(order.total)}</strong>
      </div>

      <div style="margin-top:5px;color:#16834b;font-size:13px">
        ${escapeHTML(order.paymentMethod)}
      </div>

      <button class="btn" style="margin-top:12px" data-invoice="${order.id}">
        Voir la facture
      </button>

    </div>
  `).join("");
}


/* =========================================================
   FACTURE
========================================================= */

function showInvoice(order){

  const items=order.items;

  document.querySelector("#invoiceContent").innerHTML=`
    <div class="invoice-head">

      <div class="invoice-logo">
        NOVA<span>SHOP</span>
      </div>

      <div class="invoice-meta">
        FACTURE<br>
        <b>${escapeHTML(order.number)}</b><br>
        ${escapeHTML(order.date)}
      </div>

    </div>

    <div class="invoice-client">

      <div>
        <b>Client</b><br>
        ${escapeHTML(order.customerName)}<br>
        ${escapeHTML(order.email)}
      </div>

      <div>
        <b>Adresse de livraison</b><br>
        ${escapeHTML(order.address)}<br>
        ${escapeHTML(order.postalCode)}
        ${escapeHTML(order.city)}<br>
        ${escapeHTML(order.country)}
      </div>

    </div>

    <div style="margin-bottom:15px">
      <b>Entrepôt :</b> ${escapeHTML(order.warehouse)}
    </div>

    <table class="invoice-table">

      <thead>
        <tr>
          <th>Produit</th>
          <th>Qté</th>
          <th>Prix</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>

        ${
          items.map(item=>`
            <tr>
              <td>${escapeHTML(item.name)}</td>
              <td>${item.qty}</td>
              <td>${money(item.price)}</td>
              <td>${money(item.price*item.qty)}</td>
            </tr>
          `).join("")
        }

      </tbody>

    </table>

    <div class="invoice-total">

      <div>
        <span>Sous-total</span>
        <b>${money(order.subtotal)}</b>
      </div>

      <div>
        <span>Réduction</span>
        <b>- ${money(order.discount)}</b>
      </div>

      <div>
        <span>Paiement</span>
        <b>${escapeHTML(order.paymentMethod)}</b>
      </div>

      <div class="grand">
        <span>Total payé</span>
        <b>${money(order.total)}</b>
      </div>

    </div>

    <div style="margin-top:45px;padding-top:15px;border-top:1px solid #ddd;color:#777;font-size:11px">
      Facture générée par NovaShop.
      Commande démo.
    </div>
  `;

  openModal("invoiceModal");
}


/* =========================================================
   RECHERCHE / CATEGORIES
========================================================= */

document.querySelector("#searchBtn").onclick=()=>{

  currentSearch=document.querySelector("#searchInput").value.trim();

  renderProducts();
};

document.querySelector("#searchInput").addEventListener("keydown",e=>{

  if(e.key==="Enter"){

    currentSearch=e.target.value.trim();

    renderProducts();
  }
});

document.querySelector("#sortSelect").addEventListener(
  "change",
  renderProducts
);


document.querySelectorAll(".cat").forEach(button=>{

  button.addEventListener("click",()=>{

    document.querySelectorAll(".cat").forEach(
      b=>b.classList.remove("active")
    );

    button.classList.add("active");

    currentCategory=button.dataset.category;

    renderProducts();
  });
});


/* =========================================================
   CLICS PRODUITS
========================================================= */

document.addEventListener("click",e=>{

  const add=e.target.closest("[data-add]");

  if(add){
    addToCart(add.dataset.add);
    return;
  }

  const view=e.target.closest("[data-view]");

  if(view){
    openProduct(view.dataset.view);
    return;
  }

  const fav=e.target.closest("[data-fav]");

  if(fav){
    toggleFavorite(fav.dataset.fav);
    return;
  }

  const plus=e.target.closest("[data-plus]");

  if(plus){
    changeQty(plus.dataset.plus,1);
    return;
  }

  const minus=e.target.closest("[data-minus]");

  if(minus){
    changeQty(minus.dataset.minus,-1);
    return;
  }

  const remove=e.target.closest("[data-remove]");

  if(remove){
    removeFromCart(remove.dataset.remove);
    return;
  }

  const invoice=e.target.closest("[data-invoice]");

  if(invoice){

    const order=orders.find(
      o=>o.id===invoice.dataset.invoice
    );

    if(order){
      showInvoice(order);
    }

    return;
  }

});


/* =========================================================
   FERMETURE MODALES
========================================================= */

document.addEventListener("click",e=>{

  const close=e.target.closest("[data-close]");

  if(close){
    closeModal(close.dataset.close);
  }
});


document.querySelector("#overlay").onclick=closeCart;

document.querySelector("#closeCart").onclick=closeCart;


/* =========================================================
   FACTURE IMPRESSION
========================================================= */

document.querySelector("#printInvoiceBtn").onclick=()=>{
  window.print();
};


/* =========================================================
   INIT
========================================================= */

setupAuthTabs();
renderProducts();
renderCart();


/* =========================================================
   NETTOYAGE IMAGE / PRODUIT
========================================================= */

window.addEventListener("error",e=>{

  if(
    e.target &&
    e.target.tagName==="IMG"
  ){
    const img=e.target;

    const card=img.closest(".card");

    if(card){
      card.remove();
    }
  }

},true);
