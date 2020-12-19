import { Router } from 'express';

import { blockController } from '@/controllers';
import { errorHandler } from '@/aops';
import { objectIdValidator } from '@/middlewares';

export const blockRouter = Router();

blockRouter.post(
  '/parent-id/:parentId',
  objectIdValidator('parentId'),
  errorHandler(blockController.create),
);
blockRouter.get(
  '/page-id/:pageId',
  objectIdValidator('pageId'),
  errorHandler(blockController.readAll),
);
blockRouter.patch(
  '/id/:blockId',
  objectIdValidator('blockId'),
  errorHandler(blockController.update),
);
blockRouter.patch(
  '/id/:blockId/to/:toId',
  objectIdValidator('blockId', 'toId'),
  errorHandler(blockController.move),
);
blockRouter.delete(
  '/id/:blockId',
  objectIdValidator('blockId'),
  errorHandler(blockController.deleteCascade),
);
blockRouter.patch(
  '/create-and-update',
  errorHandler(blockController.createAndUpdate),
);
blockRouter.patch(
  '/delete-and-update',
  errorHandler(blockController.deleteAndUpdate),
);
