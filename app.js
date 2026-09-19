/* =========================================================
   NOVASHOP - APP.JS COMPLET
   ========================================================= */

/* =========================================================
   FIREBASE
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  updateProfile,
  deleteUser
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAZv5AkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


/* =========================================================
   PRODUITS
   ========================================================= */

const PRODUCTS = [

  {
    id: "gigabyte-b650-aorus",
    name: "Gigabyte B650 AORUS Elite AX",
    category: "Composants",
    price: 189.99,
    images: [
      "https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
    ],
    description: "Carte mère AMD B650 destinée aux configurations gaming.",
    rating: 0
  },

  {
    id: "pc-7800x3d-9070xt",
    name: "PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category: "PC Gamer",
    price: 2237.65,
    images: [
      "https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
    ],
    description: "PC gaming haut de gamme avec Ryzen 7 7800X3D, RX 9070 XT et 32 Go DDR5.",
    rating: 0
  },

  {
    id: "hyperx-cloud-ii",
    name: "HyperX Cloud II – Casque gaming",
    category: "Casques",
    price: 49.99,
    images: [
      "https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756"
    ],
    description: "Casque gaming HyperX Cloud II.",
    rating: 0
  },

  {
    id: "tecors-60",
    name: "TECORS Clavier Gamer Mécanique 60% AZERTY",
    category: "Claviers",
    price: 30,
    images: [
      "https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
    ],
    description: "Clavier mécanique compact au format 60 % avec disposition AZERTY.",
    rating: 0
  },

  {
    id: "celshading-65",
    name: "Clavier Magnétique 65% Celshading Noir",
    category: "Claviers",
    price: 120.90,
    images: [
      "https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
    ],
    description: "Clavier magnétique 65 % au design noir.",
    rating: 0
  },

  {
    id: "ajazz-aj199-max",
    name: "Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category: "Souris",
    price: 49.99,
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
    ],
    description: "Souris gaming sans fil Ajazz AJ199 MAX.",
    rating: 0
  },

  {
    id: "logitech-g-pro-x2",
    name: "Logitech G PRO X2 Superstrike Blanc et Noir",
    category: "Souris",
    price: 150.99,
    images: [
      "https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
    ],
    description: "Souris gaming Logitech haut de gamme.",
    rating: 0
  },

  {
    id: "samsung-990-pro-1tb",
    name: "Samsung 990 PRO 1TB",
    category: "Stockage",
    price: 249.99,
    images: [
      "https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
    ],
    description: "SSD Samsung 990 PRO NVMe de 1 To.",
    rating: 0
  },

  {
    id: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB",
    category: "Stockage",
    price: 199.93,
    images: [
      "https://pc.comparer.fr/500x500/310191422.webp"
    ],
    description: "SSD Samsung 990 PRO NVMe de 2 To.",
    rating: 0
  },

  {
    id: "corsair-rm1000x",
    name: "CORSAIR RM1000x (EU)",
    category: "Alimentations",
    price: 159.90,
    images: [
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
    ],
    description: "Alimentation Corsair RM1000x de 1000 W.",
    rating: 0
  },

  {
    id: "corsair-rm850x",
    name: "CORSAIR RM850x (EU)",
    category: "Alimentations",
    price: 134.90,
    images: [
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
    ],
    description: "Alimentation Corsair RM850x de 850 W.",
    rating: 0
  },

  {
    id: "corsair-frame-5000d",
    name: "Corsair Frame 5000D RS ARGB (Noir)",
    category: "Boîtiers",
    price: 159.90,
    images: [
      "https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
    ],
    description: "Boîtier gaming Corsair Frame 5000D RS ARGB noir.",
    rating: 0
  },

  {
    id: "arctic-freezer-360",
    name: "ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category: "Refroidissement",
    price: 129.90,
    images: [
      "https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
    ],
    description: "Watercooling AIO ARCTIC Liquid Freezer III Pro 360.",
    rating: 0
  },

  {
    id: "samsung-g6-oled",
    name: 'Samsung 27" QD-OLED Odyssey G6 S27HG612SU',
    category: "Écrans",
    price: 399.95,
    images: [
      "https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
    ],
    description: "Écran gaming Samsung Odyssey G6 QD-OLED 27 pouces.",
    rating: 0
  },

  {
    id: "elgato-wave-mic-arm",
    name: "ELGATO Wave Mic Arm Pro",
    category: "Streaming",
    price: 229.90,
    images: [
      "https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5"
    ],
    description: "Bras articulé Elgato pour microphone.",
    rating: 0
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
    description: "Manette Sony DualSense compatible PS5 et PC avec plusieurs visuels.",
    rating: 0
  },

  {
    id: "asus-tuf-b650-plus",
    name: "ASUS TUF Gaming B650-PLUS",
    category: "Composants",
    price: 179.90,
    images: [
      "https://media.materiel.net/r550/products/MN0005986139.jpg"
    ],
    description: "Carte mère gaming ASUS TUF Gaming B650-PLUS.",
    rating: 0
  },

  {
    id: "msi-mag-b650",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "Composants",
    price: 189.90,
    images: [
      "https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
    ],
    description: "Carte mère MSI MAG B650 Tomahawk avec Wi-Fi.",
    rating: 0
  }

];


/* =========================================================
   STOCKAGE
   ========================================================= */

const STORAGE = {
  cart: "novashop_cart",
  favorites: "novashop_favorites",
  orders: "novashop_orders",
  reviews: "novashop_reviews",
  demoUsers: "novashop_demo_users",
  admin: "novashop_admin_uid"
};


