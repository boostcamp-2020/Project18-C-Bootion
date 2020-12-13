import { Block, BlockDoc, BlockDTO } from '@/models';
import { ErrorMessage } from '@/aops';

export const create = async (param: {
  parentId: string;
  index?: number;
  blockDTO?: BlockDTO;
}): Promise<{ parent: BlockDoc; block: BlockDoc }> => {
  const parent = await Block.readOne(param.parentId);
  if (!parent) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }

  const block = await Block.createOne({
    ...param.blockDTO,
    pageId: parent.pageId.toHexString(),
  });
  await parent.setChild(block, param.index);
  return { parent, block };
};

export const readAll = async (pageId: string): Promise<BlockDoc[]> => {
  return Block.readAll(pageId);
};

export const update = async (
  blockId: string,
  blockDTO: BlockDTO,
): Promise<BlockDoc> => {
  const block = await Block.updateOneBlock(blockId, blockDTO);
  if (!block) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return block;
};

export const move = async (
  blockId: string,
  toId: string,
  toIndex?: number,
): Promise<{ block: BlockDoc; from?: BlockDoc; to?: BlockDoc }> => {
  return null;
};

export const deleteCascade = async (blockId: string): Promise<BlockDoc> => {
  const block = await Block.readOne(blockId);
  if (!block) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }

  const parent = await Block.readOne(block.parentId.toHexString());
  await parent.deleteChild(block);
  return parent;
};
