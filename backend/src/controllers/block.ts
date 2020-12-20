import { Request, Response } from 'express';

import { blockService } from '@/services';
import { StatusCode, transactionHandler } from '@/aops';
import { BlockDoc } from '@/models';

export const readAll = async (req: Request, res: Response): Promise<void> => {
  const blocks = await blockService.readAll(req.params.pageId);
  const blockMap = blocks.reduce(
    (map: { [blockId: string]: BlockDoc }, block) => {
      map[block.id] = block;
      return map;
    },
    {},
  );
  (req.session as any).pageId = req.params.pageId;
  res.status(StatusCode.OK).json({ blockMap });
};

export const publish = async (req: Request, res: Response) => {
  const blocks = await blockService.readAll((req.session as any).pageId);
  const blockMap = blocks.reduce(
    (map: { [blockId: string]: BlockDoc }, block) => {
      map[block.id] = block;
      return map;
    },
    {},
  );
  req.app
    .get('io')
    .of('/page')
    .to((req.session as any).pageId)
    .emit('PageUpdate', blockMap);
  res.status(StatusCode.OK).json(res.locals.result);
};
