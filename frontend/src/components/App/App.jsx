import React from 'react';
import RouterWrapper from '../router/RouterWrapper';
import AppLoader from '../common/AppLoader';
import AppError from '../common/AppError';

const App = () => {
    return (
        <>
            <AppLoader/>
            <AppError/>
            <RouterWrapper/>
        </>
    );
};

export default App;
