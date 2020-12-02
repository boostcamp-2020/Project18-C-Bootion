/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useRef, FormEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { blockState, focusState } from '@/stores';
import { Block, BlockType } from '@/schemes';
import { regex } from '@utils/regex';

const isGridOrColumn = (block: Block): boolean =>
  block?.type === BlockType.GRID || block?.type === BlockType.COLUMN;

const contentsCss = (block: Block): SerializedStyles => css`
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

const h1 = { margin: 5, fontSize: 'xx-large' };
const h2 = { margin: 5, fontSize: 'x-large' };
const h3 = { margin: 5, fontSize: 'large' };

const useBlockConversion = (blockDTO: Block, onKeyPress: any) => {
  const contentEditableRef = useRef(null);
  const [focusId, setFocusId] = useRecoilState<string>(focusState);
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const content = useRef('block?.value');

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    if (regex.h1.test(content.current))
      setBlock({ ...block, type: BlockType.HEADING1 });
    if (regex.h2.test(content.current))
      setBlock({ ...block, type: BlockType.HEADING2 });
    if (regex.h3.test(content.current))
      setBlock({ ...block, type: BlockType.HEADING3 });
  };
  useEffect(() => {
    if (focusId === blockDTO.id) {
      contentEditableRef.current.focus();
    }
  }, [focusId]);
  return (
    <div
      ref={contentEditableRef}
      css={contentsCss(block)}
      contentEditable
      suppressContentEditableWarning
      placeholder="Type '/' for commands"
      onInput={handleValue}
    >
      {block?.value}
    </div>
  );
};

export default useBlockConversion;
