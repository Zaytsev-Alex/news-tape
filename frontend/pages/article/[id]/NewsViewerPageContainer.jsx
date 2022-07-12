import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NewsViewerPage from './NewsViewerPage';
import loadNewsItem from '../../../actions/news/loadNewsItem';
import createErrorCatchingAction from '../../../actions/createErrorCatchingAction';
import {selectNews} from '../../../helpers/storeHelper';
import {resetNewsItemData, setNewsData} from '../../../reducers/newsSlice';
import {useRouter} from 'next/router';
import {setError} from '../../../reducers/appErrorSlice';

const NewsViewerPageContainer = ({data, errorMessage}) => {
    const newState = useSelector(selectNews);
    const dispatch = useDispatch();
    const router   = useRouter();
    const { id }   = router.query;

    useEffect(() => {
        if (data) {
            dispatch(setNewsData(data));
        }
        else if (parseInt(id, 10)) {
            createErrorCatchingAction(dispatch, loadNewsItem, id);
        }

        return () => {
            dispatch(resetNewsItemData());
        };
    }, [data, id]);

    useEffect(() => {
        if (errorMessage) {
            dispatch(setError(errorMessage));
        }
    }, [errorMessage]);

    return (
        <NewsViewerPage
            requestingNewsNotFound={newState.requestingNewsNotFound}
            newsData={newState.newsItem}
        />
    );
};

export default NewsViewerPageContainer;