function load(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}


function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


let cart = load(STORAGE.cart, {});
let favorites = load(STORAGE.favorites, []);
let orders = load(STORAGE.orders, []);
let reviews = load(STORAGE.reviews, {});
let demoUsers = load(STORAGE.demoUsers, []);

let currentUser = null;
let currentCategory = "Tous";
let currentSearch = "";
let currentProduct = null;
let carouselIndex = 0;
let confirmationResult = null;
let recaptchaVerifier = null;


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


function toast(message) {

  const element = document.querySelector("#toast");

  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.novaToastTimer);

  window.novaToastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2600);
}


function openModal(id) {

  const element = document.querySelector("#" + id);

  if (element) {
    element.classList.add("show");
  }
}


function closeModal(id) {

  const element = document.querySelector("#" + id);

  if (element) {
    element.classList.remove("show");
  }
}


function requireLogin() {

  if (!currentUser) {
    openModal("authModal");
    toast("Connecte-toi pour continuer.");
    return false;
  }

  return true;
}


/* =========================================================
   AVIS
   ========================================================= */

function getReviews(productId) {

  if (!Array.isArray(reviews[productId])) {
    return [];
  }

  return reviews[productId];
}


function averageRating(productId) {

  const list = getReviews(productId);

  if (!list.length) {
    return 0;
  }

  return list.reduce((total, review) => {
    return total + Number(review.rating);
  }, 0) / list.length;
}


function stars(value) {

  const rounded = Math.round(value);

  return "★".repeat(rounded) +
         "☆".repeat(5 - rounded);
}


function userDisplayName() {

  if (!currentUser) {
    return "Client";
  }

  return (
    currentUser.displayName ||
    currentUser.email?.split("@")[0] ||
    "Client"
  );
}


function shortUserName() {

  const name = userDisplayName().trim();

  return name.slice(0, 3) + "***";
}


/* =========================================================
   PANIER
   ========================================================= */

function cartArray() {

  return Object.entries(cart)
    .map(([id, quantity]) => {

      const product = PRODUCTS.find(
        item => item.id === id
      );

      if (!product) {
        return null;
      }

      return {
        product,
        quantity
      };

    })
    .filter(Boolean);
}


function cartCount() {

  return cartArray().reduce(
    (total, item) => total + item.quantity,
    0
  );
}


function cartSubtotal() {

  return cartArray().reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
}


function addToCart(id) {

  if (!PRODUCTS.some(product => product.id === id)) {
    return;
  }

  cart[id] = (cart[id] || 0) + 1;

  save(STORAGE.cart, cart);

  renderCart();

  toast("Produit ajouté au panier 🛒");
}


function changeQuantity(id, amount) {

  if (!cart[id]) {
    return;
  }

  cart[id] += amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  save(STORAGE.cart, cart);

  renderCart();
}


function removeFromCart(id) {

  delete cart[id];

  save(STORAGE.cart, cart);

  renderCart();
}


/* =========================================================
   AFFICHAGE PANIER
   ========================================================= */

