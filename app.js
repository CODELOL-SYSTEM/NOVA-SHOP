/* =========================================================
   NOVASHOP - APP.JS COMPLET
   Firebase Auth + Firestore + Panier + Favoris + Commandes
   Validation adresse + Suivi commandes + Admin
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

const ADMIN_EMAIL = "pc2alex.les@gmail.com";
const ADMIN_CODE = "NOVA-ADMIN-2026";

let firebaseApp;
let auth;
let db;
let currentUser = null;
let firebaseReady = false;


/* =========================================================
   FIREBASE
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
      appModule.initializeApp(FIREBASE_CONFIG);

    auth = authModule.getAuth(firebaseApp);

    db = firestoreModule.getFirestore(firebaseApp);

    firebaseReady = true;


    authModule.onAuthStateChanged(
      auth,
      async user => {

        currentUser = user || null;

        updateAccountUI();

        if (user) {

          await saveBasicUserProfile(user);
          await loadUserProfile();
          await loadUserOrders();

          if (
            user.email &&
            user.email.toLowerCase() ===
            ADMIN_EMAIL.toLowerCase()
          ) {

            showAdminButton();

          } else {

            hideAdminButton();

          }

        } else {

          clearAccountUI();
          renderOrders([]);

          hideAdminButton();

        }

      }
    );


    console.log("NovaShop Firebase prêt.");

  } catch (error) {

    console.error(
      "Firebase initialization error:",
      error
    );

    showToast(
      "Erreur Firebase : impossible de charger le système."
    );

  }

}


/* =========================================================
   OUTILS
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


function showToast(message) {

  const toast = $("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__novaToastTimer);

  window.__novaToastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 3500);

}


window.showToast = showToast;


/* =========================================================
   VALIDATION MOT DE PASSE
   ========================================================= */

function validatePassword(password) {

  if (password.length < 6) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins 6 caractères."
    };

  }


  if (password.length > 30) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au maximum 30 caractères."
    };

  }


  if (!/[a-z]/.test(password)) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins une lettre minuscule."
    };

  }


  if (!/[A-Z]/.test(password)) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins une lettre majuscule."
    };

  }


  if (!/[0-9]/.test(password)) {

    return {
      valid: false,
      message:
        "Le mot de passe doit contenir au moins un chiffre."
    };

  }


  return {
    valid: true,
    message: ""
  };

}


/* =========================================================
   ERREURS FIREBASE AUTH
   ========================================================= */

function showAuthError(error) {

  console.error("Firebase Auth:", error);

  const code = error?.code || "";

  const messages = {

    "auth/email-already-in-use":
      "Cette adresse email possède déjà un compte.",

    "auth/invalid-email":
      "L'adresse email est invalide.",

    "auth/weak-password":
      "Le mot de passe est trop faible.",

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "Aucun compte ne correspond à cet email.",

    "auth/wrong-password":
      "Mot de passe incorrect.",

    "auth/user-disabled":
      "Ce compte a été désactivé.",

    "auth/popup-closed-by-user":
      "La fenêtre Google a été fermée.",

    "auth/popup-blocked":
      "Le navigateur a bloqué la fenêtre Google.",

    "auth/operation-not-allowed":
      "La méthode de connexion n'est pas activée dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/network-request-failed":
      "Erreur réseau. Vérifie ta connexion.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/configuration-not-found":
      "La configuration Firebase Authentication est incomplète."

  };


  showToast(
    messages[code] ||
    `Erreur de connexion (${code || "inconnue"}).`
  );

}


/* =========================================================
   PROFIL UTILISATEUR
   ========================================================= */

async function saveBasicUserProfile(user) {

  if (!firebaseReady || !db || !user) {
    return;
  }

  try {

    const {
      doc,
      setDoc,
      serverTimestamp
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email || "",
        phone: user.phoneNumber || "",
        updatedAt: serverTimestamp()
      },
      {
        merge: true
      }
    );

  } catch (error) {

    console.error(
      "Erreur sauvegarde profil:",
      error
    );

  }

}


