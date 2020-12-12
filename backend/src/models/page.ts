import { Document, Schema, Types, model, Model } from 'mongoose';

import { Block, BlockType } from '.';

export interface PageDTO {
  _id?: string;
  id?: string;
  title?: string;
  rootId?: string;
}

const PageSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
    },
    rootId: {
      type: Schema.Types.ObjectId,
      ref: 'Block',
      default: null,
    },
  },
  { timestamps: true },
);

PageSchema.virtual('id').get(function (this: PageDoc) {
  return this._id.toHexString();
});

PageSchema.set('toJSON', { virtuals: true });

export interface PageModel extends Model<PageDoc> {
  createOne?: (this: PageModel, pageDTO?: PageDTO) => Promise<PageDoc>;
}

export interface PageDoc extends Document {
  title?: string;
  rootId?: Types.ObjectId;
  createdAt?: Date;

  test?: (this: PageDoc) => Promise<any>;
}

PageSchema.statics.createOne = async function (
  this: PageModel,
  pageDTO?: PageDTO,
): Promise<PageDoc> {
  const page = new this(pageDTO ?? {});
  await page.save();
  const block = await Block.createOne({
    type: BlockType.PAGE,
    pageId: page.id,
  });
  page.rootId = block.id;
  await page.save();
  return page;
};

PageSchema.methods.test = async function (this: PageDoc): Promise<any> {
  //
};

export const Page = model<PageDoc>('Page', PageSchema) as PageModel;
