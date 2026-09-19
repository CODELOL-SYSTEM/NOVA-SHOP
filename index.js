"use strict";

/* =========================================================
   NOVASHOP
   index.js
   Version autonome
   ========================================================= */

const PRODUCTS = [
  {
    id: "amd-9600x",
    name: "AMD Ryzen 5 9600X",
    brand: "AMD",
    category: "Processeurs",
    price: 279.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description: "Processeur gaming AMD Ryzen 5 9600X."
  },
  {
    id: "corsair-vengeance",
    name: "Corsair Vengeance RGB 32 Go",
    brand: "Corsair",
    category: "RAM",
    price: 109.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description: "Kit DDR5 32 Go 6000 MHz CL38."
  },
  {
    id: "kingston-fury",
    name: "Kingston FURY Beast RGB 32 Go",
    brand: "Kingston",
    category: "RAM",
    price: 104.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description: "Kit DDR5 32 Go 5600 MHz CL36."
  },
  {
    id: "samsung-990-1tb",
    name: "Samsung 990 PRO 1 To",
    brand: "Samsung",
    category: "SSD",
    price: 99.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO 1 To."
  },
  {
    id: "samsung-990-2tb",
    name: "Samsung 990 PRO 2 To",
    brand: "Samsung",
    category: "SSD",
    price: 179.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO 2 To."
  },
  {
    id: "corsair-rm850x",
    name: "Corsair RM850x",
    brand: "Corsair",
    category: "Alimentations",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description: "Alimentation Corsair 850 W."
  },
  {
    id: "corsair-5000d",
    name: "Corsair 5000D Airflow",
    brand: "Corsair",
    category: "Boîtiers",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description: "Boîtier ATX Corsair 5000D Airflow."
  },
  {
    id: "arctic-360",
    name: "ARCTIC Liquid Freezer III 360",
    brand: "ARCTIC",
    category: "Refroidissement",
    price: 119.99,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description: "Watercooling AIO 360 mm."
  },
  {
    id: "samsung-g6",
    name: "Samsung Odyssey OLED G6",
    brand: "Samsung",
    category: "Écrans",
    price: 699.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description: "Écran gaming OLED Samsung Odyssey G6."
  },
  {
    id: "logitech-tkl",
    name: "Logitech G PRO X TKL",
    brand: "Logitech",
    category: "Claviers",
    price: 189.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description: "Clavier gaming Logitech G PRO X TKL."
  },
  {
    id: "logitech-superlight",
    name: "Logitech G PRO X SUPERLIGHT 2",
    brand: "Logitech",
    category: "Souris",
    price: 159.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description: "Souris gaming sans fil Logitech."
  },
  {
    id: "elgato-wave3",
    name: "Elgato Wave:3",
    brand: "Elgato",
    category: "Microphones",
    price: 159.99,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description: "Microphone USB Elgato Wave:3."
  },
  {
    id: "dualsense",
    name: "Sony DualSense",
    brand: "Sony",
    category: "Manettes",
    price: 74.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description: "Manette sans fil Sony DualSense."
  }
];

/* =========================================================
   STOCKAGE
   ========================================================= */

const KEY_CART = "novashop_cart";
const KEY_FAV = "novashop_favorites";
const KEY_CITY = "novashop_city";
const KEY_ORDERS = "novashop_orders";

function getArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

let cart = getArray(KEY_CART);
let favorites = getArray(KEY_FAV);
let orders = getArray(KEY_ORDERS);
let city = localStorage.getItem(KEY_CITY) || "";

let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "featured";
let currentPage = 1;

const PER_PAGE = 8;

/* =========================================================
   DOM
   ========================================================= */

const $ = id => document.getElementById(id);

const productsEl = $("products");
const categoriesEl = $("categories");
const paginationEl = $("pagination");
const resultsEl = $("resultsText");

const searchEl = $("searchInput");
const sortEl = $("sortSelect");

const cartButton = $("cartButton");
const cartCounter = $("cartCounter");
const cartDrawer = $("cartDrawer");
const cartContent = $("cartContent");
const cartTotal = $("cartTotal");
const checkoutButton = $("checkoutButton");

const favoritesButton = $("favoritesButton");
const favoritesCounter = $("favoritesCounter");
const favoritesDrawer = $("favoritesDrawer");
const favoritesContent = $("favoritesContent");

const accountButton = $("accountButton");
const accountModal = $("accountModal");
const cityInput = $("cityInput");
const saveCityButton = $("saveCityButton");
const ordersContent = $("ordersContent");
const deleteDataButton = $("deleteDataButton");

const productModal = $("productModal");
const productContent = $("productContent");

const overlay = $("overlay");
const toast = $("toast");

const shopButton = $("shopButton");
const heroFavoritesButton = $("heroFavoritesButton");
const homeButton = $("homeButton");

/* =========================================================
   UTILITAIRES
   ========================================================= */

function saveAll() {
  localStorage.setItem(KEY_CART, JSON.stringify(cart));
  localStorage.setItem(KEY_FAV, JSON.stringify(favorites));
  localStorage.setItem(KEY_ORDERS, JSON.stringify(orders));
  localStorage.setItem(KEY_CITY, city);
}

function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

/* =========================================================
   COMPTEURS
   ========================================================= */

function updateCounters() {
  const quantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCounter.textContent = quantity;
  favoritesCounter.textContent = favorites.length;
}

/* =========================================================
   CATÉGORIES
   ========================================================= */

function renderCategories() {
  const categories = [
    "Tous",
    ...new Set(PRODUCTS.map(p => p.category))
  ];

  categoriesEl.innerHTML = categories.map(category => `
    <button
      type="button"
      class="category ${category === currentCategory ? "active" : ""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}

/* =========================================================
   RECHERCHE + TRI
   ========================================================= */

function getFilteredProducts() {
  let list = [...PRODUCTS];

  const query = currentSearch
    .trim()
    .toLowerCase();

  if (query) {
    list = list.filter(product => {
      const text = [
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }

  if (currentCategory !== "Tous") {
    list = list.filter(
      product =>
        product.category === currentCategory
    );
  }

  if (currentSort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (currentSort === "nameAsc") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name, "fr")
    );
  }

  if (currentSort === "nameDesc") {
    list.sort((a, b) =>
      b.name.localeCompare(a.name, "fr")
    );
  }

  return list;
}

/* =========================================================
   CARTE PRODUIT
   ========================================================= */

function createProduct(product) {
  const favorite =
    favorites.includes(product.id);

  const card =
    document.createElement("article");

  card.className = "product";
  card.dataset.id = product.id;

  card.innerHTML = `
    <div class="productImage">

      <span class="brand">
        ${escapeHTML(product.brand)}
      </span>

      <button
        type="button"
        class="heart ${favorite ? "active" : ""}"
        data-action="favorite"
        data-id="${escapeHTML(product.id)}"
      >
        ${favorite ? "♥" : "♡"}
      </button>

      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >

    </div>

    <div class="productInfo">

      <div class="productCategory">
        ${escapeHTML(product.category)}
      </div>

      <h3 class="productName">
        ${escapeHTML(product.name)}
      </h3>

      <p class="productDescription">
        ${escapeHTML(product.description)}
      </p>

      <div class="productBottom">

        <strong class="productPrice">
          ${money(product.price)}
        </strong>

        <button
          type="button"
          class="add"
          data-action="add"
          data-id="${escapeHTML(product.id)}"
        >
          +
        </button>

      </div>

    </div>
  `;

  const image =
    card.querySelector("img");

  image.addEventListener(
    "error",
    () => {
      image.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg"
               width="500"
               height="400"
               viewBox="0 0 500 400">
            <rect width="500" height="400" fill="#f1f5f9"/>
            <text
              x="250"
              y="200"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial"
              font-size="24"
              fill="#64748b">
              NovaShop
            </text>
          </svg>
        `);
    },
    { once: true }
  );

  return card;
}

/* =========================================================
   AFFICHAGE PRODUITS
   ========================================================= */

function renderProducts() {
  const list = getFilteredProducts();

  const pages =
    Math.max(1, Math.ceil(list.length / PER_PAGE));

  if (currentPage > pages) {
    currentPage = pages;
  }

  const start =
    (currentPage - 1) * PER_PAGE;

  const visible =
    list.slice(start, start + PER_PAGE);

  productsEl.innerHTML = "";

  if (!visible.length) {
    productsEl.innerHTML = `
      <div class="empty">
        <strong>Aucun produit trouvé.</strong>
        <br><br>
        Modifie ta recherche ou ta catégorie.
      </div>
    `;
  } else {
    visible.forEach(product => {
      productsEl.appendChild(
        createProduct(product)
      );
    });
  }

  resultsEl.textContent =
    list.length +
    (list.length > 1
      ? " produits disponibles"
      : " produit disponible");

  renderPagination(pages);
}

/* =========================================================
   PAGINATION
   ========================================================= */

function renderPagination(pages) {
  paginationEl.innerHTML = "";

  if (pages <= 1) return;

  for (let i = 1; i <= pages; i++) {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className =
      "page" +
      (i === currentPage ? " active" : "");

    button.textContent = i;
    button.dataset.page = i;

    paginationEl.appendChild(button);
  }
}

/* =========================================================
   PANIER
   ========================================================= */

function addToCart(id) {
  const product = findProduct(id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id,
      quantity: 1
    });
  }

  saveAll();
  renderCart();
  updateCounters();

  showToast("Produit ajouté au panier");
}

function increaseQuantity(id) {
  const item =
    cart.find(entry => entry.id === id);

  if (!item) return;

  item.quantity++;

  saveAll();
  renderCart();
  updateCounters();
}

function decreaseQuantity(id) {
  const item =
    cart.find(entry => entry.id === id);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter(
      entry => entry.id !== id
    );
  }

  saveAll();
  renderCart();
  updateCounters();
}

function removeFromCart(id) {
  cart = cart.filter(
    item => item.id !== id
  );

  saveAll();
  renderCart();
  updateCounters();

  showToast("Produit retiré");
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => {
      const product =
        findProduct(item.id);

      if (!product) return total;

      return total +
        product.price * item.quantity;
    },
    0
  );
}

function renderCart() {
  cartContent.innerHTML = "";

  if (!cart.length) {
    cartContent.innerHTML = `
      <div class="empty">
        <strong>Panier vide</strong>
        <br><br>
        Aucun produit pour le moment.
      </div>
    `;

    cartTotal.textContent = money(0);
    checkoutButton.disabled = true;

    return;
  }

  checkoutButton.disabled = false;

  cart.forEach(item => {
    const product =
      findProduct(item.id);

    if (!product) return;

    const row =
      document.createElement("div");

    row.className = "cartItem";

    row.innerHTML = `
      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
      >

      <div>

        <div class="cartName">
          ${escapeHTML(product.name)}
        </div>

        <div class="cartPrice">
          ${money(product.price)}
        </div>

        <div class="quantity">

          <button
            type="button"
            data-cart="minus"
            data-id="${escapeHTML(product.id)}"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            type="button"
            data-cart="plus"
            data-id="${escapeHTML(product.id)}"
          >
            +
          </button>

        </div>

        <button
          type="button"
          class="remove"
          data-cart="remove"
          data-id="${escapeHTML(product.id)}"
        >
          Retirer
        </button>

      </div>

      <strong>
        ${money(
          product.price * item.quantity
        )}
      </strong>
    `;

    cartContent.appendChild(row);
  });

  cartTotal.textContent =
    money(getCartTotal());
}

/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id) {
  const product = findProduct(id);

  if (!product) return;

  if (favorites.includes(id)) {
    favorites =
      favorites.filter(
        favoriteId => favoriteId !== id
      );

    showToast("Retiré des favoris");
  } else {
    favorites.push(id);

    showToast("Ajouté aux favoris");
  }

  saveAll();
  updateCounters();
  renderProducts();
  renderFavorites();
}

function renderFavorites() {
  favoritesContent.innerHTML = "";

  const list =
    favorites
      .map(id => findProduct(id))
      .filter(Boolean);

  if (!list.length) {
    favoritesContent.innerHTML = `
      <div class="empty">
        <strong>Aucun favori</strong>
        <br><br>
        Ajoute des produits avec ♡.
      </div>
    `;

    return;
  }

  list.forEach(product => {
    const row =
      document.createElement("div");

    row.className = "cartItem";

    row.innerHTML = `
      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
      >

      <div>

        <div class="cartName">
          ${escapeHTML(product.name)}
        </div>

        <div class="cartPrice">
          ${money(product.price)}
        </div>

        <button
          type="button"
          class="btnPrimary"
          style="margin-top:9px;height:34px;padding:0 10px"
          data-fav-action="add"
          data-id="${escapeHTML(product.id)}"
        >
          Ajouter
        </button>

      </div>

      <button
        type="button"
        class="close"
        data-fav-action="remove"
        data-id="${escapeHTML(product.id)}"
      >
        ×
      </button>
    `;

    favoritesContent.appendChild(row);
  });
}

