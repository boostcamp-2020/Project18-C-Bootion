import { Router } from 'express';

import { blockController } from '@/controllers';
import { errorHandler } from '@/aops';

export const blockRouter = Router();

blockRouter.post('', errorHandler(blockController.create));
blockRouter.patch('', errorHandler(blockController.updateOrRemove));
