import * as express from 'express';
import * as logger from 'morgan';
import { config } from 'dotenv';
import * as createError from 'http-errors';
import { connect } from './schemas';
config();
export class App {
  public app: express.Application;

  /**
   * @ class App
   * @ method bootstrap
   * @ static
   *
   */
  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    connect();
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.get(
      '/',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        res.send('Hello world');
      },
    );
    this.app.use(function (req, res, next) {
      next(createError(404));
    });
  }
}

export default App;
