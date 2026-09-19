"use strict";

/* ============================================================
   NOVASHOP
   JavaScript principal
   Compatible avec le index.html précédent
   ============================================================ */

/* ============================================================
   PRODUITS
   ============================================================ */

const PRODUCTS = [
  {
    id: "amd-9600x",
    name: "Ryzen 5 9600X",
    brand: "AMD",
    category: "Processeurs",
    price: 279.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description: "Processeur AMD Ryzen 5 9600X pour plateforme AM5."
  },

  {
    id: "corsair-vengeance-32",
    name: "Vengeance RGB 32 Go DDR5-6000 CL38",
    brand: "Corsair",
    category: "RAM",
    price: 109.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description: "Kit mémoire Corsair Vengeance RGB 32 Go DDR5."
  },

  {
    id: "kingston-fury-32",
    name: "FURY Beast RGB 32 Go DDR5-5600 CL36",
    brand: "Kingston",
    category: "RAM",
    price: 104.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description: "Kit Kingston FURY Beast RGB 32 Go DDR5."
  },

  {
    id: "samsung-990-1tb",
    name: "990 PRO 1 To",
    brand: "Samsung",
    category: "SSD",
    price: 99.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 1 To."
  },

  {
    id: "samsung-990-2tb",
    name: "990 PRO 2 To",
    brand: "Samsung",
    category: "SSD",
    price: 179.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 2 To."
  },

  {
    id: "corsair-rm850x",
    name: "RM850x",
    brand: "Corsair",
    category: "Alimentations",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description: "Alimentation Corsair RM850x de 850 W."
  },

  {
    id: "corsair-5000d",
    name: "5000D Airflow",
    brand: "Corsair",
    category: "Boîtiers",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description: "Boîtier Corsair 5000D Airflow."
  },

  {
    id: "arctic-lf3-360",
    name: "Liquid Freezer III 360",
    brand: "ARCTIC",
    category: "Refroidissement",
    price: 119.99,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description: "Watercooling AIO ARCTIC Liquid Freezer III 360."
  },

  {
    id: "samsung-g6",
    name: "Odyssey OLED G6",
    brand: "Samsung",
    category: "Écrans",
    price: 699.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description: "Écran gaming Samsung Odyssey OLED G6."
  },

  {
    id: "logitech-pro-x-tkl",
    name: "G PRO X TKL",
    brand: "Logitech",
    category: "Claviers",
    price: 189.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description: "Clavier gaming Logitech G PRO X TKL."
  },

  {
    id: "logitech-superlight-2",
    name: "G PRO X SUPERLIGHT 2",
    brand: "Logitech",
    category: "Souris",
    price: 159.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description: "Souris gaming Logitech G PRO X SUPERLIGHT 2."
  },

  {
    id: "elgato-wave-3",
    name: "Wave:3",
    brand: "Elgato",
    category: "Microphones",
    price: 159.99,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description: "Microphone USB Elgato Wave:3."
  },

  {
    id: "sony-dualsense",
    name: "DualSense Wireless Controller",
    brand: "Sony",
    category: "Manettes",
    price: 74.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description: "Manette sans fil Sony DualSense."
  }
];

/* ============================================================
   CONFIGURATION
   ============================================================ */

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  city: "novashop_city",
  orders: "novashop_orders"
};

const PER_PAGE = 8;

/* ============================================================
   ÉTAT
   ============================================================ */

const state = {
  search: "",
  category: "Tous",
  sort: "featured",
  page: 1,

  cart: readStorageArray(STORAGE.cart),
  favorites: readStorageArray(STORAGE.favorites),
  orders: readStorageArray(STORAGE.orders),
  city: localStorage.getItem(STORAGE.city) || ""
};

/* ============================================================
   OUTILS
   ============================================================ */

function readStorageArray(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}

function saveStorage() {
  localStorage.setItem(
    STORAGE.cart,
    JSON.stringify(state.cart)
  );

  localStorage.setItem(
    STORAGE.favorites,
    JSON.stringify(state.favorites)
  );

  localStorage.setItem(
    STORAGE.orders,
    JSON.stringify(state.orders)
  );

  localStorage.setItem(
    STORAGE.city,
    state.city
  );
}

function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function productById(id) {
  return PRODUCTS.find(product => product.id === id);
}

