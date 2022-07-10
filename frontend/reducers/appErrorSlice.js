import {createSlice} from '@reduxjs/toolkit';

const appErrorSlice = createSlice(
    {
        name:         'application-error',
        initialState: {
            error:   '',
            isError: false,
        },
        reducers:     {
            setError(store, action) {
                store.isError = true;
                store.error   = action.payload;
            },
            clearError(store) {
                store.isError = false;
                store.error   = '';
            },
        },
    }
);

export const {setError, clearError} = appErrorSlice.actions;
export default appErrorSlice.reducer;
