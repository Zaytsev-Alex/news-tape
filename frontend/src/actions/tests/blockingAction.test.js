import * as appLoadingActions from '../../reducers/appLoadingSlice';
import createBlockingAction from '../blockingAction';

describe('blockingAction tests', () => {
    let startLoadingSpy    = null;
    let stopLoadingSpy     = null;
    const responseMock     = {};
    const startLoadingMock = jest.fn();
    const stopLoadingMock  = jest.fn();
    const dispatchMock     = (action) => Promise.resolve(action);
    const actionMock       = () => responseMock;
    const actionType       = 'ACTION_TYPE';
    actionMock.fulfilled   = actionType;

    beforeEach(() => {
        startLoadingSpy = jest.spyOn(appLoadingActions, 'startLoading');
        stopLoadingSpy  = jest.spyOn(appLoadingActions, 'stopLoading');
        startLoadingSpy.mockImplementation(startLoadingMock);
        stopLoadingSpy.mockImplementation(stopLoadingMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('blockingAction should start loading', async () => {
        await createBlockingAction(dispatchMock, actionMock);
        expect(startLoadingSpy).toBeCalledTimes(1);
    });

    it('blockingAction should stop loading', async () => {
        await createBlockingAction(dispatchMock, actionMock);
        expect(stopLoadingSpy).toBeCalledTimes(1);
    });

    it('blockingAction should start loading with action\'s type', async () => {
        await createBlockingAction(dispatchMock, actionMock);
        expect(startLoadingSpy).toBeCalledWith(actionType);
    });

    it('blockingAction should stop loading with action\'s type', async () => {
        await createBlockingAction(dispatchMock, actionMock);
        expect(stopLoadingSpy).toBeCalledWith(actionType);
    });

    it('blockingAction should define action type, if it is undefined', async () => {
        actionMock.fulfilled = undefined;

        await createBlockingAction(dispatchMock, actionMock);
        expect(startLoadingSpy).toBeCalledWith(0);
        expect(stopLoadingSpy).toBeCalledWith(0);

        await createBlockingAction(dispatchMock, actionMock);
        expect(startLoadingSpy).toBeCalledWith(1);
        expect(stopLoadingSpy).toBeCalledWith(1);
    });

    it('blockingAction should throw error, if it exists in the response', async () => {
        const errorAction = () => ({error: 'error'});
        try {
            await createBlockingAction(dispatchMock, errorAction);
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });
});
