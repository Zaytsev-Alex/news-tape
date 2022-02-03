import React from 'react';
import Logout from './Logout';
import EditorRequestLink from './EditorRequestLink';
import CreateNewsLink from './CreateNewsLink';
import './index.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <CreateNewsLink />
            <EditorRequestLink />
            <Logout />
        </nav>
    );
};

export default Navigation;
