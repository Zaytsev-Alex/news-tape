import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsViewerPage from '../NewsViewerPage';
import * as reactRedux from 'react-redux';

describe('NewsViewerPage tests', () => {
    let container      = null;
    const newsDataMock = {content: 'content', title: 'title', createdDate: new Date()};

    beforeEach(() => {
        renderNewsViewerPage();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should be defined', () => {
            expect(container.querySelector('.news-viewer')).toBeInTheDocument();
        });

        it('article should be rendered when its data is passed', () => {
            renderNewsViewerPage(newsDataMock, false);
            expect(container.querySelector('.news-viewer__article')).toBeInTheDocument();
        });

        it('not found card should be rendered when requestingNewsNotFound is true', () => {
            renderNewsViewerPage(null, true);
            expect(container.querySelector('.news-viewer__not-found')).toBeInTheDocument();
        });

        it('nothing should be rendered when requestingNewsNotFound is false and news\' data is not passed ', () => {
            renderNewsViewerPage(null, false);
            expect(container.querySelector('.news-viewer')).not.toBeInTheDocument();
        });
    });

    function renderNewsViewerPage(newsData = newsDataMock, requestingNewsNotFound = false) {
        const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue({});
        useDispatchSpy.mockReturnValue(jest.fn());

        const renderRes = render(
            <BrowserRouter>
                <NewsViewerPage
                    requestingNewsNotFound={requestingNewsNotFound}
                    newsData={newsData}
                />
            </BrowserRouter>
        );
        container       = renderRes.container;
    }
});
