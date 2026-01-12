import { Router } from 'express';

export const authRouter = Router();

// POST /api/v1/auth/register
authRouter.post('/register', async (req, res) => {
  // TODO: Implement registration
  res.status(201).json({ token: '', user: null });
});

// POST /api/v1/auth/login
authRouter.post('/login', async (req, res) => {
  // TODO: Implement login
  res.json({ token: '', user: null });
});

// POST /api/v1/auth/logout
authRouter.post('/logout', async (req, res) => {
  // TODO: Implement logout (invalidate token)
  res.status(204).send();
});

// GET /api/v1/auth/me
authRouter.get('/me', async (req, res) => {
  // TODO: Get current user from token
  res.json({ user: null });
});
