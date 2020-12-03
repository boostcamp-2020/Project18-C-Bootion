import { model, Schema } from 'mongoose';

const BlockSchema = new Schema();
BlockSchema.add({
  type: {
    type: String,
    required: true,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
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
