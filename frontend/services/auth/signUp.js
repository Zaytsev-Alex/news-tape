import {restFetch} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const url              = `${serverApiAddress}/auth/sign-up`;

export default function signUpUser(userData) {
    return restFetch(url, 'post', userData);
}
