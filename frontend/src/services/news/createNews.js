import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const url              = `${serverApiAddress}/news`;

export default function createNews(body) {
    return restFetchWithToken(url, 'post', body);
}
