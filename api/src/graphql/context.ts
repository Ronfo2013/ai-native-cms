import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface Context {
  req: Request;
  res: Response;
  userId?: string;
  userRole?: string;
}

export function createContext({ req, res }: { req: Request; res: Response }): Context {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        role: string;
      };
      return { req, res, userId: decoded.userId, userRole: decoded.role };
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return { req, res };
}
