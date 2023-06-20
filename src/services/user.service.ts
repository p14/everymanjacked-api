import { inject, injectable } from 'inversify';
import { FilterQuery, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import TYPES from '../constants/ioc.types';
import { User } from '../models/user.model';
import UserRepository from '../repositories/user.repository';

dotenv.config();

@injectable()
export default class UserService {
    private userRepository: UserRepository;

    constructor(
        @inject(TYPES.Repositories.User) userRepository: UserRepository,
    ) {
        this.userRepository = userRepository;
    }

    private static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        return bcrypt.hash(password, salt);
    };

    private async comparePassword(id: Types.ObjectId, password: string) {
        const user = await this.userRepository.findById(id, 'password');
        return bcrypt.compare(password, user.password);
    }

    public async getUsers(query: FilterQuery<User> = {}) {
        return this.userRepository.find(query);
    }

    public async createUser(newUser: User) {
        const hashedPassword = await UserService.hashPassword(newUser.password);
        return this.userRepository.save({ ...newUser, password: hashedPassword });
    }

    public async getUser(id: Types.ObjectId) {
        return this.userRepository.findById(id);
    }

    public async updateUser(id: Types.ObjectId, userData: User) {
        const updatedUser = { ...userData };

        if (updatedUser.password) {
            updatedUser.password = await UserService.hashPassword(updatedUser.password);
        }

        await this.userRepository.findOneAndUpdate({ _id: id }, updatedUser);

        return this.getUser(id);
    }

    public async updateUserPassword(id: Types.ObjectId, oldPassword: string, newPassword: string) {
        const isValidPassword = await this.comparePassword(id, oldPassword);
        if (!isValidPassword) {
            throw new Error('Previous password is invalid.');
        }
        return this.updateUser(id, { password: newPassword } as User);
    }

    public async deleteUser(id: Types.ObjectId) {
        return this.userRepository.deleteOne(id);
    }
}
