export const PASSWORD_SECURITY_STATES = {
    DEFAULT: undefined,
    WEAK:    'weak',
    AVERAGE: 'average',
    STRONG:  'strong',
}

export function getPasswordStrength(password) {
    if (!password || !password.length) {
        return PASSWORD_SECURITY_STATES.DEFAULT;
    }

    const lengthCheck            = password.length >= 8;
    const lowerAndUpperCaseCheck = /[A-D]/.test(password) && /[a-d]/.test(password);
    const specialCharsCheck      = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/.test(password);
    const totalCheck             = lengthCheck + lowerAndUpperCaseCheck + specialCharsCheck;

    if (totalCheck === 0) {
        return PASSWORD_SECURITY_STATES.DEFAULT;
    }
    if (totalCheck === 1) {
        return PASSWORD_SECURITY_STATES.WEAK;
    }
    if (totalCheck === 2) {
        return PASSWORD_SECURITY_STATES.AVERAGE;
    }
    return PASSWORD_SECURITY_STATES.STRONG;
}

export function validateEmail(email) {
    return String(email || '')
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
