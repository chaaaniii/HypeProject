import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";
import { handleLocation } from "../router.js";

export const readDataCollection = async () => {
  const list = [];
  const q = query(
    collection(dbService, "wt_board"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
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
                            <img src="${item.thumbnail ?? "static/img/No_Thumbnail.png"}" alt="img_area" />
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
                                <img src=${item.profileImg} alt="autor_index" />
                                <span>by ${item.nickname}</span>
                              </div>
                            </div>
                          </div>
                        </div>`;
    const div = document.createElement("div");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};
document.addEventListener("DOMContentLoaded", readDataCollection);
window.addEventListener("hashchange", () => {
  handleLocation();
  if (window.location.hash === "#food") readDataCollection();
});
