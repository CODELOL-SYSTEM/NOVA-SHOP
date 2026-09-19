import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSySY5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();


/* =========================================================
   PRODUCTS
========================================================= */

const PRODUCTS = [

  {
    id: "gigabyte-b650-aorus-elite-ax",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    images: [
      "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
    ],
    description:
      "Carte mère gaming AMD AM5 avec Wi-Fi, pensée pour les configurations gaming modernes."
  },

  {
    id: "pc-gamer-7800x3d-rx9070xt",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    images: [
      "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
    ],
    description:
      "Configuration gaming haut de gamme avec Ryzen 7 7800X3D, Radeon RX 9070 XT et 32 Go de DDR5."
  },

  {
    id: "hyperx-cloud-ii",
    name: "HyperX Cloud II – Casque gaming",
    category: "Casques",
    price: 49.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
    ],
    description:
      "Casque gaming confortable avec audio immersif pour jouer et écouter tes contenus."
  },

  {
    id: "tecors-60-azerty",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    images: [
      "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
    ],
    description:
      "Clavier mécanique compact 60% au format AZERTY."
  },

  {
    id: "celshading-65",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    images: [
      "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
    ],
    description:
      "Clavier magnétique compact 65% au design noir."
  },

  {
    id: "ajazz-aj199-max",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
    ],
    description:
      "Souris gaming sans fil légère avec finition carbone."
  },

  {
    id: "logitech-pro-x2-superstrike",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    images: [
      "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
    ],
    description:
      "Souris gaming haut de gamme Logitech G PRO X2 Superstrike."
  },

  {
    id: "samsung-990-pro-1tb",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    images: [
      "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4"
    ],
    description:
      "SSD NVMe PCIe 4.0 Samsung 990 PRO de 1 To."
  },

  {
    id: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    images: [
      "https://pc.comparer.fr/500x500/310191422.webp"
    ],
    description:
      "SSD NVMe haute performance de 2 To."
  },

  {
    id: "corsair-rm1000x",
    name: "CORSAIR RM1000x (EU)",
    category: "Alimentations",
    price: 159.90,
    images: [
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
    ],
    description:
      "Alimentation Corsair RM1000x pour configurations gaming puissantes."
  },

  {
    id: "corsair-rm850x",
    name: "CORSAIR RM850x (EU)",
    category: "Alimentations",
    price: 134.90,
    images: [
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
    ],
    description:
      "Alimentation Corsair RM850x adaptée aux configurations gaming performantes."
  },

  {
    id: "corsair-5000d",
    name: "Corsair Frame 5000D RS ARGB (Noir)",
    category: "Boîtiers",
    price: 159.90,
    images: [
      "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
    ],
    description:
      "Boîtier gaming ATX noir avec espace intérieur généreux et éclairage ARGB."
  },

  {
    id: "arctic-liquid-freezer-360",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    images: [
      "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
    ],
    description:
      "Refroidissement liquide AIO 360 mm pour processeur."
  },

  {
    id: "samsung-odyssey-g6",
    name: 'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category: "Écrans",
    price: 399.95,
    images: [
      "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
    ],
    description:
      "Écran gaming Samsung 27 pouces avec dalle QD-OLED."
  },

  {
    id: "elgato-wave-mic-arm-pro",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    images: [
      "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
    ],
    description:
      "Bras articulé professionnel pour microphone."
  },

  {
    id: "dualsense-cosmic-red",
    name: "Sony DualSense Cosmic Red PS5/PC",
    category: "Manettes",
    price: 74.90,
    images: [
      "https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
      "https://www.cdiscount.com/pdt2/k/v/2/1/700x700/ps5dsblackv2/rw/manette-sans-fil-dualsense-noire-i-ps5-et-pc.jpg",
      "https://www.cdiscount.com/pdt2/e/v/2/1/700x700/ps5dswhitev2/rw/manette-sans-fil-dualsense-blanche-i-ps5-et-pc.jpg"
    ],
    description:
      "Manette Sony DualSense compatible PS5 et PC."
  },

  {
    id: "asus-tuf-b650-plus",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    images: [
      "https://media.materiel.net/r550/products/MN0005986139.jpg"
    ],
    description:
      "Carte mère ASUS TUF Gaming au format ATX pour processeurs AMD AM5."
  },

  {
    id: "msi-mag-b650-tomahawk",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    images: [
      "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
    ],
    description:
      "Carte mère gaming MSI B650 avec Wi-Fi."
  }

];


/* =========================================================
   STATE
========================================================= */

let currentUser = null;
let currentCategory = "Tous";
let searchTerm = "";
let currentProduct = null;
let currentImageIndex = 0;
let confirmationResult = null;
let recaptchaVerifier = null;


/* =========================================================
   STORAGE
========================================================= */

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  reviews: "novashop_reviews",
  orders: "novashop_orders",
  users: "novashop_users",
  admin: "novashop_admin"
};

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let cart = loadJSON(STORAGE.cart, []);
let favorites = loadJSON(STORAGE.favorites, []);
let reviews = loadJSON(STORAGE.reviews, []);
let orders = loadJSON(STORAGE.orders, []);
let users = loadJSON(STORAGE.users, []);


