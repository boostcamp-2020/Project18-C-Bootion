import { Request, Response, NextFunction } from 'express';

import { blockService } from '@/services';
import { transactionHandler } from '@/aops';
import { BlockDoc } from '@/models';

export const create = transactionHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { parent, block } = await blockService.create({
      parentId: req.params.parentId,
      index: req.body.index,
      blockDTO: req.body.block,
    });

    res.locals.result = { parent, block };
    next();
  },
);

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const block = await blockService.update(req.params.blockId, req.body.block);
  res.locals.result = { block };
  next();
};

export const move = transactionHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { block, from, to } = await blockService.move(
      req.params.blockId,
      req.params.toId,
      req.body.index,
    );
    res.locals.result = { block, from, to };
    next();
  },
);

export const deleteCascade = transactionHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parent = await blockService.deleteCascade(req.params.blockId);
    res.locals.result = { parent };
    next();
  },
);

export const createAndUpdate = transactionHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { create, update } = req.body;
    const { parent, block } = await blockService.create(create);
    let updated: BlockDoc = null;
    if (update) {
      updated = await blockService.update(update.blockId, update);
    }
    res.locals.result = { parent, block, updated };
    next();
  },
);

export const deleteAndUpdate = transactionHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deleteId, update } = req.body;
    const parent = await blockService.deleteOnly(deleteId);
    let updated: BlockDoc = null;
    if (update) {
      updated = await blockService.update(update.blockId, update);
    }
    res.locals.result = { parent, updated };
    next();
  },
);
