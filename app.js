import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


/* =========================================================
   FIREBASE
========================================================= */

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


/* =========================================================
   CONSTANTES
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";

const ADMIN_CODE = "NOVA-ADMIN-2026";

const CART_KEY = "novashop_cart";

const SETTINGS_KEY = "novashop_settings";


/* =========================================================
   PROMOTIONS
========================================================= */

const promos = {
  NOVA100: 100,
  NOVA20: 20,
  NOVA10: 10
};


/* =========================================================
   PRODUITS
========================================================= */

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


/* =========================================================
   NOMS POUR LES AVIS
========================================================= */

const firstNames = [

  "Lucas",
  "Hugo",
  "Noah",
  "Léo",
  "Nathan",
  "Tom",
  "Enzo",
  "Louis",
  "Gabriel",
  "Jules",
  "Mathis",
  "Ethan",
  "Théo",
  "Maxime",
  "Alex",
  "Antoine",
  "Arthur",
  "Raphaël",
  "Adam",
  "Paul",
  "Simon",
  "Rayan",
  "Thomas",
  "Martin",
  "Sacha",
  "Liam",
  "Nolan",
  "Evan",
  "Axel",
  "Mattéo",
  "Kylian",
  "Victor",
  "Milan",
  "Oscar",
  "Nino",
  "Gabin",
  "Robin",
  "Noé",
  "Eliott",
  "Valentin"

];


const lastNames = [

  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
  "Morel",
  "Girard",
  "André",
  "Lemoine",
  "Faure",
  "Mercier",
  "Blanc",
  "Guerin",
  "Boyer",
  "Garnier"

];


/* =========================================================
   TEXTES D'AVIS
========================================================= */

const reviewTexts = {

  5: [

    "Très bon produit, fonctionne parfaitement.",
    "Bonne qualité et livraison rapide.",
    "Produit conforme à la description.",
    "Très satisfait de mon achat.",
    "Installation simple et résultat excellent.",
    "La qualité est vraiment au rendez-vous.",
    "Correspond parfaitement à mes attentes.",
    "Rien à signaler, tout fonctionne correctement.",
    "Très bonne expérience avec ce produit.",
    "Je recommande pour une configuration gaming.",
    "Excellent produit.",
    "Très bonne surprise.",
    "Produit de très bonne qualité.",
    "Tout fonctionne parfaitement.",
    "Très satisfait.",
    "Rapport qualité prix intéressant.",
    "Installation rapide et simple.",
    "Produit exactement comme prévu."

  ],

  4: [

    "Très bon produit, quelques petits détails pourraient être améliorés.",
    "Bonne qualité générale.",
    "Produit efficace et conforme.",
    "Très satisfait malgré quelques petits points.",
    "Bonne expérience dans l'ensemble.",
    "Le produit fait parfaitement son travail.",
    "Qualité correcte et utilisation agréable.",
    "Bon produit.",
    "Très bonne qualité.",
    "Fonctionne très bien.",
    "Je suis satisfait.",
    "Bonne expérience globale."

  ],

  3: [

    "Produit correct pour son prix.",
    "Fonctionne correctement.",
    "Bonne expérience mais quelques améliorations seraient possibles.",
    "Produit satisfaisant dans l'ensemble.",
    "Rien d'exceptionnel mais ça fonctionne.",
    "Correct dans l'ensemble.",
    "Produit convenable.",
    "Ça fait le travail.",
    "Expérience moyenne mais correcte."

  ],

  2: [

    "Le produit fonctionne mais certains points sont à améliorer.",
    "Qualité moyenne.",
    "Quelques défauts rencontrés.",
    "Pas totalement convaincu.",
    "Il y a quelques points à revoir.",
    "Fonctionne mais peut mieux faire."

  ],

  1: [

    "Produit qui ne correspond pas totalement à mes attentes.",
    "Quelques problèmes rencontrés.",
    "Expérience décevante.",
    "Je rencontre plusieurs problèmes.",
    "Pas vraiment satisfait.",
    "Produit à améliorer."

  ]

};


/* =========================================================
   OUTILS ALÉATOIRES
========================================================= */

function randomItem(array){

  return array[
    Math.floor(
      Math.random()*array.length
    )
  ];

}


function randomInt(min,max){

  return Math.floor(
    Math.random()*(max-min+1)
  )+min;

}


/* =========================================================
   GÉNÉRATION AVIS
   ENTRE 850 ET 950 PAR PRODUIT
========================================================= */

function generateReviews(product){

  const reviews = [];

  /*
    Chaque produit possède son propre nombre aléatoire.
    Exemple :
    871
    924
    893
    947
    etc.
  */

  const reviewCount =
    randomInt(850,950);


  for(
    let i=0;
    i<reviewCount;
    i++
  ){

    const roll=Math.random();

    let rating;


    if(roll<0.72){

      rating=5;

    }

    else if(roll<0.90){

      rating=4;

    }

    else if(roll<0.97){

      rating=3;

    }

    else if(roll<0.99){

      rating=2;

    }

    else{

      rating=1;

    }


    const first =
      randomItem(firstNames);


    const last =
      randomItem(lastNames);


    const daysAgo =
      randomInt(0,720);


    const date =
      new Date(
        Date.now()-
        daysAgo*86400000
      );


    reviews.push({

      id:
        `${product.id}-review-${i+1}`,

      name:
        `${first} ${last.charAt(0)}.`,

      rating,

      text:
        randomItem(
          reviewTexts[rating]
        ),

      date

    });

  }


  return reviews;

}


