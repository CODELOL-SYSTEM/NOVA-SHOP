"use strict";

/*
==========================================================
 NOVASHOP MARKETPLACE
 VERSION COMPLÈTE
==========================================================
*/

window.NovaShopLoaded = true;

/* ========================================================
   CONFIGURATION
======================================================== */

const STORAGE_KEYS = {
  cart: "novashop_cart_v3",
  orders: "novashop_orders_v3",
  favorites: "novashop_favorites_v3",
  account: "novashop_account_v3",
  city: "novashop_city_v3"
};

/* ========================================================
   PRODUITS RÉELS FOURNIS
======================================================== */

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
    id:"arctic-360",
    code:"NS-AIO-LF3-360",
    brand:"ARCTIC",
    name:"Liquid Freezer III 360",
    category:"Refroidissement",
    price:119.99,
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
  },

  {
    id:"odyssey-g6",
    code:"NS-MON-OLED-G6",
    brand:"Samsung",
    name:"Odyssey OLED G6",
    category:"Écrans",
    price:699.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },

  {
    id:"logitech-tkl",
    code:"NS-KB-PROX-TKL",
    brand:"Logitech G",
    name:"PRO X TKL Wireless",
    category:"Claviers",
    price:179.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
  },

  {
    id:"superlight-2",
    code:"NS-MOUSE-SUPERLIGHT2",
    brand:"Logitech G",
    name:"PRO X SUPERLIGHT 2",
    category:"Souris",
    price:149.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
  },

  {
    id:"wave-3",
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

/* ========================================================
   CATÉGORIES
======================================================== */

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

/* ========================================================
   ÉTAT
======================================================== */

let state = {
  category:"Tous",
  search:"",
  sort:"relevance",
  cart:load(STORAGE_KEYS.cart,{}),
  orders:load(STORAGE_KEYS.orders,[]),
  favorites:load(STORAGE_KEYS.favorites,[]),
  account:load(
    STORAGE_KEYS.account,
    {
      name:"",
      email:""
    }
  ),
  city:load(STORAGE_KEYS.city,"")
};

/* ========================================================
   DOM
======================================================== */

const marketplacePage =
  document.getElementById("marketplacePage");

const dashboardPage =
  document.getElementById("dashboardPage");

const accountPage =
  document.getElementById("accountPage");

const categoryBar =
  document.getElementById("categoryBar");

const productGrid =
  document.getElementById("productGrid");

const productCount =
  document.getElementById("productCount");

const searchForm =
  document.getElementById("searchForm");

const searchInput =
  document.getElementById("searchInput");

const sortSelect =
  document.getElementById("sortSelect");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartItems =
  document.getElementById("cartItems");

const cartBadge =
  document.getElementById("cartBadge");

const cartTotal =
  document.getElementById("cartTotal");

const overlay =
  document.getElementById("overlay");

const accountModal =
  document.getElementById("accountModal");

const checkoutModal =
  document.getElementById("checkoutModal");

const checkoutForm =
  document.getElementById("checkoutForm");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const toast =
  document.getElementById("toast");

/* ========================================================
   STORAGE
======================================================== */

function load(key,fallback){

  try{

    const raw =
      localStorage.getItem(key);

    if(raw === null){
      return fallback;
    }

    return JSON.parse(raw);

  }catch(error){

    console.warn(
      "NovaShop : impossible de lire",
      key
    );

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

    console.warn(
      "NovaShop : impossible d'enregistrer",
      key
    );
  }
}

/* ========================================================
   UTILITAIRES
======================================================== */

function money(value){

  return Number(value).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );
}

function normalize(value){

  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .trim();
}

function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getProduct(id){

  return PRODUCTS.find(
    product => product.id === id
  );
}

function getCartCount(){

  return Object.values(state.cart)
    .reduce(
      (total,quantity)=>
        total + Number(quantity || 0),
      0
    );
}

function getCartTotal(){

  return Object.entries(state.cart)
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

function showToast(message){

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timeout
  );

  showToast.timeout =
    setTimeout(
      ()=>{
        toast.classList.remove("show");
      },
      2400
    );
}

/* ========================================================
   PAGES
======================================================== */

function hideAllPages(){

  marketplacePage.classList.remove("active");
  dashboardPage.classList.remove("active");
  accountPage.classList.remove("active");
}

