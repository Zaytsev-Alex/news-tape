import React from 'react';
import {useSelector} from 'react-redux';
import RouterSwitch from './RouterSwitch';
import {BrowserRouter} from 'react-router-dom';
import {selectSelf} from '../../helpers/storeHelper';

const RouterWrapper = () => {
    const store = useSelector(selectSelf);
    return (
        <BrowserRouter>
            <RouterSwitch store={store}/>
        </BrowserRouter>
    );
};

export default RouterWrapper;
