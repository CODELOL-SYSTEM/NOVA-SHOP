// ============================================================
// NOVASHOP - APP.JS COMPLET
// Firebase Auth + Firestore
// LANGUES : EN / FR / DE
// ANGLAIS PAR DÉFAUT
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
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


// ============================================================
// CONFIGURATION
// ============================================================

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";
const ADMIN_ACCESS_KEY = "novaAdminAuthorized";
const TEST_CARD_STORAGE_KEY = "novaTestCard";


// ============================================================
// LANGUES
// ============================================================

const LANGUAGE_STORAGE_KEY = "nova_language";

const LANGUAGES = {
  en: {
    name: "English",
    flag: "🇬🇧"
  },

  fr: {
    name: "Français",
    flag: "🇫🇷"
  },

  de: {
    name: "Deutsch",
    flag: "🇩🇪"
  }
};

let currentLanguage =
  localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  ) || "en";

if(!LANGUAGES[currentLanguage]){
  currentLanguage = "en";
}


const translations = {

  en: {

    nav: {
      home: "Home",
      products: "Products",
      reviews: "Reviews",
      faq: "FAQ",
      account: "Account",
      orders: "Orders",
      admin: "Admin",
      cart: "Cart"
    },

    hero: {
      title1: "Your setup.",
      title2: "Your level.",
      description:
        "NovaShop brings together PC components, peripherals, monitors, audio, streaming and gaming accessories.",
      products: "View products",
      cart: "View my cart",
      gaming: "NovaShop Gaming",
      subtitle: "Performance, accessories and setup."
    },

    products: {
      title: "Products",
      subtitle: "Find your next piece of equipment.",
      search: "Search for a product...",
      catalog: "Catalog",
      product: "product",
      products: "products",
      noResults: "No product found",
      noResultsText:
        "Try another search or category.",
      view: "View",
      add: "Add",
      new: "NEW",
      removeFavorite: "Remove from favorites",
      addFavorite: "Add to favorites"
    },

    sort: {
      default: "Default sorting",
      low: "Price: low to high",
      high: "Price: high to low",
      name: "Name A-Z",
      newest: "Newest"
    },

    categories: {
      all: "All"
    },

    trust: {
      title: "Why NovaShop?",

      speedTitle: "🚀 Speed",
      speedText:
        "A store designed to help you quickly find your equipment.",

      ordersTitle: "🛡️ Orders",
      ordersText:
        "Find your orders from your account.",

      trackingTitle: "📦 Tracking",
      trackingText:
        "Delivery status can be updated from the administration.",

      paymentTitle: "💳 Payment",
      paymentText:
        "We accept credit/debit cards and PayPal."
    },

    reviews: {
      title: "⭐ Customer reviews",
      lucas:
        "Very good product, fast delivery.",
      maxime:
        "Product as described and well packaged.",
      enzo:
        "Good experience on NovaShop.",
      detailed:
        "Detailed reviews are available from each product."
    },

    returns: {
      title: "↩️ Returns",
      text:
        "For any questions about an order, contact NovaShop support:"
    },

    faq: {
      title: "FAQ",

      q1: "How do I place an order?",
      a1:
        "Add your products to the cart, log in, then open checkout to enter your address and payment method.",

      q2: "How can I see my orders?",
      a2:
        "Log in and open the Orders button or the My Orders section from your account.",

      q3: "How can I contact support?",
      a3:
        "You can contact NovaShop support at:"
    },

    footer: {
      store: "Gaming store",
      support: "Support:"
    },

    cart: {
      title: "Cart",
      total: "Total",
      checkout: "Checkout",
      empty: "Your cart is empty",
      emptyText:
        "Add products to get started.",
      remove: "Remove"
    },

    auth: {
      login: "Login",
      register: "Create an account",
      email: "Email",
      password: "Password",
      connect: "Log in",
      create: "Create my account",
      back: "Back to login",
      accountConnected: "👤 Account connected",
      myOrders: "📦 My orders",
      logout: "🚪 Log out",
      successLogin: "Login successful 👋",
      successRegister:
        "Account created successfully 🎉",
      successLogout: "Logout successful.",
      close: "Close"
    },

    orders: {
      title: "My orders",
      loading: "Loading orders...",
      none: "No orders",
      noneText:
        "You have not placed an order yet.",
      order: "Order",
      status: "Status:",
      view: "View order",
      impossible:
        "Unable to load orders."
    },

    order: {
      registered: "Registered",
      accepted: "Accepted",
      preparation: "Preparing",
      transit: "In transit",
      nearDelivery: "Delivery nearby",
      delivered: "Delivered",
      cancelled: "Order cancelled",
      tracking: "Tracking:",
      estimated: "Estimated delivery:",
      destination: "📍 Destination:",
      trackingTitle: "Tracking",
      products: "Products",
      delivery: "Delivery",
      total: "Total",
      invoice: "🧾 View invoice"
    },

    product: {
      addCart: "🛒 Add to cart",
      removeFavorite: "❤️ Remove from favorites",
      addFavorite: "♡ Add to favorites"
    },

    toast: {
      removedFavorite:
        "Removed from favorites.",
      addedFavorite:
        "Added to favorites ❤️",
      addedCart:
        "Product added to cart 🛒"
    },

    card: {
      title: "💳 Card",
      none: "No card created.",
      generate: "Generate a card",
      regenerate: "🔄 Generate a new card",
      holder: "CARDHOLDER",
      exp: "EXP",
      cvv: "CVV"
    },

    language: {
      title: "Language",
      select: "Choose your language",
      english: "English",
      french: "Français",
      german: "Deutsch"
    }

  },


  fr: {

    nav: {
      home: "Accueil",
      products: "Produits",
      reviews: "Avis",
      faq: "FAQ",
      account: "Compte",
      orders: "Commandes",
      admin: "Admin",
      cart: "Panier"
    },

    hero: {
      title1: "Ton setup.",
      title2: "Ton niveau.",
      description:
        "NovaShop rassemble composants PC, périphériques, écrans, audio, streaming et accessoires gaming.",
      products: "Voir les produits",
      cart: "Voir mon panier",
      gaming: "NovaShop Gaming",
      subtitle: "Performance, accessoires et setup."
    },

    products: {
      title: "Produits",
      subtitle: "Trouve ton prochain équipement.",
      search: "Rechercher un produit...",
      catalog: "Catalogue",
      product: "produit",
      products: "produits",
      noResults: "Aucun produit trouvé",
      noResultsText:
        "Essaie une autre recherche ou catégorie.",
      view: "Voir",
      add: "Ajouter",
      new: "NOUVEAU",
      removeFavorite: "Retirer des favoris",
      addFavorite: "Ajouter aux favoris"
    },

    sort: {
      default: "Trier par défaut",
      low: "Prix croissant",
      high: "Prix décroissant",
      name: "Nom A-Z",
      newest: "Nouveautés"
    },

    categories: {
      all: "Toutes"
    },

    trust: {
      title: "Pourquoi NovaShop?",

      speedTitle: "🚀 Rapidité",
      speedText:
        "Une boutique pensée pour trouver rapidement ton matériel.",

      ordersTitle: "🛡️ Commandes",
      ordersText:
        "Retrouve tes commandes depuis ton compte.",

      trackingTitle: "📦 Suivi",
      trackingText:
        "Le statut de livraison peut être mis à jour depuis l'administration.",

      paymentTitle: "💳 Paiement",
      paymentText:
        "Nous acceptons les paiements par carte bancaire et PayPal."
    },

    reviews: {
      title: "⭐ Avis clients",
      lucas:
        "Très bon produit, livraison rapide.",
      maxime:
        "Produit conforme et bien emballé.",
      enzo:
        "Bonne expérience sur NovaShop.",
      detailed:
        "Les avis détaillés sont accessibles depuis chaque produit."
    },

    returns: {
      title: "↩️ Retours",
      text:
        "Pour toute question concernant une commande, contacte le support NovaShop:"
    },

    faq: {
      title: "FAQ",

      q1: "Comment commander?",
      a1:
        "Ajoute tes produits au panier, connecte-toi puis ouvre le checkout afin de renseigner ton adresse et ton mode de paiement.",

      q2: "Comment voir mes commandes?",
      a2:
        "Connecte-toi puis ouvre le bouton Commandes ou la section Mes commandes depuis ton compte.",

      q3: "Comment contacter le support?",
      a3:
        "Tu peux contacter le support NovaShop à:"
    },

    footer: {
      store: "Boutique gaming",
      support: "Support:"
    },

    cart: {
      title: "Panier",
      total: "Total",
      checkout: "Passer la commande",
      empty: "Ton panier est vide",
      emptyText:
        "Ajoute des produits pour commencer.",
      remove: "Supprimer"
    },

    auth: {
      login: "Connexion",
      register: "Créer un compte",
      email: "Email",
      password: "Mot de passe",
      connect: "Se connecter",
      create: "Créer mon compte",
      back: "Retour à la connexion",
      accountConnected: "👤 Compte connecté",
      myOrders: "📦 Mes commandes",
      logout: "🚪 Se déconnecter",
      successLogin: "Connexion réussie 👋",
      successRegister:
        "Compte créé avec succès 🎉",
      successLogout: "Déconnexion réussie.",
      close: "Fermer"
    },

    orders: {
      title: "Mes commandes",
      loading: "Chargement des commandes...",
      none: "Aucune commande",
      noneText:
        "Tu n'as pas encore passé de commande.",
      order: "Commande",
      status: "Statut:",
      view: "Voir la commande",
      impossible:
        "Impossible de charger les commandes."
    },

    order: {
      registered: "Enregistrée",
      accepted: "Acceptée",
      preparation: "Préparation",
      transit: "En transit",
      nearDelivery: "Livraison proche",
      delivered: "Livrée",
      cancelled: "Commande annulée",
      tracking: "Suivi:",
      estimated: "Livraison estimée:",
      destination: "📍 Destination:",
      trackingTitle: "Suivi",
      products: "Produits",
      delivery: "Livraison",
      total: "Total",
      invoice: "🧾 Voir la facture"
    },

    product: {
      addCart: "🛒 Ajouter au panier",
      removeFavorite: "❤️ Retirer des favoris",
      addFavorite: "♡ Ajouter aux favoris"
    },

    toast: {
      removedFavorite:
        "Retiré des favoris.",
      addedFavorite:
        "Ajouté aux favoris ❤️",
      addedCart:
        "Produit ajouté au panier 🛒"
    },

    card: {
      title: "💳 Carte",
      none: "Aucune carte créée.",
      generate: "Générer une carte",
      regenerate:
        "🔄 Générer une nouvelle carte",
      holder: "TITULAIRE",
      exp: "EXP",
      cvv: "CVV"
    },

    language: {
      title: "Langue",
      select: "Choisis ta langue",
      english: "English",
      french: "Français",
      german: "Deutsch"
    }

  },


  de: {

    nav: {
      home: "Startseite",
      products: "Produkte",
      reviews: "Bewertungen",
      faq: "FAQ",
      account: "Konto",
      orders: "Bestellungen",
      admin: "Admin",
      cart: "Warenkorb"
    },

    hero: {
      title1: "Dein Setup.",
      title2: "Dein Level.",
      description:
        "NovaShop bietet PC-Komponenten, Peripheriegeräte, Monitore, Audio, Streaming und Gaming-Zubehör.",
      products: "Produkte ansehen",
      cart: "Meinen Warenkorb ansehen",
      gaming: "NovaShop Gaming",
      subtitle: "Leistung, Zubehör und Setup."
    },

    products: {
      title: "Produkte",
      subtitle: "Finde deine nächste Ausrüstung.",
      search: "Produkt suchen...",
      catalog: "Katalog",
      product: "Produkt",
      products: "Produkte",
      noResults: "Kein Produkt gefunden",
      noResultsText:
        "Versuche eine andere Suche oder Kategorie.",
      view: "Ansehen",
      add: "Hinzufügen",
      new: "NEU",
      removeFavorite: "Aus Favoriten entfernen",
      addFavorite: "Zu Favoriten hinzufügen"
    },

    sort: {
      default: "Standardsortierung",
      low: "Preis aufsteigend",
      high: "Preis absteigend",
      name: "Name A-Z",
      newest: "Neuheiten"
    },

    categories: {
      all: "Alle"
    },

    trust: {
      title: "Warum NovaShop?",

      speedTitle: "🚀 Schnelligkeit",
      speedText:
        "Ein Shop, mit dem du deine Ausrüstung schnell findest.",

      ordersTitle: "🛡️ Bestellungen",
      ordersText:
        "Finde deine Bestellungen in deinem Konto.",

      trackingTitle: "📦 Sendungsverfolgung",
      trackingText:
        "Der Lieferstatus kann über die Verwaltung aktualisiert werden.",

      paymentTitle: "💳 Zahlung",
      paymentText:
        "Wir akzeptieren Kredit-/Debitkarten und PayPal."
    },

    reviews: {
      title: "⭐ Kundenbewertungen",
      lucas:
        "Sehr gutes Produkt, schnelle Lieferung.",
      maxime:
        "Produkt wie beschrieben und gut verpackt.",
      enzo:
        "Gute Erfahrung mit NovaShop.",
      detailed:
        "Detaillierte Bewertungen sind bei jedem Produkt verfügbar."
    },

    returns: {
      title: "↩️ Rückgaben",
      text:
        "Bei Fragen zu einer Bestellung kontaktiere den NovaShop-Support:"
    },

    faq: {
      title: "FAQ",

      q1: "Wie bestelle ich?",
      a1:
        "Lege deine Produkte in den Warenkorb, melde dich an und öffne anschließend den Checkout, um deine Adresse und Zahlungsmethode einzugeben.",

      q2: "Wie kann ich meine Bestellungen sehen?",
      a2:
        "Melde dich an und öffne die Bestellungen oder den Bereich Meine Bestellungen in deinem Konto.",

      q3: "Wie kontaktiere ich den Support?",
      a3:
        "Du kannst den NovaShop-Support kontaktieren unter:"
    },

    footer: {
      store: "Gaming-Shop",
      support: "Support:"
    },

    cart: {
      title: "Warenkorb",
      total: "Gesamt",
      checkout: "Zur Kasse",
      empty: "Dein Warenkorb ist leer",
      emptyText:
        "Füge Produkte hinzu, um zu beginnen.",
      remove: "Entfernen"
    },

    auth: {
      login: "Anmelden",
      register: "Konto erstellen",
      email: "E-Mail",
      password: "Passwort",
      connect: "Anmelden",
      create: "Mein Konto erstellen",
      back: "Zurück zur Anmeldung",
      accountConnected: "👤 Konto verbunden",
      myOrders: "📦 Meine Bestellungen",
      logout: "🚪 Abmelden",
      successLogin: "Anmeldung erfolgreich 👋",
      successRegister:
        "Konto erfolgreich erstellt 🎉",
      successLogout: "Abmeldung erfolgreich.",
      close: "Schließen"
    },

    orders: {
      title: "Meine Bestellungen",
      loading: "Bestellungen werden geladen...",
      none: "Keine Bestellungen",
      noneText:
        "Du hast noch keine Bestellung aufgegeben.",
      order: "Bestellung",
      status: "Status:",
      view: "Bestellung ansehen",
      impossible:
        "Bestellungen konnten nicht geladen werden."
    },

    order: {
      registered: "Registriert",
      accepted: "Akzeptiert",
      preparation: "Vorbereitung",
      transit: "Unterwegs",
      nearDelivery: "Lieferung steht bevor",
      delivered: "Geliefert",
      cancelled: "Bestellung storniert",
      tracking: "Sendungsverfolgung:",
      estimated: "Voraussichtliche Lieferung:",
      destination: "📍 Ziel:",
      trackingTitle: "Sendungsverfolgung",
      products: "Produkte",
      delivery: "Lieferung",
      total: "Gesamt",
      invoice: "🧾 Rechnung ansehen"
    },

    product: {
      addCart: "🛒 In den Warenkorb",
      removeFavorite: "❤️ Aus Favoriten entfernen",
      addFavorite: "♡ Zu Favoriten hinzufügen"
    },

    toast: {
      removedFavorite:
        "Aus Favoriten entfernt.",
      addedFavorite:
        "Zu Favoriten hinzugefügt ❤️",
      addedCart:
        "Produkt zum Warenkorb hinzugefügt 🛒"
    },

    card: {
      title: "💳 Karte",
      none: "Keine Karte erstellt.",
      generate: "Karte erstellen",
      regenerate:
        "🔄 Neue Karte erstellen",
      holder: "KARTENINHABER",
      exp: "EXP",
      cvv: "CVV"
    },

    language: {
      title: "Sprache",
      select: "Sprache auswählen",
      english: "English",
      french: "Français",
      german: "Deutsch"
    }

  }

};


