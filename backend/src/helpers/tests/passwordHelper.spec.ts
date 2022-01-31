import {comparePassword, getHashedPassword} from '../passwordHelper';

describe('passwordHelper tests', () => {
    const testingPassword = 'password';

    describe('hash password', () => {
        it('hashed password should be same as given to hash', () => {
            const hashedPassword = getHashedPassword(testingPassword);
            expect(hashedPassword).not.toBe(testingPassword);
        });
    });

    describe('compare password', () => {
        it('should return true if passwords are same', () => {
            const hashedPassword = getHashedPassword(testingPassword);
            expect(comparePassword(testingPassword, hashedPassword)).toBeTruthy();
        });

        it('should return false if passwords aren\'t  same', () => {
            const hashedPassword = getHashedPassword(`${testingPassword}${testingPassword}`);
            expect(comparePassword(testingPassword, hashedPassword)).toBeFalsy();
        });
    });
});
