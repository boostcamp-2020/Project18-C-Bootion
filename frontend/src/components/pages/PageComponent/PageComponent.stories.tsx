import React from 'react';

import PageComponent from './PageComponent';
import { Page, Block, BlockType } from '../../../schemes';

const desc = {
  component: PageComponent,
  title: 'pages/PageComponent',
};

export const Default = (): JSX.Element => {
  const block01: Block = {
    id: 1,
    type: BlockType.TEXT,
    value: 'Hello, Bootion!!',
  };
  const block02: Block = {
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
  const block03: Block = {
    id: 0,
    type: BlockType.GRID,
    value: 'Grid Block',
    children: [
      {
        id: 1,
        type: BlockType.COLUMN,
        value: 'Column Block 01',
        children: [
          {
            id: 11,
            type: BlockType.TEXT,
            value: 'Row 01 - Col 01',
          },
          {
            id: 12,
            type: BlockType.TEXT,
            value: 'Row 02 - Col 01',
          },
        ],
      },
      {
        id: 2,
        type: BlockType.COLUMN,
        value: 'Column Block 02',
        children: [
          {
            id: 21,
            type: BlockType.TEXT,
            value: 'Row 01 - Col 02',
          },
          {
            id: 22,
            type: BlockType.TEXT,
            value: 'Row 02 - Col 02',
          },
          {
            id: 23,
            type: BlockType.TEXT,
            value: 'Row 03 - Col 02',
          },
        ],
      },
      {
        id: 3,
        type: BlockType.COLUMN,
        value: 'Column Block 03',
      },
      {
        id: 4,
        type: BlockType.COLUMN,
        value: 'Column Block 04',
        children: [
          {
            id: 31,
            type: BlockType.TEXT,
            value: 'Row 01 - Col 04',
          },
        ],
      },
    ],
  };
  const page: Page = {
    id: 0,
    title: 'Page 01',
    records: [block01, block02, block03],
  };
  return <PageComponent page={page} menuClosed />;
};

export default desc;