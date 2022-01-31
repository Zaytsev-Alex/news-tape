import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({logoutUser}) => {
    return (
        <button onClick={logoutUser} type="button" className="link logout">
            Logout
        </button>
    );
};

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default Logout;
