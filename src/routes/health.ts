import { Health } from '@/controllers/health';
import express, { Router } from 'express';

class HealthRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/gateway-health', Health.prototype.health);
    return this.router;
  }
}

export const healthRouter: HealthRouter = new HealthRouter();