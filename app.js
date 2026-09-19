"use strict";

/*
=========================================================
 NOVASHOP APP
=========================================================
*/

window.NovaShopLoaded = true;

const STORAGE = {
  cart: "novashop_cart_v2",
  orders: "novashop_orders_v2",
  favorites: "novashop_favorites_v2",
  account: "novashop_account_v2",
  city: "novashop_city_v2"
};

const PRODUCTS = [

  {
    id:"cpu-9600x",
    code:"NS-CPU-9600X",
    brand:"AMD",
    name:"Ryzen 5 9600X",
    category:"Processeurs",
    price:239.99,
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg"
  },

  {
    id:"ram-corsair-32",
    code:"NS-RAM-COR-32",
    brand:"Corsair",
    name:"Vengeance RGB 32 Go DDR5 6000 CL38",
    category:"RAM",
    price:119.99,
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
  },

  {
    id:"ram-kingston-32",
    code:"NS-RAM-KF-32",
    brand:"Kingston",
    name:"FURY Beast RGB 32 Go DDR5 5600 CL36",
    category:"RAM",
    price:109.99,
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg"
  },

  {
    id:"ssd-1tb",
    code:"NS-SSD-990P-1T",
    brand:"Samsung",
    name:"990 PRO 1 To NVMe",
    category:"SSD",
    price:99.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$"
  },

  {
    id:"ssd-2tb",
    code:"NS-SSD-990P-2T",
    brand:"Samsung",
    name:"990 PRO 2 To NVMe",
    category:"SSD",
    price:169.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$"
  },

  {
    id:"psu-rm850x",
    code:"NS-PSU-RM850X",
    brand:"Corsair",
    name:"RM850x 850 W",
    category:"Alimentations",
    price:149.99,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp"
  },

  {
    id:"case-5000d",
    code:"NS-CASE-5000D",
    brand:"Corsair",
    name:"5000D Airflow",
    category:"Boîtiers",
    price:149.99,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp"
  },

  {
    id:"aio-360",
    code:"NS-AIO-LF3-360",
    brand:"ARCTIC",
    name:"Liquid Freezer III 360",
    category:"Refroidissement",
    price:119.99,
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
  },

  {
    id:"monitor-g6",
    code:"NS-MON-OLED-G6",
    brand:"Samsung",
    name:"Odyssey OLED G6",
    category:"Écrans",
    price:699.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },

  {
    id:"keyboard-tkl",
    code:"NS-KB-PROX-TKL",
    brand:"Logitech G",
    name:"PRO X TKL Wireless",
    category:"Claviers",
    price:179.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
  },

  {
    id:"mouse-superlight",
    code:"NS-MOUSE-SUPERLIGHT2",
    brand:"Logitech G",
    name:"PRO X SUPERLIGHT 2",
    category:"Souris",
    price:149.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
  },

  {
    id:"mic-wave3",
    code:"NS-MIC-WAVE3",
    brand:"Elgato",
    name:"Wave:3",
    category:"Micros",
    price:139.99,
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png"
  },

  {
    id:"dualsense",
    code:"NS-PAD-DS5",
    brand:"Sony",
    name:"DualSense PS5",
    category:"Manettes",
    price:69.99,
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
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

let state = {
  category:"Tous",
  search:"",
  sort:"relevance",
  cart:load(STORAGE.cart,{}),
  orders:load(STORAGE.orders,[]),
  favorites:load(STORAGE.favorites,[]),
  account:load(STORAGE.account,{
    name:"",
    email:""
  }),
  city:load(STORAGE.city,"")
};

/* =========================================================
 DOM
========================================================= */

const $ = id => document.getElementById(id);

const marketplace = $("marketplace");
const dashboard = $("dashboard");
const account = $("account");

const categories = $("categories");
const products = $("products");
const resultCount = $("resultCount");

const searchForm = $("searchForm");
const searchInput = $("searchInput");
const sortSelect = $("sortSelect");

const cartDrawer = $("cartDrawer");
const cartItems = $("cartItems");
const cartCount = $("cartCount");
const cartTotal = $("cartTotal");

const overlay = $("overlay");

const checkoutModal = $("checkoutModal");
const checkoutForm = $("checkoutForm");
const checkoutTotal = $("checkoutTotal");

const accountModal = $("accountModal");

const toast = $("toast");

/* =========================================================
 STORAGE
========================================================= */

function load(key,fallback){

  try{

    const value = localStorage.getItem(key);

    if(value === null){
      return fallback;
    }

    return JSON.parse(value);

  }catch(error){

    return fallback;
  }
}

function save(key,value){

  try{

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }catch(error){

    console.error("NovaShop storage error:",error);
  }
}

/* =========================================================
 UTIL
========================================================= */

function money(value){

  return Number(value).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );
}

function escapeHTML(value){

  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function normalize(value){

  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .trim();
}

function getProduct(id){

  return PRODUCTS.find(
    product => product.id === id
  );
}

function showToast(message){

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(()=>{
    toast.classList.remove("show");
  },2500);
}

/* =========================================================
 CATÉGORIES
========================================================= */

function renderCategories(){

  categories.innerHTML = CATEGORIES.map(category => {

    const active =
      state.category === category
      ? "active"
      : "";

    return `
      <button
        class="${active}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>
    `;

  }).join("");

  categories
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        state.category =
          button.dataset.category;

        state.search = "";

        searchInput.value = "";

        renderCategories();
        renderProducts();

      });

    });
}

