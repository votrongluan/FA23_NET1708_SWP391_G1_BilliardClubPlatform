import React, {useContext} from 'react';
import {Box, Container, Heading} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import EditFieldBox from "../../components/EditFieldBox.jsx";

function OwnClub() {
    const club = useLoaderData();
    const {districtMap} = useContext(GlobalContext);

    return (
        <Container maxW="1200px" as="main">
            <Heading mb={5} as="h2" size="lg" textAlign="center">Quản lý club</Heading>
            <Box>
                <EditFieldBox title="Tên club" value={club.clubName}/>
                <EditFieldBox title="Địa chỉ" value={`${club.address}, ${districtMap[club.districtId]}`}/>
                <EditFieldBox title="Email" value={club.name}/>
                <EditFieldBox title="Số điện thoại" value={club.phone}/>
                <EditFieldBox title="Fanpage link" value={club.fanpageLink}/>
                <EditFieldBox title="Giờ mở cửa" value={club.openTime}/>
                <EditFieldBox title="Giờ đóng cửa" value={club.closeTime}/>
            </Box>
        </Container>
    );
}

export default OwnClub;