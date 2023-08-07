import timeout from '../middleware/timeout';
import { users } from '../data';
import {
  addToken,
  removeToken,
  getTokenOwner,
  generateToken,
} from '../services/tokenManager';
import { Request, Response } from 'express';
import { ROUTES } from '../routes/routes';
import { router } from '../appRouter';

// if password and email is correct returns new token
router.get(ROUTES.LOGIN, timeout, (req: Request, res: Response) => {
  const { username, password } = req.query;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateToken();

    addToken(token, user.id);

    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    });

    return;
  }

  res.status(401).send();
});

// return token owner info
router.get(ROUTES.USER, (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (token) {
    const tokenOwnerId = getTokenOwner(token);

    if (tokenOwnerId) {
      const tokenOwner = users.find((user) => user.id === tokenOwnerId);

      res.status(200).json({
        id: tokenOwner?.id,
        username: tokenOwner?.username,
        email: tokenOwner?.email,
      });

      return;
    }
  }

  res.status(401).send();
});

export default router;
