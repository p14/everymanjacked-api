import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import ExerciseService from '../services/exercise.service';
import { authMiddleware } from '../middleware/auth.middleware';

@controller('/exercises')
export default class ExerciseController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.Exercise) private exerciseService: ExerciseService,
  ) {
    super();
  }

  @httpGet('/')
  private getExercises() {
    try {
      const content = this.exerciseService.getExercises();
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPost('/', authMiddleware)
  private createExercise(
    @request() req: Request,
  ) {
    try {
      const content = this.exerciseService.createExercise(req.body);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpGet('/:id')
  private async getExercise(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = this.exerciseService.getExercise(id);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPut('/:id', authMiddleware)
  private updateExercise(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    return this.exerciseService.updateExercise(id, req.body);
  }

  @httpDelete('/:id', authMiddleware)
  private deleteExercise(
    @requestParam('id') id: Types.ObjectId,
  ) {
    return this.exerciseService.deleteExercise(id);
  }
}