// ============================================================
// TRADUCTION
// ============================================================

function t(path){

  const parts =
    String(path)
      .split(".");

  let value =
    translations[currentLanguage];

  for(const part of parts){

    if(
      value &&
      Object.prototype.hasOwnProperty.call(
        value,
        part
      )
    ){

      value =
        value[part];

    }else{

      return path;

    }

  }

  return value;
}


function setLanguage(language){

  if(!LANGUAGES[language]){
    language = "en";
  }

  currentLanguage =
    language;

  localStorage.setItem(
    LANGUAGE_STORAGE_KEY,
    currentLanguage
  );

  document.documentElement.lang =
    currentLanguage;

  applyStaticTranslations();

  renderCategories();
  renderProducts();
  renderCart();

}


function applyStaticTranslations(){

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if(!key){
        return;
      }

      element.textContent =
        t(key);

    });


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      if(!key){
        return;
      }

      element.placeholder =
        t(key);

    });


  document
    .querySelectorAll(
      "[data-i18n-title]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18nTitle;

      if(!key){
        return;
      }

      element.title =
        t(key);

    });


  document.title =
    "NovaShop";


  updateLanguageButton();

}


function updateLanguageButton(){

  const button =
    document.getElementById(
      "languageBtn"
    );

  if(!button){
    return;
  }

  button.textContent =
    `${LANGUAGES[currentLanguage].flag} ${LANGUAGES[currentLanguage].name}`;

}