async function loadUserProfile() {

  if (!currentUser || !db) {
    return;
  }

  try {

    const {
      doc,
      getDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    const snap =
      await getDoc(
        doc(
          db,
          "users",
          currentUser.uid
        )
      );


    const data =
      snap.exists()
        ? snap.data()
        : {};


    if ($("profileEmail")) {

      $("profileEmail").textContent =
        currentUser.email || data.email || "—";

    }


    if ($("profilePhone")) {

      $("profilePhone").textContent =
        data.phone ||
        currentUser.phoneNumber ||
        "—";

    }

  } catch (error) {

    console.error(
      "Erreur chargement profil:",
      error
    );

  }

}


function updateAccountUI() {

  const buttons =
    document.querySelectorAll(
      '[data-action="open-auth"]'
    );


  buttons.forEach(button => {

    if (currentUser) {

      button.textContent = "👤 Mon compte";

    } else {

      button.textContent = "👤 Compte";

    }

  });

}


function clearAccountUI() {

  if ($("profileEmail")) {
    $("profileEmail").textContent =
      "Non connecté";
  }

  if ($("profilePhone")) {
    $("profilePhone").textContent =
      "—";
  }

}


/* =========================================================
   INSCRIPTION
   ========================================================= */

async function signup() {

  if (!firebaseReady) {

    showToast(
      "Firebase n'est pas encore prêt."
    );

    return;

  }


  const email =
    $("signupEmail")?.value.trim();

  const phone =
    $("signupPhone")?.value.trim();

  const password =
    $("signupPassword")?.value || "";

  const confirm =
    $("signupConfirm")?.value || "";


  if (!email) {

    showToast("Entre ton adresse email.");

    return;

  }


  const passwordCheck =
    validatePassword(password);


  if (!passwordCheck.valid) {

    showToast(passwordCheck.message);

    return;

  }


  if (password !== confirm) {

    showToast(
      "Les deux mots de passe ne correspondent pas."
    );

    return;

  }


  try {

    const {
      createUserWithEmailAndPassword
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
    );


    const {
      doc,
      setDoc,
      serverTimestamp
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    const user =
      result.user;


    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),
      {
        uid: user.uid,
        email: user.email || email,
        phone: phone || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        merge: true
      }
    );


    localStorage.setItem(
      "novaUser",
      JSON.stringify({
        uid: user.uid,
        email: user.email || email,
        phone: phone || ""
      })
    );


    showToast(
      "Compte créé avec succès 🎉"
    );


    closeAuthModal();


  } catch (error) {

    showAuthError(error);

  }

}


/* =========================================================
   CONNEXION
   ========================================================= */

async function login() {

  if (!firebaseReady) {

    showToast(
      "Firebase n'est pas encore prêt."
    );

    return;

  }


  const email =
    $("loginEmail")?.value.trim();

  const password =
    $("loginPassword")?.value || "";


  if (!email || !password) {

    showToast(
      "Entre ton email et ton mot de passe."
    );

    return;

  }


  try {

    const {
      signInWithEmailAndPassword
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
    );


    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    localStorage.setItem(
      "novaUser",
      JSON.stringify({
        uid: result.user.uid,
        email: result.user.email || ""
      })
    );


    showToast(
      "Connexion réussie 👋"
    );


    closeAuthModal();


  } catch (error) {

    showAuthError(error);

  }

}


/* =========================================================
   GOOGLE
   ========================================================= */

async function loginWithGoogle() {

  if (!firebaseReady) {

    showToast(
      "Firebase n'est pas encore prêt."
    );

    return;

  }


  try {

    const {
      GoogleAuthProvider,
      signInWithPopup
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
    );


    const provider =
      new GoogleAuthProvider();


    const result =
      await signInWithPopup(
        auth,
        provider
      );


    await saveBasicUserProfile(
      result.user
    );


    showToast(
      "Connexion Google réussie 👋"
    );


    closeAuthModal();


  } catch (error) {

    showAuthError(error);

  }

}


/* =========================================================
   DÉCONNEXION
   ========================================================= */

async function logout() {

  if (!auth) {
    return;
  }

  try {

    const {
      signOut
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"
    );


    await signOut(auth);

    localStorage.removeItem(
      "novaUser"
    );


    showToast(
      "Tu es maintenant déconnecté."
    );

  } catch (error) {

    console.error(
      "Erreur déconnexion:",
      error
    );

    showToast(
      "Impossible de se déconnecter."
    );

  }

}


