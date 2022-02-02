import {extractUserName} from '../utils';

describe('utils tests', () => {
    describe('extractUserName tests', () => {
        const userData = {
            id: 1,
            firstName: 'firstName',
            lastName:  'lastName',
            email:     'email@email.com',
            password:  'password'
        };

        it('should extract user\'s first and second names', () => {
            expect(extractUserName(userData)).toBe(`${userData.firstName} ${userData.lastName}`);
        });

        it('should return empty string when no user is given', () => {
            expect(extractUserName()).toBe('');
        });
    });
});
