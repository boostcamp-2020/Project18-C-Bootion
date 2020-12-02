import { model, Schema } from 'mongoose';

const BlockSchema = new Schema();
BlockSchema.add({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: String,
  pageId: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Block',
  },
  children: [BlockSchema],
});

export const Block = model('Block', BlockSchema);
