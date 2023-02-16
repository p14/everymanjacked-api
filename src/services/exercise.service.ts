import { injectable } from 'inversify';
import ExerciseModel, { Exercise } from '../models/exercise.model';
import { Types } from 'mongoose';

@injectable()
export default class ExerciseService {
  protected Model = ExerciseModel;

  constructor() {}

  public async getExercises() {
    const exercises = await this.Model.find();
    return exercises;
  }

  public async createExercise(newExercise: Exercise) {
    const exercise = await this.Model.create(newExercise);
    return exercise;
  }

  public async getExercise(id: Types.ObjectId) {
    const exercise = await this.Model.findById(id);
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  }

  public async updateExercise(id: Types.ObjectId, updatedExercise: Exercise) {
    const exercise = await this.Model.findByIdAndUpdate(
      id,
      updatedExercise,
      { new: true, runValidators: true },
    );

    if (!exercise) {
      throw new Error('Exercise Not Found');
    }

    return exercise;
  }

  public async deleteExercise(id: Types.ObjectId) {
    const data = await this.Model.deleteOne({ _id: id });

    if (!data.acknowledged) {
      throw new Error('Exercise Not Found');
    }

    return data;
  }
}
