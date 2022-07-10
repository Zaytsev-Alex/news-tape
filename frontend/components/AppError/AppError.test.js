import {render, screen, fireEvent} from '@testing-library/react';
import AppError from './AppError';

describe('AppError tests', () => {
    const errorMessage = 'error!';
    const onCloseMock  = jest.fn();
    let container      = null;

    beforeEach(() => {
        const renderRes = render(<AppError errorText={errorMessage} onClose={onCloseMock} />);
        container       = renderRes.container;
    });

    it('AppError should render error message', () => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Close function should be called, when user presses close button', () => {
        const {container} = render(<AppError errorText={errorMessage} onClose={onCloseMock} />);
        fireEvent(
            container.querySelector('.app-error [title="Close"]'),
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('AppError should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
