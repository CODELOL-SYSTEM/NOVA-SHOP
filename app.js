const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAZ5vAkAEfIBpflyhxG7ovNdJ67KYKWD0",
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
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },
  {
    id:"p2",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },
  {
    id:"p3",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
  },
  {
    id:"p4",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },
  {
    id:"p5",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },
  {
    id:"p6",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },
  {
    id:"p7",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },
  {
    id:"p8",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },
  {
    id:"p9",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp"
  },
  {
    id:"p10",
    name:"CORSAIR RM1000x EU",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },
  {
    id:"p11",
    name:"CORSAIR RM850x EU",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },
  {
    id:"p12",
    name:"Corsair Frame 5000D RS ARGB Noir",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },
  {
    id:"p13",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },
  {
    id:"p14",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },
  {
    id:"p15",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },
  {
    id:"p16",
    name:"Sony DualSense Cosmic Red PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg"
  },
  {
    id:"p17",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg"
  },
  {
    id:"p18",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
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
let firebaseDB = null;
let firebaseTools = null;
let firebaseFirestore = null;

const $ = id => document.getElementById(id);


/* =========================================================
   LOCAL STORAGE
========================================================= */

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Impossible de sauvegarder dans localStorage :", error);
  }
}


/* =========================================================
   UTILITAIRES
========================================================= */

function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value) || 0);
}

function dateFR(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
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
  const el = $("toast");

  if (!el) {
    console.log(message);
    return;
  }

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    el.classList.remove("show");
  }, 3000);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {
  closeAllModals();

  const modal = $(id);

  if (!modal) return;

  modal.classList.add("open");

  const overlay = $("overlay");

  if (overlay) {
    overlay.style.display = "block";
  }
}

function closeModal(id) {
  const modal = $(id);

  if (modal) {
    modal.classList.remove("open");
  }

  if (!document.querySelector(".modal.open")) {
    const overlay = $("overlay");

    if (overlay) {
      overlay.style.display = "none";
    }
  }
}

function closeAllModals() {
  document
    .querySelectorAll(".modal.open")
    .forEach(modal => modal.classList.remove("open"));

  const overlay = $("overlay");

  if (overlay) {
    overlay.style.display = "none";
  }
}


/* =========================================================
   SON
========================================================= */

function playBop() {
  if (localStorage.getItem(STORAGE.sound) === "false") {
    return;
  }

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

    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 200);
  } catch {}
}


/* =========================================================
   PANIER
========================================================= */

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
    toast("Retiré des favoris.");
  } else {
    list.push(id);
    toast("Ajouté aux favoris ❤️");
  }

  save(STORAGE.favorites, list);

  renderProducts();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

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

  toast("Produit ajouté au panier 🛒");
}

function changeQty(id, delta) {
  const items = cart();
  const found = items.find(x => x.id === id);

  if (!found) return;

  found.qty += delta;

  if (found.qty <= 0) {
    const index = items.indexOf(found);

    if (index >= 0) {
      items.splice(index, 1);
    }
  }

  setCart(items);
}

function cartTotal() {
  return cart().reduce((total, item) => {
    const product = products.find(p => p.id === item.id);

    return total + (
      product
        ? product.price * item.qty
        : 0
    );
  }, 0);
}

function updateCartCount() {
  const el = $("cartCount");

  if (!el) return;

  el.textContent = cart()
    .reduce((total, item) => total + Number(item.qty || 0), 0);
}


/* =========================================================
   AVIS
========================================================= */

