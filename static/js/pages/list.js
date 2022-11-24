// 게시글 정보
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

// 게시글 불러오기
const commnetList = document.getElementById("comment-list");
const currentUid = authService.currentUser.uid;
commnetList.innerHTML = "";
cmtObjList.forEach((cmtObj) => {
  const isOwner = currentUid === cmtObj.creatorId;
  const temp_html = `<div class="wrap_box">
  <div class="img_area">
    <img src="${picture}}" alt="img_area" />
  </div>
  <div class="write">
    <div class="txt_area">
      <ul>
        <h4>${title}</h4>
        <span>
          <p>${text}</p>
        </span>
      </ul>
      <div class="date">
        <span>${createdAt}</span>
      </div>
      <div class="author_index">
        <img src=${profileImg} alt="autor_index" />
        <span>by ${nicknam}</span>
      </div>
    </div>
  </div>
</div>`;
  const div = document.createElement("div");
  div.classList.add(".wrap_list");
  div.innerHTML = temp_html;
  commnetList.appendChild(div);
});
