import { Document, Types } from 'mongoose';

import { Block, Page } from '@/models';
import { ErrorMessage } from '@/middlewares';

export const createToPage = async (params: {
  pageId: string;
  targetId: string | null;
}): Promise<{ block: Document; page: Document; parent: null }> => {
  let page: any = await Page.findById(params.pageId).exec();
  const block = new Block({
    pageId: page.id,
  });
  await block.save();

  let targetIndex = page.blockList.findIndex(
    (blockId: string) => blockId === params.targetId,
  );
  targetIndex < 0 && (targetIndex = page.blockList.length);
  page.blockList.splice(targetIndex, 0, block.id);
  await page.save();
  page = await Page.findById(params.pageId).populate('blockList').exec();

  return { block, page, parent: null };
};

export const createToBlock = async (params: {
  parentId: string;
  targetId: string | null;
}): Promise<{ block: Document; parent: Document; page: null }> => {
  const parent: any = await getOne({ id: params.parentId });
  const block = new Block({
    pageId: parent.pageId,
    parentId: parent.id,
  });

  let targetIndex = parent.children.findIndex(
    (child: any) => child.id === params.targetId,
  );
  targetIndex < 0 && (targetIndex = parent.children.length);
  parent.children.splice(targetIndex, 0, block);

  if (parent.parentId) {
    await parent.ownerDocument().save();
  } else {
    await parent.save();
  }

  return { block, parent, page: null };
};

export const getOne = async (params: { id: string }): Promise<Document> => {
  const block = await Block.findById(params.id).exec();

  if (!block) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return block;
};

export const update = async (params: {
  id: string;
  type: string | null;
  value: string | null;
}): Promise<Document> => {
  const block: any = await getOne({ id: params.id });
  block.type = params.type ?? block.type;
  block.value = params.value ?? block.value;

  if (block.parentId) {
    await block.ownerDocument().save();
  } else {
    await block.save();
  }
  return block;
};

export const move = async (params: {
  id: string;
  targetId: any;
}): Promise<any> => {
  return;
};

export const remove = async (params: { id: string }): Promise<void> => {
  const block: any = await Block.findById(params.id);
  if (!block) return;

  if (block.parentId) {
    const parent = block.parent();
    parent.children = parent.children.filter(
      (child: any) => child.id !== block.id,
    );
    await parent.ownerDocument().save();
    return;
  }

  const page: any = await Page.findById(block.pageId).exec();
  page.blockList = page.blockList.filter(
    (blockId: Types.ObjectId) => blockId.toHexString() !== block.id,
  );
  await page.save();
  await Block.findByIdAndDelete(block.id).exec();
};