function renderCart() {

  const countElement = document.querySelector("#cartCount");

  if (countElement) {
    countElement.textContent = cartCount();
  }

  const container = document.querySelector("#cartItems");

  if (!container) {
    return;
  }

  const items = cartArray();

  if (!items.length) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:55px 15px;
        color:#777;
      ">
        <div style="font-size:42px">🛒</div>
        <h3>Ton panier est vide</h3>
        <p>Ajoute un produit pour commencer.</p>
      </div>
    `;

    const total = document.querySelector("#cartTotal");

    if (total) {
      total.textContent = money(0);
    }

    return;
  }


  container.innerHTML = items.map(item => {

    const product = item.product;
    const quantity = item.quantity;

    return `
      <div class="cart-item">

        <img
          src="${escapeHTML(product.images[0])}"
          alt="${escapeHTML(product.name)}"
        >

        <div>

          <h4>
            ${escapeHTML(product.name)}
          </h4>

          <p>
            ${money(product.price * quantity)}
          </p>

          <div class="qty">

            <button
              data-minus="${product.id}"
            >
              −
            </button>

            <b>${quantity}</b>

            <button
              data-plus="${product.id}"
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

        <div style="font-size:12px;color:#777">
          ${money(product.price)}
        </div>

      </div>
    `;

  }).join("");


  const total = document.querySelector("#cartTotal");

  if (total) {
    total.textContent = money(cartSubtotal());
  }
}


/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites = favorites.filter(
      item => item !== id
    );

    toast("Retiré des favoris.");

  } else {

    favorites.push(id);

    toast("Ajouté aux favoris ♥");
  }

  save(STORAGE.favorites, favorites);

  renderProducts();
}


/* =========================================================
   PRODUITS FILTRÉS
   ========================================================= */

function getFilteredProducts() {

  let list = [...PRODUCTS];


  if (currentCategory !== "Tous") {

    list = list.filter(
      product =>
        product.category === currentCategory
    );
  }


  if (currentSearch.trim()) {

    const search = currentSearch
      .trim()
      .toLowerCase();

    list = list.filter(product => {

      return (
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );

    });
  }


  const sortElement =
    document.querySelector("#sortSelect");

  const sort = sortElement
    ? sortElement.value
    : "relevance";


  if (sort === "priceAsc") {

    list.sort(
      (a, b) => a.price - b.price
    );
  }


  if (sort === "priceDesc") {

    list.sort(
      (a, b) => b.price - a.price
    );
  }


  if (sort === "name") {

    list.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
  }


  return list;
}


/* =========================================================
   AFFICHAGE PRODUITS
   ========================================================= */

function renderProducts() {

  const grid =
    document.querySelector("#productsGrid");

  const empty =
    document.querySelector("#emptyState");

  if (!grid) {
    console.error("NovaShop : #productsGrid introuvable.");
    return;
  }


  const list = getFilteredProducts();


  grid.innerHTML = "";


  const resultCount =
    document.querySelector("#resultCount");

  if (resultCount) {

    resultCount.textContent =
      `${list.length} produit${list.length > 1 ? "s" : ""}`;
  }


  if (!list.length) {

    if (empty) {
      empty.classList.add("show");
    }

    return;
  }


  if (empty) {
    empty.classList.remove("show");
  }


  list.forEach(product => {

    const card =
      document.createElement("article");

    card.className = "card";

    const average =
      averageRating(product.id);

    const reviewCount =
      getReviews(product.id).length;

    const favorite =
      favorites.includes(product.id);


    card.innerHTML = `

      <div class="card-img">

        <button
          class="card-fav ${favorite ? "active" : ""}"
          data-fav="${product.id}"
          aria-label="Favori"
        >
          ${favorite ? "♥" : "♡"}
        </button>

        <img
          src="${escapeHTML(product.images[0])}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

      </div>


      <div class="card-body">

        <div class="card-cat">
          ${escapeHTML(product.category)}
        </div>


        <div class="card-title">
          ${escapeHTML(product.name)}
        </div>


        <div class="rating">

          ${
            average
              ? stars(average)
              : "☆☆☆☆☆"
          }

          <span>
            ${
              reviewCount
                ? `${average.toFixed(1)} (${reviewCount})`
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
            data-view="${product.id}"
          >
            Voir
          </button>

          <button
            class="btn blue"
            data-add="${product.id}"
          >
            🛒 Ajouter
          </button>

        </div>

      </div>
    `;


    grid.appendChild(card);


    /*
      IMPORTANT :
      Une image qui échoue ne supprime plus toute la boutique.
      On garde la carte et on masque seulement l'image cassée.
    */

    const image =
      card.querySelector("img");

    image.addEventListener("error", () => {

      image.style.display = "none";

      const box =
        card.querySelector(".card-img");

      if (box) {

        const message =
          document.createElement("div");

        message.style.cssText = `
          color:#888;
          font-size:13px;
          text-align:center;
          padding:20px;
        `;

        message.textContent =
          "Image momentanément indisponible";

        box.appendChild(message);
      }

    });

  });
}


/* =========================================================
   OUVRIR PRODUIT
   ========================================================= */

function openProduct(id) {

  const product =
    PRODUCTS.find(item => item.id === id);

  if (!product) {
    return;
  }

  currentProduct = product;
  carouselIndex = 0;

  renderProductDetail();

  openModal("productModal");
}


/* =========================================================
   DÉTAIL PRODUIT
   ========================================================= */

function renderProductDetail() {

  if (!currentProduct) {
    return;
  }

  const product = currentProduct;

  const list =
    getReviews(product.id);

  const average =
    averageRating(product.id);

  const images =
    Array.isArray(product.images)
      ? product.images
      : [];


  const container =
    document.querySelector("#productDetail");

  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="product-detail">

      <div>

        <div class="detail-image">

          <img
            id="detailMainImage"
            src="${escapeHTML(images[carouselIndex])}"
            alt="${escapeHTML(product.name)}"
          >

          ${
            images.length > 1
              ? `
                <button
                  class="arrow left"
                  id="carouselPrev"
                >
                  ‹
                </button>

                <button
                  class="arrow right"
                  id="carouselNext"
                >
                  ›
                </button>

                <div class="carousel">

                  ${
                    images.map((image, index) => `
                      <button
                        class="dot ${index === carouselIndex ? "active" : ""}"
                        data-dot="${index}"
                      ></button>
                    `).join("")
                  }

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

          ${
            average
              ? stars(average)
              : "☆☆☆☆☆"
          }

          <span>
            ${
              list.length
                ? `${average.toFixed(1)} / 5`
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

          ✓ Produit marketplace NovaShop<br>
          ✓ Catégorie : ${escapeHTML(product.category)}<br>
          ✓ Entrepôt : Entrepôt

        </div>


        <button
          class="btn blue full"
          id="detailAdd"
        >
          🛒 Ajouter au panier
        </button>


        <div class="reviews">

          <h3>Avis clients</h3>


          ${
            currentUser
              ? `
                <form
                  id="reviewForm"
                  class="form"
                >

                  <label>
                    Note
                  </label>

                  <select id="reviewRating">

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

                  <input
                    id="reviewComment"
                    maxlength="300"
                    required
                    placeholder="Ton avis..."
                  >


                  <button
                    class="btn"
                    type="submit"
                  >
                    Publier mon avis
                  </button>

                </form>
              `
              : `
                <div class="info-box">
                  Connecte-toi pour publier un avis.
                </div>
              `
          }


          <div id="reviewsList">

            ${
              list.length
                ? list.map(review => `
                    <div class="review">

                      <strong>
                        ${escapeHTML(review.name)}
                        ·
                        ${stars(review.rating)}
                      </strong>

                      <p>
                        ${escapeHTML(review.comment)}
                      </p>

                      <div class="review-date">
                        ${escapeHTML(review.date)}
                      </div>

                    </div>
                  `).join("")
                : `
                  <div style="color:#777;padding:15px 0">
                    Aucun avis pour le moment.
                  </div>
                `
            }

          </div>

        </div>

      </div>

    </div>
  `;


  const mainImage =
    document.querySelector("#detailMainImage");


  if (mainImage) {

    mainImage.addEventListener(
      "error",
      () => {

        mainImage.style.display = "none";

        toast("Cette image est indisponible.");
      }
    );

  }


  const addButton =
    document.querySelector("#detailAdd");


  if (addButton) {

    addButton.onclick = () => {
      addToCart(product.id);
    };

  }


  if (images.length > 1) {

    const previous =
      document.querySelector("#carouselPrev");

    const next =
      document.querySelector("#carouselNext");


    if (previous) {

      previous.onclick = () => {

        carouselIndex =
          (carouselIndex - 1 + images.length)
          % images.length;

        renderProductDetail();
      };

    }


    if (next) {

      next.onclick = () => {

        carouselIndex =
          (carouselIndex + 1)
          % images.length;

        renderProductDetail();
      };

    }


    document
      .querySelectorAll("[data-dot]")
      .forEach(dot => {

        dot.onclick = () => {

          carouselIndex =
            Number(dot.dataset.dot);

          renderProductDetail();
        };

      });

  }


  const reviewForm =
    document.querySelector("#reviewForm");


  if (reviewForm) {

    reviewForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        publishReview();
      }
    );

  }

}


/* =========================================================
   PUBLIER AVIS
   ========================================================= */

function publishReview() {

  if (!currentUser || !currentProduct) {
    return;
  }


  const productId =
    currentProduct.id;

  const list =
    getReviews(productId);


  const alreadyReviewed =
    list.some(
      review =>
        review.uid === currentUser.uid
    );


  if (alreadyReviewed) {

    toast(
      "Tu as déjà laissé un avis pour ce produit."
    );

    return;
  }


  const ratingElement =
    document.querySelector("#reviewRating");

  const commentElement =
    document.querySelector("#reviewComment");


  if (!ratingElement || !commentElement) {
    return;
  }


  const rating =
    Number(ratingElement.value);

  const comment =
    commentElement.value.trim();


  if (!comment) {
    return;
  }


  if (!reviews[productId]) {
    reviews[productId] = [];
  }


  reviews[productId].push({

    uid: currentUser.uid,

    name: shortUserName(),

    rating,

    comment,

    date: new Date()
      .toLocaleDateString("fr-FR")

  });


  save(STORAGE.reviews, reviews);

  toast("Avis publié ⭐");

  renderProductDetail();

  renderProducts();
}


/* =========================================================
   AUTH TABS
   ========================================================= */

const loginTab =
  document.querySelector("#loginTab");

const signupTab =
  document.querySelector("#signupTab");

const loginForm =
  document.querySelector("#loginForm");

const signupForm =
  document.querySelector("#signupForm");


if (loginTab) {

  loginTab.onclick = () => {

    loginTab.classList.add("active");

    signupTab?.classList.remove("active");

    if (loginForm) {
      loginForm.style.display = "grid";
    }

    if (signupForm) {
      signupForm.style.display = "none";
    }

  };

}


if (signupTab) {

  signupTab.onclick = () => {

    signupTab.classList.add("active");

    loginTab?.classList.remove("active");

    if (signupForm) {
      signupForm.style.display = "grid";
    }

    if (loginForm) {
      loginForm.style.display = "none";
    }

  };

}


/* =========================================================
   CONNEXION EMAIL
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document.querySelector("#loginEmail")
          ?.value
          .trim();

      const password =
        document.querySelector("#loginPassword")
          ?.value;


      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        closeModal("authModal");

        toast("Connexion réussie 👋");

      } catch (error) {

        toast(firebaseError(error));
      }

    }
  );

}


/* =========================================================
   CREATION COMPTE
   ========================================================= */

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const name =
        document.querySelector("#signupName")
          ?.value
          .trim();

      const email =
        document.querySelector("#signupEmail")
          ?.value
          .trim();

      const password =
        document.querySelector("#signupPassword")
          ?.value;


      try {

        const result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );


        if (name) {

          await updateProfile(
            result.user,
            {
              displayName: name
            }
          );

        }


        demoUsers.push({

          uid: result.user.uid,

          email: result.user.email,

          name: name || "Client"

        });


        save(
          STORAGE.demoUsers,
          demoUsers
        );


        closeModal("authModal");

        toast("Compte créé 🎉");

      } catch (error) {

        toast(firebaseError(error));
      }

    }
  );

}


/* =========================================================
   GOOGLE
   ========================================================= */

const googleButton =
  document.querySelector("#googleBtn");


if (googleButton) {

  googleButton.onclick = async () => {

    try {

      await signInWithPopup(
        auth,
        googleProvider
      );

      closeModal("authModal");

      toast("Connexion Google réussie.");

    } catch (error) {

      toast(firebaseError(error));
    }

  };

}


/* =========================================================
   ERREURS FIREBASE
   ========================================================= */

function firebaseError(error) {

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

    "auth/popup-closed-by-user":
      "Fenêtre Google fermée.",

    "auth/unauthorized-domain":
      "Domaine non autorisé dans Firebase.",

    "auth/invalid-phone-number":
      "Numéro de téléphone invalide.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard."

  };


  return (
    messages[code] ||
    error?.message ||
    "Une erreur est survenue."
  );
}


/* =========================================================
   TELEPHONE / RECAPTCHA
   ========================================================= */

function initRecaptcha() {

  if (recaptchaVerifier) {
    return recaptchaVerifier;
  }


  const container =
    document.querySelector("#recaptcha-container");


  if (!container) {
    return null;
  }


  try {

    recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal"
        }
      );


    return recaptchaVerifier;

  } catch (error) {

    console.error(
      "Erreur reCAPTCHA :",
      error
    );

    return null;
  }
}


const phoneSendButton =
  document.querySelector("#phoneSendBtn");


if (phoneSendButton) {

  phoneSendButton.onclick = async () => {

    const phone =
      document.querySelector("#phoneNumber")
        ?.value
        .trim();


    if (!phone) {

      toast(
        "Entre ton numéro de téléphone."
      );

      return;
    }


    try {

      const verifier =
        initRecaptcha();


      if (!verifier) {

        toast(
          "reCAPTCHA indisponible."
        );

        return;
      }


      confirmationResult =
        await signInWithPhoneNumber(
          auth,
          phone,
          verifier
        );


      const codeInput =
        document.querySelector("#phoneCode");

      const verifyButton =
        document.querySelector("#phoneVerifyBtn");


      if (codeInput) {
        codeInput.style.display = "block";
      }


      if (verifyButton) {
        verifyButton.style.display = "block";
      }


      toast("Code envoyé 📱");

    } catch (error) {

      console.error(error);

      toast(firebaseError(error));
    }

  };

}


const phoneVerifyButton =
  document.querySelector("#phoneVerifyBtn");


if (phoneVerifyButton) {

  phoneVerifyButton.onclick = async () => {

    const code =
      document.querySelector("#phoneCode")
        ?.value
        .trim();


    if (!confirmationResult) {

      toast(
        "Demande d'abord un code."
      );

      return;
    }


    if (!code) {

      toast("Entre le code reçu.");

      return;
    }


    try {

      await confirmationResult.confirm(code);

      closeModal("authModal");

      toast("Téléphone vérifié 📱");

    } catch {

      toast("Code incorrect.");
    }

  };

}


/* =========================================================
   ETAT UTILISATEUR
   ========================================================= */

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    updateHeader();

    if (user) {

      const nameInput =
        document.querySelector("#fullName");

      if (nameInput) {

        nameInput.value =
          user.displayName || "";

      }

    }

    if (
      document
        .querySelector("#ordersModal")
        ?.classList
        .contains("show")
    ) {

      renderOrders();
    }

  }
);


/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {

  const accountButton =
    document.querySelector("#accountBtn");

  const ordersButton =
    document.querySelector("#ordersBtn");

  const adminButton =
    document.querySelector("#adminBtn");


  if (currentUser) {

    if (accountButton) {

      const name =
        currentUser.displayName ||
        currentUser.email?.split("@")[0] ||
        "Compte";


      accountButton.innerHTML =
        `👤 <span>${escapeHTML(name)}</span>`;
    }


    if (ordersButton) {
      ordersButton.style.display = "block";
    }


    if (adminButton) {

      adminButton.style.display =
        isAdmin()
          ? "block"
          : "none";
    }


  } else {

    if (accountButton) {
      accountButton.innerHTML =
        "👤 <span>Compte</span>";
    }

    if (ordersButton) {
      ordersButton.style.display = "none";
    }

    if (adminButton) {
      adminButton.style.display = "none";
    }

  }

}


/* =========================================================
   ADMIN
   ========================================================= */

function isAdmin() {

  return (
    !!currentUser &&
    localStorage.getItem(
      STORAGE.admin
    ) === currentUser.uid
  );
}


/* =========================================================
   COMPTE
   ========================================================= */

const accountButton =
  document.querySelector("#accountBtn");


if (accountButton) {

  accountButton.onclick = () => {

    if (!currentUser) {

      openModal("authModal");

      return;
    }


    renderAccount();

    openModal("accountModal");
  };

}


function renderAccount() {

  const element =
    document.querySelector("#accountInfo");


  if (!element || !currentUser) {
    return;
  }


  element.innerHTML = `

    <b>
      ${escapeHTML(userDisplayName())}
    </b>

    <span>
      ${escapeHTML(
        currentUser.email ||
        "Compte téléphone"
      )}
    </span>

    <br>

    <small>
      ID : ${escapeHTML(
        currentUser.uid.slice(0, 12)
      )}...
    </small>

  `;
}


/* =========================================================
   MES COMMANDES
   ========================================================= */

const accountOrdersButton =
  document.querySelector("#accountOrdersBtn");


if (accountOrdersButton) {

  accountOrdersButton.onclick = () => {

    closeModal("accountModal");

    renderOrders();

    openModal("ordersModal");
  };

}


const ordersButton =
  document.querySelector("#ordersBtn");


if (ordersButton) {

  ordersButton.onclick = () => {

    if (!requireLogin()) {
      return;
    }

    renderOrders();

    openModal("ordersModal");
  };

}


/* =========================================================
   DECONNEXION
   ========================================================= */

const logoutButton =
  document.querySelector("#logoutBtn");


if (logoutButton) {

  logoutButton.onclick = async () => {

    try {

      await signOut(auth);

      localStorage.removeItem(
        STORAGE.admin
      );

      closeModal("accountModal");

      toast("Déconnexion effectuée.");

    } catch {

      toast(
        "Impossible de se déconnecter."
      );
    }

  };

}


/* =========================================================
   SUPPRESSION COMPTE
   ========================================================= */

const deleteAccountButton =
  document.querySelector("#deleteAccountBtn");


if (deleteAccountButton) {

  deleteAccountButton.onclick =
    async () => {

      if (!currentUser) {
        return;
      }


      const confirmed =
        confirm(
          "Supprimer définitivement ton compte ?"
        );


      if (!confirmed) {
        return;
      }


      try {

        await deleteUser(currentUser);

        localStorage.removeItem(
          STORAGE.admin
        );

        toast(
          "Compte supprimé."
        );

      } catch (error) {

        if (
          error.code ===
          "auth/requires-recent-login"
        ) {

          toast(
            "Reconnecte-toi avant de supprimer ton compte."
          );

        } else {

          toast(
            "Suppression impossible."
          );
        }

      }

    };

}


/* =========================================================
   CODE ADMIN
   ========================================================= */

const adminUnlockButton =
  document.querySelector("#adminUnlockBtn");


if (adminUnlockButton) {

  adminUnlockButton.onclick = () => {

    if (!currentUser) {

      toast(
        "Connecte-toi d'abord."
      );

      return;
    }


    const input =
      document.querySelector("#adminCodeInput");


    const code =
      input?.value
        .trim();


    if (code === "NOVA-ADMIN-2026") {

      localStorage.setItem(
        STORAGE.admin,
        currentUser.uid
      );


      updateHeader();

      closeModal("accountModal");

      toast(
        "Accès admin activé ⚙️"
      );

    } else {

      toast(
        "Code administrateur incorrect."
      );

    }

  };

}


/* =========================================================
   DASHBOARD
   ========================================================= */

const adminButton =
  document.querySelector("#adminBtn");


if (adminButton) {

  adminButton.onclick = () => {

    if (!isAdmin()) {

      toast(
        "Accès administrateur refusé."
      );

      return;
    }


    renderDashboard();

    openModal("dashboardModal");
  };

}


function renderDashboard() {

  const catalogValue =
    PRODUCTS.reduce(
      (total, product) =>
        total + product.price,
      0
    );


  const freeOrders =
    orders.filter(
      order =>
        Number(order.discountPercent) === 100
    ).length;


  const ordersStat =
    document.querySelector("#statOrders");

  const freeStat =
    document.querySelector("#statFree");

  const catalogStat =
    document.querySelector("#statCatalog");


  if (ordersStat) {
    ordersStat.textContent =
      orders.length;
  }


  if (freeStat) {
    freeStat.textContent =
      freeOrders;
  }


  if (catalogStat) {
    catalogStat.textContent =
      money(catalogValue);
  }


  const adminOrders =
    document.querySelector("#adminOrders");


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

          <tr>
            <th>N°</th>
            <th>Client</th>
            <th>Total</th>
            <th>Date</th>
          </tr>

          ${
            orders.map(order => `

              <tr>

                <td>
                  ${escapeHTML(order.number)}
                </td>

                <td>
                  ${escapeHTML(order.customerName)}
                </td>

                <td>
                  ${money(order.total)}
                </td>

                <td>
                  ${escapeHTML(order.date)}
                </td>

              </tr>

            `).join("")
          }

        </table>
      `;
    }
  }


  const usersElement =
    document.querySelector("#adminUsers");


  if (usersElement) {

    usersElement.innerHTML = `

      <div class="info-box">

        Utilisateurs démo enregistrés :

        <b>
          ${demoUsers.length}
        </b>

      </div>

    `;
  }

}


