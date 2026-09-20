// ==========================================
// NOVASHOP - APP.JS
// FIREBASE + AUTHENTIFICATION
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
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
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};


// ==========================================
// INITIALISATION
// ==========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ==========================================
// TEST FIREBASE
// ==========================================

console.log("🔥 NOVASHOP FIREBASE OK");
console.log("Projet :", firebaseConfig.projectId);


// ==========================================
// UTILITAIRE
// ==========================================

function $(id) {
  return document.getElementById(id);
}


// ==========================================
// TOAST
// ==========================================

function showToast(message) {

  const toast = $("toast");

  if (!toast) {
    console.log(message);
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.novaToastTimer);

  window.novaToastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);
}


// ==========================================
// MESSAGE AUTH
// ==========================================

function authMessage(message) {

  const box =
    $("authMessage") ||
    $("loginMessage") ||
    $("registerMessage");

  if (box) {
    box.textContent = message;
  }

  console.log(message);
}


// ==========================================
// ERREURS FIREBASE
// ==========================================

function firebaseAuthError(error) {

  console.error("❌ ERREUR FIREBASE :", error);

  const code = error?.code || "";

  let message = "Une erreur est survenue.";

  if (
    code === "auth/api-key-not-valid" ||
    code === "auth/invalid-api-key"
  ) {

    message =
      "❌ La clé API Firebase n'est pas valide.";

  }

  else if (
    code === "auth/operation-not-allowed"
  ) {

    message =
      "❌ Active Email/Password dans Firebase Authentication.";

  }

  else if (
    code === "auth/unauthorized-domain"
  ) {

    message =
      "❌ Le domaine de ce site n'est pas autorisé dans Firebase.";

  }

  else if (
    code === "auth/email-already-in-use"
  ) {

    message =
      "❌ Cet email possède déjà un compte.";

  }

  else if (
    code === "auth/invalid-email"
  ) {

    message =
      "❌ Adresse email invalide.";

  }

  else if (
    code === "auth/weak-password"
  ) {

    message =
      "❌ Mot de passe trop faible. Minimum 6 caractères.";

  }

  else if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {

    message =
      "❌ Email ou mot de passe incorrect.";

  }

  else if (
    code === "auth/too-many-requests"
  ) {

    message =
      "❌ Trop de tentatives. Réessaie plus tard.";

  }

  else if (
    code === "auth/network-request-failed"
  ) {

    message =
      "❌ Erreur réseau. Vérifie Internet.";

  }

  else if (
    code === "auth/user-disabled"
  ) {

    message =
      "❌ Ce compte est désactivé.";

  }

  else {

    message =
      `❌ Erreur Firebase : ${code || error?.message || "inconnue"}`;

  }

  authMessage(message);

}


// ==========================================
// CRÉATION DE COMPTE
// ==========================================

async function register() {

  const email =
    $("authEmail")?.value?.trim();

  const password =
    $("authPassword")?.value || "";


  if (!email) {

    authMessage(
      "Entre ton adresse email."
    );

    return;

  }


  if (!password) {

    authMessage(
      "Entre un mot de passe."
    );

    return;

  }


  if (password.length < 6) {

    authMessage(
      "Le mot de passe doit contenir au moins 6 caractères."
    );

    return;

  }


  try {

    console.log(
      "🟡 Création du compte...",
      email
    );


    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ COMPTE CRÉÉ",
      credential.user.uid
    );


    authMessage(
      "✅ Compte créé avec succès !"
    );


    showToast(
      "Compte créé avec succès ✓"
    );


  }

  catch (error) {

    firebaseAuthError(error);

  }

}


// ==========================================
// CONNEXION
// ==========================================

async function login() {

  const email =
    $("authEmail")?.value?.trim();

  const password =
    $("authPassword")?.value || "";


  if (!email) {

    authMessage(
      "Entre ton adresse email."
    );

    return;

  }


  if (!password) {

    authMessage(
      "Entre ton mot de passe."
    );

    return;

  }


  try {

    console.log(
      "🟡 Connexion...",
      email
    );


    const credential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ CONNECTÉ",
      credential.user.uid
    );


    authMessage(
      "✅ Connexion réussie !"
    );


    showToast(
      "Connexion réussie ✓"
    );


  }

  catch (error) {

    firebaseAuthError(error);

  }

}


// ==========================================
// DÉCONNEXION
// ==========================================

async function logout() {

  try {

    await signOut(auth);

    showToast(
      "Déconnexion réussie ✓"
    );

  }

  catch (error) {

    console.error(
      "❌ Erreur déconnexion :",
      error
    );

  }

}


// ==========================================
// UTILISATEUR ACTUEL
// ==========================================

let currentUser = null;


onAuthStateChanged(
  auth,
  (user) => {

    currentUser =
      user || null;


    if (user) {

      console.log(
        "👤 CONNECTÉ :",
        user.email
      );

    }

    else {

      console.log(
        "👤 NON CONNECTÉ"
      );

    }

  }
);


// ==========================================
// FIRESTORE : AJOUTER UNE COMMANDE
// ==========================================

async function createOrder(orderData) {

  try {

    if (!auth.currentUser) {

      throw new Error(
        "Utilisateur non connecté."
      );

    }


    const order = {

      ...orderData,

      userId:
        auth.currentUser.uid,

      email:
        auth.currentUser.email,

      createdAt:
        serverTimestamp(),

      status:
        "pending"

    };


    const result =
      await addDoc(
        collection(db, "orders"),
        order
      );


    console.log(
      "✅ Commande enregistrée :",
      result.id
    );


    return result.id;

  }

  catch (error) {

    console.error(
      "❌ Erreur commande :",
      error
    );

    throw error;

  }

}


// ==========================================
// FIRESTORE : COMMANDES DE L'UTILISATEUR
// ==========================================

async function getMyOrders() {

  if (!auth.currentUser) {
    return [];
  }


  try {

    const q =
      query(
        collection(db, "orders"),
        where(
          "userId",
          "==",
          auth.currentUser.uid
        )
      );


    const snapshot =
      await getDocs(q);


    return snapshot.docs.map(
      item => ({
        id: item.id,
        ...item.data()
      })
    );

  }

  catch (error) {

    console.error(
      "❌ Erreur récupération commandes :",
      error
    );

    return [];

  }

}


// ==========================================
// EXPORT GLOBAL
// ==========================================

window.login =
  login;

window.register =
  register;

window.logout =
  logout;

window.createOrder =
  createOrder;

window.getMyOrders =
  getMyOrders;

window.firebaseAuthError =
  firebaseAuthError;

window.showToast =
  showToast;


// ==========================================
// FIN FIREBASE
// ==========================================

console.log(
  "🚀 NovaShop prêt."
);