/* =========================================================
 PRODUITS
========================================================= */

function getVisibleProducts(){

  let list = [...PRODUCTS];

  if(state.category !== "Tous"){

    list = list.filter(
      product =>
        product.category === state.category
    );
  }

  const search =
    normalize(state.search);

  if(search){

    list = list.filter(product => {

      const text = normalize(
        [
          product.brand,
          product.name,
          product.category,
          product.code
        ].join(" ")
      );

      return text.includes(search);

    });
  }

  if(state.sort === "priceAsc"){

    list.sort(
      (a,b) => a.price - b.price
    );
  }

  if(state.sort === "priceDesc"){

    list.sort(
      (a,b) => b.price - a.price
    );
  }

  if(state.sort === "name"){

    list.sort((a,b)=>
      `${a.brand} ${a.name}`.localeCompare(
        `${b.brand} ${b.name}`,
        "fr"
      )
    );
  }

  return list;
}

function renderProducts(){

  const list =
    getVisibleProducts();

  resultCount.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if(!list.length){

    products.innerHTML = `
      <div class="empty">
        <div style="font-size:40px">🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>
          Aucun produit ne correspond à ta recherche.
        </p>

        <button
          class="secondary"
          id="resetSearch"
        >
          Réinitialiser
        </button>
      </div>
    `;

    $("resetSearch").addEventListener(
      "click",
      ()=>{
        state.category = "Tous";
        state.search = "";
        searchInput.value = "";
        renderCategories();
        renderProducts();
      }
    );

    return;
  }

  products.innerHTML =
    list.map(product => {

      const favorite =
        state.favorites.includes(
          product.id
        );

      return `

        <article class="product">

          <div class="productImage">

            <img
              src="${product.image}"
              alt="${escapeHTML(product.brand + " " + product.name)}"
              loading="lazy"
              onerror="this.style.opacity='0.2'"
            >

            <button
              class="favorite ${favorite ? "active" : ""}"
              data-favorite="${product.id}"
            >
              ${favorite ? "♥" : "♡"}
            </button>

          </div>

          <div class="productInfo">

            <div class="brand">
              ${escapeHTML(product.brand)}
            </div>

            <h3>
              ${escapeHTML(product.name)}
            </h3>

            <div class="rating">
              ★★★★★
              <span>Produit</span>
            </div>

            <div class="code">
              Code : ${escapeHTML(product.code)}
            </div>

            <div class="price">
              ${money(product.price)}
            </div>

            <div class="stock">
              ● Disponible
            </div>

            <button
              class="add"
              data-add="${product.id}"
            >
              Ajouter au panier
            </button>

          </div>

        </article>

      `;

    }).join("");

  products
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        addToCart(
          button.dataset.add
        );

      });

    });

  products
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener("click",()=>{

        toggleFavorite(
          button.dataset.favorite
        );

      });

    });

}

