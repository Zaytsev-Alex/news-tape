import NewsViewerPageContainer from './NewsViewerPageContainer';
import {extractUserTokenFromContext} from '../../../helpers/tokenCookieHelper';
import loadNewsItemApiCall from '../../../services/news/loadNewsItem';

export default NewsViewerPageContainer;

export async function getServerSideProps(context) {
    let data = null;
    let errorMessage = null;

    const token = extractUserTokenFromContext(context);
    try {
        const request = await loadNewsItemApiCall(context.params.id, true, token);
        data = request.data;
    }
    catch (error) {
        errorMessage = error?.data?.message;
    }

    return {
        props: {data, errorMessage},
    }
}
