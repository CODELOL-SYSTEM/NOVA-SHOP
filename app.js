/* =========================================================
   NOVASHOP - APP.JS COMPLET
   Firebase Authentication
   Firestore
   Comptes
   Commandes
   Admin
   Validation adresse
   Panier
   Favoris
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION FIREBASE
   ========================================================= */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxG7ovNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};

const ADMIN_EMAIL =
  "pc2alex.les@gmail.com";

const ADMIN_CODE =
  "NOVA-ADMIN-2026";

/* =========================================================
   FIREBASE VARIABLES
   ========================================================= */

let firebaseApp = null;
let firebaseAuth = null;
let firebaseTools = null;

let firestore = null;
let firestoreTools = null;

window.currentUser = null;

let currentProfile = null;
let currentOrders = [];

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {

  cart:
    "novashop_cart",

  favorites:
    "novashop_favorites",

  profiles:
    "novashop_profiles",

  products:
    "novashop_products"
};

/* =========================================================
   DOM HELPER
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}

/* =========================================================
   TOAST
   ========================================================= */

function toast(message) {

  let box =
    document.querySelector(
      ".nova-toast"
    );

  if (!box) {

    box =
      document.createElement(
        "div"
      );

    box.className =
      "nova-toast";

    Object.assign(
      box.style,
      {
        position: "fixed",
        left: "50%",
        bottom: "25px",
        transform:
          "translateX(-50%)",
        zIndex: "999999",
        background: "#111827",
        color: "#fff",
        padding:
          "14px 20px",
        borderRadius:
          "12px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.35)",
        fontWeight: "700",
        maxWidth: "90%",
        textAlign: "center",
        transition: ".25s",
        opacity: "0"
      }
    );

    document.body.appendChild(
      box
    );
  }

  box.textContent =
    message;

  box.style.opacity =
    "1";

  clearTimeout(
    box._timer
  );

  box._timer =
    setTimeout(
      () => {
        box.style.opacity =
          "0";
      },
      3500
    );
}

/* =========================================================
   LOCAL STORAGE LOAD
   ========================================================= */

function load(
  key,
  fallback
) {

  try {

    const value =
      localStorage.getItem(
        key
      );

    if (!value) {
      return fallback;
    }

    return JSON.parse(
      value
    );

  } catch {

    return fallback;
  }
}

/* =========================================================
   LOCAL STORAGE SAVE
   ========================================================= */

function save(
  key,
  value
) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

/* =========================================================
   FIREBASE INITIALISATION
   ========================================================= */

async function initFirebase() {

  try {

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

    firebaseApp =
      appModule.initializeApp(
        FIREBASE_CONFIG
      );

    firebaseAuth =
      authModule.getAuth(
        firebaseApp
      );

    firebaseTools =
      authModule;

    firestore =
      firestoreModule.getFirestore(
        firebaseApp
      );

    firestoreTools =
      firestoreModule;

    console.log(
      "🔥 Firebase initialisé"
    );

    authModule.onAuthStateChanged(
      firebaseAuth,
      async user => {

        window.currentUser =
          user || null;

        if (user) {

          console.log(
            "👤 Utilisateur connecté :",
            user.email
          );

          await loadUserProfile(
            user
          );

          await loadUserOrders();

        } else {

          currentProfile =
            null;

          clearUserOrders();
        }

        updateAccountUI();
      }
    );

  } catch (error) {

    console.error(
      "❌ Erreur Firebase :",
      error
    );

    toast(
      "❌ Firebase n'a pas pu être chargé."
    );
  }
}

/* =========================================================
   FIREBASE AUTH ERRORS
   ========================================================= */

