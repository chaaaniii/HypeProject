const first_text = () => {
  const h2 = document.querySelector(".first_text");
  const txt = `여러분들의 공간에 
Hype함을 배달합니다.`;
  return (_, counter = 0) => {
    // 출력할 내용
    setInterval(() => {
      // 글자가 모두 출력되면 setInterval을 멈출 것
      if (txt.length === counter) {
        return;
      }
      // 문자열 하나하나 h2의 텍스트 컨텐츠로 추가한다
      console.log(h2);
      h2.innerHTML += txt[counter] === "\n" ? `<br>` : txt[counter];

      // 카운터 증산
      counter++;
    }, 60);
  };
};
