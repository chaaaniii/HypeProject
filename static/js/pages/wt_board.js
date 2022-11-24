// import {
//     addDoc,
//     collection,
//   } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
//   import { dbService, authService } from "../firebase.js";
  
//   export const save_board = async (event) => {
//     event.preventDefault();
//     const comment = document.getElementById("wt_input");
//     const { uid, photoURL, displayName } = authService.currentUser;
//     try {
//       await addDoc(collection(dbService, "comments"), {
//         text: comment.value,
//         createdAt: Date.now(),
//         creatorId: uid,
//         profileImg: photoURL,
//         nickname: displayName,
//       });
//       comment.value = "";
//       getCommentList();
//     } catch (error) {
//       alert(error);
//       console.log("error in addDoc:", error);
//     }
//   };
console.log(document.readyState)
if(document.readyState === "interactive"){
    console.log('ss');
    debugger;
    CKEDITOR.replace('myeditor');
}
        


