import {
  controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUser, UserService } from '../service/user';
import { Request } from 'express';
import TYPES from '../constant/types';

@controller('/user')
export class UserController extends BaseHttpController {

  constructor(
    @inject(TYPES.UserService) private userService: UserService
  ) {
    super()
  }

  @httpGet('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @httpGet('/:id')
  public async getUser(request: Request) {
    try {
      const content = this.userService.getUser(request.params.id);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPost('/')
  public newUser(request: Request): IUser {
    return this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}