function showAuthError(
  error
) {

  console.error(
    "================================"
  );

  console.error(
    "ERREUR FIREBASE AUTH"
  );

  console.error(
    "CODE :",
    error?.code
  );

  console.error(
    "MESSAGE :",
    error?.message
  );

  console.error(
    "ERREUR :",
    error
  );

  console.error(
    "================================"
  );

  const code =
    error?.code ||
    "unknown";

  const messages = {

    "auth/invalid-credential":
      "❌ E-mail ou mot de passe incorrect.",

    "auth/invalid-login-credentials":
      "❌ E-mail ou mot de passe incorrect.",

    "auth/user-not-found":
      "❌ Aucun compte avec cet e-mail.",

    "auth/wrong-password":
      "❌ Mot de passe incorrect.",

    "auth/email-already-in-use":
      "❌ Cet e-mail est déjà utilisé.",

    "auth/weak-password":
      "❌ Mot de passe trop faible.",

    "auth/invalid-email":
      "❌ Adresse e-mail invalide.",

    "auth/missing-email":
      "❌ Adresse e-mail obligatoire.",

    "auth/missing-password":
      "❌ Mot de passe obligatoire.",

    "auth/unauthorized-domain":
      "❌ Ce domaine n'est pas autorisé dans Firebase.",

    "auth/operation-not-allowed":
      "❌ Connexion par e-mail non activée dans Firebase.",

    "auth/network-request-failed":
      "❌ Problème de connexion Internet.",

    "auth/too-many-requests":
      "❌ Trop de tentatives. Réessaie plus tard.",

    "auth/popup-closed-by-user":
      "❌ Fenêtre Google fermée.",

    "auth/popup-blocked":
      "❌ Fenêtre Google bloquée par le navigateur.",

    "auth/configuration-not-found":
      "❌ Configuration Firebase Auth manquante.",

    "auth/internal-error":
      "❌ Erreur interne Firebase.",

    "auth/app-not-authorized":
      "❌ Application non autorisée par Firebase.",

    "auth/invalid-api-key":
      "❌ Clé API Firebase invalide.",

    "auth/project-not-found":
      "❌ Projet Firebase introuvable."
  };

  toast(
    messages[code] ||
    `❌ Erreur Firebase : ${code}`
  );

  console.error(
    "Code Firebase :",
    code
  );
}

/* =========================================================
   PASSWORD VALIDATION
   ========================================================= */

function validatePassword(
  password
) {

  /*
    Règles :

    6 caractères minimum
    30 caractères maximum
    1 minuscule
    1 majuscule
    1 chiffre

    Les caractères spéciaux sont autorisés.
  */

  if (
    password.length < 6
  ) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins 6 caractères."
    };
  }

  if (
    password.length > 30
  ) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir maximum 30 caractères."
    };
  }

  if (
    !/[a-z]/.test(
      password
    )
  ) {

    return {
      valid: false,
      message:
        "Il faut au moins une minuscule."
    };
  }

  if (
    !/[A-Z]/.test(
      password
    )
  ) {

    return {
      valid: false,
      message:
        "Il faut au moins une majuscule."
    };
  }

  if (
    !/[0-9]/.test(
      password
    )
  ) {

    return {
      valid: false,
      message:
        "Il faut au moins un chiffre."
    };
  }

  return {
    valid: true,
    message:
      "Mot de passe valide."
  };
}

/* =========================================================
   SIGN UP
   ========================================================= */

