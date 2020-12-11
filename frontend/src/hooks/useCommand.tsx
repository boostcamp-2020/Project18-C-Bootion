import { useRecoilState, useRecoilValue } from 'recoil';
import { focusState, blockRefState } from '@/stores';
import { useManager } from '@/hooks';
import { Block, BlockType } from '@/schemes';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [{ block, blockIndex }, managerFunc] = useManager(focusId);
  const blockRef = useRecoilValue(blockRefState);

  const setFocus = (targetBlock: Block) => {
    if (!targetBlock) {
      return null;
    }
    const beforeOffset = window.getSelection().focusOffset;
    setFocusId(targetBlock.id);
    const targetRef = blockRef[targetBlock.id];
    targetRef ? targetRef.current.focus() : blockRef[block.id].current.blur();
    return beforeOffset;
  };

  const setCaretOffset = (offset: number) => {
    const sel = window.getSelection();
    const { focusNode: node } = sel;
    const { length } = node as any;
    !(node instanceof HTMLElement) &&
      sel.collapse(node, offset > length ? length : offset);
  };

  const getSlicedValueToCaretOffset = () => {
    const { focusNode, anchorOffset, focusOffset } = window.getSelection();
    return [
      focusNode.textContent.slice(0, anchorOffset),
      focusNode.textContent.slice(focusOffset, Infinity),
    ];
  };

  const dispatcher = (key: String) => {
    switch (key) {
      case 'ArrowUp': {
        const beforeCaretOffset = setFocus(managerFunc.getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowLeft': {
        const beforeCaretOffset = setFocus(managerFunc.getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(Infinity);
        break;
      }
      case 'ArrowDown': {
        const beforeCaretOffset = setFocus(managerFunc.getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowRight': {
        const beforeCaretOffset = setFocus(managerFunc.getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(0);
        break;
      }
      case 'Enter': {
        const [before, after] = getSlicedValueToCaretOffset();
        const { focusOffset } = window.getSelection();
        if (!focusOffset) {
          managerFunc.addSibling({}, {}, BlockType.TEXT, blockIndex);
        } else if (block?.children.length) {
          setFocus(
            managerFunc.addChild(
              { value: before },
              { value: after },
              block.type,
            ),
          );
        } else {
          const type = [
            BlockType.NUMBEREDLIST,
            BlockType.BULLETEDLIST,
          ].includes(block.type)
            ? block.type
            : BlockType.TEXT;
          setFocus(
            managerFunc.addSibling({ value: before }, { value: after }, type),
          );
        }
        break;
      }
    }
  };
  return [dispatcher];
};

export default useCommand;
