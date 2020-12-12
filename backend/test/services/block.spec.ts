import { config } from 'dotenv';
import * as mongoose from 'mongoose';

import { BlockDTO, BlockType, connect, PageDoc, PageDTO } from '@/models';
import { blockService, pageService } from '@/services';

config();

describe('@services/block', () => {
  const dbName = 'bootionTest';
  let conn: mongoose.Connection;
  let page: PageDoc;

  beforeAll(async () => {
    await connect(dbName);
    conn = mongoose.connections[0];
  });

  beforeEach(async () => {
    page = await pageService.create();
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
    const { block, parent } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });

    expect(block.parentId.toHexString()).toEqual(parent.id);
    expect(
      parent.childIdList.some((childId) => childId.toHexString() === block.id),
    ).toBeTruthy();
  });

  it('create: Success param', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const index = 0;
    const expected: BlockDTO = { value: 'expected', type: BlockType.HEADING1 };
    const { block: received, parent } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });

    expect(received.value).toEqual(expected.value);
    expect(received.type).toEqual(expected.type);
    expect(
      parent.childIdList.findIndex(
        (childId) => childId.toHexString() === received.id,
      ),
    ).toEqual(index);
  });

  it('create: Duplicated error', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });

    await expect(async () =>
      blockService.create(block.toJSON()),
    ).rejects.toThrow();
  });

  it('readAll: Success', async () => {
    const param = { parentId: page.rootId.toHexString() };
    const { block: block01 } = await blockService.create(param);
    const { block: block02, parent } = await blockService.create(param);
    const expected = [parent, block01, block02].map((blockDoc) =>
      blockDoc.toJSON(),
    );
    const received = (await blockService.readAll(page.id)).map((pageDoc) =>
      pageDoc.toJSON(),
    );

    expect(received).toEqual(expected);
  });

  it('update: Success contents', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const expected = {
      ...block.toJSON(),
      value: 'updated',
      type: BlockType.HEADING1,
    };
    const { block: received } = await blockService.update({
      blockId: block.id,
      blockDTO: expected,
    });

    expect(received.value).toEqual(expected.value);
    expect(received.type).toEqual(expected.type);
  });

  it('update: Success moving one to another', async () => {
    const param = { parentId: page.rootId.toHexString() };
    const { block: block01 } = await blockService.create(param);
    const { block: block02, parent } = await blockService.create(param);

    const { block: received, from, to } = await blockService.update({
      blockId: block01.id,
      blockDTO: block01.toJSON(),
      toId: block02.id,
    });

    expect(received.parentId.toHexString()).toEqual(block02.id);
    expect(from.id).toEqual(parent.id);
    expect(to.id).toEqual(block02.id);
    expect(
      from.childIdList.every(
        (childId) => childId.toHexString() !== received.id,
      ),
    ).toBeTruthy();
    expect(
      to.childIdList.some((childId) => childId.toHexString() === received.id),
    ).toBeTruthy();
  });

  it('update: Success changing order', async () => {
    const param = { parentId: page.rootId.toHexString() };
    const { block: block01 } = await blockService.create(param);
    const { block: block02, parent } = await blockService.create(param);

    const { to } = await blockService.update({
      blockId: block02.id,
      blockDTO: block02.toJSON(),
      toId: parent.id,
      toIndex: 0,
    });
    const received = to.childIdList.map((childId) => childId.toHexString());

    expect(to.id).toEqual(parent.id);
    expect(received).toEqual([block02.id, block01.id]);
  });

  it('update: Not found', async () => {
    const received = { blockId: 'invalid id', blockDTO: {} };

    await expect(
      async () => await blockService.update(received),
    ).rejects.toThrow();
  });

  it('delete: Success', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const parent = await blockService.deleteOne(block.id);

    expect(parent.id).toEqual(block.parentId.toHexString());
    expect(
      parent.childIdList.every((childId) => childId.toHexString() !== block.id),
    ).toBeTruthy();
  });

  it('delete: Not found', async () => {
    const received: BlockDTO = { id: 'invalid id' };

    await expect(
      async () => await blockService.deleteOne(received.id),
    ).rejects.toThrow();
  });
});
