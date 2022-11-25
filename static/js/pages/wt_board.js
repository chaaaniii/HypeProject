import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export const save_board = async (event) => {
  event.preventDefault();
  const wt_title = document.getElementById("wt_title").value;
  const wt_contents = CKEDITOR.instances.myeditor.getData();
  console.log(wt_contents);
  console.log(wt_title);
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "wt_board"), {
      title: wt_title,
      contents: wt_contents,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    wt_title();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};