/* =========================================================
   HELPERS
========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
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

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);

    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);
}

function getReviews(productId) {
  return reviews.filter(review => review.productId === productId);
}

function getAverageRating(productId) {
  const list = getReviews(productId);

  if (!list.length) return 0;

  return list.reduce((sum, review) => sum + Number(review.rating), 0) / list.length;
}

function getStars(rating) {
  const rounded = Math.round(Number(rating) || 0);

  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("show");
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }
}

function closeAllModals() {
  $$(".modal.show").forEach(modal => {
    modal.classList.remove("show");
  });
}


/* =========================================================
   PRODUCTS
========================================================= */

function getFilteredProducts() {

  let list = [...PRODUCTS];

  if (currentCategory !== "Tous") {
    list = list.filter(
      product => product.category === currentCategory
    );
  }

  if (searchTerm.trim()) {

    const term = searchTerm.trim().toLowerCase();

    list = list.filter(product => {

      return (
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );

    });
  }

  const sort = $("#sortSelect")?.value || "relevance";

  if (sort === "priceAsc") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  return list;
}


function renderProducts() {

  const grid = $("#productsGrid");

  if (!grid) return;

  const products = getFilteredProducts();

  grid.innerHTML = "";

  const resultCount = $("#resultCount");

  if (resultCount) {
    resultCount.textContent =
      `${products.length} produit${products.length > 1 ? "s" : ""}`;
  }

  const empty = $("#emptyState");

  if (empty) {
    empty.classList.toggle("show", products.length === 0);
  }

  products.forEach(product => {

    const card = document.createElement("article");

    card.className = "card";

    const average = getAverageRating(product.id);
    const reviewCount = getReviews(product.id).length;

    const isFavorite =
      favorites.includes(product.id);

    card.innerHTML = `

      <div class="card-img">

        <img
          src="${escapeHTML(product.images[0])}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

        <button
          class="card-fav ${isFavorite ? "active" : ""}"
          data-favorite="${escapeHTML(product.id)}"
          type="button"
          aria-label="Ajouter aux favoris"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

      </div>


      <div class="card-body">

        <div class="card-cat">
          ${escapeHTML(product.category)}
        </div>

        <div class="card-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="rating">

          <span>
            ${getStars(average)}
          </span>

          <span>
            ${
              reviewCount
                ? `${average.toFixed(1)}/5 · ${reviewCount} avis`
                : "Aucun avis"
            }
          </span>

        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button
            class="btn"
            data-view="${escapeHTML(product.id)}"
            type="button"
          >
            Voir
          </button>

          <button
            class="btn blue"
            data-add="${escapeHTML(product.id)}"
            type="button"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;

    /*
      IMPORTANT :
      L'erreur image est gérée uniquement par cette image.
      Elle ne déclenche plus de listener global qui supprimerait
      tous les produits.
    */

    const image = card.querySelector("img");

    if (image) {

      image.addEventListener("error", () => {

        /*
          On ne supprime PAS toute la grille.
          On supprime uniquement le produit concerné.
        */

        card.remove();

        updateVisibleProductCount();

      }, { once: true });

    }

    grid.appendChild(card);

  });

}


function updateVisibleProductCount() {

  const grid = $("#productsGrid");

  const count = grid?.querySelectorAll(".card").length || 0;

  const resultCount = $("#resultCount");

  if (resultCount) {
    resultCount.textContent =
      `${count} produit${count > 1 ? "s" : ""}`;
  }
}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(productId) {

  if (favorites.includes(productId)) {

    favorites =
      favorites.filter(id => id !== productId);

    showToast("Retiré des favoris");

  } else {

    favorites.push(productId);

    showToast("Ajouté aux favoris ❤️");

  }

  saveJSON(STORAGE.favorites, favorites);

  renderProducts();

}


/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

  const product = getProduct(productId);

  if (!product) return;

  const existing =
    cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveJSON(STORAGE.cart, cart);

  renderCart();

  showToast(`${product.name} ajouté au panier 🛒`);

}


function removeFromCart(productId) {

  cart =
    cart.filter(item => item.id !== productId);

  saveJSON(STORAGE.cart, cart);

  renderCart();

}


function changeQuantity(productId, amount) {

  const item =
    cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  saveJSON(STORAGE.cart, cart);

  renderCart();

}


function renderCart() {

  const container = $("#cartItems");

  if (!container) return;

  container.innerHTML = "";

  if (!cart.length) {

    container.innerHTML = `
      <div
        style="
          padding:45px 15px;
          text-align:center;
          color:#6b7280;
        "
      >
        <div style="font-size:42px">
          🛒
        </div>

        <h3 style="margin-top:10px">
          Ton panier est vide
        </h3>

        <p style="font-size:12px;margin-top:6px">
          Ajoute un produit pour commencer.
        </p>
      </div>
    `;

  } else {

    cart.forEach(item => {

      const product = getProduct(item.id);

      if (!product) return;

      const element = document.createElement("div");

      element.className = "cart-item";

      element.innerHTML = `

        <img
          src="${escapeHTML(product.images[0])}"
          alt="${escapeHTML(product.name)}"
        >

        <div>

          <h4>
            ${escapeHTML(product.name)}
          </h4>

          <p>
            ${money(product.price)}
          </p>

          <div class="qty">

            <button
              data-qty-minus="${escapeHTML(product.id)}"
              type="button"
            >
              −
            </button>

            <strong>
              ${item.quantity}
            </strong>

            <button
              data-qty-plus="${escapeHTML(product.id)}"
              type="button"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove"
          data-remove="${escapeHTML(product.id)}"
          type="button"
        >
          Supprimer
        </button>

      `;

      container.appendChild(element);

    });

  }

  const count = $("#cartCount");

  if (count) {
    count.textContent = getCartCount();
  }

  const total = $("#cartTotal");

  if (total) {
    total.textContent = money(getCartTotal());
  }

}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

  $("#cartDrawer")?.classList.add("open");

  $("#overlay")?.classList.add("show");

}


function closeCart() {

  $("#cartDrawer")?.classList.remove("open");

  $("#overlay")?.classList.remove("show");

}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function showProduct(productId) {

  const product = getProduct(productId);

  if (!product) return;

  currentProduct = product;
  currentImageIndex = 0;

  renderProductDetail();

  openModal("productModal");

}


function renderProductDetail() {

  const container = $("#productDetail");

  if (!container || !currentProduct) return;

  const product = currentProduct;

  const average = getAverageRating(product.id);

  const productReviews =
    getReviews(product.id);

  const image =
    product.images[currentImageIndex] ||
    product.images[0];

  container.innerHTML = `

    <div class="product-detail">


      <div>

        <div class="detail-image">

          <img
            id="detailMainImage"
            src="${escapeHTML(image)}"
            alt="${escapeHTML(product.name)}"
          >

          ${
            product.images.length > 1
              ? `
                <button
                  class="arrow left"
                  id="prevImage"
                  type="button"
                >
                  ‹
                </button>

                <button
                  class="arrow right"
                  id="nextImage"
                  type="button"
                >
                  ›
                </button>

                <div class="carousel">

                  ${product.images.map((_, index) => `
                    <button
                      class="dot ${index === currentImageIndex ? "active" : ""}"
                      data-image-index="${index}"
                      type="button"
                    ></button>
                  `).join("")}

                </div>
              `
              : ""
          }

        </div>

      </div>


      <div class="detail-info">

        <div class="card-cat">
          ${escapeHTML(product.category)}
        </div>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="rating">

          <span>
            ${getStars(average)}
          </span>

          <span>
            ${
              productReviews.length
                ? `${average.toFixed(1)}/5 · ${productReviews.length} avis`
                : "Aucun avis"
            }
          </span>

        </div>

        <div class="detail-price">
          ${money(product.price)}
        </div>

        <p class="detail-desc">
          ${escapeHTML(product.description)}
        </p>

        <div class="info-box">

          📦 Emplacement :
          <strong>Entrepôt</strong>

          <br>

          🚚 Disponible à la commande

        </div>

        <button
          id="detailAddButton"
          class="btn blue full"
          type="button"
        >
          🛒 Ajouter au panier
        </button>


        <div class="reviews">

          <h3>
            Avis clients
          </h3>

          ${
            currentUser
              ? `
                <form
                  id="reviewForm"
                  class="form"
                >

                  <label>
                    Ta note
                  </label>

                  <select
                    id="reviewRating"
                    required
                  >
                    <option value="">
                      Choisir
                    </option>

                    <option value="5">
                      ★★★★★
                    </option>

                    <option value="4">
                      ★★★★☆
                    </option>

                    <option value="3">
                      ★★★☆☆
                    </option>

                    <option value="2">
                      ★★☆☆☆
                    </option>

                    <option value="1">
                      ★☆☆☆☆
                    </option>

                  </select>

                  <label>
                    Commentaire
                  </label>

                  <textarea
                    id="reviewComment"
                    rows="3"
                    required
                    placeholder="Ton avis..."
                  ></textarea>

                  <button
                    class="btn blue"
                    type="submit"
                  >
                    Publier mon avis
                  </button>

                </form>
              `
              : `
                <div class="info-box">
                  Connecte-toi pour laisser un avis.
                </div>
              `
          }


          <div style="margin-top:15px">

            ${
              productReviews.length
                ? productReviews.map(review => {

                    const name =
                      escapeHTML(
                        String(review.userName || "Utilisateur")
                          .slice(0, 3)
                      );

                    return `
                      <div class="review">

                        <strong>
                          ${name}***
                        </strong>

                        <span
                          style="
                            color:#f59e0b;
                            margin-left:7px;
                          "
                        >
                          ${getStars(review.rating)}
                        </span>

                        <p>
                          ${escapeHTML(review.comment)}
                        </p>

                        <div class="review-date">
                          ${new Date(review.date).toLocaleDateString("fr-FR")}
                        </div>

                      </div>
                    `;

                  }).join("")
                : `
                  <div
                    style="
                      color:#9ca3af;
                      font-size:12px;
                      padding:15px 0;
                    "
                  >
                    Aucun avis pour le moment.
                  </div>
                `
            }

          </div>

        </div>

      </div>

    </div>

  `;


  const mainImage = $("#detailMainImage");

  if (mainImage) {

    mainImage.addEventListener("error", () => {

      mainImage.style.display = "none";

    }, { once: true });

  }


  $("#detailAddButton")?.addEventListener(
    "click",
    () => addToCart(product.id)
  );


  $("#prevImage")?.addEventListener(
    "click",
    () => {

      currentImageIndex =
        (currentImageIndex - 1 + product.images.length) %
        product.images.length;

      renderProductDetail();

    }
  );


  $("#nextImage")?.addEventListener(
    "click",
    () => {

      currentImageIndex =
        (currentImageIndex + 1) %
        product.images.length;

      renderProductDetail();

    }
  );


  $$("[data-image-index]").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentImageIndex =
          Number(button.dataset.imageIndex);

        renderProductDetail();

      }
    );

  });


  $("#reviewForm")?.addEventListener(
    "submit",
    submitReview
  );

}


function submitReview(event) {

  event.preventDefault();

  if (!currentUser || !currentProduct) return;

  const existing =
    reviews.find(review =>
      review.productId === currentProduct.id &&
      review.userId === currentUser.uid
    );

  if (existing) {

    showToast("Tu as déjà laissé un avis.");

    return;

  }

  const rating =
    Number($("#reviewRating")?.value);

  const comment =
    $("#reviewComment")?.value.trim();

  if (!rating || !comment) {

    showToast("Remplis la note et le commentaire.");

    return;

  }

  reviews.push({

    id:
      crypto.randomUUID(),

    productId:
      currentProduct.id,

    userId:
      currentUser.uid,

    userName:
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "Utilisateur",

    rating,

    comment,

    date:
      new Date().toISOString()

  });

  saveJSON(STORAGE.reviews, reviews);

  showToast("Avis publié ⭐");

  renderProductDetail();

  renderProducts();

}


/* =========================================================
   AUTH UI
========================================================= */

function updateAuthUI() {

  const accountButton = $("#accountBtn");
  const ordersButton = $("#ordersBtn");
  const adminButton = $("#adminBtn");

  if (!currentUser) {

    if (accountButton) {
      accountButton.innerHTML = "👤 <span>Compte</span>";
    }

    if (ordersButton) {
      ordersButton.style.display = "none";
    }

    if (adminButton) {
      adminButton.style.display = "none";
    }

    return;

  }

  const name =
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Compte";

  if (accountButton) {

    accountButton.innerHTML =
      `👤 <span>${escapeHTML(name)}</span>`;

  }

  if (ordersButton) {
    ordersButton.style.display = "block";
  }

  const isAdmin =
    localStorage.getItem(STORAGE.admin) === "true";

  if (adminButton) {
    adminButton.style.display =
      isAdmin ? "block" : "none";
  }

}


function showAccount() {

  if (!currentUser) {

    openModal("authModal");

    return;

  }

  const info = $("#accountInfo");

  if (info) {

    info.innerHTML = `

      <strong>
        ${
          escapeHTML(
            currentUser.displayName ||
            "Utilisateur"
          )
        }
      </strong>

      <br>

      ${escapeHTML(currentUser.email || "Connexion téléphone")}

      <br>

      <small>
        UID : ${escapeHTML(currentUser.uid)}
      </small>

    `;

  }

  openModal("accountModal");

}


/* =========================================================
   LOGIN
========================================================= */

async function loginWithEmail(event) {

  event.preventDefault();

  const email =
    $("#loginEmail").value.trim();

  const password =
    $("#loginPassword").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    closeModal("authModal");

    showToast("Connexion réussie ✅");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


async function signupWithEmail(event) {

  event.preventDefault();

  const name =
    $("#signupName").value.trim();

  const email =
    $("#signupEmail").value.trim();

  const password =
    $("#signupPassword").value;

  try {

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    users.push({

      uid:
        result.user.uid,

      name,

      email,

      date:
        new Date().toISOString()

    });

    saveJSON(
      STORAGE.users,
      users
    );

    closeModal("authModal");

    showToast("Compte créé ✅");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


async function loginWithGoogle() {

  try {

    await signInWithPopup(
      auth,
      googleProvider
    );

    closeModal("authModal");

    showToast("Connexion Google réussie ✅");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


/* =========================================================
   PHONE AUTH
========================================================= */

function setupRecaptcha() {

  if (recaptchaVerifier) return;

  try {

    recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal"
        }
      );

  } catch (error) {

    console.error(
      "reCAPTCHA :",
      error
    );

  }

}


async function sendPhoneCode() {

  const phone =
    $("#phoneNumber")?.value.trim();

  if (!phone) {

    showToast("Entre ton numéro.");

    return;

  }

  setupRecaptcha();

  if (!recaptchaVerifier) {

    showToast("reCAPTCHA indisponible.");

    return;

  }

  try {

    confirmationResult =
      await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );

    $("#phoneCode").style.display = "block";

    $("#phoneVerifyBtn").style.display = "block";

    showToast("Code envoyé 📱");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


async function verifyPhoneCode() {

  const code =
    $("#phoneCode")?.value.trim();

  if (!confirmationResult) {

    showToast("Demande d'abord un code.");

    return;

  }

  if (!code) {

    showToast("Entre le code reçu.");

    return;

  }

  try {

    await confirmationResult.confirm(code);

    closeModal("authModal");

    showToast("Connexion téléphone réussie ✅");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


/* =========================================================
   FIREBASE ERROR
========================================================= */

function getFirebaseError(error) {

  const code =
    error?.code || "";

  const messages = {

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "Compte introuvable.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/email-already-in-use":
      "Cet email est déjà utilisé.",

    "auth/weak-password":
      "Mot de passe trop faible.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/popup-closed-by-user":
      "Fenêtre Google fermée.",

    "auth/popup-blocked":
      "La fenêtre Google a été bloquée.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/invalid-phone-number":
      "Numéro de téléphone invalide.",

    "auth/invalid-verification-code":
      "Code de vérification incorrect.",

    "auth/operation-not-allowed":
      "Cette méthode de connexion n'est pas activée dans Firebase."

  };

  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );

}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {

  try {

    await signOut(auth);

    localStorage.removeItem(
      STORAGE.admin
    );

    closeAllModals();

    updateAuthUI();

    showToast("Déconnexion réussie.");

  } catch (error) {

    showToast(
      getFirebaseError(error)
    );

  }

}


/* =========================================================
   DELETE ACCOUNT
========================================================= */

async function deleteMyAccount() {

  if (!currentUser) return;

  const confirmed =
    confirm(
      "Supprimer définitivement ton compte ?"
    );

  if (!confirmed) return;

  try {

    await deleteUser(currentUser);

    users =
      users.filter(
        user => user.uid !== currentUser.uid
      );

    saveJSON(
      STORAGE.users,
      users
    );

    localStorage.removeItem(
      STORAGE.admin
    );

    closeAllModals();

    showToast("Compte supprimé.");

  } catch (error) {

    showToast(
      "Reconnecte-toi avant de supprimer le compte."
    );

  }

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user || null;

    updateAuthUI();

  }
);


/* =========================================================
   ADMIN
========================================================= */

const ADMIN_CODE = "NOVA-ADMIN-2026";

function unlockAdmin() {

  if (!currentUser) {

    showToast("Connecte-toi d'abord.");

    return;

  }

  const code =
    $("#adminCodeInput")?.value.trim();

  if (code !== ADMIN_CODE) {

    showToast("Code administrateur incorrect.");

    return;

  }

  localStorage.setItem(
    STORAGE.admin,
    "true"
  );

  updateAuthUI();

  closeModal("accountModal");

  showDashboard();

  showToast("Accès administrateur activé.");

}


function isAdmin() {

  return (
    !!currentUser &&
    localStorage.getItem(STORAGE.admin) === "true"
  );

}


function showDashboard() {

  if (!isAdmin()) {

    showToast("Accès administrateur requis.");

    return;

  }

  updateDashboard();

  openModal("dashboardModal");

}


function updateDashboard() {

  const statOrders =
    $("#statOrders");

  const statFree =
    $("#statFree");

  const statCatalog =
    $("#statCatalog");

  if (statOrders) {
    statOrders.textContent =
      orders.length;
  }

  if (statFree) {

    statFree.textContent =
      orders.filter(
        order => Number(order.total) === 0
      ).length;

  }

  if (statCatalog) {

    const catalog =
      PRODUCTS.reduce(
        (sum, product) =>
          sum + product.price,
        0
      );

    statCatalog.textContent =
      money(catalog);

  }


  const adminOrders =
    $("#adminOrders");

  if (adminOrders) {

    if (!orders.length) {

      adminOrders.innerHTML = `
        <div class="info-box">
          Aucune commande.
        </div>
      `;

    } else {

      adminOrders.innerHTML = `

        <table class="admin-table">

          <thead>

            <tr>
              <th>Commande</th>
              <th>Client</th>
              <th>Total</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            ${orders.map(order => `

              <tr>

                <td>
                  ${escapeHTML(order.number)}
                </td>

                <td>
                  ${escapeHTML(order.customer?.fullName || "")}
                </td>

                <td>
                  ${money(order.total)}
                </td>

                <td>
                  ${new Date(order.date).toLocaleDateString("fr-FR")}
                </td>

              </tr>

            `).join("")}

          </tbody>

        </table>

      `;

    }

  }


  const adminUsers =
    $("#adminUsers");

  if (adminUsers) {

    adminUsers.innerHTML = users.length
      ? users.map(user => `

          <div class="user-card">

            <strong>
              ${escapeHTML(user.name || "Utilisateur")}
            </strong>

            <div>
              ${escapeHTML(user.email || "")}
            </div>

          </div>

        `).join("")
      : `
        <div class="info-box">
          Aucun utilisateur local enregistré.
        </div>
      `;

  }

}


/* =========================================================
   PROMOTIONS
========================================================= */

const PROMOS = {

  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10

};

function getPromo(code) {

  const normalized =
    String(code || "")
      .trim()
      .toUpperCase();

  return PROMOS[normalized] ?? null;

}


/* =========================================================
   CHECKOUT
========================================================= */

function showCheckout() {

  if (!currentUser) {

    closeCart();

    openModal("authModal");

    showToast("Connecte-toi pour commander.");

    return;

  }

  if (!cart.length) {

    showToast("Ton panier est vide.");

    return;

  }

  renderCheckout();

  closeCart();

  openModal("checkoutModal");

}


function renderCheckout() {

  const container =
    $("#checkoutSummary");

  if (!container) return;

  container.innerHTML = cart.map(item => {

    const product =
      getProduct(item.id);

    if (!product) return "";

    return `

      <div
        style="
          display:flex;
          justify-content:space-between;
          gap:10px;
          font-size:12px;
        "
      >

        <span>
          ${escapeHTML(product.name)}
          × ${item.quantity}
        </span>

        <strong>
          ${money(product.price * item.quantity)}
        </strong>

      </div>

    `;

  }).join("") + `

    <div
      style="
        border-top:1px solid #e5e7eb;
        margin-top:12px;
        padding-top:12px;
        display:flex;
        justify-content:space-between;
        font-weight:900;
      "
    >

      <span>
        Total
      </span>

      <span id="checkoutTotal">
        ${money(getCartTotal())}
      </span>

    </div>

  `;

  const payButton =
    $("#payButton");

  if (payButton) {
    payButton.disabled = true;
  }

}


function validatePromo() {

  const code =
    $("#promoCode")?.value.trim();

  const result =
    $("#promoResult");

  const payButton =
    $("#payButton");

  if (!code) {

    if (result) {
      result.style.display = "none";
      result.innerHTML = "";
    }

    if (payButton) {
      payButton.disabled = true;
    }

    return null;

  }

  const discount =
    getPromo(code);

  if (discount === null) {

    if (result) {

      result.style.display = "block";

      result.innerHTML = `
        <div
          style="
            color:#dc2626;
            font-size:12px;
            font-weight:700;
          "
        >
          Code promotionnel invalide.
        </div>
      `;

    }

    if (payButton) {
      payButton.disabled = true;
    }

    return null;

  }

  if (result) {

    result.style.display = "block";

    result.innerHTML = `
      <div
        style="
          color:#16834b;
          font-size:12px;
          font-weight:700;
        "
      >
        Code accepté : -${discount}% ✅
      </div>
    `;

  }

  /*
    Dans cette démo, le bouton de paiement est activé
    uniquement avec une réduction de 100%.
  */

  if (payButton) {

    payButton.disabled =
      discount !== 100;

  }

  return discount;

}


function createOrder(event) {

  event.preventDefault();

  if (!currentUser) {

    showToast("Connecte-toi d'abord.");

    return;

  }

  const promo =
    validatePromo();

  if (promo !== 100) {

    showToast(
      "Utilise un code promotionnel de 100%."
    );

    return;

  }

  const fullName =
    $("#fullName").value.trim();

  const address =
    $("#address").value.trim();

  const postalCode =
    $("#postalCode").value.trim();

  const city =
    $("#city").value.trim();

  const country =
    $("#country").value.trim();

  const subtotal =
    getCartTotal();

  const discount =
    subtotal;

  const total =
    0;

  const order = {

    id:
      crypto.randomUUID(),

    number:
      "NS-" +
      Date.now().toString().slice(-8),

    date:
      new Date().toISOString(),

    userId:
      currentUser.uid,

    customer: {

      fullName,
      address,
      postalCode,
      city,
      country

    },

    warehouse:
      "Entrepôt",

    items:
      cart.map(item => {

        const product =
          getProduct(item.id);

        return {

          id:
            product.id,

          name:
            product.name,

          price:
            product.price,

          quantity:
            item.quantity

        };

      }),

    subtotal,

    discount,

    total,

    promoCode:
      $("#promoCode").value.trim().toUpperCase(),

    paymentMethod:
      "Code promotionnel"

  };

  orders.push(order);

  saveJSON(
    STORAGE.orders,
    orders
  );

  cart = [];

  saveJSON(
    STORAGE.cart,
    cart
  );

  renderCart();

  closeModal("checkoutModal");

  showInvoice(order);

  showToast("Commande créée 🎉");

}


/* =========================================================
   ORDERS
========================================================= */

function showOrders() {

  if (!currentUser) {

    openModal("authModal");

    return;

  }

  renderOrders();

  openModal("ordersModal");

}


function renderOrders() {

  const container =
    $("#ordersList");

  if (!container) return;

  const userOrders =
    orders.filter(
      order =>
        order.userId === currentUser.uid
    );

  if (!userOrders.length) {

    container.innerHTML = `

      <div
        style="
          text-align:center;
          padding:40px 15px;
          color:#6b7280;
        "
      >

        <div style="font-size:42px">
          📦
        </div>

        <h3 style="margin-top:10px">
          Aucune commande
        </h3>

      </div>

    `;

    return;

  }

  container.innerHTML =
    userOrders
      .slice()
      .reverse()
      .map(order => `

        <div class="user-card">

          <div
            style="
              display:flex;
              justify-content:space-between;
              gap:15px;
              align-items:center;
            "
          >

            <strong>
              ${escapeHTML(order.number)}
            </strong>

            <strong>
              ${money(order.total)}
            </strong>

          </div>

          <div>
            ${new Date(order.date).toLocaleString("fr-FR")}
          </div>

          <div>
            ${order.items.length} article${order.items.length > 1 ? "s" : ""}
          </div>

          <button
            class="btn"
            data-invoice="${escapeHTML(order.id)}"
            type="button"
            style="margin-top:10px"
          >
            🧾 Voir la facture
          </button>

        </div>

      `)
      .join("");

}


/* =========================================================
   INVOICE
========================================================= */

function showInvoice(order) {

  const container =
    $("#invoiceContent");

  if (!container) return;

  container.innerHTML = `

    <div class="invoice">


      <div class="invoice-head">

        <div>

          <div class="invoice-logo">
            NOVA<span>SHOP</span>
          </div>

          <div
            style="
              margin-top:6px;
              color:#6b7280;
              font-size:11px;
            "
          >
            Marketplace gaming
          </div>

        </div>


        <div class="invoice-meta">

          <strong>
            FACTURE
          </strong>

          <br>

          ${escapeHTML(order.number)}

          <br>

          ${new Date(order.date).toLocaleDateString("fr-FR")}

        </div>

      </div>


      <div class="invoice-client">

        <div>

          <strong>
            Client
          </strong>

          <br>

          ${escapeHTML(order.customer.fullName)}

          <br>

          ${escapeHTML(currentUser?.email || "")}

        </div>


        <div>

          <strong>
            Adresse de livraison
          </strong>

          <br>

          ${escapeHTML(order.customer.address)}

          <br>

          ${escapeHTML(order.customer.postalCode)}
          ${escapeHTML(order.customer.city)}

          <br>

          ${escapeHTML(order.customer.country)}

        </div>

      </div>


      <table class="invoice-table">

        <thead>

          <tr>

            <th>
              Produit
            </th>

            <th>
              Quantité
            </th>

            <th>
              Prix
            </th>

            <th>
              Total
            </th>

          </tr>

        </thead>


        <tbody>

          ${order.items.map(item => `

            <tr>

              <td>
                ${escapeHTML(item.name)}
              </td>

              <td>
                ${item.quantity}
              </td>

              <td>
                ${money(item.price)}
              </td>

              <td>
                ${money(item.price * item.quantity)}
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>


      <div class="invoice-total">

        <div>

          <span>
            Sous-total
          </span>

          <strong>
            ${money(order.subtotal)}
          </strong>

        </div>


        <div>

          <span>
            Réduction
          </span>

          <strong>
            -${money(order.discount)}
          </strong>

        </div>


        <div class="grand">

          <span>
            Total payé
          </span>

          <strong>
            ${money(order.total)}
          </strong>

        </div>

      </div>


      <div
        style="
          margin-top:30px;
          padding-top:18px;
          border-top:1px solid #e5e7eb;
          color:#6b7280;
          font-size:11px;
          line-height:1.7;
        "
      >

        <strong>
          Mode de paiement :
        </strong>

        ${escapeHTML(order.paymentMethod)}

        <br>

        <strong>
          Entrepôt :
        </strong>

        ${escapeHTML(order.warehouse)}

        <br>

        Code promotionnel :
        ${escapeHTML(order.promoCode)}

      </div>


    </div>

  `;

  openModal("invoiceModal");

}


/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

  searchTerm =
    $("#searchInput")?.value || "";

  renderProducts();

  $("#catalogue")?.scrollIntoView({
    behavior: "smooth"
  });

}


/* =========================================================
   AUTH TABS
========================================================= */

function showLoginTab() {

  $("#loginTab")?.classList.add("active");

  $("#signupTab")?.classList.remove("active");

  if ($("#loginForm")) {
    $("#loginForm").style.display = "grid";
  }

  if ($("#signupForm")) {
    $("#signupForm").style.display = "none";
  }

}


function showSignupTab() {

  $("#signupTab")?.classList.add("active");

  $("#loginTab")?.classList.remove("active");

  if ($("#signupForm")) {
    $("#signupForm").style.display = "grid";
  }

  if ($("#loginForm")) {
    $("#loginForm").style.display = "none";
  }

}


/* =========================================================
   EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const target =
      event.target.closest("button");

    if (!target) return;


    /* CATEGORY */

    const category =
      target.dataset.category;

    if (category) {

      currentCategory = category;

      $$(".cat").forEach(button => {

        button.classList.toggle(
          "active",
          button.dataset.category === category
        );

      });

      renderProducts();

      return;

    }


    /* FAVORITE */

    const favoriteId =
      target.dataset.favorite;

    if (favoriteId) {

      toggleFavorite(favoriteId);

      return;

    }


    /* VIEW */

    const viewId =
      target.dataset.view;

    if (viewId) {

      showProduct(viewId);

      return;

    }


    /* ADD */

    const addId =
      target.dataset.add;

    if (addId) {

      addToCart(addId);

      return;

    }


    /* CART PLUS */

    const plusId =
      target.dataset.qtyPlus;

    if (plusId) {

      changeQuantity(
        plusId,
        1
      );

      return;

    }


    /* CART MINUS */

    const minusId =
      target.dataset.qtyMinus;

    if (minusId) {

      changeQuantity(
        minusId,
        -1
      );

      return;

    }


    /* CART REMOVE */

    const removeId =
      target.dataset.remove;

    if (removeId) {

      removeFromCart(removeId);

      return;

    }


    /* INVOICE */

    const invoiceId =
      target.dataset.invoice;

    if (invoiceId) {

      const order =
        orders.find(
          item => item.id === invoiceId
        );

      if (order) {
        showInvoice(order);
      }

      return;

    }

  }
);


/* =========================================================
   CLOSE MODALS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const close =
      event.target.closest("[data-close]");

    if (!close) return;

    closeModal(
      close.dataset.close
    );

  }
);


/* =========================================================
   HEADER BUTTONS
========================================================= */

$("#accountBtn")?.addEventListener(
  "click",
  showAccount
);

$("#ordersBtn")?.addEventListener(
  "click",
  showOrders
);

$("#adminBtn")?.addEventListener(
  "click",
  showDashboard
);

$("#cartBtn")?.addEventListener(
  "click",
  openCart
);

$("#closeCart")?.addEventListener(
  "click",
  closeCart
);

$("#overlay")?.addEventListener(
  "click",
  closeCart
);


/* =========================================================
   SEARCH
========================================================= */

$("#searchBtn")?.addEventListener(
  "click",
  performSearch
);

$("#searchInput")?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      performSearch();
    }

  }
);

