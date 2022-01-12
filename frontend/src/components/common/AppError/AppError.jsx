import React from 'react';
import PropTypes from 'prop-types';
import {Notification} from 'react-rainbow-components';
import './index.css';

const AppError = ({errorText, onClose}) => {
    return (
        <div className="app-error">
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
