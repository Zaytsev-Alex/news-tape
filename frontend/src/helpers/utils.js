export function extractUserName(user) {
    return user ? `${user.firstName} ${user.lastName}` : '';
}
