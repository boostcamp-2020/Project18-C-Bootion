/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import React, {
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  blockRefState,
  throttleState,
  blockMapState,
  modalState,
  draggingBlockState,
} from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listBlockType,
} from '@utils/blockContent';
import { useCommand, useManager } from '@/hooks';
import { focusState } from '@/stores/page';
import { moveBlock, updateBlock } from '@/utils';

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
  const [blockMap, setBlockMap] = useRecoilState(blockMapState);
  const [modal, setModal] = useRecoilState(modalState);
  const [, { startTransaction, commitTransaction, deleteBlock }] = useManager(
    blockDTO.id,
  );
  const focusId = useRecoilValue(focusState);
  const caretRef = useRef(0);
  const listCnt = useRef(1);
  const [Dispatcher] = useCommand();
  const [isBlur, setIsBlur] = useState(false);
  const draggingBlock = useRecoilValue(draggingBlockState);
  const [{ blockIndex }] = useManager(blockDTO.id);
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

  useEffect(() => {
    const selection = window.getSelection();
    const nodeLength = selection.focusNode?.nodeValue?.length ?? 0;
    if (caretRef.current > nodeLength) {
      caretRef.current = nodeLength;
    }
    selection.collapse(selection.focusNode, caretRef.current);
  }, [blockDTO.value]);

  const indexInSibling: number = blockMap[
    blockDTO.parentId
  ].childIdList.findIndex((childId: string) => childId === blockDTO.id);

  const upperBlocks: Array<Block> = blockMap[blockDTO.parentId].childIdList
    .map((childId: any) => blockMap[childId])
    .slice(0, indexInSibling)
    .reverse();

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

  const handleBlock = (value: string, type?: BlockType) =>
    type
      ? setBlockMap({
          ...blockMap,
          [blockDTO.id]: { ...blockDTO, value, type },
        })
      : setBlockMap({
          ...blockMap,
          [blockDTO.id]: { ...blockDTO, value },
        });

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    const content = event.currentTarget.textContent;

    let nowLetterIdx = window.getSelection().focusOffset;
    if (!nowLetterIdx) nowLetterIdx += 1;
    if (content[nowLetterIdx - 1] === '/') {
      const rect = window.getSelection().getRangeAt(0).getClientRects()[0];
      setModal({
        isOpen: true,
        top: rect.top,
        left: rect.left,
        caretOffset: nowLetterIdx,
      });
      return;
    }
    setModal({ ...modal, isOpen: false });

    const newType = Object.entries(regex).find((testRegex) =>
      testRegex[1].test(content),
    );

    if (newType) {
      if (newType[0] === BlockType.NUMBERED_LIST) {
        if (!indexInSibling && content[0] !== FIRST_LIST_NUMBER) return;
        if (indexInSibling) {
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
      caretRef.current = 0;
      return;
    }
    handleBlock(content);
    const selection = window.getSelection();
    caretRef.current = selection.focusOffset;
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const content = event.currentTarget.textContent;
    if (
      event.key === 'Backspace' &&
      (!blockDTO.value || !window.getSelection().focusOffset)
    ) {
      handleBlock(content, BlockType.TEXT);
    }

    if (event.key === 'Enter' && event.shiftKey) {
      handleBlock(content);
      caretRef.current = window.getSelection().focusOffset;
    }
  };

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
    (async () => {
      const { block: updatedBlock } = await updateBlock(blockDTO);
      setBlockMap({ ...blockMap, [blockDTO.id]: updatedBlock });
    })();
  }, [isBlur]);

  useEffect(() => {
    blockRefState[blockDTO.id] = contentEditableRef;
    return () => {
      blockRefState[blockDTO.id] = null;
    };
  }, []);

  useEffect(() => {
    if (focusId === blockDTO.id) contentEditableRef.current.focus();
  }, [focusId]);

  useEffect(() => {
    const selection = window.getSelection();
    const nodeLength = selection.focusNode?.nodeValue?.length ?? 0;
    if (caretRef.current > nodeLength) {
      caretRef.current = nodeLength;
    }
    selection.collapse(selection.focusNode, caretRef.current);

    if (blockDTO.type === BlockType.NUMBERED_LIST) {
      const numberListUpperBlock = isUpperBlockEqualToNumberList();
      if (!indexInSibling || !numberListUpperBlock) {
        listCnt.current = 1;
        return;
      }
      if (numberListUpperBlock) {
        listCnt.current = cntOfUpperNumberListBlock() + 1;
      }
    }
  }, [blockDTO.value]);

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
    setBlockMap((prev) => {
      const next = { ...prev };
      next[block.id] = block;
      fromBlock && (next[fromBlock.id] = fromBlock);
      next[to.id] = to;
      return next;
    });

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
        onInput={handleValue}
        onKeyUp={handleKeyUp}
        onBlur={() => setIsBlur(!isBlur)}
      >
        {blockDTO.value}
      </div>
      {dragOverToggle && <div css={dragOverCss()} />}
    </div>
  );
}

export default BlockContent;