/* =========================================================
   CACHE AVIS
========================================================= */

const reviewsCache = {};


function getReviews(product){

  if(
    !reviewsCache[product.id]
  ){

    reviewsCache[product.id] =
      generateReviews(product);

  }

  return reviewsCache[product.id];

}


/* =========================================================
   STATISTIQUES AVIS
========================================================= */

function getReviewStats(product){

  const reviews =
    getReviews(product);


  const total =
    reviews.reduce(
      (sum,review)=>
        sum+review.rating,
      0
    );


  return {

    count:
      reviews.length,

    average:
      total/reviews.length

  };

}


/* =========================================================
   ÉTOILES
========================================================= */

function stars(value){

  const rounded =
    Math.round(value);


  return (
    "★".repeat(rounded)+
    "☆".repeat(5-rounded)
  );

}


/* =========================================================
   ÉTAT DU SITE
========================================================= */

let currentUser = null;

let currentCategory = "Tous";

let currentSearch = "";

let currentSort = "default";

let cart =
  JSON.parse(
    localStorage.getItem(
      CART_KEY
    ) || "[]"
  );

let appliedPromo = null;

let unsubscribeOrders = null;

let unsubscribeAdminOrders = null;

let adminOrdersData = [];


/* =========================================================
   DOM
========================================================= */

const $ = id =>
  document.getElementById(id);


/* =========================================================
   TOAST
========================================================= */

