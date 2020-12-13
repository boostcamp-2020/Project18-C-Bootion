# Project18-C-Bootion

<div align="center">

  <img height="500" src="https://user-images.githubusercontent.com/34153657/99389672-bb1c1380-291a-11eb-9228-22eb6c5de049.png"/>

# Bootion : The Notion Clone

![NodeJS](https://img.shields.io/badge/Node.js-v14.4.0-339933?logo=node.js&style=plastic)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.1.2-007acc?logo=typescript&style=plastic)
![Javascript](https://img.shields.io/badge/javascript-ES2020-yellow?logo=javascript&style=plastic)

![React](https://img.shields.io/badge/React-v17.0.1-61dafb?logo=React&style=plastic)
![Express](https://img.shields.io/badge/Express-v4.17.1-eee?logo=Express&style=plastic)
![Webpack](https://img.shields.io/badge/Webpack-v5.6.0-8dd6f9?logo=Webpack&style=plastic)
![Babel](https://img.shields.io/badge/Babel-v8.1.0-f9dc3e?logo=Babel&style=plastic)

![Jest](https://img.shields.io/badge/Jest-v26.6.3-c21325?logo=Jest&style=plastic)
![Storybook](https://img.shields.io/badge/Storybook-v26.6.3-ff4785?logo=Storybook&style=plastic)
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

## ⚙️ 기술 스택

| Tech | Stack |
|:---:|:---:|
| Lang | <img height="50" src="https://icongr.am/devicon/typescript-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/nodejs-original-wordmark.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/npm-original-wordmark.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://prettier.io/icon.png"/> |
| Front End | <img height="50" src="https://icongr.am/devicon/react-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://miro.medium.com/max/2000/1*0SkjAGdVWYe4ja5Qu4DeJg.jpeg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://raw.githubusercontent.com/emotion-js/emotion/master/emotion.png"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/webpack-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/babel-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm.png"/> |
| Back End | <img height="50" src="https://icongr.am/devicon/express-original-wordmark.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/mongodb-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://nesoy.github.io/assets/posts/20170602/1.PNG"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://pbs.twimg.com/profile_images/821713465245102080/mMtKIMax.jpg"/> |
| Production | <img height="50" src="https://icongr.am/devicon/nginx-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/docker-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://raw.githubusercontent.com/docker/compose/master/logo.png"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://www.ncloud.com/public/img/logo-m.png"/> |
| CI / CD | <img height="50" src="https://img2.storyblok.com/672x0/f/79165/1200x630/ebb5571e69/github-action-01.png"/> |
| SCM |  <img height="50" src="https://icongr.am/devicon/git-original.svg"/>&nbsp;&nbsp;&nbsp;<img height="50" src="https://icongr.am/devicon/github-original.svg"/> |

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
