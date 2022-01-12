import React from 'react';
import logo from '../../../assets/images/logo.svg';
import {Link} from 'react-router-dom';
import {ROOT} from '../../../constants/routerPaths';

const Logo = () => {
    return (
        <Link to={ROOT} className="logo-link">
            <img src={logo} className="logo-link__img" alt="go to home page"/>
        </Link>
    );
};

export default Logo;
