import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request: ${req.path}`);
  next();
};

export default loggerMiddleware;
