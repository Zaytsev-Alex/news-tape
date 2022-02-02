import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const url              = `${serverApiAddress}/editor-requests`;

export default function loadEditorRequests(criteria) {
    return restFetchWithToken(url, 'post', criteria);
}
