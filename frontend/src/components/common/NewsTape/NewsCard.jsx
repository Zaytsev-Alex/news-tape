import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ButtonIcon, Card} from 'react-rainbow-components';
import MarkdownViewer from '../MarkdownViewer';
import {ARTICLE, CREATE_NEWS} from '../../../constants/routerPaths';
import './index.css';

const NewsCard = ({showNext, showPrev, hasNext, hasPrev, newsData, infoCard, isAdmin}) => {

    function renderInfoContent() {
        const notificationParagraph = (
            <p>You have seen all available news.</p>
        );

        return isAdmin ? (
            <>
                {notificationParagraph}
                <Link to={CREATE_NEWS} className="link news-card__link">Create news</Link>
            </>
        ) : notificationParagraph;
    }

    function renderNewsDataContent() {
        const _newsData = newsData || {};
        return (
            <>
                <Link to={`${ARTICLE}/${_newsData.id}`} className="link news-card__link" target="_blank">
                    {_newsData.title}
                </Link>
                <MarkdownViewer>
                    {_newsData.content}
                </MarkdownViewer>
            </>
        );
    }

    return (
        <Card
            className="rainbow-m-bottom_x-large rainbow-m-right_small news-card"
            footer={
                <div className="news-card__buttons-container">
                    <ButtonIcon
                        variant="border-filled"
                        icon={<span className="prev-news"/>}
                        onClick={showPrev}
                        disabled={!hasPrev}
                        title="Previous article"
                        shaded
                    />
                    <ButtonIcon
                        variant="border-filled"
                        icon={<span className="next-news"/>}
                        onClick={showNext}
                        disabled={!hasNext}
                        title="Next article"
                        shaded
                    />
                </div>
            }
        >
            <div className="news-card__content">
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
