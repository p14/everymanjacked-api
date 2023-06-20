import { inject } from 'inversify';
import TYPES from './ioc.types';

export const auth = inject(TYPES.Services.Auth);
