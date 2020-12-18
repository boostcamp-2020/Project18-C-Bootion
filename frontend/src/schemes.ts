export enum BlockType {
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  BULLETED_LIST = 'bulletedlist',
  NUMBERED_LIST = 'numberedlist',
  TOGGLE_LIST = 'togglelist',
  QUOTE = 'quote',
  PAGE = 'page',
}

export type IdType = string;

export interface Block {
  id: IdType;
  type: BlockType;
  value: string;
  childIdList: IdType[];
  parentId: IdType | null;
  pageId: IdType;
}

export type BlockMap = { [key: string]: Block };
export interface BlockFamily {
  blockMap: BlockMap;
  block: Block;
  blockIndex: number;
  parent: Block | null;
  parentIndex: number | null;
  grandParent: Block | null;
  page: Page;
  childrenIdList: IdType[];
  children: Block[];
  siblingsIdList: IdType[];
  siblings: Block[];
  parentsIdList: IdType[];
  parents: Block[];
  prevSibling: Block;
  nextSibling: Block;
  prevSiblings: Block[];
  nextSiblings: Block[];
}

export interface FamilyFunc {
  getNextBlock: () => Block | null;
  getPrevBlock: () => Block | null;
  setBlockMap: (blockMap: BlockMap) => void;
}

export interface Page {
  id: IdType;
  title: string;
  rootId: IdType;
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
