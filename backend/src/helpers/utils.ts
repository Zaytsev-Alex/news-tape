import {User} from '../users/entities/user.entity';
import {IUserView} from '../users/interfaces/IUserView';

export function extractUserView(user: User): IUserView {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
    };
}
