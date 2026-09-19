"use strict";

/* =========================================================
   NOVASHOP
   Application marketplace locale
   Stockage gratuit : localStorage
   ========================================================= */

const STORAGE = {
  cart: "novashop_cart_v1",
  orders: "novashop_orders_v1",
  favorites: "novashop_favorites_v1",
  account: "novashop_account_v1",
  city: "novashop_city_v1"
};

/* =========================================================
   PRODUITS
   Maximum 6 produits par catégorie.
   Images réelles fournies pour les produits.
   ========================================================= */

const PRODUCTS = [
  {
    id: "cpu-9600x",
    code: "NS-CPU-9600X",
    brand: "AMD",
    name: "Ryzen 5 9600X",
    category: "Processeurs",
    price: 239.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg"
  },

  {
    id: "ram-corsair-32",
    code: "NS-RAM-COR-32",
    brand: "Corsair",
    name: "Vengeance RGB 32 Go DDR5 6000 CL38",
    category: "RAM",
    price: 119.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
  },

  {
    id: "ram-kingston-32",
    code: "NS-RAM-KF-32",
    brand: "Kingston",
    name: "FURY Beast RGB 32 Go DDR5 5600 CL36",
    category: "RAM",
    price: 109.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg"
  },

  {
    id: "ssd-990pro-1",
    code: "NS-SSD-990P-1T",
    brand: "Samsung",
    name: "990 PRO 1 To NVMe",
    category: "SSD",
    price: 99.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$"
  },

  {
    id: "ssd-990pro-2",
    code: "NS-SSD-990P-2T",
    brand: "Samsung",
    name: "990 PRO 2 To NVMe",
    category: "SSD",
    price: 169.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$"
  },

  {
    id: "psu-rm850x",
    code: "NS-PSU-RM850X",
    brand: "Corsair",
    name: "RM850x 850 W",
    category: "Alimentations",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp"
  },

  {
    id: "case-5000d",
    code: "NS-CASE-5000D",
    brand: "Corsair",
    name: "5000D Airflow",
    category: "Boîtiers",
    price: 149.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp"
  },

  {
    id: "aio-lf3-360",
    code: "NS-AIO-LF3-360",
    brand: "ARCTIC",
    name: "Liquid Freezer III 360",
    category: "Refroidissement",
    price: 119.99,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
  },

  {
    id: "monitor-g6",
    code: "NS-MON-OLED-G6",
    brand: "Samsung",
    name: "Odyssey OLED G6",
    category: "Écrans",
    price: 699.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },

  {
    id: "keyboard-proxtkl",
    code: "NS-KB-PROX-TKL",
    brand: "Logitech G",
    name: "PRO X TKL Wireless",
    category: "Claviers",
    price: 179.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
  },

  {
    id: "mouse-superlight2",
    code: "NS-MOUSE-SUPERLIGHT2",
    brand: "Logitech G",
    name: "PRO X SUPERLIGHT 2",
    category: "Souris",
    price: 149.99,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
  },

  {
    id: "mic-wave3",
    code: "NS-MIC-WAVE3",
    brand: "Elgato",
    name: "Wave:3",
    category: "Micros",
    price: 139.99,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png"
  },

  {
    id: "controller-dualsense",
    code: "NS-PAD-DS5",
    brand: "Sony",
    name: "DualSense PS5",
    category: "Manettes",
    price: 69.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
  }
];

/* =========================================================
   CATÉGORIES
   ========================================================= */

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

/* =========================================================
   ÉTAT
   ========================================================= */

let state = {
  category: "Tous",
  search: "",
  sort: "relevance",
  cart: load(STORAGE.cart, {}),
  orders: load(STORAGE.orders, []),
  favorites: load(STORAGE.favorites, []),
  account: load(STORAGE.account, {
    name: "",
    email: ""
  }),
  city: load(STORAGE.city, "")
};

/* =========================================================
   DOM
   ========================================================= */

const $ = id => document.getElementById(id);

const marketplace = $("marketplace");
const dashboard = $("dashboard");
const account = $("account");
const productsContainer = $("products");
const categoriesContainer = $("categories");
const resultCount = $("resultCount");
const searchForm = $("searchForm");
const searchInput = $("searchInput");
const sortSelect = $("sortSelect");

