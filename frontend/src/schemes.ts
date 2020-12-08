export enum BlockType {
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  BULLETEDLIST = 'bulletedlist',
  NUMBEREDLIST = 'numberedlist',
  TOGGLELIST = 'togglelist',
  QUOTE = 'quote',
  PAGE = 'page',
}

export type IdType = string;

export interface Block {
  id: IdType;
  type: BlockType;
  value: string;
  children: Block[];
  parentBlockId: IdType | null;
  pageId: IdType;
}

export interface BlockFamily {
  block: Block;
  blockIndex: number;
  parent: Block | null;
  parentIndex: number | null;
  grandParent: Block | null;
  page: Page;
  children: Block[];
  siblings: Block[];
  parents: Block[];
}

export interface Page {
  id: IdType;
  title: string;
  blockIdList: IdType[];
  blockList?: Block[];
}

export interface User {
  id: IdType;
  password: string;
  ownedPageIdList: Array<IdType>;
  editablePageIdList: Array<IdType>;
  readablePageIdList: Array<IdType>;
  oAuths: Array<OAuth>;
}

export interface OAuth {}
