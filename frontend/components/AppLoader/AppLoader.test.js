import {act, render} from '@testing-library/react';
import AppLoader from './AppLoader';

describe('AppLoader test', () => {
    it('AppLoader should be rendered', () => {
        let container = null;
        act(() => {
            const renderRes = render(<AppLoader/>);
            container       = renderRes.container;
        });

        expect(container.querySelector('.spinner-container')).toBeInTheDocument();
    });
});
