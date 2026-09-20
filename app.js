import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";

const PROMO_CODE = "NOVA100";

let currentUser = null;
let activeCategory = "Tous";
let currentModal = null;

let cart = JSON.parse(localStorage.getItem("novaCart") || "[]");

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
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
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
  },
  {
    id:"p19",
    name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category:"Écrans",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },
  {
    id:"p20",
    name:'iiyama 23.8" LED G-Master GB2471HS-B1 Red Eagle',
    category:"Écrans",
    price:65.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },
  {
    id:"p21",
    name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds",
    category:"Chaises gaming",
    price:129.99,
    image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },
  {
    id:"p22",
    name:"Dowinx Série Luxe Suède LS-66D68E Blanc",
    category:"Chaises gaming",
    price:79.99,
    image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },
  {
    id:"p23",
    name:"Chaise GTPLAYER Ergonomique Gaming",
    category:"Chaises gaming",
    price:109.99,
    image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },
  {
    id:"p24",
    name:"Desk Lite - Height-Adjustable Desk",
    category:"Bureaux gaming",
    price:110.99,
    image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },
  {
    id:"p25",
    name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm",
    category:"Bureaux gaming",
    price:86.99,
    image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },
  {
    id:"p26",
    name:"Bureau gaming d’angle HOMCOM réversible",
    category:"Bureaux gaming",
    price:44.99,
    image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },
  {
    id:"p27",
    name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category:"Casques",
    price:99.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },
  {
    id:"p28",
    name:"Razer BlackShark V2 Pro 2023 Noir",
    category:"Casques",
    price:75.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },
  {
    id:"p29",
    name:"beyerdynamic DT-990 Pro 250 Ohm",
    category:"Casques",
    price:60.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },
  {
    id:"p30",
    name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category:"Claviers",
    price:78.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },
  {
    id:"p31",
    name:"QwertyKey75 HE Striker Magnetic Hall Effect",
    category:"Claviers",
    price:56.99,
    image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },
  {
    id:"p32",
    name:"GravaStar Mercury K1 Clavier Gamer sans Fil",
    category:"Claviers",
    price:91.99,
    image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },
  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra",
    category:"Souris",
    price:26.99,
    image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },
  {
    id:"p34",
    name:"HyperX QuadCast 2 – Microphone USB – RGB",
    category:"Microphones",
    price:98.99,
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },
  {
    id:"p35",
    name:"Shure SM7 dB",
    category:"Microphones",
    price:121.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },
  {
    id:"p36",
    name:"Razer Seiren V3 Chroma Noir",
    category:"Microphones",
    price:13.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },
  {
    id:"p37",
    name:"Stairville LED Pixel Rail 40 RGB MKII",
    category:"Éclairage RGB",
    price:18.90,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },
  {
    id:"p38",
    name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category:"Éclairage RGB",
    price:0,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },
  {
    id:"p39",
    name:"Lampe de plafond hexagone nid d’abeille LED",
    category:"Éclairage RGB",
    price:91.10,
    image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },
  {
    id:"p40",
    name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category:"Cartes graphiques",
    price:147,
    image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
  },
  {
    id:"p41",
    name:"MSI GeForce RTX 3050 LP E 6G OC",
    category:"Cartes graphiques",
    price:100,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
  },
  {
    id:"p42",
    name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category:"Cartes graphiques",
    price:140,
    image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
  },
  {
    id:"p43",
    name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category:"PC Gamer",
    price:650,
    image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg"
  }
];

