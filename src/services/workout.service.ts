import { inject, injectable } from 'inversify';
import { FilterQuery, Types } from 'mongoose';
import TYPES from '../constants/ioc.types';
import { Exercise, ExerciseCategory } from '../models/exercise.model';
import { Categories, Workout, WorkoutCategory } from '../models/workout.model';
import { parseWorkout, shuffle } from '../utils/helpers';
import WorkoutRepository from '../repositories/workout.repository';
import { ExerciseService } from './_services';

@injectable()
export default class WorkoutService {
    private workoutRepository: WorkoutRepository;

    private exerciseService: ExerciseService;

    constructor(
        @inject(TYPES.Repositories.Workout) workoutRepository: WorkoutRepository,
        @inject(TYPES.Services.Exercise) exerciseService: ExerciseService,
    ) {
        this.workoutRepository = workoutRepository;
        this.exerciseService = exerciseService;
    }

    private async assertWorkoutOwnership(userId: Types.ObjectId, workoutId: Types.ObjectId) {
        const currentWorkout = await this.getWorkout(workoutId);
        if (String(currentWorkout.userId) !== String(userId)) {
            throw new Error('This workout does not belong to you.');
        }
    }

    public async getWorkouts(query: FilterQuery<Workout> = {}) {
        return this.workoutRepository.find(query);
    }

    public async createWorkout(newWorkout: Workout) {
        return this.workoutRepository.save(newWorkout);
    }

    public async getWorkout(id: Types.ObjectId) {
        return this.workoutRepository.findById(id);
    }

    public async getWorkoutWithExercises(id: Types.ObjectId) {
        const workout = await this.getWorkout(id);
        const exercises = await this.exerciseService.getExercises({
            '_id': { $in: workout.exercises }
        });
        return { ...workout, exercises };
    }

    public async updateWorkout(id: Types.ObjectId, userId: Types.ObjectId, workout: Workout) {
        await this.assertWorkoutOwnership(userId, id);
        return this.workoutRepository.findOneAndUpdate(
            { _id: id },
            {
                title: workout.title,
                category: workout.category,
                exercises: workout.exercises,
                userId,
            }
        );
    }

    public async deleteWorkout(id: Types.ObjectId, userId: Types.ObjectId) {
        await this.assertWorkoutOwnership(userId, id);
        return this.workoutRepository.deleteOne(id);
    }

    public async generateWorkout(workoutData: { category: Categories, length: number }) {
        const { category, length } = workoutData;
        const allExercises: Exercise[] = [];
        const filteredExercises: Exercise[] = [];

        if (category === WorkoutCategory.FULL_BODY) {
            const exerciseData: Exercise[] = await this.exerciseService.getExercises({});

            allExercises.push(...exerciseData);
        } else {
            const exerciseData: Exercise[] = await this.exerciseService.getExercises({ categories: category });

            allExercises.push(...exerciseData);
        }

        allExercises.forEach((exercise) => {
            if ((exercise.categories as Categories[]).includes(category)) {
                filteredExercises.push(exercise);
            }
        });

        if (category === WorkoutCategory.FULL_BODY) {
            const chestExercises: Exercise[] = [];
            const armExercises: Exercise[] = [];
            const shoulderExercises: Exercise[] = [];
            const backExercises: Exercise[] = [];
            const legExercises: Exercise[] = [];

            allExercises.forEach((exercise) => {
                if (exercise.categories.includes(ExerciseCategory.CHEST)) {
                    chestExercises.push(exercise);
                }

                if (exercise.categories.includes(ExerciseCategory.ARMS)) {
                    armExercises.push(exercise);
                }

                if (exercise.categories.includes(ExerciseCategory.SHOULDERS)) {
                    shoulderExercises.push(exercise);
                }

                if (exercise.categories.includes(ExerciseCategory.BACK)) {
                    backExercises.push(exercise);
                }

                if (exercise.categories.includes(ExerciseCategory.LEGS)) {
                    legExercises.push(exercise);
                }
            });

            const shuffledChestExercises: Exercise[] = shuffle(chestExercises);
            const shuffledArmExercises: Exercise[] = shuffle(armExercises);
            const shuffledShoulderExercises: Exercise[] = shuffle(shoulderExercises);
            const shuffledBackExercises: Exercise[] = shuffle(backExercises);
            const shuffledLegExercises: Exercise[] = shuffle(legExercises);

            const shuffledPrimaryExercises: Exercise[] = shuffle([
                shuffledChestExercises[0],
                shuffledArmExercises[0],
                shuffledShoulderExercises[0],
                shuffledBackExercises[0],
                shuffledLegExercises[0],
            ]);

            const shuffledSecondaryExercises: Exercise[] = shuffle([
                shuffledChestExercises[1],
                shuffledArmExercises[1],
                shuffledShoulderExercises[1],
                shuffledBackExercises[1],
                shuffledLegExercises[1],
            ]);

            const shuffledExercises = [...shuffledPrimaryExercises, ...shuffledSecondaryExercises];
            const workout = shuffledExercises.slice(0, length);
            return parseWorkout(workout);
        }

        if (category === WorkoutCategory.HIIT) {
            const shuffledExercises: Exercise[] = shuffle(filteredExercises);
            const workout = shuffledExercises.slice(0, (length + 2));
            return parseWorkout(workout);
        }

        const shuffledExercises: Exercise[] = shuffle(filteredExercises);
        const workout = shuffledExercises.slice(0, length);
        return parseWorkout(workout);
    }
}
