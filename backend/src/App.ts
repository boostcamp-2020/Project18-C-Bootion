import express from 'express';
import logger from 'morgan';
import createError from 'http-errors';

import { connect, UserModel } from './schemas';

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
      '/api',
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          const user = await new UserModel({
            id: `domino-${parseInt(String(Math.random() * 1000))}`,
            name: 'namjin',
            password: 'pass',
          });
          await user.save();

          const users = await UserModel.find();
          res.json(users);
        } catch (e) {
          res.status(500).json(e);
        }
      },
    );

    this.app.use(function (req, res, next) {
      next(createError(404));
    });
  }
}

export default App;
