/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { blockState, blockRefState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listComponent,
} from '@utils/blockContent';
import { useCommand } from '@/hooks';
import { focusState } from '@/stores/dist/page';

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
  const setBlockRef = useSetRecoilState(blockRefState);
  const renderBlock: Block = block ?? blockDTO;
  const [Dispatcher] = useCommand();
  const handleKeyDown = (ev: any) => {
    const { focusNode, focusOffset } = window.getSelection();
    if (
      ev.key === 'ArrowUp' ||
      ev.key === 'ArrowDown' ||
      (ev.key === 'ArrowLeft' && focusOffset === 0) ||
      (ev.key === 'ArrowRight' &&
        focusOffset ===
          ((focusNode as any).length ?? (focusNode as any).innerText.length)) ||
      (ev.key === 'Enter' && !ev.shiftKey)
    ) {
      ev.preventDefault();
      Dispatcher(ev.key);
    }
  };

  useEffect(() => {
    const newType = Object.entries(regex).find((testRegex) =>
      testRegex[1].test(renderBlock.value),
    );
    if (newType) {
      setBlock({
        ...renderBlock,
        type: newType[0],
        value: '',
      });
    }
  }, [renderBlock.value]);

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

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    setBlock({
      ...block,
      value: event.currentTarget.textContent,
    });
  };

  const handleBackSpace = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && !renderBlock.value) {
      setBlock({
        ...renderBlock,
        type: BlockType.TEXT,
      });
    }
  };

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
        onKeyUp={handleBackSpace}
      >
        {renderBlock.value}
      </div>
    </div>
  );
}

export default BlockContent;
