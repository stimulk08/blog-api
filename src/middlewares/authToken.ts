import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../Types/RequestWithUsername';
import { checkAccessToken } from '../services/jwt';

function authToken(req: RequestWithUser, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  try {
    const username = checkAccessToken(token);
    req.username = username as string;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}

export default authToken;
