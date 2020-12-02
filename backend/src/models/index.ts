import mongoose, { ConnectionOptions } from 'mongoose';

export const connect = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  let ip = 'mongo';

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
    ip = 'localhost';
  }

  const url = `mongodb://${ip}:27017?authSource=admin`;
  const options: ConnectionOptions = {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    dbName: MONGO_DATABASE,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };

  mongoose
    .connect(url, options)
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log('MongoDB connection failed', err));
};

export { Page } from './page';
export { Block } from './block';