async function signupEmail(
  e
) {

  e.preventDefault();

  if (
    !firebaseAuth ||
    !firebaseTools
  ) {

    toast(
      "❌ Firebase n'est pas encore chargé."
    );

    return;
  }

  const emailInput =
    $("signupEmail");

  const phoneInput =
    $("signupPhone");

  const passwordInput =
    $("signupPassword");

  const confirmInput =
    $("signupConfirm");

  if (
    !emailInput ||
    !passwordInput ||
    !confirmInput
  ) {

    toast(
      "❌ Formulaire d'inscription introuvable."
    );

    return;
  }

  const email =
    emailInput.value.trim();

  const phone =
    phoneInput
      ? phoneInput.value.trim()
      : "";

  const password =
    passwordInput.value;

  const confirm =
    confirmInput.value;

  /* =========================================
     EMAIL
     ========================================= */

  if (!email) {

    toast(
      "❌ Entre ton adresse e-mail."
    );

    return;
  }

  /* =========================================
     PASSWORD
     ========================================= */

  const passwordCheck =
    validatePassword(
      password
    );

  if (
    !passwordCheck.valid
  ) {

    toast(
      "❌ " +
      passwordCheck.message
    );

    return;
  }

  /* =========================================
     CONFIRMATION
     ========================================= */

  if (
    password !== confirm
  ) {

    toast(
      "❌ Les mots de passe ne correspondent pas."
    );

    return;
  }

  /* =========================================
     TELEPHONE
     ========================================= */

  if (
    phone &&
    phone.length < 8
  ) {

    toast(
      "❌ Numéro de téléphone invalide."
    );

    return;
  }

  try {

    toast(
      "⏳ Création du compte..."
    );

    const result =
      await firebaseTools
        .createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

    const user =
      result.user;

    console.log(
      "✅ Compte créé :",
      user.uid
    );

    /* =========================================
       PROFIL LOCAL
       ========================================= */

    const profiles =
      load(
        STORAGE.profiles,
        {}
      );

    profiles[user.uid] = {

      uid:
        user.uid,

      email:
        email,

      phone:
        phone,

      createdAt:
        new Date()
          .toISOString()
    };

    save(
      STORAGE.profiles,
      profiles
    );

    /* =========================================
       PROFIL FIRESTORE
       ========================================= */

    if (
      firestore &&
      firestoreTools
    ) {

      await firestoreTools.setDoc(

        firestoreTools.doc(
          firestore,
          "users",
          user.uid
        ),

        {

          uid:
            user.uid,

          email:
            email,

          phone:
            phone,

          createdAt:
            firestoreTools
              .serverTimestamp()
        }
      );
    }

    closeModal(
      "authModal"
    );

    toast(
      "✅ Compte créé avec succès !"
    );

    updateAccountUI();

  } catch (error) {

    showAuthError(
      error
    );
  }
}

/* =========================================================
   LOGIN
   ========================================================= */

async function loginEmail(
  e
) {

  e.preventDefault();

  if (
    !firebaseAuth ||
    !firebaseTools
  ) {

    toast(
      "❌ Firebase n'est pas encore chargé."
    );

    return;
  }

  const emailInput =
    $("loginEmail");

  const passwordInput =
    $("loginPassword");

  if (
    !emailInput ||
    !passwordInput
  ) {

    toast(
      "❌ Formulaire de connexion introuvable."
    );

    return;
  }

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value;

  if (!email) {

    toast(
      "❌ Entre ton adresse e-mail."
    );

    return;
  }

  if (!password) {

    toast(
      "❌ Entre ton mot de passe."
    );

    return;
  }

  try {

    toast(
      "⏳ Connexion..."
    );

    const result =
      await firebaseTools
        .signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

    console.log(
      "✅ Connexion réussie :",
      result.user.uid
    );

    closeModal(
      "authModal"
    );

    toast(
      "✅ Connexion réussie !"
    );

    updateAccountUI();

  } catch (error) {

    showAuthError(
      error
    );
  }
}

/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

async function loginGoogle() {

  if (
    !firebaseAuth ||
    !firebaseTools
  ) {

    toast(
      "❌ Firebase n'est pas encore chargé."
    );

    return;
  }

  try {

    const provider =
      new firebaseTools
        .GoogleAuthProvider();

    provider.setCustomParameters({
      prompt:
        "select_account"
    });

    await firebaseTools
      .signInWithPopup(
        firebaseAuth,
        provider
      );

    closeModal(
      "authModal"
    );

    toast(
      "✅ Connexion Google réussie !"
    );

  } catch (error) {

    showAuthError(
      error
    );
  }
}

/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

  if (
    !firebaseAuth ||
    !firebaseTools
  ) {

    return;
  }

  try {

    await firebaseTools
      .signOut(
        firebaseAuth
      );

    currentProfile =
      null;

    currentOrders =
      [];

    window.currentUser =
      null;

    toast(
      "👋 Déconnexion réussie."
    );

    updateAccountUI();

  } catch (error) {

    console.error(
      "Erreur déconnexion :",
      error
    );

    toast(
      "❌ Impossible de se déconnecter."
    );
  }
}

/* =========================================================
   LOAD USER PROFILE
   ========================================================= */

