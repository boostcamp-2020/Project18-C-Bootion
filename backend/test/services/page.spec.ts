import { config } from 'dotenv';
import * as mongoose from 'mongoose';

import { connect, PageDTO } from '@/models';
import { pageService } from '@/services';
import { ErrorMessage } from '@/aops';

config();

describe('@services/page', () => {
  const dbName = 'bootionTest';
  let conn: mongoose.Connection;

  beforeAll(async () => {
    await connect(dbName);
    conn = mongoose.connections[0];
  });

  beforeEach(async () => {
    //
  });

  afterEach(async () => {
    await conn.dropDatabase();
  });

  afterAll(async () => {
    try {
      await conn.dropDatabase();
      await conn.close();
      console.log('MongoDB is disconnected');
    } catch (e) {
      console.error('MongoDB disconnection failed by', e);
    }
  });

  it('create: Success', async () => {
    const pageDTO: PageDTO = { title: 'test page title' };
    const received = await pageService.create(pageDTO);
    expect(received?.toJSON().title).toEqual(pageDTO.title);
  });

  it('create: Duplicated error', async () => {
    await expect(async () => {
      const page = await pageService.create();
      await pageService.create(page.toJSON());
    }).rejects.toThrow();
  });

  it('readOne: Success', async () => {
    const expected = await pageService.create();
    const received = await pageService.readOne(expected.id);
    expect(received?.toJSON()).toEqual(expected?.toJSON());
  });

  it('readOne: Not found', async () => {
    await expect(async () => {
      const pageDTO: PageDTO = { id: 'invalid id' };
      await pageService.readOne(pageDTO.id);
    }).rejects.toThrow();
  });

  it('readAll: Success', async () => {
    const page01 = await pageService.create({ title: 'test page 01' });
    const page02 = await pageService.create({ title: 'test page 02' });
    const expected = [page01, page02]
      .map((pageDoc) => pageDoc.toJSON())
      .reverse();
    const received = (await pageService.readAll()).map((pageDoc) =>
      pageDoc.toJSON(),
    );
    expect(received).toEqual(expected);
  });

  it('update: Success', async () => {
    const page = await pageService.create();
    const expected: PageDTO = { ...page.toJSON(), title: 'updated title' };
    const received = await pageService.update(expected);
    expect(received?.toJSON()).toEqual(expected);
  });

  it('update: Not found', async () => {
    await expect(async () => {
      const pageDTO: PageDTO = { id: 'invalid id' };
      await pageService.update(pageDTO);
    }).rejects.toThrow(ErrorMessage.NOT_FOUND);
  });

  it('delete: Success', async () => {
    const pageDTO = (await pageService.create())?.toJSON();
    const received = await pageService.deleteOne(pageDTO);
    await expect(async () => {
      await pageService.readOne(received.id);
    }).rejects.toThrow(ErrorMessage.NOT_FOUND);
  });

  it('delete: Not found', async () => {
    await expect(async () => {
      const pageDTO: PageDTO = { id: 'invalid id' };
      await pageService.deleteOne(pageDTO);
    }).rejects.toThrow(ErrorMessage.NOT_FOUND);
  });
});
