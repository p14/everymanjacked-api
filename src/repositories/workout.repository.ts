import { injectable } from 'inversify';
import { Document } from 'mongoose';
import { Workout, workoutSchema } from '../models/workout.model';
import Repository from './_repository';

/* istanbul ignore next */
@injectable()
export default class WorkoutRepository extends Repository<Workout & Document> {
    public constructor() {
        super(
            'workouts',
            workoutSchema,
        );
    }
}
