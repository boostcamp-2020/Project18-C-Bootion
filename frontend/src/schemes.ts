export enum BlockType {
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
}

export interface Record {
  id: string | number;
  type: BlockType;
  value: string;
  children?: Record[];
}
