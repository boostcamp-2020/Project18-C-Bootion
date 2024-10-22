/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import {
  blockRefState,
  throttleState,
  modalState,
  draggingBlockState,
} from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  validateType,
  fontSize,
  placeHolder,
  listBlockType,
} from '@utils/blockContent';
import { useCommand, useManager } from '@/hooks';
import { focusState } from '@/stores/page';
import { moveBlock } from '@/utils';

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
  const [modal, setModal] = useRecoilState(modalState);
  const focusId = useRecoilValue(focusState);
  const listCnt = useRef(1);
  const [Dispatcher] = useCommand();
  const [{ blockIndex, prevSiblings }, { setBlock, deleteBlock }] = useManager(
    blockDTO.id,
  );
  const [draggingBlock, setDraggingBlock] = useRecoilState(draggingBlockState);
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

  const upperBlocks: Array<Block> = prevSiblings?.reverse();

  const isUpperBlockEqualToNumberList = (): boolean => {
    if (upperBlocks.length) {
      return upperBlocks[0].type === BlockType.NUMBERED_LIST;
    }
    return false;
  };

  const cntOfUpperNumberListBlock = (): number => {
    let cnt = 0;
    if (upperBlocks) {
      for (const upperblock of upperBlocks) {
        if (upperblock.type !== BlockType.NUMBERED_LIST) break;
        cnt += 1;
      }
    }
    return cnt;
  };

  const FIRST_LIST_NUMBER = '1';

  const handleBlock = async (
    value: string,
    type?: BlockType,
    caretOffset = -1,
  ) => {
    await setBlock(blockDTO.id, { value, type: type || blockDTO.type });
  };

  const handleValue = async () => {
    const content = contentEditableRef.current?.textContent ?? '';
    if (blockDTO.value !== content) {
      await handleBlock(content);
    }
    onBlurHandler();
  };
  const updateValue = handleValue;

  const handleKeyDown = async (event: KeyboardEvent<HTMLDivElement>) => {
    const { focusNode, focusOffset, anchorOffset } = window.getSelection();
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
      (event.key === 'Backspace' &&
        !focusOffset &&
        focusOffset === anchorOffset)
    ) {
      throttleState.isThrottle = true;
      event.preventDefault();
      setImmediate(async () => {
        await Dispatcher((event.shiftKey ? 'shift' : '') + event.key);
        throttleState.isThrottle = false;
      });
    } else if (event.key === 'Enter' && event.shiftKey) {
      const { textContent } = contentEditableRef.current;
      const caretOffset = window.getSelection().focusOffset;
      const cvTextContent = textContent
        .slice(0, caretOffset)
        .concat('\n', textContent.slice(caretOffset));
      handleBlock(cvTextContent, null, caretOffset + 1);
    } else if (event.key === ' ') {
      const { focusOffset: caretOffset } = window.getSelection();
      const beforeContent = (contentEditableRef.current?.textContent ??
        '') as string;
      const content = beforeContent
        .slice(0, caretOffset)
        .concat(' ', beforeContent.slice(caretOffset));

      const newType = validateType(content.split(' ', 1)[0]);
      if (newType) {
        event.preventDefault();
        if (newType === BlockType.NUMBERED_LIST) {
          const frontContent = content
            .split(' ', 1)[0]
            .slice(0, content.length - 2);
          if (!blockIndex && frontContent !== FIRST_LIST_NUMBER) {
            return;
          }
          if (blockIndex) {
            const numberListUpperBlock = isUpperBlockEqualToNumberList();
            if (!numberListUpperBlock && frontContent !== FIRST_LIST_NUMBER) {
              return;
            }
            if (
              numberListUpperBlock &&
              cntOfUpperNumberListBlock() + 1 !== +frontContent
            ) {
              return;
            }
          }
        }
        const slicedContent = content.slice(
          content.indexOf(' ') + 1,
          content.length,
        );
        contentEditableRef.current.innerText = slicedContent;
        await handleBlock(slicedContent, newType);
      }
    } else if (event.key === '/') {
      const nowLetterIdx = window.getSelection().focusOffset;
      setTimeout(() => {
        const rect = window.getSelection().getRangeAt(0).getClientRects()[0];
        setModal({
          isOpen: true,
          top: rect.top,
          left: rect.left,
          caretOffset: nowLetterIdx,
          blockId: blockDTO.id,
        });
      });
    } else if (modal.isOpen) {
      setModal({ ...modal, isOpen: false });
    }
  };

  if (
    (blockDTO.type === BlockType.GRID || blockDTO.type === BlockType.COLUMN) &&
    !blockDTO.childIdList.length
  ) {
    setImmediate(async () => {
      await deleteBlock();
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
    await setBlock(block.id, block);
    fromBlock && (await setBlock(fromBlock.id, fromBlock));
    await setBlock(to.id, to);
    setDraggingBlock(null);
    event.preventDefault();
  };

  const onBlurHandler = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
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
        spellCheck={false}
        placeholder={placeHolder[blockDTO.type]}
        onBlur={updateValue}
      >
        {blockDTO.value}
      </div>
      {dragOverToggle && <div css={dragOverCss()} />}
    </div>
  );
}

export default BlockContent;
