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
                {auth?.role === 'STAFF' ? <NavLink to="/staff/manage">
                    <Heading as="h1">Billiards</Heading>
                </NavLink> : auth?.role === 'ADMIN' ? <NavLink to="/admin/manage">
                    <Heading as="h1">Billiards</Heading>
                </NavLink> : <NavLink to="/">
                    <Heading as="h1">Billiards</Heading>
                </NavLink>}

                <Spacer/>
                <HStack spacing={5} fontSize="20px">
                    {auth?.role === 'CUSTOMER' || !auth ?
                        <NavLink to="find">Tìm club</NavLink> : null}
                    {auth?.role === 'CUSTOMER' || !auth ?
                        <NavLink to="book">Đặt lịch</NavLink> : null}
                    {auth?.username ? (
                        <Menu>
                            <MenuButton as={Button}>
                                <Avatar src={auth?.avatarLink} size="sm"/>
                            </MenuButton>
                            <MenuList>
                                <Link to={`/users/${auth?.id}`}><MenuItem>Tài khoản của tôi</MenuItem></Link>
                                {auth?.role === 'CUSTOMER' ? <Link to={`/history/${auth?.id}`}><MenuItem>Lịch sử đặt
                                    bàn</MenuItem></Link> : null}
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
