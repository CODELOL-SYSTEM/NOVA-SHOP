"use strict";

/* =========================================================
   NOVASHOP
   Front-end marketplace demo
   ========================================================= */

const PRODUCTS = [
  {
    id:"p1",
    name:"AMD Ryzen 5 9600X",
    category:"Processeurs",
    price:249.99,
    code:"NS-CPU-9600X",
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description:"Processeur AMD Ryzen 5 9600X destiné aux configurations gaming et polyvalentes."
  },
  {
    id:"p2",
    name:"Corsair Vengeance RGB 32GB DDR5 6000 CL38",
    category:"RAM",
    price:109.99,
    code:"NS-RAM-COR-32",
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description:"Kit mémoire DDR5 32 Go avec éclairage RGB et fréquence de 6000 MT/s."
  },
  {
    id:"p3",
    name:"Kingston Fury Beast RGB 32GB DDR5 5600 CL36",
    category:"RAM",
    price:99.99,
    code:"NS-RAM-KF-32",
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description:"Mémoire DDR5 Kingston Fury Beast RGB de 32 Go."
  },
  {
    id:"p4",
    name:"Samsung 990 PRO 1TB",
    category:"SSD",
    price:94.99,
    code:"NS-SSD-990P-1T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description:"SSD NVMe PCIe 4.0 Samsung 990 PRO de 1 To."
  },
  {
    id:"p5",
    name:"Samsung 990 PRO 2TB",
    category:"SSD",
    price:159.99,
    code:"NS-SSD-990P-2T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description:"SSD NVMe PCIe 4.0 Samsung 990 PRO de 2 To."
  },
  {
    id:"p6",
    name:"Corsair RM850x",
    category:"Alimentations",
    price:139.99,
    code:"NS-PSU-RM850X",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description:"Alimentation Corsair RM850x conçue pour les configurations gaming puissantes."
  },
  {
    id:"p7",
    name:"Corsair 5000D Airflow",
    category:"Boîtiers",
    price:149.99,
    code:"NS-CASE-5000D",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description:"Boîtier ATX Corsair 5000D Airflow avec conception orientée circulation d'air."
  },
  {
    id:"p8",
    name:"ARCTIC Liquid Freezer III 360",
    category:"Refroidissement",
    price:119.99,
    code:"NS-AIO-LF3-360",
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description:"Watercooling AIO 360 mm ARCTIC Liquid Freezer III."
  },
  {
    id:"p9",
    name:"Samsung Odyssey OLED G6",
    category:"Écrans",
    price:649.99,
    code:"NS-MON-OLED-G6",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description:"Écran gaming Samsung Odyssey OLED G6."
  },
  {
    id:"p10",
    name:"Logitech G PRO X TKL",
    category:"Claviers",
    price:179.99,
    code:"NS-KB-PROX-TKL",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description:"Clavier gaming Logitech G PRO X TKL."
  },
  {
    id:"p11",
    name:"Logitech G PRO X SUPERLIGHT 2",
    category:"Souris",
    price:139.99,
    code:"NS-MOUSE-SUPERLIGHT2",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description:"Souris gaming Logitech G PRO X SUPERLIGHT 2."
  },
  {
    id:"p12",
    name:"Elgato Wave:3",
    category:"Micros",
    price:129.99,
    code:"NS-MIC-WAVE3",
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description:"Microphone USB Elgato Wave:3 pour streaming, jeu et création."
  },
  {
    id:"p13",
    name:"Sony DualSense PS5",
    category:"Manettes",
    price:69.99,
    code:"NS-GAMEPAD-DS5",
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description:"Manette sans fil Sony DualSense pour PlayStation 5."
  }
];

const CATEGORIES = [
  "Tous",
  "PC",
  "Cartes graphiques",
  "Processeurs",
  "RAM",
  "SSD",
  "Boîtiers",
  "Alimentations",
  "Refroidissement",
  "Écrans",
  "Claviers",
  "Souris",
  "Micros",
  "Manettes"
];

const PROMOS = {
  NOVA100:100,
  NOVA20:20,
  NOVA10:10
};

const ADMIN_CODE = "NOVA-ADMIN-2026";

const STORAGE = {
  users:"novashop_users",
  session:"novashop_session",
  orders:"novashop_orders",
  cart:"novashop_cart",
  favorites:"novashop_favorites"
};

let state = {
  category:"Tous",
  search:"",
  sort:"relevance",
  cart:[],
  favorites:[],
  currentUser:null,
  appliedPromo:null,
  orders:[]
};

/* =========================================================
   STORAGE
   ========================================================= */