function ratingData(productId) {
  const reviews = load(STORAGE.reviews, [])
    .filter(review => review.productId === productId);

  if (!reviews.length) {
    return {
      average: 0,
      count: 0,
      reviews: []
    };
  }

  const average =
    reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
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


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts() {
  const grid = $("productsGrid");

  if (!grid) return;

  let list = products.filter(product => {
    const categoryOK =
      currentCategory === "Tous" ||
      product.category === currentCategory;

    const searchOK =
      !searchTerm ||
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryOK && searchOK;
  });

  const sortElement = $("sortSelect");
  const sort = sortElement?.value || "";

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

  const results = $("resultsCount");

  if (results) {
    results.textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;
  }

  const empty = $("emptyState");

  if (empty) {
    empty.style.display =
      list.length ? "none" : "block";
  }

  grid.innerHTML = "";

  list.forEach(product => {
    const rating = ratingData(product.id);

    const card = document.createElement("article");

    card.className = "card";
    card.dataset.productId = product.id;

    card.innerHTML = `
      <button
        class="favorite"
        data-favorite="${escapeHTML(product.id)}"
        type="button"
      >
        ${isFavorite(product.id) ? "❤️" : "♡"}
      </button>

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
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
            type="button"
          >
            Voir
          </button>

          <button
            class="add"
            data-add="${escapeHTML(product.id)}"
            type="button"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    const img = card.querySelector("img");

    if (img) {
      img.addEventListener("error", () => {
        card.remove();
        updateVisibleCount();
      });
    }

    grid.appendChild(card);
  });
}

function updateVisibleCount() {
  const results = $("resultsCount");

  if (!results) return;

  const count =
    document.querySelectorAll(
      "#productsGrid .card"
    ).length;

  results.textContent =
    `${count} produit${count > 1 ? "s" : ""}`;
}


/* =========================================================
   PRODUIT DETAIL
========================================================= */

function openProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  currentProductId = id;

  const data = ratingData(id);

  const content = $("productContent");

  if (!content) return;

  content.innerHTML = `
    <img
      src="${escapeHTML(product.image)}"
      alt="${escapeHTML(product.name)}"
      style="
        width:100%;
        height:280px;
        object-fit:contain;
        background:white;
        border-radius:12px
      "
    >

    <h2 style="margin-top:18px">
      ${escapeHTML(product.name)}
    </h2>

    <p style="color:var(--muted);margin-top:6px">
      ${escapeHTML(product.category)}
    </p>

    <div style="margin-top:12px">
      ${stars(data.average)}
      ${
        data.count
          ? ` ${data.average.toFixed(1)}/5`
          : " Aucun avis"
      }
    </div>

    <div class="price">
      ${money(product.price)}
    </div>

    <button
      class="primary"
      style="width:100%;margin-top:15px"
      id="modalAdd"
      type="button"
    >
      🛒 Ajouter au panier
    </button>

    <hr
      style="
        margin:22px 0;
        border:0;
        border-top:1px solid var(--border)
      "
    >

    <h3>Avis clients</h3>

    <div
      id="reviewsList"
      style="margin-top:12px"
    >
      ${
        data.reviews.length
          ? data.reviews.map(review => `
              <div class="cart-item">

                <strong>
                  ${escapeHTML(review.name)}
                </strong>

                <div>
                  ${stars(review.rating)}
                </div>

                <p style="margin-top:5px">
                  ${escapeHTML(review.comment)}
                </p>

                <small style="color:var(--muted)">
                  ${dateFR(review.date)}
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

            <button
              class="primary"
              type="submit"
            >
              Publier
            </button>

          </form>
        `
        : `
          <p
            style="
              margin-top:20px;
              color:var(--muted)
            "
          >
            Connecte-toi pour laisser un avis.
          </p>
        `
    }
  `;

  const addButton = $("modalAdd");

  if (addButton) {
    addButton.addEventListener("click", () => {
      addToCart(id);
    });
  }

  const form = $("reviewForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      submitReview(id);
    });
  }

  openModal("productModal");
}

function submitReview(productId) {
  if (!currentUser) return;

  const reviews = load(STORAGE.reviews, []);

  const already = reviews.some(
    review =>
      review.productId === productId &&
      review.userId === currentUser.uid
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
    rawName.length > 3
      ? rawName.slice(0, 3) + "***"
      : rawName + "***";

  const comment =
    $("reviewComment")?.value.trim() || "";

  if (!comment) {
    toast("Écris un commentaire.");
    return;
  }

  reviews.push({
    id:
      window.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random()}`,

    productId,
    userId: currentUser.uid,
    name,
    rating: Number(
      $("reviewRating")?.value || 5
    ),
    comment,
    date: new Date().toISOString()
  });

  save(STORAGE.reviews, reviews);

  toast("Avis publié ⭐");

  openProduct(productId);
}


/* =========================================================
   PANIER UI
========================================================= */

function renderCart() {
  const content = $("cartContent");

  if (!content) return;

  const items = cart();

  if (!items.length) {
    content.innerHTML =
      `<p style="color:var(--muted)">Ton panier est vide.</p>`;

    if ($("cartTotal")) {
      $("cartTotal").textContent = money(0);
    }

    return;
  }

  content.innerHTML = items.map(item => {
    const product =
      products.find(x => x.id === item.id);

    if (!product) return "";

    return `
      <div class="cart-item">

        <div class="cart-row">

          <div>
            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <div style="color:var(--muted)">
              ${money(product.price)}
            </div>
          </div>

          <div class="qty">

            <button
              data-minus="${escapeHTML(product.id)}"
              type="button"
            >
              −
            </button>

            <strong>
              ${item.qty}
            </strong>

            <button
              data-plus="${escapeHTML(product.id)}"
              type="button"
            >
              +
            </button>

          </div>

        </div>

      </div>
    `;
  }).join("");

  if ($("cartTotal")) {
    $("cartTotal").textContent =
      money(cartTotal());
  }
}


/* =========================================================
   CHECKOUT
========================================================= */

function renderCheckout() {
  const subtotal = cartTotal();

  const discount =
    currentPromo
      ? subtotal * (currentPromo.discount / 100)
      : 0;

  const total =
    Math.max(0, subtotal - discount);

  if ($("checkoutSubtotal")) {
    $("checkoutSubtotal").textContent =
      money(subtotal);
  }

  if ($("checkoutDiscount")) {
    $("checkoutDiscount").textContent =
      "- " + money(discount);
  }

  if ($("checkoutTotal")) {
    $("checkoutTotal").textContent =
      money(total);
  }
}

function applyPromo() {
  const input = $("promoCode");

  if (!input) return;

  const code =
    input.value.trim().toUpperCase();

  if (!promos[code] && promos[code] !== 0) {
    currentPromo = null;

    if ($("promoMessage")) {
      $("promoMessage").textContent =
        "❌ Code invalide.";
    }

    renderCheckout();

    return;
  }

  currentPromo = {
    code,
    discount: promos[code]
  };

  if ($("promoMessage")) {
    $("promoMessage").textContent =
      `✅ Code ${code} appliqué : ${promos[code]}%`;
  }

  renderCheckout();
}


/* =========================================================
   LIVRAISON
========================================================= */

function getDelivery(order) {
  const destination =
    order.destination ||
    order.address?.city ||
    "France";

  const updatedAt =
    Number(
      order.deliveryUpdatedAt ||
      Date.now()
    );

  const duration =
    Number(
      order.deliveryDurationSeconds ??
      Math.max(
        0,
        Math.floor(
          (
            new Date(
              order.deliveryDate || Date.now()
            ).getTime() -
            updatedAt
          ) / 1000
        )
      )
    );

  return {
    status:
      order.status || "Préparation",

    truckLocation:
      order.truckLocation || "Entrepôt",

    destination,

    tracking:
      order.tracking || "NOVA-TRK-N/A",

    durationSeconds:
      duration,

    updatedAt,

    deliveryDate:
      order.deliveryDate ||
      new Date(
        updatedAt + duration * 1000
      ).toISOString()
  };
}

function remaining(order) {
  const delivery = getDelivery(order);

  if (delivery.status === "Livrée") {
    return 0;
  }

  return Math.max(
    0,
    delivery.durationSeconds -
    Math.floor(
      (Date.now() - delivery.updatedAt) / 1000
    )
  );
}

function durationText(seconds) {
  seconds = Math.max(
    0,
    Math.floor(Number(seconds) || 0)
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

  return `${days}j ` +
    `${String(hours).padStart(2, "0")}h ` +
    `${String(minutes).padStart(2, "0")}m ` +
    `${String(secs).padStart(2, "0")}s`;
}


/* =========================================================
   FIRESTORE
========================================================= */

async function saveOrderToFirestore(order) {
  if (!firebaseDB || !firebaseFirestore) {
    return false;
  }

  try {
    const {
      collection,
      doc,
      setDoc
    } = firebaseFirestore;

    await setDoc(
      doc(
        collection(firebaseDB, "orders"),
        order.id
      ),
      order
    );

    return true;

  } catch (error) {
    console.error(
      "Erreur Firestore création commande:",
      error
    );

    return false;
  }
}

async function updateOrderInFirestore(order) {
  if (!firebaseDB || !firebaseFirestore) {
    return false;
  }

  try {
    const {
      collection,
      doc,
      updateDoc
    } = firebaseFirestore;

    await updateDoc(
      doc(
        collection(firebaseDB, "orders"),
        order.id
      ),
      order
    );

    return true;

  } catch (error) {
    console.error(
      "Erreur Firestore mise à jour:",
      error
    );

    return false;
  }
}

async function loadOrdersFromFirestore() {
  if (!firebaseDB || !firebaseFirestore || !currentUser) {
    return null;
  }

  try {
    const {
      collection,
      query,
      where,
      getDocs
    } = firebaseFirestore;

    const q = query(
      collection(firebaseDB, "orders"),
      where(
        "userId",
        "==",
        currentUser.uid
      )
    );

    const snapshot = await getDocs(q);

    const orders = [];

    snapshot.forEach(docSnap => {
      orders.push({
        ...docSnap.data(),
        id: docSnap.id
      });
    });

    orders.sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );

    return orders;

  } catch (error) {
    console.error(
      "Erreur lecture Firestore:",
      error
    );

    return null;
  }
}

async function syncUserOrders() {
  const firestoreOrders =
    await loadOrdersFromFirestore();

  if (!firestoreOrders) {
    return;
  }

  const localOrders =
    load(STORAGE.orders, []);

  const otherOrders =
    localOrders.filter(
      order =>
        order.userId !== currentUser?.uid
    );

  save(
    STORAGE.orders,
    [
      ...firestoreOrders,
      ...otherOrders
    ]
  );

  renderOrders();
}


/* =========================================================
   COMMANDES
========================================================= */

function ordersForUser() {
  if (!currentUser) {
    return [];
  }

  return load(STORAGE.orders, [])
    .filter(
      order =>
        order.userId === currentUser.uid ||
        order.email === currentUser.email
    );
}

async function renderOrders() {
  const content = $("ordersContent");

  if (!content) return;

  if (!currentUser) {
    content.innerHTML =
      `<p>Connecte-toi pour voir tes commandes.</p>`;

    return;
  }

  await syncUserOrders();

  const orders = ordersForUser();

  if (!orders.length) {
    content.innerHTML =
      `<p style="color:var(--muted)">Aucune commande.</p>`;

    return;
  }

  content.innerHTML =
    orders.map(order => {
      const delivery =
        getDelivery(order);

      const left =
        remaining(order);

      const progress =
        delivery.durationSeconds
          ? Math.max(
              5,
              Math.min(
                100,
                100 -
                (
                  left /
                  delivery.durationSeconds
                ) * 100
              )
            )
          : 100;

      return `
        <div class="order">

          <strong>
            Commande #${escapeHTML(order.id)}
          </strong>

          <p style="margin-top:6px">
            ${dateFR(order.createdAt)}
          </p>

          <p style="margin-top:6px">
            Statut :
            <strong>
              ${escapeHTML(delivery.status)}
            </strong>
          </p>

          <div class="delivery">

            <div>
              📍 Camion :
              <strong>
                ${escapeHTML(delivery.truckLocation)}
              </strong>
            </div>

            <div>
              🎯 Destination :
              <strong>
                ${escapeHTML(delivery.destination)}
              </strong>
            </div>

            <div>
              🔎 Suivi :
              <strong>
                ${escapeHTML(delivery.tracking)}
              </strong>
            </div>

            <div class="countdown">
              ${
                delivery.status === "Livrée"
                  ? "✅ Livrée"
                  : left > 0
                    ? "⏱️ " + durationText(left)
                    : "🚚 Arrivée imminente"
              }
            </div>

            <div>
              📅 ${dateFR(delivery.deliveryDate)}
            </div>

            <div class="progress">
              <span style="width:${progress}%"></span>
            </div>

          </div>

          <button
            class="secondary"
            style="margin-top:12px"
            data-invoice="${escapeHTML(order.id)}"
            type="button"
          >
            🧾 Facture
          </button>

        </div>
      `;
    }).join("");
}


/* =========================================================
   ADMIN
========================================================= */

function isAdminEmail() {
  return (
    currentUser?.email?.trim().toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );
}

function isAdminUnlocked() {
  return (
    localStorage.getItem(STORAGE.admin) ===
    "true"
  );
}

function updateAccountUI() {
  const accountButton =
    $("accountButton");

  if (accountButton) {
    accountButton.textContent =
      currentUser ? "👤" : "🔐";
  }

  const ordersButton =
    $("ordersButton");

  if (ordersButton) {
    ordersButton.style.display =
      currentUser
        ? "inline-flex"
        : "none";
  }

  const adminButton =
    $("adminButton");

  if (adminButton) {
    adminButton.style.display =
      isAdminEmail()
        ? "inline-flex"
        : "none";
  }
}

function renderAccount() {
  const content = $("accountContent");

  if (!content) return;

  if (!currentUser) {
    content.innerHTML = `
      <p>Tu n'es pas connecté.</p>

      <button
        class="primary"
        style="width:100%;margin-top:15px"
        id="accountLogin"
        type="button"
      >
        Se connecter
      </button>
    `;

    const login =
      $("accountLogin");

    if (login) {
      login.addEventListener(
        "click",
        () => openModal("authModal")
      );
    }

    return;
  }

  content.innerHTML = `
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
      type="button"
    >
      📦 Mes commandes
    </button>

    <button
      class="primary"
      style="width:100%;margin-top:10px"
      id="logoutButton"
      type="button"
    >
      Se déconnecter
    </button>
  `;

  $("accountOrders")?.addEventListener(
    "click",
    async () => {
      await renderOrders();
      openModal("ordersModal");
    }
  );

  $("logoutButton")?.addEventListener(
    "click",
    async () => {

      if (firebaseAuth && firebaseTools) {
        try {
          await firebaseTools.signOut(
            firebaseAuth
          );
        } catch (error) {
          console.error(
            "Erreur déconnexion:",
            error
          );
        }
      }

      currentUser = null;

      localStorage.removeItem(
        STORAGE.admin
      );

      updateAccountUI();

      closeAllModals();

      toast("Déconnecté.");
    }
  );
}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function renderDashboard() {
  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  const orders =
    load(STORAGE.orders, []);

  if ($("statOrders")) {
    $("statOrders").textContent =
      orders.length;
  }

  if ($("statFree")) {
    $("statFree").textContent =
      orders.filter(
        order =>
          Number(order.discount) === 100
      ).length;
  }

  if ($("statCatalog")) {
    $("statCatalog").textContent =
      money(
        products.reduce(
          (total, product) =>
            total + product.price,
          0
        )
      );
  }

  renderAdminOrders();
  renderAdminPromos();
}

function renderAdminOrders() {
  const container =
    $("adminOrders");

  if (!container) return;

  const orders =
    load(STORAGE.orders, []);

  if (!orders.length) {
    container.innerHTML =
      `<p style="color:var(--muted);margin-top:10px">Aucune commande.</p>`;

    return;
  }

  container.innerHTML =
    orders.map(order => {

      const delivery =
        getDelivery(order);

      const remainingOld =
        remaining(order);

      const days =
        Math.floor(
          remainingOld / 86400
        );

      const hours =
        Math.floor(
          (remainingOld % 86400) / 3600
        );

      const minutes =
        Math.floor(
          (remainingOld % 3600) / 60
        );

      return `
        <div class="order">

          <strong>
            #${escapeHTML(order.id)}
          </strong>

          <p style="margin-top:7px">
            ${escapeHTML(order.email || "")}
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
                  ]
                  .map(status => `
                    <option
                      ${status === delivery.status ? "selected" : ""}
                    >
                      ${status}
                    </option>
                  `)
                  .join("")
                }
              </select>
            </div>

            <div class="admin-field">

              <label>Suivi</label>

              <input
                data-field="tracking"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(delivery.tracking)}"
              >

            </div>

            <div class="admin-field">

              <label>📍 Camion actuellement</label>

              <input
                data-field="truckLocation"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(delivery.truckLocation)}"
              >

            </div>

            <div class="admin-field">

              <label>🎯 Destination</label>

              <input
                data-field="destination"
                data-order="${escapeHTML(order.id)}"
                value="${escapeHTML(delivery.destination)}"
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

              <label>Arrivée actuelle</label>

              <input
                readonly
                value="${escapeHTML(
                  dateFR(delivery.deliveryDate)
                )}"
              >

            </div>

            <div class="admin-full">

              <button
                class="save"
                data-save-delivery="${escapeHTML(order.id)}"
                type="button"
              >
                💾 Enregistrer la livraison
              </button>

            </div>

          </div>

        </div>
      `;
    }).join("");
}

function renderAdminPromos() {
  const container =
    $("adminPromos");

  if (!container) return;

  container.innerHTML =
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
      `)
      .join("");
}

async function saveDelivery(orderId) {
  if (
    !isAdminEmail() ||
    !isAdminUnlocked()
  ) {
    return;
  }

  const orders =
    load(STORAGE.orders, []);

  const order =
    orders.find(
      item => item.id === orderId
    );

  if (!order) return;

  const getField = field =>
    document.querySelector(
      `[data-field="${field}"][data-order="${CSS.escape(orderId)}"]`
    );

  const status =
    getField("status")?.value ||
    "Préparation";

  const truckLocation =
    getField("truckLocation")?.value.trim() ||
    "Entrepôt";

  const destination =
    getField("destination")?.value.trim() ||
    "France";

  const tracking =
    getField("tracking")?.value.trim() ||
    `NOVA-TRK-${orderId}`;

  const days =
    Math.max(
      0,
      Number(
        getField("days")?.value
      ) || 0
    );

  const hours =
    Math.min(
      23,
      Math.max(
        0,
        Number(
          getField("hours")?.value
        ) || 0
      )
    );

  const minutes =
    Math.min(
      59,
      Math.max(
        0,
        Number(
          getField("minutes")?.value
        ) || 0
      )
    );

  let duration =
    days * 86400 +
    hours * 3600 +
    minutes * 60;

  const now = Date.now();

  if (status === "Livrée") {
    duration = 0;
  }

  order.status = status;
  order.truckLocation = truckLocation;
  order.destination = destination;
  order.tracking = tracking;
  order.deliveryDurationSeconds = duration;
  order.deliveryUpdatedAt = now;
  order.deliveryDate =
    new Date(
      now + duration * 1000
    ).toISOString();

  save(
    STORAGE.orders,
    orders
  );

  const synced =
    await updateOrderInFirestore(order);

  renderDashboard();

  await renderOrders();

  toast(
    synced
      ? "Livraison synchronisée 🚚☁️"
      : "Livraison mise à jour localement 🚚"
  );
}


/* =========================================================
   VALIDATION ADRESSE
========================================================= */

async function validateFrenchAddress(
  address,
  postalCode,
  city
) {
  try {
    const query =
      `${address}, ${postalCode} ${city}`;

    const url =
      "https://api-adresse.data.gouv.fr/search/?q=" +
      encodeURIComponent(query) +
      "&limit=5";

    const response =
      await fetch(url);

    if (!response.ok) {
      return false;
    }

    const data =
      await response.json();

    return Boolean(
      data.features &&
      data.features.length
    );

  } catch (error) {
    console.warn(
      "Validation adresse impossible:",
      error
    );

    return false;
  }
}


/* =========================================================
   CREATION COMMANDE
========================================================= */

async function createOrder() {
  if (!currentUser) {
    openModal("authModal");
    return;
  }

  if (
    !currentPromo ||
    currentPromo.discount !== 100
  ) {
    toast(
      "Pour la démo, utilise le code NOVA100."
    );
    return;
  }

  const fullName =
    $("fullName")?.value.trim() || "";

  const country =
    $("country")?.value.trim() || "";

  const address =
    $("address")?.value.trim() || "";

  const postalCode =
    $("postalCode")?.value.trim() || "";

  const city =
    $("city")?.value.trim() || "";

  if (
    !fullName ||
    !country ||
    !address ||
    !postalCode ||
    !city
  ) {
    toast(
      "Complète tous les champs."
    );
    return;
  }

  if (
    country.toLowerCase() === "france" &&
    !/^[0-9]{5}$/.test(postalCode)
  ) {
    toast(
      "Code postal français invalide."
    );
    return;
  }

  const items = cart();

  if (!items.length) {
    toast("Panier vide.");
    return;
  }

  const isFrance =
    country.toLowerCase() === "france";

  if (isFrance) {
    toast(
      "Vérification de l'adresse..."
    );

    const valid =
      await validateFrenchAddress(
        address,
        postalCode,
        city
      );

    if (!valid) {
      toast(
        "Adresse introuvable. Vérifie l'adresse."
      );
      return;
    }
  }

  const subtotal =
    cartTotal();

  const orderId =
    Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase();

  const tracking =
    "NOVA-TRK-" +
    Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase();

  const now =
    new Date().toISOString();

  const duration =
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
      address,
      postalCode,
      city
    },

    items,

    subtotal,

    discount: 100,

    total: 0,

    promoCode:
      currentPromo.code,

    paymentStatus:
      "pending",

    status:
      "Préparation",

    truckLocation:
      "Entrepôt",

    destination:
      city,

    tracking,

    deliveryDurationSeconds:
      duration,

    deliveryUpdatedAt:
      Date.now(),

    deliveryDate:
      new Date(
        Date.now() +
        duration * 1000
      ).toISOString(),

    createdAt:
      now
  };

  const orders =
    load(STORAGE.orders, []);

  orders.unshift(order);

  save(
    STORAGE.orders,
    orders
  );

  const synced =
    await saveOrderToFirestore(order);

  setCart([]);

  currentPromo = null;

  if ($("promoCode")) {
    $("promoCode").value = "";
  }

  if ($("promoMessage")) {
    $("promoMessage").textContent = "";
  }

  closeModal("checkoutModal");

  showInvoice(order.id);

  toast(
    synced
      ? "Commande créée et synchronisée 🎉☁️"
      : "Commande créée 🎉"
  );
}

async function startPaypal() {
  if (!currentUser) {
    openModal("authModal");
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

  await createOrder();
}


/* =========================================================
   FACTURE
========================================================= */

function showInvoice(orderId) {
  const order =
    load(STORAGE.orders, [])
      .find(
        item => item.id === orderId
      );

  if (!order) return;

  const content =
    $("invoiceContent");

  if (!content) return;

  content.innerHTML = `
    <div class="invoice">

      <div class="invoice-head">

        <div>
          <h2>NOVASHOP</h2>
          <p>Matériel gaming</p>
        </div>

        <div>
          <strong>FACTURE</strong>
          <p>#${escapeHTML(order.id)}</p>
        </div>

      </div>

      <p>
        <strong>Date :</strong>
        ${dateFR(order.createdAt)}
      </p>

      <p style="margin-top:12px">
        <strong>Client :</strong><br>
        ${escapeHTML(order.customer?.name || "")}<br>
        ${escapeHTML(order.email || "")}
      </p>

      <p style="margin-top:12px">
        <strong>Livraison :</strong><br>
        ${escapeHTML(order.address?.address || "")}<br>
        ${escapeHTML(order.address?.postalCode || "")}
        ${escapeHTML(order.address?.city || "")}<br>
        ${escapeHTML(order.address?.country || "")}
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

                const product =
                  products.find(
                    x => x.id === item.id
                  );

                return `
                  <tr>

                    <td>
                      ${escapeHTML(
                        product?.name ||
                        "Produit"
                      )}
                    </td>

                    <td>
                      ${item.qty}
                    </td>

                    <td>
                      ${money(
                        (product?.price || 0) *
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
        <span>-100%</span>
      </div>

      <div class="total">
        <span>Total</span>
        <span>
          ${money(order.total)}
        </span>
      </div>

      <p>
        <strong>Paiement :</strong>
        Code promotionnel
      </p>

    </div>
  `;

  openModal("invoiceModal");
}


/* =========================================================
   ERREURS FIREBASE
========================================================= */

function showAuthError(error) {
  console.error(
    "🔥 ERREUR FIREBASE AUTH",
    error
  );

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
      "Cette adresse e-mail est déjà utilisée.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/invalid-email":
      "Adresse e-mail invalide.",

    "auth/popup-closed-by-user":
      "Fenêtre Google fermée.",

    "auth/popup-blocked":
      "La fenêtre Google a été bloquée.",

    "auth/unauthorized-domain":
      "Domaine non autorisé dans Firebase.",

    "auth/operation-not-allowed":
      "La connexion par e-mail/mot de passe n'est pas activée dans Firebase.",

    "auth/network-request-failed":
      "Erreur réseau. Vérifie ta connexion.",

    "auth/configuration-not-found":
      "Configuration Firebase Authentication introuvable.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/user-disabled":
      "Ce compte a été désactivé.",

    "auth/invalid-api-key":
      "Clé API Firebase invalide.",

    "auth/app-not-authorized":
      "Cette application n'est pas autorisée par Firebase.",

    "auth/account-exists-with-different-credential":
      "Cette adresse utilise déjà une autre méthode de connexion."
  };

  const readable =
    messages[code];

  if (readable) {
    toast(readable);
  } else {
    toast(
      `Erreur Firebase : ${code || "inconnue"}`
    );
  }
}


/* =========================================================
   MOT DE PASSE
========================================================= */

function validatePassword(password) {
  if (password.length < 6) {
    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins 6 caractères."
    };
  }

  if (password.length > 30) {
    return {
      valid: false,
      message:
        "Le mot de passe doit contenir maximum 30 caractères."
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message:
        "Ajoute au moins une lettre minuscule."
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message:
        "Ajoute au moins une lettre majuscule."
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message:
        "Ajoute au moins un chiffre."
    };
  }

  return {
    valid: true,
    message: ""
  };
}