function escapeHtml(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/*
  FALLBACK LOCAL EN SVG
  Si un site bloque le hotlink de l'image,
  on affiche quand même une image propre.
*/
const fallbackImage =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="500">
      <rect width="100%" height="100%" fill="#f4f6f8"/>
      <text x="50%" y="46%"
        text-anchor="middle"
        font-family="Arial"
        font-size="28"
        font-weight="700"
        fill="#162235">
        NOVASHOP
      </text>
      <text x="50%" y="56%"
        text-anchor="middle"
        font-family="Arial"
        font-size="17"
        fill="#6d7786">
        Image indisponible
      </text>
    </svg>
  `);

function setupImageFallbacks(root = document){

  root.querySelectorAll("img[data-nova-image]").forEach(img => {

    if(img.dataset.fallbackReady === "1") return;

    img.dataset.fallbackReady = "1";

    img.addEventListener("error", () => {

      if(img.dataset.fallbackUsed === "1") return;

      img.dataset.fallbackUsed = "1";
      img.src = fallbackImage;

    });

  });

}

function money(value){
  return Number(value || 0).toLocaleString("fr-FR",{
    style:"currency",
    currency:"EUR"
  });
}

function getReviewCount(product){

  const number = parseInt(
    product.id.replace("p",""),
    10
  );

  return 132 + ((number * 173) % 1604);
}

function getRating(product){

  const number = parseInt(
    product.id.replace("p",""),
    10
  );

  return (4.4 + ((number % 6) * .1)).toFixed(1);
}

function getCategories(){

  return [
    "Tous",
    ...new Set(products.map(p => p.category))
  ];

}

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}

function showToast(message){

  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__novaToast);

  window.__novaToast = setTimeout(() => {
    toast.classList.remove("show");
  },2200);

}

function renderCategories(){

  const container =
    document.getElementById("categories");

  container.innerHTML =
    getCategories().map(category => `
      <button
        class="category-btn ${category === activeCategory ? "active" : ""}"
        data-category="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>
    `).join("");

  container.querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        activeCategory =
          button.dataset.category;

        renderCategories();
        renderProducts();

      });

    });

}

function renderProducts(){

  const container =
    document.getElementById("products");

  const search =
    document.getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  const sort =
    document.getElementById("sortSelect").value;

  let list = products.filter(product => {

    const categoryOK =
      activeCategory === "Tous" ||
      product.category === activeCategory;

    const searchOK =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return categoryOK && searchOK;

  });

  if(sort === "priceAsc"){
    list.sort((a,b) => a.price - b.price);
  }

  if(sort === "priceDesc"){
    list.sort((a,b) => b.price - a.price);
  }

  if(sort === "rating"){
    list.sort((a,b) =>
      Number(getRating(b)) - Number(getRating(a))
    );
  }

  if(!list.length){

    container.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:50px;
        text-align:center;
        color:#8190a5;
        border:1px solid var(--border);
        border-radius:18px;
      ">
        Aucun produit trouvé.
      </div>
    `;

    return;

  }

  container.innerHTML = list.map(product => {

    const image =
      escapeHtml(product.image);

    return `
      <article class="product-card">

        <div class="product-image">
          <img
            data-nova-image
            src="${image}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
        </div>

        <div class="product-body">

          <div class="product-category">
            ${escapeHtml(product.category)}
          </div>

          <div class="product-name">
            ${escapeHtml(product.name)}
          </div>

          <div class="rating">
            ★★★★☆ ${getRating(product)}
            <span>· ${getReviewCount(product).toLocaleString("fr-FR")} avis</span>
          </div>

          <div class="price">
            ${product.price > 0 ? money(product.price) : "Prix indisponible"}
          </div>

          <div class="product-actions">

            <button
              class="view-product"
              data-id="${product.id}"
            >
              Voir
            </button>

            <button
              class="add-product"
              data-id="${product.id}"
            >
              🛒 Ajouter
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");

  container.querySelectorAll(".view-product")
    .forEach(button => {

      button.addEventListener("click", () => {
        viewProduct(button.dataset.id);
      });

    });

  container.querySelectorAll(".add-product")
    .forEach(button => {

      button.addEventListener("click", () => {
        addToCart(button.dataset.id);
      });

    });

  setupImageFallbacks(container);

}

function addToCart(id){

  const product =
    products.find(p => p.id === id);

  if(!product) return;

  if(product.price <= 0){

    showToast("Prix indisponible pour ce produit.");
    return;

  }

  const existing =
    cart.find(item => item.id === id);

  if(existing){
    existing.quantity++;
  }else{
    cart.push({
      id,
      quantity:1
    });
  }

  saveCart();
  renderCart();

  showToast("Produit ajouté au panier 🛒");

}

function removeFromCart(id){

  cart =
    cart.filter(item => item.id !== id);

  saveCart();
  renderCart();

}

function getCartItems(){

  return cart.map(item => {

    const product =
      products.find(p => p.id === item.id);

    if(!product) return null;

    return {
      ...product,
      quantity:item.quantity,
      lineTotal:
        product.price * item.quantity
    };

  }).filter(Boolean);

}

function getCartTotal(){

  return getCartItems()
    .reduce((sum,item) =>
      sum + item.lineTotal,0);

}

function renderCart(){

  const container =
    document.getElementById("cartItems");

  const count =
    cart.reduce(
      (sum,item) => sum + item.quantity,
      0
    );

  document.getElementById("cartCount")
    .textContent = count;

  const items =
    getCartItems();

  if(!items.length){

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:70px 20px;
        color:#718097;
      ">
        <div style="font-size:45px;margin-bottom:15px">🛒</div>
        Ton panier est vide.
      </div>
    `;

  }else{

    container.innerHTML =
      items.map(item => `

        <div class="cart-item">

          <img
            data-nova-image
            src="${escapeHtml(item.image)}"
            alt="${escapeHtml(item.name)}"
            referrerpolicy="no-referrer"
          >

          <div>
            <h4>${escapeHtml(item.name)}</h4>
            <p>
              ${item.quantity} × ${money(item.price)}
            </p>
          </div>

          <button
            class="remove-btn"
            data-remove="${item.id}"
          >
            ×
          </button>

        </div>

      `).join("");

    container.querySelectorAll("[data-remove]")
      .forEach(button => {

        button.addEventListener("click", () => {

          removeFromCart(
            button.dataset.remove
          );

        });

      });

    setupImageFallbacks(container);

  }

  document.getElementById("cartTotal")
    .textContent = money(getCartTotal());

}

function openCart(){

  document.getElementById("cartDrawer")
    .classList.add("active");

}

function closeCart(){

  document.getElementById("cartDrawer")
    .classList.remove("active");

}

function openModal(title,content){

  document.getElementById("modalTitle")
    .textContent = title;

  document.getElementById("modalContent")
    .innerHTML = content;

  document.getElementById("modal")
    .classList.add("active");

  setupImageFallbacks(
    document.getElementById("modalContent")
  );

}

function closeModal(){

  document.getElementById("modal")
    .classList.remove("active");

  currentModal = null;

}

