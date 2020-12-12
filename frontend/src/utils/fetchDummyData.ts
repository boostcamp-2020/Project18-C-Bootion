import { Block, BlockType, IdType, Page } from '@/schemes';

export const fetchDummyData = (): Promise<{
  page: Page;
  blockMap: { [key: string]: Block };
}> =>
  new Promise((resolve) => {
    const page = {
      id: '1',
      title: 'Page 01',
      rootId: '0',
    };

    const blockMap: { [key: string]: Block } = {
      0: {
        id: '0',
        type: BlockType.PAGE,
        value: '',
        pageId: '1',
        parentId: null,
        childIdList: ['1', '2', '3'],
      },
      1: {
        id: '1',
        type: BlockType.TEXT,
        value: 'Hello, Bootion!!',
        pageId: '1',
        parentId: '0',
        childIdList: [],
      },
      2: {
        id: '2',
        type: BlockType.TEXT,
        value: 'Parent Block',
        pageId: '1',
        parentId: '0',
        childIdList: ['21', '22'],
      },
      21: {
        id: '21',
        type: BlockType.TEXT,
        value: 'Child Block 01',
        pageId: '1',
        parentId: '2',
        childIdList: ['211', '212'],
      },
      211: {
        id: '211',
        type: BlockType.TEXT,
        value: 'Grandson Block 01',
        pageId: '1',
        parentId: '21',
        childIdList: [],
      },
      212: {
        id: '212',
        type: BlockType.TEXT,
        value: 'Grandson Block 02',
        pageId: '1',
        parentId: '21',
        childIdList: [],
      },
      22: {
        id: '22',
        type: BlockType.TEXT,
        value: 'Child Block 02',
        pageId: '1',
        parentId: '2',
        childIdList: [],
      },
      3: {
        id: '3',
        type: BlockType.GRID,
        value: 'Grid Block',
        pageId: '1',
        parentId: '0',
        childIdList: ['31', '32', '33', '34'],
      },
      31: {
        id: '31',
        type: BlockType.COLUMN,
        value: 'Column Block 01',
        pageId: '1',
        parentId: '3',
        childIdList: ['311', '312'],
      },
      311: {
        id: '311',
        type: BlockType.TEXT,
        value: 'Row 01 - Col 01',
        pageId: '1',
        parentId: '31',
        childIdList: [],
      },
      312: {
        id: '312',
        type: BlockType.TEXT,
        value: 'Row 02 - Col 01',
        pageId: '1',
        parentId: '31',
        childIdList: [],
      },
      32: {
        id: '32',
        type: BlockType.COLUMN,
        value: 'Column Block 02',
        pageId: '1',
        parentId: '3',
        childIdList: ['321', '322', '323'],
      },
      321: {
        id: '321',
        type: BlockType.TEXT,
        value: 'Row 01 - Col 02',
        pageId: '1',
        parentId: '32',
        childIdList: [],
      },
      322: {
        id: '322',
        type: BlockType.TEXT,
        value: 'Row 02 - Col 02',
        pageId: '1',
        parentId: '32',
        childIdList: [],
      },
      323: {
        id: '323',
        type: BlockType.TEXT,
        value: 'Row 03 - Col 02',
        pageId: '1',
        parentId: '32',
        childIdList: [],
      },
      33: {
        id: '33',
        type: BlockType.COLUMN,
        value: 'Column Block 03',
        pageId: '1',
        parentId: '3',
        childIdList: ['331'],
      },
      331: {
        id: '331',
        type: BlockType.TEXT,
        value: 'Row 01 - Col 03',
        pageId: '1',
        parentId: '33',
        childIdList: [],
      },
      34: {
        id: '34',
        type: BlockType.COLUMN,
        value: 'Column Block 04',
        pageId: '1',
        parentId: '3',
        childIdList: ['341'],
      },
      341: {
        id: '341',
        type: BlockType.TEXT,
        value: 'Row 01 - Col 04',
        pageId: '1',
        parentId: '34',
        childIdList: [],
      },
    };
    const data = { page, blockMap };
    setTimeout(() => resolve(data), 500);
  });
