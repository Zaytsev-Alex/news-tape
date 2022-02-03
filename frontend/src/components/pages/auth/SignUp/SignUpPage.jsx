import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Card, CheckboxToggle, Input, StrongPasswordInput} from 'react-rainbow-components';
import PageWrapper from '../../../common/PageWrapper';
import {SIGN_IN} from '../../../../constants/routerPaths';
import {getPasswordStrength, PASSWORD_SECURITY_STATES, validateEmail} from '../../../../helpers/validators';
import {FIELD_NAMES} from '../constants';
import '../index.css';

const SignUpPage = ({signUpUser}) => {
    const [userData, setUserData]         = useState({});
    const [valid, setValid]               = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    useEffect(() => {
        setValid(validateForm());
    }, [userData]);

    useEffect(() => {
        const email = (userData[FIELD_NAMES.EMAIL] || '').trim();
        if (email.length) {
            setIsEmailValid(!!(email && validateEmail(email)));
        }
    }, [userData[FIELD_NAMES.EMAIL]]);

    function changeField(name, value) {
        setUserData({...userData, [name]: value});
    }

    function validateForm() {
        return userData[FIELD_NAMES.EMAIL]
            && isEmailValid
            && (userData[FIELD_NAMES.FIRST_NAME] || '').trim().length
            && (userData[FIELD_NAMES.LAST_NAME] || '').trim().length
            && (userData[FIELD_NAMES.PASSWORD] || '').trim().length
            && getPasswordStrength(userData[FIELD_NAMES.PASSWORD]) === PASSWORD_SECURITY_STATES.STRONG;
    }

    function onSubmit() {
        signUpUser(userData);
    }

    const changeValueHandlers = {
        [FIELD_NAMES.FIRST_NAME]:     (event) => changeField(FIELD_NAMES.FIRST_NAME, event.target.value),
        [FIELD_NAMES.LAST_NAME]:      (event) => changeField(FIELD_NAMES.LAST_NAME, event.target.value),
        [FIELD_NAMES.EMAIL]:          (event) => changeField(FIELD_NAMES.EMAIL, event.target.value),
        [FIELD_NAMES.PASSWORD]:       (event) => changeField(FIELD_NAMES.PASSWORD, event.target.value),
        [FIELD_NAMES.REQUEST_EDITOR]: () => changeField(FIELD_NAMES.REQUEST_EDITOR, !userData[FIELD_NAMES.REQUEST_EDITOR]),
    }

    const passwordState = getPasswordStrength(userData[FIELD_NAMES.PASSWORD]);

    return (
        <PageWrapper className="content-center" hideNavigation>
            <Card className="auth">
                <form className="auth__form">
                    <fieldset className="auth__fieldset">
                        <legend className="auth__header">Sign Up</legend>
                        <Input
                            label="First Name"
                            type="text"
                            className="rainbow-p-around_medium auth__item auth__first-name"
                            onChange={changeValueHandlers[FIELD_NAMES.FIRST_NAME]}
                            value={userData[FIELD_NAMES.FIRST_NAME] || ''}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <Input
                            label="Second Name"
                            type="text"
                            className="rainbow-p-around_medium auth__item auth__last-name"
                            onChange={changeValueHandlers[FIELD_NAMES.LAST_NAME]}
                            value={userData[FIELD_NAMES.LAST_NAME] || ''}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            className="rainbow-p-around_medium auth__item"
                            onChange={changeValueHandlers[FIELD_NAMES.EMAIL]}
                            value={userData[FIELD_NAMES.EMAIL] || ''}
                            error={isEmailValid ? null : 'Email is not valid'}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <StrongPasswordInput
                            label="Password"
                            bottomHelpText="Your password must be at least 8 characters long, includes characters in lower and upper case and special characters."
                            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto auth__item"
                            value={userData[FIELD_NAMES.PASSWORD] || ''}
                            passwordState={passwordState}
                            onChange={changeValueHandlers[FIELD_NAMES.PASSWORD]}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <CheckboxToggle
                            label="Request editor's rights"
                            value={userData[FIELD_NAMES.REQUEST_EDITOR]}
                            onChange={changeValueHandlers[[FIELD_NAMES.REQUEST_EDITOR]]}
                            className="auth__item"
                        />
                        <Button
                            label="Sign Up"
                            onClick={onSubmit}
                            variant="brand"
                            className="rainbow-m-around_medium auth__item submit-button"
                            disabled={!valid}
                            shaded
                        />
                        <Link to={SIGN_IN} className="link auth__link">
                            Already have an account?
                        </Link>
                    </fieldset>
                </form>
            </Card>
        </PageWrapper>
    );
};

SignUpPage.propTypes = {
    signUpUser: PropTypes.func.isRequired,
}

export default SignUpPage;
