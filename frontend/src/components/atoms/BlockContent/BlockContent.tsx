/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useEffect, useRef, FormEvent, KeyboardEvent, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { blockState, blockRefState, throttleState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listComponent,
} from '@utils/blockContent';
import { useCommand } from '@/hooks';
import { focusState } from '@/stores/page';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

const blockContentCSS = css`
  display: flex;
  align-items: center;
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
  const focusId = useRecoilValue(focusState);
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const [caret, setCaret] = useState<number>();
  const setBlockRef = useSetRecoilState(blockRefState);
  const renderBlock: Block = block ?? blockDTO;
  const [Dispatcher] = useCommand();

  const handleBlock = (value: string, type?: string) =>
    type
      ? setBlock({ ...renderBlock, value, type })
      : setBlock({ ...renderBlock, value });

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    const content = event.currentTarget.textContent;
    const newType = Object.entries(regex).find((testRegex) =>
      testRegex[1].test(content),
    );

    if (newType) {
      handleBlock(
        content.slice(content.indexOf(' ') + 1, content.length),
        newType[0],
      );
      setCaret(0);
      return;
    }
    handleBlock(content);
    const selection = window.getSelection();
    setCaret(selection.focusOffset);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const content = event.currentTarget.textContent;
    if (
      event.key === 'Backspace' &&
      (!renderBlock.value || !window.getSelection().focusOffset)
    ) {
      handleBlock(content, BlockType.TEXT);
    }

    if (event.key === 'Enter' && event.shiftKey) {
      handleBlock(content);
      setCaret(window.getSelection().focusOffset);
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

  useEffect(() => {
    setBlockRef((data: any) => ({
      ...data,
      [renderBlock.id]: contentEditableRef,
    }));
    return () => {
      setBlockRef((data: any) => ({
        ...data,
        [renderBlock.id]: null,
      }));
    };
  }, []);

  useEffect(() => {
    if (focusId === renderBlock.id) contentEditableRef.current.focus();
  }, [focusId]);

  useEffect(() => {
    const selection = window.getSelection();
    if (caret > renderBlock.value.length) {
      selection.collapse(selection.focusNode, renderBlock.value.length);
      return;
    }
    selection.collapse(selection.focusNode, caret);
  }, [renderBlock.value]);

  return (
    <div css={blockContentCSS}>
      {listComponent[renderBlock.type]}
      <div
        ref={contentEditableRef}
        css={editableDivCSS(renderBlock)}
        contentEditable
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        placeholder={placeHolder[renderBlock.type]}
        onInput={handleValue}
        onKeyUp={handleKeyUp}
      >
        {renderBlock.value}
      </div>
    </div>
  );
}

export default BlockContent;
