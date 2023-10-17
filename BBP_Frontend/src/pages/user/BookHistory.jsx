import React from 'react';
import {Container, Flex, Heading} from "@chakra-ui/react";
import BookHistoryCard from "../../components/BookHistoryCard.jsx";
import {baseURL} from "../../api/axios.js";
import {useLoaderData} from "react-router-dom";
import SearchFilter from "../../components/SearchFilter.jsx";

function BookHistory() {
    const bookings = useLoaderData();
    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" fontSize="24px" mb={5} textAlign="center">Lịch sử đặt bàn</Heading>
            <SearchFilter data={bookings} methods={[
                {value: "clubName", label: "Tên câu lạc bộ"},
                {value: "date", label: "Ngày đặt"},
                {value: "star", label: "Đánh giá"}
            ]} DisplayData={({filteredData}) =>
                (
                    <Flex flexDirection="column" gap={5}>
                        {filteredData.map(booking => (
                            <BookHistoryCard key={booking.id} booking={booking}/>
                        ))}
                    </Flex>
                )
            }/>
        </Container>
    );
}

export default BookHistory;

export const bookingHistoryLoader = async ({params}) => {
    const {id} = params

    const res = await fetch(baseURL + '/bookingHistoryUserOne')

    if (!res.ok) {
        throw Error('Không tìm thấy tài khoản')
    }

    return res.json()
}