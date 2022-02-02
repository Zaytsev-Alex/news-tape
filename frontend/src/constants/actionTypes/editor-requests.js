import * as actionHelper from '../../helpers/actionHelper';

const PREFIX = 'EDITOR_REQUESTS_ACTIONS';

export const LOAD_EDITOR_REQUESTS           = `${PREFIX}/LOAD_EDITOR_REQUESTS`;
export const LOAD_EDITOR_REQUESTS_FULFILLED = actionHelper.getFulfilledAsyncActionType(LOAD_EDITOR_REQUESTS);
export const LOAD_EDITOR_REQUESTS_REJECTED  = actionHelper.getRejectedAsyncActionType(LOAD_EDITOR_REQUESTS);
export const LOAD_EDITOR_REQUESTS_PENDING   = actionHelper.getPendingAsyncActionType(LOAD_EDITOR_REQUESTS);
