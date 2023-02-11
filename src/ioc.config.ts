import { Container } from 'inversify';
import TYPES from './constants/types';

import * as Services from './services/_services';

import './controllers/_controllers';

// Load everything needed to the Container
const container = new Container();

// Repositories

// Services
container.bind<Services.ExerciseService>(TYPES.Services.Exercise).to(Services.ExerciseService);
container.bind<Services.UserService>(TYPES.UserService).to(Services.UserService);

export default container;