/* =========================================================
   MODAL PRODUIT
   ========================================================= */

function openProduct(id) {
  const product = findProduct(id);

  if (!product) return;

  const isFavorite =
    favorites.includes(id);

  productContent.innerHTML = `
    <div class="detail">

      <div class="detailImage">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >

      </div>

      <div>

        <div class="detailCategory">
          ${escapeHTML(product.brand)}
          •
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <p>
          ${escapeHTML(product.description)}
        </p>

        <div class="detailPrice">
          ${money(product.price)}
        </div>

        <div class="detailButtons">

          <button
            type="button"
            class="btnPrimary"
            data-detail="add"
            data-id="${escapeHTML(product.id)}"
          >
            Ajouter au panier
          </button>

          <button
            type="button"
            class="btnSecondary"
            data-detail="favorite"
            data-id="${escapeHTML(product.id)}"
          >
            ${isFavorite
              ? "♥ Retirer des favoris"
              : "♡ Ajouter aux favoris"}
          </button>

        </div>

      </div>

    </div>
  `;

  productModal.classList.add("open");
  overlay.classList.add("active");
}

/* =========================================================
   PANNEAUX
   ========================================================= */

function closeAll() {
  cartDrawer.classList.remove("open");
  favoritesDrawer.classList.remove("open");
  productModal.classList.remove("open");
  accountModal.classList.remove("open");
  overlay.classList.remove("active");
}

function openCart() {
  renderCart();

  cartDrawer.classList.add("open");
  overlay.classList.add("active");
}

function openFavorites() {
  renderFavorites();

  favoritesDrawer.classList.add("open");
  overlay.classList.add("active");
}

function openAccount() {
  cityInput.value = city;

  renderOrders();

  accountModal.classList.add("open");
  overlay.classList.add("active");
}

/* =========================================================
   COMMANDES
   ========================================================= */

function createOrder() {
  if (!cart.length) {
    showToast("Panier vide");
    return;
  }

  const order = {
    id:
      "NS-" +
      Date.now()
        .toString()
        .slice(-7),

    date:
      new Date().toISOString(),

    city:
      city || "Ville non renseignée",

    status:
      "En préparation",

    total:
      getCartTotal(),

    items:
      cart.map(item => {
        const product =
          findProduct(item.id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };
      })
  };

  orders.unshift(order);
  cart = [];

  saveAll();
  updateCounters();
  renderCart();
  renderOrders();

  closeAll();
  openAccount();

  showToast(
    "Commande créée avec succès"
  );
}

function renderOrders() {
  ordersContent.innerHTML = "";

  if (!orders.length) {
    ordersContent.innerHTML = `
      <p style="color:#6b7280">
        Tu n'as encore aucune commande.
      </p>
    `;

    return;
  }

  orders.forEach(order => {
    const element =
      document.createElement("div");

    element.className = "order";

    const date =
      new Date(order.date)
        .toLocaleDateString("fr-FR");

    const items =
      order.items
        .map(item =>
          `${escapeHTML(item.name)} × ${item.quantity}`
        )
        .join("<br>");

    element.innerHTML = `
      <div class="orderTop">

        <strong>
          ${escapeHTML(order.id)}
        </strong>

        <span class="status">
          ${escapeHTML(order.status)}
        </span>

      </div>

      <div class="orderInfo">

        Commandée le ${date}

        <br>

        Livraison :
        ${escapeHTML(order.city)}

        <br><br>

        ${items}

        <br><br>

        <strong>
          ${money(order.total)}
        </strong>

      </div>
    `;

    ordersContent.appendChild(element);
  });
}

/* =========================================================
   VILLE
   ========================================================= */

function saveCity() {
  city = cityInput.value.trim();

  localStorage.setItem(
    KEY_CITY,
    city
  );

  showToast(
    city
      ? "Ville enregistrée"
      : "Ville supprimée"
  );

  renderOrders();
}

/* =========================================================
   SUPPRESSION DES DONNÉES
   ========================================================= */

function deleteAllData() {
  const ok =
    confirm(
      "Supprimer toutes les données NovaShop ?"
    );

  if (!ok) return;

  cart = [];
  favorites = [];
  orders = [];
  city = "";

  localStorage.removeItem(KEY_CART);
  localStorage.removeItem(KEY_FAV);
  localStorage.removeItem(KEY_ORDERS);
  localStorage.removeItem(KEY_CITY);

  cityInput.value = "";

  renderProducts();
  renderFavorites();
  renderCart();
  renderOrders();
  updateCounters();

  closeAll();

  showToast(
    "Toutes les données ont été supprimées"
  );
}

/* =========================================================
   ÉVÉNEMENTS CATÉGORIES
   ========================================================= */

categoriesEl.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-category]"
      );

    if (!button) return;

    currentCategory =
      button.dataset.category;

    currentPage = 1;

    renderCategories();
    renderProducts();
  }
);

/* =========================================================
   ÉVÉNEMENTS PRODUITS
   ========================================================= */

productsEl.addEventListener(
  "click",
  event => {

    const actionButton =
      event.target.closest(
        "[data-action]"
      );

    if (actionButton) {

      const id =
        actionButton.dataset.id;

      const action =
        actionButton.dataset.action;

      if (action === "add") {
        addToCart(id);
        return;
      }

      if (action === "favorite") {
        toggleFavorite(id);
        return;
      }
    }

    const card =
      event.target.closest(".product");

    if (!card) return;

    openProduct(card.dataset.id);
  }
);

/* =========================================================
   RECHERCHE
   ========================================================= */

searchEl.addEventListener(
  "input",
  event => {

    currentSearch =
      event.target.value;

    currentPage = 1;

    renderProducts();
  }
);

/* =========================================================
   TRI
   ========================================================= */

sortEl.addEventListener(
  "change",
  event => {

    currentSort =
      event.target.value;

    currentPage = 1;

    renderProducts();
  }
);

/* =========================================================
   PAGINATION
   ========================================================= */

paginationEl.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-page]"
      );

    if (!button) return;

    currentPage =
      Number(button.dataset.page);

    renderProducts();

    $("productsSection").scrollIntoView({
      behavior: "smooth"
    });
  }
);

/* =========================================================
   PANIER
   ========================================================= */

cartContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-cart]"
      );

    if (!button) return;

    const id =
      button.dataset.id;

    const action =
      button.dataset.cart;

    if (action === "plus") {
      increaseQuantity(id);
    }

    if (action === "minus") {
      decreaseQuantity(id);
    }

    if (action === "remove") {
      removeFromCart(id);
    }
  }
);

/* =========================================================
   FAVORIS
   ========================================================= */

favoritesContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-fav-action]"
      );

    if (!button) return;

    const id =
      button.dataset.id;

    const action =
      button.dataset.favAction;

    if (action === "remove") {
      toggleFavorite(id);
    }

    if (action === "add") {
      addToCart(id);
    }
  }
);

/* =========================================================
   MODAL PRODUIT
   ========================================================= */

productContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-detail]"
      );

    if (!button) return;

    const id =
      button.dataset.id;

    const action =
      button.dataset.detail;

    if (action === "add") {
      addToCart(id);
    }

    if (action === "favorite") {
      toggleFavorite(id);
      openProduct(id);
    }
  }
);

/* =========================================================
   HEADER
   ========================================================= */

cartButton.addEventListener(
  "click",
  openCart
);

favoritesButton.addEventListener(
  "click",
  openFavorites
);

accountButton.addEventListener(
  "click",
  openAccount
);

/* =========================================================
   HERO
   ========================================================= */

shopButton.addEventListener(
  "click",
  () => {

    $("productsSection").scrollIntoView({
      behavior: "smooth"
    });

  }
);

heroFavoritesButton.addEventListener(
  "click",
  openFavorites
);

/* =========================================================
   ACCUEIL
   ========================================================= */

homeButton.addEventListener(
  "click",
  () => {

    currentSearch = "";
    currentCategory = "Tous";
    currentSort = "featured";
    currentPage = 1;

    searchEl.value = "";
    sortEl.value = "featured";

    renderCategories();
    renderProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

/* =========================================================
   CHECKOUT
   ========================================================= */

checkoutButton.addEventListener(
  "click",
  createOrder
);

/* =========================================================
   COMPTE
   ========================================================= */

saveCityButton.addEventListener(
  "click",
  saveCity
);

deleteDataButton.addEventListener(
  "click",
  deleteAllData
);

/* =========================================================
   FERMETURE
   ========================================================= */

overlay.addEventListener(
  "click",
  closeAll
);

document.addEventListener(
  "click",
  event => {

    const closeButton =
      event.target.closest(
        "[data-close]"
      );

    if (closeButton) {
      closeAll();
    }
  }
);

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeAll();
    }

  }
);

/* =========================================================
   INITIALISATION
   ========================================================= */

function initNovaShop() {

  renderCategories();

  renderProducts();

  renderCart();

  renderFavorites();

  renderOrders();

  updateCounters();

  cityInput.value = city;

  console.log(
    "NovaShop OK :",
    PRODUCTS.length,
    "produits chargés."
  );
}

initNovaShop();

/* =========================================================
   API GLOBALE
   ========================================================= */

window.NovaShop = {
  PRODUCTS,
  addToCart,
  toggleFavorite,
  openProduct,
  openCart,
  openFavorites,
  openAccount,
  createOrder,
  renderProducts
};"use strict";

/* =========================================================
   NOVASHOP V2
   ========================================================= */

const PRODUCTS = [

  {
    id: 1,
    name: "AMD Ryzen 5 9600X",
    brand: "AMD",
    category: "Processeurs",
    price: 229.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    rating: 4.8,
    reviews: 184,
    description: "Processeur gaming 6 cœurs / 12 threads basé sur Zen 5."
  },

  {
    id: 2,
    name: "Corsair Vengeance RGB 32GB DDR5-6000",
    brand: "Corsair",
    category: "RAM",
    price: 119.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    rating: 4.7,
    reviews: 241,
    description: "Kit 32 Go DDR5 avec éclairage RGB."
  },

  {
    id: 3,
    name: "Kingston Fury Beast RGB 32GB DDR5-5600",
    brand: "Kingston",
    category: "RAM",
    price: 104.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    rating: 4.7,
    reviews: 173,
    description: "Mémoire DDR5 32 Go orientée gaming et performance."
  },

  {
    id: 4,
    name: "Samsung 990 PRO 1TB",
    brand: "Samsung",
    category: "SSD",
    price: 89.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    rating: 4.9,
    reviews: 562,
    description: "SSD NVMe PCIe 4.0 de 1 To à très haut débit."
  },

  {
    id: 5,
    name: "Samsung 990 PRO 2TB",
    brand: "Samsung",
    category: "SSD",
    price: 159.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    rating: 4.9,
    reviews: 421,
    description: "SSD NVMe PCIe 4.0 de 2 To pour jeux et applications."
  },

  {
    id: 6,
    name: "Corsair RM850x",
    brand: "Corsair",
    category: "Alimentations",
    price: 139.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    rating: 4.8,
    reviews: 317,
    description: "Alimentation 850 W pensée pour les configurations gaming."
  },

  {
    id: 7,
    name: "Corsair 5000D Airflow",
    brand: "Corsair",
    category: "Boîtiers",
    price: 159.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    rating: 4.8,
    reviews: 298,
    description: "Boîtier ATX avec façade Airflow et espace intérieur généreux."
  },

  {
    id: 8,
    name: "ARCTIC Liquid Freezer III 360",
    brand: "ARCTIC",
    category: "Watercooling",
    price: 109.99,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    rating: 4.8,
    reviews: 205,
    description: "Refroidissement liquide 360 mm pour processeurs performants."
  },

  {
    id: 9,
    name: "Samsung Odyssey OLED G6",
    brand: "Samsung",
    category: "Écrans",
    price: 649.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    rating: 4.7,
    reviews: 138,
    description: "Écran gaming OLED haute fréquence avec faible temps de réponse."
  },

  {
    id: 10,
    name: "Logitech G PRO X TKL",
    brand: "Logitech",
    category: "Claviers",
    price: 189.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    rating: 4.7,
    reviews: 187,
    description: "Clavier TKL gaming sans fil conçu pour l'e-sport."
  },

  {
    id: 11,
    name: "Logitech G PRO X SUPERLIGHT 2",
    brand: "Logitech",
    category: "Souris gaming",
    price: 129.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    rating: 4.8,
    reviews: 392,
    description: "Souris gaming légère conçue pour une grande précision."
  },

  {
    id: 12,
    name: "Elgato Wave:3",
    brand: "Elgato",
    category: "Microphones",
    price: 129.99,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    rating: 4.8,
    reviews: 264,
    description: "Microphone USB destiné au streaming, au gaming et à la création."
  },

  {
    id: 13,
    name: "Sony DualSense",
    brand: "Sony",
    category: "Manettes",
    price: 69.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    rating: 4.8,
    reviews: 641,
    description: "Manette sans fil officielle PlayStation 5."
  }

];

