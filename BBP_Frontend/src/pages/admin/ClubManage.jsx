import React, {useContext, useRef} from 'react';
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
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
import axios from "../../api/axios.js";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import {AddIcon} from "@chakra-ui/icons";

function ClubManage(props) {
    const data = useLoaderData();
    const toast = useToast();
    const clubs = [];
    const {tableTypeMap, districtMap} = useContext(GlobalContext);

    data.forEach((club) => {
        club.club.district = districtMap[club.club.districtId];
        clubs.push(club.club);
    })

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý club</Heading>
            <HStack mt={5}>
                <Spacer/>
                <Button leftIcon={<AddIcon/>} colorScheme="telegram" onClick={onOpen}>Thêm</Button>
            </HStack>
            <SearchFilter searchPlaceholder="Tìm theo tên, số điện thoại, địa chỉ" data={clubs} methods={[
                {value: 'clubName', label: 'Tên club'},
                {value: 'district', label: 'Quận / huyện'},
            ]} properties={["clubName", "phone", "address"]} DisplayData={
                ({filteredData}) => (
                    <TableContainer bgColor="white" borderRadius="4px">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Mã club</Th>
                                    <Th>Tên club</Th>
                                    <Th>Địa chỉ</Th>
                                    <Th>Số điện thoại</Th>
                                    <Th textAlign="center">Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map((club) => (
                                    <Tr key={club.clubId}>
                                        <Td>
                                            <Text>{club.clubId}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.clubName}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.address}, {districtMap[club.districtId]}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.phone}</Text>
                                        </Td>
                                        <Td textAlign="center">
                                            <ConfirmationDialog title="Xóa" onConfirm={async () => {
                                                const res = await axios.delete(
                                                    `/v1/deleteClub/${club.clubId}`)

                                                if (res.data.status == 'Ok') {
                                                    toast({
                                                        title: "Xóa thành công",
                                                        description: "Club đã được xóa khỏi hệ thống",
                                                        status: "success",
                                                        duration: 700,
                                                        isClosable: true,
                                                        position: "top-right"
                                                    });
                                                    window.location.reload();
                                                } else {
                                                    toast({
                                                        title: "Xóa thất bại",
                                                        description: "Club không được xóa khỏi hệ thống",
                                                        status: "error",
                                                        duration: 700,
                                                        isClosable: true,
                                                        position: "top-right"
                                                    });
                                                }
                                            }} colorScheme="red">Xóa</ConfirmationDialog>
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
                    <ModalHeader>Thêm club</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);

                            if (!data.phone.match(/^[0-9]{9,11}$/)) {
                                toast({
                                    title: "Cập nhật thất bại",
                                    description: "Số điện thoại không hợp lệ",
                                    status: "error",
                                    duration: 700,
                                    isClosable: true,
                                    position: "top-right"
                                });
                                return;
                            }

                            const res = await axios.post(
                                '/v1/clubInsert',
                                JSON.stringify(data),
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })

                            if (res.data.status == 'Ok') {
                                toast({
                                    title: "Thêm thành công",
                                    description: "Club đã được thêm vào hệ thống",
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
                                    description: "Club không được thêm vào hệ thống",
                                    status: "error",
                                    duration: 700,
                                    isClosable: true,
                                    position: "top-right"
                                });
                            }
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Tên club</FormLabel>
                                <Input name="clubName" type="text" ref={initialRef}
                                       placeholder='Nhập tên club'/>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Địa chỉ</FormLabel>
                                <Input name="address" type="text" ref={initialRef}
                                       placeholder='Nhập địa chỉ'/>
                                <FormHelperText>Chỉ nhập số nhà, tên đường, phường xã</FormHelperText>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Chọn quận / huyện</FormLabel>
                                <Select name="districtId" placeholder="Chọn quận / huyện">
                                    {Object.entries(districtMap).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Số điện thoại liên lạc</FormLabel>
                                <Input name="phone" type="tel" ref={initialRef}
                                       placeholder='Nhập số điện thoại'/>
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

export default ClubManage;