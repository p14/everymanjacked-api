const TYPES = {
  MongoDBClient: Symbol('MongoDBClient'),
  User: Symbol('User'),
  Repositories: {
    Exercise: Symbol('ExerciseRepository'),
    User: Symbol('UserRepository'),
    Workout: Symbol('WorkoutRepository'),
  },
  Services: {
    Exercise: Symbol('ExerciseService'),
    User: Symbol('UserService'),
    Workout: Symbol('WorkoutService'),
  },
};

export default TYPES;
