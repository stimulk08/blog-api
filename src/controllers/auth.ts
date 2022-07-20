import { hash } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { generateAccessToken } from '../services/jwt';
import User from '../models/user';
import IContoller from '../Types/IController';
import TokenData from '../Types/jwtData';

export default class AuthController implements IContoller {
  public readonly path = '/api/auth';

  public readonly router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/register`, AuthController.registration);
  }

  private static createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.ttl}`;
  }

  private static async registration(req: Request, res: Response) {
    const userData = req.body as User;
    const userExists = await User.findOne({ where: { username: userData.username } });
    if (userExists) { return res.status(409).send({ message: 'User already exists' }); }

    const hashedPassword = await hash(userData.password, 7);
    const user = await User.create({ ...userData, password: hashedPassword });
    user.password = '';

    const tokenData = generateAccessToken(user.username);
    res.setHeader('Set-Cookie', [AuthController.createCookie(tokenData)]);
    return res.status(201).send(user);
  }
}
