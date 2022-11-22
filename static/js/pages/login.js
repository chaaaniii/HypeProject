const login = document.querySelector(".login");
const nav_menu = document.querySelector(".nav_menu");
const navBar = document.querySelector(".navBar");
const body = document.querySelector("body");

login.addEventListener("click", () => {
  nav_menu.style.visibility = "hidden";
  navBar.style.visibility = "hidden";
  body.style.backgroundColor = "white";
});
