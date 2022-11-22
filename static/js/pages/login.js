// import { authService } from "../firebase.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// function handeleAuth(event) {
//   if (document.getElementById("signUpEmail"))
//     document
//       .getElementById("signUpEmail")
//       .addEventListener("click", (event) => {
//         event.preventDefault();
//         const email = document.getElementById("signUpEmail").value;
//         const password = document.getElementById("signUpPassword").value;
//         console.log(email, password);
//       });

//   createUserWithEmailAndPassword(authService, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// }

//const login = document.querySelector(".login");
// const nav_menu = document.querySelector(".nav_menu");
// const navBar = document.querySelector(".navBar");
// const body = document.querySelector("body");
// const change = document.getElementById("csschange");

// login.addEventListener("click", () => {
//   let path = window.location.hash.replace("#", "");
//   if (path === "#login") {
//     change.href = "./" + css + "login.css";
//     nav_menu.style.visibility = "hidden";
//     navBar.style.visibility = "hidden";
//     body.style.backgroundColor = "white";
//   }
// });
