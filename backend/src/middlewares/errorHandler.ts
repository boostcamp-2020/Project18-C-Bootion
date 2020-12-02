import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
  BAD_REQUEST = 'Bad request',
  NOT_FOUND = 'Not found',
}

export const errorHandler = (controller: any): any => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    const status = StatusCode[err.message];
    next(
      createHttpError(status || StatusCode.INTERNAL_SERVER_ERROR, err.message),
    );
  }
};
