import {Box, Button, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function Unauthorized() {
    return (
        <Box textAlign="center" minH="70vh">
            <Heading size="lg" as="h2">Lỗi</Heading>
            <Text mt={10} mb={10}>Bạn không có quyền truy cập vào trang này</Text>
            <Link to="/"><Button>Về trang chủ</Button></Link>
        </Box>
    );
}

export default Unauthorized;