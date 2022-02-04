import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-rainbow-components';
import {Link} from 'react-router-dom';
import PageWrapper from '../../common/PageWrapper';
import {convertDateTime} from '../../../helpers/utils';
import {ROOT} from '../../../constants/routerPaths';
import './index.css';

const NewsViewerPage = ({newsData, requestingNewsNotFound}) => {

    function shouldNewsBeRndered() {
        return !!(newsData || requestingNewsNotFound);
    }

    return shouldNewsBeRndered() && (
        <PageWrapper className="content-center news-viewer">
            {requestingNewsNotFound ? (
                <Card className="news-viewer__not-found">
                    <h1>Requesting news cannot be found</h1>
                    <Link to={ROOT} className="link">
                        Go to home page
                    </Link>
                </Card>
            ) : (
                <Card
                    title={newsData.title}
                    footer={
                        <div className="rainbow-align-content_space-between">
                            {`Created on: ${convertDateTime(newsData.createdDate)}`}
                        </div>
                    }
                    className="news-viewer__article"
                >
                    <div className="news-viewer__article-content">
                        {newsData.content}
                    </div>
                </Card>
            )}
        </PageWrapper>
    );
};

NewsViewerPage.propTypes = {
    newsData:               PropTypes.object,
    requestingNewsNotFound: PropTypes.bool
};

export default NewsViewerPage;
