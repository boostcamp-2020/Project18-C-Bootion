import { Block, BlockType, BlockFamily, FamilyFunc, BlockMap } from '@/schemes';
import { useFamily } from '@/hooks';

interface ManagerFunc {
  addChild: (option?: any, insertIndex?: number) => Block;
  addSibling: (option?: any, insertIndex?: number) => Block;
  setBlock: (option?: any) => void;
  startTransaction: () => void;
  commitTransaction: () => void;
  pullIn: () => Block;
  pullOut: () => Block;
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

  const setBlock = (option: any = {}) => {
    transaction[block.id] = {
      ...block,
      ...option,
    };
  };
  const addChild = (option: any = {}, insertIndex = 0): Block => {
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
    transaction[id] = newBlock;
    const copyChildIdList = [...childrenIdList];
    copyChildIdList.splice(insertIndex, 0, id);
    transaction[block.id] = {
      ...transaction[block.id],
      childIdList: copyChildIdList,
    };
    return newBlock;
  };

  const addSibling = (
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
    transaction[parent.id] = {
      ...parent,
      childIdList: copySiblingsIdList,
    };
    return newBlock;
  };

  const pullIn = () => {
    if (blockIndex) {
      const targetSibling = transaction[siblingsIdList[blockIndex - 1]];
      transaction[siblingsIdList[blockIndex - 1]] = {
        ...targetSibling,
        childIdList: [...targetSibling.childIdList, block.id],
      };
      transaction[parent.id] = {
        ...transaction[parent.id],
        childIdList: siblingsIdList.filter((id) => id !== block.id),
      };
      transaction[block.id] = {
        ...block,
        parentId: siblingsIdList[blockIndex - 1],
      };
    }
    return block;
  };

  const pullOut = () => {
    if (grandParent && grandParent.type !== BlockType.GRID) {
      transaction[parent.id] = {
        ...parent,
        childIdList: parent.childIdList.filter((id) => id !== block.id),
      };
      const copyParentsIdList = [...parentsIdList];
      copyParentsIdList.splice(parentIndex + 1, 0, block.id);
      transaction[block.id] = {
        ...block,
        parentId: grandParent.id,
      };
      transaction[grandParent.id] = {
        ...grandParent,
        childIdList: copyParentsIdList,
      };
    }
    return block;
  };

  return [
    family,
    {
      ...familyFunc,
      addChild,
      addSibling,
      setBlock,
      startTransaction,
      commitTransaction,
      pullIn,
      pullOut,
    },
  ];
};

export default useManger;
