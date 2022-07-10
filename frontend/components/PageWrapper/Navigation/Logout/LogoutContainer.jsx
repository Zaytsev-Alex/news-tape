import React from 'react';
import {useDispatch} from 'react-redux';
import Logout from './Logout';
import {logout} from '../../../../reducers/userAuthSlice';

const LogoutContainer = () => {
    const dispatch = useDispatch();

    function logoutUser() {
        dispatch(logout());
    }

    return (
        <Logout logoutUser={logoutUser} />
    );
};

export default LogoutContainer;
