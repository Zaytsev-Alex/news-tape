import * as createNewsActions from '../../../services/news/createNews';
import createNews from '../createNews';
import store from '../../../store';

describe('createNews action tests', () => {
    let createNewsServiceMock = null;
    const responseMock        = {data: 'some data'};
    const errorMessage        = 'error';
    const requestData         = {content: 'content', title: 'title'};

    beforeEach(() => {
        createNewsServiceMock = jest.spyOn(createNewsActions, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('createNews action should return data, when action is fulfilled', async () => {
        createNewsServiceMock.mockImplementation(() => Promise.resolve(responseMock));
        const response = await store.dispatch(createNews(requestData));
        expect(response.payload).toBe(responseMock.data);
    });

    it('createNews action should return error, when action is rejected', async () => {
        createNewsServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(createNews(requestData));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('createNews action should call service with correct parameters', async () => {
        await store.dispatch(createNews(requestData));
        expect(createNewsServiceMock).toBeCalledWith(requestData);
    });
});
