export function extractUserName(user) {
    return user ? `${user.firstName} ${user.lastName}` : '';
}

export function convertDateTime(dateTime) {
    if (!dateTime) {
        return '';
    }
    return new Date(dateTime).toDateString();
}
