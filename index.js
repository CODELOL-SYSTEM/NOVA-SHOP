"use strict";

/* =========================================================
   NOVASHOP
   index.js
   ========================================================= */


/* =========================================================
   PRODUITS
   ========================================================= */

const NOVASHOP_PRODUCTS = [

    /* =========================
       PROCESSEURS
    ========================= */

    {
        id: "cpu-9600x",
        name: "Ryzen 5 9600X",
        brand: "AMD",
        category: "Processeurs",
        price: 279.99,
        image: "https://cdn.idealo.com/folder/Product/204581/7/204581794/s4_produktbild_gross/amd-ryzen-5-9600x-boxed.jpg",
        description: "Processeur AMD Ryzen 5 9600X."
    },

    {
        id: "cpu-7800x3d",
        name: "Ryzen 7 7800X3D",
        brand: "AMD",
        category: "Processeurs",
        price: 349.99,
        image: "https://cdn.idealo.com/folder/Product/203222/0/203222084/s4_produktbild_gross/amd-ryzen-7-7800x3d-boxed.jpg",
        description: "Processeur gaming AMD Ryzen 7 avec technologie 3D V-Cache."
    },

    {
        id: "cpu-7700",
        name: "Ryzen 7 7700",
        brand: "AMD",
        category: "Processeurs",
        price: 269.99,
        image: "https://cdn.idealo.com/folder/Product/202909/8/202909836/s4_produktbild_gross/amd-ryzen-7-7700-boxed.jpg",
        description: "Processeur AMD Ryzen 7 pour PC gaming et polyvalent."
    },


    /* =========================
       CARTES GRAPHIQUES
    ========================= */

    {
        id: "gpu-5070",
        name: "GeForce RTX 5070",
        brand: "NVIDIA",
        category: "Cartes graphiques",
        price: 649.99,
        image: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphics-cards/50-series/rtx-5070-family/rtx-5070-graphics-card-2-1200x675.jpg",
        description: "Carte graphique NVIDIA GeForce RTX 5070."
    },

    {
        id: "gpu-5060ti",
        name: "GeForce RTX 5060 Ti",
        brand: "NVIDIA",
        category: "Cartes graphiques",
        price: 449.99,
        image: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphics-cards/50-series/rtx-5060-family/rtx-5060-ti-graphics-card-1200x675.jpg",
        description: "Carte graphique NVIDIA GeForce RTX 5060 Ti."
    },

    {
        id: "gpu-9060xt",
        name: "Radeon RX 9060 XT",
        brand: "AMD",
        category: "Cartes graphiques",
        price: 429.99,
        image: "https://www.amd.com/content/dam/amd/en/images/products/graphics/radeon-rx/9060-xt/amd-radeon-rx-9060-xt.jpg",
        description: "Carte graphique AMD Radeon RX 9060 XT."
    },


    /* =========================
       RAM
    ========================= */

    {
        id: "ram-corsair-32",
        name: "Vengeance RGB 32 Go DDR5-6000",
        brand: "Corsair",
        category: "RAM",
        price: 109.99,
        image: "https://cdn.idealo.com/folder/Product/212257/2/212257224/s4_produktbild_gross/corsair-vengeance-rgb-kit-32go-ddr5-6000-cl38-gris-cmh32gx5m2d6000z38.jpg",
        description: "Kit mémoire Corsair Vengeance RGB 32 Go DDR5."
    },

    {
        id: "ram-kingston-32",
        name: "FURY Beast RGB 32 Go DDR5-5600",
        brand: "Kingston",
        category: "RAM",
        price: 104.99,
        image: "https://cdn.idealo.com/folder/Product/202133/2/202133232/s4_produktbild_gross/kingston-fury-beast-rgb-32-go-kit-ddr5-5600-cl36-kf556c36bbeak2-32.jpg",
        description: "Kit Kingston FURY Beast RGB 32 Go."
    },

    {
        id: "ram-gskill-32",
        name: "Trident Z5 RGB 32 Go DDR5",
        brand: "G.Skill",
        category: "RAM",
        price: 129.99,
        image: "https://www.gskill.com/imgs/product_images/20211022172545.jpg",
        description: "Kit mémoire DDR5 G.Skill Trident Z5 RGB."
    },


    /* =========================
       SSD
    ========================= */

    {
        id: "ssd-990pro-1tb",
        name: "990 PRO 1 To",
        brand: "Samsung",
        category: "SSD",
        price: 99.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p1t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p1t0bw-538116922?$650_519_PNG$",
        description: "SSD NVMe Samsung 990 PRO 1 To."
    },

    {
        id: "ssd-990pro-2tb",
        name: "990 PRO 2 To",
        brand: "Samsung",
        category: "SSD",
        price: 179.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/fr/mz-v9p2t0bw/gallery/fr-990-pro-nvme-ssd-mz-v9p2t0bw-538116939?$650_519_PNG$",
        description: "SSD NVMe Samsung 990 PRO 2 To."
    },

    {
        id: "ssd-wd-sn850x",
        name: "WD_BLACK SN850X 1 To",
        brand: "WD",
        category: "SSD",
        price: 89.99,
        image: "https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/product-overview/internal-drives/wd-black-sn850x-nvme-ssd/product-overview-wd-black-sn850x-nvme-ssd.pdf",
        description: "SSD NVMe WD_BLACK SN850X."
    },


    /* =========================
       ALIMENTATIONS
    ========================= */

    {
        id: "psu-rm850x",
        name: "RM850x",
        brand: "Corsair",
        category: "Alimentations",
        price: 149.99,
        image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020270-NA/Gallery/RM850x_01.webp",
        description: "Alimentation Corsair RM850x 850 W."
    },

    {
        id: "psu-rm750e",
        name: "RM750e",
        brand: "Corsair",
        category: "Alimentations",
        price: 109.99,
        image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/PSUs/CP-9020262-NA/Gallery/RM750e_01.webp",
        description: "Alimentation Corsair RM750e."
    },


    /* =========================
       BOÎTIERS
    ========================= */

    {
        id: "case-5000d",
        name: "5000D Airflow",
        brand: "Corsair",
        category: "Boîtiers",
        price: 149.99,
        image: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024/products/Cases/CC-9011210-WW/Gallery/5000D_AF_WHITE_01.webp",
        description: "Boîtier Corsair 5000D Airflow."
    },

    {
        id: "case-nzxt-h6",
        name: "H6 Flow",
        brand: "NZXT",
        category: "Boîtiers",
        price: 109.99,
        image: "https://nzxt.com/assets/cms/34299/1685727156-h6-flow-rgb-white-hero.png",
        description: "Boîtier NZXT H6 Flow."
    },

    {
        id: "case-fractal-north",
        name: "North",
        brand: "Fractal Design",
        category: "Boîtiers",
        price: 139.99,
        image: "https://www.fractal-design.com/app/uploads/2022/12/North_Charcoal_Black_TG_Clear_Top-Down.png",
        description: "Boîtier Fractal Design North."
    },


    /* =========================
       REFROIDISSEMENT
    ========================= */

    {
        id: "cooling-lf3",
        name: "Liquid Freezer III 360",
        brand: "ARCTIC",
        category: "Refroidissement",
        price: 119.99,
        image: "https://www.arctic.de/media/17/9c/4f/1712927838/liquid-freezer-III-360-black-gallery-1.png",
        description: "Watercooling AIO 360 mm ARCTIC."
    },

    {
        id: "cooling-peerless",
        name: "Peerless Assassin 120 SE",
        brand: "Thermalright",
        category: "Refroidissement",
        price: 44.99,
        image: "https://www.thermalright.com/wp-content/uploads/2022/09/PA120SE-Black-1.jpg",
        description: "Ventirad double tour Thermalright."
    },


    /* =========================
       ÉCRANS
    ========================= */

    {
        id: "monitor-g6",
        name: "Odyssey OLED G6",
        brand: "Samsung",
        category: "Écrans",
        price: 699.99,
        image: "https://images.samsung.com/is/image/samsung/p6pim/fr/ls27dg602suxen/gallery/fr-odyssey-oled-g6-g60sd-ls27dg602suxen-541415717?$650_519_PNG$",
        description: "Écran gaming Samsung Odyssey OLED G6."
    },

    {
        id: "monitor-lg-27",
        name: "UltraGear 27GR83Q",
        brand: "LG",
        category: "Écrans",
        price: 449.99,
        image: "https://www.lg.com/content/dam/channel/wcms/fr/images/moniteurs/27gr83q-b_aeu/picture/image1.jpg",
        description: "Écran gaming LG UltraGear."
    },

    {
        id: "monitor-aoc",
        name: "Q27G4",
        brand: "AOC",
        category: "Écrans",
        price: 249.99,
        image: "https://aoc.com/assets/Products/Monitors/Q27G4/Q27G4_Front.png",
        description: "Écran gaming AOC 27 pouces."
    },


    /* =========================
       CLAVIERS
    ========================= */

    {
        id: "keyboard-prox",
        name: "G PRO X TKL",
        brand: "Logitech",
        category: "Claviers",
        price: 189.99,
        image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/pro-x-tkl-wireless/gallery/pro-x-tkl-wireless-black-gallery-1.png",
        description: "Clavier gaming Logitech G PRO X TKL."
    },

    {
        id: "keyboard-g915",
        name: "G915 LIGHTSPEED",
        brand: "Logitech",
        category: "Claviers",
        price: 179.99,
        image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/keyboards/g915/gallery/g915-gallery-1-black.png",
        description: "Clavier gaming sans fil Logitech G915."
    },


    /* =========================
       SOURIS
    ========================= */

    {
        id: "mouse-superlight2",
        name: "G PRO X SUPERLIGHT 2",
        brand: "Logitech",
        category: "Souris",
        price: 159.99,
        image: "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/logitech/en/products/mice/pro-x2-superlight-wireless-mouse/gallery/pro-x2-superlight-black-gallery-1.png",
        description: "Souris gaming Logitech G PRO X SUPERLIGHT 2."
    },

    {
        id: "mouse-viper-v3",
        name: "Viper V3 Pro",
        brand: "Razer",
        category: "Souris",
        price: 179.99,
        image: "https://assets2.razerzone.com/images/pnx.assets/6e2c6f9e4f8f4a9d9c3d5e0c7b5c4d1f/viper-v3-pro-black.png",
        description: "Souris gaming sans fil Razer Viper V3 Pro."
    },


    /* =========================
       MICROPHONES
    ========================= */

    {
        id: "mic-wave3",
        name: "Wave:3",
        brand: "Elgato",
        category: "Microphones",
        price: 159.99,
        image: "https://help.elgato.com/hc/article_attachments/360093559172/Wave_3.png",
        description: "Microphone USB Elgato Wave:3."
    },

    {
        id: "mic-solos",
        name: "SoloCast",
        brand: "HyperX",
        category: "Microphones",
        price: 59.99,
        image: "https://hyperx.com/cdn/shop/products/hyperx-solocast-usb-microphone-black-1.jpg",
        description: "Microphone USB HyperX SoloCast."
    },


    /* =========================
       MANETTES
    ========================= */

    {
        id: "controller-dualsense",
        name: "DualSense Wireless Controller",
        brand: "Sony",
        category: "Manettes",
        price: 74.99,
        image: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-ps5-controller-product-thumbnail-01-en-14sep21?$1600px$",
        description: "Manette sans fil Sony DualSense."
    },

    {
        id: "controller-xbox",
        name: "Xbox Wireless Controller",
        brand: "Microsoft",
        category: "Manettes",
        price: 59.99,
        image: "https://assets.xbox.com/xbox-one/controller/gallery/black/1.png",
        description: "Manette sans fil Xbox."
    }

];


