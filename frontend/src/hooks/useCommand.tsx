import { useRecoilState } from 'recoil';
import { focusState, blockRefState } from '@/stores';
import { useManager } from '@/hooks';
import { Block, BlockType } from '@/schemes';

const useCommand = () => {
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [
    { block, blockIndex },
    {
      getPrevBlock,
      getNextBlock,
      addChild,
      addSibling,
      setBlock,
      startTransaction,
      commitTransaction,
    },
  ] = useManager(focusId);

  const setFocus = (targetBlock: Block) => {
    if (!targetBlock) {
      return null;
    }
    const beforeOffset = window.getSelection().focusOffset;
    setFocusId(targetBlock.id);
    const targetRef = blockRefState[targetBlock.id];
    targetRef
      ? targetRef.current.focus()
      : blockRefState[block.id].current.blur();
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
        const beforeCaretOffset = setFocus(getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowLeft': {
        const beforeCaretOffset = setFocus(getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(Infinity);
        break;
      }
      case 'ArrowDown': {
        const beforeCaretOffset = setFocus(getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset);
        break;
      }
      case 'ArrowRight': {
        const beforeCaretOffset = setFocus(getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(0);
        break;
      }
      case 'Enter': {
        const [before, after] = getSlicedValueToCaretOffset();
        const { focusOffset } = window.getSelection();
        startTransaction();
        if (!focusOffset) {
          addSibling({}, blockIndex);
        } else if (block.childIdList.length) {
          setBlock({ value: before });
          const newBlock = addChild({ value: after });
          setFocus(newBlock);
        } else {
          const type = [
            BlockType.NUMBERED_LIST,
            BlockType.BULLETED_LIST,
          ].includes(block.type)
            ? block.type
            : BlockType.TEXT;
          setBlock({ value: before });
          const newBlock = addSibling({ value: after, type });
          setFocus(newBlock);
        }
        commitTransaction();
        break;
      }
    }
  };
  return [dispatcher];
};

export default useCommand;
