import * as loadNewsItemActions from '../../../services/news/loadNewsItem';
import loadNewsItem from '../loadNewsItem';
import store from '../../../store';

describe('loadNewsItem action tests', () => {
    let loadNewsItemServiceMock = null;
    const responseMock          = {data: 'some data'};
    const errorMessage          = 'error';
    const requestId             = 1;

    beforeEach(() => {
        loadNewsItemServiceMock = jest.spyOn(loadNewsItemActions, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loadNewsItem action should return data, when action is fulfilled', async () => {
        loadNewsItemServiceMock.mockImplementation(() => Promise.resolve(responseMock));
        const response = await store.dispatch(loadNewsItem(requestId));
        expect(response.payload).toBe(responseMock.data);
    });

    it('loadNewsItem action should return error, when action is rejected', async () => {
        loadNewsItemServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(loadNewsItem(requestId));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('loadNewsItem action should call service with correct id', async () => {
        await store.dispatch(loadNewsItem(requestId));
        expect(loadNewsItemServiceMock).toBeCalledWith(requestId);
    });
});
