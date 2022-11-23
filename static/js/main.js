import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";
import { logout } from "./auth.js";
import { socialLogin, handleAuth } from "./auth.js";
// import { writecomment } from "./pages/board.js"

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
      let hidden = document.querySelector("#sign_in");
      hidden.style.display = "none";

      document.querySelector("#login_out").innerText = "Log out";
    } else {
      // 로그아웃 상태인 경우
    }
  });
});

document.querySelector("#login_out").addEventListener("click", () => {
  if (document.querySelector("#login_out").innerText === "Log out") {
    logout();
  }
});

// 전역 함수 리스트
window.route = route;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;
// window.writecomment = writecomment;