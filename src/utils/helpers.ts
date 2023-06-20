import * as dotenv from 'dotenv';
import { BaseExerciseCategory, Exercise } from '../models/exercise.model';

dotenv.config();

export const parseError = (error: any) => {
    let { message } = error;

    if (message.match(/E11000 duplicate key error/)) {
        const duplicateValue = message.match(/"([^']+)"/)[1];
        message = `${duplicateValue} already exists!`;
    }

    const parsedError = {
        ...error,
        message,
    };

    return parsedError;
};

export const parsedErrorMessage = (message: string) => {
    if (message.match(/E11000 duplicate key error/)) {
        const duplicateValue = (message.match(/"([^']+)"/) as string[])[1];
        return `${duplicateValue} already exists!`;
    }

    return message;
};

export const shuffle = (array: any[]) => {
    const newArray = [...array];
    let currentIndex = newArray.length;
    let temporaryValue: any;
    let randomIndex: number;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
};

const parseExerciseCategories = (data: string[]): string => {
    const parsedCategory = data.find((category) => category in BaseExerciseCategory);
    if (!parsedCategory) {
        return '';
    }
    return parsedCategory;
};

export const parseWorkout = (data: Exercise[]) => (
    data.map((exercise: any) => ({
        _id: exercise._id,
        title: exercise.title,
        categories: parseExerciseCategories(exercise.categories),
    }))
);
