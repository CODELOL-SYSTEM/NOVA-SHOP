"use strict";

/*
  NOVASHOP
  Version marketplace démo
  2 fichiers uniquement :
  index.html
  app.js
*/

const PRODUCTS = [

  {
    id:"p1",
    name:"AMD Ryzen 5 9600X",
    brand:"AMD",
    category:"Processeurs",
    price:229.90,
    code:"NS-CPU-9600X",
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description:"Processeur gaming AMD Ryzen 5 9600X."
  },

  {
    id:"p2",
    name:"Corsair Vengeance RGB 32GB DDR5 6000 CL38",
    brand:"Corsair",
    category:"RAM",
    price:119.90,
    code:"NS-RAM-COR-32",
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description:"Kit 32 Go DDR5 avec RGB."
  },

  {
    id:"p3",
    name:"Kingston Fury Beast RGB 32GB DDR5 5600 CL36",
    brand:"Kingston",
    category:"RAM",
    price:99.90,
    code:"NS-RAM-KF-32",
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description:"Kit mémoire DDR5 32 Go RGB."
  },

  {
    id:"p4",
    name:"Samsung 990 PRO 1TB",
    brand:"Samsung",
    category:"SSD",
    price:109.90,
    code:"NS-SSD-990P-1T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description:"SSD NVMe PCIe 4.0 haute performance."
  },

  {
    id:"p5",
    name:"Samsung 990 PRO 2TB",
    brand:"Samsung",
    category:"SSD",
    price:169.90,
    code:"NS-SSD-990P-2T",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description:"SSD NVMe 2 To PCIe 4.0."
  },

  {
    id:"p6",
    name:"Corsair RM850x",
    brand:"Corsair",
    category:"Alimentations",
    price:139.90,
    code:"NS-PSU-RM850X",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description:"Alimentation 850 W destinée aux configurations gaming."
  },

  {
    id:"p7",
    name:"Corsair 5000D Airflow",
    brand:"Corsair",
    category:"Boîtiers",
    price:159.90,
    code:"NS-CASE-5000D",
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description:"Boîtier ATX orienté airflow."
  },

  {
    id:"p8",
    name:"ARCTIC Liquid Freezer III 360",
    brand:"ARCTIC",
    category:"Refroidissement",
    price:129.90,
    code:"NS-AIO-LF3-360",
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description:"Refroidissement liquide 360 mm."
  },

  {
    id:"p9",
    name:"Samsung Odyssey OLED G6",
    brand:"Samsung",
    category:"Écrans",
    price:699.90,
    code:"NS-MON-OLED-G6",
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description:"Écran gaming OLED haut taux de rafraîchissement."
  },

  {
    id:"p10",
    name:"Logitech G PRO X TKL",
    brand:"Logitech",
    category:"Claviers",
    price:199.90,
    code:"NS-KB-PROX-TKL",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description:"Clavier gaming PRO X TKL."
  },

  {
    id:"p11",
    name:"Logitech G PRO X SUPERLIGHT 2",
    brand:"Logitech",
    category:"Souris",
    price:159.90,
    code:"NS-MOUSE-SUPERLIGHT2",
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description:"Souris gaming sans fil légère."
  },

  {
    id:"p12",
    name:"Elgato Wave:3",
    brand:"Elgato",
    category:"Micros",
    price:139.90,
    code:"NS-MIC-WAVE3",
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description:"Microphone USB pour streaming et création."
  },

  {
    id:"p13",
    name:"Sony DualSense PS5",
    brand:"Sony",
    category:"Manettes",
    price:74.90,
    code:"NS-GAMEPAD-DS5",
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description:"Manette sans fil DualSense."
  },

  {
    id:"p14",
    name:"AMD Radeon RX 7600",
    brand:"AMD",
    category:"Cartes graphiques",
    price:289.90,
    code:"NS-GPU-RX7600",
    image:"https://cdn.idealo.com/folder/Product/202813/8/202813846/s4_produktbild_gross/gigabyte-radeon-rx-7600-gaming-oc-8g.jpg",
    description:"Carte graphique AMD Radeon RX 7600 8 Go."
  },

  {
    id:"p15",
    name:"ASUS TUF Gaming B650-PLUS",
    brand:"ASUS",
    category:"Cartes mères",
    price:189.90,
    code:"NS-MB-TUF-B650",
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg",
    description:"Carte mère AM5 ASUS TUF Gaming B650-PLUS."
  },

  {
    id:"p16",
    name:"MSI MAG B650 Tomahawk WiFi",
    brand:"MSI",
    category:"Cartes mères",
    price:219.90,
    code:"NS-MB-MSI-B650",
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
    description:"Carte mère AM5 MSI MAG B650 Tomahawk WiFi."
  },

  {
    id:"p17",
    name:"Gigabyte B650 AORUS Elite AX",
    brand:"Gigabyte",
    category:"Cartes mères",
    price:199.90,
    code:"NS-MB-AORUS-B650",
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
    description:"Carte mère gaming AM5 Gigabyte B650 AORUS Elite AX."
  },

  {
    id:"p18",
    name:"PC Gamer Ryzen 7 7800X3D + RX 9070 XT + 32 Go DDR5",
    brand:"AMD / MemoryPC",
    category:"PC complets",
    price:2237.65,
    code:"NS-PC-7800X3D-9070XT",
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
    description:"PC Gamer complet équipé d'un Ryzen 7 7800X3D, d'une RX 9070 XT et de 32 Go DDR5."
  },

  {
    id:"p19",
    name:"HyperX Cloud II",
    brand:"HyperX",
    category:"Casques",
    price:49.99,
    code:"NS-HEAD-HX-CLOUD2",
    image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
    description:"Casque gaming HyperX Cloud II."
  },

  {
    id:"p20",
    name:"TECURS Clavier Gamer Mécanique 60 % AZERTY",
    brand:"TECURS",
    category:"Claviers",
    price:30,
    code:"NS-KB-TECURS-60",
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
    description:"Clavier mécanique 60 % AZERTY avec switches rouges et LED rétroéclairées."
  },

  {
    id:"p21",
    name:"Clavier Magnétique 65 % Celshading Noir",
    brand:"Celshading",
    category:"Claviers",
    price:120.90,
    code:"NS-KB-CELSHADE-65",
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
    description:"Clavier gaming magnétique 65 % noir."
  },

  {
    id:"p22",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless",
    brand:"Ajazz",
    category:"Souris",
    price:49.99,
    code:"NS-MOUSE-AJ199MAX",
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
    description:"Souris gaming sans fil tri-mode avec capteur PAW3395, DPI réglable et batterie 800 mAh."
  },

  {
    id:"p23",
    name:"Logitech G PRO X2 SUPERSTRIKE Blanc et Noir",
    brand:"Logitech",
    category:"Souris",
    price:150.99,
    code:"NS-MOUSE-PROX2-SS",
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
    description:"Souris gaming sans fil Logitech G PRO X2 SUPERSTRIKE."
  }

];


