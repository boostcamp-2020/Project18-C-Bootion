/* eslint-disable @typescript-eslint/indent */
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageState, blockMapState } from '@/stores';
import { Block, BlockType, BlockFamily, FamilyFunc, IdType } from '@/schemes';
import { useBlock } from '@/hooks';

const useFamily = (blockId: string): [BlockFamily, FamilyFunc] => {
  const [blockMap, setBlockMap] = useRecoilState(blockMapState);
  const [block] = useBlock(blockId);
  const [parent] = useBlock(block?.parentId);
  const [grandParent] = useBlock(parent?.parentId);
  const [greatGrandParent] = useBlock(grandParent?.parentId);
  const page = useRecoilValue(pageState);
  const getChildren = (childrenIdList: IdType[] | null) =>
    childrenIdList?.map((childId: string) => blockMap[childId]);
  const childrenIdList = block?.childIdList;
  const children = getChildren(childrenIdList);
  const siblingsIdList = parent?.childIdList;
  const siblings = getChildren(siblingsIdList);
  const parentsIdList = grandParent?.childIdList;
  const parents = getChildren(parentsIdList);
  const blockIndex = parent?.childIdList?.findIndex(
    (_blockId: string) => _blockId === block?.id,
  );
  const parentIndex = grandParent?.childIdList?.findIndex(
    (_blockId: string) => _blockId === parent?.id,
  );
  const prevSibling = siblings?.[blockIndex - 1];
  const nextSibling = siblings?.[blockIndex + 1];
  const prevSiblings = siblings?.slice(0, blockIndex).reverse();
  const nextSiblings = siblings?.slice(blockIndex);

  const findLastDescendant = (targetBlock: Block) => {
    let currentBlock = targetBlock;
    while (currentBlock.childIdList.length) {
      currentBlock =
        blockMap[currentBlock.childIdList[currentBlock.childIdList.length - 1]];
    }
    return currentBlock;
  };

  const getTopAncestor = () => {
    const root = blockMap[page.rootId];
    const rootChildren = root.childIdList;
    let currentParent = block;
    while (!rootChildren.includes(currentParent.id)) {
      currentParent = blockMap[currentParent.parentId];
    }
    return currentParent;
  };

  const getNextBlock = () => {
    if (children.length) {
      /* 자식이 있을 때 첫번째 자식이 다음 block 이다.  */
      return children[0];
    }
    if (blockIndex !== siblings.length - 1) {
      switch (nextSibling.type) {
        case BlockType.COLUMN:
          return blockMap[nextSibling.childIdList[0]];
        case BlockType.GRID:
          return blockMap[blockMap[nextSibling.childIdList[0]].childIdList[0]];
        default:
          /** 다음 부모의 타입이 COLUMN이나 GRID가 아니면 다음 Block 이다. */
          return nextSibling;
      }
    }
    /* block이 마지막 자식일 때. 다음 부모가 다음 Block 이다. */
    const targetParentBlock = parents?.[parentIndex + 1];
    if (!targetParentBlock) {
      const topAncestors = blockMap[page.rootId].childIdList;
      const topAncestor: Block = getTopAncestor();
      const topAncestorIndex = topAncestors.findIndex(
        (_blockId) => _blockId === topAncestor.id,
      );
      const nextTopAncestor = blockMap[topAncestors[topAncestorIndex + 1]];
      if (nextTopAncestor) {
        switch (nextTopAncestor.type) {
          case BlockType.COLUMN:
            return blockMap[nextTopAncestor.childIdList[0]];
          case BlockType.GRID:
            return blockMap[
              blockMap[nextTopAncestor.childIdList[0]].childIdList[0]
            ];
          default:
            return nextTopAncestor;
        }
      }
      /** 현재 블록이 마지막 블록이다. */
      return null;
    }
    switch (targetParentBlock.type) {
      case BlockType.COLUMN:
        /** 다음 부모의 Type이 Column 일때 첫번째 자식이 다음 Block 이다. */
        return blockMap[targetParentBlock.childIdList[0]];
      case BlockType.GRID:
        /** 다음 부모의 Type이 Grid 일때 첫번째 자식(Column)의 자식이 다음 Block 이다. */
        return blockMap[
          blockMap[targetParentBlock.childIdList[0]].childIdList[0]
        ];
      default:
        /** 다음 부모의 타입이 COLUMN이나 GRID가 아니면 다음 Block 이다. */
        return targetParentBlock;
    }
  };

  const getPrevBlock = () => {
    if (blockIndex) {
      /** blockIndex가 0이 아니면 이전 형제에서 prev block을 찾을 수 있다. */
      if (prevSibling?.childIdList.length) {
        /* 이전 형제에게 자식이 있다면 마지막 후손이 prev block 이다.  */
        return findLastDescendant(prevSibling);
      }
      /* 이전 형제에게 자식이 없다면 형제가 prev block 이다.  */
      return prevSibling;
    }
    /* block이 첫번째 자식일 때. 부모가 이전 Block 이다. */
    if (parent.type !== BlockType.COLUMN) {
      return parent.parentId ? parent : null;
    }
    /** 부모의 Type이 Column 이면 부모의 이전 형제의 마지막 자식이 이전 Block 이다. */
    if (parentIndex) {
      /** 부모의 index가 0이 아니면 이전 부모의 마지막 */
      const prevParentChildren = getChildren(
        parents[parentIndex - 1].childIdList,
      );
      return prevParentChildren[prevParentChildren.length - 1];
    }
    /** 부모의 index가 0이면 조부모에 이전 Block이 있다. */
    if (!grandParent) {
      /** grandParent가 없을 경우 이전 블록이 없다는 뜻이다. */
      return null;
    }
    if (grandParent.type !== BlockType.GRID) {
      return grandParent;
    }
    /** 조부모가 GRID 타입인 경우 조부모의 이전 형제에 이전 블록이 있다. */
    const grandParentIndex = greatGrandParent.childIdList.findIndex(
      (_blockId: string) => _blockId === grandParent.id,
    );
    if (!grandParentIndex) {
      /** grandParentIndex가 0이면 page의 blockList 중 맨 앞이라는 의미이므로 prev 블록이 없다. */
      return null;
    }
    /** grandParentIndex 가 0이 아니면 prevGrandParent의 마지막 후손이 prev 블록이다. */
    const prevGrandParent =
      blockMap[greatGrandParent.childIdList[grandParentIndex - 1]];
    return findLastDescendant(prevGrandParent);
  };

  return [
    {
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
      nextSibling,
      prevSibling,
      nextSiblings,
      prevSiblings,
    },
    {
      getNextBlock,
      getPrevBlock,
      setBlockMap,
    },
  ];
};

export default useFamily;
