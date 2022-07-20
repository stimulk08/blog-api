import { hash, compare } from 'bcrypt';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import createHttpError from 'http-errors';
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
    this.router.post(`${this.path}/login`, AuthController.login);
  }

  private static createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.ttl}`;
  }

  private static async registration(req: Request, res: Response, next: NextFunction) {
    const userData = req.body as User;
    const userExists = await User.findOne({ where: { username: userData.username } });
    if (userExists) { return next(createHttpError(409, 'User already exists')); }

    const hashedPassword = await hash(userData.password, 7);
    const user = await User.create({ ...userData, password: hashedPassword });
    user.password = '';

    const tokenData = generateAccessToken({ username: user.username });
    res.setHeader('Set-Cookie', [AuthController.createCookie(tokenData)]);
    return res.status(201).send(user);
  }

  private static async login(req: Request, res: Response, next: NextFunction) {
    const userData = req.body as User;
    const user = await User.findOne({ where: { username: userData.username } });
    if (user) {
      const isPasswordMatching = await compare(userData.password, user.password);
      if (isPasswordMatching) {
        user.password = '';
        const tokenData = generateAccessToken({ username: user.username });
        res.setHeader('Set-Cookie', [AuthController.createCookie(tokenData)]);
        return res.send(user);
      }
    }
    return next(createHttpError(403, 'Invalid credentials'));
  }
}
