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
    useToast,
    VStack
} from "@chakra-ui/react";
import axios, {baseURL} from "../../api/axios.js";
import {useLoaderData, useParams} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import SearchFilter from "../../components/SearchFilter.jsx";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import useAuth from "../../hooks/useAuth.js";

function ClubBooking(props) {
    const {id} = useParams();
    const toast = useToast();
    const {auth} = useAuth();
    const {slotMap, tableTypeMap} = useContext(GlobalContext);
    const bookings = useLoaderData();
    const [tables, setTables] = useState(null);
    const [tableType, setTableType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tableCalendar, setTableCalendar] = useState([]);
    const [renderTable, setRenderTable] = useState([]);

    bookings.forEach((book) => {
        book.type = tableTypeMap[book.tableTypeId];
        book.time = slotMap[book.firstSlotId];
    })

    useEffect(() => {
        fetch(baseURL + '/v1/getTablesByClubId/' + id)
            .then((response) => response.json())
            .then((data) => {
                setTables(data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].tableTypeId == tableType) {
                        setSelectedTableId(data[i].id);
                        break;
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedDate && selectedTableId) {
            console.log('đã vào')
            try {
                // Change yyyy-mm-dd to dd/mm/yyyy
                const date = selectedDate.split('-');
                const newDate = date[2] + '/' + date[1] + '/' + date[0];

                const res = axios.post(`/booking/getTableBookingDetail`, JSON.stringify({
                    tableId: selectedTableId,
                    bookDate: newDate
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    setTableCalendar(res.data);
                });
            } catch (err) {
                console.log(err);
            }
        }
    }, [selectedDate, selectedTableId]);

    function checkSlot(slotId) {
        return tableCalendar.some((item) => item.slotId == slotId);
    }

    function getSlotDetail(slotId) {
        return tableCalendar.find((item) => item.slotId == slotId);
    }

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
                        <SearchFilter
                            searchPlaceholder={"Tìm kiếm theo số điện thoại, ngày, giờ đặt, loại bàn, mã bàn, giá tiền"}
                            data={bookings} methods={
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
                                                <Th>Thành tiền</Th>
                                                <Th textAlign="center">Trạng thái</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {filteredData.map((book) => {
                                                if (!book.firstSlotId) return null;

                                                return (
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
                                                        <Td>
                                                            <HStack spacing={5}>
                                                                {book.bookingStatusId === 1 ?
                                                                    <ConfirmationDialog onConfirm={async () => {
                                                                        try {
                                                                            const res = await axios.put(`/bookingStatus/updateBookingStatus`, JSON.stringify({
                                                                                staffId: auth.id,
                                                                                bookingId: book.bookingId,
                                                                            }), {
                                                                                headers: {
                                                                                    'Content-Type': 'application/json'
                                                                                }
                                                                            });

                                                                            if (res.data.status == 'Ok') {
                                                                                toast({
                                                                                    title: "Thành công",
                                                                                    description: "Đã xác nhận thanh toán",
                                                                                    status: "success",
                                                                                    duration: 700,
                                                                                    isClosable: false,
                                                                                    position: "top-right"
                                                                                });
                                                                                window.location.reload();
                                                                            } else {
                                                                                toast({
                                                                                    title: "Thất bại",
                                                                                    description: "Đã xảy ra lỗi",
                                                                                    status: "error",
                                                                                    duration: 700,
                                                                                    isClosable: false,
                                                                                    position: "top-right"
                                                                                });
                                                                            }
                                                                        } catch (e) {
                                                                            console.log(e);
                                                                        }

                                                                    }} title="Xác nhận"
                                                                                        color="green"/>
                                                                    :
                                                                    <Text color="gray.500">
                                                                        (Đã thanh toán)
                                                                    </Text>}
                                                            </HStack>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
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
                                    setSelectedDate(e.target.value)
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
                            <Grid templateColumns="repeat(4, 1fr)" gap={5} justifyItems="center"
                                  margin="20px auto">
                                {Object.entries(slotMap).map(([k, v]) => (
                                    <GridItem key={k}>
                                        <Box
                                            size="lg"
                                            border="1px solid black"
                                            color="black"
                                            p={10}
                                            minW="180px"
                                            height="150px"
                                            borderRadius="4px"
                                            textAlign="center"
                                        >
                                            <VStack>
                                                <Text>{v}h</Text>
                                                {checkSlot(k) ?
                                                    <VStack fontWeight="medium">
                                                        <Text>SĐT: {getSlotDetail(k).userPhone}</Text>
                                                        <Text>Anh/chị: {getSlotDetail(k).firstName}</Text>
                                                    </VStack> :
                                                    <Text color="gray.500">(Trống)</Text>
                                                }
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