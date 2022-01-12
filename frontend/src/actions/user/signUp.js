import {createAsyncThunk} from '@reduxjs/toolkit';
import {SIGN_UP} from '../../constants/actionTypes/user';
import signUpUser from '../../services/user/signUp';

const signUp = createAsyncThunk(
    SIGN_UP,
    async (userData) => {
        try {
            const request = await signUpUser(userData);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    });

export default signUp;
