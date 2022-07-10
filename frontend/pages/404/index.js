import React from 'react';
import Link from 'next/link';
import {Card} from 'react-rainbow-components';
import {ROOT} from '../../constants/routerPaths';
import PageWrapper from '../../components/PageWrapper';
import styles from './styles.module.css';

const NotFoundPage = () => {
    return (
        <PageWrapper className="content-center" hideNavigation>
            <Card className={styles.notFound}>
                <div>
                    <h1>Page not found</h1>
                    <p>Sorry. We couldn't find the page you're looking for.</p>
                </div>
                <Link href={ROOT}>
                    <a className={`link ${styles.notFoundLink}`}>Go to home page</a>
                </Link>
            </Card>
        </PageWrapper>
    );
};

export default NotFoundPage;
