import React from 'react';
import Logout from './Logout';
import EditorRequestLink from './EditorRequestLink';
import './index.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <EditorRequestLink />
            <Logout />
        </nav>
    );
};

export default Navigation;
