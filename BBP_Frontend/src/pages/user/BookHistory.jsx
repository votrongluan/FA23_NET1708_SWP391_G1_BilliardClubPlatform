import React from 'react';
import {Container, Flex, Heading, Text} from "@chakra-ui/react";
import BookHistoryCard from "../../components/BookHistoryCard.jsx";
import axios from "../../api/axios.js";
import {Navigate, useLoaderData, useParams} from "react-router-dom";
import SearchFilter from "../../components/SearchFilter.jsx";
import useAuth from "../../hooks/useAuth.js";
import Pagination from "../../components/Pagination.jsx";

function BookHistory() {
    const {auth, setAuth} = useAuth();
    const {id} = useParams();

    if (!auth) {
        return <Navigate to="/auth"/>
    }

    if (id.toString() !== auth?.id.toString()) {
        return <Navigate to="/unauthorized"/>
    }

    const bookings = useLoaderData();

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" fontSize="24px" mb={5} textAlign="center">Lịch sử đặt bàn</Heading>
            {bookings != null ? <SearchFilter data={bookings} methods={[
                {value: "clubName", label: "Tên câu lạc bộ"},
                {value: "date", label: "Ngày đặt"},
                {value: "star", label: "Đánh giá"}
            ]} properties={["clubName", "clubAddress", "date", "bookingId"]} DisplayData={({filteredData}) =>
                (
                    <Pagination data={filteredData} itemsPerPage={10} DisplayData={({currentData}) => (
                        <Flex flexDirection="column" gap={5}>
                            {currentData.map(booking => {
                                if (!booking.firstSlotId) return null;
                                
                                return (
                                    <BookHistoryCard key={booking.bookingId} booking={booking}/>
                                )
                            })}
                        </Flex>
                    )}/>
                )
            }/> : <Text mt={10} textAlign="center" color="gray.500">(Bạn không có đơn đặt bàn nào)</Text>}

        </Container>
    );
}

export default BookHistory;

export const bookingHistoryLoader = async ({params}) => {
    const {id} = params

    try {
        const res = await axios.get(`/booking/getAllByCusId/${id}`);

        return res.data.data;
    } catch (err) {
        return null;
    }
}