/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useEffect, FormEvent, KeyboardEvent } from 'react';
import { useRecoilState } from 'recoil';

import { blockState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import {
  regex,
  fontSize,
  placeHolder,
  listComponent,
} from '@utils/blockContent';

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
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const renderBlock: Block = block ?? blockDTO;

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
        css={editableDivCSS(renderBlock)}
        contentEditable
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
