"use strict";

/*
  ============================================================
  NOVASHOP
  ============================================================

  CODE PROMO GRATUIT :
  NOVA100

  CODE DASHBOARD :
  NOVA-ADMIN

  Aucun paiement bancaire réel.
  Le bouton Payer crée une commande locale uniquement
  après validation du code NOVA100.
  ============================================================
*/

const PRODUCTS = [

  {
    id: "cpu-9600x",
    code: "NS-CPU-9600X",
    brand: "AMD",
    name: "AMD Ryzen 5 9600X",
    category: "Processeurs",
    price: 239.99,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg"
  },

  {
    id: "ram-corsair-32",
    code: "NS-RAM-COR-32",
    brand: "Corsair",
    name: "Vengeance RGB 32 Go DDR5-6000 CL38",
    category: "RAM",
    price: 119.99,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
  },

  {
    id: "ram-kingston-32",
    code: "NS-RAM-KF-32",
    brand: "Kingston",
    name: "FURY Beast RGB 32 Go DDR5-5600 CL36",
    category: "RAM",
    price: 99.99,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg"
  },

  {
    id: "ssd-990pro-1",
    code: "NS-SSD-990P-1T",
    brand: "Samsung",
    name: "990 PRO 1 To NVMe",
    category: "SSD",
    price: 109.99,
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
    name: "RM850x 850W",
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
    price: 159.99,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp"
  },

  {
    id: "aio-lf3",
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
    name: "Odyssey OLED G6 27 pouces",
    category: "Écrans",
    price: 599.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },

  {
    id: "keyboard-prox",
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
    price: 129.99,
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
    id: "dualsense",
    code: "NS-GAMEPAD-DS5",
    brand: "Sony",
    name: "DualSense Wireless Controller",
    category: "Manettes",
    price: 69.99,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
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

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  orders: "novashop_orders",
  profile: "novashop_profile"
};

const FREE_CODE = "NOVA100";
const DASHBOARD_CODE = "NOVA-ADMIN";

const STATUS_LIST = [
  "Commande reçue",
  "Préparation",
  "Expédiée",
  "En livraison",
  "Livrée"
];

const state = {
  category: "Tous",
  search: "",
  sort: "relevance",
  cart: load(STORAGE.cart, []),
  favorites: load(STORAGE.favorites, []),
  orders: load(STORAGE.orders, []),
  profile: load(STORAGE.profile, {}),
  discountValid: false
};

const $ = id => document.getElementById(id);

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

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

function toast(message) {
  const element = $("toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    element.classList.remove("show");
  }, 2800);
}

function init() {

  renderCategories();
  renderProducts();
  renderCart();
  updateAccountFields();

  $("searchBtn").addEventListener("click", performSearch);

  $("searchInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  $("sortSelect").addEventListener("change", event => {
    state.sort = event.target.value;
    renderProducts();
  });

  $("cartBtn").addEventListener("click", openCart);
  $("closeCart").addEventListener("click", closeCart);

  $("overlay").addEventListener("click", closeCart);

  $("checkoutBtn").addEventListener("click", openCheckout);

  $("accountBtn").addEventListener("click", () => {
    openModal("accountModal");
  });

  $("accountForm").addEventListener("submit", saveAccount);

  $("promoBtn").addEventListener("click", applyPromo);

  $("checkoutForm").addEventListener("submit", processPayment);

  $("backMarketplaceBtn").addEventListener("click", openMarketplace);

  $("deleteDataBtn").addEventListener("click", deleteAllData);

  $("printInvoiceBtn").addEventListener("click", printInvoice);

  document.addEventListener("click", globalClickHandler);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeEverything();
    }
  });

  window.addEventListener("storage", () => {
    state.cart = load(STORAGE.cart, []);
    state.favorites = load(STORAGE.favorites, []);
    state.orders = load(STORAGE.orders, []);
    renderProducts();
    renderCart();
  });
}

