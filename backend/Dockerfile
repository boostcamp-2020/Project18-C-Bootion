FROM node:14

# 앱 디렉터리 생성
# WORKDIR /usr/src/app
# WORKDIR ./

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# RUN npm install
RUN npm install
RUN npm install -g pm2

# 앱 소스 추가
COPY . .

# build TS to JS
RUN npm run build

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
