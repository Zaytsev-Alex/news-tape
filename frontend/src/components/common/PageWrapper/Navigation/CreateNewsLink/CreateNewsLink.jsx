import React from 'react';
import {Link} from 'react-router-dom';
import {CREATE_NEWS} from '../../../../../constants/routerPaths';

const CreateNewsLink = () => {
    return (
        <Link to={CREATE_NEWS} className="link navigation__item create-news-link">Create news</Link>
    );
};

export default CreateNewsLink;
