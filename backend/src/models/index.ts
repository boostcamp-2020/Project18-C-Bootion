import mongoose, { ConnectionOptions } from 'mongoose';
import { Block } from '@models/block';

export const connect = async (dbName?: string): Promise<void> => {
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
    dbName: dbName ?? MONGO_DATABASE,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };

  try {
    await mongoose.connect(url, options);
    console.log('MongoDB is connected');
  } catch (e) {
    console.error('MongoDB connection failed by', e);
  }
};

export type { PageDTO, PageDoc } from './page';
export { Page } from './page';
export type { BlockType, BlockDTO, BlockDoc } from './block';
export { Block } from './block';