function cartCount() {
  return state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function cartTotal() {
  return state.cart.reduce((total, item) => {
    const product = productById(item.id);

    if (!product) {
      return total;
    }

    return total + product.price * item.quantity;
  }, 0);
}

/* ============================================================
   DOM
   ============================================================ */

const DOM = {
  products: document.getElementById("products"),
  categories: document.getElementById("categories"),
  pagination: document.getElementById("pagination"),

  search: document.getElementById("searchInput"),
  sort: document.getElementById("sortSelect"),

  results: document.getElementById("resultsText"),

  cartButton: document.getElementById("cartButton"),
  cartCounter: document.getElementById("cartCounter"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartContent: document.getElementById("cartContent"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutButton: document.getElementById("checkoutButton"),

  favoritesButton: document.getElementById("favoritesButton"),
  favoritesCounter: document.getElementById("favoritesCounter"),
  favoritesDrawer: document.getElementById("favoritesDrawer"),
  favoritesContent: document.getElementById("favoritesContent"),

  accountButton: document.getElementById("accountButton"),
  accountModal: document.getElementById("accountModal"),
  cityInput: document.getElementById("cityInput"),
  saveCityButton: document.getElementById("saveCityButton"),
  ordersContent: document.getElementById("ordersContent"),
  deleteDataButton: document.getElementById("deleteDataButton"),

  productModal: document.getElementById("productModal"),
  productContent: document.getElementById("productContent"),

  overlay: document.getElementById("overlay"),

  shopButton: document.getElementById("shopButton"),
  heroFavoritesButton: document.getElementById("heroFavoritesButton"),
  homeButton: document.getElementById("homeButton"),

  toast: document.getElementById("toast")
};

/* ============================================================
   TOAST
   ============================================================ */

let toastTimer = null;

function showToast(message) {
  if (!DOM.toast) return;

  DOM.toast.textContent = message;
  DOM.toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    DOM.toast.classList.remove("show");
  }, 1800);
}

/* ============================================================
   CATÉGORIES
   ============================================================ */

function getCategories() {
  return [
    "Tous",
    ...new Set(
      PRODUCTS.map(product => product.category)
    )
  ];
}

function renderCategories() {
  DOM.categories.innerHTML = "";

  getCategories().forEach(category => {
    const button = document.createElement("button");

    button.className =
      "category" +
      (state.category === category ? " active" : "");

    button.type = "button";
    button.textContent = category;
    button.dataset.category = category;

    DOM.categories.appendChild(button);
  });
}

/* ============================================================
   FILTRES
   ============================================================ */

function filteredProducts() {
  let result = [...PRODUCTS];

  const search = state.search
    .trim()
    .toLowerCase();

  if (search) {
    result = result.filter(product => {
      return [
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }

  if (state.category !== "Tous") {
    result = result.filter(
      product =>
        product.category === state.category
    );
  }

  if (state.sort === "priceAsc") {
    result.sort(
      (a, b) => a.price - b.price
    );
  }

  if (state.sort === "priceDesc") {
    result.sort(
      (a, b) => b.price - a.price
    );
  }

  if (state.sort === "nameAsc") {
    result.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name,
          "fr"
        )
    );
  }

  if (state.sort === "nameDesc") {
    result.sort(
      (a, b) =>
        b.name.localeCompare(
          a.name,
          "fr"
        )
    );
  }

  return result;
}

/* ============================================================
   PRODUITS
   ============================================================ */

function renderProducts() {
  const result = filteredProducts();

  const totalPages = Math.max(
    1,
    Math.ceil(result.length / PER_PAGE)
  );

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const start =
    (state.page - 1) * PER_PAGE;

  const visible =
    result.slice(
      start,
      start + PER_PAGE
    );

  DOM.products.innerHTML = "";

  if (!visible.length) {
    DOM.products.innerHTML = `
      <div class="empty">
        <strong>Aucun produit trouvé.</strong>
        <br><br>
        Essaie une autre recherche ou une autre catégorie.
      </div>
    `;
  } else {
    visible.forEach(product => {
      DOM.products.appendChild(
        createProductCard(product)
      );
    });
  }

  DOM.results.textContent =
    result.length === 1
      ? "1 produit disponible"
      : `${result.length} produits disponibles`;

  renderPagination(totalPages);
}

function createProductCard(product) {
  const article =
    document.createElement("article");

  article.className = "product";

  const favorite =
    state.favorites.includes(product.id);

  article.innerHTML = `
    <div class="productImage">

      <span class="brand">
        ${escapeHTML(product.brand)}
      </span>

      <button
        type="button"
        class="heart ${favorite ? "active" : ""}"
        data-action="favorite"
        data-id="${escapeHTML(product.id)}"
        aria-label="Favori"
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

        <span class="productPrice">
          ${money(product.price)}
        </span>

        <button
          type="button"
          class="add"
          data-action="add"
          data-id="${escapeHTML(product.id)}"
          aria-label="Ajouter au panier"
        >
          +
        </button>

      </div>

    </div>
  `;

  return article;
}

/* ============================================================
   PAGINATION
   ============================================================ */

function renderPagination(totalPages) {
  DOM.pagination.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className =
      "page" +
      (page === state.page
        ? " active"
        : "");

    button.textContent = page;
    button.dataset.page = page;

    DOM.pagination.appendChild(button);
  }
}

/* ============================================================
   PANIER
   ============================================================ */

function addToCart(id) {
  const product = productById(id);

  if (!product) {
    return;
  }

  const existing =
    state.cart.find(
      item => item.id === id
    );

  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({
      id,
      quantity: 1
    });
  }

  saveStorage();
  renderCart();
  updateCounters();

  showToast(
    `${product.name} ajouté au panier`
  );
}

