import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const MarkdownViewer = ({children, className}) => {
    return (
        <ReactMarkdown className={className}>
            {children}
        </ReactMarkdown>
    );
};

MarkdownViewer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MarkdownViewer;
