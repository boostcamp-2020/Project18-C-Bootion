import { Router } from 'express';

import { validateObjectId } from '@/middlewares';
import { errorHandler } from '@/aops';
import { pageController } from '@/controllers';

export const pageRouter = Router();

pageRouter.post('', errorHandler(pageController.create));
pageRouter.get(
  '/id/:id',
  validateObjectId,
  errorHandler(pageController.readOne),
);
pageRouter.get('', errorHandler(pageController.readAll));
pageRouter.patch(
  '/id/:id',
  validateObjectId,
  errorHandler(pageController.update),
);
pageRouter.delete(
  '/id/:id',
  validateObjectId,
  errorHandler(pageController.deleteOne),
);
