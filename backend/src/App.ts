import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import createHttpError, { HttpError } from 'http-errors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import { config } from 'dotenv';

import webSocket from '@/socket';
import { StatusCode, ErrorMessage } from '@/aops';
import { connect } from '@/models';
import { apiRouter } from '@/routes';

config();

export class App {
  private app: Application;
  private sessionMiddleware: any;

  static bootstrap(port: number) {
    const app = new App();
    app.listen(port);
  }

  private constructor() {
    connect();

    this.app = express();
    this.sessionMiddleware = session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    });

    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandler();
  }

  private initMiddlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(this.sessionMiddleware);
    this.app.use(flash());
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
    const server = this.app
      .listen(port, () => console.log(`Express server listening at ${port}`))
      .on('error', (err) => console.error(err));
    webSocket(server, this.app, this.sessionMiddleware);
  }
}

export default App;
