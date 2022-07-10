import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import CreateNewsLink from '../CreateNewsLink';

describe('CreateNewsLink tests', () => {
    let container = null;

    beforeEach(() => {
        const renderRes = render(
            <BrowserRouter>
                <CreateNewsLink />
            </BrowserRouter>
        );
        container       = renderRes.container;
    });

    it('should be rendered', () => {
        expect(screen.getByText('Create news')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
