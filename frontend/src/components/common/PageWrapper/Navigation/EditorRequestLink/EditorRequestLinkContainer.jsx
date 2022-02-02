import React from 'react';
import EditorRequestLink from './EditorRequestLink';
import {useSelector} from 'react-redux';
import {getUserData} from '../../../../../helpers/storeHelper';

const EditorRequestLinkContainer = () => {
    const userData = useSelector(getUserData);

    return !!userData.isAdmin && (
        <EditorRequestLink />
    );
};

export default EditorRequestLinkContainer;
