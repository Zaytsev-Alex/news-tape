import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PageWrapper from '../../../common/PageWrapper';
import {Button, Card, Input} from 'react-rainbow-components';
import {Link} from 'react-router-dom';
import {SIGN_UP} from '../../../../constants/routerPaths';
import {FIELD_NAMES} from '../constants';
import '../index.css';

const SignInPage = ({signInUser}) => {
    const [userData, setUserData] = useState({});

    function changeField(name, value) {
        setUserData({...userData, [name]: value});
    }

    function validateForm() {
        return (userData[FIELD_NAMES.EMAIL] || '').trim().length
            && (userData[FIELD_NAMES.PASSWORD] || '').trim().length;
    }

    function onSubmit() {
        signInUser(userData);
    }

    const changeValueHandlers = {
        [FIELD_NAMES.EMAIL]:    (event) => changeField(FIELD_NAMES.EMAIL, event.target.value),
        [FIELD_NAMES.PASSWORD]: (event) => changeField(FIELD_NAMES.PASSWORD, event.target.value),
    }

    return (
        <PageWrapper className="content-center" hideNavigation>
            <Card className="auth">
                <form className="auth__form">
                    <fieldset className="auth__fieldset">
                        <legend className="auth__header">Sign In</legend>
                        <Input
                            label="Email"
                            type="email"
                            className="rainbow-p-around_medium auth__item"
                            onChange={changeValueHandlers[FIELD_NAMES.EMAIL]}
                            value={userData[FIELD_NAMES.EMAIL] || ''}
                            labelAlignment="left"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            className="rainbow-p-around_medium auth__item"
                            onChange={changeValueHandlers[FIELD_NAMES.PASSWORD]}
                            value={userData[FIELD_NAMES.PASSWORD] || ''}
                            labelAlignment="left"
                            required
                        />
                        <Button
                            label="Sign In"
                            onClick={onSubmit}
                            variant="brand"
                            className="rainbow-m-around_medium auth__item submit-button"
                            disabled={!validateForm()}
                            shaded
                        />
                        <Link to={SIGN_UP} className="link auth__link">
                            Create an account
                        </Link>
                    </fieldset>
                </form>
            </Card>
        </PageWrapper>
    );
};

SignInPage.propTypes = {
    signInUser: PropTypes.func.isRequired,
};

export default SignInPage;