function viewProduct(id){

  const product =
    products.find(p => p.id === id);

  if(!product) return;

  currentModal = product;

  openModal(
    product.name,
    `

      <img
        data-nova-image
        src="${escapeHtml(product.image)}"
        alt="${escapeHtml(product.name)}"
        referrerpolicy="no-referrer"
        style="
          width:100%;
          height:320px;
          object-fit:contain;
          background:white;
          border-radius:15px;
          display:block;
          margin-bottom:20px;
        "
      >

      <div class="product-category">
        ${escapeHtml(product.category)}
      </div>

      <h2 style="margin:8px 0 10px">
        ${escapeHtml(product.name)}
      </h2>

      <div class="rating">
        ★★★★☆ ${getRating(product)}
        <span>
          · ${getReviewCount(product).toLocaleString("fr-FR")} avis
        </span>
      </div>

      <div style="
        font-size:28px;
        font-weight:900;
        margin:18px 0;
      ">
        ${product.price > 0 ? money(product.price) : "Prix indisponible"}
      </div>

      <div style="
        padding:17px;
        border:1px solid var(--border);
        border-radius:14px;
        background:#0b1726;
        margin-bottom:15px;
      ">
        <strong>⭐ Avis clients</strong>

        <p style="
          color:#91a0b3;
          margin-top:8px;
          line-height:1.6;
        ">
          Produit évalué par la communauté NovaShop.
          Les avis affichés sont une présentation de démonstration.
        </p>
      </div>

      <button
        class="full-btn"
        id="modalAddCart"
      >
        🛒 Ajouter au panier
      </button>

    `
  );

  document.getElementById("modalAddCart")
    ?.addEventListener("click",() => {

      addToCart(product.id);
      closeModal();

    });

}

function showLogin(){

  openModal(
    "Compte NovaShop",
    `

      <div style="text-align:center;padding:15px">

        <div style="font-size:50px;margin-bottom:15px">
          👤
        </div>

        <h2>Connexion</h2>

        <p style="
          color:#8998ad;
          margin:12px 0 22px;
          line-height:1.6;
        ">
          Connecte-toi avec Google pour gérer
          tes commandes NovaShop.
        </p>

        <button
          class="full-btn"
          id="googleLogin"
        >
          Continuer avec Google
        </button>

      </div>

    `
  );

  document.getElementById("googleLogin")
    .addEventListener("click", async () => {

      try{

        const provider =
          new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );

        closeModal();
        showToast("Connexion réussie.");

      }catch(error){

        console.error(error);

        showToast(
          "Connexion impossible."
        );

      }

    });

}

function showAccount(){

  if(!currentUser){

    showLogin();
    return;

  }

  openModal(
    "Mon compte",
    `

      <div style="
        padding:5px 0;
      ">

        <div style="
          padding:18px;
          border:1px solid var(--border);
          border-radius:14px;
          background:#0b1726;
          margin-bottom:15px;
        ">

          <strong>${escapeHtml(currentUser.displayName || "Utilisateur")}</strong>

          <div style="
            color:#8391a4;
            margin-top:6px;
          ">
            ${escapeHtml(currentUser.email || "")}
          </div>

        </div>

        <button
          class="full-btn"
          id="logoutBtn"
        >
          Se déconnecter
        </button>

      </div>

    `
  );

  document.getElementById("logoutBtn")
    .addEventListener("click", async () => {

      await signOut(auth);

      localStorage.removeItem(
        ADMIN_ACCESS_KEY
      );

      closeModal();

      showToast("Déconnecté.");

    });

}

function openCheckout(){

  if(!currentUser){

    showLogin();
    return;

  }

  if(!cart.length){

    showToast("Ton panier est vide.");
    return;

  }

  const total =
    getCartTotal();

  openModal(
    "Finaliser la commande",
    `

      <form id="checkoutForm">

        <div class="form-grid">

          <div class="form-group full">
            <label>Nom complet</label>
            <input
              id="fullName"
              required
              placeholder="Nom et prénom"
            >
          </div>

          <div class="form-group full">
            <label>Adresse</label>
            <input
              id="address"
              required
              placeholder="Adresse de livraison"
            >
          </div>

          <div class="form-group">
            <label>Code postal</label>
            <input
              id="postalCode"
              required
              placeholder="59000"
            >
          </div>

          <div class="form-group">
            <label>Ville</label>
            <input
              id="city"
              required
              placeholder="Ville"
            >
          </div>

          <div class="form-group full">
            <label>Téléphone (optionnel)</label>
            <input
              id="phone"
              placeholder="Téléphone"
            >
          </div>

          <div class="form-group full">
            <label>Code promo</label>

            <input
              id="promoCode"
              placeholder="Code promo"
              autocomplete="off"
            >
          </div>

        </div>

        <div class="summary">

          <div class="summary-line">
            <span>Sous-total</span>
            <span id="checkoutSubtotal">
              ${money(total)}
            </span>
          </div>

          <div
            class="summary-line"
            id="discountLine"
            style="display:none;color:#48df91"
          >
            <span>Réduction</span>
            <span id="discountAmount">
              -${money(total)}
            </span>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span id="checkoutTotal">
              ${money(total)}
            </span>
          </div>

        </div>

        <button
          type="button"
          class="secondary-btn"
          style="width:100%"
          id="applyPromo"
        >
          Appliquer le code
        </button>

        <button
          type="button"
          class="paypal-btn"
          id="paypalBtn"
        >
          Payer avec PayPal
        </button>

        <button
          type="button"
          class="free-btn hidden"
          id="freeOrderBtn"
        >
          Valider la commande à 0 €
        </button>

      </form>

    `
  );

  const promoInput =
    document.getElementById("promoCode");

  const subtotalEl =
    document.getElementById("checkoutSubtotal");

  const totalEl =
    document.getElementById("checkoutTotal");

  const discountLine =
    document.getElementById("discountLine");

  const discountAmount =
    document.getElementById("discountAmount");

  const paypalBtn =
    document.getElementById("paypalBtn");

  const freeOrderBtn =
    document.getElementById("freeOrderBtn");

  let finalTotal = total;

  document.getElementById("applyPromo")
    .addEventListener("click", () => {

      const code =
        promoInput.value
          .trim()
          .toUpperCase();

      if(code === PROMO_CODE){

        finalTotal = 0;

        discountLine.style.display =
          "flex";

        discountAmount.textContent =
          "-" + money(total);

        totalEl.textContent =
          money(0);

        paypalBtn.classList.add(
          "hidden"
        );

        freeOrderBtn.classList.remove(
          "hidden"
        );

        showToast(
          "Code NOVA100 appliqué 🎁"
        );

      }else{

        finalTotal = total;

        discountLine.style.display =
          "none";

        totalEl.textContent =
          money(total);

        paypalBtn.classList.remove(
          "hidden"
        );

        freeOrderBtn.classList.add(
          "hidden"
        );

        showToast(
          "Code promo invalide."
        );

      }

    });

  paypalBtn.addEventListener(
    "click",
    async () => {

      await createPaypalOrder(
        finalTotal,
        promoInput.value.trim()
      );

    }
  );

  freeOrderBtn.addEventListener(
    "click",
    async () => {

      await createFreeOrder();

    }
  );

}

