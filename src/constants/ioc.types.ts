const TYPES = {
    AuthMiddleware: Symbol('AuthMiddleware'),
    AuthProvider: Symbol('AuthProvider'),
    MongoDBClient: Symbol('MongoDBClient'),
    Repositories: {
        Exercise: Symbol('ExerciseRepository'),
        User: Symbol('UserRepository'),
        Workout: Symbol('WorkoutRepository'),
    },
    Services: {
        Account: Symbol('AccountService'),
        Auth: Symbol('AuthService'),
        Exercise: Symbol('ExerciseService'),
        User: Symbol('UserService'),
        Workout: Symbol('WorkoutService'),
    },
    Namespace: {
        Account: '/account',
        API: '/api',
        Auth: '/auth',
        Exercise: '/exercises',
        User: '/users',
        Workout: '/workouts',
    },
};

export default TYPES;
