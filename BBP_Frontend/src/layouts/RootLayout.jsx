import {Outlet} from "react-router-dom"
import Header from "../components/Header.jsx";
import {Box} from "@chakra-ui/react";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <Box>
            <Header/>
            <Box as="main" py="40px">
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    )
}
