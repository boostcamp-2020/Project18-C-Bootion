import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import createHttpError from 'http-errors';

import { connect } from '@/models';
import { apiRouter } from '@/routes';
import { StatusCode, ErrorMessage } from '@/middlewares';

export class App {
  public app: Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    connect();

    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use('/api', apiRouter);

    this.app.use((req, res, next) =>
      next(createHttpError(StatusCode.NOT_FOUND, ErrorMessage.NOT_FOUND)),
    );

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const { status, message } = err;
        res.status(status).json({ error: 1, message });
      },
    );
  }

  listen(port: number): void {
    this.app
      .listen(port, () => console.log(`Express server listening at ${port}`))
      .on('error', (err) => console.error(err));
  }
}

export default App;
