import { Page } from '@/schemes';

import { fetchApi } from '@/utils';

const BASE_URL = '/api/pages';

export const createPage = fetchApi<
  { page: Page; pages: Page[] },
  { page: Page }
>({
  url: `${BASE_URL}`,
  method: 'POST',
  defaultReturn: { page: null, pages: [] },
});

export const readPage = (pageId: string) =>
  fetchApi<{ page: Page }>({
    url: `${BASE_URL}/id/${pageId}`,
    method: 'GET',
    defaultReturn: { page: null },
  })();

export const readPages = fetchApi<{ pages: Page[] }>({
  url: BASE_URL,
  method: 'GET',
  defaultReturn: { pages: [] },
});

export const updatePage = (page: Page) =>
  fetchApi<{ page: Page }, { page: Page }>({
    url: `${BASE_URL}/id/${page.id}`,
    method: 'PATCH',
    defaultReturn: { page },
  })({ page });

export const deletePage = (pageId: string) =>
  fetchApi<{ pages: Page[] }>({
    url: `${BASE_URL}/id/${pageId}`,
    method: 'DELETE',
    defaultReturn: { pages: [] },
  })();

export const refreshPages = async () => {
  let { pages } = await readPages();
  if (!pages.length) {
    ({ pages } = await createPage());
  }
  return pages;
};
