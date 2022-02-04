import createNews from '../createNews';
import config from '../../../constants/config';

describe('crete news service tests', () => {
    const requestData      = {content: 'content', title: 'title'};
    const serverApiAddress = config.serverApiAddress;
    const requestUrl       = `${serverApiAddress}/news`;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub());
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('createNews should make request to corresponding endpoint with given body', () => {
        createNews(requestData);
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
