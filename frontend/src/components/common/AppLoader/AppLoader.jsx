import React from 'react';
import {Spinner} from 'react-rainbow-components';

const AppLoader = () => {
    return (
        <div className="rainbow-p-vertical_xx-large">
            <div className="rainbow-position_relative rainbow-m-vertical_xx-large rainbow-p-vertical_xx-large">
                <Spinner size="large"/>
            </div>
        </div>
    );
};

export default AppLoader;
