import {useLoaderData} from "react-router-dom";
import Clubs from "../../components/Clubs.jsx";
import {Container, Heading} from "@chakra-ui/react";
import {baseURL} from "../../api/axios.js";

function AllClubs() {
    const clubs = useLoaderData();

    return (
        <Container maxW="1200px" as="main" py={10}>
            <Heading as="h2" fontSize="24px" mb={5}>Toàn bộ club</Heading>
            <Clubs clubs={clubs}/>
        </Container>
    );
}

export default AllClubs;

export const clubsLoader = async () => {
    const res = await fetch(baseURL + '/clubs')

    if (!res.ok) {
        throw Error('Could not fetch the list of careers')
    }

    return res.json()
}