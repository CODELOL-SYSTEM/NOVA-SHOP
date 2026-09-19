import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
   apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS = [

  {
    id:"b650-aorus",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description:"Carte mère gaming AMD AM5 pensée pour les configurations modernes."
  },

  {
    id:"pc-7800x3d-9070xt",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description:"PC gamer haut de gamme avec Ryzen 7 7800X3D, RX 9070 XT et 32 Go DDR5."
  },

  {
    id:"hyperx-cloud-2",
    name:"HyperX Cloud II – Casque gaming",
    category:"Casques",
    price:49.99,
    image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
    description:"Casque gaming confortable pour jouer et écouter ses contenus."
  },

  {
    id:"tecors-60",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
    description:"Clavier mécanique compact au format 60 % avec disposition AZERTY."
  },

  {
    id:"celshading-65",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description:"Clavier magnétique 65 % au design noir."
  },

  {
    id:"ajazz-aj199",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description:"Souris gaming sans fil légère avec coque effet fibre de carbone."
  },

  {
    id:"logitech-pro-x2",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description:"Souris gaming haut de gamme pensée pour les joueurs compétitifs."
  },

  {
    id:"990pro-1tb",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
    description:"SSD NVMe PCIe 4.0 haute performance de 1 To."
  },

  {
    id:"990pro-2tb",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp",
    description:"SSD NVMe Samsung 990 PRO avec 2 To de stockage."
  },

  {
    id:"rm1000x",
    name:"CORSAIR RM1000x (EU)",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
    description:"Alimentation Corsair 1000 W pour configuration gaming haut de gamme."
  },

  {
    id:"rm850x",
    name:"CORSAIR RM850x (EU)",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
    description:"Alimentation Corsair 850 W adaptée aux configurations gaming."
  },

  {
    id:"5000d",
    name:"Corsair Frame 5000D RS ARGB (Noir)",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
    description:"Boîtier gaming spacieux avec compatibilité composants haut de gamme."
  },

  {
    id:"arctic-360",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
    description:"Watercooling AIO 360 mm pour refroidissement performant."
  },

  {
    id:"odyssey-g6",
    name:'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category:"Écrans",
    price:399.95,
    image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
    description:"Écran gaming 27 pouces QD-OLED."
  },

  {
    id:"elgato-arm",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5",
    description:"Bras articulé premium pour microphone de streaming."
  },

  {
    id:"dualsense-red",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    description:"Manette Sony DualSense Cosmic Red compatible PS5 et PC."
  }

];


/* =========================================================
   ETAT
========================================================= */

let currentUser = null;
let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "relevance";
let selectedProduct = null;
let verifiedPromo = null;

let cart = loadJSON("novashop_cart", []);
let favorites = loadJSON("novashop_favorites", []);
let reviews = loadJSON("novashop_reviews", []);
let orders = loadJSON("novashop_orders", []);


/* =========================================================
   UTILITAIRES
========================================================= */

function $(selector){
  return document.querySelector(selector);
}

function $$(selector){
  return [...document.querySelectorAll(selector)];
}

