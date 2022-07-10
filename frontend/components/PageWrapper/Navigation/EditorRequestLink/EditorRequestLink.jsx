import React from 'react';
import {Link} from 'react-router-dom';
import {EDITOR_REQUESTS} from '../../../../constants/routerPaths';

const EditorRequestLink = () => {
    return (
        <Link to={EDITOR_REQUESTS} className="link navigation__item editor-request">Editor Requests</Link>
    );
};

export default EditorRequestLink;
