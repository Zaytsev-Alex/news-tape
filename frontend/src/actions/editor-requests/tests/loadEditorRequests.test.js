import * as loadEditorRequestsActions from '../../../services/editor-requests/loadEditorRequests';
import loadEditorRequests from '../loadEditorRequests';
import store from '../../../store';

describe('loadEditorRequests action tests', () => {
    let loadEditorRequestsServiceMock = null;
    const responseMock                = {data: 'some data'};
    const errorMessage                = 'error';
    const requestData                 = {take: 10, page: 2};

    beforeEach(() => {
        loadEditorRequestsServiceMock = jest.spyOn(loadEditorRequestsActions, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loadEditorRequests action should return data, when action is fulfilled', async () => {
        loadEditorRequestsServiceMock.mockImplementation(() => Promise.resolve(responseMock));

        const response = await store.dispatch(loadEditorRequests(requestData));

        expect(response.payload).toBe(responseMock.data);
    });

    it('loadEditorRequests action should return error, when action is rejected', async () => {
        loadEditorRequestsServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(loadEditorRequests(requestData));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('loadEditorRequests action should call service with correct parameters', async () => {
        await store.dispatch(loadEditorRequests(requestData));
        expect(loadEditorRequestsServiceMock).toBeCalledWith(requestData);
    });
});