function decreaseCart(id) {
  const item =
    state.cart.find(
      entry => entry.id === id
    );

  if (!item) {
    return;
  }

  item.quantity--;

  if (item.quantity <= 0) {
    state.cart =
      state.cart.filter(
        entry => entry.id !== id
      );
  }

  saveStorage();
  renderCart();
  updateCounters();
}

function increaseCart(id) {
  const item =
    state.cart.find(
      entry => entry.id === id
    );

  if (!item) {
    return;
  }

  item.quantity++;

  saveStorage();
  renderCart();
  updateCounters();
}

function removeCart(id) {
  state.cart =
    state.cart.filter(
      item => item.id !== id
    );

  saveStorage();
  renderCart();
  updateCounters();

  showToast("Produit retiré du panier");
}

function renderCart() {
  DOM.cartContent.innerHTML = "";

  if (!state.cart.length) {
    DOM.cartContent.innerHTML = `
      <div class="empty">
        <strong>Ton panier est vide.</strong>
        <br><br>
        Ajoute des produits pour commencer.
      </div>
    `;

    DOM.cartTotal.textContent =
      money(0);

    DOM.checkoutButton.disabled = true;
    DOM.checkoutButton.style.opacity = ".45";

    return;
  }

  DOM.checkoutButton.disabled = false;
  DOM.checkoutButton.style.opacity = "1";

  state.cart.forEach(item => {
    const product =
      productById(item.id);

    if (!product) {
      return;
    }

    const element =
      document.createElement("div");

    element.className = "cartItem";

    element.innerHTML = `
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
        ${money(product.price * item.quantity)}
      </strong>
    `;

    DOM.cartContent.appendChild(element);
  });

  DOM.cartTotal.textContent =
    money(cartTotal());
}

/* ============================================================
   FAVORIS
   ============================================================ */

function toggleFavorite(id) {
  const product =
    productById(id);

  if (!product) {
    return;
  }

  const exists =
    state.favorites.includes(id);

  if (exists) {
    state.favorites =
      state.favorites.filter(
        favoriteId => favoriteId !== id
      );

    showToast("Retiré des favoris");
  } else {
    state.favorites.push(id);

    showToast("Ajouté aux favoris");
  }

  saveStorage();
  updateCounters();
  renderProducts();
  renderFavorites();
}

function renderFavorites() {
  DOM.favoritesContent.innerHTML = "";

  const favorites =
    state.favorites
      .map(id => productById(id))
      .filter(Boolean);

  if (!favorites.length) {
    DOM.favoritesContent.innerHTML = `
      <div class="empty">
        <strong>Aucun favori.</strong>
        <br><br>
        Clique sur ♡ sur un produit pour le sauvegarder.
      </div>
    `;

    return;
  }

  favorites.forEach(product => {
    const element =
      document.createElement("div");

    element.className = "cartItem";

    element.innerHTML = `
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

        <div
          style="
            display:flex;
            gap:6px;
            margin-top:9px;
            flex-wrap:wrap;
          "
        >

          <button
            type="button"
            class="btnSecondary"
            style="min-height:34px;padding:0 10px"
            data-favorite="view"
            data-id="${escapeHTML(product.id)}"
          >
            Voir
          </button>

          <button
            type="button"
            class="btnPrimary"
            style="min-height:34px;padding:0 10px"
            data-favorite="add"
            data-id="${escapeHTML(product.id)}"
          >
            Ajouter
          </button>

        </div>

      </div>

      <button
        type="button"
        class="close"
        data-favorite="remove"
        data-id="${escapeHTML(product.id)}"
      >
        ×
      </button>
    `;

    DOM.favoritesContent.appendChild(element);
  });
}

