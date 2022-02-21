import {extractUserView} from '../utils';
import {User} from '../../users/entities/user.entity';

describe('utils tests', () => {
    describe('extractUserView', () => {
        const userMockObject = {
            ...new User(),
            id:         1,
            firstName: 'firstName',
            lastName:  'lastName',
            email:     'email@email.email',
            isAdmin:   false,
        };

        it('should extract user view from the given user object', () => {
            expect(extractUserView(userMockObject as User)).toEqual({
                id:        userMockObject.id,
                firstName: userMockObject.firstName,
                lastName:  userMockObject.lastName,
                email:     userMockObject.email,
                isAdmin:   userMockObject.isAdmin,
            });
        });
    });
});