/* =========================================================
 FAVORIS
========================================================= */

function toggleFavorite(id){

  if(state.favorites.includes(id)){

    state.favorites =
      state.favorites.filter(
        item => item !== id
      );

    showToast("Retiré des favoris");

  }else{

    state.favorites.push(id);

    showToast("Ajouté aux favoris ❤️");
  }

  save(
    STORAGE.favorites,
    state.favorites
  );

  renderProducts();
}

/* =========================================================
 PANIER
========================================================= */

function getCartCount(){

  return Object
    .values(state.cart)
    .reduce(
      (sum,value)=>
        sum + Number(value || 0),
      0
    );
}

function getCartTotal(){

  return Object
    .entries(state.cart)
    .reduce(
      (total,[id,quantity])=>{

        const product =
          getProduct(id);

        if(!product){
          return total;
        }

        return total +
          product.price *
          Number(quantity || 0);

      },
      0
    );
}

function addToCart(id){

  state.cart[id] =
    Number(state.cart[id] || 0) + 1;

  save(
    STORAGE.cart,
    state.cart
  );

  updateCart();

  showToast(
    "Produit ajouté au panier 🛒"
  );
}

function changeQuantity(id,amount){

  if(!state.cart[id]){
    return;
  }

  state.cart[id] += amount;

  if(state.cart[id] <= 0){

    delete state.cart[id];
  }

  save(
    STORAGE.cart,
    state.cart
  );

  updateCart();
}

function removeFromCart(id){

  delete state.cart[id];

  save(
    STORAGE.cart,
    state.cart
  );

  updateCart();
}

