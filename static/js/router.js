// import { authService, storageService } from "../firebase.js";
// import {
//   ref,
//   uploadString,
//   getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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
  board : "/templates/pages/board.html",
  wt_board : "/templates/pages/wt_board.html"
}

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");

  if (path.length === 0) {
    path = "/";
  }
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
  if(path === 'wt_board'){
    CKEDITOR.replace("myeditor",{
      width:"550",
    height:"300",
    filebrowserImageUploadUrl: '/uploader/upload.php?type=Images',
    filebrowserUploadMethod: 'form',
    });
    CKEDITOR.on('dialogDefinition', function(ev) {
      // Take the dialog window name and its definition from the event data.
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;
      console.log(dialogName)

      console.log(document.querySelector('.cke_dialog_ui_fileButton'))
      
      if (dialogName == 'image2') {
          // Get a reference to the "Upload" tab.
          var uploadTab = dialogDefinition.getContents('Upload');
          // Get the "Choose file" input definition.
          var fileChooserDef = uploadTab.get('upload');
          // Get the "Send it to the Server" button definition, and hide that button.
          var sendButtonDef = uploadTab.get('uploadButton');
          sendButtonDef.hidden = true;
  
          // When a file is chosen, automatically send it to the server.
          fileChooserDef.onChange = function() {
              // Get the "Send it to the Server" button element.
              var sendButton = this.getDialog().getContentElement('Upload', 'uploadButton');
              // Simulate clicking that button.
              sendButton.click();
          };
      }
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
    load_nickname()
  }

  if (path === "setting") {
    document.getElementById("username").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/static/img/empty_profile.png";

    document.getElementById("ThumbnailView").src =
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