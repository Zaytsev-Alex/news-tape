import {fireEvent, render, screen} from '@testing-library/react';
import Logout from '../index';
import * as reactRedux from 'react-redux';
import * as userAuthActions from '../../../../../../reducers/userAuthSlice';

describe('Logout button tests', () => {
    let container      = null;
    let useDispatchSpy = null;
    let logoutSpy      = null;
    const logoutMock   = jest.fn();

    beforeEach(() => {
        useDispatchSpy  = jest.spyOn(reactRedux, 'useDispatch');
        useDispatchSpy.mockReturnValue((callback) => Promise.resolve(callback));
        logoutSpy       = jest.spyOn(userAuthActions, 'logout');
        logoutSpy.mockImplementation(logoutMock);
        const renderRes = render(
            <Logout />
        );
        container       = renderRes.container;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call logout action on click', () => {
        const logoutButton = container.querySelector('.logout');

        fireEvent(
            logoutButton,
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );

        expect(logoutMock).toHaveBeenCalledTimes(1);
    });
});
