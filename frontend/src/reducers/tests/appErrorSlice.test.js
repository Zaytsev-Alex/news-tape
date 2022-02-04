import appErrorReducer, {setError, clearError} from '../appErrorSlice';

describe('appErrorSlice tests', () => {
    const applyAction  = (action, initialState) => appErrorReducer(initialState, action);
    const errorData    = 'error';
    let stateWithError = null;

    beforeEach(() => {
        stateWithError = applyAction(setError(errorData));
    });

    afterAll(() => {
         applyAction(clearError());
    });

    it('setError should set error data', () => {
        expect(stateWithError.error).toBe(errorData);
        expect(stateWithError.isError).toBeTruthy();
    });

    it('clearError should clear error data', () => {
        expect(stateWithError.error).toBe(errorData);
        expect(stateWithError.isError).toBeTruthy();
        const clearedState = applyAction(clearError(), stateWithError);
        expect(clearedState.error).toBe('');
        expect(clearedState.isError).toBeFalsy();
    });
});
