const TYPES = {
  MongoDBClient: Symbol.for('MongoDBClient'),
  User: Symbol.for('User'),
  UserService: Symbol.for('UserService'),
  Repositories: {
    Exercise: Symbol('ExerciseRepository'),
    Workout: Symbol('WorkoutRepository'),
  },
  Services: {
    Exercise: Symbol('ExerciseService'),
    Workout: Symbol('WorkoutService'),
  },
};

export default TYPES;
