import React from 'react';
import PropTypes from 'prop-types';
import {ButtonIcon, Card} from 'react-rainbow-components';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownViewer from '../MarkdownViewer';
import {ARTICLE, CREATE_NEWS} from '../../constants/routerPaths';
import styles from './styles.module.css';

const NewsCard = ({showNext, showPrev, hasNext, hasPrev, newsData, infoCard, isAdmin}) => {

    function renderInfoContent() {
        const notificationParagraph = (
            <p>You have seen all available news.</p>
        );

        return isAdmin ? (
            <>
                {notificationParagraph}
                <Link href={CREATE_NEWS}>
                    <a className={`link ${styles.newsCardLink}`}>
                        Create news
                    </a>
                </Link>
            </>
        ) : notificationParagraph;
    }

    function renderNewsDataContent() {
        const _newsData = newsData || {};
        return (
            <>
                <Link href={`${ARTICLE}/${_newsData.id}`} target="_blank">
                    <a className={`link ${styles.newsCardLink}`}>
                        {_newsData.title}
                    </a>
                </Link>
                <MarkdownViewer className={styles.markdownViewer}>
                    {_newsData.content}
                </MarkdownViewer>
            </>
        );
    }

    return (
        <Card
            className={`rainbow-m-bottom_x-large rainbow-m-right_small ${styles.newsCard}`}
            footer={
                <div className={styles.newsCardButtonsContainer}>
                    <ButtonIcon
                        variant="border-filled"
                        icon={<Image src="/images/prev-arrow.png" layout="fill"/>}
                        onClick={showPrev}
                        disabled={!hasPrev}
                        title="Previous article"
                        className={`${styles.newsCardButton} ${!hasPrev ? styles.newsCardButtonDisabled : ''}`}
                        shaded
                    />
                    <ButtonIcon
                        variant="border-filled"
                        icon={<Image src="/images/next-arrow.png" layout="fill"/>}
                        onClick={showNext}
                        disabled={!hasNext}
                        title="Next article"
                        className={`${styles.newsCardButton} ${!hasNext ? styles.newsCardButtonDisabled : ''}`}
                        shaded
                    />
                </div>
            }
        >
            <div className={styles.newsCardContent}>
                {
                    infoCard
                    ? renderInfoContent()
                    : renderNewsDataContent()
                }
            </div>
        </Card>
    );
};

NewsCard.propTypes = {
    showNext: PropTypes.func.isRequired,
    showPrev: PropTypes.func.isRequired,
    hasNext:  PropTypes.bool,
    hasPrev:  PropTypes.bool,
    newsData: PropTypes.object,
    infoCard: PropTypes.bool,
    isAdmin:  PropTypes.bool,
}

export default NewsCard;
