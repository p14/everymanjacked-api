import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller, requestParam, request,
  httpGet, httpPost, httpPut, httpDelete,
} from 'inversify-express-utils';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import UserService from '../services/user.service';
import { adminMiddleware } from '../middleware/auth.middleware';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.User, adminMiddleware)
export default class UserController extends ResponseController {
  private userService: UserService;

  constructor(
    @inject(TYPES.Services.User) userService: UserService,
  ) {
    super();
    this.userService = userService;
  }

  @httpGet('/')
  private async getUsers() {
    try {
      const content = await this.userService.getUsers();
      return content;
    } catch (error: any) {
      return this.handleError(error);
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
      return this.handleError(error);
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
      return this.handleError(error);
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
      return this.handleError(error);
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
      return this.handleError(error);
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
      return this.handleError(error);
    }
  }
}