function showToast(message){

  const toast =
    $("toast");

  if(!toast){

    alert(message);

    return;

  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  setTimeout(()=>{

    toast.classList.remove(
      "show"
    );

  },3000);

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id){

  const modal =
    $(id);

  if(!modal)
    return;


  modal.classList.remove(
    "hidden"
  );


  const overlay =
    $("overlay");

  if(overlay){

    overlay.classList.remove(
      "hidden"
    );

  }

}


function closeModal(id){

  const modal =
    $(id);

  if(modal){

    modal.classList.add(
      "hidden"
    );

  }


  const modals =
    document.querySelectorAll(
      ".modal"
    );


  const stillOpen =
    [...modals].some(
      modal=>
        !modal.classList.contains(
          "hidden"
        )
    );


  if(!stillOpen){

    const overlay =
      $("overlay");

    if(overlay){

      overlay.classList.add(
        "hidden"
      );

    }

  }

}


function closeAllModals(){

  document.querySelectorAll(
    ".modal"
  ).forEach(modal=>{

    modal.classList.add(
      "hidden"
    );

  });


  const overlay =
    $("overlay");

  if(overlay){

    overlay.classList.add(
      "hidden"
    );

  }

}


/* =========================================================
   HTML SAFE
========================================================= */

function escapeHtml(value){

  return String(
    value ?? ""
  )

  .replaceAll(
    "&",
    "&amp;"
  )

  .replaceAll(
    "<",
    "&lt;"
  )

  .replaceAll(
    ">",
    "&gt;"
  )

  .replaceAll(
    '"',
    "&quot;"
  )

  .replaceAll(
    "'",
    "&#039;"
  );

}


/* =========================================================
   PRIX
========================================================= */

function money(value){

  return new Intl.NumberFormat(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  ).format(value);

}


/* =========================================================
   PRODUITS FILTRÉS
========================================================= */

function getFilteredProducts(){

  let list =
    [...products];


  if(
    currentCategory!=="Tous"
  ){

    list =
      list.filter(
        product=>
          product.category===
          currentCategory
      );

  }


  if(
    currentSearch.trim()
  ){

    const search =
      currentSearch
        .trim()
        .toLowerCase();


    list =
      list.filter(
        product=>

          product.name
            .toLowerCase()
            .includes(search)

          ||

          product.category
            .toLowerCase()
            .includes(search)
      );

  }


  if(
    currentSort==="priceAsc"
  ){

    list.sort(
      (a,b)=>
        a.price-b.price
    );

  }


  if(
    currentSort==="priceDesc"
  ){

    list.sort(
      (a,b)=>
        b.price-a.price
    );

  }


  if(
    currentSort==="rating"
  ){

    list.sort(
      (a,b)=>
        getReviewStats(b).average-
        getReviewStats(a).average
    );

  }


  return list;

}


/* =========================================================
   CARTES PRODUITS
========================================================= */

function renderProducts(){

  const grid =
    $("productsGrid");

  if(!grid)
    return;


  const list =
    getFilteredProducts();


  const results =
    $("resultsCount");


  if(results){

    results.textContent =
      `${list.length} produit${list.length>1?"s":""}`;

  }


  const empty =
    $("emptyState");


  if(!list.length){

    grid.innerHTML = "";

    if(empty)
      empty.classList.remove(
        "hidden"
      );

    return;

  }


  if(empty)
    empty.classList.add(
      "hidden"
    );


  grid.innerHTML =
    list.map(product=>{

      const stats =
        getReviewStats(product);


      return `

        <article
          class="product-card"
        >

          <img
            class="product-image"
            src="${product.image}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
          >


          <div
            class="product-info"
          >

            <div
              class="product-category"
            >
              ${escapeHtml(
                product.category
              )}
            </div>


            <div
              class="product-name"
            >
              ${escapeHtml(
                product.name
              )}
            </div>


            <!-- AVIS DIRECTEMENT VISIBLES -->

            <div
              style="
                display:flex;
                align-items:center;
                gap:7px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <span
                style="
                  color:#ffd166;
                  font-size:17px;
                  letter-spacing:1px;
                "
              >
                ${stars(
                  stats.average
                )}
              </span>


              <strong
                style="
                  color:#ffffff;
                  font-size:14px;
                "
              >
                ${stats.average.toFixed(1)}/5
              </strong>


              <span
                style="
                  color:#9ba8bd;
                  font-size:12px;
                "
              >
                (${stats.count} avis)
              </span>

            </div>


            <div
              style="
                color:#71809a;
                font-size:11px;
                margin-top:3px;
              "
            >
              ${stats.count.toLocaleString("fr-FR")}
              avis
            </div>


            <div
              class="price"
            >
              ${money(
                product.price
              )}
            </div>


            <div
              class="product-buttons"
            >

              <button
                class="btn"
                data-view="${product.id}"
              >
                💬 Voir les avis
              </button>


              <button
                class="btn primary"
                data-add="${product.id}"
              >
                🛒
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");


  /* BOUTONS VOIR */

  document.querySelectorAll(
    "[data-view]"
  ).forEach(button=>{

    button.onclick=()=>{

      openProduct(
        button.dataset.view
      );

    };

  });


  /* BOUTONS PANIER */

  document.querySelectorAll(
    "[data-add]"
  ).forEach(button=>{

    button.onclick=()=>{

      addToCart(
        button.dataset.add
      );

    };

  });

}


/* =========================================================
   FICHE PRODUIT
========================================================= */

function openProduct(productId){

  const product =
    products.find(
      product=>
        product.id===productId
    );


  if(!product)
    return;


  const stats =
    getReviewStats(product);


  const reviews =
    getReviews(product);


  const visibleReviews =
    [...reviews]
      .sort(
        (a,b)=>
          b.date-a.date
      )
      .slice(0,50);


  const content =
    $("productContent");


  if(!content)
    return;


  content.innerHTML = `

    <div
      class="product-detail"
    >

      <img
        class="product-detail-image"
        src="${product.image}"
        alt=""
      >


      <div>

        <div
          class="product-category"
        >
          ${escapeHtml(
            product.category
          )}
        </div>


        <h1
          style="
            margin:8px 0 12px;
          "
        >
          ${escapeHtml(
            product.name
          )}
        </h1>


        <div
          class="rating"
          style="
            font-size:20px;
          "
        >
          ${stars(
            stats.average
          )}
        </div>


        <div
          class="review-count"
        >
          ${stats.average.toFixed(2)}/5
          · ${stats.count.toLocaleString("fr-FR")}
          avis
        </div>


        <div
          class="price"
        >
          ${money(
            product.price
          )}
        </div>


        <button
          id="detailAdd"
          class="btn primary"
          style="
            width:100%;
          "
        >
          🛒 Ajouter au panier
        </button>

      </div>

    </div>


    <div
      class="review-summary"
    >

      <div
        class="big-rating"
      >
        ${stats.average.toFixed(1)}
      </div>


      <div>

        <div
          class="rating"
          style="
            font-size:20px;
          "
        >
          ${stars(
            stats.average
          )}
        </div>


        <div
          class="review-count"
        >
          ${stats.count.toLocaleString("fr-FR")}
          avis
        </div>

      </div>

    </div>


    <h3>
      Avis
      (${stats.count.toLocaleString("fr-FR")})
    </h3>


    <div
      class="reviews-list"
    >

      ${visibleReviews.map(
        review=>`

          <div
            class="review"
          >

            <div
              class="review-head"
            >

              <strong>
                ${escapeHtml(
                  review.name
                )}
              </strong>


              <span
                class="rating"
              >
                ${stars(
                  review.rating
                )}
              </span>

            </div>


            <div>
              ${escapeHtml(
                review.text
              )}
            </div>


            <div
              class="review-date"
            >
              ${review.date.toLocaleDateString(
                "fr-FR"
              )}
            </div>

          </div>

        `
      ).join("")}

    </div>

  `;


  const add =
    $("detailAdd");


  if(add){

    add.onclick=()=>{

      addToCart(
        product.id
      );

    };

  }


  openModal(
    "productModal"
  );

}


/* =========================================================
   PANIER
========================================================= */

function saveCart(){

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );


  updateCartCount();

}


function updateCartCount(){

  const count =
    cart.reduce(
      (sum,item)=>
        sum+item.quantity,
      0
    );


  const element =
    $("cartCount");


  if(element){

    element.textContent =
      count;

  }

}


function addToCart(productId){

  const existing =
    cart.find(
      item=>
        item.productId===
        productId
    );


  if(existing){

    existing.quantity++;

  }

  else{

    cart.push({

      productId,

      quantity:1

    });

  }


  saveCart();


  showToast(
    "Produit ajouté au panier 🛒"
  );

}


function removeFromCart(productId){

  cart =
    cart.filter(
      item=>
        item.productId!==
        productId
    );


  saveCart();


  renderCart();

}


function changeQuantity(
  productId,
  delta
){

  const item =
    cart.find(
      item=>
        item.productId===
        productId
    );


  if(!item)
    return;


  item.quantity +=
    delta;


  if(item.quantity<=0){

    removeFromCart(
      productId
    );

    return;

  }


  saveCart();


  renderCart();

}


function getCartItems(){

  return cart

    .map(item=>{

      const product =
        products.find(
          p=>
            p.id===
            item.productId
        );


      if(!product)
        return null;


      return {

        ...product,

        quantity:
          item.quantity

      };

    })

    .filter(Boolean);

}


function cartSubtotal(){

  return getCartItems()
    .reduce(
      (sum,item)=>
        sum+
        item.price*
        item.quantity,
      0
    );

}


/* =========================================================
   AFFICHAGE PANIER
========================================================= */

function renderCart(){

  const content =
    $("cartContent");


  if(!content)
    return;


  const items =
    getCartItems();


  if(!items.length){

    content.innerHTML = `

      <div
        class="empty"
      >
        Ton panier est vide 🛒
      </div>

    `;


    if($("cartTotal")){

      $("cartTotal")
        .textContent =
        money(0);

    }


    return;

  }


  content.innerHTML =
    items.map(item=>`

      <div
        class="cart-item"
      >

        <img
          src="${item.image}"
          alt=""
        >


        <div
          class="cart-item-main"
        >

          <strong>
            ${escapeHtml(
              item.name
            )}
          </strong>


          <div
            class="review-count"
          >
            ${money(
              item.price
            )}
          </div>


          <div
            class="qty"
          >

            <button
              data-minus="${item.id}"
            >
              −
            </button>


            <span>
              ${item.quantity}
            </span>


            <button
              data-plus="${item.id}"
            >
              +
            </button>


            <button
              data-remove="${item.id}"
              style="
                margin-left:8px;
              "
            >
              🗑️
            </button>

          </div>

        </div>

      </div>

    `).join("");


  if($("cartTotal")){

    $("cartTotal")
      .textContent =
      money(
        cartSubtotal()
      );

  }


  document.querySelectorAll(
    "[data-minus]"
  ).forEach(button=>{

    button.onclick=()=>{

      changeQuantity(
        button.dataset.minus,
        -1
      );

    };

  });


  document.querySelectorAll(
    "[data-plus]"
  ).forEach(button=>{

    button.onclick=()=>{

      changeQuantity(
        button.dataset.plus,
        1
      );

    };

  });


  document.querySelectorAll(
    "[data-remove]"
  ).forEach(button=>{

    button.onclick=()=>{

      removeFromCart(
        button.dataset.remove
      );

    };

  });

}


/* =========================================================
   MOT DE PASSE
========================================================= */

function validatePassword(
  password
){

  if(password.length<6)
    return "Minimum 6 caractères.";

  if(password.length>30)
    return "Maximum 30 caractères.";

  if(!/[a-z]/.test(password))
    return "Il faut une minuscule.";

  if(!/[A-Z]/.test(password))
    return "Il faut une majuscule.";

  if(!/[0-9]/.test(password))
    return "Il faut un chiffre.";

  return null;

}


/* =========================================================
   CONNEXION
========================================================= */

async function login(
  email,
  password
){

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );


    showToast(
      "Connexion réussie ✅"
    );


    closeAllModals();

  }

  catch(error){

    console.error(
      error
    );


    showToast(
      "Email ou mot de passe incorrect."
    );

  }

}


/* =========================================================
   INSCRIPTION
========================================================= */

async function signup(){

  const email =
    $("signupEmail")
      ?.value
      .trim();


  const phone =
    $("signupPhone")
      ?.value
      .trim();


  const password =
    $("signupPassword")
      ?.value;


  const confirm =
    $("signupConfirm")
      ?.value;


  const validation =
    validatePassword(
      password
    );


  if(validation){

    showToast(
      validation
    );

    return;

  }


  if(
    password!==confirm
  ){

    showToast(
      "Les mots de passe ne correspondent pas."
    );

    return;

  }


  try{

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    await setDoc(
      doc(
        db,
        "users",
        result.user.uid
      ),
      {

        email,

        phone,

        createdAt:
          Date.now()

      },

      {
        merge:true
      }

    );


    showToast(
      "Compte créé ✅"
    );


    closeAllModals();

  }

  catch(error){

    console.error(
      error
    );


    showToast(
      "Impossible de créer le compte."
    );

  }

}


/* =========================================================
   GOOGLE
========================================================= */

async function googleLogin(){

  try{

    const provider =
      new GoogleAuthProvider();


    const result =
      await signInWithPopup(
        auth,
        provider
      );


    await setDoc(
      doc(
        db,
        "users",
        result.user.uid
      ),
      {

        email:
          result.user.email,

        displayName:
          result.user.displayName || "",

        createdAt:
          Date.now()

      },

      {
        merge:true
      }

    );


    showToast(
      "Connexion Google réussie ✅"
    );


    closeAllModals();

  }

  catch(error){

    console.error(
      error
    );


    showToast(
      "Connexion Google impossible."
    );

  }

}


/* =========================================================
   COMPTE
========================================================= */

function renderAccount(){

  const content =
    $("accountContent");


  if(!content)
    return;


  if(!currentUser){

    content.innerHTML = `

      <div
        class="account-box"
      >

        <div
          class="info-card"
        >
          Connecte-toi pour accéder à ton compte.
        </div>


        <button
          id="accountLogin"
          class="btn primary"
        >
          Se connecter
        </button>

      </div>

    `;


    const button =
      $("accountLogin");


    if(button){

      button.onclick=()=>{

        closeModal(
          "accountModal"
        );

        openModal(
          "authModal"
        );

      };

    }


    return;

  }


  content.innerHTML = `

    <div
      class="account-box"
    >

      <div
        class="info-card"
      >

        <strong>
          Email
        </strong>

        ${escapeHtml(
          currentUser.email || ""
        )}

      </div>


      <button
        id="accountOrders"
        class="btn"
      >
        📦 Mes commandes
      </button>


      <button
        id="logoutButton"
        class="btn red"
      >
        🚪 Se déconnecter
      </button>

    </div>

  `;


  $("accountOrders").onclick=()=>{

    closeModal(
      "accountModal"
    );

    openOrders();

  };


  $("logoutButton").onclick=
    async()=>{

      await signOut(
        auth
      );

      closeAllModals();

      showToast(
        "Déconnexion effectuée."
      );

    };

}


/* =========================================================
   TOTAL CHECKOUT
========================================================= */

function updateCheckoutTotals(){

  const subtotal =
    cartSubtotal();


  const discount =
    appliedPromo
      ? subtotal*
        (
          promos[appliedPromo]/
          100
        )
      : 0;


  const total =
    Math.max(
      0,
      subtotal-discount
    );


  if($("checkoutSubtotal")){

    $("checkoutSubtotal")
      .textContent =
      money(subtotal);

  }


  if($("checkoutDiscount")){

    $("checkoutDiscount")
      .textContent =
      "-"+money(discount);

  }


  if($("checkoutTotal")){

    $("checkoutTotal")
      .textContent =
      money(total);

  }


  return {

    subtotal,

    discount,

    total

  };

}


/* =========================================================
   VALIDATION ADRESSE
========================================================= */

async function validateFrenchAddress(){

  const address =
    $("address")
      ?.value
      .trim();


  const postal =
    $("postalCode")
      ?.value
      .trim();


  const city =
    $("city")
      ?.value
      .trim();


  if(
    !address ||
    !postal ||
    !city
  ){

    throw new Error(
      "Adresse incomplète."
    );

  }


  if(
    !/^\d{5}$/.test(
      postal
    )
  ){

    throw new Error(
      "Code postal invalide."
    );

  }


  const q =
    encodeURIComponent(
      `${address}, ${postal} ${city}, France`
    );


  const response =
    await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${q}&limit=5`
    );


  if(!response.ok){

    throw new Error(
      "Impossible de vérifier l'adresse."
    );

  }


  const data =
    await response.json();


  if(
    !data.features?.length
  ){

    throw new Error(
      "Adresse introuvable."
    );

  }


  const match =
    data.features.some(
      feature=>{

        const p =
          feature.properties ||
          {};


        return (

          String(
            p.postcode || ""
          ) === postal

          &&

          String(
            p.city || ""
          ).toLowerCase()
          ===
          city.toLowerCase()

        );

      }
    );


  if(!match){

    throw new Error(
      "La ville et le code postal ne correspondent pas."
    );

  }


  return true;

}


/* =========================================================
   CRÉATION COMMANDE
========================================================= */

async function createOrder(){

  if(!currentUser){

    closeModal(
      "checkoutModal"
    );

    openModal(
      "authModal"
    );

    showToast(
      "Connecte-toi avant de commander."
    );

    return;

  }


  const button =
    $("payButton");


  if(button){

    button.disabled=true;

    button.textContent=
      "Vérification...";

  }


  try{

    await validateFrenchAddress();


    const totals =
      updateCheckoutTotals();


    const orderId =
      "NS-"+Date.now()+"-"+
      Math.random()
        .toString(36)
        .slice(2,8)
        .toUpperCase();


    const order = {

      id:orderId,

      userId:
        currentUser.uid,

      email:
        currentUser.email || "",

      customer:{

        fullName:
          $("fullName")
            ?.value
            .trim() || "",

        country:
          $("country")
            ?.value || "",

        address:
          $("address")
            ?.value
            .trim() || "",

        postalCode:
          $("postalCode")
            ?.value
            .trim() || "",

        city:
          $("city")
            ?.value
            .trim() || ""

      },

      items:
        getCartItems()
          .map(item=>({

            productId:
              item.id,

            name:
              item.name,

            price:
              item.price,

            quantity:
              item.quantity

          })),

      subtotal:
        totals.subtotal,

      discount:
        totals.discount,

      total:
        totals.total,

      promoCode:
        appliedPromo || null,

      status:
        "Préparation",

      currentLocation:
        "Entrepôt NovaShop",

      destination:
        $("city")
          ?.value
          .trim() || "",

      tracking:
        "NS"+
        Math.random()
          .toString(36)
          .slice(2,12)
          .toUpperCase(),

      deliveryDate:
        Date.now()+
        randomInt(2,5)*
        86400000,

      createdAt:
        Date.now(),

      updatedAt:
        Date.now()

    };


    await setDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      order
    );


    cart=[];

    saveCart();


    appliedPromo=null;


    if($("checkoutForm")){

      $("checkoutForm")
        .reset();

    }


    closeModal(
      "checkoutModal"
    );


    showToast(
      "Commande enregistrée 📦"
    );


    openOrders();

  }

  catch(error){

    console.error(
      error
    );


    showToast(
      error.message ||
      "Erreur de commande."
    );

  }

  finally{

    if(button){

      button.disabled=false;

      button.textContent=
        "💳 Payer";

    }

  }

}


/* =========================================================
   COMMANDES
========================================================= */

function openOrders(){

  if(!currentUser){

    openModal(
      "authModal"
    );

    showToast(
      "Connecte-toi pour voir tes commandes."
    );

    return;

  }


  openModal(
    "ordersModal"
  );


  if(unsubscribeOrders){

    unsubscribeOrders();

  }


  const q =
    query(
      collection(
        db,
        "orders"
      ),

      where(
        "userId",
        "==",
        currentUser.uid
      )
    );


  unsubscribeOrders =
    onSnapshot(
      q,
      snapshot=>{

        const orders =
          snapshot.docs
            .map(
              item=>
                item.data()
            )
            .sort(
              (a,b)=>
                (b.createdAt||0)-
                (a.createdAt||0)
            );


        renderOrders(
          orders
        );

      }
    );

}


/* =========================================================
   AFFICHAGE COMMANDES
========================================================= */

function renderOrders(
  orders
){

  const content =
    $("ordersContent");


  if(!content)
    return;


  if(!orders.length){

    content.innerHTML = `

      <div
        class="empty"
      >
        Aucune commande.
      </div>

    `;

    return;

  }


  content.innerHTML =
    orders.map(
      order=>{

        const date =
          order.deliveryDate
            ? new Date(
                order.deliveryDate
              )
            : null;


        return `

          <div
            class="order-card"
          >

            <div
              class="order-top"
            >

              <strong>
                ${escapeHtml(
                  order.id
                )}
              </strong>


              <span
                class="status"
              >
                ${escapeHtml(
                  order.status ||
                  "En cours"
                )}
              </span>

            </div>


            <br>


            📍 Position :

            <strong>
              ${escapeHtml(
                order.currentLocation ||
                ""
              )}
            </strong>


            <br>


            🎯 Destination :

            <strong>
              ${escapeHtml(
                order.destination ||
                ""
              )}
            </strong>


            <br>


            🚚 Suivi :

            <strong>
              ${escapeHtml(
                order.tracking ||
                ""
              )}
            </strong>


            <br>


            📅 Livraison :

            <strong>

              ${
                date
                  ? date.toLocaleDateString(
                      "fr-FR"
                    )
                  : "À définir"
              }

            </strong>


            <br><br>


            💰 Total :

            <strong>
              ${money(
                order.total || 0
              )}
            </strong>

          </div>

        `;

      }
    ).join("");

}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

  return (

    currentUser &&

    currentUser.email ===
      ADMIN_EMAIL

  );

}


