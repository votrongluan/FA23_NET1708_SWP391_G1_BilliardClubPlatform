import {
    Avatar,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer
} from "@chakra-ui/react";
import {Link, NavLink} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Header() {
    const {auth, setAuth} = useAuth();

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
                    {auth?.username ? ( // Check if the user is authenticated
                        <Menu>
                            <MenuButton as={Button} rightIcon={<Avatar src={auth?.avatarLink} size="sm"/>}>
                                {auth?.username}
                            </MenuButton>
                            <MenuList>
                                <Link to={`/users/${auth?.id}`}><MenuItem>Tài khoản của tôi</MenuItem></Link>
                                <MenuItem>Lịch sử đặt bàn</MenuItem>
                                <MenuItem onClick={() => {
                                    setAuth(null)
                                }}>Đăng xuất</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Link to="auth">
                            <Button fontSize="20px" colorScheme="telegram">
                                Đăng nhập
                            </Button>
                        </Link>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
}

export default Header;