const CATEGORIES = [
  "Tous",
  "Processeurs",
  "Cartes graphiques",
  "Cartes mères",
  "RAM",
  "SSD",
  "PC complets",
  "Boîtiers",
  "Alimentations",
  "Refroidissement",
  "Écrans",
  "Claviers",
  "Souris",
  "Casques",
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


const LS = {
  users:"novashop_users",
  session:"novashop_session",
  orders:"novashop_orders",
  reviews:"novashop_reviews"
};


let state = {
  category:"Tous",
  search:"",
  sort:"relevance",
  cart:[],
  favorites:[],
  currentUser:null,
  orders:[],
  appliedPromo:null,
  discountPercent:0
};


/* =========================
   OUTILS
========================= */

function getJSON(key,fallback){
  try{
    const value=localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}


function setJSON(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}


function uid(prefix){
  return prefix+"-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
}


function money(value){
  return new Intl.NumberFormat("fr-FR",{
    style:"currency",
    currency:"EUR"
  }).format(value);
}


function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}


function $(id){
  return document.getElementById(id);
}


function toast(message){
  const el=$("toast");

  el.textContent=message;
  el.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer=setTimeout(()=>{
    el.classList.remove("show");
  },2600);
}


function openModal(id){
  const el=$(id);

  if(el){
    el.classList.add("show");
    document.body.style.overflow="hidden";
  }
}


function closeModal(id){
  const el=$(id);

  if(el){
    el.classList.remove("show");
  }

  if(!document.querySelector(".modal.show")){
    document.body.style.overflow="";
  }
}


/* =========================
   USERS
========================= */

function getUsers(){
  return getJSON(LS.users,[]);
}


function saveUsers(users){
  setJSON(LS.users,users);
}


/* =========================
   PRODUITS
========================= */

function getProduct(id){
  return PRODUCTS.find(product=>product.id===id);
}


function filteredProducts(){

  let list=[...PRODUCTS];

  if(state.category!=="Tous"){
    list=list.filter(
      product=>product.category===state.category
    );
  }

  const query=state.search.trim().toLowerCase();

  if(query){
    list=list.filter(product=>{
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query)
      );
    });
  }

  if(state.sort==="priceAsc"){
    list.sort((a,b)=>a.price-b.price);
  }

  if(state.sort==="priceDesc"){
    list.sort((a,b)=>b.price-a.price);
  }

  if(state.sort==="name"){
    list.sort((a,b)=>a.name.localeCompare(b.name,"fr"));
  }

  return list;
}


/* =========================
   CATEGORIES
========================= */

function renderCategories(){

  $("categories").innerHTML=CATEGORIES.map(category=>`

    <button
      class="cat ${state.category===category?"active":""}"
      data-category="${escapeHTML(category)}">

      ${escapeHTML(category)}

    </button>

  `).join("");
}


/* =========================
   FAVORIS
========================= */

function favoritesKey(){

  return state.currentUser
    ? `novashop_favorites_${state.currentUser.id}`
    : "novashop_guest_favorites";
}


function cartKey(){

  return state.currentUser
    ? `novashop_cart_${state.currentUser.id}`
    : "novashop_guest_cart";
}


function loadUserData(){

  state.cart=getJSON(cartKey(),[]);
  state.favorites=getJSON(favoritesKey(),[]);
}


function saveCart(){
  setJSON(cartKey(),state.cart);
}


function saveFavorites(){
  setJSON(favoritesKey(),state.favorites);
}


function toggleFavorite(id){

  if(state.favorites.includes(id)){

    state.favorites=
      state.favorites.filter(productId=>productId!==id);

    toast("Article retiré des favoris");

  }else{

    state.favorites.push(id);

    toast("❤️ Article ajouté aux favoris");

  }

  saveFavorites();
  renderProducts();
}


/* =========================
   AVIS
========================= */

function getReviews(){
  return getJSON(LS.reviews,[]);
}


function saveReviews(reviews){
  setJSON(LS.reviews,reviews);
}


function reviewerName(name){

  const clean=String(name||"Client").trim();

  if(clean.length<=3){
    return clean+"***";
  }

  return clean.slice(0,3)+"***";
}


function starsHTML(note){

  let html="";

  for(let i=1;i<=5;i++){

    html+=
      i<=note
      ? `<span style="color:#f59e0b">★</span>`
      : `<span style="color:#d1d5db">★</span>`;

  }

  return html;
}


function getProductReviews(productId){

  return getReviews()
    .filter(review=>review.productId===productId)
    .sort(
      (a,b)=>new Date(b.date)-new Date(a.date)
    );
}


