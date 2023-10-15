import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {Form, redirect} from "react-router-dom";

function Auth(props) {
    return (
        <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
            <TabList>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Đăng nhập</Tab>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Tạo tài khoản</Tab>
                <Tab fontSize="20px" _selected={{bg: 'gray.100'}}>Quên mật khẩu</Tab>
            </TabList>

            <TabPanels py="10px">
                <TabPanel>
                    <Form method="post" action="/auth">
                        <Input name="action" type="hidden" value="login"></Input>
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
                        <Input name="action" type="hidden" value="register"></Input>
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
                        <Input name="action" type="hidden" value="forget"></Input>
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

export const authAction = async ({request}) => {
    const data = await request.formData()
    let submission;

    const type = data.get('action');
    if (type === 'login') {
        submission = {
            username: data.get('username'),
            password: data.get('password'),
        }
    } else if (type === 'register') {
        submission = {
            username: data.get('username'),
            password: data.get('password'),
            rePassword: data.get('rePassword'),
            phone: data.get('phone'),
            email: data.get('email'),
        }
    } else if (type === 'forget') {
        submission = {
            phone: data.get('phone'),
        }
    }
    
    // dothing here
    console.log(submission)

    // redirect the user
    return redirect('/')
}