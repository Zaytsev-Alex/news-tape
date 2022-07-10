import React from 'react';
import SignInPage from './SignInPage';
import {useDispatch} from 'react-redux';
import createErrorCatchingAction from '../../actions/createErrorCatchingAction';
import signIn from '../../actions/auth/signIn';
import {useUserRedirect} from '../../helpers/routerHelper';
import {ROOT} from '../../constants/routerPaths';

const SignInPageContainer = () => {
    const dispatch = useDispatch();

    useUserRedirect(true, ROOT);

    function signInUser(userData) {
        createErrorCatchingAction(dispatch, signIn, userData);
    }

    return (
        <SignInPage signInUser={signInUser} />
    );
};

export default SignInPageContainer;