function getProductRating(productId){

  const reviews=getProductReviews(productId);

  if(!reviews.length){
    return {
      average:0,
      count:0
    };
  }

  const average=
    reviews.reduce(
      (sum,review)=>sum+review.rating,
      0
    ) / reviews.length;

  return {
    average:Number(average.toFixed(1)),
    count:reviews.length
  };
}


function ratingBadge(productId){

  const rating=getProductRating(productId);

  if(!rating.count){

    return `
      <span style="color:#94a3b8;font-size:12px">
        Aucun avis
      </span>
    `;

  }

  return `
    <span class="rating-stars">
      ${starsHTML(Math.round(rating.average))}
    </span>

    <strong>${rating.average}/5</strong>

    <span style="color:#94a3b8;font-size:12px">
      (${rating.count})
    </span>
  `;
}


function userAlreadyReviewed(productId){

  if(!state.currentUser){
    return false;
  }

  return getReviews().some(review=>
    review.productId===productId &&
    review.userId===state.currentUser.id
  );
}


function reviewForm(productId){

  if(!state.currentUser){

    return `
      <div
        style="
          background:#f8fafc;
          padding:16px;
          border-radius:11px;
          margin-top:25px
        ">

        <strong>⭐ Donner une note</strong>

        <p
          style="
            color:#64748b;
            margin:6px 0 12px
          ">

          Connecte-toi pour publier un avis.

        </p>

        <button
          class="primary"
          data-open-login>

          Se connecter

        </button>

      </div>
    `;
  }


  if(userAlreadyReviewed(productId)){

    return `
      <div
        style="
          background:#f0fdf4;
          color:#166534;
          padding:15px;
          border-radius:10px;
          margin-top:25px
        ">

        ✓ Tu as déjà donné ton avis sur cet article.

      </div>
    `;
  }


  return `

    <div
      style="
        margin-top:27px;
        border-top:1px solid #e5e7eb;
        padding-top:22px
      ">

      <h3>⭐ Donner une note</h3>

      <div
        class="rating-selector"
        id="ratingSelector"
        style="margin:9px 0 13px">

        ${[1,2,3,4,5].map(number=>`

          <button
            type="button"
            data-rating="${number}">

            ★

          </button>

        `).join("")}

      </div>

      <textarea
        id="reviewText"
        maxlength="500"
        placeholder="Ton avis sur cet article..."
        style="
          width:100%;
          min-height:105px;
          resize:vertical;
          padding:12px;
          border:1px solid #dbe1e8;
          border-radius:9px;
          outline:none;
          font:inherit
        "></textarea>

      <button
        class="primary"
        data-review-product="${productId}"
        style="margin-top:10px">

        Publier mon avis

      </button>

    </div>

  `;
}


function reviewsHTML(productId){

  const reviews=getProductReviews(productId);

  if(!reviews.length){

    return `
      <div
        style="
          margin-top:20px;
          padding:20px;
          background:#f8fafc;
          border-radius:10px;
          color:#64748b
        ">

        Aucun avis pour le moment.
        Sois le premier ⭐

      </div>
    `;
  }


  return `

    <div style="margin-top:27px">

      <h3 style="margin-bottom:12px">
        ⭐ Avis clients
      </h3>

      <div
        style="
          display:grid;
          gap:10px
        ">

        ${reviews.map(review=>`

          <div class="review">

            <div class="review-top">

              <strong>
                ${escapeHTML(
                  reviewerName(review.name)
                )}
              </strong>

              <span>
                ${starsHTML(review.rating)}
              </span>

            </div>

            ${
              review.comment
              ? `
                <p
                  style="
                    margin:10px 0 5px;
                    color:#374151;
                    line-height:1.5
                  ">

                  ${escapeHTML(review.comment)}

                </p>
              `
              :""
            }

            <small style="color:#94a3b8">

              ${new Date(
                review.date
              ).toLocaleDateString("fr-FR")}

            </small>

          </div>

        `).join("")}

      </div>

    </div>

  `;
}


function submitReview(productId){

  if(!state.currentUser){
    openAuth("login");
    return;
  }

  if(userAlreadyReviewed(productId)){
    toast("Tu as déjà noté cet article");
    return;
  }

  const selected=
    document.querySelector(
      "#ratingSelector [data-rating].selected"
    );

  if(!selected){
    toast("Choisis une note ⭐");
    return;
  }

  const rating=Number(selected.dataset.rating);

  const comment=
    $("reviewText").value.trim();

  const reviews=getReviews();

  reviews.push({
    id:uid("REVIEW"),
    productId,
    userId:state.currentUser.id,
    name:state.currentUser.name,
    rating,
    comment,
    date:new Date().toISOString()
  });

  saveReviews(reviews);

  toast("⭐ Avis publié !");

  openProduct(productId);
}


/* =========================
   PRODUITS
========================= */

