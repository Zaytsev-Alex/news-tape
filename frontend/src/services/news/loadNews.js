import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const url              = `${serverApiAddress}/news/find`;

export default function loadNews(criteria) {
    return restFetchWithToken(url, 'post', criteria);
}
