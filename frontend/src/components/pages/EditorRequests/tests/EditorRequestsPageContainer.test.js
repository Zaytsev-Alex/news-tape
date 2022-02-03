import * as reactRedux from 'react-redux';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import EditorRequestsPageContainer from '../EditorRequestsPageContainer';
import * as updateEditorPermissionsActions from '../../../../actions/users/updateEditorPermissions';
import * as loadEditorRequestsActions from '../../../../actions/editor-requests/loadEditorRequests';
import * as createBlockingActions from '../../../../actions/blockingAction';

describe('EditorRequestsPageContainer tests', () => {
    let container                       = null;
    let useSelectorSpy                  = null;
    let useDispatchSpy                  = null;
    let updateEditorPermissionsMock     = null;
    let loadEditorRequestsMock          = null;
    let createBlockingActionMock        = null;
    const requests                      = [{id: 1, user: {}}, {id: 2, user: {}}, {id: 3, user: {}}]
    const loadEditorRequestsReturn      = {payload: {views: requests, lastPage: 3, currentPage: 2}};
    const updateEditorPermissionsReturn = {payload: {data: {}}};

    beforeEach(() => {
        renderPage();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be rendered', () => {
        expect(container.querySelector('.editor-requests')).toBeInTheDocument();
    });

    describe('behaviour', () => {
        describe('loadEditorRequests', () => {
            it('should be called with first page to initialize component', () => {
                expect(loadEditorRequestsMock).toHaveBeenCalledTimes(1);
                expect(loadEditorRequestsMock).toHaveBeenCalledWith({page: 1, take: 10});
            });

            it('when there is no payload nothing should be set to state', () => {
                jest.clearAllMocks();
                renderPage(updateEditorPermissionsReturn, {error: 'error'});

                expect(screen.getByText('No editor requests found yet...')).toBeInTheDocument();
            });
        });

        describe('onChangePage', () => {

            it('onChangePage should trigger load of new requests', () => {
                const pageItemButton = container.querySelector('.editor-requests__pagination li:last-child button');

                act(() => {
                    fireEvent(
                        pageItemButton,
                        new MouseEvent('click', {
                            bubbles:    true,
                            cancelable: true,
                        })
                    );
                });

                expect(loadEditorRequestsMock).toHaveBeenCalledTimes(2);
                expect(loadEditorRequestsMock).toHaveBeenNthCalledWith(
                    2, {page: loadEditorRequestsReturn.payload.currentPage + 1, take: 10}
                );
            });

            it('onChangePage should not trigger load of new requests if new page is same as previous page', () => {
                const pageItemButton = container.querySelector(
                    `.editor-requests__pagination li:nth-child(${loadEditorRequestsReturn.payload.currentPage + 1}) button`
                );

                act(() => {
                    fireEvent(
                        pageItemButton,
                        new MouseEvent('click', {
                            bubbles:    true,
                            cancelable: true,
                        })
                    );
                });

                expect(loadEditorRequestsMock).toHaveBeenCalledTimes(1);
            });
        });

        describe('updateEditorPermissions', () => {
            it('should be called with deny property', () => {
                clickOnDeny();

                expect(updateEditorPermissionsMock).toHaveBeenCalledTimes(1);
                expect(updateEditorPermissionsMock).toHaveBeenCalledWith(
                    expect.objectContaining({approve: false, requestId: loadEditorRequestsReturn.payload.views[0].id})
                );
            });

            it('should be called with approve property', () => {
                clickOnApprove();

                expect(updateEditorPermissionsMock).toHaveBeenCalledTimes(1);
                expect(updateEditorPermissionsMock).toHaveBeenCalledWith(
                    expect.objectContaining({approve: true, requestId: loadEditorRequestsReturn.payload.views[0].id})
                );
            });

            it('should trigger loadRequests', async () => {
                clickOnDeny();

                await waitFor(() => {
                    expect(loadEditorRequestsMock).toHaveBeenCalledTimes(2);
                });
            });

            it('should not trigger loadRequests if update action was not successful', async () => {
                jest.clearAllMocks();
                renderPage({error: 'error'}, loadEditorRequestsReturn)

                expect(loadEditorRequestsMock).toHaveBeenCalledTimes(1);

                await waitFor(() => {
                    clickOnDeny();

                    expect(loadEditorRequestsMock).toHaveBeenCalledTimes(1);
                });
            });
        });
    });

    function renderPage(updatePermissionsReturn = updateEditorPermissionsReturn, loadRequestsReturn = loadEditorRequestsReturn) {
        useSelectorSpy              = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy              = jest.spyOn(reactRedux, 'useDispatch');
        updateEditorPermissionsMock = jest.spyOn(updateEditorPermissionsActions, 'default');
        loadEditorRequestsMock      = jest.spyOn(loadEditorRequestsActions, 'default');
        createBlockingActionMock    = jest.spyOn(createBlockingActions, 'default');

        useSelectorSpy.mockReturnValue({});
        updateEditorPermissionsMock.mockImplementation(jest.fn(() => updatePermissionsReturn));
        loadEditorRequestsMock.mockImplementation(jest.fn(() => loadRequestsReturn));
        useDispatchSpy.mockImplementation(jest.fn());
        createBlockingActionMock.mockImplementation((dispatch, action, data) => Promise.resolve(action(data)));

        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <EditorRequestsPageContainer />
                </BrowserRouter>
            );
            container       = renderRes.container;
        });
    }

    function clickOnDeny() {
        const button = container.querySelector('.editor-request-item button:first-child');

        act(() => {
            fireEvent(
                button,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );
        });
    }

    function clickOnApprove() {
        const button = container.querySelector('.editor-request-item button:last-child');

        act(() => {
            fireEvent(
                button,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );
        });
    }
});
