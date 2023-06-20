import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request } from 'inversify-express-utils';
import TYPES from '../constants/ioc.types';
import AuthService from '../services/auth.service';
import ResponseController from './extensions/response.controller';

@controller(TYPES.Namespace.Auth)
export default class AuthController extends ResponseController {
    private authService: AuthService;

    constructor(
        @inject(TYPES.Services.Auth) authService: AuthService,
    ) {
        super();
        this.authService = authService;
    }

    @httpPost('/admin/login')
    private async adminLogin(
        @request() req: Request,
    ) {
        try {
            const { username, password } = req.body;
            const authenticate = await this.authService.loginAdminUser(username, password);
            return this.ok(authenticate);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPost('/login')
    private async login(
        @request() req: Request,
    ) {
        try {
            const { username, password } = req.body;
            const authenticate = await this.authService.loginUser(username, password);
            return this.ok(authenticate);
        } catch (error: any) {
            return this.handleError(error);
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
            const data = req.body;
            const refreshToken = await this.authService.refreshToken(data);
            return this.ok(refreshToken);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    @httpPost('/register')
    private async register(
        @request() req: Request,
    ) {
        try {
            const authenticate = await this.authService.registerUser(req.body);
            return this.ok(authenticate);
        } catch (error: any) {
            return this.handleError(error);
        }
    }
}
