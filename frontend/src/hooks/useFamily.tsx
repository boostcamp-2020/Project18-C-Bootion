import { useRecoilValue } from 'recoil';
import { blockState, pageState } from '@/stores';
import { Block, Page, BlockType, BlockFamily } from '@/schemes';

interface FamilyFunc {
  getNextBlock: () => Block | null;
}
const useFamily = (blockId: string): [BlockFamily, FamilyFunc] => {
  const block: Block = useRecoilValue(blockState(blockId));
  const page: Page = useRecoilValue(pageState(block?.pageId));
  const parent: Block = useRecoilValue(blockState(block?.parentBlockId));
  const grandParent: Block = useRecoilValue(blockState(parent?.parentBlockId));
  const children = block?.children;
  const siblings = parent?.children || page?.blockList;
  const parents = grandParent?.children || (parent && page?.blockList);
  const blockIndex = (parent?.children || page.blockList).findIndex(
    (_block) => _block.id === block?.id,
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
    },
  ];
};

export default useFamily;
