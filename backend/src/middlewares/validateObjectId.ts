import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ErrorMessage, StatusCode } from '@/aops';
import createHttpError from 'http-errors';

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!Types.ObjectId.isValid(req.params?.id)) {
    next(createHttpError(StatusCode.NOT_FOUND, ErrorMessage.NOT_FOUND));
    return;
  }
  next();
};
