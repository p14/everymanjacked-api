import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPut, request } from 'inversify-express-utils';
import TYPES from '../constants/ioc.types';
import AccountService from '../services/account.service';
import ResponseController from './extensions/response.controller';
import { Types } from 'mongoose';

@controller(TYPES.Namespace.Account)
export default class AccountController extends ResponseController {
    private accountService: AccountService;

    constructor(
        @inject(TYPES.Services.Account) accountService: AccountService,
    ) {
        super();
        this.accountService = accountService;
    }

    @httpGet('/')
    private async getSessionUser() {
        try {
            const { _id: userId }: { _id: Types.ObjectId } = this.httpContext.user.details;
            const content = await this.accountService.getSessionUser(userId);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPut('/')
    private async updateSessionUser(
        @request() req: Request,
    ) {
        try {
            const { _id: userId }: { _id: Types.ObjectId } =this.httpContext.user.details;
            const userData = req.body;
            const content = await this.accountService.updateSessionUser(userId, userData);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpGet('/workouts')
    private async getSessionUserWorkouts() {
        try {
            const { _id: userId }: { _id: Types.ObjectId } = this.httpContext.user.details;
            const content = await this.accountService.getSessionUserWorkouts(userId);
            return this.ok(content);
        } catch (error: any) {
            return this.handleError(error);
        }
    }
}
