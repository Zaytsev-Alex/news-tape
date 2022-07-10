import loadNewsItem from '../loadNewsItem';
import config from '../../../constants/config';

describe('loadNewsItem service tests', () => {
    const requestId        = 1;
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/news/${requestId}`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('loadNewsItem should make request to corresponding endpoint with given id', () => {
        loadNewsItem(requestId);
        expect(global.fetch).toBeCalledWith(requestUrl, expect.anything());
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
