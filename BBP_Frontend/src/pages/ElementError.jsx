import {Link, useRouteError} from "react-router-dom"
import {Box, Button, Container, Heading, Text} from "@chakra-ui/react";

export default function ElementError() {
    const error = useRouteError()

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Box textAlign="center" minH="70vh">
                <Heading size="lg" as="h2">Lỗi</Heading>
                <Text mt={10} mb={10}>{error.message}</Text>
                <Link to="/"><Button>Về trang chủ</Button></Link>
            </Box>
        </Container>
    )
}