/* =========================================================
   MODAL AUTH
   ========================================================= */

function closeAuthModal() {

  const modal =
    $("authModal");

  if (modal) {
    modal.classList.remove("active");
  }

}


function switchAuth(type) {

  const loginForm =
    $("loginForm");

  const signupForm =
    $("signupForm");

  const loginTab =
    $("loginTab");

  const signupTab =
    $("signupTab");


  if (
    !loginForm ||
    !signupForm ||
    !loginTab ||
    !signupTab
  ) {
    return;
  }


  if (type === "login") {

    loginForm.classList.add("active");
    signupForm.classList.remove("active");

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

  } else {

    signupForm.classList.add("active");
    loginForm.classList.remove("active");

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

  }

}


/* =========================================================
   PANIER
   ========================================================= */

let cart =
  JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );


function saveCart() {

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function addToCart(product) {

  if (!product || !product.id) {
    return;
  }


  const existing =
    cart.find(
      item => item.id === product.id
    );


  if (existing) {

    existing.quantity =
      (existing.quantity || 1) + 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name || "Produit",
      price: Number(product.price) || 0,
      image: product.image || "",
      quantity: 1
    });

  }


  saveCart();
  renderCart();


  showToast(
    `${product.name || "Produit"} ajouté au panier 🛒`
  );

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  saveCart();
  renderCart();

}


function changeCartQuantity(id, amount) {

  const item =
    cart.find(
      product => product.id === id
    );


  if (!item) {
    return;
  }


  item.quantity =
    Math.max(
      1,
      (item.quantity || 1) + amount
    );


  saveCart();
  renderCart();

}


function getCartTotal() {

  return cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

}


function renderCart() {

  const container =
    $("cartContainer");

  if (!container) {
    return;
  }


  if (!cart.length) {

    container.innerHTML =
      `
      <div class="empty">
        Ton panier est vide.
      </div>
      `;

    if ($("cartTotal")) {
      $("cartTotal").textContent =
        "Total : 0,00 €";
    }

    return;

  }


  container.innerHTML =
    cart.map(item => {

      const quantity =
        Number(item.quantity || 1);

      const subtotal =
        Number(item.price || 0) *
        quantity;


      return `
        <div class="cart-item">

          <div class="cart-item-left">

            ${
              item.image
                ? `
                  <img
                    src="${escapeHtml(item.image)}"
                    alt="">
                `
                : ""
            }

            <div>

              <div class="cart-name">
                ${escapeHtml(item.name)}
              </div>

              <div class="cart-price">
                ${formatPrice(item.price)}
              </div>

              <div style="
                margin-top:8px;
                display:flex;
                gap:6px;
                align-items:center;
              ">

                <button
                  class="btn btn-secondary"
                  style="padding:5px 9px"
                  onclick="NovaShop.changeCartQuantity('${escapeJs(item.id)}', -1)">
                  −
                </button>

                <strong>
                  ${quantity}
                </strong>

                <button
                  class="btn btn-secondary"
                  style="padding:5px 9px"
                  onclick="NovaShop.changeCartQuantity('${escapeJs(item.id)}', 1)">
                  +
                </button>

              </div>

            </div>

          </div>


          <div style="text-align:right">

            <strong>
              ${formatPrice(subtotal)}
            </strong>

            <br>

            <button
              class="btn btn-secondary"
              style="margin-top:8px;padding:7px 10px"
              onclick="NovaShop.removeFromCart('${escapeJs(item.id)}')">
              Supprimer
            </button>

          </div>

        </div>
      `;

    }).join("");


  if ($("cartTotal")) {

    $("cartTotal").textContent =
      `Total : ${formatPrice(getCartTotal())}`;

  }

}


/* =========================================================
   FAVORIS
   ========================================================= */

let favorites =
  JSON.parse(
    localStorage.getItem(
      "novaFavorites"
    ) || "[]"
  );


function saveFavorites() {

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}


function toggleFavorite(productId) {

  if (
    favorites.includes(productId)
  ) {

    favorites =
      favorites.filter(
        id => id !== productId
      );

    showToast(
      "Retiré des favoris."
    );

  } else {

    favorites.push(productId);

    showToast(
      "Ajouté aux favoris ❤️"
    );

  }


  saveFavorites();

}


