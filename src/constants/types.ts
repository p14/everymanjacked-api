const TYPES = {
  MongoDBClient: Symbol.for('MongoDBClient'),
  User: Symbol.for('User'),
  UserService: Symbol.for('UserService'),
  Repositories: {
    // Exercise: Symbol('ExerciseRepository'),
  },
  Services: {
    Exercise: Symbol('ExerciseService'),
  },
};

export default TYPES;
