import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
} from "@chakra-ui/react";
import {Form, Navigate, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import axios from "../../api/axios.js";

function Auth() {
    const toast = useToast();
    const {setAuth, auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // Check if password is same as rePassword
            if (data.password !== data.rePassword) {
                toast({
                    title: "Đăng ký thất bại",
                    description: "Mật khẩu không trùng nhau",
                    status: "error",
                    duration: 700,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            // Check if phone number is valid
            const phoneRegex = /^[0-9]{9,11}$/;
            if (!phoneRegex.test(data.phone)) {
                toast({
                    title: "Đăng ký thất bại",
                    description: "Số điện thoại không hợp lệ",
                    status: "error",
                    duration: 700,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            const res = await axios.post("/account/register", JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
            });

            const user = res.data;

            if (!user.status) {
                toast({
                    title: "Đăng ký thất bại",
                    description: "Tài khoản đã tồn tại",
                    status: "error",
                    duration: 700,
                    isClosable: true,
                    position: "top-right",
                });
            } else {
                toast({
                    title: "Đăng ký thành công",
                    description: "Tài khoản đã được tạo",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const res = await axios.post("/account/login", JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
            });

            const user = res.data;

            switch (user.role) {
                case "CUSTOMER":
                    setAuth(user);
                    navigate(from);
                    break;
                case "STAFF":
                    setAuth(user);
                    navigate("/staff/manage");
                    break;
                case "ADMIN":
                    setAuth(user);
                    navigate("/admin/manage");
                    break;
                default:
                    break;
            }
        } catch (err) {
            toast({
                title: "Đăng nhập thất bại",
                description: "Tài khoản hoặc mật khẩu không đúng",
                status: "error",
                duration: 700,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    if (auth) return <Navigate to="/"/>;

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
                <TabList>
                    <Tab
                        fontWeight="semibold"
                        fontSize="20px"
                        _selected={{bg: "gray.100"}}
                    >
                        Đăng nhập
                    </Tab>
                    <Tab
                        fontWeight="semibold"
                        fontSize="20px"
                        _selected={{bg: "gray.100"}}
                    >
                        Tạo tài khoản
                    </Tab>
                    <Tab
                        fontWeight="semibold"
                        fontSize="20px"
                        _selected={{bg: "gray.100"}}
                    >
                        Quên mật khẩu
                    </Tab>
                </TabList>

                <TabPanels py="10px">
                    <TabPanel>
                        <Form onSubmit={handleLogin}>
                            <FormControl isRequired mb="20px">
                                <FormLabel>Tài khoản</FormLabel>
                                <Input bgColor="white" type="text" name="username"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input bgColor="white" type="password" name="password"/>
                            </FormControl>

                            <Button colorScheme="telegram" width="100%" type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    </TabPanel>

                    <TabPanel>
                        <Form onSubmit={handleRegister}>
                            <FormControl isRequired mb="20px">
                                <FormLabel>Tài khoản</FormLabel>
                                <Input bgColor="white" type="text" name="username"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập mật khẩu</FormLabel>
                                <Input bgColor="white" type="password" name="password"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <Input bgColor="white" type="password" name="rePassword"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập số điện thoại</FormLabel>
                                <Input bgColor="white" type="tel" name="phone"/>
                            </FormControl>

                            <FormControl mb="20px">
                                <FormLabel>Nhập email</FormLabel>
                                <Input bgColor="white" type="email" name="email"/>
                            </FormControl>

                            <Button colorScheme="telegram" width="100%" type="submit">
                                Đăng ký
                            </Button>
                        </Form>
                    </TabPanel>

                    <TabPanel>
                        <Form method="post" action="/all/Auth">
                            <FormControl isRequired mb="20px">
                                <FormLabel>Số điện thoại</FormLabel>
                                <Input bgColor="white" type="tel" name="phone"/>
                                <FormHelperText>
                                    Hệ thống sẽ gửi về tài khoản và mật khẩu mới nếu như số điện
                                    thoại đó đã từng đăng ký vào hệ thống
                                </FormHelperText>
                            </FormControl>

                            <Button colorScheme="telegram" width="100%" type="submit">
                                Xác nhận
                            </Button>
                        </Form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default Auth;
