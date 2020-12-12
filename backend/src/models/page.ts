import { Document, Schema, Types, model, Model } from 'mongoose';

export interface PageDTO {
  _id?: string;
  id?: string;
  title?: string;
  rootId?: string;
}

export interface PageDoc extends Document {
  title: string;
  rootId: Types.ObjectId;
  createdAt: Date;

  test: (this: PageDoc) => Promise<any>;
}

export interface PageModel extends Model<PageDoc> {
  test: (this: PageModel) => Promise<any>;
}

const PageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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

PageSchema.statics.test = async function (this: PageModel): Promise<any> {
  //
};

PageSchema.methods.test = async function (this: PageDoc): Promise<any> {
  //
};

export const Page = model<PageDoc>('Page', PageSchema) as PageModel;
