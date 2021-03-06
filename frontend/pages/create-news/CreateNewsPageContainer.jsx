import React from 'react';
import CreateNewsPage from './CreateNewsPage';
import {useDispatch, useSelector} from 'react-redux';
import createErrorCatchingAction from '../../actions/createErrorCatchingAction';
import createNewsAction from '../../actions/news/createNews';
import {resetNotification as resetNotificationAction} from '../../reducers/newsSlice';
import {selectNews} from '../../helpers/storeHelper';
import {useUserRedirect} from '../../helpers/routerHelper';
import {SIGN_UP} from '../../constants/routerPaths';

const CreateNewsPageContainer = () => {
    const dispatch           = useDispatch();
    const {notificationType} = useSelector(selectNews);

    useUserRedirect(false, SIGN_UP);

    function createNews(newsData) {
        createErrorCatchingAction(dispatch, createNewsAction, newsData);
    }

    function resetNotification() {
        dispatch(resetNotificationAction());
    }

    return (
        <CreateNewsPage
            createNews={createNews}
            resetNotification={resetNotification}
            notificationType={notificationType}
        />
    );
};

export default CreateNewsPageContainer;
