import React from 'react';
import Logout from './Logout';
import EditorRequestLink from './EditorRequestLink';
import CreateNewsLink from './CreateNewsLink';
import styles from './styles.module.css';

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <CreateNewsLink />
            <EditorRequestLink />
            <Logout />
        </nav>
    );
};

export default Navigation;
