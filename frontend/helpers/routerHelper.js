import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import * as paths from '../constants/routerPaths';
import {getUserData} from './storeHelper';
import {useRouter} from 'next/router';

export default function requireAuth(userData, Component, needToBeUnauthorized = false, redirectTo = paths.ROOT) {
    if (!needToBeUnauthorized === !!userData) {
        return () => <Component/>;
    }
    return () => <Redirect to={redirectTo}/>;
}

export function useUserRedirect(needToBeUnauthorized = false, redirectTo = paths.ROOT) {
    const userData = useSelector(getUserData);
    const router   = useRouter()

    if (needToBeUnauthorized === !!userData) {
        router.replace(redirectTo);
    }
}
