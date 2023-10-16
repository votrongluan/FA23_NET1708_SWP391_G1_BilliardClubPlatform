import React from 'react';
import {useLoaderData} from "react-router-dom";
import {Button, Heading, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {baseURL} from "../../api/axios.js";
import SearchFilter from "../../components/SearchFilter.jsx";

function ClubSlot(props) {
    const slots = useLoaderData();

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý giờ, giá</Heading>
            <SearchFilter data={slots} methods={[
                {value: 'type', label: 'Loại bàn'},
                {value: 'time', label: 'Khung giờ'},
                {value: 'price', label: 'Giá tiền'},
            ]} DisplayData={
                ({filteredData}) => (
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Loại bàn</Th>
                                    <Th>Khung giờ</Th>
                                    <Th>Giá tiền</Th>
                                    <Th>Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map((slot) => (
                                    <Tr key={slot.type + slot.time}>
                                        <Td>{slot.type}</Td>
                                        <Td>
                                            <HStack spacing={5}>
                                                <Text>{slot.time}</Text>
                                                <Text color="gray.500">(h)</Text>
                                            </HStack>
                                        </Td>
                                        <Td>
                                            <HStack spacing={5}>
                                                <Text>{slot.price.toLocaleString('en-US')}</Text>
                                                <Text color="gray.500">(đồng)</Text>
                                            </HStack>
                                        </Td>
                                        <Td>
                                            <Button colorScheme="red">Xóa</Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )
            }/>
        </>
    );
}

export default ClubSlot;

export const slotLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(baseURL + '/slotClubOne')

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}