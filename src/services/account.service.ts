import { inject, injectable } from 'inversify';
import * as dotenv from 'dotenv';
import { Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import UserService from './user.service';
import WorkoutService from './workout.service';
import { User } from '../models/user.model';

dotenv.config();

@injectable()
export default class AccountService {
    private userService: UserService;

    private workoutService: WorkoutService;

    constructor(
        @inject(TYPES.Services.User) userService: UserService,
        @inject(TYPES.Services.Workout) workoutService: WorkoutService,
    ) {
        this.userService = userService;
        this.workoutService = workoutService;
    }

    public async getSessionUser(id: Types.ObjectId) {
        return this.userService.getUser(id);
    }

    public async updateSessionUser(userId: Types.ObjectId, userData: User) {
        const user = {
            firstName: userData.firstName,
            lastName: userData.lastName,
        };
        return this.userService.updateUser(userId, user as User);
    }

    public async getSessionUserWorkouts(id: Types.ObjectId) {
        return this.workoutService.getWorkouts({ userId: id });
    }

    // private async updateSessionUser(username: string) {
    //     const response = await this.userRepository.getModel().findOne({ username });
    //     if (!response) {
    //         throw new Error('Invalid username.');
    //     }
    //     return response;
    // }

    // private async updateSessionUserPassword(username: string) {
    //     const response = await this.userRepository.getModel().findOne({ username });
    //     if (!response) {
    //         throw new Error('Invalid username.');
    //     }
    //     return response;
    // }
}
