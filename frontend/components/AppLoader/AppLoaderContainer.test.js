import {act, render} from '@testing-library/react';
import * as reactRedux from 'react-redux';
import AppLoaderContainer from './AppLoaderContainer';

describe('AppLoaderContainer test', () => {
    let container         = null;
    let useSelectorSpy    = null;
    const loadingState    = {loading: true};
    const notLoadingState = {loading: false};

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useSelectorSpy.mockReturnValue(loadingState);
        act(() => {
            const renderRes = render(<AppLoaderContainer/>);
            container       = renderRes.container;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('AppLoaderContainer should render spinner if application loading state is true', () => {
        expect(container.querySelector('.spinner-container')).toBeInTheDocument();
    });

    it('AppLoaderContainer shouldn\'t render spinner if application loading state is false', () => {
        useSelectorSpy.mockReturnValue(notLoadingState);
        act(() => {
            const renderRes = render(<AppLoaderContainer/>);
            container       = renderRes.container;
        });

        expect(container.querySelector('.spinner-container')).toBe(null);
    });
});