function showMarketplace(){

  hideAllPages();

  marketplacePage.classList.add("active");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function showDashboard(){

  hideAllPages();

  dashboardPage.classList.add("active");

  renderDashboard();

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function showAccount(){

  hideAllPages();

  accountPage.classList.add("active");

  document.getElementById(
    "accountName"
  ).value =
    state.account.name || "";

  document.getElementById(
    "accountEmail"
  ).value =
    state.account.email || "";

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

/* ========================================================
   CATÉGORIES
======================================================== */

function renderCategories(){

  categoryBar.innerHTML =
    CATEGORIES
      .map(category=>{

        const active =
          state.category === category
            ? "active"
            : "";

        return `
          <button
            class="categoryButton ${active}"
            data-category="${escapeHTML(category)}"
          >
            ${escapeHTML(category)}
          </button>
        `;

      })
      .join("");

  categoryBar
    .querySelectorAll("[data-category]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          state.category =
            button.dataset.category;

          state.search =
            "";

          searchInput.value =
            "";

          renderCategories();
          renderProducts();

        }
      );

    });
}

/* ========================================================
   PRODUITS
======================================================== */

function getFilteredProducts(){

  let list =
    PRODUCTS.slice();

  if(
    state.category !== "Tous"
  ){

    list =
      list.filter(
        product =>
          product.category ===
          state.category
      );
  }

  const query =
    normalize(state.search);

  if(query){

    list =
      list.filter(product=>{

        const haystack =
          normalize(
            [
              product.brand,
              product.name,
              product.category,
              product.code
            ].join(" ")
          );

        return haystack.includes(
          query
        );

      });
  }

  switch(state.sort){

    case "priceAsc":

      list.sort(
        (a,b)=>
          a.price - b.price
      );

      break;

    case "priceDesc":

      list.sort(
        (a,b)=>
          b.price - a.price
      );

      break;

    case "name":

      list.sort(
        (a,b)=>
          `${a.brand} ${a.name}`
            .localeCompare(
              `${b.brand} ${b.name}`,
              "fr"
            )
      );

      break;

    default:
      break;
  }

  return list;
}

function renderProducts(){

  const list =
    getFilteredProducts();

  productCount.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if(!list.length){

    productGrid.innerHTML = `

      <div class="emptyState">

        <div class="emptyIcon">
          🔎
        </div>

        <h3>
          Aucun produit trouvé
        </h3>

        <p>
          Aucun produit ne correspond à cette recherche.
        </p>

        <button
          class="secondary"
          id="resetFilters"
        >
          Réinitialiser
        </button>

      </div>

    `;

    document
      .getElementById("resetFilters")
      .addEventListener(
        "click",
        ()=>{
          state.category =
            "Tous";

          state.search =
            "";

          searchInput.value =
            "";

          renderCategories();
          renderProducts();
        }
      );

    return;
  }

  productGrid.innerHTML =
    list
      .map(product=>{

        const favorite =
          state.favorites.includes(
            product.id
          );

        return `

          <article
            class="productCard"
          >

            <div class="productVisual">

              <img
                src="${product.image}"
                alt="${escapeHTML(
                  product.brand +
                  " " +
                  product.name
                )}"
                loading="lazy"
              >

              <button
                class="favoriteButton ${favorite ? "active" : ""}"
                data-favorite="${product.id}"
                aria-label="Favori"
              >
                ${favorite ? "♥" : "♡"}
              </button>

            </div>

            <div class="productBody">

              <div class="productBrand">
                ${escapeHTML(product.brand)}
              </div>

              <h3 class="productName">
                ${escapeHTML(product.name)}
              </h3>

              <div class="productMeta">

                <span>
                  ${escapeHTML(product.category)}
                </span>

                <span class="productRating">
                  ★★★★★
                </span>

              </div>

              <div class="productCode">
                ${escapeHTML(product.code)}
              </div>

              <div class="productPrice">
                ${money(product.price)}
              </div>

              <div class="stock">
                ● Disponible
              </div>

              <button
                class="addButton"
                data-add="${product.id}"
              >
                Ajouter au panier
              </button>

            </div>

          </article>

        `;

      })
      .join("");

  productGrid
    .querySelectorAll("[data-add]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          addToCart(
            button.dataset.add
          );

        }
      );

    });

  productGrid
    .querySelectorAll("[data-favorite]")
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{

          toggleFavorite(
            button.dataset.favorite
          );

        }
      );

    });
}

