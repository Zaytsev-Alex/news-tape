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
        useDispatchSpy.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Error should be rendered if error is stored in state', () => {
        render(<AppErrorContainer />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Error should not be rendered if error is not stored in state', () => {
        useSelectorSpy.mockReturnValue(appStateWithoutError);
        const {container} = render(<AppErrorContainer />);

        expect(container.querySelector('.app-error')).not.toBeInTheDocument();
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
