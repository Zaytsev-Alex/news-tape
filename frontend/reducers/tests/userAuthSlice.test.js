import userAuthReducer, {logout} from '../userAuthSlice';
import {SIGN_IN_FULFILLED, SIGN_UP_FULFILLED} from '../../constants/actionTypes/auth';

describe('userAuthSlice tests', () => {
    const applyAction     = (action, initialState) => userAuthReducer(initialState, action);
    const userData        = 'user-data';
    let loggedInUserState = null;

    beforeEach(() => {
        loggedInUserState = applyAction({type: SIGN_UP_FULFILLED, payload: userData});
    });

    afterAll(() => {
        applyAction(logout());
    });

    it('SIGN_UP_FULFILLED should set user\'s data', () => {
        expect(loggedInUserState.user).toBe(userData);
    });

    it('logout action should reset user\'s data', () => {
        expect(loggedInUserState.user).toBe(userData);
        const loggedOutState = applyAction(logout(), loggedInUserState);
        expect(loggedOutState.user).toBe(null);
    });

    it('SIGN_IN_FULFILLED should set user\'s data', () => {
        const signInState = applyAction({type: SIGN_IN_FULFILLED, payload: userData});
        expect(signInState.user).toBe(userData);
    });
});
