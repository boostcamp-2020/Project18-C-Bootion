import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ErrorMessage, StatusCode } from '@/aops';
import createHttpError from 'http-errors';

export const validateObjectId = (...params: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  for (const param of params) {
    if (!Types.ObjectId.isValid(req.params?.[param])) {
      next(createHttpError(StatusCode.BAD_REQUEST, ErrorMessage.BAD_REQUEST));
      return;
    }
  }
  next();
};
