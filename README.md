# Project18-C-Bootion

<div align="center">

  <img height="500" src="https://user-images.githubusercontent.com/34153657/99389672-bb1c1380-291a-11eb-9228-22eb6c5de049.png"/>

# Bootion : The Notion Clone

![NodeJS](https://img.shields.io/badge/Node.js-v14.4.0-339933?logo=node.js&style=plastic)
![typescript](https://img.shields.io/badge/typescript-v4.1.2-007acc?logo=typescript&style=plastic)
![javascript](https://img.shields.io/badge/javascript-ES2020-yellow?logo=javascript&style=plastic)

![react](https://img.shields.io/badge/react-v17.0.1-61dafb?logo=React&style=plastic)
![express](https://img.shields.io/badge/express-v4.17.1-eee?logo=Express&style=plastic)
![webpack](https://img.shields.io/badge/webpack-v5.6.0-8dd6f9?logo=Webpack&style=plastic)
![@babel/core](https://img.shields.io/badge/@babel/core-v7.12.7-f9dc3e?logo=Babel&style=plastic)

![jest](https://img.shields.io/badge/jest-v26.6.3-c21325?logo=Jest&style=plastic)
![storybook](https://img.shields.io/badge/storybook-v26.6.3-ff4785?logo=Storybook&style=plastic)
![Docker](https://img.shields.io/badge/Docker-v20.10.0-2496ed?logo=Docker&style=plastic)
![MongoDB](https://img.shields.io/badge/MongoDB-latest-47a248?logo=MongoDB&style=plastic)

[![GitHub Open Issues](https://img.shields.io/github/issues-raw/boostcamp-2020/Project18-C-Bootion?color=green&style=plastic)](https://github.com/boostcamp-2020/Project18-C-Bootion/issues)
[![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/boostcamp-2020/Project18-C-Bootion?color=red&style=plastic)](https://github.com/boostcamp-2020/Project18-C-Bootion/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub Open PR](https://img.shields.io/github/issues-pr-raw/boostcamp-2020/Project18-C-Bootion?color=green&style=plastic)](https://github.com/boostcamp-2020/Project18-C-Bootion/pulls)
[![GitHub Closed PR](https://img.shields.io/github/issues-pr-closed-raw/boostcamp-2020/Project18-C-Bootion?color=red&style=plastic)](https://github.com/boostcamp-2020/Project18-C-Bootion/pulls?q=is%3Apr+is%3Aclosed)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](https://opensource.org/licenses/MIT)
[![stars](https://img.shields.io/github/stars/boostcamp-2020/Project18-C-Bootion?style=plastic)](https://img.shields.io/github/stars/boostcamp-2020/Project18-C-Bootion?style=plastic)

</div>

## 🖥 데모

http://bootion.kro.kr/

> drag & drop

| 형제 "Block" 간 위치 이동 | 부모 - 자식 "Block" 간 위치 이동 |
| --- | --- |
| ![drag-drop-1](https://user-images.githubusercontent.com/37685690/102720921-97455680-433a-11eb-8344-9cf1b236817e.gif) | ![drag-drop-2](https://user-images.githubusercontent.com/37685690/102720922-99a7b080-433a-11eb-86ff-f65d3b669743.gif)|

> 블록 타입 변경

| 헤딩 형 "Block" 변경 | 리스트 형 "Block" 변경 |
| --- | --- |
| ![heading](https://user-images.githubusercontent.com/37685690/102721010-336f5d80-433b-11eb-9430-e259f08a4d2d.gif) | ![list](https://user-images.githubusercontent.com/37685690/102721005-2d797c80-433b-11eb-85dd-a497abbec324.gif)|

> 키보드 Interaction

| "/" 헤딩 형 "Block" 변경 | "/" 리스트 형 "Block" 변경 |
| --- | --- |
| ![heading-modal](https://user-images.githubusercontent.com/37685690/102721487-6f57f200-433e-11eb-82f7-3d2ac0df28dc.gif) | ![list-modal](https://user-images.githubusercontent.com/37685690/102721490-70891f00-433e-11eb-9ece-5137a0b055d7.gif)|

| "Enter" 입력 | "Backspace" 입력 |
| --- | --- |
| ![Enter](https://user-images.githubusercontent.com/37685690/102721569-fb6a1980-433e-11eb-994d-74674b94e0e8.gif) | ![backspace](https://user-images.githubusercontent.com/37685690/102721591-176dbb00-433f-11eb-9168-720afefc7da6.gif)|

| "Tab" 입력 | "Shift" + "Tab" 입력 |
| --- | --- |
| ![tab](https://user-images.githubusercontent.com/37685690/102721646-729fad80-433f-11eb-8165-0595317b5723.gif) | ![shiftTab](https://user-images.githubusercontent.com/37685690/102721647-74697100-433f-11eb-93a1-a6a5775d07be.gif)|

> 모달 Interaction

| "+" 버튼 클릭 |
| --- |
| ![block-handler](https://user-images.githubusercontent.com/37685690/102721138-49315280-433c-11eb-8d06-5f257091b9cf.gif)|

> 실시간 동시 편집

|  |
| --- |
| ![sync](https://user-images.githubusercontent.com/37685690/102721229-eab8a400-433c-11eb-851d-a38feaa2b3a1.gif) |

## ⚙️ 기술 스택

<div align="center">

<img width="1165" alt="무제" src="https://user-images.githubusercontent.com/37685690/102722136-6ec15a80-4342-11eb-9b2a-e3f9a5c66d0b.png">

</div>

## 🔗 인프라 구조

<div align="center">

<img alt="인프라_구조" src="https://user-images.githubusercontent.com/34153657/102023059-319f1a80-3dce-11eb-93b4-ae680c9b2001.png">

</div>

## 🗂 프로젝트 구조

```
.
├── frontend(client)
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── atoms
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   └── pages
│   │   │
│   │   ├── assets
│   │   ├── hooks
│   │   ├── stores
│   │   ├── utils
│   │   │
│   │   ├── App.tsx
│   │   ├── schemes.ts
│   │   └── index.tsx
│   │
│   ├── .storybook
│   │
│   ├── nginx
│   │   └── nginx.conf
│   │
│   └── Dockerfile
│
├── backend(server)
│   ├── src
│   │   ├── routes
│   │   ├── middlewares
│   │   ├── aops
│   │   ├── controllers
│   │   ├── services
│   │   ├── models
│   │   ├── utils
│   │   │
│   │   ├── App.ts
│   │   └── www.ts
│   │
│   ├── test
│   │   └── services
│   │
│   ├── config
│   │   └── webpack.config.js
│   │
│   └── Dockerfile
│
└── docker-compose.yml
```

## 👩🏻‍💻 참여 개발자 🧑🏻‍💻

| 👩🏻‍💻 이소정 | 🧑🏻‍💻 김남진 | 🧑🏻‍💻 시경덕 |
| :----: | :----: | :----: |
| <img height="200" alt="이소정" src="https://user-images.githubusercontent.com/34153657/102024097-34e8d500-3dd3-11eb-8201-a6d790da95d4.png"/> | <img height="200" alt="김남진" src="https://user-images.githubusercontent.com/34153657/102024099-37e3c580-3dd3-11eb-817f-f8c0ed4d59c4.png"/> | <img height="200" alt="시경덕" src="https://user-images.githubusercontent.com/34153657/102024103-3c0fe300-3dd3-11eb-845d-a23711fe959e.png"/> |
| [@YiSoJeong](https://github.com/YiSoJeong) | [@domino8788](https://github.com/domino8788) | [@skid901](https://github.com/skid901) |
