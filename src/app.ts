import express from 'express';
import IController from './Types/IController';

export default class App {
  public app: express.Application;

  public port: number;

  constructor(appData: {port: number, middlewares: any[], controllers: IController[]}) {
    this.app = express();
    this.port = appData.port;
    this.initRoutes(appData.controllers);
    this.initMiddlewares(appData.middlewares);
  }

  private initMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private initRoutes(controllers: IController[]) {
    controllers.forEach((controller) => this.app.use('/', controller.router));
  }

  public async listen() {
    this.app.listen(this.port, () => console.log(`listening on port ${this.port}`));
  }
}
