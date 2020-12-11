import { Request, Response } from 'express';

import { pageService } from '@/services';
import { StatusCode, transactionHandler } from '@/aops';

export const create = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = await pageService.create();
    const pages = await pageService.getAll();
    res.status(StatusCode.CREATED).json({ page, pages });
  },
);

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const pages = await pageService.getAll();
  res.status(StatusCode.OK).json(pages);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.getOne({ id: req.params.id });
  res.status(StatusCode.OK).json(page);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title } = req.body;
  const page = await pageService.update({ id, title });
  res.status(StatusCode.OK).json(page);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await pageService.remove({ id: req.params.id });
  const pages = await pageService.getAll();
  res.status(StatusCode.OK).json(pages);
};
