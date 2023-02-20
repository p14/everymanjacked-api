import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import WorkoutService from '../services/workout.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { parsedErrorMessage } from '../utils/helpers';

@controller(TYPES.Namespace.Workout)
export default class WorkoutController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.Workout) private workoutService: WorkoutService,
  ) {
    super();
  }

  @httpGet('/', authMiddleware)
  private async getWorkouts() {
    try {
      const content = await this.workoutService.getWorkouts();
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
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
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
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
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
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
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
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
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
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
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }
}
