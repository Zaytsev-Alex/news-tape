import React from 'react';
import {useSelector} from 'react-redux';
import AppLoader from './AppLoader';
import {selectAppLoading} from '../../helpers/storeHelper';

const AppLoaderContainer = () => {
    const isLoading = useSelector(selectAppLoading).loading;
    return isLoading && <AppLoader/>;
};

export default AppLoaderContainer;
