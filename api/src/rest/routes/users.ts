import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';

export const usersRouter = Router();

usersRouter.get('/', authenticate, authorize(['admin']), async (req, res) => {
  res.json({ users: [] });
});

usersRouter.get('/:id', authenticate, async (req, res) => {
  res.json({ user: null });
});

usersRouter.put('/:id', authenticate, async (req, res) => {
  res.json({ user: null });
});

usersRouter.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  res.status(204).send();
});
