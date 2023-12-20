import { config } from '@/config';
import { BadRequestError, IAuthPayload, NotAuthorizedError } from '@huynguyen-hl/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    try {
      if (!req.session?.jwt) {
        throw new NotAuthorizedError('Token is not available. Please login again.', 'GatewayService AuthMiddleware verifyUser() method.');
      }

      const payload: IAuthPayload = verify(req.session?.jwt, config.JWT_TOKEN) as IAuthPayload;
      req.currentUser = payload;

      next();
    } catch (error) {
      throw new NotAuthorizedError('Invalid token. Please login again.', 'GatewayService AuthMiddleware verifyUser() method.');
    }
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new BadRequestError('Token is required for this route.', 'GatewayService AuthMiddleware checkAuthentication() method.');
    }

    next();
  }
}