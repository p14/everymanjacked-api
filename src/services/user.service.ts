import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import TYPES from '../constants/types';
import UserModel, { User } from '../models/user.model';
import { hashPassword } from '../utils/helpers';

dotenv.config();

@injectable()
export default class UserService {
  private userRepository = UserModel;

  constructor(
    // @inject(TYPES.Repositories.User) userRepository: typeof UserModel,
  ) {
    // this.userRepository = userRepository;
  }

  static async comparePassword(id: Types.ObjectId, password: string) {
    const user = await UserModel.findById(id, 'password');
    if (!user) {
      throw new Error('User Not Found');
    }
    return bcrypt.compare(password, user.password);
  }

  public async getUsers() {
    const users = await this.userRepository.find({}, '-password');
    return users;
  }

  public async createUser(newUser: User) {
    const hash = await hashPassword(newUser.password);
    const data = await this.userRepository.create({ ...newUser, password: hash });
    const user = data.toJSON();
    return user;
  }

  public async getUser(id: Types.ObjectId) {
    const data = await this.userRepository.findById(id);
    if (!data) {
      throw new Error('User Not Found');
    }
    const user = data.toJSON();
    return user;
  }

  public async getUserByUsername(username: string) {
    const data = await this.userRepository.findOne({ username });
    if (!data) {
      throw new Error('User Not Found');
    }
    return data;
  }

  public async updateUser(id: Types.ObjectId, updatedUser: User) {
    if (updatedUser.password) {
      const hash = await hashPassword(updatedUser.password);
      updatedUser.password = hash;
    }

    const data = await this.userRepository.findByIdAndUpdate(
      id,
      { ...updatedUser },
      { new: true, runValidators: true },
    );

    if (!data) {
      throw new Error('User Not Found');
    }

    const user = data.toJSON();
    return user;
  }

  public async updateUserPassword(id: Types.ObjectId, oldPassword: string, newPassword: string) {
    const isValidPassword = await UserService.comparePassword(id, oldPassword);
    if (!isValidPassword) {
      throw new Error('Old Password Invalid');
    }
    return this.updateUser(id, { password: newPassword } as User);
  }

  public async deleteUser(id: Types.ObjectId) {
    const data = await this.userRepository.deleteOne({ _id: id });
    if (!data.acknowledged) {
      throw new Error('User Not Found');
    }
    return data;
  }
}
