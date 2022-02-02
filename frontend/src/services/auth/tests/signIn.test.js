import signInUser from '../signIn';
import config from '../../../constants/config';

describe('sign in user service tests', () => {
    const requestData      = {login: 'login'};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/auth/sign-in`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test('signInUser should make request to sign in endpoint with given body', () => {
        signInUser(requestData);
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
