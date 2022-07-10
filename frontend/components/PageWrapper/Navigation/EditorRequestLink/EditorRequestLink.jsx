import React from 'react';
import {EDITOR_REQUESTS} from '../../../../constants/routerPaths';
import Link from 'next/link';

const EditorRequestLink = () => {
    return (
        <Link href={EDITOR_REQUESTS}>
            <a className="link navigation__item editor-request">
                Editor Requests
            </a>
        </Link>
    );
};

export default EditorRequestLink;
