import {baseURL} from "../../api/axios.js";
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {Form, Navigate, useLoaderData} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

function Account() {
    const user = useLoaderData();
    const {auth} = useAuth();

    if (user.id.toString() !== auth.id.toString()) {
        return <Navigate to="/unauthorized"/>
    }
    const handleChange = (e) => {
        console.log("Implement later")
    }

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Tabs p="20px" variant="enclosed" colorScheme="purple" minH="70vh">
                <TabList>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Tài khoản của tôi</Tab>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Đổi mật khẩu</Tab>
                </TabList>

                <TabPanels py="10px">
                    <TabPanel>
                        <Form onSubmit={handleChange}>
                            <FormControl mb="20px">
                                <FormLabel>Tên</FormLabel>
                                <Input bgColor="white" type="text" name="firstName" value={user.firstName}/>
                            </FormControl>

                            <FormControl mb="20px">
                                <FormLabel>Họ, tên đệm</FormLabel>
                                <Input bgColor="white" type="text" name="lastName" value={user.lastName}/>
                            </FormControl>
                            {/* Phone */}
                            <FormControl mb="20px">
                                <FormLabel>Số điện thoại</FormLabel>
                                <Input bgColor="white" type="tel" name="phone" value={user.phone}/>
                            </FormControl>
                            {/* Email */}
                            <FormControl mb="20px">
                                <FormLabel>Email</FormLabel>
                                <Input bgColor="white" type="email" name="email" value={user.email}/>
                            </FormControl>
                            {/* Avatar Link */}
                            <FormControl mb="20px">
                                <FormLabel>Ảnh đại diện</FormLabel>
                                <Input bgColor="white" type="text" name="avatarLink" value={user.avatarLink}/>
                            </FormControl>

                            <Button width="100%" type="submit" colorScheme="telegram">Cập nhật</Button>
                        </Form>
                    </TabPanel>

                    <TabPanel>
                        <Form method="post" action="/auth">
                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập mật khẩu</FormLabel>
                                <Input bgColor="white" type="password" name="password"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập mật khẩu mới</FormLabel>
                                <Input bgColor="white" type="password" name="newPassword"/>
                            </FormControl>

                            <FormControl isRequired mb="20px">
                                <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                                <Input bgColor="white" type="password" name="reNewPassword"/>
                            </FormControl>

                            <Button width="100%" type="submit" colorScheme="telegram">Cập nhật</Button>
                        </Form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default Account;

export const userLoader = async ({params}) => {
    const {id} = params

    const res = await fetch(baseURL + '/users/' + id)

    if (!res.ok) {
        throw Error('Không tìm thấy tài khoản')
    }

    return res.json()
}