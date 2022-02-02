import {restFetchWithToken} from '../../helpers/apiHelper';
import config from '../../constants/config';

const serverApiAddress = config.serverApiAddress;
const endpointUrl      = `${serverApiAddress}/users`;

export default function updateEditorPermissions(requestId, body) {
    const url = `${endpointUrl}/${requestId}`
    return restFetchWithToken(url, 'PATCH', body);
}
