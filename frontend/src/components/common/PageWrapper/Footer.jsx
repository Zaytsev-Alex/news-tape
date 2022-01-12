import React from 'react';

const Footer = () => {
    const year = (new Date()).getFullYear();
    return (
        <footer className="footer">
            {`© ${year} Copyright News Tape`}
        </footer>
    );
};

export default Footer;