const overlay = $("overlay");
const cartDrawer = $("cartDrawer");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const cartCount = $("cartCount");

const checkoutModal = $("checkoutModal");
const accountModal = $("accountModal");

const checkoutForm = $("checkoutForm");
const checkoutTotal = $("checkoutTotal");

const toast = $("toast");

/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================================================
   UTILITAIRES
   ========================================================= */

function money(value) {
  return Number(value).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}

function getCartCount() {
  return Object.values(state.cart)
    .reduce((total, quantity) => total + Number(quantity || 0), 0);
}

function getCartTotal() {
  return Object.entries(state.cart).reduce((total, [id, quantity]) => {
    const product = getProduct(id);
    if (!product) return total;

    return total + product.price * Number(quantity || 0);
  }, 0);
}

/* =========================================================
   CATÉGORIES
   ========================================================= */

function renderCategories() {
  categoriesContainer.innerHTML = CATEGORIES.map(category => `
    <button
      class="${state.category === category ? "active" : ""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");

  categoriesContainer.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
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

function getVisibleProducts() {
  let list = [...PRODUCTS];

  if (state.category !== "Tous") {
    list = list.filter(product =>
      product.category === state.category
    );
  }

  const search = normalize(state.search);

  if (search) {
    list = list.filter(product => {
      const text = normalize([
        product.name,
        product.brand,
        product.category,
        product.code
      ].join(" "));

      return text.includes(search);
    });
  }

  if (state.sort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (state.sort === "name") {
    list.sort((a, b) =>
      `${a.brand} ${a.name}`.localeCompare(
        `${b.brand} ${b.name}`,
        "fr"
      )
    );
  }

  return list;
}

function renderProducts() {
  const list = getVisibleProducts();

  resultCount.textContent =
    `${list.length} produit${list.length > 1 ? "s" : ""}`;

  if (!list.length) {
    productsContainer.innerHTML = `
      <div class="empty">
        <div style="font-size:35px">🔎</div>
        <h3>Aucun produit trouvé</h3>
        <p>
          Aucun produit vérifié ne correspond à cette recherche ou catégorie.
        </p>
        <button class="secondary" id="resetSearch">
          Réinitialiser
        </button>
      </div>
    `;

    $("resetSearch").addEventListener("click", () => {
      state.search = "";
      state.category = "Tous";
      searchInput.value = "";
      renderCategories();
      renderProducts();
    });

    return;
  }

  productsContainer.innerHTML = list.map(product => {
    const favorite = state.favorites.includes(product.id);

    return `
      <article class="product">

        <div class="product-image">
          <img
            src="${product.image}"
            alt="${escapeHTML(product.brand + " " + product.name)}"
            loading="lazy"
            onerror="this.style.opacity='.25'"
          >

          <button
            class="heart ${favorite ? "active" : ""}"
            data-favorite="${product.id}"
            aria-label="Favori"
          >
            ${favorite ? "♥" : "♡"}
          </button>
        </div>

        <div class="product-info">

          <div class="brand">
            ${escapeHTML(product.brand)}
          </div>

          <h3>
            ${escapeHTML(product.name)}
          </h3>

          <div class="rating">
            ★★★★★
            <span>Produit vérifié</span>
          </div>

          <div class="product-code">
            Code : ${escapeHTML(product.code)}
          </div>

          <div class="price">
            ${money(product.price)}
          </div>

          <div class="stock">
            ● Disponible
          </div>

          <div class="product-actions">
            <button
              class="add"
              data-add="${product.id}"
            >
              Ajouter au panier
            </button>
          </div>

        </div>
      </article>
    `;
  }).join("");

  productsContainer
    .querySelectorAll("[data-add]")
    .forEach(button => {
      button.addEventListener("click", () => {
        addToCart(button.dataset.add);
      });
    });

  productsContainer
    .querySelectorAll("[data-favorite]")
    .forEach(button => {
      button.addEventListener("click", () => {
        toggleFavorite(button.dataset.favorite);
      });
    });
}

/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(item => item !== id);
    showToast("Retiré des favoris");
  } else {
    state.favorites.push(id);
    showToast("Ajouté aux favoris ❤️");
  }

  save(STORAGE.favorites, state.favorites);
  renderProducts();
}

/* =========================================================
   PANIER
   ========================================================= */

function addToCart(id) {
  state.cart[id] = Number(state.cart[id] || 0) + 1;

  save(STORAGE.cart, state.cart);

  updateCart();

  showToast("Produit ajouté au panier 🛒");
}

function removeFromCart(id) {
  delete state.cart[id];

  save(STORAGE.cart, state.cart);

  updateCart();
}

function changeQuantity(id, amount) {
  if (!state.cart[id]) return;

  state.cart[id] += amount;

  if (state.cart[id] <= 0) {
    delete state.cart[id];
  }

  save(STORAGE.cart, state.cart);

  updateCart();
}

function updateCart() {
  const entries = Object.entries(state.cart)
    .filter(([id, quantity]) => getProduct(id) && quantity > 0);

  cartCount.textContent = getCartCount();
  cartTotal.textContent = money(getCartTotal());
  checkoutTotal.textContent = money(getCartTotal());

  if (!entries.length) {
    cartItems.innerHTML = `
      <div class="empty" style="padding:45px 10px">
        <div style="font-size:35px">🛒</div>
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des produits pour commencer.</p>
      </div>
    `;

    return;
  }

  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = getProduct(id);

    return `
      <div class="cart-row">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
        >

        <div class="cart-info">

          <h4>
            ${escapeHTML(product.brand)}
            ${escapeHTML(product.name)}
          </h4>

          <div class="cart-price">
            ${money(product.price)}
          </div>

          <div class="quantity">
            <button data-minus="${product.id}">−</button>
            <strong>${quantity}</strong>
            <button data-plus="${product.id}">+</button>

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

  cartItems.querySelectorAll("[data-minus]").forEach(button => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.minus, -1);
    });
  });

  cartItems.querySelectorAll("[data-plus]").forEach(button => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.plus, 1);
    });
  });

  cartItems.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.remove);
    });
  });
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function showMarketplace() {
  marketplace.style.display = "block";
  dashboard.classList.remove("show");
  account.classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDashboard() {
  marketplace.style.display = "none";
  account.classList.remove("show");
  dashboard.classList.add("show");

  renderDashboard();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openAccountPage() {
  marketplace.style.display = "none";
  dashboard.classList.remove("show");
  account.classList.add("show");

  $("accountName").value = state.account.name || "";
  $("accountEmail").value = state.account.email || "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   RECHERCHE
   ========================================================= */

function handleSearch() {
  const value = searchInput.value.trim();

  if (!value) {
    state.search = "";
    renderProducts();
    return;
  }

  /*
   IMPORTANT :
   Une recherche exacte d'un code produit ouvre automatiquement
   le Dashboard.
  */

  const exactCode = PRODUCTS.find(
    product => normalize(product.code) === normalize(value)
  );

  if (exactCode) {
    showToast("Code produit reconnu. Ouverture du Dashboard 🏢");

    setTimeout(() => {
      openDashboard();
    }, 250);

    return;
  }

  state.category = "Tous";
  state.search = value;

  renderCategories();
  renderProducts();

  document
    .getElementById("productsSection")
    .scrollIntoView({ behavior: "smooth" });
}

/* =========================================================
   PANIER DRAWER
   ========================================================= */

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  updateCart();
}

function closeCart() {
  cartDrawer.classList.remove("open");

  if (
    !checkoutModal.classList.contains("show") &&
    !accountModal.classList.contains("show")
  ) {
    overlay.classList.remove("show");
  }
}

/* =========================================================
   MODALES
   ========================================================= */

function openModal(modal) {
  modal.classList.add("show");
  overlay.classList.add("show");
}

function closeModal(modal) {
  modal.classList.remove("show");

  if (
    !cartDrawer.classList.contains("open") &&
    !checkoutModal.classList.contains("show") &&
    !accountModal.classList.contains("show")
  ) {
    overlay.classList.remove("show");
  }
}

function closeAll() {
  cartDrawer.classList.remove("open");
  checkoutModal.classList.remove("show");
  accountModal.classList.remove("show");
  overlay.classList.remove("show");
}

/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {
  if (getCartCount() <= 0) {
    showToast("Votre panier est vide.");
    return;
  }

  closeCart();

  const name = state.account.name || "";
  const city = state.city || "";

  $("checkoutName").value = name;
  $("checkoutCity").value = city;

  $("checkoutAddress").value = "";
  $("checkoutZip").value = "";

  checkoutTotal.textContent = money(getCartTotal());

  openModal(checkoutModal);
}

function createOrder(formData) {
  const items = Object.entries(state.cart)
    .map(([id, quantity]) => {
      const product = getProduct(id);

      if (!product) return null;

      return {
        id: product.id,
        code: product.code,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        quantity: Number(quantity)
      };
    })
    .filter(Boolean);

  if (!items.length) {
    showToast("Votre panier est vide.");
    return;
  }

  const order = {
    id:
      "NS-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.floor(Math.random() * 900 + 100),

    date: new Date().toISOString(),

    status: "Commande reçue",

    warehouse: "Entrepôt",

    customer: {
      name: formData.name,
      address: formData.address,
      zip: formData.zip,
      city: formData.city,
      country: formData.country
    },

    items,

    total: getCartTotal()
  };

  state.orders.unshift(order);

  save(STORAGE.orders, state.orders);

  state.cart = {};

  save(STORAGE.cart, state.cart);

  state.city = formData.city;

  save(STORAGE.city, state.city);

  state.account.name = formData.name;

  save(STORAGE.account, state.account);

  checkoutForm.reset();

  closeAll();

  updateCart();

  showToast("Commande enregistrée avec succès 📦");

  setTimeout(() => {
    openDashboard();
  }, 400);
}

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  const data = {
    name: $("checkoutName").value.trim(),
    address: $("checkoutAddress").value.trim(),
    zip: $("checkoutZip").value.trim(),
    city: $("checkoutCity").value.trim(),
    country: $("checkoutCountry").value
  };

  /*
   Vérification obligatoire de l'adresse.
  */

  if (
    !data.name ||
    !data.address ||
    !data.zip ||
    !data.city ||
    !data.country
  ) {
    showToast("⚠️ L'adresse complète est obligatoire.");
    return;
  }

  if (data.zip.length < 4) {
    showToast("⚠️ Vérifie le code postal.");
    return;
  }

  createOrder(data);
});

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

