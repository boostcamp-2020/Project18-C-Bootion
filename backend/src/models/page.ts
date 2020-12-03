import { model, Schema } from 'mongoose';

const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  blockList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Block',
    },
  ],
});

export const Page = model('Page', PageSchema);
