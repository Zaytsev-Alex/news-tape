import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import CreateNewsPage from '../CreateNewsPage';
import NOTIFICATION_TYPES from '../../../../constants/notificationTypes';
import * as reactRedux from 'react-redux';

describe('CreateNewsPage tests', () => {
    let container               = null;
    const createNewsMock        = jest.fn();
    const resetNotificationMock = jest.fn();

    beforeEach(() => {
        renderCreateNews();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should be defined', () => {
            expect(container.querySelector('.create-news__form')).toBeInTheDocument();
        });

        it('Title input should be defined', () => {
            expect(container.querySelector('.create-news__title-input')).toBeInTheDocument();
        });

        it('Markdown editor should be defined', () => {
            expect(container.querySelector('.markdown-editor')).toBeInTheDocument();
        });

        it('Markdown viewer should be defined', () => {
            expect(container.querySelector('.create-news__markdown-viewer')).toBeInTheDocument();
        });

        it('Submit button should be defined', () => {
            expect(container.querySelector('.submit-button')).toBeInTheDocument();
        });
    });

    describe('behavior', () => {
        describe('notification', () => {
            it('if notificationType is success, success message should be rendered', () => {
                renderCreateNews(NOTIFICATION_TYPES.SUCCESS);
                expect(container.querySelector('.create-news__notification').textContent).toBe('Created');
            });

            it('if notificationType is fail, fail message should be rendered', () => {
                renderCreateNews(NOTIFICATION_TYPES.FAIL);
                expect(container.querySelector('.create-news__notification').textContent).toBe('Whoops. Error occurred.');
            });

            it('if notificationType is not given, no message should be rendered', () => {
                expect(container.querySelector('.create-news__notification')).not.toBeInTheDocument();
            });

            it('if there is notification and user makes changes, resetNotification should be called', () => {
                renderCreateNews(NOTIFICATION_TYPES.FAIL);
                enterContent(container, 'content');
                expect(resetNotificationMock).toBeCalledTimes(1);
            });

            it('if there is no notification and user makes changes, resetNotification should not be called', () => {
                enterContent(container, 'content');
                expect(resetNotificationMock).toBeCalledTimes(0);
            });
        });

        describe('validation', () => {
            it('by default submit should be disabled', () => {
                expectSubmitButtonIsDisabled();
            });

            it('when user enters only title, submit button should be disabled', () => {
                enterTitle(container, 'title');
                expectSubmitButtonIsDisabled();
            });

            it('when user enters only content, submit button should be disabled', () => {
                enterContent(container, 'content');
                expectSubmitButtonIsDisabled();
            });

            it('when user enters all required fields, submit button should be enabled', () => {
                enterTitle(container, 'title');
                enterContent(container, 'content');
                expectSubmitButtonIsEnabled();
            });

            function expectSubmitButtonIsDisabled() {
                const submitButton = container.querySelector('.submit-button');
                expect(submitButton).toBeDisabled();
            }

            function expectSubmitButtonIsEnabled() {
                const submitButton = container.querySelector('.submit-button');
                expect(submitButton).not.toBeDisabled();
            }
        });

        describe('submit', () => {
            it('when user submits form, createNews should be called', () => {
                enterContent(container, 'content');
                enterTitle(container, 'title');
                submitForm(container);

                expect(createNewsMock).toBeCalledTimes(1);
            });

            it('createNews should be called with correct criteria', () => {
                const criteria = {content: 'content', title: 'title'};
                enterContent(container, criteria.content);
                enterTitle(container, criteria.title);
                submitForm(container);

                expect(createNewsMock).toBeCalledWith(
                    expect.objectContaining(criteria)
                );
            });
        });
    });

    function renderCreateNews(notificationType) {
        const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue({});
        useDispatchSpy.mockReturnValue(jest.fn());

        const renderRes = render(
            <BrowserRouter>
                <CreateNewsPage
                    createNews={createNewsMock}
                    resetNotification={resetNotificationMock}
                    notificationType={notificationType}
                />
            </BrowserRouter>
        );
        container       = renderRes.container;
    }
});

export function enterTitle(container, title) {
    const titleField = container.querySelector('.create-news__title-input input');
    fireEvent.change(titleField, {target: {value: title}});
}

export function enterContent(container, content) {
    const contentField = container.querySelector('.create-news__content-group textarea');
    fireEvent.change(contentField, {target: {value: content}});
}

export function submitForm(container) {
    fireEvent(
        container.querySelector('.submit-button'),
        new MouseEvent('click', {
            bubbles:    true,
            cancelable: true,
        })
    );
}
