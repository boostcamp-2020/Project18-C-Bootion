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

const MODEL_NAME = 'Block';
const BlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(BlockType),
      default: BlockType.TEXT,
    },
    value: {
      type: String,
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

export interface BlockModel extends Model<BlockDoc> {
  createOne?: (this: BlockModel, blockDTO: BlockDTO) => Promise<BlockDoc>;
}

export interface BlockDoc extends Document {
  type?: BlockType;
  value?: string;
  pageId?: Types.ObjectId;
  parentId?: Types.ObjectId;
  childIdList?: Types.ObjectId[];

  test?: (this: BlockDoc) => Promise<any>;
}

BlockSchema.statics.createOne = async function (
  this: BlockModel,
  blockDTO: BlockDTO,
): Promise<BlockDoc> {
  const block = new this(blockDTO);
  await block.save();
  return block;
};

BlockSchema.methods.test = async function (this: BlockDoc): Promise<any> {
  //
};

export const Block = model<BlockDoc>(MODEL_NAME, BlockSchema) as BlockModel;
