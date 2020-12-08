import { atom, atomFamily } from 'recoil';

import { IdType } from '@/schemes';
import { fetchDummyData } from '@/utils';

enum StateType {
  PAGE_STATE = 'pageState',
  BLOCK_STATE = 'blockState',
  HOVER_STATE = 'hoverState',
  FOCUS_STATE = 'focusState',
  CARET_STATE = 'caretState',
  BLOCK_REF_STATE = 'blockRefState',
}

export const pageState = atomFamily({
  key: StateType.PAGE_STATE,
  default: async (id: IdType) => fetchDummyData(id),
});

export const blockState = atomFamily({
  key: StateType.BLOCK_STATE,
  default: null,
});

export const blockRefState = atom<any>({
  key: StateType.BLOCK_REF_STATE,
  default: {},
});

export const hoverState = atom({
  key: StateType.HOVER_STATE,
  default: null,
});

export const caretState = atom({
  key: StateType.CARET_STATE,
  default: 0,
});

export const focusState = atom({
  key: StateType.FOCUS_STATE,
  default: null,
});