function getCheckoutAddress(){

  return {

    fullName:
      document.getElementById("fullName")
        .value.trim(),

    address:
      document.getElementById("address")
        .value.trim(),

    postalCode:
      document.getElementById("postalCode")
        .value.trim(),

    city:
      document.getElementById("city")
        .value.trim(),

    phone:
      document.getElementById("phone")
        .value.trim()

  };

}

function validateAddress(address){

  return Boolean(
    address.fullName &&
    address.address &&
    address.postalCode &&
    address.city
  );

}

async function createPaypalOrder(
  total,
  promoCode
){

  const address =
    getCheckoutAddress();

  if(!validateAddress(address)){

    showToast(
      "Complète l'adresse de livraison."
    );

    return;

  }

  if(total <= 0){

    showToast(
      "Le total est déjà à 0 €."
    );

    return;

  }

  try{

    const order = {

      userId:currentUser.uid,
      email:currentUser.email,

      items:getCartItems().map(item => ({
        id:item.id,
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        image:item.image
      })),

      total:Number(total.toFixed(2)),

      paymentMethod:"PayPal.Me",
      paymentStatus:"pending",

      status:"pending",

      promoCode:promoCode || "",

      address,

      packageCity:"",
      estimatedDelivery:"",
      trackingNumber:"",
      deliveryDuration:"",

      createdAt:serverTimestamp()

    };

    const ref =
      await addDoc(
        collection(db,"orders"),
        order
      );

    const paypalAmount =
      Number(total.toFixed(2));

    const paypalUrl =
      `https://paypal.me/SH0PNOVA/${paypalAmount.toFixed(2)}`;

    window.open(
      paypalUrl,
      "_blank",
      "noopener,noreferrer"
    );

    showToast(
      "Commande créée. Paiement PayPal ouvert."
    );

    closeModal();

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de créer la commande."
    );

  }

}

async function createFreeOrder(){

  const address =
    getCheckoutAddress();

  if(!validateAddress(address)){

    showToast(
      "Complète l'adresse de livraison."
    );

    return;

  }

  try{

    await addDoc(
      collection(db,"orders"),
      {

        userId:currentUser.uid,
        email:currentUser.email,

        items:getCartItems().map(item => ({
          id:item.id,
          name:item.name,
          price:item.price,
          quantity:item.quantity,
          image:item.image
        })),

        total:0,

        paymentMethod:"Promo",
        paymentStatus:"free",

        promoCode:PROMO_CODE,

        status:"accepted",

        address,

        packageCity:"",
        estimatedDelivery:"",
        trackingNumber:"",
        deliveryDuration:"",

        createdAt:serverTimestamp()

      }
    );

    cart = [];

    saveCart();
    renderCart();

    closeModal();
    closeCart();

    showToast(
      "Commande NOVA100 acceptée 🎉"
    );

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de créer la commande."
    );

  }

}

function formatDate(timestamp){

  if(!timestamp) return "Date inconnue";

  try{

    const date =
      timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

    return date.toLocaleString(
      "fr-FR",
      {
        dateStyle:"medium",
        timeStyle:"short"
      }
    );

  }catch{

    return "Date inconnue";

  }

}

const statuses = [
  "pending",
  "accepted",
  "preparing",
  "transit",
  "nearby",
  "delivered"
];

const statusLabels = {
  pending:"En attente",
  accepted:"Acceptée",
  preparing:"Préparation",
  transit:"En transit",
  nearby:"Livraison proche",
  delivered:"Livrée"
};

function statusIndex(status){

  const index =
    statuses.indexOf(status);

  return index < 0 ? 0 : index;

}

