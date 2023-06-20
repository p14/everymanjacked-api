import { Schema } from 'mongoose';

export enum ExerciseCategory {
    CHEST = 'CHEST',
    BACK = 'BACK',
    ARMS = 'ARMS',
    SHOULDERS = 'SHOULDERS',
    LEGS = 'LEGS',
    PUSH = 'PUSH',
    PULL = 'PULL',
    UPPER = 'UPPER',
    LOWER = 'LOWER',
    HIIT = 'HIIT',
};

export const BaseExerciseCategory = {
    CHEST: ExerciseCategory.CHEST,
    BACK: ExerciseCategory.BACK,
    ARMS: ExerciseCategory.ARMS,
    SHOULDERS: ExerciseCategory.SHOULDERS,
    LEGS: ExerciseCategory.LEGS,
    HIIT: ExerciseCategory.HIIT,
};

// export enum BaseExerciseCategory {
//     CHEST = 'CHEST',
//     BACK = 'BACK',
//     ARMS = 'ARMS',
//     SHOULDERS = 'SHOULDERS',
//     LEGS = 'LEGS',
//     HIIT = 'HIIT',
// };

export interface Exercise {
    title: string
    categories: ExerciseCategory[]
};

export const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    categories: {
        type: [String],
        enum: ExerciseCategory,
        default: [],
        required: true,
    },
}, {
    id: false,
    timestamps: true,
});
