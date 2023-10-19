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
    useDisclosure
} from "@chakra-ui/react";
import SearchFilter from "../../components/SearchFilter.jsx";
import {baseURL} from "../../api/axios.js";

function StaffAccountManage(props) {
    const staffs = useLoaderData();

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý tài khoản nhân viên</Heading>
            <HStack>
                <Spacer/>
                <Button colorScheme="telegram" onClick={onOpen}>Thêm</Button>
            </HStack>
            <SearchFilter data={staffs} methods={[
                {value: 'name', label: 'Tên nhân viên'},
                {value: 'phone', label: 'Số điện thoại'},
                {value: 'username', label: 'Tên đăng nhập'},
                {value: 'clubName', label: 'Tên club quản lý'}
            ]} DisplayData={
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
                                            <Text>{staff.name}</Text>
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
                                            <Button colorScheme="red">Xóa</Button>
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
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);

                            console.log(data);
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
    const res = await fetch(baseURL + '/staffAccount')

    if (!res.ok) {
        throw Error('Không tìm thấy tài khoản')
    }

    return res.json()
}