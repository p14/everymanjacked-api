import { interfaces } from 'inversify-express-utils';
import { UserRole } from '../models/user.model';

export default class Principal implements interfaces.Principal {
    public details: any;

    public constructor(details: any) {
        this.details = details;
    }

    isAuthenticated(): Promise<boolean> {
        if (!this.details) {
            return Promise.resolve(false);
        }
        
        return Promise.resolve(this.details._id !== undefined);
    }

    isResourceOwner(resourceId: any): Promise<boolean> {
        if (!this.isAuthenticated()) {
            return Promise.resolve(false);
        }

        return Promise.resolve(resourceId === 1111);
    }

    isInRole(role: string): Promise<boolean> {
        if (!this.isAuthenticated()) {
            return Promise.resolve(false);
        }

        return Promise.resolve(role === UserRole.ADMIN);
    }
}
