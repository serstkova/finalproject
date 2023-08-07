import { Request, Response, NextFunction } from 'express';

const timeout = (_req: Request, _res: Response, next: NextFunction) => {
  setTimeout(() => next(), 500);
};

export default timeout;
