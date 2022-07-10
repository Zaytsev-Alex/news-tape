import React from 'react';
import SignUpPage from './SignUpPage';
import {useDispatch} from 'react-redux';
import createErrorCatchingAction from '../../actions/createErrorCatchingAction';
import signUp from '../../actions/auth/signUp';
import {useUserRedirect} from '../../helpers/routerHelper';
import {ROOT} from '../../constants/routerPaths';

const SignUpPageContainer = () => {
    const dispatch = useDispatch();

    useUserRedirect(true, ROOT);

    function signUpUser(userData) {
        createErrorCatchingAction(dispatch, signUp, userData);
    }

    return (
        <SignUpPage signUpUser={signUpUser} />
    );
};

export default SignUpPageContainer;
