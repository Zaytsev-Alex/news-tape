import {createAsyncThunk} from '@reduxjs/toolkit';
import {SIGN_IN} from '../../constants/actionTypes/auth';
import signInUser from '../../services/auth/signIn';

const signIn = createAsyncThunk(
    SIGN_IN,
    async (userData) => {
        try {
            const request = await signInUser(userData);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    });

export default signIn;