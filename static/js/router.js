import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/templates/pages/404.html",
  "/": "/templates/pages/main.html",
  fashion: "/templates/pages/fashion.html",
  food: "/templates/pages/food.html",
  travel: "/templates/pages/travel.html",
  sports: "/templates/pages/sports.html",
  entertainment: "/templates/pages/entertainment.html",
  pop: "/templates/pages/pop.html",
  recent: "/templates/pages/recent.html",
  mypage: "/templates/pages/mypage.html",
  like: "/templates/pages/like.html",
  scrap: "/templates/pages/scrap.html",
  setting: "/templates/pages/setting.html",
  login: "/templates/pages/login.html",
  signin: "/templates/pages/signin.html",
  // 게시판 글 하고 등록
  board: "/templates/pages/board.html",
  // : "/templates/pages/wt_board.html"
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

  const load_nickname = () => {
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "/static/img/empty_profile.png";
  };

  if (path === "mypage" || path === "scrab" || path === "like") {
    load_nickname()
  }

  if (path === "setting") {
    document.getElementById("username").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/static/img/empty_profile.png";

    document.getElementById("urnameinput").placeholder =
      authService.currentUser.displayName ?? "닉네임 없음";
  }

  if (path === "signin" || path === "login") {
    hide_nav_bar()
  } else {
    show_nav_bar()
  }
};

const show_nav_bar = () => {
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  nav_menu.style.visibility = "visible";
  navBar.style.backgroundColor = "black";
}
const hide_nav_bar = () => {
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  nav_menu.style.visibility = "hidden";
  navBar.style.backgroundColor = "white";
}