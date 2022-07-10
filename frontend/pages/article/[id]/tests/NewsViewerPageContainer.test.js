import * as reactRedux from 'react-redux';
import {act, fireEvent, render} from '@testing-library/react';
import {MemoryRouter, Route} from 'react-router-dom';
import * as loadNewsItemActions from '../../../../actions/news/loadNewsItem';
import * as newsReducerActions from '../../../../reducers/newsSlice';
import * as createBlockingActions from '../../../../actions/blockingAction';
import NewsViewerPageContainer from '../NewsViewerPageContainer';
import {ARTICLE} from '../../../../constants/routerPaths';

describe('NewsViewerPageContainer tests', () => {
    let container                = null;
    let useSelectorSpy           = null;
    let useDispatchSpy           = null;
    let loadNewsItemActionMock   = null;
    let resetNewsItemDataSpy     = null;
    let createBlockingActionMock = null;
    const newsId                 = '1';
    const useSelectorMockReturn  = {
        newsItem:               {content: 'content', title: 'title', createdDate: new Date()},
        requestingNewsNotFound: false
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be rendered', () => {
        renderPage(useSelectorMockReturn, newsId);
        expect(container.querySelector('.news-viewer')).toBeInTheDocument();
    });

    describe('behaviour', () => {
        it('should call loadNewsItem action if id is given', () => {
            renderPage(useSelectorMockReturn, newsId);
            expect(loadNewsItemActionMock).toHaveBeenCalledTimes(1);
        });

        it('should call loadNewsItem action with correct id from params', () => {
            renderPage(useSelectorMockReturn, newsId);
            expect(loadNewsItemActionMock).toHaveBeenCalledWith(newsId);
        });

        it('should not call loadNewsItem action without id', () => {
            renderPage(useSelectorMockReturn);
            expect(loadNewsItemActionMock).toHaveBeenCalledTimes(0);
        });

        it('should resetNewsItemData on umount', () => {
            renderPage({newsId: false, requestingNewsNotFound: true}, newsId);

            fireEvent(
                container.querySelector('.news-viewer__not-found a'),
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(resetNewsItemDataSpy).toHaveBeenCalledTimes(1);
        });
    });

    function renderPage(useSelectorReturn, requestingNewsId) {
        useSelectorSpy           = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy           = jest.spyOn(reactRedux, 'useDispatch');
        loadNewsItemActionMock   = jest.spyOn(loadNewsItemActions, 'default');
        resetNewsItemDataSpy     = jest.spyOn(newsReducerActions, 'resetNewsItemData');
        createBlockingActionMock = jest.spyOn(createBlockingActions, 'default');

        useSelectorSpy.mockReturnValue(useSelectorReturn);
        useDispatchSpy.mockImplementation(jest.fn(() => jest.fn()));
        loadNewsItemActionMock.mockImplementation(jest.fn());
        resetNewsItemDataSpy.mockImplementation(jest.fn());
        createBlockingActionMock.mockImplementation((dispatch, action, data) => Promise.resolve(action(data)));

        act(() => {
            const renderRes = render(
                <MemoryRouter initialEntries={[`${ARTICLE}/${requestingNewsId}`]}>
                    <Route path={`${ARTICLE}/:id`}>
                        <NewsViewerPageContainer />
                    </Route>
                    <Route>
                        not found
                    </Route>
                </MemoryRouter>
            );
            container       = renderRes.container;
        });
    }
});
