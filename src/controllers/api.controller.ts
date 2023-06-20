import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request } from 'inversify-express-utils';
import TYPES from '../constants/ioc.types';
import { WorkoutService } from '../services/_services';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.API)
export default class APIController extends ResponseController {
    private workoutService: WorkoutService;

    constructor(
        @inject(TYPES.Services.Workout) workoutService: WorkoutService,
    ) {
        super();
        this.workoutService = workoutService;
    }

    @httpGet('/status-check')
    private statusCheck() {
        return this.ok('in Mae we trust');
    }

    @httpPost('/generate-workout')
    private async generateWorkout(
        @request() req: Request,
    ) {
        try {
            const content = await this.workoutService.generateWorkout(req.body);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }
}
