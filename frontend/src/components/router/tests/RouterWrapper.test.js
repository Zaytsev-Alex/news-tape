import * as reactRedux from 'react-redux'
import RouterWrapper from '../RouterWrapper';
import {act, render, screen} from '@testing-library/react';

describe('RouterWrapper tests', () => {
    let useSelectorSpy = null;
    let useDispatchSpy = null;
    const loggedInUser = {auth: {user: 'userData'}};

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue(loggedInUser);
        useDispatchSpy.mockReturnValue(() => Promise.resolve());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('RouterWrapper should be rendered', () => {
        act(() => {
            render(<RouterWrapper/>);
        });
        expect(screen.getByText('root')).toBeInTheDocument();
    });
});
