import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller, requestParam, request,
  httpGet, httpPost, httpPut, httpDelete,
} from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import WorkoutService from '../services/workout.service';
import { authMiddleware } from '../middleware/auth.middleware';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.Workout)
export default class WorkoutController extends ResponseController {
  private workoutService: WorkoutService;

  constructor(
    @inject(TYPES.Services.Workout) workoutService: WorkoutService,
  ) {
    super();
    this.workoutService = workoutService;
  }

  @httpGet('/', authMiddleware)
  private async getWorkouts() {
    try {
      const content = await this.workoutService.getWorkouts();
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  @httpPost('/', authMiddleware)
  private async createWorkout(
    @request() req: Request,
  ) {
    try {
      const content = await this.workoutService.createWorkout(req.body);
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  @httpPost('/generate')
  private async generateWorkout(
    @request() req: Request,
  ) {
    try {
      const content = await this.workoutService.generateWorkout(req.body);
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  @httpGet('/:id', authMiddleware)
  private async getWorkout(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.workoutService.getWorkout(id);
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  @httpPut('/:id', authMiddleware)
  private async updateWorkout(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    try {
      const content = await this.workoutService.updateWorkout(id, req.body);
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  @httpDelete('/:id', authMiddleware)
  private async deleteWorkout(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.workoutService.deleteWorkout(id);
      return content;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
