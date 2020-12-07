import { Document, Schema, Types, model } from 'mongoose';

import { Block, BlockDoc } from '@/models';

export interface Page {
  id?: string;
  title?: string;
  blockIdList?: string[];
  blockList?: Block[];
}

export interface PageDoc extends Document {
  title?: string;
  blockIdList?: Types.ObjectId[];
  blockList?: BlockDoc[];
  addBlock?: (
    this: PageDoc,
    block: BlockDoc,
    targetIndex?: number,
  ) => Promise<void>;
  removeBlock?: (this: PageDoc, block: BlockDoc) => Promise<void>;
  populateBlock?: (this: PageDoc) => Promise<void>;
}
const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  blockIdList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Block',
    },
  ],
});

PageSchema.methods.addBlock = async function (
  this: PageDoc,
  block: BlockDoc,
  targetIndex?: number,
): Promise<void> {
  if (
    (targetIndex !== 0 && !targetIndex) ||
    targetIndex < 0 ||
    targetIndex > this.blockIdList.length
  ) {
    targetIndex = this.blockIdList.length;
  }
  this.blockIdList.splice(targetIndex, 0, block.id);
  await this.save();

  block.pageId = this.id;
  block.parentIdList = [];
  block.children.forEach((child: BlockDoc, index: number) =>
    block.addChild(child, index),
  );
  await block.save();
};

PageSchema.methods.removeBlock = async function (
  this: PageDoc,
  block: BlockDoc,
): Promise<void> {
  this.blockIdList = this.blockIdList.filter((blockId: Types.ObjectId) => {
    console.log(
      block.id !== blockId.toHexString(),
      block.id,
      blockId.toHexString(),
    );
    return block.id !== blockId.toHexString();
  });
  await this.save();
};

PageSchema.methods.populateBlock = async function (
  this: PageDoc,
): Promise<void> {
  const populatedPage = await PageModel.findById(this.id)
    .populate('blockIdList')
    .exec();
  (this as any)._doc.blockList = populatedPage.blockIdList;
};

export const PageModel = model<PageDoc>('Page', PageSchema);
