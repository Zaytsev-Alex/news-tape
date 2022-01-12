/**
 * Generates action type on pending stage action
 * @param {string} type Common action type.
 * @return {string} Action type.
 */
export function getPendingAsyncActionType(type) {
    return `${type}/pending`;
}

/**
 * Generates action type on fulfilled stage action
 * @param {string} type Common action type.
 * @return {string} Action type.
 */
export function getFulfilledAsyncActionType(type) {
    return `${type}/fulfilled`;
}

/**
 * Generates action type on rejected stage action
 * @param {string} type Common action type.
 * @return {string} Action type.
 */
export function getRejectedAsyncActionType(type) {
    return `${type}/rejected`;
}

