import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Header() {
  const { auth, setAuth } = useAuth();

  return (
    <Box bgColor="white" zIndex="1" position="fixed" w="100%" padding="0 20px">
      <Flex as="nav" height="70px" alignItems="center">
        {auth?.role === "STAFF" ? (
          <NavLink to="/staff/manage">
            <Heading as="h1">Billiards</Heading>
          </NavLink>
        ) : auth?.role === "ADMIN" ? (
          <NavLink to="/admin/manage">
            <Heading as="h1">Billiards</Heading>
          </NavLink>
        ) : (
          <NavLink to="/">
            <Heading as="h1">Billiards</Heading>
          </NavLink>
        )}

        <Spacer />
        <HStack spacing={6} fontSize="20px" fontWeight="medium">
          <NavLink to="/intro">Giới thiệu</NavLink>
          <NavLink to="/about">Liên hệ</NavLink>
          {auth?.role === "CUSTOMER" || !auth ? (
            <NavLink to="find">Tìm club</NavLink>
          ) : null}
          {auth?.username ? (
            <Menu>
              <MenuButton as={Button}>
                <HStack>
                  <Avatar src={auth?.avatarLink} size="sm" />
                  <Text>{auth.username}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <Link to={`/users/${auth?.id}`}>
                  <MenuItem>Tài khoản của tôi</MenuItem>
                </Link>
                {auth?.role === "CUSTOMER" ? (
                  <Link to={`/history/${auth?.id}`}>
                    <MenuItem>Lịch sử đặt bàn</MenuItem>
                  </Link>
                ) : null}
                <MenuItem
                  onClick={() => {
                    setAuth(null);
                  }}
                >
                  Đăng xuất
                </MenuItem>
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
    </Box>
  );
}

export default Header;
