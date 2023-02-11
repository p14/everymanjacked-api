import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import WorkoutService from '../services/workout.service';

@controller('/workouts')
export default class WorkoutController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.Workout) private workoutService: WorkoutService,
  ) {
    super();
  }

  @httpGet('/')
  private getWorkouts() {
    try {
      const content = this.workoutService.getWorkouts();
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPost('/')
  private createWorkout(
    @request() req: Request,
  ) {
    try {
      const content = this.workoutService.createWorkout(req.body);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpGet('/:id')
  private async getWorkout(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = this.workoutService.getWorkout(id);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPut('/:id')
  private updateWorkout(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    return this.workoutService.updateWorkout(id, req.body);
  }

  @httpDelete('/:id')
  private deleteWorkout(
    @requestParam('id') id: Types.ObjectId,
  ) {
    return this.workoutService.deleteWorkout(id);
  }
}
