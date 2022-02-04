import {createSlice} from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../constants/actionTypes/news';
import NOTIFICATION_TYPES from '../constants/notificationTypes';

const newsSlice = createSlice(
    {
        name:          'news-slice',
        initialState:  {
            notification:           null,
            newsItem:               null,
            requestingNewsNotFound: false,
        },
        reducers:      {
            resetNotification(store) {
                store.notificationType = null;
            },
            resetNewsItemData(store) {
                store.newsItem               = null;
                store.requestingNewsNotFound = false;
            }
        },
        extraReducers: {
            [ACTION_TYPES.CREATE_NEWS_FULFILLED]:    (store) => {
                store.notificationType = NOTIFICATION_TYPES.SUCCESS;
            },
            [ACTION_TYPES.CREATE_NEWS_REJECTED]:     (store) => {
                store.notificationType = NOTIFICATION_TYPES.FAIL;
            },
            [ACTION_TYPES.LOAD_NEWS_ITEM_FULFILLED]: (store, action) => {
                store.newsItem = action.payload;
            },
            [ACTION_TYPES.LOAD_NEWS_ITEM_REJECTED]:  (store) => {
                store.requestingNewsNotFound = true;
            }
        }
    }
);

export const {resetNotification, resetNewsItemData} = newsSlice.actions;
export default newsSlice.reducer;
