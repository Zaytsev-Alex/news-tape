import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from 'react-rainbow-components';
import styles from './styles.module.css';

const AppError = ({errorText, onClose}) => {
    return (
        <div className={styles.appError}>
            <Notification
                onRequestClose={onClose}
                description={errorText}
                title="Whooooops!"
                icon="error"
            />
        </div>
    );
};

AppError.propTypes = {
    errorText: PropTypes.string.isRequired,
    onClose:   PropTypes.func.isRequired,
};

export default AppError;
