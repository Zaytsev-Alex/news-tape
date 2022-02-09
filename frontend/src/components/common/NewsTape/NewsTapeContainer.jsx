import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import createErrorCatchingAction from '../../../actions/createErrorCatchingAction';
import loadNewsAction from '../../../actions/news/loadNews';
import NewsTape from './NewsTape';
import {getUserData} from '../../../helpers/storeHelper';

const RECORDS_ON_PAGE = 10;

const NewsTapeContainer = () => {
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage]       = useState(1);
    const [views, setViews]             = useState([]);

    useEffect(() => {
        loadNews(currentPage);
    }, []);

    function loadMore() {
        return loadNews(currentPage + 1);
    }

    function hasAdditions() {
        return lastPage > currentPage;
    }

    function loadNews(page) {
        return createErrorCatchingAction(dispatch, loadNewsAction, {take: RECORDS_ON_PAGE, page})
            .then((response) => {
                if (response?.payload) {
                    const _payload = response.payload;
                    setCurrentPage(_payload.currentPage);
                    setLastPage(_payload.lastPage);
                    setViews([...views, ..._payload.views]);
                }
            });
    }

    return (
        <NewsTape
            news={views}
            loadMore={loadMore}
            hasAdditions={hasAdditions()}
            isAdmin={userData.isAdmin}
        />
    );
};

export default NewsTapeContainer;
