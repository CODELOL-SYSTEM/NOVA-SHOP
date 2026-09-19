import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
    authDomain: "novashop-4ee63.firebaseapp.com",
    projectId: "novashop-4ee63",
    storageBucket: "novashop-4ee63.firebasestorage.app",
    messagingSenderId: "1044964015809",
    appId: "1:1044964015809:web:4eafe48f8539e40",
    measurementId: "G-XNY5X2VMY9"
};

let firebaseApp = null;
let auth = null;
let firebaseReady = false;

try {

    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firebaseReady = true;

} catch(error){

    console.error("Firebase initialization error:", error);

}


/* =========================================================
   CONSTANTES
========================================================= */

const ADMIN_EMAIL = "pc2alex.les@gmail.com";

const ADMIN_CODE = "NOVA-ADMIN-2026";

const PROMOS = {
    NOVA100: 100,
    NOVA20: 20,
    NOVA10: 10
};

const PAYPAL_URL = "https://paypal.me/SH0PNOVA";

const STORAGE = {
    cart: "nova_cart_v4",
    favorites: "nova_favorites_v4",
    reviews: "nova_reviews_v4",
    orders: "nova_orders_v4",
    settings: "nova_settings_v4",
    adminUnlocked: "nova_admin_unlocked_v4"
};


/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS = [

    {
        id:"gigabyte-b650-aorus",
        name:"Gigabyte B650 AORUS Elite AX",
        category:"Composants",
        price:189.99,
        image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg",
        description:"Carte mère AM5 complète pour configuration gaming moderne.",
        tags:["gigabyte","b650","am5","amd","carte mère"]
    },

    {
        id:"pc-7800x3d-rx9070xt",
        name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
        category:"PC Gamer",
        price:2237.65,
        image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png",
        description:"PC Gamer haut de gamme avec Ryzen 7 7800X3D, RX 9070 XT et 32 Go DDR5.",
        tags:["pc","gamer","7800x3d","rx9070xt","ddr5"]
    },

    {
        id:"hyperx-cloud-ii",
        name:"HyperX Cloud II – Casque gaming",
        category:"Casques",
        price:49.99,
        image:"https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_cloud_ii_red_1_main_64x64.jpg?v=1764129756",
        description:"Casque gaming confortable pour jouer et communiquer.",
        tags:["hyperx","cloud","casque","gaming"]
    },

    {
        id:"tecors-60",
        name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
        category:"Claviers",
        price:30,
        image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg",
        description:"Clavier mécanique compact au format 60% avec disposition AZERTY.",
        tags:["tecors","clavier","mecanique","60","azerty"]
    },

    {
        id:"celshading-65",
        name:"Clavier Magnétique 65% Celshading Noir",
        category:"Claviers",
        price:120.90,
        image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832",
        description:"Clavier magnétique compact avec design noir.",
        tags:["clavier","65","magnetique","celshading"]
    },

    {
        id:"ajazz-aj199",
        name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
        category:"Souris",
        price:49.99,
        image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif",
        description:"Souris gaming sans fil légère au design carbone.",
        tags:["ajazz","aj199","mouse","wireless","souris"]
    },

    {
        id:"logitech-gprox2",
        name:"Logitech G PRO X2 Superstrike Blanc et Noir",
        category:"Souris",
        price:150.99,
        image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg",
        description:"Souris gaming Logitech haut de gamme.",
        tags:["logitech","g pro","superstrike","souris"]
    },

    {
        id:"samsung990pro1",
        name:"Samsung 990 PRO 1TB",
        category:"Stockage",
        price:249.99,
        image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg?_gl=1*16ls1hl*_up*MQ..&_gs*MQ..&gclid=Cj0KCQjw5bjVBhCiARIsAJzMVnQEMBfJ7Tu6QehfaOfDIYc2h0U2uRDxO4NJ1bikZGdwwED5WhZ8aAiHlEALw_wcB&gbraid=0AAAAAD8i938YdP3zfodKdTY8yIxjNfdF4",
        description:"SSD NVMe PCIe rapide de 1 To.",
        tags:["samsung","990","pro","ssd","nvme","1tb"]
    },

    {
        id:"samsung990pro2",
        name:"Samsung 990 PRO 2TB",
        category:"Stockage",
        price:199.93,
        image:"https://pc.comparer.fr/500x500/310191422.webp",
        description:"SSD NVMe Samsung 990 PRO de 2 To.",
        tags:["samsung","990","pro","ssd","nvme","2tb"]
    },

    {
        id:"corsair-rm1000x",
        name:"CORSAIR RM1000x (EU)",
        category:"Alimentations",
        price:159.90,
        image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp",
        description:"Alimentation Corsair 1000 W pour configuration gaming puissante.",
        tags:["corsair","rmx","1000w","alimentation"]
    },

    {
        id:"corsair-rm850x",
        name:"CORSAIR RM850x (EU)",
        category:"Alimentations",
        price:134.90,
        image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp",
        description:"Alimentation Corsair 850 W.",
        tags:["corsair","rmx","850w","alimentation"]
    },

    {
        id:"corsair-frame5000d",
        name:"Corsair Frame 5000D RS ARGB (Noir)",
        category:"Boîtiers",
        price:159.90,
        image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg",
        description:"Boîtier gaming noir avec éclairage ARGB.",
        tags:["corsair","5000d","boitier","case","argb"]
    },

    {
        id:"arctic-liquid360",
        name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
        category:"Refroidissement",
        price:129.90,
        image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg",
        description:"Watercooling AIO 360 mm noir.",
        tags:["arctic","liquid freezer","360","aio","watercooling"]
    },

    {
        id:"samsung-g6-oled",
        name:"Samsung 27 QD-OLED Odyssey G6 S27HG612SU",
        category:"Écrans",
        price:399.95,
        image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg",
        description:"Écran gaming 27 pouces QD-OLED.",
        tags:["samsung","odyssey","g6","oled","ecran"]
    },

    {
        id:"elgato-wave-arm",
        name:"ELGATO Wave Mic Arm Pro",
        category:"Streaming",
        price:229.90,
        image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg?v=d2e89aca097c819fe092262cbf426b587e3800d5",
        description:"Bras articulé haut de gamme pour microphone.",
        tags:["elgato","wave","mic","arm","streaming"]
    },

    {
        id:"dualsense-cosmic-red",
        name:"Sony DualSense Cosmic Red PS5/PC",
        category:"Manettes",
        price:74.90,
        image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
        description:"Manette DualSense compatible PS5 et PC.",
        tags:["sony","dualsense","ps5","pc","manette"]
    },

    {
        id:"asus-b650-plus",
        name:"ASUS TUF Gaming B650-PLUS",
        category:"Composants",
        price:179.90,
        image:"https://media.materiel.net/r550/products/MN0005986139.jpg",
        description:"Carte mère ASUS TUF Gaming B650-PLUS.",
        tags:["asus","tuf","b650","am5","carte mère"]
    },

    {
        id:"msi-b650-tomahawk",
        name:"MSI MAG B650 Tomahawk WiFi",
        category:"Composants",
        price:189.90,
        image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg",
        description:"Carte mère MSI MAG B650 Tomahawk WiFi.",
        tags:["msi","b650","tomahawk","wifi","am5"]
    }

];


