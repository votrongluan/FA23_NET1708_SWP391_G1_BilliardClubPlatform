import React, {useContext, useState} from 'react';
import {Box, Container, Heading, Link as ChakraLink, Text} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import EditFieldBox from "../../components/EditFieldBox.jsx";
import CheckClubAuth from "../../components/CheckClubAuth.jsx";
import {ExternalLinkIcon} from "@chakra-ui/icons";

function OwnClub() {
    const [club, setClub] = useState(useLoaderData());
    const {districtMap} = useContext(GlobalContext);

    return (
        <CheckClubAuth>
            <Container maxW="1200px" as="main">
                <Heading mb={5} as="h2" size="lg" textAlign="center">Quản lý club</Heading>
                <Box>
                    <EditFieldBox title="Tên club" value={club.clubName ? club.clubName :
                        <Text color="gray.500">(Chưa có thông tin)</Text>} url={`/v1/updateClub`} type="text"
                                  propertyName="clubName" oldData={club} setNewData={setClub}/>
                    <EditFieldBox title="Địa chỉ"
                                  value={club.address ? club.address :
                                      <Text color="gray.500">(Chưa có thông tin)</Text>} type="text"
                                  propertyName="address" oldData={club} url={`/v1/updateClub`} setNewData={setClub}
                                  helperText="(tên đường, phường xã không bao gồm quận, huyện)"/>
                    <EditFieldBox title="Quận, huyện"
                                  value={districtMap[club.districtId] ? districtMap[club.districtId] :
                                      <Text color="gray.500">(Chưa có thông tin)</Text>} type="select" oldData={club}
                                  url={`/v1/updateClub`} setNewData={setClub}
                                  propertyName="districtId" isSelect={true} selectOptions={districtMap}/>
                    <EditFieldBox title="Email"
                                  value={club.email ? club.email : <Text color="gray.500">(Chưa có thông tin)</Text>}
                                  type="email"
                                  propertyName="email" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                    <EditFieldBox title="Số điện thoại"
                                  value={club.phone ? club.phone : <Text color="gray.500">(Chưa có thông tin)</Text>}
                                  type="tel"
                                  propertyName="phone" oldData={club} url={`/v1/updateClub`} setNewData={setClub}/>
                    <EditFieldBox title="Fanpage link" value={club.fanpageLink ?
                        <ChakraLink color="blue.500" href={club.fanpageLink} isExternal>
                            {club.fanpageLink}
                            <ExternalLinkIcon mx="2px"/>
                        </ChakraLink> :
                        <Text color="gray.500">(Chưa có thông tin)</Text>} type="text"
                                  propertyName="fanpageLink" oldData={club} url={`/v1/updateClub`}
                                  setNewData={setClub}/>
                    <EditFieldBox title="Avatar link" value={club.avatarLink ?
                        <ChakraLink color="blue.500" href={club.avatarLink} isExternal>
                            {club.avatarLink}
                            <ExternalLinkIcon mx="2px"/>
                        </ChakraLink> :
                        <Text color="gray.500">(Chưa có thông tin)</Text>} type="text"
                                  propertyName="avatarLink" oldData={club} url={`/v1/updateClub`}
                                  setNewData={setClub}/>
                    <EditFieldBox title="Giờ hoạt động" value={`${club.openTime}h - ${club.closeTime}h`} type="slider"
                                  propertyName={['openTime', 'closeTime']} oldData={club} url={`/v1/updateClub`}
                                  setNewData={setClub}
                                  isRangeSlier={true} rangeSliderMin={0} rangeSliderMax={24} rangeSliderStep={1}/>
                </Box>
            </Container>
        </CheckClubAuth>
    );
}

export default OwnClub;