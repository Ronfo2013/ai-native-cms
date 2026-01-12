import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

export const postsRouter = Router();

// GET /api/v1/posts - List all posts
postsRouter.get('/', async (req, res) => {
  // TODO: Implement
  res.json({ posts: [] });
});

// GET /api/v1/posts/:id - Get single post
postsRouter.get('/:id', async (req, res) => {
  // TODO: Implement
  res.json({ post: null });
});

// POST /api/v1/posts - Create new post
postsRouter.post('/', authenticate, async (req, res) => {
  // TODO: Implement
  res.status(201).json({ post: null });
});

// PUT /api/v1/posts/:id - Update post
postsRouter.put('/:id', authenticate, async (req, res) => {
  // TODO: Implement
  res.json({ post: null });
});

// DELETE /api/v1/posts/:id - Delete post
postsRouter.delete('/:id', authenticate, async (req, res) => {
  // TODO: Implement
  res.status(204).send();
});

// POST /api/v1/posts/:id/publish - Publish post
postsRouter.post('/:id/publish', authenticate, async (req, res) => {
  // TODO: Implement
  res.json({ post: null });
});
