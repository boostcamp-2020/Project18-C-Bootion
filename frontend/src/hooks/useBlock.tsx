import { useRecoilState } from 'recoil';
import { Block } from '@/schemes';
import { blockMapState } from '@/stores';

const useBlock = (
  blockId: string,
): [block: Block, setBlock: (newBlock: Block) => void] => {
  const [blockMap, setBlockMap] = useRecoilState(blockMapState);
  const setBlock = (newBlock: Block) => {
    setBlockMap({ ...blockMap, [blockId]: newBlock });
  };
  return [blockMap[blockId], setBlock];
};

export default useBlock;