function getStorage(key,fallback){
  try{
    const raw=localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch{
    return fallback;
  }
}

function setStorage(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

function removeStorage(key){
  localStorage.removeItem(key);
}

function uid(prefix="id"){
  return prefix+"_"+Date.now()+"_"+Math.random().toString(36).slice(2,9);
}

/* =========================================================
   UTILITAIRES
   ========================================================= */

function money(value){
  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(Number(value)||0);
}

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function nowISO(){
  return new Date().toISOString();
}

function formatDate(date){
  return new Intl.DateTimeFormat("fr-FR",{
    dateStyle:"medium",
    timeStyle:"short"
  }).format(new Date(date));
}

function showToast(message){
  const toast=document.getElementById("toast");

  toast.textContent=message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer=setTimeout(()=>{
    toast.classList.remove("show");
  },2800);
}

function openModal(id){
  document.getElementById(id)?.classList.add("show");
}

function closeModal(id){
  document.getElementById(id)?.classList.remove("show");
}

function getUsers(){
  return getStorage(STORAGE.users,[]);
}

function saveUsers(users){
  setStorage(STORAGE.users,users);
}

function saveOrders(){
  setStorage(STORAGE.orders,state.orders);
}

function isAdmin(){
  return !!(
    state.currentUser &&
    state.currentUser.role==="admin"
  );
}

function requireAdmin(){
  if(!isAdmin()){
    showToast("Accès réservé à l'administration.");

    switchAuth("login");

    openModal("authModal");

    return false;
  }

  return true;
}

/* =========================================================
   INITIALISATION
   ========================================================= */

function init(){
  seedAdmin();

  state.currentUser=getStorage(STORAGE.session,null);
  state.orders=getStorage(STORAGE.orders,[]);
  state.favorites=getStorage(
    STORAGE.favorites,
    state.currentUser ? [] : []
  );

  loadUserCart();

  renderCategories();
  renderProducts();
  renderCart();
  renderHeader();
  bindEvents();
}

function seedAdmin(){
  const users=getUsers();

  const exists=users.some(
    u=>u.email==="admin@novashop.local"
  );

  if(!exists){
    users.push({
      id:"admin_demo",
      name:"Administrateur NovaShop",
      email:"admin@novashop.local",
      password:"NovaAdmin2026!",
      role:"admin",
      createdAt:nowISO()
    });

    saveUsers(users);
  }
}

/* =========================================================
   SESSION / COMPTE
   ========================================================= */

function loginUser(user){
  state.currentUser={
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
  };

  setStorage(STORAGE.session,state.currentUser);

  loadUserCart();
  renderHeader();
  renderCart();

  closeModal("authModal");

  showToast(
    user.role==="admin"
      ? "Connexion administrateur réussie."
      : "Connexion réussie."
  );
}

function logout(){
  removeStorage(STORAGE.session);

  state.currentUser=null;
  state.cart=[];

  loadUserCart();
  renderHeader();
  renderCart();

  closeModal("accountModal");

  showToast("Vous êtes déconnecté.");
}

function switchAuth(mode){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  const loginTab=document.getElementById("loginTab");
  const signupTab=document.getElementById("signupTab");
  const title=document.getElementById("authTitle");

  if(mode==="signup"){
    login.classList.add("hidden");
    signup.classList.remove("hidden");

    loginTab.classList.remove("active");
    signupTab.classList.add("active");

    title.textContent="Créer un compte";
  }else{
    signup.classList.add("hidden");
    login.classList.remove("hidden");

    signupTab.classList.remove("active");
    loginTab.classList.add("active");

    title.textContent="Connexion";
  }
}

function renderHeader(){
  const accountButton=document.getElementById("accountButton");
  const adminButton=document.getElementById("adminButton");

  if(state.currentUser){
    accountButton.innerHTML=
      `👤 <span class="label">${escapeHTML(
        state.currentUser.name.split(" ")[0]
      )}</span>`;

    if(isAdmin()){
      adminButton.style.display="block";
    }else{
      adminButton.style.display="none";
    }
  }else{
    accountButton.innerHTML="👤 <span class=\"label\">Compte</span>";
    adminButton.style.display="none";
  }
}

/* =========================================================
   PANIER PAR UTILISATEUR
   ========================================================= */

function cartKey(){
  return state.currentUser
    ? `${STORAGE.cart}_${state.currentUser.id}`
    : `${STORAGE.cart}_guest`;
}

function loadUserCart(){
  state.cart=getStorage(cartKey(),[]);
}

function saveCart(){
  setStorage(cartKey(),state.cart);
}

function cartCount(){
  return state.cart.reduce(
    (total,item)=>total+item.qty,
    0
  );
}

function cartSubtotal(){
  return state.cart.reduce((total,item)=>{
    const product=PRODUCTS.find(p=>p.id===item.id);

    return total+
      (product ? product.price*item.qty : 0);
  },0);
}

function addToCart(id,qty=1){
  const product=PRODUCTS.find(p=>p.id===id);

  if(!product) return;

  const existing=state.cart.find(
    item=>item.id===id
  );

  if(existing){
    existing.qty+=qty;
  }else{
    state.cart.push({
      id,
      qty
    });
  }

  saveCart();
  renderCart();

  showToast(`${product.name} ajouté au panier.`);
}

function changeQty(id,delta){
  const item=state.cart.find(
    x=>x.id===id
  );

  if(!item) return;

  item.qty+=delta;

  if(item.qty<=0){
    state.cart=state.cart.filter(
      x=>x.id!==id
    );
  }

  saveCart();
  renderCart();
}

function removeFromCart(id){
  state.cart=state.cart.filter(
    item=>item.id!==id
  );

  saveCart();
  renderCart();
}

function renderCart(){
  const container=document.getElementById("cartItems");
  const count=document.getElementById("cartCount");
  const total=document.getElementById("cartTotal");

  count.textContent=cartCount();
  total.textContent=money(cartSubtotal());

  if(!state.cart.length){
    container.innerHTML=`
      <div style="text-align:center;padding:55px 10px;color:#69707d">
        <div style="font-size:42px;margin-bottom:12px">🛒</div>
        <strong style="display:block;color:#111318;font-size:18px">
          Votre panier est vide
        </strong>
        <span style="font-size:13px">
          Ajoutez des produits pour commencer.
        </span>
      </div>
    `;

    return;
  }

  container.innerHTML=state.cart.map(item=>{
    const product=PRODUCTS.find(
      p=>p.id===item.id
    );

    if(!product) return "";

    return `
      <div class="cart-item">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.style.opacity='.25'"
        >

        <div>
          <div class="cart-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="cart-price">
            ${money(product.price)}
          </div>

          <div class="qty">
            <button data-action="qty-minus" data-id="${product.id}">−</button>
            <strong>${item.qty}</strong>
            <button data-action="qty-plus" data-id="${product.id}">+</button>
          </div>

          <button
            class="remove"
            data-action="remove-cart"
            data-id="${product.id}"
          >
            Supprimer
          </button>
        </div>

        <strong>
          ${money(product.price*item.qty)}
        </strong>

      </div>
    `;
  }).join("");
}

/* =========================================================
   PRODUITS
   ========================================================= */

function renderCategories(){
  const container=document.getElementById("categories");

  container.innerHTML=CATEGORIES.map(category=>`
    <button
      class="category ${state.category===category ? "active":""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}

function getFilteredProducts(){
  let products=[...PRODUCTS];

  if(state.category!=="Tous"){
    products=products.filter(
      p=>p.category===state.category
    );
  }

  const query=state.search.trim().toLowerCase();

  if(query){
    products=products.filter(product=>{
      const text=[
        product.name,
        product.category,
        product.code,
        product.description
      ].join(" ").toLowerCase();

      return text.includes(query);
    });
  }

  if(state.sort==="priceAsc"){
    products.sort((a,b)=>a.price-b.price);
  }

  if(state.sort==="priceDesc"){
    products.sort((a,b)=>b.price-a.price);
  }

  if(state.sort==="name"){
    products.sort((a,b)=>
      a.name.localeCompare(b.name,"fr")
    );
  }

  return products;
}

function renderProducts(){
  const grid=document.getElementById("productsGrid");
  const empty=document.getElementById("emptyState");
  const info=document.getElementById("resultInfo");

  const products=getFilteredProducts();

  info.textContent=
    `${products.length} produit${products.length>1?"s":""}`;

  if(!products.length){
    grid.innerHTML="";
    empty.style.display="block";
    return;
  }

  empty.style.display="none";

  grid.innerHTML=products.map(product=>{
    const favorite=state.favorites.includes(
      product.id
    );

    return `
      <article class="product-card">

        <div class="product-image">

          <button
            class="fav ${favorite?"active":""}"
            data-action="favorite"
            data-id="${product.id}"
            aria-label="Favori"
          >
            ${favorite?"♥":"♡"}
          </button>

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="this.style.opacity='.25'"
          >

        </div>

        <div class="product-body">

          <div class="product-category">
            ${escapeHTML(product.category)}
          </div>

          <div class="product-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="product-code">
            Réf. ${escapeHTML(product.code)}
          </div>

          <div class="product-bottom">

            <div class="price">
              ${money(product.price)}
            </div>

            <button
              class="buy"
              data-action="product"
              data-id="${product.id}"
            >
              Voir
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");
}

/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id){
  if(state.favorites.includes(id)){
    state.favorites=
      state.favorites.filter(x=>x!==id);
  }else{
    state.favorites.push(id);
  }

  setStorage(STORAGE.favorites,state.favorites);

  renderProducts();
}

/* =========================================================
   PRODUIT DETAIL
   ========================================================= */

function openProduct(id){
  const product=PRODUCTS.find(
    p=>p.id===id
  );

  if(!product) return;

  document.getElementById("productDetail").innerHTML=`

    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          referrerpolicy="no-referrer"
        >
      </div>

      <div class="detail-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p class="detail-description">
          ${escapeHTML(product.description)}
        </p>

        <div style="
          margin-top:18px;
          padding:12px;
          background:#f7f8fa;
          border-radius:10px;
          font-size:12px;
          color:#69707d;
        ">
          Référence produit :
          <strong style="color:#111318">
            ${escapeHTML(product.code)}
          </strong>
        </div>

        <button
          class="primary"
          style="margin-top:18px"
          data-action="add-product"
          data-id="${product.id}"
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>
  `;

  openModal("productModal");
}

/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout(){
  if(!state.cart.length){
    showToast("Votre panier est vide.");
    return;
  }

  if(!state.currentUser){
    showToast("Connectez-vous pour commander.");
    switchAuth("login");
    openModal("authModal");
    return;
  }

  closeDrawer();

  state.appliedPromo=null;

  document.getElementById("promoCode").value="";
  document.getElementById("promoResult").textContent="";

  document.getElementById("fullName").value=
    state.currentUser.name || "";

  renderCheckout();

  openModal("checkoutModal");
}

function renderCheckout(){
  const subtotal=cartSubtotal();

  let discount=0;

  if(state.appliedPromo){
    discount=
      subtotal*
      state.appliedPromo.percent/100;
  }

  const finalTotal=Math.max(
    0,
    subtotal-discount
  );

  const container=
    document.getElementById("checkoutSummary");

  container.innerHTML=`

    ${state.cart.map(item=>{
      const product=PRODUCTS.find(
        p=>p.id===item.id
      );

      if(!product) return "";

      return `
        <div class="summary-line">
          <span>
            ${escapeHTML(product.name)}
            × ${item.qty}
          </span>
          <strong>
            ${money(product.price*item.qty)}
          </strong>
        </div>
      `;
    }).join("")}

    <div class="summary-line">
      <span>Sous-total</span>
      <strong>${money(subtotal)}</strong>
    </div>

    <div class="summary-line">
      <span>Réduction</span>
      <strong class="${discount>0?"success":""}">
        ${discount>0?"− ":""}${money(discount)}
      </strong>
    </div>

    <div class="summary-line">
      <span>Livraison</span>
      <strong>0,00 €</strong>
    </div>

    <div class="summary-line total">
      <span>Total</span>
      <span>${money(finalTotal)}</span>
    </div>

  `;

  const pay=document.getElementById("payButton");

  if(
    state.appliedPromo &&
    state.appliedPromo.percent===100 &&
    finalTotal<=0
  ){
    pay.disabled=false;
    pay.textContent="✓ Payer gratuitement";
  }else{
    pay.disabled=true;
    pay.textContent=
      state.appliedPromo
        ? "🔒 Paiement réel non disponible"
        : "🔒 Code gratuit requis";
  }
}

function applyPromo(){
  const input=
    document.getElementById("promoCode");

  const result=
    document.getElementById("promoResult");

  const code=
    input.value.trim().toUpperCase();

  if(!code){
    state.appliedPromo=null;

    result.className="promo-result error";
    result.textContent="Entre un code promo.";

    renderCheckout();

    return;
  }

  if(!Object.prototype.hasOwnProperty.call(PROMOS,code)){
    state.appliedPromo=null;

    result.className="promo-result error";
    result.textContent="Code promo invalide.";

    renderCheckout();

    return;
  }

  state.appliedPromo={
    code,
    percent:PROMOS[code]
  };

  result.className="promo-result success";

  if(PROMOS[code]===100){
    result.textContent=
      "✓ Code accepté. Commande gratuite débloquée.";
  }else{
    result.textContent=
      `✓ ${PROMOS[code]} % de réduction appliqués.`;
  }

  renderCheckout();
}

/* =========================================================
   COMMANDES
   ========================================================= */

const ORDER_STATUSES=[
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

function createOrder(){
  if(!state.currentUser){
    showToast("Connectez-vous.");
    return;
  }

  if(
    !state.appliedPromo ||
    state.appliedPromo.percent!==100
  ){
    showToast("Un code à 100 % est nécessaire.");
    return;
  }

  const subtotal=cartSubtotal();

  const order={
    id:uid("order"),
    orderNumber:
      "NS-"+Date.now().toString().slice(-8),
    invoiceNumber:
      "INV-"+new Date().getFullYear()+"-"+
      Math.floor(100000+Math.random()*900000),

    userId:state.currentUser.id,

    customer:{
      name:document.getElementById("fullName").value.trim(),
      email:state.currentUser.email
    },

    address:{
      address:document.getElementById("address").value.trim(),
      postalCode:document.getElementById("postalCode").value.trim(),
      city:document.getElementById("city").value.trim(),
      country:document.getElementById("country").value.trim()
    },

    items:state.cart.map(item=>{
      const product=PRODUCTS.find(
        p=>p.id===item.id
      );

      return {
        id:product.id,
        name:product.name,
        code:product.code,
        price:product.price,
        qty:item.qty
      };
    }),

    subtotal,
    discount:subtotal,
    total:0,

    promoCode:state.appliedPromo.code,

    paymentStatus:"Payé",
    paymentMethod:"Code promotionnel",

    warehouse:"Entrepôt",

    status:ORDER_STATUSES[0],

    createdAt:nowISO(),

    invoice:{
      number:
        "INV-"+new Date().getFullYear()+"-"+
        Math.floor(100000+Math.random()*900000),
      createdAt:nowISO()
    }
  };

  order.invoiceNumber=order.invoice.number;

  state.orders.unshift(order);
  saveOrders();

  state.cart=[];
  saveCart();

  state.appliedPromo=null;

  renderCart();

  closeModal("checkoutModal");

  showToast("Commande confirmée !");

  setTimeout(()=>{
    showInvoice(order);
  },250);
}

function getUserOrders(){
  if(!state.currentUser) return [];

  return state.orders.filter(
    order=>order.userId===state.currentUser.id
  );
}

/* =========================================================
   FACTURE
   ========================================================= */

function showInvoice(order){
  if(!order) return;

  const items=order.items || [];

  document.getElementById("invoiceContent").innerHTML=`

    <div class="invoice">

      <div class="invoice-header">

        <div>
          <div class="invoice-brand">
            NOVA<span>SHOP</span>
          </div>

          <div style="color:#69707d;margin-top:6px;font-size:12px">
            Marketplace gaming & informatique
          </div>
        </div>

        <div class="invoice-title">
          <h1>FACTURE</h1>

          <p>
            ${escapeHTML(order.invoiceNumber)}
          </p>

          <p>
            ${formatDate(order.createdAt)}
          </p>
        </div>

      </div>

      <div class="invoice-info">

        <div>
          <h4>Facturé à</h4>

          <p>
            <strong>
              ${escapeHTML(order.customer.name)}
            </strong>
            <br>
            ${escapeHTML(order.customer.email)}
          </p>
        </div>

        <div>
          <h4>Livraison</h4>

          <p>
            ${escapeHTML(order.address.address)}
            <br>
            ${escapeHTML(order.address.postalCode)}
            ${escapeHTML(order.address.city)}
            <br>
            ${escapeHTML(order.address.country)}
          </p>
        </div>

        <div>
          <h4>Commande</h4>

          <p>
            <strong>${escapeHTML(order.orderNumber)}</strong>
            <br>
            Statut : ${escapeHTML(order.status)}
          </p>
        </div>

        <div>
          <h4>Entrepôt</h4>

          <p>
            <strong>Entrepôt NovaShop</strong>
            <br>
            France
          </p>
        </div>

      </div>

      <table class="invoice-table">

        <thead>
          <tr>
            <th>Produit</th>
            <th>Référence</th>
            <th>Qté</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          ${items.map(item=>`

            <tr>

              <td>
                <strong>
                  ${escapeHTML(item.name)}
                </strong>
              </td>

              <td>
                ${escapeHTML(item.code)}
              </td>

              <td>
                ${item.qty}
              </td>

              <td>
                ${money(item.price)}
              </td>

              <td>
                ${money(item.price*item.qty)}
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

      <div class="invoice-total">

        <div>
          <span>Sous-total</span>
          <strong>${money(order.subtotal)}</strong>
        </div>

        <div>
          <span>
            Réduction (${escapeHTML(order.promoCode)})
          </span>

          <strong>
            − ${money(order.discount)}
          </strong>
        </div>

        <div>
          <span>Livraison</span>
          <strong>0,00 €</strong>
        </div>

        <div class="grand">
          <span>Total TTC</span>
          <span>${money(order.total)}</span>
        </div>

      </div>

      <div class="paid">
        ✓ PAYÉ
      </div>

      <div style="
        margin-top:12px;
        color:#555;
        font-size:12px;
      ">
        Mode de règlement :
        <strong>
          ${escapeHTML(order.paymentMethod)}
        </strong>
      </div>

      <div class="invoice-footer">

        <strong>NovaShop</strong><br>

        Facture générée automatiquement par la plateforme NovaShop.<br>

        Cette facture correspond à une commande de démonstration
        réalisée avec un code promotionnel. Aucun paiement bancaire
        réel n'a été traité par cette version du site.

      </div>

    </div>

  `;

  state.lastInvoice=order;

  openModal("invoiceModal");
}

function downloadInvoice(){
  const order=state.lastInvoice;

  if(!order) return;

  const html=document.getElementById(
    "invoiceContent"
  ).innerHTML;

  const full=`
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Facture ${escapeHTML(order.invoiceNumber)}</title>
<style>
body{
  margin:0;
  background:#fff;
  font-family:Arial,sans-serif;
  color:#111318;
}
.invoice{
  max-width:900px;
  margin:auto;
  padding:50px;
}
.invoice-header{
  display:flex;
  justify-content:space-between;
  border-bottom:2px solid #111;
  padding-bottom:25px;
}
.invoice-brand{
  font-size:30px;
  font-weight:900;
}
.invoice-brand span{
  color:#2563eb;
}
.invoice-title{
  text-align:right;
}
.invoice-title h1{
  margin:0;
  font-size:32px;
}
.invoice-info{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:25px;
  margin:30px 0;
}
.invoice-info h4{
  color:#777;
  font-size:11px;
  text-transform:uppercase;
}
.invoice-table{
  width:100%;
  border-collapse:collapse;
}
.invoice-table th,
.invoice-table td{
  padding:12px 7px;
  border-bottom:1px solid #ddd;
  text-align:left;
}
.invoice-table th:last-child,
.invoice-table td:last-child{
  text-align:right;
}
.invoice-total{
  width:330px;
  margin-left:auto;
  margin-top:25px;
}
.invoice-total div{
  display:flex;
  justify-content:space-between;
  padding:7px 0;
}
.invoice-total .grand{
  border-top:2px solid #111;
  font-size:21px;
  font-weight:900;
  padding-top:12px;
}
.paid{
  display:inline-block;
  margin-top:20px;
  background:#dcfce7;
  color:#166534;
  padding:8px 12px;
  border-radius:20px;
  font-weight:900;
}
.invoice-footer{
  border-top:1px solid #ddd;
  margin-top:40px;
  padding-top:20px;
  color:#777;
  font-size:11px;
  line-height:1.6;
}
</style>
</head>
<body>
${html}
</body>
</html>
`;

  const blob=new Blob(
    [full],
    {type:"text/html;charset=utf-8"}
  );

  const url=URL.createObjectURL(blob);

  const link=document.createElement("a");

  link.href=url;

  link.download=
    `${order.invoiceNumber}-NovaShop.html`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  setTimeout(()=>{
    URL.revokeObjectURL(url);
  },1000);

  showToast("Facture téléchargée.");
}

/* =========================================================
   COMPTE + COMMANDES
   ========================================================= */

function openAccount(){
  if(!state.currentUser){
    switchAuth("login");
    openModal("authModal");
    return;
  }

  renderAccount();
  openModal("accountModal");
}

function renderAccount(){
  const container=
    document.getElementById("accountContent");

  const orders=getUserOrders();

  container.innerHTML=`

    <div class="account-box">

      <div class="account-name">
        ${escapeHTML(state.currentUser.name)}
      </div>

      <div class="account-email">
        ${escapeHTML(state.currentUser.email)}
      </div>

      <div style="
        margin-top:8px;
        font-size:11px;
        font-weight:900;
        color:${isAdmin()?"#2563eb":"#69707d"}
      ">
        ${isAdmin()?"ADMINISTRATEUR":"CLIENT"}
      </div>

    </div>

    <div style="font-size:18px;font-weight:900;margin-bottom:12px">
      📦 Mes commandes
    </div>

    ${
      orders.length
      ? orders.map(order=>orderHTML(order,false)).join("")
      : `
        <div style="
          padding:25px;
          background:#f7f8fa;
          border-radius:12px;
          text-align:center;
          color:#69707d;
          font-size:13px;
        ">
          Aucune commande pour le moment.
        </div>
      `
    }

    <div class="account-actions">

      ${
        isAdmin()
        ? `
          <button class="secondary" id="accountDashboard">
            ⚙️ Ouvrir le Dashboard
          </button>
        `
        :""
      }

      <button class="secondary" id="logoutButton">
        Déconnexion
      </button>

      <button class="danger" id="deleteAccountButton">
        Supprimer mon compte
      </button>

    </div>

  `;

  document
    .getElementById("logoutButton")
    ?.addEventListener("click",logout);

  document
    .getElementById("accountDashboard")
    ?.addEventListener("click",()=>{
      closeModal("accountModal");
      openDashboard();
    });

  document
    .getElementById("deleteAccountButton")
    ?.addEventListener("click",deleteOwnAccount);
}

function orderHTML(order,admin=false){
  return `
    <div class="order-card">

      <div class="order-top">

        <div>
          <div class="order-number">
            ${escapeHTML(order.orderNumber)}
          </div>

          ${
            admin
            ? `
              <div style="
                font-size:11px;
                color:#69707d;
                margin-top:3px;
              ">
                ${escapeHTML(order.customer.email)}
              </div>
            `
            :""
          }
        </div>

        <span class="status">
          ${escapeHTML(order.status)}
        </span>

      </div>

      <div class="order-meta">

        ${formatDate(order.createdAt)}
        • ${order.items.length} produit${order.items.length>1?"s":""}
        • ${money(order.total)}

        <br>

        Livraison :
        ${escapeHTML(order.address.postalCode)}
        ${escapeHTML(order.address.city)}

      </div>

      <div class="order-actions">

        <button
          data-action="view-invoice"
          data-order="${order.id}"
        >
          🧾 Voir la facture
        </button>

        ${
          admin
          ? `
            <button
              data-action="next-status"
              data-order="${order.id}"
            >
              Avancer le statut
            </button>
          `
          :""
        }

      </div>

    </div>
  `;
}

function deleteOwnAccount(){
  if(!state.currentUser) return;

  const confirmed=confirm(
    "Supprimer votre compte et votre session locale ?"
  );

  if(!confirmed) return;

  const users=getUsers().filter(
    u=>u.id!==state.currentUser.id
  );

  saveUsers(users);

  removeStorage(
    `${STORAGE.cart}_${state.currentUser.id}`
  );

  removeStorage(
    `${STORAGE.favorites}_${state.currentUser.id}`
  );

  removeStorage(STORAGE.session);

  state.currentUser=null;
  state.cart=[];

  renderHeader();
  renderCart();

  closeModal("accountModal");

  showToast("Votre compte a été supprimé.");
}

/* =========================================================
   DASHBOARD ADMIN
   ========================================================= */

function openDashboard(){
  if(!requireAdmin()) return;

  renderDashboard();

  document
    .getElementById("dashboard")
    .classList.add("open");
}

function closeDashboard(){
  document
    .getElementById("dashboard")
    .classList.remove("open");
}

function renderDashboard(){
  if(!isAdmin()) return;

  const users=getUsers();

  document.getElementById("statOrders")
    .textContent=state.orders.length;

  document.getElementById("statFree")
    .textContent=state.orders.filter(
      o=>o.total===0
    ).length;

  document.getElementById("statUsers")
    .textContent=users.length;

  document.getElementById("statProducts")
    .textContent=PRODUCTS.length;

  const container=
    document.getElementById("adminOrders");

  if(!state.orders.length){
    container.innerHTML=`
      <div style="
        padding:30px;
        background:#f7f8fa;
        border-radius:12px;
        text-align:center;
        color:#69707d;
      ">
        Aucune commande.
      </div>
    `;

    return;
  }

  container.innerHTML=
    state.orders
      .map(order=>orderHTML(order,true))
      .join("");
}

function advanceOrderStatus(orderId){
  if(!requireAdmin()) return;

  const order=state.orders.find(
    o=>o.id===orderId
  );

  if(!order) return;

  const index=ORDER_STATUSES.indexOf(
    order.status
  );

  if(index<ORDER_STATUSES.length-1){
    order.status=
      ORDER_STATUSES[index+1];

    saveOrders();

    renderDashboard();

    if(
      state.currentUser &&
      document.getElementById("accountModal")
        .classList.contains("show")
    ){
      renderAccount();
    }

    showToast(
      `Commande ${order.orderNumber} : ${order.status}`
    );
  }else{
    showToast("Cette commande est déjà livrée.");
  }
}

function resetDemo(){
  if(!requireAdmin()) return;

  const confirmed=confirm(
    "Réinitialiser les commandes et utilisateurs de démonstration ? Le compte administrateur sera conservé."
  );

  if(!confirmed) return;

  const adminUsers=getUsers().filter(
    u=>u.role==="admin"
  );

  saveUsers(adminUsers);

  state.orders=[];
  saveOrders();

  Object.keys(localStorage)
    .filter(key=>
      key.startsWith(STORAGE.cart+"_") ||
      key.startsWith(STORAGE.favorites+"_")
    )
    .forEach(key=>localStorage.removeItem(key));

  state.cart=[];
  loadUserCart();

  renderCart();
  renderDashboard();

  showToast("Données de démonstration réinitialisées.");
}

/* =========================================================
   RECHERCHE ADMIN
   ========================================================= */

function handleSearch(){
  const query=
    document.getElementById("searchInput")
      .value
      .trim();

  if(
    query.toUpperCase()===ADMIN_CODE
  ){
    if(isAdmin()){
      openDashboard();
    }else{
      showToast("Code administration détecté. Connexion admin requise.");
      switchAuth("login");
      openModal("authModal");
    }

    return;
  }

  state.search=query;

  renderProducts();

  document
    .getElementById("catalog")
    .scrollIntoView({
      behavior:"smooth"
    });
}

/* =========================================================
   EVENEMENTS
   ========================================================= */

function bindEvents(){

  document
    .getElementById("searchForm")
    .addEventListener("submit",event=>{
      event.preventDefault();
      handleSearch();
    });

  document
    .getElementById("sortSelect")
    .addEventListener("change",event=>{
      state.sort=event.target.value;
      renderProducts();
    });

  document
    .getElementById("heroShopButton")
    .addEventListener("click",()=>{
      document
        .getElementById("catalog")
        .scrollIntoView({
          behavior:"smooth"
        });
    });

  document
    .getElementById("cartButton")
    .addEventListener("click",openDrawer);

  document
    .getElementById("accountButton")
    .addEventListener("click",openAccount);

  document
    .getElementById("adminButton")
    .addEventListener("click",openDashboard);

  document
    .getElementById("closeDashboard")
    .addEventListener("click",closeDashboard);

  document
    .getElementById("checkoutButton")
    .addEventListener("click",openCheckout);

  document
    .getElementById("applyPromo")
    .addEventListener("click",applyPromo);

  document
    .getElementById("checkoutForm")
    .addEventListener("submit",event=>{
      event.preventDefault();
      createOrder();
    });

  document
    .getElementById("loginTab")
    .addEventListener("click",()=>{
      switchAuth("login");
    });

  document
    .getElementById("signupTab")
    .addEventListener("click",()=>{
      switchAuth("signup");
    });

  document
    .getElementById("loginForm")
    .addEventListener("submit",event=>{
      event.preventDefault();

      const email=
        document.getElementById("loginEmail")
          .value
          .trim()
          .toLowerCase();

      const password=
        document.getElementById("loginPassword")
          .value;

      const user=getUsers().find(
        u=>
          u.email===email &&
          u.password===password
      );

      if(!user){
        showToast("Email ou mot de passe incorrect.");
        return;
      }

      loginUser(user);
    });

  document
    .getElementById("signupForm")
    .addEventListener("submit",event=>{
      event.preventDefault();

      const name=
        document.getElementById("signupName")
          .value
          .trim();

      const email=
        document.getElementById("signupEmail")
          .value
          .trim()
          .toLowerCase();

      const password=
        document.getElementById("signupPassword")
          .value;

      const confirmPassword=
        document.getElementById("signupConfirm")
          .value;

      if(password!==confirmPassword){
        showToast("Les mots de passe ne correspondent pas.");
        return;
      }

      const users=getUsers();

      if(users.some(u=>u.email===email)){
        showToast("Un compte utilise déjà cet email.");
        return;
      }

      const user={
        id:uid("user"),
        name,
        email,
        password,
        role:"user",
        createdAt:nowISO()
      };

      users.push(user);

      saveUsers(users);

      loginUser(user);

      document
        .getElementById("signupForm")
        .reset();
    });

  document
    .getElementById("printInvoice")
    .addEventListener("click",()=>{
      window.print();
    });

  document
    .getElementById("downloadInvoice")
    .addEventListener("click",downloadInvoice);

  document
    .getElementById("resetDemo")
    .addEventListener("click",resetDemo);

  document.addEventListener("click",event=>{

    const categoryButton=
      event.target.closest("[data-category]");

    if(categoryButton){
      state.category=
        categoryButton.dataset.category;

      renderCategories();
      renderProducts();
      return;
    }

    const closeButton=
      event.target.closest("[data-close]");

    if(closeButton){
      closeModal(
        closeButton.dataset.close
      );
      return;
    }

    const action=
      event.target.closest("[data-action]");

    if(!action) return;

    const type=action.dataset.action;
    const id=action.dataset.id;

    if(type==="product"){
      openProduct(id);
    }

    if(type==="favorite"){
      toggleFavorite(id);
    }

    if(type==="add-product"){
      addToCart(id);
      closeModal("productModal");
    }

    if(type==="qty-minus"){
      changeQty(id,-1);
    }

    if(type==="qty-plus"){
      changeQty(id,1);
    }

    if(type==="remove-cart"){
      removeFromCart(id);
    }

    if(type==="view-invoice"){
      const order=state.orders.find(
        o=>o.id===action.dataset.order
      );

      if(order){
        showInvoice(order);
      }
    }

    if(type==="next-status"){
      advanceOrderStatus(
        action.dataset.order
      );
    }

  });

  document
    .getElementById("overlay")
    .addEventListener("click",closeDrawer);

  document
    .getElementById("promoCode")
    .addEventListener("keydown",event=>{
      if(event.key==="Enter"){
        event.preventDefault();
        applyPromo();
      }
    });
}

/* =========================================================
   DRAWER
   ========================================================= */

function openDrawer(){
  document
    .getElementById("cartDrawer")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("show");
}

function closeDrawer(){
  document
    .getElementById("cartDrawer")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("show");
}

/* =========================================================
   DEMARRAGE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);
