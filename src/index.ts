import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import App from './app';
import loggerMiddleware from './middlewares/logger';
import { PORT } from './config';
import UserController from './controllers/user';
import database from './database';
import PostController from './controllers/post';
import AuthController from './controllers/auth';
import errorMiddleware from './middlewares/error';

const app = new App({
  port: Number(PORT),
  controllers: [
    new AuthController(),
    new PostController(),
    new UserController(),
  ],
  middlewares: [
    cookieParser(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    loggerMiddleware,
    errorMiddleware,
  ],
});

app.listen().then(() => {
  try {
    database
      .sync()
      .then(() => {
        console.log('Database successfully connected');
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
  } catch (err) { console.log(err); }
});