async function openAdmin(){

  if(!isAdmin()){

    showToast(
      "Accès administrateur uniquement."
    );

    return;

  }


  const code =
    prompt(
      "Code d'accès Dashboard :"
    );


  if(
    code !==
    ADMIN_CODE
  ){

    showToast(
      "Code incorrect ❌"
    );

    return;

  }


  openModal(
    "dashboardModal"
  );


  if(
    unsubscribeAdminOrders
  ){

    unsubscribeAdminOrders();

  }


  unsubscribeAdminOrders =
    onSnapshot(
      collection(
        db,
        "orders"
      ),

      snapshot=>{

        adminOrdersData =
          snapshot.docs
            .map(
              item=>
                item.data()
            )
            .sort(
              (a,b)=>
                (b.createdAt||0)-
                (a.createdAt||0)
            );


        renderAdminDashboard();

      }
    );


  renderAdminPromos();

}


/* =========================================================
   DASHBOARD ADMIN
========================================================= */

function renderAdminDashboard(){

  if($("statOrders")){

    $("statOrders")
      .textContent =
      adminOrdersData.length;

  }


  if($("statFree")){

    $("statFree")
      .textContent =
      adminOrdersData.filter(
        order=>
          Number(
            order.total || 0
          ) === 0
      ).length;

  }


  if($("statCatalog")){

    $("statCatalog")
      .textContent =
      products.length;

  }


  const container =
    $("adminOrders");


  if(!container)
    return;


  container.innerHTML =
    adminOrdersData.map(
      order=>`

        <div
          class="admin-order"
        >

          <strong>
            ${escapeHtml(
              order.id
            )}
          </strong>


          <div>
            ${escapeHtml(
              order.email || ""
            )}
          </div>


          <br>


          <div
            class="admin-fields"
          >

            <select
              data-status="${order.id}"
            >

              <option
                ${
                  order.status===
                  "Préparation"
                    ? "selected"
                    : ""
                }
              >
                Préparation
              </option>


              <option
                ${
                  order.status===
                  "Expédiée"
                    ? "selected"
                    : ""
                }
              >
                Expédiée
              </option>


              <option
                ${
                  order.status===
                  "En transit"
                    ? "selected"
                    : ""
                }
              >
                En transit
              </option>


              <option
                ${
                  order.status===
                  "Livrée"
                    ? "selected"
                    : ""
                }
              >
                Livrée
              </option>

            </select>


            <input
              data-location="${order.id}"
              value="${escapeHtml(
                order.currentLocation || ""
              )}"
              placeholder="Position"
            >


            <input
              data-destination="${order.id}"
              value="${escapeHtml(
                order.destination || ""
              )}"
              placeholder="Destination"
            >


            <input
              type="date"
              data-date="${order.id}"
            >

          </div>


          <br>


          <button
            class="btn primary"
            data-save-order="${order.id}"
          >
            💾 Enregistrer
          </button>

        </div>

      `
    ).join("");


  document.querySelectorAll(
    "[data-save-order]"
  ).forEach(button=>{

    button.onclick =
      async()=>{

        const id =
          button.dataset.saveOrder;


        const status =
          document.querySelector(
            `[data-status="${CSS.escape(id)}"]`
          )?.value;


        const location =
          document.querySelector(
            `[data-location="${CSS.escape(id)}"]`
          )?.value;


        const destination =
          document.querySelector(
            `[data-destination="${CSS.escape(id)}"]`
          )?.value;


        const date =
          document.querySelector(
            `[data-date="${CSS.escape(id)}"]`
          )?.value;


        const updates = {

          status,

          currentLocation:
            location,

          destination,

          updatedAt:
            Date.now()

        };


        if(date){

          updates.deliveryDate =
            new Date(
              date+"T12:00:00"
            ).getTime();

        }


        try{

          await updateDoc(
            doc(
              db,
              "orders",
              id
            ),
            updates
          );


          showToast(
            "Commande mise à jour ✅"
          );

        }

        catch(error){

          console.error(
            error
          );


          showToast(
            "Erreur de mise à jour."
          );

        }

      };

  });

}


