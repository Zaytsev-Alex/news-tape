import {convertDateTime, extractUserName} from '../utils';

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

    describe('convertDateTime tests', () => {
        it('if no end date is given, should return empty string', () => {
            expect(convertDateTime()).toBe('');
        });

        it('if date is given, should return converted date', () => {
            const date = new Date();
            expect(convertDateTime(date)).toBe(date.toDateString());
        });
    });
});
