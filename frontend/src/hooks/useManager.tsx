/* eslint-disable @typescript-eslint/indent */
import { Block, BlockType, BlockFamily, FamilyFunc } from '@/schemes';
import { useFamily } from '@/hooks';

interface ManagerFunc {
  addChild: (
    parentOption: any,
    childOption: any,
    blockType?: BlockType,
  ) => Block;
  addSibling: (
    parentOption: any,
    siblingOption: any,
    blockType?: BlockType,
  ) => Block;
}

const useManger = (
  blockId: string,
): [BlockFamily, ManagerFunc & FamilyFunc] => {
  const [family, familyFunc] = useFamily(blockId);
  const {
    block,
    blockIndex,
    parent,
    parentIndex,
    grandParent,
    page,
    children,
    siblings,
    parents,
  } = family;
  const { setBlock, setParent, setPage } = familyFunc;
  const addChild = (
    parentOption: any = {},
    childOption: any = {},
    blockType: BlockType = BlockType.TEXT,
  ) => {
    const newBlock: Block = {
      id: `${block.id}${children.length + 1}_${Date.now()}`,
      type: blockType,
      value: '',
      children: [],
      parentBlockId: block?.id ?? null,
      pageId: page.id,
      ...childOption,
    };
    setBlock({
      ...block,
      children: [newBlock, ...children],
      ...parentOption,
    });
    return newBlock;
  };

  const addSibling = (
    parentOption: any = {},
    siblingOption: any = {},
    blockType: BlockType = BlockType.TEXT,
  ) => {
    const newBlock: Block = {
      id: `${parent?.id ?? ''}${siblings.length + 1}_${Date.now()}`,
      type: blockType,
      value: '',
      children: [],
      parentBlockId: parent?.id ?? null,
      pageId: page.id,
      ...siblingOption,
    };
    const copySibling = [...siblings];
    copySibling.splice(blockIndex + 1, 0, newBlock);
    copySibling.splice(blockIndex, 1, { ...block, ...parentOption });
    setBlock({ ...block, ...parentOption });
    parent
      ? setParent({ ...parent, children: copySibling })
      : setPage({
          ...page,
          blockList: copySibling,
          blockIdList: copySibling.map((sibling) => sibling.id),
        });
    return newBlock;
  };

  return [
    family,
    {
      ...familyFunc,
      addChild,
      addSibling,
    },
  ];
};

export default useManger;
