import React from 'react';
import {Card} from 'react-rainbow-components';
import {Link} from 'react-router-dom';
import PageWrapper from '../../common/PageWrapper';
import {ROOT} from '../../../constants/routerPaths';
import './index.css';

const NotFoundPage = () => {
    return (
        <PageWrapper className="content-center" hideNavigation>
            <Card className="not-found">
                <div>
                    <h1>Page not found</h1>
                    <p>Sorry. We couldn't find the page you're looking for.</p>
                </div>
                <Link to={ROOT} className="not-found__link link">
                    Go to home page
                </Link>
            </Card>
        </PageWrapper>
    );
};

export default NotFoundPage;
