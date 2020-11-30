import { atom } from 'recoil';

interface BlockInfo {
  id?: number | string;
  position: { x: number; y: number };
}
const hoveredBlockState = atom<BlockInfo>({
  key: 'hoveredBlock',
  default: {
    id: null,
    position: {
      x: 0,
      y: 0,
    },
  },
});

export default { hoveredBlockState };
