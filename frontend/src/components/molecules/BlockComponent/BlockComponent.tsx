/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';
import { useRef, useState, useEffect, FormEvent } from 'react';

import { useBlockConversion } from '@/hooks';
import { BlockHandler, HoverArea } from '@components/molecules';
import { Block, BlockType } from '@/schemes';
import { blockState, focusState, hoverState } from '@stores/page';
import { useRecoilState } from 'recoil';

const isGridOrColumn = (block: Block): boolean =>
  block.type === BlockType.GRID || block.type === BlockType.COLUMN;

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
const descendantsCss = (block: Block): SerializedStyles => css`
  display: flex;
  padding-left: ${!isGridOrColumn(block) ? '1.5rem' : 0};
  flex-direction: ${block.type !== BlockType.GRID ? 'column' : 'row'};
  color: inherit;
  fill: inherit;
`;

function BlockComponent({ blockDTO }: { blockDTO: Block }): JSX.Element {
  const [block, setBlock] = useRecoilState(blockState(blockDTO.id));
  const [focusId, setFocusId] = useRecoilState(focusState);
  const [hoverId, setHoverId] = useRecoilState(hoverState);
  const blockRef = useRef(null);
  const contentComponent = useBlockConversion(block ?? blockDTO);

  useEffect(() => {
    setBlock(blockDTO);
    return () => {
      setBlock(null);
    };
  }, []);

  useEffect(() => {
    if (focusId === block.id) {
      blockRef.current.focus();
    }
  }, []);

  return (
    <div css={blockCss()}>
      <div
        css={{ position: 'relative' }}
        onMouseEnter={() => setHoverId(block.id)}
        onMouseLeave={() => setHoverId(null)}
      >
        {contentComponent}
        <HoverArea />
        {hoverId === block.id && <BlockHandler />}
      </div>

      {block.children.length ? (
        <div css={descendantsCss(block)}>
          {block.children.map((_block: Block) => (
            <BlockComponent key={_block.id} blockDTO={_block} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BlockComponent;
