import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appErrorReducer from './appErrorSlice';
import appLoadingReducer from './appLoadingSlice';
import userAuthReducer from './userAuthSlice';

export const persistorConfig = {
    auth: {key: 'user-auth', storage: storage}
}

/**
 * Creates root reducer
 */
const createRootReducer = () => combineReducers(
    {
        auth:        persistReducer(persistorConfig.auth, userAuthReducer),
        application: combineReducers(
            {
                error:   appErrorReducer,
                loading: appLoadingReducer
            }
        )
    }
);

export default createRootReducer;
