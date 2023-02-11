import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import TYPES from '../constants/types';
import UserService from './user.service';

dotenv.config();

@injectable()
export default class AccountService {
  private userService: UserService; // TODO: Change to User Repository

  constructor(
    @inject(TYPES.Services.User) userService: UserService,
  ) {
    this.userService = userService;
  }

  public async loginUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
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

  public async refreshToken(data: any) {
    if (!data.refreshToken) {
      throw new Error('No Refresh Token');
    }

    jwt.verify(data.refreshToken, String(process.env.JWT_SECRET), async (error: any, user: any) => {
      if (error) {
        throw new Error('Expired Refresh Token');
      }

      const payload = await this.userService.getUser(user._id);
      const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 3600 });
      const refresh = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 86400 });
    
      const AuthenticationResult = {
        AccessToken: token,
        RefreshToken: refresh,
      };

      return { AuthenticationResult, user: payload };
    });
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