/* =========================================================
   CONFIG
   ========================================================= */

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  city: "novashop_city",
  orders: "novashop_orders",
  reviews: "novashop_reviews"
};

const PER_PAGE = 8;

let cart = load(STORAGE.cart, []);
let favorites = load(STORAGE.favorites, []);
let orders = load(STORAGE.orders, []);
let reviews = load(STORAGE.reviews, []);

let city = localStorage.getItem(STORAGE.city) || "";

let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "featured";
let currentPage = 1;
let selectedProduct = null;


/* =========================================================
   STORAGE
   ========================================================= */

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsed = JSON.parse(value);

    return parsed ?? fallback;

  } catch {
    return fallback;
  }
}


function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


function saveEverything() {
  save(STORAGE.cart, cart);
  save(STORAGE.favorites, favorites);
  save(STORAGE.orders, orders);
  save(STORAGE.reviews, reviews);
}


/* =========================================================
   HELPERS
   ========================================================= */

function money(value) {
  return Number(value).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}


function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getProduct(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}


function getReviewList(productId) {
  return reviews.filter(review => review.productId === Number(productId));
}


function averageRating(product) {

  const userReviews = getReviewList(product.id);

  if (!userReviews.length) {
    return product.rating;
  }

  const total =
    userReviews.reduce((sum, review) => sum + Number(review.rating), 0);

  return (
    (product.rating * product.reviews + total) /
    (product.reviews + userReviews.length)
  );
}


function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function imageFallback(img) {

  img.onerror = null;

  img.src =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg"
           width="500"
           height="400"
           viewBox="0 0 500 400">
        <rect width="500" height="400" fill="#f3f4f6"/>
        <text x="250"
              y="200"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial"
              font-size="24"
              fill="#6b7280">
          NovaShop
        </text>
      </svg>
    `);
}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateCounters() {

  const cartCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  document.getElementById("cartCounter").textContent = cartCount;
  document.getElementById("favoritesCounter").textContent =
    favorites.length;
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function renderCategories() {

  const categoriesElement =
    document.getElementById("categories");

  const categories = [
    "Tous",
    ...new Set(PRODUCTS.map(product => product.category))
  ];

  categoriesElement.innerHTML = categories
    .map(category => `
      <button
        class="cat ${category === currentCategory ? "active" : ""}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>
    `)
    .join("");
}


function selectCategory(category) {

  currentCategory = category;
  currentPage = 1;

  renderCategories();
  renderProducts();

  document.getElementById("productsSection")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


/* =========================================================
   FILTERING
   ========================================================= */

function getFilteredProducts() {

  let result = [...PRODUCTS];

  if (currentCategory !== "Tous") {

    result = result.filter(
      product => product.category === currentCategory
    );
  }

  if (currentSearch.trim()) {

    const query = currentSearch
      .trim()
      .toLowerCase();

    result = result.filter(product => {

      const searchable = [
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }

  switch (currentSort) {

    case "priceAsc":
      result.sort((a, b) => a.price - b.price);
      break;

    case "priceDesc":
      result.sort((a, b) => b.price - a.price);
      break;

    case "nameAsc":
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "fr")
      );
      break;

    case "nameDesc":
      result.sort((a, b) =>
        b.name.localeCompare(a.name, "fr")
      );
      break;

    default:
      break;
  }

  return result;
}


/* =========================================================
   PRODUCTS
   ========================================================= */

function renderProducts() {

  const container =
    document.getElementById("products");

  const resultsText =
    document.getElementById("resultsText");

  const allProducts =
    getFilteredProducts();

  const total =
    allProducts.length;

  const totalPages =
    Math.max(1, Math.ceil(total / PER_PAGE));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start =
    (currentPage - 1) * PER_PAGE;

  const visible =
    allProducts.slice(start, start + PER_PAGE);

  resultsText.textContent =
    `${total} produit${total > 1 ? "s" : ""}`;

  if (!visible.length) {

    container.innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        <h3>Aucun produit trouvé</h3>
        <p>Essaie une autre recherche.</p>
      </div>
    `;

    renderPagination(0);
    return;
  }

  container.innerHTML =
    visible.map(renderProductCard).join("");

  renderPagination(totalPages);
}


function renderProductCard(product) {

  const isFavorite =
    favorites.includes(product.id);

  const rating =
    averageRating(product).toFixed(1);

  return `
    <article
      class="product"
      data-product="${product.id}"
    >

      <div class="pic">

        <span class="brand">
          ${escapeHTML(product.brand)}
        </span>

        <button
          class="heart"
          data-favorite="${product.id}"
          title="Ajouter aux favoris"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="imageFallback(this)"
        >

      </div>

      <div class="info">

        <div class="categoryName">
          ${escapeHTML(product.category)}
        </div>

        <div class="name">
          ${escapeHTML(product.name)}
        </div>

        <div class="desc">
          ${escapeHTML(product.description)}
        </div>

        <div class="rating">
          ★ ${rating}
          <span style="color:#6b7280">
            (${product.reviews})
          </span>
        </div>

        <div class="bottom">

          <span class="price">
            ${money(product.price)}
          </span>

          <button
            class="add"
            data-add="${product.id}"
            title="Ajouter au panier"
          >
            +
          </button>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   PAGINATION
   ========================================================= */

function renderPagination(totalPages) {

  const element =
    document.getElementById("pagination");

  if (totalPages <= 1) {
    element.innerHTML = "";
    return;
  }

  let html = "";

  for (let i = 1; i <= totalPages; i++) {

    html += `
      <button
        class="page ${i === currentPage ? "active" : ""}"
        data-page="${i}"
      >
        ${i}
      </button>
    `;
  }

  element.innerHTML = html;
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(id) {

  const product =
    getProduct(id);

  if (!product) return;

  const existing =
    cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  save(STORAGE.cart, cart);

  updateCounters();
  renderCart();

  showToast("Produit ajouté au panier ✓");
}


function increaseCart(id) {

  const item =
    cart.find(item => item.id === Number(id));

  if (!item) return;

  item.quantity++;

  save(STORAGE.cart, cart);

  updateCounters();
  renderCart();
}


function decreaseCart(id) {

  const item =
    cart.find(item => item.id === Number(id));

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {

    cart =
      cart.filter(item => item.id !== Number(id));
  }

  save(STORAGE.cart, cart);

  updateCounters();
  renderCart();
}


function removeCart(id) {

  cart =
    cart.filter(item => item.id !== Number(id));

  save(STORAGE.cart, cart);

  updateCounters();
  renderCart();

  showToast("Produit retiré");
}


function cartTotal() {

  return cart.reduce((total, item) => {

    const product =
      getProduct(item.id);

    if (!product) return total;

    return total +
      product.price *
      Number(item.quantity);

  }, 0);
}


function renderCart() {

  const container =
    document.getElementById("cartContent");

  const totalElement =
    document.getElementById("cartTotal");

  if (!cart.length) {

    container.innerHTML = `
      <div class="empty">
        <div style="font-size:45px">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute un produit pour commencer.</p>
      </div>
    `;

    totalElement.textContent =
      money(0);

    return;
  }

  container.innerHTML =
    cart.map(item => {

      const product =
        getProduct(item.id);

      if (!product) return "";

      return `
        <div class="cartItem">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            onerror="imageFallback(this)"
          >

          <div>

            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <div style="margin-top:5px">
              ${money(product.price)}
            </div>

            <div class="qty">

              <button data-minus="${product.id}">
                −
              </button>

              <span>
                ${item.quantity}
              </span>

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

          <strong>
            ${money(product.price * item.quantity)}
          </strong>

        </div>
      `;

    }).join("");

  totalElement.textContent =
    money(cartTotal());
}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(id) {

  id = Number(id);

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(value => value !== id);

    showToast("Retiré des favoris");

  } else {

    favorites.push(id);

    showToast("Ajouté aux favoris ♥");
  }

  save(STORAGE.favorites, favorites);

  updateCounters();
  renderProducts();
  renderFavorites();
}


function renderFavorites() {

  const container =
    document.getElementById("favoritesContent");

  const favoriteProducts =
    favorites
      .map(id => getProduct(id))
      .filter(Boolean);

  if (!favoriteProducts.length) {

    container.innerHTML = `
      <div class="empty">
        <div style="font-size:45px">♡</div>
        <h3>Aucun favori</h3>
        <p>Les produits que tu ajoutes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    favoriteProducts.map(product => `

      <div class="cartItem">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="imageFallback(this)"
        >

        <div>

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <div style="margin:6px 0">
            ${money(product.price)}
          </div>

          <button
            class="btn primary"
            data-add="${product.id}"
          >
            Ajouter au panier
          </button>

        </div>

        <button
          class="remove"
          data-favorite="${product.id}"
        >
          Retirer
        </button>

      </div>

    `).join("");
}


/* =========================================================
   PRODUCT DETAIL
   ========================================================= */

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) return;

  selectedProduct =
    product.id;

  const userReviews =
    getReviewList(product.id);

  const rating =
    averageRating(product).toFixed(1);

  document.getElementById("productContent").innerHTML = `

    <div class="detail">

      <div class="detailImg">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="imageFallback(this)"
        >

      </div>

      <div>

        <div class="categoryName">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">
          ★ ${rating}
          <span style="color:#6b7280">
            ${product.reviews} avis
          </span>
        </div>

        <p>
          ${escapeHTML(product.description)}
        </p>

        <div class="detailPrice">
          ${money(product.price)}
        </div>

        <button
          class="btn primary"
          data-add="${product.id}"
          style="width:100%"
        >
          Ajouter au panier
        </button>

      </div>

    </div>

    <hr style="margin:25px 0;border:0;border-top:1px solid #ddd">

    <h3>Avis clients</h3>

    <div style="margin-top:10px">

      ${
        userReviews.length
          ? userReviews.map(renderReview).join("")
          : `
            <p style="color:#6b7280;margin-top:10px">
              Aucun avis ajouté localement pour le moment.
            </p>
          `
      }

    </div>

    <hr style="margin:25px 0;border:0;border-top:1px solid #ddd">

    <h3>Laisser un avis</h3>

    <form id="reviewForm" class="form" style="margin-top:12px">

      <input
        id="reviewName"
        maxlength="40"
        placeholder="Ton prénom"
        required
      >

      <select id="reviewRating">
        <option value="5">★★★★★ 5/5</option>
        <option value="4">★★★★☆ 4/5</option>
        <option value="3">★★★☆☆ 3/5</option>
        <option value="2">★★☆☆☆ 2/5</option>
        <option value="1">★☆☆☆☆ 1/5</option>
      </select>

      <textarea
        id="reviewText"
        maxlength="300"
        placeholder="Ton avis..."
        required
      ></textarea>

      <button class="btn primary">
        Publier l'avis
      </button>

    </form>
  `;

  openModal("productModal");
}


function renderReview(review) {

  return `
    <div class="review">

      <strong>
        ${escapeHTML(review.name)}
      </strong>

      <div class="rating">
        ${"★".repeat(Number(review.rating))}
        ${"☆".repeat(5 - Number(review.rating))}
      </div>

      <p>
        ${escapeHTML(review.text)}
      </p>

      <small>
        Avis client
      </small>

    </div>
  `;
}


function submitReview(event) {

  event.preventDefault();

  if (!selectedProduct) return;

  const name =
    document.getElementById("reviewName")
      .value.trim();

  const rating =
    Number(
      document.getElementById("reviewRating").value
    );

  const text =
    document.getElementById("reviewText")
      .value.trim();

  if (!name || !text) {
    showToast("Remplis tous les champs");
    return;
  }

  reviews.push({
    id: Date.now(),
    productId: selectedProduct,
    name,
    rating,
    text
  });

  save(STORAGE.reviews, reviews);

  showToast("Avis publié ✓");

  openProduct(selectedProduct);
}


/* =========================================================
   MODALS / DRAWERS
   ========================================================= */

function openModal(id) {

  document
    .getElementById(id)
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("on");
}


