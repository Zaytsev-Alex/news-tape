import {createAsyncThunk} from '@reduxjs/toolkit';
import {UPDATE_EDITOR_PERMISSIONS} from '../../constants/actionTypes/user';
import updateEditorPermissionsApiCall from '../../services/users/updateEditorPermissions';

const updateEditorPermissions = createAsyncThunk(
    UPDATE_EDITOR_PERMISSIONS,
    async (criteria) => {
        try {
            const request = await updateEditorPermissionsApiCall(criteria.requestId, {approve: criteria.approve});
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default updateEditorPermissions;
