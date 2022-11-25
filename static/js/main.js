import { authService } from "./firebase.js";
import { changeProfile, onFileChange } from "./pages/profile.js";
import { handleLocation, route } from "./router.js";
import { logout } from "./auth.js";
import { socialLogin, handleAuth } from "./auth.js";
import { save_board } from "./pages/wt_board.js";
// import { getHypeList } from "./pages/profile.js"

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", () => {
  // 로그인 상태 모니터링
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // user === authService.currentUser 와 같은 값
    handleLocation();
    if (user) {
      // 로그인 상태인 경우
      let Mp = document.querySelector(".Mp");
      Mp.style.visibility = "visible";
      let hidden_sign = document.querySelector("#sign_in");
      hidden_sign.style.display = "none";
      let hidden_login = document.querySelector("#log_in");
      hidden_login.style.display = "none";
      let logout = document.querySelector("#logout");
      logout.style.display="flex";
    } else {
      // 로그아웃 상태인 경우
      // window.location.hash = "/"
    }
  });
});

document.querySelector("#logout").addEventListener("click", () => {
    logout();
});

// 전역 함수 리스트
window.route = route;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.save_board = save_board;
window.getHypeList = getHypeList;
// window.writecomment = writecomment;
