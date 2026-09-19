"use strict";

/* =========================================================
   NOVASHOP
   Application marketplace locale
   2 fichiers : index.html + script.js
   Aucun paiement réel.
   ========================================================= */

const PRODUCTS = [
  {
    id: "NS-CPU-001",
    category: "cpu",
    brand: "AMD",
    name: "AMD Ryzen 5 9600X",
    price: 249.99,
    stock: 14,
    rating: 4.8,
    image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
    description: "Processeur AMD Ryzen 5 destiné aux configurations gaming et polyvalentes.",
    specs: {
      "Socket": "AM5",
      "Cœurs": "6",
      "Threads": "12",
      "Architecture": "Zen 5"
    }
  },

  {
    id: "NS-RAM-001",
    category: "ram",
    brand: "Corsair",
    name: "Corsair Vengeance RGB 32 Go DDR5 6000",
    price: 119.99,
    stock: 22,
    rating: 4.8,
    image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
    description: "Kit mémoire DDR5 32 Go avec éclairage RGB.",
    specs: {
      "Capacité": "32 Go",
      "Type": "DDR5",
      "Fréquence": "6000 MHz",
      "Format": "DIMM"
    }
  },

  {
    id: "NS-RAM-002",
    category: "ram",
    brand: "Kingston",
    name: "Kingston Fury Beast RGB 32 Go DDR5 5600",
    price: 104.99,
    stock: 18,
    rating: 4.7,
    image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
    description: "Kit mémoire Kingston Fury Beast RGB de 32 Go.",
    specs: {
      "Capacité": "32 Go",
      "Type": "DDR5",
      "Fréquence": "5600 MHz",
      "RGB": "Oui"
    }
  },

  {
    id: "NS-SSD-001",
    category: "ssd",
    brand: "Samsung",
    name: "Samsung 990 PRO 1 To",
    price: 89.99,
    stock: 31,
    rating: 4.9,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 1 To.",
    specs: {
      "Capacité": "1 To",
      "Interface": "PCIe 4.0 NVMe",
      "Format": "M.2",
      "Famille": "990 PRO"
    }
  },

  {
    id: "NS-SSD-002",
    category: "ssd",
    brand: "Samsung",
    name: "Samsung 990 PRO 2 To",
    price: 159.99,
    stock: 19,
    rating: 4.9,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
    description: "SSD NVMe Samsung 990 PRO de 2 To.",
    specs: {
      "Capacité": "2 To",
      "Interface": "PCIe 4.0 NVMe",
      "Format": "M.2",
      "Famille": "990 PRO"
    }
  },

  {
    id: "NS-PSU-001",
    category: "psu",
    brand: "Corsair",
    name: "Corsair RM850x",
    price: 139.99,
    stock: 11,
    rating: 4.8,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
    description: "Alimentation Corsair RM850x destinée aux configurations puissantes.",
    specs: {
      "Puissance": "850 W",
      "Format": "ATX",
      "Modulaire": "Oui",
      "Certification": "80 PLUS"
    }
  },

  {
    id: "NS-CASE-001",
    category: "case",
    brand: "Corsair",
    name: "Corsair 5000D Airflow White",
    price: 149.99,
    stock: 8,
    rating: 4.8,
    image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
    description: "Boîtier ATX Corsair 5000D Airflow blanc.",
    specs: {
      "Format": "ATX",
      "Couleur": "Blanc",
      "Façade": "Airflow",
      "Panneau": "Verre trempé"
    }
  },

  {
    id: "NS-COOL-001",
    category: "cooling",
    brand: "ARCTIC",
    name: "ARCTIC Liquid Freezer III 360",
    price: 109.99,
    stock: 13,
    rating: 4.8,
    image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
    description: "Système de refroidissement liquide 360 mm.",
    specs: {
      "Type": "Watercooling",
      "Radiateur": "360 mm",
      "Ventilateurs": "3",
      "Couleur": "Noir"
    }
  },

  {
    id: "NS-MON-001",
    category: "monitor",
    brand: "Samsung",
    name: "Samsung Odyssey OLED G6 27",
    price: 599.99,
    stock: 5,
    rating: 4.9,
    image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
    description: "Écran gaming Samsung Odyssey OLED G6 27 pouces.",
    specs: {
      "Taille": "27 pouces",
      "Technologie": "OLED",
      "Résolution": "QHD",
      "Type": "Gaming"
    }
  },

  {
    id: "NS-KEY-001",
    category: "keyboard",
    brand: "Logitech",
    name: "Logitech G PRO X TKL Wireless",
    price: 189.99,
    stock: 9,
    rating: 4.7,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
    description: "Clavier gaming Logitech G PRO X TKL Wireless.",
    specs: {
      "Format": "TKL",
      "Connexion": "Sans fil",
      "Usage": "Gaming",
      "Marque": "Logitech G"
    }
  },

  {
    id: "NS-MOUSE-001",
    category: "mouse",
    brand: "Logitech",
    name: "Logitech G PRO X SUPERLIGHT 2",
    price: 129.99,
    stock: 12,
    rating: 4.9,
    image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
    description: "Souris gaming sans fil Logitech G PRO X SUPERLIGHT 2.",
    specs: {
      "Connexion": "Sans fil",
      "Usage": "Gaming",
      "Poids": "Léger",
      "Gamme": "PRO X"
    }
  },

  {
    id: "NS-MIC-001",
    category: "mic",
    brand: "Elgato",
    name: "Elgato Wave:3",
    price: 129.99,
    stock: 10,
    rating: 4.8,
    image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
    description: "Microphone USB Elgato Wave:3.",
    specs: {
      "Connexion": "USB",
      "Usage": "Streaming",
      "Marque": "Elgato",
      "Type": "Condensateur"
    }
  },

  {
    id: "NS-CONT-001",
    category: "controller",
    brand: "Sony",
    name: "Sony DualSense PS5",
    price: 69.99,
    stock: 17,
    rating: 4.8,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
    description: "Manette sans fil Sony DualSense pour PlayStation 5.",
    specs: {
      "Connexion": "Sans fil",
      "Plateforme": "PS5",
      "Fonctions": "Retour haptique",
      "Marque": "Sony"
    }
  }
];

