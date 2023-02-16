import { injectable } from 'inversify';
import WorkoutModel, { Workout } from '../models/workout.model';
import { Types } from 'mongoose';

@injectable()
export default class WorkoutService {
  private Model = WorkoutModel;

  constructor() {}

  public async getWorkouts() {
    const workouts = await this.Model.find();
    return workouts;
  }

  public async createWorkout(newWorkout: Workout) {
    const workout = await this.Model.create(newWorkout);
    return workout;
  }

  public async getWorkout(id: Types.ObjectId) {
    const workout = await this.Model.findById(id);

    if (!workout) {
      throw new Error('Workout Not Found');
    }

    return workout;
  }

  public async updateWorkout(id: Types.ObjectId, updatedWorkout: Workout) {
    const workout = await this.Model.findByIdAndUpdate(
      id,
      updatedWorkout,
      { new: true, runValidators: true },
    );

    if (!workout) {
      throw new Error('Workout Not Found');
    }

    return workout;
  }

  public async deleteWorkout(id: Types.ObjectId) {
    const data = await this.Model.deleteOne({ _id: id });

    if (!data.acknowledged) {
      throw new Error('Workout Not Found');
    }

    return data;
  }
}
