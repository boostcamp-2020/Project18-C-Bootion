import { model, Schema } from 'mongoose';

const PageSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  blocks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Block',
    },
  ],
});

export const Page = model('Page', PageSchema);
