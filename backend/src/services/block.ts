import {
  BlockType,
  Block,
  BlockDoc,
  PageDoc,
  BlockModel,
  PageModel,
} from '@/models';

export const getOne = async (block: Block): Promise<BlockDoc> => {
  if (block?.parentIdList.length) {
    const rootId = block.parentIdList[0];
    let parent: BlockDoc = await BlockModel.findById(rootId).exec();
    parent = block.parentIdList
      .slice(1)
      .reduce(
        (parent: BlockDoc, parentId: string): BlockDoc =>
          (parent.children as any).id(parentId),
        parent,
      );
    return (parent.children as any).id(block.id);
  }
  return await BlockModel.findById(block.id).exec();
};

export const createToPage = async (params: {
  pageId: string;
  block: Block;
  targetIndex: number | null;
}): Promise<{ block: BlockDoc; page: PageDoc; parent: null }> => {
  const page: PageDoc = await PageModel.findById(params.pageId).exec();
  const block = new BlockModel(params.block ?? {});

  await page.addBlock(block, params.targetIndex);
  await page.populateBlock();
  return { block, page, parent: null };
};

export const createToBlock = async (params: {
  parent: Block;
  block: Block;
  targetIndex: number | null;
}): Promise<{ block: BlockDoc; parent: BlockDoc; page: null }> => {
  const parent: BlockDoc = await getOne(params.parent);
  const block: BlockDoc = new BlockModel(params.block ?? {});

  await parent.addChild(block, params.targetIndex);
  await parent.requestSave();
  return { block, parent, page: null };
};

export const updateBlock = async (blockDTO: Block): Promise<BlockDoc> => {
  const block = await getOne(blockDTO);
  block.type = (blockDTO.type ?? block.type) as BlockType;
  block.value = blockDTO.value ?? block.value;

  await block.requestSave();
  return block;
};

export const moveToPage = async (params: {
  pageId: string;
  block: Block;
  targetIndex: number;
}): Promise<[BlockDoc, PageDoc]> => {
  await remove(params.block);
  const { block, page } = await createToPage(params);
  return [block, page];
};

export const moveToBlock = async (params: {
  parent: Block;
  block: Block;
  targetIndex: number;
}): Promise<[BlockDoc, BlockDoc]> => {
  await remove(params.block);
  const { block, parent } = await createToBlock(params);
  return [block, parent];
};

export const remove = async (blockDTO: Block): Promise<void> => {
  const block = await getOne(blockDTO);
  if (!block) return;

  if (block.parentIdList.length !== 0) {
    await block.removeFromParent();
    return;
  }

  const page = await PageModel.findById(block.pageId).exec();
  await page.removeBlock(block);
  await BlockModel.findByIdAndDelete(block.id).exec();
};
