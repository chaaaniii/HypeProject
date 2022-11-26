import { dbService, authService } from "./firebase.js";
import {
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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
  mypage: "/templates/pages/mypage.html",
  like: "/templates/pages/like.html",
  scrap: "/templates/pages/scrap.html",
  setting: "/templates/pages/setting.html",
  login: "/templates/pages/login.html",
  signin: "/templates/pages/signin.html",
  // 게시판 글 하고 등록
  board: "/templates/pages/board.html",
  f_wt_board: "/templates/pages/wt_board.html",
  fo_wt_board: "/templates/pages/wt_board.html",
  t_wt_board: "/templates/pages/wt_board.html",
  s_wt_board: "/templates/pages/wt_board.html",
  e_wt_board: "/templates/pages/wt_board.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");

  if (path.length === 0) {
    path = "/";
  }
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;

  if (path === "f_wt_board" || path === "fo_wt_board" || path === "t_wt_board" || path === "s_wt_board" || path === "e_wt_board") {
    CKEDITOR.replace("myeditor", {
      width: "1200",
      height: "500",
      filebrowserImageUploadUrl:
        "파일업로드 작업을 할 URL 혹은 파일 경로 ex)./aaa.php 이런식으로 ",
      filebrowserUploadMethod: "form",
    });
  }
  if (path === "/") TypeText();

  const load_nickname = () => {
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "/static/img/empty_profile.png";
  };

  if (path === "mypage" || path === "scrap" || path === "like") {
    load_nickname();
  }

  if (path === "setting") {

    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/static/img/empty_profile.png";

    document.getElementById("urnameinput").placeholder =
      authService.currentUser.displayName ?? "닉네임 없음";
  }

  if (path === "signin" || path === "login") {
    hide_nav_bar();
  } else {
    show_nav_bar();
  }

  if (path === "mypage") {
    getHypeList();
  }

  if (path === "fashion") {
    getFashion();
  }

  if (path === "food") {
    getFood();
  }
  if (path === "travel") {
    getTravel();
  }
  if (path === "sports") {
    getSports();
  }
  if (path === "entertainment") {
    getEnt();
  }

  if (path === "f_wt_board"){
    const wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(253, 246, 237)";
  }
  if (path === "fo_wt_board") {
    let wt_background = document.getElementById("wt_background")
    wt_background.style.background = "rgb(237, 191, 213)";
  }
  if (path === "t_wt_board") {
    let wt_background = document.getElementById("wt_background")
    wt_background.style.background = "rgb(237, 122, 59)";
  }
  if (path === "s_wt_board") {
    let wt_background = document.getElementById("wt_background")
    wt_background.style.background = "rgb(250, 255, 93)";
  }
  if (path === "e_wt_board") {
    let wt_background = document.getElementById("wt_background")
    wt_background.style.background = "rgb(79, 158, 247)";
  }
};

const show_nav_bar = () => {
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  nav_menu.style.visibility = "visible";
  navBar.style.backgroundColor = "black";
};
const hide_nav_bar = () => {
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  nav_menu.style.visibility = "hidden";
  navBar.style.backgroundColor = "white";
};

const getHypeList = async () => {
  let hypeList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const hypeObj = {
      id: doc.id,
      ...doc.data(),
    };
    hypeList.push(hypeObj);
  });
  const iWrotePost = document.getElementById("iWrotePost");
  const currentUid = authService.currentUser.uid;
  iWrotePost.innerHTML = "";
  hypeList.forEach((hypeObject) => {
    if (currentUid === hypeObject.creatorId) {
      const temp_html = `
    <div class="mypage_wrap_box">
          <a href="#board" class="board_w" onclick="route(board)">
              <div class="img_area">
                  <img src="${hypeObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
              </div>
              <div class="write">
                  <div class="txt_area">
                      <ul>
                          <h4>${hypeObject.title}</h4>
                          <span>
                              <p>${hypeObject.contents}</p>
                          </span>
                      </ul>
                      <div class="date">
                          <span>${new Date(hypeObject.createdAt).toString().slice(0, 16)}</span>
                      </div>
                      <div class="author_index">
                          <img src="${hypeObject.profileImg}" alt="autor_index" />
                          <span>by ${hypeObject.nickname}</span>
                      </div>
                  </div>
              </div>
          </a>
      </div>`;
      const main = document.createElement("main");
      main.innerHTML = temp_html;
      iWrotePost.appendChild(main);
    }
  });
};

