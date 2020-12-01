import { Block, BlockType, IdType, Page } from '@/schemes';

// export const getPage = async (pageId: KeyType): Promise<Page> => {
//   const url = '';
//   const res = await fetch(`${url}/${pageId}`);
//   return res.json();
// };

export const getPage = (pageId: IdType): Promise<Page> =>
  new Promise((resolve) => {
    const block01: Block = {
      id: '1',
      type: BlockType.TEXT,
      value: 'Hello, Bootion!!',
      pageId: '1',
      parentBlockId: null,
      children: [],
    };
    const block02: Block = {
      id: '2',
      type: BlockType.TEXT,
      value: 'Parent Block',
      pageId: '1',
      parentBlockId: null,
      children: [
        {
          id: '21',
          type: BlockType.TEXT,
          value: 'Child Block 01',
          pageId: '1',
          parentBlockId: '2',
          children: [
            {
              id: '211',
              type: BlockType.TEXT,
              value: 'Grandson Block 01',
              pageId: '1',
              parentBlockId: '21',
              children: [],
            },
            {
              id: '212',
              type: BlockType.TEXT,
              value: 'Grandson Block 02',
              pageId: '1',
              parentBlockId: '21',
              children: [],
            },
          ],
        },
        {
          id: '22',
          type: BlockType.TEXT,
          value: 'Child Block 02',
          pageId: '1',
          parentBlockId: '2',
          children: [],
        },
      ],
    };
    const block03: Block = {
      id: '3',
      type: BlockType.GRID,
      value: 'Grid Block',
      pageId: '1',
      parentBlockId: null,
      children: [
        {
          id: '31',
          type: BlockType.COLUMN,
          value: 'Column Block 01',
          pageId: '1',
          parentBlockId: '3',
          children: [
            {
              id: '311',
              type: BlockType.TEXT,
              value: 'Row 01 - Col 01',
              pageId: '1',
              parentBlockId: '31',
              children: [],
            },
            {
              id: '312',
              type: BlockType.TEXT,
              value: 'Row 02 - Col 01',
              pageId: '1',
              parentBlockId: '31',
              children: [],
            },
          ],
        },
        {
          id: '32',
          type: BlockType.COLUMN,
          value: 'Column Block 02',
          pageId: '1',
          parentBlockId: '3',
          children: [
            {
              id: '321',
              type: BlockType.TEXT,
              value: 'Row 01 - Col 02',
              pageId: '1',
              parentBlockId: '32',
              children: [],
            },
            {
              id: '322',
              type: BlockType.TEXT,
              value: 'Row 02 - Col 02',
              pageId: '1',
              parentBlockId: '32',
              children: [],
            },
            {
              id: '323',
              type: BlockType.TEXT,
              value: 'Row 03 - Col 02',
              pageId: '1',
              parentBlockId: '32',
              children: [],
            },
          ],
        },
        {
          id: '33',
          type: BlockType.COLUMN,
          value: 'Column Block 03',
          pageId: '1',
          parentBlockId: '3',
          children: [],
        },
        {
          id: '34',
          type: BlockType.COLUMN,
          value: 'Column Block 04',
          pageId: '1',
          parentBlockId: '3',
          children: [
            {
              id: '341',
              type: BlockType.TEXT,
              value: 'Row 01 - Col 04',
              pageId: '1',
              parentBlockId: '34',
              children: [],
            },
          ],
        },
      ],
    };
    const page: Page = {
      id: '1',
      title: 'Page 01',
      blockIdList: [block01.id, block02.id, block03.id],
      blockList: [block01, block02, block03],
    };
    setTimeout(() => resolve(page), 500);
  });
