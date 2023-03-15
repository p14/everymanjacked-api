import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '../constants/types';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.API)
export default class APIController extends ResponseController {
  constructor() {
    super();
  }

  @httpGet('/status-check')
  private statusCheck() {
    return this.ok('in Mae we trust');
  }
}
