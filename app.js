// ================================
// NOVASHOP - FIREBASE
// ================================

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
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ================================
// CONFIG FIREBASE
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyAZ5vAkAEfIBpfLyhxgO7uvNdJ67KYKWD0",
  authDomain: "novashop-4ee63.firebaseapp.com",
  projectId: "novashop-4ee63",
  storageBucket: "novashop-4ee63.firebasestorage.app",
  messagingSenderId: "1044964015809",
  appId: "1:1044964015809:web:4eafe0b1aede48f8539e40",
  measurementId: "G-XNY5X2VMY9"
};


// ================================
// INITIALISATION
// ================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ================================
// DEBUG
// ================================

console.log("🔥 Firebase connecté");
console.log("Projet :", auth.app.options.projectId);


// ================================
// UTILITAIRES
// ================================

function $(id) {
  return document.getElementById(id);
}

function showToast(message) {
  const toast = $("toast");

  if (!toast) {
    console.log(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// ================================
// ERREURS FIREBASE AUTH
// ================================

function authMessage(message) {

  const el =
    $("authMessage") ||
    $("loginMessage") ||
    $("registerMessage");

  if (el) {
    el.textContent = message;
  } else {
    showToast(message);
  }

}


function firebaseAuthError(error) {

  console.error("❌ Firebase Auth :", error);

  const code = error?.code || "";

  const messages = {

    "auth/operation-not-allowed":
      "Email / mot de passe n'est pas activé dans Firebase.",

    "auth/unauthorized-domain":
      "Ce domaine n'est pas autorisé dans Firebase.",

    "auth/invalid-email":
      "Adresse email invalide.",

    "auth/email-already-in-use":
      "Un compte existe déjà avec cet email.",

    "auth/weak-password":
      "Mot de passe trop faible. Minimum 6 caractères.",

    "auth/invalid-credential":
      "Email ou mot de passe incorrect.",

    "auth/wrong-password":
      "Email ou mot de passe incorrect.",

    "auth/user-not-found":
      "Email ou mot de passe incorrect.",

    "auth/too-many-requests":
      "Trop de tentatives. Réessaie plus tard.",

    "auth/network-request-failed":
      "Erreur réseau. Vérifie ta connexion.",

    "auth/user-disabled":
      "Ce compte a été désactivé.",

    "auth/invalid-api-key":
      "La clé API Firebase est invalide."

  };

  authMessage(
    messages[code] ||
    `Erreur Firebase : ${code || "inconnue"}`
  );

}


// ================================
// CRÉATION DE COMPTE
// ================================

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

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ Compte créé :",
      result.user.uid
    );


    authMessage(
      "Compte créé avec succès ✓"
    );


    showToast(
      "Compte créé avec succès ✓"
    );


    setTimeout(() => {

      const modal =
        $("modalLayer");

      if (modal) {
        modal.classList.remove("open");
      }

    }, 500);


  } catch (error) {

    firebaseAuthError(error);

  }

}


// ================================
// CONNEXION
// ================================

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

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "✅ Connecté :",
      result.user.uid
    );


    authMessage(
      "Connexion réussie ✓"
    );


    showToast(
      "Connexion réussie ✓"
    );


    setTimeout(() => {

      const modal =
        $("modalLayer");

      if (modal) {
        modal.classList.remove("open");
      }

    }, 500);


  } catch (error) {

    firebaseAuthError(error);

  }

}


// ================================
// DÉCONNEXION
// ================================

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


// ================================
// UTILISATEUR CONNECTÉ
// ================================

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


// ================================
// EXPOSER LES FONCTIONS
// ================================

window.login = login;

window.register = register;

window.logout = logout;

window.firebaseAuthError =
  firebaseAuthError;