// ============================================================
// SÉLECTEUR DE LANGUE
// ============================================================

function openLanguageSelector(){

  const options =
    Object.entries(
      LANGUAGES
    )
      .map(
        ([code,language]) => `
          <button
            type="button"
            class="view-btn language-option"
            data-language="${escapeAttr(code)}"
            style="
              width:100%;
              margin-top:8px;
              text-align:left;
            "
          >
            ${language.flag}
            ${escapeHTML(language.name)}
            ${
              code === currentLanguage
                ? " ✓"
                : ""
            }
          </button>
        `
      )
      .join("");


  showModal(
    t("language.title"),
    `
      <div>

        <p style="
          color:var(--muted);
          margin-bottom:12px;
        ">
          ${escapeHTML(
            t("language.select")
          )}
        </p>

        ${options}

      </div>
    `
  );


  modalContent
    ?.querySelectorAll(
      ".language-option"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          setLanguage(
            button.dataset.language
          );

          closeModal();

        }
      );

    });

}


// ============================================================
// PRODUITS
// ============================================================

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
    name:"Sony DualSense PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    options:{
      "Couleur":[
        "Rouge",
        "Blanc",
        "Noir",
        "Bleu"
      ]
    }
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
    name:"iiyama 23.8\" LED - G-Master GB2471HS-B1 Red Eagle",
    category:"Écrans",
    price:65.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id:"p21",
    name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
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
    name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
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
    name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category:"Bureaux gaming",
    price:86.99,
    image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id:"p26",
    name:"Bureau gaming d’angle HOMCOM réversible support écran",
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
    name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category:"Claviers",
    price:56.99,
    image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id:"p32",
    name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category:"Claviers",
    price:91.99,
    image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
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
    price:8,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },

  {
    id:"p39",
    name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
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
    image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    new:true
  },

  {
    id:"p44",
    name:"Apple iPhone 14 Pro 6,1\" 5G Double SIM 128 Go Argent",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg"
  },

  {
    id:"p45",
    name:"Apple iPhone 15 6,1\" 5G Double SIM 128 Go Noir",
    category:"Smartphones",
    price:750,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg"
  },

  {
    id:"p46",
    name:"Apple iPhone 16 6,1\" 5G 128 Go Double SIM Noir",
    category:"Smartphones",
    price:949.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg"
  },

  {
    id:"p47",
    name:"Apple iPhone 17 6,3\" 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1000,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p48",
    name:"Apple iPhone 18 Pro 6,3\" 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1199.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-Noir.jpg"
  },

  {
    id:"p49",
    name:"Samsung Galaxy S23 6,1\" 5G 8 Go RAM 256 Go Noir",
    category:"Smartphones",
    price:230,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg"
  },

  {
    id:"p50",
    name:"Samsung Galaxy S24 6,2\" 5G 256 Go Noir",
    category:"Smartphones",
    price:449.90,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p51",
    name:"Samsung Galaxy S25 Edge 6,7\" 5G 256 Go Noir absolu Titane",
    category:"Smartphones",
    price:469.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg"
  },

  {
    id:"p52",
    name:"Samsung Galaxy S26 6,3\" 5G 256 Go Noir + Buds4 Noir",
    category:"Smartphones",
    price:650.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg"
  },

  {
    id:"p53",
    name:"Google Pixel 8 6,2\" 5G Double SIM 128 Go Vert Sauge",
    category:"Smartphones",
    price:200,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg"
  },

  {
    id:"p54",
    name:"Google Pixel 9 6,3\" 5G Double nano-SIM 128 Go Noir Obsidienne",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Smartphone-Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg"
  },

  {
    id:"p55",
    name:"Google Pixel 10 6,3\" 5G Double SIM 256 Go Noir Volcanique",
    category:"Smartphones",
    price:600,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/4a/5f/b3/28532554/1540-1/tsp20260717111851/Google-Pixel-10-6-3-5G-Double-SIM-256-Go-Noir-Volcanique.jpg"
  },

  {
    id:"p56",
    name:"Flashforge Adventurer 5M Pro",
    category:"Imprimantes 3D",
    price:115,
    image:"https://www.makershop.fr/cdn/shop/files/13458.jpg?v=1760745366&width=150"
  },

  {
    id:"p57",
    name:"Elegoo Centauri 2",
    category:"Imprimantes 3D",
    price:200,
    image:"https://fr.elegoo.com/cdn/shop/files/C2-_-260811.jpg?crop=center&v=1786696280&width=345"
  },

  {
    id:"p58",
    name:"Anycubic Photon P1 Max",
    category:"Imprimantes 3D",
    price:600,
    image:"https://fr.anycubic.com/cdn/shop/files/P1M_8bd4d344-b751-4497-a535-4e647ecef572.jpg?v=1784100048&width=150"
  },

  {
    id:"p59",
    name:"GTA VI Key PlayStation",
    category:"Logiciels & licences",
    price:69.99,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm"
  },

  {
    id:"p60",
    name:"Microsoft Windows 11 Pro Key",
    category:"Logiciels & licences",
    price:24.99,
    image:"https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZicFhzSm8y/NjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw"
  },

  {
    id:"p61",
    name:"AsiaHorse Aurora-CO Gaines de Câble ARGB",
    category:"Accessoires composants PC",
    price:15.99,
    image:"https://m.media-amazon.com/images/I/71NF0H-6FXL._SL1500_.jpg"
  },

  {
    id:"p62",
    name:"Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:12.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/db/90/4a/21663963/1540-1/tsp20260909104107/Cable-video-Accsup-HDMI-2-0-4K-UHD-avec-Ethernet-5-m-Noir.jpg"
  },

  {
    id:"p63",
    name:"Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz",
    category:"Adaptateurs / câbles / chargeurs",
    price:19.99,
    image:"https://m.media-amazon.com/images/I/71BeNtX7nuL._SL1500_.jpg"
  },

  {
    id:"p64",
    name:"Câble USB-C ESSENTIELB vers USB-C 1M Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://boulanger.scene7.com/is/image/Boulanger/3497674179939_h_f_l_2?wid=2140&hei=2140&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha"
  },

  {
    id:"p65",
    name:"Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTbZBP9B2ZFpEsUD0AvNVwSq0_B-6_0GsDu3IetIMN8RMZJ2lyTDuYx7bb9GPIQjXhISHbaR4aEk-SzagBrynePs6wAuNpNgtJ3t4ZQj0FS9_oBKzFpPBG7Q"
  },

  {
    id:"p66",
    name:"Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/b8/07/17283238/1540-1/tsp20260617130730/Cable-USB-C-vers-Lightning-pour-Apple-iPhone-iPad-iPod-1m-Blanc.jpg"
  },

  {
    id:"p67",
    name:"BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M",
    category:"Adaptateurs / câbles / chargeurs",
    price:2.99,
    image:"https://m.media-amazon.com/images/I/61rGkIZqqCL._SL1500_.jpg"
  },

  {
    id:"p68",
    name:"StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13",
    category:"Adaptateurs / câbles / chargeurs",
    price:4.50,
    image:"https://m.media-amazon.com/images/I/81b1fyIWcOL._AC_SL1500_.jpg"
  },

  {
    id:"p69",
    name:"Unicavu Webcam PC 2K 30 FPS Full HD 1080P",
    category:"Caméras & webcams",
    price:10,
    image:"https://m.media-amazon.com/images/I/61CJsbKfonL._AC_SL1500_.jpg"
  },

  {
    id:"p70",
    name:"eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones",
    category:"Caméras & webcams",
    price:23.99,
    image:"https://m.media-amazon.com/images/I/61bCeQBjUwL._AC_SL1500_.jpg"
  },

  {
    id:"p71",
    name:"Quntis Lampe Écran Pc RGB, Monitor Light Bar IM 40 cm Noir",
    category:"Barres lumineuses pour écran",
    price:8.99,
    image:"https://m.media-amazon.com/images/I/71ESgk4ETPL._AC_SL1500_.jpg"
  },

  {
    id:"p72",
    name:"TONOR Micro Cardioïde Dynamique USB/XLR TD510+",
    category:"Microphones",
    price:20.99,
    image:"https://m.media-amazon.com/images/I/61EZnm+ijZL._AC_SL1500_.jpg"
  },

  {
    id:"p73",
    name:"BONTEC Bras Ecran PC à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans / écrans / TV",
    price:16,
    image:"https://m.media-amazon.com/images/I/61gjjZxKbeL._AC_SL1500_.jpg"
  },

  {
    id:"p74",
    name:"BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans / écrans / TV",
    price:29.99,
    image:"https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg"
  },

  {
    id:"p75",
    name:"BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category:"Supports écrans / écrans / TV",
    price:34.99,
    image:"https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg"
  },

  {
    id:"p76",
    name:"KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz",
    category:"Supports écrans / écrans / TV",
    price:80,
    image:"https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id:"p77",
    name:"KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz",
    category:"Supports écrans / écrans / TV",
    price:110,
    image:"https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id:"p78",
    name:"HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400",
    category:"Supports écrans / écrans / TV",
    price:170,
    image:"https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id:"p79",
    name:"HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P",
    category:"Supports écrans / écrans / TV",
    price:140,
    image:"https://m.media-amazon.com/images/I/81MjOWRE0SL._AC_SL1500_.jpg"
  },

  {
    id:"p80",
    name:"XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category:"Supports écrans / écrans / TV",
    price:249.99,
    image:"https://m.media-amazon.com/images/I/61Jk8xxkLZL._AC_SL1000_.jpg"
  },

  {
    id:"p81",
    name:"Xbox Manette sans fil",
    category:"Manettes & consoles",
    price:59.99,
    image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6wIhtxNP2QaG-jop_9zEc3ocgOoyylR8yGQtaOLB03vo8XmDPnxXQ28G-mPSoQrkAa8KKzGM2epP28dnD111Wswi0WwK5SzwB6lXHJD3HehOVs4qWa_hJ",
    options:{
      "Couleur":[
        "Rose",
        "Bleu",
        "Noir",
        "Rouge",
        "Blanc",
        "Vert"
      ]
    }
  },

  {
    id:"p82",
    name:"PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category:"Manettes & consoles",
    price:320,
    image:"https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options:{
      "Console":[
        "PS5 avec lecteur",
        "PS5 Pro"
      ]
    }
  },

  {
    id:"p83",
    name:"Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category:"Manettes & consoles",
    price:599.99,
    image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcusD9yD4CjvQ0KMaGfy7gks_86ZGPuTzO_g1WC408gKBPciVCGw0ZWdXs1XwR0ShylmqAB0NldAlBiHbyg-vFex0zI51YOExZsztGXboUXrL31Z5qHNHDew"
  },

  {
    id:"p84",
    name:"Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category:"Manettes & consoles",
    price:500,
    image:"https://m.media-amazon.com/images/I/61PI59RfWvL._AC_SX425_.jpg"
  }

];
