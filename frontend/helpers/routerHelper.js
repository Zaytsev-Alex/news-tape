import {useSelector} from 'react-redux';
import * as paths from '../constants/routerPaths';
import {getUserData} from './storeHelper';
import {useRouter} from 'next/router';

export function useUserRedirect(needToBeUnauthorized = false, redirectTo = paths.ROOT) {
    const userData = useSelector(getUserData);
    const router   = useRouter()

    if (needToBeUnauthorized === !!userData) {
        router.replace(redirectTo);
    }
}
