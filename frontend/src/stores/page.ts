import { atom, atomFamily } from 'recoil';

import { IdType } from '@/schemes';
import { getPage } from '@/utils';

enum StateType {
  PAGE_STATE = 'pageState',
  BLOCK_STATE = 'blockState',
  HOVER_STATE = 'hoverState',
  FOCUS_STATE = 'focusState',
}

export const pageState = atomFamily({
  key: StateType.PAGE_STATE,
  default: async (id: IdType) => getPage(id),
});

export const blockState = atomFamily({
  key: StateType.BLOCK_STATE,
  default: null,
});

export const hoverState = atom({
  key: StateType.HOVER_STATE,
  default: null,
});

export const focusState = atom({
  key: StateType.FOCUS_STATE,
  default: null,
});
