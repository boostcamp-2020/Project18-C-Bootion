import { Router } from 'express';

import { pageRouter } from '@routes/page';
import { blockRouter } from '@routes/block';

export const apiRouter = Router();

apiRouter.use('/pages', pageRouter);
apiRouter.use('/blocks', blockRouter);
