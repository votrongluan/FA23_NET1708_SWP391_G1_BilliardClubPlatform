import {Link, useRouteError} from "react-router-dom"
import {Box, Button, Heading, Text} from "@chakra-ui/react";

export default function ElementError() {
    const error = useRouteError()

    return (
        <Box textAlign="center" minH="70vh">
            <Heading size="lg" as="h2">Lỗi</Heading>
            <Text mt={10} mb={10}>{error.message}</Text>
            <Button><Link to="/">Về trang chủ</Link></Button>
        </Box>
    )
}
