import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import EditorRequestLink from '../index';
import * as reactRedux from 'react-redux';

describe('EditorRequestLinkContainer tests', () => {
    let useSelectorSpy = null;

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be rendered when user is admin', () => {
        useSelectorSpy.mockReturnValue({isAdmin: true});
        const container = renderEditorRequestLink();
        expect(container.querySelector('.editor-request')).toBeInTheDocument();
    });

    it('should not be rendered when user is not admin', () => {
        useSelectorSpy.mockReturnValue({isAdmin: false});
        const container = renderEditorRequestLink();
        expect(container.querySelector('.editor-request')).not.toBeInTheDocument();
    });

    function renderEditorRequestLink() {
        const {container} = render(
            <BrowserRouter>
                <EditorRequestLink />
            </BrowserRouter>
        );
        return container;
    }
});
