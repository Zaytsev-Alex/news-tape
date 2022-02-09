import {createAsyncThunk} from '@reduxjs/toolkit';
import {LOAD_NEWS} from '../../constants/actionTypes/news';
import loadNewsApiCall from '../../services/news/loadNews';

const loadNews = createAsyncThunk(
    LOAD_NEWS,
    async (criteria) => {
        try {
            const request = await loadNewsApiCall(criteria);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default loadNews;
