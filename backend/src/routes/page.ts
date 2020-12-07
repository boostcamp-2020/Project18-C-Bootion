import { Router } from 'express';

import { pageController } from '@/controllers';
import { errorHandler } from '@/aops';

export const pageRouter = Router();

pageRouter.post('', errorHandler(pageController.create));
pageRouter.get('', errorHandler(pageController.getAll));
pageRouter.get('/id/:id', errorHandler(pageController.getOne));
pageRouter.patch('/id/:id', errorHandler(pageController.update));
pageRouter.delete('/id/:id', errorHandler(pageController.remove));
