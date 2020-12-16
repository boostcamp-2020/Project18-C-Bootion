import { atom, selector } from 'recoil';

import { BlockMap, Page } from '@/schemes';
import { fetchDummyData, readBlockMap, refreshPages } from '@/utils';
import { MutableRefObject } from 'react';

enum StateType {
  PAGE_STATE = 'pageState',
  BLOCK_STATE = 'blockState',
  HOVER_STATE = 'hoverState',
  MODAL_STATE = 'modalState',
  FOCUS_STATE = 'focusState',
  CARET_STATE = 'caretState',
  BLOCK_REF_STATE = 'blockRefState',
  PAGES_STATE = 'pagesState',
  BLOCK_MAP_STATE = 'blockMapState',
  STATIC_MENU_TOGGLE_STATE = 'staticMenuToggleState',
  HOVERED_MENU_TOGGLE_STATE = 'hoveredMenuToggleState',
  SELECTED_PAGE_STATE = 'selectedPageState',
}

export const pagesState = atom({
  key: StateType.PAGES_STATE,
  default: refreshPages(),
});

export const selectedPageState = atom({
  key: StateType.SELECTED_PAGE_STATE,
  default: (async () => (await refreshPages())[0])(),
});

export const pageState = atom<Page>({
  key: StateType.PAGE_STATE,
  // default: (async () => (await fetchDummyData()).page)(),
  default: (async () => (await refreshPages())[0])(),
});

export const blockMapState = atom<BlockMap>({
  key: StateType.BLOCK_MAP_STATE,
  // default: (async () => (await fetchDummyData()).blockMap)(),
  default: (async () => {
    const page = (await refreshPages())[0];
    const { blockMap } = await readBlockMap(page.id);
    return blockMap;
  })(),
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

export const modalState = atom({
  key: StateType.MODAL_STATE,
  default: null,
});

export const staticMenuToggleState = atom({
  key: StateType.STATIC_MENU_TOGGLE_STATE,
  default: false,
});

export const hoveredMenuToggleState = atom({
  key: StateType.HOVERED_MENU_TOGGLE_STATE,
  default: false,
});
