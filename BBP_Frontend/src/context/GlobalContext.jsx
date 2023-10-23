import {createContext, useEffect, useState} from 'react';
import axios from "../api/axios.js";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [districtMap, setDistrictMap] = useState([]);
    const [tableTypeMap, setTableTypeMap] = useState([]);
    const [slotMap, setSlotMap] = useState([]);
    const [bookingStatusMap, setBookingStatusMap] = useState([]);

    useEffect(() => {
        axios.get('/v1/allDistrict')
            .then(response => {
                const data = response.data.data;
                const districtMap = {};
                data.forEach((district) => {
                        districtMap[district.districtId] = district.districtName;
                    }
                );
                setDistrictMap(districtMap);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('/v1/allTableType')
            .then(response => {
                const data = response.data.data;
                const tableTypeMap = {};
                data.forEach((tableType) => {
                        tableTypeMap[tableType.tableTypeId] = tableType.typeName;
                    }
                );
                setTableTypeMap(tableTypeMap);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('/bookingStatus/getAll')
            .then(response => {
                const data = response.data.data;
                const bookingStatusMap = {};
                data.forEach((bookingStatus) => {
                        bookingStatusMap[bookingStatus.bookingStatusId] = bookingStatus.status;
                    }
                );
                setBookingStatusMap(bookingStatusMap);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('/v1/getSlots')
            .then(response => {
                const data = response.data;
                const slotMap = {};
                data.forEach((slot) => {
                        slotMap[slot.slotId] = slot.startTime;
                    }
                );
                setSlotMap(slotMap);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{districtMap, tableTypeMap, slotMap, bookingStatusMap}}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalProvider};
