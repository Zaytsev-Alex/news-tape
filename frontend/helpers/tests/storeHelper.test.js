import * as storeHelper from '../storeHelper';
import store from '../../store';
import {selectNews} from '../storeHelper';

describe('store helper tests', () => {
    const storeState = store.getState();

    it('selectSelf should return store state', () => {
        const state = storeHelper.selectSelf(storeState);
        expect(state).toBe(storeState);
    });

    it('selectUserAuth should return user\'s auth data', () => {
        const userAuth = storeHelper.selectUserAuth(storeState);
        expect(userAuth).toBe(storeState.auth);
    });

    it('selectApplication should return application\'s data', () => {
        const application = storeHelper.selectApplication(storeState);
        expect(application).toBe(storeState.application);
    });

    it('getUserData should extract user\'s data from user\'s auth data', () => {
        const userData = storeHelper.getUserData(storeState);
        expect(userData).toBe(storeHelper.selectUserAuth(storeState).user);
    });

    it('selectAppLoading should extract app\'s loading state', () => {
        const appLoading = storeHelper.selectAppLoading(storeState);
        expect(appLoading).toBe(storeHelper.selectApplication(storeState).loading);
    });

    it('selectAppError should extract app\'s error state', () => {
        const appError = storeHelper.selectAppError(storeState);
        expect(appError).toBe(storeHelper.selectApplication(storeState).error);
    });

    it('selectUserAuthToken should extract auth token from user\'s auth data', () => {
        const authToken = storeHelper.selectUserAuthToken(storeState);
        expect(authToken).toBe(storeHelper.getUserData(storeState)?.token);
    });

    it('selectNews should extract news state', () => {
        const newsState = storeHelper.selectNews(storeState);
        expect(newsState).toBe(storeHelper.selectApplication(storeState).news);
    });
});