/* =========================================================
   OUTILS
   ========================================================= */

function money(value) {

    return new Intl.NumberFormat(
        "fr-FR",
        {
            style: "currency",
            currency: "EUR"
        }
    ).format(value);

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function getProduct(id) {

    return NOVASHOP_PRODUCTS.find(
        product => product.id === id
    );

}


/* =========================================================
   ETAT
   ========================================================= */

const state = {

    search: "",

    category: "Tous",

    brand: "Tous",

    sort: "featured",

    page: 1,

    perPage: 12,

    cart: JSON.parse(
        localStorage.getItem("novashop_cart") || "[]"
    ),

    favorites: JSON.parse(
        localStorage.getItem("novashop_favorites") || "[]"
    )

};


/* =========================================================
   DOM
   ========================================================= */

const grid =
    document.getElementById("productsGrid");

const resultText =
    document.getElementById("resultText");

const emptyState =
    document.getElementById("emptyState");

const pagination =
    document.getElementById("pagination");

const searchInput =
    document.getElementById("searchInput");

const brandFilter =
    document.getElementById("brandFilter");

const sortSelect =
    document.getElementById("sortSelect");

const cartCount =
    document.getElementById("cartCount");

const cartDrawer =
    document.getElementById("cartDrawer");

const favoritesDrawer =
    document.getElementById("favoritesDrawer");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const favoriteItems =
    document.getElementById("favoriteItems");

const cartTotal =
    document.getElementById("cartTotal");

const productModal =
    document.getElementById("productModal");

const modalContent =
    document.getElementById("modalContent");

const toast =
    document.getElementById("toast");


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "novashop_cart",
        JSON.stringify(state.cart)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "novashop_favorites",
        JSON.stringify(state.favorites)
    );

}