function progressHtml(status){

  const current =
    statusIndex(status);

  return `
    <div class="progress">

      ${statuses.map((item,index) => `
        <div
          class="progress-step ${
            index <= current ? "active" : ""
          }"
          title="${escapeHtml(statusLabels[item])}"
        ></div>
      `).join("")}

    </div>
  `;

}

async function showOrders(){

  if(!currentUser){

    showLogin();
    return;

  }

  openModal(
    "Mes commandes",
    `<div id="ordersContent">Chargement...</div>`
  );

  const container =
    document.getElementById("ordersContent");

  try{

    const q =
      query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          currentUser.uid
        )
      );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .sort((a,b) => {

          const ad =
            a.createdAt?.seconds || 0;

          const bd =
            b.createdAt?.seconds || 0;

          return bd - ad;

        });

    if(!orders.length){

      container.innerHTML = `
        <div style="
          text-align:center;
          color:#8190a5;
          padding:50px 10px;
        ">
          Aucune commande.
        </div>
      `;

      return;

    }

    container.innerHTML =
      orders.map(order => `

        <div class="order-card">

          <div class="order-top">

            <div>
              <strong>
                Commande #${escapeHtml(order.id.slice(0,8))}
              </strong>

              <div style="
                color:#75859a;
                font-size:12px;
                margin-top:5px;
              ">
                ${formatDate(order.createdAt)}
              </div>
            </div>

            <span class="status">
              ${escapeHtml(
                statusLabels[order.status] ||
                order.status ||
                "En attente"
              )}
            </span>

          </div>

          ${progressHtml(order.status)}

          <div style="
            color:#9aa9bb;
            font-size:13px;
            line-height:1.7;
          ">

            <div>
              <strong style="color:white">Paiement :</strong>
              ${escapeHtml(order.paymentMethod || "")}
            </div>

            <div>
              <strong style="color:white">Total :</strong>
              ${money(order.total)}
            </div>

            ${
              order.packageCity
              ? `
                <div>
                  <strong style="color:white">
                    Colis :
                  </strong>
                  ${escapeHtml(order.packageCity)}
                </div>
              `
              : ""
            }

            ${
              order.deliveryDuration
              ? `
                <div>
                  <strong style="color:white">
                    Livraison :
                  </strong>
                  ${escapeHtml(order.deliveryDuration)}
                </div>
              `
              : ""
            }

            ${
              order.estimatedDelivery
              ? `
                <div>
                  <strong style="color:white">
                    Livraison prévue :
                  </strong>
                  ${escapeHtml(order.estimatedDelivery)}
                </div>
              `
              : ""
            }

            ${
              order.trackingNumber
              ? `
                <div>
                  <strong style="color:white">
                    Suivi :
                  </strong>
                  ${escapeHtml(order.trackingNumber)}
                </div>
              `
              : ""
            }

          </div>

          <div style="
            margin-top:15px;
            display:flex;
            gap:8px;
          ">

            <button
              class="small-btn"
              data-print-order="${order.id}"
            >
              🖨 Imprimer la facture
            </button>

          </div>

        </div>

      `).join("");

    container.querySelectorAll(
      "[data-print-order]"
    ).forEach(button => {

      button.addEventListener("click", () => {

        printInvoice(
          button.dataset.printOrder
        );

      });

    });

  }catch(error){

    console.error(error);

    container.innerHTML = `
      <div style="
        color:#ff6978;
        padding:25px;
      ">
        Impossible de charger les commandes.
      </div>
    `;

  }

}

function getAdminAuthorized(){

  return (
    localStorage.getItem(
      ADMIN_ACCESS_KEY
    ) === "true"
  );

}

async function openAdmin(){

  if(!currentUser){

    showLogin();
    return;

  }

  const email =
    currentUser.email
      ?.trim()
      .toLowerCase();

  if(
    email !==
    ADMIN_EMAIL.toLowerCase()
  ){

    showToast(
      "Accès réservé au OWNER."
    );

    return;

  }

  if(!getAdminAuthorized()){

    const code =
      prompt(
        "Code OWNER NovaShop :"
      );

    if(code !== ADMIN_CODE){

      showToast(
        "Code incorrect."
      );

      return;

    }

    localStorage.setItem(
      ADMIN_ACCESS_KEY,
      "true"
    );

  }

  renderAdmin();

}

async function renderAdmin(){

  openModal(
    "OWNER · NovaShop",
    `

      <div class="tabs">

        <button
          class="tab active"
          id="adminOrdersTab"
        >
          📦 Commandes
        </button>

        <button
          class="tab"
          id="adminProductsTab"
        >
          🛒 Produits
        </button>

      </div>

      <div id="adminContent">
        Chargement...
      </div>

    `
  );

  document.getElementById("adminOrdersTab")
    .addEventListener("click", async () => {

      document.getElementById("adminOrdersTab")
        .classList.add("active");

      document.getElementById("adminProductsTab")
        .classList.remove("active");

      await renderAdminOrders();

    });

  document.getElementById("adminProductsTab")
    .addEventListener("click", () => {

      document.getElementById("adminProductsTab")
        .classList.add("active");

      document.getElementById("adminOrdersTab")
        .classList.remove("active");

      renderAdminProducts();

    });

  await renderAdminOrders();

}

