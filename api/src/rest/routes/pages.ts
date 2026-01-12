import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

export const pagesRouter = Router();

postsRouter.get('/', async (req, res) => {
  res.json({ pages: [] });
});

pagesRouter.get('/:id', async (req, res) => {
  res.json({ page: null });
});

pagesRouter.post('/', authenticate, async (req, res) => {
  res.status(201).json({ page: null });
});

pagesRouter.put('/:id', authenticate, async (req, res) => {
  res.json({ page: null });
});

pagesRouter.delete('/:id', authenticate, async (req, res) => {
  res.status(204).send();
});
