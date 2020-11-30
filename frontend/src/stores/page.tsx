import { atom } from 'recoil';

const hoveredBlockState = atom<number | string | null>({
  key: 'hoveredBlockId',
  default: null,
});

export default { hoveredBlockState };
