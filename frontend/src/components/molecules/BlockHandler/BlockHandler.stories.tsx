/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import { Block, BlockType } from '@/schemes';
import { BlockComponent } from '@components/molecules';
import BlockHandler from '.';

const desc = {
  component: BlockHandler,
  title: 'Molecules/BlockHandler',
};

const block: Block = {
  id: 1,
  type: BlockType.TEXT,
  value: 'Parent Block',
  children: [
    {
      id: 2,
      type: BlockType.TEXT,
      value: 'Child Block 01',
      children: [
        {
          id: 4,
          type: BlockType.TEXT,
          value: 'Grandson Block 01',
        },
        {
          id: 5,
          type: BlockType.TEXT,
          value: 'Grandson Block 02',
        },
      ],
    },
    {
      id: 3,
      type: BlockType.TEXT,
      value: 'Child Block 02',
    },
  ],
};

export const Default = (): JSX.Element => {
  const [hoveredBlock, setHoveredBlock] = useRecoilState(
    pageState.hoveredBlockState,
  );

  return (
    <div>
      <BlockComponent block={block} />
      <div>
        {hoveredBlock.id && (
          <BlockHandler
            location={{
              x: hoveredBlock.position.x,
              y: hoveredBlock.position.y,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default desc;
