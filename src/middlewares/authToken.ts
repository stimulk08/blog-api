import { Request, Response, NextFunction } from 'express';
import { checkAccessToken } from '../services/jwt';

function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  console.log({ token });
  if (!token) return res.status(401).send({ message: 'Wrong access token' });
  try {
    checkAccessToken(req.cookies.Authorization);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: 'Wrong access token' });
  }
}

export default authTokenMiddleware;
