import loadEditorRequests from '../loadEditorRequests';
import config from '../../../constants/config';

describe('load editor requests service tests', () => {
    const requestData      = {take: 10, page: 2};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/editor-requests`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test('loadEditorRequests should make request to corresponding endpoint with given body', () => {
        loadEditorRequests(requestData);
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
