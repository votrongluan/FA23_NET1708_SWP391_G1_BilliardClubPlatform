import React from 'react';
import {GlobalProvider} from "./context/GlobalContext.jsx";

function TestComponent(props) {
    return (
        <GlobalProvider>
            <h1>Hello</h1>
        </GlobalProvider>
    );
}

export default TestComponent;