function renderProducts(){

  const products=filteredProducts();

  $("resultCount").textContent=
    `(${products.length})`;

  $("emptyState").style.display=
    products.length ? "none" : "block";


  $("productsGrid").innerHTML=
    products.map(product=>{

      const liked=
        state.favorites.includes(product.id);

      return `

        <article
          class="card"
          data-product="${product.id}">

          <button
            class="fav ${liked?"active":""}"
            data-action="favorite"
            data-id="${product.id}">

            ${liked?"♥":"♡"}

          </button>

          <div class="imgbox">

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy">

          </div>

          <div class="info">

            <div class="brand">
              ${escapeHTML(product.brand)}
            </div>

            <div class="name">
              ${escapeHTML(product.name)}
            </div>

            <div style="margin:6px 0">
              ${ratingBadge(product.id)}
            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="code">
              Réf. ${escapeHTML(product.code)}
            </div>

            <div class="cardBtns">

              <button
                data-action="details"
                data-id="${product.id}">

                Voir

              </button>

              <button
                class="add"
                data-action="add"
                data-id="${product.id}">

                🛒 Ajouter

              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");
}


/* =========================
   PANIER
========================= */

function cartTotal(){

  return state.cart.reduce(
    (total,item)=>{

      const product=getProduct(item.id);

      return total+
        (
          product
          ? product.price*item.qty
          : 0
        );

    },
    0
  );
}


function cartCount(){

  return state.cart.reduce(
    (total,item)=>total+item.qty,
    0
  );
}


function discountedTotal(){

  const total=cartTotal();

  return total*
    (1-state.discountPercent/100);
}


function addToCart(id){

  const product=getProduct(id);

  if(!product){
    return;
  }

  const existing=
    state.cart.find(item=>item.id===id);

  if(existing){
    existing.qty++;
  }else{
    state.cart.push({
      id,
      qty:1
    });
  }

  saveCart();
  renderCart();

  toast(
    `${product.name} ajouté au panier 🛒`
  );
}


function removeFromCart(id){

  state.cart=
    state.cart.filter(item=>item.id!==id);

  saveCart();
  renderCart();
}


function changeQty(id,delta){

  const item=
    state.cart.find(item=>item.id===id);

  if(!item){
    return;
  }

  item.qty+=delta;

  if(item.qty<=0){
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}


function renderCart(){

  $("cartCount").textContent=
    cartCount();


  if(!state.cart.length){

    $("cartItems").innerHTML=`

      <div
        style="
          text-align:center;
          padding:55px 15px;
          color:#64748b
        ">

        <div style="font-size:48px">
          🛒
        </div>

        <h3 style="margin:10px 0">
          Ton panier est vide
        </h3>

        <p>
          Ajoute un article pour commencer.
        </p>

      </div>

    `;

  }else{

    $("cartItems").innerHTML=
      state.cart.map(item=>{

        const product=
          getProduct(item.id);

        if(!product){
          return "";
        }

        return `

          <div class="cart-item">

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}">

            <div class="cart-info">

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <div
                style="
                  margin-top:4px;
                  font-weight:800
                ">

                ${money(product.price)}

              </div>

              <div class="qty">

                <button
                  data-cart="minus"
                  data-id="${product.id}">

                  −

                </button>

                <strong>
                  ${item.qty}
                </strong>

                <button
                  data-cart="plus"
                  data-id="${product.id}">

                  +

                </button>

                <button
                  class="remove"
                  data-cart="remove"
                  data-id="${product.id}">

                  Supprimer

                </button>

              </div>

            </div>

          </div>

        `;

      }).join("");
  }


  $("cartTotal").textContent=
    money(cartTotal());
}


/* =========================
   PRODUIT DETAIL
========================= */

function openProduct(id){

  const product=getProduct(id);

  if(!product){
    return;
  }


  $("productBody").innerHTML=`

    <div>

      <div class="product-detail-grid">

        <div class="product-detail-image">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}">

        </div>

        <div>

          <div class="brand">
            ${escapeHTML(product.brand)}
          </div>

          <h2 style="font-size:29px;line-height:1.15">
            ${escapeHTML(product.name)}
          </h2>

          <div style="margin:10px 0">
            ${ratingBadge(product.id)}
          </div>

          <p
            style="
              color:#64748b;
              line-height:1.65;
              margin-top:13px
            ">

            ${escapeHTML(product.description)}

          </p>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="code">
            Référence : ${escapeHTML(product.code)}
          </div>

          <button
            class="primary"
            data-detail-add="${product.id}"
            style="margin-top:20px">

            🛒 Ajouter au panier

          </button>

        </div>

      </div>

      ${reviewForm(product.id)}

      ${reviewsHTML(product.id)}

    </div>

  `;

  openModal("productModal");
}


/* =========================
   AUTH
========================= */

function renderAuth(){

  const logged=
    !!state.currentUser;

  $("accountText").textContent=
    logged
    ? state.currentUser.name.split(" ")[0]
    : "Compte";

  $("ordersBtn").classList.toggle(
    "hidden",
    !logged
  );

  $("dashboardBtn").classList.toggle(
    "hidden",
    !(logged &&
      state.currentUser.role==="admin")
  );
}


function openAuth(tab="login"){

  openModal("authModal");

  $("loginForm").classList.toggle(
    "hidden",
    tab!=="login"
  );

  $("signupForm").classList.toggle(
    "hidden",
    tab!=="signup"
  );

  $("loginTab").classList.toggle(
    "active",
    tab==="login"
  );

  $("signupTab").classList.toggle(
    "active",
    tab==="signup"
  );
}


function login(email,password,adminCode){

  const users=getUsers();

  const user=users.find(
    current=>
      current.email.toLowerCase()===
      email.toLowerCase() &&
      current.password===password
  );


  if(!user){

    toast(
      "E-mail ou mot de passe incorrect"
    );

    return;
  }


  if(
    adminCode &&
    adminCode===ADMIN_CODE
  ){

    user.role="admin";

    saveUsers(users);

  }


  state.currentUser=user;

  localStorage.setItem(
    LS.session,
    user.id
  );

  loadUserData();

  renderAuth();
  renderProducts();
  renderCart();

  closeModal("authModal");

  toast(
    user.role==="admin"
    ? "Connexion administrateur réussie ⚙️"
    : "Connexion réussie 👤"
  );
}


function signup(
  name,
  email,
  password,
  confirm
){

  if(password.length<6){

    toast(
      "Le mot de passe doit contenir au moins 6 caractères"
    );

    return;
  }


  if(password!==confirm){

    toast(
      "Les mots de passe ne correspondent pas"
    );

    return;
  }


  const users=getUsers();


  if(
    users.some(
      user=>
        user.email.toLowerCase()===
        email.toLowerCase()
    )
  ){

    toast(
      "Un compte existe déjà avec cet e-mail"
    );

    return;
  }


  const user={
    id:uid("USER"),
    name:name.trim(),
    email:email.trim(),
    password,
    role:"user",
    createdAt:new Date().toISOString()
  };


  users.push(user);

  saveUsers(users);

  state.currentUser=user;

  localStorage.setItem(
    LS.session,
    user.id
  );

  loadUserData();

  renderAuth();
  renderProducts();
  renderCart();

  closeModal("authModal");

  toast(
    "Compte créé avec succès 👤"
  );
}


function logout(){

  state.currentUser=null;

  localStorage.removeItem(
    LS.session
  );

  loadUserData();

  renderAuth();
  renderProducts();
  renderCart();

  closeModal("accountModal");

  toast(
    "Déconnexion effectuée"
  );
}


function deleteMyAccount(){

  if(!state.currentUser){
    return;
  }


  const confirmed=
    window.confirm(
      "Supprimer ton compte et tes données locales ?"
    );


  if(!confirmed){
    return;
  }


  const id=state.currentUser.id;


  saveUsers(
    getUsers().filter(
      user=>user.id!==id
    )
  );


  localStorage.removeItem(
    `novashop_cart_${id}`
  );

  localStorage.removeItem(
    `novashop_favorites_${id}`
  );

  localStorage.removeItem(
    LS.session
  );


  state.currentUser=null;
  state.cart=[];
  state.favorites=[];


  renderAuth();
  renderProducts();
  renderCart();

  closeModal("accountModal");

  toast(
    "Compte supprimé"
  );
}


function openAccount(){

  if(!state.currentUser){

    openAuth("login");

    return;
  }


  $("accountBody").innerHTML=`

    <h2>
      ${escapeHTML(
        state.currentUser.name
      )}
    </h2>

    <p
      style="
        color:#64748b;
        margin-top:5px
      ">

      ${escapeHTML(
        state.currentUser.email
      )}

    </p>

    <div
      style="
        margin-top:13px;
        padding:12px;
        background:#f8fafc;
        border-radius:9px
      ">

      Type de compte :
      <strong>
        ${
          state.currentUser.role==="admin"
          ? "Administrateur"
          : "Client"
        }
      </strong>

    </div>

    <div
      style="
        display:grid;
        gap:10px;
        margin-top:20px
      ">

      <button
        class="primary"
        id="accountOrders">

        📦 Mes commandes

      </button>

      <button
        id="logoutBtn"
        class="header-btn">

        Se déconnecter

      </button>

      <button
        id="deleteAccountBtn"
        class="danger">

        Supprimer mon compte

      </button>

    </div>

  `;


  $("accountOrders").onclick=()=>{

    closeModal("accountModal");

    openOrders();

  };


  $("logoutBtn").onclick=logout;


  $("deleteAccountBtn").onclick=
    deleteMyAccount;


  openModal("accountModal");
}


/* =========================
   COMMANDES
========================= */

function getCurrentOrders(){

  if(!state.currentUser){
    return [];
  }

  return state.orders.filter(
    order=>
      order.userId===
      state.currentUser.id
  );
}


function renderOrders(){

  const orders=
    getCurrentOrders();


  if(!orders.length){

    $("ordersBody").innerHTML=`

      <div
        style="
          text-align:center;
          padding:50px 15px
        ">

        <div style="font-size:50px">
          📦
        </div>

        <h2 style="margin:10px 0">
          Aucune commande
        </h2>

        <p class="muted">
          Tu n'as encore passé aucune commande.
        </p>

      </div>

    `;

    return;
  }


  $("ordersBody").innerHTML=
    orders.map(order=>`

      <div class="order">

        <div
          style="
            display:flex;
            justify-content:space-between;
            gap:10px;
            flex-wrap:wrap
          ">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <span class="status">
            ${escapeHTML(order.status)}
          </span>

        </div>

        <p
          class="muted"
          style="margin:8px 0">

          ${new Date(
            order.createdAt
          ).toLocaleString("fr-FR")}

        </p>

        <p>
          ${order.items.reduce(
            (number,item)=>
              number+item.qty,
            0
          )}
          article(s)
          • Total :
          <strong>
            ${money(order.total)}
          </strong>
        </p>

        <button
          class="primary"
          data-invoice="${order.id}"
          style="margin-top:12px">

          🧾 Voir la facture

        </button>

      </div>

    `).join("");
}


function openOrders(){

  if(!state.currentUser){

    openAuth("login");

    return;
  }

  renderOrders();

  openModal("ordersModal");
}


/* =========================
   CHECKOUT
========================= */

function updateCheckout(){

  const subtotal=cartTotal();

  const discount=
    subtotal*
    state.discountPercent/
    100;

  const total=
    subtotal-discount;


  $("checkoutSummary").innerHTML=`

    <div
      style="
        display:flex;
        justify-content:space-between
      ">

      <span>Sous-total</span>

      <strong>
        ${money(subtotal)}
      </strong>

    </div>

    <div
      style="
        display:flex;
        justify-content:space-between;
        margin-top:8px;
        color:#16a34a
      ">

      <span>Réduction</span>

      <strong>
        -${money(discount)}
      </strong>

    </div>

    <hr style="margin:13px 0;border:0;border-top:1px solid #e5e7eb">

    <div
      style="
        display:flex;
        justify-content:space-between;
        font-size:20px
      ">

      <strong>Total</strong>

      <strong>
        ${money(total)}
      </strong>

    </div>

    ${
      state.appliedPromo
      ? `
        <div
          style="
            margin-top:10px;
            color:#16a34a;
            font-size:13px;
            font-weight:800
          ">

          ✓ Code
          ${escapeHTML(state.appliedPromo)}
          appliqué

        </div>
      `
      :""
    }

  `;


  const pay=$("payButton");


  if(
    total<=0 &&
    state.discountPercent===100
  ){

    pay.disabled=false;

    pay.textContent=
      "✓ Finaliser gratuitement";

  }else{

    pay.disabled=true;

    pay.textContent=
      "🔒 Code NOVA100 requis";

  }
}


function openCheckout(){

  if(!state.cart.length){

    toast(
      "Ton panier est vide"
    );

    return;
  }


  if(!state.currentUser){

    openAuth("login");

    toast(
      "Connecte-toi pour commander"
    );

    return;
  }


  state.appliedPromo=null;
  state.discountPercent=0;


  $("promoCode").value="";

  $("fullName").value=
    state.currentUser.name;


  $("address").value="";
  $("postalCode").value="";
  $("city").value="";
  $("country").value="France";


  updateCheckout();

  openModal("checkoutModal");
}


function createOrder(){

  if(!state.currentUser){
    return;
  }


  const subtotal=cartTotal();


  if(
    state.discountPercent!==100 ||
    discountedTotal()>0
  ){

    toast(
      "Le code NOVA100 est requis pour cette démo"
    );

    return;
  }


  const fullName=
    $("fullName").value.trim();

  const address=
    $("address").value.trim();

  const postalCode=
    $("postalCode").value.trim();

  const city=
    $("city").value.trim();

  const country=
    $("country").value.trim();


  if(
    !fullName ||
    !address ||
    !postalCode ||
    !city ||
    !country
  ){

    toast(
      "Complète toutes les informations de livraison"
    );

    return;
  }


  const items=
    state.cart.map(item=>{

      const product=
        getProduct(item.id);

      return {
        id:product.id,
        name:product.name,
        price:product.price,
        qty:item.qty,
        code:product.code,
        image:product.image
      };

    });


  const order={

    id:uid("NS"),

    invoiceNumber:
      `INV-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`,

    userId:
      state.currentUser.id,

    customer:{
      name:fullName,
      address,
      postalCode,
      city,
      country
    },

    items,

    subtotal,

    discountPercent:100,

    discountAmount:subtotal,

    total:0,

    paymentStatus:
      "Payé par code promotionnel",

    status:
      "Commande reçue",

    warehouse:
      "Entrepôt",

    createdAt:
      new Date().toISOString()

  };


  state.orders.unshift(order);

  setJSON(
    LS.orders,
    state.orders
  );


  state.cart=[];

  saveCart();


  state.appliedPromo=null;
  state.discountPercent=0;


  renderCart();
  renderAuth();

  closeModal("checkoutModal");

  showInvoice(order);

  toast(
    "Commande créée avec succès 📦"
  );
}


/* =========================
   FACTURE
========================= */

function showInvoice(order){

  $("invoiceBody").innerHTML=`

    <div class="invoice-top">

      <div>

        <div class="invoice-logo">
          NOVA<span>SHOP</span>
        </div>

        <p
          style="
            color:#64748b;
            margin-top:4px
          ">

          Marketplace gaming

        </p>

      </div>

      <div style="text-align:right">

        <strong style="font-size:19px">
          FACTURE
        </strong>

        <div
          style="
            margin-top:5px;
            color:#475569
          ">

          ${escapeHTML(
            order.invoiceNumber
          )}

        </div>

        <div
          style="
            color:#64748b;
            margin-top:2px
          ">

          ${new Date(
            order.createdAt
          ).toLocaleDateString("fr-FR")}

        </div>

      </div>

    </div>


    <div class="invoice-grid">

      <div>

        <strong>Client</strong>

        <p
          style="
            color:#475569;
            line-height:1.6;
            margin-top:6px
          ">

          ${escapeHTML(order.customer.name)}
          <br>

          ${escapeHTML(order.customer.address)}
          <br>

          ${escapeHTML(order.customer.postalCode)}
          ${escapeHTML(order.customer.city)}
          <br>

          ${escapeHTML(order.customer.country)}

        </p>

      </div>


      <div>

        <strong>
          Informations commande
        </strong>

        <p
          style="
            color:#475569;
            line-height:1.6;
            margin-top:6px
          ">

          Commande :
          ${escapeHTML(order.id)}

          <br>

          Entrepôt :
          ${escapeHTML(order.warehouse)}

          <br>

          Statut :
          ${escapeHTML(order.status)}

          <br>

          Paiement :
          ${escapeHTML(order.paymentStatus)}

        </p>

      </div>

    </div>


    <table>

      <thead>

        <tr>

          <th>Article</th>
          <th>Qté</th>
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
              ${money(item.price)}
            </td>

            <td>
              ${money(
                item.price*item.qty
              )}
            </td>

          </tr>

        `).join("")}

      </tbody>

    </table>


    <div class="invoice-total">

      <div>

        <span>
          Sous-total
        </span>

        <strong>
          ${money(order.subtotal)}
        </strong>

      </div>

      <div style="color:#16a34a">

        <span>
          Réduction
        </span>

        <strong>
          -${money(order.discountAmount)}
        </strong>

      </div>

      <div class="grand">

        <span>
          Total payé
        </span>

        <strong>
          ${money(order.total)}
        </strong>

      </div>

    </div>


    <div
      style="
        margin-top:38px;
        padding-top:18px;
        border-top:1px solid #e5e7eb;
        color:#64748b;
        font-size:12px;
        line-height:1.6
      ">

      Merci pour votre commande sur NovaShop.
      <br>

      Facture générée automatiquement par le site.
      <br>

      Paiement enregistré :
      code promotionnel.

    </div>

  `;


  openModal("invoiceModal");
}


