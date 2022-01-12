import * as actionHelper from '../../helpers/actionHelper';

const PREFIX = 'USER_ACTIONS';

export const SIGN_UP           = `${PREFIX}/SIGN_UP`;
export const SIGN_UP_FULFILLED = actionHelper.getFulfilledAsyncActionType(SIGN_UP);
export const SIGN_UP_REJECTED  = actionHelper.getRejectedAsyncActionType(SIGN_UP);
export const SIGN_UP_PENDING   = actionHelper.getPendingAsyncActionType(SIGN_UP);

export const SIGN_IN           = `${PREFIX}/SIGN_IN`;
export const SIGN_IN_FULFILLED = actionHelper.getFulfilledAsyncActionType(SIGN_IN);
export const SIGN_IN_REJECTED  = actionHelper.getRejectedAsyncActionType(SIGN_IN);
export const SIGN_IN_PENDING   = actionHelper.getPendingAsyncActionType(SIGN_IN);
