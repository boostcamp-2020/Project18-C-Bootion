import axios, { AxiosResponse } from 'axios';
import { Page } from '@/schemes';

const BASE_URL = '/api/pages';

type ErrorReturns = {
  error?: 1 | true;
  message?: string;
};

type CreatePageReturns = {
  page: Page;
  pages: Page[];
} & ErrorReturns;

export const createPage = async (): Promise<CreatePageReturns> =>
  (await axios.post(BASE_URL))?.data;

export const createPageSync = (
  callback: (res: AxiosResponse<CreatePageReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .post(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

// type ReadPagesReturns = Page[] & ErrorReturns;

export const readPages = async (): Promise<Page[]> =>
  (await axios.get(BASE_URL))?.data;

export const readPagesSync = (
  callback: (res: AxiosResponse<Page[]>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .get(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type ReadPageParams = {
  id: string;
};

// type ReadPageReturns = Page & ErrorReturns;

export const readPage = async <T extends ReadPageParams>(
  params: T,
): Promise<Page> => (await axios.get(`${BASE_URL}/id/${params.id}`))?.data;

export const readPageSync = <T extends ReadPageParams>(
  params: T,
  callback: (res: AxiosResponse<Page>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .get(`${BASE_URL}/id/${params.id}`)
    .then(callback)
    .catch(errorHandler ?? console.error);

type UpdatePageParams = {
  id: string;
  title: string;
};

type UpdatePageReturns = Page & ErrorReturns;

export const updatePage = async <T extends UpdatePageParams>(
  params: T,
): Promise<UpdatePageReturns> =>
  (await axios.patch(`${BASE_URL}/id/${params.id}`, params))?.data;

export const updatePageSync = <T extends UpdatePageParams>(
  params: T,
  callback: (res: AxiosResponse<UpdatePageReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .patch(`${BASE_URL}/id/${params.id}`, params)
    .then(callback)
    .catch(errorHandler ?? console.error);

type DeletePageParams = {
  id: string;
};

type DeletePageReturns = Page[] & ErrorReturns;

export const deletePage = async <T extends DeletePageParams>(
  params: T,
): Promise<DeletePageReturns> =>
  (await axios.delete(`${BASE_URL}/id/${params.id}`))?.data;

export const deletePageSync = <T extends DeletePageParams>(
  params: T,
  callback: (res: AxiosResponse<DeletePageReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .delete(`${BASE_URL}/id/${params.id}`)
    .then(callback)
    .catch(errorHandler ?? console.error);
