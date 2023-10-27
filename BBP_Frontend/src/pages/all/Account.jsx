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
    Tabs,
    useToast
} from "@chakra-ui/react";
import {Navigate, useParams} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import EditFieldBox from "../../components/EditFieldBox.jsx";
import React from "react";
import axios from "../../api/axios.js";

function Account() {
    const {auth, setAuth} = useAuth();
    const {id} = useParams();

    if (!auth) {
        return <Navigate to="/auth"/>
    }

    if (id.toString() !== auth?.id.toString()) {
        return <Navigate to="/unauthorized"/>
    }

    const toast = useToast();

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Tabs p="20px" variant="enclosed" colorScheme="purple">
                <TabList>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Tài khoản của tôi</Tab>
                    <Tab fontWeight="500" fontSize="20px" _selected={{bg: 'gray.100'}}>Đổi mật khẩu</Tab>
                </TabList>

                <TabPanels py="10px">
                    <TabPanel>
                        <Box>
                            <EditFieldBox title="Tên" value={auth.firstName} type="text" propertyName="firstName"
                                          url={`/v1/updateUser/${id}`} oldData={auth} setNewData={setAuth}/>
                            <EditFieldBox title="Họ, tên đệm" value={auth.lastName} type="text"
                                          propertyName="lastName" url={`/v1/updateUser/${id}`} oldData={auth}
                                          setNewData={setAuth}/>
                            <EditFieldBox title="Số điện thoại" value={auth.phone} type="tel" propertyName="phone"
                                          url={`/v1/updateUser/${id}`} oldData={auth} setNewData={setAuth}/>
                            <EditFieldBox title="Email" value={auth.email} type="email" propertyName="email"
                                          url={`/v1/updateUser/${id}`} oldData={auth} setNewData={setAuth}/>
                            <EditFieldBox title="Ảnh đại diện" value={auth.avatarLink} type="text"
                                          propertyName="avatarLink" url={`/v1/updateUser/${id}`} oldData={auth}
                                          setNewData={setAuth}/>
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = Object.fromEntries(formData);

                            if (data.newPassword !== data.reNewPassword) {
                                toast({
                                    title: "Cập nhật thất bại",
                                    description: "Mật khẩu mới không khớp",
                                    status: "error",
                                    duration: 700,
                                    isClosable: true,
                                    position: "top-right"
                                });
                                return;
                            }

                            if (data.newPassword !== data.password) {
                                toast({
                                    title: "Cập nhật thất bại",
                                    description: "Mật khẩu mới không được trùng với mật khẩu cũ",
                                    status: "error",
                                    duration: 700,
                                    isClosable: true,
                                    position: "top-right"
                                });
                                return;
                            }

                            axios.put(`/v1/updatePassword/${id}`, JSON.stringify({
                                oldPassword: data.password,
                                newPassword: data.newPassword
                            }), {
                                headers: {"Content-Type": "application/json"}
                            }).then(res => {
                                if (res.data.status == 'Ok') {
                                    toast({
                                        title: "Cập nhật thành công",
                                        description: "Mật khẩu đã được cập nhật",
                                        status: "success",
                                        duration: 700,
                                        isClosable: true,
                                        position: "top-right"
                                    });
                                }
                            });
                        }}>
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
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}

export default Account;