/* eslint-disable import/no-unresolved */
import express from 'express';

// eslint-disable-next-line import/extensions
import IController from './Types/IController';

export default class App {
  public app: express.Application;

  public port: number;

  constructor(appData: {port: number, middlewares: any[], controllers: IController[]}) {
    this.app = express();
    this.port = appData.port;
    this.initMiddlewares(appData.middlewares);
    this.initRoutes(appData.controllers);
  }

  private initMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initRoutes(controllers: IController[]) {
    controllers.forEach((controller) => this.app.use(controller.path, controller.router));
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`listening on port ${this.port}`));
  }
}
