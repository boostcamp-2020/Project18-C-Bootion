import { Block, BlockType, BlockFamily, FamilyFunc, BlockMap } from '@/schemes';
import { useFamily } from '@/hooks';

interface ManagerFunc {
  insertNewChild: (option?: any, insertIndex?: number) => Block;
  insertNewSibling: (option?: any, insertIndex?: number) => Block;
  insertSibling: (id: string, inserIndex?: number) => Block;
  setBlock: (id: string, option?: any) => Block;
  startTransaction: () => void;
  commitTransaction: () => void;
  pullIn: () => Block;
  pullOut: () => Block;
  deleteBlock: () => string[];
}

const useManger = (
  blockId: string,
): [BlockFamily, ManagerFunc & FamilyFunc] => {
  const [family, familyFunc] = useFamily(blockId);
  const {
    blockMap,
    block,
    blockIndex,
    parent,
    parentIndex,
    grandParent,
    page,
    childrenIdList,
    children,
    siblingsIdList,
    siblings,
    parentsIdList,
    parents,
  } = family;
  let transaction: BlockMap = { ...blockMap };
  const startTransaction = () => {
    transaction = { ...blockMap };
  };
  const commitTransaction = () => {
    familyFunc.setBlockMap(transaction);
  };

  const setBlock = (id: string, option: any = {}) => {
    transaction[id] = {
      ...transaction[id],
      ...option,
    };
    return transaction[id];
  };

  const insertNewChild = (option: any = {}, insertIndex = 0): Block => {
    const id = `${block.id}${children.length + 1}_${Date.now()}`;
    const newBlock: Block = {
      id,
      type: BlockType.TEXT,
      value: '',
      childIdList: [],
      parentId: block?.id ?? null,
      pageId: page.id,
      ...option,
    };
    setBlock(id, newBlock);
    const copyChildIdList = [...childrenIdList];
    copyChildIdList.splice(insertIndex, 0, id);
    setBlock(block.id, {
      childIdList: copyChildIdList,
    });
    return newBlock;
  };

  const insertSibling = (id: string, insertIndex: number = 0) => {
    const copySiblingsIdList = transaction[parent.id].childIdList;
    copySiblingsIdList.splice(insertIndex, 0, id);
    setBlock(parent.id, {
      childrenIdList: copySiblingsIdList,
    });
    setBlock(id, {
      parentId: parent.id,
    });
    return transaction[id];
  };

  const insertNewSibling = (
    option: any = {},
    insertIndex = blockIndex + 1,
  ): Block => {
    const id = `${parent?.id ?? ''}${siblings.length + 1}_${Date.now()}`;
    const newBlock: Block = {
      id,
      type: BlockType.TEXT,
      value: '',
      childIdList: [],
      parentId: parent?.id ?? null,
      pageId: page.id,
      ...option,
    };
    transaction[id] = newBlock;
    const copySiblingsIdList = [...siblingsIdList];
    copySiblingsIdList.splice(insertIndex, 0, id);
    setBlock(parent.id, {
      childIdList: copySiblingsIdList,
    });
    return newBlock;
  };

  const deleteBlock = () => {
    const filteredSiblingsIdList = siblingsIdList.filter(
      (id) => id !== block.id,
    );
    setBlock(parent.id, {
      childIdList: filteredSiblingsIdList,
    });
    return [...transaction[block.id].childIdList];
  };

  const pullIn = () => {
    if (blockIndex) {
      const targetSibling = siblings[blockIndex - 1];
      setBlock(siblingsIdList[blockIndex - 1], {
        childIdList: [...targetSibling.childIdList, block.id],
      });
      deleteBlock();
      setBlock(block.id, { parentId: siblingsIdList[blockIndex - 1] });
    }
    return block;
  };

  const pullOut = () => {
    if (grandParent && grandParent.type !== BlockType.GRID) {
      deleteBlock();
      const copyParentsIdList = [...parentsIdList];
      copyParentsIdList.splice(parentIndex + 1, 0, block.id);
      setBlock(block.id, { parentId: grandParent.id });
      setBlock(grandParent.id, { childIdList: copyParentsIdList });
    }
    return block;
  };

  return [
    family,
    {
      ...familyFunc,
      insertNewChild,
      insertNewSibling,
      insertSibling,
      setBlock,
      startTransaction,
      commitTransaction,
      pullIn,
      pullOut,
      deleteBlock,
    },
  ];
};

export default useManger;