/* =========================================================
   PROMOS ADMIN
========================================================= */

function renderAdminPromos(){

  const container =
    $("adminPromos");


  if(!container)
    return;


  container.innerHTML =
    Object.entries(
      promos
    ).map(
      ([code,value])=>`

        <div
          class="info-card"
          style="
            margin-bottom:8px;
          "
        >

          <strong>
            ${code}
          </strong>

          ${value}%
          de réduction

        </div>

      `
    ).join("");

}


/* =========================================================
   FERMETURE MODALS
========================================================= */

document.querySelectorAll(
  "[data-close]"
).forEach(button=>{

  button.onclick=()=>{

    closeModal(
      button.dataset.close
    );

  };

});


if($("overlay")){

  $("overlay").onclick =
    closeAllModals;

}


/* =========================================================
   TABS AUTH
========================================================= */

if($("loginTab")){

  $("loginTab").onclick=()=>{

    $("loginTab")
      .classList
      .add("active");


    $("signupTab")
      ?.classList
      .remove("active");


    $("loginForm")
      ?.classList
      .remove("hidden");


    $("signupForm")
      ?.classList
      .add("hidden");

  };

}


if($("signupTab")){

  $("signupTab").onclick=()=>{

    $("signupTab")
      .classList
      .add("active");


    $("loginTab")
      ?.classList
      .remove("active");


    $("signupForm")
      ?.classList
      .remove("hidden");


    $("loginForm")
      ?.classList
      .add("hidden");

  };

}


