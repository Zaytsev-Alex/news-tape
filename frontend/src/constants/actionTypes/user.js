import * as actionHelper from '../../helpers/actionHelper';

const PREFIX = 'USER_ACTIONS';

export const UPDATE_EDITOR_PERMISSIONS           = `${PREFIX}/UPDATE_EDITOR_PERMISSIONS`;
export const UPDATE_EDITOR_PERMISSIONS_FULFILLED = actionHelper.getFulfilledAsyncActionType(UPDATE_EDITOR_PERMISSIONS);
export const UPDATE_EDITOR_PERMISSIONS_REJECTED  = actionHelper.getRejectedAsyncActionType(UPDATE_EDITOR_PERMISSIONS);
export const UPDATE_EDITOR_PERMISSIONS_PENDING   = actionHelper.getPendingAsyncActionType(UPDATE_EDITOR_PERMISSIONS);
