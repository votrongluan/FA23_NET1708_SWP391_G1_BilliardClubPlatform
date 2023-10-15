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
    useToast
} from "@chakra-ui/react";
import {Form, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Auth(props) {
    const toast = useToast()
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post(LOGIN_URL,
            //     JSON.stringify({user, pwd}),
            //     {
            //         headers: {'Content-Type': 'application/json'},
            //         withCredentials: true
            //     }
            // );
            // console.log(JSON.stringify(response?.data));
            // //console.log(JSON.stringify(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({user, pwd, roles, accessToken});
            // setUser('');
            // setPwd('');
            // get data from form
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            if (data.username === 'user' && data.password === 'user') {
                setAuth({
                    "id": 1,
                    "username": "user",
                    "avatarLink": "https://i.pinimg.com/originals/d8/ed/33/d8ed337d0a83bc67d355d0f1d0d29097.jpg",
                    "email": "user@usr.com",
                    "phone": "0123456789",
                    "role": "User",
                    "lastName": "Doe",
                    "firstName": "John"
                });
                navigate(from);
            } else if (data.username === 'admin' && data.password === 'admin') {
                setAuth({
                    "id": 3,
                    "username": "admin",
                    "avatarLink": "https://i.pinimg.com/originals/28/03/f2/2803f2963bdea8302c0d07153b263e2d.jpg",
                    "email": "admin@admin.com",
                    "phone": "5555555555",
                    "role": "Admin",
                    "lastName": "Johnson",
                    "firstName": "Mike"
                });
                navigate(from);
            } else if (data.username === 'staff' && data.password === 'staff') {
                setAuth({
                    "id": 2,
                    "username": "staff",
                    "avatarLink": "https://i.pinimg.com/1200x/de/0a/97/de0a9757a21cda8550b8c94c1af5e3ff.jpg",
                    "email": "staff@staff.com",
                    "phone": "9876543210",
                    "role": "Staff",
                    "lastName": "Smith",
                    "firstName": "Jane"
                });
                navigate('/staff/manage');
            } else {
                toast({
                    title: "Đăng nhập thất bại",
                    description: "Tài khoản hoặc mật khẩu không đúng",
                    status: "error",
                    duration: 1500,
                    isClosable: true,
                    position: "top-right"
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
                <TabList>
                    <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Đăng nhập</Tab>
                    <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Tạo tài khoản</Tab>
                    <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Quên mật khẩu</Tab>
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

                            <Button colorScheme="telegram" width="100%" type="submit">Đăng nhập</Button>
                        </Form>
                    </TabPanel>

                    <TabPanel>
                        <Form method="post" action="/auth">
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

                            <Button colorScheme="telegram" width="100%" type="submit">Đăng ký</Button>
                        </Form>
                    </TabPanel>

                    <TabPanel>
                        <Form method="post" action="/auth">
                            <FormControl isRequired mb="20px">
                                <FormLabel>Số điện thoại</FormLabel>
                                <Input bgColor="white" type="tel" name="phone"/>
                                <FormHelperText>Hệ thống sẽ gửi về tài khoản và mật khẩu mới nếu như số điện thoại đó đã
                                    từng đăng ký vào hệ thống</FormHelperText>
                            </FormControl>

                            <Button colorScheme="telegram" width="100%" type="submit">Xác nhận</Button>
                        </Form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default Auth;