async function loadUserProfile(
  user
) {

  currentProfile = {

    uid:
      user.uid,

    email:
      user.email || "",

    phone:
      ""
  };

  if (
    !firestore ||
    !firestoreTools
  ) {

    return;
  }

  try {

    const ref =
      firestoreTools.doc(
        firestore,
        "users",
        user.uid
      );

    const snapshot =
      await firestoreTools.getDoc(
        ref
      );

    if (
      snapshot.exists()
    ) {

      currentProfile = {

        uid:
          user.uid,

        ...snapshot.data()
      };
    }

  } catch (error) {

    console.error(
      "Erreur profil :",
      error
    );
  }
}

/* =========================================================
   ACCOUNT UI
   ========================================================= */

function updateAccountUI() {

  const user =
    window.currentUser;

  document
    .querySelectorAll(
      "[data-account]"
    )
    .forEach(button => {

      button.textContent =
        user?.email ||
        "Compte";
    });

  document
    .querySelectorAll(
      ".logged-out"
    )
    .forEach(element => {

      element.style.display =
        user
          ? "none"
          : "";
    });

  document
    .querySelectorAll(
      ".logged-in"
    )
    .forEach(element => {

      element.style.display =
        user
          ? ""
          : "none";
    });

  document
    .querySelectorAll(
      "[data-user-email]"
    )
    .forEach(element => {

      element.textContent =
        user?.email ||
        "";
    });
}

/* =========================================================
   MODALS
   ========================================================= */

function openModal(
  id
) {

  const modal =
    $(id);

  if (!modal) {
    return;
  }

  modal.classList.add(
    "active"
  );

  modal.style.display =
    "flex";
}

function closeModal(
  id
) {

  const modal =
    $(id);

  if (!modal) {
    return;
  }

  modal.classList.remove(
    "active"
  );

  modal.style.display =
    "none";
}

/* =========================================================
   LOGIN / SIGNUP MODAL
   ========================================================= */

function showLogin() {

  const login =
    $("loginForm");

  const signup =
    $("signupForm");

  if (login) {

    login.style.display =
      "block";
  }

  if (signup) {

    signup.style.display =
      "none";
  }

  openModal(
    "authModal"
  );
}

function showSignup() {

  const login =
    $("loginForm");

  const signup =
    $("signupForm");

  if (login) {

    login.style.display =
      "none";
  }

  if (signup) {

    signup.style.display =
      "block";
  }

  openModal(
    "authModal"
  );
}

/* =========================================================
   ORDERS
   ========================================================= */

async function createOrder(
  orderData
) {

  if (
    !firebaseAuth?.currentUser
  ) {

    toast(
      "❌ Connecte-toi avant de commander."
    );

    return null;
  }

  if (
    !firestore ||
    !firestoreTools
  ) {

    toast(
      "❌ Firestore n'est pas disponible."
    );

    return null;
  }

  const user =
    firebaseAuth.currentUser;

  try {

    const ordersRef =
      firestoreTools.collection(
        firestore,
        "orders"
      );

    const order = {

      userId:
        user.uid,

      email:
        user.email || "",

      status:
        "Préparation",

      tracking:
        "",

      currentLocation:
        "Entrepôt NovaShop",

      destination:
        orderData.destination ||
        "",

      deliveryDate:
        orderData.deliveryDate ||
        "",

      deliveryDuration:
        orderData.deliveryDuration ||
        "",

      products:
        orderData.products ||
        [],

      total:
        Number(
          orderData.total || 0
        ),

      createdAt:
        firestoreTools
          .serverTimestamp(),

      updatedAt:
        firestoreTools
          .serverTimestamp()
    };

    const created =
      await firestoreTools.addDoc(
        ordersRef,
        order
      );

    toast(
      "✅ Commande créée !"
    );

    await loadUserOrders();

    return created.id;

  } catch (error) {

    console.error(
      "Erreur commande :",
      error
    );

    toast(
      "❌ Impossible de créer la commande."
    );

    return null;
  }
}

/* =========================================================
   LOAD ORDERS
   ========================================================= */

