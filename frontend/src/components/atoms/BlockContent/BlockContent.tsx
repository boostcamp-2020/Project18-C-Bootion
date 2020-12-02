/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useRef, useEffect, useState, FormEvent, KeyboardEvent } from 'react';
import { useRecoilState } from 'recoil';

import { blockState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import { regex } from '@utils/regex';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

const FontSize: { [key: string]: any } = {
  heading1: 'xx-large',
  heading2: 'x-large',
  heading3: 'large',
};

const contentsCss = (block: Block): SerializedStyles => css`
  margin: 5;
  font-size: ${FontSize[block.type]};

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
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const renderBlock = block ?? blockDTO;

  // useValidation처럼 customHook으로
  useEffect(() => {
    if (regex.h1.test(renderBlock.value)) {
      setBlock({
        ...block,
        type: BlockType.HEADING1,
        value: '',
      });
    }
    if (regex.h2.test(renderBlock.value))
      setBlock({
        ...block,
        type: BlockType.HEADING2,
        value: '',
      });
    if (regex.h3.test(renderBlock.value))
      setBlock({
        ...block,
        type: BlockType.HEADING3,
        value: '',
      });
  }, [renderBlock.value]);

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    setBlock({
      ...block,
      value: event.currentTarget.textContent,
    });
  };

  const handleBackSpace = (event: KeyboardEvent<HTMLDivElement>) => {};

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      css={contentsCss(renderBlock)}
      contentEditable
      suppressContentEditableWarning
      placeholder={
        renderBlock.type === BlockType.TEXT ? "Type '/' for commands" : ''
      }
      onInput={handleValue}
      onKeyPress={handleBackSpace}
    >
      {renderBlock.value}
    </div>
  );
}

export default BlockContent;
