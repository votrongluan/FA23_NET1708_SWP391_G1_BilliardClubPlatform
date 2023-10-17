import React from 'react';
import {Button, Card, CardFooter, CardHeader, Divider, HStack, Stack, Text} from "@chakra-ui/react";
import {CalendarIcon, StarIcon, ViewIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function BookHistoryCard({booking}) {
    const {auth} = useAuth();

    return (
        <Card>
            <CardHeader>
                <Stack>
                    <Text fontWeight="semibold" as="h3" fontSize="20px">Club: {booking.clubName}</Text>
                    <Text>Địa chỉ: {booking.clubAddress}, {booking.clubAddress}</Text>
                    <Text>Ngày đặt: {booking.date}</Text>
                </Stack>
            </CardHeader>
            <Divider/>
            <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                {booking.comment ? <Stack>
                    <HStack>
                        <Text color="gray">Đánh giá của bạn: </Text>
                        <StarIcon color="yellow.500"/>
                        <Text>{booking.star}</Text>
                    </HStack>
                    <Text><span style={{color: 'gray'}}>Bình luận của bạn:</span> {booking.comment}</Text>
                </Stack> : <Button leftIcon={<CalendarIcon/>}>Viết đánh giá</Button>}
                <Link to={`/history/${auth?.id}/${booking.id}`}><Button colorScheme="telegram" variant="ghost"
                                                                        leftIcon={<ViewIcon/>}>Chi
                    tiết</Button></Link>
            </CardFooter>
        </Card>
    );
}

export default BookHistoryCard;