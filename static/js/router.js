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

  if (
    path === "f_wt_board" ||
    path === "fo_wt_board" ||
    path === "t_wt_board" ||
    path === "s_wt_board" ||
    path === "e_wt_board"
  ) {
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

  if (path === "board") {
    getPost();
    getFire();
  }

  if (path === "f_wt_board") {
    const wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(253, 246, 237)";
  }
  if (path === "fo_wt_board") {
    let wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(237, 191, 213)";
  }
  if (path === "t_wt_board") {
    let wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(237, 122, 59)";
  }
  if (path === "s_wt_board") {
    let wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(250, 255, 93)";
  }
  if (path === "e_wt_board") {
    let wt_background = document.getElementById("wt_background");
    wt_background.style.background = "rgb(79, 158, 247)";
  }
};

const show_nav_bar = () => {
  const logo = document.querySelector("#logoya");
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  const MENU = document.querySelector(".Menu");
  nav_menu.style.display = "flex";
  navBar.style.backgroundColor = "black";
  logo.style.display = "flex";
  MENU.style.display = "flex";
};
const hide_nav_bar = () => {
  const logo = document.querySelector("#logoya");
  const nav_menu = document.querySelector(".nav_menu");
  const navBar = document.querySelector(".navBar");
  const MENU = document.querySelector(".Menu");
  nav_menu.style.display = "none";
  navBar.style.backgroundColor = "white";
  logo.style.display = "none";
  MENU.style.display = "none";
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
          <a href="?${hypeObject.id}#board" class="board_w";">
              <div class="img_area">
                  <img src="${
                    hypeObject.thumbnail ?? "static/img/No_Thumbnail.png"
                  }" alt="img_area" />
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
                          <span>${new Date(hypeObject.createdAt)
                            .toString()
                            .slice(0, 16)}</span>
                      </div>
                      <div class="author_index">
                          <img src="${
                            hypeObject.profileImg ??
                            "static/img/empty_profile.png"
                          }" alt="autor_index" />
                          <span>by ${hypeObject.nickname ?? "닉네임없음"}</span>
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
      <a href="?${fashionObject.id}#board" class="board_w">
          <div class="img_area">
              <img src="${
                fashionObject.thumbnail ?? "static/img/No_Thumbnail.png"
              }" alt="img_area" />
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
                      <span>${new Date(fashionObject.createdAt)
                        .toString()
                        .slice(0, 16)}</span>
                    </div>
                  <div class="author_index">
                    <img src=${
                      fashionObject.profileImg ?? "static/img/empty_profile.png"
                    } alt="autor_index" />
                    <span>by ${fashionObject.nickname ?? "닉네임없음"}</span>
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