function loadJSON(key, fallback){
  try{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}

function saveJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
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
  const element = $("#toast");

  if(!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(()=>{
    element.classList.remove("show");
  },2800);
}

function openModal(id){
  const modal = document.getElementById(id);

  if(modal){
    modal.classList.add("show");
  }
}

function closeModal(id){
  const modal = document.getElementById(id);

  if(modal){
    modal.classList.remove("show");
  }
}

function openCart(){
  $("#cartDrawer").classList.add("show");
  $("#overlay").classList.add("show");
}

function closeCart(){
  $("#cartDrawer").classList.remove("show");

  if(
    !$$(".modal.show").length
  ){
    $("#overlay").classList.remove("show");
  }
}

function closeEverything(){
  closeCart();

  $$(".modal.show").forEach(modal=>{
    modal.classList.remove("show");
  });

  $("#overlay").classList.remove("show");
}


/* =========================================================
   AVIS
========================================================= */

function getProductReviews(productId){
  return reviews.filter(r=>r.productId===productId);
}

function averageRating(productId){

  const list = getProductReviews(productId);

  if(!list.length){
    return 0;
  }

  return list.reduce((sum,r)=>sum+r.rating,0)/list.length;
}

function starsHTML(rating){

  const rounded = Math.round(rating);

  return Array.from({length:5},(_,i)=>
    i < rounded ? "★" : "☆"
  ).join("");
}


/* =========================================================
   PRODUITS
========================================================= */

function filteredProducts(){

  let list = PRODUCTS.filter(product=>{

    const categoryOK =
      currentCategory === "Tous" ||
      product.category === currentCategory;

    const text =
      `${product.name} ${product.category} ${product.description}`
      .toLowerCase();

    const searchOK =
      !currentSearch ||
      text.includes(currentSearch.toLowerCase());

    return categoryOK && searchOK;
  });

  if(currentSort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(currentSort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(currentSort==="name"){
    list.sort((a,b)=>a.name.localeCompare(b.name,"fr"));
  }

  return list;
}

function renderProducts(){

  const grid = $("#productsGrid");
  const empty = $("#emptyState");

  if(!grid) return;

  grid.innerHTML = "";

  const list = filteredProducts();

  $("#resultCount").textContent =
    `${list.length} produit${list.length>1?"s":""}`;

  empty.style.display =
    list.length ? "none" : "block";

  list.forEach(product=>{

    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.id = product.id;

    const avg = averageRating(product.id);

    const favorite =
      favorites.includes(product.id);

    card.innerHTML = `
      <div class="product-image">

        <button class="favorite ${favorite?"active":""}" data-favorite="${product.id}">
          ${favorite ? "♥" : "♡"}
        </button>

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div class="product-body">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          <span class="stars">
            ${starsHTML(avg || 0)}
          </span>

          <span>
            ${avg ? avg.toFixed(1) : "Nouveau"}
          </span>
        </div>

        <div class="product-bottom">

          <div class="price">
            ${money(product.price)}
          </div>

          <button class="add" data-add="${product.id}">
            🛒 Ajouter
          </button>

        </div>

        <button
          data-view="${product.id}"
          style="
            margin-top:10px;
            width:100%;
            height:34px;
            background:white;
            border:1px solid #e5e7eb;
            border-radius:7px;
            font-size:12px;
            font-weight:800;
          "
        >
          Voir le produit
        </button>

      </div>
    `;

    /*
      IMPORTANT:
      Une erreur d'image ne doit supprimer QUE cette carte.
      Pas toute la page.
    */

    const image = card.querySelector("img");

    image.addEventListener("error",()=>{
      card.remove();

      const remaining =
        $("#productsGrid").children.length;

      $("#resultCount").textContent =
        `${remaining} produit${remaining>1?"s":""}`;
    });

    grid.appendChild(card);
  });
}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

  if(favorites.includes(id)){
    favorites =
      favorites.filter(item=>item!==id);

    toast("Retiré des favoris.");
  }else{
    favorites.push(id);

    toast("Ajouté aux favoris.");
  }

  saveJSON("novashop_favorites",favorites);

  renderProducts();
}


/* =========================================================
   PANIER
========================================================= */

function addToCart(id){

  const product =
    PRODUCTS.find(p=>p.id===id);

  if(!product) return;

  const existing =
    cart.find(item=>item.id===id);

  if(existing){
    existing.quantity++;
  }else{
    cart.push({
      id,
      quantity:1
    });
  }

  saveJSON("novashop_cart",cart);

  renderCart();

  toast("Produit ajouté au panier.");
}

function removeFromCart(id){

  cart =
    cart.filter(item=>item.id!==id);

  saveJSON("novashop_cart",cart);

  renderCart();
}

function changeQuantity(id,amount){

  const item =
    cart.find(x=>x.id===id);

  if(!item) return;

  item.quantity += amount;

  if(item.quantity<=0){
    removeFromCart(id);
    return;
  }

  saveJSON("novashop_cart",cart);

  renderCart();
}

function cartTotal(){

  return cart.reduce((total,item)=>{

    const product =
      PRODUCTS.find(p=>p.id===item.id);

    if(!product) return total;

    return total +
      product.price * item.quantity;

  },0);
}

function cartCount(){

  return cart.reduce(
    (total,item)=>total+item.quantity,
    0
  );
}

function renderCart(){

  const container = $("#cartItems");

  if(!container) return;

  container.innerHTML = "";

  if(!cart.length){

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:60px 20px;
        color:#6b7280;
      ">
        <div style="font-size:45px">🛒</div>
        <strong>Votre panier est vide</strong>
        <p style="margin-top:8px;font-size:13px">
          Ajoutez un produit pour commencer.
        </p>
      </div>
    `;

  }else{

    cart.forEach(item=>{

      const product =
        PRODUCTS.find(p=>p.id===item.id);

      if(!product) return;

      const row =
        document.createElement("div");

      row.className = "cart-item";

      row.innerHTML = `
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

        <div>

          <div class="cart-item-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="cart-item-price">
            ${money(product.price * item.quantity)}
          </div>

          <div class="qty">

            <button data-minus="${product.id}">
              −
            </button>

            <strong>${item.quantity}</strong>

            <button data-plus="${product.id}">
              +
            </button>

          </div>

          <button
            class="remove"
            data-remove="${product.id}"
          >
            Supprimer
          </button>

        </div>
      `;

      container.appendChild(row);
    });
  }

  $("#cartCount").textContent =
    cartCount();

  $("#cartTotal").textContent =
    money(cartTotal());

  $("#checkoutButton").disabled =
    !cart.length;
}


/* =========================================================
   FICHE PRODUIT
========================================================= */

function openProduct(id){

  const product =
    PRODUCTS.find(p=>p.id===id);

  if(!product) return;

  selectedProduct = product;

  const avg =
    averageRating(product.id);

  const productReviews =
    getProductReviews(product.id);

  $("#productDetail").innerHTML = `

    <div class="product-detail">

      <div class="detail-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div>

        <div class="detail-category">
          ${escapeHTML(product.category)}
        </div>

        <h2 class="detail-title">
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">
          <span class="stars">
            ${starsHTML(avg)}
          </span>

          <span>
            ${avg
              ? `${avg.toFixed(1)} / 5`
              : "Aucun avis"}
          </span>
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p style="
          color:#6b7280;
          line-height:1.7;
          font-size:14px;
          margin-bottom:20px;
        ">
          ${escapeHTML(product.description)}
        </p>

        <button
          class="primary"
          id="detailAddButton"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>

    <div style="margin-top:35px">

      <h3 style="margin-bottom:15px">
        Avis clients
      </h3>

      ${
        currentUser
        ? `
          <div class="info" style="margin-bottom:20px">

            <div class="form">

              <label>Note</label>

              <select id="reviewRating">
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>

              <label>Commentaire</label>

              <textarea
                id="reviewComment"
                rows="3"
                placeholder="Votre avis..."
              ></textarea>

              <button
                class="primary"
                id="submitReview"
              >
                Publier mon avis
              </button>

            </div>

          </div>
        `
        : `
          <div class="info">
            Connecte-toi pour publier un avis.
          </div>
        `
      }

      <div>

        ${
          productReviews.length
          ? productReviews.map(review=>`

              <div class="review">

                <div class="review-head">

                  <span class="review-name">
                    ${escapeHTML(review.author)}
                  </span>

                  <span class="review-date">
                    ${escapeHTML(review.date)}
                  </span>

                </div>

                <div class="stars">
                  ${starsHTML(review.rating)}
                </div>

                <p>
                  ${escapeHTML(review.comment)}
                </p>

              </div>

          `).join("")
          : `
            <div class="info">
              Aucun avis pour le moment.
            </div>
          `
        }

      </div>

    </div>
  `;

  openModal("productModal");

  $("#detailAddButton")?.addEventListener("click",()=>{
    addToCart(product.id);
  });

  $("#submitReview")?.addEventListener("click",()=>{
    submitReview(product.id);
  });
}


/* =========================================================
   AVIS UTILISATEUR
========================================================= */

function submitReview(productId){

  if(!currentUser){
    toast("Connecte-toi pour publier un avis.");
    return;
  }

  const already =
    reviews.some(
      r =>
        r.productId===productId &&
        r.userId===currentUser.uid
    );

  if(already){
    toast("Tu as déjà évalué ce produit.");
    return;
  }

  const rating =
    Number($("#reviewRating").value);

  const comment =
    $("#reviewComment").value.trim();

  if(!comment){
    toast("Écris un commentaire.");
    return;
  }

  const rawName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Client";

  const shortName =
    rawName.slice(0,3) + "***";

  reviews.push({
    id:crypto.randomUUID(),
    productId,
    userId:currentUser.uid,
    author:shortName,
    rating,
    comment,
    date:new Date().toLocaleDateString("fr-FR")
  });

  saveJSON("novashop_reviews",reviews);

  toast("Avis publié.");

  openProduct(productId);

  renderProducts();
}


/* =========================================================
   AUTH
========================================================= */

async function signupWithEmail(){

  const email =
    $("#signupEmail").value.trim();

  const phone =
    $("#signupPhone").value.trim();

  const password =
    $("#signupPassword").value;

  const confirmPassword =
    $("#signupPasswordConfirm").value;

  if(!email || !phone || !password || !confirmPassword){

    toast(
      "E-mail, téléphone et mot de passe obligatoires."
    );

    return;
  }

  if(password !== confirmPassword){

    toast(
      "Les mots de passe ne correspondent pas."
    );

    return;
  }

  if(password.length < 6){

    toast(
      "Le mot de passe doit contenir au moins 6 caractères."
    );

    return;
  }

  try{

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(
      credential.user,
      {
        displayName:phone
      }
    );

    localStorage.setItem(
      "novashop_phone_" + credential.user.uid,
      phone
    );

    toast("Compte créé avec succès.");

    closeModal("authModal");

  }catch(error){

    console.error(error);

    if(error.code==="auth/email-already-in-use"){

      toast("Cet e-mail est déjà utilisé.");

    }else if(error.code==="auth/invalid-email"){

      toast("Adresse e-mail invalide.");

    }else if(error.code==="auth/weak-password"){

      toast("Mot de passe trop faible.");

    }else{

      toast(
        "Erreur Firebase : " +
        error.message
      );
    }
  }
}

async function loginWithEmail(){

  const email =
    $("#loginEmail").value.trim();

  const password =
    $("#loginPassword").value;

  if(!email || !password){

    toast("Remplis les deux champs.");

    return;
  }

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast("Connexion réussie.");

    closeModal("authModal");

  }catch(error){

    console.error(error);

    if(
      error.code==="auth/invalid-credential" ||
      error.code==="auth/wrong-password"
    ){

      toast("E-mail ou mot de passe incorrect.");

    }else if(
      error.code==="auth/user-not-found"
    ){

      toast("Compte introuvable.");

    }else{

      toast(
        "Erreur : " +
        error.message
      );
    }
  }
}

async function loginGoogle(){

  try{

    const provider =
      new GoogleAuthProvider();

    await signInWithPopup(
      auth,
      provider
    );

    toast("Connexion Google réussie.");

    closeModal("authModal");

  }catch(error){

    console.error(error);

    toast(
      "Connexion Google impossible."
    );
  }
}

async function logout(){

  try{

    await signOut(auth);

    toast("Déconnexion réussie.");

    closeEverything();

  }catch(error){

    console.error(error);

    toast("Erreur de déconnexion.");
  }
}


/* =========================================================
   ETAT AUTH
========================================================= */

onAuthStateChanged(auth,user=>{

  currentUser = user;

  updateHeader();

  if(user){

    console.log(
      "Utilisateur connecté :",
      user.email
    );
  }

});


function updateHeader(){

  const accountButton =
    $("#accountButton");

  if(!accountButton) return;

  if(currentUser){

    accountButton.textContent =
      "👤 " +
      (
        currentUser.email
        ? currentUser.email.split("@")[0]
        : "Compte"
      );

    $("#ordersButton").style.display =
      "inline-block";

  }else{

    accountButton.textContent =
      "👤 Compte";

    $("#ordersButton").style.display =
      "none";
  }

}


/* =========================================================
   COMPTE
========================================================= */

function openAccount(){

  if(!currentUser){

    openModal("authModal");

    return;
  }

  $("#accountEmail").textContent =
    currentUser.email || "-";

  const phone =
    localStorage.getItem(
      "novashop_phone_" +
      currentUser.uid
    );

  $("#accountPhone").textContent =
    phone ||
    currentUser.displayName ||
    "Non renseigné";

  openModal("accountModal");
}


/* =========================================================
   COMMANDES
========================================================= */

function userOrders(){

  if(!currentUser) return [];

  return orders.filter(
    order =>
      order.userId === currentUser.uid
  );
}

function openOrders(){

  if(!currentUser){

    openModal("authModal");

    return;
  }

  const list =
    userOrders();

  const container =
    $("#ordersList");

  if(!list.length){

    container.innerHTML = `
      <div class="info">
        Tu n'as encore aucune commande.
      </div>
    `;

  }else{

    container.innerHTML =
      list.map(order=>`

        <div class="order-card">

          <div class="order-head">

            <strong>
              ${escapeHTML(order.number)}
            </strong>

            <span class="status">
              ${escapeHTML(order.status)}
            </span>

          </div>

          <div style="
            color:#6b7280;
            font-size:12px;
          ">
            ${escapeHTML(order.date)}
          </div>

          <div style="
            margin-top:8px;
            font-weight:800;
          ">
            ${money(order.total)}
          </div>

          <button
            class="secondary"
            style="margin-top:10px"
            data-invoice="${order.id}"
          >
            Voir la facture
          </button>

        </div>

      `).join("");
  }

  openModal("ordersModal");
}


/* =========================================================
   PROMOS
========================================================= */

const PROMOS = {
  NOVA100:100,
  NOVA20:20,
  NOVA10:10
};

function checkPromo(){

  const code =
    $("#promoCode").value
      .trim()
      .toUpperCase();

  const result =
    $("#promoResult");

  verifiedPromo = null;

  if(!code){

    result.textContent =
      "Entre un code promo.";

    result.style.color =
      "#dc2626";

    $("#payButton").disabled = true;

    return;
  }

  if(!(code in PROMOS)){

    result.textContent =
      "Code promo invalide.";

    result.style.color =
      "#dc2626";

    $("#payButton").disabled = true;

    return;
  }

  verifiedPromo = {
    code,
    discount:PROMOS[code]
  };

  result.textContent =
    `Code accepté : -${PROMOS[code]} %`;

  result.style.color =
    "#16a34a";

  $("#payButton").disabled = false;

  renderCheckoutSummary();
}


/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckoutSummary(){

  const subtotal =
    cartTotal();

  const discount =
    verifiedPromo
      ? subtotal *
        (verifiedPromo.discount/100)
      : 0;

  const total =
    Math.max(
      0,
      subtotal-discount
    );

  $("#checkoutSummary").innerHTML = `

    <div style="
      display:flex;
      justify-content:space-between;
      margin-bottom:5px;
    ">
      <span>Sous-total</span>
      <strong>${money(subtotal)}</strong>
    </div>

    ${
      verifiedPromo
      ? `
        <div style="
          display:flex;
          justify-content:space-between;
          color:#16a34a;
        ">
          <span>Réduction</span>
          <strong>-${money(discount)}</strong>
        </div>
      `
      : ""
    }

    <div style="
      display:flex;
      justify-content:space-between;
      margin-top:8px;
      padding-top:8px;
      border-top:1px solid #e5e7eb;
      font-size:17px;
    ">
      <strong>Total</strong>
      <strong>${money(total)}</strong>
    </div>

  `;
}

function openCheckout(){

  if(!currentUser){

    toast(
      "Connecte-toi avant de commander."
    );

    openModal("authModal");

    return;
  }

  if(!cart.length){

    toast("Le panier est vide.");

    return;
  }

  verifiedPromo = null;

  $("#promoCode").value = "";

  $("#promoResult").textContent = "";

  $("#payButton").disabled = true;

  renderCheckoutSummary();

  openModal("checkoutModal");
}


/* =========================================================
   CREER COMMANDE
========================================================= */

function createOrder(){

  if(!currentUser){

    toast("Connecte-toi.");

    return;
  }

  if(!verifiedPromo){

    toast(
      "Un code promo valide est nécessaire pour cette démo."
    );

    return;
  }

  const fullName =
    $("#fullName").value.trim();

  const address =
    $("#address").value.trim();

  const postalCode =
    $("#postalCode").value.trim();

  const city =
    $("#city").value.trim();

  const country =
    $("#country").value.trim();

  if(
    !fullName ||
    !address ||
    !postalCode ||
    !city ||
    !country
  ){

    toast("Remplis tous les champs.");

    return;
  }

  const subtotal =
    cartTotal();

  const discount =
    subtotal *
    (verifiedPromo.discount/100);

  const total =
    Math.max(
      0,
      subtotal-discount
    );

  const order = {

    id:crypto.randomUUID(),

    number:
      "NOVA-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(
        100000 +
        Math.random()*900000
      ),

    userId:
      currentUser.uid,

    email:
      currentUser.email,

    customer:{
      fullName,
      address,
      postalCode,
      city,
      country
    },

    items:
      cart.map(item=>{

        const product =
          PRODUCTS.find(
            p=>p.id===item.id
          );

        return {
          id:product.id,
          name:product.name,
          price:product.price,
          quantity:item.quantity,
          image:product.image
        };

      }),

    subtotal,

    discount,

    total,

    promo:
      verifiedPromo.code,

    payment:
      "Code promotionnel",

    warehouse:
      "Entrepôt",

    status:
      "Commande confirmée",

    date:
      new Date().toLocaleString(
        "fr-FR"
      )

  };

  orders.unshift(order);

  saveJSON(
    "novashop_orders",
    orders
  );

  cart = [];

  saveJSON(
    "novashop_cart",
    cart
  );

  renderCart();

  closeModal("checkoutModal");

  showInvoice(order);

  toast(
    "Commande créée avec succès."
  );

  renderAdmin();
}


/* =========================================================
   FACTURE
========================================================= */

function showInvoice(order){

  const itemsHTML =
    order.items.map(item=>`

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

  $("#invoiceContent").innerHTML = `

    <div class="invoice-top">

      <div>

        <div class="invoice-logo">
          NOVA<span style="color:#2563eb">SHOP</span>
        </div>

        <div style="
          color:#6b7280;
          font-size:12px;
          margin-top:5px;
        ">
          Marketplace Gaming & High-Tech
        </div>

      </div>

      <div class="invoice-meta">

        <strong>FACTURE</strong><br>

        ${escapeHTML(order.number)}<br>

        ${escapeHTML(order.date)}

      </div>

    </div>

    <div class="invoice-customer">

      <div>

        <h4>Client</h4>

        <div style="font-size:13px;line-height:1.7">

          ${escapeHTML(
            order.customer.fullName
          )}<br>

          ${escapeHTML(
            order.email
          )}

        </div>

      </div>

      <div>

        <h4>Livraison</h4>

        <div style="font-size:13px;line-height:1.7">

          ${escapeHTML(
            order.customer.address
          )}<br>

          ${escapeHTML(
            order.customer.postalCode
          )}
          ${escapeHTML(
            order.customer.city
          )}<br>

          ${escapeHTML(
            order.customer.country
          )}

        </div>

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

        ${itemsHTML}

      </tbody>

    </table>

    <div class="invoice-total">

      <div>
        <span>Sous-total</span>
        <strong>${money(order.subtotal)}</strong>
      </div>

      <div>
        <span>Réduction</span>
        <strong>
          -${money(order.discount)}
        </strong>
      </div>

      <div>
        <span>Code</span>
        <strong>${escapeHTML(order.promo)}</strong>
      </div>

      <div>
        <span>Paiement</span>
        <strong>${escapeHTML(order.payment)}</strong>
      </div>

      <div class="grand">
        <span>Total payé</span>
        <strong>${money(order.total)}</strong>
      </div>

    </div>

    <div style="
      margin-top:30px;
      color:#6b7280;
      font-size:11px;
      line-height:1.6;
    ">
      Entrepôt : ${escapeHTML(order.warehouse)}<br>
      Document généré par NovaShop.
    </div>

  `;

  openModal("invoiceModal");
}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return (
    localStorage.getItem(
      "novashop_demo_admin"
    ) === "true"
  );
}

function openAdmin(){

  if(!isAdmin()){

    const code =
      prompt(
        "Code administrateur NovaShop :"
      );

    if(code!=="NOVA-ADMIN-2026"){

      toast("Code administrateur incorrect.");

      return;
    }

    localStorage.setItem(
      "novashop_demo_admin",
      "true"
    );
  }

  renderAdmin();

  openModal("dashboardModal");
}

function renderAdmin(){

  $("#adminButton").style.display =
    isAdmin()
      ? "inline-block"
      : "none";

  if(!isAdmin()) return;

  const allOrders =
    orders;

  const freeOrders =
    orders.filter(
      order =>
        Number(order.total)===0
    );

  const catalogValue =
    PRODUCTS.reduce(
      (sum,p)=>sum+p.price,
      0
    );

  $("#adminOrders").textContent =
    allOrders.length;

  $("#adminFreeOrders").textContent =
    freeOrders.length;

  $("#adminCatalogValue").textContent =
    money(catalogValue);

  $("#adminOrdersTable").innerHTML =
    allOrders.length
    ? allOrders.map(order=>`

      <tr>

        <td>
          ${escapeHTML(order.number)}
        </td>

        <td>
          ${escapeHTML(order.email)}
        </td>

        <td>
          ${money(order.total)}
        </td>

        <td>
          ${escapeHTML(order.promo)}
        </td>

      </tr>

    `).join("")
    : `
      <tr>
        <td colspan="4">
          Aucune commande.
        </td>
      </tr>
    `;
}


/* =========================================================
   RECHERCHE
========================================================= */

function executeSearch(){

  currentSearch =
    $("#searchInput").value.trim();

  renderProducts();

  $("#catalogue").scrollIntoView({
    behavior:"smooth"
  });
}


/* =========================================================
   CATEGORIES
========================================================= */

function selectCategory(category){

  currentCategory = category;

  $$(".category").forEach(button=>{

    button.classList.toggle(
      "active",
      button.dataset.category===category
    );

  });

  renderProducts();
}


/* =========================================================
   EVENEMENTS
========================================================= */

document.addEventListener(
  "click",
  event=>{

    const add =
      event.target.closest("[data-add]");

    if(add){

      addToCart(add.dataset.add);

      return;
    }

    const view =
      event.target.closest("[data-view]");

    if(view){

      openProduct(view.dataset.view);

      return;
    }

    const favorite =
      event.target.closest("[data-favorite]");

    if(favorite){

      toggleFavorite(
        favorite.dataset.favorite
      );

      return;
    }

    const plus =
      event.target.closest("[data-plus]");

    if(plus){

      changeQuantity(
        plus.dataset.plus,
        1
      );

      return;
    }

    const minus =
      event.target.closest("[data-minus]");

    if(minus){

      changeQuantity(
        minus.dataset.minus,
        -1
      );

      return;
    }

    const remove =
      event.target.closest("[data-remove]");

    if(remove){

      removeFromCart(
        remove.dataset.remove
      );

      return;
    }

    const invoice =
      event.target.closest("[data-invoice]");

    if(invoice){

      const order =
        orders.find(
          o=>o.id===invoice.dataset.invoice
        );

      if(order){
        showInvoice(order);
      }

      return;
    }

    const close =
      event.target.closest("[data-close]");

    if(close){

      closeModal(
        close.dataset.close
      );

      return;
    }

  }
);


/* =========================================================
   INIT DOM
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  ()=>{

    renderProducts();

    renderCart();

    renderAdmin();


    /* Recherche */

    $("#searchButton")
      ?.addEventListener(
        "click",
        executeSearch
      );

    $("#searchInput")
      ?.addEventListener(
        "keydown",
        event=>{
          if(event.key==="Enter"){
            executeSearch();
          }
        }
      );


    /* Tri */

    $("#sortSelect")
      ?.addEventListener(
        "change",
        event=>{
          currentSort =
            event.target.value;

          renderProducts();
        }
      );


    /* Catégories */

    $$(".category")
      .forEach(button=>{

        button.addEventListener(
          "click",
          ()=>{
            selectCategory(
              button.dataset.category
            );
          }
        );

      });


    /* Hero */

    $("#heroButton")
      ?.addEventListener(
        "click",
        ()=>{
          $("#catalogue")
            .scrollIntoView({
              behavior:"smooth"
            });
        }
      );


    /* Compte */

    $("#accountButton")
      ?.addEventListener(
        "click",
        openAccount
      );

    $("#footerAccount")
      ?.addEventListener(
        "click",
        event=>{
          event.preventDefault();
          openAccount();
        }
      );


    /* Commandes */

    $("#ordersButton")
      ?.addEventListener(
        "click",
        openOrders
      );

    $("#accountOrders")
      ?.addEventListener(
        "click",
        ()=>{
          closeModal("accountModal");
          openOrders();
        }
      );

    $("#footerOrders")
      ?.addEventListener(
        "click",
        event=>{
          event.preventDefault();
          openOrders();
        }
      );


    /* Panier */

    $("#cartButton")
      ?.addEventListener(
        "click",
        openCart
      );

    $("#footerCart")
      ?.addEventListener(
        "click",
        event=>{
          event.preventDefault();
          openCart();
        }
      );

    $("#closeCart")
      ?.addEventListener(
        "click",
        closeCart
      );

    $("#overlay")
      ?.addEventListener(
        "click",
        closeEverything
      );


    /* Auth */

    $("#loginTab")
      ?.addEventListener(
        "click",
        ()=>{

          $("#loginTab")
            .classList.add("active");

          $("#signupTab")
            .classList.remove("active");

          $("#loginPanel")
            .style.display = "block";

          $("#signupPanel")
            .style.display = "none";

        }
      );


    $("#signupTab")
      ?.addEventListener(
        "click",
        ()=>{

          $("#signupTab")
            .classList.add("active");

          $("#loginTab")
            .classList.remove("active");

          $("#signupPanel")
            .style.display = "block";

          $("#loginPanel")
            .style.display = "none";

        }
      );


    $("#loginForm")
      ?.addEventListener(
        "submit",
        event=>{
          event.preventDefault();
          loginWithEmail();
        }
      );


    $("#signupForm")
      ?.addEventListener(
        "submit",
        event=>{
          event.preventDefault();
          signupWithEmail();
        }
      );


    $("#googleButton")
      ?.addEventListener(
        "click",
        loginGoogle
      );


    $("#logoutButton")
      ?.addEventListener(
        "click",
        logout
      );


    /* Checkout */

    $("#checkoutButton")
      ?.addEventListener(
        "click",
        openCheckout
      );


    $("#checkPromo")
      ?.addEventListener(
        "click",
        checkPromo
      );


    $("#checkoutForm")
      ?.addEventListener(
        "submit",
        event=>{

          event.preventDefault();

          createOrder();

        }
      );


    /* Admin */

    $("#adminButton")
      ?.addEventListener(
        "click",
        openAdmin
      );


    /* Impression facture */

    $("#printInvoice")
      ?.addEventListener(
        "click",
        ()=>{
          window.print();
        }
      );


    /* Echap */

    document.addEventListener(
      "keydown",
      event=>{

        if(event.key==="Escape"){
          closeEverything();
        }

      }
    );

  }
);


/* =========================================================
   FIN
========================================================= */

console.log(
  "%cNovaShop chargé.",
  "font-weight:bold;color:#2563eb;font-size:18px"
);
