import { Document, Schema, model, Types } from 'mongoose';

export enum BlockType {
  TEXT = 'text',
}

export interface Block {
  _id?: string;
  id?: string;
  type?: BlockType;
  value?: string;
  pageId?: string;
  parentIdList?: string[];
  children?: Block[];
}

export interface BlockDoc extends Document {
  type: BlockType;
  value: string;
  pageId: string;
  parentIdList: string[];
  children: any[];
  addChild: (
    this: BlockDoc,
    child: BlockDoc,
    targetIndex?: number,
  ) => Promise<void>;
  removeFromParent: (this: BlockDoc) => Promise<void>;
  requestSave: (this: BlockDoc) => Promise<void>;
}

const BlockSchema = new Schema();
BlockSchema.add({
  type: {
    type: String,
    required: true,
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
  },
  parentIdList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Block',
    },
  ],
  children: [BlockSchema],
});

BlockSchema.virtual('id').get(function (this: BlockDoc) {
  return this._id.toHexString();
});

BlockSchema.set('toJSON', { virtuals: true });

BlockSchema.methods.addChild = async function (
  this: BlockDoc,
  child: BlockDoc,
  targetIndex?: number,
): Promise<void> {
  if (
    (targetIndex !== 0 && !targetIndex) ||
    targetIndex < 0 ||
    targetIndex > this.children.length
  ) {
    targetIndex = this.children.length;
  }
  child.pageId = this.pageId;
  child.parentIdList = [...this.parentIdList, this.id];
  child.children.forEach((grandChild: BlockDoc, index: number) =>
    child.addChild(grandChild, index),
  );
  this.children.splice(targetIndex, 0, child);
};

BlockSchema.methods.removeFromParent = async function (
  this: BlockDoc,
): Promise<void> {
  const parent: BlockDoc = (this as any).parent();
  if (!parent) return;
  parent.children = parent.children.filter(
    (_child: BlockDoc) => this.id !== _child.id,
  );
  await parent.requestSave();
};

BlockSchema.methods.requestSave = async function (
  this: BlockDoc,
): Promise<void> {
  if (!this.parentIdList.length) {
    await this.save();
  } else {
    await (this as any).ownerDocument().save();
  }
};

export const BlockModel = model<BlockDoc>('Block', BlockSchema);
