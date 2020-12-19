import { config } from 'dotenv';
import * as mongoose from 'mongoose';

import { Block, BlockDTO, BlockType, connect, PageDoc } from '@/models';
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
      blockDTO: expected,
      index,
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
      blockService.create({
        parentId: page.rootId.toHexString(),
        blockDTO: block.toJSON(),
      }),
    ).rejects.toThrow();
  });

  it('create: Not found', async () => {
    const params = { parentId: 'invalid id' };

    await expect(async () => blockService.create(params)).rejects.toThrow();
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

  it('update: Success', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const expected = {
      ...block.toJSON(),
      value: 'updated',
      type: BlockType.HEADING1,
    };
    const received = await blockService.update(block.id, expected);

    expect(received.value).toEqual(expected.value);
    expect(received.type).toEqual(expected.type);
  });

  it('update: Not found', async () => {
    const received = { blockId: 'invalid id', blockDTO: {} };

    await expect(async () =>
      blockService.update(received.blockId, received.blockDTO),
    ).rejects.toThrow();
  });

  it('move: Success moving one to another', async () => {
    const param = { parentId: page.rootId.toHexString() };
    const { block: block01 } = await blockService.create(param);
    const { block: block02, parent } = await blockService.create(param);

    const { block: received, from, to } = await blockService.move(
      block01.id,
      block02.id,
    );

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

  it('move: Success changing order', async () => {
    const param = { parentId: page.rootId.toHexString() };
    const { block: block01 } = await blockService.create(param);
    const { block: block02, parent } = await blockService.create(param);

    const { to } = await blockService.move(block02.id, parent.id, 0);
    const received = to.childIdList.map((childId) => childId.toHexString());

    expect(to.id).toEqual(parent.id);
    expect(received).toEqual([block02.id, block01.id]);
  });

  it('deleteCascade: Success', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const { block: child } = await blockService.create({
      parentId: block.id,
    });
    const blockId = block.id;
    const childId = child.id;

    const parent = await blockService.deleteCascade(block.id);

    expect(parent.id).toEqual(block.parentId.toHexString());
    expect(
      parent.childIdList.every((childId) => childId.toHexString() !== block.id),
    ).toBeTruthy();
    expect(await Block.readOne(blockId)).toBeNull();
    expect(await Block.readOne(childId)).toBeNull();
  });

  it('deleteCascade: Not found', async () => {
    const received: BlockDTO = { id: 'invalid id' };

    await expect(async () =>
      blockService.deleteCascade(received.id),
    ).rejects.toThrow();
  });

  it('deleteOnly: Success', async () => {
    const { block } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    const { block: sibling } = await blockService.create({
      parentId: page.rootId.toHexString(),
    });
    let { block: child } = await blockService.create({
      parentId: block.id,
    });
    let { block: anotherChild } = await blockService.create({
      parentId: block.id,
    });

    const parent = await blockService.deleteOnly(block.id);
    child = await Block.readOne(child.id);
    anotherChild = await Block.readOne(anotherChild.id);
    const receivedChildIdList = parent.childIdList.map((childId) =>
      childId.toHexString(),
    );

    expect(await Block.readOne(block.id)).toBeNull();
    expect(parent.id).toEqual(block.parentId.toHexString());
    expect(child.parentId).toEqual(block.parentId);
    expect(anotherChild.parentId).toEqual(block.parentId);
    expect(receivedChildIdList).toEqual([
      child.id,
      anotherChild.id,
      sibling.id,
    ]);
  });

  it('deleteOnly: Not found', async () => {
    const received: BlockDTO = { id: 'invalid id' };

    await expect(async () =>
      blockService.deleteOnly(received.id),
    ).rejects.toThrow();
  });
});
