import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import * as reactRedux from 'react-redux';
import * as signUpActions from '../../actions/auth/signUp';
import SignUpPageContainer from './SignUpPageContainer';
import {enterRequiredFields, submitForm} from './SignUpPage.test';

describe('SignUpPageContainer tests', () => {
    let container        = null;
    const firstNameValue = 'first name';
    const lastNameValue  = 'last name';
    const emailValue     = 'email@email.email';
    const passwordValue  = 'paSS12@#!dsaAD';
    let useDispatchSpy   = null;
    let signUpSpy        = null;

    beforeEach(() => {
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        signUpSpy      = jest.spyOn(signUpActions, 'default');
        useDispatchSpy.mockReturnValue(() => Promise.resolve());

        const renderRes = render(
            <BrowserRouter>
                <SignUpPageContainer/>
            </BrowserRouter>
        );
        container = renderRes.container;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Sign up user action should be called', () => {
        enterRequiredFields(container, firstNameValue, lastNameValue, emailValue, passwordValue);
        submitForm(container);

        expect(signUpSpy).toBeCalledWith(
            expect.objectContaining({
                                        firstName: firstNameValue,
                                        lastName:  lastNameValue,
                                        email:     emailValue,
                                        password:  passwordValue
                                    })
        );
    });
});
