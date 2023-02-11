import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';

@controller('/status-check')
export default class APIController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('/')
  private statusCheck() {
    return this.ok('in Mae we trust');
  }
}
