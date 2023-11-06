import React, {useRef} from 'react';
import {useLoaderData} from "react-router-dom";
import {
    Button,
    FormControl,
    FormHelperText,
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
import axios from "../../api/axios.js";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import {AddIcon} from "@chakra-ui/icons";

function StaffAccountManage(props) {
    const staffs = useLoaderData();
    const toast = useToast();

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý tài khoản nhân viên</Heading>
            <HStack mt={5}>
                <Spacer/>
                <Button leftIcon={<AddIcon/>} colorScheme="telegram" onClick={onOpen}>Thêm</Button>
            </HStack>
            <SearchFilter searchPlaceholder="Tìm kiếm theo tên đăng nhập, tên club quản lý" data={staffs} methods={[
                {value: 'username', label: 'Tên đăng nhập'},
                {value: 'clubName', label: 'Tên club quản lý'}
            ]} properties={['username', 'clubName']} DisplayData={
                ({filteredData}) => (
                    <TableContainer bgColor="white" borderRadius="4px">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Tên nhân viên</Th>
                                    <Th>Tài khoản</Th>
                                    <Th>Số điện thoại</Th>
                                    <Th>Mã club</Th>
                                    <Th>Tên club</Th>
                                    <Th textAlign="center">Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map((staff) => (
                                    <Tr key={staff.username}>
                                        <Td>
                                            <Text>{staff.lastName} {staff.firstName}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{staff.username}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{staff.phone}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{staff.clubId}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{staff.clubName}</Text>
                                        </Td>
                                        <Td textAlign="center">
                                            <ConfirmationDialog colorScheme="red" title="Xóa" onConfirm={async () => {
                                                const res = await axios.delete(`/account/deleteStaffAccount/${staff.username}`)

                                                if (res.data.status == 'Ok') {
                                                    toast({
                                                        title: "Xóa thành công",
                                                        description: "Tài khoản đã được xóa khỏi hệ thống",
                                                        status: "success",
                                                        duration: 700,
                                                        isClosable: true,
                                                        position: "top-right"
                                                    });
                                                    window.location.reload();
                                                } else {
                                                    toast({
                                                        title: "Xóa thất bại",
                                                        description: "Tài khoản không được xóa khỏi hệ thống",
                                                        status: "error",
                                                        duration: 700,
                                                        isClosable: true,
                                                        position: "top-right"
                                                    });
                                                }
                                            }}>Xóa</ConfirmationDialog>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )
            }/>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Thêm tài khoản nhân viên</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);
                            console.log(JSON.stringify(data))

                            try {
                                const res = await axios.post(
                                    '/account/addNewStaff',
                                    JSON.stringify(data),
                                    {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })

                                if (res.data.data.status == true) {
                                    toast({
                                        title: "Thêm thành công",
                                        description: "Tài khoản đã được thêm vào hệ thống",
                                        status: "success",
                                        duration: 700,
                                        isClosable: true,
                                        position: "top-right"
                                    });
                                    onClose();
                                    window.location.reload();
                                } else {
                                    toast({
                                        title: "Thêm thất bại",
                                        description: "Tài khoản đã tồn tại",
                                        status: "error",
                                        duration: 700,
                                        isClosable: true,
                                        position: "top-right"
                                    });
                                }
                            } catch (e) {
                                toast({
                                    title: "Thêm thất bại",
                                    description: "Tài khoản đã tồn tại",
                                    status: "error",
                                    duration: 700,
                                    isClosable: true,
                                    position: "top-right"
                                });
                            }
                        }}>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Tài khoản</FormLabel>
                                <Input name="username" type="tel" ref={initialRef}
                                       placeholder='Nhập tài khoản'/>
                                <FormHelperText>Không thể đổi sau khi đã tạo</FormHelperText>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input name="password" type="text" ref={initialRef}
                                       placeholder='Nhập mật khẩu'/>
                                <FormHelperText>Nên yêu cầu nhân viên đổi sau khi tạo</FormHelperText>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Mã club quản lý</FormLabel>
                                <Input name="clubId" type="text" ref={initialRef}
                                       placeholder='Nhập mật khẩu'/>
                                <FormHelperText>Tìm kiếm ở phần club, sao chép và dán vào</FormHelperText>
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
        </>
    );
}

export default StaffAccountManage;

export const staffAccountLoader = async () => {
    const res = await axios.get('/v1/getAllStaff');

    return res.data;
}