/* =========================================================
   FORM LOGIN
========================================================= */

if($("loginForm")){

  $("loginForm").onsubmit =
    async event=>{

      event.preventDefault();


      await login(

        $("loginEmail")
          .value
          .trim(),

        $("loginPassword")
          .value

      );

    };

}


/* =========================================================
   FORM INSCRIPTION
========================================================= */

if($("signupForm")){

  $("signupForm").onsubmit =
    async event=>{

      event.preventDefault();


      await signup();

    };

}


/* =========================================================
   GOOGLE
========================================================= */

if($("googleButton")){

  $("googleButton").onclick =
    googleLogin;

}


if($("googleSignupButton")){

  $("googleSignupButton").onclick =
    googleLogin;

}


/* =========================================================
   COMPTE
========================================================= */

if($("accountButton")){

  $("accountButton").onclick=()=>{

    renderAccount();

    openModal(
      "accountModal"
    );

  };

}


/* =========================================================
   COMMANDES
========================================================= */

if($("ordersButton")){

  $("ordersButton").onclick =
    openOrders;

}


if($("heroOrders")){

  $("heroOrders").onclick =
    openOrders;

}


/* =========================================================
   ADMIN
========================================================= */

if($("adminButton")){

  $("adminButton").onclick =
    openAdmin;

}


