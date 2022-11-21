// import { authService } from "./firebase";
import { handleLocation, route } from "./router.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);

// 전역 함수 리스트
window.route = route;
