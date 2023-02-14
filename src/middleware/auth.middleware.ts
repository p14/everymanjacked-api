import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, String(process.env.JWT_SECRET), (error: any, user: any) => {
    if (error) {
      console.error(error);
      return res.status(403);
    }

    // (req as any).user = user; // needed?

    next();
  });
};
