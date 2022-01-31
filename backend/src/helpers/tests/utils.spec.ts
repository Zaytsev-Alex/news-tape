import {extractUserView} from '../utils';

describe('utils tests', () => {
    describe('extractUserView', () => {
        const userMockObject = {
            id:           1,
            firstName:    'firstName',
            lastName:     'lastName',
            email:        'email@email.email',
            isAdmin:      false,
            password:     'password',
            hashPassword: () => {}
        };

        it('should extract user view from the given user object', () => {
            expect(extractUserView(userMockObject)).toEqual({
                id:        userMockObject.id,
                firstName: userMockObject.firstName,
                lastName:  userMockObject.lastName,
                email:     userMockObject.email,
                isAdmin:   userMockObject.isAdmin,
            });
        });
    });
});
