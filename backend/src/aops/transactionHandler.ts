import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

export const transactionHandler = (
  service: (req: Request, res: Response, next?: NextFunction) => Promise<any>,
) => async (
  req: Request,
  res: Response,
  next?: NextFunction,
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rtn = await service(req, res, next);
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
