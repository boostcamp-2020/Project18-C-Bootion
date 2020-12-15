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
  readOne?: (this: PageModel, pageId: string) => Promise<PageDoc>;
  readAll?: (this: PageModel) => Promise<PageDoc[]>;
  updateOnePage?: (
    this: PageModel,
    pageId: string,
    pageDTO: PageDTO,
  ) => Promise<PageDoc>;
}

export interface PageDoc extends Document {
  title?: string;
  rootId?: Types.ObjectId;
  createdAt?: Date;

  delete?: (this: PageDoc) => Promise<void>;
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

PageSchema.statics.readOne = async function (
  this: PageModel,
  pageId: string,
): Promise<PageDoc> {
  return this.findById(pageId).exec();
};

PageSchema.statics.readAll = async function (
  this: PageModel,
): Promise<PageDoc[]> {
  return this.find()
    .sort([['createdAt', -1]])
    .exec();
};

PageSchema.statics.updateOnePage = async function (
  this: PageModel,
  pageId: string,
  pageDTO: PageDTO,
): Promise<PageDoc> {
  const { title } = pageDTO;
  return this.findByIdAndUpdate(pageId, { title }, { new: true }).exec();
};

PageSchema.methods.delete = async function (this: PageDoc): Promise<void> {
  await Block.deleteMany({ pageId: { $eq: this.id } }).exec();
  await Page.findByIdAndDelete(this.id).exec();
};

export const Page = model<PageDoc>('Page', PageSchema) as PageModel;
