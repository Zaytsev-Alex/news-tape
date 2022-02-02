import {restFetch} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const url              = `${serverApiAddress}/auth/sign-in`;

export default function signInUser(userData) {
    return restFetch(url, 'post', userData);
}