/* =========================================================
   RESET DEMO
   ========================================================= */

const resetDemoButton =
  document.querySelector("#resetDemoBtn");


if (resetDemoButton) {

  resetDemoButton.onclick = () => {

    const confirmed =
      confirm(
        "Réinitialiser les données démo ?"
      );


    if (!confirmed) {
      return;
    }


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
      STORAGE.reviews
    );


    cart = {};
    favorites = [];
    orders = [];
    reviews = {};


    renderCart();
    renderProducts();
    renderDashboard();


    toast(
      "Données démo réinitialisées."
    );

  };

}


/* =========================================================
   CODES PROMO
   ========================================================= */

const PROMOS = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};


function getCheckoutData() {

  const subtotal =
    cartSubtotal();


  const input =
    document.querySelector("#promoCode");


  const code =
    input
      ? input.value
          .trim()
          .toUpperCase()
      : "";


  const percentage =
    PROMOS[code] ?? 0;


  const discount =
    subtotal *
    percentage /
    100;


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  return {
    subtotal,
    code,
    percentage,
    discount,
    total
  };

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function updateCheckout() {

  const data =
    getCheckoutData();


  const result =
    document.querySelector("#promoResult");


  if (result) {

    if (
      data.code &&
      PROMOS[data.code] !== undefined
    ) {

      result.style.display =
        "block";

      result.style.background =
        "#eef8f1";

      result.style.color =
        "#12683d";

      result.textContent =
        `Code accepté : -${data.percentage}%`;

    } else if (data.code) {

      result.style.display =
        "block";

      result.style.background =
        "#fff1f2";

      result.style.color =
        "#a51d2d";

      result.textContent =
        "Code promotionnel invalide.";

    } else {

      result.style.display =
        "none";
    }

  }


  const summary =
    document.querySelector("#checkoutSummary");


  if (summary) {

    summary.innerHTML = `

      <div style="
        display:flex;
        justify-content:space-between;
      ">
        <span>Sous-total</span>
        <b>${money(data.subtotal)}</b>
      </div>


      <div style="
        display:flex;
        justify-content:space-between;
      ">
        <span>Réduction</span>
        <b>
          ${
            data.percentage
              ? "-" + money(data.discount)
              : "0,00 €"
          }
        </b>
      </div>


      <div style="
        display:flex;
        justify-content:space-between;
        margin-top:8px;
        padding-top:8px;
        border-top:1px solid #ddd;
        font-size:17px;
      ">
        <span>Total</span>
        <b>${money(data.total)}</b>
      </div>

    `;
  }


  const payButton =
    document.querySelector("#payButton");


  if (payButton) {

    payButton.textContent =
      data.percentage === 100
        ? "Payer 0,00 € avec le code"
        : `Payer ${money(data.total)}`;


    payButton.disabled =
      data.percentage !== 100 ||
      cartArray().length === 0;
  }

}


const promoInput =
  document.querySelector("#promoCode");


if (promoInput) {

  promoInput.addEventListener(
    "input",
    updateCheckout
  );

}


/* =========================================================
   OUVRIR CHECKOUT
   ========================================================= */

const checkoutButton =
  document.querySelector("#checkoutBtn");


if (checkoutButton) {

  checkoutButton.onclick = () => {

    if (!requireLogin()) {
      return;
    }


    if (!cartArray().length) {

      toast(
        "Ton panier est vide."
      );

      return;
    }


    closeCart();

    updateCheckout();

    openModal("checkoutModal");
  };

}


/* =========================================================
   VALIDATION COMMANDE
   ========================================================= */

const checkoutForm =
  document.querySelector("#checkoutForm");


if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!currentUser) {

        toast(
          "Connecte-toi."
        );

        return;
      }


      const data =
        getCheckoutData();


      if (data.percentage !== 100) {

        toast(
          "Utilise NOVA100 pour la démo."
        );

        return;
      }


      if (!cartArray().length) {

        toast(
          "Panier vide."
        );

        return;
      }


      const order = {

        id: crypto.randomUUID(),

        number:
          "NOVA-" +
          Date.now()
            .toString()
            .slice(-8),

        uid:
          currentUser.uid,

        customerName:
          document.querySelector("#fullName")
            ?.value
            .trim() || "",

        email:
          currentUser.email || "",

        address:
          document.querySelector("#address")
            ?.value
            .trim() || "",

        postalCode:
          document.querySelector("#postalCode")
            ?.value
            .trim() || "",

        city:
          document.querySelector("#city")
            ?.value
            .trim() || "",

        country:
          document.querySelector("#country")
            ?.value
            .trim() || "France",

        warehouse:
          "Entrepôt",

        items:
          cartArray().map(item => ({

            id:
              item.product.id,

            name:
              item.product.name,

            price:
              item.product.price,

            qty:
              item.quantity

          })),

        subtotal:
          data.subtotal,

        discount:
          data.discount,

        discountPercent:
          data.percentage,

        promoCode:
          data.code,

        total:
          data.total,

        paymentMethod:
          "Code promotionnel",

        date:
          new Date()
            .toLocaleString("fr-FR")

      };


      orders.unshift(order);

      save(
        STORAGE.orders,
        orders
      );


      cart = {};

      save(
        STORAGE.cart,
        cart
      );


      renderCart();

      closeModal("checkoutModal");

      showInvoice(order);

      toast(
        "Commande créée 🎉"
      );

    }
  );

}


