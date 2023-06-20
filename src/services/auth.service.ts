import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserService from './user.service';
import TYPES from '../constants/ioc.types';
import { UserRole } from '../models/user.model';

dotenv.config();

@injectable()
export default class AuthService {
    private userService: UserService;

    constructor(
        @inject(TYPES.Services.User) userService: UserService,
    ) {
        this.userService = userService;
    }

    public async getUser(bearerToken: string) {
        try {
            const token = bearerToken.replace(/^Bearer\s/, '');
            const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
            const user = await this.userService.getUser(decodedToken._id);

            return {
                ...decodedToken,
                ...user,
            };
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    private async getUserByUsername(username: string) {
        const [response] = await this.userService.getUsers({ username });
        if (!response) {
            throw new Error('Invalid username.');
        }
        return response;
    }

    public async loginAdminUser(username: string, password: string) {
        const user = await this.getUserByUsername(username.toLowerCase());

        if (user.role !== UserRole.ADMIN) {
            throw new Error('User Not Permitted');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Invalid Password');
        }

        const payload = user.toJSON();
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
        const refresh = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 86400 });

        const AuthenticationResult = {
            AccessToken: token,
            RefreshToken: refresh,
        };

        return { AuthenticationResult, user: payload };
    }

    public async loginUser(username: string, password: string) {
        const user = await this.getUserByUsername(username.toLowerCase());
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Invalid Password');
        }

        const payload = user.toJSON();
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
        const refresh = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 86400 });

        const AuthenticationResult = {
            AccessToken: token,
            RefreshToken: refresh,
        };

        return { AuthenticationResult, user: payload };
    }

    public async refreshToken(data: { refreshToken: string }) {
        if (!data.refreshToken) {
            throw new Error('No Refresh Token');
        }

        try {
            const decodedToken = jwt.verify(data.refreshToken, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
            const payload = await this.userService.getUser(decodedToken._id);
            const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
            const refresh = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 86400 });

            const AuthenticationResult = {
                AccessToken: token,
                RefreshToken: refresh,
            };

            return { AuthenticationResult, user: payload };
        } catch (error) {
            throw new Error('Expired Refresh Token');
        }
    }

    public async registerUser(newUser: any) {
        const user = {
            ...newUser,
            username: newUser.username.toLowerCase(),
        };

        await this.userService.createUser(user);
        return this.loginUser(user.username, user.password);
    }
}
