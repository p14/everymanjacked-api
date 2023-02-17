import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.model';

dotenv.config();

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, String(process.env.JWT_SECRET), (error: any, user: any) => {
    if (error || user.role !== UserRole.ADMIN) {
      console.error(error);
      return res.sendStatus(403);
    }

    next();
  });
};

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ').pop();

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, String(process.env.JWT_SECRET), (error: any, user: any) => {
    if (error || !user) {
      console.error(error);
      return res.sendStatus(403);
    }
    
    req.body.user = user;
    next();
  });
};
