import updateEditorPermissions from '../updateEditorPermissions';
import config from '../../../constants/config';

describe('update user editor\'s permissions service tests', () => {
    const requestId        = 1;
    const requestBody      = {approve: true};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/users`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test('updateEditorPermissions should make request to corresponding endpoint with given body', () => {
        updateEditorPermissions(requestId, requestBody);
        expect(global.fetch).toBeCalledWith(
            `${requestUrl}/${requestId}`,
            expect.objectContaining({
                                        method: 'PATCH',
                                        body:   JSON.stringify(requestBody)
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
