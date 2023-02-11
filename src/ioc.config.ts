import { Container } from 'inversify';
import TYPES from './constants/types';

import * as Services from './services/_services';

import './controllers/_controllers';

// Load everything needed to the Container
const container = new Container();

// Repositories

// Services
container.bind<Services.AccountService>(TYPES.Services.Account).to(Services.AccountService);
container.bind<Services.ExerciseService>(TYPES.Services.Exercise).to(Services.ExerciseService);
container.bind<Services.UserService>(TYPES.Services.User).to(Services.UserService);
container.bind<Services.WorkoutService>(TYPES.Services.Workout).to(Services.WorkoutService);

export default container;