function closeAll() {

  document
    .querySelectorAll(".modal")
    .forEach(element =>
      element.classList.remove("open")
    );

  document
    .querySelectorAll(".drawer")
    .forEach(element =>
      element.classList.remove("open")
    );

  document
    .getElementById("overlay")
    .classList.remove("on");
}


function openDrawer(id) {

  closeAll();

  document
    .getElementById(id)
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("on");
}


/* =========================================================
   ACCOUNT
   ========================================================= */

function openAccount() {

  document.getElementById("cityInput").value =
    city;

  renderOrders();

  openModal("accountModal");
}


function saveCity() {

  const input =
    document.getElementById("cityInput");

  city =
    input.value.trim();

  localStorage.setItem(
    STORAGE.city,
    city
  );

  showToast(
    city
      ? "Ville enregistrée ✓"
      : "Ville supprimée"
  );
}


/* =========================================================
   ORDERS
   ========================================================= */

function createOrder() {

  if (!cart.length) {

    showToast("Ton panier est vide");

    return;
  }

  const order = {

    id:
      "NS-" +
      Date.now()
        .toString()
        .slice(-8),

    date:
      new Date()
        .toLocaleString("fr-FR"),

    city:
      city || "Non renseignée",

    status:
      "Préparation",

    total:
      cartTotal(),

    items:
      cart.map(item => {

        const product =
          getProduct(item.id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };

      })

  };

  orders.unshift(order);

  cart = [];

  saveEverything();

  updateCounters();
  renderCart();
  renderOrders();
  renderDashboard();

  closeAll();

  showToast(
    `Commande ${order.id} créée ✓`
  );
}


