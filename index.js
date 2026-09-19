/* =========================================================
   NOVASHOP - PARTIE 2
   Recherche avancée + filtres + promos + avis + stock
   ========================================================= */

"use strict";

const NS_PRODUCTS = [
  {
    id:"gpu-003",
    category:"Cartes graphiques",
    brand:"AMD",
    name:"Radeon RX 7800 XT",
    price:499.99,
    rating:4.8,
    reviews:389,
    stock:6,
    image:"https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=90"
  },
  {
    id:"gpu-004",
    category:"Cartes graphiques",
    brand:"AMD",
    name:"Radeon RX 7900 GRE",
    price:649.99,
    rating:4.8,
    reviews:247,
    stock:4,
    image:"https://images.unsplash.com/photo-1592664474505-51c549ad15c5?auto=format&fit=crop&w=1000&q=90"
  },
  {
    id:"cpu-004",
    category:"Processeurs",
    brand:"AMD",
    name:"Ryzen 5 7600X",
    price:199.99,
    rating:4.8,
    reviews:512,
    stock:11,
    image:"https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=90"
  },
  {
    id:"cpu-005",
    category:"Processeurs",
    brand:"AMD",
    name:"Ryzen 9 7900X",
    price:399.99,
    rating:4.8,
    reviews:294,
    stock:5,
    image:"https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1000&q=90"
  },
  {
    id:"ram-003",
    category:"RAM",
    brand:"Corsair",
    name:"Vengeance RGB 32GB DDR5 6000 CL30",
    price:129.99,
    rating:4.9,
    reviews:312,
    stock:13,
    image:"https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg"
  },
  {
    id:"ssd-003",
    category:"SSD",
    brand:"Samsung",
    name:"990 EVO Plus 2TB",
    price:139.99,
    rating:4.8,
    reviews:274,
    stock:15,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9s2t0bw/gallery/fr-990-evo-plus-nvme-ssd-mz-v9s2t0bw-544438492?$650_519_PNG$"
  },
  {
    id:"case-003",
    category:"Boîtiers",
    brand:"Corsair",
    name:"4000D Airflow",
    price:99.99,
    rating:4.8,
    reviews:683,
    stock:14,
    image:"https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=1000&q=90"
  },
  {
    id:"cool-002",
    category:"Refroidissement",
    brand:"ARCTIC",
    name:"Liquid Freezer III 240",
    price:89.99,
    rating:4.8,
    reviews:201,
    stock:10,
    image:"https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png"
  },
  {
    id:"screen-002",
    category:"Écrans",
    brand:"Samsung",
    name:"Odyssey G6 27 Gaming",
    price:429.99,
    rating:4.8,
    reviews:218,
    stock:6,
    image:"https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$"
  },
  {
    id:"key-003",
    category:"Claviers",
    brand:"Logitech",
    name:"G PRO X TKL Lightspeed",
    price:179.99,
    rating:4.8,
    reviews:421,
    stock:8,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png"
  },
  {
    id:"mouse-003",
    category:"Souris",
    brand:"Logitech",
    name:"G PRO X SUPERLIGHT 2",
    price:129.99,
    rating:4.9,
    reviews:824,
    stock:12,
    image:"https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png"
  },
  {
    id:"mic-002",
    category:"Micros",
    brand:"Elgato",
    name:"Wave:3 USB",
    price:129.99,
    rating:4.8,
    reviews:471,
    stock:9,
    image:"https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png"
  },
  {
    id:"controller-002",
    category:"Manettes",
    brand:"Sony",
    name:"DualSense Wireless",
    price:69.99,
    rating:4.8,
    reviews:1290,
    stock:20,
    image:"https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$"
  }
];


/* =========================================================
   AJOUT DES PRODUITS
   ========================================================= */

if(typeof PRODUCTS !== "undefined"){

  NS_PRODUCTS.forEach(newProduct=>{

    const exists=PRODUCTS.some(
      p=>p.id===newProduct.id
    );

    if(!exists){
      PRODUCTS.push(newProduct);
    }

  });

}


/* =========================================================
   PROMOTIONS
   ========================================================= */

const NS_PROMOTIONS={
  "cpu-001":229.99,
  "ssd-002":149.99,
  "mouse-001":119.99,
  "controller-001":59.99,
  "case-001":129.99
};


function getNovaPrice(product){

  if(NS_PROMOTIONS[product.id]){
    return NS_PROMOTIONS[product.id];
  }

  return product.price;
}


function getOldPrice(product){

  if(NS_PROMOTIONS[product.id]){
    return product.price;
  }

  return null;
}


