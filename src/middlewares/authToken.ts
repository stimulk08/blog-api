import { Request, Response, NextFunction } from 'express';
import { checkAccessToken } from '../services/jwt';

function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  if (req.cookies && req.cookies.Authorization) {
    try {
      checkAccessToken(req.cookies.Authorization);
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: 'Wrong access token' });
    }
  }
  return res.status(401).send({ message: 'Wrong access token' });
}

export default authTokenMiddleware;
