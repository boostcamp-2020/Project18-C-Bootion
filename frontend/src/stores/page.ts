import { atom } from 'recoil';

import { Block, BlockMap, Page } from '@/schemes';
import { readBlockMap, refreshPages } from '@/utils';
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
  DRAGGING_BLOCK_STATE = 'draggingBlockState',
}

export const pagesState = atom({
  key: StateType.PAGES_STATE,
  default: refreshPages(),
});

export const pageState = atom<Page>({
  key: StateType.PAGE_STATE,
  default: (async () => (await refreshPages())[0])(),
});

export const blockMapState = atom<BlockMap>({
  key: StateType.BLOCK_MAP_STATE,
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
  default: {
    isOpen: false,
    caretOffset: 0,
    top: 0,
    left: 0,
  },
});

export const staticMenuToggleState = atom({
  key: StateType.STATIC_MENU_TOGGLE_STATE,
  default: false,
});

export const hoveredMenuToggleState = atom({
  key: StateType.HOVERED_MENU_TOGGLE_STATE,
  default: false,
});

export const draggingBlockState = atom<Block>({
  key: StateType.DRAGGING_BLOCK_STATE,
  default: null,
});
