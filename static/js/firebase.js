// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 읽기 다써서 파이어베이스 하나 더 팜 추후 수정 요망
const firebaseConfig = {
  apiKey: "AIzaSyCaHtV-MyFi7IkGbGLWSGGuI5BL_PA_VHk",
  authDomain: "test-c1390.firebaseapp.com",
  projectId: "test-c1390",
  storageBucket: "test-c1390.appspot.com",
  messagingSenderId: "420180298678",
  appId: "1:420180298678:web:39212bdc65055db683cf17",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
