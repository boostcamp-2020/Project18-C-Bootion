import { Page, PageDoc, PageDTO } from '@/models';
import { ErrorMessage } from '@/aops';

export const create = async (pageDTO?: PageDTO): Promise<PageDoc> => {
  return Page.createOne(pageDTO);
};

export const readOne = async (pageDTO: PageDTO): Promise<PageDoc> => {
  return null;
};

export const readAll = async (): Promise<PageDoc[]> => {
  return null;
};

export const update = async (pageDTO: PageDTO): Promise<PageDoc> => {
  return null;
};

export const deleteOne = async (pageDTO: PageDTO): Promise<PageDTO> => {
  return null;
};