function isFavorite(productId) {

  return favorites.includes(
    productId
  );

}


/* =========================================================
   ADRESSE FRANCE
   ========================================================= */

async function validateFrenchAddress(address) {

  if (!address || address.trim().length < 5) {

    return {
      valid: false,
      message: "Adresse trop courte."
    };

  }


  try {

    const url =
      "https://api-adresse.data.gouv.fr/search/?q=" +
      encodeURIComponent(address) +
      "&limit=5";


    const response =
      await fetch(url);


    if (!response.ok) {

      return {
        valid: false,
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
        valid: false,
        message:
          "Adresse introuvable."
      };

    }


    const best =
      data.features[0];


    return {
      valid: true,
      message: "Adresse valide.",
      result: best
    };


  } catch (error) {

    console.error(
      "Erreur validation adresse:",
      error
    );


    return {
      valid: false,
      message:
        "Erreur pendant la vérification."
    };

  }

}


/* =========================================================
   CHECKOUT
   ========================================================= */

async function checkout() {

  if (!currentUser) {

    showToast(
      "Connecte-toi avant de commander."
    );

    const modal =
      $("authModal");

    if (modal) {
      modal.classList.add("active");
    }

    return;

  }


  if (!cart.length) {

    showToast(
      "Ton panier est vide."
    );

    return;

  }


  const address =
    prompt(
      "Entre ton adresse complète de livraison :"
    );


  if (!address) {

    showToast(
      "Commande annulée."
    );

    return;

  }


  showToast(
    "Vérification de l'adresse..."
  );


  const validation =
    await validateFrenchAddress(
      address
    );


  if (!validation.valid) {

    showToast(
      "❌ Adresse invalide : " +
      validation.message
    );

    return;

  }


  const confirmed =
    confirm(
      "Adresse validée :\n\n" +
      validation.result.properties.label +
      "\n\nConfirmer la commande ?"
    );


  if (!confirmed) {
    return;
  }


  try {

    const {
      collection,
      addDoc,
      serverTimestamp
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    const order = {

      userId:
        currentUser.uid,

      userEmail:
        currentUser.email || "",

      items:
        cart.map(item => ({
          id: item.id,
          name: item.name,
          price: Number(item.price || 0),
          quantity:
            Number(item.quantity || 1),
          image:
            item.image || ""
        })),

      total:
        Number(
          getCartTotal().toFixed(2)
        ),

      address:
        validation.result.properties.label,

      destination:
        validation.result.properties.label,

      currentLocation:
        "Commande reçue",

      status:
        "Commande confirmée",

      tracking:
        "Préparation de la commande",

      deliveryDate:
        null,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp()

    };


    const ref =
      await addDoc(
        collection(db, "orders"),
        order
      );


    cart = [];

    saveCart();
    renderCart();

    await loadUserOrders();


    showToast(
      "Commande créée 🎉 #" +
      ref.id.slice(0, 8)
    );


    location.href =
      "#commandes";


  } catch (error) {

    console.error(
      "Erreur création commande:",
      error
    );


    showToast(
      "Impossible de créer la commande."
    );

  }

}


/* =========================================================
   COMMANDES
   ========================================================= */

async function loadUserOrders() {

  if (!currentUser || !db) {

    renderOrders([]);

    return;

  }


  try {

    const {
      collection,
      query,
      where,
      orderBy,
      getDocs
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    let snapshot;


    try {

      const q =
        query(
          collection(db, "orders"),
          where(
            "userId",
            "==",
            currentUser.uid
          ),
          orderBy(
            "createdAt",
            "desc"
          )
        );


      snapshot =
        await getDocs(q);


    } catch (firstError) {

      console.warn(
        "Query avec orderBy échouée, fallback:",
        firstError
      );


      const q =
        query(
          collection(db, "orders"),
          where(
            "userId",
            "==",
            currentUser.uid
          )
        );


      snapshot =
        await getDocs(q);

    }


    const orders =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );


    orders.sort(
      (a, b) =>
        getTimestampMs(b.createdAt) -
        getTimestampMs(a.createdAt)
    );


    renderOrders(orders);


  } catch (error) {

    console.error(
      "Erreur chargement commandes:",
      error
    );


    renderOrders([]);

    showToast(
      "Impossible de charger les commandes."
    );

  }

}


function renderOrders(orders) {

  const container =
    $("ordersContainer") ||
    document.querySelector(
      "[data-orders]"
    );


  if (!container) {
    return;
  }


  if (!currentUser) {

    container.innerHTML =
      `
      <div class="empty">
        Connecte-toi pour voir tes commandes.
      </div>
      `;

    return;

  }


  if (!orders.length) {

    container.innerHTML =
      `
      <div class="empty">
        Tu n'as aucune commande pour le moment.
      </div>
      `;

    return;

  }


  container.innerHTML =
    orders.map(order => {

      const created =
        formatDate(
          order.createdAt
        );


      const delivery =
        order.deliveryDate
          ? formatDate(
              order.deliveryDate
            )
          : "Non définie";


      const items =
        Array.isArray(order.items)
          ? order.items
          : [];


      const itemCount =
        items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.quantity || 1
            ),
          0
        );


      return `
        <div class="order-card">

          <div class="order-top">

            <div>

              <div class="order-id">
                Commande #${escapeHtml(order.id.slice(0, 10))}
              </div>

              <small style="color:#7f889e">
                ${created}
              </small>

            </div>

            <div class="order-status">
              ${escapeHtml(order.status || "En cours")}
            </div>

          </div>


          <div style="
            color:#aeb6ca;
            line-height:1.6;
          ">

            ${itemCount}
            article${itemCount > 1 ? "s" : ""}

            •

            ${formatPrice(order.total || 0)}

          </div>


          <div class="tracking">

            📍 <strong>Position actuelle :</strong>
            ${escapeHtml(
              order.currentLocation ||
              "En préparation"
            )}

            <br>

            🎯 <strong>Destination :</strong>
            ${escapeHtml(
              order.destination ||
              order.address ||
              "Non renseignée"
            )}

            <br>

            🚚 <strong>Suivi :</strong>
            ${escapeHtml(
              order.tracking ||
              "En préparation"
            )}

            <br>

            📅 <strong>Livraison :</strong>
            ${delivery}

          </div>

        </div>
      `;

    }).join("");

}


