import { dbService, authService, storageService } from "../firebase.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  console.log(imgDataUrl);
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
    console.log(downloadUrl)
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

export const changeThumbnail = async (event) => {
  event.preventDefault();
  document.getElementById("geul_upload").disabled = true;
  const thumbnailRef = ref(
    storageService,
    `thumbnail/${uuidv4()}`
  );
  const thumbnailUrl = localStorage.getItem("thumbnailUrl")
  let downloadThumbnail;
  if (thumbnailUrl) {
    const thumbnailResponse = await uploadString(thumbnailRef, thumbnailUrl, "data_url");
    downloadThumbnail = await getDownloadURL(thumbnailResponse.ref);
  }

  const wt_title = document.getElementById("wt_title").value;
  const wt_contents = CKEDITOR.instances.myeditor.getData();
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "wt_board"), {
      category: window.location.hash,
      title: wt_title,
      contents: wt_contents,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
      thumbnail: downloadThumbnail || null,
    });
    alert("등록 완료")
    localStorage.clear()
    if (window.location.hash === "#f_wt_board") {
      window.location.hash = "#fashion";
    } else if (window.location.hash === "#fo_wt_board") {
      window.location.hash = "#food";
    } else if (window.location.hash === "#t_wt_board") {
      window.location.hash = "#travel";
    } else if (window.location.hash === "#s_wt_board") {
      window.location.hash = "#sports";
    } else if (window.location.hash === "#e_wt_board") {
      window.location.hash = "#entertainment";
    }
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
}

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

export const onThumbnailChange = (event) => {
  const theFile1 = event.target.files[0]; // file 객체
  const reader1 = new FileReader();
  reader1.readAsDataURL(theFile1); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader1.onloadend = (finished) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const thumbnailUrl = finished.currentTarget.result;
    localStorage.setItem("thumbnailUrl", thumbnailUrl);
    document.getElementById("thumbnail_img").src = thumbnailUrl;
  };
};