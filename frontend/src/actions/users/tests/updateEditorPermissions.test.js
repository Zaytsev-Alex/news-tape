import * as updateEditorPermissionsActions from '../../../services/users/updateEditorPermissions';
import updateEditorPermissions from '../updateEditorPermissions';
import store from '../../../store';

describe('updateEditorPermissions action tests', () => {
    let updateEditorPermissionsServiceMock = null;
    const responseMock                     = {data: 'some data'};
    const errorMessage                     = 'error';
    const requestData                      = {requestId: 10, approve: true};

    beforeEach(() => {
        updateEditorPermissionsServiceMock = jest.spyOn(updateEditorPermissionsActions, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('updateEditorPermissions action should return data, when action is fulfilled', async () => {
        updateEditorPermissionsServiceMock.mockImplementation(() => Promise.resolve(responseMock));

        const response = await store.dispatch(updateEditorPermissions(requestData));

        expect(response.payload).toBe(responseMock.data);
    });

    it('updateEditorPermissions action should return error, when action is rejected', async () => {
        updateEditorPermissionsServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(updateEditorPermissions(requestData));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('sign in action should call service with correct parameters', async () => {
        await store.dispatch(updateEditorPermissions(requestData));
        expect(updateEditorPermissionsServiceMock).toBeCalledWith(requestData.requestId, {approve: requestData.approve});
    });
});
