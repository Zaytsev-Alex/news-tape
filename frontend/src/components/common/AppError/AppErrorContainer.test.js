import * as reactRedux from 'react-redux';
import AppErrorContainer from './AppErrorContainer';
import {fireEvent, render, screen} from '@testing-library/react';

describe('AppErrorContainer test', () => {
    const errorMessage         = 'error message';
    const appErrorState        = {error: errorMessage};
    const appStateWithoutError = {error: null};
    let useSelectorSpy         = null;
    let useDispatchSpy         = null;

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue(appErrorState);
        useDispatchSpy.mockReturnValue(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Error should be rendered if error is stored in state', () => {
        render(<AppErrorContainer />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Error should be rendered if error is stored in state', () => {
        useSelectorSpy.mockReturnValue(appStateWithoutError);
        render(<AppErrorContainer />);
        try {
            screen.getByText(errorMessage);
        }
        catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('Clear error function should be called on close error', () => {
        const {container} = render(<AppErrorContainer />);
        fireEvent(
            container.querySelector('.app-error [title="Close"]'),
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );
        expect(useDispatchSpy).toHaveBeenCalledTimes(1);
    });
});
