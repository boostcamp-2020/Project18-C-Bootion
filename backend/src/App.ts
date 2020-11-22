import express from 'express';
import logger from 'morgan';
import { config } from 'dotenv';
import createError from 'http-errors';
import { connect, UserModel } from './schemas';

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
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        const user = await new UserModel({
          id: 'domino',
          name: 'namjin',
          password: 'pass',
        });
        await user.save();
        res.json(user);
      },
    );

    this.app.use(function (req, res, next) {
      next(createError(404));
    });
  }
}

export default App;
