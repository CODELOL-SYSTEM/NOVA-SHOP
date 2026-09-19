"use strict";

/* =========================================================
   NOVASHOP PRO
   ========================================================= */

const PRODUCTS = [

  {
    id:"cpu9600x",
    name:"AMD Ryzen 5 9600X",
    category:"Processeurs",
    price:289.99,
    code:"NS-CPU-9600X",
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description:"Processeur AMD Ryzen 5 9600X destiné aux configurations gaming modernes."
  },

  {
    id:"ramcorsair32",
    name:"Corsair Vengeance RGB 32 Go DDR5 6000 CL38",
    category:"RAM",
    price:129.99,
    code:"NS-RAM-COR-32",
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description:"Kit Corsair Vengeance RGB DDR5 32 Go destiné aux configurations gaming."
  },

  {
    id:"ramkingston32",
    name:"Kingston Fury Beast RGB 32 Go DDR5 5600 CL36",
    category:"RAM",
    price:119.99,
    code:"NS-RAM-KF-32",
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description:"Mémoire Kingston Fury Beast RGB 32 Go DDR5."
  },

  {
    id:"990pro1tb",
    name:"Samsung 990 PRO 1 To",
    category:"SSD",
    price:109.99,
    code:"NS-SSD-990P-1T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description:"SSD NVMe Samsung 990 PRO 1 To pour stockage et performances rapides."
  },

  {
    id:"990pro2tb",
    name:"Samsung 990 PRO 2 To",
    category:"SSD",
    price:179.99,
    code:"NS-SSD-990P-2T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description:"SSD NVMe Samsung 990 PRO 2 To."
  },

  {
    id:"rm850x",
    name:"Corsair RM850x",
    category:"Alimentations",
    price:169.99,
    code:"NS-PSU-RM850X",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description:"Alimentation Corsair RM850x pour configuration gaming performante."
  },

  {
    id:"5000d",
    name:"Corsair 5000D Airflow",
    category:"Boîtiers",
    price:179.99,
    code:"NS-CASE-5000D",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description:"Boîtier ATX Corsair 5000D Airflow."
  },

  {
    id:"lf3360",
    name:"ARCTIC Liquid Freezer III 360",
    category:"Refroidissement",
    price:139.99,
    code:"NS-AIO-LF3-360",
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description:"Système de refroidissement liquide AIO 360 mm."
  },

  {
    id:"odysseyg6",
    name:"Samsung Odyssey OLED G6",
    category:"Écrans",
    price:699.99,
    code:"NS-MON-OLED-G6",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description:"Écran gaming Samsung Odyssey OLED G6."
  },

  {
    id:"prox-tkl",
    name:"Logitech G PRO X TKL",
    category:"Claviers",
    price:159.99,
    code:"NS-KB-PROX-TKL",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description:"Clavier gaming Logitech G PRO X TKL."
  },

  {
    id:"superlight2",
    name:"Logitech G PRO X SUPERLIGHT 2",
    category:"Souris",
    price:129.99,
    code:"NS-MOUSE-SUPERLIGHT2",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description:"Souris gaming légère Logitech G PRO X SUPERLIGHT 2."
  },

  {
    id:"wave3",
    name:"Elgato Wave:3",
    category:"Micros",
    price:149.99,
    code:"NS-MIC-WAVE3",
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description:"Microphone USB Elgato Wave:3 pour streaming et création."
  },

  {
    id:"dualsense",
    name:"Sony DualSense PS5",
    category:"Manettes",
    price:74.99,
    code:"NS-GAMEPAD-DS5",
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description:"Manette sans fil Sony DualSense."
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

const STATUS = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

const KEY = {
  users:"novashop_users_v3",
  session:"novashop_session_v3",
  orders:"novashop_orders_v3",
  favorites:"novashop_favorites_v3"
};

let state = {
  category:"Tous",
  search:"",
  sort:"relevance",
  cart:[],
  favorites:[],
  currentUser:null,
  orders:[],
  promo:null,
  invoice:null
};

/* =========================================================
   STORAGE
   ========================================================= */

function read(key,fallback){
  try{
    const value=localStorage.getItem(key);
    return value===null
      ? fallback
      : JSON.parse(value);
  }catch{
    return fallback;
  }
}

function write(key,value){
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function remove(key){
  localStorage.removeItem(key);
}

function id(prefix){
  return prefix+"_"+Date.now()+"_"+Math.random()
    .toString(36)
    .slice(2,9);
}

/* =========================================================
   HELPERS
   ========================================================= */

function money(value){
  return new Intl.NumberFormat(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(Number(value)||0);
}

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function dateFormat(value){
  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      dateStyle:"medium",
      timeStyle:"short"
    }
  ).format(new Date(value));
}

function toast(message){
  const element=
    document.getElementById("toast");

  element.textContent=message;
  element.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer=setTimeout(()=>{
    element.classList.remove("show");
  },2800);
}

function openModal(id){
  document
    .getElementById(id)
    ?.classList.add("show");
}

function closeModal(id){
  document
    .getElementById(id)
    ?.classList.remove("show");
}

function users(){
  return read(KEY.users,[]);
}

function saveUsers(value){
  write(KEY.users,value);
}

function admin(){
  return !!(
    state.currentUser &&
    state.currentUser.role==="admin"
  );
}

/* =========================================================
   INITIALISATION
   ========================================================= */

function seedAdmin(){

  const list=users();

  if(
    !list.some(
      user=>user.email==="admin@novashop.local"
    )
  ){

    list.push({
      id:"admin",
      name:"NovaShop Admin",
      email:"admin@novashop.local",
      password:"NovaAdmin2026!",
      role:"admin",
      createdAt:new Date().toISOString()
    });

    saveUsers(list);
  }
}

function init(){

  seedAdmin();

  state.currentUser=
    read(KEY.session,null);

  state.orders=
    read(KEY.orders,[]);

  state.favorites=
    read(
      `${KEY.favorites}_${state.currentUser?.id || "guest"}`,
      []
    );

  loadCart();

  renderCategories();
  renderProducts();
  renderCart();
  renderHeader();

  bind();
}

/* =========================================================
   SESSION
   ========================================================= */

function saveSession(user){

  state.currentUser={
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
  };

  write(
    KEY.session,
    state.currentUser
  );

  state.favorites=
    read(
      `${KEY.favorites}_${user.id}`,
      []
    );

  loadCart();
  renderHeader();
  renderCart();
}

function logout(){

  remove(KEY.session);

  state.currentUser=null;
  state.cart=[];
  state.favorites=[];

  loadCart();

  renderHeader();
  renderCart();

  closeModal("accountModal");

  toast("Déconnexion réussie.");
}

function switchAuth(type){

  const login=
    document.getElementById("loginForm");

  const signup=
    document.getElementById("signupForm");

  const loginTab=
    document.getElementById("loginTab");

  const signupTab=
    document.getElementById("signupTab");

  const title=
    document.getElementById("authTitle");

  if(type==="signup"){

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

  const account=
    document.getElementById("accountButton");

  const dashboard=
    document.getElementById("adminButton");

  if(!state.currentUser){

    account.innerHTML=
      "👤 <span class=\"txt\">Compte</span>";

    dashboard.style.display="none";

    return;
  }

  account.innerHTML=
    `👤 <span class="txt">${
      escapeHTML(
        state.currentUser.name.split(" ")[0]
      )
    }</span>`;

  dashboard.style.display=
    admin()
      ? "block"
      : "none";
}

/* =========================================================
   CART
   ========================================================= */

function cartKey(){

  return state.currentUser
    ? `${KEY.orders}_cart_${state.currentUser.id}`
    : `${KEY.orders}_cart_guest`;
}

function loadCart(){
  state.cart=read(cartKey(),[]);
}

function saveCart(){
  write(cartKey(),state.cart);
}

function cartCount(){
  return state.cart.reduce(
    (sum,item)=>sum+item.qty,
    0
  );
}

function subtotal(){

  return state.cart.reduce(
    (sum,item)=>{

      const product=
        PRODUCTS.find(p=>p.id===item.id);

      return sum+
        (
          product
            ? product.price*item.qty
            : 0
        );

    },
    0
  );
}

function addCart(productId){

  const product=
    PRODUCTS.find(p=>p.id===productId);

  if(!product) return;

  const existing=
    state.cart.find(
      item=>item.id===productId
    );

  if(existing){
    existing.qty++;
  }else{
    state.cart.push({
      id:productId,
      qty:1
    });
  }

  saveCart();
  renderCart();

  toast("Produit ajouté au panier.");
}

function qty(productId,delta){

  const item=
    state.cart.find(
      x=>x.id===productId
    );

  if(!item) return;

  item.qty+=delta;

  if(item.qty<=0){
    state.cart=
      state.cart.filter(
        x=>x.id!==productId
      );
  }

  saveCart();
  renderCart();
}

function removeCart(productId){

  state.cart=
    state.cart.filter(
      x=>x.id!==productId
    );

  saveCart();
  renderCart();
}

function renderCart(){

  const container=
    document.getElementById("cartItems");

  document.getElementById("cartCount")
    .textContent=cartCount();

  document.getElementById("cartTotal")
    .textContent=money(subtotal());

  if(!state.cart.length){

    container.innerHTML=`
      <div style="
        text-align:center;
        padding:65px 15px;
        color:#707783
      ">
        <div style="font-size:42px">🛒</div>
        <strong style="
          display:block;
          color:#101318;
          font-size:18px;
          margin-top:12px
        ">
          Ton panier est vide
        </strong>
        <span style="font-size:12px">
          Ajoute un produit pour commencer.
        </span>
      </div>
    `;

    return;
  }

  container.innerHTML=
    state.cart.map(item=>{

      const product=
        PRODUCTS.find(
          p=>p.id===item.id
        );

      if(!product) return "";

      return `
        <div class="cart-row">

          <img
            class="cart-img"
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            onerror="this.style.opacity='.2'"
          >

          <div>

            <div class="cart-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="cart-unit">
              ${money(product.price)}
            </div>

            <div class="qty">

              <button
                data-cart-minus="${product.id}"
              >−</button>

              <strong>${item.qty}</strong>

              <button
                data-cart-plus="${product.id}"
              >+</button>

            </div>

            <button
              class="remove"
              data-cart-remove="${product.id}"
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
   CATEGORIES / PRODUCTS
   ========================================================= */

function renderCategories(){

  document.getElementById("categories")
    .innerHTML=
      CATEGORIES.map(category=>`

        <button
          class="cat ${
            state.category===category
              ? "active"
              : ""
          }"
          data-category="${escapeHTML(category)}"
        >
          ${escapeHTML(category)}
        </button>

      `).join("");
}

function filteredProducts(){

  let list=[...PRODUCTS];

  if(state.category!=="Tous"){

    list=list.filter(
      product=>
        product.category===state.category
    );
  }

  const q=
    state.search
      .trim()
      .toLowerCase();

  if(q){

    list=list.filter(product=>{

      const text=[
        product.name,
        product.category,
        product.code,
        product.description
      ]
      .join(" ")
      .toLowerCase();

      return text.includes(q);
    });
  }

  if(state.sort==="priceAsc"){
    list.sort(
      (a,b)=>a.price-b.price
    );
  }

  if(state.sort==="priceDesc"){
    list.sort(
      (a,b)=>b.price-a.price
    );
  }

  if(state.sort==="name"){
    list.sort(
      (a,b)=>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );
  }

  return list;
}

function renderProducts(){

  const grid=
    document.getElementById("productsGrid");

  const empty=
    document.getElementById("emptyState");

  const info=
    document.getElementById("resultInfo");

  const list=
    filteredProducts();

  info.textContent=
    `${list.length} produit${
      list.length>1?"s":""
    } disponible${
      list.length>1?"s":""
    }`;

  if(!list.length){

    grid.innerHTML="";
    empty.style.display="block";

    return;
  }

  empty.style.display="none";

  grid.innerHTML=
    list.map(product=>{

      const fav=
        state.favorites.includes(
          product.id
        );

      return `
        <article class="product">

          <div class="product-image">

            <button
              class="favorite ${
                fav?"on":""
              }"
              data-favorite="${product.id}"
            >
              ${fav?"♥":"♡"}
            </button>

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              referrerpolicy="no-referrer"
              onerror="this.style.opacity='.2'"
            >

          </div>

          <div class="product-body">

            <div class="product-tag">
              ${escapeHTML(product.category)}
            </div>

            <div class="product-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="product-ref">
              Réf. ${escapeHTML(product.code)}
            </div>

            <div class="product-bottom">

              <div class="price">
                ${money(product.price)}
              </div>

              <button
                class="view"
                data-product="${product.id}"
              >
                Détails
              </button>

            </div>

          </div>

        </article>
      `;

    }).join("");
}

function toggleFavorite(productId){

  if(state.favorites.includes(productId)){

    state.favorites=
      state.favorites.filter(
        id=>id!==productId
      );

  }else{

    state.favorites.push(productId);
  }

  write(
    `${KEY.favorites}_${state.currentUser?.id || "guest"}`,
    state.favorites
  );

  renderProducts();
}

/* =========================================================
   PRODUCT DETAIL
   ========================================================= */

function productModal(productId){

  const product=
    PRODUCTS.find(
      p=>p.id===productId
    );

  if(!product) return;

  document.getElementById("productDetail")
    .innerHTML=`

      <div class="product-detail">

        <div class="detail-picture">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
          >

        </div>

        <div class="detail-info">

          <div class="detail-category">
            ${escapeHTML(product.category)}
          </div>

          <h1>
            ${escapeHTML(product.name)}
          </h1>

          <div class="detail-price">
            ${money(product.price)}
          </div>

          <p class="detail-description">
            ${escapeHTML(product.description)}
          </p>

          <div class="reference">
            Référence :
            <strong>
              ${escapeHTML(product.code)}
            </strong>
          </div>

          <button
            class="primary"
            style="margin-top:18px"
            data-add-product="${product.id}"
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

    toast("Le panier est vide.");

    return;
  }

  if(!state.currentUser){

    toast("Connecte-toi pour commander.");

    switchAuth("login");
    openModal("authModal");

    return;
  }

  closeDrawer();

  state.promo=null;

  document.getElementById("promoCode")
    .value="";

  document.getElementById("promoMessage")
    .textContent="";

  document.getElementById("fullName")
    .value=
      state.currentUser.name || "";

  renderCheckout();

  openModal("checkoutModal");
}

function renderCheckout(){

  const base=subtotal();

  const discount=
    state.promo
      ? base*state.promo.percent/100
      : 0;

  const final=
    Math.max(
      0,
      base-discount
    );

  document.getElementById("checkoutSummary")
    .innerHTML=`

      ${state.cart.map(item=>{

        const product=
          PRODUCTS.find(
            p=>p.id===item.id
          );

        if(!product) return "";

        return `
          <div class="summary-row">
            <span>
              ${escapeHTML(product.name)}
              × ${item.qty}
            </span>

            <strong>
              ${money(
                product.price*item.qty
              )}
            </strong>
          </div>
        `;

      }).join("")}

      <div class="summary-row">
        <span>Sous-total</span>
        <strong>${money(base)}</strong>
      </div>

      <div class="summary-row">
        <span>Réduction</span>
        <strong class="${
          discount
            ? "good"
            : ""
        }">
          ${
            discount
              ? "− "
              : ""
          }${money(discount)}
        </strong>
      </div>

      <div class="summary-row">
        <span>Livraison</span>
        <strong>0,00 €</strong>
      </div>

      <div class="summary-row summary-total">
        <span>Total</span>
        <strong>${money(final)}</strong>
      </div>
    `;

  const pay=
    document.getElementById("payButton");

  if(
    state.promo &&
    state.promo.percent===100 &&
    final===0
  ){

    pay.disabled=false;

    pay.textContent=
      "✓ Valider et payer 0,00 €";

  }else{

    pay.disabled=true;

    pay.textContent=
      "🔒 Code NOVA100 requis";
  }
}

function applyPromo(){

  const input=
    document.getElementById("promoCode");

  const message=
    document.getElementById("promoMessage");

  const code=
    input.value
      .trim()
      .toUpperCase();

  if(!code){

    state.promo=null;

    message.className=
      "promo-message bad";

    message.textContent=
      "Entre un code promo.";

    renderCheckout();

    return;
  }

  if(
    !Object.prototype.hasOwnProperty
      .call(PROMOS,code)
  ){

    state.promo=null;

    message.className=
      "promo-message bad";

    message.textContent=
      "Ce code promotionnel n'existe pas.";

    renderCheckout();

    return;
  }

  state.promo={
    code,
    percent:PROMOS[code]
  };

  message.className=
    "promo-message good";

  if(PROMOS[code]===100){

    message.textContent=
      "✓ Code accepté. Le paiement gratuit est disponible.";

  }else{

    message.textContent=
      `✓ ${PROMOS[code]} % de réduction appliqués.`;
  }

  renderCheckout();
}

/* =========================================================
   CREATE ORDER
   ========================================================= */

function createOrder(){

  if(!state.currentUser){

    toast("Connexion nécessaire.");

    return;
  }

  if(
    !state.promo ||
    state.promo.percent!==100
  ){

    toast("Le code NOVA100 est nécessaire.");

    return;
  }

  const fullName=
    document.getElementById("fullName")
      .value
      .trim();

  const address=
    document.getElementById("address")
      .value
      .trim();

  const postalCode=
    document.getElementById("postalCode")
      .value
      .trim();

  const city=
    document.getElementById("city")
      .value
      .trim();

  const country=
    document.getElementById("country")
      .value
      .trim();

  if(
    !fullName ||
    !address ||
    !postalCode ||
    !city ||
    !country
  ){

    toast("Complète toute l'adresse.");

    return;
  }

  const totalBefore=
    subtotal();

  const invoiceNumber=
    "INV-"+new Date()
      .getFullYear()+"-"+
      Math.floor(
        100000+
        Math.random()*900000
      );

  const orderNumber=
    "NS-"+Date.now()
      .toString()
      .slice(-9);

  const order={

    id:id("order"),

    orderNumber,

    invoiceNumber,

    userId:
      state.currentUser.id,

    customer:{
      name:fullName,
      email:state.currentUser.email
    },

    address:{
      address,
      postalCode,
      city,
      country
    },

    items:
      state.cart.map(item=>{

        const product=
          PRODUCTS.find(
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

    subtotal:totalBefore,

    discount:totalBefore,

    total:0,

    promoCode:
      state.promo.code,

    paymentMethod:
      "Code promotionnel",

    paymentStatus:
      "Payé",

    warehouse:
      "Entrepôt",

    status:
      STATUS[0],

    createdAt:
      new Date().toISOString(),

    invoice:{
      number:invoiceNumber,
      createdAt:
        new Date().toISOString()
    }

  };

  state.orders.unshift(order);

  write(
    KEY.orders,
    state.orders
  );

  state.cart=[];

  saveCart();

  renderCart();

  state.promo=null;

  closeModal("checkoutModal");

  toast(
    "Commande confirmée. Facture générée."
  );

  setTimeout(()=>{
    showInvoice(order);
  },300);
}

/* =========================================================
   ORDERS
   ========================================================= */

function userOrders(){

  if(!state.currentUser)
    return [];

  return state.orders.filter(
    order=>
      order.userId===
      state.currentUser.id
  );
}

function orderHTML(order,isAdmin=false){

  return `

    <div class="order">

      <div class="order-top">

        <div>

          <div class="order-number">
            ${escapeHTML(order.orderNumber)}
          </div>

          <div class="order-date">
            ${dateFormat(order.createdAt)}
          </div>

          ${
            isAdmin
              ? `
                <div class="order-date">
                  ${escapeHTML(
                    order.customer.email
                  )}
                </div>
              `
              : ""
          }

        </div>

        <span class="status">
          ${escapeHTML(order.status)}
        </span>

      </div>

      <div class="order-info">

        ${order.items.length}
        produit${
          order.items.length>1
            ? "s"
            : ""
        }

        • Total :
        <strong>
          ${money(order.total)}
        </strong>

        <br>

        Livraison :
        ${escapeHTML(
          order.address.postalCode
        )}
        ${escapeHTML(
          order.address.city
        )}

      </div>

      <div class="order-actions">

        <button
          class="mini"
          data-invoice="${order.id}"
        >
          🧾 Voir la facture
        </button>

        ${
          isAdmin
            ? `
              <button
                class="mini"
                data-next-status="${order.id}"
              >
                Avancer le statut
              </button>
            `
            : ""
        }

      </div>

    </div>
  `;
}

/* =========================================================
   ACCOUNT
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

  const orders=
    userOrders();

  document.getElementById("accountContent")
    .innerHTML=`

      <div class="account-box">

        <div class="account-name">
          ${escapeHTML(
            state.currentUser.name
          )}
        </div>

        <div class="account-email">
          ${escapeHTML(
            state.currentUser.email
          )}
        </div>

        <div class="account-role">
          ${
            admin()
              ? "Administrateur"
              : "Client"
          }
        </div>

      </div>

      <h3 style="
        font-size:18px;
        margin-bottom:12px
      ">
        📦 Mes commandes
      </h3>

      ${
        orders.length
          ? orders
              .map(
                order=>
                  orderHTML(order,false)
              )
              .join("")
          : `
            <div style="
              background:#f7f8fa;
              border:1px solid #e3e6eb;
              border-radius:11px;
              padding:30px;
              text-align:center;
              color:#707783;
              font-size:12px;
              margin-bottom:15px
            ">
              Tu n'as encore aucune commande.
            </div>
          `
      }

      <div style="
        display:grid;
        gap:8px;
        margin-top:15px
      ">

        ${
          admin()
            ? `
              <button
                class="mini"
                id="accountAdmin"
              >
                ⚙️ Ouvrir le Dashboard
              </button>
            `
            : ""
        }

        <button
          class="mini"
          id="logoutButton"
        >
          Déconnexion
        </button>

        <button
          class="danger"
          id="deleteAccount"
        >
          Supprimer mon compte
        </button>

      </div>
    `;

  document.getElementById("logoutButton")
    ?.addEventListener(
      "click",
      logout
    );

  document.getElementById("accountAdmin")
    ?.addEventListener(
      "click",
      ()=>{
        closeModal("accountModal");
        openDashboard();
      }
    );

  document.getElementById("deleteAccount")
    ?.addEventListener(
      "click",
      deleteAccount
    );
}

function deleteAccount(){

  if(!state.currentUser)
    return;

  if(
    !confirm(
      "Supprimer ton compte de ce navigateur ?"
    )
  ){
    return;
  }

  const current=
    state.currentUser.id;

  const list=
    users().filter(
      user=>user.id!==current
    );

  saveUsers(list);

  remove(
    `${KEY.favorites}_${current}`
  );

  remove(
    `${KEY.orders}_cart_${current}`
  );

  remove(KEY.session);

  state.currentUser=null;
  state.cart=[];
  state.favorites=[];

  renderHeader();
  renderCart();

  closeModal("accountModal");

  toast("Compte supprimé.");
}

/* =========================================================
   INVOICE
   ========================================================= */

function showInvoice(order){

  if(!order)
    return;

  state.invoice=order;

  document.getElementById("invoiceContent")
    .innerHTML=`

      <div class="invoice">

        <div class="invoice-head">

          <div>

            <div class="invoice-brand">
              NOVA<span>SHOP</span>
            </div>

            <div class="invoice-sub">
              Marketplace gaming & informatique
            </div>

          </div>

          <div class="invoice-title">

            <h1>FACTURE</h1>

            <p>
              ${escapeHTML(
                order.invoiceNumber
              )}
            </p>

            <p>
              ${dateFormat(
                order.createdAt
              )}
            </p>

          </div>

        </div>

        <div class="invoice-info">

          <div>

            <div class="invoice-label">
              Facturé à
            </div>

            <p>
              <strong>
                ${escapeHTML(
                  order.customer.name
                )}
              </strong>
              <br>
              ${escapeHTML(
                order.customer.email
              )}
            </p>

          </div>

          <div>

            <div class="invoice-label">
              Adresse de livraison
            </div>

            <p>
              ${escapeHTML(
                order.address.address
              )}
              <br>
              ${escapeHTML(
                order.address.postalCode
              )}
              ${" "}
              ${escapeHTML(
                order.address.city
              )}
              <br>
              ${escapeHTML(
                order.address.country
              )}
            </p>

          </div>

          <div>

            <div class="invoice-label">
              Commande
            </div>

            <p>
              <strong>
                ${escapeHTML(
                  order.orderNumber
                )}
              </strong>
              <br>
              Statut :
              ${escapeHTML(
                order.status
              )}
            </p>

          </div>

          <div>

            <div class="invoice-label">
              Logistique
            </div>

            <p>
              <strong>
                Entrepôt
              </strong>
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

            ${order.items.map(item=>`

              <tr>

                <td>
                  <strong>
                    ${escapeHTML(
                      item.name
                    )}
                  </strong>
                </td>

                <td>
                  ${escapeHTML(
                    item.code
                  )}
                </td>

                <td>
                  ${item.qty}
                </td>

                <td>
                  ${money(
                    item.price
                  )}
                </td>

                <td>
                  ${money(
                    item.price*
                    item.qty
                  )}
                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

        <div class="invoice-total">

          <div>
            <span>Sous-total</span>
            <strong>
              ${money(order.subtotal)}
            </strong>
          </div>

          <div>
            <span>
              Réduction
              (${escapeHTML(
                order.promoCode
              )})
            </span>

            <strong class="good">
              − ${money(order.discount)}
            </strong>
          </div>

          <div>
            <span>Livraison</span>
            <strong>0,00 €</strong>
          </div>

          <div class="big">
            <span>Total TTC</span>
            <strong>0,00 €</strong>
          </div>

        </div>

        <div class="paid">
          ✓ PAYÉ
        </div>

        <div style="
          margin-top:10px;
          font-size:11px;
          color:#69707c
        ">
          Mode de règlement :
          <strong>
            ${escapeHTML(
              order.paymentMethod
            )}
          </strong>
        </div>

        <div class="invoice-footer">

          <strong>NovaShop</strong><br>

          Facture générée automatiquement par NovaShop.<br>

          Cette version du site utilise un système de paiement
          de démonstration. Aucun paiement bancaire réel n'est
          traité par cette version.

        </div>

      </div>
    `;

  openModal("invoiceModal");
}

function printInvoice(){

  if(!state.invoice)
    return;

  window.print();
}

function downloadInvoice(){

  const order=
    state.invoice;

  if(!order)
    return;

  const content=
    document.getElementById(
      "invoiceContent"
    ).innerHTML;

  const html=`
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${escapeHTML(
  order.invoiceNumber
)} - NovaShop</title>
<style>
body{
  margin:0;
  background:#fff;
  font-family:Arial,Helvetica,sans-serif;
  color:#101318;
}
.invoice{
  max-width:900px;
  margin:auto;
  padding:45px;
}
.invoice-head{
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
.invoice-sub{
  color:#777;
  font-size:11px;
  margin-top:5px;
}
.invoice-title{
  text-align:right;
}
.invoice-title h1{
  font-size:32px;
  margin:0;
}
.invoice-title p{
  color:#777;
  font-size:11px;
}
.invoice-info{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:25px;
  margin:28px 0;
}
.invoice-label{
  color:#888;
  font-size:9px;
  text-transform:uppercase;
  letter-spacing:1px;
  font-weight:bold;
}
.invoice-info p{
  font-size:12px;
  line-height:1.5;
}
.invoice-table{
  width:100%;
  border-collapse:collapse;
}
.invoice-table th,
.invoice-table td{
  padding:11px 6px;
  border-bottom:1px solid #ddd;
  font-size:11px;
  text-align:left;
}
.invoice-table th:last-child,
.invoice-table td:last-child{
  text-align:right;
}
.invoice-total{
  width:330px;
  margin:20px 0 0 auto;
}
.invoice-total div{
  display:flex;
  justify-content:space-between;
  padding:6px 0;
  font-size:12px;
}
.invoice-total .big{
  border-top:2px solid #111;
  padding-top:12px;
  font-size:21px;
  font-weight:bold;
}
.paid{
  display:inline-block;
  margin-top:18px;
  background:#dcfce7;
  color:#166534;
  padding:7px 10px;
  border-radius:20px;
  font-size:10px;
  font-weight:bold;
}
.invoice-footer{
  border-top:1px solid #ddd;
  margin-top:40px;
  padding-top:15px;
  color:#777;
  font-size:9px;
  line-height:1.6;
}
.good{
  color:#138a45;
}
</style>
</head>
<body>
${content}
</body>
</html>
`;

  const blob=
    new Blob(
      [html],
      {
        type:"text/html;charset=utf-8"
      }
    );

  const url=
    URL.createObjectURL(blob);

  const link=
    document.createElement("a");

  link.href=url;

  link.download=
    `${order.invoiceNumber}-NovaShop.html`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  setTimeout(
    ()=>URL.revokeObjectURL(url),
    1000
  );

  toast("Facture téléchargée.");
}

/* =========================================================
   ADMIN
   ========================================================= */

function requireAdmin(){

  if(admin())
    return true;

  toast(
    "Accès réservé à l'administration."
  );

  switchAuth("login");

  openModal("authModal");

  return false;
}

function openDashboard(){

  if(!requireAdmin())
    return;

  renderDashboard();

  document.getElementById("dashboard")
    .classList.add("open");
}

function closeDashboard(){

  document.getElementById("dashboard")
    .classList.remove("open");
}

function renderDashboard(){

  if(!admin())
    return;

  const list=users();

  document.getElementById("statOrders")
    .textContent=
      state.orders.length;

  document.getElementById("statFree")
    .textContent=
      state.orders.filter(
        order=>order.total===0
      ).length;

  document.getElementById("statUsers")
    .textContent=
      list.length;

  document.getElementById("statProducts")
    .textContent=
      PRODUCTS.length;

  const container=
    document.getElementById(
      "adminOrders"
    );

  if(!state.orders.length){

    container.innerHTML=`
      <div style="
        background:#f7f8fa;
        border:1px solid #e3e6eb;
        padding:28px;
        border-radius:10px;
        text-align:center;
        color:#707783;
        font-size:12px
      ">
        Aucune commande.
      </div>
    `;

    return;
  }

  container.innerHTML=
    state.orders
      .map(
        order=>
          orderHTML(order,true)
      )
      .join("");
}

function nextStatus(orderId){

  if(!requireAdmin())
    return;

  const order=
    state.orders.find(
      x=>x.id===orderId
    );

  if(!order)
    return;

  const current=
    STATUS.indexOf(
      order.status
    );

  if(
    current>=0 &&
    current<STATUS.length-1
  ){

    order.status=
      STATUS[current+1];

    write(
      KEY.orders,
      state.orders
    );

    renderDashboard();

    if(
      document.getElementById(
        "accountModal"
      ).classList.contains("show")
    ){
      renderAccount();
    }

    toast(
      `Statut : ${order.status}`
    );

  }else{

    toast(
      "Cette commande est déjà livrée."
    );
  }
}

function resetDemo(){

  if(!requireAdmin())
    return;

  if(
    !confirm(
      "Réinitialiser les commandes et les comptes clients ?"
    )
  ){
    return;
  }

  const admins=
    users().filter(
      user=>user.role==="admin"
    );

  saveUsers(admins);

  state.orders=[];

  write(
    KEY.orders,
    []
  );

  Object.keys(localStorage)
    .filter(
      key=>
        key.startsWith(
          `${KEY.orders}_cart_`
        ) ||
        key.startsWith(
          `${KEY.favorites}_`
        )
    )
    .forEach(
      key=>localStorage.removeItem(key)
    );

  state.cart=[];

  renderCart();
  renderDashboard();

  toast(
    "Données de démonstration réinitialisées."
  );
}

/* =========================================================
   SEARCH
   ========================================================= */

function search(){

  const value=
    document.getElementById(
      "searchInput"
    ).value.trim();

  if(
    value.toUpperCase()===
    ADMIN_CODE
  ){

    if(admin()){

      openDashboard();

    }else{

      toast(
        "Connexion administrateur requise."
      );

      switchAuth("login");
      openModal("authModal");
    }

    return;
  }

  state.search=value;

  renderProducts();

  document.getElementById("catalog")
    .scrollIntoView({
      behavior:"smooth"
    });
}

/* =========================================================
   EVENTS
   ========================================================= */

function bind(){

  document.getElementById(
    "searchForm"
  ).addEventListener(
    "submit",
    event=>{
      event.preventDefault();
      search();
    }
  );

  document.getElementById(
    "sortSelect"
  ).addEventListener(
    "change",
    event=>{
      state.sort=
        event.target.value;

      renderProducts();
    }
  );

  document.getElementById(
    "heroButton"
  ).addEventListener(
    "click",
    ()=>{
      document.getElementById(
        "catalog"
      ).scrollIntoView({
        behavior:"smooth"
      });
    }
  );

  document.getElementById(
    "cartButton"
  ).addEventListener(
    "click",
    openDrawer
  );

  document.getElementById(
    "accountButton"
  ).addEventListener(
    "click",
    openAccount
  );

  document.getElementById(
    "adminButton"
  ).addEventListener(
    "click",
    openDashboard
  );

  document.getElementById(
    "closeDashboard"
  ).addEventListener(
    "click",
    closeDashboard
  );

  document.getElementById(
    "checkoutButton"
  ).addEventListener(
    "click",
    openCheckout
  );

  document.getElementById(
    "applyPromo"
  ).addEventListener(
    "click",
    applyPromo
  );

  document.getElementById(
    "promoCode"
  ).addEventListener(
    "keydown",
    event=>{
      if(event.key==="Enter"){
        event.preventDefault();
        applyPromo();
      }
    }
  );

  document.getElementById(
    "checkoutForm"
  ).addEventListener(
    "submit",
    event=>{
      event.preventDefault();
      createOrder();
    }
  );

  document.getElementById(
    "loginTab"
  ).addEventListener(
    "click",
    ()=>switchAuth("login")
  );

  document.getElementById(
    "signupTab"
  ).addEventListener(
    "click",
    ()=>switchAuth("signup")
  );

  document.getElementById(
    "loginForm"
  ).addEventListener(
    "submit",
    event=>{
      event.preventDefault();

      const email=
        document.getElementById(
          "loginEmail"
        )
        .value
        .trim()
        .toLowerCase();

      const password=
        document.getElementById(
          "loginPassword"
        ).value;

      const user=
        users().find(
          item=>
            item.email===email &&
            item.password===password
        );

      if(!user){

        toast(
          "Email ou mot de passe incorrect."
        );

        return;
      }

      saveSession(user);

      closeModal("authModal");

      toast(
        user.role==="admin"
          ? "Connexion administrateur."
          : "Connexion réussie."
      );
    }
  );

  document.getElementById(
    "signupForm"
  ).addEventListener(
    "submit",
    event=>{
      event.preventDefault();

      const name=
        document.getElementById(
          "signupName"
        ).value.trim();

      const email=
        document.getElementById(
          "signupEmail"
        )
        .value
        .trim()
        .toLowerCase();

      const password=
        document.getElementById(
          "signupPassword"
        ).value;

      const confirm=
        document.getElementById(
          "signupConfirm"
        ).value;

      if(password!==confirm){

        toast(
          "Les mots de passe ne correspondent pas."
        );

        return;
      }

      const list=users();

      if(
        list.some(
          user=>user.email===email
        )
      ){

        toast(
          "Cet email est déjà utilisé."
        );

        return;
      }

      const user={

        id:id("user"),

        name,

        email,

        password,

        role:"user",

        createdAt:
          new Date().toISOString()

      };

      list.push(user);

      saveUsers(list);

      saveSession(user);

      closeModal("authModal");

      toast(
        "Compte créé avec succès."
      );
    }
  );

  document.getElementById(
    "printInvoice"
  ).addEventListener(
    "click",
    printInvoice
  );

  document.getElementById(
    "downloadInvoice"
  ).addEventListener(
    "click",
    downloadInvoice
  );

  document.getElementById(
    "resetDemo"
  ).addEventListener(
    "click",
    resetDemo
  );

  document.getElementById(
    "overlay"
  ).addEventListener(
    "click",
    closeDrawer
  );

  document.addEventListener(
    "click",
    event=>{

      const category=
        event.target.closest(
          "[data-category]"
        );

      if(category){

        state.category=
          category.dataset.category;

        renderCategories();
        renderProducts();

        return;
      }

      if(
        event.target.closest(
          "[data-close-drawer]"
        )
      ){

        closeDrawer();

        return;
      }

      const product=
        event.target.closest(
          "[data-product]"
        );

      if(product){

        productModal(
          product.dataset.product
        );

        return;
      }

      const favorite=
        event.target.closest(
          "[data-favorite]"
        );

      if(favorite){

        toggleFavorite(
          favorite.dataset.favorite
        );

        return;
      }

      const add=
        event.target.closest(
          "[data-add-product]"
        );

      if(add){

        addCart(
          add.dataset.addProduct
        );

        closeModal("productModal");

        return;
      }

      const plus=
        event.target.closest(
          "[data-cart-plus]"
        );

      if(plus){

        qty(
          plus.dataset.cartPlus,
          1
        );

        return;
      }

      const minus=
        event.target.closest(
          "[data-cart-minus]"
        );

      if(minus){

        qty(
          minus.dataset.cartMinus,
          -1
        );

        return;
      }

      const removeButton=
        event.target.closest(
          "[data-cart-remove]"
        );

      if(removeButton){

        removeCart(
          removeButton.dataset.cartRemove
        );

        return;
      }

      const invoice=
        event.target.closest(
          "[data-invoice]"
        );

      if(invoice){

        const order=
          state.orders.find(
            item=>
              item.id===
              invoice.dataset.invoice
          );

        if(order){
          showInvoice(order);
        }

        return;
      }

      const next=
        event.target.closest(
          "[data-next-status]"
        );

      if(next){

        nextStatus(
          next.dataset.nextStatus
        );

        return;
      }

    }
  );

  document.addEventListener(
    "click",
    event=>{

      const close=
        event.target.closest(
          "[data-close]"
        );

      if(close){

        closeModal(
          close.dataset.close
        );
      }
    }
  );
}

/* =========================================================
   DRAWER
   ========================================================= */

function openDrawer(){

  document.getElementById(
    "cartDrawer"
  ).classList.add("open");

  document.getElementById(
    "overlay"
  ).classList.add("show");
}

function closeDrawer(){

  document.getElementById(
    "cartDrawer"
  ).classList.remove("open");

  document.getElementById(
    "overlay"
  ).classList.remove("show");
}

/* =========================================================
   START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);