/* =========================================================
   ÉTAT
========================================================= */

let currentUser = null;

let currentCategory = "Tous";

let currentSearch = "";

let currentProduct = null;

let selectedRating = 5;

let appliedPromo = null;

let cart = loadJSON(STORAGE.cart, []);

let favorites = loadJSON(STORAGE.favorites, []);

let reviews = loadJSON(STORAGE.reviews, []);

let orders = loadJSON(STORAGE.orders, []);

let settings = loadJSON(
    STORAGE.settings,
    {
        dark:false,
        sound:true,
        language:"fr"
    }
);


/* =========================================================
   UTILITAIRES
========================================================= */

function $(id){
    return document.getElementById(id);
}

function loadJSON(key,fallback){

    try{
        const value = localStorage.getItem(key);

        if(!value){
            return fallback;
        }

        return JSON.parse(value);

    }catch{
        return fallback;
    }
}

function saveJSON(key,value){
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

function money(value){

    return new Intl.NumberFormat(
        "fr-FR",
        {
            style:"currency",
            currency:"EUR"
        }
    ).format(value);

}

function escapeHTML(value){

    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}

function showToast(message){

    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(
        ()=>{
            toast.classList.remove("show");
        },
        2600
    );

}

function playClick(){

    if(!settings.sound){
        return;
    }

    try{

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if(!AudioContext){
            return;
        }

        const ctx = new AudioContext();

        const osc = ctx.createOscillator();

        const gain = ctx.createGain();

        osc.type = "sine";

        osc.frequency.setValueAtTime(
            650,
            ctx.currentTime
        );

        osc.frequency.exponentialRampToValueAtTime(
            350,
            ctx.currentTime + .06
        );

        gain.gain.setValueAtTime(
            .045,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            ctx.currentTime + .07
        );

        osc.connect(gain);

        gain.connect(ctx.destination);

        osc.start();

        osc.stop(
            ctx.currentTime + .08
        );

    }catch{}

}

function normalize(value){

    return String(value ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

}


/* =========================================================
   MODALES
========================================================= */

function openModal(id){

    const modal = $(id);

    if(!modal){
        return;
    }

    modal.classList.add("show");

    $("overlay").classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeModal(id){

    const modal = $(id);

    if(!modal){
        return;
    }

    modal.classList.remove("show");

    const anyOpen =
        document.querySelector(".modal.show");

    if(!anyOpen){

        $("overlay").classList.remove("show");

        document.body.style.overflow = "";

    }

}

function closeAllModals(){

    document
        .querySelectorAll(".modal.show")
        .forEach(modal=>{
            modal.classList.remove("show");
        });

    $("overlay").classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================================
   CATÉGORIES
========================================================= */

function getCategories(){

    const categories = [
        "Tous",
        ...new Set(
            PRODUCTS.map(
                product=>product.category
            )
        )
    ];

    return categories;

}

function renderCategories(){

    const container = $("categories");

    container.innerHTML = "";

    getCategories().forEach(category=>{

        const button =
            document.createElement("button");

        button.className =
            "category" +
            (
                category === currentCategory
                    ? " active"
                    : ""
            );

        button.textContent = category;

        button.addEventListener(
            "click",
            ()=>{
                playClick();

                currentCategory =
                    category;

                renderCategories();

                renderProducts();

                scrollToProducts();
            }
        );

        container.appendChild(button);

    });

}


/* =========================================================
   AVIS
========================================================= */

function getProductReviews(productId){

    return reviews.filter(
        review =>
            review.productId === productId
    );

}

function getRating(productId){

    const list =
        getProductReviews(productId);

    if(!list.length){
        return {
            average:0,
            count:0
        };
    }

    const total =
        list.reduce(
            (sum,review)=>
                sum + Number(review.rating),
            0
        );

    return {
        average:total / list.length,
        count:list.length
    };

}

function starsHTML(rating){

    const rounded =
        Math.round(rating);

    let html = "";

    for(let i=1;i<=5;i++){

        html +=
            i <= rounded
                ? "★"
                : "☆";

    }

    return html;

}

function maskedName(name){

    const clean =
        String(name || "Utilisateur")
            .trim();

    const first3 =
        clean
            .slice(0,3);

    return first3 + "***";

}


/* =========================================================
   FILTRAGE
========================================================= */

function getFilteredProducts(){

    let list = [...PRODUCTS];

    if(currentCategory !== "Tous"){

        list =
            list.filter(
                product =>
                    product.category ===
                    currentCategory
            );

    }

    if(currentSearch.trim()){

        const query =
            normalize(currentSearch);

        list =
            list.filter(product=>{

                const text =
                    normalize(
                        [
                            product.name,
                            product.category,
                            product.description,
                            ...(product.tags || [])
                        ].join(" ")
                    );

                return text.includes(query);

            });

    }

    const sort =
        $("sortSelect")?.value ||
        "relevance";

    if(sort === "priceAsc"){

        list.sort(
            (a,b)=>
                a.price - b.price
        );

    }

    if(sort === "priceDesc"){

        list.sort(
            (a,b)=>
                b.price - a.price
        );

    }

    if(sort === "name"){

        list.sort(
            (a,b)=>
                a.name.localeCompare(
                    b.name,
                    "fr"
                )
        );

    }

    return list;

}


/* =========================================================
   PRODUITS
========================================================= */

function renderProducts(){

    const grid =
        $("productsGrid");

    const empty =
        $("emptyState");

    const list =
        getFilteredProducts();

    grid.innerHTML = "";

    $("resultCount").textContent =
        `${list.length} produit${list.length > 1 ? "s" : ""}`;

    empty.style.display =
        list.length
            ? "none"
            : "block";

    list.forEach(
        (product,index)=>{

            const card =
                document.createElement("article");

            card.className =
                "product-card";

            card.style.animationDelay =
                `${Math.min(index * 35,350)}ms`;

            const rating =
                getRating(product.id);

            const favorite =
                favorites.includes(product.id);

            card.innerHTML = `

                <div class="product-image">

                    <button
                        class="favorite ${favorite ? "active" : ""}"
                        data-action="favorite"
                        data-id="${product.id}"
                        title="Favori"
                    >
                        ${favorite ? "♥" : "♡"}
                    </button>

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        data-product-image="${product.id}"
                    >

                </div>

                <div class="product-body">

                    <div class="product-category">
                        ${escapeHTML(product.category)}
                    </div>

                    <div class="product-name">
                        ${escapeHTML(product.name)}
                    </div>

                    <div class="rating-row">

                        <span class="stars">
                            ${starsHTML(rating.average)}
                        </span>

                        <span class="rating-number">
                            ${
                                rating.count
                                    ? `${rating.average.toFixed(1)} (${rating.count})`
                                    : "Pas encore noté"
                            }
                        </span>

                    </div>

                    <div class="price">
                        ${money(product.price)}
                    </div>

                    <div class="stock">
                        ● Disponible
                    </div>

                    <div class="product-actions">

                        <button
                            class="btn"
                            data-action="view"
                            data-id="${product.id}"
                        >
                            Voir
                        </button>

                        <button
                            class="btn btn-primary"
                            data-action="add"
                            data-id="${product.id}"
                        >
                            🛒 Ajouter
                        </button>

                    </div>

                </div>
            `;

            const image =
                card.querySelector(
                    "[data-product-image]"
                );

            image.addEventListener(
                "error",
                ()=>{
                    card.remove();
                    updateVisibleCount();
                },
                {
                    once:true
                }
            );

            grid.appendChild(card);

        }
    );

}

function updateVisibleCount(){

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    $("resultCount").textContent =
        `${cards.length} produit${cards.length > 1 ? "s" : ""}`;

    $("emptyState").style.display =
        cards.length
            ? "none"
            : "block";

}


/* =========================================================
   PANIER
========================================================= */

function getCartDetailed(){

    return cart
        .map(item=>{

            const product =
                PRODUCTS.find(
                    p => p.id === item.id
                );

            if(!product){
                return null;
            }

            return {
                product,
                quantity:Math.max(
                    1,
                    Number(item.quantity) || 1
                )
            };

        })
        .filter(Boolean);

}

function cartCount(){

    return getCartDetailed()
        .reduce(
            (sum,item)=>
                sum + item.quantity,
            0
        );

}

function cartSubtotal(){

    return getCartDetailed()
        .reduce(
            (sum,item)=>
                sum +
                item.product.price *
                item.quantity,
            0
        );

}

function addToCart(id){

    const existing =
        cart.find(
            item=>item.id === id
        );

    if(existing){

        existing.quantity += 1;

    }else{

        cart.push({
            id,
            quantity:1
        });

    }

    saveJSON(
        STORAGE.cart,
        cart
    );

    renderCart();

    updateCartCount();

    showToast("Produit ajouté au panier 🛒");

}

function removeFromCart(id){

    cart =
        cart.filter(
            item=>item.id !== id
        );

    saveJSON(
        STORAGE.cart,
        cart
    );

    renderCart();

    updateCartCount();

}

function changeQuantity(id,delta){

    const item =
        cart.find(
            x=>x.id === id
        );

    if(!item){
        return;
    }

    item.quantity += delta;

    if(item.quantity <= 0){

        cart =
            cart.filter(
                x=>x.id !== id
            );

    }

    saveJSON(
        STORAGE.cart,
        cart
    );

    renderCart();

    updateCartCount();

}

function updateCartCount(){

    $("cartCount").textContent =
        cartCount();

}

function renderCart(){

    const list =
        $("cartList");

    const items =
        getCartDetailed();

    if(!items.length){

        list.innerHTML = `
            <div style="
                text-align:center;
                padding:40px 10px;
                color:var(--muted);
            ">
                <div style="font-size:40px">🛒</div>
                <strong>Ton panier est vide</strong>
                <div style="font-size:12px;margin-top:5px">
                    Ajoute des produits pour commencer.
                </div>
            </div>
        `;

    }else{

        list.innerHTML = "";

        items.forEach(
            ({product,quantity})=>{

                const item =
                    document.createElement("div");

                item.className =
                    "cart-item";

                item.innerHTML = `

                    <img
                        src="${product.image}"
                        alt=""
                    >

                    <div>

                        <div class="cart-item-name">
                            ${escapeHTML(product.name)}
                        </div>

                        <div class="cart-item-price">
                            ${money(product.price)}
                        </div>

                        <div class="qty">

                            <button
                                data-cart-minus="${product.id}"
                            >
                                −
                            </button>

                            <strong>
                                ${quantity}
                            </strong>

                            <button
                                data-cart-plus="${product.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="btn btn-danger"
                        data-cart-remove="${product.id}"
                    >
                        ×
                    </button>

                `;

                list.appendChild(item);

            }
        );

    }

    const subtotal =
        cartSubtotal();

    $("cartSubtotal").textContent =
        money(subtotal);

    $("cartShipping").textContent =
        subtotal > 0
            ? "Calculée"
            : money(0);

    $("cartTotal").textContent =
        money(subtotal);

}


/* =========================================================
   FAVORIS
========================================================= */

function toggleFavorite(id){

    if(favorites.includes(id)){

        favorites =
            favorites.filter(
                item=>item !== id
            );

        showToast("Retiré des favoris");

    }else{

        favorites.push(id);

        showToast("Ajouté aux favoris ❤️");

    }

    saveJSON(
        STORAGE.favorites,
        favorites
    );

    renderProducts();

}


/* =========================================================
   PRODUIT
========================================================= */

function openProduct(id){

    const product =
        PRODUCTS.find(
            p=>p.id === id
        );

    if(!product){
        return;
    }

    currentProduct = product;

    const rating =
        getRating(product.id);

    const productReviews =
        getProductReviews(product.id);

    const canReview =
        currentUser &&
        !productReviews.some(
            review =>
                review.uid === currentUser.uid
        );

    $("productDetail").innerHTML = `

        <div class="detail">

            <div class="detail-image">

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                >

            </div>

            <div>

                <div class="detail-category">
                    ${escapeHTML(product.category)}
                </div>

                <h2>
                    ${escapeHTML(product.name)}
                </h2>

                <div class="rating-row">
                    <span class="stars">
                        ${starsHTML(rating.average)}
                    </span>

                    <span class="rating-number">
                        ${
                            rating.count
                                ? `${rating.average.toFixed(1)} / 5 · ${rating.count} avis`
                                : "Aucun avis"
                        }
                    </span>
                </div>

                <div class="detail-price">
                    ${money(product.price)}
                </div>

                <div class="stock">
                    ● Disponible
                </div>

                <p class="detail-description"
                   style="margin-top:15px">
                    ${escapeHTML(product.description)}
                </p>

                <div class="detail-actions">

                    <button
                        class="btn btn-primary"
                        id="detailAddBtn"
                    >
                        🛒 Ajouter au panier
                    </button>

                    <button
                        class="btn"
                        id="detailFavBtn"
                    >
                        ${
                            favorites.includes(product.id)
                                ? "♥ Favori"
                                : "♡ Favori"
                        }
                    </button>

                </div>

            </div>

        </div>

        <div class="reviews">

            <h3>
                Avis clients
            </h3>

            ${
                currentUser && canReview
                    ? reviewFormHTML()
                    : currentUser
                        ? `<p style="color:var(--muted);font-size:12px;margin-top:10px">
                            Tu as déjà laissé un avis sur ce produit.
                           </p>`
                        : `<p style="color:var(--muted);font-size:12px;margin-top:10px">
                            Connecte-toi pour laisser un avis.
                           </p>`
            }

            <div id="reviewsList">
                ${renderReviewsHTML(productReviews)}
            </div>

        </div>
    `;

    $("detailAddBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                addToCart(product.id);
            }
        );

    $("detailFavBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                toggleFavorite(product.id);
                openProduct(product.id);
            }
        );

    const starButtons =
        document.querySelectorAll(
            "[data-review-star]"
        );

    starButtons.forEach(button=>{

        button.addEventListener(
            "click",
            ()=>{
                selectedRating =
                    Number(
                        button.dataset.reviewStar
                    );

                updateStarPicker();
            }
        );

    });

    const reviewForm =
        $("reviewForm");

    if(reviewForm){

        reviewForm.addEventListener(
            "submit",
            submitReview
        );

    }

    openModal("productModal");

}

function reviewFormHTML(){

    selectedRating = 5;

    return `

        <form
            class="form"
            id="reviewForm"
            style="margin-top:15px"
        >

            <div>

                <label style="font-size:12px;font-weight:850">
                    Ta note
                </label>

                <div class="star-picker">

                    ${[1,2,3,4,5].map(
                        i=>`
                            <button
                                type="button"
                                data-review-star="${i}"
                                class="${i <= 5 ? "active" : ""}"
                            >
                                ★
                            </button>
                        `
                    ).join("")}

                </div>

            </div>

            <div class="field">

                <label>
                    Commentaire
                </label>

                <input
                    id="reviewText"
                    maxlength="250"
                    placeholder="Ton avis..."
                    required
                >

            </div>

            <button class="btn btn-primary">
                Publier mon avis
            </button>

        </form>
    `;

}

function updateStarPicker(){

    document
        .querySelectorAll(
            "[data-review-star]"
        )
        .forEach(button=>{

            const value =
                Number(
                    button.dataset.reviewStar
                );

            button.classList.toggle(
                "active",
                value <= selectedRating
            );

        });

}

function renderReviewsHTML(list){

    if(!list.length){

        return `
            <div style="
                color:var(--muted);
                font-size:13px;
                padding-top:14px;
            ">
                Aucun avis pour le moment.
            </div>
        `;

    }

    return list
        .slice()
        .reverse()
        .map(review=>`

            <div class="review">

                <div class="review-top">

                    <div class="review-name">
                        ${escapeHTML(review.name)}
                    </div>

                    <div class="review-date">
                        ${escapeHTML(review.date)}
                    </div>

                </div>

                <div class="stars">
                    ${starsHTML(review.rating)}
                </div>

                <div class="review-text">
                    ${escapeHTML(review.text)}
                </div>

            </div>

        `)
        .join("");

}

function submitReview(event){

    event.preventDefault();

    if(!currentUser){

        showToast(
            "Connecte-toi pour publier un avis."
        );

        return;
    }

    if(!currentProduct){
        return;
    }

    const already =
        reviews.some(
            review =>
                review.productId ===
                    currentProduct.id &&
                review.uid ===
                    currentUser.uid
        );

    if(already){

        showToast(
            "Tu as déjà noté ce produit."
        );

        return;
    }

    const text =
        $("reviewText")
            .value
            .trim();

    if(!text){
        return;
    }

    const displayName =
        currentUser.displayName ||
        currentUser.email?.split("@")[0] ||
        "Utilisateur";

    reviews.push({

        id:
            crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),

        productId:
            currentProduct.id,

        uid:
            currentUser.uid,

        name:
            maskedName(displayName),

        rating:
            selectedRating,

        text,

        date:
            new Intl.DateTimeFormat(
                "fr-FR"
            ).format(new Date())

    });

    saveJSON(
        STORAGE.reviews,
        reviews
    );

    showToast("Avis publié ⭐");

    openProduct(
        currentProduct.id
    );

    renderProducts();

}


/* =========================================================
   AUTH
========================================================= */

function setAuthMessage(message,type=""){

    const box =
        $("authMessage");

    box.textContent =
        message;

    box.className =
        "auth-message" +
        (
            type
                ? ` ${type}`
                : ""
        );

}

function openAuth(){

    if(currentUser){

        renderAccount();

        openModal("accountModal");

    }else{

        setAuthMessage("");

        openModal("authModal");

    }

}

async function loginWithEmail(event){

    event.preventDefault();

    if(!firebaseReady){

        setAuthMessage(
            "Firebase n'est pas disponible. Vérifie la configuration.",
            "error"
        );

        return;
    }

    const email =
        $("loginEmail")
            .value
            .trim();

    const password =
        $("loginPassword")
            .value;

    setAuthMessage(
        "Connexion..."
    );

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        setAuthMessage(
            "Connexion réussie.",
            "success"
        );

        closeModal("authModal");

    }catch(error){

        console.error(error);

        setAuthMessage(
            firebaseErrorMessage(error),
            "error"
        );

    }

}

