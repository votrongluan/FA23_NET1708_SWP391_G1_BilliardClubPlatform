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
    useDisclosure
} from "@chakra-ui/react";
import SearchFilter from "../../components/SearchFilter.jsx";

function ClubManage(props) {
    const clubs = useLoaderData();
    const {tableTypeMap, districtMap} = useContext(GlobalContext);

    clubs.forEach((club) => {
        club.district = districtMap[club.districtId];
    })

    console.log(clubs)

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý club</Heading>
            <HStack>
                <Spacer/>
                <Button colorScheme="telegram" onClick={onOpen}>Thêm</Button>
            </HStack>
            <SearchFilter data={clubs} methods={[
                {value: 'name', label: 'Tên club'},
                {value: 'district', label: 'Quận / huyện'},
            ]} DisplayData={
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
                                    <Tr key={club.id}>
                                        <Td>
                                            <Text>{club.id}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.name}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.address}, {districtMap[club.districtId]}</Text>
                                        </Td>
                                        <Td>
                                            <Text>{club.phone}</Text>
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
                    <ModalHeader>Thêm club</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);

                            console.log(data);
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Tên club</FormLabel>
                                <Input name="name" type="text" ref={initialRef}
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