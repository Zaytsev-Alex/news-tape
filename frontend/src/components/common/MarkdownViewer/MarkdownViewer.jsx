import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const MarkdownViewer = ({children}) => {
    return (
        <ReactMarkdown className="markdown-viewer">
            {children}
        </ReactMarkdown>
    );
};

MarkdownViewer.propTypes = {
    children: PropTypes.node
};

export default MarkdownViewer;
