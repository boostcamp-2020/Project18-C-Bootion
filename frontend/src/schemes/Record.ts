import BlockType from './BlockType';

interface Record {
  id: string | number;
  type: BlockType;
  value: string;
  children?: Record[];
}

export default Record;
