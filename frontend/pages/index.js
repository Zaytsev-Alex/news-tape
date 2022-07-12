import PropTypes from 'prop-types';
import PageWrapper from '../components/PageWrapper';
import NewsTape from '../components/NewsTape';
import {extractUserTokenFromContext} from '../helpers/tokenCookieHelper';
import loadNews from '../services/news/loadNews';
import {RECORDS_ON_PAGE} from '../constants/pagination';

export default function Home({data, errorMessage}) {
    return (
        <PageWrapper className="content-center">
            <NewsTape preloadedData={data} errorMessage={errorMessage}/>
        </PageWrapper>
    );
}

Home.propTypes = {
    data:         PropTypes.object,
    errorMessage: PropTypes.string,
}

export async function getServerSideProps(context) {
    let data = null;
    let errorMessage = null;

    const token = extractUserTokenFromContext(context);
    try {
        const request = await loadNews({take: RECORDS_ON_PAGE, page: 1}, true, token);
        data = request.data;
    }
    catch (error) {
        errorMessage = error?.data?.message;
    }

    return {
        props: {data, errorMessage},
    }
}
