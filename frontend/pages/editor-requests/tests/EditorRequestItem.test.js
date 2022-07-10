import {fireEvent, render, screen} from '@testing-library/react';
import EditorRequestItem from '../EditorRequestItem';
import {extractUserName} from '../../../helpers/utils';

describe('EditorRequestItem tests', () => {
    let container     = null;
    const denyMock    = jest.fn();
    const approveMock = jest.fn();
    const requestData = {
        id:   11,
        user: {
            firstName: 'firstName',
            lastName:  'lastName',
            email:     'email@email.com',
        }
    }

    beforeEach(() => {
        const renderRes = render(
            <EditorRequestItem
                denyPermissions={denyMock}
                approvePermissions={approveMock}
                requestData={requestData}
            />
        );
        container       = renderRes.container;
    });

    describe('render', () => {
        it('should be rendered', () => {
            expect(container.querySelector('.editor-request-item')).toBeInTheDocument();
        });

        it('should render approve button', () => {
            expect(screen.getByText('Approve')).toBeInTheDocument();
        });

        it('should render deny button', () => {
            expect(screen.getByText('Deny')).toBeInTheDocument();
        });

        it('should render user name', () => {
            expect(screen.getByText(extractUserName(requestData.user))).toBeInTheDocument();
        });

        it('should render user email', () => {
            expect(screen.getByText(requestData.user.email)).toBeInTheDocument();
        });
    });

    describe('behavior', () => {
       it('approvePermissions callback should be called when user clicks on approve button', () => {
           const approveButton = screen.getByText('Approve');

           fireEvent(
               approveButton,
               new MouseEvent('click', {
                   bubbles:    true,
                   cancelable: true,
               })
           );

           expect(approveMock).toBeCalledTimes(1);
       });

        it('approvePermissions callback should be called with request id when user clicks on approve button', () => {
            const approveButton = screen.getByText('Approve');

            fireEvent(
                approveButton,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(approveMock).toBeCalledWith(requestData.id);
        });

        it('denyPermissions callback should be called when user clicks on deny button',() => {
            const denyButton = screen.getByText('Deny');

            fireEvent(
                denyButton,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(denyMock).toBeCalledTimes(1);
        });

        it('denyPermissions callback should be called with request id when user clicks on deny button', () => {
            const denyButton = screen.getByText('Deny');

            fireEvent(
                denyButton,
                new MouseEvent('click', {
                    bubbles:    true,
                    cancelable: true,
                })
            );

            expect(denyMock).toBeCalledWith(requestData.id);
        });
    });
});
