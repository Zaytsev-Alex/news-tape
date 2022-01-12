import {createSlice} from '@reduxjs/toolkit';
import {SIGN_IN_FULFILLED, SIGN_UP_FULFILLED} from '../constants/actionTypes/user';

const userAuthSlice = createSlice(
    {
        name:          'user-auth',
        initialState:  {
            user: null
        },
        reducers:      {
            logout(store) {
                store.user = null;
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