function updateCart(){

  const entries =
    Object.entries(state.cart)
      .filter(([id,quantity]) =>
        getProduct(id) &&
        Number(quantity) > 0
      );

  cartCount.textContent =
    getCartCount();

  cartTotal.textContent =
    money(getCartTotal());

  checkoutTotal.textContent =
    money(getCartTotal());

  if(!entries.length){

    cartItems.innerHTML = `
      <div class="empty" style="padding:45px 10px">
        <div style="font-size:40px">🛒</div>
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des produits.</p>
      </div>
    `;

    return;
  }

  cartItems.innerHTML =
    entries.map(([id,quantity])=>{

      const product =
        getProduct(id);

      return `

        <div class="cartRow">

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
          >

          <div class="cartInfo">

            <h4>
              ${escapeHTML(product.brand)}
              ${escapeHTML(product.name)}
            </h4>

            <div class="cartPrice">
              ${money(product.price)}
            </div>

            <div class="quantity">

              <button
                data-minus="${product.id}"
              >
                −
              </button>

              <strong>${quantity}</strong>

              <button
                data-plus="${product.id}"
              >
                +
              </button>

              <button
                class="remove"
                data-remove="${product.id}"
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        ()=>{
          changeQuantity(
            button.dataset.minus,
            -1
          );
        }
      );

    });

  cartItems
    .querySelectorAll("[data-plus]")
    .forEach(button => {

      button.addEventListener(
        "click",
        ()=>{
          changeQuantity(
            button.dataset.plus,
            1
          );
        }
      );

    });

  cartItems
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.addEventListener(
        "click",
        ()=>{
          removeFromCart(
            button.dataset.remove
          );
        }
      );

    });
}

/* =========================================================
 NAVIGATION
========================================================= */

function showMarketplace(){

  marketplace.style.display =
    "block";

  dashboard.classList.remove("show");
  account.classList.remove("show");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function openDashboard(){

  marketplace.style.display =
    "none";

  dashboard.classList.add("show");
  account.classList.remove("show");

  renderDashboard();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function openAccountPage(){

  marketplace.style.display =
    "none";

  dashboard.classList.remove("show");
  account.classList.add("show");

  $("accountName").value =
    state.account.name || "";

  $("accountEmail").value =
    state.account.email || "";

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

/* =========================================================
 RECHERCHE
========================================================= */

searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const value =
      searchInput.value.trim();

    if(!value){

      state.search = "";

      renderProducts();

      return;
    }

    const productCode =
      PRODUCTS.find(
        product =>
          normalize(product.code) ===
          normalize(value)
      );

    if(productCode){

      showToast(
        "Code reconnu → Dashboard 🏢"
      );

      setTimeout(
        openDashboard,
        250
      );

      return;
    }

    state.category =
      "Tous";

    state.search =
      value;

    renderCategories();
    renderProducts();

    $("productsSection")
      .scrollIntoView({
        behavior:"smooth"
      });

  }
);

/* =========================================================
 DRAWER
========================================================= */

function openCart(){

  cartDrawer.classList.add("open");
  overlay.classList.add("show");

  updateCart();
}

function closeCart(){

  cartDrawer.classList.remove("open");

  if(
    !checkoutModal.classList.contains("show") &&
    !accountModal.classList.contains("show")
  ){
    overlay.classList.remove("show");
  }
}

/* =========================================================
 MODALS
========================================================= */

function openModal(modal){

  modal.classList.add("show");
  overlay.classList.add("show");
}

function closeModal(modal){

  modal.classList.remove("show");

  if(
    !cartDrawer.classList.contains("open") &&
    !checkoutModal.classList.contains("show") &&
    !accountModal.classList.contains("show")
  ){
    overlay.classList.remove("show");
  }
}

function closeAll(){

  cartDrawer.classList.remove("open");
  checkoutModal.classList.remove("show");
  accountModal.classList.remove("show");
  overlay.classList.remove("show");
}

/* =========================================================
 CHECKOUT
========================================================= */

function openCheckout(){

  if(getCartCount() <= 0){

    showToast(
      "Le panier est vide."
    );

    return;
  }

  closeCart();

  $("checkoutName").value =
    state.account.name || "";

  $("checkoutCity").value =
    state.city || "";

  $("checkoutAddress").value =
    "";

  $("checkoutZip").value =
    "";

  checkoutTotal.textContent =
    money(getCartTotal());

  openModal(checkoutModal);
}

checkoutForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const data = {

      name:
        $("checkoutName")
          .value
          .trim(),

      address:
        $("checkoutAddress")
          .value
          .trim(),

      zip:
        $("checkoutZip")
          .value
          .trim(),

      city:
        $("checkoutCity")
          .value
          .trim(),

      country:
        $("checkoutCountry")
          .value
    };

    if(
      !data.name ||
      !data.address ||
      !data.zip ||
      !data.city ||
      !data.country
    ){

      showToast(
        "⚠️ Adresse complète obligatoire."
      );

      return;
    }

    if(data.zip.length < 4){

      showToast(
        "⚠️ Vérifie le code postal."
      );

      return;
    }

    createOrder(data);

  }
);

/* =========================================================
 CREATION COMMANDE
========================================================= */

function createOrder(data){

  const items =
    Object.entries(state.cart)
      .map(([id,quantity])=>{

        const product =
          getProduct(id);

        if(!product){
          return null;
        }

        return {

          id:product.id,

          code:product.code,

          name:product.name,

          brand:product.brand,

          image:product.image,

          price:product.price,

          quantity:Number(quantity)

        };

      })
      .filter(Boolean);

  if(!items.length){

    showToast(
      "Le panier est vide."
    );

    return;
  }

  const order = {

    id:
      "NS-" +
      Date.now()
        .toString(36)
        .toUpperCase(),

    date:
      new Date().toISOString(),

    status:
      "Commande reçue",

    warehouse:
      "Entrepôt",

    customer:{

      name:data.name,

      address:data.address,

      zip:data.zip,

      city:data.city,

      country:data.country

    },

    items,

    total:getCartTotal()

  };

  state.orders.unshift(order);

  save(
    STORAGE.orders,
    state.orders
  );

  state.cart = {};

  save(
    STORAGE.cart,
    state.cart
  );

  state.city =
    data.city;

  save(
    STORAGE.city,
    state.city
  );

  state.account.name =
    data.name;

  save(
    STORAGE.account,
    state.account
  );

  closeAll();

  updateCart();

  showToast(
    "Commande enregistrée 📦"
  );

  setTimeout(
    openDashboard,
    400
  );
}

/* =========================================================
 DASHBOARD
========================================================= */

const STATUSES = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

function renderDashboard(){

  const orders =
    state.orders;

  $("statOrders").textContent =
    orders.length;

  $("statPreparing").textContent =
    orders.filter(
      order =>
        order.status === "Préparation"
    ).length;

  $("statShipped").textContent =
    orders.filter(
      order =>
        order.status === "Expédiée" ||
        order.status === "En livraison" ||
        order.status === "Livrée"
    ).length;

  const total =
    orders.reduce(
      (sum,order)=>
        sum + Number(order.total || 0),
      0
    );

  $("statSpent").textContent =
    money(total);

  $("dashboardCity").value =
    state.city || "";

  if(!orders.length){

    $("ordersList").innerHTML = `

      <div class="empty" style="padding:45px 15px">

        <div style="font-size:40px">
          📦
        </div>

        <h3>Aucune commande</h3>

        <p>
          Les commandes apparaîtront ici.
        </p>

      </div>

    `;

    return;
  }

  $("ordersList").innerHTML =
    orders.map(order => {

      const date =
        new Date(order.date);

      const dateText =
        date.toLocaleString(
          "fr-FR",
          {
            dateStyle:"medium",
            timeStyle:"short"
          }
        );

      const itemsText =
        order.items
          .map(
            item =>
              `${item.quantity} × ${item.brand} ${item.name}`
          )
          .join("<br>");

      const index =
        STATUSES.indexOf(
          order.status
        );

      const canAdvance =
        index >= 0 &&
        index < STATUSES.length - 1;

      return `

        <article class="order">

          <div class="orderTop">

            <div>

              <div class="orderId">
                ${escapeHTML(order.id)}
              </div>

              <div class="orderDate">
                ${escapeHTML(dateText)}
              </div>

            </div>

            <strong>
              ${money(order.total)}
            </strong>

          </div>

          <div class="status">
            ${escapeHTML(order.status)}
          </div>

          <div class="orderDetails">

            <strong>Produits</strong><br>

            ${itemsText}

            <br><br>

            <strong>Livraison</strong><br>

            ${escapeHTML(order.customer.name)}<br>

            ${escapeHTML(order.customer.address)}<br>

            ${escapeHTML(order.customer.zip)}
            ${escapeHTML(order.customer.city)}<br>

            ${escapeHTML(order.customer.country)}

            <br><br>

            <strong>Entrepôt :</strong>
            ${escapeHTML(order.warehouse)}

          </div>

          <div class="orderActions">

            ${
              canAdvance
              ?
              `
                <button data-next="${escapeHTML(order.id)}">
                  Faire avancer →
                </button>
              `
              :
              `
                <button disabled>
                  ✓ Terminée
                </button>
              `
            }

            <button data-delete="${escapeHTML(order.id)}">
              Supprimer
            </button>

          </div>

        </article>

      `;

    }).join("");

  $("ordersList")
    .querySelectorAll("[data-next]")
    .forEach(button => {

      button.addEventListener(
        "click",
        ()=>{
          advanceOrder(
            button.dataset.next
          );
        }
      );

    });

  $("ordersList")
    .querySelectorAll("[data-delete]")
    .forEach(button => {

      button.addEventListener(
        "click",
        ()=>{
          deleteOrder(
            button.dataset.delete
          );
        }
      );

    });
}

function advanceOrder(id){

  const order =
    state.orders.find(
      item => item.id === id
    );

  if(!order){
    return;
  }

  const index =
    STATUSES.indexOf(
      order.status
    );

  if(
    index >= 0 &&
    index < STATUSES.length - 1
  ){

    order.status =
      STATUSES[index + 1];

    save(
      STORAGE.orders,
      state.orders
    );

    renderDashboard();

    showToast(
      "Statut : " + order.status
    );
  }
}

function deleteOrder(id){

  state.orders =
    state.orders.filter(
      order => order.id !== id
    );

  save(
    STORAGE.orders,
    state.orders
  );

  renderDashboard();

  showToast(
    "Commande supprimée."
  );
}

/* =========================================================
 VILLE
========================================================= */

$("saveCity").addEventListener(
  "click",
  ()=>{

    const city =
      $("dashboardCity")
        .value
        .trim();

    if(!city){

      showToast(
        "Indique une ville."
      );

      return;
    }

    state.city =
      city;

    save(
      STORAGE.city,
      state.city
    );

    showToast(
      "Ville enregistrée 🏙️"
    );

  }
);

/* =========================================================
 COMPTE
========================================================= */

$("saveAccount").addEventListener(
  "click",
  ()=>{

    state.account.name =
      $("accountName")
        .value
        .trim();

    state.account.email =
      $("accountEmail")
        .value
        .trim();

    save(
      STORAGE.account,
      state.account
    );

    showToast(
      "Compte enregistré."
    );

  }
);

$("accountOrders").addEventListener(
  "click",
  openDashboard
);

$("modalDashboard").addEventListener(
  "click",
  ()=>{
    closeModal(accountModal);
    openDashboard();
  }
);

$("modalOrders").addEventListener(
  "click",
  ()=>{
    closeModal(accountModal);
    openDashboard();
  }
);

/* =========================================================
 SUPPRESSION
========================================================= */

$("deleteData").addEventListener(
  "click",
  ()=>{

    const confirmed =
      confirm(
        "Supprimer toutes les données NovaShop ?"
      );

    if(!confirmed){
      return;
    }

    Object.values(STORAGE)
      .forEach(key=>{
        localStorage.removeItem(key);
      });

    state = {

      category:"Tous",

      search:"",

      sort:"relevance",

      cart:{},

      orders:[],

      favorites:[],

      account:{
        name:"",
        email:""
      },

      city:""

    };

    updateCart();
    renderDashboard();

    showToast(
      "Données supprimées."
    );

  }
);

/* =========================================================
 ÉVÉNEMENTS
========================================================= */

sortSelect.addEventListener(
  "change",
  ()=>{
    state.sort =
      sortSelect.value;

    renderProducts();
  }
);

$("cartBtn").addEventListener(
  "click",
  openCart
);

$("dashboardCart").addEventListener(
  "click",
  openCart
);

$("closeCart").addEventListener(
  "click",
  closeCart
);

$("checkoutBtn").addEventListener(
  "click",
  openCheckout
);

$("dashboardBtn").addEventListener(
  "click",
  openDashboard
);

$("accountBtn").addEventListener(
  "click",
  ()=>{
    openModal(accountModal);
  }
);

$("logoBtn").addEventListener(
  "click",
  event => {

    event.preventDefault();

    state.category =
      "Tous";

    state.search =
      "";

    searchInput.value =
      "";

    renderCategories();
    renderProducts();
    showMarketplace();

  }
);

$("discoverBtn").addEventListener(
  "click",
  ()=>{
    $("productsSection")
      .scrollIntoView({
        behavior:"smooth"
      });
  }
);

$("backMarketplace").addEventListener(
  "click",
  showMarketplace
);

$("backAccount").addEventListener(
  "click",
  showMarketplace
);

overlay.addEventListener(
  "click",
  closeAll
);

document
  .querySelectorAll("[data-close-modal]")
  .forEach(button => {

    button.addEventListener(
      "click",
      ()=>{
        closeModal(
          $(button.dataset.closeModal)
        );
      }
    );

  });

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){
      closeAll();
    }

  }
);

/* =========================================================
 INIT
========================================================= */

function init(){

  renderCategories();

  renderProducts();

  updateCart();

  renderDashboard();

}

init();
