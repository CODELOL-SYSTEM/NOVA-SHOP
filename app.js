const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxG7ovNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

const STORAGE = {
  cart: "nova_cart",
  favorites: "nova_favorites",
  orders: "nova_orders",
  reviews: "nova_reviews",
  admin: "nova_admin_unlocked",
  dark: "nova_dark",
  sound: "nova_sound",
  profiles: "nova_profiles"
};

const products = [
  {
    id: "p1",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    image: "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },
  {
    id: "p2",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    image: "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },
  {
    id: "p3",
    name: "HyperX Cloud II",
    category: "Casques",
    price: 49.99,
    image: "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
  },
  {
    id: "p4",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    image: "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },
  {
    id: "p5",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    image: "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },
  {
    id: "p6",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },
  {
    id: "p7",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    image: "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },
  {
    id: "p8",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    image: "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },
  {
    id: "p9",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    image: "https://pc.comparer.fr/500x500/310191422.webp"
  },
  {
    id: "p10",
    name: "CORSAIR RM1000x EU",
    category: "Alimentations",
    price: 159.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },
  {
    id: "p11",
    name: "CORSAIR RM850x EU",
    category: "Alimentations",
    price: 134.90,
    image: "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },
  {
    id: "p12",
    name: "Corsair Frame 5000D RS ARGB Noir",
    category: "Boîtiers",
    price: 159.90,
    image: "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },
  {
    id: "p13",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    image: "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },
  {
    id: "p14",
    name: "Samsung 27 QD-OLED Odyssey G6",
    category: "Écrans",
    price: 399.95,
    image: "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },
  {
    id: "p15",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    image: "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },
  {
    id: "p16",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    image: "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },
  {
    id: "p17",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    image: "https://media.materiel.net/r550/products/MN0005986139.jpg"
  },
  {
    id: "p18",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    image: "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  }
];

const promos = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};

let currentUser = null;
let currentCategory = "Tous";
let searchTerm = "";
let currentProductId = null;
let currentPromo = null;

let firebaseAuth = null;
let firebaseTools = null;

let firestore = null;
let firestoreTools = null;

let unsubscribeOrders = null;
let unsubscribeAdminOrders = null;

let liveOrders = [];

let addressVerified = false;
let verifiedAddress = null;

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
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value) || 0);
}

function dateFR(value) {
  if (!value) return "Date inconnue";

  try {
    let date = value;

    if (value?.toDate) {
      date = value.toDate();
    }

    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(date));
  } catch {
    return "Date inconnue";
  }
}

function toast(message) {
  const el = $("toast");

  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2800);
}

function openModal(id) {
  closeAllModals();

  const modal = $(id);

  if (!modal) return;

  modal.classList.add("open");

  if ($("overlay")) {
    $("overlay").style.display = "block";
  }
}

function closeModal(id) {
  const modal = $(id);

  if (modal) {
    modal.classList.remove("open");
  }

  if (!document.querySelector(".modal.open")) {
    if ($("overlay")) {
      $("overlay").style.display = "none";
    }
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal.open")
    .forEach(m => m.classList.remove("open"));

  if ($("overlay")) {
    $("overlay").style.display = "none";
  }
}

function playBop() {
  if (localStorage.getItem(STORAGE.sound) === "false") return;

  try {
    const AudioCtx =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 650;
    gain.gain.value = 0.035;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {}
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cart() {
  return load(STORAGE.cart, []);
}

function setCart(items) {
  save(STORAGE.cart, items);
  renderCart();
  updateCartCount();
}

function favorites() {
  return load(STORAGE.favorites, []);
}

function isFavorite(id) {
  return favorites().includes(id);
}

function toggleFavorite(id) {
  const list = favorites();
  const index = list.indexOf(id);

  if (index >= 0) {
    list.splice(index, 1);
    toast("Retiré des favoris");
  } else {
    list.push(id);
    toast("Ajouté aux favoris");
  }

  save(STORAGE.favorites, list);
  renderProducts();
}

function addToCart(id) {
  const items = cart();
  const found = items.find(x => x.id === id);

  if (found) {
    found.qty++;
  } else {
    items.push({
      id,
      qty: 1
    });
  }

  setCart(items);
  playBop();
  toast("Produit ajouté au panier");
}

function changeQty(id, delta) {
  const items = cart();
  const found = items.find(x => x.id === id);

  if (!found) return;

  found.qty += delta;

  if (found.qty <= 0) {
    const index = items.indexOf(found);
    items.splice(index, 1);
  }

  setCart(items);
}

function cartTotal() {
  return cart().reduce((total, item) => {
    const product = products.find(p => p.id === item.id);

    return total +
      (product ? product.price * item.qty : 0);
  }, 0);
}

function updateCartCount() {
  if (!$("cartCount")) return;

  $("cartCount").textContent =
    cart().reduce((a, b) => a + b.qty, 0);
}

function ratingData(productId) {
  const reviews = load(STORAGE.reviews, [])
    .filter(r => r.productId === productId);

  if (!reviews.length) {
    return {
      average: 0,
      count: 0,
      reviews: []
    };
  }

  const average =
    reviews.reduce(
      (sum, r) => sum + Number(r.rating),
      0
    ) / reviews.length;

  return {
    average,
    count: reviews.length,
    reviews
  };
}

function stars(value) {
  const rounded = Math.max(
    0,
    Math.min(5, Math.round(Number(value) || 0))
  );

  return "★".repeat(rounded) +
    "☆".repeat(5 - rounded);
}

function renderProducts() {
  const grid = $("productsGrid");

  if (!grid) return;

  let list = products.filter(product => {
    const categoryOk =
      currentCategory === "Tous" ||
      product.category === currentCategory;

    const searchOk =
      !searchTerm ||
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryOk && searchOk;
  });

  const sort = $("sortSelect")?.value;

  if (sort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if ($("resultsCount")) {
    $("resultsCount").textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;
  }

  if ($("emptyState")) {
    $("emptyState").style.display =
      list.length ? "none" : "block";
  }

  grid.innerHTML = "";

  list.forEach(product => {
    const rating = ratingData(product.id);

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
      <button
        class="favorite"
        data-favorite="${escapeHTML(product.id)}"
      >
        ${isFavorite(product.id) ? "❤️" : "♡"}
      </button>

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt=""
      >

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-name">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">
          ${
            rating.count
              ? `${stars(rating.average)} ${rating.average.toFixed(1)} (${rating.count})`
              : "☆☆☆☆☆ Aucun avis"
          }
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="product-buttons">

          <button
            class="view"
            data-view="${escapeHTML(product.id)}"
          >
            Voir
          </button>

          <button
            class="add"
            data-add="${escapeHTML(product.id)}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const img = card.querySelector("img");

    img.addEventListener("error", () => {
      img.style.visibility = "hidden";
    });

    grid.appendChild(card);
  });
}

function openProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  currentProductId = id;

  const data = ratingData(id);

  $("productContent").innerHTML = `
    <img
      src="${escapeHTML(product.image)}"
      style="width:100%;height:280px;object-fit:contain;background:white;border-radius:12px"
      alt=""
    >

    <h2 style="margin-top:18px">
      ${escapeHTML(product.name)}
    </h2>

    <p style="color:var(--muted);margin-top:6px">
      ${escapeHTML(product.category)}
    </p>

    <div style="margin-top:12px">
      ${stars(data.average)}
      ${data.count ? ` ${data.average.toFixed(1)}/5` : " Aucun avis"}
    </div>

    <div class="price">
      ${money(product.price)}
    </div>

    <button
      class="primary"
      style="width:100%;margin-top:15px"
      id="modalAdd"
    >
      🛒 Ajouter au panier
    </button>

    <hr style="margin:22px 0;border:0;border-top:1px solid var(--border)">

    <h3>Avis clients</h3>

    <div
      id="reviewsList"
      style="margin-top:12px"
    >
      ${
        data.reviews.length
          ? data.reviews.map(r => `
              <div class="cart-item">

                <strong>
                  ${escapeHTML(r.name)}
                </strong>

                <div>
                  ${stars(r.rating)}
                </div>

                <p style="margin-top:5px">
                  ${escapeHTML(r.comment)}
                </p>

                <small style="color:var(--muted)">
                  ${dateFR(r.date)}
                </small>

              </div>
            `).join("")
          : `
              <p style="color:var(--muted);margin-top:10px">
                Aucun avis.
              </p>
            `
      }
    </div>

    ${
      currentUser
        ? `
          <h3 style="margin-top:20px">
            Laisser un avis
          </h3>

          <form
            class="form"
            id="reviewForm"
            style="margin-top:10px"
          >

            <label>Note</label>

            <select id="reviewRating">
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>

            <label>Commentaire</label>

            <input
              id="reviewComment"
              maxlength="300"
              required
            >

            <button class="primary">
              Publier
            </button>

          </form>
        `
        : `
          <p style="margin-top:20px;color:var(--muted)">
            Connecte-toi pour laisser un avis.
          </p>
        `
    }
  `;

  $("modalAdd")?.addEventListener("click", () => {
    addToCart(id);
  });

  const form = $("reviewForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      submitReview(id);
    });
  }

  openModal("productModal");
}

function submitReview(productId) {
  if (!currentUser) return;

  const reviews = load(STORAGE.reviews, []);

  const already = reviews.some(
    r =>
      r.productId === productId &&
      r.userId === currentUser.uid
  );

  if (already) {
    toast("Tu as déjà noté ce produit.");
    return;
  }

  const rawName =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Client";

  const name =
    rawName.slice(0, 3) + "***";

  reviews.push({
    id: crypto.randomUUID(),
    productId,
    userId: currentUser.uid,
    name,
    rating: Number($("reviewRating").value),
    comment: $("reviewComment").value.trim(),
    date: new Date().toISOString()
  });

  save(STORAGE.reviews, reviews);

  toast("Avis publié");

  openProduct(productId);
}

function renderCart() {
  const items = cart();

  if (!items.length) {
    $("cartContent").innerHTML = `
      <p style="color:var(--muted)">
        Ton panier est vide.
      </p>
    `;

    $("cartTotal").textContent = money(0);

    return;
  }

  $("cartContent").innerHTML =
    items.map(item => {
      const p = products.find(x => x.id === item.id);

      if (!p) return "";

      return `
        <div class="cart-item">

          <div class="cart-row">

            <div>
              <strong>
                ${escapeHTML(p.name)}
              </strong>

              <div style="color:var(--muted)">
                ${money(p.price)}
              </div>
            </div>

            <div class="qty">

              <button
                data-minus="${escapeHTML(p.id)}"
              >
                −
              </button>

              <strong>
                ${item.qty}
              </strong>

              <button
                data-plus="${escapeHTML(p.id)}"
              >
                +
              </button>

            </div>

          </div>

        </div>
      `;
    }).join("");

  $("cartTotal").textContent =
    money(cartTotal());
}

function renderCheckout() {
  const subtotal = cartTotal();

  const discount = currentPromo
    ? subtotal * (currentPromo.discount / 100)
    : 0;

  const total = Math.max(
    0,
    subtotal - discount
  );

  $("checkoutSubtotal").textContent =
    money(subtotal);

  $("checkoutDiscount").textContent =
    "- " + money(discount);

  $("checkoutTotal").textContent =
    money(total);

  updatePayButton();
}

function applyPromo() {
  const code =
    $("promoCode").value
      .trim()
      .toUpperCase();

  if (!promos[code]) {
    currentPromo = null;

    $("promoMessage").textContent =
      "❌ Code invalide.";

    renderCheckout();

    return;
  }

  currentPromo = {
    code,
    discount: promos[code]
  };

  $("promoMessage").textContent =
    `✅ ${code} appliqué : ${promos[code]}%`;

  renderCheckout();
}

function updatePayButton() {
  const button = $("payButton");

  if (!button) return;

  if (!addressVerified) {
    button.disabled = true;

    button.textContent =
      "🔒 Vérifie ton adresse pour continuer";

    return;
  }

  if (!currentPromo) {
    button.disabled = true;

    button.textContent =
      "🎟️ Applique un code promotionnel";

    return;
  }

  button.disabled = false;

  button.textContent =
    "💳 Continuer vers le paiement";
}

function setAddressStatus(type, message) {
  const el = $("addressStatus");

  if (!el) return;

  el.className =
    `address-status show ${type}`;

  el.textContent = message;
}

function resetAddressVerification() {
  addressVerified = false;
  verifiedAddress = null;

  if ($("addressResult")) {
    $("addressResult").classList.remove("show");
    $("addressResult").innerHTML = "";
  }

  setAddressStatus(
    "error",
    "❌ Adresse non vérifiée"
  );

  updatePayButton();
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

async function verifyAddress() {
  const country =
    $("country").value
      .trim()
      .toLowerCase();

  const address =
    $("address").value.trim();

  const postalCode =
    $("postalCode").value.trim();

  const city =
    $("city").value.trim();

  if (!address || !postalCode || !city) {
    resetAddressVerification();

    setAddressStatus(
      "error",
      "❌ Complète l'adresse, le code postal et la ville."
    );

    return;
  }

  if (country !== "france") {
    resetAddressVerification();

    setAddressStatus(
      "error",
      "❌ La vérification automatique est disponible pour la France."
    );

    return;
  }

  if (!/^[0-9]{5}$/.test(postalCode)) {
    resetAddressVerification();

    setAddressStatus(
      "error",
      "❌ Code postal français invalide."
    );

    return;
  }

  setAddressStatus(
    "loading",
    "🔎 Vérification de l'adresse..."
  );

  $("addressResult").classList.remove("show");

  try {
    const query =
      `${address}, ${postalCode} ${city}`;

    const url =
      "https://api-adresse.data.gouv.fr/search/" +
      "?q=" + encodeURIComponent(query) +
      "&postcode=" + encodeURIComponent(postalCode) +
      "&city=" + encodeURIComponent(city) +
      "&limit=5";

    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error("Address API error");
    }

    const data =
      await response.json();

    const features =
      Array.isArray(data.features)
        ? data.features
        : [];

    const normalizedCity =
      normalizeText(city);

    const exact =
      features.find(feature => {
        const props =
          feature.properties || {};

        const cp =
          String(props.postcode || "");

        const resultCity =
          normalizeText(props.city);

        const score =
          Number(props.score || 0);

        return (
          cp === postalCode &&
          resultCity === normalizedCity &&
          score >= 0.70
        );
      });

    if (!exact) {
      resetAddressVerification();

      setAddressStatus(
        "error",
        "❌ Adresse incorrecte ou introuvable. Le paiement est bloqué."
      );

      return;
    }

    const props =
      exact.properties || {};

    const label =
      props.label ||
      `${address}, ${postalCode} ${city}`;

    verifiedAddress = {
      address: label,
      street: props.name || address,
      postalCode:
        props.postcode || postalCode,
      city:
        props.city || city,
      latitude:
        exact.geometry?.coordinates?.[1] ?? null,
      longitude:
        exact.geometry?.coordinates?.[0] ?? null
    };

    addressVerified = true;

    $("address").value =
      props.name || address;

    $("postalCode").value =
      verifiedAddress.postalCode;

    $("city").value =
      verifiedAddress.city;

    $("addressResult").innerHTML = `
      <strong>📍 Adresse reconnue</strong>
      <div style="margin-top:5px">
        ${escapeHTML(label)}
      </div>
    `;

    $("addressResult")
      .classList
      .add("show");

    setAddressStatus(
      "success",
      "✅ Adresse valide. Tu peux continuer."
    );

    updatePayButton();

  } catch (error) {
    console.error(error);

    resetAddressVerification();

    setAddressStatus(
      "error",
      "❌ Impossible de vérifier l'adresse. Le paiement reste bloqué."
    );
  }
}

function getDelivery(order) {
  const updatedAt =
    Number(order.deliveryUpdatedAt) ||
    new Date(
      order.createdAt || Date.now()
    ).getTime();

  const duration =
    Number(order.deliveryDurationSeconds) || 0;

  return {
    status:
      order.status ||
      "Préparation",

    truckLocation:
      order.truckLocation ||
      "Entrepôt",

    destination:
      order.destination ||
      order.address?.city ||
      "France",

    tracking:
      order.tracking ||
      "NOVA-TRK-N/A",

    durationSeconds:
      duration,

    updatedAt,

    deliveryDate:
      order.deliveryDate ||
      new Date(
        updatedAt +
        duration * 1000
      ).toISOString()
  };
}

function remaining(order) {
  const d = getDelivery(order);

  if (d.status === "Livrée") {
    return 0;
  }

  if (!d.durationSeconds) {
    return 0;
  }

  return Math.max(
    0,
    d.durationSeconds -
    Math.floor(
      (Date.now() - d.updatedAt) / 1000
    )
  );
}

function durationText(seconds) {
  seconds =
    Math.max(
      0,
      Math.floor(seconds)
    );

  const days =
    Math.floor(seconds / 86400);

  seconds %= 86400;

  const hours =
    Math.floor(seconds / 3600);

  seconds %= 3600;

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  return (
    `${days}j ` +
    `${String(hours).padStart(2, "0")}h ` +
    `${String(minutes).padStart(2, "0")}m ` +
    `${String(secs).padStart(2, "0")}s`
  );
}

function statusClass(status) {
  if (status === "Préparation") {
    return "status-prep";
  }

  if (status === "En transit") {
    return "status-transit";
  }

  if (status === "Arrivée imminente") {
    return "status-imminent";
  }

  if (status === "Livrée") {
    return "status-delivered";
  }

  return "";
}

function ordersForUser() {
  if (!currentUser) {
    return [];
  }

  return liveOrders.filter(order =>
    order.userId === currentUser.uid
  );
}

function renderOrders() {
  if (!$("ordersContent")) return;

  if (!currentUser) {
    $("ordersContent").innerHTML = `
      <p>
        Connecte-toi pour voir tes commandes.
      </p>
    `;

    return;
  }

  const orders =
    ordersForUser();

  if (!orders.length) {
    $("ordersContent").innerHTML = `
      <p style="color:var(--muted)">
        Aucune commande.
      </p>
    `;

    return;
  }

  $("ordersContent").innerHTML =
    orders.map(order => {
      const d = getDelivery(order);
      const left = remaining(order);

      const progress =
        d.status === "Livrée"
          ? 100
          : d.durationSeconds
            ? Math.max(
                5,
                Math.min(
                  100,
                  100 -
                  (
                    left /
                    d.durationSeconds *
                    100
                  )
                )
              )
            : 5;

      return `
        <div class="order">

          <strong>
            Commande #${escapeHTML(order.id)}
          </strong>

          <p style="margin-top:6px">
            ${dateFR(order.createdAt)}
          </p>

          <div
            class="order-status ${statusClass(d.status)}"
            style="margin-top:9px"
          >
            ${escapeHTML(d.status)}
          </div>

          <div class="delivery">

            <div>
              📍 Position :
              <strong>
                ${escapeHTML(d.truckLocation)}
              </strong>
            </div>

            <div>
              🎯 Destination :
              <strong>
                ${escapeHTML(d.destination)}
              </strong>
            </div>

            <div>
              🔎 Suivi :
              <strong>
                ${escapeHTML(d.tracking)}
              </strong>
            </div>

            <div class="countdown">
              ${
                d.status === "Livrée"
                  ? "✅ Livrée"
                  : left > 0
                    ? "⏱️ " + durationText(left)
                    : "🚚 Arrivée imminente"
              }
            </div>

            <div>
              📅 Livraison estimée :
              <strong>
                ${dateFR(d.deliveryDate)}
              </strong>
            </div>

            <div class="progress">
              <span
                style="width:${progress}%"
              ></span>
            </div>

          </div>

          <button
            class="secondary"
            style="margin-top:12px;width:100%"
            data-invoice="${escapeHTML(order.id)}"
          >
            🧾 Facture
          </button>

        </div>
      `;
    }).join("");
}

function isAdminEmail() {
  return (
    currentUser?.email
      ?.trim()
      .toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );
}

function isAdminUnlocked() {
  return localStorage.getItem(
    STORAGE.admin
  ) === "true";
}

function updateAccountUI() {
  if ($("accountButton")) {
    $("accountButton").textContent =
      currentUser ? "👤" : "🔐";
  }

  if ($("ordersButton")) {
    $("ordersButton").style.display =
      currentUser
        ? "inline-flex"
        : "none";
  }

  if ($("adminButton")) {
    $("adminButton").style.display =
      isAdminEmail()
        ? "inline-flex"
        : "none";
  }
}

function renderAccount() {
  if (!$("accountContent")) return;

  if (!currentUser) {
    $("accountContent").innerHTML = `
      <p>
        Tu n'es pas connecté.
      </p>

      <button
        class="primary"
        style="width:100%;margin-top:15px"
        id="accountLogin"
      >
        Se connecter
      </button>
    `;

    $("accountLogin")?.addEventListener(
      "click",
      () => openModal("authModal")
    );

    return;
  }

  $("accountContent").innerHTML = `
    <h3>
      👤 ${escapeHTML(
        currentUser.displayName ||
        "Compte NovaShop"
      )}
    </h3>

    <p style="margin-top:10px">
      ${escapeHTML(
        currentUser.email || ""
      )}
    </p>

    <button
      class="secondary"
      style="width:100%;margin-top:20px"
      id="accountOrders"
    >
      📦 Mes commandes
    </button>

    ${
      isAdminEmail()
        ? `
          <button
            class="primary"
            style="width:100%;margin-top:10px"
            id="accountDashboard"
          >
            👑 Ouvrir le dashboard
          </button>
        `
        : ""
    }

    <button
      class="primary"
      style="width:100%;margin-top:10px"
      id="logoutButton"
    >
      Se déconnecter
    </button>
  `;

  $("accountOrders")?.addEventListener(
    "click",
    () => {
      renderOrders();
      openModal("ordersModal");
    }
  );

  $("accountDashboard")?.addEventListener(
    "click",
    openAdminDashboard
  );

  $("logoutButton")?.addEventListener(
    "click",
    async () => {

      try {
        if (firebaseAuth) {
          await firebaseTools.signOut(
            firebaseAuth
          );
        }
      } catch {}

      currentUser = null;
      liveOrders = [];

      stopOrdersListener();
      stopAdminOrdersListener();

      localStorage.removeItem(
        STORAGE.admin
      );

      updateAccountUI();

      closeAllModals();

      toast("Déconnecté.");
    }
  );
}

function renderDashboard() {
  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  const orders = liveOrders;

  if ($("statOrders")) {
    $("statOrders").textContent =
      orders.length;
  }

  if ($("statFree")) {
    $("statFree").textContent =
      orders.filter(
        o => Number(o.discount) === 100
      ).length;
  }

  if ($("statCatalog")) {
    $("statCatalog").textContent =
      money(
        products.reduce(
          (a, p) => a + p.price,
          0
        )
      );
  }

  renderAdminOrders();
  renderAdminPromos();
}

function renderAdminOrders() {
  if (!$("adminOrders")) return;

  const orders = liveOrders;

  if (!orders.length) {
    $("adminOrders").innerHTML = `
      <p style="color:var(--muted);margin-top:10px">
        Aucune commande.
      </p>
    `;

    return;
  }

  $("adminOrders").innerHTML =
    orders.map(order => {

      const d = getDelivery(order);
      const left = remaining(order);

      const days =
        Math.floor(left / 86400);

      const hours =
        Math.floor(
          (left % 86400) / 3600
        );

      const minutes =
        Math.floor(
          (left % 3600) / 60
        );

      return `
        <div class="order">

          <strong>
            #${escapeHTML(order.id)}
          </strong>

          <p style="margin-top:7px">
            👤 ${escapeHTML(
              order.customer?.name ||
              "Client"
            )}
          </p>

          <p style="margin-top:4px">
            ✉️ ${escapeHTML(
              order.email || ""
            )}
          </p>

          <p style="margin-top:4px">
            📍 ${escapeHTML(
              order.address?.address || ""
            )},
            ${escapeHTML(
              order.address?.postalCode || ""
            )}
            ${escapeHTML(
              order.address?.city || ""
            )}
          </p>

          <div class="admin-grid">

            <div class="admin-field">

              <label>Statut</label>

              <select
                data-field="status"
                data-order="${escapeHTML(order.id)}"
              >
                ${
                  [
                    "Préparation",
                    "En transit",
                    "Arrivée imminente",
                    "Livrée"
                  ].map(x => `
                    <option
                      value="${escapeHTML(x)}"
                      ${x === d.status ? "selected" : ""}
                    >
                      ${escapeHTML(x)}
                    </option>
                  `).join("")
                }
              </select>

            </div>

            <div class="admin-field">

              <label>Suivi</label>

              <input
                data-field="tracking"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(d.tracking)}"
              >

            </div>

            <div class="admin-field">

              <label>📍 Position actuelle</label>

              <input
                data-field="truckLocation"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(d.truckLocation)}"
                placeholder="Ex : Lille"
              >

            </div>

            <div class="admin-field">

              <label>🎯 Destination affichée</label>

              <input
                data-field="destination"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(d.destination)}"
                placeholder="Ex : Lille"
              >

            </div>

            <div class="admin-field">

              <label>Jours</label>

              <input
                type="number"
                min="0"
                data-field="days"
                data-order="${escapeHTML(order.id)}"
                value="${days}"
              >

            </div>

            <div class="admin-field">

              <label>Heures</label>

              <input
                type="number"
                min="0"
                max="23"
                data-field="hours"
                data-order="${escapeHTML(order.id)}"
                value="${hours}"
              >

            </div>

            <div class="admin-field">

              <label>Minutes</label>

              <input
                type="number"
                min="0"
                max="59"
                data-field="minutes"
                data-order="${escapeHTML(order.id)}"
                value="${minutes}"
              >

            </div>

            <div class="admin-field">

              <label>Livraison actuelle</label>

              <input
                readonly
                value="${escapeHTML(
                  dateFR(d.deliveryDate)
                )}"
              >

            </div>

            <div class="admin-full">

              <button
                class="save"
                data-save-delivery="${escapeHTML(order.id)}"
              >
                💾 Enregistrer les changements
              </button>

              <button
                class="delete"
                data-delete-order="${escapeHTML(order.id)}"
              >
                🗑️ Supprimer la commande
              </button>

            </div>

          </div>

        </div>
      `;
    }).join("");
}

function renderAdminPromos() {
  if (!$("adminPromos")) return;

  $("adminPromos").innerHTML =
    Object.entries(promos)
      .map(([code, discount]) => `
        <div class="cart-item">

          <strong>
            ${escapeHTML(code)}
          </strong>

          <span style="float:right">
            ${discount}%
          </span>

        </div>
      `).join("");
}

function getAdminField(field, orderId) {
  const selector =
    `[data-field="${field}"][data-order="${CSS.escape(orderId)}"]`;

  return document.querySelector(selector);
}

async function saveDelivery(orderId) {
  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  if (!firestore) {
    toast("Firestore n'est pas disponible.");
    return;
  }

  const order =
    liveOrders.find(
      o => o.id === orderId
    );

  if (!order) return;

  const status =
    getAdminField("status", orderId)?.value ||
    "Préparation";

  const truckLocation =
    getAdminField(
      "truckLocation",
      orderId
    )?.value.trim() ||
    "Entrepôt";

  const destination =
    getAdminField(
      "destination",
      orderId
    )?.value.trim() ||
    order.address?.city ||
    "France";

  const tracking =
    getAdminField(
      "tracking",
      orderId
    )?.value.trim() ||
    `NOVA-TRK-${orderId}`;

  const days =
    Math.max(
      0,
      Number(
        getAdminField(
          "days",
          orderId
        )?.value
      ) || 0
    );

  const hours =
    Math.min(
      23,
      Math.max(
        0,
        Number(
          getAdminField(
            "hours",
            orderId
          )?.value
        ) || 0
      )
    );

  const minutes =
    Math.min(
      59,
      Math.max(
        0,
        Number(
          getAdminField(
            "minutes",
            orderId
          )?.value
        ) || 0
      )
    );

  let duration =
    days * 86400 +
    hours * 3600 +
    minutes * 60;

  if (status === "Livrée") {
    duration = 0;
  }

  const now = Date.now();

  const update = {
    status,
    truckLocation,
    destination,
    tracking,

    deliveryDurationSeconds:
      duration,

    deliveryUpdatedAt:
      now,

    deliveryDate:
      new Date(
        now +
        duration * 1000
      ).toISOString(),

    updatedAt:
      new Date().toISOString()
  };

  try {

    await firestoreTools.updateDoc(
      firestoreTools.doc(
        firestore,
        "orders",
        orderId
      ),
      update
    );

    toast(
      "🚚 Livraison synchronisée"
    );

  } catch (error) {

    console.error(error);

    toast(
      "❌ Impossible de modifier la commande"
    );
  }
}

async function deleteOrder(orderId) {
  if (
    !isAdminEmail() ||
    !isAdminUnlocked() ||
    !firestore
  ) {
    return;
  }

  const confirmed =
    confirm(
      `Supprimer définitivement la commande #${orderId} ?`
    );

  if (!confirmed) return;

  try {

    await firestoreTools.deleteDoc(
      firestoreTools.doc(
        firestore,
        "orders",
        orderId
      )
    );

    toast(
      "Commande supprimée"
    );

  } catch (error) {

    console.error(error);

    toast(
      "❌ Suppression impossible"
    );
  }
}

function createOrder() {
  if (!currentUser) {
    openModal("authModal");
    return;
  }

  if (
    !currentPromo ||
    currentPromo.discount !== 100
  ) {
    toast(
      "Pour la démo, utilise NOVA100."
    );

    return;
  }

  if (
    !addressVerified ||
    !verifiedAddress
  ) {
    setAddressStatus(
      "error",
      "❌ Adresse incorrecte. Paiement impossible."
    );

    updatePayButton();

    return;
  }

  const fullName =
    $("fullName").value.trim();

  const country =
    $("country").value.trim();

  const items = cart();

  if (!fullName) {
    toast("Complète ton nom.");
    return;
  }

  if (!items.length) {
    toast("Panier vide.");
    return;
  }

  const subtotal =
    cartTotal();

  const orderId =
    crypto.randomUUID()
      .replaceAll("-", "")
      .slice(0, 10)
      .toUpperCase();

  const now =
    Date.now();

  const deliveryDuration =
    259200;

  const order = {

    id: orderId,

    userId:
      currentUser.uid,

    email:
      currentUser.email || "",

    customer: {
      name: fullName
    },

    address: {
      country,

      address:
        verifiedAddress.address,

      street:
        verifiedAddress.street,

      postalCode:
        verifiedAddress.postalCode,

      city:
        verifiedAddress.city,

      latitude:
        verifiedAddress.latitude,

      longitude:
        verifiedAddress.longitude,

      verified: true
    },

    items,

    subtotal,

    discount:
      currentPromo.discount,

    total:
      Math.max(
        0,
        subtotal -
        subtotal *
        (currentPromo.discount / 100)
      ),

    promoCode:
      currentPromo.code,

    paymentStatus:
      "pending",

    status:
      "Préparation",

    truckLocation:
      "Entrepôt NovaShop",

    destination:
      verifiedAddress.city,

    tracking:
      "NOVA-TRK-" +
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase(),

    deliveryDurationSeconds:
      deliveryDuration,

    deliveryUpdatedAt:
      now,

    deliveryDate:
      new Date(
        now +
        deliveryDuration * 1000
      ).toISOString(),

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString()
  };

  saveOrderToFirestore(order);
}

async function saveOrderToFirestore(order) {
  if (!firestore) {
    toast(
      "❌ Service de commande indisponible."
    );

    return;
  }

  try {

    await firestoreTools.setDoc(
      firestoreTools.doc(
        firestore,
        "orders",
        order.id
      ),
      order
    );

    setCart([]);

    currentPromo = null;

    addressVerified = false;
    verifiedAddress = null;

    if ($("promoCode")) {
      $("promoCode").value = "";
    }

    if ($("promoMessage")) {
      $("promoMessage").textContent = "";
    }

    closeModal("checkoutModal");

    /*
      Le listener Firestore va récupérer
      automatiquement la commande.
    */

    setTimeout(() => {
      showInvoice(order.id);
    }, 250);

    toast(
      "🎉 Commande enregistrée dans Cloud Firestore"
    );

  } catch (error) {

    console.error(
      "Firestore create order:",
      error
    );

    toast(
      "❌ Impossible d'enregistrer la commande"
    );
  }
}

async function startPaypal() {
  if (!currentUser) {
    openModal("authModal");
    return;
  }

  if (!addressVerified) {
    toast(
      "❌ Adresse incorrecte. Paiement bloqué."
    );

    return;
  }

  if (
    !currentPromo ||
    currentPromo.discount !== 100
  ) {
    toast(
      "Utilise NOVA100 pour la démo gratuite."
    );

    return;
  }

  /*
    Ceci est actuellement une simulation.
    Aucun paiement PayPal réel n'est effectué.
  */

  await createOrder();
}

function findLiveOrder(orderId) {
  return liveOrders.find(
    order => order.id === orderId
  );
}

function showInvoice(orderId) {
  const order =
    findLiveOrder(orderId);

  if (!order) {
    toast(
      "Facture introuvable."
    );

    return;
  }

  $("invoiceContent").innerHTML = `
    <div class="invoice">

      <div class="invoice-head">

        <div>
          <h2>NOVASHOP</h2>
          <p>
            Matériel gaming
          </p>
        </div>

        <div>
          <strong>FACTURE</strong>
          <p>
            #${escapeHTML(order.id)}
          </p>
        </div>

      </div>

      <p>
        <strong>Date :</strong>
        ${dateFR(order.createdAt)}
      </p>

      <p style="margin-top:12px">

        <strong>Client :</strong><br>

        ${escapeHTML(
          order.customer?.name ||
          "Client"
        )}<br>

        ${escapeHTML(
          order.email || ""
        )}

      </p>

      <p style="margin-top:12px">

        <strong>Livraison :</strong><br>

        ${escapeHTML(
          order.address?.address || ""
        )}<br>

        ${escapeHTML(
          order.address?.postalCode || ""
        )}
        ${escapeHTML(
          order.address?.city || ""
        )}<br>

        ${escapeHTML(
          order.address?.country ||
          "France"
        )}

      </p>

      <table class="invoice-table">

        <thead>
          <tr>
            <th>Produit</th>
            <th>Qté</th>
            <th>Prix</th>
          </tr>
        </thead>

        <tbody>

          ${
            (order.items || [])
              .map(item => {

                const p =
                  products.find(
                    x => x.id === item.id
                  );

                return `
                  <tr>

                    <td>
                      ${escapeHTML(
                        p?.name ||
                        "Produit"
                      )}
                    </td>

                    <td>
                      ${item.qty}
                    </td>

                    <td>
                      ${money(
                        (p?.price || 0) *
                        item.qty
                      )}
                    </td>

                  </tr>
                `;

              })
              .join("")
          }

        </tbody>

      </table>

      <div class="total">
        <span>Sous-total</span>
        <span>
          ${money(order.subtotal)}
        </span>
      </div>

      <div class="total">
        <span>Réduction</span>
        <span>
          -${Number(order.discount) || 0}%
        </span>
      </div>

      <div class="total">
        <span>Total</span>
        <span>
          ${money(order.total)}
        </span>
      </div>

      <p>
        <strong>Paiement :</strong>
        ${escapeHTML(
          order.paymentStatus ||
          "pending"
        )}
      </p>

    </div>
  `;

  openModal("invoiceModal");
}

function showAuthError(error) {
  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "E-mail ou mot de passe incorrect.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cette adresse est déjà utilisée.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/popup-closed-by-user":
      "Fenêtre Google fermée.",

    "auth/popup-blocked":
      "La fenêtre Google a été bloquée.",

    "auth/unauthorized-domain":
      "Domaine non autorisé dans Firebase."

  };

  toast(
    messages[code] ||
    "Erreur de connexion."
  );
}

async function initFirebase() {
  try {

    const appModule =
      await import(
        "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
      );

    const authModule =
      await import(
        "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
      );

    const firestoreModule =
      await import(
        "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
      );

    const app =
      appModule.initializeApp(
        FIREBASE_CONFIG
      );

    firebaseAuth =
      authModule.getAuth(app);

    firebaseTools =
      authModule;

    firestore =
      firestoreModule.getFirestore(app);

    firestoreTools =
      firestoreModule;

    authModule.onAuthStateChanged(
      firebaseAuth,
      user => {

        currentUser = user;

        updateAccountUI();

        if (user) {
          startOrdersListener();
        } else {
          stopOrdersListener();
          stopAdminOrdersListener();

          liveOrders = [];
        }

        if (
          $("accountModal")
            ?.classList
            .contains("open")
        ) {
          renderAccount();
        }

        if (
          $("ordersModal")
            ?.classList
            .contains("open")
        ) {
          renderOrders();
        }

        if (
          isAdminEmail() &&
          isAdminUnlocked()
        ) {
          startAdminOrdersListener();
        }
      }
    );

  } catch (error) {

    console.error(
      "Firebase non disponible",
      error
    );

    toast(
      "⚠️ Firebase non disponible"
    );
  }
}

function startOrdersListener() {
  if (
    !firestore ||
    !currentUser
  ) {
    return;
  }

  stopOrdersListener();

  /*
    Pas de orderBy ici.
    Cela évite d'avoir besoin
    d'un index composite.
  */

  const query =
    firestoreTools.query(
      firestoreTools.collection(
        firestore,
        "orders"
      ),
      firestoreTools.where(
        "userId",
        "==",
        currentUser.uid
      )
    );

  unsubscribeOrders =
    firestoreTools.onSnapshot(
      query,
      snapshot => {

        liveOrders =
          snapshot.docs
            .map(doc => ({
              ...doc.data(),
              id: doc.id
            }))
            .sort(
              (a, b) =>
                new Date(
                  b.createdAt || 0
                ) -
                new Date(
                  a.createdAt || 0
                )
            );

        renderOrders();

        if (
          isAdminEmail() &&
          isAdminUnlocked()
        ) {
          renderDashboard();
        }

      },
      error => {

        console.error(
          "Orders listener:",
          error
        );

        toast(
          "❌ Impossible de charger tes commandes"
        );
      }
    );
}

function stopOrdersListener() {
  if (unsubscribeOrders) {
    unsubscribeOrders();
    unsubscribeOrders = null;
  }
}

function startAdminOrdersListener() {
  if (
    !firestore ||
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  stopAdminOrdersListener();

  const query =
    firestoreTools.collection(
      firestore,
      "orders"
    );

  unsubscribeAdminOrders =
    firestoreTools.onSnapshot(
      query,
      snapshot => {

        const orders =
          snapshot.docs
            .map(doc => ({
              ...doc.data(),
              id: doc.id
            }))
            .sort(
              (a, b) =>
                new Date(
                  b.createdAt || 0
                ) -
                new Date(
                  a.createdAt || 0
                )
            );

        liveOrders = orders;

        renderDashboard();

        if (
          $("ordersModal")
            ?.classList
            .contains("open")
        ) {
          renderOrders();
        }
      },
      error => {

        console.error(
          "Admin orders listener:",
          error
        );

        toast(
          "❌ Accès Firestore refusé"
        );
      }
    );
}

function stopAdminOrdersListener() {
  if (unsubscribeAdminOrders) {
    unsubscribeAdminOrders();
    unsubscribeAdminOrders = null;
  }
}

function openAdminDashboard() {
  if (!currentUser) {
    openModal("authModal");
    return;
  }

  if (!isAdminEmail()) {
    toast(
      "Compte non autorisé."
    );

    return;
  }

  if (!isAdminUnlocked()) {

    const code =
      prompt(
        "Code Dashboard NovaShop :"
      );

    if (code !== ADMIN_CODE) {
      toast(
        "Code incorrect."
      );

      return;
    }

    localStorage.setItem(
      STORAGE.admin,
      "true"
    );
  }

  startAdminOrdersListener();

  renderDashboard();

  openModal("dashboardModal");
}

async function loginEmail(e) {
  e.preventDefault();

  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );

    return;
  }

  try {

    await firebaseTools
      .signInWithEmailAndPassword(
        firebaseAuth,
        $("loginEmail").value.trim(),
        $("loginPassword").value
      );

    closeModal("authModal");

    toast(
      "Connexion réussie"
    );

  } catch (error) {
    showAuthError(error);
  }
}

async function signupEmail(e) {
  e.preventDefault();

  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );

    return;
  }

  const email =
    $("signupEmail")
      .value
      .trim();

  const phone =
    $("signupPhone")
      .value
      .trim();

  const password =
    $("signupPassword")
      .value;

  const confirm =
    $("signupConfirm")
      .value;

  if (password !== confirm) {
    toast(
      "Les mots de passe ne correspondent pas."
    );

    return;
  }

  if (phone.length < 8) {
    toast(
      "Numéro de téléphone invalide."
    );

    return;
  }

  try {

    const result =
      await firebaseTools
        .createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

    const profiles =
      load(
        STORAGE.profiles,
        {}
      );

    profiles[result.user.uid] = {
      phone
    };

    save(
      STORAGE.profiles,
      profiles
    );

    /*
      Création du profil Firestore.
    */

    if (firestore) {
      await firestoreTools.setDoc(
        firestoreTools.doc(
          firestore,
          "users",
          result.user.uid
        ),
        {
          email,
          phone,
          createdAt:
            new Date().toISOString()
        }
      );
    }

    closeModal("authModal");

    toast(
      "Compte créé"
    );

  } catch (error) {
    showAuthError(error);
  }
}

async function googleLogin() {
  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );

    return;
  }

  try {

    const provider =
      new firebaseTools
        .GoogleAuthProvider();

    await firebaseTools
      .signInWithPopup(
        firebaseAuth,
        provider
      );

    closeModal("authModal");

    toast(
      "Connexion Google réussie."
    );

  } catch (error) {
    showAuthError(error);
  }
}

function setupEvents() {

  $("searchButton")?.addEventListener(
    "click",
    () => {

      searchTerm =
        $("searchInput")
          .value
          .trim();

      renderProducts();
    }
  );

  $("searchInput")?.addEventListener(
    "keydown",
    e => {

      if (e.key === "Enter") {

        searchTerm =
          e.target.value
            .trim();

        renderProducts();
      }
    }
  );

  $("sortSelect")?.addEventListener(
    "change",
    renderProducts
  );

  document
    .querySelectorAll(".category")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".category")
            .forEach(x =>
              x.classList
                .remove("active")
            );

          button.classList
            .add("active");

          currentCategory =
            button.dataset.category;

          renderProducts();
        }
      );
    });

  $("productsGrid")?.addEventListener(
    "click",
    e => {

      const favorite =
        e.target.closest(
          "[data-favorite]"
        );

      const view =
        e.target.closest(
          "[data-view]"
        );

      const add =
        e.target.closest(
          "[data-add]"
        );

      if (favorite) {
        toggleFavorite(
          favorite.dataset.favorite
        );
      }

      if (view) {
        openProduct(
          view.dataset.view
        );
      }

      if (add) {
        addToCart(
          add.dataset.add
        );
      }
    }
  );

  $("cartContent")?.addEventListener(
    "click",
    e => {

      const plus =
        e.target.closest(
          "[data-plus]"
        );

      const minus =
        e.target.closest(
          "[data-minus]"
        );

      if (plus) {
        changeQty(
          plus.dataset.plus,
          1
        );
      }

      if (minus) {
        changeQty(
          minus.dataset.minus,
          -1
        );
      }
    }
  );

  $("cartButton")?.addEventListener(
    "click",
    () => {

      renderCart();
      openModal("cartModal");
    }
  );

  $("accountButton")?.addEventListener(
    "click",
    () => {

      renderAccount();
      openModal("accountModal");
    }
  );

  $("ordersButton")?.addEventListener(
    "click",
    () => {

      renderOrders();
      openModal("ordersModal");
    }
  );

  $("heroOrders")?.addEventListener(
    "click",
    () => {

      if (!currentUser) {
        openModal("authModal");
        return;
      }

      renderOrders();
      openModal("ordersModal");
    }
  );

  $("heroProducts")?.addEventListener(
    "click",
    () => {

      document
        .querySelector(".products-head")
        ?.scrollIntoView({
          behavior: "smooth"
        });
    }
  );

  $("checkoutButton")?.addEventListener(
    "click",
    () => {

      if (!currentUser) {
        openModal("authModal");
        return;
      }

      if (!cart().length) {
        toast(
          "Ton panier est vide."
        );

        return;
      }

      addressVerified = false;
      verifiedAddress = null;

      if ($("addressStatus")) {
        $("addressStatus")
          .className =
          "address-status";
      }

      if ($("addressResult")) {
        $("addressResult")
          .classList
          .remove("show");
      }

      renderCheckout();

      openModal(
        "checkoutModal"
      );
    }
  );

  $("verifyAddressButton")?.addEventListener(
    "click",
    verifyAddress
  );

  [
    "address",
    "postalCode",
    "city",
    "country"
  ].forEach(id => {

    $(id)?.addEventListener(
      "input",
      () => {

        if (addressVerified) {
          resetAddressVerification();
        }
      }
    );
  });

  $("applyPromo")?.addEventListener(
    "click",
    applyPromo
  );

  $("checkoutForm")?.addEventListener(
    "submit",
    e => {

      e.preventDefault();

      startPaypal();
    }
  );

  $("loginForm")?.addEventListener(
    "submit",
    loginEmail
  );

  $("signupForm")?.addEventListener(
    "submit",
    signupEmail
  );

  $("googleButton")?.addEventListener(
    "click",
    googleLogin
  );

  $("googleSignupButton")?.addEventListener(
    "click",
    googleLogin
  );

  $("loginTab")?.addEventListener(
    "click",
    () => {

      $("loginTab")
        .classList
        .add("active");

      $("signupTab")
        .classList
        .remove("active");

      $("loginForm")
        .classList
        .remove("hidden");

      $("signupForm")
        .classList
        .add("hidden");
    }
  );

  $("signupTab")?.addEventListener(
    "click",
    () => {

      $("signupTab")
        .classList
        .add("active");

      $("loginTab")
        .classList
        .remove("active");

      $("signupForm")
        .classList
        .remove("hidden");

      $("loginForm")
        .classList
        .add("hidden");
    }
  );

  $("adminButton")?.addEventListener(
    "click",
    openAdminDashboard
  );

  $("adminOrders")?.addEventListener(
    "click",
    e => {

      const saveButton =
        e.target.closest(
          "[data-save-delivery]"
        );

      const deleteButton =
        e.target.closest(
          "[data-delete-order]"
        );

      if (saveButton) {
        saveDelivery(
          saveButton
            .dataset
            .saveDelivery
        );
      }

      if (deleteButton) {
        deleteOrder(
          deleteButton
            .dataset
            .deleteOrder
        );
      }
    }
  );

  $("ordersContent")?.addEventListener(
    "click",
    e => {

      const button =
        e.target.closest(
          "[data-invoice]"
        );

      if (button) {
        showInvoice(
          button.dataset.invoice
        );
      }
    }
  );

  $("settingsButton")?.addEventListener(
    "click",
    () => {

      if ($("darkSwitch")) {
        $("darkSwitch").checked =
          localStorage.getItem(
            STORAGE.dark
          ) === "true";
      }

      if ($("soundSwitch")) {
        $("soundSwitch").checked =
          localStorage.getItem(
            STORAGE.sound
          ) !== "false";
      }

      openModal(
        "settingsModal"
      );
    }
  );

  $("darkSwitch")?.addEventListener(
    "change",
    e => {

      document.body
        .classList
        .toggle(
          "dark",
          e.target.checked
        );

      localStorage.setItem(
        STORAGE.dark,
        String(
          e.target.checked
        )
      );
    }
  );

  $("soundSwitch")?.addEventListener(
    "change",
    e => {

      localStorage.setItem(
        STORAGE.sound,
        String(
          e.target.checked
        )
      );
    }
  );

  $("printInvoice")?.addEventListener(
    "click",
    () => window.print()
  );

  document
    .querySelectorAll("[data-close]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {
          closeModal(
            button.dataset.close
          );
        }
      );
    });

  $("overlay")?.addEventListener(
    "click",
    closeAllModals
  );

  document.addEventListener(
    "keydown",
    e => {

      if (e.key === "Escape") {
        closeAllModals();
      }
    }
  );
}

function boot() {

  document.body
    .classList
    .toggle(
      "dark",
      localStorage.getItem(
        STORAGE.dark
      ) === "true"
    );

  setupEvents();

  renderProducts();

  renderCart();

  updateCartCount();

  updateAccountUI();

  setInterval(
    () => {

      if (
        $("ordersModal")
          ?.classList
          .contains("open")
      ) {
        renderOrders();
      }

      if (
        isAdminEmail() &&
        isAdminUnlocked() &&
        $("dashboardModal")
          ?.classList
          .contains("open")
      ) {
        renderAdminOrders();
      }

    },
    1000
  );
}

boot();

initFirebase();
