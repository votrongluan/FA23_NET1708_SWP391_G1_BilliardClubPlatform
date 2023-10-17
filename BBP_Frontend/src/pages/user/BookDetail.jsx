import React, {useContext} from 'react';
import {baseURL} from "../../api/axios.js";
import {useLoaderData} from "react-router-dom";
import {Card, CardBody, CardHeader, Container, Divider, Heading, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import useAuth from "../../hooks/useAuth.js";

function BookDetail(props) {
    const bookingDetail = useLoaderData();
    const {districtMap, slotMap, tableTypeMap} = useContext(GlobalContext)
    const {auth} = useAuth()

    return (
        <Container maxW="1200px" as="main" py={10}>
            <VStack>
                <CheckCircleIcon fontSize="44px" color="green.500"/>
                <Text as="h2" fontSize="20px" mb={5} textAlign="center">Cảm ơn quý khách đã đặt bàn trên hệ thống của
                    chúng tôi</Text>
                <Card w="550px">
                    <CardHeader>
                        <Heading textAlign="center" as="h3" fontSize="20px">Thông tin đặt bàn</Heading>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <HStack>
                            <Text color="gray.500">Club: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.clubName}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Đia chỉ: </Text>
                            <Spacer/>
                            <Text
                                fontWeight="semibold">{bookingDetail.clubAddress}, {districtMap[bookingDetail.districtId]}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Loại bàn: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{tableTypeMap[bookingDetail.tableTypeId]}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Ngày đặt: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.date}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Giờ đặt: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{
                                bookingDetail.firstSlotId === bookingDetail.lastSlotId ?
                                    slotMap[bookingDetail.firstSlotId] :
                                    slotMap[bookingDetail.firstSlotId] + ' - ' + Number(Number(slotMap[bookingDetail.lastSlotId]) + 1) + ' giờ'
                            }</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Họ tên khách hàng: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{auth?.lastName + ' ' + auth?.firstName}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Số điện thoại: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{auth?.phone}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Thành tiền: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.price} đồng</Text>
                        </HStack>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    );
}

export default BookDetail;

export const bookingDetailLoader = async ({params}) => {
    const {id} = params

    const res = await fetch(baseURL + '/getBookingDetail')

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}