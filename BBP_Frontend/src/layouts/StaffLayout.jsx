import {Grid, GridItem} from "@chakra-ui/react"
import {Outlet} from "react-router-dom"
import StaffSideBar from "../components/StaffSideBar.jsx";

export default function StaffLayout() {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
            {/* sidebar */}
            <GridItem
                as="aside"
                colSpan={{base: 6, lg: 1, xl: 1}}
                bg="white"
                minHeight={{lg: '100vh'}}
                p={{base: '20px', lg: '30px'}}
            >
                <StaffSideBar/>
            </GridItem>

            {/* main content & navbar */}
            <GridItem
                as="main"
                colSpan={{base: 6, lg: 5, xl: 5}}
                p="40px"
            >
                <Outlet/>
            </GridItem>
        </Grid>
    )
}
