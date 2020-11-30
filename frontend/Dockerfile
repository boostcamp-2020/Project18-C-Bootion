FROM node:14 as build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx

COPY --from=build /build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
