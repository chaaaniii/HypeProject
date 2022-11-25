import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";
import { handleLocation } from "../router.js";

export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("comment");
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "comments"), {
      picture: picture.value,
      title: title.value,
      text: text.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    comment.value = "";
    getCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};
export const readDataCollection = async () => {
  const list = [];
  const querySnapshot = await getDocs(
    collection(dbService, "wt_board"),
    orderBy("createAt", "desc")
  );
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    list.push(obj);
  });
  const commentList = document.querySelector(".wrap_list");
  commentList.innerHTML = "";

  list.forEach((item) => {
    const temp_html = `<div class="wrap_box">
                            <div class="img_area">
                              <img src="${item.picture}}" alt="img_area" />
                            </div>
                            <div class="write">
                              <div class="txt_area">
                                <ul>
                                  <h4>${item.title}</h4>
                                  <span>
                                    <p>${item.text}</p>
                                  </span>
                                </ul>
                                <div class="date">
                                <span>${new Date(item.createdAt)
                                  .toString()
                                  .slice(0, 16)}</div></footer>
                              <div class="author_index">
                                </div>
                                <div class="author_index">
                                  <img src=${
                                    item.profileImg
                                  } alt="autor_index" />
                                  <span>by ${item.nickname}</span>
                                </div>
                              </div>
                            </div>
                          </div>`;
    const div = document.createElement("div");
    div.classList.add(".wrap_list");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};
document.addEventListener("DOMContentLoaded", readDataCollection);
window.addEventListener("hashchange", () => {
  handleLocation();
  if (window.location.hash === "#sports") readDataCollection();
});
