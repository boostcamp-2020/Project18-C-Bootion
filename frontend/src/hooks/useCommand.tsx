import { useRecoilState, useRecoilValue } from 'recoil';
import { focusState, blockRefState } from '@/stores';
import { useManager } from '@/hooks';
import { Block } from '@/schemes';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [, familyFunc] = useManager(focusId);
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

  const getSlicedValueToCaretOffset = () => {
    const { focusNode, focusOffset } = window.getSelection();
    return [
      focusNode.textContent.slice(0, focusOffset),
      focusNode.textContent.slice(focusOffset, Infinity),
    ];
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
        const [before, after] = getSlicedValueToCaretOffset();
        familyFunc.setBlockValue(before);
        setFocus(familyFunc.makeNewBlock({ value: after }));
        break;
      }
    }
  };
  return [dispatcher];
};

export default useCommand;