async function loadUserOrders() {

  if (
    !firebaseAuth?.currentUser
  ) {

    return;
  }

  if (
    !firestore ||
    !firestoreTools
  ) {

    return;
  }

  const user =
    firebaseAuth.currentUser;

  try {

    const ordersRef =
      firestoreTools.collection(
        firestore,
        "orders"
      );

    const q =
      firestoreTools.query(

        ordersRef,

        firestoreTools.where(
          "userId",
          "==",
          user.uid
        ),

        firestoreTools.orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await firestoreTools.getDocs(
        q
      );

    currentOrders =
      snapshot.docs.map(
        doc => ({
          id:
            doc.id,

          ...doc.data()
        })
      );

    renderUserOrders();

  } catch (error) {

    console.error(
      "Erreur commandes :",
      error
    );

    try {

      const ordersRef =
        firestoreTools.collection(
          firestore,
          "orders"
        );

      const q =
        firestoreTools.query(

          ordersRef,

          firestoreTools.where(
            "userId",
            "==",
            user.uid
          )
        );

      const snapshot =
        await firestoreTools.getDocs(
          q
        );

      currentOrders =
        snapshot.docs.map(
          doc => ({
            id:
              doc.id,

            ...doc.data()
          })
        );

      renderUserOrders();

    } catch (secondError) {

      console.error(
        "Erreur fallback commandes :",
        secondError
      );
    }
  }
}

/* =========================================================
   CLEAR ORDERS
   ========================================================= */

function clearUserOrders() {

  currentOrders =
    [];

  renderUserOrders();
}

/* =========================================================
   RENDER ORDERS
   ========================================================= */

function renderUserOrders() {

  const containers =
    document.querySelectorAll(
      "[data-orders]"
    );

  containers.forEach(
    container => {

      if (
        !window.currentUser
      ) {

        container.innerHTML = `
          <div class="empty-orders">
            <div style="font-size:40px">
              🔒
            </div>

            <h3>
              Connecte-toi
            </h3>

            <p>
              Connecte-toi pour voir tes commandes.
            </p>
          </div>
        `;

        return;
      }

      if (
        !currentOrders.length
      ) {

        container.innerHTML = `
          <div class="empty-orders">
            <div style="font-size:40px">
              📦
            </div>

            <h3>
              Aucune commande
            </h3>

            <p>
              Tes commandes apparaîtront ici.
            </p>
          </div>
        `;

        return;
      }

      container.innerHTML =
        currentOrders
          .map(order => {

            const products =
              Array.isArray(
                order.products
              )
                ? order.products
                : [];

            const productHTML =
              products
                .map(product => `

                  <div class="order-product">

                    <span>
                      ${escapeHTML(
                        product.name ||
                        "Produit"
                      )}
                    </span>

                    <strong>
                      ×${Number(
                        product.quantity ||
                        1
                      )}
                    </strong>

                  </div>

                `)
                .join("");

            return `

              <article class="order-card">

                <div class="order-header">

                  <div>

                    <small>
                      COMMANDE
                    </small>

                    <strong>
                      #${escapeHTML(
                        order.id
                      )}
                    </strong>

                  </div>

                  <span class="order-status">

                    ${escapeHTML(
                      order.status ||
                      "Préparation"
                    )}

                  </span>

                </div>

                <div class="order-info">

                  <div>

                    <span>
                      📍 Position actuelle
                    </span>

                    <strong>
                      ${escapeHTML(
                        order.currentLocation ||
                        "Non définie"
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      🏠 Destination
                    </span>

                    <strong>
                      ${escapeHTML(
                        order.destination ||
                        "Non définie"
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      🚚 Suivi
                    </span>

                    <strong>
                      ${escapeHTML(
                        order.tracking ||
                        "En préparation"
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>
                      📅 Livraison
                    </span>

                    <strong>
                      ${escapeHTML(
                        order.deliveryDate ||
                        "Date non définie"
                      )}
                    </strong>

                  </div>

                </div>

                <div class="order-products">

                  ${productHTML}

                </div>

                <div class="order-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ${formatPrice(
                      order.total
                    )}
                  </strong>

                </div>

              </article>

            `;

          })
          .join("");
    }
  );
}

/* =========================================================
   ADMIN
   ========================================================= */

function isAdmin() {

  const user =
    firebaseAuth?.currentUser;

  if (!user) {
    return false;
  }

  return (
    String(
      user.email || ""
    ).toLowerCase()
    ===
    ADMIN_EMAIL.toLowerCase()
  );
}

/* =========================================================
   ADMIN LOAD ORDERS
   ========================================================= */

async function loadAdminOrders() {

  if (!isAdmin()) {

    toast(
      "❌ Accès administrateur refusé."
    );

    return [];
  }

  if (
    !firestore ||
    !firestoreTools
  ) {

    return [];
  }

  try {

    const snapshot =
      await firestoreTools.getDocs(

        firestoreTools.collection(
          firestore,
          "orders"
        )

      );

    return snapshot.docs.map(
      doc => ({

        id:
          doc.id,

        ...doc.data()
      })
    );

  } catch (error) {

    console.error(
      "Erreur admin :",
      error
    );

    toast(
      "❌ Impossible de charger les commandes."
    );

    return [];
  }
}

/* =========================================================
   ADMIN UPDATE ORDER
   ========================================================= */

async function updateOrder(
  orderId,
  changes
) {

  if (!isAdmin()) {

    toast(
      "❌ Accès administrateur refusé."
    );

    return false;
  }

  if (
    !firestore ||
    !firestoreTools
  ) {

    return false;
  }

  try {

    const ref =
      firestoreTools.doc(
        firestore,
        "orders",
        orderId
      );

    await firestoreTools.updateDoc(
      ref,
      {

        ...changes,

        updatedAt:
          firestoreTools
            .serverTimestamp()
      }
    );

    toast(
      "✅ Commande mise à jour."
    );

    return true;

  } catch (error) {

    console.error(
      "Erreur modification :",
      error
    );

    toast(
      "❌ Impossible de modifier la commande."
    );

    return false;
  }
}

/* =========================================================
   ADMIN DELETE ORDER
   ========================================================= */

async function deleteOrder(
  orderId
) {

  if (!isAdmin()) {

    toast(
      "❌ Accès administrateur refusé."
    );

    return false;
  }

  if (
    !firestore ||
    !firestoreTools
  ) {

    return false;
  }

  const confirmation =
    confirm(
      "Supprimer cette commande définitivement ?"
    );

  if (!confirmation) {
    return false;
  }

  try {

    await firestoreTools.deleteDoc(

      firestoreTools.doc(
        firestore,
        "orders",
        orderId
      )

    );

    toast(
      "🗑️ Commande supprimée."
    );

    return true;

  } catch (error) {

    console.error(
      "Erreur suppression :",
      error
    );

    toast(
      "❌ Impossible de supprimer la commande."
    );

    return false;
  }
}

/* =========================================================
   ADDRESS API
   ========================================================= */

async function validateFrenchAddress(
  address
) {

  if (
    !address ||
    address.trim().length < 5
  ) {

    return {

      valid:
        false,

      message:
        "Adresse trop courte."
    };
  }

  try {

    const url =
      "https://api-adresse.data.gouv.fr/search/?q=" +
      encodeURIComponent(
        address
      ) +
      "&limit=5";

    const response =
      await fetch(
        url
      );

    if (!response.ok) {

      return {

        valid:
          false,

        message:
          "Impossible de vérifier l'adresse."
      };
    }

    const data =
      await response.json();

    if (
      !data.features ||
      !data.features.length
    ) {

      return {

        valid:
          false,

        message:
          "Adresse introuvable."
      };
    }

    const best =
      data.features[0];

    const properties =
      best.properties || {};

    return {

      valid:
        true,

      label:
        properties.label ||
        address,

      postcode:
        properties.postcode ||
        "",

      city:
        properties.city ||
        "",

      score:
        properties.score ||
        0,

      feature:
        best
    };

  } catch (error) {

    console.error(
      "Erreur API adresse :",
      error
    );

    return {

      valid:
        false,

      message:
        "Erreur lors de la vérification."
    };
  }
}

/* =========================================================
   CHECKOUT ADDRESS
   ========================================================= */

async function validateCheckoutAddress() {

  const input =
    $("checkoutAddress");

  if (!input) {
    return false;
  }

  const address =
    input.value.trim();

  const result =
    await validateFrenchAddress(
      address
    );

  if (
    !result.valid
  ) {

    toast(
      "❌ " +
      (
        result.message ||
        "Adresse invalide."
      )
    );

    input.classList.add(
      "invalid"
    );

    input.classList.remove(
      "valid"
    );

    return false;
  }

  input.classList.remove(
    "invalid"
  );

  input.classList.add(
    "valid"
  );

  toast(
    "✅ Adresse validée."
  );

  return result;
}

/* =========================================================
   PRICE
   ========================================================= */

function formatPrice(
  value
) {

  return new Intl.NumberFormat(
    "fr-FR",
    {

      style:
        "currency",

      currency:
        "EUR"
    }

  ).format(
    Number(
      value || 0
    )
  );
}

/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
  value
) {

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
   CART
   ========================================================= */

function getCart() {

  return load(
    STORAGE.cart,
    []
  );
}

function saveCart(
  cart
) {

  save(
    STORAGE.cart,
    cart
  );

  updateCartUI();
}

function addToCart(
  product
) {

  if (!product) {
    return;
  }

  const cart =
    getCart();

  const existing =
    cart.find(
      item =>
        String(item.id)
        ===
        String(product.id)
    );

  if (existing) {

    existing.quantity =
      Number(
        existing.quantity ||
        1
      ) + 1;

  } else {

    cart.push({

      ...product,

      quantity:
        1
    });
  }

  saveCart(
    cart
  );

  toast(
    "🛒 Produit ajouté au panier."
  );
}

function removeFromCart(
  productId
) {

  const cart =
    getCart()
      .filter(
        item =>
          String(item.id)
          !==
          String(productId)
      );

  saveCart(
    cart
  );
}

function clearCart() {

  saveCart(
    []
  );

  toast(
    "🗑️ Panier vidé."
  );
}

function updateCartQuantity(
  productId,
  quantity
) {

  const cart =
    getCart();

  const product =
    cart.find(
      item =>
        String(item.id)
        ===
        String(productId)
    );

  if (!product) {
    return;
  }

  product.quantity =
    Math.max(
      1,
      Number(
        quantity || 1
      )
    );

  saveCart(
    cart
  );
}

function getCartTotal() {

  return getCart()
    .reduce(
      (
        total,
        item
      ) => {

        return total +
          Number(
            item.price || 0
          ) *
          Number(
            item.quantity || 1
          );

      },
      0
    );
}

function updateCartUI() {

  const cart =
    getCart();

  const count =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.quantity || 1
        ),
      0
    );

  document
    .querySelectorAll(
      "[data-cart-count]"
    )
    .forEach(
      element => {

        element.textContent =
          count;
      }
    );

  document
    .querySelectorAll(
      "[data-cart-total]"
    )
    .forEach(
      element => {

        element.textContent =
          formatPrice(
            getCartTotal()
          );
      }
    );
}

