import * as mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const connect = (): void => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  let { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
  MONGO_USERNAME = encodeURIComponent(MONGO_USERNAME);
  MONGO_PASSWORD = encodeURIComponent(MONGO_PASSWORD);

  mongoose.connect(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/admin`,
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
