import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

console.log(authService.currentUser);

const writecomment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("comment_input1");
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "boardcomment"), {
      value: comment.value,
      createAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    comment.value = "";
  } catch (error) {
    alert(error);
  }
};
window.writecomment = writecomment;

// -----------------드롭다운
window.show = function show() {
  const bar = document.getElementById("search_history");
  bar.classList.toggle("hide_bar");
};

window.show1 = function show1(event) {
  const postcreatid = event.target.id;
  // bar1.classList.toggle('hide_bar1')
  //postcreatid 는 게시글을 작성한 사람의 id
  //currentuser 는 현재 로그인이 되어있는 유저의 아이디
  // console.log(postcreatid);
  // console.log(authService.currentUser);\
  const postId = event.target.name;
  if (postcreatid === authService.currentUser.uid) {
    document
      .querySelector(`#search_history1-${postId}`) // 고유아이디로 변경
      .classList.toggle("hide_bar1");
  }

  document.addEventListener("click", function handleClickOutsideBox(event) {
    // 내가 클릭한 element가 ... 버튼이면 바로 return 함으로 이 함수 실행X
    if (event.target.classList.contains("top_btn1")) {
      return;
    }

    const box1 = document.getElementById(`search_history1-${postId}`);
    const button1 = document.getElementById("search_input1");
    const isBoxShowing1 = box1 ? !box1.classList.contains("hide_bar1") : false;
    const isButtonClicked1 = button1 ? button1.contains(event.target) : false;

    //if 문에서 false가 나오면 return으로 아무것도 반환하지않는다
    if (isBoxShowing1 && !isButtonClicked1) {
      box1.classList.add("hide_bar1");
    }
    return;
  });
};
// --------------------라이크버튼

// const heartIcon = document.querySelector(".like-button .heart-icon");
// const likesAmountLabel = document.querySelector(".like-button .likes-amount")

// let likesAmount = 7;

let likesAmount = 0;
window.heartIcon = function heartIcon() {
  const heartIcon = document.querySelector(".like-button .heart-icon");
  const likesAmountLabel = document.querySelector(".like-button .likes-amount");

  heartIcon.classList.toggle("liked");
  if (heartIcon.classList.contains("liked")) {
    likesAmount++;
  } else {
    likesAmount--;
  }
  likesAmountLabel.innerHTML = likesAmount; // + - 된값을 데이터에 업데이트해주는 곳 Html에 넣어줘야함
};

let likesAmount1 = 0;
window.heartIcon1 = function heartIcon1() {
  const heartIcon1 = document.querySelector(".like-button1 .heart-icon1");
  const likesAmountLabel1 = document.querySelector(
    ".like-button1 .likes-amount1"
  );

  heartIcon1.classList.toggle("liked1");
  if (heartIcon1.classList.contains("liked1")) {
    likesAmount1++;
  } else {
    likesAmount1--;
  }
  likesAmountLabel1.innerHTML = likesAmount1; // + - 된값을 데이터에 업데이트해주는 곳 Html에 넣어줘야함
};

// =======================외부클릭시 지워짐

// ===========================modify

const comment_modify = document.getElementById("comment_modify");
window.comment_modifyed = function comment_modifyed(event) {
  const postid = event.target.id.split("-")[1]
  console.log(postid)
  const comment_text = document.querySelector(`#comment_text-${postid}`);
  console.log(comment_text)
  const comment_text_value = comment_text.innerHTML;



  console.log(comment_text);

  const comment_input_container = document.querySelector(
    `.comment_input_container-${postid}`
  );
  comment_input_container.style.display = "flex";

  comment_text.style.display = "none";

  const comment_input = document.getElementById("comment_input");
  const comment_input_inside = document.querySelector(`#comment_input_inside-${item.id}`)
  comment_input.value = comment_text_value;
  comment_input_inside.value = comment_text_value;
};

