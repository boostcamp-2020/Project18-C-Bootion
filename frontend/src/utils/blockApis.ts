import axios, { AxiosResponse } from 'axios';
import { Page, Block } from '@/schemes';

const BASE_URL = '/api/blocks';

type ErrorReturns = {
  error?: 1 | true;
  message?: string;
};

type CreateBlockToPageParams = {
  block: Block;
  pageId: string;
  targetIndex?: number;
};

type CreateBlockToPageReturns = {
  block: Block;
  page: Page;
  parent: null;
} & ErrorReturns;

export const createBlockToPage = async (
  params: CreateBlockToPageParams,
): Promise<CreateBlockToPageReturns> =>
  (await axios.post(BASE_URL, params))?.data;

export const createBlockToPageSync = (
  params: CreateBlockToPageParams,
  callback: (res: AxiosResponse<CreateBlockToPageReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .post(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type CreateBlockToBlockParams = {
  block: Block;
  parent: Block;
  targetIndex?: number;
};

type CreateBlockToBlockReturns = {
  block: Block;
  parent: Block;
  page: null;
} & ErrorReturns;

export const createBlockToBlock = async (
  params: CreateBlockToBlockParams,
): Promise<CreateBlockToBlockReturns> =>
  (await axios.post(BASE_URL, params))?.data;

export const createBlockToBlockSync = (
  params: CreateBlockToBlockParams,
  callback: (res: AxiosResponse<CreateBlockToBlockReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .post(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type UpdateBlockParams = {
  block: Block;
};

type UpdateBlockReturns = {
  block: Block;
  parent: null;
  page: null;
} & ErrorReturns;

export const updateBlock = async (
  params: UpdateBlockParams,
): Promise<UpdateBlockReturns> => (await axios.patch(BASE_URL, params))?.data;

export const updateBlockSync = (
  params: UpdateBlockParams,
  callback: (res: AxiosResponse<UpdateBlockReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .patch(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type MoveToPageParams = {
  block: Block;
  pageId: string;
  targetIndex?: number;
};

type MoveToPageReturns = {
  block: Block;
  page: Page;
  parent: null;
} & ErrorReturns;

export const moveToPage = async (
  params: MoveToPageParams,
): Promise<MoveToPageReturns> => (await axios.patch(BASE_URL, params))?.data;

export const moveToPageSync = (
  params: MoveToPageParams,
  callback: (res: AxiosResponse<MoveToPageReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .patch(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type MoveToBlockParams = {
  block: Block;
  parent: Block;
  targetIndex?: number;
};

type MoveToBlockReturns = {
  block: Block;
  parent: Block;
  page: null;
} & ErrorReturns;

export const moveToBlock = async (
  params: MoveToBlockParams,
): Promise<MoveToBlockReturns> => (await axios.patch(BASE_URL, params))?.data;

export const moveToBlockSync = (
  params: MoveToBlockParams,
  callback: (res: AxiosResponse<MoveToBlockReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .patch(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);

type DeleteBlockParams = {
  block: Block;
  remove?: 0 | 1 | false | true;
};

type DeleteBlockReturns = {
  block: null;
  page: Page | null;
  parent: Block | null;
} & ErrorReturns;

export const deleteBlock = async (
  params: DeleteBlockParams,
): Promise<DeleteBlockReturns> => (await axios.patch(BASE_URL, params))?.data;

export const deleteBlockSync = (
  params: DeleteBlockParams,
  callback: (res: AxiosResponse<DeleteBlockReturns>) => void,
  errorHandler?: (err: Error) => void,
) =>
  axios
    .patch(BASE_URL)
    .then(callback)
    .catch(errorHandler ?? console.error);
