import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController } from 'inversify-express-utils';
import UserService from '../services/user.service';
import TYPES from '../constants/types';

@controller('/user')
export default class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
  ) {
    super();
  }

  @httpGet('/')
  private getUsers() {
    return this.userService.getUsers();
  }

  @httpGet('/:id')
  private async getUser(request: Request) {
    try {
      const content = this.userService.getUser(request.params.id);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPost('/')
  private newUser(request: Request) {
    return this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  private updateUser(request: Request) {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  private deleteUser(request: Request) {
    return this.userService.deleteUser(request.params.id);
  }
}
