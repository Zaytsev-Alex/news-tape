import * as actionHelper from '../../helpers/actionHelper';

const PREFIX = 'NEWS_ACTIONS';

export const CREATE_NEWS           = `${PREFIX}/CREATE_NEWS`;
export const CREATE_NEWS_FULFILLED = actionHelper.getFulfilledAsyncActionType(CREATE_NEWS);
export const CREATE_NEWS_REJECTED  = actionHelper.getRejectedAsyncActionType(CREATE_NEWS);
export const CREATE_NEWS_PENDING   = actionHelper.getPendingAsyncActionType(CREATE_NEWS);
