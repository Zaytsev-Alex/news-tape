import EditorRequestsPageContainer from './EditorRequestsPageContainer';
import {extractUserTokenFromContext} from '../../helpers/tokenCookieHelper';
import loadEditorRequestsApiCall from '../../services/editor-requests/loadEditorRequests';
import {RECORDS_ON_PAGE} from '../../constants/pagination';

export default EditorRequestsPageContainer;

export async function getServerSideProps(context) {
    let data = null;
    let errorMessage = null;

    const token = extractUserTokenFromContext(context);
    try {
        const request = await loadEditorRequestsApiCall({take: RECORDS_ON_PAGE, page: 1}, true, token);
        data = request.data;
    }
    catch (error) {
        errorMessage = error?.data?.message;
    }

    return {
        props: {data, errorMessage},
    }
}
