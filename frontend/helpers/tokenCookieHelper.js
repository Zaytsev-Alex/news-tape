const TOKEN_COOKIE_KEY = 'user_token';
const TOKEN_LIFE_DAYS = 7;

export function setUserToken(value, days = TOKEN_LIFE_DAYS) {
    let expires = '';

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = `${TOKEN_COOKIE_KEY}=${value || ""}${expires}; path=/`;
}

export function resetUserToken() {
    setUserToken('');
}

export function extractUserTokenFromContext(context) {
    return context.req.cookies[TOKEN_COOKIE_KEY];
}