async function signup(event){

    event.preventDefault();

    if(!firebaseReady){

        setAuthMessage(
            "Firebase n'est pas disponible.",
            "error"
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

    const password2 =
        $("signupPassword2")
            .value;

    if(!email || !phone){

        setAuthMessage(
            "E-mail et téléphone obligatoires.",
            "error"
        );

        return;
    }

    if(password !== password2){

        setAuthMessage(
            "Les mots de passe ne correspondent pas.",
            "error"
        );

        return;
    }

    if(password.length < 6){

        setAuthMessage(
            "Le mot de passe doit contenir au moins 6 caractères.",
            "error"
        );

        return;
    }

    setAuthMessage(
        "Création du compte..."
    );

    try{

        const credential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        localStorage.setItem(
            `nova_phone_${credential.user.uid}`,
            phone
        );

        setAuthMessage(
            "Compte créé.",
            "success"
        );

        closeModal("authModal");

    }catch(error){

        console.error(error);

        setAuthMessage(
            firebaseErrorMessage(error),
            "error"
        );

    }

}

async function loginGoogle(){

    if(!firebaseReady){

        setAuthMessage(
            "Firebase n'est pas disponible.",
            "error"
        );

        return;
    }

    setAuthMessage(
        "Ouverture de Google..."
    );

    try{

        const provider =
            new GoogleAuthProvider();

        await signInWithPopup(
            auth,
            provider
        );

        closeModal("authModal");

    }catch(error){

        console.error(error);

        setAuthMessage(
            firebaseErrorMessage(error),
            "error"
        );

    }

}

async function logout(){

    if(firebaseReady){

        try{
            await signOut(auth);
        }catch(error){
            console.error(error);
        }

    }

    currentUser = null;

    $("adminBtn").style.display =
        "none";

    $("ordersBtn").style.display =
        "none";

    showToast(
        "Déconnexion effectuée."
    );

    closeAllModals();

    renderAccount();

}

function firebaseErrorMessage(error){

    const code =
        error?.code || "";

    const map = {

        "auth/invalid-credential":
            "E-mail ou mot de passe incorrect.",

        "auth/invalid-email":
            "Adresse e-mail invalide.",

        "auth/email-already-in-use":
            "Cette adresse e-mail est déjà utilisée.",

        "auth/weak-password":
            "Mot de passe trop faible.",

        "auth/popup-closed-by-user":
            "Fenêtre Google fermée.",

        "auth/popup-blocked":
            "Le navigateur a bloqué la fenêtre Google.",

        "auth/unauthorized-domain":
            "Domaine non autorisé dans Firebase.",

        "auth/api-key-not-valid":
            "Clé API Firebase invalide ou configuration Firebase incorrecte."

    };

    return (
        map[code] ||
        "Impossible de terminer l'opération. Vérifie Firebase."
    );

}


/* =========================================================
   COMPTE
========================================================= */

function renderAccount(){

    const container =
        $("accountContent");

    if(!currentUser){

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:25px;
            ">

                <div style="font-size:45px">
                    👤
                </div>

                <h3>
                    Pas encore connecté
                </h3>

                <p style="
                    color:var(--muted);
                    font-size:13px;
                    margin-top:5px;
                ">
                    Connecte-toi pour gérer tes commandes.
                </p>

                <button
                    class="btn btn-primary"
                    id="accountLoginBtn"
                    style="margin-top:15px"
                >
                    Se connecter
                </button>

            </div>
        `;

        $("accountLoginBtn")
            .addEventListener(
                "click",
                ()=>{
                    closeModal("accountModal");
                    openAuth();
                }
            );

        return;

    }

    const displayName =
        currentUser.displayName ||
        currentUser.email?.split("@")[0] ||
        "Utilisateur";

    const initials =
        displayName
            .slice(0,2)
            .toUpperCase();

    container.innerHTML = `

        <div class="account-card">

            <div class="account-avatar">
                ${escapeHTML(initials)}
            </div>

            <div>

                <h3>
                    ${escapeHTML(displayName)}
                </h3>

                <div class="account-email">
                    ${escapeHTML(currentUser.email || "")}
                </div>

            </div>

            <button
                class="btn"
                id="accountOrdersBtn"
            >
                📦 Mes commandes
            </button>

            <button
                class="btn btn-danger"
                id="logoutBtn"
            >
                Se déconnecter
            </button>

        </div>
    `;

    $("accountOrdersBtn")
        .addEventListener(
            "click",
            ()=>{
                closeModal("accountModal");
                renderOrders();
                openModal("ordersModal");
            }
        );

    $("logoutBtn")
        .addEventListener(
            "click",
            logout
        );

}


/* =========================================================
   ADMIN
========================================================= */

function isAdmin(){

    if(!currentUser){
        return false;
    }

    return (
        currentUser.email?.toLowerCase() ===
        ADMIN_EMAIL.toLowerCase()
    );

}

function updateAuthUI(){

    const logged =
        !!currentUser;

    $("accountBtn").textContent =
        logged
            ? "👤 Mon compte"
            : "👤 Compte";

    $("ordersBtn").style.display =
        logged
            ? "block"
            : "none";

    $("adminBtn").style.display =
        isAdmin()
            ? "block"
            : "none";

}

function openDashboard(){

    if(!isAdmin()){

        showToast(
            "Accès au dashboard refusé."
        );

        return;
    }

    renderDashboard();

    openModal("dashboardModal");

}

function renderDashboard(){

    const freeOrders =
        orders.filter(
            order =>
                Number(order.total) === 0
        ).length;

    const catalogValue =
        PRODUCTS.reduce(
            (sum,product)=>
                sum + product.price,
            0
        );

    $("adminOrderCount").textContent =
        orders.length;

    $("adminFreeCount").textContent =
        freeOrders;

    $("adminCatalogValue").textContent =
        money(catalogValue);

    renderAdminOrders();

    renderAdminPromos();

}

function renderAdminOrders(){

    const container =
        $("adminOrders");

    if(!orders.length){

        container.innerHTML = `
            <div style="
                color:var(--muted);
                font-size:12px;
            ">
                Aucune commande.
            </div>
        `;

        return;
    }

    container.innerHTML =
        orders
            .slice()
            .reverse()
            .map(order=>`

                <div class="admin-row">

                    <div class="admin-row-main">

                        <div class="admin-row-title">
                            ${escapeHTML(order.number)}
                        </div>

                        <div class="admin-row-sub">
                            ${escapeHTML(order.email || "")}
                            ·
                            ${money(order.total)}
                            ·
                            ${escapeHTML(order.status)}
                        </div>

                    </div>

                    <button
                        class="btn"
                        data-admin-invoice="${order.id}"
                    >
                        Facture
                    </button>

                </div>

            `)
            .join("");

}

function renderAdminPromos(){

    const container =
        $("adminPromos");

    container.innerHTML =
        Object.entries(PROMOS)
            .map(
                ([code,discount])=>`

                    <div class="admin-row">

                        <div class="admin-row-main">

                            <div class="admin-row-title">
                                ${code}
                            </div>

                            <div class="admin-row-sub">
                                Réduction : ${discount}%
                            </div>

                        </div>

                        <strong>
                            ACTIF
                        </strong>

                    </div>
                `
            )
            .join("");

}


/* =========================================================
   COMMANDES
========================================================= */

function getUserOrders(){

    if(!currentUser){
        return [];
    }

    return orders.filter(
        order =>
            order.uid === currentUser.uid ||
            order.email === currentUser.email
    );

}

function renderOrders(){

    const container =
        $("ordersContent");

    if(!currentUser){

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:35px;
            ">
                Connecte-toi pour voir tes commandes.
            </div>
        `;

        return;
    }

    const userOrders =
        getUserOrders();

    if(!userOrders.length){

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:40px;
                color:var(--muted);
            ">
                <div style="font-size:40px">📦</div>
                <strong>Aucune commande</strong>
                <div style="font-size:12px;margin-top:5px">
                    Tes commandes apparaîtront ici.
                </div>
            </div>
        `;

        return;
    }

    container.innerHTML =
        userOrders
            .slice()
            .reverse()
            .map(order=>`

                <div class="order-card">

                    <div class="order-head">

                        <div class="order-number">
                            ${escapeHTML(order.number)}
                        </div>

                        <div class="status">
                            ${escapeHTML(order.status)}
                        </div>

                    </div>

                    <div class="order-info">
                        ${escapeHTML(order.date)}
                        ·
                        ${money(order.total)}
                    </div>

                    <div class="order-products">

                        ${order.items.map(item=>`

                            <div class="order-product">

                                <span>
                                    ${escapeHTML(item.name)}
                                    × ${item.quantity}
                                </span>

                                <strong>
                                    ${money(item.price * item.quantity)}
                                </strong>

                            </div>

                        `).join("")}

                    </div>

                    <button
                        class="btn"
                        style="margin-top:12px"
                        data-order-invoice="${order.id}"
                    >
                        Voir la facture
                    </button>

                </div>

            `)
            .join("");

}


/* =========================================================
   PROMO
========================================================= */

function applyPromo(){

    const input =
        $("promoCode");

    const result =
        $("promoResult");

    const code =
        input.value
            .trim()
            .toUpperCase();

    if(!code){

        appliedPromo = null;

        result.textContent =
            "";

        updateCheckout();

        return;
    }

    if(
        Object.prototype.hasOwnProperty.call(
            PROMOS,
            code
        )
    ){

        appliedPromo = {
            code,
            discount:PROMOS[code]
        };

        result.textContent =
            `Code ${code} appliqué : -${PROMOS[code]}%.`;

        result.className =
            "promo-result promo-valid";

        updateCheckout();

        showToast(
            "Code promotionnel appliqué 🎟"
        );

    }else{

        appliedPromo = null;

        result.textContent =
            "Code promotionnel invalide.";

        result.className =
            "promo-result promo-invalid";

        updateCheckout();

    }

}

function getCheckoutTotals(){

    const subtotal =
        cartSubtotal();

    const discount =
        appliedPromo
            ? subtotal *
              (
                appliedPromo.discount / 100
              )
            : 0;

    const total =
        Math.max(
            0,
            subtotal - discount
        );

    return {
        subtotal,
        discount,
        total
    };

}

function updateCheckout(){

    const {
        subtotal,
        discount,
        total
    } =
        getCheckoutTotals();

    $("checkoutSubtotal").textContent =
        money(subtotal);

    $("checkoutDiscount").textContent =
        `- ${money(discount)}`;

    $("checkoutTotal").textContent =
        money(total);

    const items =
        getCartDetailed();

    $("checkoutItems").innerHTML =
        items.length
            ? items
                .map(
                    ({product,quantity})=>
                        `
                        <div style="
                            font-size:12px;
                            padding:4px 0;
                            display:flex;
                            justify-content:space-between;
                            gap:10px;
                        ">
                            <span>
                                ${escapeHTML(product.name)}
                                × ${quantity}
                            </span>
                            <strong>
                                ${money(product.price * quantity)}
                            </strong>
                        </div>
                        `
                )
                .join("")
            : `
                <div style="
                    color:var(--muted);
                    font-size:12px;
                ">
                    Panier vide.
                </div>
            `;

    /*
       Le bouton est volontairement activé
       uniquement avec une réduction de 100 %.
    */

    const formValid =
        $("checkoutForm")
            .checkValidity();

    const isFree =
        appliedPromo &&
        appliedPromo.discount === 100;

    $("payButton").disabled =
        !formValid ||
        !isFree ||
        !items.length;

}

function openCheckout(){

    if(!currentUser){

        showToast(
            "Connecte-toi avant de commander."
        );

        closeModal("cartModal");

        openAuth();

        return;
    }

    if(!getCartDetailed().length){

        showToast(
            "Ton panier est vide."
        );

        return;
    }

    appliedPromo = null;

    $("promoCode").value =
        "";

    $("promoResult").textContent =
        "";

    $("promoResult").className =
        "promo-result";

    $("checkoutForm").reset();

    updateCheckout();

    closeModal("cartModal");

    openModal("checkoutModal");

}


/* =========================================================
   COMMANDE
========================================================= */

function validateAddress(){

    const fullName =
        $("fullName").value.trim();

    const address =
        $("address").value.trim();

    const postal =
        $("postalCode").value.trim();

    const city =
        $("city").value.trim();

    const country =
        $("country").value;

    if(
        fullName.length < 2 ||
        address.length < 5 ||
        city.length < 2 ||
        !country
    ){
        return false;
    }

    if(
        country === "France" &&
        !/^\d{5}$/.test(postal)
    ){
        return false;
    }

    if(
        country !== "France" &&
        postal.length < 3
    ){
        return false;
    }

    return true;

}

function createOrder(){

    if(!currentUser){

        showToast(
            "Connexion nécessaire."
        );

        return;
    }

    if(!appliedPromo ||
       appliedPromo.discount !== 100){

        showToast(
            "Pour cette démo, le bouton est activé uniquement avec NOVA100."
        );

        return;
    }

    if(!validateAddress()){

        showToast(
            "Vérifie les informations de livraison."
        );

        return;
    }

    const items =
        getCartDetailed();

    if(!items.length){

        showToast(
            "Panier vide."
        );

        return;
    }

    const {
        subtotal,
        discount,
        total
    } =
        getCheckoutTotals();

    const number =
        "NOVA-" +
        new Date()
            .getFullYear() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2,8)
            .toUpperCase();

    const order = {

        id:
            crypto.randomUUID
                ? crypto.randomUUID()
                : String(Date.now()),

        number,

        uid:
            currentUser.uid,

        email:
            currentUser.email || "",

        customer:
            $("fullName")
                .value
                .trim(),

        address:{
            fullName:
                $("fullName")
                    .value
                    .trim(),

            address:
                $("address")
                    .value
                    .trim(),

            postalCode:
                $("postalCode")
                    .value
                    .trim(),

            city:
                $("city")
                    .value
                    .trim(),

            country:
                $("country")
                    .value
        },

        warehouse:
            "Entrepôt",

        date:
            new Intl.DateTimeFormat(
                "fr-FR",
                {
                    dateStyle:"medium",
                    timeStyle:"short"
                }
            ).format(new Date()),

        items:
            items.map(
                ({product,quantity})=>({
                    id:product.id,
                    name:product.name,
                    price:product.price,
                    quantity
                })
            ),

        subtotal,

        discount,

        promo:
            appliedPromo.code,

        total,

        paymentMethod:
            "Code promotionnel",

        status:
            "Commande enregistrée"

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

    updateCartCount();

    renderCart();

    closeModal("checkoutModal");

    renderOrders();

    showToast(
        `Commande ${order.number} enregistrée 🎉`
    );

    openInvoice(order);

}


/* =========================================================
   FACTURE
========================================================= */

function openInvoice(order){

    if(!order){
        return;
    }

    $("invoiceContent").innerHTML = `

        <div class="invoice">

            <div class="invoice-top">

                <div>
                    <div class="invoice-logo">
                        NOVASHOP
                    </div>

                    <div style="
                        margin-top:4px;
                        color:#666;
                        font-size:11px;
                    ">
                        Marketplace gaming & informatique
                    </div>
                </div>

                <div class="invoice-meta">

                    <strong>
                        FACTURE
                    </strong>

                    <br>

                    ${escapeHTML(order.number)}

                    <br>

                    ${escapeHTML(order.date)}

                </div>

            </div>

            <div class="invoice-block">

                <h4>Client</h4>

                <div style="font-size:13px">
                    ${escapeHTML(order.customer)}
                </div>

                <div style="
                    font-size:12px;
                    margin-top:3px;
                    color:#555;
                ">
                    ${escapeHTML(order.email)}
                </div>

            </div>

            <div class="invoice-block">

                <h4>Adresse de livraison</h4>

                <div style="font-size:12px;line-height:1.5">
                    ${escapeHTML(order.address.fullName)}
                    <br>
                    ${escapeHTML(order.address.address)}
                    <br>
                    ${escapeHTML(order.address.postalCode)}
                    ${escapeHTML(order.address.city)}
                    <br>
                    ${escapeHTML(order.address.country)}
                </div>

            </div>

            <div class="invoice-block">

                <h4>Entrepôt</h4>

                <div style="font-size:12px">
                    ${escapeHTML(order.warehouse)}
                </div>

            </div>

            <table class="invoice-table">

                <thead>

                    <tr>
                        <th>Produit</th>
                        <th>Qté</th>
                        <th>Prix</th>
                        <th>Total</th>
                    </tr>

                </thead>

                <tbody>

                    ${order.items.map(item=>`

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
                    <span>Sous-total</span>
                    <strong>
                        ${money(order.subtotal)}
                    </strong>
                </div>

                <div>
                    <span>
                        Réduction ${escapeHTML(order.promo)}
                    </span>

                    <strong>
                        - ${money(order.discount)}
                    </strong>
                </div>

                <div class="invoice-grand">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${money(order.total)}
                    </strong>

                </div>

            </div>

            <div class="invoice-block">

                <h4>Paiement</h4>

                <div style="font-size:12px">
                    ${escapeHTML(order.paymentMethod)}
                </div>

            </div>

            <div style="
                margin-top:30px;
                padding-top:15px;
                border-top:1px solid #ddd;
                color:#777;
                font-size:10px;
            ">
                Document généré par NovaShop.
                Cette interface ne constitue pas une preuve de
                paiement PayPal réel.
            </div>

        </div>
    `;

    openModal("invoiceModal");

}


/* =========================================================
   PARAMÈTRES
========================================================= */

function applySettings(){

    document.body.classList.toggle(
        "dark",
        settings.dark
    );

    $("darkSwitch")
        .classList.toggle(
            "active",
            settings.dark
        );

    $("soundSwitch")
        .classList.toggle(
            "active",
            settings.sound
        );

    $("languageSelect").value =
        settings.language;

}

function saveSettings(){

    saveJSON(
        STORAGE.settings,
        settings
    );

    applySettings();

}

function toggleDark(){

    settings.dark =
        !settings.dark;

    saveSettings();

}

function toggleSound(){

    settings.sound =
        !settings.sound;

    saveSettings();

    if(settings.sound){
        playClick();
    }

}


/* =========================================================
   ADMIN CODE
========================================================= */

function adminCodePrompt(){

    if(!currentUser){

        showToast(
            "Connecte-toi d'abord."
        );

        return;
    }

    if(!isAdmin()){

        showToast(
            "Ce compte n'a pas accès au dashboard."
        );

        return;
    }

    const unlocked =
        localStorage.getItem(
            STORAGE.adminUnlocked
        );

    if(unlocked === "true"){

        openDashboard();

        return;
    }

    const code =
        window.prompt(
            "Code dashboard NovaShop :"
        );

    if(code === ADMIN_CODE){

        localStorage.setItem(
            STORAGE.adminUnlocked,
            "true"
        );

        showToast(
            "Dashboard déverrouillé 🔐"
        );

        openDashboard();

    }else if(code !== null){

        showToast(
            "Code incorrect."
        );

    }

}


/* =========================================================
   SCROLL
========================================================= */

function scrollToProducts(){

    $("productsSection")
        .scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

}


/* =========================================================
   ÉVÉNEMENTS
========================================================= */

function setupEvents(){

    /*
       Logo
    */

    $("logoBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();

                currentCategory =
                    "Tous";

                currentSearch =
                    "";

                $("searchInput").value =
                    "";

                renderCategories();

                renderProducts();

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }
        );


    /*
       Recherche
    */

    $("searchBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();

                currentSearch =
                    $("searchInput")
                        .value
                        .trim();

                renderProducts();

                scrollToProducts();

            }
        );


    $("searchInput")
        .addEventListener(
            "keydown",
            event=>{

                if(event.key === "Enter"){

                    event.preventDefault();

                    $("searchBtn")
                        .click();

                }

            }
        );


    $("sortSelect")
        .addEventListener(
            "change",
            ()=>{
                playClick();
                renderProducts();
            }
        );


    /*
       Compte
    */

    $("accountBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                openAuth();
            }
        );


    $("heroAccountBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                openAuth();
            }
        );


    $("heroProductsBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                scrollToProducts();
            }
        );


    /*
       Panier
    */

    $("cartBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                renderCart();
                openModal("cartModal");
            }
        );


    $("clearCartBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();

                cart = [];

                saveJSON(
                    STORAGE.cart,
                    cart
                );

                renderCart();

                updateCartCount();

                showToast(
                    "Panier vidé."
                );

            }
        );


    $("checkoutBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                openCheckout();
            }
        );


    /*
       Auth
    */

    $("loginForm")
        .addEventListener(
            "submit",
            loginWithEmail
        );


    $("signupForm")
        .addEventListener(
            "submit",
            signup
        );


    $("googleBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                loginGoogle();
            }
        );


    $("loginTab")
        .addEventListener(
            "click",
            ()=>{
                $("loginTab")
                    .classList.add("active");

                $("signupTab")
                    .classList.remove("active");

                $("loginForm")
                    .style.display = "grid";

                $("signupForm")
                    .style.display = "none";

                setAuthMessage("");

            }
        );


    $("signupTab")
        .addEventListener(
            "click",
            ()=>{
                $("signupTab")
                    .classList.add("active");

                $("loginTab")
                    .classList.remove("active");

                $("signupForm")
                    .style.display = "grid";

                $("loginForm")
                    .style.display = "none";

                setAuthMessage("");

            }
        );


    /*
       Commandes
    */

    $("ordersBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();

                renderOrders();

                openModal("ordersModal");

            }
        );


    /*
       Dashboard
    */

    $("adminBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                adminCodePrompt();
            }
        );


    /*
       Settings
    */

    $("settingsBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                applySettings();
                openModal("settingsModal");
            }
        );


    $("darkSwitch")
        .addEventListener(
            "click",
            ()=>{
                toggleDark();
            }
        );


    $("soundSwitch")
        .addEventListener(
            "click",
            ()=>{
                toggleSound();
            }
        );


    $("languageSelect")
        .addEventListener(
            "change",
            ()=>{
                settings.language =
                    $("languageSelect").value;

                saveSettings();

                showToast(
                    settings.language === "fr"
                        ? "Français sélectionné."
                        : "English selected."
                );

            }
        );


    /*
       Promo
    */

    $("applyPromoBtn")
        .addEventListener(
            "click",
            ()=>{
                playClick();
                applyPromo();
            }
        );


    $("promoCode")
        .addEventListener(
            "keydown",
            event=>{

                if(event.key === "Enter"){

                    event.preventDefault();

                    $("applyPromoBtn")
                        .click();

                }

            }
        );


    /*
       Checkout
    */

    $("checkoutForm")
        .addEventListener(
            "input",
            updateCheckout
        );


    $("checkoutForm")
        .addEventListener(
            "change",
            updateCheckout
        );


    $("checkoutForm")
        .addEventListener(
            "submit",
            event=>{

                event.preventDefault();

                createOrder();

            }
        );


    /*
       Invoice
    */

    $("printInvoiceBtn")
        .addEventListener(
            "click",
            ()=>{
                window.print();
            }
        );


    /*
       Fermeture modales
    */

    document
        .querySelectorAll("[data-close]")
        .forEach(button=>{

            button.addEventListener(
                "click",
                ()=>{
                    playClick();

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    $("overlay")
        .addEventListener(
            "click",
            ()=>{
                closeAllModals();
            }
        );


    /*
       ESC
    */

    document.addEventListener(
        "keydown",
        event=>{

            if(event.key === "Escape"){

                closeAllModals();

            }

        }
    );


    /*
       Produits + panier
       Event delegation
    */

    document.addEventListener(
        "click",
        event=>{

            const actionButton =
                event.target.closest(
                    "[data-action]"
                );

            if(actionButton){

                const action =
                    actionButton.dataset.action;

                const id =
                    actionButton.dataset.id;

                playClick();

                if(action === "favorite"){

                    toggleFavorite(id);

                }

                if(action === "view"){

                    openProduct(id);

                }

                if(action === "add"){

                    addToCart(id);

                }

                return;
            }


            const plus =
                event.target.closest(
                    "[data-cart-plus]"
                );

            if(plus){

                playClick();

                changeQuantity(
                    plus.dataset.cartPlus,
                    1
                );

                return;
            }


            const minus =
                event.target.closest(
                    "[data-cart-minus]"
                );

            if(minus){

                playClick();

                changeQuantity(
                    minus.dataset.cartMinus,
                    -1
                );

                return;
            }


            const remove =
                event.target.closest(
                    "[data-cart-remove]"
                );

            if(remove){

                playClick();

                removeFromCart(
                    remove.dataset.cartRemove
                );

                return;
            }


            const invoiceButton =
                event.target.closest(
                    "[data-order-invoice]"
                );

            if(invoiceButton){

                const order =
                    orders.find(
                        item =>
                            item.id ===
                            invoiceButton.dataset.orderInvoice
                    );

                if(order){

                    playClick();

                    openInvoice(order);

                }

                return;
            }


            const adminInvoice =
                event.target.closest(
                    "[data-admin-invoice]"
                );

            if(adminInvoice){

                const order =
                    orders.find(
                        item =>
                            item.id ===
                            adminInvoice.dataset.adminInvoice
                    );

                if(order){

                    playClick();

                    openInvoice(order);

                }

            }

        }
    );

}


/* =========================================================
   AUTH STATE
========================================================= */

function setupAuth(){

    if(!firebaseReady){

        console.warn(
            "NovaShop : Firebase non disponible."
        );

        updateAuthUI();

        return;
    }

    onAuthStateChanged(
        auth,
        user=>{

            currentUser =
                user || null;

            updateAuthUI();

            if(
                currentUser &&
                isAdmin()
            ){

                const unlocked =
                    localStorage.getItem(
                        STORAGE.adminUnlocked
                    );

                if(unlocked === "true"){

                    /*
                       Le bouton apparaît.
                    */

                    $("adminBtn").style.display =
                        "block";

                }

            }

        }
    );

}


/* =========================================================
   BOOT
========================================================= */

function boot(){

    applySettings();

    renderCategories();

    renderProducts();

    renderCart();

    updateCartCount();

    setupEvents();

    setupAuth();

    console.log(
        "NovaShop chargé correctement."
    );

}

boot();