window.comment_save = function comment_save(event) {
  update_comment(event);
  const comment_box = document.getElementById("comment_text");
  const comment_input = document.getElementById("comment_input");
  const comment_input_container = document.querySelector(
    ".comment_input_container"
  );


  const comment_text_value = comment_input.value;

  console.log(comment_text_value);
  comment_box.innerHTML = comment_text_value;
  comment_input_container.style.display = "none";
  comment_box.style.display = "block";
  // window.location.reload()

  //댓글수정한값이 db에 정상적으로 올라갔을때 수정할떄쓰는 input값을 수정한댓글위치에 삭제하고 붙여준다
};

// ============================commet_delete
window.comment_delete = function comment_delete(event) {
  delete_comment(event);
  const comment_delete = document.querySelector("#comment_box");
  comment_delete.parentNode.removeChild(comment_delete);
};

// var elem = document.querySelector('#some-element');
//     elem.parentNode.removeChild(elem);

// commtnt_firebase=============================

const getfire = async () => {
  const list = [];
  const q = query(
    collection(dbService, "boardcomment"),
    //최신순으로 읽어올꺼야~
    orderBy("createAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    list.push(obj);
  });
  const comment_box = document.getElementById("comment_list");
  console.log(authService.currentUser);
  comment_box.innerHTML = "";
  list.forEach((item) => {
    const temp_html = `<div class="comment_box" id="comment_box" >

        <div class="comment">
            <img src="${item.profileImg}" alt="" class="comment_img">
            <p class="commentname">${item.nickname}</p>
            <div>
                <p class="comment_text" id="comment_text-${item.id}">${item.value}</p>
                    <div class="comment_input_container comment_input_container-${item.id}" id="${item.id}">
                        <input type="text" class="comment_input_inside-${item.id}" id="${item.id}" />
                        <button  id="comment_save" class="comment_save" onclick="comment_save(event)">완료</button>
                    </div>
            </div>
        </div>

        
    
        <div class="buttons1" id="${item.creatorId}">
            <button href="#" class="top_btn1" id="${item.creatorId}" name="${item.id}" onclick="show1(event)">...</button>
                <ul class="hide_bar1" id="search_history1-${item.id}" >
                    <li class="comment_modify" id="comment_modify-${item.id}" name="${item.id}" onclick="comment_modifyed(event)">수정</li>
                    <li class="comment_modify" id="${item.id}" onclick="comment_delete(event)">삭제</li>
                </ul>
        </div>
`;
    const div = document.createElement("div");
    div.classList.add("box");
    div.innerHTML = temp_html;
    comment_box.appendChild(div);
  });

  // 버그가 있어서 나중에 풀어보기
  document.querySelectorAll(".buttons1").forEach((button) => {
    // 배열이 받아져요 [btn1, btn2, btn3...]
    if (button.id !== authService.currentUser.uid) {
      // creatorId !== 로그인 되어있는 유저 아이디
      button.style.visibility = "hidden";
    }
  });
};

// <div class="like-button1">
//     <div class="heart-bg" onclick="heartIcon1()">
//         <div class="heart-icon1"></div>
//     </div>
//     <div class="likes-amount1">0</div>
// </div>

window.getfire = getfire;

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#board") getfire();
  console.log("a");
});

// ====================Update comment
export const update_comment = async (event) => {
  // event.preventDefault();
  console.log(event);
  const comment_input1 = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;
  console.log(comment_input1, id);

  // const parentNode = event.target.parentNode.parentNode;
  // const commentText = parentNode.children[0];
  // commentText.classList.remove("noDisplay");
  // const commentInputP = parentNode.children[1];
  // commentInputP.classList.remove("d-flex");
  // commentInputP.classList.add("noDisplay");

  const commentRef = doc(dbService, "boardcomment", id);
  try {
    await updateDoc(commentRef, { value: comment_input1 });
    // getCommentList();
  } catch (error) {
    alert(error);
  }
};

export const delete_comment = async (event) => {
  event.preventDefault();
  const id = event.target.id;
  console.log(id);
  const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "boardcomment", id));
      // getCommentList();
    } catch (error) {
      alert(error);
    }
  }
};