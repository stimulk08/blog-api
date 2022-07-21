import { hash, compare } from 'bcrypt';
import { Request, Response, Router } from 'express';
import createHttpError from 'http-errors';
import expressAsyncHandler from 'express-async-handler';
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
    this.router.post(`${this.path}/register`, expressAsyncHandler(AuthController.registration));
    this.router.post(`${this.path}/login`, expressAsyncHandler(AuthController.login));
  }

  private static setCookie(res: Response, tokenData: TokenData) {
    res.cookie('access_token', tokenData.token, {
      httpOnly: true,
      maxAge: tokenData.ttl,
    });
  }

  private static async registration(req: Request, res: Response) {
    const userData = req.body as User;
    const userExists = await User.findOne({ where: { username: userData.username } });
    if (userExists) throw createHttpError(409, 'User already exists');

    const hashedPassword = await hash(userData.password, 7);
    const user = await User.create({ ...userData, password: hashedPassword });
    user.password = '';

    const tokenData = generateAccessToken({ username: user.username });
    AuthController.setCookie(res, tokenData);
    res.status(201).send(user);
  }

  private static async login(req: Request, res: Response) {
    const userData = req.body as User;
    console.log(userData);
    const user = await User.findOne({ where: { username: userData.username } });
    if (!user) throw createHttpError(404, 'User not found');

    const isPasswordMatching = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw createHttpError(403, 'Wrong password');

    user.password = '';
    const tokenData = generateAccessToken({ username: user.username });
    AuthController.setCookie(res, tokenData);
    res.status(200).send(user);
  }
}
