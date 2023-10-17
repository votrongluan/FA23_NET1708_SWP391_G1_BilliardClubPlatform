import React, {useContext} from 'react';
import {baseURL} from "../../api/axios.js";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import {Button, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import SearchFilter from "../../components/SearchFilter.jsx";

function ClubTable(props) {
    const tables = useLoaderData();
    const {tableTypeMap} = useContext(GlobalContext);

    tables.forEach((table) => {
        table.type = tableTypeMap[table.tableTypeId];
    })

    console.log(tables)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý giờ, giá</Heading>
            <SearchFilter data={tables} methods={[
                {value: 'type', label: 'Loại bàn'}
            ]} DisplayData={
                ({filteredData}) => (
                    <TableContainer bgColor="white" borderRadius="4px">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Mã bàn</Th>
                                    <Th>Loại bàn</Th>
                                    <Th textAlign="center">Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map((table) => (
                                    <Tr key={table.id}>
                                        <Td>
                                            <Text>{table.id}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{tableTypeMap[table.tableTypeId]}</Text>
                                        </Td>
                                        <Td textAlign="center">
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

export default ClubTable;

export const tableLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(baseURL + '/tableClubOne')

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}