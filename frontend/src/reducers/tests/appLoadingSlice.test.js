import appLoadingReducer, {startLoading, stopLoading} from '../appLoadingSlice';

describe('appLoadingSlice tests', () => {
    const applyAction    = (action, initialState) => appLoadingReducer(initialState, action);
    const actionType     = 'action-type';
    let stateWithLoading = null;

    beforeEach(() => {
        stateWithLoading = applyAction(startLoading(actionType));
    })

    it('startLoading should add action to pending actions', () => {
        expect(stateWithLoading.pendingActions.length).toBe(1);
        expect(stateWithLoading.pendingActions[0]).toBe(actionType);
        expect(stateWithLoading.loading).toBeTruthy();
    });

    it('startLoading should handle several pending actions', () => {
        const newActionType          = 'new/action-type';
        const stateWithSeveralAction = applyAction(startLoading(newActionType), stateWithLoading);
        expect(stateWithSeveralAction.pendingActions.length).toBe(2);
        expect(stateWithSeveralAction.loading).toBeTruthy();
    });

    it('startLoading shouldn\'t do anything without a payload', () => {
        expect(stateWithLoading.pendingActions.length).toBe(1);
        expect(applyAction(startLoading(), stateWithLoading).pendingActions).toBe(stateWithLoading.pendingActions);
    });

    it('stopLoading should stop loading when there is one action pending and this action is given as payload', () => {
        expect(stateWithLoading.pendingActions.length).toBe(1);
        expect(stateWithLoading.loading).toBeTruthy();
        const clearedState = applyAction(stopLoading(actionType), stateWithLoading);
        expect(clearedState.pendingActions.length).toBe(0);
        expect(clearedState.loading).toBeFalsy();
    });

    it('stopLoading shouldn\'t stop loading when there is one action pending and another action is given as payload', () => {
        const newActionType          = 'new/action-type';
        const wrongActionType        = 'wrong/action-type';
        const stateWithSeveralAction = applyAction(startLoading(newActionType), stateWithLoading);
        expect(stateWithSeveralAction.pendingActions.length).toBe(2);
        expect(stateWithSeveralAction.loading).toBeTruthy();
        const clearedState = applyAction(stopLoading(wrongActionType), stateWithSeveralAction);
        expect(clearedState.pendingActions.length).toBe(2);
        expect(clearedState.loading).toBeTruthy();
        expect(clearedState.pendingActions).toBe(stateWithSeveralAction.pendingActions);
    });

    it('stopLoading shouldn\'t do anything without a payload', () => {
        expect(stateWithLoading.pendingActions.length).toBe(1);
        const clearedState = applyAction(stopLoading(), stateWithLoading);
        expect(clearedState.pendingActions).toBe(stateWithLoading.pendingActions);
    });
});
