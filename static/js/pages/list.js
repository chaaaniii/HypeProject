// link
const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing fashon") },
    { path: "/#food", view: () => console.log("Viewing food") },
    { path: "/#travel", view: () => console.log("Viewing travel") },
    { path: "/#sports", view: () => console.log("Viewing sports") },
    {
      path: "/#entertainment",
      view: () => console.log("Viewing entertainment"),
    },
    { path: "/#mypage", view: () => console.log("Viewing mypage") },
    { path: "/#login", view: () => console.log("Viewing login") },
    { path: "/#singin", view: () => console.log("Viewing signin") },
  ];
};
