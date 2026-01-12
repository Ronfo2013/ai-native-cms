import { Router } from 'express';
import { postsRouter } from './routes/posts';
import { pagesRouter } from './routes/pages';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { aiRouter } from './routes/ai';

export const restRoutes = Router();

restRoutes.use('/posts', postsRouter);
restRoutes.use('/pages', pagesRouter);
restRoutes.use('/users', usersRouter);
restRoutes.use('/auth', authRouter);
restRoutes.use('/ai', aiRouter);
