import { useRecoilValue } from 'recoil';
import { blockState, pageState } from '@/stores';
import { Block, Page, BlockFamily } from '@/schemes';

const useFamily = (blockId: string): [BlockFamily] => {
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
  ];
};

export default useFamily;