/* ========================================================
   FAVORIS
======================================================== */

function toggleFavorite(id){

  if(
    state.favorites.includes(id)
  ){

    state.favorites =
      state.favorites.filter(
        favoriteId =>
          favoriteId !== id
      );

    showToast(
      "Retiré des favoris"
    );

  }else{

    state.favorites.push(id);

    showToast(
      "Ajouté aux favoris ❤️"
    );
  }

  save(
    STORAGE_KEYS.favorites,
    state.favorites
  );

  renderProducts();
}

/* ========================================================
   PANIER
======================================================== */

function addToCart(id){

  if(!getProduct(id)){
    return;
  }

  state.cart[id] =
    Number(state.cart[id] || 0) + 1;

  save(
    STORAGE_KEYS.cart,
    state.cart
  );

  updateCart();

  showToast(
    "Produit ajouté au panier 🛒"
  );
}

function changeQuantity(id,delta){

  if(!state.cart[id]){
    return;
  }

  state.cart[id] =
    Number(state.cart[id]) +
    Number(delta);

  if(
    state.cart[id] <= 0
  ){

    delete state.cart[id];
  }

  save(
    STORAGE_KEYS.cart,
    state.cart
  );

  updateCart();
}

function removeFromCart(id){

  delete state.cart[id];

  save(
    STORAGE_KEYS.cart,
    state.cart
  );

  updateCart();

  showToast(
    "Produit retiré du panier"
  );
}

