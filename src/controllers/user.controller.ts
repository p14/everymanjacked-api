import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller, requestParam, request,
  httpGet, httpPost, httpPut, httpDelete,
} from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import UserService from '../services/user.service';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware';
import ResponseController from './extensions/response.controller';
import WorkoutService from '../services/workout.service';

@controller(TYPES.Namespace.User, authMiddleware)
export default class UserController extends ResponseController {
    private userService: UserService;

    private workoutService: WorkoutService;

    constructor(
        @inject(TYPES.Services.User) userService: UserService,
        @inject(TYPES.Services.Workout) workoutService: WorkoutService,
    ) {
        super();
        this.userService = userService;
        this.workoutService = workoutService;
    }

    @httpGet('/', adminMiddleware)
    private async getUsers() {
        try {
            const content = await this.userService.getUsers();
            return content;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPost('/', adminMiddleware)
    private async createUser(
        @request() req: Request,
    ) {
        try {
            const content = await this.userService.createUser(req.body);
            return content;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpGet('/:id')
    private async getUser(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const content = await this.userService.getUser(id);
            return content;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPut('/:id')
    private async updateUser(
        @requestParam('id') id: Types.ObjectId,
        @request() req: Request,
    ) {
        try {
            const content = await this.userService.updateUser(id, req.body);
            return content;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpDelete('/:id')
    private async deleteUser(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const content = await this.userService.deleteUser(id);
            return content;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPut('/:id/update-password')
    private async updateUserPassword(
        @requestParam('id') id: Types.ObjectId,
        @request() req: Request,
    ) {
        try {
            const { oldPassword, newPassword } = req.body;
            await this.userService.updateUserPassword(id, oldPassword, newPassword);
            return this.noContent();
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpGet('/:id/workouts')
    private async getUserWorkouts(
        @requestParam('id') id: Types.ObjectId,
    ) {
        try {
            const content = await this.workoutService.getWorkouts({ userId: id });
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }
}
