import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Navigation from './Navigation';
import Footer from './Footer';
import styles from './styles.module.css';

const PageWrapper = ({children, className = '', hideFooter = false, hideHeader = false, hideNavigation = false}) => {
    return (
        <section className={`${styles.app}  ${styles[className]}`}>
            {!hideHeader && (
                <header className={styles.header}>
                    <Logo/>
                    {!hideNavigation && (
                        <Navigation/>
                    )}
                </header>
            )}
            <main className={styles.main}>
                {children}
            </main>
            {!hideFooter && (
                <Footer/>
            )}
        </section>
    );
};

PageWrapper.propTypes = {
    children:       PropTypes.node,
    className:      PropTypes.string,
    hideFooter:     PropTypes.bool,
    hideHeader:     PropTypes.bool,
    hideNavigation: PropTypes.bool,
}

export default PageWrapper;
