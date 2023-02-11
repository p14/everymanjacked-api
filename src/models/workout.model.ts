import { model, Schema } from 'mongoose';

export enum WorkoutCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  PUSH = 'PUSH',
  PULL = 'PULL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  FULL_BODY = 'FULL_BODY',
  HIIT = 'HIIT',
}

export interface Workout {
  title: string
  category: WorkoutCategory
  exercises: Schema.Types.ObjectId[]
}

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: WorkoutCategory,
    required: true,
  },
  exercises: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: true,
  },
}, {
  timestamps: true,
});

const WorkoutModel = model('Workout', workoutSchema);
export default WorkoutModel;
