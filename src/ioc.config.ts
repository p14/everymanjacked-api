import { Container } from 'inversify';
import TYPES from './constants/ioc.types';

import * as Repositories from './repositories/_repositories';
import * as Services from './services/_services';

import './controllers/_controllers';
import AuthProvider from './providers/auth.provider';

// Load everything needed to the Container
const container = new Container();

// Config
container.bind<AuthProvider>(TYPES.AuthProvider).to(AuthProvider);

// Repositories
container.bind<Repositories.ExerciseRepository>(TYPES.Repositories.Exercise).to(Repositories.ExerciseRepository);
container.bind<Repositories.UserRepository>(TYPES.Repositories.User).to(Repositories.UserRepository);
container.bind<Repositories.WorkoutRepository>(TYPES.Repositories.Workout).to(Repositories.WorkoutRepository);

// Services
container.bind<Services.AccountService>(TYPES.Services.Account).to(Services.AccountService);
container.bind<Services.AuthService>(TYPES.Services.Auth).to(Services.AuthService);
container.bind<Services.ExerciseService>(TYPES.Services.Exercise).to(Services.ExerciseService);
container.bind<Services.UserService>(TYPES.Services.User).to(Services.UserService);
container.bind<Services.WorkoutService>(TYPES.Services.Workout).to(Services.WorkoutService);

export default container;
