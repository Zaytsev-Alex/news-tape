import {act, fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import EditorRequestsPage from '../EditorRequestsPage';
import * as reactRedux from 'react-redux';

describe('EditorRequestsPage tests', () => {
    let container          = null;
    const approveMock      = jest.fn();
    const denyMock         = jest.fn();
    const requests         = [{id: 1, user: {}}, {id: 2, user: {}}, {id: 3, user: {}}]
    const onChangePageMock = jest.fn();
    const currentPage      = 2;
    const lastPage         = 7;
    let useSelectorSpy     = null;
    let useDispatchSpy     = null;

    beforeEach(() => {
        useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        useSelectorSpy.mockReturnValue({});
        useDispatchSpy.mockReturnValue(jest.fn());

        act(() => {
            const renderRes = render(
                <BrowserRouter>
                    <EditorRequestsPage
                        approvePermissions={approveMock}
                        denyPermissions={denyMock}
                        requests={requests}
                        onChangePageCallback={onChangePageMock}
                        currentPage={currentPage}
                        lastPage={lastPage}
                    />
                </BrowserRouter>
            );
            container       = renderRes.container;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should be defined', () => {
            expect(container.querySelector('.editor-requests')).toBeInTheDocument();
        });

        it('should be rendered correct number of editor requests', () => {
            expect([...container.querySelectorAll('.editor-request-item')].length).toBe(requests.length);
        });

        it('pagination should be rendered', () => {
            expect(container.querySelector('.editor-requests__pagination')).toBeInTheDocument();
        });

        it('should be rendered no data message when there are no requests', () => {
            render(
                <BrowserRouter>
                    <EditorRequestsPage
                        approvePermissions={approveMock}
                        denyPermissions={denyMock}
                        requests={[]}
                        onChangePageCallback={onChangePageMock}
                        currentPage={currentPage}
                        lastPage={lastPage}
                    />
                </BrowserRouter>
            );

            expect(screen.getByText('No editor requests found yet...')).toBeInTheDocument();
        });
    });

    describe('behavior', () => {
        it('onChangePageCallback callback should be called when user selects page in paginator', () => {
            const pageItemButton = container.querySelector('.editor-requests__pagination li:last-child button');

            fireEvent(
                pageItemButton,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(onChangePageMock).toBeCalledTimes(1);
        });

        it('onChangePageCallback callback should be called correct page number when user selects page in paginator', () => {
            const pageItemButton = container.querySelector('.editor-requests__pagination li:last-child button');

            fireEvent(
                pageItemButton,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(onChangePageMock).toBeCalledWith(currentPage + 1);
        });
    });
});
