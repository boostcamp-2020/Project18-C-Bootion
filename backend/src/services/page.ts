import { Document, Types } from 'mongoose';

import { PageModel, BlockModel, Page, PageDoc } from '@/models';
import { ErrorMessage } from '@/aops';

export const create = async (params: { title: string }): Promise<Document> => {
  const page = new PageModel({ title: params.title });
  await page.save();
  return page;
};

export const getAll = async (): Promise<PageDoc[]> => {
  const pages = await PageModel.find().exec();
  for (const page of pages) {
    await page.populateBlock();
  }
  return pages;
};

export const getOne = async (params: { id: string }): Promise<Document> => {
  const page = await PageModel.findById(params.id).populate('blockList').exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const update = async (params: {
  id: string;
  title: string;
}): Promise<Document> => {
  const page = await PageModel.findByIdAndUpdate(
    params.id,
    { title: params.title },
    { new: true },
  ).exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const remove = async (params: { id: string }): Promise<void> => {
  const page: any = await PageModel.findById(params.id).exec();
  page && (await BlockModel.deleteMany({ pageId: { $eq: page.id } }));
  await PageModel.findByIdAndDelete(page.id).exec();
};
