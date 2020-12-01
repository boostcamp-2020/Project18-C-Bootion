import { IdType, Page } from '@/schemes';

// export const getPage = async (pageId: KeyType): Promise<Page> => {
//   const url = '';
//   const res = await fetch(`${url}/${pageId}`);
//   return res.json();
// };

export const getPage = (pageId: IdType): Promise<Page> =>
  new Promise((resolve) => {
    const dummy = {};
    setTimeout(() => resolve(dummy as Page), 3000);
  });
