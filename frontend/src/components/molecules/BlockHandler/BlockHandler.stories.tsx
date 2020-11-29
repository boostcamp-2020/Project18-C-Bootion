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
  const [hoveredComponent, setHoveredComponent] = useState({
    id: null,
    componentInfo: {
      x: 0,
      y: 0,
    },
  });
  const onMouseLeave = useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { relatedTarget } = ev;
      const blockComponent = !(relatedTarget instanceof Window)
        ? relatedTarget.closest('.block')
        : null;
      const classLists = relatedTarget?.classList;

      if (
        !(classLists
          ? Object.values(classLists).includes('block-handler')
          : null) ||
        blockComponent?.dataset.componentId === hoveredComponent.id
      ) {
        setHoveredComponent({
          id: null,
          componentInfo: {
            x: 0,
            y: 0,
          },
        });
      }
    },
    [],
  );
  return (
    <div onMouseLeave={onMouseLeave}>
      <BlockComponent block={block} notifyHover={setHoveredComponent} />
      <div>
        {hoveredComponent.id && (
          <BlockHandler
            location={{
              x: hoveredComponent.componentInfo.x,
              y: hoveredComponent.componentInfo.y,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default desc;
