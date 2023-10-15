import {baseURL} from "../../api/axios.js";
import {Button, FormControl, FormLabel, Input, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {Form, useLoaderData} from "react-router-dom";

function Account() {
    const user = useLoaderData();
    const handleChange = (e) => {
        console.log("Implement later")
    }

    return (
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
                            <Input type="text" name="firstName" value={user.firstName}/>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel>Họ, tên đệm</FormLabel>
                            <Input type="text" name="lastName" value={user.lastName}/>
                        </FormControl>
                        {/* Phone */}
                        <FormControl mb="20px">
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input type="tel" name="phone" value={user.phone}/>
                        </FormControl>
                        {/* Email */}
                        <FormControl mb="20px">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" value={user.email}/>
                        </FormControl>
                        {/* Avatar Link */}
                        <FormControl mb="20px">
                            <FormLabel>Ảnh đại diện</FormLabel>
                            <Input type="text" name="avatarLink" value={user.avatarLink}/>
                        </FormControl>

                        <Button width="100%" type="submit">Cập nhật</Button>
                    </Form>
                </TabPanel>

                <TabPanel>
                    <Form method="post" action="/auth">
                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập mật khẩu</FormLabel>
                            <Input type="password" name="password"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập mật khẩu mới</FormLabel>
                            <Input type="password" name="newPassword"/>
                        </FormControl>

                        <FormControl isRequired mb="20px">
                            <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                            <Input type="password" name="reNewPassword"/>
                        </FormControl>

                        <Button width="100%" type="submit">Cập nhật</Button>
                    </Form>
                </TabPanel>
            </TabPanels>
        </Tabs>
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