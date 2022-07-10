import React from 'react';
import {CREATE_NEWS} from '../../../../constants/routerPaths';
import Link from 'next/link';

const CreateNewsLink = () => {
    return (
        <Link href={CREATE_NEWS}>
            <a className="link navigation__item create-news-link">
                Create news
            </a>
        </Link>
    );
};

export default CreateNewsLink;