/* =========================
   ADMIN
========================= */

function requireAdmin(){

  if(
    !state.currentUser ||
    state.currentUser.role!=="admin"
  ){

    toast(
      "Accès réservé à l'administration"
    );

    if(!state.currentUser){
      openAuth("login");
    }

    return false;
  }

  return true;
}


function openDashboard(){

  if(!requireAdmin()){
    return;
  }

  renderDashboard();

  openModal("dashboardModal");
}


function renderDashboard(){

  const users=getUsers();

  const totalOrders=
    state.orders.length;

  const freeOrders=
    state.orders.filter(
      order=>order.discountPercent===100
    ).length;

  const catalogValue=
    PRODUCTS.reduce(
      (sum,product)=>
        sum+product.price,
      0
    );


  $("dashboardBody").innerHTML=`

    <div class="dashboard-stats">

      <div class="stat">

        Commandes

        <b>
          ${totalOrders}
        </b>

      </div>

      <div class="stat">

        Commandes gratuites

        <b>
          ${freeOrders}
        </b>

      </div>

      <div class="stat">

        Valeur catalogue

        <b>
          ${money(catalogValue)}
        </b>

      </div>

      <div class="stat">

        Utilisateurs

        <b>
          ${users.length}
        </b>

      </div>

    </div>


    <div class="order">

      <h3>
        📍 Entrepôt
      </h3>

      <p
        style="
          margin-top:7px;
          color:#64748b
        ">

        Point logistique par défaut :

      </p>

      <strong>
        Entrepôt
      </strong>

    </div>


    <div class="order">

      <h3>
        🎟️ Codes promotionnels
      </h3>

      <p style="margin-top:8px">
        <strong>NOVA100</strong> : 100 %
      </p>

      <p>
        <strong>NOVA20</strong> : 20 %
      </p>

      <p>
        <strong>NOVA10</strong> : 10 %
      </p>

      <small
        style="
          display:block;
          color:#64748b;
          margin-top:8px
        ">

        Dans cette démo, seul NOVA100
        permet de finaliser sans paiement réel.

      </small>

    </div>


    <div class="order">

      <h3>
        🔐 Accès administrateur
      </h3>

      <p
        style="
          margin-top:7px;
          color:#64748b
        ">

        Le dashboard n'est affiché
        qu'aux comptes ayant le rôle
        administrateur.

      </p>

    </div>


    <h3 style="margin:25px 0 12px">
      📦 Toutes les commandes
    </h3>


    ${
      state.orders.length
      ? state.orders.map(order=>`

        <div class="order">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <p
            style="
              margin-top:7px;
              color:#64748b
            ">

            Client :
            ${escapeHTML(order.customer.name)}

          </p>

          <p>
            Total :
            <strong>
              ${money(order.total)}
            </strong>
          </p>

          <p>
            Statut :
            <strong>
              ${escapeHTML(order.status)}
            </strong>
          </p>

          <div
            style="
              display:flex;
              gap:8px;
              flex-wrap:wrap;
              margin-top:10px
            ">

            <button
              data-admin-invoice="${order.id}"
              class="header-btn">

              🧾 Facture

            </button>

            <button
              data-status="${order.id}"
              class="primary">

              Avancer le statut

            </button>

          </div>

        </div>

      `).join("")
      : `
        <div
          style="
            padding:30px;
            background:#f8fafc;
            border-radius:10px;
            color:#64748b
          ">

          Aucune commande.

        </div>
      `
    }


    <button
      id="resetDemo"
      class="danger"
      style="margin-top:10px">

      Réinitialiser les commandes de démonstration

    </button>

  `;
}