async function renderAdminOrders(){

  const container =
    document.getElementById("adminContent");

  if(!container) return;

  container.innerHTML =
    "Chargement des commandes...";

  try{

    const snapshot =
      await getDocs(
        collection(db,"orders")
      );

    const orders =
      snapshot.docs
        .map(d => ({
          id:d.id,
          ...d.data()
        }))
        .sort((a,b) => {

          const ad =
            a.createdAt?.seconds || 0;

          const bd =
            b.createdAt?.seconds || 0;

          return bd - ad;

        });

    if(!orders.length){

      container.innerHTML = `
        <div style="
          padding:40px;
          text-align:center;
          color:#7f8da1;
        ">
          Aucune commande.
        </div>
      `;

      return;

    }

    container.innerHTML =
      orders.map(order => {

        const isPaypal =
          order.paymentMethod ===
          "PayPal.Me";

        const accepted =
          order.paymentStatus ===
          "accepted";

        return `

          <div
            class="admin-order"
            data-admin-order="${order.id}"
          >

            <div class="order-top">

              <div>

                <strong>
                  #${escapeHtml(order.id.slice(0,8))}
                </strong>

                <div style="
                  color:#8291a5;
                  font-size:12px;
                  margin-top:5px;
                ">
                  ${escapeHtml(order.email || "")}
                </div>

              </div>

              <span class="status">
                ${escapeHtml(
                  statusLabels[order.status] ||
                  order.status ||
                  "En attente"
                )}
              </span>

            </div>

            <div style="
              margin-top:13px;
              color:#a7b4c4;
              line-height:1.65;
              font-size:13px;
            ">

              <div>
                <strong style="color:white">
                  Client :
                </strong>
                ${escapeHtml(
                  order.address?.fullName || ""
                )}
              </div>

              <div>
                <strong style="color:white">
                  Adresse :
                </strong>
                ${escapeHtml(
                  order.address?.address || ""
                )}
              </div>

              <div>
                <strong style="color:white">
                  Ville :
                </strong>
                ${escapeHtml(
                  order.address?.postalCode || ""
                )}
                ${escapeHtml(
                  order.address?.city || ""
                )}
              </div>

              <div>
                <strong style="color:white">
                  Paiement :
                </strong>
                ${escapeHtml(
                  order.paymentMethod || ""
                )}
              </div>

              <div>
                <strong style="color:white">
                  Total :
                </strong>
                ${money(order.total)}
              </div>

              <div>
                <strong style="color:white">
                  Date :
                </strong>
                ${formatDate(order.createdAt)}
              </div>

            </div>

            <div style="
              margin-top:15px;
              border-top:1px solid var(--border);
              padding-top:15px;
            ">

              <strong>
                Produits
              </strong>

              <div style="
                margin-top:8px;
                color:#8d9caf;
                font-size:12px;
                line-height:1.7;
              ">

                ${
                  (order.items || [])
                    .map(item =>
                      `${escapeHtml(item.name)}
                      × ${item.quantity}`
                    )
                    .join("<br>")
                }

              </div>

            </div>

            <div class="admin-actions">

              ${
                isPaypal && !accepted
                ? `
                  <button
                    class="small-btn blue"
                    data-accept-paypal="${order.id}"
                  >
                    ✓ Accepter le paiement PayPal
                  </button>
                `
                : ""
              }

              <button
                class="small-btn"
                data-print-admin="${order.id}"
              >
                🖨 Facture
              </button>

            </div>

            <div class="admin-grid">

              <div class="form-group">
                <label>État</label>

                <select
                  data-status="${order.id}"
                >

                  ${statuses.map(status => `
                    <option
                      value="${status}"
                      ${
                        order.status === status
                          ? "selected"
                          : ""
                      }
                    >
                      ${escapeHtml(
                        statusLabels[status]
                      )}
                    </option>
                  `).join("")}

                </select>
              </div>

              <div class="form-group">
                <label>Ville du colis</label>

                <input
                  data-package-city="${order.id}"
                  value="${escapeHtml(
                    order.packageCity || ""
                  )}"
                  placeholder="Ex : Lille"
                >
              </div>

              <div class="form-group">
                <label>Livraison prévue</label>

                <input
                  data-delivery-date="${order.id}"
                  value="${escapeHtml(
                    order.estimatedDelivery || ""
                  )}"
                  placeholder="Ex : 25 septembre"
                >
              </div>

              <div class="form-group">
                <label>Durée avant livraison</label>

                <input
                  data-delivery-duration="${order.id}"
                  value="${escapeHtml(
                    order.deliveryDuration || ""
                  )}"
                  placeholder="Ex : 2 à 3 jours"
                >
              </div>

              <div class="form-group">
                <label>Numéro de suivi</label>

                <input
                  data-tracking="${order.id}"
                  value="${escapeHtml(
                    order.trackingNumber || ""
                  )}"
                  placeholder="Numéro de colis"
                >
              </div>

            </div>

            <button
              class="small-btn blue"
              style="margin-top:12px"
              data-save-order="${order.id}"
            >
              💾 Enregistrer les informations
            </button>

          </div>

        `;

      }).join("");

    container.querySelectorAll(
      "[data-accept-paypal]"
    ).forEach(button => {

      button.addEventListener("click", async () => {

        await acceptPaypalOrder(
          button.dataset.acceptPaypal
        );

      });

    });

    container.querySelectorAll(
      "[data-save-order]"
    ).forEach(button => {

      button.addEventListener("click", async () => {

        await saveAdminOrder(
          button.dataset.saveOrder
        );

      });

    });

    container.querySelectorAll(
      "[data-print-admin]"
    ).forEach(button => {

      button.addEventListener("click", () => {

        printAdminInvoice(
          button.dataset.printAdmin
        );

      });

    });

  }catch(error){

    console.error(error);

    container.innerHTML = `
      <div style="color:#ff6675">
        Impossible de charger les commandes OWNER.
      </div>
    `;

  }

}

