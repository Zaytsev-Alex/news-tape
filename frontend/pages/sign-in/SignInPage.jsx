import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Input} from 'react-rainbow-components';
import {FIELD_NAMES} from '../../constants/authContants';
import PageWrapper from '../../components/PageWrapper';
import Link from 'next/link';
import {SIGN_UP} from '../../constants/routerPaths';
import styles from './styles.module.css';

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
            <Card className={styles.auth}>
                <form className="auth__form">
                    <fieldset className={styles.auth__fieldset}>
                        <legend className={styles.auth__header}>Sign In</legend>
                        <Input
                            label="Email"
                            type="email"
                            className={`rainbow-p-around_medium ${styles.auth__item}`}
                            onChange={changeValueHandlers[FIELD_NAMES.EMAIL]}
                            value={userData[FIELD_NAMES.EMAIL] || ''}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            className={`rainbow-p-around_medium ${styles.auth__item}`}
                            onChange={changeValueHandlers[FIELD_NAMES.PASSWORD]}
                            value={userData[FIELD_NAMES.PASSWORD] || ''}
                            labelAlignment="left"
                            maxLength={255}
                            required
                        />
                        <Button
                            label="Sign In"
                            onClick={onSubmit}
                            variant="brand"
                            className={`rainbow-m-around_medium submit-button ${styles.auth__item}`}
                            disabled={!validateForm()}
                            shaded
                        />
                        <Link href={SIGN_UP}>
                            <a className={`link ${styles.auth__link}`}>
                                Create an account
                            </a>
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
