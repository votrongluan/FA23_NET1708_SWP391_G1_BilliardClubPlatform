import {Box, Button, Container, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function Unauthorized() {
    return (
        <Container maxW="1200px" as="main" py={10}>
            <Box textAlign="center">
                <Heading size="lg" as="h2">Lỗi</Heading>
                <Text mt={10} mb={10}>Bạn không có quyền truy cập vào trang này</Text>
                <Link to="/"><Button>Về trang chủ</Button></Link>
            </Box>
        </Container>
    );
}

export default Unauthorized;