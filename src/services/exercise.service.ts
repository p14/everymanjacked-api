import { inject, injectable } from 'inversify';
import { FilterQuery, Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import { Exercise } from '../models/exercise.model';
import ExerciseRepository from '../repositories/exercise.repository';

@injectable()
export default class ExerciseService {
    private exerciseRepository: ExerciseRepository;

    constructor(
        @inject(TYPES.Repositories.Exercise) exerciseRepository: ExerciseRepository,
    ) {
        this.exerciseRepository = exerciseRepository;
    }

    public async getExercises(query: FilterQuery<Exercise> = {}) {
        return this.exerciseRepository.find(query);
    }

    public async createExercise(newExercise: Exercise) {
        return this.exerciseRepository.save(newExercise);
    }

    public async getExercise(id: Types.ObjectId) {
        return this.exerciseRepository.findById(id);
    }

    public async updateExercise(id: Types.ObjectId, updatedExercise: Exercise) {
        await this.exerciseRepository.findOneAndUpdate({ _id: id }, updatedExercise);
        return this.getExercise(id)
    }

    public async deleteExercise(id: Types.ObjectId) {
        return this.exerciseRepository.deleteOne(id);
    }
}
