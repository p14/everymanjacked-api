const TYPES = {
  MongoDBClient: Symbol('MongoDBClient'),
  Services: {
    Account: Symbol('AccountService'),
    Exercise: Symbol('ExerciseService'),
    User: Symbol('UserService'),
    Workout: Symbol('WorkoutService'),
  },
  Namespace: {
    Account: '/account',
    API: '/api',
    Exercise: '/exercises',
    User: '/users',
    Workout: '/workouts',
  },
};

export default TYPES;