function advanceStatus(orderId){

  if(!requireAdmin()){
    return;
  }


  const order=
    state.orders.find(
      current=>current.id===orderId
    );


  if(!order){
    return;
  }


  const index=
    STATUS.indexOf(order.status);


  if(index<STATUS.length-1){

    order.status=
      STATUS[index+1];

    setJSON(
      LS.orders,
      state.orders
    );

    renderDashboard();
    renderOrders();

    toast(
      `Statut : ${order.status}`
    );

  }else{

    toast(
      "La commande est déjà livrée"
    );
  }
}


function resetDemo(){

  if(!requireAdmin()){
    return;
  }


  const confirmed=
    window.confirm(
      "Supprimer toutes les commandes de démonstration ?"
    );


  if(!confirmed){
    return;
  }


  state.orders=[];

  setJSON(
    LS.orders,
    []
  );

  renderDashboard();

  toast(
    "Commandes supprimées"
  );
}


/* =========================
   RECHERCHE
========================= */

function performSearch(){

  const query=
    $("searchInput").value.trim();


  if(
    query.toUpperCase()===
    ADMIN_CODE
  ){

    if(
      state.currentUser &&
      state.currentUser.role==="admin"
    ){

      openDashboard();

    }else{

      $("loginAdminCode").value=
        query;

      openAuth("login");

      toast(
        "Code administrateur détecté"
      );

    }

    return;
  }


  state.search=query;

  renderProducts();
}


