import { model, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  firstName: string
  lastName: string
  username: string
  password: string
  role: UserRole
  description: string
  workouts: Schema.Types.ObjectId[]
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
    required: true,
  },
  description: {
    type: String,
    maxLength: 160,
    required: true,
  },
  workouts: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
}

const UserModel = model('User', userSchema);
export default UserModel;
