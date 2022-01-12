import React from 'react';
import {useSelector} from 'react-redux';
import {selectAppLoading} from '../../../helpers/storeHelper';
import AppLoader from './AppLoader';

const AppLoaderContainer = () => {
    const isLoading = useSelector(selectAppLoading).loading;
    return isLoading && <AppLoader/>;
};

export default AppLoaderContainer;
