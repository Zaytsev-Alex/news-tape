import {createSelector} from '@reduxjs/toolkit';

export const selectSelf = (state) => state;

export const selectUserAuth    = (state) => state.auth;
export const selectApplication = (state) => state.application;

export const getUserData      = createSelector([selectUserAuth], (userAuth) => userAuth.user);
export const selectAppLoading = createSelector([selectApplication], (app) => app.loading);
export const selectAppError   = createSelector([selectApplication], (app) => app.error);

export const selectUserAuthToken = (storeState) => {
    return getUserData(storeState)?.token;
};
