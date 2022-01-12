import React from 'react';
import {useSelector} from 'react-redux';
import RouterSwitch from './RouterSwitch';
import {BrowserRouter} from 'react-router-dom';

const RouterWrapper = () => {
    const store = useSelector((store) => store);
    return (
        <BrowserRouter>
            <RouterSwitch store={store}/>
        </BrowserRouter>
    );
};

export default RouterWrapper;
