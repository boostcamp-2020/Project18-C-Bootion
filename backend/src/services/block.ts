import { BlockDoc, BlockDTO } from '@/models';

export const create = async (param: {
  parentId: string;
  index?: number;
  blockDTO?: BlockDoc;
}): Promise<{ parent: BlockDoc; block: BlockDoc }> => {
  return null;
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
