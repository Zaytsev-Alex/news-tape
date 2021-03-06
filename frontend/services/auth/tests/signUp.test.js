import signUpUser from '../signUp';
import config from '../../../constants/config';

describe('sign up user service tests', () => {
    const requestData      = {login: 'login'};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/auth/sign-up`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('signUpUser should make request to sign up endpoint with given body', () => {
        signUpUser(requestData);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        method: 'post',
                                        body:   JSON.stringify(requestData)
                                    })
        );
    });
});

function setupFetchStub() {
    return function fetchStub(_url) {
        return new Promise((resolve) => {
            resolve({
                        text: () => Promise.resolve({}),
                        ok:   true
                    });
        })
    }
}
