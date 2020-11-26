import React, { useState, useCallback } from 'react';
import BlockHandler from '.';
import Block from '../Block';

const desc = {
  component: BlockHandler,
  title: 'Molecules/BlockHandler',
  decorators: [
    (Story: any) => (
      <div style={{ width: '400px', margin: 'auto', position: 'relative' }}>
        <Story />
      </div>
    ),
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
      <div>
        <div>
          <Block
            {...{
              id: '123',
              type: 1,
              value: 'test',
              notifyHover: setHoveredComponent,
            }}
          />
          <Block
            {...{
              id: '124',
              type: 1,
              value: 'test',
              notifyHover: setHoveredComponent,
            }}
          />
          <Block
            {...{
              id: '125',
              type: 1,
              value: 'test',
              notifyHover: setHoveredComponent,
            }}
          />
        </div>
      </div>
      <>
        {hoveredComponent.id ? (
          <BlockHandler
            location={{
              x: hoveredComponent.componentInfo.x,
              y: hoveredComponent.componentInfo.y,
            }}
          />
        ) : (
          ''
        )}
      </>
    </div>
  );
};

export default desc;
