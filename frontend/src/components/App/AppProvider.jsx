import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import store, {persistor} from '../../store';
import AppLoader from '../common/AppLoader/AppLoader';
import './App.css';

function AppProvider() {
    return (
        <Provider store={store}>
            <PersistGate loading={AppLoader} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    );
}

export default AppProvider;
