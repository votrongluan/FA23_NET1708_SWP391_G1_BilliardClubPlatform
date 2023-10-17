import {createContext, useEffect, useState} from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [districts, setDistricts] = useState([]);
    const [tableTypes, setTableTypes] = useState([]);

    useEffect(() => {
        // Fetch the data from the API endpoint
        fetch('http://localhost:3500/district')
            .then((response) => response.json())
            .then((data) => setDistricts(data))
            .catch((error) => console.error('Error fetching data:', error));
        // Fetch the data from the API endpoint
        fetch('http://localhost:3500/tableType')
            .then((response) => response.json())
            .then((data) => setTableTypes(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <GlobalContext.Provider value={{districts}}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalProvider};
