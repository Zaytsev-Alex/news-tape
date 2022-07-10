import React, {useState} from 'react';
import PropTypes from 'prop-types';
import NewsCard from './NewsCard';

const NewsTape = ({loadMore, news, hasAdditions, isAdmin}) => {
    const [index, setIndex] = useState(0);

    function handlePrevClick() {
        setIndex((storedIndex) => storedIndex - 1);
    }

    function handleNextClick() {
        if (shouldLoadMore()) {
            loadMore().then(() => {
                selectNestItem();
            });
        }
        else {
            selectNestItem();
        }
    }

    function selectNestItem() {
        setIndex((storedIndex) => storedIndex + 1);
    }

    function shouldLoadMore() {
        return news.length - 1 === index && hasAdditions;
    }

    return (
        <NewsCard
            newsData={news[index]}
            infoCard={!hasAdditions && index === news.length}
            showPrev={handlePrevClick}
            showNext={handleNextClick}
            hasPrev={index > 0}
            hasNext={index < news.length || hasAdditions}
            isAdmin={isAdmin}
        />
    );
};

NewsTape.propTypes = {
    loadMore:     PropTypes.func.isRequired,
    news:         PropTypes.array,
    hasAdditions: PropTypes.bool,
    isAdmin:      PropTypes.bool
}

export default NewsTape;
