import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {Form, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import {useState} from "react";

function Auth(props) {
    const {setAuth} = useAuth();

    const [errMsg, setErrMsg] = useState('');
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
                setAuth({...data, role: 'User'});
                navigate(from);
            } else if (data.username === 'admin' && data.password === 'admin') {
                setAuth({...data, role: 'Admin'});
                navigate(from);
            } else if (data.username === 'staff' && data.password === 'staff') {
                setAuth({...data, role: 'Staff'});
                navigate(from);
            } else {
                setErrMsg("Tài khoản hoặc mật khẩu không đúng");
            }
        } catch (err) {
        }
    }

    return (
        <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
            <TabList>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Đăng nhập</Tab>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Tạo tài khoản</Tab>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Quên mật khẩu</Tab>
            </TabList>

            <TabPanels py="10px">
                <TabPanel>
                    <Form onSubmit={handleLogin}>
                        <FormErrorMessage>{errMsg}</FormErrorMessage>
                        <FormControl isRequired mb="20px">
                            <FormLabel>Tài khoản</FormLabel>
                            <Input type="text" name="username"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Mật khẩu</FormLabel>
                            <Input type="password" name="password"/>
                        </FormControl>

                        <Button width="100%" type="submit">Đăng nhập</Button>
                    </Form>
                </TabPanel>

                <TabPanel>
                    <Form method="post" action="/auth">
                        <FormControl isRequired mb="20px">
                            <FormLabel>Tài khoản</FormLabel>
                            <Input type="text" name="username"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập mật khẩu</FormLabel>
                            <Input type="password" name="password"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <Input type="password" name="rePassword"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập số điện thoại</FormLabel>
                            <Input type="tel" name="phone"/>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel>Nhập email</FormLabel>
                            <Input type="email" name="email"/>
                        </FormControl>

                        <Button width="100%" type="submit">Đăng ký</Button>
                    </Form>
                </TabPanel>

                <TabPanel>
                    <Form method="post" action="/auth">
                        <FormControl isRequired mb="20px">
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input type="tel" name="phone"/>
                            <FormHelperText>Hệ thống sẽ gửi về tài khoản và mật khẩu mới nếu như số điện thoại đó đã
                                từng đăng ký vào hệ thống</FormHelperText>
                        </FormControl>

                        <Button width="100%" type="submit">Xác nhận</Button>
                    </Form>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default Auth;
