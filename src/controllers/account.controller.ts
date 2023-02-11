import { BaseHttpController, controller, httpGet, httpPost, request, requestParam } from 'inversify-express-utils';
import { Request } from 'express';
import { Types } from 'mongoose';
import TYPES from '../constants/types';
import { inject } from 'inversify';
import AccountService from '../services/account.service';
import { UserRole } from '../models/user.model';

@controller('/account')
export default class AccountController extends BaseHttpController {
  private accountService: AccountService;

  constructor(
    @inject(TYPES.Services.Account) accountService: AccountService,
  ) {
    super();
    this.accountService = accountService;
  }

  @httpPost('/admin/login')
  private async adminLogin(
    @request() req: Request,
  ) {
    try {
      const { username, password } = req.body;
      const authenticate = await this.accountService.loginUser(username.toLowerCase(), password);

      if (authenticate.user.role !== UserRole.ADMIN) {
        throw new Error('User Not Permitted');
      }

      return this.ok(authenticate);
    } catch (error: any) {
      return this.badRequest();
    }
  }

  @httpPost('/login')
  private async login(
    @request() req: Request,
  ) {
    try {
      const { username, password } = req.body;
      const authenticate = await this.accountService.loginUser(username.toLowerCase(), password);
      return this.ok(authenticate);
    } catch (error: any) {
      return this.badRequest();
    }
  }

  @httpPost('/logout')
  private async logout() {
    return this.ok();
  }

  @httpPost('/refresh')
  private async refresh(
    @request() req: Request,
  ) {
    try {
      const data = req.body
      const refreshToken = this.accountService.refreshToken(data);
      return this.ok(refreshToken);
    } catch (error: any) {
      return this.badRequest();
    }
  }

  @httpPost('/register')
  private async register(
    @request() req: Request,
  ) {
    try {
      const authenticate = await this.accountService.registerUser(req.body);
      return this.ok(authenticate);
    } catch (error: any) {
      return this.badRequest();
    }
  }
}
