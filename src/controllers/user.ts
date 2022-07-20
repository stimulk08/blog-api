import { Request, Response, Router } from 'express';
import User from '../models/user';
import IContoller from '../Types/IController';

export default class UserController implements IContoller {
  path = '/api/users';

  router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.getUsers);
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.post(this.path, this.createUser);
  }

  // eslint-disable-next-line class-methods-use-this
  private async getUsers(req: Request, res: Response) {
    const result = await User.findAll();
    res.status(200).json({ users: result });
  }

  // eslint-disable-next-line class-methods-use-this
  private async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).json({ user });
  }

  // eslint-disable-next-line class-methods-use-this
  private async createUser(req: Request, res: Response) {
    let newUser = req.body;
    const result = await User.create(newUser);
    newUser = result.getDataValue('id') as User;
    res.status(201).json({ user: newUser });
  }
}
