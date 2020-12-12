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

export const update = async (pageDTO: PageDTO): Promise<PageDoc> => {
  return null;
};

export const deleteOne = async (pageDTO: PageDTO): Promise<PageDTO> => {
  return null;
};
