import { injectable } from 'inversify';
import { Document } from 'mongoose';
import { Exercise, exerciseSchema } from '../models/exercise.model';
import Repository from './_repository';

/* istanbul ignore next */
@injectable()
export default class ExerciseRepository extends Repository<Exercise & Document> {
    public constructor() {
        super(
            'exercises',
            exerciseSchema,
        );
    }
}