/* =========================================================
   RECHERCHE INTELLIGENTE
   ========================================================= */

function novaSearchProducts(query){

  const q=String(query || "")
    .trim()
    .toLowerCase();

  if(!q){

    return typeof PRODUCTS!=="undefined"
      ? [...PRODUCTS]
      : [];

  }

  const words=q.split(/\s+/);

  return PRODUCTS
    .map(product=>{

      let score=0;

      const name=product.name.toLowerCase();
      const brand=product.brand.toLowerCase();
      const category=product.category.toLowerCase();

      words.forEach(word=>{

        if(name.includes(word)) score+=10;
        if(brand.includes(word)) score+=7;
        if(category.includes(word)) score+=5;

      });

      return {
        product,
        score
      };

    })
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .map(x=>x.product);
}


/* =========================================================
   SUGGESTIONS DE RECHERCHE
   ========================================================= */

function novaSearchSuggestions(query){

  const results=novaSearchProducts(query)
    .slice(0,6);

  let box=document.getElementById(
    "novaSearchSuggestions"
  );

  if(!box){

    const search=document.querySelector(".search");

    if(!search) return;

    box=document.createElement("div");

    box.id="novaSearchSuggestions";

    box.style.cssText=`
      position:absolute;
      top:52px;
      left:0;
      right:0;
      background:#fff;
      border:1px solid #e5e7eb;
      border-radius:12px;
      box-shadow:0 15px 35px rgba(0,0,0,.12);
      overflow:hidden;
      z-index:1000;
    `;

    search.appendChild(box);

  }

  if(!query || !results.length){

    box.innerHTML="";
    box.style.display="none";
    return;

  }

  box.style.display="block";

  box.innerHTML=results.map(product=>`

    <button
      onclick="novaOpenSuggestion('${product.id}')"
      style="
        width:100%;
        display:flex;
        align-items:center;
        gap:12px;
        padding:10px 13px;
        background:#fff;
        border:0;
        border-bottom:1px solid #f0f0f0;
        text-align:left;
      "
    >

      <img
        src="${product.image}"
        style="
          width:42px;
          height:42px;
          object-fit:contain;
          background:#f7f7f7;
          border-radius:7px;
        "
      >

      <span>

        <b style="display:block;font-size:12px">
          ${escapeHTML(product.name)}
        </b>

        <small style="color:#777">
          ${escapeHTML(product.brand)}
          • ${money(getNovaPrice(product))}
        </small>

      </span>

    </button>

  `).join("");
}


function novaOpenSuggestion(id){

  const product=PRODUCTS.find(
    p=>p.id===id
  );

  const box=document.getElementById(
    "novaSearchSuggestions"
  );

  if(box){
    box.style.display="none";
  }

  if(product){

    if(typeof openProduct==="function"){
      openProduct(id);
    }

  }
}


/* =========================================================
   MODIFICATION DE L'AFFICHAGE DES PRIX
   ========================================================= */

function novaFormatPrice(product){

  const current=getNovaPrice(product);
  const old=getOldPrice(product);

  if(old){

    return `

      <div>

        <div
          class="old-price"
          style="
            font-size:12px;
            color:#999;
            text-decoration:line-through;
          "
        >
          ${money(old)}
        </div>

        <div
          class="price"
          style="color:#dc2626"
        >
          ${money(current)}
        </div>

      </div>

    `;

  }

  return `
    <div class="price">
      ${money(current)}
    </div>
  `;
}


/* =========================================================
   BADGE PROMO
   ========================================================= */

function novaPromoBadge(product){

  if(!NS_PROMOTIONS[product.id]){
    return "";
  }

  const reduction=
    Math.round(
      (1-getNovaPrice(product)/product.price)*100
    );

  return `

    <span
      style="
        position:absolute;
        left:12px;
        top:12px;
        background:#dc2626;
        color:#fff;
        padding:5px 8px;
        border-radius:7px;
        font-size:10px;
        font-weight:900;
        z-index:2;
      "
    >
      -${reduction}%
    </span>

  `;
}


/* =========================================================
   STOCK DYNAMIQUE
   ========================================================= */

const NS_STOCK_KEY="novashop_stock_v2";

let NS_STOCK=
  JSON.parse(
    localStorage.getItem(NS_STOCK_KEY) || "{}"
  );


