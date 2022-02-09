import * as reactRedux from 'react-redux'
import RouterSwitch from '../RouterSwitch';
import {act, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

describe('RouterSwitch tests', () => {
    const loggedInUser  = {auth: {user: 'userData'}};
    const loggedOutUser = {auth: {user: null}};
    let useSelectorSpy  = null;

    beforeEach(() => {
        useSelectorSpy       = jest.spyOn(reactRedux, 'useSelector');
        const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue(loggedInUser);
        useDispatchSpy.mockReturnValue(jest.fn(() => Promise.resolve()));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Home page should be rendered by default for authorized user', () => {
        let container = null;
        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <RouterSwitch store={loggedInUser}/>
                </BrowserRouter>
            );
            container       = renderRes.container;
        });

        expect(container.querySelector('.app')).toBeInTheDocument();
    });

    it('Sign up page should be rendered by default for unauthorized user', () => {
        let container = null;
        act(() => {
            const renderResult = render(
                <BrowserRouter>
                    <RouterSwitch store={loggedOutUser}/>
                </BrowserRouter>
            );
            container = renderResult.container;
        });

        expect(container.querySelector('.auth__header').textContent).toBe('Sign Up');
    });
});
