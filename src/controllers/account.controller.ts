import { Request } from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, request, httpGet } from 'inversify-express-utils';
import TYPES from '../constants/types';
import AccountService from '../services/account.service';
import { authMiddleware } from '../middleware/auth.middleware';

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
      const authenticate = await this.accountService.loginAdminUser(username, password);
      return this.ok(authenticate);
    } catch (error: any) {
      if (error.message) {
        return this.badRequest(error.message);
      }
      return this.internalServerError();
    }
  }

  @httpPost('/login')
  private async login(
    @request() req: Request,
  ) {
    try {
      const { username, password } = req.body;
      const authenticate = await this.accountService.loginUser(username, password);
      return this.ok(authenticate);
    } catch (error: any) {
      if (error.message) {
        return this.badRequest(error.message);
      }
      return this.internalServerError();
    }
  }

  @httpPost('/logout')
  private async logout() {
    return this.ok();
  }

  @httpGet('/me', authMiddleware)
  private async me(
    @request() req: Request,
  ) {
    try {
      const content = await this.accountService.me(req.body.user._id);
      return this.ok(content);
    } catch (error: any) {
      if (error.message) {
        return this.badRequest(error.message);
      }
      return this.internalServerError();
    }
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
      if (error.message) {
        return this.badRequest(error.message);
      }
      return this.internalServerError();
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
      if (error.message) {
        return this.badRequest(error.message);
      }
      return this.internalServerError();
    }
  }
}
