import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller, requestParam, request,
  httpGet, httpPost, httpPut, httpDelete,
} from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import WorkoutService from '../services/workout.service';
import { authMiddleware } from '../middleware/auth.middleware';
import ResponseController from './extensions/response.controller';
import { Workout } from '../models/workout.model';

@controller(TYPES.Namespace.Workout, authMiddleware)
export default class WorkoutController extends ResponseController {
    private workoutService: WorkoutService;

    constructor(
        @inject(TYPES.Services.Workout) workoutService: WorkoutService,
    ) {
        super();
        this.workoutService = workoutService;
    }

    @httpGet('/')
    private async getWorkouts() {
        try {
            const content = await this.workoutService.getWorkouts();
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPost('/')
    private async createWorkout(
        @request() req: Request,
    ) {
        try {
            const { _id: userId }: { _id: Types.ObjectId } = this.httpContext.user.details;
            const content = await this.workoutService.createWorkout({ ...req.body, userId });
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpGet('/:id')
    private async getWorkout(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const content = await this.workoutService.getWorkout(id);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpGet('/:id/exercises')
    private async getWorkoutWithExercises(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const content = await this.workoutService.getWorkoutWithExercises(id);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPut('/:id')
    private async updateWorkout(
        @requestParam('id') id: Types.ObjectId,
        @request() req: Request,
    ) {
        try {
            const { _id: userId }: { _id: Types.ObjectId } = this.httpContext.user.details;
            const workout = { ...req.body };
            const content = await this.workoutService.updateWorkout(id, userId, workout);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpDelete('/:id')
    private async deleteWorkout(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const { _id: userId }: { _id: Types.ObjectId } = this.httpContext.user.details;
            const content = await this.workoutService.deleteWorkout(id, userId);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }
}
