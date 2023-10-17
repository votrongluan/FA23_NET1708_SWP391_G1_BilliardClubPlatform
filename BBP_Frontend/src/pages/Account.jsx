import {baseURL} from "../api/axios.js";
import {
    Box,
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
import useAuth from "../hooks/useAuth.js";
import EditFieldBox from "../components/EditFieldBox.jsx";
import React from "react";

function Account() {
    const user = useLoaderData();
    const {auth} = useAuth();

    if (user?.id.toString() !== auth?.id.toString()) {
        return <Navigate to="/auth"/>
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
                        <Box>
                            <EditFieldBox title="Tên" value={user.firstName} onEditClick={() => {
                                console.log('implement later')
                            }}/>

                            <EditFieldBox title="Họ, tên đệm" value={user.lastName} onEditClick={() => {
                                console.log('implement later')
                            }}/>

                            <EditFieldBox title="Số điện thoại" value={user.phone} onEditClick={() => {
                                console.log('implement later')
                            }}/>

                            <EditFieldBox title="Email" value={user.email} onEditClick={() => {
                                console.log('implement later')
                            }}/>

                            <EditFieldBox title="Ảnh đại diện" value={user.avatarLink} onEditClick={() => {
                                console.log('implement later')
                            }}/>

                            <Button width="100%" type="submit" colorScheme="telegram">Cập nhật</Button>
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <Form method="post" action="/src/pages/Auth">
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