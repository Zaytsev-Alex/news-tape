import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import createRootReducer from '../reducers';

const store = configureStore(
    {
        reducer:    createRootReducer(),
        middleware: [
            ...getDefaultMiddleware(
                {
                    serializableCheck:
                        {
                            ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE]
                        }
                }
            )
        ],
        devTools:   process.env.NODE_ENV === 'development'
    }
);

const persistor = persistStore(store);

export {persistor};
export default store;
