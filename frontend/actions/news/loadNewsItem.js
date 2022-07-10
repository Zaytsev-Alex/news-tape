import {createAsyncThunk} from '@reduxjs/toolkit';
import {LOAD_NEWS_ITEM} from '../../constants/actionTypes/news';
import loadNewsItemApiCall from '../../services/news/loadNewsItem';

const loadNewsItem = createAsyncThunk(
    LOAD_NEWS_ITEM,
    async (id) => {
        try {
            const request = await loadNewsItemApiCall(id);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default loadNewsItem;
