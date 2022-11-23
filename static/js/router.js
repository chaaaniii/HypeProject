import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/templates/pages/404.html",
  "/": "/templates/pages/main.html",
  list: "/templates/pages/list.html",
  fashion: "/templates/pages/fashion.html",
  food: "/templates/pages/food.html",
  travel: "/templates/pages/travel.html",
  sports: "/templates/pages/sports.html",
  entertainment: "/templates/pages/entertainment.html",
  mypage: "/templates/pages/mypage.html",
  login: "/templates/pages/login.html",
  signin: "/templates/pages/signin.html",
  board: "/board/main_board/index.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");

  if (path.length === 0) {
    path = "/";
  }
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
  if (path === "/") TypeText();
};
