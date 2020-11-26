/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

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

interface Props {
  block: Block;
}

function BlockComponent({ block }: Props): JSX.Element {
  return (
    <div css={blockCss()}>
      <div css={contentsCss(block)} contentEditable>
        {block.value}
      </div>
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
