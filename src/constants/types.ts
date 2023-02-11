const TYPES = {
  MongoDBClient: Symbol('MongoDBClient'),
  Repositories: {
    Exercise: Symbol('ExerciseRepository'),
    User: Symbol('UserRepository'),
    Workout: Symbol('WorkoutRepository'),
  },
  Services: {
    Account: Symbol('AccountService'),
    Exercise: Symbol('ExerciseService'),
    User: Symbol('UserService'),
    Workout: Symbol('WorkoutService'),
  },
};

export default TYPES;
