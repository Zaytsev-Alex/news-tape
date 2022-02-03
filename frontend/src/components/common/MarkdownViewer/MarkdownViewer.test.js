import {render} from '@testing-library/react';
import MarkdownViewer from './index';

describe('MarkdownViewer tests', () => {
    let container = null;

    beforeEach(() => {
        const renderRes = render(<MarkdownViewer />);
        container       = renderRes.container;
    });

    it('should be defined', () => {
        expect(container.querySelector('.markdown-viewer')).toBeInTheDocument();
    });
});
