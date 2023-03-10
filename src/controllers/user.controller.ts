import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController, requestParam, request } from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import UserService from '../services/user.service';
import { adminMiddleware } from '../middleware/auth.middleware';
import { parsedErrorMessage } from '../utils/helpers';

@controller(TYPES.Namespace.User, adminMiddleware)
export default class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.Services.User) private userService: UserService,
  ) {
    super();
  }

  @httpGet('/')
  private async getUsers() {
    try {
      const content = await this.userService.getUsers();
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpPost('/')
  private async createUser(
    @request() req: Request,
  ) {
    try {
      const content = await this.userService.createUser(req.body);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpGet('/:id')
  private async getUser(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.userService.getUser(id);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpPut('/:id')
  private async updateUser(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    try {
      const content = await this.userService.updateUser(id, req.body);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpDelete('/:id')
  private async deleteUser(
    @requestParam('id') id: Types.ObjectId,
  ) {
    try {
      const content = await this.userService.deleteUser(id);
      return content;
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }

  @httpPut('/:id/update-password')
  private async updateUserPassword(
    @requestParam('id') id: Types.ObjectId,
    @request() req: Request,
  ) {
    try {
      const { oldPassword, newPassword } = req.body;
      const content = await this.userService.updateUserPassword(id, oldPassword, newPassword);
      return this.ok(content);
    } catch (error: any) {
      const message = parsedErrorMessage(error);
      return this.badRequest(message);
    }
  }
}
