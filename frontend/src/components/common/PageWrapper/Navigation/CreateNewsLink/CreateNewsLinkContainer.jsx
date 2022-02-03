import React from 'react';
import CreateNewsLink from './CreateNewsLink';
import {useSelector} from 'react-redux';
import {getUserData} from '../../../../../helpers/storeHelper';

const CreateNewsLinkContainer = () => {
    const userData = useSelector(getUserData);

    return !!userData.isAdmin && (
        <CreateNewsLink />
    );
};

export default CreateNewsLinkContainer;
