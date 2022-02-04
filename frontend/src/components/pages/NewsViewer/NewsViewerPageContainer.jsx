import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import NewsViewerPage from './NewsViewerPage';
import loadNewsItem from '../../../actions/news/loadNewsItem';
import createErrorCatchingAction from '../../../actions/createErrorCatchingAction';
import {selectNews} from '../../../helpers/storeHelper';
import {resetNewsItemData} from '../../../reducers/newsSlice';

const NewsViewerPageContainer = () => {
    const newState = useSelector(selectNews);
    const dispatch = useDispatch();
    const {id}     = useParams();

    useEffect(() => {
        if (parseInt(id, 10)) {
            createErrorCatchingAction(dispatch, loadNewsItem, id);
        }

        return () => {
            dispatch(resetNewsItemData());
        };
    }, []);

    return (
        <NewsViewerPage
            requestingNewsNotFound={newState.requestingNewsNotFound}
            newsData={newState.newsItem}
        />
    );
};

export default NewsViewerPageContainer;
