import { Block, BlockType, BlockFamily, FamilyFunc, BlockMap } from '@/schemes';
import { useFamily } from '@/hooks';
import { focusState, blockRefState } from '@/stores';
import { useSetRecoilState } from 'recoil';
import {
  createBlock,
  updateBlock,
  moveBlock,
  deletePageCascade,
} from '@utils/blockApis';

interface ManagerFunc {
  insertNewChild: (option?: any, insertIndex?: number) => Promise<Block>;
  insertNewSibling: (option?: any, insertIndex?: number) => Promise<Block>;
  insertSibling: (id: string, inserIndex?: number) => Promise<Block>;
  setBlock: (id: string, option?: any) => Promise<Block>;
  startTransaction: () => void;
  commitTransaction: () => void;
  pullIn: () => Promise<Block>;
  pullOut: () => Promise<Block>;
  deleteBlock: () => Promise<void>;
  setFocus: (targetBlock: Block) => number;
  setCaretOffset: (
    offset?: number,
    isBlur?: boolean,
    isCaret?: boolean,
  ) => void;
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
  const setFocusId = useSetRecoilState(focusState);

  const startTransaction = () => {
    transaction = { ...blockMap };
  };

  const commitTransaction = () => {
    familyFunc.setBlockMap(transaction);
  };

  const setBlock = async (id: string, option: any = {}) => {
    const { block: updatedBlock } = await updateBlock({
      ...transaction[id],
      ...option,
    });
    return setUpdatedBlock(updatedBlock.id, updatedBlock);
  };

  const setUpdatedBlock = (id: string, option: any = {}) => {
    transaction = {
      ...transaction,
      [id]: {
        ...transaction[id],
        ...option,
      },
    };
    return transaction[id];
  };

  const insertNewChild = async (
    option: any = {},
    insertIndex = 0,
  ): Promise<Block> => {
    const { block: updatedBlock, parent: updatedParent } = await createBlock({
      parentBlockId: block.id,
      index: insertIndex,
      block: option,
    });
    setUpdatedBlock(updatedBlock.id, updatedBlock);
    setUpdatedBlock(updatedParent.id, updatedParent);
    return updatedBlock;
  };

  const insertSibling = async (
    id: string,
    insertIndex: number = 0,
  ): Promise<Block> => {
    const { block: updatedBlock, from, to } = await moveBlock({
      blockId: id,
      toId: parent.id,
      index: insertIndex,
    });
    setUpdatedBlock(updatedBlock.id, updatedBlock);
    setUpdatedBlock(from.id, from);
    setUpdatedBlock(to.id, to);
    return updatedBlock;
  };

  const insertNewSibling = async (
    option: any = {},
    insertIndex = blockIndex + 1,
  ): Promise<Block> => {
    const { block: updatedBlock, parent: updatedParent } = await createBlock({
      parentBlockId: parent.id,
      index: insertIndex,
      block: option,
    });
    setUpdatedBlock(updatedBlock.id, updatedBlock);
    setUpdatedBlock(updatedParent.id, updatedParent);
    return updatedBlock;
  };

  const deleteBlock = async () => {
    const { parent: updatedBlock } = await deletePageCascade(block.id);
    setUpdatedBlock(updatedBlock.id, updatedBlock);
  };

  const pullIn = async () => {
    if (blockIndex) {
      const { block: updatedBlock, from, to } = await moveBlock({
        blockId: block.id,
        toId: siblingsIdList[blockIndex - 1],
      });
      setUpdatedBlock(updatedBlock.id, updatedBlock);
      setUpdatedBlock(from.id, from);
      setUpdatedBlock(to.id, to);
      return updatedBlock;
    }
    return block;
  };

  const pullOut = async () => {
    if (grandParent && grandParent.type !== BlockType.GRID) {
      const { block: updatedBlock, from, to } = await moveBlock({
        blockId: block.id,
        toId: grandParent.id,
        index: parentIndex + 1,
      });
      setUpdatedBlock(updatedBlock.id, updatedBlock);
      setUpdatedBlock(from.id, from);
      setUpdatedBlock(to.id, to);
      return updatedBlock;
    }
    return block;
  };

  const setFocus = (targetBlock: Block) => {
    if (!targetBlock) {
      return null;
    }
    const beforeOffset = window.getSelection().focusOffset;
    setFocusId(targetBlock.id);
    const targetRef = blockRefState[targetBlock.id];
    if (targetRef) {
      targetRef.current.focus();
    }
    return beforeOffset;
  };

  const setCaretOffset = (
    offset: number = window.getSelection().focusOffset,
    isBlur: boolean = true,
    isCaret: boolean = true,
  ) => {
    const sel = window.getSelection();
    const { focusNode: beforeNode } = sel;
    const length = (beforeNode as any).length && beforeNode.textContent.length;
    if (length) sel.collapse(beforeNode, offset > length ? length : offset);
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
      setFocus,
      setCaretOffset,
    },
  ];
};

export default useManger;
