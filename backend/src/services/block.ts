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
  const block = await Block.readOne(blockId);
  const from = await Block.readOne(block.parentId.toHexString());
  const to = await Block.readOne(toId);

  if (from.id !== to.id) {
    await from.deleteChild(blockId);
    await to.setChild(block, toIndex);
    return { block, from, to };
  }

  toIndex ??= to.childIdList.length;
  const fromIndex = from.childIdList.findIndex(
    (_childId) => _childId.toHexString() === blockId,
  );
  toIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
  await to.deleteChild(blockId);
  await to.setChild(block, toIndex);
  return { block, from: null, to };
};

export const deleteCascade = async (blockId: string): Promise<BlockDoc> => {
  const block = await Block.readOne(blockId);
  if (!block) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }

  const parent = await Block.readOne(block.parentId.toHexString());
  await block.deleteCascade();
  await parent.deleteChild(blockId);
  return parent;
};

export const deleteOnly = async (blockId: string): Promise<BlockDoc> => {
  return null;
};
