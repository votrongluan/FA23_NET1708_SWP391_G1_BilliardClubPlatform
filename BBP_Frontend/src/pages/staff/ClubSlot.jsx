import React, {useContext, useRef} from 'react';
import {useLoaderData} from "react-router-dom";
import {
    Button,
    Checkbox,
    CheckboxGroup,
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
    SimpleGrid,
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
import {baseURL} from "../../api/axios.js";
import SearchFilter from "../../components/SearchFilter.jsx";
import {GlobalContext} from "../../context/GlobalContext.jsx";

function ClubSlot(props) {
    const slots = useLoaderData();
    const {slotMap, tableTypeMap} = useContext(GlobalContext);

    slots.forEach((slot) => {
        slot.type = tableTypeMap[slot.tableTypeId];
        slot.time = slotMap[slot.slotId];
    })

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý giờ, giá</Heading>
            <HStack>
                <Spacer/>
                <Button colorScheme="telegram" onClick={onOpen}>Cập nhật</Button>
            </HStack>
            <SearchFilter data={slots} methods={[
                {value: 'type', label: 'Loại bàn'},
                {value: 'time', label: 'Khung giờ'},
                {value: 'price', label: 'Giá tiền'},
            ]} DisplayData={
                ({filteredData}) => (
                    <TableContainer bgColor="white" borderRadius="4px">
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Loại bàn</Th>
                                    <Th>Khung giờ</Th>
                                    <Th>Giá tiền</Th>
                                    <Th textAlign="center">Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredData.map((slot) => (
                                    <Tr key={slot.tableTypeId + '' + slot.slotId}>
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
                    <ModalHeader>Cập nhật thông tin về giá</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = {};

                            // Handle the slotId checkboxes manually
                            data.slotId = [];
                            formData.getAll("slotId").forEach((slotId) => {
                                data.slotId.push(slotId);
                            });

                            // Add other form fields to the data object
                            formData.forEach((value, key) => {
                                if (key !== "slotId") {
                                    data[key] = value;
                                }
                            });

                            console.log(data);
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Giá</FormLabel>
                                <Input name="price" type="number" ref={initialRef} placeholder='Nhập giá tiền'/>
                                <FormHelperText>Đơn vị: đồng</FormHelperText>
                            </FormControl>

                            <FormControl isRequired mt={4}>
                                <FormLabel>Loại bàn</FormLabel>
                                <Select name="tableTypeId">
                                    {Object.entries(tableTypeMap).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Khung giờ</FormLabel>
                                <CheckboxGroup>
                                    <SimpleGrid gap={5} columns={4} pl={5}>
                                        {Object.entries(slotMap).map(([key, value]) => (
                                            <Checkbox
                                                multiple
                                                size="lg"
                                                key={key}
                                                value={key}
                                                name="slotId"
                                            >
                                                {value}
                                            </Checkbox>
                                        ))}
                                    </SimpleGrid>
                                </CheckboxGroup>
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

export default ClubSlot;

export const slotLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(baseURL + '/slotClubOne')

    if (!res.ok) {
        throw Error('Không tìm thấy club')
    }

    return res.json()
}