/* =========================================================
   ADMIN
   ========================================================= */

function isAdmin() {

  return !!(
    currentUser &&
    currentUser.email &&
    currentUser.email.toLowerCase() ===
    ADMIN_EMAIL.toLowerCase()
  );

}


function showAdminButton() {

  let button =
    $("adminButton");


  if (button) {

    button.style.display =
      "inline-flex";

    return;

  }


  button =
    document.createElement(
      "button"
    );


  button.id =
    "adminButton";

  button.className =
    "nav-btn nav-primary";

  button.textContent =
    "⚙️ Admin";

  button.onclick =
    openAdminPanel;


  const nav =
    document.querySelector(
      ".nav-links"
    );


  if (nav) {
    nav.appendChild(button);
  }

}


function hideAdminButton() {

  const button =
    $("adminButton");

  if (button) {

    button.style.display =
      "none";

  }

}


async function openAdminPanel() {

  if (!isAdmin()) {

    showToast(
      "Accès administrateur refusé."
    );

    return;

  }


  const code =
    prompt(
      "Code administrateur :"
    );


  if (code !== ADMIN_CODE) {

    showToast(
      "Code administrateur incorrect."
    );

    return;

  }


  await loadAdminOrders();

}


/* =========================================================
   ADMIN : CHARGEMENT COMMANDES
   ========================================================= */

async function loadAdminOrders() {

  if (!isAdmin()) {
    return;
  }


  try {

    const {
      collection,
      getDocs,
      query,
      orderBy
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    let snapshot;


    try {

      snapshot =
        await getDocs(
          query(
            collection(db, "orders"),
            orderBy(
              "createdAt",
              "desc"
            )
          )
        );

    } catch {

      snapshot =
        await getDocs(
          collection(db, "orders")
        );

    }


    const orders =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );


    renderAdminPanel(orders);


  } catch (error) {

    console.error(
      "Erreur admin:",
      error
    );

    showToast(
      "Impossible de charger les commandes admin."
    );

  }

}


