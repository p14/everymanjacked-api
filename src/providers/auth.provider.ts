import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import AuthService from '../services/auth.service';
import Principal from './principal.provider';
import container from '../ioc.config';
import TYPES from '../constants/ioc.types';

interface RouteType {
    [key: string]: string[]
    DELETE: string[]
    GET: string[]
    POST: string[]
    PUT: string[]
};

@injectable()
export default class AuthProvider implements interfaces.AuthProvider {
    private authService = container.get<AuthService>(TYPES.Services.Auth);

    private publicRoutes: RouteType = {
        DELETE: [],
        GET: [
            '/',
            '/api/status-check',
            '/api/generate-workout',
        ],
        POST: [
            '/auth/login',
            '/auth/register',
        ],
        PUT: [],
        OPTIONS: [
            '/',
            '/api/status-check',
            '/api/generate-workout',
            '/auth/login',
            '/auth/register',
        ],
    };
    
    public async getUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<interfaces.Principal> {
        const bearerToken = req.headers.authorization ?? '';
        let response = {};

        if (!this.publicRoutes[req.method].includes(req.path) && bearerToken) {
            response = await this.authService.getUser(bearerToken);
        }

        return new Principal({ ...response });
    }
}
