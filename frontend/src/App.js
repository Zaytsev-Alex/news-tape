import React, {useState} from 'react';
import {Card, Rating} from 'react-rainbow-components';
import logo from './logo.svg';
import './App.css';

const SimpleRating = () => {
    const [value, setValue] = useState();

    function handleOnChange(event) {
        return setValue(event.target.value);
    }

    return <Rating value={value} onChange={handleOnChange}/>;
};

function App() {
    return (
        <Card
            footer={
                <div>
                    <div className="rainbow-flex rainbow-flex_column rainbow-align_start rainbow-m-bottom_x-small">
                        <h3 className="rainbow-font-size-heading_medium">
                            News Tape
                        </h3>
                        <h3>
                            Give us your rate about how you like this
                        </h3>
                    </div>
                    <SimpleRating/>
                </div>
            }
        >
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
            </div>
        </Card>
    );
}

export default App;
