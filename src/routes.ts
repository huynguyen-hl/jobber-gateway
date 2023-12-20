import { Application } from 'express';
import { healthRouter } from './routes/health';

export function appRoutes(app: Application): void {
  app.use(healthRouter.routes());
}