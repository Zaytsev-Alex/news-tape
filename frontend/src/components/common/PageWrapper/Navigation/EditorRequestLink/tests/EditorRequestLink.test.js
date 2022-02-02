import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import EditorRequestLink from '../EditorRequestLink';

describe('EditorRequestLink tests', () => {
    let container = null;

    beforeEach(() => {
        const renderRes = render(
            <BrowserRouter>
                <EditorRequestLink />
            </BrowserRouter>
        );
        container       = renderRes.container;
    });

    it('should be rendered', () => {
        expect(screen.getByText('Editor Requests')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
