import React from 'react';
import SignInPage from './SignInPage';
import {useDispatch} from 'react-redux';
import createErrorCatchingAction from '../../../../actions/createErrorCatchingAction';
import signIn from '../../../../actions/user/signIn';

const SignInPageContainer = () => {
    const dispatch = useDispatch();

    function signInUser(userData) {
        createErrorCatchingAction(dispatch, signIn, userData);
    }

    return (
        <SignInPage signInUser={signInUser} />
    );
};

export default SignInPageContainer;
