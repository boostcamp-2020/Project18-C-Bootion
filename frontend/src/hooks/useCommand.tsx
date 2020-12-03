import { useRecoilState } from 'recoil';
import { focusState } from '@/stores';
import { useFamily } from '@/hooks';
import { Block } from '@/schemes';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [, familyFunc] = useFamily(focusId);

  const Dispatcher = (key: String) => {
    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        const prevBlock: Block = familyFunc.getPrevBlock();
        if (prevBlock) setFocusId(prevBlock.id);
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        const nextBlock: Block = familyFunc.getNextBlock();
        if (nextBlock) setFocusId(nextBlock.id);
        break;
      }
    }
  };
  return [Dispatcher];
};

export default useCommand;