async function acceptPaypalOrder(orderId){

  try{

    await updateDoc(
      doc(db,"orders",orderId),
      {
        paymentStatus:"accepted",
        status:"accepted"
      }
    );

    showToast(
      "Paiement PayPal accepté."
    );

    await renderAdminOrders();

  }catch(error){

    console.error(error);

    showToast(
      "Erreur lors de l'acceptation."
    );

  }

}

async function saveAdminOrder(orderId){

  try{

    const status =
      document.querySelector(
        `[data-status="${orderId}"]`
      ).value;

    const packageCity =
      document.querySelector(
        `[data-package-city="${orderId}"]`
      ).value.trim();

    const estimatedDelivery =
      document.querySelector(
        `[data-delivery-date="${orderId}"]`
      ).value.trim();

    const deliveryDuration =
      document.querySelector(
        `[data-delivery-duration="${orderId}"]`
      ).value.trim();

    const trackingNumber =
      document.querySelector(
        `[data-tracking="${orderId}"]`
      ).value.trim();

    await updateDoc(
      doc(db,"orders",orderId),
      {
        status,
        packageCity,
        estimatedDelivery,
        deliveryDuration,
        trackingNumber
      }
    );

    showToast(
      "Commande mise à jour."
    );

    await renderAdminOrders();

  }catch(error){

    console.error(error);

    showToast(
      "Impossible de mettre à jour."
    );

  }

}

function renderAdminProducts(){

  const container =
    document.getElementById("adminContent");

  container.innerHTML = `

    <div style="
      margin-bottom:18px;
      color:#8c9aae;
      font-size:13px;
    ">
      ${products.length} produits actuellement
      affichés dans NovaShop.
    </div>

    ${products.map(product => `

      <div class="admin-product">

        <img
          data-nova-image
          src="${escapeHtml(product.image)}"
          alt="${escapeHtml(product.name)}"
          referrerpolicy="no-referrer"
        >

        <div style="flex:1">

          <strong style="
            display:block;
            font-size:13px;
          ">
            ${escapeHtml(product.name)}
          </strong>

          <span style="
            color:#7f8da1;
            font-size:12px;
          ">
            ${escapeHtml(product.category)}
            ·
            ${product.price > 0
              ? money(product.price)
              : "Prix indisponible"
            }
          </span>

        </div>

      </div>

    `).join("")}

  `;

  setupImageFallbacks(container);

}

async function getOrder(orderId){

  const snapshot =
    await getDoc(
      doc(db,"orders",orderId)
    );

  if(!snapshot.exists()){
    throw new Error("Commande introuvable");
  }

  return {
    id:snapshot.id,
    ...snapshot.data()
  };

}

