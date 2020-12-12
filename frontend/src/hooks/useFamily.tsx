/* eslint-disable @typescript-eslint/indent */
import { useRecoilState } from 'recoil';
import { pageState, blockMapState } from '@/stores';
import {
  Block,
  BlockType,
  BlockFamily,
  FamilyFunc,
  IdType,
  Page,
} from '@/schemes';
import { useBlock } from '@/hooks';

const useFamily = (blockId: string): [BlockFamily, FamilyFunc] => {
  const [blockMap, setBlockMap] = useRecoilState(blockMapState);
  const [block, setBlock] = useBlock(blockId);
  const [page, setPage] = useRecoilState(pageState);
  const [parent, setParent] = useBlock(block?.parentBlockId);
  const [grandParent, setGrandParent] = useBlock(parent?.parentBlockId);

  const getChildren = (childrenIdList: IdType[] | null) =>
    childrenIdList?.map((childId: string) => blockMap[childId]);

  const children = getChildren(block?.childrenIdList);
  const siblings = getChildren(parent?.childrenIdList || page?.blockIdList);
  const parents = getChildren(
    grandParent?.childrenIdList || (parent && page.blockIdList),
  );
  const blockIndex = (parent?.childrenIdList || page.blockIdList).findIndex(
    (_blockId: string) => _blockId === block?.id,
  );
  const parentIndex = (
    grandParent?.childrenIdList || page.blockIdList
  ).findIndex((_blockId: string) => _blockId === parent?.id);

  const findLastDescendant = (targetBlock: Block) => {
    let currentBlock = targetBlock;
    while (currentBlock.childrenIdList.length) {
      currentBlock =
        blockMap[
          currentBlock.childrenIdList[currentBlock.childrenIdList.length - 1]
        ];
    }
    return currentBlock;
  };

  const getNextBlock = () => {
    if (children.length) {
      /* 자식이 있을 때 첫번째 자식이 다음 block 이다.  */
      return children[0];
    }
    if (blockIndex === siblings.length - 1) {
      /* block이 마지막 자식일 때. 다음 부모가 다음 Block 이다. */
      const targetParentBlock = parents[parentIndex + 1];
      if (targetParentBlock) {
        switch (targetParentBlock.type) {
          case BlockType.COLUMN:
            /** 다음 부모의 Type이 Column 일때 첫번째 자식이 다음 Block 이다. */
            return blockMap[targetParentBlock.childrenIdList[0]];
          case BlockType.GRID:
            /** 다음 부모의 Type이 Grid 일때 첫번째 자식(Column)의 자식이 다음 Block 이다. */
            return blockMap[
              blockMap[targetParentBlock.childrenIdList[0]].childrenIdList[0]
            ];
          default:
            /** 다음 부모의 타입이 COLUMN이나 GRID가 아니면 다음 Block 이다. */
            return targetParentBlock;
        }
      } else {
        /** 현재 블록이 마지막 블록이다. */
        return null;
      }
    } else {
      /** 자식이 없고 마지막 자식이 아니므로 다음 형제가 다음 Block 이다.  */
      return siblings[blockIndex + 1];
    }
  };

  const getPrevBlock = () => {
    if (blockIndex) {
      /** blockIndex가 0이 아니면 이전 형제에서 prev block을 찾을 수 있다. */
      const prevSibling = siblings[blockIndex - 1];
      if (prevSibling?.childrenIdList.length) {
        /* 이전 형제에게 자식이 있다면 마지막 자식이 prev block 이다.  */
        return blockMap[
          prevSibling.childrenIdList[prevSibling.childrenIdList.length - 1]
        ];
      }
      /* 이전 형제에게 자식이 없다면 형제가 prev block 이다.  */
      return prevSibling;
    }
    /* block이 첫번째 자식일 때. 부모가 이전 Block 이다. */
    if (parent) {
      switch (parent.type) {
        case BlockType.COLUMN: {
          /** 부모의 Type이 Column 이면 부모의 이전 형제의 마지막 자식이 이전 Block 이다. */
          if (parentIndex) {
            /** 부모의 index가 0이 아니면 이전 부모의 마지막 */
            const prevParentChildren = getChildren(
              parents[parentIndex - 1].childrenIdList,
            );
            return prevParentChildren[prevParentChildren.length - 1];
          }
          /** 부모의 index가 0이면 조부모에 이전 Block이 있다. */
          if (grandParent) {
            /** grandParent가 있을 경우 조부모의 마지막 자손이 이전 Block 이다. */
            if (grandParent.type === BlockType.GRID) {
              /** 조부모가 GRID 타입인 경우 조부모의 부모는 Page 이다. */
              const grandParentIndex = page.blockIdList.findIndex(
                (_blockId: string) => _blockId === grandParent.id,
              );
              if (grandParentIndex) {
                /** grandParentIndex 가 0이 아니면 prevGrandParent의 마지막 후손이 prev 블록이다. */
                const prevGrandParent =
                  blockMap[page.blockIdList[grandParentIndex - 1]];
                return findLastDescendant(prevGrandParent);
              }
              /** grandParentIndex가 0이면 page의 blockList 중 맨 앞이라는 의미이므로 prev 블록이 없다. */
              return null;
            }
            return grandParent;
          }
          /** grandParent가 없을 경우 이전 블록이 없다는 뜻이다. */
          return null;
        }
        default:
          return parent;
      }
    } else {
      /** 현재 블록이 첫 블록이다. */
      return null;
    }
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
      children,
      siblings,
      parents,
    },
    {
      getNextBlock,
      getPrevBlock,
      setBlockMap,
      setBlock,
      setParent,
      setGrandParent,
      setPage,
    },
  ];
};

export default useFamily;
