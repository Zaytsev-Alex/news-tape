import {createAsyncThunk} from '@reduxjs/toolkit';
import {LOAD_EDITOR_REQUESTS} from '../../constants/actionTypes/editor-requests';
import loadEditorRequestsApiCall from '../../services/editor-requests/loadEditorRequests';

const loadEditorRequests = createAsyncThunk(
    LOAD_EDITOR_REQUESTS,
    async (criteria) => {
        try {
            const request = await loadEditorRequestsApiCall(criteria);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default loadEditorRequests;
