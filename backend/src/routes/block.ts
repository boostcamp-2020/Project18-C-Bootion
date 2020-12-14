import { Router } from 'express';

import { blockController } from '@/controllers';
import { errorHandler } from '@/aops';
import { validateObjectId } from '@/middlewares';

export const blockRouter = Router();

blockRouter.post(
  '/parent-id/:parentId',
  validateObjectId('parentId'),
  errorHandler(blockController.create),
);
blockRouter.get(
  '/page-id/:pageId',
  validateObjectId('pageId'),
  errorHandler(blockController.readAll),
);
blockRouter.patch(
  '/id/:blockId',
  validateObjectId('blockId'),
  errorHandler(blockController.update),
);
blockRouter.patch(
  '/id/:blockId/to/:toId',
  validateObjectId('blockId', 'toId'),
  errorHandler(blockController.move),
);
blockRouter.delete(
  '/id/:blockId',
  validateObjectId('blockId'),
  errorHandler(blockController.deleteCascade),
);
