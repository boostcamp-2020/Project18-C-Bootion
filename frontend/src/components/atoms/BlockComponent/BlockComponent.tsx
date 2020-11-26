/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useState, useRef, FormEvent } from 'react';

import { Block, BlockType } from '../../../schemes';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

const blockCss = (): SerializedStyles => css`
  position: relative;
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
  width: 100%;
  padding-left: 2px;
  color: inherit;
  fill: inherit;
`;
const descendantsCss = (block: Block): SerializedStyles => css`
  display: flex;
  padding-left: ${!isGridOrColumn(block) ? '1.5rem' : 0};
  flex-direction: ${block.type !== BlockType.GRID ? 'column' : 'row'};
  color: inherit;
  fill: inherit;
`;

const regex = {
  'h1': /^#\s[^\s.]*/gm,
  'h2': /^##\s[^\s.]*/gm,
  'h3': /^###\s[^\s.]*/gm,
};

interface Props {
  block: Block;
}

const ConvertBlock = (type: string, handleValue: any, content: any, block: Block): JSX.Element  => {
  const compoProps = {
    handleValue,
    content,
    block,
  };
  // if (type === 'Heading1') return <Heading1 {...compoProps} />;
  // if (type === 'Heading2') return <Heading2 {...compoProps} />;
  // if (type === 'Heading3') return <Heading3 {...compoProps} />;
  return (
    <div css={contentsCss(block)} contentEditable suppressContentEditableWarning onInput={handleValue}>
      {content.current}
    </div>
  );
};

function BlockComponent({ block }: Props): JSX.Element {
  const content = useRef(block.value);
  const [type, setType] = useState('');

  const handleValue = (event: FormEvent<HTMLDivElement>) => {
    content.current = event.currentTarget.textContent || '';
    if (regex.h1.test(content.current)) setType('Heading1');
    if (regex.h2.test(content.current)) setType('Heading2');
    if (regex.h3.test(content.current)) setType('Heading3');
  };

  return (
    <div css={blockCss()}>
      {ConvertBlock(type, handleValue, content, block)}
      {block?.children?.length && (
        <div css={descendantsCss(block)}>
          {block.children.map((_block: Block) => (
            <BlockComponent key={_block.id} block={_block} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockComponent;