/* =========================================================
   PANIER
========================================================= */

if($("cartButton")){

  $("cartButton").onclick=()=>{

    renderCart();

    openModal(
      "cartModal"
    );

  };

}


/* =========================================================
   CHECKOUT
========================================================= */

if($("checkoutButton")){

  $("checkoutButton").onclick=()=>{

    if(
      !getCartItems().length
    ){

      showToast(
        "Ton panier est vide."
      );

      return;

    }


    if(!currentUser){

      closeModal(
        "cartModal"
      );

      openModal(
        "authModal"
      );


      showToast(
        "Connecte-toi avant de commander."
      );


      return;

    }


    updateCheckoutTotals();


    openModal(
      "checkoutModal"
    );

  };

}


if($("checkoutForm")){

  $("checkoutForm").onsubmit =
    async event=>{

      event.preventDefault();

      await createOrder();

    };

}


/* =========================================================
   PROMO
========================================================= */

if($("applyPromo")){

  $("applyPromo").onclick=()=>{

    const code =
      $("promoCode")
        .value
        .trim()
        .toUpperCase();


    if(
      promos[code] !==
      undefined
    ){

      appliedPromo =
        code;


      if($("promoMessage")){

        $("promoMessage")
          .textContent =
          `${code} appliqué : ${promos[code]}%`;

      }


      updateCheckoutTotals();

    }

    else{

      appliedPromo =
        null;


      if($("promoMessage")){

        $("promoMessage")
          .textContent =
          "Code invalide.";

      }


      updateCheckoutTotals();

    }

  };

}


