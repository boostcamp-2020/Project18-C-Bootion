import { atom } from 'recoil';

import { BlockMap, Page } from '@/schemes';
import { fetchDummyData, readPages } from '@/utils';
import { MutableRefObject } from 'react';

enum StateType {
  PAGE_STATE = 'pageState',
  BLOCK_STATE = 'blockState',
  HOVER_STATE = 'hoverState',
  FOCUS_STATE = 'focusState',
  CARET_STATE = 'caretState',
  BLOCK_REF_STATE = 'blockRefState',
  PAGES_STATE = 'pagesState',
  BLOCK_MAP_STATE = 'blockMapState',
}

export const pageState = atom<Page>({
  key: StateType.PAGE_STATE,
  default: (async () => (await fetchDummyData('1')).page)(),
});

export const blockMapState = atom<BlockMap>({
  key: StateType.BLOCK_MAP_STATE,
  default: (async () => (await fetchDummyData('1')).blockMap)(),
});

export const throttleState = {
  isThrottle: false,
};

export const blockRefState: { [id: string]: MutableRefObject<any> } = {};

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

export const pagesState = atom({
  key: StateType.PAGES_STATE,
  default: readPages(),
});
