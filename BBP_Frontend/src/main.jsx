import React from 'react'
import ReactDOM from 'react-dom/client'
import {GlobalProvider} from "./context/GlobalContext.jsx";
import TestComponent from "./TestComponent.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalProvider>
            <TestComponent/>
        </GlobalProvider>
    </React.StrictMode>,
)
