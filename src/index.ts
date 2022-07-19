// eslint-disable-next-line import/no-unresolved, import/extensions
import * as bodyParser from 'body-parser';
import App from './app';
import loggerMiddleware from './middlewares/logger';
import PORT from './config';

const app = new App({
  port: Number(PORT),
  controllers: [],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    loggerMiddleware,
  ],
});

app.listen();
