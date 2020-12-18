import { Request, Response } from 'express';

import { blockService } from '@/services';
import { StatusCode, transactionHandler } from '@/aops';
import { BlockDoc } from '@/models';

export const create = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { parent, block } = await blockService.create({
      parentId: req.params.parentId,
      index: req.body.index,
      blockDTO: req.body.block,
    });
    res.status(StatusCode.CREATED).json({ parent, block });
  },
);

export const readAll = async (req: Request, res: Response): Promise<void> => {
  const blocks = await blockService.readAll(req.params.pageId);
  const blockMap = blocks.reduce(
    (map: { [blockId: string]: BlockDoc }, block) => {
      map[block.id] = block;
      return map;
    },
    {},
  );
  res.status(StatusCode.OK).json({ blockMap });
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const block = await blockService.update(req.params.blockId, req.body.block);
  res.status(StatusCode.OK).json({ block });
};

export const move = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { block, from, to } = await blockService.move(
      req.params.blockId,
      req.params.toId,
      req.body.index,
    );
    res.status(StatusCode.OK).json({ block, from, to });
  },
);

export const deleteCascade = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parent = await blockService.deleteCascade(req.params.blockId);
    res.status(StatusCode.OK).json({ parent });
  },
);
