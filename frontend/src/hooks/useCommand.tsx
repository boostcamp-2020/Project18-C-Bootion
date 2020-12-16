import { useRecoilState } from 'recoil';
import { focusState } from '@/stores';
import { useManager } from '@/hooks';
import { BlockType } from '@/schemes';

const useCommand = () => {
  const [focusId] = useRecoilState(focusState);
  const [
    { block, blockIndex, siblingsIdList, grandParent },
    {
      getPrevBlock,
      getNextBlock,
      insertSibling,
      insertNewChild,
      insertNewSibling,
      setBlock,
      pullIn,
      pullOut,
      startTransaction,
      commitTransaction,
      deleteBlock,
      setFocus,
      setCaretOffset,
    },
  ] = useManager(focusId);

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
          insertNewSibling({}, blockIndex);
        } else if (block.childIdList.length) {
          setBlock(block.id, { value: before });
          const newBlock = insertNewChild({ value: after });
          setFocus(newBlock);
        } else {
          const type = [
            BlockType.NUMBERED_LIST,
            BlockType.BULLETED_LIST,
            BlockType.TOGGLE_LIST,
          ].includes(block.type)
            ? block.type
            : BlockType.TEXT;
          setBlock(block.id, { value: before });
          const newBlock = insertNewSibling({ value: after, type });
          setFocus(newBlock);
        }
        commitTransaction();
        break;
      }
      case 'Tab': {
        startTransaction();
        pullIn();
        commitTransaction();
        break;
      }
      case 'shiftTab': {
        startTransaction();
        pullOut();
        commitTransaction();
        break;
      }
      case 'Backspace': {
        startTransaction();
        if (block.type !== BlockType.TEXT) {
          setBlock(block.id, { type: BlockType.TEXT });
        } else if (
          siblingsIdList.length - 1 === blockIndex &&
          grandParent &&
          grandParent.type !== BlockType.GRID
        ) {
          pullOut();
        } else {
          const [, after] = getSlicedValueToCaretOffset();
          const prevBlock = getPrevBlock();
          if (prevBlock) {
            const deletedBlockChildrenIdList = deleteBlock();
            deletedBlockChildrenIdList.forEach((id, index) =>
              insertSibling(id, index),
            );
            setFocus(
              setBlock(prevBlock.id, { value: prevBlock.value + after }),
            );
            setCaretOffset(prevBlock.value.length);
          }
        }
        commitTransaction();
        break;
      }
    }
  };
  return [dispatcher];
};

export default useCommand;
