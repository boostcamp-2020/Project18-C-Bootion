/* eslint-disable @typescript-eslint/indent */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { blockState, pageState, blockMapState } from '@/stores';
import { Block, BlockType, BlockFamily } from '@/schemes';

interface ManagerFunc {
  getNextBlock: () => Block | null;
  getPrevBlock: () => Block | null;
  makeNewBlock: () => Block | null;
}

const findLastDescendant = (targetBlock: Block) => {
  let currentBlock = targetBlock;
  while (currentBlock.children.length) {
    currentBlock = currentBlock.children[currentBlock.children.length - 1];
  }
  return currentBlock;
};

const useManger = (blockId: string): [BlockFamily, ManagerFunc] => {
  const [block, setBlock] = useRecoilState(blockState(blockId));
  const [page, setPage] = useRecoilState(pageState(block?.pageId));
  const setParent = useSetRecoilState(blockState(block?.parentBlockId));
  const parent = blockMapState[block?.parentBlockId];
  const grandParent: Block = useRecoilValue(blockState(parent?.parentBlockId));
  const children = block?.children;
  const siblings = parent?.children || page?.blockList;
  const parents = grandParent?.children || (parent && page?.blockList);
  const blockIndex = (parent?.children || page.blockList).findIndex(
    (_block: Block) => _block.id === block?.id,
  );
  const parentIndex = (grandParent?.children || page.blockList).findIndex(
    (_block) => _block.id === parent?.id,
  );
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
            return targetParentBlock.children[0];
          case BlockType.GRID:
            /** 다음 부모의 Type이 Grid 일때 첫번째 자식(Column)의 자식이 다음 Block 이다. */
            return targetParentBlock.children[0].children[0];
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
      if (prevSibling.children.length) {
        /* 이전 형제에게 자식이 있다면 마지막 자식이 prev block 이다.  */
        return prevSibling.children[prevSibling.children.length - 1];
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
            const prevParentChildren = parents[parentIndex - 1].children;
            return prevParentChildren[prevParentChildren.length - 1];
          }
          /** 부모의 index가 0이면 조부모에 이전 Block이 있다. */
          if (grandParent) {
            /** grandParent가 있을 경우 조부모의 마지막 자손이 이전 Block 이다. */
            if (grandParent.type === BlockType.GRID) {
              /** 조부모가 GRID 타입인 경우 조부모의 부모는 Page 이다. */
              const grandParentIndex = page.blockList.findIndex(
                (_block) => _block.id === grandParent.id,
              );
              if (grandParentIndex) {
                /** grandParentIndex 가 0이 아니면 prevGrandParent의 마지막 후손이 prev 블록이다. */
                const prevGrandParent = page.blockList[grandParentIndex - 1];
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
  const makeNewBlock = (blockType: BlockType = BlockType.TEXT) => {
    if (children.length) {
      const newBlock: Block = {
        id: `${block.id}${children.length + 1}_${Date.now()}`,
        type: blockType,
        value: '',
        children: [],
        parentBlockId: parent?.id ?? null,
        pageId: page.id,
      };
      const copyChildren = [...children];
      copyChildren.splice(0, 0, newBlock);
      setBlock({ ...block, children: copyChildren });
      return newBlock;
    }
    const newBlock: Block = {
      id: `${parent?.id ?? ''}${siblings.length + 1}_${Date.now()}`,
      type: blockType,
      value: '',
      children: [],
      parentBlockId: parent?.id ?? null,
      pageId: page.id,
    };
    const copySibling = [...siblings];
    copySibling.splice(blockIndex + 1, 0, newBlock);
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
    {
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
      makeNewBlock,
    },
  ];
};

export default useManger;
