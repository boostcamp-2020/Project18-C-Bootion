/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useRef, useState, FormEvent } from 'react';

import { Heading } from '@components/atoms';
import { BlockHandler, HoverArea } from '@components/molecules';
import { Block, BlockType } from '@/schemes';
import { hoverState } from '@stores/page';
import { useRecoilState } from 'recoil';

const isGridOrColumn = (block: Block): boolean =>
  block?.type === BlockType.GRID || block?.type === BlockType.COLUMN;

const blockCss = (): SerializedStyles => css`
  width: 100%;
  max-width: 1000px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 16px;
  line-height: 1.5;
  color: inherit;
  fill: inherit;
`;
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
const descendantsCss = (block: Block): SerializedStyles => css`
  display: flex;
  padding-left: ${!isGridOrColumn(block) ? '1.5rem' : 0};
  flex-direction: ${block.type !== BlockType.GRID ? 'column' : 'row'};
  color: inherit;
  fill: inherit;
`;

const regex = {
  h1: /^#\s[^\s.]*/gm,
  h2: /^##\s[^\s.]*/gm,
  h3: /^###\s[^\s.]*/gm,
};

const ConvertBlock = (
  type: string,
  handleValue: any,
  content: any,
  block: Block,
): JSX.Element => {
  const compoProps = {
    handleValue,
    content,
  };
  if (type === 'Heading1') return <Heading.Heading1 {...compoProps} />;
  if (type === 'Heading2') return <Heading.Heading2 {...compoProps} />;
  if (type === 'Heading3') return <Heading.Heading3 {...compoProps} />;
  return (
    <div
      css={contentsCss(block)}
      contentEditable
      suppressContentEditableWarning
      placeholder="Type '/' for commands"
      onInput={handleValue}
    >
      {content.current}
    </div>
  );
};

interface Props {
  block: Block;
}

function BlockComponent({ block }: Props): JSX.Element {
  const content = useRef(block?.value);
  const [hoverId, setHoverId] = useRecoilState(hoverState);
  const [type, setType] = useState('');
  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    content.current = event.currentTarget.textContent || '';
    if (regex.h1.test(content.current)) setType('Heading1');
    if (regex.h2.test(content.current)) setType('Heading2');
    if (regex.h3.test(content.current)) setType('Heading3');
  };
  return (
    <div css={blockCss()}>
      <div
        css={{ position: 'relative' }}
        onMouseEnter={() => setHoverId(block?.id)}
        onMouseLeave={() => setHoverId(null)}
      >
        {ConvertBlock(type, handleValue, content, block)}
        <HoverArea />
        {hoverId === block?.id && <BlockHandler />}
      </div>

      {block?.children?.length ? (
        <div css={descendantsCss(block)}>
          {block.children.map((_block: Block) => (
            <BlockComponent key={block?.id} block={_block} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BlockComponent;
