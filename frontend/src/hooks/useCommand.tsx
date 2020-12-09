import { useRecoilState, useRecoilValue } from 'recoil';
import { focusState, blockRefState } from '@/stores';
import { useFamily } from '@/hooks';
import { Block } from '@/schemes';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [, familyFunc] = useFamily(focusId);
  const blockRef = useRecoilValue(blockRefState);

  const setFocus = (block: Block) => {
    if (!block) {
      return null;
    }
    const beforeOffset = window.getSelection().focusOffset;
    setFocusId(block.id);
    blockRef[block.id]?.current.focus();
    return beforeOffset;
  };

  const setCaretOffset = (offset: number) => {
    const sel = window.getSelection();
    const { focusNode: node } = sel;
    const { length } = node as any;
    sel.collapse(node, offset > length ? length : offset);
  };

  const dispatcher = (key: String) => {
    switch (key) {
      case 'ArrowUp': {
        const beforeCaretOffset = setFocus(familyFunc.getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowLeft': {
        const beforeCaretOffset = setFocus(familyFunc.getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(Infinity);
        break;
      }
      case 'ArrowDown': {
        const beforeCaretOffset = setFocus(familyFunc.getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowRight': {
        const beforeCaretOffset = setFocus(familyFunc.getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(0);
        break;
      }
      case 'Enter': {
        setFocus(familyFunc.makeNewBlock());
        break;
      }
    }
  };
  return [dispatcher];
};

export default useCommand;