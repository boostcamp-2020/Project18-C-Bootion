import { useRecoilState, useRecoilValue } from 'recoil';
import { focusState } from '@/stores';
import { useFamily } from '@/hooks';
import { Block } from '@/schemes';
import { blockRefState } from '@/stores/dist/page';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [, familyFunc] = useFamily(focusId);
  const blockRef: any = useRecoilValue(blockRefState);

  const Dispatcher = (key: String) => {
    const sel = window.getSelection();
    const range = document.createRange();
    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        const prevBlock: Block = familyFunc.getPrevBlock();
        if (prevBlock) {
          const ref = blockRef[prevBlock.id].current;
          const { focusOffset } = window.getSelection();
          ref.focus();
          const { focusNode } = window.getSelection();
          const { length } = ref.innerText;
          setFocusId(prevBlock.id);
          if (key === 'ArrowLeft') {
            range.setStart(focusNode ?? ref, length);
          } else if (focusOffset > length) {
            range.setStart(focusNode ?? ref, length);
          } else range.setStart(focusNode ?? ref, focusOffset);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        const nextBlock: Block = familyFunc.getNextBlock();
        if (nextBlock) {
          const ref = blockRef[nextBlock.id].current;
          const { focusOffset } = window.getSelection();
          ref.focus();
          const { focusNode } = window.getSelection();
          const { length } = ref.innerText;
          setFocusId(nextBlock.id);
          if (key === 'ArrowRight') {
            range.setStart(focusNode ?? ref, 0);
          } else if (focusOffset > length) {
            range.setStart(focusNode ?? ref, length);
          } else range.setStart(focusNode ?? ref, focusOffset);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        break;
      }
    }
  };
  return [Dispatcher];
};

export default useCommand;
