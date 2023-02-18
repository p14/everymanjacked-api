import { inject, injectable } from 'inversify';
import WorkoutModel, { Categories, Workout } from '../models/workout.model';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import ExerciseService from './exercise.service';
import { WorkoutCategory } from '../models/workout.model';
import { Exercise, ExerciseCategory } from '../models/exercise.model';
import { parseExerciseCategories, parseWorkout, shuffle } from '../utils/helpers';

@injectable()
export default class WorkoutService {
  private Model = WorkoutModel;

  private exerciseService: ExerciseService;

  constructor(
    @inject(TYPES.Services.Exercise) exerciseService: ExerciseService,
  ) {
    this.exerciseService = exerciseService;
  }

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

  public async generateWorkout(workoutData: { category: Categories, length: number }) {
    const { category, length } = workoutData;
    const allExercises: Exercise[] = [];
    const filteredExercises: Exercise[] = [];

    if (category === WorkoutCategory.FULL_BODY) {
      const exerciseData = await this.exerciseService.getExercises(
        {},
        { createdAt: 0, updatedAt: 0, __v: 0 },
      ) as Exercise[];

      allExercises.push(...exerciseData);
    } else {
      const exerciseData = await this.exerciseService.getExercises(
        { categories: category },
        { createdAt: 0, updatedAt: 0, __v: 0 },
      ) as Exercise[];

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

      const shuffledExercises = [ ...shuffledPrimaryExercises, ...shuffledSecondaryExercises ];
      const workout = shuffledExercises.slice(0, length);
      return parseWorkout(workout);
    } else if (category === WorkoutCategory.HIIT) {
      const shuffledExercises: Exercise[] = shuffle(filteredExercises);
      const workout = shuffledExercises.slice(0, (length + 2));
      return parseWorkout(workout);
    } else {
      const shuffledExercises: Exercise[] = shuffle(filteredExercises);
      const workout = shuffledExercises.slice(0, length);
      return parseWorkout(workout);
    }
  }
}