$("#sortSelect")?.addEventListener(
  "change",
  renderProducts
);


/* =========================================================
   AUTH
========================================================= */

$("#loginForm")?.addEventListener(
  "submit",
  loginWithEmail
);

$("#signupForm")?.addEventListener(
  "submit",
  signupWithEmail
);

$("#googleBtn")?.addEventListener(
  "click",
  loginWithGoogle
);

$("#phoneSendBtn")?.addEventListener(
  "click",
  sendPhoneCode
);

$("#phoneVerifyBtn")?.addEventListener(
  "click",
  verifyPhoneCode
);

$("#loginTab")?.addEventListener(
  "click",
  showLoginTab
);

$("#signupTab")?.addEventListener(
  "click",
  showSignupTab
);


/* =========================================================
   ACCOUNT
========================================================= */

$("#accountOrdersBtn")?.addEventListener(
  "click",
  () => {

    closeModal("accountModal");

    showOrders();

  }
);

$("#logoutBtn")?.addEventListener(
  "click",
  logout
);

$("#deleteAccountBtn")?.addEventListener(
  "click",
  deleteMyAccount
);

$("#adminUnlockBtn")?.addEventListener(
  "click",
  unlockAdmin
);


/* =========================================================
   CHECKOUT
========================================================= */

$("#checkoutBtn")?.addEventListener(
  "click",
  showCheckout
);

$("#checkoutForm")?.addEventListener(
  "submit",
  createOrder
);

$("#promoCode")?.addEventListener(
  "input",
  validatePromo
);


/* =========================================================
   INVOICE
========================================================= */

$("#printInvoiceBtn")?.addEventListener(
  "click",
  () => window.print()
);


/* =========================================================
   RESET DEMO
========================================================= */

$("#resetDemoBtn")?.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Réinitialiser les commandes, avis et utilisateurs locaux ?"
      );

    if (!confirmed) return;

    reviews = [];
    orders = [];
    users = [];
    cart = [];
    favorites = [];

    saveJSON(STORAGE.reviews, reviews);
    saveJSON(STORAGE.orders, orders);
    saveJSON(STORAGE.users, users);
    saveJSON(STORAGE.cart, cart);
    saveJSON(STORAGE.favorites, favorites);

    renderProducts();
    renderCart();
    updateDashboard();

    showToast("Données démo réinitialisées.");

  }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") return;

    closeCart();
    closeAllModals();

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

  renderProducts();

  renderCart();

  updateAuthUI();

}


init();
