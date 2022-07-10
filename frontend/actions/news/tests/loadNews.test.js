import * as loadNewsActions from '../../../services/news/loadNews';
import loadNews from '../loadNews';
import store from '../../../store';

describe('loadNews action tests', () => {
    let loadNewsServiceMock = null;
    const responseMock      = {data: 'some data'};
    const errorMessage      = 'error';
    const requestData       = {page: 1, take: 10};

    beforeEach(() => {
        loadNewsServiceMock = jest.spyOn(loadNewsActions, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loadNews action should return data, when action is fulfilled', async () => {
        loadNewsServiceMock.mockImplementation(() => Promise.resolve(responseMock));
        const response = await store.dispatch(loadNews(requestData));
        expect(response.payload).toBe(responseMock.data);
    });

    it('loadNews action should return error, when action is rejected', async () => {
        loadNewsServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(loadNews(requestData));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('loadNews action should call service with correct criteria', async () => {
        await store.dispatch(loadNews(requestData));
        expect(loadNewsServiceMock).toBeCalledWith(requestData);
    });
});
