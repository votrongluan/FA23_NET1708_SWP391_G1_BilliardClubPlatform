import React, {useContext, useState} from 'react';
import {Box, Container, Heading} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import EditFieldBox from "../../components/EditFieldBox.jsx";
import CheckClubAuth from "../../components/CheckClubAuth.jsx";

function OwnClub() {
    const [club, setClub] = useState(useLoaderData());
    const {districtMap} = useContext(GlobalContext);

    return (
        <CheckClubAuth>
            <Container maxW="1200px" as="main">
                <Heading mb={5} as="h2" size="lg" textAlign="center">Quản lý club</Heading>
                <Box>
                    <EditFieldBox title="Tên club" value={club.clubName} url={`/v1/updateClub`} type="text"
                                  propertyName="clubName" oldData={club} setNewData={setClub}/>
                    <EditFieldBox title="Địa chỉ"
                                  value={club.address} type="text"
                                  propertyName="address" oldData={club} url={`/v1/updateClub`} setNewData={setClub}
                                  helperText="(tên đường, phường xã không bao gồm quận, huyện)"/>
                    <EditFieldBox title="Quận, huyện" value={districtMap[club.districtId]} type="select" oldData={club}
                                  url={`/v1/updateClub`} setNewData={setClub}
                                  propertyName="districtId" isSelect={true} selectOptions={districtMap}/>
                    <EditFieldBox title="Email" value={club.email} type="email"
                                  propertyName="email" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                    <EditFieldBox title="Số điện thoại" value={club.phone} type="tel"
                                  propertyName="phone" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                    <EditFieldBox title="Fanpage link" value={club.fanpageLink} type="text"
                                  propertyName="fanpageLink" oldData={club} url={`/v1/updateClub`}
                                  setNewData={setClub}/>
                    <EditFieldBox title="Giờ mở cửa" value={club.openTime} type="number"
                                  propertyName="openTime" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                    <EditFieldBox title="Giờ đóng cửa" value={club.closeTime} type="number"
                                  propertyName="closeTime" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                </Box>
            </Container>
        </CheckClubAuth>
    );
}

export default OwnClub;