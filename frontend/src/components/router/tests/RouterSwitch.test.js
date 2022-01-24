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
        useDispatchSpy.mockReturnValue(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Home page should be rendered by default for authorized user', () => {
        act(() => {
            render(
                <BrowserRouter>
                    <RouterSwitch store={loggedInUser}/>
                </BrowserRouter>
            );
        });

        expect(screen.getByText('root')).toBeInTheDocument();
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
