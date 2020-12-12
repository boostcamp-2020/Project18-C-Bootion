import { Request, Response } from 'express';

import { pageService } from '@/services';
import { StatusCode, transactionHandler } from '@/aops';

export const create = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = await pageService.create(req.body.page);
    const pages = await pageService.readAll();
    res.status(StatusCode.CREATED).json({ page, pages });
  },
);

export const readOne = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.readOne(req.params.id);
  res.status(StatusCode.OK).json(page);
};

export const readAll = async (req: Request, res: Response): Promise<void> => {
  const pages = await pageService.readAll();
  res.status(StatusCode.OK).json(pages);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.update(req.params.id, req.body.page);
  res.status(StatusCode.OK).json(page);
};

export const deleteOne = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    await pageService.deleteOne(req.params.id);
    const pages = await pageService.readAll();
    res.status(StatusCode.OK).json(pages);
  },
);
