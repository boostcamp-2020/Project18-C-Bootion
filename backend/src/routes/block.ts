import { Router } from 'express';

import { blockController } from '@/controllers';
import { errorHandler } from '@/middlewares';

export const blockRouter = Router();

blockRouter.post('', errorHandler(blockController.create));
blockRouter.patch('', errorHandler(blockController.updateOrRemove));