function initializeNovaStock(){

  if(typeof PRODUCTS==="undefined"){
    return;
  }

  PRODUCTS.forEach(product=>{

    if(
      typeof NS_STOCK[product.id]!=="number"
    ){

      NS_STOCK[product.id]=product.stock;

    }

  });

  localStorage.setItem(
    NS_STOCK_KEY,
    JSON.stringify(NS_STOCK)
  );
}


function getNovaStock(product){

  if(
    typeof NS_STOCK[product.id]==="number"
  ){

    return NS_STOCK[product.id];

  }

  return product.stock;
}


function setNovaStock(id,value){

  NS_STOCK[id]=Math.max(
    0,
    Number(value)||0
  );

  localStorage.setItem(
    NS_STOCK_KEY,
    JSON.stringify(NS_STOCK)
  );
}


function decreaseNovaStock(id,quantity){

  const product=PRODUCTS.find(
    p=>p.id===id
  );

  if(!product) return false;

  const stock=getNovaStock(product);

  if(stock<quantity){
    return false;
  }

  setNovaStock(
    id,
    stock-quantity
  );

  return true;
}


/* =========================================================
   AVIS
   ========================================================= */

const NS_REVIEWS_KEY=
  "novashop_product_reviews_v2";

let NS_REVIEWS=
  JSON.parse(
    localStorage.getItem(NS_REVIEWS_KEY) || "{}"
  );


function saveNovaReviews(){

  localStorage.setItem(
    NS_REVIEWS_KEY,
    JSON.stringify(NS_REVIEWS)
  );

}


function getNovaReviews(id){

  return NS_REVIEWS[id] || [];

}


function addNovaReview(id,rating,text){

  const value=Math.max(
    1,
    Math.min(5,Number(rating)||5)
  );

  const review={
    rating:value,
    text:String(text||"").trim(),
    date:new Date().toLocaleDateString("fr-FR")
  };

  if(!review.text){
    return;
  }

  if(!NS_REVIEWS[id]){
    NS_REVIEWS[id]=[];
  }

  NS_REVIEWS[id].unshift(review);

  saveNovaReviews();

  if(typeof openProduct==="function"){
    openProduct(id);
  }

  toast("Avis ajouté ⭐");
}


/* =========================================================
   MODALE D'AVIS
   ========================================================= */

function novaReviewBox(product){

  const reviews=getNovaReviews(
    product.id
  );

  return `

    <div
      style="
        margin-top:28px;
        padding-top:22px;
        border-top:1px solid #e5e7eb;
      "
    >

      <h3 style="margin-bottom:12px">
        Avis clients
      </h3>

      <div>

        ${
          reviews.length
          ?
          reviews.slice(0,8).map(review=>`

            <div
              style="
                padding:12px 0;
                border-bottom:1px solid #f0f0f0;
              "
            >

              <div style="font-size:13px">
                ${"★".repeat(review.rating)}
                ${"☆".repeat(5-review.rating)}
              </div>

              <div
                style="
                  margin-top:5px;
                  font-size:13px;
                  color:#555;
                "
              >
                ${escapeHTML(review.text)}
              </div>

              <small style="color:#999">
                ${escapeHTML(review.date)}
              </small>

            </div>

          `).join("")
          :
          `
            <p style="color:#777;font-size:13px">
              Aucun avis ajouté pour le moment.
            </p>
          `
        }

      </div>

      <div
        style="
          margin-top:18px;
          display:grid;
          gap:8px;
        "
      >

        <select
          id="novaReviewRating"
          style="
            height:42px;
            border:1px solid #e5e7eb;
            border-radius:8px;
            padding:0 10px;
          "
        >
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
        </select>

        <textarea
          id="novaReviewText"
          placeholder="Écris ton avis..."
          style="
            min-height:80px;
            resize:vertical;
            border:1px solid #e5e7eb;
            border-radius:8px;
            padding:10px;
            font-family:inherit;
          "
        ></textarea>

        <button
          onclick="novaSubmitReview('${product.id}')"
          style="
            height:43px;
            background:#111318;
            color:#fff;
            border-radius:9px;
            font-weight:800;
          "
        >
          Publier l'avis
        </button>

      </div>

    </div>

  `;
}


function novaSubmitReview(id){

  const rating=
    document.getElementById(
      "novaReviewRating"
    ).value;

  const text=
    document.getElementById(
      "novaReviewText"
    ).value;

  addNovaReview(
    id,
    rating,
    text
  );

}


/* =========================================================
   PRIX + STOCK DANS LES CARTES
   ========================================================= */

