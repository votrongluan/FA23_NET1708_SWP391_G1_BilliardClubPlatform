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

    const navLinkStyle = ({isActive}) => {
        return {
            textDecoration: isActive ? 'underline' : ''
        }
    }

    return (
        <Container maxW="1200px">
            <Flex as="nav" height="70px" alignItems="center">
                {auth?.role === 'Staff' ? <NavLink to="/staff/manage">
                    <Heading as="h1">Billiards</Heading>
                </NavLink> : <NavLink to="/">
                    <Heading as="h1">Billiards</Heading>
                </NavLink>}

                <Spacer/>
                <HStack spacing={5} fontSize="20px">
                    {auth?.role === 'User' || !auth ?
                        <NavLink style={navLinkStyle} to="find">Tìm club</NavLink> : null}
                    {auth?.role === 'User' || !auth ?
                        <NavLink style={navLinkStyle} to="book">Đặt lịch</NavLink> : null}
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
