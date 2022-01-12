import React from 'react';
import SignUpPage from './SignUpPage';
import createErrorCatchingAction from '../../../../actions/createErrorCatchingAction';
import {useDispatch} from 'react-redux';
import signUp from '../../../../actions/user/signUp';

const SignUpPageContainer = () => {
    const dispatch = useDispatch();

    function signUpUser(userData) {
        createErrorCatchingAction(dispatch, signUp, userData);
    }

    return (
        <SignUpPage signUpUser={signUpUser} />
    );
};

export default SignUpPageContainer;
