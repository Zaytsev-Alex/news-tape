import {getPasswordStrength, PASSWORD_SECURITY_STATES, validateEmail} from '../validators';

describe('email validator', () => {
    test('name is required', () => {
        let emailToTest = '@gmail.com';
        expect(validateEmail(emailToTest)).toBeFalsy();
        emailToTest     = 'name@gmail.com';
        expect(validateEmail(emailToTest)).toBeTruthy();
    });

    test('@ symbol is required', () => {
        let emailToTest = 'name_gmail.com';
        expect(validateEmail(emailToTest)).toBeFalsy();
        emailToTest     = 'name@gmail.com';
        expect(validateEmail(emailToTest)).toBeTruthy();
    });

    test('domain name is required', () => {
        let emailToTest = 'name@.com';
        expect(validateEmail(emailToTest)).toBeFalsy();
        emailToTest     = 'name@gmail.com';
        expect(validateEmail(emailToTest)).toBeTruthy();
    });

    test('dot is required', () => {
        let emailToTest = 'name@gmailcom';
        expect(validateEmail(emailToTest)).toBeFalsy();
        emailToTest     = 'name@gmail.com';
        expect(validateEmail(emailToTest)).toBeTruthy();
    });

    test('domain is required', () => {
        let emailToTest = 'name@gmail.';
        expect(validateEmail(emailToTest)).toBeFalsy();
        emailToTest     = 'name@gmail.com';
        expect(validateEmail(emailToTest)).toBeTruthy();
    });

    test('when no email is passed, false should be returned', () => {
        expect(validateEmail()).toBeFalsy();
    });
});

describe('password strength checker', () => {
    test('when there isn\'t passed password, function should return default strength', () => {
        let password = undefined;
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.DEFAULT);
        password = '';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.DEFAULT);
    });

    test('when password doesn\'t have special chars, chars in both cases and length is less than 8, function should return default strength', () => {
        let password = '123456';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.DEFAULT);
        password     = 'asddsa';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.DEFAULT);
        password     = 'ASDAS';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.DEFAULT);
    });

    test('when password doesn\'t have special chars, chars in both cases, but length is more than 8 or equals 8, function should return weak strength', () => {
        let password = '12345678';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
        password     = 'aabbccdd';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
        password     = 'AABBCCDD';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
    });

    test('when password doesn\'t have special chars and length is less than 8, but includes chars in both cases, function should return weak strength', () => {
        let password = 'aaaAAA';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
        password = '11aaAA';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
    });

    test('when password doesn\'t have chars in both cases and length is less than 8, but includes special chars, function should return weak strength', () => {
        let password = 'aaa!@#';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
        password     = '11@@#';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.WEAK);
    });

    test('when password doesn\'t have special chars, but have chars in both cases and length is more than 8 or equals 8, function should return average strength', () => {
        let password = '12345678ABaa';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
        password     = 'aabbccddAACCDD';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
    });

    test('when password doesn\'t have chars in both cases, but have special chars and length is more than 8 or equals 8, function should return average strength', () => {
        let password = '12345678@#!';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
        password     = 'aabbccdd#@!#!@';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
    });

    test('when password length is less than 8, but password has chars in both cases and and special chars, function should return average strength', () => {
        let password = 'ASbc@!';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
        password     = '12aaBB@';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.AVERAGE);
    });

    test('when password has special chars, chars in both cases and length is more than 8 or equals 8, function should return strong strength', () => {
        let password = '12345678aaAB!@#';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.STRONG);
        password     = 'aabbccddAACCDD#@!';
        expect(getPasswordStrength(password)).toBe(PASSWORD_SECURITY_STATES.STRONG);
    });
});
