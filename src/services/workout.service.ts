import { inject, injectable } from 'inversify';
import WorkoutModel, { Workout } from '../models/workout.model';
import TYPES from '../constants/types';
import { Types } from 'mongoose';

@injectable()
export default class WorkoutService {
  private workoutRepository = WorkoutModel;

  constructor(
    // @inject(TYPES.Repositories.Workout) workoutRepository: typeof WorkoutModel,
  ) {
    // this.workoutRepository = workoutRepository;
  }

  public async getWorkouts() {
    const workouts = await WorkoutModel.find();
    return workouts;
  }

  public async createWorkout(newWorkout: Workout) {
    const workout = await this.workoutRepository.create(newWorkout);
    return workout;
  }

  public async getWorkout(id: Types.ObjectId) {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new Error('Workout Not Found');
    }
    return workout;
  }

  public async updateWorkout(id: Types.ObjectId, updatedWorkout: Workout) {
    const workout = await this.workoutRepository.findByIdAndUpdate(id, updatedWorkout, { new: true, runValidators: true });
    if (!workout) {
      throw new Error('Workout Not Found');
    }
    return workout;
  }

  public async deleteWorkout(id: Types.ObjectId) {
    const data = await WorkoutModel.deleteOne({ _id: id });
    if (!data.acknowledged) {
      throw new Error('Workout Not Found');
    }
    return data;
  }
}
