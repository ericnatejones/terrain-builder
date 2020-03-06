import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ToggleContextProvider} from "./context/toggleContext"
import {SelectionContextProvider} from "./context/selectionContext"

ReactDOM.render(
    <ToggleContextProvider>
        <SelectionContextProvider>
            <App />
        </SelectionContextProvider>
    </ToggleContextProvider>,
    document.getElementById('root')
);
