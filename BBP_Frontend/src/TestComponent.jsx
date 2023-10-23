import React, {useContext} from 'react';
import {GlobalContext} from "./context/GlobalContext.jsx";

function TestComponent() {
    const {districtMap, slotMap, tableTypeMap, bookingStatusMap} = useContext(GlobalContext)
    console.log(districtMap)
    console.log(slotMap)
    console.log(tableTypeMap)
    console.log(bookingStatusMap)


    return (
        <h1>abc</h1>
    );
}

export default TestComponent;