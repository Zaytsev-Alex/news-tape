import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const {serverApiAddress, dockerApiAddress} = config;
const serverUrl = `${serverApiAddress}/news`;
const dockerUrl = `${dockerApiAddress}/news`;

/**
 * Loads news data with given id
 * @param id article's id
 * @param useDockerAddress indicates if docker address should be used instead of api address
 * @param token user's auth token from next.js context
 * @returns {Promise}
 */
export default function loadNewsItem(id, useDockerAddress, token) {
    const url = `${useDockerAddress ? dockerUrl : serverUrl}/${id}`
    return restFetchWithToken(url, 'get', null, {}, token);
}
