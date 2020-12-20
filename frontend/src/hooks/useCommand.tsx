import { useRecoilState } from 'recoil';
import { focusState } from '@/stores';
import { useManager } from '@/hooks';
import { BlockType } from '@/schemes';

const useCommand = () => {
  const [focusId] = useRecoilState(focusState);
  const [
    { block, blockIndex, siblingsIdList, grandParent, childrenIdList },
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

  const dispatcher = async (key: String) => {
    switch (key) {
      case 'ArrowUp': {
        const beforeCaretOffset = setFocus(getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset, false);
        break;
      }
      case 'ArrowLeft': {
        const beforeCaretOffset = setFocus(getPrevBlock());
        beforeCaretOffset !== null && setCaretOffset(Infinity, false);
        break;
      }
      case 'ArrowDown': {
        const beforeCaretOffset = setFocus(getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(beforeCaretOffset, false);
        break;
      }
      case 'ArrowRight': {
        const beforeCaretOffset = setFocus(getNextBlock());
        beforeCaretOffset !== null && setCaretOffset(0, false);
        break;
      }
      case 'Enter': {
        const [before, after] = getSlicedValueToCaretOffset();
        const { focusOffset } = window.getSelection();
        startTransaction();
        if (!focusOffset) {
          await insertNewSibling({}, blockIndex);
        } else if (block.childIdList.length) {
          await setBlock(block.id, { value: before });
          const newBlock = await insertNewChild({ value: after });
          await setFocus(newBlock);
        } else {
          const type = [
            BlockType.NUMBERED_LIST,
            BlockType.BULLETED_LIST,
          ].includes(block.type)
            ? block.type
            : BlockType.TEXT;
          await setBlock(block.id, { value: before });
          const newBlock = await insertNewSibling({ value: after, type });
          setFocus(newBlock);
        }
        commitTransaction();
        break;
      }
      case 'Tab': {
        startTransaction();
        await pullIn();
        commitTransaction();
        break;
      }
      case 'shiftTab': {
        startTransaction();
        await pullOut();
        commitTransaction();
        break;
      }
      case 'Backspace': {
        startTransaction();
        if (block.type !== BlockType.TEXT) {
          await setBlock(block.id, { type: BlockType.TEXT });
        } else if (
          siblingsIdList.length - 1 === blockIndex &&
          grandParent &&
          grandParent.type !== BlockType.GRID
        ) {
          await pullOut();
        } else {
          const [, after] = getSlicedValueToCaretOffset();
          const prevBlock = getPrevBlock();
          if (prevBlock) {
            await Promise.all(
              childrenIdList.map((id, index) => insertSibling(id, index)),
            );
            await deleteBlock();
            if (prevBlock.value + after !== '') {
              setFocus(
                await setBlock(prevBlock.id, {
                  value: prevBlock.value + after,
                }),
              );
            } else {
              setFocus(prevBlock);
            }
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
