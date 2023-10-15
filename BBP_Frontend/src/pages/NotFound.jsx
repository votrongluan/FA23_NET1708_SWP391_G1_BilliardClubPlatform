import {Box, Button, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <Box textAlign="center" minH="70vh">
            <Heading size="lg" as="h2">Lỗi</Heading>
            <Text mt={10} mb={10}>Không tìm thấy trang</Text>
            <Button><Link to="/">Về trang chủ</Link></Button>
        </Box>
    );
}

export default NotFound;