const getPost = async () => {
  const descWrap = document.getElementById("desc_wrap");
  let postList = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    postList.push(postObj);
  });
  const showPost = document.getElementById("description");
  showPost.innerHTML = "";
  postList.forEach((postObject) => {
    let param = window.location.search.replace("?", "");
    if (postObject.id === param) {
      const temp_html = `
          <!-- 본문 -->
          <div class="container">
            <h1 class="tittle">${postObject.title}</h1>
          </div>
  
          <div class="photo">
            <div class="image">
              <img src="${
                postObject.thumbnail ?? "static/img/No_Thumbnail.png"
              }" alt="" class="image1" />
            </div>
          </div>
        <div class="text">
          <div class="text12">
            <p class="text123">
              ${postObject.contents}
            </p>
          </div>
        </div>
        <!-- 댓글 -->
        <div class="comment_input">
          <input
            type="text"
            class="comment_input1"
            placeholder="댓글을 입력하세요..."
            id="comment_input1"
          />
          <button
            class="comment_input_btn"
            onclick="writecomment(event);getfire()"
          >
            등록
          </button>
          <!-- 홈페이지가 새로고침 또는 랜딩이 될떄마다 뿌려주는 함수는 getfire이다 팀원들이 뿌려주는 먼가를만들면 거기에 넣어주기만하면됨 -->
        </div>
        <div class="comment_list" id="comment_list">
        </div>>`;
      const div = document.createElement("div");
      if (postObject.category === "#f_wt_board") {
        descWrap.style.background = "rgb(253, 246, 237)";
      } else if (postObject.category === "#fo_wt_board") {
        descWrap.style.background = "rgb(237, 191, 213)";
      } else if (postObject.category === "#t_wt_board") {
        descWrap.style.background = "rgb(237, 122, 59)";
      } else if (postObject.category === "#s_wt_board") {
        descWrap.style.background = "rgb(250, 255, 93)";
      } else if (postObject.category === "#e_wt_board") {
        descWrap.style.background = "rgb(79, 158, 247)";
      }
      div.innerHTML = temp_html;
      showPost.appendChild(div);
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
      <a href="?${foodObject.id}#board" class="board_w">
        <div class="img_area">
            <img src="${
              foodObject.thumbnail ?? "static/img/No_Thumbnail.png"
            }" alt="img_area" />
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
                    <span>${new Date(foodObject.createdAt)
                      .toString()
                      .slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${
                    foodObject.profileImg ?? "static/img/empty_profile.png"
                  } alt="autor_index" />
                  <span>by ${foodObject.nickname ?? "닉네임없음"}</span>
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
      <a href="?${sportsObject.id}#board" class="board_w">  
        <div class="img_area">
            <img src="${
              sportsObject.thumbnail ?? "static/img/No_Thumbnail.png"
            }" alt="img_area" />
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
                    <span>${new Date(sportsObject.createdAt)
                      .toString()
                      .slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${
                    sportsObject.profileImg ?? "static/img/empty_profile.png"
                  } alt="autor_index" />
                  <span>by ${sportsObject.nickname ?? "닉네임없음"}</span>
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
      <a href="?${travelObject.id}#board" class="board_w">
        <div class="img_area">
            <img src="${
              travelObject.thumbnail ?? "static/img/No_Thumbnail.png"
            }" alt="img_area" />
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
                    <span>${new Date(travelObject.createdAt)
                      .toString()
                      .slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${
                    travelObject.profileImg ?? "static/img/empty_profile.png"
                  } alt="autor_index" />
                  <span>by ${travelObject.nickname ?? "닉네임없음"}</span>
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
      <a href="?${entObject.id}#board" class="board_w">
        <div class="img_area">
            <img src="${
              entObject.thumbnail ?? "static/img/No_Thumbnail.png"
            }" alt="img_area" />
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
                    <span>${new Date(entObject.createdAt)
                      .toString()
                      .slice(0, 16)}</span>
                  </div>
                <div class="author_index">
                  <img src=${
                    entObject.profileImg ?? "static/img/empty_profile.png"
                  } alt="autor_index" />
                  <span>by ${entObject.nickname ?? "닉네임없음"}</span>
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

export const getFire = async () => {
  const list = [];
  const q = query(
    collection(dbService, "boardcomment"),
    //최신순으로 읽어올꺼야~
    orderBy("createAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    list.push(obj);
  });
  const comment_box = document.getElementById("comment_list");
  list.forEach((item) => {
    if (window.location.search === item.post) {
      const temp_html = `<div class="comment_box" id="comment_box" >
  
          <div class="comment">
              <img src="${
                item.profileImg ?? "static/img/empty_profile.png"
              }" alt="" class="comment_img">
              <p class="commentname">${item.nickname ?? "닉네임없음"}</p>
              <div>
                  <p class="comment_text" id="comment_text-${item.id}">${
        item.value
      }</p>
                      <div class="comment_input_container comment_input_container-${
                        item.id
                      }" id="${item.id}">
                          <input type="text" class="comment_input_inside-${
                            item.id
                          }" id="${item.id}" />
                          <button  id="comment_save" class="comment_save" onclick="comment_save(event)">완료</button>
                      </div>
              </div>
          </div>
  
          
      
          <div class="buttons1" id="${item.creatorId}">
              <button href="#" class="top_btn1" id="${item.creatorId}" name="${
        item.id
      }" onclick="show1(event)">...</button>
                  <ul class="hide_bar1" id="search_history1-${item.id}" >
                      <li class="comment_modify" id="comment_modify-${
                        item.id
                      }" name="${
        item.id
      }" onclick="comment_modifyed(event)">수정</li>
                      <li class="comment_modify" id="${
                        item.id
                      }" onclick="comment_delete(event)">삭제</li>
                  </ul>
          </div>
  `;
      const div = document.createElement("div");
      div.classList.add("box");
      div.innerHTML = temp_html;
      comment_box.appendChild(div);
    }
  });

  // 버그가 있어서 나중에 풀어보기
  document.querySelectorAll(".buttons1").forEach((button) => {
    // 배열이 받아져요 [btn1, btn2, btn3...]
    if (button.id !== authService.currentUser.uid) {
      // creatorId !== 로그인 되어있는 유저 아이디
      button.style.visibility = "hidden";
    }
  });
};
