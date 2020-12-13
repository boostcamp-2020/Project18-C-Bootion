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
  return null;
};

export const update = async (param: {
  blockId: string;
  blockDTO: BlockDTO;
  toId?: string;
  toIndex?: number;
}): Promise<{ block: BlockDoc; from?: BlockDoc; to?: BlockDoc }> => {
  return null;
};

export const deleteOne = async (blockId: string): Promise<BlockDoc> => {
  return null;
};
