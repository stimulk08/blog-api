import createHttpError from 'http-errors';
import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user';
import IContoller from '../Types/IController';

export default class UserController implements IContoller {
  public readonly path = '/api/users';

  public readonly router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, expressAsyncHandler(UserController.getUsers));
    this.router.get(`${this.path}/:id`, expressAsyncHandler(UserController.getUser));
  }

  private static async getUsers(req: Request, res: Response) {
    const result = await User.findAll();
    res.status(200).json({ users: result });
  }

  private static async getUser(req: Request, res: Response) {
    const user = await User.findByPk(req.params.id);
    if (!user) throw createHttpError(404, 'User not found');
    res.status(200).json({ user });
  }
}
