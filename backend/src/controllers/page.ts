import { Request, Response } from 'express';

import { pageService } from '@/services';
import { StatusCode, transactionHandler } from '@/aops';

export const create = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = await pageService.create(req.body.page);
    const pages = await pageService.readAll();
    req.app.get('io').of('/pageList').emit('PageListUpdate', pages);
    res.status(StatusCode.CREATED).json({ page, pages });
  },
);

export const readOne = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.readOne(req.params.pageId);
  res.status(StatusCode.OK).json({ page });
};

export const readAll = async (req: Request, res: Response): Promise<void> => {
  const pages = await pageService.readAll();
  res.status(StatusCode.OK).json({ pages });
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.update(req.params.pageId, req.body.page);
  const pages = await pageService.readAll();
  req.app.get('io').of('/pageList').emit('PageListUpdate', pages);
  res.status(StatusCode.OK).json({ page });
};

export const deleteOne = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    await pageService.deleteOne(req.params.pageId);
    const pages = await pageService.readAll();
    req.app.get('io').of('/pageList').emit('PageListUpdate', pages);
    res.status(StatusCode.OK).json({ pages });
  },
);