/* =========================================================
   FAVORITES
   ========================================================= */

function getFavorites() {

  return load(
    STORAGE.favorites,
    []
  );
}

function toggleFavorite(
  productId
) {

  let favorites =
    getFavorites();

  const index =
    favorites.findIndex(
      id =>
        String(id)
        ===
        String(productId)
    );

  if (
    index >= 0
  ) {

    favorites.splice(
      index,
      1
    );

    toast(
      "💔 Retiré des favoris."
    );

  } else {

    favorites.push(
      productId
    );

    toast(
      "❤️ Ajouté aux favoris."
    );
  }

  save(
    STORAGE.favorites,
    favorites
  );

  updateFavoriteUI();
}

function updateFavoriteUI() {

  const favorites =
    getFavorites();

  document
    .querySelectorAll(
      "[data-favorite-id]"
    )
    .forEach(
      button => {

        const id =
          button.dataset.favoriteId;

        const active =
          favorites.some(
            favorite =>
              String(
                favorite
              )
              ===
              String(
                id
              )
          );

        button.classList.toggle(
          "active",
          active
        );

        button.textContent =
          active
            ? "♥"
            : "♡";
      }
    );
}

/* =========================================================
   CHECKOUT
   ========================================================= */

async function checkout() {

  if (
    !firebaseAuth?.currentUser
  ) {

    toast(
      "❌ Connecte-toi avant de payer."
    );

    openModal(
      "authModal"
    );

    return;
  }

  const cart =
    getCart();

  if (!cart.length) {

    toast(
      "🛒 Ton panier est vide."
    );

    return;
  }

  const addressInput =
    $("checkoutAddress");

  if (!addressInput) {

    toast(
      "❌ Adresse de livraison introuvable."
    );

    return;
  }

  const address =
    addressInput.value.trim();

  const validation =
    await validateFrenchAddress(
      address
    );

  if (
    !validation.valid
  ) {

    toast(
      "❌ Paiement bloqué : adresse invalide."
    );

    return;
  }

  const orderId =
    await createOrder({

      destination:
        validation.label,

      deliveryDate:
        "",

      deliveryDuration:
        "",

      products:
        cart.map(
          item => ({

            id:
              item.id,

            name:
              item.name,

            price:
              Number(
                item.price || 0
              ),

            quantity:
              Number(
                item.quantity || 1
              )
          })
        ),

      total:
        getCartTotal()
    });

  if (!orderId) {
    return;
  }

  clearCart();

  toast(
    "✅ Commande enregistrée."
  );
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const target =
      event.target.closest(
        "[data-action]"
      );

    if (!target) {
      return;
    }

    const action =
      target.dataset.action;

    switch (action) {

      case "login":

        showLogin();

        break;

      case "signup":

        showSignup();

        break;

      case "logout":

        logout();

        break;

      case "google-login":

        loginGoogle();

        break;

      case "close-auth":

        closeModal(
          "authModal"
        );

        break;

      case "checkout":

        checkout();

        break;

      case "clear-cart":

        clearCart();

        break;
    }
  }
);

