import { Request, Response } from 'express';

import { pageService } from '@/services';
import { StatusCode } from '@/middlewares';

export const create = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.create({ title: req.body.title });
  res.status(StatusCode.CREATED).json(page);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const pages = await pageService.getAll();
  res.status(StatusCode.OK).json(pages);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.getOne({ id: req.params.id });
  res.status(StatusCode.OK).json(page);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.update({
    id: req.params.id,
    title: req.body.title,
    blocks: req.body.blocks,
  });
  res.status(StatusCode.OK).json(page);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await pageService.remove({ id: req.params.id });
  res.status(StatusCode.NO_CONTENT).json();
};
