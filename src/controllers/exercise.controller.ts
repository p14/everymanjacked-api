import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import { adminMiddleware } from '../middleware/auth.middleware';
import ExerciseService from '../services/exercise.service';
import { parsedErrorMessage } from '../utils/helpers';

@controller(TYPES.Namespace.Exercise)
export default class ExerciseController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.Exercise) private exerciseService: ExerciseService,
  ) {
    super();
  }

  @httpGet('/')
  private async getExercises() {
    try {
      const content = await this.exerciseService.getExercises();
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpPost('/', adminMiddleware)
  private async createExercise(
    @request() req: Request,
  ) {
    try {
      const content = await this.exerciseService.createExercise(req.body);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpGet('/:id')
  private async getExercise(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.exerciseService.getExercise(id);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpPut('/:id', adminMiddleware)
  private async updateExercise(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    try {
      const content = await this.exerciseService.updateExercise(id, req.body);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpDelete('/:id', adminMiddleware)
  private async deleteExercise(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.exerciseService.deleteExercise(id);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }
}
