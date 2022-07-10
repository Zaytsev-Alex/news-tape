import * as reactRedux from 'react-redux';
import {act, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import * as createNewsActions from '../../../actions/news/createNews';
import * as newsReducerActions from '../../../reducers/newsSlice';
import * as createBlockingActions from '../../../actions/blockingAction';
import CreateNewsPageContainer from '../CreateNewsPageContainer';
import NOTIFICATION_TYPES from '../../../constants/notificationTypes';
import {enterContent, enterTitle, submitForm} from './CreateNewsPage.test';

describe('EditorRequestsPageContainer tests', () => {
    let container                = null;
    let useSelectorSpy           = null;
    let useDispatchSpy           = null;
    let createNewsActionMock     = null;
    let resetNotificationMock    = null;
    let createBlockingActionMock = null;

    beforeEach(() => {
        renderPage();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be rendered', () => {
        expect(container.querySelector('.create-news__form')).toBeInTheDocument();
    });

    describe('behavior', () => {
        it('resetNotification', () => {
            renderPage({notificationType: NOTIFICATION_TYPES.FAIL});
            enterContent(container, 'content');
            expect(resetNotificationMock).toBeCalledTimes(1);
        });

        describe('createNews action', () => {
            it('createNews action should be called on submit', () => {
                enterContent(container, 'content');
                enterTitle(container, 'title');
                submitForm(container);

                expect(createNewsActionMock).toBeCalledTimes(1);
            });

            it('createNews action should be called with correct criteria', () => {
                const criteria = {content: 'content', title: 'title'};
                enterContent(container, criteria.content);
                enterTitle(container, criteria.title);
                submitForm(container);

                expect(createNewsActionMock).toBeCalledWith(
                    expect.objectContaining(criteria)
                );
            });
        });
    });

    function renderPage(useSelectorReturn = {}) {
        useSelectorSpy           = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy           = jest.spyOn(reactRedux, 'useDispatch');
        createNewsActionMock     = jest.spyOn(createNewsActions, 'default');
        resetNotificationMock    = jest.spyOn(newsReducerActions, 'resetNotification');
        createBlockingActionMock = jest.spyOn(createBlockingActions, 'default');

        useSelectorSpy.mockReturnValue(useSelectorReturn);
        useDispatchSpy.mockImplementation(jest.fn(() => jest.fn()));
        createNewsActionMock.mockImplementation(jest.fn());
        resetNotificationMock.mockImplementation(jest.fn());
        createBlockingActionMock.mockImplementation((dispatch, action, data) => Promise.resolve(action(data)));

        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <CreateNewsPageContainer />
                </BrowserRouter>
            );
            container       = renderRes.container;
        });
    }
});
