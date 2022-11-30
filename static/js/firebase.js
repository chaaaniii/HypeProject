// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAymJFM3HxbgxEI12qobHCWrs-Nq1BJKTU",
  authDomain: "hypeproject-46a13.firebaseapp.com",
  projectId: "hypeproject-46a13",
  storageBucket: "hypeproject-46a13.appspot.com",
  messagingSenderId: "804318976896",
  appId: "1:804318976896:web:c8af65e9dfe8328c0b3f65",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
