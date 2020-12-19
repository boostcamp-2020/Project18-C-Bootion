import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import createHttpError, { HttpError } from 'http-errors';

import { connect } from '@/models';
import { apiRouter } from '@/routes';
import { StatusCode, ErrorMessage } from '@/aops';

export class App {
  private app: Application;

  static bootstrap(port: number) {
    const app = new App();
    app.listen(port);
  }

  private constructor() {
    connect();

    this.app = express();

    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandler();
  }

  private initMiddlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initRouters() {
    this.app.use('/api', apiRouter);
  }

  private initErrorHandler() {
    this.app.use((req, res, next) =>
      next(createHttpError(StatusCode.NOT_FOUND, ErrorMessage.NOT_FOUND)),
    );

    this.app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const { status, message } = err;
        res.status(status).json({ error: 1, message });
      },
    );
  }

  private listen(port: number): void {
    this.app
      .listen(port, () => console.log(`Express server listening at ${port}`))
      .on('error', (err) => console.error(err));
  }
}

export default App;
