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
  readOne?: (this: BlockModel, blockId: string) => Promise<BlockDoc>;
  readAll?: (this: BlockModel, pageId: string) => Promise<BlockDoc[]>;
  updateOneBlock?: (
    this: BlockModel,
    blockId: string,
    blockDTO: BlockDTO,
  ) => Promise<BlockDoc>;
}

export interface BlockDoc extends Document {
  type?: BlockType;
  value?: string;
  pageId?: Types.ObjectId;
  parentId?: Types.ObjectId;
  childIdList?: Types.ObjectId[];

  setChild?: (this: BlockDoc, child: BlockDoc, index?: number) => Promise<void>;
  deleteChild?: (this: BlockDoc, childId: string) => Promise<void>;
  deleteCascade?: (this: BlockDoc) => Promise<void>;
}

BlockSchema.statics.createOne = async function (
  this: BlockModel,
  blockDTO: BlockDTO,
): Promise<BlockDoc> {
  const block = new this(blockDTO);
  await block.save();
  return block;
};

BlockSchema.statics.readOne = async function (
  this: BlockModel,
  blockId: string,
): Promise<BlockDoc> {
  return this.findById(blockId).exec();
};

BlockSchema.statics.readAll = async function (
  this: BlockModel,
  pageId: string,
): Promise<BlockDoc[]> {
  return this.find({ pageId: { $eq: pageId } }).exec();
};

BlockSchema.statics.updateOneBlock = async function (
  this: BlockModel,
  blockId: string,
  blockDTO: BlockDTO,
): Promise<BlockDoc> {
  const { type, value } = blockDTO;
  return this.findByIdAndUpdate(blockId, { type, value }, { new: true }).exec();
};

BlockSchema.methods.setChild = async function (
  this: BlockDoc,
  child: BlockDoc,
  index?: number,
): Promise<void> {
  child.parentId = this.id;
  child.pageId = this.pageId;
  await child.save();

  this.childIdList.splice(index ?? this.childIdList.length, 0, child.id);
  await this.save();
};

BlockSchema.methods.deleteChild = async function (
  this: BlockDoc,
  childId: string,
): Promise<void> {
  const index = this.childIdList.findIndex(
    (_childId) => _childId.toHexString() === childId,
  );
  this.childIdList.splice(index, 1);
  await this.save();
};

BlockSchema.methods.deleteCascade = async function (
  this: BlockDoc,
): Promise<void> {
  for (const childId of this.childIdList) {
    const child = await Block.readOne(childId.toHexString());
    await child.deleteCascade();
  }

  await Block.findByIdAndDelete(this.id).exec();
};

export const Block = model<BlockDoc>(MODEL_NAME, BlockSchema) as BlockModel;
