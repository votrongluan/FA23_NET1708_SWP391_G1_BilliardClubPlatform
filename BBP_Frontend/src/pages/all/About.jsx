import React from 'react';
import {Container, Heading, HStack, Image, Link as ChakraLink, Spacer, Stack, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

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
                    <Text fontWeight="semibold">0123-456-789</Text>
                </HStack>
                <HStack>
                    <Text>Đường dây nóng: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">01900-0000</Text>
                </HStack>
                <HStack>
                    <Text>Email: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">billiard@bill.ard</Text>
                </HStack>
                <HStack>
                    <Text>Địa chỉ: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, TP
                        HCM</Text>
                </HStack>
                <HStack>
                    <Text>Facebook: </Text>
                    < Spacer/>
                    <Text fontWeight="semibold">
                        <ChakraLink color="blue.500" href="https://facebook.com" isExternal>
                            Billiard
                            <ExternalLinkIcon mx="2px"/>
                        </ChakraLink>
                    </Text>
                </HStack>
                <Image src="https://i.pinimg.com/1200x/76/3f/a5/763fa56e56beb83b59ac7fc4eec10057.jpg"/>
            </Stack>
        </Container>
    );
}

export default About;