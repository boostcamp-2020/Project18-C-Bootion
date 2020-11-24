import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const connect = (): void => {
  let { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  let ip = 'mongo';

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
    ip = 'localhost';
  }

  MONGO_USERNAME = encodeURIComponent(MONGO_USERNAME);
  MONGO_PASSWORD = encodeURIComponent(MONGO_PASSWORD);
  MONGO_DATABASE = encodeURIComponent(MONGO_DATABASE);
  ip = encodeURIComponent(ip);

  mongoose.connect(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${ip}:27017/${MONGO_DATABASE}?authSource=admin`,
    { useNewUrlParser: true },
    (error) => {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    },
  );
};

export { default as UserModel } from './user';
