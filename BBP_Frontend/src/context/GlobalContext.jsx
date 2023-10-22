import {createContext, useEffect, useState} from 'react';
import axios from "../api/axios.js";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [districtMap, setDistrictMap] = useState([]);
    const [tableTypeMap, setTableTypeMap] = useState([]);
    const [slotMap, setSlotMap] = useState([]);

    useEffect(() => {
        axios.get('/v1/allDistrict')
            .then(response => {
                setDistrictMap(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{districtMap, tableTypeMap, slotMap}}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalProvider};
