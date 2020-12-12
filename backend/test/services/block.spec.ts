import { config } from 'dotenv';
import * as mongoose from 'mongoose';

import { connect, PageDoc } from '@/models';
import { pageService } from '@/services';

config();

describe('@services/block', () => {
  const dbName = 'bootionTest';
  let page: PageDoc;

  beforeAll(async () => {
    await connect(dbName);
    page = await pageService.create();
  });

  afterAll(async () => {
    try {
      const conn = mongoose.connections[0];
      await conn.dropDatabase();
      await conn.close();
      console.log('MongoDB is disconnected');
    } catch (e) {
      console.error('MongoDB disconnection failed by', e);
    }
  });

  it('test', async () => {
    const fetchTest = () => new Promise((resolve) => resolve(1));

    expect(await fetchTest()).toBe(1);
  });
});
