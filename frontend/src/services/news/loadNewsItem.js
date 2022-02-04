import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const serverUrl        = `${serverApiAddress}/news`;

export default function loadNewsItem(id) {
    const url = `${serverUrl}/${id}`
    return restFetchWithToken(url, 'get');
}
