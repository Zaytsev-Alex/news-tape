import {render} from '@testing-library/react';
import AppProvider from './AppProvider';

describe('App tests', () => {
    it('App should be rendered', () => {
        const {container} = render(<AppProvider />);
        expect(container.hasChildNodes()).toBeTruthy();
    });
});
