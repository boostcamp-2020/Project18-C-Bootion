/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { blockRefState, draggingBlockState, throttleState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listBlockType,
} from '@utils/blockContent';
import { useCommand, useManager } from '@/hooks';
import { focusState } from '@/stores/page';
import { moveBlock, debounce } from '@/utils';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

const blockContentCSS = css`
  position: relative;
  display: flex;
  align-items: stretch;
`;
const editableDivCSS = (block: Block) => css`
  margin: 5;
  font-size: ${fontSize[block.type]};
  display: ${!isGridOrColumn(block) ? 'flex' : 'none'};
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  min-height: 30px;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  color: rgb(55, 53, 47);
  fill: inherit;
  &:focus {
    outline: 1px solid transparent;
  }
  &:focus:empty:before {
    color: rgba(55, 53, 47, 0.4);
    content: attr(placeholder);
    display: block;
  }
  &:hover {
    cursor: text;
  }
`;
const dragOverCss = () => css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
  background-color: rgba(80, 188, 223, 0.7);
`;

function BlockContent(blockDTO: Block) {
  const contentEditableRef = useRef(null);
  const focusId = useRecoilValue(focusState);
  const listCnt = useRef(1);
  const [Dispatcher] = useCommand();
  const [
    { blockIndex, prevSiblings },
    {
      commitTransaction,
      startTransaction,
      setBlock,
      setCaretOffset,
      deleteBlock,
    },
  ] = useManager(blockDTO.id);
  const draggingBlock = useRecoilValue(draggingBlockState);
  const [dragOverToggle, setDragOverToggle] = useState(false);

  useEffect(() => {
    blockRefState[blockDTO.id] = contentEditableRef;
    return () => {
      blockRefState[blockDTO.id] = null;
    };
  }, []);

  useEffect(() => {
    if (focusId === blockDTO.id) contentEditableRef.current.focus();
  }, [focusId]);

  const upperBlocks: Array<Block> = prevSiblings.reverse();

  const isUpperBlockEqualToNumberList = (): boolean => {
    if (upperBlocks.length) {
      return upperBlocks[0].type === BlockType.NUMBERED_LIST;
    }
    return false;
  };

  const cntOfUpperNumberListBlock = (): number => {
    let cnt = 0;
    for (const upperblock of upperBlocks) {
      if (upperblock.type !== BlockType.NUMBERED_LIST) break;
      cnt += 1;
    }
    return cnt;
  };

  const FIRST_LIST_NUMBER = '1';

  const handleBlock = (value: string, type?: BlockType, caretOffset = -1) => {
    const { focusOffset } = window.getSelection();
    startTransaction();
    setBlock(blockDTO.id, { value, type: type || blockDTO.type });
    contentEditableRef.current.blur();
    setTimeout(() => {
      setCaretOffset(caretOffset === -1 ? focusOffset : caretOffset);
    });
    commitTransaction();
  };

  const handleValue = () => {
    const content = contentEditableRef.current.textContent;
    const newType = Object.entries(regex).find((testRegex) =>
      testRegex[1].test(content),
    );

    if (newType) {
      if (newType[0] === BlockType.NUMBERED_LIST) {
        if (!blockIndex && content[0] !== FIRST_LIST_NUMBER) return;
        if (blockIndex) {
          const numberListUpperBlock = isUpperBlockEqualToNumberList();
          if (!numberListUpperBlock && content[0] !== FIRST_LIST_NUMBER) return;
          if (
            numberListUpperBlock &&
            cntOfUpperNumberListBlock() + 1 !== +content[0]
          )
            return;
        }
      }

      handleBlock(
        content.slice(content.indexOf(' ') + 1, content.length),
        newType[0] as BlockType,
      );
      return;
    }
    handleBlock(content);
  };
  const updateValue = useRef(debounce(handleValue, 300)).current;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { focusNode, focusOffset } = window.getSelection();
    if (throttleState.isThrottle) {
      event.preventDefault();
    } else if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      (event.key === 'ArrowLeft' && !focusOffset) ||
      (event.key === 'ArrowRight' &&
        focusOffset ===
          ((focusNode as any).length ?? (focusNode as any).innerText.length)) ||
      (event.key === 'Enter' && !event.shiftKey) ||
      event.key === 'Tab' ||
      (event.key === 'Backspace' && !focusOffset)
    ) {
      throttleState.isThrottle = true;
      event.preventDefault();
      setImmediate(() => {
        Dispatcher((event.shiftKey ? 'shift' : '') + event.key);
        throttleState.isThrottle = false;
      });
    }
  };

  if (
    (blockDTO.type === BlockType.GRID || blockDTO.type === BlockType.COLUMN) &&
    !blockDTO.childIdList.length
  ) {
    setImmediate(() => {
      startTransaction();
      deleteBlock();
      commitTransaction();
    });
  }

  useEffect(() => {
    blockRefState[blockDTO.id] = contentEditableRef;
    return () => {
      blockRefState[blockDTO.id] = null;
    };
  }, []);

  useEffect(() => {
    if (focusId === blockDTO.id) {
      contentEditableRef.current.focus();
    }
  }, [focusId]);

  useEffect(() => {
    if (blockDTO.type === BlockType.NUMBERED_LIST) {
      const numberListUpperBlock = isUpperBlockEqualToNumberList();
      if (!blockIndex || !numberListUpperBlock) {
        listCnt.current = 1;
        return;
      }
      if (numberListUpperBlock) {
        listCnt.current = cntOfUpperNumberListBlock() + 1;
      }
    }
  }, [blockDTO.type]);

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  };

  const dropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    setDragOverToggle(false);
    event.dataTransfer.dropEffect = 'move';

    const blockId = draggingBlock?.id;
    if (!blockId || blockId === blockDTO.id) {
      return;
    }

    const { block, from: fromBlock, to } = await moveBlock({
      blockId,
      toId: blockDTO.parentId,
      index: blockIndex + 1,
    });
    startTransaction();
    setBlock(block.id, block);
    fromBlock && setBlock(fromBlock.id, fromBlock);
    setBlock(to.id, to);
    commitTransaction();
    event.preventDefault();
  };

  return (
    <div
      css={blockContentCSS}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      onDragEnter={() => setDragOverToggle(true)}
      onDragLeave={() => setDragOverToggle(false)}
    >
      {listBlockType(blockDTO, listCnt.current)}
      <div
        ref={contentEditableRef}
        css={editableDivCSS(blockDTO)}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        placeholder={placeHolder[blockDTO.type]}
        onInput={updateValue}
      >
        {blockDTO.value}
      </div>
      {dragOverToggle && <div css={dragOverCss()} />}
    </div>
  );
}

export default BlockContent;
