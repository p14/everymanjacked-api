import { inject, injectable } from 'inversify';
import ExerciseModel, { Exercise } from '../models/exercise.model';
import TYPES from '../constants/types';
import { Types } from 'mongoose';

@injectable()
export default class ExerciseService {
  private exerciseRepository = ExerciseModel;

  constructor(
    // @inject(TYPES.Repositories.Exercise) exerciseRepository: typeof ExerciseModel,
  ) {
    // this.exerciseRepository = exerciseRepository;
  }

  public async getExercises() {
    const exercises = await ExerciseModel.find();
    return exercises;
  }

  public async createExercise(newExercise: Exercise) {
    const exercise = await this.exerciseRepository.create(newExercise);
    return exercise;
  }

  public async getExercise(id: Types.ObjectId) {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  }

  public async updateExercise(id: Types.ObjectId, updatedExercise: Exercise) {
    const exercise = await this.exerciseRepository.findByIdAndUpdate(id, updatedExercise, { new: true, runValidators: true });
    if (!exercise) {
      throw new Error('Exercise Not Found');
    }
    return exercise;
  }

  public async deleteExercise(id: Types.ObjectId) {
    const data = await ExerciseModel.deleteOne({ _id: id });
    if (!data.acknowledged) {
      throw new Error('Exercise Not Found');
    }
    return data;
  }
}
