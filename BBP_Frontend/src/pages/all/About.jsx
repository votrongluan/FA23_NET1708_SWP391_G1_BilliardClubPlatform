import React from 'react';
import {Container, Heading, HStack, Image, Spacer, Stack, Text} from "@chakra-ui/react";

function About(props) {
    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" size="lg" textAlign="center">
                Liên hệ
            </Heading>
            <Stack maxW="700px" m="40px auto">
                <HStack>
                    <Text>Số điện thoại: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">0123456789</Text>
                </HStack>
                <HStack>
                    <Text>Đường dây nóng: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">0283812838</Text>
                </HStack>
                <HStack>
                    <Text>Email: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">abc@abc.com</Text>
                </HStack>
                <HStack>
                    <Text>Địa chỉ: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">Tòa nhà ABC, 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</Text>
                </HStack>
                <HStack>
                    <Text>Facebook: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">
                        <a style={{
                            color: "#3182ce",
                        }} href="https://www.facebook.com/">
                            https://www.facebook.com/
                        </a>
                    </Text>
                </HStack>
                <Image src="https://i.pinimg.com/1200x/76/3f/a5/763fa56e56beb83b59ac7fc4eec10057.jpg"/>
            </Stack>
        </Container>
    );
}

export default About;