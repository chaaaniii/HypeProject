import { emailRegex, pwRegex } from "./util.js";
import { authService } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

//회원가입
export function handleAuth(event) {
  //회원가입
  const btnText = event.target.innerText;
  if (btnText === "가입하기") {
    // document.getElementById("signUpBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpPassword = document.getElementById("signUpPassword").value;

    createUserWithEmailAndPassword(authService, signUpEmail, signUpPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("회원가입 성공!");
        window.location.hash = "/";
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          alert("이미 가입된 이메일입니다.");
        }
      });
    // });
  } else {
    //로그인
    const email = document.getElementById("LoginInEmail");
    const emailVal = email.value;
    const pw = document.getElementById("LoginInPassword");
    const pwVal = pw.value;

    //유효성 검사 진행
    if (!emailVal) {
      alert("이메일을 입력해 주세요");
      email.focus();
      return;
    }
    if (!pwVal) {
      alert("비밀번호를 입력해 주세요");
      pw.focus();
      return;
    }

    const matchedEmail = emailVal.match(emailRegex);
    const matchedPw = pwVal.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요");
      email.focus();
      return;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pw.focus();
      return;
    }
    // console.log(event.target);
    // document.getElementById("loginBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const LoginInEmail = document.getElementById("LoginInEmail").value;
    const LoginInPassword = document.getElementById("LoginInPassword").value;
    signInWithEmailAndPassword(authService, LoginInEmail, LoginInPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.hash = "/";
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("user-not-found")) {
          alert("가입되지 않은 회원입니다.");
          return;
        } else if (errorMessage.includes("wrong-password")) {
          alert("비밀번호가 잘못 되었습니다.");
        }
      });
    // });
  }
}

export const socialLogin = (str) => {
  let provider;
  if (str === "google") {
    provider = new GoogleAuthProvider();
  } else if (str === "github") {
    provider = new GithubAuthProvider();
  }
  signInWithPopup(authService, provider)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log("error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logout = async() => {
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      console.log("a1")
      localStorage.clear();
      console.log("로그아웃 성공");
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
      console.log("error:", error);
    });
};
