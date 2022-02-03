import {createAsyncThunk} from '@reduxjs/toolkit';
import {CREATE_NEWS} from '../../constants/actionTypes/news';
import createNewsApiCall from '../../services/news/createNews';

const createNews = createAsyncThunk(
    CREATE_NEWS,
    async (criteria) => {
        try {
            const request = await createNewsApiCall(criteria);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default createNews;
