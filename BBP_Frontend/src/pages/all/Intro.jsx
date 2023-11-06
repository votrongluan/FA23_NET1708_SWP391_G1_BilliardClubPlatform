import React from 'react';
import {Container, Heading, Image} from "@chakra-ui/react";
import introImg from "../../../public/Black Modern Billiards Tournament Poster.png";

function About(props) {
    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" size="lg" textAlign="center">
                Giới thiệu
            </Heading>
            <Image margin="0 auto" width="50%" mt={10}
                   src={introImg}/>
        </Container>
    );
}

export default About;