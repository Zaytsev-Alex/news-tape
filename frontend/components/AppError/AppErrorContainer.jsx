import React from 'react';
import AppError from './AppError';
import {useDispatch, useSelector} from 'react-redux';
import {selectAppError} from '../../helpers/storeHelper';
import {clearError} from '../../reducers/appErrorSlice';

const AppErrorContainer = () => {
    const dispatch = useDispatch();
    const {error}  = useSelector(selectAppError);

    function handleCLose() {
        dispatch(clearError());
    }

    return !!error && (
        <AppError errorText={error} onClose={handleCLose}/>
    );
};

export default AppErrorContainer;
