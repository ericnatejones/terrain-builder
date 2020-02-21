import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ToggleContextProvider} from "./context/toggleContext"


ReactDOM.render(
    <ToggleContextProvider>
                <App />
    </ToggleContextProvider>,
    document.getElementById('root')
);
