import { Request, Response } from 'express';

import { blockService } from '@/services';
import { StatusCode } from '@/middlewares';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { block, parent, page } = !req.body.parentId
    ? await blockService.createToPage({
        pageId: req.body.pageId,
        targetId: req.body.targetId,
      })
    : await blockService.createToBlock({
        parentId: req.body.parentId,
        targetId: req.body.targetId,
      });
  res.status(StatusCode.CREATED).json({ block, parent, page });
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const block = await blockService.getOne({ id: req.params.id });
  res.status(StatusCode.OK).json(block);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const params = {
    id: req.params.id,
    type: req.body.type,
    value: req.body.value,

    pageId: req.body.pageId,
    parentId: req.body.parentId,
    targetId: req.body.targetId,
  };

  const block = await blockService.update(params);
  res.status(StatusCode.OK).json(block);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  await blockService.remove({ id: req.params.id });
  res.status(StatusCode.NO_CONTENT).json();
};
