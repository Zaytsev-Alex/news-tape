import React from 'react';
import styles from './styles.module.css';

const Footer = () => {
    const year = (new Date()).getFullYear();
    return (
        <footer className={styles.footer}>
            {`© ${year} Copyright News Tape`}
        </footer>
    );
};

export default Footer;
