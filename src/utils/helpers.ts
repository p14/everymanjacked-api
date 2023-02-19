import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { BaseExerciseCategory, Exercise } from '../models/exercise.model';

dotenv.config();

export const parseError = (error: any) => {
  let message = error.message;

  if (error.message.match(/E11000 duplicate key error/)) {
    const duplicateValue = error.message.match(/"([^']+)"/)[1];
    message = `${duplicateValue} already exists!`;
  }

  let parsedError = {
    ...error,
    message,
  }

  return parsedError;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let temporaryValue: any, randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const parseExerciseCategories = (data: string[]): string => {
  const parsedCategory = data.find((category) => {
    return category in BaseExerciseCategory;
  });

  if (parsedCategory) {
    return parsedCategory;
  }

  return '';
};

export const parseWorkout = (data: Exercise[]) => (
  data.map((exercise: any) => ({
    _id: exercise._id,
    title: exercise.title,
    categories: parseExerciseCategories(exercise.categories),
  }))
);
