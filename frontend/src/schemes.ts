export enum BlockType {
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
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