/* =========================================================
   FIREBASE INIT
========================================================= */

async function initFirebase() {
  try {

    console.log(
      "🔥 Initialisation Firebase..."
    );

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

    firebaseDB =
      firestoreModule.getFirestore(app);

    firebaseTools =
      authModule;

    firebaseFirestore =
      firestoreModule;

    console.log(
      "✅ Firebase Auth connecté"
    );

    console.log(
      "✅ Firestore connecté"
    );

    authModule.onAuthStateChanged(
      firebaseAuth,
      async user => {

        currentUser = user;

        console.log(
          user
            ? `👤 Connecté : ${user.email}`
            : "👤 Aucun utilisateur connecté"
        );

        updateAccountUI();

        if (
          user &&
          $("accountModal")?.classList.contains("open")
        ) {
          renderAccount();
        }

        if (user) {
          await syncUserOrders();
        }

      }
    );

  } catch (error) {

    console.error(
      "❌ Firebase non disponible :",
      error
    );

    firebaseAuth = null;
    firebaseDB = null;

    toast(
      "Firebase n'a pas pu être chargé. Ouvre F12 > Console."
    );
  }
}


/* =========================================================
   CONNEXION EMAIL
========================================================= */

async function loginEmail(event) {
  event.preventDefault();

  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );
    return;
  }

  const email =
    $("loginEmail")?.value.trim() || "";

  const password =
    $("loginPassword")?.value || "";

  if (!email || !password) {
    toast(
      "Entre ton e-mail et ton mot de passe."
    );
    return;
  }

  try {

    await firebaseTools
      .signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

    closeModal("authModal");

    toast(
      "Connexion réussie 👋"
    );

  } catch (error) {

    showAuthError(error);
  }
}


