import { Page, Block } from '@/models';
import { generateId } from '@/utils';
import { ErrorMessage } from '@/middlewares';

export const create = async (params: { title: string }): Promise<any> => {
  const page = new Page({
    id: generateId(),
    title: params.title,
  });
  await page.save();
  return page;
};

export const getAll = async (): Promise<any> => {
  return await Page.find().populate({ path: 'blocks' }).exec();
};

export const getOne = async (params: { id: string }): Promise<any> => {
  const page = await Page.findOne({ id: params.id })
    .populate({ path: 'blocks' })
    .exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const update = async (params: {
  id: string;
  title: string | null;
  blocks: string[] | null;
}): Promise<any> => {
  const update = { title: params.title, blocks: params.blocks };
  update.title ?? delete update.title;
  update.blocks ?? delete update.blocks;

  const page = await Page.findOneAndUpdate(
    {
      id: params.id,
    },
    update,
    {
      new: true,
    },
  ).exec();

  if (!page) {
    throw new Error(ErrorMessage.NOT_FOUND);
  }
  return page;
};

export const remove = async (params: { id: string }): Promise<any> => {
  const page: any = await Page.findOne({ id: params.id }).exec();
  page?.blocks.forEach((blockId: string) =>
    Block.findOneAndDelete({ id: blockId }),
  );
  await Page.findOneAndDelete({ id: params.id }).exec();
};
