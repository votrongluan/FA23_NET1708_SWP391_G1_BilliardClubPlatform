import React, {useContext, useRef} from 'react';
import {
    Box,
    Button,
    Container,
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
    useDisclosure
} from "@chakra-ui/react";
import {useLoaderData} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import EditFieldBox from "../../components/EditFieldBox.jsx";

function OwnClub(props) {
    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    const club = useLoaderData();
    console.log(club);
    const {districtMap} = useContext(GlobalContext);

    return (
        <Container maxW="1200px" as="main">
            <Heading mb={5} as="h2" size="lg" textAlign="center">Quản lý club</Heading>
            <Box>
                <EditFieldBox title="Tên club" value={club.clubName} onEditClick={() => {
                    onOpen();
                }}/>
                <EditFieldBox title="Địa chỉ" value={`${club.address}, ${districtMap[club.districtId]}`}
                              onEditClick={() => {
                                  console.log('implement later')
                              }}/>
                <EditFieldBox title="Email" value={club.name} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Số điện thoại" value={club.phone} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Fanpage link" value={club.fanpageLink} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Giờ mở cửa" value={club.openTime} onEditClick={() => {
                    console.log('implement later')
                }}/>
                <EditFieldBox title="Giờ đóng cửa" value={club.closeTime} onEditClick={() => {
                    console.log('implement later')
                }}/>
            </Box>

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
        </Container>
    );
}

export default OwnClub;