/* =========================================================
   INSCRIPTION EMAIL
========================================================= */

async function signupEmail(event) {
  event.preventDefault();

  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );
    return;
  }

  const email =
    $("signupEmail")?.value.trim() || "";

  const phone =
    $("signupPhone")?.value.trim() || "";

  const password =
    $("signupPassword")?.value || "";

  const confirm =
    $("signupConfirm")?.value || "";

  if (!email) {
    toast(
      "Entre une adresse e-mail."
    );
    return;
  }

  const passwordCheck =
    validatePassword(password);

  if (!passwordCheck.valid) {
    toast(
      passwordCheck.message
    );
    return;
  }

  if (password !== confirm) {
    toast(
      "Les mots de passe ne correspondent pas."
    );
    return;
  }

  const phoneDigits =
    phone.replace(/\D/g, "");

  if (phoneDigits.length < 8) {
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

    closeModal("authModal");

    toast(
      "Compte créé 🎉"
    );

  } catch (error) {

    showAuthError(error);
  }
}


/* =========================================================
   GOOGLE
========================================================= */

async function googleLogin() {
  if (!firebaseAuth) {
    toast(
      "Firebase n'est pas disponible."
    );
    return;
  }

  try {

    const provider =
      new firebaseTools.GoogleAuthProvider();

    await firebaseTools
      .signInWithPopup(
        firebaseAuth,
        provider
      );

    closeModal("authModal");

    toast(
      "Connexion Google réussie 👋"
    );

  } catch (error) {

    showAuthError(error);
  }
}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

  $("searchButton")?.addEventListener(
    "click",
    () => {
      searchTerm =
        $("searchInput")?.value.trim() || "";

      renderProducts();
    }
  );

  $("searchInput")?.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        searchTerm =
          event.target.value.trim();

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
            .forEach(
              x =>
                x.classList.remove(
                  "active"
                )
            );

          button.classList.add(
            "active"
          );

          currentCategory =
            button.dataset.category;

          renderProducts();
        }
      );
    });


  $("productsGrid")?.addEventListener(
    "click",
    event => {

      const favorite =
        event.target.closest(
          "[data-favorite]"
        );

      const view =
        event.target.closest(
          "[data-view]"
        );

      const add =
        event.target.closest(
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
    event => {

      const plus =
        event.target.closest(
          "[data-plus]"
        );

      const minus =
        event.target.closest(
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
    async () => {
      await renderOrders();
      openModal("ordersModal");
    }
  );


  $("heroOrders")?.addEventListener(
    "click",
    async () => {

      if (!currentUser) {
        openModal("authModal");
        return;
      }

      await renderOrders();

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

      renderCheckout();

      openModal("checkoutModal");
    }
  );


  $("applyPromo")?.addEventListener(
    "click",
    applyPromo
  );


  $("checkoutForm")?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      await startPaypal();
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
        ?.classList.add("active");

      $("signupTab")
        ?.classList.remove("active");

      $("loginForm")
        ?.classList.remove("hidden");

      $("signupForm")
        ?.classList.add("hidden");
    }
  );


  $("signupTab")?.addEventListener(
    "click",
    () => {

      $("signupTab")
        ?.classList.add("active");

      $("loginTab")
        ?.classList.remove("active");

      $("signupForm")
        ?.classList.remove("hidden");

      $("loginForm")
        ?.classList.add("hidden");
    }
  );


  $("adminButton")?.addEventListener(
    "click",
    () => {

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

      renderDashboard();

      openModal(
        "dashboardModal"
      );
    }
  );


  $("adminOrders")?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-save-delivery]"
        );

      if (button) {
        saveDelivery(
          button.dataset.saveDelivery
        );
      }
    }
  );


  $("ordersContent")?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
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
    event => {

      document.body.classList.toggle(
        "dark",
        event.target.checked
      );

      localStorage.setItem(
        STORAGE.dark,
        String(
          event.target.checked
        )
      );
    }
  );


  $("soundSwitch")?.addEventListener(
    "change",
    event => {

      localStorage.setItem(
        STORAGE.sound,
        String(
          event.target.checked
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
    event => {

      if (event.key === "Escape") {
        closeAllModals();
      }
    }
  );
}


/* =========================================================
   BOOT
========================================================= */

function boot() {

  document.body.classList.toggle(
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
    async () => {

      if (
        $("ordersModal")?.classList.contains(
          "open"
        )
      ) {
        await renderOrders();
      }

    },
    1000
  );
}


/* =========================================================
   START
========================================================= */

boot();

initFirebase();
