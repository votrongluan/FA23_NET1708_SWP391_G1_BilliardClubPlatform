import React, {useContext, useRef} from 'react';
import axios from "../../api/axios.js";
import {useLoaderData, useParams} from "react-router-dom";
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import SearchFilter from "../../components/SearchFilter.jsx";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import CheckClubAuth from "../../components/CheckClubAuth.jsx";
import useAuth from "../../hooks/useAuth.js";
import Pagination from "../../components/Pagination.jsx";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import {EditIcon} from "@chakra-ui/icons";

function ClubTable(props) {
    const tables = useLoaderData();
    const {id} = useParams();
    const {tableTypeMap} = useContext(GlobalContext);
    const {auth} = useAuth();
    const toast = useToast();

    tables.forEach((table) => {
        table.type = tableTypeMap[table.tableTypeId];
    })

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <CheckClubAuth>
            <Heading as="h2" size="lg" textAlign="center">Quản lý bàn</Heading>
            <HStack mt={5}>
                <Spacer/>
                <Button leftIcon={<EditIcon/>} colorScheme="telegram" onClick={onOpen}>Cập nhật</Button>
            </HStack>
            <SearchFilter searchPlaceholder="Tìm kiếm theo loại bàn, mã bàn" data={tables} methods={[
                {value: 'type', label: 'Loại bàn'},
                {value: 'id', label: 'Mã bàn'}
            ]} DisplayData={
                ({filteredData}) => (
                    <Pagination itemsPerPage={10} data={filteredData} DisplayData={({currentData}) => (
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
                                    {currentData.map((table) => (
                                        <Tr key={table.id}>
                                            <Td>
                                                <Text>{table.id}</Text>
                                            </Td>
                                            <Td>
                                                <Text>{table.type}</Text>
                                            </Td>
                                            <Td textAlign="center">
                                                <ConfirmationDialog
                                                    title="Xóa"
                                                    onConfirm={async () => {
                                                        try {
                                                            const res = await axios.delete(
                                                                `/v1/deleteTable/${table.id}`)

                                                            if (res.data.status == 'Ok') {
                                                                toast({
                                                                    title: "Xóa thành công",
                                                                    description: "Bàn đã được xóa khỏi hệ thống",
                                                                    status: "success",
                                                                    duration: 700,
                                                                    position: "top-right"
                                                                });
                                                                window.location.reload();
                                                            } else {
                                                                toast({
                                                                    title: "Xóa thất bại",
                                                                    description: "Bàn không được xóa khỏi hệ thống",
                                                                    status: "error",
                                                                    duration: 700,
                                                                    position: "top-right"
                                                                });
                                                            }
                                                        } catch (e) {
                                                            toast({
                                                                title: "Xóa thất bại",
                                                                description: "Bàn không được xóa khỏi hệ thống",
                                                                status: "error",
                                                                duration: 700,
                                                                position: "top-right"
                                                            });
                                                        }
                                                    }}/>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}/>
                )
            } properties={['id', 'type']}/>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Cập nhật thông tin về giá</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);
                            data.clubId = parseInt(id);

                            try {
                                const res = await axios.post(
                                    '/v1/addTable',
                                    JSON.stringify(data),
                                    {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })

                                if (res.data.status == "Ok") {
                                    toast({
                                        title: "Thêm thành công",
                                        description: "Bàn đã được thêm vào hệ thống",
                                        status: "success",
                                        duration: 700,
                                        position: "top-right"
                                    });

                                    onClose();
                                    window.location.reload();
                                }
                            } catch (e) {
                                toast({
                                    title: "Thêm thất bại",
                                    description: "Bàn không được thêm vào hệ thống",
                                    status: "error",
                                    duration: 700,
                                    position: "top-right"
                                });
                            }
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Số lượng</FormLabel>
                                <Input name="noTable" type="number" ref={initialRef}
                                       placeholder='Nhập số lượng bàn cần thêm'/>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Loại bàn</FormLabel>
                                <Select name="tableTypeId">
                                    {Object.entries(tableTypeMap).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <HStack mt={10}>
                                <Spacer/>
                                <Button colorScheme='blue' mr={3} type="submit">
                                    Xác nhận
                                </Button>
                                <Button onClick={onClose}>Hủy</Button>
                            </HStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </CheckClubAuth>
    );
}

export default ClubTable;

export const tableLoader = async ({params}) => {
    const {id} = params;

    const res = await axios.get(`/v1/getTablesByClubId/${id}`);

    return res.data;
}