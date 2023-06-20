import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller, requestParam, request,
  httpGet, httpPost, httpPut, httpDelete,
} from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import { adminMiddleware } from '../middleware/auth.middleware';
import ExerciseService from '../services/exercise.service';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.Exercise)
export default class ExerciseController extends ResponseController {
    private exerciseService: ExerciseService;

    constructor(
        @inject(TYPES.Services.Exercise) exerciseService: ExerciseService,
    ) {
        super();
        this.exerciseService = exerciseService;
    }

    @httpGet('/')
    private async getExercises() {
        try {
            const content = await this.exerciseService.getExercises();
            return content;
        } catch (error: any) {
            return this.handleError(error);
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
            return this.handleError(error);
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
            return this.handleError(error);
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
            return this.handleError(error);
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
            return this.handleError(error);
        }
    }
}
