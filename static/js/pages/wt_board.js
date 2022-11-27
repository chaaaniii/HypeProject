import {
    addDoc,
    collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService, storageService } from "../firebase.js";
import { ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const save_board = async (event) => {
    event.preventDefault();
    const wt_title = document.getElementById("wt_title").value;
    const wt_contents = CKEDITOR.instances.myeditor.getData();
    const wt_thum = document.getElementById('imgUpload');
    console.log(wt_contents)
    console.log(wt_title)
    console.log(wt_thum)
    const { uid, photoURL, displayName, ThumbnailImg } = authService.currentUser;
    try {
        await addDoc(collection(dbService, "wt_board"), {
            title: wt_title,
            contents: wt_contents,
            createdAt: Date.now(),
            creatorId: uid,
            profileImg: photoURL,
            nickname: displayName,
            ThumbImg: ThumbnailImg,
        });
    } catch (error) {
        alert(error);
        console.log("error in addDoc:", error);
    }
};

export const Thumbnail= async (event) => {
    event.preventDefault();
    // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
    const imgDataUrl1 = localStorage.getItem("imgDataUrl");
    console.log(imgDataUrl1);
    let downloadUrl1;
    if(imgDataUrl1){
    const response = await uploadString(imgDataUrl1, "data_url");
    downloadUrl1 = await getDownloadURL(response.ref);
    console.log(downloadUrl1)
    }
    await updateProfile(authService.currentUser, {
        ThumbnailImg : downloadUrl1 ? downloadUrl1 : null,
      }) 
};

// 미리보기
export const onFileChange1 = (event) => {
    const theFile = event.target.files[0]; // file 객체
    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
    reader.onloadend = (finishedEvent) => {
        // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
        const imgDataUrl = finishedEvent.currentTarget.result;
        localStorage.setItem("imgDataUrl", imgDataUrl);
        document.getElementById("ThumbnailView").src = imgDataUrl;
    };
};