/* =========================================================
   FILTRAGE
   ========================================================= */

function filteredProducts() {

    let list = [
        ...NOVASHOP_PRODUCTS
    ];


    if (state.search.trim()) {

        const search =
            state.search
                .toLowerCase()
                .trim();

        list = list.filter(
            product =>

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.brand
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search)

        );

    }


    if (
        state.category !== "Tous"
    ) {

        list = list.filter(
            product =>
                product.category ===
                state.category
        );

    }


    if (
        state.brand !== "Tous"
    ) {

        list = list.filter(
            product =>
                product.brand ===
                state.brand
        );

    }


    if (
        state.sort === "priceAsc"
    ) {

        list.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (
        state.sort === "priceDesc"
    ) {

        list.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (
        state.sort === "name"
    ) {

        list.sort(
            (a, b) =>
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

function createCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    card.dataset.productId =
        product.id;


    const favorite =
        state.favorites.includes(
            product.id
        );


    card.innerHTML = `

        <div class="product-image">

            <button
                class="favorite-button ${favorite ? "active" : ""}"
                data-favorite="${escapeHTML(product.id)}"
                type="button"
                aria-label="Favori"
            >
                ${favorite ? "♥" : "♡"}
            </button>

            <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="this.style.display='none';"
            >

        </div>

        <div class="product-info">

            <div class="product-brand">
                ${escapeHTML(product.brand)}
            </div>

            <div class="product-name">
                ${escapeHTML(product.name)}
            </div>

            <div class="product-category">
                ${escapeHTML(product.category)}
            </div>

            <div class="product-bottom">

                <div class="product-price">
                    ${money(product.price)}
                </div>

                <button
                    class="add-button"
                    data-add="${escapeHTML(product.id)}"
                    type="button"
                >
                    Ajouter
                </button>

            </div>

        </div>
    `;


    return card;

}


function renderProducts() {

    const list =
        filteredProducts();


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                list.length /
                state.perPage
            )
        );


    if (
        state.page >
        totalPages
    ) {

        state.page =
            totalPages;

    }


    const start =
        (state.page - 1) *
        state.perPage;


    const visible =
        list.slice(
            start,
            start + state.perPage
        );


    grid.innerHTML = "";


    resultText.textContent =
        `${list.length} produit${list.length > 1 ? "s" : ""}`;


    if (!visible.length) {

        emptyState.classList.remove(
            "hidden"
        );

        pagination.innerHTML = "";

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    visible.forEach(
        product => {

            grid.appendChild(
                createCard(product)
            );

        }
    );


    renderPagination(
        totalPages
    );

}


/* =========================================================
   PAGINATION
   ========================================================= */

function renderPagination(
    totalPages
) {

    pagination.innerHTML = "";


    if (
        totalPages <= 1
    ) {

        return;

    }


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "page";


        if (
            i === state.page
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            i;


        button.type =
            "button";


        button.addEventListener(
            "click",
            () => {

                state.page = i;

                renderProducts();

                document
                    .getElementById(
                        "productsSection"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


        pagination.appendChild(
            button
        );

    }

}


/* =========================================================
   PANIER
   ========================================================= */

function addToCart(id) {

    const product =
        getProduct(id);


    if (!product) {

        return;

    }


    const existing =
        state.cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        state.cart.push({
            id: id,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    updateCartCount();

    showToast(
        "Produit ajouté au panier"
    );

}


function removeFromCart(id) {

    state.cart =
        state.cart.filter(
            item =>
                item.id !== id
        );


    saveCart();

    renderCart();

    updateCartCount();

}


function changeQuantity(
    id,
    amount
) {

    const item =
        state.cart.find(
            cartItem =>
                cartItem.id === id
        );


    if (!item) {

        return;

    }


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

        removeFromCart(id);

        return;

    }


    saveCart();

    renderCart();

    updateCartCount();

}


function renderCart() {

    if (
        !state.cart.length
    ) {

        cartItems.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Ton panier est vide
                </h3>

                <p>
                    Ajoute des produits pour commencer.
                </p>

            </div>

        `;


        cartTotal.textContent =
            money(0);

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    state.cart.forEach(
        item => {

            const product =
                getProduct(item.id);


            if (!product) {

                return;

            }


            total +=
                product.price *
                item.quantity;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-image">

                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >

                </div>

                <div class="cart-info">

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <div class="cart-price">
                        ${money(product.price)}
                    </div>

                    <div class="quantity">

                        <button
                            data-minus="${escapeHTML(product.id)}"
                            type="button"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-plus="${escapeHTML(product.id)}"
                            type="button"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-button"
                        data-remove="${escapeHTML(product.id)}"
                        type="button"
                    >
                        Supprimer
                    </button>

                </div>

            `;


            cartItems.appendChild(
                element
            );

        }
    );


    cartTotal.textContent =
        money(total);

}


function updateCartCount() {

    const total =
        state.cart.reduce(
            (
                sum,
                item
            ) =>
                sum +
                item.quantity,
            0
        );


    cartCount.textContent =
        total;

}


/* =========================================================
   FAVORIS
   ========================================================= */

function toggleFavorite(id) {

    const index =
        state.favorites.indexOf(
            id
        );


    if (
        index === -1
    ) {

        state.favorites.push(id);

        showToast(
            "Ajouté aux favoris ♥"
        );

    } else {

        state.favorites.splice(
            index,
            1
        );

        showToast(
            "Retiré des favoris"
        );

    }


    saveFavorites();

    renderProducts();

    renderFavorites();

}


function renderFavorites() {

    if (
        !state.favorites.length
    ) {

        favoriteItems.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    ♡
                </div>

                <h3>
                    Aucun favori
                </h3>

                <p>
                    Tes produits favoris apparaîtront ici.
                </p>

            </div>

        `;

        return;

    }


    favoriteItems.innerHTML = "";


    state.favorites.forEach(
        id => {

            const product =
                getProduct(id);


            if (!product) {

                return;

            }


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "favorite-item";


            element.innerHTML = `

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                >

                <div class="favorite-info">

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${money(product.price)}
                    </small>

                    <div class="favorite-actions">

                        <button
                            data-fav-add="${escapeHTML(product.id)}"
                            type="button"
                        >
                            Ajouter
                        </button>

                        <button
                            data-fav-remove="${escapeHTML(product.id)}"
                            type="button"
                        >
                            Retirer
                        </button>

                    </div>

                </div>

            `;


            favoriteItems.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   MODAL PRODUIT
   ========================================================= */

function openProduct(id) {

    const product =
        getProduct(id);


    if (!product) {

        return;

    }


    modalContent.innerHTML = `

        <div class="modal-image">

            <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
            >

        </div>

        <div class="modal-info">

            <small>
                ${escapeHTML(product.brand)}
            </small>

            <h2>
                ${escapeHTML(product.name)}
            </h2>

            <p>
                ${escapeHTML(product.description)}
            </p>

            <div class="modal-price">
                ${money(product.price)}
            </div>

            <button
                class="modal-add"
                data-modal-add="${escapeHTML(product.id)}"
                type="button"
            >
                Ajouter au panier
            </button>

        </div>

    `;


    productModal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    productModal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}


/* =========================================================
   DRAWERS
   ========================================================= */

function openDrawer(drawer) {

    drawer.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeDrawers() {

    cartDrawer.classList.remove(
        "active"
    );

    favoritesDrawer.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   EVENEMENTS PRODUITS
   ========================================================= */

grid.addEventListener(
    "click",
    event => {

        const favorite =
            event.target.closest(
                "[data-favorite]"
            );


        if (favorite) {

            toggleFavorite(
                favorite.dataset.favorite
            );

            return;

        }


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


        const card =
            event.target.closest(
                ".product-card"
            );


        if (!card) {

            return;

        }


        openProduct(
            card.dataset.productId
        );

    }
);


/* =========================================================
   EVENEMENTS PANIER
   ========================================================= */

cartItems.addEventListener(
    "click",
    event => {

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

        }

    }
);


/* =========================================================
   EVENEMENTS FAVORIS
   ========================================================= */

favoriteItems.addEventListener(
    "click",
    event => {

        const add =
            event.target.closest(
                "[data-fav-add]"
            );


        if (add) {

            addToCart(
                add.dataset.favAdd
            );

            return;

        }


        const remove =
            event.target.closest(
                "[data-fav-remove]"
            );


        if (remove) {

            toggleFavorite(
                remove.dataset.favRemove
            );

        }

    }
);


/* =========================================================
   MODAL EVENTS
   ========================================================= */

modalContent.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-modal-add]"
            );


        if (!button) {

            return;

        }


        addToCart(
            button.dataset.modalAdd
        );

        closeModal();

    }
);


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            productModal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   HEADER EVENTS
   ========================================================= */

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        () => {

            renderCart();

            openDrawer(
                cartDrawer
            );

        }
    );


document
    .getElementById("favoritesBtn")
    .addEventListener(
        "click",
        () => {

            renderFavorites();

            openDrawer(
                favoritesDrawer
            );

        }
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeDrawers
    );


document
    .getElementById("closeFavorites")
    .addEventListener(
        "click",
        closeDrawers
    );


overlay.addEventListener(
    "click",
    closeDrawers
);


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


/* =========================================================
   RECHERCHE
   ========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        state.search =
            searchInput.value;

        state.page = 1;

        renderProducts();

    }
);


/* =========================================================
   CATEGORIES
   ========================================================= */

document
    .querySelectorAll(
        ".category"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".category"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    state.category =
                        button.dataset.category;


                    state.page = 1;


                    renderProducts();

                }
            );

        }
    );


/* =========================================================
   MARQUES
   ========================================================= */

const brands = [
    ...new Set(
        NOVASHOP_PRODUCTS.map(
            product =>
                product.brand
        )
    )
].sort(
    (a, b) =>
        a.localeCompare(
            b,
            "fr"
        )
);


brands.forEach(
    brand => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            brand;


        option.textContent =
            brand;


        brandFilter.appendChild(
            option
        );

    }
);


brandFilter.addEventListener(
    "change",
    () => {

        state.brand =
            brandFilter.value;

        state.page = 1;

        renderProducts();

    }
);


/* =========================================================
   TRI
   ========================================================= */

sortSelect.addEventListener(
    "change",
    () => {

        state.sort =
            sortSelect.value;

        state.page = 1;

        renderProducts();

    }
);


/* =========================================================
   RESET
   ========================================================= */

document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        () => {

            state.search = "";

            state.category =
                "Tous";

            state.brand =
                "Tous";

            state.sort =
                "featured";

            state.page =
                1;


            searchInput.value =
                "";

            brandFilter.value =
                "Tous";

            sortSelect.value =
                "featured";


            document
                .querySelectorAll(
                    ".category"
                )
                .forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.category ===
                            "Tous"
                        );

                    }
                );


            renderProducts();

        }
    );


/* =========================================================
   HERO
   ========================================================= */

document
    .getElementById("heroButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "productsSection"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================================
   COMPTE
   ========================================================= */

document
    .getElementById("accountBtn")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "account.html";

        }
    );


/* =========================================================
   CHECKOUT
   ========================================================= */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (
                !state.cart.length
            ) {

                showToast(
                    "Ton panier est vide"
                );

                return;

            }


            window.location.href =
                "account.html";

        }
    );


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeDrawers();

            closeModal();

        }

    }
);


/* =========================================================
   EXPORT GLOBAL
   ========================================================= */

window.NovaShop = {

    products:
        NOVASHOP_PRODUCTS,

    state,

    getProduct,

    addToCart,

    removeFromCart,

    changeQuantity,

    toggleFavorite,

    renderProducts,

    renderCart,

    renderFavorites,

    openProduct

};


/* =========================================================
   INITIALISATION
   ========================================================= */

renderProducts();

renderCart();

renderFavorites();

updateCartCount();

console.log(
    "NovaShop chargé avec succès.",
    NOVASHOP_PRODUCTS.length,
    "produits"
);