function nextStatus(order) {
  const index = STATUSES.indexOf(order.status);

  if (index < 0) {
    order.status = STATUSES[0];
    return;
  }

  if (index < STATUSES.length - 1) {
    order.status = STATUSES[index + 1];
  }
}

function renderDashboard() {
  const orders = state.orders;

  $("statOrders").textContent = orders.length;

  $("statPreparing").textContent =
    orders.filter(order =>
      order.status === "Préparation"
    ).length;

  $("statShipped").textContent =
    orders.filter(order =>
      order.status === "Expédiée" ||
      order.status === "En livraison" ||
      order.status === "Livrée"
    ).length;

  const spent = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  $("statSpent").textContent = money(spent);

  $("dashboardCity").value = state.city || "";

  if (!orders.length) {
    $("ordersList").innerHTML = `
      <div class="empty" style="padding:50px 15px">
        <div style="font-size:35px">📦</div>
        <h3>Aucune commande</h3>
        <p>
          Tes commandes apparaîtront ici après une commande.
        </p>
      </div>
    `;

    return;
  }

  $("ordersList").innerHTML = orders.map(order => {

    const date = new Date(order.date);

    const dateText = date.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    const itemsText = order.items
      .map(item =>
        `${item.quantity} × ${item.brand} ${item.name}`
      )
      .join("<br>");

    const next =
      STATUSES.indexOf(order.status) <
      STATUSES.length - 1;

    return `
      <article class="order">

        <div class="order-top">
          <div>
            <div class="order-number">
              ${escapeHTML(order.id)}
            </div>

            <div class="order-date">
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

        <div class="order-details">

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

        <div class="order-actions">

          ${
            next
              ? `
                <button data-next-order="${escapeHTML(order.id)}">
                  Faire avancer le statut →
                </button>
              `
              : `
                <button disabled>
                  ✓ Commande terminée
                </button>
              `
          }

          <button data-delete-order="${escapeHTML(order.id)}">
            Supprimer
          </button>

        </div>

      </article>
    `;
  }).join("");

  document
    .querySelectorAll("[data-next-order]")
    .forEach(button => {
      button.addEventListener("click", () => {
        advanceOrder(button.dataset.nextOrder);
      });
    });

  document
    .querySelectorAll("[data-delete-order]")
    .forEach(button => {
      button.addEventListener("click", () => {
        deleteOrder(button.dataset.deleteOrder);
      });
    });
}

