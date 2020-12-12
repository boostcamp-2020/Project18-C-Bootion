/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css, SerializedStyles } from '@emotion/react';

import { BlockContent } from '@atoms/index';
import { BlockHandler, HoverArea } from '@components/molecules';
import { Block, BlockType, IdType } from '@/schemes';
import {
  hoverState,
  focusState,
  blockRefState,
  blockMapState,
} from '@stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';

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
  const blockMap = useRecoilValue(blockMapState);
  const [focusId, setFocusId] = useRecoilState<string>(focusState);
  const [hoverId, setHoverId] = useRecoilState(hoverState);
  const blockRef: any = blockRefState[blockDTO.id];

  return (
    <div css={blockCss()}>
      <div
        css={{ position: 'relative' }}
        onMouseEnter={() => setHoverId(blockDTO.id)}
        onMouseLeave={() => setHoverId(null)}
        onFocus={() => {
          if (focusId !== blockDTO.id) setFocusId(blockDTO.id);
        }}
      >
        <BlockContent {...blockDTO} />
        <HoverArea handleClick={() => blockRef.current.focus()} />
        {hoverId === blockDTO.id && <BlockHandler />}
      </div>

      {blockDTO.childrenIdList.length ? (
        <div css={descendantsCss(blockDTO)}>
          {blockDTO.childrenIdList.map((blockId: IdType) => (
            <BlockComponent key={blockId} blockDTO={blockMap[blockId]} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BlockComponent;
