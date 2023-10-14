import {Button, Container, Flex, Heading, HStack, Spacer} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <Container maxW="1200px">
            <Flex as="nav" height="70px" alignItems="center">
                <Heading as="h1">Billiards</Heading>
                <Spacer/>
                <HStack spacing="20px">
                    <NavLink>Tìm club</NavLink>
                    <NavLink>Đặt lịch</NavLink>
                    <Button colorScheme="yellow">Đăng nhập</Button>
                </HStack>
            </Flex>
        </Container>
    );
}

export default Header;