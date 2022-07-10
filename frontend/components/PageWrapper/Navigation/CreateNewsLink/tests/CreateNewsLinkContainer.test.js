import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import * as reactRedux from 'react-redux';
import CreateNewsLinkContainer from '../index';

describe('CreateNewsLinkContainer tests', () => {
    let useSelectorSpy = null;

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be rendered when user is admin', () => {
        useSelectorSpy.mockReturnValue({isAdmin: true});
        const container = renderCreateNewsLink();
        expect(container.querySelector('.create-news-link')).toBeInTheDocument();
    });

    it('should not be rendered when user is not admin', () => {
        useSelectorSpy.mockReturnValue({isAdmin: false});
        const container = renderCreateNewsLink();
        expect(container.querySelector('.create-news-link')).not.toBeInTheDocument();
    });

    function renderCreateNewsLink() {
        const {container} = render(
            <BrowserRouter>
                <CreateNewsLinkContainer />
            </BrowserRouter>
        );
        return container;
    }
});
