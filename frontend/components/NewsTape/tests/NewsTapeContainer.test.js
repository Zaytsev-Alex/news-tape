import {act, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsTapeContainer from '../NewsTapeContainer';
import * as reactRedux from 'react-redux';
import * as createBlockingActions from '../../../actions/blockingAction';
import * as loadNewsActions from '../../../actions/news/loadNews';
import {nextButtonPress} from './NewsCard.test';

describe('NewsTapeContainer tests', () => {
    let container                = null;
    let useSelectorSpy           = null;
    let useDispatchSpy           = null;
    let loadNewsMock             = null;
    let createBlockingActionMock = null;
    const news                   = [{title: '0', content: '0'}, {title: '1', content: '1'}, {title: '2', content: '2'}];
    const loadNewsReturn         = {payload: {views: news, lastPage: 3, currentPage: 1}};

    beforeEach(() => {
        useSelectorSpy           = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy           = jest.spyOn(reactRedux, 'useDispatch');
        createBlockingActionMock = jest.spyOn(createBlockingActions, 'default');
        loadNewsMock             = jest.spyOn(loadNewsActions, 'default');

        useSelectorSpy.mockReturnValue({});
        useDispatchSpy.mockImplementation(jest.fn(() => jest.fn()));
        createBlockingActionMock.mockImplementation((dispatch, action, data) => Promise.resolve(action(data)));
        loadNewsMock.mockReturnValue(loadNewsReturn);

        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <NewsTapeContainer />
                </BrowserRouter>
            );
            container       = renderRes.container;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(container.querySelector('.news-card')).toBeInTheDocument();
    });

    describe('behavior', () => {
        describe('loadNews', () => {
            it('should be called with first page to initialize component', () => {
                expect(loadNewsMock).toHaveBeenCalledTimes(1);
                expect(loadNewsMock).toHaveBeenCalledWith({page: 1, take: 10});
            });

            it('should call loadMore method, when user presses next arrow on the last item', () => {
                nextButtonPress(container);
                nextButtonPress(container);
                nextButtonPress(container);
                expect(loadNewsMock).toHaveBeenCalledTimes(2);
                expect(loadNewsMock).toHaveBeenCalledWith({page: 2, take: 10});
            });
        });
    });
});
