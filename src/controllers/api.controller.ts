import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import TYPES from '../constants/types';

@controller(TYPES.Namespace.API)
export default class APIController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('/status-check')
  private statusCheck() {
    return this.ok('in Mae we trust');
  }
}
