import { Block, Page } from '@/schemes';

import { fetchApi } from '@/utils';

const BASE_URL = '/api/blocks';

export const createBlock = (param: {
  parentBlockId: string;
  index?: number;
  block?: Block;
}) =>
  fetchApi<
    { parent: Block; block: Block },
    {
      block?: Block;
      index?: number;
    }
  >({
    url: `${BASE_URL}/parent-id/${param.parentBlockId}`,
    method: 'POST',
    defaultReturn: { parent: null, block: null },
  })({ index: param.index, block: param.block });

export const readBlockMap = (pageId: string) =>
  fetchApi<{ blockMap: { [blockId: string]: Block } }>({
    url: `${BASE_URL}/page-id/${pageId}`,
    method: 'GET',
    defaultReturn: { blockMap: {} },
  })();

export const updateBlock = (block: Block) =>
  fetchApi<{ block: Block }, { block: Block }>({
    url: `${BASE_URL}/id/${block.id}`,
    method: 'PATCH',
    defaultReturn: { block },
  })({ block });

export const moveBlock = (param: {
  blockId: string;
  toId: string;
  index?: number;
}) =>
  fetchApi<{ block: Block; from: Block; to: Block }, { index?: number }>({
    url: `${BASE_URL}/id/${param.blockId}/to/${param.toId}`,
    method: 'PATCH',
    defaultReturn: { block: null, from: null, to: null },
  })({ index: param.index });

export const deletePageCascade = (blockId: string) =>
  fetchApi<{ parent: Block }>({
    url: `${BASE_URL}/id/${blockId}`,
    method: 'DELETE',
    defaultReturn: { parent: null },
  })();
