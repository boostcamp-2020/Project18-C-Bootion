import { Router } from 'express';

import { objectIdValidator } from '@/middlewares';
import { errorHandler } from '@/aops';
import { pageController } from '@/controllers';

export const pageRouter = Router();

pageRouter.post('', errorHandler(pageController.create));
pageRouter.get(
  '/id/:pageId',
  objectIdValidator('pageId'),
  errorHandler(pageController.readOne),
);
pageRouter.get('', errorHandler(pageController.readAll));
pageRouter.patch(
  '/id/:pageId',
  objectIdValidator('pageId'),
  errorHandler(pageController.update),
);
pageRouter.delete(
  '/id/:pageId',
  objectIdValidator('pageId'),
  errorHandler(pageController.deleteOne),
);