/* =========================================================
   RECHERCHE
========================================================= */

function search(){

  if(!$("searchInput"))
    return;


  currentSearch =
    $("searchInput")
      .value;


  renderProducts();

}


if($("searchButton")){

  $("searchButton")
    .onclick =
    search;

}


if($("searchInput")){

  $("searchInput")
    .addEventListener(
      "input",
      search
    );

}


/* =========================================================
   TRI
========================================================= */

if($("sortSelect")){

  $("sortSelect").onchange=()=>{

    currentSort =
      $("sortSelect")
        .value;


    renderProducts();

  };

}


/* =========================================================
   CATÉGORIES
========================================================= */

document.querySelectorAll(
  ".category-btn"
).forEach(button=>{

  button.onclick=()=>{

    document.querySelectorAll(
      ".category-btn"
    ).forEach(btn=>{

      btn.classList.remove(
        "active"
      );

    });


    button.classList.add(
      "active"
    );


    currentCategory =
      button.dataset.category;


    renderProducts();

  };

});


/* =========================================================
   HERO
========================================================= */

if($("heroProducts")){

  $("heroProducts").onclick=()=>{

    const section =
      document.querySelector(
        ".section"
      );


    if(section){

      section.scrollIntoView({
        behavior:"smooth"
      });

    }

  };

}


/* =========================================================
   SETTINGS
========================================================= */

if($("settingsButton")){

  $("settingsButton").onclick=()=>{

    openModal(
      "settingsModal"
    );

  };

}


const savedSettings =
  JSON.parse(
    localStorage.getItem(
      SETTINGS_KEY
    ) || "{}"
  );


if($("darkSwitch")){

  $("darkSwitch")
    .checked =
    savedSettings.dark !== false;

}


if($("soundSwitch")){

  $("soundSwitch")
    .checked =
    savedSettings.sound === true;

}


function saveSettings(){

  localStorage.setItem(
    SETTINGS_KEY,

    JSON.stringify({

      dark:
        $("darkSwitch")
          ?.checked,

      sound:
        $("soundSwitch")
          ?.checked

    })

  );

}


if($("darkSwitch")){

  $("darkSwitch")
    .onchange =
    saveSettings;

}


if($("soundSwitch")){

  $("soundSwitch")
    .onchange =
    saveSettings;

}


/* =========================================================
   FIREBASE AUTH
========================================================= */

onAuthStateChanged(
  auth,
  user=>{

    currentUser =
      user;


    if(
      user &&
      user.email ===
      ADMIN_EMAIL
    ){

      $("adminButton")
        ?.classList
        .remove(
          "hidden"
        );

    }

    else{

      $("adminButton")
        ?.classList
        .add(
          "hidden"
        );

    }


    renderAccount();

  }
);


/* =========================================================
   INITIALISATION
========================================================= */

updateCartCount();

renderProducts();


console.log(
  "NovaShop chargé."
);


console.log(
  "Avis aléatoires : 850 à 950 par produit."
);
