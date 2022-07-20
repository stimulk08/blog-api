import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
// eslint-disable-next-line no-unused-vars
function errorMiddleware(error: HttpError, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res
    .status(status)
    .send({
      status,
      message,
    });
}

export default errorMiddleware;
