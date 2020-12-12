import { Document, Model, model, Schema, Types } from 'mongoose';

export enum BlockType {
  PAGE = 'page',
  TEXT = 'text',
  GRID = 'grid',
  COLUMN = 'column',
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  BULLETED_LIST = 'bulletedlist',
  NUMBERED_LIST = 'numberedlist',
  TOGGLE_LIST = 'togglelist',
  QUOTE = 'quote',
}

export interface BlockDTO {
  _id?: string;
  id?: string;
  type?: BlockType;
  value?: string;
  pageId?: string;
  parentId?: string;
  childIdList?: string[];
}

export interface BlockDoc extends Document {
  type: BlockType;
  value: string;
  pageId: Types.ObjectId;
  parentId: Types.ObjectId;
  childIdList: Types.ObjectId[];

  test: (this: BlockDoc) => Promise<any>;
}

export interface BlockModel extends Model<BlockDoc> {
  test: (this: BlockModel) => Promise<any>;
}

const MODEL_NAME = 'Block';
const BlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(BlockType),
      required: true,
      default: BlockType.TEXT,
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAME,
      default: null,
    },
    childIdList: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME,
      },
    ],
  },
  { timestamps: true },
);

BlockSchema.virtual('id').get(function (this: BlockDoc) {
  return this._id.toHexString();
});

BlockSchema.set('toJSON', { virtuals: true });

BlockSchema.statics.test = async function (this: BlockModel): Promise<any> {
  //
};

BlockSchema.methods.test = async function (this: BlockDoc): Promise<any> {
  //
};

export const Block = model<BlockDoc>(MODEL_NAME, BlockSchema) as BlockModel;
