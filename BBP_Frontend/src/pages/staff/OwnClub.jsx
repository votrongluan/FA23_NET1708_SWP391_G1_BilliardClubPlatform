import React, {useContext} from 'react';
import {Box, Container, Heading} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import EditFieldBox from "../../components/EditFieldBox.jsx";

function OwnClub(props) {
    const handleChange = (e) => {
        console.log('implement later')
    }
    const club = useLoaderData();
    const {districts} = useContext(GlobalContext);
    const district = districts.find((district) => district.id === club.districtId);

    return (
        <Container maxW="1200px" as="main">
            <Heading mb={5} as="h2" size="md" textAlign="center">Quản lý club</Heading>
            <Box>
                <EditFieldBox title="Tên club" value={club.name} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Địa chỉ" value={`${club.address}, ${district.name}`} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Email" value={club.name} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Số điện thoại" value={club.phone} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Fanpage link" value={club.fanpageLink} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Giờ mở cửa" value={club.openTime} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Giờ đóng cửa" value={club.closeTime} onEditClick={() => {
                    console.log('implement later')
                }}/>
            </Box>
        </Container>
    );
}

export default OwnClub;