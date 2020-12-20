import { Router } from 'express';

import { blockMiddleware } from '@/middlewares';
import { blockController } from '@/controllers';
import { errorHandler } from '@/aops';
import { objectIdValidator } from '@/middlewares';

export const blockRouter = Router();

blockRouter.post(
  '/parent-id/:parentId',
  objectIdValidator('parentId'),
  errorHandler(blockMiddleware.create),
  blockController.publish,
);
blockRouter.get(
  '/page-id/:pageId',
  objectIdValidator('pageId'),
  errorHandler(blockController.readAll),
);
blockRouter.patch(
  '/id/:blockId',
  objectIdValidator('blockId'),
  errorHandler(blockMiddleware.update),
  blockController.publish,
);
blockRouter.patch(
  '/id/:blockId/to/:toId',
  objectIdValidator('blockId', 'toId'),
  errorHandler(blockMiddleware.move),
  blockController.publish,
);
blockRouter.delete(
  '/id/:blockId',
  objectIdValidator('blockId'),
  errorHandler(blockMiddleware.deleteCascade),
  blockController.publish,
);
blockRouter.patch(
  '/create-and-update',
  errorHandler(blockMiddleware.createAndUpdate),
  blockController.publish,
);
blockRouter.patch(
  '/delete-and-update',
  errorHandler(blockMiddleware.deleteAndUpdate),
  blockController.publish,
);