function renderOrders() {

  const container =
    document.getElementById("ordersContent");

  if (!orders.length) {

    container.innerHTML = `
      <div class="empty">
        <p>Aucune commande pour le moment.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    orders.map(renderOrder).join("");
}


function renderOrder(order) {

  const items =
    order.items || [];

  return `
    <div class="order">

      <div class="orderTop">

        <strong>
          ${escapeHTML(order.id)}
        </strong>

        <span class="status">
          ${escapeHTML(order.status)}
        </span>

      </div>

      <p style="margin-top:8px">
        ${escapeHTML(order.date)}
      </p>

      <p style="margin-top:5px">
        Livraison :
        <strong>
          ${escapeHTML(order.city)}
        </strong>
      </p>

      <div style="margin-top:10px">

        ${items.map(item => `
          <div style="padding:4px 0;font-size:13px">
            ${escapeHTML(item.name)}
            × ${item.quantity}
          </div>
        `).join("")}

      </div>

      <strong style="display:block;margin-top:10px">
        ${money(order.total)}
      </strong>

    </div>
  `;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  const products =
    document.getElementById("statProducts");

  const orderCount =
    document.getElementById("statOrders");

  const revenue =
    document.getElementById("statRevenue");

  if (!products) return;

  products.textContent =
    PRODUCTS.length;

  orderCount.textContent =
    orders.length;

  const total =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );

  revenue.textContent =
    money(total);

  const container =
    document.getElementById("dashboardOrders");

  if (!orders.length) {

    container.innerHTML = `
      <div class="empty">
        Aucune commande.
      </div>
    `;

    return;
  }

  container.innerHTML =
    orders.map((order, index) => `

      <div class="order">

        <div class="orderTop">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <select
            data-status="${index}"
          >
            <option
              ${order.status === "Préparation" ? "selected" : ""}
            >
              Préparation
            </option>

            <option
              ${order.status === "Expédiée" ? "selected" : ""}
            >
              Expédiée
            </option>

            <option
              ${order.status === "En livraison" ? "selected" : ""}
            >
              En livraison
            </option>

            <option
              ${order.status === "Livrée" ? "selected" : ""}
            >
              Livrée
            </option>

          </select>

        </div>

        <p style="margin-top:8px">
          ${money(order.total)}
        </p>

      </div>

    `).join("");
}


/* =========================================================
   DELETE DATA
   ========================================================= */

function deleteAllData() {

  const confirmed =
    confirm(
      "Supprimer toutes tes données NovaShop sur cet appareil ?"
    );

  if (!confirmed) return;

  cart = [];
  favorites = [];
  orders = [];
  reviews = [];
  city = "";

  Object.values(STORAGE)
    .forEach(key =>
      localStorage.removeItem(key)
    );

  localStorage.removeItem(STORAGE.city);

  updateCounters();
  renderCart();
  renderFavorites();
  renderOrders();
  renderDashboard();

  document.getElementById("cityInput").value = "";

  closeAll();

  showToast("Données supprimées");
}


/* =========================================================
   EVENTS
   ========================================================= */

document.addEventListener("click", event => {

  const category =
    event.target.closest("[data-category]");

  if (category) {

    selectCategory(
      category.dataset.category
    );

    return;
  }


  const add =
    event.target.closest("[data-add]");

  if (add) {

    addToCart(
      Number(add.dataset.add)
    );

    return;
  }


  const favorite =
    event.target.closest("[data-favorite]");

  if (favorite) {

    toggleFavorite(
      Number(favorite.dataset.favorite)
    );

    return;
  }


  const plus =
    event.target.closest("[data-plus]");

  if (plus) {

    increaseCart(
      Number(plus.dataset.plus)
    );

    return;
  }


  const minus =
    event.target.closest("[data-minus]");

  if (minus) {

    decreaseCart(
      Number(minus.dataset.minus)
    );

    return;
  }


  const remove =
    event.target.closest("[data-remove]");

  if (remove) {

    removeCart(
      Number(remove.dataset.remove)
    );

    return;
  }


  const page =
    event.target.closest("[data-page]");

  if (page) {

    currentPage =
      Number(page.dataset.page);

    renderProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  const productCard =
    event.target.closest("[data-product]");

  if (
    productCard &&
    !event.target.closest("button")
  ) {

    openProduct(
      Number(productCard.dataset.product)
    );

    return;
  }


  if (
    event.target.matches("[data-close]") ||
    event.target.closest("[data-close]")
  ) {

    closeAll();

    return;
  }


  if (event.target.id === "overlay") {

    closeAll();
  }

});


/* =========================================================
   SEARCH
   ========================================================= */

document
  .getElementById("searchInput")
  .addEventListener("input", event => {

    currentSearch =
      event.target.value;

    currentPage = 1;

    renderProducts();
  });


/* =========================================================
   SORT
   ========================================================= */

document
  .getElementById("sortSelect")
  .addEventListener("change", event => {

    currentSort =
      event.target.value;

    currentPage = 1;

    renderProducts();
  });


/* =========================================================
   HEADER BUTTONS
   ========================================================= */

document
  .getElementById("cartButton")
  .addEventListener("click", () => {

    renderCart();
    openDrawer("cartDrawer");

  });


document
  .getElementById("favoritesButton")
  .addEventListener("click", () => {

    renderFavorites();
    openDrawer("favoritesDrawer");

  });


document
  .getElementById("accountButton")
  .addEventListener("click", openAccount);


document
  .getElementById("homeButton")
  .addEventListener("click", () => {

    currentCategory = "Tous";
    currentSearch = "";
    currentPage = 1;

    document.getElementById("searchInput").value = "";

    renderCategories();
    renderProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


/* =========================================================
   HERO
   ========================================================= */

document
  .getElementById("shopButton")
  .addEventListener("click", () => {

    document
      .querySelector(".main")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


/* =========================================================
   CHECKOUT
   ========================================================= */

document
  .getElementById("checkoutButton")
  .addEventListener("click", createOrder);


/* =========================================================
   CITY
   ========================================================= */

document
  .getElementById("saveCityButton")
  .addEventListener("click", saveCity);


/* =========================================================
   DASHBOARD
   ========================================================= */

document
  .getElementById("dashboardButton")
  .addEventListener("click", () => {

    renderDashboard();

    openModal("dashboardModal");

  });


document.addEventListener("change", event => {

  const status =
    event.target.closest("[data-status]");

  if (!status) return;

  const index =
    Number(status.dataset.status);

  if (!orders[index]) return;

  orders[index].status =
    status.value;

  save(STORAGE.orders, orders);

  renderOrders();

  showToast("Statut de commande modifié ✓");
});


/* =========================================================
   DELETE DATA
   ========================================================= */

document
  .getElementById("deleteDataButton")
  .addEventListener("click", deleteAllData);


/* =========================================================
   REVIEW FORM
   ========================================================= */

document.addEventListener("submit", event => {

  if (event.target.id !== "reviewForm") {
    return;
  }

  submitReview(event);

});


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeAll();
  }

});


/* =========================================================
   INIT
   ========================================================= */

function init() {

  renderCategories();
  renderProducts();
  renderCart();
  renderFavorites();
  renderOrders();
  renderDashboard();
  updateCounters();

}


init();


/* =========================================================
   GLOBAL API
   ========================================================= */

window.NovaShop = {

  products: PRODUCTS,

  addToCart,
  removeCart,
  increaseCart,
  decreaseCart,

  toggleFavorite,

  openProduct,

  createOrder,

  renderProducts,
  renderCart,
  renderFavorites,

  getOrders: () => orders,

  getCart: () => cart,

  getFavorites: () => favorites

};/* =========================================================
   NOVASHOP • PARTIE 5
   Firebase + compte + commandes + sauvegarde cloud
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


/* =========================================================
   PRODUITS
   MAX 6 PAR CATÉGORIE
   MAX 700 €
   PAS D'INTEL
   ========================================================= */

const PRODUCTS = [

  {
    id:"cpu-9600x",
    name:"AMD Ryzen 5 9600X",
    brand:"AMD",
    category:"Processeurs",
    price:229.99,
    image:"https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description:"Processeur gaming 6 cœurs et 12 threads sur socket AM5."
  },

  {
    id:"ram-corsair-32",
    name:"Corsair Vengeance RGB 32 Go DDR5 6000",
    brand:"Corsair",
    category:"RAM",
    price:109.99,
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description:"Kit 32 Go DDR5 avec éclairage RGB."
  },

  {
    id:"ram-kingston-32",
    name:"Kingston Fury Beast RGB 32 Go DDR5 5600",
    brand:"Kingston",
    category:"RAM",
    price:94.99,
    image:"https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description:"Mémoire DDR5 32 Go pensée pour les configurations gaming."
  },

  {
    id:"ssd-990-1tb",
    name:"Samsung 990 PRO 1 To",
    brand:"Samsung",
    category:"SSD",
    price:89.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description:"SSD NVMe PCIe 4.0 haute performance."
  },

  {
    id:"ssd-990-2tb",
    name:"Samsung 990 PRO 2 To",
    brand:"Samsung",
    category:"SSD",
    price:149.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description:"SSD NVMe 2 To pour jeux, logiciels et stockage rapide."
  },

  {
    id:"psu-rm850x",
    name:"Corsair RM850x",
    brand:"Corsair",
    category:"Alimentations",
    price:139.99,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description:"Alimentation 850 W conçue pour les PC gaming puissants."
  },

  {
    id:"case-5000d",
    name:"Corsair 5000D Airflow",
    brand:"Corsair",
    category:"Boîtiers",
    price:149.99,
    image:"https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description:"Boîtier ATX orienté airflow avec façade mesh."
  },

  {
    id:"cooling-lf3",
    name:"ARCTIC Liquid Freezer III 360",
    brand:"ARCTIC",
    category:"Refroidissement",
    price:119.99,
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description:"Watercooling AIO 360 mm pour processeurs compatibles."
  },

  {
    id:"screen-g6",
    name:"Samsung Odyssey OLED G6",
    brand:"Samsung",
    category:"Écrans",
    price:599.99,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description:"Écran gaming OLED haute fréquence."
  },

  {
    id:"keyboard-proxtkl",
    name:"Logitech G PRO X TKL",
    brand:"Logitech G",
    category:"Claviers",
    price:189.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description:"Clavier gaming TKL sans fil."
  },

  {
    id:"mouse-superlight2",
    name:"Logitech G PRO X SUPERLIGHT 2",
    brand:"Logitech G",
    category:"Souris",
    price:149.99,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description:"Souris gaming sans fil légère et performante."
  },

  {
    id:"mic-wave3",
    name:"Elgato Wave:3",
    brand:"Elgato",
    category:"Microphones",
    price:139.99,
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description:"Microphone USB conçu pour le streaming et la création."
  },

  {
    id:"controller-dualsense",
    name:"Sony DualSense",
    brand:"Sony",
    category:"Manettes",
    price:74.99,
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description:"Manette officielle PS5 avec retour haptique."
  }

];


/* =========================================================
   CONFIGURATION
   ========================================================= */

const STORAGE = {
  cart:"novashop_cart",
  favorites:"novashop_favorites",
  city:"novashop_city",
  orders:"novashop_orders",
  reviews:"novashop_reviews",
  profile:"novashop_profile"
};

const PAGE_SIZE = 12;

const ORDER_STATUSES = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];


/* =========================================================
   ÉTAT
   ========================================================= */

let cart = load(STORAGE.cart, []);
let favorites = load(STORAGE.favorites, []);
let orders = load(STORAGE.orders, []);
let reviews = load(STORAGE.reviews, []);
let profile = load(STORAGE.profile, {
  name:"",
  email:""
});

let city = localStorage.getItem(STORAGE.city) || "";

let currentCategory = "Tous";
let currentSearch = "";
let currentSort = "featured";
let currentPage = 1;
let selectedProduct = null;


/* =========================================================
   FIREBASE
   ========================================================= */

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDB = null;

let firebaseReady = false;
let firebaseUser = null;


/*
  Les SDK sont chargés dynamiquement.
  Le site fonctionne aussi hors connexion avec localStorage.
*/

async function loadFirebase(){

  if(firebaseReady){
    return true;
  }

  try{

    await loadScript(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
    );

    await loadScript(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"
    );

    await loadScript(
      "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"
    );

    firebaseApp = firebase.initializeApp(firebaseConfig);

    firebaseAuth = firebase.auth();

    firebaseDB = firebase.firestore();

    firebaseReady = true;

    firebaseAuth.onAuthStateChanged(async user => {

      firebaseUser = user || null;

      if(user){

        profile = {
          name:user.displayName || profile.name || "",
          email:user.email || profile.email || ""
        };

        save(STORAGE.profile, profile);

        await syncFromCloud();

      }

      renderAccount();

    });

    return true;

  }catch(error){

    console.warn(
      "Firebase indisponible. Mode local activé.",
      error
    );

    return false;
  }
}


function loadScript(src){

  return new Promise((resolve,reject)=>{

    const existing =
      document.querySelector(`script[src="${src}"]`);

    if(existing){
      existing.addEventListener("load",resolve,{once:true});
      existing.addEventListener("error",reject,{once:true});
      return;
    }

    const script = document.createElement("script");

    script.src = src;
    script.async = true;

    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);

  });

}


/* =========================================================
   AUTH
   ========================================================= */

async function createAccount(email,password,name=""){

  const ready = await loadFirebase();

  if(!ready || !firebaseAuth){

    showToast("Firebase n'est pas disponible");

    return null;
  }

  try{

    const credential =
      await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

    if(name){

      await credential.user.updateProfile({
        displayName:name
      });

    }

    profile = {
      name:name || "",
      email
    };

    save(STORAGE.profile,profile);

    await uploadAccount();

    showToast("Compte créé");

    return credential.user;

  }catch(error){

    showToast(firebaseError(error));

    return null;
  }
}


async function loginAccount(email,password){

  const ready = await loadFirebase();

  if(!ready || !firebaseAuth){

    showToast("Firebase n'est pas disponible");

    return null;
  }

  try{

    const credential =
      await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );

    firebaseUser = credential.user;

    showToast("Connexion réussie");

    await syncFromCloud();

    return credential.user;

  }catch(error){

    showToast(firebaseError(error));

    return null;
  }
}


async function logoutAccount(){

  if(firebaseAuth){

    try{
      await firebaseAuth.signOut();
    }catch(error){
      console.warn(error);
    }

  }

  firebaseUser = null;

  showToast("Déconnecté");
}


function firebaseError(error){

  const code = error?.code || "";

  const messages = {

    "auth/invalid-email":
      "Adresse e-mail invalide",

    "auth/user-not-found":
      "Compte introuvable",

    "auth/wrong-password":
      "Mot de passe incorrect",

    "auth/email-already-in-use":
      "Cette adresse est déjà utilisée",

    "auth/weak-password":
      "Mot de passe trop faible",

    "auth/invalid-credential":
      "Identifiants incorrects",

    "auth/too-many-requests":
      "Trop de tentatives, réessaie plus tard"

  };

  return messages[code] || "Erreur de connexion";
}


/* =========================================================
   FIRESTORE
   ========================================================= */

async function uploadAccount(){

  if(!firebaseUser || !firebaseDB){
    return;
  }

  const uid = firebaseUser.uid;

  try{

    await firebaseDB
      .collection("users")
      .doc(uid)
      .set({

        profile,
        city,
        cart,
        favorites,
        orders,
        reviews,
        updatedAt:
          firebase.firestore.FieldValue.serverTimestamp()

      },{merge:true});

  }catch(error){

    console.warn(
      "Impossible de sauvegarder dans Firebase",
      error
    );

  }
}


async function syncFromCloud(){

  if(!firebaseUser || !firebaseDB){
    return;
  }

  try{

    const snap =
      await firebaseDB
        .collection("users")
        .doc(firebaseUser.uid)
        .get();

    if(!snap.exists){

      await uploadAccount();

      return;
    }

    const data = snap.data() || {};

    if(Array.isArray(data.cart)){
      cart = data.cart;
    }

    if(Array.isArray(data.favorites)){
      favorites = data.favorites;
    }

    if(Array.isArray(data.orders)){
      orders = data.orders;
    }

    if(Array.isArray(data.reviews)){
      reviews = data.reviews;
    }

    if(typeof data.city === "string"){
      city = data.city;
    }

    if(data.profile && typeof data.profile === "object"){
      profile = {
        name:data.profile.name || "",
        email:data.profile.email || ""
      };
    }

    saveEverything();

    renderAll();

    showToast("Données synchronisées");

  }catch(error){

    console.warn(
      "Synchronisation impossible",
      error
    );

  }
}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function load(key,fallback){

  try{

    const value =
      localStorage.getItem(key);

    if(value === null){
      return fallback;
    }

    return JSON.parse(value);

  }catch{

    return fallback;
  }
}


function save(key,value){

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function saveEverything(){

  save(STORAGE.cart,cart);
  save(STORAGE.favorites,favorites);
  save(STORAGE.orders,orders);
  save(STORAGE.reviews,reviews);
  save(STORAGE.profile,profile);

  localStorage.setItem(
    STORAGE.city,
    city
  );
}


/* =========================================================
   UTILITAIRES
   ========================================================= */

function money(value){

  return new Intl.NumberFormat(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(value);
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


function showToast(message){

  const toast =
    document.getElementById("toast");

  if(!toast){
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer =
    setTimeout(()=>{
      toast.classList.remove("show");
    },2200);
}


function imageFallback(){

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 450"
    >
      <rect width="600" height="450" fill="#f1f5f9"/>
      <text
        x="300"
        y="225"
        text-anchor="middle"
        font-family="Arial"
        font-size="28"
        fill="#64748b"
      >
        Image indisponible
      </text>
    </svg>
  `;
}


function averageRating(productId){

  const list =
    reviews.filter(
      review => review.productId === productId
    );

  if(!list.length){
    return 0;
  }

  const total =
    list.reduce(
      (sum,review)=>sum + Number(review.rating || 0),
      0
    );

  return total / list.length;
}


function stars(rating){

  const rounded =
    Math.round(Number(rating) || 0);

  return "★".repeat(rounded) +
         "☆".repeat(5-rounded);
}


/* =========================================================
   CATÉGORIES
   ========================================================= */

function renderCategories(){

  const container =
    document.getElementById("categories");

  if(!container){
    return;
  }

  const categories = [
    "Tous",
    ...new Set(
      PRODUCTS.map(product => product.category)
    )
  ];

  container.innerHTML =
    categories.map(category=>`

      <button
        class="cat ${currentCategory === category ? "active" : ""}"
        data-category="${escapeHTML(category)}"
      >
        ${escapeHTML(category)}
      </button>

    `).join("");

}


function selectCategory(category){

  currentCategory = category;

  currentPage = 1;

  renderCategories();
  renderProducts();

  document
    .getElementById("productsSection")
    ?.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
}


/* =========================================================
   FILTRES
   ========================================================= */

function filteredProducts(){

  let list = PRODUCTS.filter(product=>{

    const categoryOK =
      currentCategory === "Tous" ||
      product.category === currentCategory;

    const query =
      currentSearch
        .trim()
        .toLowerCase();

    const searchOK =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return categoryOK && searchOK;
  });


  if(currentSort === "priceAsc"){

    list.sort(
      (a,b)=>a.price-b.price
    );

  }

  if(currentSort === "priceDesc"){

    list.sort(
      (a,b)=>b.price-a.price
    );

  }

  if(currentSort === "nameAsc"){

    list.sort(
      (a,b)=>a.name.localeCompare(
        b.name,
        "fr"
      )
    );

  }

  if(currentSort === "nameDesc"){

    list.sort(
      (a,b)=>b.name.localeCompare(
        a.name,
        "fr"
      )
    );

  }

  return list;
}


/* =========================================================
   PRODUITS
   ========================================================= */

function renderProducts(){

  const container =
    document.getElementById("products");

  const results =
    document.getElementById("resultsText");

  const list =
    filteredProducts();

  const totalPages =
    Math.max(
      1,
      Math.ceil(list.length / PAGE_SIZE)
    );

  if(currentPage > totalPages){
    currentPage = totalPages;
  }

  const start =
    (currentPage - 1) * PAGE_SIZE;

  const visible =
    list.slice(
      start,
      start + PAGE_SIZE
    );

  if(results){

    results.textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;

  }

  if(!container){
    return;
  }

  if(!visible.length){

    container.innerHTML = `
      <div
        class="empty"
        style="grid-column:1/-1"
      >
        <h3>Aucun produit trouvé</h3>
        <p>Essaie une autre recherche.</p>
      </div>
    `;

    renderPagination(0);

    return;
  }


  container.innerHTML =
    visible.map(product=>{

      const rating =
        averageRating(product.id);

      const favorite =
        favorites.includes(product.id);

      return `

        <article
          class="product"
          data-product="${escapeHTML(product.id)}"
        >

          <div class="pic">

            <span class="brand">
              ${escapeHTML(product.brand)}
            </span>

            <button
              class="heart"
              data-favorite="${escapeHTML(product.id)}"
              title="Favori"
            >
              ${favorite ? "♥" : "♡"}
            </button>

            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(imageFallback())}'"
            >

          </div>

          <div class="info">

            <div class="categoryName">
              ${escapeHTML(product.category)}
            </div>

            <div class="name">
              ${escapeHTML(product.name)}
            </div>

            <div class="desc">
              ${escapeHTML(product.description)}
            </div>

            <div class="rating">
              ${stars(rating)}
              ${
                rating
                  ? ` ${rating.toFixed(1)}/5`
                  : " Aucun avis"
              }
            </div>

            <div class="bottom">

              <span class="price">
                ${money(product.price)}
              </span>

              <button
                class="add"
                data-add="${escapeHTML(product.id)}"
                title="Ajouter au panier"
              >
                +
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

  renderPagination(totalPages);
}


function renderPagination(totalPages){

  const container =
    document.getElementById("pagination");

  if(!container){
    return;
  }

  if(totalPages <= 1){

    container.innerHTML = "";

    return;
  }

  let html = "";

  for(let i=1;i<=totalPages;i++){

    html += `
      <button
        class="page ${i === currentPage ? "active" : ""}"
        data-page="${i}"
      >
        ${i}
      </button>
    `;
  }

  container.innerHTML = html;
}


/* =========================================================
   PANIER
   ========================================================= */

function addToCart(productId){

  const product =
    getProduct(productId);

  if(!product){
    return;
  }

  const existing =
    cart.find(
      item => item.id === productId
    );

  if(existing){

    existing.quantity += 1;

  }else{

    cart.push({
      id:productId,
      quantity:1
    });

  }

  save(STORAGE.cart,cart);

  updateCounters();
  renderCart();

  uploadAccount();

  showToast("Produit ajouté au panier");
}


function changeQuantity(productId,delta){

  const item =
    cart.find(
      entry => entry.id === productId
    );

  if(!item){
    return;
  }

  item.quantity += delta;

  if(item.quantity <= 0){

    cart =
      cart.filter(
        entry => entry.id !== productId
      );

  }

  save(STORAGE.cart,cart);

  updateCounters();
  renderCart();

  uploadAccount();
}


function removeFromCart(productId){

  cart =
    cart.filter(
      item => item.id !== productId
    );

  save(STORAGE.cart,cart);

  updateCounters();
  renderCart();

  uploadAccount();
}


function cartTotal(){

  return cart.reduce(
    (total,item)=>{

      const product =
        getProduct(item.id);

      if(!product){
        return total;
      }

      return total +
        product.price * item.quantity;

    },
    0
  );
}


function cartCount(){

  return cart.reduce(
    (total,item)=>
      total + item.quantity,
    0
  );
}


function renderCart(){

  const container =
    document.getElementById("cartContent");

  const total =
    document.getElementById("cartTotal");

  if(!container){
    return;
  }

  if(!cart.length){

    container.innerHTML = `
      <div class="empty">
        <h3>Ton panier est vide</h3>
        <p>Ajoute des produits pour commencer.</p>
      </div>
    `;

  }else{

    container.innerHTML =
      cart.map(item=>{

        const product =
          getProduct(item.id);

        if(!product){
          return "";
        }

        return `

          <div class="cartItem">

            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(imageFallback())}'"
            >

            <div>

              <strong>
                ${escapeHTML(product.name)}
              </strong>

              <div>
                ${money(product.price)}
              </div>

              <div class="qty">

                <button
                  data-qty-minus="${product.id}"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  data-qty-plus="${product.id}"
                >
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

            <strong>
              ${money(
                product.price * item.quantity
              )}
            </strong>

          </div>

        `;

      }).join("");

  }

  if(total){
    total.textContent =
      money(cartTotal());
  }
}


/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(productId){

  if(favorites.includes(productId)){

    favorites =
      favorites.filter(
        id => id !== productId
      );

    showToast("Retiré des favoris");

  }else{

    favorites.push(productId);

    showToast("Ajouté aux favoris");

  }

  save(STORAGE.favorites,favorites);

  updateCounters();
  renderProducts();
  renderFavorites();

  uploadAccount();
}


function renderFavorites(){

  const container =
    document.getElementById("favoritesContent");

  if(!container){
    return;
  }

  const list =
    favorites
      .map(id=>getProduct(id))
      .filter(Boolean);

  if(!list.length){

    container.innerHTML = `
      <div class="empty">
        <h3>Aucun favori</h3>
        <p>Les produits que tu aimes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    list.map(product=>`

      <div class="cartItem">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(imageFallback())}'"
        >

        <div>

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <div>
            ${money(product.price)}
          </div>

          <button
            class="remove"
            data-favorite-remove="${product.id}"
          >
            Retirer
          </button>

        </div>

      </div>

    `).join("");
}


/* =========================================================
   COMPTE
   ========================================================= */

function openAccount(){

  const modal =
    document.getElementById("accountModal");

  if(!modal){
    return;
  }

  modal.classList.add("open");

  document
    .getElementById("overlay")
    ?.classList.add("on");

  renderAccount();

}


function renderAccount(){

  const cityInput =
    document.getElementById("cityInput");

  if(cityInput){
    cityInput.value = city;
  }

  renderOrders();
}


function saveCity(){

  const input =
    document.getElementById("cityInput");

  if(!input){
    return;
  }

  city =
    input.value.trim();

  localStorage.setItem(
    STORAGE.city,
    city
  );

  uploadAccount();

  showToast(
    city
      ? "Ville enregistrée"
      : "Ville supprimée"
  );
}


/* =========================================================
   COMMANDES
   ========================================================= */

function createOrder(){

  if(!cart.length){

    showToast("Ton panier est vide");

    return;
  }

  const items =
    cart.map(item=>{

      const product =
        getProduct(item.id);

      return {

        id:item.id,

        name:
          product?.name || "Produit",

        price:
          product?.price || 0,

        quantity:item.quantity

      };

    });

  const order = {

    id:
      "NS-" +
      Date.now()
        .toString(36)
        .toUpperCase(),

    date:
      new Date().toISOString(),

    city:
      city || "Ville non renseignée",

    status:
      ORDER_STATUSES[0],

    items,

    total:
      cartTotal()

  };

  orders.unshift(order);

  cart = [];

  saveEverything();

  renderCart();
  renderOrders();
  renderDashboard();
  updateCounters();

  uploadAccount();

  showToast(
    `Commande ${order.id} créée`
  );

}


function renderOrders(){

  const container =
    document.getElementById("ordersContent");

  if(!container){
    return;
  }

  if(!orders.length){

    container.innerHTML = `
      <div class="empty">
        <p>Aucune commande pour le moment.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    orders.map(order=>`

      <div class="order">

        <div class="orderTop">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <span class="status">
            ${escapeHTML(order.status)}
          </span>

        </div>

        <p style="margin-top:8px;color:#6b7280">
          ${formatDate(order.date)}
        </p>

        <p style="margin-top:6px">
          📍 ${escapeHTML(order.city)}
        </p>

        <p style="margin-top:8px">
          ${order.items.length}
          article${order.items.length > 1 ? "s" : ""}
        </p>

        <strong
          style="display:block;margin-top:8px"
        >
          ${money(order.total)}
        </strong>

        <div
          style="
            margin-top:12px;
            display:flex;
            gap:6px;
            flex-wrap:wrap;
          "
        >

          ${ORDER_STATUSES.map((status,index)=>{

            const currentIndex =
              ORDER_STATUSES.indexOf(
                order.status
              );

            return `
              <span
                style="
                  padding:5px 7px;
                  border-radius:5px;
                  font-size:10px;
                  font-weight:800;
                  background:${
                    index <= currentIndex
                      ? "#dbeafe"
                      : "#f1f5f9"
                  };
                  color:${
                    index <= currentIndex
                      ? "#1d4ed8"
                      : "#64748b"
                  };
                "
              >
                ${escapeHTML(status)}
              </span>
            `;

          }).join("")}

        </div>

      </div>

    `).join("");
}


function formatDate(date){

  try{

    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle:"medium",
        timeStyle:"short"
      }
    ).format(new Date(date));

  }catch{

    return date;
  }
}


/* =========================================================
   AVIS
   ========================================================= */

function getReviews(productId){

  return reviews.filter(
    review =>
      review.productId === productId
  );
}


function addReview(
  productId,
  rating,
  text
){

  rating =
    Number(rating);

  text =
    String(text || "").trim();

  if(
    !productId ||
    rating < 1 ||
    rating > 5 ||
    !text
  ){

    showToast(
      "Complète correctement ton avis"
    );

    return;
  }

  reviews.unshift({

    id:
      crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),

    productId,

    rating,

    text,

    author:
      profile.name ||
      "Client NovaShop",

    date:
      new Date().toISOString()

  });

  save(
    STORAGE.reviews,
    reviews
  );

  renderProductModal(productId);
  renderProducts();

  uploadAccount();

  showToast("Avis ajouté");
}


function renderReviews(productId){

  const list =
    getReviews(productId);

  if(!list.length){

    return `
      <div class="empty">
        Aucun avis pour le moment.
      </div>
    `;

  }

  return list.map(review=>`

    <div class="review">

      <strong>
        ${escapeHTML(review.author)}
      </strong>

      <div class="rating">
        ${stars(review.rating)}
      </div>

      <p style="margin-top:7px">
        ${escapeHTML(review.text)}
      </p>

      <small>
        ${formatDate(review.date)}
      </small>

    </div>

  `).join("");
}


/* =========================================================
   MODAL PRODUIT
   ========================================================= */

function openProduct(productId){

  const product =
    getProduct(productId);

  if(!product){
    return;
  }

  selectedProduct =
    product;

  renderProductModal(productId);

  document
    .getElementById("productModal")
    ?.classList.add("open");

  document
    .getElementById("overlay")
    ?.classList.add("on");
}


function renderProductModal(productId){

  const container =
    document.getElementById("productContent");

  const product =
    getProduct(productId);

  if(!container || !product){
    return;
  }

  const rating =
    averageRating(productId);

  container.innerHTML = `

    <div class="detail">

      <div>

        <div class="detailImg">

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(imageFallback())}'"
          >

        </div>

      </div>

      <div>

        <div class="categoryName">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">
          ${stars(rating)}
          ${
            rating
              ? ` ${rating.toFixed(1)}/5`
              : " Aucun avis"
          }
        </div>

        <div class="detailPrice">
          ${money(product.price)}
        </div>

        <p style="line-height:1.6;color:#4b5563">
          ${escapeHTML(product.description)}
        </p>

        <button
          class="btn primary"
          style="margin-top:20px;width:100%"
          data-detail-add="${product.id}"
        >
          Ajouter au panier
        </button>

      </div>

    </div>

    <div style="margin-top:35px">

      <h3>
        Avis clients
      </h3>

      <div style="margin-top:12px">
        ${renderReviews(productId)}
      </div>

      <div
        class="adminBox"
        style="margin-top:18px"
      >

        <h3>
          Laisser un avis
        </h3>

        <div
          class="form"
          style="margin-top:12px"
        >

          <select id="reviewRating">
            <option value="5">5 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="2">2 étoiles</option>
            <option value="1">1 étoile</option>
          </select>

          <textarea
            id="reviewText"
            placeholder="Ton avis..."
            maxlength="500"
          ></textarea>

          <button
            class="btn primary"
            data-submit-review="${product.id}"
          >
            Publier l'avis
          </button>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function openDashboard(){

  renderDashboard();

  document
    .getElementById("dashboardModal")
    ?.classList.add("open");

  document
    .getElementById("overlay")
    ?.classList.add("on");

}


function renderDashboard(){

  const products =
    document.getElementById("statProducts");

  const orderCount =
    document.getElementById("statOrders");

  const revenue =
    document.getElementById("statRevenue");

  const dashboardOrders =
    document.getElementById("dashboardOrders");

  if(products){
    products.textContent =
      PRODUCTS.length;
  }

  if(orderCount){
    orderCount.textContent =
      orders.length;
  }

  if(revenue){

    revenue.textContent =
      money(
        orders.reduce(
          (sum,order)=>
            sum + Number(order.total || 0),
          0
        )
      );

  }

  if(!dashboardOrders){
    return;
  }

  if(!orders.length){

    dashboardOrders.innerHTML = `
      <div class="empty">
        Aucune commande.
      </div>
    `;

    return;
  }

  dashboardOrders.innerHTML =
    orders.map(order=>`

      <div class="order">

        <div class="orderTop">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <select
            data-order-status="${escapeHTML(order.id)}"
          >

            ${ORDER_STATUSES.map(status=>`

              <option
                value="${escapeHTML(status)}"
                ${
                  status === order.status
                    ? "selected"
                    : ""
                }
              >
                ${escapeHTML(status)}
              </option>

            `).join("")}

          </select>

        </div>

        <p style="margin-top:8px">
          ${escapeHTML(order.city)}
        </p>

        <p style="margin-top:5px">
          ${money(order.total)}
        </p>

      </div>

    `).join("");
}


function updateOrderStatus(orderId,status){

  const order =
    orders.find(
      entry => entry.id === orderId
    );

  if(!order){
    return;
  }

  order.status =
    status;

  save(
    STORAGE.orders,
    orders
  );

  renderOrders();
  renderDashboard();

  uploadAccount();

  showToast(
    `Commande ${orderId} mise à jour`
  );
}


/* =========================================================
   SUPPRESSION DES DONNÉES
   ========================================================= */

async function deleteAllData(){

  const confirmed =
    confirm(
      "Supprimer toutes les données NovaShop de ce compte ?"
    );

  if(!confirmed){
    return;
  }

  cart = [];
  favorites = [];
  orders = [];
  reviews = [];
  city = "";

  profile = {
    name:"",
    email:""
  };

  saveEverything();

  if(firebaseUser && firebaseDB){

    try{

      await firebaseDB
        .collection("users")
        .doc(firebaseUser.uid)
        .delete();

    }catch(error){

      console.warn(
        "Suppression cloud impossible",
        error
      );

    }

  }

  renderAll();

  showToast(
    "Toutes les données ont été supprimées"
  );

}


/* =========================================================
   COMPTEURS
   ========================================================= */

function updateCounters(){

  const cartCounter =
    document.getElementById("cartCounter");

  const favoritesCounter =
    document.getElementById("favoritesCounter");

  if(cartCounter){
    cartCounter.textContent =
      cartCount();
  }

  if(favoritesCounter){
    favoritesCounter.textContent =
      favorites.length;
  }
}


/* =========================================================
   DRAWERS
   ========================================================= */

function openDrawer(id){

  document
    .getElementById(id)
    ?.classList.add("open");

  document
    .getElementById("overlay")
    ?.classList.add("on");

}


function closeEverything(){

  document
    .querySelectorAll(
      ".drawer.open,.modal.open"
    )
    .forEach(element=>{
      element.classList.remove("open");
    });

  document
    .getElementById("overlay")
    ?.classList.remove("on");

}


/* =========================================================
   RECHERCHE
   ========================================================= */

function handleSearch(value){

  currentSearch =
    value;

  currentPage = 1;

  renderProducts();
}


/* =========================================================
   ÉVÉNEMENTS
   ========================================================= */

document.addEventListener(
  "click",
  event=>{

    const category =
      event.target.closest(
        "[data-category]"
      );

    if(category){

      selectCategory(
        category.dataset.category
      );

      return;
    }


    const add =
      event.target.closest(
        "[data-add]"
      );

    if(add){

      event.stopPropagation();

      addToCart(
        add.dataset.add
      );

      return;
    }


    const favorite =
      event.target.closest(
        "[data-favorite]"
      );

    if(favorite){

      event.stopPropagation();

      toggleFavorite(
        favorite.dataset.favorite
      );

      return;
    }


    const product =
      event.target.closest(
        "[data-product]"
      );

    if(product){

      openProduct(
        product.dataset.product
      );

      return;
    }


    const minus =
      event.target.closest(
        "[data-qty-minus]"
      );

    if(minus){

      changeQuantity(
        minus.dataset.qtyMinus,
        -1
      );

      return;
    }


    const plus =
      event.target.closest(
        "[data-qty-plus]"
      );

    if(plus){

      changeQuantity(
        plus.dataset.qtyPlus,
        1
      );

      return;
    }


    const remove =
      event.target.closest(
        "[data-remove]"
      );

    if(remove){

      removeFromCart(
        remove.dataset.remove
      );

      return;
    }


    const favoriteRemove =
      event.target.closest(
        "[data-favorite-remove]"
      );

    if(favoriteRemove){

      toggleFavorite(
        favoriteRemove.dataset.favoriteRemove
      );

      return;
    }


    const detailAdd =
      event.target.closest(
        "[data-detail-add]"
      );

    if(detailAdd){

      addToCart(
        detailAdd.dataset.detailAdd
      );

      return;
    }


    const submitReview =
      event.target.closest(
        "[data-submit-review]"
      );

    if(submitReview){

      const rating =
        document.getElementById(
          "reviewRating"
        )?.value;

      const text =
        document.getElementById(
          "reviewText"
        )?.value;

      addReview(
        submitReview.dataset.submitReview,
        rating,
        text
      );

      return;
    }


    const page =
      event.target.closest(
        "[data-page]"
      );

    if(page){

      currentPage =
        Number(page.dataset.page);

      renderProducts();

      document
        .getElementById("productsSection")
        ?.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      return;
    }


    const orderStatus =
      event.target.closest(
        "[data-order-status]"
      );

    if(
      orderStatus &&
      event.type === "change"
    ){

      updateOrderStatus(
        orderStatus.dataset.orderStatus,
        orderStatus.value
      );

    }

  }
);


/*
  Les changements de statut sont gérés ici
  car change ne remonte pas toujours comme click.
*/

document.addEventListener(
  "change",
  event=>{

    const status =
      event.target.closest(
        "[data-order-status]"
      );

    if(status){

      updateOrderStatus(
        status.dataset.orderStatus,
        status.value
      );

    }

  }
);


document
  .getElementById("searchInput")
  ?.addEventListener(
    "input",
    event=>{
      handleSearch(
        event.target.value
      );
    }
  );


document
  .getElementById("sortSelect")
  ?.addEventListener(
    "change",
    event=>{

      currentSort =
        event.target.value;

      currentPage = 1;

      renderProducts();

    }
  );


document
  .getElementById("homeButton")
  ?.addEventListener(
    "click",
    ()=>{

      currentCategory = "Tous";
      currentSearch = "";
      currentPage = 1;

      const search =
        document.getElementById(
          "searchInput"
        );

      if(search){
        search.value = "";
      }

      renderCategories();
      renderProducts();

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

    }
  );


document
  .getElementById("shopButton")
  ?.addEventListener(
    "click",
    ()=>{

      document
        .getElementById("productsSection")
        ?.scrollIntoView({
          behavior:"smooth"
        });

    }
  );


document
  .getElementById("cartButton")
  ?.addEventListener(
    "click",
    ()=>{

      renderCart();

      openDrawer(
        "cartDrawer"
      );

    }
  );


document
  .getElementById("favoritesButton")
  ?.addEventListener(
    "click",
    ()=>{

      renderFavorites();

      openDrawer(
        "favoritesDrawer"
      );

    }
  );


document
  .getElementById("accountButton")
  ?.addEventListener(
    "click",
    ()=>{

      openAccount();

    }
  );


document
  .getElementById("saveCityButton")
  ?.addEventListener(
    "click",
    saveCity
  );


document
  .getElementById("checkoutButton")
  ?.addEventListener(
    "click",
    createOrder
  );


document
  .getElementById("dashboardButton")
  ?.addEventListener(
    "click",
    openDashboard
  );


document
  .getElementById("deleteDataButton")
  ?.addEventListener(
    "click",
    deleteAllData
  );


document
  .getElementById("overlay")
  ?.addEventListener(
    "click",
    closeEverything
  );


document
  .querySelectorAll("[data-close]")
  .forEach(button=>{

    button.addEventListener(
      "click",
      closeEverything
    );

  });


document.addEventListener(
  "keydown",
  event=>{

    if(event.key === "Escape"){
      closeEverything();
    }

  }
);


/* =========================================================
   RENDU GLOBAL
   ========================================================= */

function renderAll(){

  renderCategories();
  renderProducts();
  renderCart();
  renderFavorites();
  renderOrders();
  renderDashboard();
  updateCounters();

}


function init(){

  renderAll();

  /*
    Chargement Firebase en arrière-plan.
    Le site reste utilisable immédiatement.
  */

  loadFirebase();

}


init();


/* =========================================================
   API GLOBALE
   ========================================================= */

window.NovaShop = {

  products:PRODUCTS,

  get cart(){
    return cart;
  },

  get favorites(){
    return favorites;
  },

  get orders(){
    return orders;
  },

  addToCart,

  removeFromCart,

  changeQuantity,

  toggleFavorite,

  createOrder,

  addReview,

  saveCity,

  createAccount,

  loginAccount,

  logoutAccount,

  uploadAccount,

  syncFromCloud,

  deleteAllData,

  openProduct,

  openAccount,

  openDashboard

};
(() => {
  "use strict";

  /* =====================================================
     NOVASHOP FINAL
     Stock • promos • notifications • responsive polish
     ===================================================== */

  const NS = window.NovaShop || {};

  /* -----------------------------------------------------
     STOCK
     ----------------------------------------------------- */

  const STOCK_KEY = "novashop_stock";
  const PROMO_KEY = "novashop_promos";
  const NOTIF_KEY = "novashop_notifications";

  const defaultStock = {};

  if (Array.isArray(NS.products)) {
    NS.products.forEach(product => {
      defaultStock[product.id] =
        Math.floor(3 + Math.random() * 25);
    });
  }

  let stock = load(STOCK_KEY, defaultStock);

  let promotions = load(PROMO_KEY, {
    "cpu-9600x": 199.99,
    "ram-corsair-32": 89.99,
    "ssd-990-1tb": 79.99,
    "mouse-superlight2": 129.99
  });

  let notifications = load(
    NOTIF_KEY,
    []
  );


  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw);

    } catch {
      return fallback;
    }
  }


  function save(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }


  /* -----------------------------------------------------
     PRIX
     ----------------------------------------------------- */

  function getProduct(productId) {

    return NS.products?.find(
      product => product.id === productId
    );

  }


  function getPrice(product) {

    if (!product) {
      return 0;
    }

    if (
      promotions[product.id] &&
      promotions[product.id] < product.price
    ) {
      return promotions[product.id];
    }

    return product.price;
  }


  function formatMoney(value) {

    return new Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR"
      }
    ).format(value);

  }


  function getStock(productId) {

    const value =
      Number(stock[productId]);

    return Number.isFinite(value)
      ? Math.max(0, value)
      : 0;

  }


  function stockLabel(quantity) {

    if (quantity <= 0) {
      return `
        <span style="
          color:#dc2626;
          font-weight:800;
        ">
          Rupture de stock
        </span>
      `;
    }

    if (quantity <= 3) {
      return `
        <span style="
          color:#d97706;
          font-weight:800;
        ">
          Plus que ${quantity}
        </span>
      `;
    }

    return `
      <span style="
        color:#16a34a;
        font-weight:700;
      ">
        En stock
      </span>
    `;
  }


  /* -----------------------------------------------------
     NOTIFICATIONS
     ----------------------------------------------------- */

  function addNotification(
    title,
    message,
    type = "info"
  ) {

    notifications.unshift({
      id:
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .slice(2),

      title,
      message,
      type,

      date:
        new Date().toISOString(),

      read:false
    });

    notifications =
      notifications.slice(0, 50);

    save(
      NOTIF_KEY,
      notifications
    );

    renderNotifications();

  }


  function renderNotifications() {

    let box =
      document.getElementById(
        "novaNotifications"
      );

    if (!box) {
      createNotificationPanel();

      box =
        document.getElementById(
          "novaNotifications"
        );
    }

    if (!box) {
      return;
    }

    const unread =
      notifications.filter(
        notification =>
          !notification.read
      ).length;

    const content =
      notifications.length
        ? notifications.map(
            notification => `
              <div style="
                padding:12px 0;
                border-bottom:1px solid #e5e7eb;
                opacity:${notification.read ? ".65" : "1"};
              ">

                <strong>
                  ${escapeHTML(
                    notification.title
                  )}
                </strong>

                <p style="
                  margin-top:4px;
                  color:#6b7280;
                  font-size:13px;
                  line-height:1.4;
                ">
                  ${escapeHTML(
                    notification.message
                  )}
                </p>

                <small style="
                  color:#9ca3af;
                ">
                  ${formatDate(
                    notification.date
                  )}
                </small>

              </div>
            `
          ).join("")
        : `
          <div style="
            text-align:center;
            padding:35px 10px;
            color:#6b7280;
          ">
            Aucune notification
          </div>
        `;

    box.innerHTML = `
      <div style="
        padding:18px;
        border-bottom:1px solid #e5e7eb;
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">

        <strong>
          Notifications
        </strong>

        ${
          unread
            ? `
              <button
                id="markNotificationsRead"
                style="
                  border:0;
                  background:none;
                  color:#2563eb;
                  cursor:pointer;
                  font-size:12px;
                "
              >
                Tout lire
              </button>
            `
            : ""
        }

      </div>

      <div style="
        padding:0 18px;
        max-height:420px;
        overflow:auto;
      ">
        ${content}
      </div>
    `;

    updateNotificationBadge();

  }


  function markNotificationsRead() {

    notifications =
      notifications.map(
        notification => ({
          ...notification,
          read:true
        })
      );

    save(
      NOTIF_KEY,
      notifications
    );

    renderNotifications();

  }


  function updateNotificationBadge() {

    const button =
      document.getElementById(
        "notificationButton"
      );

    if (!button) {
      return;
    }

    const unread =
      notifications.filter(
        notification =>
          !notification.read
      ).length;

    let badge =
      button.querySelector(
        ".nova-notification-count"
      );

    if (unread <= 0) {

      if (badge) {
        badge.remove();
      }

      return;
    }

    if (!badge) {

      badge =
        document.createElement("span");

      badge.className =
        "nova-notification-count";

      badge.style.cssText = `
        position:absolute;
        right:-5px;
        top:-5px;
        min-width:18px;
        height:18px;
        padding:0 4px;
        border-radius:50px;
        background:#2563eb;
        color:white;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:10px;
        font-weight:900;
      `;

      button.appendChild(badge);

    }

    badge.textContent =
      unread > 99
        ? "99+"
        : unread;

  }


  function createNotificationPanel() {

    if (
      document.getElementById(
        "novaNotifications"
      )
    ) {
      return;
    }

    const panel =
      document.createElement("aside");

    panel.id =
      "novaNotifications";

    panel.style.cssText = `
      position:fixed;
      top:72px;
      right:20px;
      width:min(390px,calc(100vw - 40px));
      max-height:520px;
      overflow:hidden;
      background:white;
      border:1px solid #e5e7eb;
      border-radius:10px;
      box-shadow:0 18px 50px rgba(0,0,0,.14);
      z-index:3500;
      display:none;
    `;

    document.body.appendChild(panel);

  }


  function toggleNotifications() {

    createNotificationPanel();

    const panel =
      document.getElementById(
        "novaNotifications"
      );

    if (!panel) {
      return;
    }

    const visible =
      panel.style.display === "block";

    panel.style.display =
      visible
        ? "none"
        : "block";

    if (!visible) {
      renderNotifications();
    }

  }


  /* -----------------------------------------------------
     STYLE FINAL
     ----------------------------------------------------- */

  function addFinalStyles() {

    if (
      document.getElementById(
        "novashop-final-style"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "novashop-final-style";

    style.textContent = `

      .nova-sale {
        position:absolute;
        left:10px;
        bottom:10px;
        background:#dc2626;
        color:white;
        padding:5px 8px;
        border-radius:5px;
        font-size:10px;
        font-weight:900;
        z-index:4;
      }

      .nova-old-price {
        color:#9ca3af;
        text-decoration:line-through;
        font-size:13px;
        margin-right:5px;
      }

      .nova-stock {
        margin-top:7px;
        font-size:11px;
      }

      .nova-toast-progress {
        height:2px;
        width:100%;
        margin-top:8px;
        background:#374151;
        overflow:hidden;
      }

      .nova-toast-progress span {
        display:block;
        height:100%;
        width:100%;
        background:#fff;
        animation:novaToastProgress 2.2s linear forwards;
      }

      @keyframes novaToastProgress {
        from { width:100%; }
        to { width:0%; }
      }

      .nova-buy-disabled {
        opacity:.45 !important;
        cursor:not-allowed !important;
      }

      @media(max-width:650px){

        #novaNotifications {
          top:66px !important;
          right:10px !important;
          width:calc(100vw - 20px) !important;
        }

      }

      @media(prefers-reduced-motion:reduce){

        * {
          scroll-behavior:auto !important;
          transition:none !important;
          animation:none !important;
        }

      }

    `;

    document.head.appendChild(style);

  }


  /* -----------------------------------------------------
     HELPERS
     ----------------------------------------------------- */

  function escapeHTML(value) {

    return String(value ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");

  }


  function formatDate(date) {

    try {

      return new Intl.DateTimeFormat(
        "fr-FR",
        {
          dateStyle:"medium",
          timeStyle:"short"
        }
      ).format(
        new Date(date)
      );

    } catch {

      return String(date);

    }

  }


  /* -----------------------------------------------------
     PATCH AFFICHAGE PRODUITS
     ----------------------------------------------------- */

  function enhanceProducts() {

    const products =
      document.querySelectorAll(
        ".product"
      );

    products.forEach(card => {

      const productId =
        card.dataset.product;

      const product =
        getProduct(productId);

      if (!product) {
        return;
      }

      const quantity =
        getStock(productId);

      const price =
        getPrice(product);

      const priceElement =
        card.querySelector(".price");

      if (
        priceElement &&
        price !== product.price
      ) {

        priceElement.innerHTML = `
          <span class="nova-old-price">
            ${formatMoney(product.price)}
          </span>
          ${formatMoney(price)}
        `;

      }

      const pic =
        card.querySelector(".pic");

      if (
        pic &&
        price !== product.price &&
        !pic.querySelector(".nova-sale")
      ) {

        const sale =
          document.createElement("span");

        sale.className =
          "nova-sale";

        sale.textContent =
          "PROMO";

        pic.appendChild(sale);

      }

      const info =
        card.querySelector(".info");

      if (!info) {
        return;
      }

      let stockElement =
        info.querySelector(
          ".nova-stock"
        );

      if (!stockElement) {

        stockElement =
          document.createElement("div");

        stockElement.className =
          "nova-stock";

        const rating =
          info.querySelector(
            ".rating"
          );

        if (rating) {
          rating.insertAdjacentElement(
            "afterend",
            stockElement
          );
        } else {
          info.appendChild(
            stockElement
          );
        }

      }

      stockElement.innerHTML =
        stockLabel(quantity);

      const add =
        card.querySelector(
          "[data-add]"
        );

      if (add) {

        if (quantity <= 0) {

          add.disabled = true;

          add.classList.add(
            "nova-buy-disabled"
          );

          add.textContent =
            "×";

        } else {

          add.disabled = false;

          add.classList.remove(
            "nova-buy-disabled"
          );

          add.textContent =
            "+";

        }

      }

    });

  }


  /* -----------------------------------------------------
     PATCH PANIER
     ----------------------------------------------------- */

  function validateCartStock() {

    if (!Array.isArray(NS.cart)) {
      return;
    }

    let changed = false;

    NS.cart.forEach(item => {

      const available =
        getStock(item.id);

      if (
        item.quantity > available
      ) {

        item.quantity =
          available;

        changed = true;

      }

    });

    if (changed) {

      NS.cart =
        NS.cart.filter(
          item => item.quantity > 0
        );

      try {
        localStorage.setItem(
          "novashop_cart",
          JSON.stringify(NS.cart)
        );
      } catch {}

    }

  }


  /* -----------------------------------------------------
     INTERCEPTION AJOUT PANIER
     ----------------------------------------------------- */

  document.addEventListener(
    "click",
    event => {

      const addButton =
        event.target.closest(
          "[data-add]"
        );

      if (!addButton) {
        return;
      }

      const productId =
        addButton.dataset.add;

      const available =
        getStock(productId);

      if (available <= 0) {

        event.preventDefault();
        event.stopImmediatePropagation();

        addNotification(
          "Produit indisponible",
          "Ce produit est actuellement en rupture de stock.",
          "stock"
        );

        return;

      }

      /*
        On réduit le stock après l'ajout.
        Le script principal s'occupe du panier.
      */

      setTimeout(() => {

        const cart =
          load(
            "novashop_cart",
            []
          );

        const item =
          cart.find(
            entry =>
              entry.id === productId
          );

        if (item) {

          const previousStock =
            getStock(productId);

          /*
            On ne descend pas sous zéro.
          */

          stock[productId] =
            Math.max(
              0,
              previousStock - 1
            );

          save(
            STOCK_KEY,
            stock
          );

          if (
            getStock(productId) <= 3 &&
            getStock(productId) > 0
          ) {

            addNotification(
              "Stock faible",
              `${getProduct(productId)?.name || "Produit"} : plus que ${getStock(productId)} en stock.`,
              "stock"
            );

          }

          enhanceProducts();

        }

      },50);

    },
    true
  );


  /* -----------------------------------------------------
     COMMANDE
     ----------------------------------------------------- */

  const originalCreateOrder =
    NS.createOrder;

  if (
    typeof originalCreateOrder ===
    "function"
  ) {

    NS.createOrder =
      function enhancedCreateOrder() {

        validateCartStock();

        const cart =
          load(
            "novashop_cart",
            []
          );

        if (!cart.length) {

          if (
            typeof originalCreateOrder ===
            "function"
          ) {
            return originalCreateOrder();
          }

          return;
        }

        const items =
          cart.map(
            item => {

              const product =
                getProduct(item.id);

              return {
                id:item.id,
                quantity:item.quantity,
                price:getPrice(product)
              };

            }
          );

        /*
          Le système principal crée
          réellement la commande.
        */

        const result =
          originalCreateOrder();

        items.forEach(item => {

          const available =
            getStock(item.id);

          stock[item.id] =
            Math.max(
              0,
              available - item.quantity
            );

        });

        save(
          STOCK_KEY,
          stock
        );

        addNotification(
          "Commande créée",
          "Ta commande NovaShop a bien été enregistrée.",
          "order"
        );

        enhanceProducts();

        return result;

      };

  }


  /* -----------------------------------------------------
     BOUTON NOTIFICATIONS
     ----------------------------------------------------- */

  function createNotificationButton() {

    if (
      document.getElementById(
        "notificationButton"
      )
    ) {
      return;
    }

    const actions =
      document.querySelector(
        ".actions"
      );

    if (!actions) {
      return;
    }

    const button =
      document.createElement("button");

    button.id =
      "notificationButton";

    button.className =
      "icon";

    button.title =
      "Notifications";

    button.style.position =
      "relative";

    button.innerHTML =
      "🔔";

    actions.insertBefore(
      button,
      actions.firstChild
    );

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        toggleNotifications();

      }
    );

    updateNotificationBadge();

  }


  /* -----------------------------------------------------
     RECHERCHE RAPIDE
     ----------------------------------------------------- */

  function improveSearch() {

    const input =
      document.getElementById(
        "searchInput"
      );

    if (!input) {
      return;
    }

    let suggestions =
      document.getElementById(
        "novaSearchSuggestions"
      );

    if (!suggestions) {

      suggestions =
        document.createElement("div");

      suggestions.id =
        "novaSearchSuggestions";

      suggestions.style.cssText = `
        position:absolute;
        left:0;
        right:0;
        top:48px;
        background:#fff;
        border:1px solid #e5e7eb;
        border-radius:8px;
        box-shadow:0 15px 40px rgba(0,0,0,.1);
        overflow:hidden;
        z-index:2500;
        display:none;
      `;

      const wrapper =
        input.parentElement;

      if (wrapper) {

        wrapper.style.position =
          "relative";

        wrapper.appendChild(
          suggestions
        );

      }

    }

    input.addEventListener(
      "input",
      () => {

        const query =
          input.value
            .trim()
            .toLowerCase();

        if (!query) {

          suggestions.style.display =
            "none";

          return;

        }

        const matches =
          (NS.products || [])
            .filter(product =>
              product.name
                .toLowerCase()
                .includes(query) ||
              product.brand
                .toLowerCase()
                .includes(query)
            )
            .slice(0,5);

        if (!matches.length) {

          suggestions.innerHTML = `
            <div style="
              padding:14px;
              color:#6b7280;
            ">
              Aucun produit trouvé
            </div>
          `;

        } else {

          suggestions.innerHTML =
            matches.map(
              product => `
                <button
                  data-search-product="${product.id}"
                  style="
                    width:100%;
                    padding:11px 13px;
                    border:0;
                    background:#fff;
                    text-align:left;
                    cursor:pointer;
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                  "
                >
                  <span>
                    ${escapeHTML(
                      product.name
                    )}
                  </span>

                  <strong>
                    ${formatMoney(
                      getPrice(product)
                    )}
                  </strong>

                </button>
              `
            ).join("");

        }

        suggestions.style.display =
          "block";

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      const productButton =
        event.target.closest(
          "[data-search-product]"
        );

      if (productButton) {

        const productId =
          productButton.dataset
            .searchProduct;

        if (
          typeof NS.openProduct ===
          "function"
        ) {
          NS.openProduct(
            productId
          );
        }

        const suggestions =
          document.getElementById(
            "novaSearchSuggestions"
          );

        if (suggestions) {
          suggestions.style.display =
            "none";
        }

        return;
      }

      const suggestions =
        document.getElementById(
          "novaSearchSuggestions"
        );

      const input =
        document.getElementById(
          "searchInput"
        );

      if (
        suggestions &&
        input &&
        !suggestions.contains(
          event.target
        ) &&
        event.target !== input
      ) {

        suggestions.style.display =
          "none";

      }

      const panel =
        document.getElementById(
          "novaNotifications"
        );

      const notificationButton =
        document.getElementById(
          "notificationButton"
        );

      if (
        panel &&
        notificationButton &&
        !panel.contains(event.target) &&
        !notificationButton.contains(
          event.target
        )
      ) {

        panel.style.display =
          "none";

      }

    }
  );


  document.addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "markNotificationsRead"
      ) {

        markNotificationsRead();

      }

    }
  );


  /* -----------------------------------------------------
     PATCH PRODUCT MODAL
     ----------------------------------------------------- */

  document.addEventListener(
    "click",
    event => {

      const add =
        event.target.closest(
          "[data-detail-add]"
        );

      if (!add) {
        return;
      }

      const productId =
        add.dataset.detailAdd;

      const quantity =
        getStock(productId);

      if (quantity <= 0) {

        event.preventDefault();
        event.stopImmediatePropagation();

        addNotification(
          "Rupture de stock",
          "Ce produit ne peut pas être ajouté pour le moment.",
          "stock"
        );

        return;

      }

      setTimeout(() => {

        const current =
          getStock(productId);

        stock[productId] =
          Math.max(
            0,
            current - 1
          );

        save(
          STOCK_KEY,
          stock
        );

        enhanceProducts();

      },50);

    },
    true
  );


  /* -----------------------------------------------------
     FINAL INIT
     ----------------------------------------------------- */

  addFinalStyles();

  createNotificationPanel();

  createNotificationButton();

  improveSearch();

  validateCartStock();

  renderNotifications();

  setTimeout(
    enhanceProducts,
    100
  );

  setTimeout(
    enhanceProducts,
    600
  );

  setTimeout(
    enhanceProducts,
    1500
  );


  /* -----------------------------------------------------
     API FINAL
     ----------------------------------------------------- */

  NS.stock = stock;
  NS.promotions = promotions;
  NS.notifications = notifications;

  NS.getStock =
    getStock;

  NS.getPrice =
    getPrice;

  NS.addNotification =
    addNotification;

  NS.toggleNotifications =
    toggleNotifications;

  NS.enhanceProducts =
    enhanceProducts;

  window.NovaShop =
    NS;

})();
