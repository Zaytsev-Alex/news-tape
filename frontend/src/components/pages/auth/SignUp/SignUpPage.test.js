import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import SignUpPage from './SignUpPage';

describe('SignUpPage tests', () => {
    const signUpUserMock = jest.fn();
    let container        = null;
    const firstNameValue = 'first name';
    const lastNameValue  = 'last name';
    const emailValue     = 'email@email.email';
    const passwordValue  = 'paSS12@#!dsaAD';

    beforeEach(() => {
        const renderRes = render(
            <BrowserRouter>
                <SignUpPage signUpUser={signUpUserMock}/>
            </BrowserRouter>
        );
        container = renderRes.container;
    });

    it('SignUp page should be rendered', () => {
        expect(container.querySelector('.auth__header').textContent).toBe('Sign Up');
    });

    it('Submit method should be called with entered values, when required fields are filled', () => {
        enterRequiredFields(container, firstNameValue, lastNameValue, emailValue, passwordValue);
        submitForm(container);

        expect(signUpUserMock).toBeCalledWith(
            expect.objectContaining({
                                        firstName: firstNameValue,
                                        lastName:  lastNameValue,
                                        email:     emailValue,
                                        password:  passwordValue
                                    })
        );
    });

    it('Submit method should be called with entered values, when required fields and request editor rights fields are filled', () => {
        enterRequiredFields(container, firstNameValue, lastNameValue, emailValue, passwordValue);
        checkRequestEditorRights();
        submitForm(container);

        expect(signUpUserMock).toBeCalledWith(
            expect.objectContaining({
                                        firstName:     firstNameValue,
                                        lastName:      lastNameValue,
                                        email:         emailValue,
                                        password:      passwordValue,
                                        requestEditor: true,
                                    })
        );
    });

    it('Submit should be disabled when not all required fields are not entered (1)', () => {
        enterEmail(container, 'email.email@email.email');
        expectSubmitButtonIsDisabled();
    });

    it('Submit should be disabled when not all required fields are not entered (2)', () => {
        enterEmail(container, 'email.email@email.email');
        enterFirstName(container, firstNameValue);
        expectSubmitButtonIsDisabled();
    });

    it('Submit should be disabled when invalid email is entered', () => {
        enterEmail(container, 'email.email');
        expectSubmitButtonIsDisabled();
    });

    it('Submit should be disabled when not safe password is entered', () => {
        enterPassword(container, 'pass');
        expectSubmitButtonIsDisabled();
    });

    function checkRequestEditorRights() {
        const requestEditor = container.querySelector('.auth__form input[type="checkbox"]');

        fireEvent(
            requestEditor,
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );
    }

    function expectSubmitButtonIsDisabled() {
        const submitButton = container.querySelector('.submit-button');
        expect(submitButton).toBeInTheDocument();
    }
});

export function enterRequiredFields(container, firstName, lastName, email, password) {
    enterFirstName(container, firstName);
    enterLastName(container, lastName);
    enterEmail(container, email);
    enterPassword(container, password);
}

export function enterFirstName(container, firstNameValue) {
    const firstNameField = container.querySelector('.auth__first-name input');
    fireEvent.change(firstNameField, {target: {value: firstNameValue}});
}

export function enterLastName(container, lastNameValue) {
    const lastNameField = container.querySelector('.auth__last-name input');
    fireEvent.change(lastNameField, {target: {value: lastNameValue}});
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
