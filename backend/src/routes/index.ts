import { Router } from 'express';

import { pageRouter } from '@routes/page';

export const apiRouter = Router();

apiRouter.use('/pages', pageRouter);
