import React from 'react';
import {Provider} from 'react-redux';
import './index.css';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../store';
import AppLoader from '../components/AppLoader';
import AppError from '../components/AppError';

export default function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <PersistGate loading={AppLoader} persistor={persistor}>
                <AppLoader/>
                <AppError/>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