function printInvoiceHtml(order){

  const items =
    (order.items || []).map(item => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${item.quantity}</td>
        <td>${money(item.price)}</td>
        <td>${money(item.price * item.quantity)}</td>
      </tr>
    `).join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Facture NovaShop</title>

<style>

body{
  font-family:Arial,sans-serif;
  margin:40px;
  color:#111;
}

h1{
  margin-bottom:5px;
}

.small{
  color:#666;
  font-size:13px;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:30px;
}

th,td{
  border:1px solid #ddd;
  padding:10px;
  text-align:left;
}

.total{
  margin-top:25px;
  text-align:right;
  font-size:22px;
  font-weight:bold;
}

.info{
  margin-top:25px;
  line-height:1.6;
}

</style>
</head>

<body>

<h1>NOVASHOP</h1>

<div class="small">
Facture / commande #${escapeHtml(order.id)}
</div>

<div class="small">
${formatDate(order.createdAt)}
</div>

<div class="info">

<strong>Client</strong><br>

${escapeHtml(
  order.address?.fullName || ""
)}<br>

${escapeHtml(
  order.address?.address || ""
)}<br>

${escapeHtml(
  order.address?.postalCode || ""
)}
${escapeHtml(
  order.address?.city || ""
)}<br>

${escapeHtml(
  order.email || ""
)}

</div>

<table>

<thead>
<tr>
<th>Produit</th>
<th>Qté</th>
<th>Prix</th>
<th>Total</th>
</tr>
</thead>

<tbody>

${items}

</tbody>

</table>

<div class="total">
Total : ${money(order.total)}
</div>

<div class="info">

<strong>Paiement :</strong>
${escapeHtml(order.paymentMethod || "")}

<br>

<strong>Statut :</strong>
${escapeHtml(
  statusLabels[order.status] ||
  order.status ||
  ""
)}

</div>

</body>
</html>
  `;

}

async function printInvoice(orderId){

  try{

    const order =
      await getOrder(orderId);

    const win =
      window.open(
        "",
        "_blank"
      );

    if(!win){

      showToast(
        "Autorise les fenêtres popup pour imprimer."
      );

      return;

    }

    win.document.write(
      printInvoiceHtml(order)
    );

    win.document.close();

    win.focus();

    setTimeout(() => {
      win.print();
    },300);

  }catch(error){

    console.error(error);

    showToast(
      "Impossible d'imprimer la facture."
    );

  }

}

async function printAdminInvoice(orderId){

  await printInvoice(orderId);

}

function showSettings(){

  openModal(
    "Paramètres",
    `

      <div class="form-group">
        <label>Thème</label>

        <select id="themeSelect">

          <option value="dark">
            Sombre
          </option>

          <option value="light">
            Clair
          </option>

          <option value="auto">
            Automatique
          </option>

        </select>

      </div>

      <div class="form-group">
        <label>Langue</label>

        <select id="languageSelect">

          <option value="fr">
            Français
          </option>

          <option value="en">
            English
          </option>

        </select>

      </div>

      <div class="form-group">

        <label>
          Animations
        </label>

        <select id="animationSelect">

          <option value="on">
            Activées
          </option>

          <option value="off">
            Désactivées
          </option>

        </select>

      </div>

      <button
        class="full-btn"
        id="saveSettings"
      >
        Enregistrer
      </button>

    `
  );

  document.getElementById("themeSelect").value =
    localStorage.getItem("novaTheme") || "dark";

  document.getElementById("languageSelect").value =
    localStorage.getItem("novaLanguage") || "fr";

  document.getElementById("animationSelect").value =
    localStorage.getItem("novaAnimations") || "on";

  document.getElementById("saveSettings")
    .addEventListener("click", () => {

      localStorage.setItem(
        "novaTheme",
        document.getElementById("themeSelect").value
      );

      localStorage.setItem(
        "novaLanguage",
        document.getElementById("languageSelect").value
      );

      localStorage.setItem(
        "novaAnimations",
        document.getElementById("animationSelect").value
      );

      applySettings();

      closeModal();

      showToast(
        "Paramètres enregistrés."
      );

    });

}

function applySettings(){

  const theme =
    localStorage.getItem("novaTheme") ||
    "dark";

  const animations =
    localStorage.getItem("novaAnimations") ||
    "on";

  if(theme === "light"){

    document.documentElement.style.setProperty(
      "--bg",
      "#f2f5f9"
    );

    document.documentElement.style.setProperty(
      "--panel",
      "#ffffff"
    );

    document.documentElement.style.setProperty(
      "--panel2",
      "#eef2f7"
    );

    document.documentElement.style.setProperty(
      "--border",
      "#dbe2ea"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#101722"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#637084"
    );

  }else{

    document.documentElement.style.setProperty(
      "--bg",
      "#050914"
    );

    document.documentElement.style.setProperty(
      "--panel",
      "#0a1220"
    );

    document.documentElement.style.setProperty(
      "--panel2",
      "#0e1929"
    );

    document.documentElement.style.setProperty(
      "--border",
      "#1b2a40"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#f5f8ff"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#8d9bb0"
    );

  }

  if(animations === "off"){

    document.documentElement.style.setProperty(
      "scroll-behavior",
      "auto"
    );

  }else{

    document.documentElement.style.setProperty(
      "scroll-behavior",
      "smooth"
    );

  }

}

document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );

document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );

document
  .getElementById("cartOverlay")
  .addEventListener(
    "click",
    closeCart
  );

document
  .getElementById("closeModal")
  .addEventListener(
    "click",
    closeModal
  );

document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    openCheckout
  );

document
  .getElementById("accountBtn")
  .addEventListener(
    "click",
    showAccount
  );

document
  .getElementById("ordersBtn")
  .addEventListener(
    "click",
    showOrders
  );

document
  .getElementById("settingsBtn")
  .addEventListener(
    "click",
    showSettings
  );

document
  .getElementById("adminBtn")
  .addEventListener(
    "click",
    openAdmin
  );

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    renderProducts
  );

document
  .getElementById("sortSelect")
  .addEventListener(
    "change",
    renderProducts
  );

document
  .getElementById("modal")
  .addEventListener(
    "click",
    event => {

      if(
        event.target.id === "modal"
      ){
        closeModal();
      }

    }
  );

onAuthStateChanged(
  auth,
  user => {

    currentUser = user;

    const connectedEmail =
      user?.email
        ?.trim()
        .toLowerCase() || "";

    const adminEmail =
      ADMIN_EMAIL
        .trim()
        .toLowerCase();

    const adminBtn =
      document.getElementById(
        "adminBtn"
      );

    /*
      IMPORTANT :
      Le bouton OWNER apparaît dès que
      le compte connecté possède l'adresse
      admin exacte.
    */

    if(
      connectedEmail === adminEmail
    ){

      adminBtn.style.display =
        "grid";

      adminBtn.title =
        "Administration OWNER";

      console.log(
        "👑 NovaShop Admin détecté :",
        user.email
      );

    }else{

      adminBtn.style.display =
        "none";

      localStorage.removeItem(
        ADMIN_ACCESS_KEY
      );

    }

  }
);

window.addEventListener(
  "storage",
  () => {

    cart =
      JSON.parse(
        localStorage.getItem(
          "novaCart"
        ) || "[]"
      );

    renderCart();

  }
);

applySettings();
renderCategories();
renderProducts();
renderCart();

console.log(
  "NovaShop chargé :",
  products.length,
  "produits"
);
