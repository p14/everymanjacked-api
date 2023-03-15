import { BaseHttpController } from 'inversify-express-utils';
import { parsedErrorMessage } from '../../utils/helpers';

export default class ResponseController extends BaseHttpController {
  constructor() {
    super();
  }

  public handleError(error: Error) {
    if (error.message) {
      const message = parsedErrorMessage(error.message);
      return this.badRequest(message);
    }

    return this.internalServerError();
  }
}
