import { injectable } from 'inversify';
import { Document } from 'mongoose';
import { User, userSchema } from '../models/user.model';
import Repository from './_repository';

/* istanbul ignore next */
@injectable()
export default class UserRepository extends Repository<User & Document> {
    public constructor() {
        super(
            'users',
            userSchema,
        );
    }
}
