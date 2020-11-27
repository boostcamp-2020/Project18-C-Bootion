export enum BlockType {
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
}

export interface Block {
  id: string | number;
  type: BlockType;
  value: string;
  children?: Block[];
}

export interface Page {
  id: string | number;
  title: string;
  records: Block[];
}
