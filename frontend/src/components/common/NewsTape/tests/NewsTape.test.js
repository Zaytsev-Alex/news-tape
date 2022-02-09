import {act, render, waitFor} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsTape from '../NewsTape';
import {nextButtonPress, prevButtonPress} from './NewsCard.test';

describe('NewsTape tests', () => {
    let container      = null;
    const news         = [{title: '0', content: '0'}, {title: '1', content: '1'}, {title: '2', content: '2'}];
    const loadMoreMock = jest.fn();

    beforeEach(() => {
        renderComponent(news, loadMoreMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(container.querySelector('.news-card')).toBeInTheDocument();
    });

    it ('by default first news should be rendered', () => {
        expect(container.querySelector('.markdown-viewer').textContent).toBe(news[0].content);
    });

    it('next news should be rendered, when user presses next arrow', () => {
        nextButtonPress(container);
        expect(container.querySelector('.markdown-viewer').textContent).toBe(news[1].content);
    });

    it('previous news should be rendered, when user presses previous arrow', () => {
        nextButtonPress(container);
        prevButtonPress(container);
        expect(container.querySelector('.markdown-viewer').textContent).toBe(news[0].content);
    });

    it('loadMore should be called, when user presses next arrow on the last item', () => {
        loadMoreMock.mockReturnValue(Promise.resolve());
        renderComponent(news, loadMoreMock, true);
        nextButtonPress(container);
        nextButtonPress(container);
        nextButtonPress(container);
        expect(loadMoreMock).toBeCalledTimes(1);
    });

    it('after loadMore next index should be selected', async () => {
        loadMoreMock.mockReturnValue(Promise.resolve());
        renderComponent(news, loadMoreMock, true);
        nextButtonPress(container);
        nextButtonPress(container);
        nextButtonPress(container);
        await waitFor(() => {
            expect(container.querySelector('.markdown-viewer').textContent).toBe('');
        });
    });

    function renderComponent(news, loadMore, hasAdditions) {
        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <NewsTape
                        news={news}
                        loadMore={loadMore}
                        hasAdditions={hasAdditions}
                    />
                </BrowserRouter>
            );
            container       = renderRes.container;
        });
    }
});
