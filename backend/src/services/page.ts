import { Page, PageDoc, PageDTO } from '@/models';
import { ErrorMessage } from '@/aops';

export const create = async (pageDTO?: PageDTO): Promise<PageDoc> => {
  return Page.createOne(pageDTO);
};

export const readOne = async (pageId: string): Promise<PageDoc> => {
  const page = Page.readOne(pageId);
  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const readAll = async (): Promise<PageDoc[]> => {
  return Page.readAll();
};

export const update = async (
  pageId: string,
  pageDTO: PageDTO,
): Promise<PageDoc> => {
  if (!pageDTO?.title) {
    throw new Error(ErrorMessage.BAD_REQUEST);
  }

  const page = await Page.updateOnePage(pageId, pageDTO);
  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const deleteOne = async (pageDTO: PageDTO): Promise<PageDTO> => {
  return null;
};
