import React, {useRef} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import axios from "../api/axios.js";

function EditFieldBox({title, value, type, url, propertyName, oldData, setNewData}) {
    // Toast
    const toast = useToast();

    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    return (
        <>
            <FormControl mb="20px">
                <FormLabel>{title}</FormLabel>
                <Box borderRadius="4px" bgColor="white" borderWidth="1px" p={2}>
                    <HStack>
                        <Text>{value}</Text>
                        <Spacer/>
                        <Button onClick={() => {
                            onOpen();
                        }} size="sm"><EditIcon mr={1}/>Chỉnh sửa</Button>
                    </HStack>
                </Box>
            </FormControl>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Cập nhật thông tin cá nhân</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();

                            switch (type) {
                                case 'tel':
                                    if (!e.target.data.value.match(/^[0-9]{9,11}$/)) {
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
                                default:
                                    break;
                            }

                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData.entries()).data;

                            const res = await axios.put(url, JSON.stringify({
                                ...oldData,
                                [propertyName]: data
                            }), {
                                headers: {"Content-Type": "application/json"}
                            });

                            if (res.data.status == 'Ok') {
                                setNewData({
                                    ...oldData,
                                    [propertyName]: data
                                });
                            }

                            onClose();
                        }}>
                            <FormControl isRequired>
                                <FormLabel>{title}</FormLabel>
                                <Input name="data" type={type} ref={initialRef} placeholder={value}/>
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

export default EditFieldBox;