import { Document, Types } from 'mongoose';

import { Page, Block } from '@/models';
import { ErrorMessage } from '@/middlewares';

export const create = async (params: { title: string }): Promise<Document> => {
  const page = new Page({ title: params.title });
  await page.save();
  return page;
};

export const getAll = async (): Promise<Document[]> => {
  return await Page.find().populate('blocks').exec();
};

export const getOne = async (params: { id: string }): Promise<Document> => {
  const page = await Page.findById(params.id).populate('blocks').exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const update = async (params: {
  id: string;
  title: string | null;
  blocks: string[] | null;
}): Promise<Document> => {
  const update = { title: params.title, blocks: params.blocks };
  update.title ?? delete update.title;
  update.blocks ?? delete update.blocks;
  const page = await Page.findByIdAndUpdate(params.id, update, {
    new: true,
  }).exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const remove = async (params: { id: string }): Promise<void> => {
  const page: any = await Page.findById(params.id).exec();
  page && (await Block.deleteMany({ pageId: { $eq: page.id } }));
  await Page.findByIdAndDelete(page.id).exec();
};
