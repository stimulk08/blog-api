import { Request, Response, Router } from 'express';
import User from '../models/user';
import IContoller from '../Types/IController';

export default class UserController implements IContoller {
  public readonly path = '/api/users';

  public readonly router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, UserController.getUsers);
    this.router.get(`${this.path}/:id`, UserController.getUser);
    this.router.post(this.path, UserController.createUser);
  }

  private static async getUsers(req: Request, res: Response) {
    const result = await User.findAll();
    res.status(200).json({ users: result });
  }

  private static async getUser(req: Request, res: Response) {
    const user = await User.findByPk(req.params.id);
    res.status(200).json({ user });
  }

  private static async createUser(req: Request, res: Response) {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).json(user);
  }
}
