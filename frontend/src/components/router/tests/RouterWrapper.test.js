import * as reactRedux from 'react-redux'
import RouterWrapper from '../RouterWrapper';
import {act, render, screen} from '@testing-library/react';

describe('RouterWrapper tests', () => {
    let useSelectorSpy = null;
    const loggedInUser = {auth: {user: 'userData'}};

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useSelectorSpy.mockReturnValue(loggedInUser);
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