/* ============================================================
   FICHE PRODUIT
   ============================================================ */

function openProduct(id) {
  const product =
    productById(id);

  if (!product) {
    return;
  }

  const favorite =
    state.favorites.includes(id);

  DOM.productContent.innerHTML = `
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
            ${favorite
              ? "♥ Retirer des favoris"
              : "♡ Ajouter aux favoris"}
          </button>

        </div>

      </div>

    </div>
  `;

  DOM.productModal.classList.add("open");
  DOM.overlay.classList.add("active");
}

/* ============================================================
   COMMANDES
   ============================================================ */

function createOrder() {
  if (!state.cart.length) {
    showToast("Le panier est vide");
    return;
  }

  const order = {
    id:
      "NS-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase(),

    date:
      new Date().toISOString(),

    city:
      state.city ||
      "Ville non renseignée",

    status:
      "En préparation",

    items:
      state.cart.map(item => {
        const product =
          productById(item.id);

        return {
          id: item.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };
      }),

    total:
      cartTotal()
  };

  state.orders.unshift(order);
  state.cart = [];

  saveStorage();

  renderCart();
  renderOrders();
  updateCounters();

  closeEverything();
  openAccount();

  showToast(
    `Commande ${order.id} créée`
  );
}

function renderOrders() {
  DOM.ordersContent.innerHTML = "";

  if (!state.orders.length) {
    DOM.ordersContent.innerHTML = `
      <p>
        Aucune commande enregistrée.
      </p>
    `;

    return;
  }

  state.orders.forEach(order => {
    const element =
      document.createElement("div");

    element.className = "order";

    const date =
      new Date(order.date);

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

        ${date.toLocaleDateString("fr-FR")}

        <br>

        Livraison :
        ${escapeHTML(order.city)}

        <br><br>

        ${items}

        <br>

        <strong>
          Total :
          ${money(order.total)}
        </strong>

      </div>
    `;

    DOM.ordersContent.appendChild(element);
  });
}

/* ============================================================
   COMPTE
   ============================================================ */

function openAccount() {
  DOM.cityInput.value =
    state.city;

  renderOrders();

  DOM.accountModal.classList.add("open");
  DOM.overlay.classList.add("active");
}

function saveCity() {
  state.city =
    DOM.cityInput.value.trim();

  saveStorage();

  showToast(
    state.city
      ? "Ville enregistrée"
      : "Ville supprimée"
  );
}

function deleteAllData() {
  const confirmation =
    window.confirm(
      "Supprimer toutes les données NovaShop de cet appareil ?"
    );

  if (!confirmation) {
    return;
  }

  state.cart = [];
  state.favorites = [];
  state.orders = [];
  state.city = "";

  localStorage.removeItem(
    STORAGE.cart
  );

  localStorage.removeItem(
    STORAGE.favorites
  );

  localStorage.removeItem(
    STORAGE.orders
  );

  localStorage.removeItem(
    STORAGE.city
  );

  DOM.cityInput.value = "";

  renderProducts();
  renderCart();
  renderFavorites();
  renderOrders();
  updateCounters();

  closeEverything();

  showToast(
    "Toutes les données ont été supprimées"
  );
}

/* ============================================================
   PANNEAUX
   ============================================================ */

function openCart() {
  renderCart();

  DOM.cartDrawer.classList.add("open");
  DOM.overlay.classList.add("active");
}

function openFavorites() {
  renderFavorites();

  DOM.favoritesDrawer.classList.add("open");
  DOM.overlay.classList.add("active");
}

function closeEverything() {
  DOM.cartDrawer.classList.remove("open");
  DOM.favoritesDrawer.classList.remove("open");

  DOM.productModal.classList.remove("open");
  DOM.accountModal.classList.remove("open");

  DOM.overlay.classList.remove("active");
}

/* ============================================================
   COMPTEURS
   ============================================================ */

function updateCounters() {
  DOM.cartCounter.textContent =
    cartCount();

  DOM.favoritesCounter.textContent =
    state.favorites.length;
}

/* ============================================================
   RECHERCHE
   ============================================================ */

DOM.search.addEventListener(
  "input",
  event => {
    state.search =
      event.target.value;

    state.page = 1;

    renderProducts();
  }
);

/* ============================================================
   TRI
   ============================================================ */

DOM.sort.addEventListener(
  "change",
  event => {
    state.sort =
      event.target.value;

    state.page = 1;

    renderProducts();
  }
);

/* ============================================================
   CATÉGORIES
   ============================================================ */

DOM.categories.addEventListener(
  "click",
  event => {
    const button =
      event.target.closest(
        "[data-category]"
      );

    if (!button) {
      return;
    }

    state.category =
      button.dataset.category;

    state.page = 1;

    renderCategories();
    renderProducts();
  }
);

/* ============================================================
   CLIC PRODUITS
   ============================================================ */

DOM.products.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-action]"
      );

    if (button) {

      const id =
        button.dataset.id;

      const action =
        button.dataset.action;

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
      event.target.closest(
        ".product"
      );

    if (!card) {
      return;
    }

    const buttonInside =
      card.querySelector(
        "[data-action='add']"
      );

    if (!buttonInside) {
      return;
    }

    openProduct(
      buttonInside.dataset.id
    );
  }
);

/* ============================================================
   PAGINATION
   ============================================================ */

DOM.pagination.addEventListener(
  "click",
  event => {
    const button =
      event.target.closest(
        "[data-page]"
      );

    if (!button) {
      return;
    }

    state.page =
      Number(button.dataset.page);

    renderProducts();

    document
      .getElementById("productsSection")
      .scrollIntoView({
        behavior: "smooth"
      });
  }
);

/* ============================================================
   PANIER CLICS
   ============================================================ */

DOM.cartContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-cart]"
      );

    if (!button) {
      return;
    }

    const id =
      button.dataset.id;

    const action =
      button.dataset.cart;

    if (action === "plus") {
      increaseCart(id);
    }

    if (action === "minus") {
      decreaseCart(id);
    }

    if (action === "remove") {
      removeCart(id);
    }
  }
);

/* ============================================================
   FAVORIS CLICS
   ============================================================ */

DOM.favoritesContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-favorite]"
      );

    if (!button) {
      return;
    }

    const id =
      button.dataset.id;

    const action =
      button.dataset.favorite;

    if (action === "remove") {
      toggleFavorite(id);
    }

    if (action === "add") {
      addToCart(id);
    }

    if (action === "view") {
      openProduct(id);
    }
  }
);

/* ============================================================
   MODAL PRODUIT
   ============================================================ */

DOM.productContent.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-detail]"
      );

    if (!button) {
      return;
    }

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

/* ============================================================
   BOUTONS HEADER
   ============================================================ */

DOM.cartButton.addEventListener(
  "click",
  openCart
);

DOM.favoritesButton.addEventListener(
  "click",
  openFavorites
);

DOM.accountButton.addEventListener(
  "click",
  openAccount
);

/* ============================================================
   HERO
   ============================================================ */

DOM.shopButton.addEventListener(
  "click",
  () => {

    document
      .getElementById("productsSection")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);

DOM.heroFavoritesButton.addEventListener(
  "click",
  openFavorites
);

/* ============================================================
   LOGO
   ============================================================ */

DOM.homeButton.addEventListener(
  "click",
  event => {

    event.preventDefault();

    state.search = "";
    state.category = "Tous";
    state.sort = "featured";
    state.page = 1;

    DOM.search.value = "";
    DOM.sort.value = "featured";

    renderCategories();
    renderProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

/* ============================================================
   COMMANDER
   ============================================================ */

DOM.checkoutButton.addEventListener(
  "click",
  createOrder
);

/* ============================================================
   VILLE
   ============================================================ */

DOM.saveCityButton.addEventListener(
  "click",
  saveCity
);

/* ============================================================
   SUPPRESSION DONNÉES
   ============================================================ */

DOM.deleteDataButton.addEventListener(
  "click",
  deleteAllData
);

/* ============================================================
   FERMETURE
   ============================================================ */

DOM.overlay.addEventListener(
  "click",
  closeEverything
);

document
  .querySelectorAll("[data-close]")
  .forEach(button => {

    button.addEventListener(
      "click",
      closeEverything
    );

  });

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeEverything();
    }

  }
);

/* ============================================================
   INITIALISATION
   ============================================================ */

function init() {

  renderCategories();

  renderProducts();

  renderCart();

  renderFavorites();

  renderOrders();

  updateCounters();

  DOM.cityInput.value =
    state.city;

  console.log(
    "NovaShop chargé correctement.",
    PRODUCTS.length,
    "produits."
  );
}

init();

/* ============================================================
   API
   ============================================================ */

window.NovaShop = {
  products: PRODUCTS,
  state,

  addToCart,
  toggleFavorite,
  openProduct,
  openCart,
  openFavorites,
  openAccount,
  createOrder,

  renderProducts,
  renderCart,
  renderFavorites
};
