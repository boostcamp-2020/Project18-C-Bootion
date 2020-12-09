import { BlockModel, PageDoc, PageModel } from '@/models';
import { ErrorMessage } from '@/aops';

export const create = async (): Promise<PageDoc> => {
  const page = new PageModel();
  await page.save();
  return page;
};

export const getAll = async (): Promise<PageDoc[]> => {
  return await PageModel.find({}, 'id title')
    .sort([['createdAt', -1]])
    .exec();
};

export const getOne = async (params: { id: string }): Promise<PageDoc> => {
  const page = await PageModel.findById(params.id).populate('blockList').exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  await page.populateBlock();
  return page;
};

export const update = async (params: {
  id: string;
  title: string;
}): Promise<PageDoc> => {
  const page = await PageModel.findByIdAndUpdate(
    params.id,
    { title: params.title ?? '' },
    { new: true },
  ).exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const remove = async (params: { id: string }): Promise<void> => {
  const page = await PageModel.findById(params.id).exec();
  page && (await BlockModel.deleteMany({ pageId: { $eq: page.id } }));
  await PageModel.findByIdAndDelete(page.id).exec();
};
