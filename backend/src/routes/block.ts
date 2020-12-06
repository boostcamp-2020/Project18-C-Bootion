import { Router } from 'express';

import { blockController } from '@/controllers';
import { errorHandler } from '@/middlewares';

export const blockRouter = Router();

blockRouter.post('', errorHandler(blockController.create));
blockRouter.get('/id/:id', errorHandler(blockController.getOne));
blockRouter.patch('/id/:id', errorHandler(blockController.update));
blockRouter.delete('/id/:id', errorHandler(blockController.remove));
