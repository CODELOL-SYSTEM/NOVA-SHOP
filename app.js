// ==========================================
// NOVASHOP - FIREBASE CONFIG
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
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// CONFIG EXACTE DE TON PROJET
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
// TEST
// ==========================================

console.log("🔥 NOVASHOP FIREBASE");
console.log("Projet Firebase :", firebaseConfig.projectId);
console.log("Auth :", auth);
console.log("Firestore :", db);


// ==========================================
// UTILITAIRE
// ==========================================

function $(id) {
  return document.getElementById(id);
}


// ==========================================
// MESSAGE AUTH
// ==========================================

function authMessage(message) {

  const element =
    $("authMessage") ||
    $("loginMessage") ||
    $("registerMessage");

  if (element) {
    element.textContent = message;
  }

  console.log(message);
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

  clearTimeout(window.__novaToast);

  window.__novaToast = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);
}


// ==========================================
// ERREURS FIREBASE
// ==========================================

function firebaseAuthError(error) {

  console.error("❌ ERREUR FIREBASE :", error);

  const code = error?.code || "";

  let message = "Erreur Firebase.";

  switch (code) {

    case "auth/api-key-not-valid":
    case "auth/invalid-api-key":
      message =
        "La clé API Firebase est refusée. Vérifie la clé dans Firebase > Project settings > Your apps.";
      break;

    case "auth/operation-not-allowed":
      message =
        "Email/mot de passe n'est pas activé dans Firebase.";
      break;

    case "auth/unauthorized-domain":
      message =
        "Le domaine de ton site n'est pas autorisé dans Firebase.";
      break;

    case "auth/email-already-in-use":
      message =
        "Cet email possède déjà un compte.";
      break;

    case "auth/invalid-email":
      message =
        "Adresse email invalide.";
      break;

    case "auth/weak-password":
      message =
        "Mot de passe trop faible. Minimum 6 caractères.";
      break;

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      message =
        "Email ou mot de passe incorrect.";
      break;

    case "auth/too-many-requests":
      message =
        "Trop de tentatives. Réessaie plus tard.";
      break;

    case "auth/network-request-failed":
      message =
        "Erreur réseau. Vérifie ta connexion.";
      break;

    case "auth/user-disabled":
      message =
        "Ce compte a été désactivé.";
      break;

    default:
      message =
        error?.message ||
        `Erreur Firebase : ${code}`;

  }

  authMessage(message);

}


// ==========================================
// CRÉER UN COMPTE
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
      "Création du compte...",
      email
    );

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ COMPTE CRÉÉ",
      result.user.uid
    );


    authMessage(
      "Compte créé avec succès ✓"
    );

    showToast(
      "Compte créé avec succès ✓"
    );


  } catch (error) {

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
      "Connexion...",
      email
    );


    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ CONNECTÉ",
      result.user.uid
    );


    authMessage(
      "Connexion réussie ✓"
    );

    showToast(
      "Connexion réussie ✓"
    );


  } catch (error) {

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

  } catch (error) {

    console.error(
      "Erreur déconnexion :",
      error
    );

  }

}


// ==========================================
// SURVEILLER LA CONNEXION
// ==========================================

let currentUser = null;

onAuthStateChanged(
  auth,
  (user) => {

    currentUser = user || null;


    if (user) {

      console.log(
        "👤 Utilisateur connecté :",
        user.email
      );

    } else {

      console.log(
        "👤 Aucun utilisateur connecté"
      );

    }

  }
);


// ==========================================
// DISPONIBLE POUR LE HTML
// ==========================================

window.register = register;

window.login = login;

window.logout = logout;

window.firebaseAuthError =
  firebaseAuthError;

window.currentUser =
  currentUser;