function advanceOrder(orderId) {
  const order = state.orders.find(
    item => item.id === orderId
  );

  if (!order) return;

  nextStatus(order);

  save(STORAGE.orders, state.orders);

  renderDashboard();

  showToast(`Statut : ${order.status}`);
}

function deleteOrder(orderId) {
  state.orders = state.orders.filter(
    order => order.id !== orderId
  );

  save(STORAGE.orders, state.orders);

  renderDashboard();

  showToast("Commande supprimée.");
}

/* =========================================================
   VILLE
   ========================================================= */

$("saveCity").addEventListener("click", () => {
  const city = $("dashboardCity").value.trim();

  if (!city) {
    showToast("Indique une ville.");
    return;
  }

  state.city = city;

  save(STORAGE.city, state.city);

  showToast("Ville de livraison enregistrée 🏙️");
});

/* =========================================================
   COMPTE
   ========================================================= */

$("saveAccount").addEventListener("click", () => {
  state.account.name = $("accountName").value.trim();
  state.account.email = $("accountEmail").value.trim();

  save(STORAGE.account, state.account);

  showToast("Compte enregistré.");
});

$("accountOrders").addEventListener("click", openDashboard);

$("modalOrders").addEventListener("click", () => {
  closeModal(accountModal);
  openDashboard();
});

