import { atom } from 'recoil';

type HoveredBlockId = number | string | null;
const hoveredBlockState = atom<HoveredBlockId>({
  key: 'hoveredBlockId',
  default: null,
});

export default { hoveredBlockState };
