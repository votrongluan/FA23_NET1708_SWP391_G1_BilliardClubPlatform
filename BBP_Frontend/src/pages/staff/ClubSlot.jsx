import React, {useContext, useRef, useState} from 'react';
import {useLoaderData, useParams} from "react-router-dom";
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
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import axios from "../../api/axios.js";
import SearchFilter from "../../components/SearchFilter.jsx";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import {EditIcon} from "@chakra-ui/icons";

function ClubSlot(props) {
    const [slots, setSlots] = useState(useLoaderData());
    const toast = useToast()
    const {id} = useParams();
    const {slotMap, tableTypeMap} = useContext(GlobalContext);

    slots.forEach((slot) => {
        slot.type = tableTypeMap[slot.tableType];
        slot.time = slotMap[slot.slotId];
    })

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <Heading as="h2" size="lg" textAlign="center">Quản lý giờ, giá</Heading>
            <HStack mt={5}>
                <Spacer/>
                <Button leftIcon={<EditIcon/>} colorScheme="telegram" onClick={onOpen}>Cập nhật</Button>
            </HStack>
            <SearchFilter searchPlaceholder="Tìm kiếm theo loại bàn, khung giờ, giá tiền" data={slots} methods={[
                {value: 'type', label: 'Loại bàn'},
                {value: 'time', label: 'Khung giờ'},
                {value: 'price', label: 'Giá tiền'},
            ]} properties={['type', 'time', 'price']} DisplayData={
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
                                    <Tr key={slot.tableType + '' + slot.slotId}>
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
                                            <ConfirmationDialog title="Xóa" onConfirm={async () => {
                                                try {
                                                    const res = await axios.delete(`/v1/deletePrice?clubId=${id}&slotId=${slot.slotId}&tableTypeId=${slot.tableType}`)

                                                    if (res.data.status) {
                                                        toast({
                                                            title: "Xóa thành công",
                                                            description: "Giá đã được xóa khỏi hệ thống",
                                                            status: "success",
                                                            duration: 700,
                                                            position: "top-right"
                                                        });
                                                        onClose();
                                                        window.location.reload();
                                                    } else {
                                                        toast({
                                                            title: "Xóa thất bại",
                                                            description: "Giá không được xóa khỏi hệ thống",
                                                            status: "error",
                                                            duration: 700,
                                                            position: "top-right"
                                                        });
                                                    }
                                                } catch (e) {
                                                    toast({
                                                        title: "Xóa thất bại",
                                                        description: "Giá không được xóa khỏi hệ thống",
                                                        status: "error",
                                                        duration: 700,
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
                    <ModalHeader>Cập nhật thông tin về giá</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = {
                                clubId: id,
                            };

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

                            try {
                                const res = await axios.put('/v1/updatePrice', JSON.stringify(data), {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });

                                if (res.data.status == 'Ok') {
                                    toast({
                                        title: "Cập nhật thành công",
                                        description: "Thông tin về giá đã được cập nhật",
                                        status: "success",
                                        position: "top-right",
                                        duration: 700,
                                    });
                                    window.location.reload();
                                } else {
                                    toast({
                                        title: "Cập nhật thất bại",
                                        description: "Thông tin về giá chưa được cập nhật",
                                        status: "error",
                                        position: "top-right",
                                        duration: 700,
                                    });
                                }
                            } catch (err) {
                                toast({
                                    title: "Cập nhật thất bại",
                                    description: "Thông tin về giá chưa được cập nhật",
                                    status: "error",
                                    position: "top-right",
                                    duration: 700,
                                });
                            }
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Giá</FormLabel>
                                <Input min="1000" step="1000" name="price" type="number" ref={initialRef}
                                       placeholder='Nhập giá tiền'/>
                                <FormHelperText>Đơn vị: đồng (chia hết cho 1000)</FormHelperText>
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
                                                {value + "h"}
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

    const res = await axios.get(`/v1/getPriceByClub/${id}`);

    return res.data;
}