/* =========================================================
   FORM LISTENER
   ========================================================= */

document.addEventListener(
  "submit",
  event => {

    if (
      event.target.id
      ===
      "loginForm"
    ) {

      loginEmail(
        event
      );
    }

    if (
      event.target.id
      ===
      "signupForm"
    ) {

      signupEmail(
        event
      );
    }
  }
);

/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key
      !==
      "Escape"
    ) {

      return;
    }

    document
      .querySelectorAll(
        ".modal.active"
      )
      .forEach(
        modal => {

          modal.classList.remove(
            "active"
          );

          modal.style.display =
            "none";
        }
      );
  }
);

/* =========================================================
   CLOSE MODAL OUTSIDE
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const modal =
      event.target.closest(
        ".modal"
      );

    if (
      modal &&
      event.target === modal
    ) {

      modal.classList.remove(
        "active"
      );

      modal.style.display =
        "none";
    }
  }
);

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    updateCartUI();

    updateFavoriteUI();

    updateAccountUI();

    await initFirebase();
  }
);

/* =========================================================
   GLOBAL NOVASHOP API
   ========================================================= */

window.NovaShop = {

  login:
    loginEmail,

  signup:
    signupEmail,

  logout:
    logout,

  loginGoogle:
    loginGoogle,

  createOrder:
    createOrder,

  loadUserOrders:
    loadUserOrders,

  loadAdminOrders:
    loadAdminOrders,

  updateOrder:
    updateOrder,

  deleteOrder:
    deleteOrder,

  validateFrenchAddress:
    validateFrenchAddress,

  validateCheckoutAddress:
    validateCheckoutAddress,

  getCart:
    getCart,

  addToCart:
    addToCart,

  removeFromCart:
    removeFromCart,

  clearCart:
    clearCart,

  updateCartQuantity:
    updateCartQuantity,

  getCartTotal:
    getCartTotal,

  toggleFavorite:
    toggleFavorite,

  isAdmin:
    isAdmin,

  validatePassword:
    validatePassword
};

/* =========================================================
   FIN
   ========================================================= */

console.log(
  "🚀 NovaShop prêt."
);
