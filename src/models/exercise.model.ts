import { model, Schema } from 'mongoose';

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
}

export interface Exercise {
  title: string
  categories: ExerciseCategory[]
}

const exerciseSchema = new Schema({
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
  timestamps: true,
});

const ExerciseModel = model('Exercise', exerciseSchema);
export default ExerciseModel;