/* =========================================================
   ÉTAT
   ========================================================= */

const STORAGE_KEY = "novashop_state_v2";

let state = {
  cart: [],
  favorites: [],
  orders: [],
  client: {
    name: "",
    email: "",
    city: "",
    zip: "",
    address: ""
  },
  warehouseCity: "Lille",
  category: "all",
  search: "",
  page: 1
};

const PRODUCTS_PER_PAGE = 12;

/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderProducts();
  renderCart();
  renderFavorites();
  renderDashboard();
  updateCheckoutPreview();

  document
    .getElementById("searchInput")
    .addEventListener("keydown", event => {
      if (event.key === "Enter") {
        performSearch();
      }
    });

  [
    "checkoutAddress",
    "checkoutZip",
    "checkoutCity",
    "checkoutCountry"
  ].forEach(id => {
    const element = document.getElementById(id);

    if (element) {
      element.addEventListener("input", updateCheckoutPreview);
      element.addEventListener("change", updateCheckoutPreview);
    }
  });
});

/* =========================================================
   STOCKAGE
   ========================================================= */

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const parsed = JSON.parse(saved);

    state = {
      ...state,
      ...parsed,
      client: {
        ...state.client,
        ...(parsed.client || {})
      }
    };
  } catch (error) {
    console.error("Erreur localStorage", error);
  }
}

/* =========================================================
   UTILITAIRES
   ========================================================= */

function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}