$("modalDashboard").addEventListener("click", () => {
  closeModal(accountModal);
  openDashboard();
});

/* =========================================================
   SUPPRESSION DONNÉES
   ========================================================= */

$("deleteData").addEventListener("click", () => {

  const confirmed = confirm(
    "Supprimer toutes les données NovaShop de ce navigateur ?"
  );

  if (!confirmed) return;

  localStorage.removeItem(STORAGE.cart);
  localStorage.removeItem(STORAGE.orders);
  localStorage.removeItem(STORAGE.favorites);
  localStorage.removeItem(STORAGE.account);
  localStorage.removeItem(STORAGE.city);

  state.cart = {};
  state.orders = [];
  state.favorites = [];
  state.account = {
    name: "",
    email: ""
  };
  state.city = "";

  updateCart();
  renderDashboard();

  showToast("Toutes les données NovaShop ont été supprimées.");
});

/* =========================================================
   ÉVÉNEMENTS
   ========================================================= */

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderProducts();
});

$("cartBtn").addEventListener("click", openCart);
$("dashboardCart").addEventListener("click", openCart);

$("closeCart").addEventListener("click", closeCart);

$("checkoutBtn").addEventListener("click", openCheckout);

$("dashboardBtn").addEventListener("click", openDashboard);

$("accountBtn").addEventListener("click", () => {
  openModal(accountModal);
});

$("logoBtn").addEventListener("click", event => {
  event.preventDefault();

  state.category = "Tous";
  state.search = "";

  searchInput.value = "";

  renderCategories();
  renderProducts();
  showMarketplace();
});

$("discoverBtn").addEventListener("click", () => {
  document
    .getElementById("productsSection")
    .scrollIntoView({ behavior: "smooth" });
});

$("backMarketplace").addEventListener(
  "click",
  showMarketplace
);

$("backAccount").addEventListener(
  "click",
  showMarketplace
);

overlay.addEventListener("click", closeAll);

document
  .querySelectorAll("[data-close-modal]")
  .forEach(button => {
    button.addEventListener("click", () => {
      const modal = $(button.dataset.closeModal);
      closeModal(modal);
    });
  });

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAll();
  }
});

/* =========================================================
   INITIALISATION
   ========================================================= */

function init() {
  renderCategories();
  renderProducts();
  updateCart();
  renderDashboard();
}

init();
