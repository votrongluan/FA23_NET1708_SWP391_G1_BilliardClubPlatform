import React, {useContext} from "react";
import axios from "../../api/axios.js";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Divider,
    Heading,
    HStack,
    Link as ChakraLink,
    Spacer,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import useAuth from "../../hooks/useAuth.js";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";

function BookDetail() {
    const navigate = useNavigate();
    const toast = useToast();
    const bookingDetail = useLoaderData();
    const {districtMap, slotMap, tableTypeMap} = useContext(GlobalContext);
    const {auth} = useAuth();

    return (
        <Container maxW="1200px" as="main" py={10}>
            <VStack>
                <CheckCircleIcon fontSize="44px" color="green.500"/>
                <Text as="h2" fontSize="20px" mb={5} textAlign="center">
                    Cảm ơn quý khách đã đặt bàn trên hệ thống của chúng tôi
                </Text>
                <Card w="550px">
                    <CardHeader>
                        <Heading textAlign="center" as="h3" fontSize="20px">
                            Thông tin đặt bàn
                        </Heading>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <HStack>
                            <Text color="gray.500">Mã đơn: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.bookingId}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Club: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                <ChakraLink color="blue.500"
                                            href={`/clubs/${bookingDetail.clubId}`}
                                            isExternal>
                                    {bookingDetail.clubName}
                                </ChakraLink>
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Đia chỉ: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                {bookingDetail.clubAddress},{" "}
                                {districtMap[bookingDetail.districtId]}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Mã bàn: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                {bookingDetail.tableId}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Loại bàn: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                {tableTypeMap[bookingDetail.tableTypeId]}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Ngày đặt: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.date}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Giờ đặt: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                {bookingDetail.firstSlotId === bookingDetail.lastSlotId
                                    ? slotMap[bookingDetail.firstSlotId] +
                                    " - " +
                                    Number(Number(slotMap[bookingDetail.firstSlotId]) + 1) +
                                    " giờ"
                                    : slotMap[bookingDetail.firstSlotId] +
                                    " - " +
                                    Number(Number(slotMap[bookingDetail.lastSlotId]) + 1) +
                                    " giờ"}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Họ tên khách hàng: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">
                                {auth?.lastName + " " + auth?.firstName}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Số điện thoại: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{auth?.phone}</Text>
                        </HStack>
                        <HStack>
                            <Text color="gray.500">Thành tiền: </Text>
                            <Spacer/>
                            <Text fontWeight="semibold">{bookingDetail.price} đồng</Text>
                        </HStack>
                    </CardBody>
                </Card>
            </VStack>
            <VStack mt={10}>
                <HStack spacing={20}>
                    <Link to="/">
                        <Button>Về trang chủ</Button>
                    </Link>
                    {bookingDetail.bookingStatusId === 1 && (
                        <ConfirmationDialog onConfirm={async () => {
                            const res = await axios.delete(`booking/cancelBooking/${bookingDetail.bookingId}`);

                            if (res.data) {
                                toast({
                                    title: "Hủy lịch thành công",
                                    description: "Đơn đặt bàn của bạn đã được hủy thành công",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                    position: "top-right",
                                });
                                navigate('/history/' + auth.id);
                            }
                        }} title="Hủy lịch"/>
                    )}
                </HStack>
            </VStack>
        </Container>
    );
}

export default BookDetail;

export const bookingDetailLoader = async ({params}) => {
    const {id} = params;

    const res = await axios.get(`/booking/getByBookingId/${id}`);

    return res.data.data;
};