/* =========================
   EVENTS
========================= */

function setupEvents(){

  /* catégories */

  $("categories").addEventListener(
    "click",
    event=>{

      const button=
        event.target.closest(
          "[data-category]"
        );

      if(!button){
        return;
      }

      state.category=
        button.dataset.category;

      renderCategories();
      renderProducts();

    }
  );


  /* produits */

  $("productsGrid").addEventListener(
    "click",
    event=>{

      const button=
        event.target.closest(
          "[data-action]"
        );

      if(!button){
        return;
      }

      const action=
        button.dataset.action;

      const id=
        button.dataset.id;


      if(action==="favorite"){
        toggleFavorite(id);
      }


      if(action==="add"){
        addToCart(id);
      }


      if(action==="details"){
        openProduct(id);
      }

    }
  );


  /* panier */

  $("cartItems").addEventListener(
    "click",
    event=>{

      const button=
        event.target.closest(
          "[data-cart]"
        );

      if(!button){
        return;
      }

      const id=
        button.dataset.id;

      const action=
        button.dataset.cart;


      if(action==="plus"){
        changeQty(id,1);
      }


      if(action==="minus"){
        changeQty(id,-1);
      }


      if(action==="remove"){
        removeFromCart(id);
      }

    }
  );


  /* recherche */

  $("searchBtn").onclick=
    performSearch;


  $("searchInput").addEventListener(
    "keydown",
    event=>{

      if(event.key==="Enter"){
        performSearch();
      }

    }
  );


  /* tri */

  $("sortSelect").onchange=
    event=>{

      state.sort=
        event.target.value;

      renderProducts();

    };


  /* panier */

  $("cartBtn").onclick=()=>{

    $("cartDrawer")
      .classList.add("show");

    $("overlay")
      .classList.add("show");

  };


  $("closeCart").onclick=()=>{

    $("cartDrawer")
      .classList.remove("show");

    $("overlay")
      .classList.remove("show");

  };


  $("overlay").onclick=()=>{

    $("cartDrawer")
      .classList.remove("show");

    $("overlay")
      .classList.remove("show");

  };


  /* compte */

  $("accountBtn").onclick=
    openAccount;


  $("ordersBtn").onclick=
    openOrders;


  $("dashboardBtn").onclick=
    openDashboard;


  /* auth */

  $("loginTab").onclick=
    ()=>openAuth("login");


  $("signupTab").onclick=
    ()=>openAuth("signup");


  $("loginForm").onsubmit=
    event=>{

      event.preventDefault();

      login(
        $("loginEmail").value.trim(),
        $("loginPassword").value,
        $("loginAdminCode").value.trim()
      );

    };


  $("signupForm").onsubmit=
    event=>{

      event.preventDefault();

      signup(
        $("signupName").value.trim(),
        $("signupEmail").value.trim(),
        $("signupPassword").value,
        $("signupConfirm").value
      );

    };


  /* checkout */

  $("checkoutBtn").onclick=
    openCheckout;


  $("promoCode").addEventListener(
    "input",
    ()=>{

      const code=
        $("promoCode")
          .value
          .trim()
          .toUpperCase();


      if(
        PROMOS[code]!==undefined
      ){

        state.appliedPromo=code;

        state.discountPercent=
          PROMOS[code];

      }else{

        state.appliedPromo=null;

        state.discountPercent=0;

      }

      updateCheckout();

    }
  );


  $("checkoutForm").onsubmit=
    event=>{

      event.preventDefault();

      createOrder();

    };


  /* facture */

  $("printInvoice").onclick=
    ()=>window.print();


  /* événements globaux */

  document.addEventListener(
    "click",
    event=>{

      /* fermeture */

      const close=
        event.target.closest(
          "[data-close]"
        );

      if(close){

        closeModal(
          close.dataset.close
        );

      }


      /* connexion */

      const loginButton=
        event.target.closest(
          "[data-open-login]"
        );

      if(loginButton){

        openAuth("login");

      }


      /* ajout depuis détail */

      const detailAdd=
        event.target.closest(
          "[data-detail-add]"
        );

      if(detailAdd){

        addToCart(
          detailAdd.dataset.detailAdd
        );

      }


      /* facture utilisateur */

      const invoice=
        event.target.closest(
          "[data-invoice]"
        );

      if(invoice){

        const order=
          state.orders.find(
            current=>
              current.id===
              invoice.dataset.invoice
          );

        if(order){
          showInvoice(order);
        }

      }


      /* facture admin */

      const adminInvoice=
        event.target.closest(
          "[data-admin-invoice]"
        );

      if(adminInvoice){

        const order=
          state.orders.find(
            current=>
              current.id===
              adminInvoice.dataset.adminInvoice
          );

        if(order){
          showInvoice(order);
        }

      }


      /* statut */

      const status=
        event.target.closest(
          "[data-status]"
        );

      if(status){

        advanceStatus(
          status.dataset.status
        );

      }


      /* reset */

      if(
        event.target.id===
        "resetDemo"
      ){

        resetDemo();

      }


      /* étoiles */

      const rating=
        event.target.closest(
          "[data-rating]"
        );

      if(rating){

        const value=
          Number(
            rating.dataset.rating
          );


        document
          .querySelectorAll(
            "#ratingSelector [data-rating]"
          )
          .forEach(button=>{

            button.classList.remove(
              "selected"
            );

            button.classList.toggle(
              "hovered",
              Number(
                button.dataset.rating
              )<=value
            );

          });


        rating.classList.add(
          "selected"
        );

      }


      /* publication avis */

      const submit=
        event.target.closest(
          "[data-review-product]"
        );

      if(submit){

        submitReview(
          submit.dataset.reviewProduct
        );

      }

    }
  );


  /* fermeture avec ESC */

  document.addEventListener(
    "keydown",
    event=>{

      if(event.key!=="Escape"){
        return;
      }

      document
        .querySelectorAll(".modal.show")
        .forEach(modal=>{
          closeModal(modal.id);
        });

      $("cartDrawer")
        .classList.remove("show");

      $("overlay")
        .classList.remove("show");

    }
  );

}


/* =========================
   INIT
========================= */

function init(){

  state.orders=
    getJSON(
      LS.orders,
      []
    );


  const sessionId=
    localStorage.getItem(
      LS.session
    );


  if(sessionId){

    const users=
      getUsers();

    state.currentUser=
      users.find(
        user=>user.id===sessionId
      ) || null;

  }


  loadUserData();

  renderCategories();

  renderProducts();

  renderCart();

  renderAuth();

  setupEvents();

}


init();
