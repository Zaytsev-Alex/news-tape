import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import SignInPageContainer from './SignInPageContainer';
import * as reactRedux from 'react-redux';
import * as signInActions from '../../../../actions/user/signIn';
import {enterRequiredFields, submitForm} from './SignInPage.test';

describe('SignInPageContainer tests', () => {
    let container       = null;
    const emailValue    = 'email@email.email';
    const passwordValue = 'password';
    let useDispatchSpy  = null;
    let signInSpy       = null;

    beforeEach(() => {
        useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        signInSpy      = jest.spyOn(signInActions, 'default');
        useDispatchSpy.mockReturnValue(() => Promise.resolve());

        const renderRes = render(
            <BrowserRouter>
                <SignInPageContainer/>
            </BrowserRouter>
        );
        container = renderRes.container;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Sign in user action should be called', () => {
        enterRequiredFields(container, emailValue, passwordValue);
        submitForm(container);

        expect(signInSpy).toBeCalledWith(
            expect.objectContaining({
                                        email:    emailValue,
                                        password: passwordValue
                                    })
        );
    });
});