function novaRenderEnhancedProducts(){

  if(typeof getProducts!=="function"){
    return;
  }

  const grid=
    document.getElementById(
      "productGrid"
    );

  if(!grid){
    return;
  }

  const products=getProducts();

  const totalPages=
    Math.max(
      1,
      Math.ceil(products.length/perPage)
    );

  if(currentPage>totalPages){
    currentPage=totalPages;
  }

  const start=
    (currentPage-1)*perPage;

  const visible=
    products.slice(
      start,
      start+perPage
    );

  grid.innerHTML=
    visible.map(product=>{

      const stock=
        getNovaStock(product);

      const favorite=
        favorites.includes(product.id);

      let stockText="En stock";
      let stockClass="";

      if(stock===0){

        stockText="Rupture";
        stockClass="out";

      }else if(stock<=3){

        stockText=`Plus que ${stock}`;
        stockClass="low";

      }

      return `

        <article class="product">

          ${novaPromoBadge(product)}

          <button
            class="favorite ${favorite?"active":""}"
            onclick="toggleFavorite('${product.id}')"
          >
            ${favorite?"♥":"♡"}
          </button>

          <div
            class="product-img"
            onclick="openProduct('${product.id}')"
            style="cursor:pointer"
          >

            <img
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="
                this.src='https://placehold.co/700x500/f7f7f7/222?text=Produit'
              "
            >

          </div>

          <div class="product-body">

            <div class="product-brand">
              ${escapeHTML(product.brand)}
            </div>

            <div
              class="product-name"
              onclick="openProduct('${product.id}')"
              style="cursor:pointer"
            >
              ${escapeHTML(product.name)}
            </div>

            <div class="rating">

              <span class="stars">
                ★★★★★
              </span>

              <span class="reviews">
                ${product.rating}
                (${product.reviews})
              </span>

            </div>

            <div class="product-bottom">

              <div>

                ${novaFormatPrice(product)}

                <div
                  class="stock ${stockClass}"
                >
                  ${stockText}
                </div>

              </div>

              <button
                class="add"
                onclick="addToCart('${product.id}')"
                ${stock===0?"disabled":""}
              >
                +
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

  renderNovaPagination(
    totalPages
  );
}


/* =========================================================
   PAGINATION
   ========================================================= */

function renderNovaPagination(totalPages){

  const pagination=
    document.getElementById(
      "pagination"
    );

  if(!pagination){
    return;
  }

  pagination.innerHTML="";

  for(
    let page=1;
    page<=totalPages;
    page++
  ){

    const button=
      document.createElement("button");

    button.className=
      "page"+
      (page===currentPage
        ? " active"
        : "");

    button.textContent=page;

    button.onclick=()=>{

      currentPage=page;

      novaRenderEnhancedProducts();

      scrollToProducts();

    };

    pagination.appendChild(button);

  }

}


/* =========================================================
   PRIX DU PANIER
   ========================================================= */

function novaCartPrice(product){

  return getNovaPrice(product);

}


/* =========================================================
   INITIALISATION
   ========================================================= */

initializeNovaStock();


/* =========================================================
   RECHERCHE
   ========================================================= */

const novaSearchInput=
  document.getElementById(
    "searchInput"
  );

if(novaSearchInput){

  novaSearchInput.addEventListener(
    "input",
    event=>{

      searchValue=
        event.target.value;

      currentPage=1;

      novaSearchSuggestions(
        searchValue
      );

      novaRenderEnhancedProducts();

    }
  );

}


/* =========================================================
   FERMETURE SUGGESTIONS
   ========================================================= */

document.addEventListener(
  "click",
  event=>{

    const search=
      document.querySelector(".search");

    const suggestions=
      document.getElementById(
        "novaSearchSuggestions"
      );

    if(
      suggestions &&
      search &&
      !search.contains(event.target)
    ){

      suggestions.style.display="none";

    }

  }
);


/* =========================================================
   REMPLACEMENT DU RENDER
   ========================================================= */

setTimeout(()=>{

  if(
    typeof novaRenderEnhancedProducts==="function"
  ){

    novaRenderEnhancedProducts();

  }

},0);


/* =========================================================
   API NOVASHOP
   ========================================================= */

window.NovaShop={
  ...(window.NovaShop || {}),

  products:PRODUCTS,

  getPrice:getNovaPrice,

  getStock:getNovaStock,

  setStock:setNovaStock,

  decreaseStock:decreaseNovaStock,

  search:novaSearchProducts,

  reviews:NS_REVIEWS,

  promotions:NS_PROMOTIONS
};

console.log(
  "NovaShop Partie 2 chargée ✓",
  PRODUCTS.length,
  "produits"
);
