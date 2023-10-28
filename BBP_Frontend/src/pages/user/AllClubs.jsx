import {useLoaderData} from "react-router-dom";
import Clubs from "../../components/Clubs.jsx";
import {Container, Heading} from "@chakra-ui/react";
import axios from "../../api/axios.js";

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
    const res = await axios.get('/v1/allClubs')

    const clubs = res.data.data;

    clubs.forEach((club) => {
        club.club.noRating = club.noRating;
        club.club.noBooking = club.noBooking;
        club.club.rating = club.rating;
    })

    return clubs
}