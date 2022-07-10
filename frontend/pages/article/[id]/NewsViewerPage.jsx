import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-rainbow-components';
import {convertDateTime} from '../../../helpers/utils';
import {ROOT} from '../../../constants/routerPaths';
import PageWrapper from '../../../components/PageWrapper';
import Link from 'next/link';
import MarkdownViewer from '../../../components/MarkdownViewer';
import styles from './styles.module.css';

const NewsViewerPage = ({newsData, requestingNewsNotFound}) => {

    function shouldNewsBeRendered() {
        return !!(newsData || requestingNewsNotFound);
    }

    return shouldNewsBeRendered() && (
        <PageWrapper className="content-center">
            {requestingNewsNotFound ? (
                <Card className={styles.newsViewerNotFound}>
                    <h1>Requesting news cannot be found</h1>
                    <Link href={ROOT}>
                        <a className="link">
                            Go to home page
                        </a>
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
                    className={styles.newsViewerArticle}
                >
                    <div className={styles.newsViewerArticleContent}>
                        <MarkdownViewer className={styles.newsMarkdownViewer}>
                            {newsData.content}
                        </MarkdownViewer>
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
