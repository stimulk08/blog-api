import { Response, NextFunction } from 'express';
import { RequestWithUsername } from '../Types/RequestWithUsername';
import { checkAccessToken } from '../services/jwt';
import DataStoredInToken from '../Types/dataStoredInToken';

function authTokenMiddleware(req: RequestWithUsername, res: Response, next: NextFunction) {
  if (req.cookies && req.cookies.Authorization) {
    try {
      const { username } = checkAccessToken(req.cookies.Authorization) as DataStoredInToken;
      req.username = username;
      checkAccessToken(req.cookies.Authorization) as DataStoredInToken;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: 'Wrong access token' });
    }
  }
  return res.status(401).send({ message: 'Wrong access token' });
}

export default authTokenMiddleware;
