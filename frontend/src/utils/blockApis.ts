import { Block, BlockMap } from '@/schemes';

import { fetchApi } from '@/utils';

const BASE_URL = '/api/blocks';

export const createBlock = (param: {
  parentBlockId: string;
  index?: number;
  block?: { type?: string; value?: string };
}) =>
  fetchApi<
    { parent: Block; block: Block },
    {
      block?: { type?: string; value?: string };
      index?: number;
    }
  >({
    url: `${BASE_URL}/parent-id/${param.parentBlockId}`,
    method: 'POST',
    defaultReturn: { parent: null, block: null },
  })({ index: param.index, block: param.block });

export const readBlockMap = (pageId: string) =>
  fetchApi<{ blockMap: BlockMap }>({
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

type CreateAndUpdateBody = {
  create: {
    parentId: string;
    index?: number;
    blockDTO?: { type?: string; value?: string };
  };
  update: Block | null;
};

export const createAndUpdate = (param: CreateAndUpdateBody) =>
  fetchApi<
    { parent: Block; block: Block; updated: Block },
    CreateAndUpdateBody
  >({
    url: `${BASE_URL}/create-and-update`,
    method: 'PATCH',
    defaultReturn: { parent: null, block: null, updated: null },
  })(param);

type DeleteAndUpdateBody = {
  deleteId: string;
  update: Block | null;
};

export const deleteAndUpdate = (param: DeleteAndUpdateBody) =>
  fetchApi<{ parent: Block; updated: Block }, DeleteAndUpdateBody>({
    url: `${BASE_URL}/delete-and-update`,
    method: 'PATCH',
    defaultReturn: { parent: null, updated: null },
  })(param);