function updateCart(){

  cartBadge.textContent =
    getCartCount();

  cartTotal.textContent =
    money(getCartTotal());

  checkoutTotal.textContent =
    money(getCartTotal());

  const entries =
    Object.entries(state.cart)
      .filter(
        ([id,quantity])=>
          getProduct(id) &&
          Number(quantity) > 0
      );

  if(!entries.length){

    cartItems.innerHTML = `

      <div class="emptyState"
           style="padding:45px 12px">

        <div class="emptyIcon">
          🛒
        </div>

        <h3>
          Votre panier est vide
        </h3>

        <p>
          Ajoutez des produits pour commencer.
        </p>

      </div>

    `;

    return;
  }

  cartItems.innerHTML =
    entries
      .map(
        ([id,quantity])=>{

          const product =
            getProduct(id);

          return `

            <div class="cartItem">

              <img
                class="cartItemImage"
                src="${product.image}"
                alt="${escapeHTML(product.name)}"
              >

              <div class="cartItemContent">

                <h3 class="cartItemName">
                  ${escapeHTML(product.brand)}
                  ${escapeHTML(product.name)}
                </h3>

                <div class="cartItemPrice">
                  ${money(product.price)}
                </div>

                <div class="quantityRow">

                  <button
                    class="quantityButton"
                    data-minus="${product.id}"
                  >
                    −
                  </button>

                  <span class="quantityNumber">
                    ${quantity}
                  </span>

                  <button
                    class="quantityButton"
                    data-plus="${product.id}"
                  >
                    +
                  </button>

                  <button
                    class="removeButton"
                    data-remove="${product.id}"
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            </div>

          `;

        }
      )
      .join("");

  cartItems
    .querySelectorAll("[data-minus]")
    .forEach(button=>{

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
    .forEach(button=>{

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
    .forEach(button=>{

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

/* ========================================================
   OUVRIR / FERMER PANIER
======================================================== */

function openCart(){

  cartDrawer.classList.add("open");
  overlay.classList.add("active");

  updateCart();
}

function closeCart(){

  cartDrawer.classList.remove("open");

  if(
    !accountModal.classList.contains("open") &&
    !checkoutModal.classList.contains("open")
  ){

    overlay.classList.remove("active");
  }
}

/* ========================================================
   MODALS
======================================================== */

function openModal(modal){

  modal.classList.add("open");

  overlay.classList.add("active");
}

function closeModal(modal){

  modal.classList.remove("open");

  if(
    !cartDrawer.classList.contains("open") &&
    !accountModal.classList.contains("open") &&
    !checkoutModal.classList.contains("open")
  ){

    overlay.classList.remove("active");
  }
}

function closeEverything(){

  cartDrawer.classList.remove("open");

  accountModal.classList.remove("open");

  checkoutModal.classList.remove("open");

  overlay.classList.remove("active");
}

/* ========================================================
   RECHERCHE
======================================================== */

searchForm.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const query =
      searchInput.value.trim();

    if(!query){

      state.search =
        "";

      state.category =
        "Tous";

      renderCategories();
      renderProducts();

      return;
    }

    /*
    --------------------------------------------------------
    CODE PRODUIT
    Si le code exact est recherché :
    -> ouverture automatique Dashboard
    --------------------------------------------------------
    */

    const exactCode =
      PRODUCTS.find(
        product =>
          normalize(product.code) ===
          normalize(query)
      );

    if(exactCode){

      showToast(
        "Code produit reconnu → Dashboard 🏢"
      );

      setTimeout(
        ()=>{
          showDashboard();
        },
        250
      );

      return;
    }

    state.category =
      "Tous";

    state.search =
      query;

    renderCategories();
    renderProducts();

    setTimeout(
      ()=>{
        document
          .getElementById(
            "productsSection"
          )
          .scrollIntoView({
            behavior:"smooth"
          });
      },
      20
    );

  }
);

/* ========================================================
   CHECKOUT
======================================================== */

function openCheckout(){

  if(
    getCartCount() <= 0
  ){

    showToast(
      "Le panier est vide."
    );

    return;
  }

  closeCart();

  document.getElementById(
    "checkoutName"
  ).value =
    state.account.name || "";

  document.getElementById(
    "checkoutCity"
  ).value =
    state.city || "";

  document.getElementById(
    "checkoutAddress"
  ).value =
    "";

  document.getElementById(
    "checkoutZip"
  ).value =
    "";

  checkoutTotal.textContent =
    money(getCartTotal());

  openModal(
    checkoutModal
  );
}

checkoutForm.addEventListener(
  "submit",
  event=>{

    event.preventDefault();

    const name =
      document.getElementById(
        "checkoutName"
      ).value.trim();

    const address =
      document.getElementById(
        "checkoutAddress"
      ).value.trim();

    const zip =
      document.getElementById(
        "checkoutZip"
      ).value.trim();

    const city =
      document.getElementById(
        "checkoutCity"
      ).value.trim();

    const country =
      document.getElementById(
        "checkoutCountry"
      ).value;

    /*
    --------------------------------------------------------
    ADRESSE OBLIGATOIRE
    --------------------------------------------------------
    */

    if(
      !name ||
      !address ||
      !zip ||
      !city ||
      !country
    ){

      showToast(
        "⚠️ Tous les champs de livraison sont obligatoires."
      );

      return;
    }

    if(zip.length < 4){

      showToast(
        "⚠️ Vérifie le code postal."
      );

      return;
    }

    createOrder({
      name,
      address,
      zip,
      city,
      country
    });

  }
);

/* ========================================================
   CRÉATION COMMANDE
======================================================== */

function createOrder(delivery){

  const items =
    Object.entries(state.cart)
      .map(
        ([id,quantity])=>{

          const product =
            getProduct(id);

          if(!product){
            return null;
          }

          return {
            id:product.id,
            code:product.code,
            brand:product.brand,
            name:product.name,
            image:product.image,
            price:product.price,
            quantity:Number(quantity)
          };

        }
      )
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
      name:delivery.name,
      address:delivery.address,
      zip:delivery.zip,
      city:delivery.city,
      country:delivery.country
    },

    items,

    total:
      getCartTotal()

  };

  state.orders.unshift(
    order
  );

  state.cart = {};

  state.city =
    delivery.city;

  state.account.name =
    delivery.name;

  save(
    STORAGE_KEYS.orders,
    state.orders
  );

  save(
    STORAGE_KEYS.cart,
    state.cart
  );

  save(
    STORAGE_KEYS.city,
    state.city
  );

  save(
    STORAGE_KEYS.account,
    state.account
  );

  closeEverything();

  updateCart();

  showToast(
    "Commande créée avec succès 📦"
  );

  setTimeout(
    showDashboard,
    400
  );
}

/* ========================================================
   DASHBOARD
======================================================== */

const ORDER_STATUSES = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

function renderDashboard(){

  const orders =
    Array.isArray(state.orders)
      ? state.orders
      : [];

  /*
  STATS
  */

  document.getElementById(
    "statOrders"
  ).textContent =
    orders.length;

  document.getElementById(
    "statPreparing"
  ).textContent =
    orders.filter(
      order =>
        order.status ===
        "Préparation"
    ).length;

  document.getElementById(
    "statShipped"
  ).textContent =
    orders.filter(
      order =>
        [
          "Expédiée",
          "En livraison",
          "Livrée"
        ].includes(
          order.status
        )
    ).length;

  const total =
    orders.reduce(
      (sum,order)=>
        sum +
        Number(order.total || 0),
      0
    );

  document.getElementById(
    "statTotal"
  ).textContent =
    money(total);

  document.getElementById(
    "dashboardCity"
  ).value =
    state.city || "";

  /*
  COMMANDES
  */

  const ordersList =
    document.getElementById(
      "ordersList"
    );

  if(!orders.length){

    ordersList.innerHTML = `

      <div class="emptyState"
           style="padding:50px 15px">

        <div class="emptyIcon">
          📦
        </div>

        <h3>
          Aucune commande
        </h3>

        <p>
          Les commandes apparaîtront ici après validation.
        </p>

      </div>

    `;

    return;
  }

  ordersList.innerHTML =
    orders
      .map(
        order=>{

          const date =
            new Date(order.date);

          const dateText =
            Number.isNaN(
              date.getTime()
            )
              ? "Date inconnue"
              : date.toLocaleString(
                  "fr-FR",
                  {
                    dateStyle:"medium",
                    timeStyle:"short"
                  }
                );

          const itemsHTML =
            order.items
              .map(
                item =>
                  `${item.quantity} × ${escapeHTML(item.brand)} ${escapeHTML(item.name)}`
              )
              .join("<br>");

          const statusIndex =
            ORDER_STATUSES.indexOf(
              order.status
            );

          const canAdvance =
            statusIndex >= 0 &&
            statusIndex <
              ORDER_STATUSES.length - 1;

          return `

            <article class="orderCard">

              <div class="orderHeader">

                <div>

                  <div class="orderId">
                    ${escapeHTML(order.id)}
                  </div>

                  <div class="orderDate">
                    ${escapeHTML(dateText)}
                  </div>

                </div>

                <div class="orderTotal">
                  ${money(order.total)}
                </div>

              </div>

              <div class="statusBadge">
                ${escapeHTML(order.status)}
              </div>

              <div class="orderInfo">

                <strong>Produits</strong><br>

                ${itemsHTML}

                <br><br>

                <strong>Adresse de livraison</strong><br>

                ${escapeHTML(order.customer.name)}
                <br>

                ${escapeHTML(order.customer.address)}
                <br>

                ${escapeHTML(order.customer.zip)}
                ${escapeHTML(order.customer.city)}
                <br>

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
                      <button
                        class="smallButton"
                        data-advance="${escapeHTML(order.id)}"
                      >
                        Faire avancer le statut →
                      </button>
                    `
                    :
                    `
                      <button
                        class="smallButton"
                        disabled
                      >
                        ✓ Commande terminée
                      </button>
                    `
                }

                <button
                  class="smallButton danger"
                  data-delete-order="${escapeHTML(order.id)}"
                >
                  Supprimer
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");

  ordersList
    .querySelectorAll(
      "[data-advance]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{
          advanceOrder(
            button.dataset.advance
          );
        }
      );

    });

  ordersList
    .querySelectorAll(
      "[data-delete-order]"
    )
    .forEach(button=>{

      button.addEventListener(
        "click",
        ()=>{
          deleteOrder(
            button.dataset.deleteOrder
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
    ORDER_STATUSES.indexOf(
      order.status
    );

  if(
    index < 0 ||
    index >=
      ORDER_STATUSES.length - 1
  ){

    return;
  }

  order.status =
    ORDER_STATUSES[index + 1];

  save(
    STORAGE_KEYS.orders,
    state.orders
  );

  renderDashboard();

  showToast(
    "Statut : " + order.status
  );
}

function deleteOrder(id){

  const confirmed =
    confirm(
      "Supprimer cette commande du Dashboard ?"
    );

  if(!confirmed){
    return;
  }

  state.orders =
    state.orders.filter(
      order =>
        order.id !== id
    );

  save(
    STORAGE_KEYS.orders,
    state.orders
  );

  renderDashboard();

  showToast(
    "Commande supprimée."
  );
}

/* ========================================================
   VILLE DASHBOARD
======================================================== */

document
  .getElementById("saveCity")
  .addEventListener(
    "click",
    ()=>{

      const city =
        document
          .getElementById(
            "dashboardCity"
          )
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
        STORAGE_KEYS.city,
        state.city
      );

      showToast(
        "Ville enregistrée 🏙️"
      );

    }
  );

/* ========================================================
   COMPTE
======================================================== */

document
  .getElementById("saveAccount")
  .addEventListener(
    "click",
    ()=>{

      state.account.name =
        document
          .getElementById(
            "accountName"
          )
          .value
          .trim();

      state.account.email =
        document
          .getElementById(
            "accountEmail"
          )
          .value
          .trim();

      save(
        STORAGE_KEYS.account,
        state.account
      );

      showToast(
        "Compte enregistré."
      );

    }
  );

/* ========================================================
   SUPPRESSION DONNÉES
======================================================== */

document
  .getElementById(
    "deleteAllData"
  )
  .addEventListener(
    "click",
    ()=>{

      const confirmed =
        confirm(
          "Supprimer toutes les commandes, favoris, panier et informations du compte NovaShop ?"
        );

      if(!confirmed){
        return;
      }

      Object.values(
        STORAGE_KEYS
      ).forEach(
        key =>
          localStorage.removeItem(
            key
          )
      );

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

      renderProducts();

      showToast(
        "Toutes les données NovaShop ont été supprimées."
      );

    }
  );

/* ========================================================
   NAVIGATION
======================================================== */

document
  .getElementById("logo")
  .addEventListener(
    "click",
    event=>{

      event.preventDefault();

      showMarketplace();

    }
  );

document
  .getElementById(
    "discoverButton"
  )
  .addEventListener(
    "click",
    ()=>{

      document
        .getElementById(
          "productsSection"
        )
        .scrollIntoView({
          behavior:"smooth"
        });

    }
  );

document
  .getElementById(
    "heroDashboard"
  )
  .addEventListener(
    "click",
    showDashboard
  );

document
  .getElementById(
    "dashboardButton"
  )
  .addEventListener(
    "click",
    showDashboard
  );

document
  .getElementById(
    "backFromDashboard"
  )
  .addEventListener(
    "click",
    showMarketplace
  );

document
  .getElementById(
    "backFromAccount"
  )
  .addEventListener(
    "click",
    showMarketplace
  );

document
  .getElementById(
    "accountButton"
  )
  .addEventListener(
    "click",
    ()=>{
      openModal(
        accountModal
      );
    }
  );

document
  .getElementById(
    "cartButton"
  )
  .addEventListener(
    "click",
    openCart
  );

document
  .getElementById(
    "dashboardCartButton"
  )
  .addEventListener(
    "click",
    openCart
  );

document
  .getElementById(
    "closeCart"
  )
  .addEventListener(
    "click",
    closeCart
  );

document
  .getElementById(
    "checkoutButton"
  )
  .addEventListener(
    "click",
    openCheckout
  );

document
  .getElementById(
    "modalAccount"
  )
  .addEventListener(
    "click",
    ()=>{

      closeModal(
        accountModal
      );

      showAccount();

    }
  );

document
  .getElementById(
    "modalDashboard"
  )
  .addEventListener(
    "click",
    ()=>{

      closeModal(
        accountModal
      );

      showDashboard();

    }
  );

document
  .getElementById(
    "modalOrders"
  )
  .addEventListener(
    "click",
    ()=>{

      closeModal(
        accountModal
      );

      showDashboard();

    }
  );

document
  .getElementById(
    "accountOrders"
  )
  .addEventListener(
    "click",
    showDashboard
  );

/* ========================================================
   TRI
======================================================== */

sortSelect.addEventListener(
  "change",
  ()=>{

    state.sort =
      sortSelect.value;

    renderProducts();

  }
);

/* ========================================================
   FERMETURE MODALES
======================================================== */

document
  .querySelectorAll(
    "[data-close]"
  )
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{

        const modal =
          document.getElementById(
            button.dataset.close
          );

        if(modal){
          closeModal(modal);
        }

      }
    );

  });

overlay.addEventListener(
  "click",
  closeEverything
);

document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){

      closeEverything();

    }

  }
);

/* ========================================================
   INITIALISATION
======================================================== */

function initNovaShop(){

  renderCategories();

  renderProducts();

  updateCart();

  renderDashboard();

  console.log(
    "NovaShop chargé :",
    PRODUCTS.length,
    "produits"
  );

}

initNovaShop();