/* =========================================================
   ADMIN : INTERFACE
   ========================================================= */

function renderAdminPanel(orders) {

  let panel =
    $("adminPanel");


  if (!panel) {

    panel =
      document.createElement(
        "div"
      );

    panel.id =
      "adminPanel";

    panel.style.cssText = `
      position:fixed;
      inset:0;
      z-index:5000;
      overflow:auto;
      background:#070912;
      color:#fff;
      padding:30px;
    `;

    document.body.appendChild(
      panel
    );

  }


  panel.innerHTML = `

    <div style="
      max-width:1200px;
      margin:auto;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:20px;
        margin-bottom:25px;
      ">

        <div>

          <h1>
            ⚙️ NovaShop Admin
          </h1>

          <p style="
            color:#8992a9;
            margin-top:7px;
          ">
            Gestion des commandes.
          </p>

        </div>


        <button
          class="btn btn-secondary"
          onclick="NovaShop.closeAdminPanel()">
          Fermer
        </button>

      </div>


      <div id="adminOrders">

        ${
          orders.length
            ? orders.map(
                renderAdminOrder
              ).join("")
            : `
              <div class="panel">
                Aucune commande.
              </div>
            `
        }

      </div>

    </div>

  `;

}


function renderAdminOrder(order) {

  return `

    <div
      class="panel"
      style="
        margin-bottom:15px;
      ">

      <div style="
        display:flex;
        justify-content:space-between;
        gap:15px;
        flex-wrap:wrap;
      ">

        <div>

          <strong>
            Commande #${escapeHtml(order.id.slice(0, 10))}
          </strong>

          <div style="
            color:#8c95a9;
            margin-top:6px;
          ">

            ${escapeHtml(
              order.userEmail || "—"
            )}

          </div>

        </div>


        <strong>
          ${formatPrice(order.total || 0)}
        </strong>

      </div>


      <div style="
        display:grid;
        grid-template-columns:
          repeat(auto-fit,minmax(200px,1fr));
        gap:10px;
        margin-top:18px;
      ">

        <input
          id="status-${order.id}"
          value="${escapeAttr(order.status || "")}"
          placeholder="Statut">

        <input
          id="location-${order.id}"
          value="${escapeAttr(order.currentLocation || "")}"
          placeholder="Position actuelle">

        <input
          id="destination-${order.id}"
          value="${escapeAttr(order.destination || "")}"
          placeholder="Destination">

        <input
          id="tracking-${order.id}"
          value="${escapeAttr(order.tracking || "")}"
          placeholder="Suivi">

        <input
          id="delivery-${order.id}"
          value="${escapeAttr(toInputDate(order.deliveryDate))}"
          type="datetime-local">

      </div>


      <div style="
        margin-top:12px;
        display:flex;
        gap:10px;
        flex-wrap:wrap;
      ">

        <button
          class="btn btn-primary"
          onclick="NovaShop.updateOrder('${escapeJs(order.id)}')">
          💾 Enregistrer
        </button>

        <button
          class="btn btn-secondary"
          onclick="NovaShop.deleteOrder('${escapeJs(order.id)}')">
          🗑️ Supprimer
        </button>

      </div>

    </div>

  `;

}


async function updateOrder(orderId) {

  if (!isAdmin()) {

    showToast(
      "Accès refusé."
    );

    return;

  }


  try {

    const {
      doc,
      updateDoc,
      serverTimestamp
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    const status =
      $(`status-${orderId}`)?.value.trim();

    const location =
      $(`location-${orderId}`)?.value.trim();

    const destination =
      $(`destination-${orderId}`)?.value.trim();

    const tracking =
      $(`tracking-${orderId}`)?.value.trim();

    const delivery =
      $(`delivery-${orderId}`)?.value;


    await updateDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      {

        status:
          status || "En cours",

        currentLocation:
          location || "",

        destination:
          destination || "",

        tracking:
          tracking || "",

        deliveryDate:
          delivery
            ? new Date(delivery).toISOString()
            : null,

        updatedAt:
          serverTimestamp()

      }
    );


    showToast(
      "Commande mise à jour ✅"
    );


    await loadAdminOrders();


    if (currentUser) {
      await loadUserOrders();
    }


  } catch (error) {

    console.error(
      "Erreur update order:",
      error
    );

    showToast(
      "Impossible de modifier la commande."
    );

  }

}


