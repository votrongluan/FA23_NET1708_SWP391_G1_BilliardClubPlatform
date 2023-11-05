import React, {useContext, useRef} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Link as ChakraLink,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Stack,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {EditIcon, StarIcon, ViewIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import {GlobalContext} from "../context/GlobalContext.jsx";
import axios from "../api/axios.js";

function BookHistoryCard({booking}) {
    // Rating array
    const rating = [{
        star: 1,
        text: 'Kém',
        starIcon: '⭐',
    }, {
        star: 2,
        text: 'Trung bình',
        starIcon: '⭐⭐',
    }, {
        star: 3,
        text: 'Tốt',
        starIcon: '⭐⭐⭐',
    }, {
        star: 4,
        text: 'Rất tốt',
        starIcon: '⭐⭐⭐⭐',
    }, {
        star: 5,
        text: 'Tuyệt vời',
        starIcon: '⭐⭐⭐⭐⭐',
    }];


    // Modal
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef(null)

    const {auth} = useAuth();
    const {districtMap} = useContext(GlobalContext)

    function checkDate() {
        const today = new Date();
        const date = new Date(booking.date);
        return today.getTime() > date.getTime();
    }

    return (
        <>
            <Card>
                <CardBody>
                    <Stack>
                        <Text fontWeight="semibold" color="gray.500">Mã đơn: {booking.bookingId}</Text>
                        <Text fontWeight="semibold" as="h3" fontSize="20px">Club: <ChakraLink color="blue.500"
                                                                                              href={`/clubs/${booking.clubId}`}
                                                                                              isExternal>
                            {booking.clubName}
                        </ChakraLink>
                        </Text>
                        <Text>Địa chỉ: {booking.clubAddress}, {districtMap[booking.districtId]}</Text>
                        <Text>Ngày đặt: {booking.date}</Text>
                    </Stack>
                </CardBody>
                <Divider/>
                <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                    {booking.comment ?
                        <Stack>
                            <HStack>
                                <Text color="gray">Đánh giá của bạn: </Text>
                                <StarIcon color="yellow.500"/>
                                <Text>{booking.star}</Text>
                            </HStack>
                            <Text><span style={{color: 'gray'}}>Bình luận của bạn:</span> {booking.comment}</Text>
                        </Stack>
                        :
                        <Button isDisabled={booking.bookingStatusId == 1 ? true : false} leftIcon={<EditIcon/>}
                                onClick={onOpen}>Viết
                            đánh giá</Button>
                    }
                    <Link to={`/history/${auth?.id}/${booking.bookingId}`}><Button colorScheme="telegram"
                                                                                   variant="ghost"
                                                                                   leftIcon={<ViewIcon/>}>Chi
                        tiết</Button></Link>
                </CardFooter>
            </Card>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Đánh giá club</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);

                            if (data.comment === '') {
                                data.comment = rating.find(rate => rate.star == data.star).text;
                            }
                            data.bookingId = booking.bookingId;

                            console.log(JSON.stringify(data));

                            const res = await axios.post('/v1/giveFeedBack', JSON.stringify(data), {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            if (res.status === 200) {
                                onClose();
                                window.location.reload();
                            }
                        }}>
                            <FormControl isRequired>
                                <FormLabel>Mức độ hài lòng</FormLabel>
                                <Select name="star">
                                    {rating.map((rate, index) => (
                                        <option key={index} value={rate.star}>{rate.starIcon} - {rate.text}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Bình luận</FormLabel>
                                <Textarea height="180px" name="comment" type="text"/>
                                <FormHelperText>Nếu để trống, bình luận sẽ được chèn vào mặc định theo mức độ hài lòng
                                    của
                                    bạn</FormHelperText>
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

export default BookHistoryCard;