function renderCategories() {

  const container = $("categories");

  container.innerHTML = CATEGORIES.map(category => `
    <button
      class="category ${state.category === category ? "active" : ""}"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}

function renderProducts() {

  let products = [...PRODUCTS];

  const search = state.search.trim().toLowerCase();

  if (state.category !== "Tous") {
    products = products.filter(product =>
      product.category === state.category
    );
  }

  if (search) {
    products = products.filter(product => {
      const text = [
        product.name,
        product.brand,
        product.category,
        product.code
      ].join(" ").toLowerCase();

      return text.includes(search);
    });
  }

  if (state.sort === "priceAsc") {
    products.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "priceDesc") {
    products.sort((a, b) => b.price - a.price);
  }

  if (state.sort === "name") {
    products.sort((a, b) =>
      a.name.localeCompare(b.name, "fr")
    );
  }

  $("resultCount").textContent =
    `${products.length} produit${products.length > 1 ? "s" : ""}`;

  if (!products.length) {
    $("productsGrid").innerHTML = "";
    $("emptyState").classList.add("show");
    return;
  }

  $("emptyState").classList.remove("show");

  $("productsGrid").innerHTML = products.map(product => {

    const favorite = state.favorites.includes(product.id);

    return `
      <article class="product">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
          >

          <span
            class="image-error"
            style="display:none"
          >
            Image indisponible
          </span>

          <button
            class="favorite ${favorite ? "active" : ""}"
            data-action="favorite"
            data-id="${product.id}"
            aria-label="Favori"
          >
            ${favorite ? "♥" : "♡"}
          </button>

        </div>

        <div class="product-info">

          <div class="product-brand">
            ${escapeHTML(product.brand)}
          </div>

          <div class="product-name">
            ${escapeHTML(product.name)}
          </div>

          <span class="product-category">
            ${escapeHTML(product.category)}
          </span>

          <div class="product-bottom">

            <div>
              <div class="price">
                ${money(product.price)}
              </div>

              <div class="demo">
                Prix de démonstration
              </div>
            </div>

            <button
              class="add-btn"
              data-action="add"
              data-id="${product.id}"
            >
              Ajouter
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");
}

function performSearch() {

  const value = $("searchInput").value.trim();

  if (!value) {
    state.search = "";
    state.category = "Tous";
    renderCategories();
    renderProducts();
    return;
  }

  const normalized = value.toUpperCase();

  /*
    IMPORTANT :
    Le Dashboard n'est pas affiché dans la navigation.
    Il faut connaître le code exact.
  */

  if (normalized === DASHBOARD_CODE) {
    $("searchInput").value = "";
    state.search = "";
    openDashboard();
    toast("🔐 Code administrateur accepté");
    return;
  }

  state.search = value;
  state.category = "Tous";

  renderCategories();
  renderProducts();
}

function openMarketplace() {

  $("marketplaceView").classList.remove("hidden");
  $("dashboardView").classList.remove("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openDashboard() {

  $("marketplaceView").classList.add("hidden");
  $("dashboardView").classList.add("show");

  closeEverything();

  renderDashboard();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderDashboard() {

  const orders = [...state.orders]
    .sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

  const preparing = orders.filter(order =>
    order.status === "Commande reçue" ||
    order.status === "Préparation"
  ).length;

  const delivered = orders.filter(order =>
    order.status === "Livrée"
  ).length;

  const total = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  $("statOrders").textContent = orders.length;
  $("statPreparing").textContent = preparing;
  $("statDelivered").textContent = delivered;
  $("statTotal").textContent = money(total);

  $("dashboardCity").textContent =
    state.profile.city || "Non définie";

  const container = $("ordersList");

  if (!orders.length) {
    container.innerHTML = `
      <div style="
        text-align:center;
        padding:40px 10px;
        color:#6b7280
      ">
        <div style="font-size:35px">📦</div>
        <p style="margin-top:10px">
          Aucune commande pour le moment.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = orders.map(order => {

    const date = new Date(order.date).toLocaleString(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

    const items = order.items.map(item =>
      `${escapeHTML(item.name)} × ${item.qty}`
    ).join("<br>");

    const index = STATUS_LIST.indexOf(order.status);

    const canAdvance =
      index >= 0 &&
      index < STATUS_LIST.length - 1;

    return `
      <div class="order">

        <div class="order-top">

          <div>
            <strong>${escapeHTML(order.id)}</strong>

            <div style="
              color:#6b7280;
              font-size:12px;
              margin-top:4px
            ">
              ${escapeHTML(date)}
            </div>
          </div>

          <span class="status">
            ${escapeHTML(order.status)}
          </span>

        </div>

        <div class="order-items">
          ${items}
        </div>

        <div style="
          margin-top:12px;
          padding-top:12px;
          border-top:1px solid #e5e7eb;
          font-size:13px
        ">

          <strong>Livraison</strong><br>

          ${escapeHTML(order.delivery.fullName)}<br>
          ${escapeHTML(order.delivery.address)}<br>
          ${escapeHTML(order.delivery.postalCode)}
          ${escapeHTML(order.delivery.city)}<br>
          ${escapeHTML(order.delivery.country)}

        </div>

        <div style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          margin-top:15px
        ">

          <strong style="font-size:18px">
            ${money(order.total)}
          </strong>

          ${
            canAdvance
              ? `
                <button
                  class="secondary"
                  data-action="next-status"
                  data-order="${order.id}"
                >
                  Avancer le statut
                </button>
              `
              : `
                <span style="
                  color:#16a34a;
                  font-weight:800;
                  font-size:13px
                ">
                  ✓ Livrée
                </span>
              `
          }

        </div>

      </div>
    `;

  }).join("");
}

function addToCart(id) {

  const product = PRODUCTS.find(
    item => item.id === id
  );

  if (!product) return;

  const existing = state.cart.find(
    item => item.id === id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id,
      qty: 1
    });
  }

  save(STORAGE.cart, state.cart);

  renderCart();

  toast(`🛒 ${product.name} ajouté au panier`);
}

function changeQuantity(id, amount) {

  const item = state.cart.find(
    product => product.id === id
  );

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    state.cart = state.cart.filter(
      product => product.id !== id
    );
  }

  save(STORAGE.cart, state.cart);

  renderCart();
}

function removeFromCart(id) {

  state.cart = state.cart.filter(
    item => item.id !== id
  );

  save(STORAGE.cart, state.cart);

  renderCart();

  toast("Produit retiré du panier");
}

function getCartDetails() {

  return state.cart.map(item => {

    const product = PRODUCTS.find(
      product => product.id === item.id
    );

    if (!product) return null;

    return {
      ...product,
      qty: item.qty,
      subtotal: product.price * item.qty
    };

  }).filter(Boolean);
}

function getCartTotal() {

  return getCartDetails().reduce(
    (total, item) =>
      total + item.subtotal,
    0
  );
}

function renderCart() {

  const items = getCartDetails();

  const quantity = state.cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  $("cartCount").textContent = quantity;

  if (!items.length) {

    $("cartItems").innerHTML = `
      <div style="
        text-align:center;
        padding:60px 10px;
        color:#6b7280
      ">
        <div style="font-size:40px">🛒</div>
        <p style="margin-top:10px">
          Votre panier est vide.
        </p>
      </div>
    `;

  } else {

    $("cartItems").innerHTML = items.map(item => `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${escapeHTML(item.name)}"
          referrerpolicy="no-referrer"
        >

        <div class="cart-item-info">

          <div class="cart-item-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="cart-price">
            ${money(item.subtotal)}
          </div>

          <div class="qty">

            <button
              data-action="qty-minus"
              data-id="${item.id}"
            >
              −
            </button>

            <strong>${item.qty}</strong>

            <button
              data-action="qty-plus"
              data-id="${item.id}"
            >
              +
            </button>

            <button
              class="remove"
              data-action="remove"
              data-id="${item.id}"
            >
              Supprimer
            </button>

          </div>

        </div>

      </div>

    `).join("");
  }

  $("cartTotal").textContent =
    money(getCartTotal());

  $("checkoutBtn").disabled =
    items.length === 0;
}

function openCart() {

  $("overlay").classList.add("show");
  $("cartDrawer").classList.add("open");
}

function closeCart() {

  $("overlay").classList.remove("show");
  $("cartDrawer").classList.remove("open");
}

function openModal(id) {

  $(id).classList.add("show");
}

function closeModal(id) {

  $(id).classList.remove("show");
}

function closeEverything() {

  closeCart();

  document.querySelectorAll(".modal-wrap")
    .forEach(modal => {
      modal.classList.remove("show");
    });

  $("overlay").classList.remove("show");
}

function openCheckout() {

  if (!state.cart.length) {
    toast("🛒 Le panier est vide");
    return;
  }

  closeCart();

  state.discountValid = false;

  $("promoInput").value = "";
  $("promoStatus").textContent = "";
  $("promoStatus").className = "promo-status";

  updateCheckoutTotal();

  $("fullName").value =
    state.profile.name || "";

  $("address").value =
    state.profile.address || "";

  $("postalCode").value =
    state.profile.postalCode || "";

  $("city").value =
    state.profile.city || "";

  $("country").value =
    state.profile.country || "France";

  openModal("checkoutModal");
}

function updateCheckoutTotal() {

  const original = getCartTotal();

  const total =
    state.discountValid
      ? 0
      : original;

  $("checkoutTotal").textContent =
    money(total);

  $("payBtn").textContent =
    `🔓 Payer ${money(total)}`;

  $("payBtn").disabled =
    !state.discountValid;
}

function applyPromo(event) {

  event.preventDefault();

  const code =
    $("promoInput").value
      .trim()
      .toUpperCase();

  const status = $("promoStatus");

  if (code === FREE_CODE) {

    state.discountValid = true;

    status.textContent =
      "✓ Code accepté : réduction de 100 % appliquée.";

    status.className =
      "promo-status success";

    toast("🎟️ Réduction de 100 % activée");

    updateCheckoutTotal();

    return;
  }

  state.discountValid = false;

  status.textContent =
    "Code invalide.";

  status.className =
    "promo-status error";

  updateCheckoutTotal();
}

function processPayment(event) {

  event.preventDefault();

  /*
    SÉCURITÉ DU SYSTÈME DE DÉMO :
    impossible de créer une commande tant que
    NOVA100 n'a pas été validé.
  */

  if (!state.discountValid) {

    toast("🔒 Entre d'abord le code de réduction");

    return;
  }

  const form = $("checkoutForm");

  if (!form.checkValidity()) {

    form.reportValidity();

    return;
  }

  const items = getCartDetails();

  if (!items.length) {

    toast("Panier vide");

    return;
  }

  const delivery = {
    fullName: $("fullName").value.trim(),
    address: $("address").value.trim(),
    postalCode: $("postalCode").value.trim(),
    city: $("city").value.trim(),
    country: $("country").value
  };

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
      "Entrepôt NovaShop",

    discountCode:
      FREE_CODE,

    originalTotal:
      getCartTotal(),

    discount:
      getCartTotal(),

    total:
      0,

    delivery,

    items:
      items.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        brand: item.brand,
        qty: item.qty,
        unitPrice: item.price,
        subtotal: item.subtotal
      }))

  };

  state.orders.push(order);

  save(STORAGE.orders, state.orders);

  state.profile = {
    ...state.profile,
    name: delivery.fullName,
    address: delivery.address,
    postalCode: delivery.postalCode,
    city: delivery.city,
    country: delivery.country
  };

  save(STORAGE.profile, state.profile);

  state.cart = [];

  save(STORAGE.cart, state.cart);

  renderCart();

  closeModal("checkoutModal");

  createInvoice(order);

  toast("✅ Commande créée et facture générée");

  state.discountValid = false;
}

function createInvoice(order) {

  const date =
    new Date(order.date).toLocaleString(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

  const itemsRows = order.items.map(item => `

    <tr>
      <td>
        ${escapeHTML(item.name)}
      </td>

      <td>
        ${item.qty}
      </td>

      <td>
        ${money(item.unitPrice)}
      </td>

      <td>
        ${money(item.subtotal)}
      </td>
    </tr>

  `).join("");

  $("invoiceContent").innerHTML = `

    <div class="invoice">

      <div class="invoice-head">

        <div>
          <h2>NOVASHOP</h2>

          <p style="
            color:#6b7280;
            margin-top:5px
          ">
            Facture de démonstration
          </p>
        </div>

        <div style="text-align:right">

          <strong>
            ${escapeHTML(order.id)}
          </strong>

          <div style="
            color:#6b7280;
            margin-top:5px;
            font-size:13px
          ">
            ${escapeHTML(date)}
          </div>

        </div>

      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
        margin-bottom:25px
      ">

        <div>
          <strong>Client</strong>

          <p style="
            margin-top:7px;
            line-height:1.6
          ">
            ${escapeHTML(order.delivery.fullName)}<br>
            ${escapeHTML(order.delivery.address)}<br>
            ${escapeHTML(order.delivery.postalCode)}
            ${escapeHTML(order.delivery.city)}<br>
            ${escapeHTML(order.delivery.country)}
          </p>
        </div>

        <div>
          <strong>Expédition</strong>

          <p style="
            margin-top:7px;
            line-height:1.6
          ">
            ${escapeHTML(order.warehouse)}<br>
            Statut : ${escapeHTML(order.status)}
          </p>
        </div>

      </div>

      <table class="invoice-items">

        <thead>
          <tr>
            <th>Produit</th>
            <th>Qté</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${itemsRows}
        </tbody>

      </table>

      <div style="
        margin-top:15px;
        text-align:right;
        color:#16a34a;
        font-weight:800
      ">
        Code promo : ${FREE_CODE} (-100 %)
      </div>

      <div style="
        margin-top:5px;
        text-align:right;
        color:#6b7280
      ">
        Sous-total : ${money(order.originalTotal)}
      </div>

      <div class="invoice-total">
        Total payé : 0,00 €
      </div>

      <div style="
        margin-top:18px;
        padding:12px;
        background:#f8fafc;
        border-radius:8px;
        color:#6b7280;
        font-size:12px
      ">
        Facture générée automatiquement par NovaShop.
        Cette facture appartient à une démonstration locale
        et ne constitue pas une preuve de paiement bancaire.
      </div>

    </div>

  `;

  openModal("invoiceModal");
}

function printInvoice() {

  const content =
    $("invoiceContent").innerHTML;

  const win =
    window.open(
      "",
      "_blank",
      "width=900,height=700"
    );

  if (!win) {

    toast("Autorise les fenêtres pop-up pour imprimer");

    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Facture NovaShop</title>

      <style>

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
        }

        .invoice{
          max-width:850px;
          margin:auto;
        }

        .invoice-head{
          display:flex;
          justify-content:space-between;
          border-bottom:1px solid #ddd;
          padding-bottom:20px;
          margin-bottom:20px;
        }

        .invoice-items{
          width:100%;
          border-collapse:collapse;
        }

        th,td{
          padding:12px 5px;
          text-align:left;
          border-bottom:1px solid #ddd;
        }

        .invoice-total{
          text-align:right;
          font-size:25px;
          font-weight:bold;
          margin-top:20px;
        }

      </style>

    </head>

    <body>

      ${content}

      <script>
        window.onload = function(){
          window.print();
        };
      <\/script>

    </body>
    </html>
  `);

  win.document.close();
}

function saveAccount(event) {

  event.preventDefault();

  state.profile = {
    ...state.profile,

    name:
      $("accountName").value.trim(),

    email:
      $("accountEmail").value.trim()
  };

  save(STORAGE.profile, state.profile);

  closeModal("accountModal");

  toast("✓ Compte enregistré");
}

function updateAccountFields() {

  $("accountName").value =
    state.profile.name || "";

  $("accountEmail").value =
    state.profile.email || "";
}

function toggleFavorite(id) {

  if (state.favorites.includes(id)) {

    state.favorites =
      state.favorites.filter(
        item => item !== id
      );

    toast("Retiré des favoris");

  } else {

    state.favorites.push(id);

    toast("♥ Ajouté aux favoris");
  }

  save(
    STORAGE.favorites,
    state.favorites
  );

  renderProducts();
}

function openProduct(id) {

  const product =
    PRODUCTS.find(item => item.id === id);

  if (!product) return;

  const favorite =
    state.favorites.includes(product.id);

  $("productModalBody").innerHTML = `

    <div class="product-detail">

      <div class="detail-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          referrerpolicy="no-referrer"
        >

      </div>

      <div>

        <div class="product-brand">
          ${escapeHTML(product.brand)}
        </div>

        <h1 style="
          font-size:28px;
          margin-top:7px
        ">
          ${escapeHTML(product.name)}
        </h1>

        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <div class="demo">
          Prix de démonstration
        </div>

        <div class="code">
          Code produit : <strong>${product.code}</strong>
        </div>

        <div style="
          display:flex;
          gap:10px;
          margin-top:20px
        ">

          <button
            class="primary"
            data-action="add"
            data-id="${product.id}"
          >
            Ajouter au panier
          </button>

          <button
            class="secondary"
            data-action="favorite"
            data-id="${product.id}"
          >
            ${favorite ? "♥ Favori" : "♡ Favori"}
          </button>

        </div>

      </div>

    </div>

  `;

  openModal("productModal");
}

function nextOrderStatus(orderId) {

  const order =
    state.orders.find(
      item => item.id === orderId
    );

  if (!order) return;

  const index =
    STATUS_LIST.indexOf(order.status);

  if (
    index < 0 ||
    index >= STATUS_LIST.length - 1
  ) {
    return;
  }

  order.status =
    STATUS_LIST[index + 1];

  save(
    STORAGE.orders,
    state.orders
  );

  renderDashboard();

  toast(`📦 Statut : ${order.status}`);
}

function deleteAllData() {

  const confirmed =
    window.confirm(
      "Supprimer toutes les données locales NovaShop ?"
    );

  if (!confirmed) return;

  Object.values(STORAGE)
    .forEach(key => {
      localStorage.removeItem(key);
    });

  state.cart = [];
  state.favorites = [];
  state.orders = [];
  state.profile = {};
  state.discountValid = false;

  renderCart();
  renderProducts();
  updateAccountFields();
  renderDashboard();

  openMarketplace();

  toast("Données NovaShop supprimées");
}

function globalClickHandler(event) {

  const category =
    event.target.closest("[data-category]");

  if (category) {

    state.category =
      category.dataset.category;

    state.search = "";

    $("searchInput").value = "";

    renderCategories();
    renderProducts();

    return;
  }

  const actionElement =
    event.target.closest("[data-action]");

  if (actionElement) {

    const action =
      actionElement.dataset.action;

    const id =
      actionElement.dataset.id;

    if (action === "add") {
      addToCart(id);
      return;
    }

    if (action === "favorite") {
      toggleFavorite(id);
      return;
    }

    if (action === "qty-minus") {
      changeQuantity(id, -1);
      return;
    }

    if (action === "qty-plus") {
      changeQuantity(id, 1);
      return;
    }

    if (action === "remove") {
      removeFromCart(id);
      return;
    }

    if (action === "next-status") {
      nextOrderStatus(
        actionElement.dataset.order
      );
      return;
    }
  }

  const close =
    event.target.closest("[data-close]");

  if (close) {

    closeModal(
      close.dataset.close
    );

    return;
  }

  const productCard =
    event.target.closest(".product");

  if (
    productCard &&
    !event.target.closest("button")
  ) {

    const addButton =
      productCard.querySelector(
        '[data-action="add"]'
      );

    if (addButton) {
      openProduct(
        addButton.dataset.id
      );
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
