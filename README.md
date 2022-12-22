![로고](https://user-images.githubusercontent.com/80263801/204437496-6b6c193b-21a0-44c2-9f50-43218ca2baf7.png)  

## Hype Express 소개
멋지고 쿨한 소식들을 사용자 공간에 배달하자
## 목적
최신 패션, 음식, 여행 그리고 엔터테이먼트 등 다양한 분야의 소식을 데일리 뉴스와 유니크한 콘텐츠를 제공하는 플랫폼
## 팀원 소개
|박진양|조영찬|김예슬|유영재|한상권
|------|------|------|------|------|
|[Github](https://github.com/Jinyang-Park)|[Github](https://github.com/chaaaniii)|[Github](https://github.com/2sel)|[Github](https://github.com/YoungJae0910)|[Github](https://github.com/Gon1782)|
## 기능 구현
* 로그인, 회원 가입 + 소셜 로그인 (구글, 깃헙)
    - 로그인하지 않을 경우 전체 게시글 조회만 가능
    - 정규표현식을 이용한 유효성 검사
    - 이미 존재하는 이메일, 비밀번호 오류 예외처리
* 메인
    - 네비게이션바 카테고리 클릭 시 SPA 라우팅으로 동적으로 페이지 내용을 전환
* 게시글
    - 게시글에 작성한 날짜와 유저를 보여줌
    - Firestore 에서 제공하는 api를 이용하여 CRUD구현
    - 게시글에 댓글 작성, 수정 및 삭제 가능
    - 좋아요 버튼 구현
* 게시글 작성
    - 에디터를 사용하여 게시글 작성 구현
    - 따로 썸네일을 지정할수 있게 구현
* 마이페이지
    - 로그인시 마이페이지 생성
    - 프로필 닉네임, 사진 수정
    - 내가 쓴 게시물 조회
*  반응형 디자인
## 사용스택
<div align="left">
	<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=black" />
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white" />
</div>
* s3를 통한 배포 및 Route 53, 가비아를 이용하여 도메인 연결

## 기간
* 2022.11.18(금) ~ 2022.11.27(일)
* 2022.11.28(월) 프로젝트 발표
---
### 메인 페이지

<img src = "https://user-images.githubusercontent.com/80263801/204556124-2ebf4af1-4067-457e-83a4-811893d7875d.gif"/>

### 로그인 페이지
![로그인](https://user-images.githubusercontent.com/80263801/204556828-b055bd4c-6038-4e68-8e91-b920bd8507ad.gif)

### 댓글 기능과 좋아요 및 게시물 작성
![63861bd623206981370568](https://user-images.githubusercontent.com/80263801/204561351-9796d98b-4016-4ada-8f62-d7b928697f0e.gif)

### 반응형 디자인
![반응형](https://user-images.githubusercontent.com/80263801/204563514-05a2bff1-623e-45dc-a4f2-f36b650067df.gif)

### 👇 다양한 기능들은 아래 홈페이지에서 체험해주세요
http://hypexpress.shop/
