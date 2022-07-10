import * as blockingActions from '../blockingAction';
import * as errorActions from '../../reducers/appErrorSlice';
import * as authActions from '../../reducers/userAuthSlice';
import createErrorCatchingAction from '../createErrorCatchingAction';

describe('createErrorCatchingAction tests', () => {
    let blockingActionSpy    = null;
    let setErrorSpy          = null;
    const responseMock       = {};
    const setErrorMock       = jest.fn();
    const blockingActionMock = () => Promise.resolve(responseMock);
    const dispatchMock       = (action) => Promise.resolve(action);
    const actionMock         = () => responseMock;

    beforeEach(() => {
        blockingActionSpy = jest.spyOn(blockingActions, 'default');
        setErrorSpy       = jest.spyOn(errorActions, 'setError');
        blockingActionSpy.mockImplementation(blockingActionMock);
        setErrorSpy.mockImplementation(setErrorMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('if blockUi arg is false, blocking action shouldn\'t be created', async () => {
        await createErrorCatchingAction(dispatchMock, actionMock, null, false);
        expect(blockingActionSpy).toBeCalledTimes(0);
    });

    it('if blockUi arg is true, blocking action should be created', async () => {
        await createErrorCatchingAction(dispatchMock, actionMock);
        expect(blockingActionSpy).toBeCalledTimes(1);
    });

    it('error should be thrown, when action is rejected', async () => {
        const errorMessage     = 'error';
        const rejectedAction   = () => ({message: errorMessage});
        const rejectedDispatch = (action) => Promise.reject(action);
        await createErrorCatchingAction(rejectedDispatch, rejectedAction, null, false);
        expect(setErrorMock).toBeCalledWith(errorMessage);
    });

    it('should call logout action when user should be logged out', async () => {
        const logoutSpy = jest.spyOn(authActions, 'logout').mockImplementation(jest.fn());
        const errorMessage     = 'Unauthorized';
        const rejectedAction   = () => ({message: errorMessage});
        const rejectedDispatch = (action) => Promise.reject(action);
        await createErrorCatchingAction(rejectedDispatch, rejectedAction, null, false);
        expect(logoutSpy).toBeCalledTimes(1);
    });
});
