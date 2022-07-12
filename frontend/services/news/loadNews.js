import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const {serverApiAddress, dockerApiAddress} = config;
const url = `${serverApiAddress}/news/find`;
const dockerUrl = `${dockerApiAddress}/news/find`;

/**
 * Loads list of news
 * @param criteria search criteria
 * @param useDockerAddress indicates if docker address should be used instead of api address
 * @param token user's auth token from next.js context
 * @returns {Promise}
 */
export default function loadNews(criteria, useDockerAddress = false, token) {
    return restFetchWithToken(useDockerAddress ? dockerUrl : url, 'post', criteria, {}, token);
}
