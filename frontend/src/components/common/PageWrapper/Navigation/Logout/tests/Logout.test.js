import {fireEvent, render, screen} from '@testing-library/react';
import Logout from '../Logout';

describe('Logout button tests', () => {
    let container    = null;
    const logoutMock = jest.fn();

    beforeEach(() => {
        const renderRes = render(
            <Logout logoutUser={logoutMock}/>
        );
        container       = renderRes.container;
    });

    it('should be rendered', () => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should call logoutUser callback on click', () => {
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

    it('should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
