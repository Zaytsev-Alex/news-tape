import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NewsViewerPage from './NewsViewerPage';
import loadNewsItem from '../../../actions/news/loadNewsItem';
import createErrorCatchingAction from '../../../actions/createErrorCatchingAction';
import {selectNews} from '../../../helpers/storeHelper';
import {resetNewsItemData} from '../../../reducers/newsSlice';
import {useRouter} from 'next/router';

// TODO: Change to next js props
const NewsViewerPageContainer = () => {
    const newState = useSelector(selectNews);
    const dispatch = useDispatch();
    const router   = useRouter();
    const { id }   = router.query;

    useEffect(() => {
        if (parseInt(id, 10)) {
            createErrorCatchingAction(dispatch, loadNewsItem, id);
        }

        return () => {
            dispatch(resetNewsItemData());
        };
    }, [id]);

    return (
        <NewsViewerPage
            requestingNewsNotFound={newState.requestingNewsNotFound}
            newsData={newState.newsItem}
        />
    );
};

export default NewsViewerPageContainer;
