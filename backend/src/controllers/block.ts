import { NextFunction, Request, Response } from 'express';

import { blockService } from '@/services';
import { ErrorMessage, StatusCode, transactionHandler } from '@/aops';
import { BlockDoc, PageDoc } from '@/models';

export const create = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { block, parent, page } = !req.body.parent
      ? await blockService.createToPage({
          pageId: req.body.pageId,
          block: req.body.block,
          targetIndex: req.body.targetIndex,
        })
      : await blockService.createToBlock({
          parent: req.body.parent,
          block: req.body.block,
          targetIndex: req.body.targetIndex,
        });
    res.status(StatusCode.CREATED).json({ block, parent, page });
  },
);

export const updateOrRemove = transactionHandler(
  async (req: Request, res: Response): Promise<void> => {
    const params = {
      pageId: req.body.pageId, // 페이지로 옮길 때
      parent: req.body.parent, // 특정 블록으로 옮길 때
      block: req.body.block,
      targetIndex: req.body.targetIndex,
      remove: req.body.remove, // 삭제할 때
    };
    let block: BlockDoc = null,
      parent: BlockDoc | null = null,
      page: PageDoc | null = null;

    if (params.remove) {
      await blockService.remove(params.block);
      res.status(StatusCode.NO_CONTENT).json();
      return;
    }

    if (!params.pageId && !params.parent) {
      block = await blockService.updateBlock(params.block);
    } else if (params.pageId && !params.parent) {
      delete params.parent;
      [block, page] = await blockService.moveToPage(params);
    } else if (!params.pageId && params.parent) {
      [block, parent] = await blockService.moveToBlock(params);
    } else {
      throw new Error(ErrorMessage.BAD_REQUEST);
    }
    res.status(StatusCode.OK).json({ block, parent, page });
  },
);
