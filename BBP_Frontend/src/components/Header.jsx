import {Button, Container, Flex, Heading, HStack, Spacer} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <Container maxW="1200px">
            <Flex as="nav" height="70px" alignItems="center">
                <NavLink to="/">
                    <Heading as="h1">Billiards</Heading>
                </NavLink>
                <Spacer/>
                <HStack spacing={5} fontSize="20px">
                    <NavLink to="find">Tìm club</NavLink>
                    <NavLink to="book">Đặt lịch</NavLink>
                    <Button fontSize="20px" colorScheme="gray">Đăng nhập</Button>
                </HStack>
            </Flex>
        </Container>
    );
}

export default Header;