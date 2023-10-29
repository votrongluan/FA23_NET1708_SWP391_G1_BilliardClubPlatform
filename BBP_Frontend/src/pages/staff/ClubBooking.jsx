import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Select,
    Spinner,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import axios, {baseURL} from "../../api/axios.js";
import {useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import SearchFilter from "../../components/SearchFilter.jsx";

function ClubBooking(props) {
    const {id} = useParams();
    const {slotMap, tableTypeMap} = useContext(GlobalContext);
    const bookings = useLoaderData();
    const [tables, setTables] = useState(null);
    const [tableType, setTableType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [loading, setLoading] = useState(true);

    bookings.forEach((book) => {
        book.type = tableTypeMap[book.tableTypeId];
        book.time = slotMap[book.firstSlotId];
    })

    console.log(bookings)

    useEffect(() => {
        fetch(baseURL + '/v1/getTablesByClubId/' + id)
            .then((response) => response.json())
            .then((data) => {
                setTables(data);
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Lịch đặt bàn</Heading>
            <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
                <TabList>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Đơn đặt bàn</Tab>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Xem lịch của bàn</Tab>
                </TabList>

                <TabPanels py="10px">
                    <TabPanel>
                        <SearchFilter data={bookings} methods={
                            [
                                {value: 'userPhone', label: 'Số điện thoại'},
                                {value: 'date', label: 'Ngày đặt'},
                                {value: 'time', label: 'Giờ đặt'},
                                {value: 'type', label: 'Loại bàn'},
                                {value: 'tableId', label: 'Mã bàn'},
                                {value: 'price', label: 'Giá tiền'}
                            ]
                        } properties={['userPhone', 'date', 'time', 'type', 'tableId', 'price']} DisplayData={
                            ({filteredData}) => (
                                <TableContainer bgColor="white" borderRadius="4px">
                                    <Table variant='simple'>
                                        <Thead>
                                            <Tr>
                                                <Th>Mã bàn</Th>
                                                <Th>Loại bàn</Th>
                                                <Th>Số điện thoại</Th>
                                                <Th>Ngày đặt</Th>
                                                <Th>Giờ đặt</Th>
                                                <Th>Giá tiền</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {filteredData.map((book) => (
                                                <Tr key={book.bookingId}>
                                                    <Td>{book.tableId}</Td>
                                                    <Td>{book.type}</Td>
                                                    <Td>{book.userPhone}</Td>
                                                    <Td>{book.date}</Td>
                                                    <Td>
                                                        <HStack spacing={5}>
                                                            <Text>{
                                                                book.firstSlotId === book.lastSlotId ?
                                                                    slotMap[book.firstSlotId] + ' - ' + Number(Number(slotMap[book.firstSlotId]) + 1) :
                                                                    slotMap[book.firstSlotId] + ' - ' + Number(Number(slotMap[book.lastSlotId]) + 1)
                                                            }</Text>
                                                            <Text color="gray.500">(h)</Text>
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack spacing={5}>
                                                            <Text>{book.price.toLocaleString('en-US')}</Text>
                                                            <Text color="gray.500">(đồng)</Text>
                                                        </HStack>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                        />
                    </TabPanel>

                    <TabPanel>
                        <Box bgColor="white" borderRadius={5} p={10}>
                            <FormControl>
                                <FormLabel>Chọn loại bàn</FormLabel>
                                <Select onChange={(e) => {
                                    setTableType(e.target.value)
                                }}>
                                    {Object.entries(tableTypeMap).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl mt={5}>
                                <FormLabel>Nhập ngày</FormLabel>
                                <Input type="date" onChange={(e) => {
                                    console.log(e.target.value)
                                }}/>
                            </FormControl>
                            <FormControl mt={5}>
                                <FormLabel>Chọn mã bàn</FormLabel>
                                <Select onChange={(e) => {
                                    setSelectedTableId(e.target.value)
                                }}>
                                    {tables.map((table) => {
                                        if (table.tableTypeId == tableType) {
                                            return <option key={table.id}
                                                           value={table.id}>{table.id}</option>
                                        }
                                    })}
                                </Select>
                            </FormControl>
                            <Grid maxW="800px" templateColumns="repeat(4, 1fr)" gap={5} justifyItems="center"
                                  margin="20px auto">
                                {Object.entries(slotMap).map(([k, v]) => (
                                    <GridItem key={k}>
                                        <Box
                                            size="lg"
                                            border="1px solid black"
                                            color="black"
                                            p={10}
                                            minW="180px"
                                            borderRadius="4px"
                                            textAlign="center"
                                        >
                                            <VStack>
                                                <Text>{v}h</Text>
                                                {Math.random() < 0.5 ?
                                                    <Text color="gray.500">(Trống)</Text> :
                                                    <Text color="gray.500">0971781359</Text>}
                                            </VStack>
                                        </Box>
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

export default ClubBooking;

export const clubBookingLoader = async ({params}) => {
    const {id} = params;

    try {
        const res = await axios.get(`/booking/getBookingsByClubId/${id}`);

        if (!res.data) return [];

        return res.data.data;
    } catch {
        return [];
    }
}