function getCategoryName(category) {
  const names = {
    all: "Tous les produits",
    pc: "PC",
    gpu: "Cartes graphiques",
    cpu: "Processeurs",
    motherboard: "Cartes mères",
    ram: "RAM",
    ssd: "SSD",
    case: "Boîtiers",
    psu: "Alimentations",
    cooling: "Refroidissement",
    monitor: "Écrans",
    keyboard: "Claviers",
    mouse: "Souris",
    headset: "Casques",
    mic: "Microphones",
    controller: "Manettes",
    streaming: "Streaming",
    accessory: "Accessoires"
  };

  return names[category] || category;
}

function toast(message) {
  const element = document.getElementById("toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2600);
}

/* =========================================================
   RECHERCHE
   ========================================================= */

function performSearch() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim();

  if (!query) {
    state.search = "";
    state.page = 1;
    showShop();
    renderProducts();
    return;
  }

  const exactCode = PRODUCTS.find(
    product => product.id.toLowerCase() === query.toLowerCase()
  );

  if (exactCode) {
    openProduct(exactCode.id);
    return;
  }

  const codeMatch = PRODUCTS.find(
    product =>
      product.id.toLowerCase().includes(query.toLowerCase())
  );

  if (codeMatch && query.toLowerCase().startsWith("ns-")) {
    openProduct(codeMatch.id);
    return;
  }

  state.search = query;
  state.category = "all";
  state.page = 1;

  showShop();
  renderProducts();

  const resultCount = getFilteredProducts().length;

  if (resultCount === 0) {
    toast("Aucun produit trouvé");
  } else {
    toast(resultCount + " produit(s) trouvé(s)");
  }
}

/*
   SYSTÈME DEMANDÉ :
   si on recherche un code produit qui correspond,
   le Dashboard peut aussi être utilisé comme centre
   de gestion de cette recherche.
*/

