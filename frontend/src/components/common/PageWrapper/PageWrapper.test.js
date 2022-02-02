import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import * as reactRedux from 'react-redux'
import PageWrapper from './index';

describe('PageWrapper tests', () => {
    let container      = null;
    let useDispatchSpy = null;
    let useSelector    = null;

    beforeEach(() => {
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelector    = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy.mockReturnValue(() => Promise.resolve());
        useSelector.mockReturnValue({});

        const renderRes = render(
            <BrowserRouter>
                <PageWrapper />
            </BrowserRouter>
        );
        container       = renderRes.container;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('PageWrapper should be rendered', () => {
        expect(container.querySelector('.app')).toBeInTheDocument();
    });

    it('classname shouldn\'t be added to page wrapper, if it is not passed', () => {
        expect(container.querySelector('.app').className.trim()).toBe('app');
    });

    it('classname shouldn be added to page wrapper, if it is passed', () => {
        const className = 'className';
        const renderRes = render(
            <BrowserRouter>
                <PageWrapper className={className} />
            </BrowserRouter>
        );
        container       = renderRes.container;
        expect(container.querySelector('.app').classList.contains(className)).toBeTruthy();
    });
});