/* =========================================================
   COMMANDES
   ========================================================= */

function getUserOrders() {

  if (!currentUser) {
    return [];
  }


  return orders.filter(
    order =>
      order.uid === currentUser.uid
  );
}


function renderOrders() {

  const container =
    document.querySelector("#ordersList");


  if (!container) {
    return;
  }


  const list =
    getUserOrders();


  if (!list.length) {

    container.innerHTML = `

      <div class="info-box">

        Tu n'as encore aucune commande.

      </div>

    `;

    return;
  }


  container.innerHTML =
    list.map(order => `

      <div class="user-card">

        <b>
          ${escapeHTML(order.number)}
        </b>


        <div>
          ${escapeHTML(order.date)}
        </div>


        <div style="margin-top:8px">

          Total :

          <strong>
            ${money(order.total)}
          </strong>

        </div>


        <div style="
          margin-top:5px;
          color:#16834b;
          font-size:13px;
        ">

          ${escapeHTML(
            order.paymentMethod
          )}

        </div>


        <button
          class="btn"
          style="margin-top:12px"
          data-invoice="${order.id}"
        >
          Voir la facture
        </button>

      </div>

    `).join("");
}


/* =========================================================
   FACTURE
   ========================================================= */

function showInvoice(order) {

  const container =
    document.querySelector("#invoiceContent");


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="invoice-head">

      <div class="invoice-logo">
        NOVA<span>SHOP</span>
      </div>


      <div class="invoice-meta">

        FACTURE<br>

        <b>
          ${escapeHTML(order.number)}
        </b>

        <br>

        ${escapeHTML(order.date)}

      </div>

    </div>


    <div class="invoice-client">

      <div>

        <b>Client</b>

        <br>

        ${escapeHTML(
          order.customerName
        )}

        <br>

        ${escapeHTML(
          order.email
        )}

      </div>


      <div>

        <b>
          Adresse de livraison
        </b>

        <br>

        ${escapeHTML(order.address)}

        <br>

        ${escapeHTML(order.postalCode)}
        ${escapeHTML(order.city)}

        <br>

        ${escapeHTML(order.country)}

      </div>

    </div>


    <div style="margin-bottom:15px">

      <b>Entrepôt :</b>

      ${escapeHTML(order.warehouse)}

    </div>


    <table class="invoice-table">

      <thead>

        <tr>

          <th>
            Produit
          </th>

          <th>
            Qté
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

        ${
          order.items.map(item => `

            <tr>

              <td>
                ${escapeHTML(item.name)}
              </td>

              <td>
                ${item.qty}
              </td>

              <td>
                ${money(item.price)}
              </td>

              <td>
                ${money(
                  item.price *
                  item.qty
                )}
              </td>

            </tr>

          `).join("")
        }

      </tbody>

    </table>


    <div class="invoice-total">

      <div>

        <span>
          Sous-total
        </span>

        <b>
          ${money(order.subtotal)}
        </b>

      </div>


      <div>

        <span>
          Réduction
        </span>

        <b>
          - ${money(order.discount)}
        </b>

      </div>


      <div>

        <span>
          Paiement
        </span>

        <b>
          ${escapeHTML(
            order.paymentMethod
          )}
        </b>

      </div>


      <div class="grand">

        <span>
          Total payé
        </span>

        <b>
          ${money(order.total)}
        </b>

      </div>

    </div>


    <div style="
      margin-top:45px;
      padding-top:15px;
      border-top:1px solid #ddd;
      color:#777;
      font-size:11px;
    ">

      Facture générée par NovaShop.
      Commande démo.

    </div>

  `;


  openModal("invoiceModal");
}


/* =========================================================
   CLIC FACTURE
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-invoice]"
      );


    if (!button) {
      return;
    }


    const order =
      orders.find(
        item =>
          item.id ===
          button.dataset.invoice
      );


    if (order) {
      showInvoice(order);
    }

  }
);


/* =========================================================
   IMPRESSION
   ========================================================= */

const printButton =
  document.querySelector("#printInvoiceBtn");


if (printButton) {

  printButton.onclick = () => {
    window.print();
  };

}


/* =========================================================
   RECHERCHE
   ========================================================= */

const searchButton =
  document.querySelector("#searchBtn");


const searchInput =
  document.querySelector("#searchInput");


function performSearch() {

  currentSearch =
    searchInput
      ? searchInput.value.trim()
      : "";

  renderProducts();
}


if (searchButton) {

  searchButton.onclick =
    performSearch;

}


if (searchInput) {

  searchInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        performSearch();
      }

    }
  );

}


/* =========================================================
   TRI
   ========================================================= */

const sortSelect =
  document.querySelector("#sortSelect");


if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    renderProducts
  );

}


/* =========================================================
   CATEGORIES
   ========================================================= */

document
  .querySelectorAll(".cat")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".cat")
          .forEach(
            category =>
              category.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        currentCategory =
          button.dataset.category ||
          "Tous";


        renderProducts();

      }
    );

  });


/* =========================================================
   CLICS CARTES
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const add =
      event.target.closest(
        "[data-add]"
      );


    if (add) {

      addToCart(
        add.dataset.add
      );

      return;
    }


    const view =
      event.target.closest(
        "[data-view]"
      );


    if (view) {

      openProduct(
        view.dataset.view
      );

      return;
    }


    const favorite =
      event.target.closest(
        "[data-fav]"
      );


    if (favorite) {

      toggleFavorite(
        favorite.dataset.fav
      );

      return;
    }


    const plus =
      event.target.closest(
        "[data-plus]"
      );


    if (plus) {

      changeQuantity(
        plus.dataset.plus,
        1
      );

      return;
    }


    const minus =
      event.target.closest(
        "[data-minus]"
      );


    if (minus) {

      changeQuantity(
        minus.dataset.minus,
        -1
      );

      return;
    }


    const remove =
      event.target.closest(
        "[data-remove]"
      );


    if (remove) {

      removeFromCart(
        remove.dataset.remove
      );

      return;
    }

  }
);


/* =========================================================
   PANIER OUVERTURE
   ========================================================= */

const cartButton =
  document.querySelector("#cartBtn");

const cartDrawer =
  document.querySelector("#cartDrawer");

const overlay =
  document.querySelector("#overlay");

const closeCartButton =
  document.querySelector("#closeCart");


function openCart() {

  overlay?.classList.add(
    "show"
  );

  cartDrawer?.classList.add(
    "open"
  );

}


function closeCart() {

  overlay?.classList.remove(
    "show"
  );

  cartDrawer?.classList.remove(
    "open"
  );

}


if (cartButton) {

  cartButton.onclick =
    openCart;

}


if (closeCartButton) {

  closeCartButton.onclick =
    closeCart;

}


if (overlay) {

  overlay.onclick =
    closeCart;

}


/* =========================================================
   FERMETURE MODALES
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const close =
      event.target.closest(
        "[data-close]"
      );


    if (!close) {
      return;
    }


    closeModal(
      close.dataset.close
    );

  }
);


/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    document
      .querySelectorAll(".modal.show")
      .forEach(
        modal =>
          modal.classList.remove(
            "show"
          )
      );


    closeCart();

  }
);


/* =========================================================
   INITIALISATION
   ========================================================= */

function initNovaShop() {

  console.log(
    "NovaShop chargé :",
    PRODUCTS.length,
    "produits"
  );


  renderProducts();

  renderCart();

  updateCheckout();

  updateHeader();

}


initNovaShop();
