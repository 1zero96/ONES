<p align="middle">
<br/>
<img src="https://user-images.githubusercontent.com/102389087/218516362-cfee866e-637e-463b-9d30-756506d68e5f.png"><br>
</p>

<div align="center">
<br/>
<h2>SPA 프로젝트 (의류 쇼핑몰 - ONES)</h2>
📌 https://ones-72c6e.web.app/
<br/>
</div>

<br/>

# 📝 프로젝트 소개

- 개인 프로젝트
- React 프레임워크를 이용한 SPA 쇼핑몰
- 개발일정 : 23.01.30 ~ 23.02.10 (1개월)

<div align="center">
<img width="70%" src="https://user-images.githubusercontent.com/102389087/218517647-9500255d-e09f-4c77-b022-a2d56319be93.png" />
<br/>
</div>
<br/>

## 💡 프로젝트 목표

- React 프레임워크를 사용하여 SPA 방식의 홈페이지 제작
- 효율적으로 컴포넌트를 분리하고 관리 방법을 학습하고 실행
- React에서의 상태관리 방법을 학습하고 실행
  (ContextAPI와 ReactQuery 사용)
- UseState, UseEffect와 같은 react Hook를 사용
- firebase를 사용하여 로그인 및 회원가입 기능 구현
- Rest API를 사용하여 제품을 등록하고 반복문으로 출력
- 제품을 필터로 구분하여 출력
- 장바구니 추가 기능 구현
- 공지사항 게시판 구현 (CRUD)
- custom Hook를 사용하여 작성한 코드를 정리

## 😃 사용한 프레임워크, 언어

- React, JavaScript, JSX

## 💻주요 기능

- 회원가입, 로그인, 비밀번호 찾기,
- 마이프로필 (닉네임, 프로필사진 수정)
- 상품 업로드, 장바구니 추가/삭제
- 공지사항 게시판 (CRUD)

## 👻 사용한 module

### yarn create react-app ones

- react-app 설치

### yarn add react-router-dom

- 라우터 사용하여 Navbar 컴포넌트 관리

### yarn add react-icons

- react-icons 사용
- https://react-icons.github.io/react-icons

### yarn add -D tailwindcss

- tailwindcss 설치
- https://tailwindcss.com/

### yarn add uuid

- uuid 사용하여 상품 데이터의 key값으로 사용

### yarn add firebase reactfire

- firebase 사용(realdatabase와 firestore 사용)
- api/firebase.js에 별도 관리
- 중요한 key의 value는 env_local 파일에 별도로 관리

### yarn add @tanstack/react-query

- react-query 사용하여 상품데이터 상태 관리

### yarn add sweetalert2

- alert창을 디자인 해주는 sweetalert2 사용

### yarn add react-slick

- carousel 기능을 제공하는 react-slick 사용

### yarn add quill

- 게시글 에디터 기능을 제공하는 quill 사용
