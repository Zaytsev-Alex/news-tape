import NotFoundPage from './index';
import {act, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

describe('NotFoundPage tests', () => {
    let container = null;

    beforeEach(() => {
        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <NotFoundPage/>
                </BrowserRouter>
            );
            container = renderRes.container;
        });
    });

    it('NotFoundPage should be rendered', () => {
        expect(screen.getByText('Page not found')).toBeInTheDocument();
    });

    it('Go to home page should be rendered on the NotFoundPage', () => {
        expect(screen.getByText('Go to home page')).toBeInTheDocument();
    });

    it('NotFoundPage should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
