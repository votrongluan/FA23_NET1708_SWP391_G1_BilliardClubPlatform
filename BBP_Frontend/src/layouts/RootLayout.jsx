import {Outlet} from "react-router-dom"
import Header from "../components/Header.jsx";
import {Box, Container} from "@chakra-ui/react";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <Box>
            <Header/>
            <Box bgColor="gray.50">
                <Container maxW="1200px" as="main" py={10}>
                    <Outlet/>
                </Container>
            </Box>
            <Footer/>
        </Box>
    )
}
