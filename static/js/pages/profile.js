import { authService, storageService } from "../firebase.js";
// import {
//   collection,
//   orderBy,
//   query,
//   getDocs,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("profileBtn").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("urnameinput").value;
  console.log(newNickname)
  // const newDescription = document.getElementById('userintroduce').innerText;
  console.log(newNickname)
  // console.log(newDescription)
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  }) 

  .then(() => {
    alert("프로필 수정 완료");
    window.location.hash = "#mypage";
  })
  .catch((error) => {
    alert("프로필 수정 실패");
    console.log("error:", error);
  });
};

// 미리보기
export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};

// export const getHypeList = async () => {
//   let hypeList = [];
//   const q = query(
//     collection(dbService, "wt_board"),
//     orderBy("createdAt", "desc")
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const hypeObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     hypeList.push(hypeObj);
//     console.log(hypeList);
//   });
//   const iWrotePost = document.getElementById("iWrotePost");
//   const currentUid = authService.currentUser.uid;
//   iWrotePost.innerHTML = "";
//   hypeList.forEach((hypeObject) => {
//     const isOwner = currentUid === hypeObject.creatorId;
//     console.log(isOwner)
//     if (currentUid === hypeObject.creatorId) {
//       const temp_html = `
//       <div class="mypage_wrap_box">
//             <a href="#board" class="board_w" onclick="route(board)">
//                 <div class="img_area">
//                     <img src="/static/img/img2.png" alt="img_area" />
//                 </div>
//                 <div class="write">
//                     <div class="txt_area">
//                         <ul>
//                             <h4>${hypeObject.title}</h4>
//                             <span>
//                                 <p>${hypeObject.title}</p>
//                             </span>
//                         </ul>
//                         <div class="date">
//                             <span>YYYY년 MM월 DD일</span>
//                             <!-- <span>* 12개의 댓글</span> -->
//                         </div>
//                         <div class="author_index">
//                             <img src="${hypeObject.profileImg}" alt="autor_index" />
//                             <span>by ${hypeObject.nickname}</span>
//                             <!-- <div class="like">
//                     <img src="/img/heart.png" alt="like" />
//                     <span>250</span>
//                   </div> -->
//                         </div>
//                     </div>
//                 </div>
//             </a>
//         </div>`;
//       const main = document.createElement("main");
//       main.innerHTML = temp_html;
//       iWrotePost.appendChild(main);
//     }
//   });
// };