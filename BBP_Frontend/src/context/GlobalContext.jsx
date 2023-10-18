import {createContext, useEffect, useState} from 'react';
import {baseURL} from "../api/axios.js";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [districtMap, setDistrictMap] = useState([]);
    const [tableTypeMap, setTableTypeMap] = useState([]);
    const [slotMap, setSlotMap] = useState([]);

    useEffect(() => {
        // Fetch the data from the API endpoint
        fetch(baseURL + '/district')
            .then((response) => response.json())
            .then((data) => {
                const districtMap = {};
                data.forEach((district) => {
                        districtMap[district.id] = district.name;
                    }
                );
                setDistrictMap(districtMap);
            })
            .catch((error) => console.error('Error fetching data:', error));

        // Fetch the data from the API endpoint
        fetch(baseURL + '/tableType')
            .then((response) => response.json())
            .then((data) => {
                const tableTypeMap = {};
                data.forEach((tableType) => {
                        tableTypeMap[tableType.id] = tableType.name;
                    }
                );
                setTableTypeMap(tableTypeMap);
            })
            .catch((error) => console.error('Error fetching data:', error));

        // Fetch the data from the API endpoint
        fetch(baseURL + '/slot')
            .then((response) => response.json())
            .then((data) => {
                const slotMap = {};
                data.forEach((slot) => {
                        slotMap[slot.id] = slot.time;
                    }
                );
                setSlotMap(slotMap);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <GlobalContext.Provider value={{districtMap, tableTypeMap, slotMap}}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalProvider};
