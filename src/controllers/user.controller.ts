import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import UserService from '../services/user.service';
import { adminMiddleware } from '../middleware/auth.middleware';

@controller(TYPES.Namespace.User, adminMiddleware)
export default class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.User) private userService: UserService,
  ) {
    super();
  }

  @httpGet('/')
  private getUsers() {
    try {
      const content = this.userService.getUsers();
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPost('/')
  private createUser(
    @request() req: Request,
  ) {
    try {
      const content = this.userService.createUser(req.body);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpGet('/:id')
  private async getUser(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = this.userService.getUser(id);
      return content;
    } catch (error: any) {
      return this.badRequest(error.message);
    }
  }

  @httpPut('/:id')
  private updateUser(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    return this.userService.updateUser(id, req.body);
  }

  @httpDelete('/:id')
  private deleteUser(
    @requestParam('id') id: Types.ObjectId,
  ) {
    return this.userService.deleteUser(id);
  }

  @httpPut('/:id/update-password')
  private async updateUserPassword(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    const { oldPassword, newPassword } = req.body;
    const result = await this.userService.updateUserPassword(id, oldPassword, newPassword);
    return this.ok(result);
  }
}
