import {fireEvent, render} from '@testing-library/react';
import SignInPage from './SignInPage';
import {BrowserRouter} from 'react-router-dom';

describe('SignInPage tests', () => {
    const signInUserMock = jest.fn();
    let container        = null;
    const emailValue     = 'email@email.email';
    const passwordValue  = 'password';

    beforeEach(() => {
        const renderRes = render(
            <BrowserRouter>
                <SignInPage signInUser={signInUserMock}/>
            </BrowserRouter>
        );
        container = renderRes.container;
    });

    it('SignIn page should be rendered', () => {
        expect(container.querySelector('.auth__header').textContent).toBe('Sign In');
    });

    it('Submit method should be called with entered values', () => {
        enterRequiredFields(container, emailValue, passwordValue);
        submitForm(container);

        expect(signInUserMock).toBeCalledWith(
            expect.objectContaining({
                                        email:    emailValue,
                                        password: passwordValue
                                    })
        );
    });

    it('Submit button should be disabled, when email is not entered', () => {
        enterPassword(container, passwordValue);
        expectSubmitButtonIsDisabled();
    });

    it('Submit button should be disabled, when password is not entered', () => {
        enterEmail(container, emailValue)
        expectSubmitButtonIsDisabled();
    });

    function expectSubmitButtonIsDisabled() {
        const submitButton = container.querySelector('.submit-button');
        expect(submitButton).toBeInTheDocument();
    }
});

export function enterRequiredFields(container, email, password) {
    enterEmail(container, email);
    enterPassword(container, password);
}

export function enterEmail(container, email) {
    const emailField = container.querySelector('.auth__form input[type="email"]');
    fireEvent.change(emailField, {target: {value: email}});
}

export function enterPassword(container, password) {
    const passwordField = container.querySelector('.auth__form input[type="password"]');
    fireEvent.change(passwordField, {target: {value: password}});
}

export function submitForm(container) {
    const submitButton = container.querySelector('.submit-button');


    fireEvent(
        submitButton,
        new MouseEvent('click', {
            bubbles:    true,
            cancelable: true,
        })
    );
}
