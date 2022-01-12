import {createSlice} from '@reduxjs/toolkit';

const appLoadingSlice = createSlice(
    {
        name:         'loading',
        initialState: {
            loading:        false,
            pendingActions: [],
        },
        reducers:     {
            /**
             * Starts loading
             * @param store
             * @param action
             * @param {string} action.payload action type
             */
            startLoading(store, action) {
                if (action.payload) {
                    store.pendingActions = [...store.pendingActions, action.payload];
                }
                store.loading = true;
            },
            /**
             * Stops loading
             * @param store
             * @param action
             * @param {string} action.payload finished action type
             */
            stopLoading(store, action) {
                if (action.payload) {
                    const index          = [...store.pendingActions].indexOf(action.payload);
                    store.pendingActions = [...store.pendingActions.slice(0, index), ...store.pendingActions.slice(index + 1)];
                    if (!store.pendingActions.length) {
                        store.loading = false;
                    }
                }
                else {
                    store.loading = false;
                }
            }
        }
    }
);

export const {startLoading, stopLoading} = appLoadingSlice.actions;
export default appLoadingSlice.reducer;
