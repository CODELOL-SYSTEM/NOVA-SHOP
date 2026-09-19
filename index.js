"use strict";

/* =========================================================
   NOVASHOP
   Fichier JS principal
   ========================================================= */

/* -----------------------------
   DONNÉES PRODUITS
   ----------------------------- */

const NOVASHOP_PRODUCTS = [
  {
    id: "cpu-9600x",
    name: "Ryzen 5 9600X",
    brand: "AMD",
    category: "Processeurs",
    price: 279.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description: "Processeur AMD Ryzen 5 9600X pour plateforme AM5."
  },
  {
    id: "ram-corsair-32",
    name: "Vengeance RGB 32 Go DDR5-6000 CL38",
    brand: "Corsair",
    category: "RAM",
    price: 109.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description: "Kit Corsair Vengeance RGB 32 Go en DDR5."
  },
  {
    id: "ram-kingston-32",
    name: "FURY Beast RGB 32 Go DDR5-5600 CL36",
    brand: "Kingston",
    category: "RAM",
    price: 104.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description: "Kit Kingston FURY Beast RGB 32 Go DDR5."
  },
  {
    id: "ssd-990pro-1tb",
    name: "990 PRO 1 To",
    brand: "Samsung",
    category: "SSD",
    price: 99.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 1 To."
  },
  {
    id: "ssd-990pro-2tb",
    name: "990 PRO 2 To",
    brand: "Samsung",
    category: "SSD",
    price: 179.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 2 To."
  },
  {
    id: "psu-rm850",
    name: "RM850x",
    brand: "Corsair",
    category: "Alimentations",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description: "Alimentation Corsair RM850x de 850 W."
  },
  {
    id: "case-5000d",
    name: "5000D Airflow",
    brand: "Corsair",
    category: "Boîtiers",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description: "Boîtier Corsair 5000D Airflow."
  },
  {
    id: "cooling-lf3",
    name: "Liquid Freezer III 360",
    brand: "ARCTIC",
    category: "Refroidissement",
    price: 119.99,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description: "Watercooling AIO ARCTIC Liquid Freezer III 360."
  },
  {
    id: "monitor-g6",
    name: "Odyssey OLED G6",
    brand: "Samsung",
    category: "Écrans",
    price: 699.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description: "Écran gaming Samsung Odyssey OLED G6."
  },
  {
    id: "keyboard-prox",
    name: "G PRO X TKL",
    brand: "Logitech",
    category: "Claviers",
    price: 189.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description: "Clavier gaming Logitech G PRO X TKL."
  },
  {
    id: "mouse-superlight2",
    name: "G PRO X SUPERLIGHT 2",
    brand: "Logitech",
    category: "Souris",
    price: 159.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description: "Souris gaming Logitech G PRO X SUPERLIGHT 2."
  },
  {
    id: "mic-wave3",
    name: "Wave:3",
    brand: "Elgato",
    category: "Microphones",
    price: 159.99,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description: "Microphone USB Elgato Wave:3."
  },
  {
    id: "controller-dualsense",
    name: "DualSense Wireless Controller",
    brand: "Sony",
    category: "Manettes",
    price: 74.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description: "Manette sans fil Sony DualSense."
  }
];

/* -----------------------------
   CONFIG
   ----------------------------- */

const STORAGE_KEYS = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  city: "novashop_city",
  orders: "novashop_orders"
};

const PRODUCTS_PER_PAGE = 8;

/* -----------------------------
   ÉTAT
   ----------------------------- */

const state = {
  search: "",
  category: "Tous",
  sort: "featured",
  page: 1,
  cart: loadArray(STORAGE_KEYS.cart),
  favorites: loadArray(STORAGE_KEYS.favorites),
  city: localStorage.getItem(STORAGE_KEYS.city) || "",
  orders: loadArray(STORAGE_KEYS.orders)
};

/* -----------------------------
   HELPERS
   ----------------------------- */

function loadArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
  localStorage.setItem(STORAGE_KEYS.city, state.city);
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(state.orders));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function euro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value) || 0);
}

function getProduct(id) {
  return NOVASHOP_PRODUCTS.find(product => product.id === id) || null;
}

function getCartQuantity() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function toast(message) {
  const element = document.getElementById("toast");

  if (!element) return;

  element.textContent = message;
  element.classList.add("visible");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    element.classList.remove("visible");
  }, 1800);
}

/* -----------------------------
   DOM
   ----------------------------- */

const elements = {
  searchInput: document.getElementById("searchInput"),
  categoryButtons: document.getElementById("categoryButtons"),
  sortSelect: document.getElementById("sortSelect"),
  productsGrid: document.getElementById("productsGrid"),
  pagination: document.getElementById("pagination"),
  resultsText: document.getElementById("resultsText"),

  cartBtn: document.getElementById("cartBtn"),
  cartCount: document.getElementById("cartCount"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartContent: document.getElementById("cartContent"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),

  favoritesBtn: document.getElementById("favoritesBtn"),
  favoriteCount: document.getElementById("favoriteCount"),
  favoritesDrawer: document.getElementById("favoritesDrawer"),
  favoritesContent: document.getElementById("favoritesContent"),

  accountBtn: document.getElementById("accountBtn"),
  accountModal: document.getElementById("accountModal"),
  cityInput: document.getElementById("cityInput"),
  saveCityBtn: document.getElementById("saveCityBtn"),
  ordersContent: document.getElementById("ordersContent"),
  deleteAllDataBtn: document.getElementById("deleteAllDataBtn"),

  productModal: document.getElementById("productModal"),
  productModalBody: document.getElementById("productModalBody"),

  overlay: document.getElementById("overlay"),

  heroShopBtn: document.getElementById("heroShopBtn"),
  heroFavoritesBtn: document.getElementById("heroFavoritesBtn"),
  heroProductCount: document.getElementById("heroProductCount"),
  logoHome: document.getElementById("logoHome")
};

/* -----------------------------
   CATÉGORIES
   ----------------------------- */

function getCategories() {
  const categories = [
    ...new Set(NOVASHOP_PRODUCTS.map(product => product.category))
  ];

  return ["Tous", ...categories];
}

function renderCategories() {
  const categories = getCategories();

  elements.categoryButtons.innerHTML = categories
    .map(category => {
      const active = category === state.category ? "active" : "";

      return `
        <button
          class="category-btn ${active}"
          data-category="${escapeHTML(category)}"
        >
          ${escapeHTML(category)}
        </button>
      `;
    })
    .join("");
}

/* -----------------------------
   FILTRE PRODUITS
   ----------------------------- */

function getFilteredProducts() {
  let products = [...NOVASHOP_PRODUCTS];

  const search = state.search.trim().toLowerCase();

  if (search) {
    products = products.filter(product => {
      const haystack = [
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }

  if (state.category !== "Tous") {
    products = products.filter(
      product => product.category === state.category
    );
  }

  switch (state.sort) {
    case "priceAsc":
      products.sort((a, b) => a.price - b.price);
      break;

    case "priceDesc":
      products.sort((a, b) => b.price - a.price);
      break;

    case "nameAsc":
      products.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      break;

    case "nameDesc":
      products.sort((a, b) => b.name.localeCompare(a.name, "fr"));
      break;

    case "featured":
    default:
      break;
  }

  return products;
}

/* -----------------------------
   RENDER PRODUITS
   ----------------------------- */

function renderProducts() {
  const products = getFilteredProducts();

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE)
  );

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const start = (state.page - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(
    start,
    start + PRODUCTS_PER_PAGE
  );

  if (products.length === 0) {
    elements.productsGrid.innerHTML = `
      <div class="empty">
        <strong>Aucun produit trouvé.</strong>
        <br>
        Essaie une autre recherche ou une autre catégorie.
      </div>
    `;
  } else {
    elements.productsGrid.innerHTML = visibleProducts
      .map(renderProductCard)
      .join("");
  }

  elements.resultsText.textContent =
    products.length === 1
      ? "1 produit"
      : `${products.length} produits`;

  renderPagination(totalPages);
}

function renderProductCard(product) {
  const isFavorite = state.favorites.includes(product.id);

  return `
    <article class="product-card">

      <div class="product-image-wrap">

        <span class="brand-pill">
          ${escapeHTML(product.brand)}
        </span>

        <button
          class="favorite-product ${isFavorite ? "active" : ""}"
          data-action="favorite"
          data-id="${escapeHTML(product.id)}"
          title="Ajouter aux favoris"
          aria-label="Ajouter aux favoris"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

        <img
          class="product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.opacity='0.15'"
        >
      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <h3 class="product-name">
          ${escapeHTML(product.name)}
        </h3>

        <p class="product-desc">
          ${escapeHTML(product.description)}
        </p>

        <div class="product-bottom">

          <div class="price">
            ${euro(product.price)}
          </div>

          <button
            class="add-btn"
            data-action="add"
            data-id="${escapeHTML(product.id)}"
            title="Ajouter au panier"
            aria-label="Ajouter au panier"
          >
            +
          </button>

        </div>

      </div>
    </article>
  `;
}

/* -----------------------------
   PAGINATION
   ----------------------------- */

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    elements.pagination.innerHTML = "";
    return;
  }

  let html = "";

  for (let page = 1; page <= totalPages; page++) {
    html += `
      <button
        class="page-btn ${page === state.page ? "active" : ""}"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  }

  elements.pagination.innerHTML = html;
}

/* -----------------------------
   PANIER
   ----------------------------- */

function addToCart(id) {
  const product = getProduct(id);

  if (!product) return;

  const existing = state.cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id,
      quantity: 1
    });
  }

  saveState();
  renderCart();
  updateCounts();

  toast(`${product.name} ajouté au panier`);
}

function changeQuantity(id, delta) {
  const item = state.cart.find(entry => entry.id === id);

  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter(entry => entry.id !== id);
  }

  saveState();
  renderCart();
  updateCounts();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);

  saveState();
  renderCart();
  updateCounts();

  toast("Produit retiré du panier");
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = getProduct(item.id);

    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);
}

function renderCart() {
  if (!state.cart.length) {
    elements.cartContent.innerHTML = `
      <div class="empty-drawer">
        <div>
          <div style="font-size:34px;margin-bottom:10px;">🛒</div>
          <strong>Ton panier est vide.</strong>
          <br>
          Ajoute quelques produits pour commencer.
        </div>
      </div>
    `;

    elements.cartTotal.textContent = euro(0);
    elements.checkoutBtn.disabled = true;
    elements.checkoutBtn.style.opacity = "0.5";

    return;
  }

  elements.checkoutBtn.disabled = false;
  elements.checkoutBtn.style.opacity = "1";

  elements.cartContent.innerHTML = state.cart
    .map(item => {
      const product = getProduct(item.id);

      if (!product) return "";

      return `
        <div class="cart-item">

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            onerror="this.style.opacity='0.15'"
          >

          <div>
            <div class="cart-item-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="cart-item-price">
              ${euro(product.price)}
            </div>

            <div class="qty">

              <button
                data-cart-action="minus"
                data-id="${escapeHTML(product.id)}"
              >
                −
              </button>

              <strong>${item.quantity}</strong>

              <button
                data-cart-action="plus"
                data-id="${escapeHTML(product.id)}"
              >
                +
              </button>

            </div>

            <button
              class="remove-btn"
              data-cart-action="remove"
              data-id="${escapeHTML(product.id)}"
            >
              Retirer
            </button>

          </div>

          <strong>
            ${euro(product.price * item.quantity)}
          </strong>

        </div>
      `;
    })
    .join("");

  elements.cartTotal.textContent = euro(getCartTotal());
}

/* -----------------------------
   FAVORIS
   ----------------------------- */

function toggleFavorite(id) {
  const product = getProduct(id);

  if (!product) return;

  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(
      favoriteId => favoriteId !== id
    );

    toast("Retiré des favoris");
  } else {
    state.favorites.push(id);
    toast("Ajouté aux favoris");
  }

  saveState();
  updateCounts();
  renderProducts();
  renderFavorites();
}

function renderFavorites() {
  const products = state.favorites
    .map(id => getProduct(id))
    .filter(Boolean);

  if (!products.length) {
    elements.favoritesContent.innerHTML = `
      <div class="empty-drawer">
        <div>
          <div style="font-size:34px;margin-bottom:10px;">♡</div>
          <strong>Aucun favori.</strong>
          <br>
          Clique sur le cœur d’un produit pour le sauvegarder.
        </div>
      </div>
    `;

    return;
  }

  elements.favoritesContent.innerHTML = products
    .map(product => `
      <div class="favorite-item">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.style.opacity='0.15'"
        >

        <div>
          <div class="favorite-item-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="favorite-item-price">
            ${euro(product.price)}
          </div>

          <div class="account-actions">
            <button
              class="secondary-btn"
              data-favorite-action="open"
              data-id="${escapeHTML(product.id)}"
              style="min-height:36px;padding:0 11px;"
            >
              Voir
            </button>

            <button
              class="primary-btn"
              data-favorite-action="add"
              data-id="${escapeHTML(product.id)}"
              style="min-height:36px;padding:0 11px;"
            >
              Ajouter
            </button>
          </div>
        </div>

        <button
          class="close-btn"
          data-favorite-action="remove"
          data-id="${escapeHTML(product.id)}"
          title="Retirer"
        >
          ×
        </button>

      </div>
    `)
    .join("");
}

/* -----------------------------
   MODAL PRODUIT
   ----------------------------- */

function openProductModal(id) {
  const product = getProduct(id);

  if (!product) return;

  const isFavorite = state.favorites.includes(id);

  elements.productModalBody.innerHTML = `
    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.style.opacity='0.15'"
        >
      </div>

      <div class="detail-copy">

        <div class="detail-brand">
          ${escapeHTML(product.brand)}
          •
          ${escapeHTML(product.category)}
        </div>

        <h2 class="detail-title">
          ${escapeHTML(product.name)}
        </h2>

        <p class="detail-description">
          ${escapeHTML(product.description)}
        </p>

        <div class="detail-price">
          ${euro(product.price)}
        </div>

        <div class="detail-actions">

          <button
            class="primary-btn"
            data-modal-action="add"
            data-id="${escapeHTML(product.id)}"
          >
            Ajouter au panier
          </button>

          <button
            class="secondary-btn"
            data-modal-action="favorite"
            data-id="${escapeHTML(product.id)}"
          >
            ${isFavorite ? "♥ Favori" : "♡ Ajouter aux favoris"}
          </button>

        </div>

      </div>

    </div>
  `;

  elements.productModal.classList.add("visible");
  elements.overlay.classList.add("visible");
  document.body.classList.add("locked");
}

/* -----------------------------
   COMPTE / COMMANDES
   ----------------------------- */

function createOrder() {
  if (!state.cart.length) {
    toast("Le panier est vide");
    return;
  }

  const order = {
    id: `NS-${Date.now().toString().slice(-8)}`,
    date: new Date().toISOString(),
    city: state.city || "Ville non renseignée",
    status: "En préparation",
    items: state.cart.map(item => {
      const product = getProduct(item.id);

      return {
        id: item.id,
        name: product ? product.name : "Produit",
        price: product ? product.price : 0,
        quantity: item.quantity
      };
    }),
    total: getCartTotal()
  };

  state.orders.unshift(order);
  state.cart = [];

  saveState();
  renderCart();
  updateCounts();
  renderOrders();

  closeAllPanels();
  openAccount();

  toast(`Commande ${order.id} créée`);
}

function renderOrders() {
  if (!state.orders.length) {
    elements.ordersContent.innerHTML = `
      <div class="account-muted">
        Aucune commande enregistrée.
      </div>
    `;
    return;
  }

  elements.ordersContent.innerHTML = state.orders
    .map(order => {
      const date = new Date(order.date);

      return `
        <div class="order-card">

          <div class="order-row">
            <strong>${escapeHTML(order.id)}</strong>

            <span class="order-status">
              ${escapeHTML(order.status)}
            </span>
          </div>

          <div class="account-muted">
            ${escapeHTML(
              date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            )}
            •
            ${escapeHTML(order.city)}
          </div>

          <div
            style="
              margin-top:9px;
              font-size:12px;
              color:#aab2bd;
              line-height:1.6;
            "
          >
            ${order.items
              .map(item =>
                `${escapeHTML(item.name)} × ${item.quantity}`
              )
              .join("<br>")}
          </div>

          <div
            style="
              margin-top:10px;
              font-weight:900;
              font-size:15px;
            "
          >
            ${euro(order.total)}
          </div>

        </div>
      `;
    })
    .join("");
}

function openAccount() {
  elements.cityInput.value = state.city;
  renderOrders();

  elements.accountModal.classList.add("visible");
  elements.overlay.classList.add("visible");
  document.body.classList.add("locked");
}

function saveCity() {
  const city = elements.cityInput.value.trim();

  state.city = city;

  saveState();

  toast(city ? "Ville enregistrée" : "Ville supprimée");
}

/* -----------------------------
   DONNÉES
   ----------------------------- */

function deleteAllData() {
  const confirmed = window.confirm(
    "Supprimer toutes les données NovaShop enregistrées sur cet appareil ?"
  );

  if (!confirmed) return;

  state.cart = [];
  state.favorites = [];
  state.city = "";
  state.orders = [];

  localStorage.removeItem(STORAGE_KEYS.cart);
  localStorage.removeItem(STORAGE_KEYS.favorites);
  localStorage.removeItem(STORAGE_KEYS.city);
  localStorage.removeItem(STORAGE_KEYS.orders);

  elements.cityInput.value = "";

  renderProducts();
  renderCart();
  renderFavorites();
  renderOrders();
  updateCounts();

  closeAllPanels();

  toast("Toutes les données ont été supprimées");
}

/* -----------------------------
   COMPTEURS
   ----------------------------- */

function updateCounts() {
  elements.cartCount.textContent = String(getCartQuantity());
  elements.favoriteCount.textContent = String(state.favorites.length);
  elements.heroProductCount.textContent = String(
    NOVASHOP_PRODUCTS.length
  );
}

/* -----------------------------
   PANELS
   ----------------------------- */

function openDrawer(drawer) {
  closeModalsOnly();

  drawer.classList.add("open");
  elements.overlay.classList.add("visible");
  document.body.classList.add("locked");
}

function closeDrawersOnly() {
  elements.cartDrawer.classList.remove("open");
  elements.favoritesDrawer.classList.remove("open");
}

function closeModalsOnly() {
  elements.productModal.classList.remove("visible");
  elements.accountModal.classList.remove("visible");
}

function closeAllPanels() {
  closeDrawersOnly();
  closeModalsOnly();
  elements.overlay.classList.remove("visible");
  document.body.classList.remove("locked");
}

/* -----------------------------
   EVENTS
   ----------------------------- */

elements.searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  state.page = 1;
  renderProducts();
});

elements.sortSelect.addEventListener("change", event => {
  state.sort = event.target.value;
  state.page = 1;
  renderProducts();
});

elements.categoryButtons.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  state.category = button.dataset.category;
  state.page = 1;

  renderCategories();
  renderProducts();
});

elements.productsGrid.addEventListener("click", event => {
  const favoriteButton = event.target.closest(
    '[data-action="favorite"]'
  );

  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.id);
    return;
  }

  const addButton = event.target.closest(
    '[data-action="add"]'
  );

  if (addButton) {
    addToCart(addButton.dataset.id);
    return;
  }

  const card = event.target.closest(".product-card");

  if (!card) return;

  const product = event.target.closest(".product-card");

  if (product) {
    const add = product.querySelector('[data-action="add"]');

    if (add) {
      openProductModal(add.dataset.id);
    }
  }
});

elements.pagination.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");

  if (!button) return;

  state.page = Number(button.dataset.page) || 1;

  renderProducts();

  document.getElementById("productsSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

elements.cartContent.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");

  if (!button) return;

  const { cartAction, id } = button.dataset;

  if (cartAction === "plus") {
    changeQuantity(id, 1);
  }

  if (cartAction === "minus") {
    changeQuantity(id, -1);
  }

  if (cartAction === "remove") {
    removeFromCart(id);
  }
});

elements.favoritesContent.addEventListener("click", event => {
  const button = event.target.closest("[data-favorite-action]");

  if (!button) return;

  const { favoriteAction, id } = button.dataset;

  if (favoriteAction === "remove") {
    toggleFavorite(id);
    return;
  }

  if (favoriteAction === "add") {
    addToCart(id);
    return;
  }

  if (favoriteAction === "open") {
    openProductModal(id);
  }
});

elements.productModalBody.addEventListener("click", event => {
  const button = event.target.closest("[data-modal-action]");

  if (!button) return;

  const { modalAction, id } = button.dataset;

  if (modalAction === "add") {
    addToCart(id);
    return;
  }

  if (modalAction === "favorite") {
    toggleFavorite(id);
    openProductModal(id);
  }
});

elements.favoritesBtn.addEventListener("click", () => {
  renderFavorites();
  openDrawer(elements.favoritesDrawer);
});

elements.cartBtn.addEventListener("click", () => {
  renderCart();
  openDrawer(elements.cartDrawer);
});

elements.accountBtn.addEventListener("click", () => {
  openAccount();
});

elements.overlay.addEventListener("click", () => {
  closeAllPanels();
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeAllPanels();
  });
});

elements.heroShopBtn.addEventListener("click", () => {
  document.getElementById("productsSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

elements.heroFavoritesBtn.addEventListener("click", () => {
  renderFavorites();
  openDrawer(elements.favoritesDrawer);
});

elements.checkoutBtn.addEventListener("click", () => {
  createOrder();
});

elements.saveCityBtn.addEventListener("click", () => {
  saveCity();
});

elements.deleteAllDataBtn.addEventListener("click", () => {
  deleteAllData();
});

elements.logoHome.addEventListener("click", event => {
  event.preventDefault();

  state.search = "";
  state.category = "Tous";
  state.sort = "featured";
  state.page = 1;

  elements.searchInput.value = "";
  elements.sortSelect.value = "featured";

  renderCategories();
  renderProducts();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* -----------------------------
   ESCAPE CLAVIER
   ----------------------------- */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAllPanels();
  }
});

/* -----------------------------
   INITIALISATION
   ----------------------------- */

function initNovaShop() {
  renderCategories();
  renderProducts();
  renderCart();
  renderFavorites();
  renderOrders();
  updateCounts();

  elements.cityInput.value = state.city;
}

initNovaShop();

/* -----------------------------
   API GLOBALE
   ----------------------------- */

window.NovaShop = {
  products: NOVASHOP_PRODUCTS,
  state,
  addToCart,
  toggleFavorite,
  openProductModal,
  openAccount,
  createOrder,
  deleteAllData
};