const getFashion = async () => {
  let fashionList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const fashionObj = {
      id: doc.id,
      ...doc.data(),
    };
    fashionList.push(fashionObj);
  });
  const fashionPost = document.getElementById("f_wrap_list");
  fashionPost.innerHTML = "";
  fashionList.forEach((fashionObject) => {
    if (fashionObject.category === "#f_wt_board") {
      const temp_html = `
    <div class="wrap_box">
      <a href="#board" class="board_w" onclick="route(board)">
          <div class="img_area">
              <img src="${fashionObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
          </div>
          <div class="write">
              <div class="txt_area">
                  <ul>
                      <h4>${fashionObject.title}</h4>
                      <span>
                        <p>${fashionObject.contents}</p>
                      </span>
                  </ul>
                  <div class="date">
                      <span>${new Date(fashionObject.createdAt).toString().slice(0, 16)}</span>
                    </div>
                  <div class="author_index">
                    <img src=${fashionObject.profileImg} alt="autor_index" />
                    <span>by ${fashionObject.nickname}</span>
                  </div>
              </div>
          </div>
    </div>`;
      const div = document.createElement("div");
      div.innerHTML = temp_html;
      fashionPost.appendChild(div);
    }
  });
};

const getFood = async () => {
  let foodList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const foodObj = {
      id: doc.id,
      ...doc.data(),
    };
    foodList.push(foodObj);
  });
  const foodPost = document.getElementById("fo_wrap_list");
  foodPost.innerHTML = "";
  foodList.forEach((foodObject) => {
    if (foodObject.category === "#fo_wt_board") {
      const temp_html = `
    <div class="wrap_box">
      <a href="#board" class="board_w" onclick="route(board)">
        <div class="img_area">
            <img src="${foodObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
        </div>
        <div class="write">
            <div class="txt_area">
                <ul>
                    <h4>${foodObject.title}</h4>
                    <span>
                      <p>${foodObject.contents}</p>
                    </span>
                </ul>
                <div class="date">
                    <span>${new Date(foodObject.createdAt).toString().slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${foodObject.profileImg} alt="autor_index" />
                  <span>by ${foodObject.nickname}</span>
                </div>
            </div>
        </div>
    </div>`;
      const div = document.createElement("div");
      div.innerHTML = temp_html;
      foodPost.appendChild(div);
    }
  });
};

const getSports = async () => {
  let sportsList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const sportsObj = {
      id: doc.id,
      ...doc.data(),
    };
    sportsList.push(sportsObj);
  });
  const sportsPost = document.getElementById("s_wrap_list");
  sportsPost.innerHTML = "";
  sportsList.forEach((sportsObject) => {
    if (sportsObject.category === "#s_wt_board") {
      const temp_html = `
    <div class="wrap_box">
      <a href="#board" class="board_w" onclick="route(board)">  
        <div class="img_area">
            <img src="${sportsObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
        </div>
        <div class="write">
            <div class="txt_area">
                <ul>
                    <h4>${sportsObject.title}</h4>
                    <span>
                      <p>${sportsObject.contents}</p>
                    </span>
                </ul>
                <div class="date">
                    <span>${new Date(sportsObject.createdAt).toString().slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${sportsObject.profileImg} alt="autor_index" />
                  <span>by ${sportsObject.nickname}</span>
                </div>
            </div>
        </div>
    </div>`;
      const div = document.createElement("div");
      div.innerHTML = temp_html;
      sportsPost.appendChild(div);
    }
  });
};

const getTravel = async () => {
  let travelList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const travelObj = {
      id: doc.id,
      ...doc.data(),
    };
    travelList.push(travelObj);
  });
  const travelPost = document.getElementById("t_wrap_list");
  travelPost.innerHTML = "";
  travelList.forEach((travelObject) => {
    if (travelObject.category === "#t_wt_board") {
      const temp_html = `
    <div class="wrap_box">
      <a href="#board" class="board_w" onclick="route(board)">
        <div class="img_area">
            <img src="${travelObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
        </div>
        <div class="write">
            <div class="txt_area">
                <ul>
                    <h4>${travelObject.title}</h4>
                    <span>
                      <p>${travelObject.contents}</p>
                    </span>
                </ul>
                <div class="date">
                    <span>${new Date(travelObject.createdAt).toString().slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${travelObject.profileImg} alt="autor_index" />
                  <span>by ${travelObject.nickname}</span>
                </div>
            </div>
        </div>
    </div>`;
      const div = document.createElement("div");
      div.innerHTML = temp_html;
      travelPost.appendChild(div);
    }
  });
};

const getEnt = async () => {
  let entList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const entObj = {
      id: doc.id,
      ...doc.data(),
    };
    entList.push(entObj);
  });
  const entPost = document.getElementById("e_wrap_list");
  entPost.innerHTML = "";
  entList.forEach((entObject) => {
    if (entObject.category === "#e_wt_board") {
      const temp_html = `
    <div class="wrap_box">
      <a href="#board" class="board_w" onclick="route(board)">
        <div class="img_area">
            <img src="${entObject.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
        </div>
        <div class="write">
            <div class="txt_area">
                <ul>
                    <h4>${entObject.title}</h4>
                    <span>
                      <p>${entObject.contents}</p>
                    </span>
                </ul>
                <div class="date">
                    <span>${new Date(entObject.createdAt).toString().slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${entObject.profileImg} alt="autor_index" />
                  <span>by ${entObject.nickname}</span>
                </div>
            </div>
        </div>
    </div>`;
      const div = document.createElement("div");
      div.innerHTML = temp_html;
      entPost.appendChild(div);
    }
  });
};