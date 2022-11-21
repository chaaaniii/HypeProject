// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// 선생님 파이어베이스 복사
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeM1HQy3QYATmz15UJhlrd34uK1F4PMVw",
  authDomain: "firstlogin-9f741.firebaseapp.com",
  projectId: "firstlogin-9f741",
  storageBucket: "firstlogin-9f741.appspot.com",
  messagingSenderId: "760169275198",
  appId: "1:760169275198:web:8dcfb77be70f235e07966f",
  measurementId: "G-G7J89Y1JGH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//선생님 코드 복사
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
