// ============================================================
// NOVASHOP - APP.JS (version corrigée + FR/EN)
// Firebase Auth + Firestore + Catalogue + Commandes + Admin
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================================================
// FIREBASE
// ============================================================

const firebaseConfig = {
  apiKey:"AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain:"novashop-4ee63.firebaseapp.com",
  projectId:"novashop-4ee63",
  storageBucket:"novashop-4ee63.firebasestorage.app",
  messagingSenderId:"1044964015809",
  appId:"1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId:"G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";
const TEST_CARD_STORAGE_KEY = "novaTestCard";
const LANG_KEY = "novaLang";


// ============================================================
// TRADUCTIONS FR / EN
// ============================================================

const I18N = {

  fr:{
    // --- HTML statique ---
    searchPlaceholder:"Rechercher un produit...",
    titleSettings:"Paramètres",
    titleAccount:"Compte",
    titleOrders:"Commandes",
    titleAdmin:"Administration",
    titleCart:"Panier",
    titleLang:"Changer de langue",
    heroTitle:"Bienvenue sur <span>NovaShop</span>",
    heroText:"Composants PC, périphériques gaming, smartphones, écrans, accessoires et bien plus.",
    heroCart:"🛒 Voir mon panier",
    heroDiscover:"Découvrir les produits",
    products:"Produits",
    sortDefault:"Trier par défaut",
    sortAsc:"Prix croissant",
    sortDesc:"Prix décroissant",
    sortName:"Nom A-Z",
    sortNew:"Nouveautés",
    whyTitle:"Pourquoi NovaShop ?",
    f1t:"⚡ Catalogue gaming",
    f1p:"Retrouvez composants PC, périphériques, écrans, consoles et accessoires.",
    f2t:"🛒 Panier simple",
    f2p:"Ajoutez vos produits et gérez facilement les quantités directement depuis le panier.",
    f3t:"🔐 Compte",
    f3p:"Connectez-vous avec votre compte NovaShop pour retrouver vos informations.",
    f4t:"📦 Commandes",
    f4p:"Retrouvez vos commandes et leur statut depuis votre espace personnel.",
    reviewsTitle:"Avis clients",
    r1:"Catalogue clair et produits faciles à trouver.",
    r2:"Le panier est rapide et simple à utiliser.",
    r3:"Bonne présentation des produits et des catégories.",
    returnsTitle:"Retours & informations",
    returnsText:`Pour toute question concernant une commande, contactez NovaShop via l'adresse : <strong style="display:inline">helpy.nova.sh0p@gmail.com</strong>`,
    faqTitle:"FAQ",
    q1:"Comment ajouter un produit au panier ?",
    a1:"Cliquez simplement sur le bouton Ajouter au panier depuis la fiche du produit.",
    q2:"Comment modifier la quantité ?",
    a2:"Ouvrez votre panier puis utilisez les boutons + et -.",
    q3:"Comment retrouver mes commandes ?",
    a3:"Utilisez le bouton 📦 dans l'en-tête.",
    q4:"Comment contacter NovaShop ?",
    a4:"Vous pouvez contacter NovaShop à helpy.nova.sh0p@gmail.com.",
    myCart:"Mon panier",
    total:"Total",
    checkout:"Commander",
    footerTag:"Gaming • PC • Tech",

    // --- Catalogue ---
    prodOne:"{n} produit",
    prodMany:"{n} produits",
    noProduct:"Aucun produit trouvé",
    noProductHint:"Essaie une autre recherche ou une autre catégorie.",
    newBadge:"NOUVEAU",
    favLabel:"Favori",
    view:"Voir",
    add:"🛒 Ajouter",
    favRemoved:"Retiré des favoris.",
    favAdded:"Ajouté aux favoris ❤️",
    productNotFound:"Produit introuvable.",
    addedCart:"Produit ajouté au panier 🛒",
    cartEmpty:"Ton panier est vide",
    cartEmptyHint:"Ajoute des produits pour commencer.",
    addCart:"🛒 Ajouter au panier",
    favAdd:"Ajouter aux favoris",
    favRemove:"Retirer des favoris",

    // --- Auth ---
    loginTitle:"Connexion",
    email:"Email",
    password:"Mot de passe",
    signIn:"Se connecter",
    createAccount:"Créer un compte",
    createMyAccount:"Créer mon compte",
    haveAccount:"J'ai déjà un compte",
    loginOk:"Connexion réussie 👋",
    registerOk:"Compte créé avec succès 🎉",
    myAccount:"Mon compte",
    connectedAccount:"👤 Compte connecté",
    myOrders:"📦 Mes commandes",
    logout:"🚪 Se déconnecter",
    logoutOk:"Déconnexion réussie.",
    authInvalidCred:"Email ou mot de passe incorrect.",
    authInvalidEmail:"Adresse email invalide.",
    authEmailUsed:"Cette adresse email est déjà utilisée.",
    authWeak:"Le mot de passe est trop faible.",
    authNoUser:"Compte introuvable.",
    authWrongPwd:"Mot de passe incorrect.",
    authTooMany:"Trop de tentatives. Réessaie plus tard.",
    authGeneric:"Une erreur est survenue.",

    // --- Commandes ---
    ordersLogin:"Connecte-toi pour voir tes commandes.",
    ordersTitle:"Mes commandes",
    ordersLoading:"Chargement des commandes...",
    ordersFail:"Impossible de charger les commandes.",
    noOrders:"Aucune commande",
    noOrdersHint:"Tes commandes apparaîtront ici.",
    orderWord:"Commande",
    statusLbl:"Statut",
    deliveryWord:"Livraison",
    trackingWord:"Suivi",
    seeDetail:"📦 Voir le détail",
    currentStatus:"Statut actuel",
    destination:"📍 Destination :",
    estDelivery:"🚚 Livraison estimée :",
    trackingLine:"🔎 Suivi :",
    deliveryLine:"🚚 Livraison :",
    orderTracking:"Suivi de la commande",
    productsWord:"Produits",
    addressMissing:"Adresse non renseignée",
    seeInvoice:"🧾 Voir la facture",
    backOrders:"← Retour aux commandes",
    productWord:"Produit",

    // --- Checkout ---
    checkoutTitle:"Finaliser la commande",
    cartEmptyToast:"Ton panier est vide 🛒",
    loginToOrder:"Connecte-toi pour commander.",
    firstName:"Prénom",
    lastName:"Nom",
    firstNamePh:"Ton prénom",
    lastNamePh:"Ton nom",
    address:"Adresse de livraison",
    addressPh:"Adresse complète",
    subtotal:"Sous-total",
    payMethod:"Mode de paiement",
    paypal:"🅿️ PayPal",
    card:"💳 Carte bancaire",
    continue:"Continuer",
    paypalInfo:"Tu seras redirigé vers PayPal pour effectuer le paiement.",
    cardInfoTitle:"💳 Informations de carte",
    cardNumber:"Numéro de carte",
    cardHolder:"Nom sur la carte",
    expiry:"Expiration",
    cardHint:"Entre les informations de la carte créée depuis l'administration.",
    errFirst:"Indique ton prénom.",
    errLast:"Indique ton nom.",
    errAddr:"Indique ton adresse de livraison.",
    errPay:"Choisis un moyen de paiement.",
    creating:"Création...",
    errAmount:"Le montant de la commande est invalide.",
    errNoCard:"Aucune carte n'a été créée dans l'administration.",
    errCardWrong:"Les informations de carte sont incorrectes.",
    errEmptyCart:"Le panier est vide.",
    orderCreated:"Commande #{id} créée 🎉",
    errorPrefix:"Erreur : ",
    unknown:"inconnue",

    // --- Facture ---
    invoiceTitle:"Facture NovaShop",
    invoice:"FACTURE",
    gameShop:"Boutique gaming",
    client:"Client",
    qty:"Qté",
    price:"Prix",
    invoiceBlocked:"La fenêtre de facture a été bloquée.",

    // --- Admin ---
    adminDenied:"Accès administrateur refusé.",
    adminCodePrompt:"Code administrateur NovaShop :",
    adminCodeWrong:"Code administrateur incorrect.",
    adminTitle:"Administration NovaShop",
    loading:"Chargement...",
    adminFirestoreErr:"Erreur Firestore :",
    adminHeader:"🛡️ Administration",
    ordCountOne:"{n} commande",
    ordCountMany:"{n} commandes",
    cardTitle:"💳 Carte",
    cardOnly:"Carte utilisable uniquement sur NovaShop.",
    refresh:"🔄 Actualiser",
    quitAdmin:"🔐 Quitter admin",
    nameMissing:"Nom non renseigné",
    unknownWord:"Inconnu",
    cityPh:"Ville de destination",
    trackingPh:"Numéro de suivi",
    deliveryPh:"Livraison estimée",
    save:"💾 Enregistrer",
    markPaid:"💰 Marquer payé",
    invoiceBtn:"🧾 Facture",
    del:"🗑️ Supprimer",
    adminClosed:"Mode admin fermé.",
    updated:"Commande mise à jour ✅",
    paidMarked:"Paiement marqué comme payé 💰",
    confirmDelete:"Supprimer définitivement cette commande ?",
    deleted:"Commande supprimée 🗑️",
    generateCard:"✨ Générer une carte",
    regenerateCard:"🔁 Régénérer une carte",
    cardNone:"Aucune carte générée.",
    cardNumberLbl:"Numéro",
    cardHolderLbl:"Titulaire",
    cardGenerated:"Carte générée ✅",

    // --- Paramètres ---
    settingsTitle:"⚙️ Paramètres",
    appearance:"Apparence",
    dark:"🌙 Mode sombre",
    light:"☀️ Mode clair",
    darkOn:"Mode sombre activé.",
    lightOn:"Mode clair activé.",
    language:"Langue",
    version:"Version actuelle de NovaShop.",
    langChanged:"Langue : Français",

    // --- Init ---
    loadErr:"❌ Erreur de chargement",
    loadErrText:"Les produits n'ont pas pu être chargés.",
    errWord:"Erreur",
    unknownErr:"Erreur inconnue"
  },

  en:{
    searchPlaceholder:"Search for a product...",
    titleSettings:"Settings",
    titleAccount:"Account",
    titleOrders:"Orders",
    titleAdmin:"Administration",
    titleCart:"Cart",
    titleLang:"Change language",
    heroTitle:"Welcome to <span>NovaShop</span>",
    heroText:"PC components, gaming peripherals, smartphones, monitors, accessories and much more.",
    heroCart:"🛒 View my cart",
    heroDiscover:"Discover our products",
    products:"Products",
    sortDefault:"Default sorting",
    sortAsc:"Price: low to high",
    sortDesc:"Price: high to low",
    sortName:"Name A-Z",
    sortNew:"New arrivals",
    whyTitle:"Why NovaShop?",
    f1t:"⚡ Gaming catalog",
    f1p:"Find PC components, peripherals, monitors, consoles and accessories.",
    f2t:"🛒 Simple cart",
    f2p:"Add your products and easily manage quantities right from the cart.",
    f3t:"🔐 Account",
    f3p:"Sign in with your NovaShop account to find your information.",
    f4t:"📦 Orders",
    f4p:"Find your orders and their status from your personal area.",
    reviewsTitle:"Customer reviews",
    r1:"Clear catalog and products that are easy to find.",
    r2:"The cart is fast and simple to use.",
    r3:"Nice presentation of products and categories.",
    returnsTitle:"Returns & information",
    returnsText:`For any question about an order, contact NovaShop at: <strong style="display:inline">helpy.nova.sh0p@gmail.com</strong>`,
    faqTitle:"FAQ",
    q1:"How do I add a product to my cart?",
    a1:"Simply click the Add to cart button on the product page.",
    q2:"How do I change the quantity?",
    a2:"Open your cart then use the + and - buttons.",
    q3:"How do I find my orders?",
    a3:"Use the 📦 button in the header.",
    q4:"How do I contact NovaShop?",
    a4:"You can contact NovaShop at helpy.nova.sh0p@gmail.com.",
    myCart:"My cart",
    total:"Total",
    checkout:"Checkout",
    footerTag:"Gaming • PC • Tech",

    prodOne:"{n} product",
    prodMany:"{n} products",
    noProduct:"No product found",
    noProductHint:"Try another search or another category.",
    newBadge:"NEW",
    favLabel:"Favorite",
    view:"View",
    add:"🛒 Add",
    favRemoved:"Removed from favorites.",
    favAdded:"Added to favorites ❤️",
    productNotFound:"Product not found.",
    addedCart:"Product added to cart 🛒",
    cartEmpty:"Your cart is empty",
    cartEmptyHint:"Add products to get started.",
    addCart:"🛒 Add to cart",
    favAdd:"Add to favorites",
    favRemove:"Remove from favorites",

    loginTitle:"Sign in",
    email:"Email",
    password:"Password",
    signIn:"Sign in",
    createAccount:"Create an account",
    createMyAccount:"Create my account",
    haveAccount:"I already have an account",
    loginOk:"Signed in successfully 👋",
    registerOk:"Account created successfully 🎉",
    myAccount:"My account",
    connectedAccount:"👤 Signed-in account",
    myOrders:"📦 My orders",
    logout:"🚪 Sign out",
    logoutOk:"Signed out successfully.",
    authInvalidCred:"Incorrect email or password.",
    authInvalidEmail:"Invalid email address.",
    authEmailUsed:"This email address is already in use.",
    authWeak:"The password is too weak.",
    authNoUser:"Account not found.",
    authWrongPwd:"Incorrect password.",
    authTooMany:"Too many attempts. Please try again later.",
    authGeneric:"Something went wrong.",

    ordersLogin:"Sign in to see your orders.",
    ordersTitle:"My orders",
    ordersLoading:"Loading orders...",
    ordersFail:"Unable to load orders.",
    noOrders:"No orders",
    noOrdersHint:"Your orders will appear here.",
    orderWord:"Order",
    statusLbl:"Status",
    deliveryWord:"Delivery",
    trackingWord:"Tracking",
    seeDetail:"📦 View details",
    currentStatus:"Current status",
    destination:"📍 Destination:",
    estDelivery:"🚚 Estimated delivery:",
    trackingLine:"🔎 Tracking:",
    deliveryLine:"🚚 Delivery:",
    orderTracking:"Order tracking",
    productsWord:"Products",
    addressMissing:"No address provided",
    seeInvoice:"🧾 View invoice",
    backOrders:"← Back to orders",
    productWord:"Product",

    checkoutTitle:"Complete your order",
    cartEmptyToast:"Your cart is empty 🛒",
    loginToOrder:"Sign in to place an order.",
    firstName:"First name",
    lastName:"Last name",
    firstNamePh:"Your first name",
    lastNamePh:"Your last name",
    address:"Delivery address",
    addressPh:"Full address",
    subtotal:"Subtotal",
    payMethod:"Payment method",
    paypal:"🅿️ PayPal",
    card:"💳 Bank card",
    continue:"Continue",
    paypalInfo:"You will be redirected to PayPal to complete the payment.",
    cardInfoTitle:"💳 Card details",
    cardNumber:"Card number",
    cardHolder:"Name on card",
    expiry:"Expiry",
    cardHint:"Enter the details of the card created from the administration.",
    errFirst:"Enter your first name.",
    errLast:"Enter your last name.",
    errAddr:"Enter your delivery address.",
    errPay:"Choose a payment method.",
    creating:"Creating...",
    errAmount:"The order amount is invalid.",
    errNoCard:"No card has been created in the administration.",
    errCardWrong:"The card details are incorrect.",
    errEmptyCart:"The cart is empty.",
    orderCreated:"Order #{id} created 🎉",
    errorPrefix:"Error: ",
    unknown:"unknown",

    invoiceTitle:"NovaShop Invoice",
    invoice:"INVOICE",
    gameShop:"Gaming shop",
    client:"Customer",
    qty:"Qty",
    price:"Price",
    invoiceBlocked:"The invoice window was blocked.",

    adminDenied:"Administrator access denied.",
    adminCodePrompt:"NovaShop administrator code:",
    adminCodeWrong:"Incorrect administrator code.",
    adminTitle:"NovaShop Administration",
    loading:"Loading...",
    adminFirestoreErr:"Firestore error:",
    adminHeader:"🛡️ Administration",
    ordCountOne:"{n} order",
    ordCountMany:"{n} orders",
    cardTitle:"💳 Card",
    cardOnly:"Card usable only on NovaShop.",
    refresh:"🔄 Refresh",
    quitAdmin:"🔐 Exit admin",
    nameMissing:"Name not provided",
    unknownWord:"Unknown",
    cityPh:"Destination city",
    trackingPh:"Tracking number",
    deliveryPh:"Estimated delivery",
    save:"💾 Save",
    markPaid:"💰 Mark as paid",
    invoiceBtn:"🧾 Invoice",
    del:"🗑️ Delete",
    adminClosed:"Admin mode closed.",
    updated:"Order updated ✅",
    paidMarked:"Payment marked as paid 💰",
    confirmDelete:"Permanently delete this order?",
    deleted:"Order deleted 🗑️",
    generateCard:"✨ Generate a card",
    regenerateCard:"🔁 Generate a new card",
    cardNone:"No card generated.",
    cardNumberLbl:"Number",
    cardHolderLbl:"Holder",
    cardGenerated:"Card generated ✅",

    settingsTitle:"⚙️ Settings",
    appearance:"Appearance",
    dark:"🌙 Dark mode",
    light:"☀️ Light mode",
    darkOn:"Dark mode enabled.",
    lightOn:"Light mode enabled.",
    language:"Language",
    version:"Current version of NovaShop.",
    langChanged:"Language: English",

    loadErr:"❌ Loading error",
    loadErrText:"Products could not be loaded.",
    errWord:"Error",
    unknownErr:"Unknown error"
  }

};

// Catégories (affichage seulement, les valeurs internes restent en français)
const CAT_EN = {
  "Toutes":"All",
  "Composants":"Components",
  "PC Gamer":"Gaming PCs",
  "Casques":"Headsets",
  "Claviers":"Keyboards",
  "Souris":"Mice",
  "Stockage":"Storage",
  "Alimentations":"Power supplies",
  "Boîtiers":"Cases",
  "Refroidissement":"Cooling",
  "Écrans":"Monitors",
  "Streaming":"Streaming",
  "Manettes":"Controllers",
  "Chaises gaming":"Gaming chairs",
  "Bureaux gaming":"Gaming desks",
  "Microphones":"Microphones",
  "Éclairage RGB":"RGB lighting",
  "Cartes graphiques":"Graphics cards",
  "Smartphones":"Smartphones",
  "Imprimantes 3D":"3D printers",
  "Logiciels & licences":"Software & licenses",
  "Accessoires composants PC":"PC component accessories",
  "Adaptateurs / câbles / chargeurs":"Adapters / cables / chargers",
  "Caméras & webcams":"Cameras & webcams"
};

// Statuts (stockés en français dans Firestore, affichés selon la langue)
const STATUS_EN = {
  "Enregistrée":"Registered",
  "Acceptée":"Accepted",
  "Préparation":"Preparing",
  "En transit":"In transit",
  "Livraison proche":"Out for delivery",
  "Livrée":"Delivered",
  "Annulée":"Cancelled",
  "Remboursement en cours":"Refund in progress",
  "Payé":"Paid",
  "En attente":"Pending"
};

// Options produits (affichage seulement)
const OPTION_EN = {
  "Couleur":"Color",
  "Rouge":"Red",
  "Blanc":"White",
  "Noir":"Black",
  "Bleu":"Blue"
};

let lang = "fr";

try{

  const savedLang = localStorage.getItem(LANG_KEY);

  if(savedLang && I18N[savedLang]){
    lang = savedLang;
  }

}catch(error){
  lang = "fr";
}


function t(key, vars = {}){

  let text =
    I18N[lang]?.[key] ??
    I18N.fr[key] ??
    key;

  Object.keys(vars).forEach(name => {
    text = text.split(`{${name}}`).join(vars[name]);
  });

  return text;

}

function catLabel(category){
  return lang === "en" ? (CAT_EN[category] || category) : category;
}

function statusLabel(status){
  return lang === "en" ? (STATUS_EN[status] || status) : status;
}

function optionLabel(text){

  if(lang !== "en" || !text){
    return text || "";
  }

  return String(text)
    .split(" | ")
    .map(part =>
      part
        .split(": ")
        .map(word => OPTION_EN[word] || word)
        .join(": ")
    )
    .join(" | ");

}

function paymentLabel(method){

  if(method === "paypal"){
    return "PayPal";
  }

  if(method === "card"){
    return lang === "en" ? "Card" : "Carte";
  }

  return method || "N/A";

}


// ============================================================
// PRODUITS
// ============================================================

const products = [

  { id:"p1", name:"Gigabyte B650 AORUS Elite AX", category:"Composants", price:189.99, image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg" },
  { id:"p2", name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5", category:"PC Gamer", price:2237.65, image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png" },
  { id:"p3", name:"HyperX Cloud II", category:"Casques", price:49.99, image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756" },
  { id:"p4", name:"TECORS Clavier Gamer Mécanique 60% AZERTY", category:"Claviers", price:30, image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg" },
  { id:"p5", name:"Clavier Magnétique 65% Celshading Noir", category:"Claviers", price:120.90, image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832" },
  { id:"p6", name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse", category:"Souris", price:49.99, image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif" },
  { id:"p7", name:"Logitech G PRO X2 Superstrike Blanc et Noir", category:"Souris", price:150.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg" },
  { id:"p8", name:"Samsung 990 PRO 1TB", category:"Stockage", price:249.99, image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg" },
  { id:"p9", name:"Samsung 990 PRO 2TB", category:"Stockage", price:199.93, image:"https://pc.comparer.fr/500x500/310191422.webp" },
  { id:"p10", name:"CORSAIR RM1000x EU", category:"Alimentations", price:159.90, image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp" },
  { id:"p11", name:"CORSAIR RM850x EU", category:"Alimentations", price:134.90, image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp" },
  { id:"p12", name:"Corsair Frame 5000D RS ARGB Noir", category:"Boîtiers", price:159.90, image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg" },
  { id:"p13", name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black", category:"Refroidissement", price:129.90, image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg" },
  { id:"p14", name:"Samsung 27 QD-OLED Odyssey G6", category:"Écrans", price:399.95, image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg" },
  { id:"p15", name:"ELGATO Wave Mic Arm Pro", category:"Streaming", price:229.90, image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg" },
  { id:"p16", name:"Sony DualSense PS5/PC", category:"Manettes", price:74.90, image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg", options:{ Couleur:["Rouge","Blanc","Noir","Bleu"] } },
  { id:"p17", name:"ASUS TUF Gaming B650-PLUS", category:"Composants", price:179.90, image:"https://media.materiel.net/r550/products/MN0005986139.jpg" },
  { id:"p18", name:"MSI MAG B650 Tomahawk WiFi", category:"Composants", price:189.90, image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg" },
  { id:"p19", name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms", category:"Écrans", price:74.99, image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg" },
  { id:"p20", name:'iiyama 23.8" LED - G-Master GB2471HS-B1 Red Eagle', category:"Écrans", price:65.99, image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg" },
  { id:"p21", name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise", category:"Chaises gaming", price:129.99, image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg" },
  { id:"p22", name:"Dowinx Série Luxe Suède LS-66D68E Blanc", category:"Chaises gaming", price:79.99, image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220" },
  { id:"p23", name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds", category:"Chaises gaming", price:109.99, image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg" },
  { id:"p24", name:"Desk Lite - Height-Adjustable Desk", category:"Bureaux gaming", price:110.99, image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928" },
  { id:"p25", name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile", category:"Bureaux gaming", price:86.99, image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg" },
  { id:"p26", name:"Bureau gaming d’angle HOMCOM réversible support écran", category:"Bureaux gaming", price:44.99, image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg" },
  { id:"p27", name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque", category:"Casques", price:99.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg" },
  { id:"p28", name:"Razer BlackShark V2 Pro 2023 Noir", category:"Casques", price:75.99, image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg" },
  { id:"p29", name:"beyerdynamic DT-990 Pro 250 Ohm", category:"Casques", price:60.99, image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg" },
  { id:"p30", name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY", category:"Claviers", price:78.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg" },
  { id:"p31", name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap", category:"Claviers", price:56.99, image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537" },
  { id:"p32", name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé", category:"Claviers", price:91.99, image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg" },
  { id:"p33", name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI", category:"Souris", price:26.99, image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg" },
  { id:"p34", name:"HyperX QuadCast 2 – Microphone USB – RGB", category:"Microphones", price:98.99, image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608" },
  { id:"p35", name:"Shure SM7 dB", category:"Microphones", price:121.99, image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg" }

];

products.push(

  { id:"p36", name:"Razer Seiren V3 Chroma Noir", category:"Microphones", price:13.99, image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg" },
  { id:"p37", name:"Stairville LED Pixel Rail 40 RGB MKII", category:"Éclairage RGB", price:18.90, image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg" },
  { id:"p38", name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter", category:"Éclairage RGB", price:8, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg" },
  { id:"p39", name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu", category:"Éclairage RGB", price:91.10, image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp" },
  { id:"p40", name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G", category:"Cartes graphiques", price:147, image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg" },
  { id:"p41", name:"MSI GeForce RTX 3050 LP E 6G OC", category:"Cartes graphiques", price:100, image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w" },
  { id:"p42", name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6", category:"Cartes graphiques", price:140, image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg" },
  { id:"p43", name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD", category:"PC Gamer", price:650, image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg", new:true },
  { id:"p44", name:'Apple iPhone 14 Pro 6,1" 5G Double SIM 128 Go Argent', category:"Smartphones", price:400, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg" },
  { id:"p45", name:'Apple iPhone 15 6,1" 5G Double SIM 128 Go Noir', category:"Smartphones", price:750, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg" },
  { id:"p46", name:'Apple iPhone 16 6,1" 5G 128 Go Double SIM Noir', category:"Smartphones", price:949.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg" },
  { id:"p47", name:'Apple iPhone 17 6,3" 5G Double SIM 256 Go Noir', category:"Smartphones", price:1000, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg" },
  { id:"p48", name:'Apple iPhone 18 Pro 6,3" 5G Double SIM 256 Go Noir', category:"Smartphones", price:1199.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-256-Go-Noir.jpg" },
  { id:"p49", name:'Samsung Galaxy S23 6,1" 5G 8 Go RAM 256 Go Noir', category:"Smartphones", price:230, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg" },
  { id:"p50", name:'Samsung Galaxy S24 6,2" 5G 256 Go Noir', category:"Smartphones", price:449.90, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg" },
  { id:"p51", name:'Samsung Galaxy S25 Edge 6,7" 5G 256 Go Noir absolu Titane', category:"Smartphones", price:469.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg" },
  { id:"p52", name:'Samsung Galaxy S26 6,3" 5G 256 Go Noir + Buds4 Noir', category:"Smartphones", price:650.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg" },
  { id:"p53", name:'Google Pixel 8 6,2" 5G Double SIM 128 Go Vert Sauge', category:"Smartphones", price:200, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg" },
  { id:"p54", name:'Google Pixel 9 6,3" 5G Double nano-SIM 128 Go Noir Obsidienne', category:"Smartphones", price:400, image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Smartphone-Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg" },
  { id:"p56", name:"Flashforge Adventurer 5M Pro", category:"Imprimantes 3D", price:115, image:"https://www.makershop.fr/cdn/shop/files/13458.jpg?v=1760745366&width=150" },
  { id:"p57", name:"Elegoo Centauri 2", category:"Imprimantes 3D", price:200, image:"https://fr.elegoo.com/cdn/shop/files/C2-_-260811.jpg?crop=center&v=1786696280&width=345" },
  { id:"p58", name:"Anycubic Photon P1 Max", category:"Imprimantes 3D", price:600, image:"https://fr.anycubic.com/cdn/shop/files/P1M_8bd4d344-b751-4497-a535-4e647ecef572.jpg?v=1784100048&width=150" },
  { id:"p59", name:"GTA VI Key PlayStation", category:"Logiciels & licences", price:69.99, image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm" },
  { id:"p60", name:"Microsoft Windows 11 Pro Key", category:"Logiciels & licences", price:24.99, image:"https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZicFhzSm8y/NjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw" },
  { id:"p61", name:"AsiaHorse Aurora-CO Gaines de Câble ARGB", category:"Accessoires composants PC", price:15.99, image:"https://m.media-amazon.com/images/I/71NF0H-6FXL._SL1500_.jpg" },
  { id:"p62", name:"Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir", category:"Adaptateurs / câbles / chargeurs", price:12.99, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/db/90/4a/21663963/1540-1/tsp20260909104107/Cable-video-Accsup-HDMI-2-0-4K-UHD-avec-Ethernet-5-m-Noir.jpg" },
  { id:"p63", name:"Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz", category:"Adaptateurs / câbles / chargeurs", price:19.99, image:"https://m.media-amazon.com/images/I/71BeNtX7nuL._SL1500_.jpg" },
  { id:"p64", name:"Câble USB-C ESSENTIELB vers USB-C 1M Noir", category:"Adaptateurs / câbles / chargeurs", price:1, image:"https://boulanger.scene7.com/is/image/Boulanger/3497674179939_h_f_l_2?wid=2140&hei=2140&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha" },
  { id:"p65", name:"Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR", category:"Adaptateurs / câbles / chargeurs", price:1, image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTbZBP9B2ZFpEsUD0AvNVwSq0_B-6_0GsDu3IetIMN8RMZJ2lyTDuYx7bb9GPIQjXhISHbaR4aEk-SzagBrynePs6wAuNpNgtJ3t4ZQj0FS9_oBKzFpPBG7Q" },
  { id:"p66", name:"Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc", category:"Adaptateurs / câbles / chargeurs", price:1, image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/b8/07/17283238/1540-1/tsp20260617130730/Cable-USB-C-vers-Lightning-pour-Apple-iPhone-iPad-iPod-1m-Blanc.jpg" },
  { id:"p67", name:"BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M", category:"Adaptateurs / câbles / chargeurs", price:2.99, image:"https://m.media-amazon.com/images/I/61rGkIZqqCL._SL1500_.jpg" },
  { id:"p68", name:"StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13", category:"Adaptateurs / câbles / chargeurs", price:4.50, image:"https://m.media-amazon.com/images/I/81b1fyIWcOL._AC_SL1500_.jpg" },
  { id:"p69", name:"Unicavu Webcam PC 2K 30 FPS Full HD 1080P", category:"Caméras & webcams", price:10, image:"https://m.media-amazon.com/images/I/61CJsbKfonL._AC_SL1500_.jpg" },
  { id:"p70", name:"eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones", category:"Caméras & webcams", price:23.99, image:"https://m.media-amazon.com/images/I/61bCeQBjUwL._AC_SL1500_.jpg" }

);


// ============================================================
// ETAT
// ============================================================

let currentUser = null;
let cart = loadStorage("nova_cart", []);
let favorites = loadStorage("nova_favorites", []);

const state = {
  search:"",
  category:"Toutes",
  sort:"default"
};


// ============================================================
// DOM
// ============================================================

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const categoriesContainer = $("categories");
const productGrid = $("productGrid");
const productCount = $("productCount");
const cartBtn = $("cartBtn");
const heroCartBtn = $("heroCartBtn");
const cartBadge = $("cartBadge");
const cartDrawer = $("cartDrawer");
const overlay = $("overlay");
const closeCartBtn = $("closeCart");
const cartItems = $("cartItems");
const cartTotal = $("cartTotal");
const checkoutBtn = $("checkoutBtn");
const settingsBtn = $("settingsBtn");
const accountBtn = $("accountBtn");
const ordersBtn = $("ordersBtn");
const adminBtn = $("adminBtn");
const langBtn = $("langBtn");
const modal = $("modalLayer");
const modalTitle = $("modalTitle");
const modalContent = $("modalContent");
const modalClose = $("modalClose");
const toastElement = $("toast");


// ============================================================
// STORAGE
// ============================================================

function loadStorage(key, fallback){

  try{

    const value = localStorage.getItem(key);

    if(!value){
      return fallback;
    }

    return JSON.parse(value);

  }catch(error){

    console.error("Storage error:", error);
    return fallback;

  }

}

function saveStorage(key, value){

  try{
    localStorage.setItem(key, JSON.stringify(value));
  }catch(error){
    console.error("Storage save error:", error);
  }

}

function saveCart(){
  saveStorage("nova_cart", cart);
}

function saveFavorites(){
  saveStorage("nova_favorites", favorites);
}


// ============================================================
// UTILITAIRES
// ============================================================

function money(value){

  const number = Number(value);

  return (
    Number.isFinite(number) ? number : 0
  ).toLocaleString(
    lang === "en" ? "en-GB" : "fr-FR",
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  ) + " €";

}

function escapeHTML(value){

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

function escapeAttr(value){
  return escapeHTML(value);
}

function getProduct(id){
  return products.find(product => product.id === id);
}

function toast(message, type = "info"){

  if(!toastElement){
    console.log(message);
    return;
  }

  toastElement.textContent = message;
  toastElement.className = `toast ${type}`;
  toastElement.classList.add("show");

  clearTimeout(toastElement._timer);

  toastElement._timer = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 3000);

}


// ============================================================
// LANGUE
// ============================================================

function applyStaticTranslations(){

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-title]").forEach(element => {
    element.title = t(element.dataset.i18nTitle);
  });

  if(langBtn){
    langBtn.textContent = `🌐 ${lang.toUpperCase()}`;
  }

}

function setLanguage(newLang){

  if(!I18N[newLang]){
    return;
  }

  lang = newLang;

  try{
    localStorage.setItem(LANG_KEY, lang);
  }catch(error){
    console.error("Lang save error:", error);
  }

  applyStaticTranslations();
  renderCategories();
  renderProducts();
  renderCart();
  updateAccountButton();

}

function toggleLanguage(){

  setLanguage(lang === "fr" ? "en" : "fr");

  closeModal();

  toast(t("langChanged"), "success");

}

langBtn?.addEventListener("click", toggleLanguage);


// ============================================================
// IMAGE PRODUIT
// ============================================================

function productImageHTML(product){

  if(!product?.image){
    return "";
  }

  return `
    <img
      src="${escapeAttr(product.image)}"
      alt="${escapeAttr(product.name)}"
      loading="lazy"
      onerror="this.onerror=null;this.style.display='none';"
    >
  `;

}


// ============================================================
// CATEGORIES
// ============================================================

function getCategories(){

  return [
    "Toutes",
    ...new Set(products.map(product => product.category))
  ];

}

function renderCategories(){

  if(!categoriesContainer){
    return;
  }

  categoriesContainer.innerHTML =
    getCategories()
      .map(category => `
        <button
          type="button"
          class="category-btn ${state.category === category ? "active" : ""}"
          data-category="${escapeAttr(category)}"
        >
          ${escapeHTML(catLabel(category))}
        </button>
      `)
      .join("");

  categoriesContainer
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        state.category = button.dataset.category || "Toutes";

        renderCategories();
        renderProducts();

      });

    });

}


// ============================================================
// FILTRAGE
// ============================================================

function getFilteredProducts(){

  let result = [...products];

  const search = state.search.trim().toLowerCase();

  if(search){

    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      catLabel(product.category).toLowerCase().includes(search)
    );

  }

  if(state.category !== "Toutes"){
    result = result.filter(product => product.category === state.category);
  }

  if(state.sort === "price-asc"){
    result.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if(state.sort === "price-desc"){
    result.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if(state.sort === "name"){
    result.sort((a, b) => a.name.localeCompare(b.name, lang));
  }

  if(state.sort === "new"){
    result.sort((a, b) => Number(Boolean(b.new)) - Number(Boolean(a.new)));
  }

  return result;

}


// ============================================================
// PRODUITS
// ============================================================

function renderProducts(){

  if(!productGrid){
    return;
  }

  const result = getFilteredProducts();

  if(productCount){

    productCount.textContent =
      t(result.length > 1 ? "prodMany" : "prodOne", { n:result.length });

  }

  if(!result.length){

    productGrid.innerHTML = `

      <div style="grid-column:1/-1;text-align:center;padding:50px 20px;">

        <div style="font-size:50px;margin-bottom:15px;">🔎</div>

        <h3>${escapeHTML(t("noProduct"))}</h3>

        <p style="opacity:.65;margin-top:8px;">
          ${escapeHTML(t("noProductHint"))}
        </p>

      </div>

    `;

    return;

  }

  productGrid.innerHTML =
    result.map(product => {

      const isFavorite = favorites.includes(product.id);

      return `

        <article class="product" data-id="${escapeAttr(product.id)}">

          <div class="product-img">

            ${
              product.new
                ? `<span class="product-badge">${escapeHTML(t("newBadge"))}</span>`
                : ""
            }

            <button
              type="button"
              class="favorite-btn ${isFavorite ? "active" : ""}"
              data-favorite="${escapeAttr(product.id)}"
              aria-label="${escapeAttr(t("favLabel"))}"
            >
              ${isFavorite ? "♥" : "♡"}
            </button>

            ${productImageHTML(product)}

          </div>

          <div class="product-body">

            <div class="product-category">
              ${escapeHTML(catLabel(product.category))}
            </div>

            <h3>${escapeHTML(product.name)}</h3>

            <div class="price">${money(product.price)}</div>

            <div class="product-actions">

              <button
                type="button"
                class="view-btn product-view"
                data-id="${escapeAttr(product.id)}"
              >
                ${escapeHTML(t("view"))}
              </button>

              <button
                type="button"
                class="add-btn product-add"
                data-id="${escapeAttr(product.id)}"
              >
                ${escapeHTML(t("add"))}
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

  productGrid.querySelectorAll(".product-add").forEach(button => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });

  productGrid.querySelectorAll(".product-view").forEach(button => {
    button.addEventListener("click", () => openProduct(button.dataset.id));
  });

  productGrid.querySelectorAll(".favorite-btn").forEach(button => {

    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleFavorite(button.dataset.favorite);
    });

  });

}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(id){

  if(!id){
    return;
  }

  if(favorites.includes(id)){

    favorites = favorites.filter(item => item !== id);

    toast(t("favRemoved"));

  }else{

    favorites.push(id);

    toast(t("favAdded"), "success");

  }

  saveFavorites();
  renderProducts();

}


// ============================================================
// PANIER
// ============================================================

function getCartCount(){

  return cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

}

function getCartSubtotal(){

  return cart.reduce((total, item) => {

    const product = getProduct(item.id);

    if(!product){
      return total;
    }

    return total + Number(product.price || 0) * Number(item.quantity || 1);

  }, 0);

}

function addToCart(id, option = ""){

  const product = getProduct(id);

  if(!product){
    toast(t("productNotFound"), "error");
    return;
  }

  const existing = cart.find(item => item.id === id && item.option === option);

  if(existing){

    existing.quantity = Number(existing.quantity || 1) + 1;

  }else{

    cart.push({ id, option, quantity:1 });

  }

  saveCart();
  renderCart();

  toast(t("addedCart"), "success");

}

function removeFromCart(id, option = ""){

  cart = cart.filter(item => !(item.id === id && item.option === option));

  saveCart();
  renderCart();

}

function changeCartQuantity(id, option, quantity){

  const item = cart.find(entry => entry.id === id && entry.option === option);

  if(!item){
    return;
  }

  item.quantity = Math.max(1, Number(quantity) || 1);

  saveCart();
  renderCart();

}

function renderCart(){

  const count = getCartCount();

  if(cartBadge){

    cartBadge.textContent = String(count);
    cartBadge.style.display = count > 0 ? "grid" : "none";

  }

  if(cartTotal){
    cartTotal.textContent = money(getCartSubtotal());
  }

  if(!cartItems){
    return;
  }

  if(!cart.length){

    cartItems.innerHTML = `

      <div class="nova-empty" style="text-align:center;padding:40px 10px;">

        <div class="nova-empty-icon" style="font-size:50px;">🛒</div>

        <h3>${escapeHTML(t("cartEmpty"))}</h3>

        <p style="margin-top:8px;opacity:.65;">
          ${escapeHTML(t("cartEmptyHint"))}
        </p>

      </div>

    `;

    return;

  }

  cartItems.innerHTML =
    cart.map(item => {

      const product = getProduct(item.id);

      if(!product){
        return "";
      }

      return `

        <div class="cart-item" data-id="${escapeAttr(item.id)}">

          <div class="cart-item-img">
            ${productImageHTML(product)}
          </div>

          <div class="cart-item-info">

            <h4>${escapeHTML(product.name)}</h4>

            ${
              item.option
                ? `<small>${escapeHTML(optionLabel(item.option))}</small>`
                : ""
            }

            <div class="cart-item-price">${money(product.price)}</div>

            <div class="cart-item-controls qty">

              <button
                type="button"
                class="cart-minus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >−</button>

              <span>${Number(item.quantity || 1)}</span>

              <button
                type="button"
                class="cart-plus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >+</button>

              <button
                type="button"
                class="cart-remove"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >🗑️</button>

            </div>

          </div>

        </div>

      `;

    }).join("");

  cartItems.querySelectorAll(".cart-minus").forEach(button => {

    button.addEventListener("click", () => {

      const id = button.dataset.id;
      const option = button.dataset.option || "";

      const item = cart.find(entry => entry.id === id && entry.option === option);

      if(!item){
        return;
      }

      const quantity = Number(item.quantity || 1);

      if(quantity <= 1){
        removeFromCart(id, option);
      }else{
        changeCartQuantity(id, option, quantity - 1);
      }

    });

  });

  cartItems.querySelectorAll(".cart-plus").forEach(button => {

    button.addEventListener("click", () => {

      const id = button.dataset.id;
      const option = button.dataset.option || "";

      const item = cart.find(entry => entry.id === id && entry.option === option);

      if(item){
        changeCartQuantity(id, option, Number(item.quantity || 1) + 1);
      }

    });

  });

  cartItems.querySelectorAll(".cart-remove").forEach(button => {

    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id, button.dataset.option || "");
    });

  });

}


// ============================================================
// PANIER OUVERTURE / FERMETURE
// ============================================================

function openCart(){
  cartDrawer?.classList.add("open");
  overlay?.classList.add("open");
}

function closeCart(){
  cartDrawer?.classList.remove("open");
  overlay?.classList.remove("open");
}

cartBtn?.addEventListener("click", openCart);
heroCartBtn?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);


// ============================================================
// MODAL
// ============================================================

function showModal(title, content){

  if(modalTitle){
    modalTitle.textContent = title;
  }

  if(modalContent){
    modalContent.innerHTML = content;
  }

  modal?.classList.add("open");

}

function closeModal(){
  modal?.classList.remove("open");
}

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", event => {

  if(event.target === modal){
    closeModal();
  }

});


// ============================================================
// PRODUIT (FICHE)
// ============================================================

function openProduct(id){

  const product = getProduct(id);

  if(!product){
    return;
  }

  let optionsHTML = "";

  if(product.options){

    Object.entries(product.options).forEach(([name, values]) => {

      optionsHTML += `

        <label for="option-${escapeAttr(name)}">
          ${escapeHTML(OPTION_EN[name] && lang === "en" ? OPTION_EN[name] : name)}
        </label>

        <select
          id="option-${escapeAttr(name)}"
          class="product-option"
          data-option-name="${escapeAttr(name)}"
        >

          ${values.map(value => `
            <option value="${escapeAttr(value)}">
              ${escapeHTML(lang === "en" ? (OPTION_EN[value] || value) : value)}
            </option>
          `).join("")}

        </select>

      `;

    });

  }

  showModal(
    product.name,
    `

      <div class="product-modal">

        <div class="product-modal-image">
          ${productImageHTML(product)}
        </div>

        <div>

          <div class="product-category">
            ${escapeHTML(catLabel(product.category))}
          </div>

          <h2>${escapeHTML(product.name)}</h2>

          <div class="price">${money(product.price)}</div>

          ${
            optionsHTML
              ? `<div style="margin-top:18px;display:grid;gap:8px;">${optionsHTML}</div>`
              : ""
          }

          <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">

            <button
              type="button"
              class="add-btn"
              id="modalAddCart"
              style="flex:1;min-width:170px;"
            >
              ${escapeHTML(t("addCart"))}
            </button>

            <button
              type="button"
              class="view-btn"
              id="modalFavorite"
              style="flex:1;min-width:170px;"
            >
              ❤️ ${escapeHTML(favorites.includes(product.id) ? t("favRemove") : t("favAdd"))}
            </button>

          </div>

        </div>

      </div>

    `
  );

  $("modalAddCart")?.addEventListener("click", () => {

    const selected =
      Array.from(document.querySelectorAll(".product-option"))
        .map(select => `${select.dataset.optionName}: ${select.value}`)
        .join(" | ");

    addToCart(product.id, selected);

  });

  $("modalFavorite")?.addEventListener("click", () => {

    toggleFavorite(product.id);
    closeModal();

  });

}


// ============================================================
// RECHERCHE / TRI
// ============================================================

searchInput?.addEventListener("input", event => {

  state.search = event.target.value || "";

  renderProducts();

});

sortSelect?.addEventListener("change", event => {

  state.sort = event.target.value || "default";

  renderProducts();

});


// ============================================================
// STYLES INJECTÉS
// ============================================================

function injectNovaStyles(){

  if(document.getElementById("novaInjectedStyles")){
    return;
  }

  const style = document.createElement("style");

  style.id = "novaInjectedStyles";

  style.textContent = `

    .view-btn,
    .add-btn,
    .category-btn,
    .payment-choice{
      cursor:pointer;
      border:1px solid var(--line);
      border-radius:10px;
      padding:10px 14px;
      font-weight:700;
      transition:.2s ease;
    }

    .view-btn:hover,
    .add-btn:hover,
    .category-btn:hover,
    .payment-choice:hover{
      transform:translateY(-1px);
    }

    .add-btn{
      background:#2d8cff;
      color:#fff;
      border-color:#2d8cff;
    }

    .view-btn{
      background:rgba(255,255,255,.06);
      color:var(--text);
    }

    .category-btn{
      flex:0 0 auto;
      background:var(--card);
      color:var(--text);
      border-radius:999px;
      font-size:13px;
    }

    .category-btn.active,
    .payment-choice.selected{
      background:#2d8cff;
      color:#fff;
      border-color:#2d8cff;
    }

    .product-actions{
      display:flex;
      gap:8px;
    }

    .product-actions button{
      flex:1;
    }

    .product-badge{
      position:absolute;
      top:10px;
      left:10px;
      z-index:2;
      padding:5px 8px;
      border-radius:8px;
      background:#25d695;
      color:#04110c;
      font-size:11px;
      font-weight:900;
    }

    .favorite-btn{
      position:absolute;
      top:10px;
      right:10px;
      z-index:3;
      width:34px;
      height:34px;
      border-radius:50%;
      border:1px solid rgba(0,0,0,.12);
      background:rgba(255,255,255,.9);
      color:#111;
      cursor:pointer;
      font-size:19px;
    }

    .favorite-btn.active{
      color:#ff3d71;
    }

    .product-img{
      height:165px !important;
      padding:12px !important;
    }

    .product-img img{
      width:100%;
      height:100%;
      max-width:100%;
      max-height:100%;
      object-fit:contain;
    }

    .product-body{
      padding:13px;
    }

    .product h3{
      font-size:14px;
      min-height:58px;
    }

    .price{
      font-size:19px;
      font-weight:900;
      margin-top:10px;
    }

    .cart-item-info small{
      display:block;
      opacity:.65;
      margin-top:3px;
    }

    @media(max-width:520px){

      .product-img{
        height:190px !important;
      }

      .product-actions{
        flex-direction:column;
      }

    }

  `;

  document.head.appendChild(style);

}

function injectNovaButtonStyles(){

  if(document.getElementById("novaButtonStyles")){
    return;
  }

  const style = document.createElement("style");

  style.id = "novaButtonStyles";

  style.textContent = `

    button{
      -webkit-tap-highlight-color:transparent;
    }

    #heroCartBtn,
    .view-btn,
    .add-btn{
      cursor:pointer;
      transition:transform .18s ease, filter .18s ease, opacity .18s ease;
    }

    #heroCartBtn:hover,
    .view-btn:hover,
    .add-btn:hover{
      transform:translateY(-1px);
      filter:brightness(1.08);
    }

    #heroCartBtn:active,
    .view-btn:active,
    .add-btn:active{
      transform:translateY(0);
    }

    button:disabled{
      cursor:not-allowed !important;
      opacity:.55 !important;
      transform:none !important;
    }

    .payment-choice.selected{
      border-color:#2d8cff !important;
      background:rgba(45,140,255,.12) !important;
      box-shadow:0 0 0 2px rgba(45,140,255,.12);
    }

    .theme-choice,
    .lang-choice{
      transition:transform .15s ease, border-color .15s ease;
    }

    .theme-choice:hover,
    .lang-choice:hover{
      transform:translateY(-1px);
    }

  `;

  document.head.appendChild(style);

}

injectNovaStyles();
injectNovaButtonStyles();


// ============================================================
// AUTH
// ============================================================

function authError(error){

  const messages = {
    "auth/invalid-credential":"authInvalidCred",
    "auth/invalid-email":"authInvalidEmail",
    "auth/email-already-in-use":"authEmailUsed",
    "auth/weak-password":"authWeak",
    "auth/user-not-found":"authNoUser",
    "auth/wrong-password":"authWrongPwd",
    "auth/too-many-requests":"authTooMany"
  };

  const key = messages[error?.code || ""];

  return key ? t(key) : (error?.message || t("authGeneric"));

}

function showLoginForm(){

  showModal(
    t("loginTitle"),
    `

      <form id="loginForm">

        <label for="loginEmail">${escapeHTML(t("email"))}</label>

        <input
          id="loginEmail"
          type="email"
          autocomplete="email"
          required
          placeholder="you@email.com"
        >

        <label for="loginPassword" style="display:block;margin-top:12px;">
          ${escapeHTML(t("password"))}
        </label>

        <input
          id="loginPassword"
          type="password"
          autocomplete="current-password"
          required
          placeholder="${escapeAttr(t("password"))}"
        >

        <button type="submit" class="add-btn" style="width:100%;margin-top:16px;">
          ${escapeHTML(t("signIn"))}
        </button>

        <button type="button" class="view-btn" id="showRegister" style="width:100%;margin-top:10px;">
          ${escapeHTML(t("createAccount"))}
        </button>

        <div id="loginError" style="display:none;color:#ff7777;margin-top:12px;"></div>

      </form>

    `
  );

  $("loginForm")?.addEventListener("submit", async event => {

    event.preventDefault();

    const email = $("loginEmail")?.value.trim() || "";
    const password = $("loginPassword")?.value || "";
    const error = $("loginError");

    try{

      await signInWithEmailAndPassword(auth, email, password);

      closeModal();

      toast(t("loginOk"), "success");

    }catch(err){

      if(error){
        error.textContent = authError(err);
        error.style.display = "block";
      }

    }

  });

  $("showRegister")?.addEventListener("click", showRegisterForm);

}

function showRegisterForm(){

  showModal(
    t("createAccount"),
    `

      <form id="registerForm">

        <label for="registerEmail">${escapeHTML(t("email"))}</label>

        <input id="registerEmail" type="email" autocomplete="email" required>

        <label for="registerPassword" style="display:block;margin-top:12px;">
          ${escapeHTML(t("password"))}
        </label>

        <input id="registerPassword" type="password" autocomplete="new-password" required>

        <button type="submit" class="add-btn" style="width:100%;margin-top:16px;">
          ${escapeHTML(t("createMyAccount"))}
        </button>

        <button type="button" class="view-btn" id="showLogin" style="width:100%;margin-top:10px;">
          ${escapeHTML(t("haveAccount"))}
        </button>

        <div id="registerError" style="display:none;color:#ff7777;margin-top:12px;"></div>

      </form>

    `
  );

  $("registerForm")?.addEventListener("submit", async event => {

    event.preventDefault();

    const email = $("registerEmail")?.value.trim() || "";
    const password = $("registerPassword")?.value || "";
    const error = $("registerError");

    try{

      await createUserWithEmailAndPassword(auth, email, password);

      closeModal();

      toast(t("registerOk"), "success");

    }catch(err){

      if(error){
        error.textContent = authError(err);
        error.style.display = "block";
      }

    }

  });

  $("showLogin")?.addEventListener("click", showLoginForm);

}

function openAccount(){

  if(!currentUser){
    showLoginForm();
    return;
  }

  showModal(
    t("myAccount"),
    `

      <div style="display:grid;gap:14px;">

        <div style="padding:16px;border-radius:15px;background:rgba(255,255,255,.05);">

          <strong>${escapeHTML(t("connectedAccount"))}</strong>

          <p style="margin-top:8px;opacity:.75;">
            ${escapeHTML(currentUser.email || "")}
          </p>

        </div>

        <button type="button" class="view-btn" id="accountOrders">
          ${escapeHTML(t("myOrders"))}
        </button>

        <button type="button" class="view-btn" id="accountLogout">
          ${escapeHTML(t("logout"))}
        </button>

      </div>

    `
  );

  $("accountOrders")?.addEventListener("click", openOrders);

  $("accountLogout")?.addEventListener("click", async () => {

    try{

      await signOut(auth);

      closeModal();

      toast(t("logoutOk"));

    }catch(error){

      toast(authError(error), "error");

    }

  });

}

function updateAccountButton(){

  if(!accountBtn){
    return;
  }

  accountBtn.title = currentUser ? t("myAccount") : t("loginTitle");

}


// ============================================================
// COMMANDES
// ============================================================

async function openOrders(){

  if(!currentUser){

    toast(t("ordersLogin"));

    showLoginForm();

    return;

  }

  showModal(
    t("ordersTitle"),
    `

      <div id="ordersLoading" style="text-align:center;padding:30px;">
        ${escapeHTML(t("ordersLoading"))}
      </div>

      <div id="ordersContent"></div>

    `
  );

  try{

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid)
    );

    const snapshot = await getDocs(ordersQuery);

    const orders = [];

    snapshot.forEach(item => {
      orders.push({ id:item.id, ...item.data() });
    });

    orders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

    renderOrders(orders);

  }catch(error){

    console.error("Orders error:", error);

    const loading = $("ordersLoading");

    if(loading){

      loading.innerHTML = `
        <div style="color:#ff7777;">
          ${escapeHTML(t("ordersFail"))}
          <br><br>
          ${escapeHTML(error.message || "")}
        </div>
      `;

    }

  }

}

function renderOrders(orders){

  $("ordersLoading")?.remove();

  const content = $("ordersContent");

  if(!content){
    return;
  }

  if(!orders.length){

    content.innerHTML = `

      <div class="nova-empty" style="text-align:center;padding:30px;">

        <div class="nova-empty-icon" style="font-size:50px;">📦</div>

        <h3>${escapeHTML(t("noOrders"))}</h3>

        <p style="margin-top:8px;opacity:.65;">
          ${escapeHTML(t("noOrdersHint"))}
        </p>

      </div>

    `;

    return;

  }

  content.innerHTML =
    orders.map(order => `

      <div style="padding:16px;border:1px solid var(--line);border-radius:16px;margin-bottom:12px;">

        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">

          <strong>${escapeHTML(t("orderWord"))} #${escapeHTML(order.id.slice(0, 8))}</strong>

          <strong>${money(order.total || 0)}</strong>

        </div>

        <div style="margin-top:9px;font-size:14px;">
          ${escapeHTML(t("statusLbl"))} :
          <strong>${escapeHTML(statusLabel(order.status || "Enregistrée"))}</strong>
        </div>

        ${
          order.city
            ? `<div style="margin-top:7px;opacity:.8;">📍 ${escapeHTML(order.city)}</div>`
            : ""
        }

        ${
          order.estimatedDelivery
            ? `<div style="margin-top:7px;opacity:.8;">${escapeHTML(t("deliveryLine"))} ${escapeHTML(order.estimatedDelivery)}</div>`
            : ""
        }

        ${
          order.tracking
            ? `<div style="margin-top:7px;opacity:.8;">${escapeHTML(t("trackingLine"))} ${escapeHTML(order.tracking)}</div>`
            : ""
        }

        <button
          type="button"
          class="view-btn order-detail"
          data-id="${escapeAttr(order.id)}"
          style="margin-top:14px;width:100%;"
        >
          ${escapeHTML(t("seeDetail"))}
        </button>

      </div>

    `).join("");

  document.querySelectorAll(".order-detail").forEach(button => {

    button.addEventListener("click", () => {

      const order = orders.find(item => item.id === button.dataset.id);

      if(order){
        showOrderDetail(order);
      }

    });

  });

}


// ============================================================
// DÉTAIL COMMANDE
// ============================================================

const ORDER_STATUSES = [
  "Enregistrée",
  "Acceptée",
  "Préparation",
  "En transit",
  "Livraison proche",
  "Livrée",
  "Annulée",
  "Remboursement en cours"
];

function showOrderDetail(order){

  const status = order.status || "Enregistrée";
  const currentIndex = ORDER_STATUSES.indexOf(status);
  const items = Array.isArray(order.items) ? order.items : [];

  const itemsHTML =
    items.map(item => {

      const product = getProduct(item.id);
      const name = item.name || product?.name || t("productWord");
      const price = Number(product?.price ?? item.price ?? 0);
      const quantity = Number(item.quantity || 1);

      return `

        <div style="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);">

          <div>

            <strong>${escapeHTML(name)}</strong>

            <div style="margin-top:4px;opacity:.7;font-size:13px;">×${quantity}</div>

          </div>

          <strong>${money(price * quantity)}</strong>

        </div>

      `;

    }).join("");

  const timelineHTML =
    ORDER_STATUSES.map((item, index) => {

      const active = currentIndex >= index;

      return `

        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;">

          <div style="
            width:24px;
            height:24px;
            min-width:24px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background:${active ? "#2d8cff" : "rgba(255,255,255,.08)"};
            color:${active ? "#fff" : "var(--muted)"};
            font-size:12px;
            font-weight:800;
          ">
            ${active ? "✓" : index + 1}
          </div>

          <div><strong>${escapeHTML(statusLabel(item))}</strong></div>

        </div>

      `;

    }).join("");

  showModal(
    `${t("orderWord")} #${order.id.slice(0, 8)}`,
    `

      <div style="display:grid;gap:16px;">

        <div style="padding:16px;border-radius:16px;background:rgba(45,140,255,.08);border:1px solid rgba(45,140,255,.18);">

          <div style="font-size:13px;opacity:.65;">${escapeHTML(t("currentStatus"))}</div>

          <div style="font-size:20px;font-weight:800;margin-top:5px;">
            ${escapeHTML(statusLabel(status))}
          </div>

          ${
            order.city
              ? `<div style="margin-top:10px;">${escapeHTML(t("destination"))} <strong>${escapeHTML(order.city)}</strong></div>`
              : ""
          }

          ${
            order.estimatedDelivery
              ? `<div style="margin-top:7px;">${escapeHTML(t("estDelivery"))} <strong>${escapeHTML(order.estimatedDelivery)}</strong></div>`
              : ""
          }

          ${
            order.tracking
              ? `<div style="margin-top:7px;">${escapeHTML(t("trackingLine"))} <strong>${escapeHTML(order.tracking)}</strong></div>`
              : ""
          }

        </div>

        <div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.04);">

          <h3>${escapeHTML(t("orderTracking"))}</h3>

          <div style="margin-top:16px;">${timelineHTML}</div>

        </div>

        <div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.04);">

          <h3>${escapeHTML(t("productsWord"))}</h3>

          <div style="margin-top:10px;">${itemsHTML}</div>

          <div style="display:flex;justify-content:space-between;margin-top:16px;font-size:20px;">

            <span>${escapeHTML(t("total"))}</span>

            <strong>${money(order.total || 0)}</strong>

          </div>

        </div>

        <div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.04);">

          <h3>${escapeHTML(t("deliveryWord"))}</h3>

          <p style="margin-top:10px;opacity:.8;">
            ${escapeHTML(order.address || t("addressMissing"))}
          </p>

        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;">

          <button type="button" class="add-btn" id="orderInvoiceBtn" style="flex:1;min-width:180px;">
            ${escapeHTML(t("seeInvoice"))}
          </button>

          <button type="button" class="view-btn" id="orderBackBtn" style="flex:1;min-width:180px;">
            ${escapeHTML(t("backOrders"))}
          </button>

        </div>

      </div>

    `
  );

  $("orderInvoiceBtn")?.addEventListener("click", () => printInvoice(order));

  $("orderBackBtn")?.addEventListener("click", () => {

    closeModal();

    setTimeout(openOrders, 100);

  });

}


// ============================================================
// CARTE DE TEST (créée depuis l'admin)
// ============================================================

function getTestCard(){
  return loadStorage(TEST_CARD_STORAGE_KEY, null);
}

function generateTestCard(){

  let number = "4";

  for(let i = 0; i < 15; i++){
    number += Math.floor(Math.random() * 10);
  }

  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");

  const year = String(
    (new Date().getFullYear() + 2 + Math.floor(Math.random() * 4)) % 100
  ).padStart(2, "0");

  const cvv = String(Math.floor(Math.random() * 900) + 100);

  const card = {
    number,
    holder:"NOVA CLIENT",
    expiry:`${month}/${year}`,
    cvv
  };

  saveStorage(TEST_CARD_STORAGE_KEY, card);

  return card;

}

function formatCardNumber(number){
  return String(number || "").replace(/(.{4})/g, "$1 ").trim();
}

function renderTestCardHTML(){

  const card = getTestCard();

  return `

    ${
      card
        ? `
          <div style="margin-top:12px;padding:14px;border-radius:14px;background:rgba(255,255,255,.05);line-height:1.8;">
            <div>${escapeHTML(t("cardNumberLbl"))} : <strong>${escapeHTML(formatCardNumber(card.number))}</strong></div>
            <div>${escapeHTML(t("cardHolderLbl"))} : <strong>${escapeHTML(card.holder)}</strong></div>
            <div>${escapeHTML(t("expiry"))} : <strong>${escapeHTML(card.expiry)}</strong></div>
            <div>CVV : <strong>${escapeHTML(card.cvv)}</strong></div>
          </div>
        `
        : `<p style="margin-top:12px;opacity:.6;">${escapeHTML(t("cardNone"))}</p>`
    }

    <button type="button" class="view-btn" id="generateTestCard" style="margin-top:12px;">
      ${escapeHTML(card ? t("regenerateCard") : t("generateCard"))}
    </button>

  `;

}


// ============================================================
// CHECKOUT
// ============================================================

checkoutBtn?.addEventListener("click", openCheckout);

function openCheckout(){

  if(!cart.length){

    toast(t("cartEmptyToast"));

    return;

  }

  if(!currentUser){

    toast(t("loginToOrder"));

    showLoginForm();

    return;

  }

  const subtotal = getCartSubtotal();

  showModal(
    t("checkoutTitle"),
    `

      <form id="checkoutForm">

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">

          <div>

            <label for="checkoutFirstName">${escapeHTML(t("firstName"))}</label>

            <input
              id="checkoutFirstName"
              type="text"
              autocomplete="given-name"
              required
              placeholder="${escapeAttr(t("firstNamePh"))}"
            >

          </div>

          <div>

            <label for="checkoutLastName">${escapeHTML(t("lastName"))}</label>

            <input
              id="checkoutLastName"
              type="text"
              autocomplete="family-name"
              required
              placeholder="${escapeAttr(t("lastNamePh"))}"
            >

          </div>

        </div>

        <div style="margin-bottom:14px;">

          <label for="checkoutAddress">${escapeHTML(t("address"))}</label>

          <textarea
            id="checkoutAddress"
            required
            rows="4"
            autocomplete="street-address"
            placeholder="${escapeAttr(t("addressPh"))}"
          ></textarea>

        </div>

        <div style="padding:15px;border-radius:14px;background:rgba(255,255,255,.05);margin:15px 0;">

          <div style="display:flex;justify-content:space-between;">

            <span>${escapeHTML(t("subtotal"))}</span>

            <strong>${money(subtotal)}</strong>

          </div>

          <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:22px;">

            <span>${escapeHTML(t("total"))}</span>

            <strong id="checkoutFinal">${money(subtotal)}</strong>

          </div>

        </div>

        <h3>${escapeHTML(t("payMethod"))}</h3>

        <div style="display:grid;gap:10px;margin:12px 0 18px;">

          <button type="button" class="view-btn payment-choice" data-payment="paypal">
            ${escapeHTML(t("paypal"))}
          </button>

          <button type="button" class="view-btn payment-choice" data-payment="card">
            ${escapeHTML(t("card"))}
          </button>

        </div>

        <input type="hidden" id="paymentMethod" value="">

        <div id="paymentInfo" style="margin-bottom:14px;"></div>

        <button type="submit" class="add-btn" id="checkoutSubmit" style="width:100%;">
          ${escapeHTML(t("continue"))}
        </button>

        <div id="checkoutError" style="display:none;color:#ff7777;margin-top:12px;"></div>

      </form>

    `
  );

  let paymentMethod = "";

  document.querySelectorAll(".payment-choice").forEach(button => {

    button.addEventListener("click", () => {

      paymentMethod = button.dataset.payment || "";

      const input = $("paymentMethod");

      if(input){
        input.value = paymentMethod;
      }

      document.querySelectorAll(".payment-choice").forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      const info = $("paymentInfo");

      if(!info){
        return;
      }

      if(paymentMethod === "paypal"){

        info.innerHTML = `

          <div style="padding:12px;border-radius:12px;background:rgba(60,130,255,.1);">
            ${escapeHTML(t("paypalInfo"))}
          </div>

        `;

      }else{

        info.innerHTML = `

          <div style="padding:15px;border-radius:14px;background:rgba(255,255,255,.05);">

            <div style="font-weight:700;margin-bottom:12px;">
              ${escapeHTML(t("cardInfoTitle"))}
            </div>

            <label for="cardNumber">${escapeHTML(t("cardNumber"))}</label>

            <input
              id="cardNumber"
              type="text"
              inputmode="numeric"
              autocomplete="off"
              placeholder="${escapeAttr(t("cardNumber"))}"
              required
            >

            <label for="cardHolder" style="display:block;margin-top:10px;">
              ${escapeHTML(t("cardHolder"))}
            </label>

            <input
              id="cardHolder"
              type="text"
              autocomplete="off"
              placeholder="${escapeAttr(t("cardHolder"))}"
              required
            >

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">

              <div>

                <label for="cardExpiry">${escapeHTML(t("expiry"))}</label>

                <input
                  id="cardExpiry"
                  type="text"
                  autocomplete="off"
                  placeholder="MM/YY"
                  required
                >

              </div>

              <div>

                <label for="cardCvv">CVV</label>

                <input
                  id="cardCvv"
                  type="text"
                  inputmode="numeric"
                  autocomplete="off"
                  placeholder="CVV"
                  required
                >

              </div>

            </div>

            <p style="margin-top:12px;color:var(--muted);font-size:13px;">
              ${escapeHTML(t("cardHint"))}
            </p>

          </div>

        `;

      }

    });

  });

  $("checkoutForm")?.addEventListener("submit", async event => {

    event.preventDefault();

    const firstName = $("checkoutFirstName")?.value.trim() || "";
    const lastName = $("checkoutLastName")?.value.trim() || "";
    const address = $("checkoutAddress")?.value.trim() || "";
    const errorBox = $("checkoutError");

    function checkoutError(message){

      if(errorBox){
        errorBox.textContent = message;
        errorBox.style.display = "block";
      }

    }

    if(!firstName){
      checkoutError(t("errFirst"));
      return;
    }

    if(!lastName){
      checkoutError(t("errLast"));
      return;
    }

    if(!address){
      checkoutError(t("errAddr"));
      return;
    }

    if(!paymentMethod){
      checkoutError(t("errPay"));
      return;
    }

    const submit = $("checkoutSubmit");

    if(submit){
      submit.disabled = true;
      submit.textContent = t("creating");
    }

    try{

      const total = getCartSubtotal();

      if(!Number.isFinite(total)){
        throw new Error(t("errAmount"));
      }

      let paymentStatus = "En attente";

      // ---------- Paiement carte de test ----------

      if(paymentMethod === "card"){

        const card = getTestCard();

        if(!card){
          throw new Error(t("errNoCard"));
        }

        const clean = value => String(value || "").replace(/\s+/g, "").trim();

        const enteredNumber = clean($("cardNumber")?.value);
        const storedNumber = clean(card.number);

        const enteredHolder = ($("cardHolder")?.value || "").trim().toLowerCase();
        const storedHolder = String(card.holder || "").trim().toLowerCase();

        const enteredExpiry = ($("cardExpiry")?.value || "").trim();
        const storedExpiry = String(card.expiry || "").trim();

        const enteredCvv = ($("cardCvv")?.value || "").trim();
        const storedCvv = String(card.cvv || "").trim();

        if(
          enteredNumber !== storedNumber ||
          enteredHolder !== storedHolder ||
          enteredExpiry !== storedExpiry ||
          enteredCvv !== storedCvv
        ){
          throw new Error(t("errCardWrong"));
        }

        paymentStatus = "Payé";

      }

      // ---------- Produits de la commande ----------

      const orderItems = cart.map(item => {

        const product = getProduct(item.id);
        const baseName = product?.name || t("productWord");

        return {
          id:item.id,
          name:item.option ? `${baseName} (${item.option})` : baseName,
          option:item.option || "",
          price:Number(product?.price ?? 0),
          quantity:Number(item.quantity || 1)
        };

      });

      if(!orderItems.length){
        throw new Error(t("errEmptyCart"));
      }

      // ---------- Création Firestore ----------

      const orderData = {
        userId:currentUser.uid,
        userEmail:currentUser.email || "",
        firstName,
        lastName,
        items:orderItems,
        subtotal:total,
        total,
        address,
        city:"",
        status:"Enregistrée",
        paymentMethod,
        paymentStatus,
        tracking:"",
        estimatedDelivery:"",
        createdAt:serverTimestamp()
      };

      const orderRef = await addDoc(collection(db, "orders"), orderData);

      // ---------- Vider le panier ----------

      cart = [];

      saveCart();
      renderCart();
      closeModal();

      toast(t("orderCreated", { id:orderRef.id.slice(0, 8) }), "success");

      // ---------- PayPal ----------

      if(paymentMethod === "paypal" && total > 0){

        const paypalUrl =
          `https://paypal.me/SH0PNOVA/${encodeURIComponent(total.toFixed(2))}EUR`;

        setTimeout(() => {
          window.open(paypalUrl, "_blank", "noopener,noreferrer");
        }, 400);

      }

    }catch(error){

      console.error("Firestore Checkout Error:", error);

      checkoutError(
        `${t("errorPrefix")}${error.message || error.code || t("unknown")}`
      );

    }finally{

      if(submit){
        submit.disabled = false;
        submit.textContent = t("continue");
      }

    }

  });

}


// ============================================================
// FACTURE
// ============================================================

function printInvoice(order){

  const items = Array.isArray(order.items) ? order.items : [];

  const rows =
    items.map(item => {

      const product = getProduct(item.id);
      const name = item.name || product?.name || t("productWord");
      const price = Number(product?.price ?? item.price ?? 0);
      const quantity = Number(item.quantity || 1);

      return `

        <tr>
          <td>${escapeHTML(name)}</td>
          <td>${quantity}</td>
          <td>${money(price)}</td>
          <td>${money(price * quantity)}</td>
        </tr>

      `;

    }).join("");

  const customerName =
    `${order.firstName || ""} ${order.lastName || ""}`.trim();

  const invoiceWindow = window.open("", "_blank", "width=900,height=700");

  if(!invoiceWindow){

    toast(t("invoiceBlocked"), "error");

    return;

  }

  invoiceWindow.document.write(`

    <!DOCTYPE html>

    <html lang="${lang}">

    <head>

      <meta charset="UTF-8">

      <title>${escapeHTML(t("invoiceTitle"))}</title>

      <style>

        *{ box-sizing:border-box; }

        body{
          font-family:Arial,sans-serif;
          padding:40px;
          color:#111827;
          background:#fff;
        }

        h3{ margin-top:28px; }

        .top{
          display:flex;
          justify-content:space-between;
          gap:30px;
          margin-bottom:40px;
        }

        .brand{
          font-size:28px;
          font-weight:800;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th, td{
          border-bottom:1px solid #ddd;
          padding:12px;
          text-align:left;
        }

        th{ background:#f5f5f5; }

        .total{
          margin-top:30px;
          text-align:right;
          font-size:24px;
          font-weight:bold;
        }

        .small{
          color:#666;
          margin-top:30px;
        }

        .status{
          margin-top:20px;
          padding:12px;
          background:#f5f5f5;
          border-radius:8px;
        }

        @media print{
          body{ padding:20px; }
        }

      </style>

    </head>

    <body>

      <div class="top">

        <div>
          <div class="brand">NovaShop</div>
          <p>${escapeHTML(t("gameShop"))}</p>
        </div>

        <div>
          <strong>${escapeHTML(t("invoice"))}</strong>
          <p>${escapeHTML(t("orderWord"))} #${escapeHTML(order.id)}</p>
        </div>

      </div>

      <h3>${escapeHTML(t("client"))}</h3>

      ${customerName ? `<p><strong>${escapeHTML(customerName)}</strong></p>` : ""}
      ${order.userEmail ? `<p>${escapeHTML(order.userEmail)}</p>` : ""}
      ${order.address ? `<p>${escapeHTML(order.address)}</p>` : ""}
      ${order.city ? `<p>${escapeHTML(order.city)}</p>` : ""}

      <h3>${escapeHTML(t("productsWord"))}</h3>

      <table>

        <thead>
          <tr>
            <th>${escapeHTML(t("productWord"))}</th>
            <th>${escapeHTML(t("qty"))}</th>
            <th>${escapeHTML(t("price"))}</th>
            <th>${escapeHTML(t("total"))}</th>
          </tr>
        </thead>

        <tbody>${rows}</tbody>

      </table>

      <div class="total">
        ${escapeHTML(t("total"))} : ${money(order.total || 0)}
      </div>

      <div class="status">
        ${escapeHTML(t("statusLbl"))} :
        <strong>${escapeHTML(statusLabel(order.status || "Enregistrée"))}</strong>
      </div>

      <p class="small">NovaShop • ${escapeHTML(t("gameShop"))}</p>

      <script>
        window.onload = function(){ window.print(); };
      <\/script>

    </body>

    </html>

  `);

  invoiceWindow.document.close();

}


// ============================================================
// ADMIN
// ============================================================

adminBtn?.addEventListener("click", openAdmin);

function isAdminUser(){

  return Boolean(
    currentUser &&
    (currentUser.email || "").toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

}

function openAdmin(){

  if(!isAdminUser()){

    toast(t("adminDenied"), "error");

    return;

  }

  const authorized = localStorage.getItem(ADMIN_ACCESS_KEY) === "true";

  if(!authorized){

    const code = prompt(t("adminCodePrompt"));

    if(code !== ADMIN_CODE){

      toast(t("adminCodeWrong"), "error");

      return;

    }

    localStorage.setItem(ADMIN_ACCESS_KEY, "true");

  }

  loadAdmin();

}

async function loadAdmin(){

  if(!isAdminUser()){

    toast(t("adminDenied"), "error");

    return;

  }

  showModal(
    t("adminTitle"),
    `

      <div id="adminLoading" style="text-align:center;padding:30px;">
        ${escapeHTML(t("loading"))}
      </div>

      <div id="adminContent"></div>

    `
  );

  try{

    const snapshot = await getDocs(collection(db, "orders"));

    const orders = [];

    snapshot.forEach(item => {
      orders.push({ id:item.id, ...item.data() });
    });

    orders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

    renderAdmin(orders);

  }catch(error){

    console.error("Admin Firestore Error:", error);

    const loading = $("adminLoading");

    if(loading){

      loading.innerHTML = `
        <div style="color:#ff7777;">
          ${escapeHTML(t("adminFirestoreErr"))}
          ${escapeHTML(error.message || "")}
        </div>
      `;

    }

  }

}

function renderAdmin(orders){

  $("adminLoading")?.remove();

  const content = $("adminContent");

  if(!content){
    return;
  }

  content.innerHTML = `

    <div style="padding:15px;margin-bottom:18px;border-radius:16px;background:rgba(80,120,255,.08);">

      <strong>${escapeHTML(t("adminHeader"))}</strong>

      <p style="margin-top:6px;">
        ${escapeHTML(t(orders.length > 1 ? "ordCountMany" : "ordCountOne", { n:orders.length }))}
      </p>

    </div>

    <div style="padding:16px;margin-bottom:18px;border-radius:16px;background:rgba(255,255,255,.04);">

      <strong>${escapeHTML(t("cardTitle"))}</strong>

      <p style="margin-top:6px;opacity:.7;">
        ${escapeHTML(t("cardOnly"))}
      </p>

      <div id="testCardContainer">
        ${renderTestCardHTML()}
      </div>

    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">

      <button type="button" class="view-btn" id="adminRefresh">
        ${escapeHTML(t("refresh"))}
      </button>

      <button type="button" class="view-btn" id="adminLogout">
        ${escapeHTML(t("quitAdmin"))}
      </button>

    </div>

    <div id="adminOrders">

      ${
        orders.length
          ? orders.map(order => {

              const items = Array.isArray(order.items) ? order.items : [];

              const productsText =
                items
                  .map(item => `${item.name || item.id} ×${item.quantity || 1}`)
                  .join(", ");

              const customerName =
                `${order.firstName || ""} ${order.lastName || ""}`.trim();

              return `

                <div
                  class="admin-order"
                  style="padding:16px;margin-bottom:15px;border:1px solid var(--line);border-radius:16px;"
                >

                  <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">

                    <strong>#${escapeHTML(order.id.slice(0, 8))}</strong>

                    <strong>${money(order.total || 0)}</strong>

                  </div>

                  <p style="margin:8px 0;">
                    👤
                    ${
                      customerName
                        ? `<strong>${escapeHTML(customerName)}</strong>`
                        : escapeHTML(t("nameMissing"))
                    }
                  </p>

                  <p style="margin:8px 0;opacity:.85;">
                    📧 ${escapeHTML(order.userEmail || t("unknownWord"))}
                  </p>

                  <p style="margin:8px 0;">
                    💳 ${escapeHTML(paymentLabel(order.paymentMethod))}
                    |
                    ${escapeHTML(statusLabel(order.paymentStatus || "En attente"))}
                  </p>

                  <p style="margin:8px 0;opacity:.8;">
                    ${escapeHTML(productsText)}
                  </p>

                  <label>${escapeHTML(t("statusLbl"))}</label>

                  <select
                    class="admin-status"
                    data-id="${escapeAttr(order.id)}"
                    style="width:100%;margin:6px 0 10px;"
                  >

                    ${ORDER_STATUSES.map(status => `
                      <option
                        value="${escapeAttr(status)}"
                        ${order.status === status ? "selected" : ""}
                      >
                        ${escapeHTML(statusLabel(status))}
                      </option>
                    `).join("")}

                  </select>

                  <input
                    class="admin-city"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.city || "")}"
                    placeholder="${escapeAttr(t("cityPh"))}"
                    style="width:100%;margin-bottom:8px;"
                  >

                  <input
                    class="admin-tracking"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.tracking || "")}"
                    placeholder="${escapeAttr(t("trackingPh"))}"
                    style="width:100%;margin-bottom:8px;"
                  >

                  <input
                    class="admin-delivery"
                    data-id="${escapeAttr(order.id)}"
                    value="${escapeAttr(order.estimatedDelivery || "")}"
                    placeholder="${escapeAttr(t("deliveryPh"))}"
                    style="width:100%;margin-bottom:10px;"
                  >

                  <div style="display:flex;gap:8px;flex-wrap:wrap;">

                    <button type="button" class="add-btn admin-save" data-id="${escapeAttr(order.id)}">
                      ${escapeHTML(t("save"))}
                    </button>

                    <button type="button" class="view-btn admin-paid" data-id="${escapeAttr(order.id)}">
                      ${escapeHTML(t("markPaid"))}
                    </button>

                    <button type="button" class="view-btn admin-invoice" data-id="${escapeAttr(order.id)}">
                      ${escapeHTML(t("invoiceBtn"))}
                    </button>

                    <button
                      type="button"
                      class="view-btn admin-delete"
                      data-id="${escapeAttr(order.id)}"
                      style="color:#ff7777;"
                    >
                      ${escapeHTML(t("del"))}
                    </button>

                  </div>

                </div>

              `;

            }).join("")
          : `

            <div style="text-align:center;padding:30px;">

              <div style="font-size:50px;">📦</div>

              <h3>${escapeHTML(t("noOrders"))}</h3>

            </div>

          `
      }

    </div>

  `;

  $("adminRefresh")?.addEventListener("click", loadAdmin);

  $("adminLogout")?.addEventListener("click", () => {

    localStorage.removeItem(ADMIN_ACCESS_KEY);

    closeModal();

    toast(t("adminClosed"));

  });

  attachTestCardButton();

  document.querySelectorAll(".admin-save").forEach(button => {
    button.addEventListener("click", async () => {
      await saveAdminOrder(button.dataset.id);
    });
  });

  document.querySelectorAll(".admin-paid").forEach(button => {
    button.addEventListener("click", async () => {
      await markOrderPaid(button.dataset.id);
    });
  });

  document.querySelectorAll(".admin-invoice").forEach(button => {

    button.addEventListener("click", () => {

      const order = orders.find(item => item.id === button.dataset.id);

      if(order){
        printInvoice(order);
      }

    });

  });

  document.querySelectorAll(".admin-delete").forEach(button => {
    button.addEventListener("click", async () => {
      await deleteAdminOrder(button.dataset.id);
    });
  });

}

function attachTestCardButton(){

  const button = $("generateTestCard");

  if(!button){
    return;
  }

  button.addEventListener("click", () => {

    generateTestCard();

    const container = $("testCardContainer");

    if(container){

      container.innerHTML = renderTestCardHTML();

      attachTestCardButton();

    }

    toast(t("cardGenerated"), "success");

  });

}

function adminErrorToast(error){

  console.error(error);

  toast(
    `${t("errorPrefix")}${error.message || error.code || t("unknown")}`,
    "error"
  );

}

async function saveAdminOrder(id){

  try{

    const safeId =
      typeof CSS !== "undefined" && typeof CSS.escape === "function"
        ? CSS.escape(id)
        : id.replace(/["\\]/g, "\\$&");

    const status =
      document.querySelector(`.admin-status[data-id="${safeId}"]`)?.value ||
      "Enregistrée";

    const city =
      document.querySelector(`.admin-city[data-id="${safeId}"]`)?.value || "";

    const tracking =
      document.querySelector(`.admin-tracking[data-id="${safeId}"]`)?.value || "";

    const estimatedDelivery =
      document.querySelector(`.admin-delivery[data-id="${safeId}"]`)?.value || "";

    await updateDoc(
      doc(db, "orders", id),
      {
        status,
        city,
        tracking,
        estimatedDelivery,
        updatedAt:serverTimestamp()
      }
    );

    toast(t("updated"), "success");

  }catch(error){

    adminErrorToast(error);

  }

}

async function markOrderPaid(id){

  try{

    await updateDoc(
      doc(db, "orders", id),
      {
        paymentStatus:"Payé",
        updatedAt:serverTimestamp()
      }
    );

    toast(t("paidMarked"), "success");

    loadAdmin();

  }catch(error){

    adminErrorToast(error);

  }

}

async function deleteAdminOrder(id){

  if(!confirm(t("confirmDelete"))){
    return;
  }

  try{

    await deleteDoc(doc(db, "orders", id));

    toast(t("deleted"), "success");

    loadAdmin();

  }catch(error){

    adminErrorToast(error);

  }

}


// ============================================================
// PARAMÈTRES (thème + langue)
// ============================================================

function getTheme(){
  return localStorage.getItem("novaThemeChoice") || "dark";
}

function applyTheme(){

  document.documentElement.dataset.theme =
    getTheme() === "light" ? "light" : "dark";

}

function saveTheme(theme){

  localStorage.setItem("novaThemeChoice", theme);

  applyTheme();

}

function openSettings(){

  const currentTheme = getTheme();

  showModal(
    t("settingsTitle"),
    `

      <div style="display:flex;flex-direction:column;gap:18px;">

        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;">

          <h3 style="margin-bottom:12px;">${escapeHTML(t("appearance"))}</h3>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">

            <button
              type="button"
              class="theme-choice"
              data-theme-choice="dark"
              style="padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#0b1424;color:white;cursor:pointer;"
            >
              ${escapeHTML(t("dark"))}
            </button>

            <button
              type="button"
              class="theme-choice"
              data-theme-choice="light"
              style="padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#f4f7fb;color:#111;cursor:pointer;"
            >
              ${escapeHTML(t("light"))}
            </button>

          </div>

        </div>

        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;">

          <h3 style="margin-bottom:12px;">🌐 ${escapeHTML(t("language"))}</h3>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">

            <button
              type="button"
              class="lang-choice"
              data-lang-choice="fr"
              style="padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#0b1424;color:white;cursor:pointer;"
            >
              🇫🇷 Français
            </button>

            <button
              type="button"
              class="lang-choice"
              data-lang-choice="en"
              style="padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#0b1424;color:white;cursor:pointer;"
            >
              🇬🇧 English
            </button>

          </div>

        </div>

        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;">

          <h3 style="margin-bottom:8px;">NovaShop</h3>

          <p style="opacity:.7;line-height:1.6;">${escapeHTML(t("version"))}</p>

        </div>

      </div>

    `
  );

  document.querySelectorAll(".theme-choice").forEach(button => {

    if(button.dataset.themeChoice === currentTheme){
      button.style.outline = "2px solid #2d8cff";
    }

    button.addEventListener("click", () => {

      saveTheme(button.dataset.themeChoice);

      openSettings();

      toast(
        button.dataset.themeChoice === "dark" ? t("darkOn") : t("lightOn"),
        "success"
      );

    });

  });

  document.querySelectorAll(".lang-choice").forEach(button => {

    if(button.dataset.langChoice === lang){
      button.style.outline = "2px solid #2d8cff";
    }

    button.addEventListener("click", () => {

      setLanguage(button.dataset.langChoice);

      openSettings();

      toast(t("langChanged"), "success");

    });

  });

}


// ============================================================
// BOUTONS DU HAUT
// ============================================================

accountBtn?.addEventListener("click", openAccount);
ordersBtn?.addEventListener("click", openOrders);
settingsBtn?.addEventListener("click", openSettings);


// ============================================================
// ETAT FIREBASE / UTILISATEUR
// ============================================================

onAuthStateChanged(auth, user => {

  currentUser = user || null;

  updateAccountButton();

  if(adminBtn){
    adminBtn.style.display = isAdminUser() ? "" : "none";
  }

});


// ============================================================
// CLAVIER / ERREURS
// ============================================================

document.addEventListener("keydown", event => {

  if(event.key !== "Escape"){
    return;
  }

  closeModal();
  closeCart();

});

window.addEventListener("error", event => {
  console.error("NovaShop JS error :", event.error || event.message);
});

window.addEventListener("unhandledrejection", event => {
  console.error("NovaShop Promise error :", event.reason);
});


// ============================================================
// INITIALISATION
// ============================================================

function initNovaShop(){

  try{

    applyTheme();
    applyStaticTranslations();
    renderCategories();
    renderProducts();
    renderCart();
    updateAccountButton();

    console.log(`NovaShop chargé avec succès 🚀 | ${products.length} produits`);

  }catch(error){

    console.error("Erreur initialisation NovaShop :", error);

    if(productGrid){

      productGrid.innerHTML = `

        <div style="
          grid-column:1/-1;
          padding:40px 20px;
          text-align:center;
          border-radius:18px;
          background:rgba(255,70,70,.08);
          border:1px solid rgba(255,70,70,.2);
          color:#ff7777;
        ">

          <h2 style="margin-bottom:10px;">${escapeHTML(t("loadErr"))}</h2>

          <p style="opacity:.8;line-height:1.6;">${escapeHTML(t("loadErrText"))}</p>

          <small style="display:block;margin-top:10px;opacity:.55;word-break:break-word;">
            ${escapeHTML(error?.message || t("unknownErr"))}
          </small>

        </div>

      `;

    }

    if(productCount){
      productCount.textContent = t("errWord");
    }

  }

}

initNovaShop();


// ============================================================
// API PUBLIQUE
// ============================================================

window.NovaShop = {

  products,

  get currentUser(){
    return currentUser;
  },

  get lang(){
    return lang;
  },

  setLanguage,
  toggleLanguage,
  addToCart,
  removeFromCart,
  changeCartQuantity,
  openCart,
  closeCart,
  openProduct,
  openAccount,
  openOrders,
  openSettings,
  openCheckout,
  openAdmin,
  renderProducts,
  renderCart,
  getCartCount,
  getCartSubtotal,
  money

};
