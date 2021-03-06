import {createSlice} from '@reduxjs/toolkit';
import {SIGN_IN_FULFILLED, SIGN_UP_FULFILLED} from '../constants/actionTypes/auth';
import {resetUserToken} from '../helpers/tokenCookieHelper';

const userAuthSlice = createSlice(
    {
        name:          'user-auth',
        initialState:  {
            user: null
        },
        reducers:      {
            logout(store) {
                store.user = null;
                resetUserToken();
            }
        },
        extraReducers: {
            [SIGN_UP_FULFILLED]: (store, action) => {
                store.user = action.payload;
            },
            [SIGN_IN_FULFILLED]: (store, action) => {
                store.user = action.payload;
            }
        }
    }
);

export const {logout} = userAuthSlice.actions;
export default userAuthSlice.reducer;