async function deleteOrder(orderId) {

  if (!isAdmin()) {
    return;
  }


  const confirmed =
    confirm(
      "Supprimer définitivement cette commande ?"
    );


  if (!confirmed) {
    return;
  }


  try {

    const {
      doc,
      deleteDoc
    } = await import(
      "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
    );


    await deleteDoc(
      doc(
        db,
        "orders",
        orderId
      )
    );


    showToast(
      "Commande supprimée."
    );


    await loadAdminOrders();


  } catch (error) {

    console.error(
      "Erreur suppression:",
      error
    );

    showToast(
      "Impossible de supprimer la commande."
    );

  }

}


function closeAdminPanel() {

  const panel =
    $("adminPanel");

  if (panel) {

    panel.remove();

  }

}


/* =========================================================
   OUTILS DATE
   ========================================================= */

function getTimestampMs(timestamp) {

  if (!timestamp) {
    return 0;
  }


  if (
    typeof timestamp.toMillis ===
    "function"
  ) {

    return timestamp.toMillis();

  }


  if (
    timestamp instanceof Date
  ) {

    return timestamp.getTime();

  }


  if (
    typeof timestamp === "string"
  ) {

    const time =
      Date.parse(timestamp);

    return Number.isNaN(time)
      ? 0
      : time;

  }


  if (
    typeof timestamp === "number"
  ) {

    return timestamp;

  }


  return 0;

}


function formatDate(value) {

  if (!value) {
    return "—";
  }


  const ms =
    getTimestampMs(value);


  if (!ms) {
    return "—";
  }


  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(
    new Date(ms)
  );

}


function toInputDate(value) {

  if (!value) {
    return "";
  }


  let date;


  if (
    typeof value.toDate ===
    "function"
  ) {

    date =
      value.toDate();

  } else {

    date =
      new Date(value);

  }


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  const pad =
    n =>
      String(n).padStart(
        2,
        "0"
      );


  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );

}


/* =========================================================
   FORMATAGE
   ========================================================= */

function formatPrice(value) {

  return new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR"
    }
  ).format(
    Number(value || 0)
  );

}


function escapeHtml(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttr(value) {

  return escapeHtml(value);

}


function escapeJs(value) {

  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\r");

}


/* =========================================================
   FORMULAIRES
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const loginForm =
      $("loginForm");


    const signupForm =
      $("signupForm");


    if (loginForm) {

      loginForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          login();

        }
      );

    }


    if (signupForm) {

      signupForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();

          signup();

        }
      );

    }


    const googleButton =
      $("googleLoginBtn");


    if (googleButton) {

      googleButton.addEventListener(
        "click",
        loginWithGoogle
      );

    }


    const password =
      $("signupPassword");


    if (password) {

      password.addEventListener(
        "input",
        () => {

          const result =
            validatePassword(
              password.value
            );


          if (
            password.value &&
            !result.valid
          ) {

            password.style.borderColor =
              "#ff5c70";

          } else {

            password.style.borderColor =
              "";

          }

        }
      );

    }


    renderCart();

    initFirebase();

  }
);


/* =========================================================
   FERMETURE MODAL
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const modal =
      $("authModal");


    if (
      modal &&
      event.target === modal
    ) {

      modal.classList.remove(
        "active"
      );

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeAuthModal();
      closeAdminPanel();

    }

  }
);


/* =========================================================
   API NOVASHOP
   ========================================================= */

window.NovaShop = {

  addToCart,

  removeFromCart,

  changeCartQuantity,

  renderCart,

  getCartTotal,

  toggleFavorite,

  isFavorite,

  checkout,

  validateFrenchAddress,

  login,

  signup,

  loginWithGoogle,

  logout,

  loadUserOrders,

  openAdminPanel,

  updateOrder,

  deleteOrder,

  closeAdminPanel,

  switchAuth

};


/* =========================================================
   FIN
   ========================================================= */
