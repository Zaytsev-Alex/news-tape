import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import SignUpPage from '../pages/auth/SignUp';
import SignInPage from '../pages/auth/SignIn';
import NotFoundPage from '../pages/NotFound';
import HomePage from '../pages/Home';
import EditorRequestsPage from '../pages/EditorRequests';
import {getUserData} from '../../helpers/storeHelper';
import requireAuth from '../../helpers/routerHelper';
import * as paths from '../../constants/routerPaths';

const RouterSwitch = ({store}) => {
    const userData = getUserData(store);

    return (
        <Switch>
            <Route path={paths.ROOT} exact>
                {requireAuth(userData, HomePage, false, paths.SIGN_UP)}
            </Route>
            <Route path={paths.EDITOR_REQUESTS} exact>
                {requireAuth(userData, EditorRequestsPage, false, paths.SIGN_UP)}
            </Route>
            <Route path={paths.SIGN_IN} exact>
                {requireAuth(userData, SignInPage, true)}
            </Route>
            <Route path={paths.SIGN_UP} exact>
                {requireAuth(userData, SignUpPage, true)}
            </Route>
            <Route>
                <NotFoundPage />
            </Route>
        </Switch>
    );
};

RouterSwitch.propTypes = {
    store: PropTypes.object, // Store state
};

export default RouterSwitch;