function searchProductCodeFromDashboard() {
  const input = document.getElementById("dashboardCodeSearch");
  const code = input.value.trim();

  const product = PRODUCTS.find(
    p => p.id.toLowerCase() === code.toLowerCase()
  );

  const result = document.getElementById("dashboardSearchResult");

  if (!product) {
    result.innerHTML = `
      <div class="search-dashboard">
        Aucun produit ne correspond au code
        <strong>${escapeHTML(code)}</strong>.
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="search-dashboard">
      Produit trouvé :
      <strong>${escapeHTML(product.name)}</strong>
      • ${escapeHTML(product.id)}
      • ${money(product.price)}
      • Stock : ${product.stock}
    </div>
  `;

  toast("Produit trouvé dans le Dashboard");
}

/* =========================================================
   PRODUITS
   ========================================================= */

function getFilteredProducts() {
  let products = [...PRODUCTS];

  if (state.category !== "all") {
    products = products.filter(
      product => product.category === state.category
    );
  }

  if (state.search) {
    const query = state.search.toLowerCase();

    products = products.filter(product =>
      [
        product.id,
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  const sort = document.getElementById("sortSelect")?.value || "default";

  if (sort === "priceAsc") {
    products.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    products.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return products;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("resultCount");

  if (!grid) return;

  const products = getFilteredProducts();

  count.textContent =
    products.length +
    " produit" +
    (products.length > 1 ? "s" : "") +
    " • " +
    getCategoryName(state.category);

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE)
  );

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const start = (state.page - 1) * PRODUCTS_PER_PAGE;
  const visible = products.slice(
    start,
    start + PRODUCTS_PER_PAGE
  );

  if (!visible.length) {
    grid.innerHTML = `
      <div class="empty">
        <div style="font-size:32px;margin-bottom:10px">🔎</div>
        Aucun produit trouvé.
      </div>
    `;

    renderPagination(0);
    return;
  }

  grid.innerHTML = visible.map(productCard).join("");

  renderPagination(totalPages);
}

function productCard(product) {
  const favorite = state.favorites.includes(product.id);

  return `
    <article class="product-card">

      <div class="product-photo">

        ${
          product.stock <= 5
            ? `<div class="badge">STOCK LIMITÉ</div>`
            : `<div class="badge">NOVA</div>`
        }

        <button
          class="favorite"
          onclick="toggleFavorite('${product.id}')"
          title="Ajouter aux favoris"
        >
          ${favorite ? "♥" : "♡"}
        </button>

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.opacity='0.2'"
        >
      </div>

      <div class="product-info">

        <div class="product-brand">
          ${escapeHTML(product.brand)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          ★★★★★
          <span style="color:#777">
            ${product.rating}
          </span>
        </div>

        <div class="price-row">
          <div class="price">${money(product.price)}</div>

          <div class="stock">
            ${product.stock > 0 ? "En stock" : "Rupture"}
          </div>
        </div>

        <div class="product-actions">
          <button
            class="details"
            onclick="openProduct('${product.id}')"
          >
            Détails
          </button>

          <button
            class="add"
            onclick="addToCart('${product.id}')"
            ${product.stock <= 0 ? "disabled" : ""}
          >
            Ajouter
          </button>
        </div>

      </div>
    </article>
  `;
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button
        class="${i === state.page ? "active" : ""}"
        onclick="goPage(${i})"
      >
        ${i}
      </button>
    `;
  }

  pagination.innerHTML = html;
}

function goPage(page) {
  state.page = page;
  renderProducts();
  window.scrollTo({
    top: 300,
    behavior: "smooth"
  });
}

function setCategory(category, button = null) {
  state.category = category;
  state.search = "";
  state.page = 1;

  document.getElementById("searchInput").value = "";

  document
    .querySelectorAll(".nav button")
    .forEach(btn => btn.classList.remove("active"));

  document
    .querySelectorAll(".filter-btn")
    .forEach(btn => btn.classList.remove("active"));

  if (button) {
    button.classList.add("active");
  }

  renderProducts();
}

/* =========================================================
   PRODUIT DETAIL
   ========================================================= */

function openProduct(id) {
  const product = getProduct(id);

  if (!product) return;

  const specs = Object.entries(product.specs)
    .map(
      ([key, value]) => `
        <div class="spec">
          <span>${escapeHTML(key)}</span>
          <strong>${escapeHTML(value)}</strong>
        </div>
      `
    )
    .join("");

  document.getElementById("productModalContent").innerHTML = `
    <div class="product-detail">

      <div class="detail-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >
      </div>

      <div class="detail-info">

        <div class="product-brand">
          ${escapeHTML(product.brand)}
        </div>

        <h2>${escapeHTML(product.name)}</h2>

        <div class="detail-code">
          Code produit : <strong>${escapeHTML(product.id)}</strong>
        </div>

        <div class="rating">
          ★★★★★ ${product.rating}/5
        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <div class="detail-description">
          ${escapeHTML(product.description)}
        </div>

        <button
          class="primary"
          onclick="addToCart('${product.id}');closeModal('productModal')"
        >
          Ajouter au panier
        </button>

        <div class="specs">
          ${specs}
        </div>

      </div>

    </div>
  `;

  document.getElementById("productModal").classList.add("show");
}

/* =========================================================
   CATÉGORIE / VUE
   ========================================================= */

function showShop() {
  document.getElementById("shopView").classList.remove("hide");
  document.getElementById("dashboardView").classList.remove("show");

  closeAllPanels();
}

function goDashboard() {
  closeAllPanels();

  document.getElementById("shopView").classList.add("hide");
  document.getElementById("dashboardView").classList.add("show");

  renderDashboard();
}

function dashboardTab(tab, button) {
  document
    .querySelectorAll(".dash-section")
    .forEach(section => section.classList.remove("active"));

  document
    .querySelectorAll(".dash-nav button")
    .forEach(btn => btn.classList.remove("active"));

  const target = document.getElementById(
    "dash" +
      tab.charAt(0).toUpperCase() +
      tab.slice(1)
  );

  if (target) {
    target.classList.add("active");
  }

  if (button) {
    button.classList.add("active");
  }

  renderDashboard();
}

/* =========================================================
   PANIER
   ========================================================= */

function addToCart(id) {
  const product = getProduct(id);

  if (!product) return;

  if (product.stock <= 0) {
    toast("Produit en rupture de stock");
    return;
  }

  const existing = state.cart.find(
    item => item.id === id
  );

  if (existing) {
    if (existing.quantity >= product.stock) {
      toast("Stock maximum atteint");
      return;
    }

    existing.quantity++;
  } else {
    state.cart.push({
      id,
      quantity: 1
    });
  }

  saveState();
  renderCart();
  renderDashboard();

  toast("Produit ajouté au panier");
}

function removeFromCart(id) {
  state.cart = state.cart.filter(
    item => item.id !== id
  );

  saveState();
  renderCart();
  renderDashboard();
}

function changeQuantity(id, amount) {
  const item = state.cart.find(
    cartItem => cartItem.id === id
  );

  const product = getProduct(id);

  if (!item || !product) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  if (item.quantity > product.stock) {
    item.quantity = product.stock;
    toast("Stock maximum atteint");
  }

  saveState();
  renderCart();
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = getProduct(item.id);

    return total + (
      product
        ? product.price * item.quantity
        : 0
    );
  }, 0);
}

function getCartQuantity() {
  return state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const total = document.getElementById("cartTotal");

  if (!body) return;

  if (!state.cart.length) {
    body.innerHTML = `
      <div class="empty">
        🛒<br><br>
        Ton panier est vide.
      </div>
    `;

    total.textContent = money(0);
    return;
  }

  body.innerHTML = state.cart
    .map(item => {
      const product = getProduct(item.id);

      if (!product) return "";

      return `
        <div class="cart-item">

          <img
            src="${escapeHTML(product.image)}"
            alt=""
          >

          <div>
            <div class="cart-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="cart-price">
              ${money(product.price)}
            </div>

            <div class="qty">
              <button onclick="changeQuantity('${product.id}',-1)">−</button>
              <strong>${item.quantity}</strong>
              <button onclick="changeQuantity('${product.id}',1)">+</button>
            </div>
          </div>

          <button
            class="close"
            onclick="removeFromCart('${product.id}')"
          >
            ✕
          </button>

        </div>
      `;
    })
    .join("");

  total.textContent = money(getCartTotal());
}

function openCart() {
  document.getElementById("overlay").classList.add("show");
  document.getElementById("cartDrawer").classList.add("show");
  renderCart();
}

/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);

  if (index >= 0) {
    state.favorites.splice(index, 1);
    toast("Retiré des favoris");
  } else {
    state.favorites.push(id);
    toast("Ajouté aux favoris");
  }

  saveState();
  renderProducts();
  renderFavorites();
  renderDashboard();
}

function renderFavorites() {
  const body = document.getElementById("favoritesBody");

  if (!body) return;

  const products = state.favorites
    .map(getProduct)
    .filter(Boolean);

  if (!products.length) {
    body.innerHTML = `
      <div class="empty">
        ♡<br><br>
        Aucun favori.
      </div>
    `;

    return;
  }

  body.innerHTML = products
    .map(product => `
      <div class="cart-item">

        <img
          src="${escapeHTML(product.image)}"
          alt=""
        >

        <div>
          <div class="cart-name">
            ${escapeHTML(product.name)}
          </div>

          <div class="cart-price">
            ${money(product.price)}
          </div>
        </div>

        <button
          class="close"
          onclick="toggleFavorite('${product.id}')"
        >
          ♥
        </button>

      </div>
    `)
    .join("");
}

function openFavorites() {
  document.getElementById("overlay").classList.add("show");
  document.getElementById("favoritesDrawer").classList.add("show");
  renderFavorites();
}

/* =========================================================
   COMPTE
   ========================================================= */

function openAccount() {
  document.getElementById("clientName").value =
    state.client.name || "";

  document.getElementById("clientEmail").value =
    state.client.email || "";

  document.getElementById("clientCity").value =
    state.client.city || "";

  document.getElementById("clientZip").value =
    state.client.zip || "";

  document.getElementById("clientAddress").value =
    state.client.address || "";

  document.getElementById("accountModal").classList.add("show");
}

function saveClient() {
  state.client.name =
    document.getElementById("clientName").value.trim();

  state.client.email =
    document.getElementById("clientEmail").value.trim();

  state.client.city =
    document.getElementById("clientCity").value.trim();

  state.client.zip =
    document.getElementById("clientZip").value.trim();

  state.client.address =
    document.getElementById("clientAddress").value.trim();

  saveState();
  renderDashboard();

  closeModal("accountModal");

  toast("Compte enregistré");
}

/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {
  if (!state.cart.length) {
    toast("Ton panier est vide");
    return;
  }

  document.getElementById("checkoutName").value =
    state.client.name || "";

  document.getElementById("checkoutEmail").value =
    state.client.email || "";

  document.getElementById("checkoutAddress").value =
    state.client.address || "";

  document.getElementById("checkoutZip").value =
    state.client.zip || "";

  document.getElementById("checkoutCity").value =
    state.client.city || "";

  document.getElementById("checkoutCountry").value =
    "France";

  document.getElementById("checkoutTotal").textContent =
    money(getCartTotal());

  updateCheckoutPreview();

  closeAllPanels();

  document.getElementById("checkoutModal").classList.add("show");
}

function updateCheckoutPreview() {
  const address =
    document.getElementById("checkoutAddress")?.value.trim() || "";

  const zip =
    document.getElementById("checkoutZip")?.value.trim() || "";

  const city =
    document.getElementById("checkoutCity")?.value.trim() || "";

  const country =
    document.getElementById("checkoutCountry")?.value || "";

  const preview =
    document.getElementById("checkoutAddressPreview");

  if (!preview) return;

  if (!address && !zip && !city) {
    preview.textContent =
      "Aucune adresse renseignée.";

    return;
  }

  preview.innerHTML = `
    <strong>Adresse de livraison</strong><br>
    ${escapeHTML(address || "Adresse manquante")}<br>
    ${escapeHTML(zip || "Code postal manquant")}
    ${escapeHTML(city || "Ville manquante")}<br>
    ${escapeHTML(country || "Pays manquant")}
  `;
}

function validateOrder() {
  if (!state.cart.length) {
    toast("Panier vide");
    return;
  }

  const name =
    document.getElementById("checkoutName").value.trim();

  const email =
    document.getElementById("checkoutEmail").value.trim();

  const address =
    document.getElementById("checkoutAddress").value.trim();

  const zip =
    document.getElementById("checkoutZip").value.trim();

  const city =
    document.getElementById("checkoutCity").value.trim();

  const country =
    document.getElementById("checkoutCountry").value;

  if (
    !name ||
    !email ||
    !address ||
    !zip ||
    !city ||
    !country
  ) {
    toast("Adresse complète obligatoire");
    return;
  }

  if (!email.includes("@")) {
    toast("Adresse email invalide");
    return;
  }

  for (const item of state.cart) {
    const product = getProduct(item.id);

    if (!product) continue;

    if (item.quantity > product.stock) {
      toast("Stock insuffisant pour " + product.name);
      return;
    }
  }

  const orderId =
    "NS-" +
    Date.now().toString(36).toUpperCase();

  const order = {
    id: orderId,
    date: new Date().toISOString(),
    status: "waiting",
    statusLabel: "Commande reçue",
    customer: {
      name,
      email
    },
    address: {
      address,
      zip,
      city,
      country
    },
    items: state.cart.map(item => {
      const product = getProduct(item.id);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      };
    }),
    total: getCartTotal()
  };

  state.orders.unshift(order);

  state.client = {
    name,
    email,
    city,
    zip,
    address
  };

  state.cart = [];

  saveState();

  closeModal("checkoutModal");

  renderCart();
  renderDashboard();

  toast("Commande " + orderId + " créée");
}

/* =========================================================
   COMMANDES
   ========================================================= */

function statusClass(status) {
  return {
    waiting: "waiting",
    preparing: "preparing",
    shipped: "shipped",
    delivered: "delivered",
    cancelled: "cancelled"
  }[status] || "waiting";
}

function statusText(status) {
  return {
    waiting: "Commande reçue",
    preparing: "Préparation",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée"
  }[status] || status;
}

function renderOrders(targetId, limit = null) {
  const target = document.getElementById(targetId);

  if (!target) return;

  let orders = [...state.orders];

  if (limit) {
    orders = orders.slice(0, limit);
  }

  if (!orders.length) {
    target.innerHTML = `
      <div class="empty">
        📦<br><br>
        Aucune commande.
      </div>
    `;

    return;
  }

  target.innerHTML = orders.map(order => `
    <div class="order-row">

      <div>
        <strong>${escapeHTML(order.id)}</strong>
        <br>
        <span style="color:#777">
          ${new Date(order.date).toLocaleDateString("fr-FR")}
        </span>
      </div>

      <div>
        ${order.items.length}
        article(s)
      </div>

      <div>
        ${money(order.total)}
      </div>

      <div>
        <span class="status ${statusClass(order.status)}">
          ${escapeHTML(statusText(order.status))}
        </span>
      </div>

      <button
        class="filter-btn"
        onclick="openOrder('${order.id}')"
      >
        Voir
      </button>

    </div>
  `).join("");
}

function openOrder(id) {
  const order = state.orders.find(
    item => item.id === id
  );

  if (!order) return;

  const products = order.items.map(item => `
    <div class="cart-item">

      <img src="${escapeHTML(item.image)}" alt="">

      <div>
        <div class="cart-name">
          ${escapeHTML(item.name)}
        </div>

        <div>
          ${item.quantity} × ${money(item.price)}
        </div>
      </div>

      <strong>
        ${money(item.quantity * item.price)}
      </strong>

    </div>
  `).join("");

  document.getElementById("productModalContent").innerHTML = `
    <h2 style="margin-bottom:6px">
      Commande ${escapeHTML(order.id)}
    </h2>

    <p style="font-size:12px;color:#777;margin-bottom:20px">
      ${new Date(order.date).toLocaleString("fr-FR")}
    </p>

    <div class="panel">
      <strong>Statut</strong>
      <div style="margin-top:9px">
        <span class="status ${statusClass(order.status)}">
          ${escapeHTML(statusText(order.status))}
        </span>
      </div>
    </div>

    <div class="panel">
      <strong>Adresse de livraison</strong>

      <div class="address-preview">
        ${escapeHTML(order.address.address)}<br>
        ${escapeHTML(order.address.zip)}
        ${escapeHTML(order.address.city)}<br>
        ${escapeHTML(order.address.country)}
      </div>
    </div>

    <div class="panel">
      <strong>Articles</strong>
      ${products}
    </div>

    <div class="total">
      <span>Total</span>
      <span>${money(order.total)}</span>
    </div>
  `;

  document.getElementById("productModal").classList.add("show");
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {
  const statProducts =
    document.getElementById("statProducts");

  if (!statProducts) return;

  statProducts.textContent = PRODUCTS.length;

  document.getElementById("statStock").textContent =
    PRODUCTS.reduce(
      (total, product) => total + product.stock,
      0
    );

  document.getElementById("statOrders").textContent =
    state.orders.length;

  document.getElementById("statFavorites").textContent =
    state.favorites.length;

  document.getElementById("warehouseCity").value =
    state.warehouseCity || "Lille";

  document.getElementById("accountName").textContent =
    state.client.name || "Client NovaShop";

  document.getElementById("accountEmail").textContent =
    state.client.email || "Non renseigné";

  document.getElementById("accountCity").textContent =
    state.client.city || "Non définie";

  document.getElementById("accountOrdersCount").textContent =
    state.orders.length;

  renderOrders("overviewOrders", 5);
  renderOrders("allOrders");
  renderWarehouse();

  const searchMessage =
    document.getElementById("searchDashboardMessage");

  if (state.search) {
    searchMessage.innerHTML = `
      <div class="search-dashboard">
        Recherche actuelle :
        <strong>${escapeHTML(state.search)}</strong>
      </div>
    `;
  } else {
    searchMessage.innerHTML = "";
  }
}

function renderWarehouse() {
  const target =
    document.getElementById("warehouseList");

  if (!target) return;

  target.innerHTML = PRODUCTS.map(product => `
    <div class="warehouse-row">

      <div>
        <strong>${escapeHTML(product.name)}</strong>
        <br>
        <span style="color:#777">
          ${escapeHTML(product.id)}
        </span>
      </div>

      <div>
        ${escapeHTML(product.brand)}
      </div>

      <div>
        ${product.stock} unité(s)
      </div>

      <div>
        ${money(product.price)}
      </div>

      <div>
        ${
          product.stock > 5
            ? `<span class="status delivered">Disponible</span>`
            : `<span class="status waiting">Stock limité</span>`
        }
      </div>

    </div>
  `).join("");
}

function saveWarehouseCity() {
  const input =
    document.getElementById("warehouseCity");

  const city = input.value.trim();

  if (!city) {
    toast("Ville obligatoire");
    return;
  }

  state.warehouseCity = city;

  saveState();
  renderDashboard();

  toast("Ville de l'entrepôt enregistrée");
}

/* =========================================================
   SUPPRESSION DES DONNÉES DU COMPTE
   ========================================================= */

function deleteAllAccountData() {
  const confirmed = confirm(
    "Supprimer toutes les données du compte, les commandes, les favoris et le panier ?"
  );

  if (!confirmed) return;

  state = {
    cart: [],
    favorites: [],
    orders: [],
    client: {
      name: "",
      email: "",
      city: "",
      zip: "",
      address: ""
    },
    warehouseCity: "Lille",
    category: "all",
    search: "",
    page: 1
  };

  localStorage.removeItem(STORAGE_KEY);

  renderProducts();
  renderCart();
  renderFavorites();
  renderDashboard();

  toast("Toutes les données locales ont été supprimées");
}

/* =========================================================
   PANNEAUX
   ========================================================= */

function closeModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }
}

function closeAllPanels() {
  document
    .getElementById("overlay")
    .classList.remove("show");

  document
    .getElementById("cartDrawer")
    .classList.remove("show");

  document
    .getElementById("favoritesDrawer")
    .classList.remove("show");
}

/* =========================================================
   RACCOURCIS
   ========================================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAllPanels();

    document
      .querySelectorAll(".modal")
      .forEach(modal => {
        modal.classList.remove("show");
      });
  }

  if (
    event.ctrlKey &&
    event.key.toLowerCase() === "k"
  ) {
    event.preventDefault();

    document
      .getElementById("searchInput")
      .focus();
  }
});

/* =========================================================
   AUTO-SAUVEGARDE
   ========================================================= */

setInterval(() => {
  saveState();
}, 5000);

/* =========================================================
   EXPOSITION DEBUG
   ========================================================= */

window.NovaShop = {
  products: PRODUCTS,
  state,
  saveState,
  renderProducts,
  renderDashboard,
  openProduct,
  openCart,
  openFavorites,
  goDashboard
};
