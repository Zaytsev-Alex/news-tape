import {Redirect} from 'react-router-dom';
import * as paths from '../constants/routerPaths';

export default function requireAuth(userData, Component, needToBeUnauthorized = false, redirectTo = paths.ROOT) {
    if (!needToBeUnauthorized === !!userData) {
        return () => <Component/>;
    }
    return () => <Redirect to={redirectTo}/>;
}

