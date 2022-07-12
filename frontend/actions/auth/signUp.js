import {createAsyncThunk} from '@reduxjs/toolkit';
import {SIGN_UP} from '../../constants/actionTypes/auth';
import signUpUser from '../../services/auth/signUp';
import {setUserToken} from '../../helpers/tokenCookieHelper';

const signUp = createAsyncThunk(
    SIGN_UP,
    async (userData) => {
        try {
            const request = await signUpUser(userData);
            setUserToken(request.data.token);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default signUp;
