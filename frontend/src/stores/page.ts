import { atom, atomFamily, useRecoilValue } from 'recoil';

import { IdType, Block, Page } from '@/schemes';
import { createPage, fetchDummyData, readPage, readPages } from '@/utils';

enum StateType {
  PAGE_STATE = 'pageState',
  BLOCK_STATE = 'blockState',
  HOVER_STATE = 'hoverState',
  FOCUS_STATE = 'focusState',
  CARET_STATE = 'caretState',
  BLOCK_REF_STATE = 'blockRefState',
  PAGES_STATE = 'pagesState',
  BLOCK_MAP_STATE = 'blockMapState',
  STATIC_MENU_TOGGLE_STATE = 'staticMenuToggleState',
  HOVERED_MENU_TOGGLE_STATE = 'hoveredMenuToggleState',
  SELECTED_PAGE_STATE = 'selectedPageState',
}

export const pageState = atomFamily({
  key: StateType.PAGE_STATE,
  default: async (id: IdType) => fetchDummyData(id),
});

export const blockMapState: { [id: string]: Block } = {};

export const blockState = atomFamily({
  key: StateType.BLOCK_STATE,
  default: null,
  effects_UNSTABLE: (blockId: string) => [
    ({ onSet }) => {
      onSet((newValue) => {
        blockMapState[blockId] = newValue;
      });
    },
  ],
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

export const pagesState = atom({
  key: StateType.PAGES_STATE,
  default: (async () => {
    const pages = await readPages();
    if (pages.length) {
      return pages;
    }
    return (await createPage())?.pages;
  })(),
});

export const staticMenuToggleState = atom({
  key: StateType.STATIC_MENU_TOGGLE_STATE,
  default: false,
});

export const hoveredMenuToggleState = atom({
  key: StateType.HOVERED_MENU_TOGGLE_STATE,
  default: false,
});

export const selectedPageState = atom({
  key: StateType.SELECTED_PAGE_STATE,
  default: (async () => (await readPages())[0])(),
});
