// eslint-disable-next-line import/no-unresolved, import/extensions
import App from './app';

const app = new App({
  port: 5000,
  controllers: [],
  middlewares: [],
});

app.listen();
