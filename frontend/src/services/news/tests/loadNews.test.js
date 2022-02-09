import loadNews from '../loadNews';
import config from '../../../constants/config';

describe('loadNews service tests', () => {
    const requestData      = {page: 1, take: 10};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/news/find`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('loadNews should make request to corresponding endpoint with given body', () => {
        loadNews(requestData);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({body: JSON.stringify(requestData)})
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
