/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  blockMapState,
  blockRefState,
  draggingBlockState,
  throttleState,
} from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listComponent,
} from '@utils/blockContent';
import { useCommand, useManager } from '@/hooks';
import { focusState } from '@/stores/page';
import { moveBlock } from '@/utils';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

const blockContentCSS = css`
  display: flex;
  align-items: stretch;
`;
const editableDivCSS = (block: Block): SerializedStyles => css`
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

function BlockContent(blockDTO: Block) {
  const contentEditableRef = useRef(null);
  const [blockMap, setBlockMap] = useRecoilState(blockMapState);
  const focusId = useRecoilValue(focusState);
  const caretRef = useRef(0);
  const [Dispatcher] = useCommand();
  const draggingBlock = useRecoilValue(draggingBlockState);
  const [{ blockIndex }] = useManager(blockDTO.id);

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
    const newType = Object.entries(regex).find((testRegex) =>
      testRegex[1].test(content),
    );

    if (newType) {
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
      (event.key === 'Enter' && !event.shiftKey)
    ) {
      throttleState.isThrottle = true;
      event.preventDefault();
      setImmediate(() => {
        Dispatcher(event.key);
        throttleState.isThrottle = false;
      });
    }
  };

  const dropDraggingBlockHandler = async () => {
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
  };

  return (
    <div css={blockContentCSS} onMouseUp={dropDraggingBlockHandler}>
      {listComponent[blockDTO.type]}
      <div
        ref={contentEditableRef}
        css={editableDivCSS(blockDTO)}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        placeholder={placeHolder[blockDTO.type]}
        onInput={handleValue}
        onKeyUp={handleKeyUp}
      >
        {blockDTO.value}
      </div>
    </div>
  );
}

export default BlockContent;
