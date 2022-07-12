import {createAsyncThunk} from '@reduxjs/toolkit';
import {SIGN_IN} from '../../constants/actionTypes/auth';
import signInUser from '../../services/auth/signIn';
import {setUserToken} from '../../helpers/tokenCookieHelper';

const signIn = createAsyncThunk(
    SIGN_IN,
    async (userData) => {
        try {
            const request = await signInUser(userData);
            setUserToken(request.data.token);
            return request.data;
        }
        catch (response) {
            throw response.data;
        }
    }
);

export default signIn;
