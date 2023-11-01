import React from 'react';
import {Container, Heading, Image} from "@chakra-ui/react";

function About(props) {
    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" size="lg" textAlign="center">
                Giới thiệu
            </Heading>
            <Image mt={10}
                   src="https://smartvietnam.com.vn/vi/wp-content/uploads/2020/01/TN-SM-GTCLvn.jpg"/>
        </Container>
    );
}

export default About;