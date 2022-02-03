import {createSlice} from '@reduxjs/toolkit';
import {CREATE_NEWS_FULFILLED, CREATE_NEWS_REJECTED} from '../constants/actionTypes/news';
import NOTIFICATION_TYPES from '../constants/notificationTypes';

const newsSlice = createSlice(
    {
        name:          'news-slice',
        initialState:  {
            notification: null
        },
        reducers:      {
            resetNotification(store) {
                store.notificationType = null;
            }
        },
        extraReducers: {
            [CREATE_NEWS_FULFILLED]: (store) => {
                store.notificationType = NOTIFICATION_TYPES.SUCCESS;
            },
            [CREATE_NEWS_REJECTED]:  (store) => {
                store.notificationType = NOTIFICATION_TYPES.FAIL;
            }
        }
    }
);

export const {resetNotification} = newsSlice.actions;
export default newsSlice.reducer;
