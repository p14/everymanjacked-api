import { Schema, Types } from 'mongoose';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
};

export interface User {
    firstName: string
    lastName: string
    username: string
    password: string
    role: UserRole
    // likedWorkouts: Types.ObjectId[]
    // likedRecipes: Types.ObjectId[]
    // workoutSchedule: any
    // mealSchedule: any
};

export const userSchema = new Schema({
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
}, {
    id: false,
    timestamps: true,
});

userSchema.methods.toJSON = function toJSONMethod() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
