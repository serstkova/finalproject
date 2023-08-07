import { isTokenValid } from '../services/tokenManager';
import { Request, Response, NextFunction } from 'express';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (!token || !isTokenValid(token)) {
    res.status(401).send('Invalid token');
    return;
  }

  next();
};

export default authentication;
