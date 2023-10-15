import {createContext, useEffect, useState} from 'react';

const DistrictContext = createContext();

const DistrictProvider = ({children}) => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        // Fetch the data from the API endpoint
        fetch('http://localhost:3500/district')
            .then((response) => response.json())
            .then((data) => setDistricts(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <DistrictContext.Provider value={{districts}}>
            {children}
        </DistrictContext.Provider>
    );
};

export {DistrictContext, DistrictProvider};
