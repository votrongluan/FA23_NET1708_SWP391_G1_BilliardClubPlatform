import {Outlet, ScrollRestoration} from "react-router-dom";
import Header from "../components/Header.jsx";
import {Box} from "@chakra-ui/react";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <Box>
            <Header/>
            <Box pt="70px" minH="80vh" bgColor="gray.50">
                <Outlet/>
            </Box>
            <Footer/>
            <ScrollRestoration/>
        </Box>
    );
}
